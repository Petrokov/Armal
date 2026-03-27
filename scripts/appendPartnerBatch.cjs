const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = process.cwd();
const batchSize = Number(process.argv[2] || 20);

const transcriptPath =
  'C:/Users/tlojen/.cursor/projects/c-Users-tlojen-Desktop-Petrokov-Web-armal-new-web-armal-web/agent-transcripts/265c3597-58ae-46d0-abc3-c6f2209aa9b3/265c3597-58ae-46d0-abc3-c6f2209aa9b3.jsonl';
const partnerFilePath = path.join(root, 'src/data/partnerLocations.js');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const normalizeCountry = (country) =>
  country === 'SI' ? 'SLO' : country === 'BA' ? 'BIH' : country;
const esc = (value) => String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

function extractOriginalLocations() {
  const lines = fs.readFileSync(transcriptPath, 'utf8').split(/\r?\n/);
  let blob = '';

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const obj = JSON.parse(line);
      const text = obj?.message?.content?.[0]?.text;
      if (typeof text === 'string' && text.includes('const locations = [')) {
        blob = text;
        break;
      }
    } catch {
      // ignore malformed lines
    }
  }

  if (!blob) throw new Error('Locations source not found in transcript.');

  const match = blob.match(
    /const locations = \[(.|\n|\r)*?\n\];\n\nexport default locations;/
  );
  if (!match) throw new Error('Could not extract locations block.');

  const code = match[0].replace(/export default locations;\s*$/, '');
  return vm.runInNewContext(`${code}\nlocations;`);
}

function getExistingIds(fileText) {
  const ids = new Set();
  for (const match of fileText.matchAll(/id: '([^']+)'/g)) {
    ids.add(match[1]);
  }
  return ids;
}

function formatEntry(entry, lat, lng) {
  const country = normalizeCountry(entry.country);
  const mapsUrl =
    lat != null && lng != null
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          entry.address
        )}`;

  return [
    '  {',
    `    id: '${esc(entry.id)}',`,
    `    name: '${esc(entry.name)}',`,
    `    country: '${esc(country)}',`,
    `    address: '${esc(entry.address)}',`,
    `    phone: '${esc(entry.phone)}',`,
    `    city: '${esc(entry.city)}',`,
    `    lat: ${lat == null ? 'null' : lat},`,
    `    lng: ${lng == null ? 'null' : lng},`,
    `    googleMapsUrl: '${esc(mapsUrl)}',`,
    '  },',
  ].join('\n');
}

async function geocode(entry) {
  try {
    const query = encodeURIComponent(
      `${entry.address}, ${entry.city}, ${normalizeCountry(entry.country)}`
    );
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${query}`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'armal-geocode-script/1.0' },
    });
    const data = await response.json();
    if (Array.isArray(data) && data[0]) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };
    }
  } catch {
    // fallback to null/null
  }
  return { lat: null, lng: null };
}

async function run() {
  const originalLocations = extractOriginalLocations();
  let partnerFile = fs.readFileSync(partnerFilePath, 'utf8');
  const existingIds = getExistingIds(partnerFile);

  const pending = originalLocations
    .map((entry) => ({
      entry,
      index: Number((entry.id.match(/_(\d+)$/) || [])[1]),
    }))
    .filter(({ index }) => Number.isFinite(index))
    .filter(({ entry }) => !existingIds.has(entry.id))
    .sort((a, b) => a.index - b.index)
    .slice(0, batchSize)
    .map(({ entry }) => entry);

  if (pending.length === 0) {
    console.log('No pending entries.');
    return;
  }

  const chunks = [];
  for (const entry of pending) {
    const { lat, lng } = await geocode(entry);
    chunks.push(formatEntry(entry, lat, lng));
    await sleep(1200);
  }

  partnerFile = partnerFile.replace(
    /\n\]\s*\n\s*export default partnerLocations\s*$/,
    `\n${chunks.join('\n')}\n]\n\nexport default partnerLocations\n`
  );
  fs.writeFileSync(partnerFilePath, partnerFile, 'utf8');

  console.log(`Inserted: ${pending.length}`);
  console.log(`Range: ${pending[0].id} -> ${pending[pending.length - 1].id}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
