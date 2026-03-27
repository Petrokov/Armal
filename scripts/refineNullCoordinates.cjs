const fs = require('fs');
const path = require('path');

const partnerFilePath = path.join(process.cwd(), 'src/data/partnerLocations.js');
const sleepMs = Number(process.argv[2] || 2200);

const normalizeCountry = (country) =>
  country === 'SI' ? 'SLO' : country === 'BA' ? 'BIH' : country;

const countryVariants = (country) => {
  const c = normalizeCountry(country);
  if (c === 'SLO') return ['SLO', 'SI', 'Slovenia'];
  if (c === 'BIH') return ['BIH', 'BA', 'Bosnia and Herzegovina', 'Bosna i Hercegovina'];
  if (c === 'HR') return ['HR', 'Croatia', 'Hrvatska'];
  if (c === 'RS') return ['RS', 'Serbia', 'Srbija'];
  return [c];
};

const stripDiacritics = (value) =>
  String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function cleanAddress(address) {
  return String(address)
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ', ')
    .replace(/\s+bb\b/gi, '')
    .replace(/\([^)]*\)/g, '')
    .trim();
}

function buildQueries(entry) {
  const countries = countryVariants(entry.country);
  const cleanedAddress = cleanAddress(entry.address);
  const cleanedCity = cleanAddress(entry.city);
  const cleanedAddressAscii = stripDiacritics(cleanedAddress);
  const cleanedCityAscii = stripDiacritics(cleanedCity);
  const postal = (cleanedAddress.match(/\b\d{4,5}\b/) || [])[0] || '';

  const queries = [];

  for (const country of countries) {
    queries.push(`${cleanedAddress}, ${cleanedCity}, ${country}`);
    queries.push(`${cleanedAddress}, ${country}`);
    queries.push(`${cleanedCity}, ${country}`);
    if (postal) {
      queries.push(`${postal} ${cleanedCity}, ${country}`);
      queries.push(`${postal}, ${country}`);
    }
    queries.push(`${cleanedAddressAscii}, ${cleanedCityAscii}, ${country}`);
    queries.push(`${cleanedAddressAscii}, ${country}`);
    queries.push(`${cleanedCityAscii}, ${country}`);
  }

  return [
    ...new Set(
      queries
        .map((q) => q.replace(/\s+/g, ' ').trim())
        .filter((q) => q.length > 0)
    ),
  ];
}

async function geocodeWithRetries(entry, pauseMs) {
  const queries = buildQueries(entry);
  for (const q of queries) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      q
    )}`;
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'armal-geocode-refine/1.0' },
      });
      const data = await res.json();
      if (Array.isArray(data) && data[0]) {
        const lat = Number(data[0].lat);
        const lng = Number(data[0].lon);
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          return { lat, lng, matchedQuery: q };
        }
      }
    } catch {
      // try next query
    }
    await new Promise((resolve) => setTimeout(resolve, pauseMs));
  }
  return { lat: null, lng: null, matchedQuery: null };
}

function parseEntries(fileText) {
  const blockRegex = /  \{[\s\S]*?\n  \},/g;
  const matches = [...fileText.matchAll(blockRegex)];
  return matches.map((match) => {
    const block = match[0];
    const id = (block.match(/id: '([^']+)'/) || [])[1];
    const name = (block.match(/name: '([^']*)'/) || [])[1];
    const country = (block.match(/country: '([^']+)'/) || [])[1];
    const address = (block.match(/address: '([^']*)'/) || [])[1];
    const city = (block.match(/city: '([^']*)'/) || [])[1];
    const lat = (block.match(/lat: ([^,\n]+)/) || [])[1];
    const lng = (block.match(/lng: ([^,\n]+)/) || [])[1];
    return {
      block,
      start: match.index,
      end: match.index + block.length,
      id,
      name,
      country,
      address,
      city,
      lat,
      lng,
    };
  });
}

async function run() {
  let fileText = fs.readFileSync(partnerFilePath, 'utf8');
  let entries = parseEntries(fileText);
  const targets = entries.filter((e) => e.lat === 'null' && e.lng === 'null' && /_(\d+)$/.test(e.id));

  let updatedCount = 0;
  for (const target of targets) {
    const { lat, lng } = await geocodeWithRetries(target, sleepMs);
    if (lat == null || lng == null) continue;

    const latRegex = new RegExp(`(id: '${target.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[\\s\\S]*?lat: )null(,)`);
    const lngRegex = new RegExp(`(id: '${target.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[\\s\\S]*?lng: )null(,)`);
    fileText = fileText.replace(latRegex, `$1${lat}$2`);
    fileText = fileText.replace(lngRegex, `$1${lng}$2`);
    updatedCount += 1;
  }

  fs.writeFileSync(partnerFilePath, fileText, 'utf8');

  // Re-parse for report
  entries = parseEntries(fileText);
  const stillNull = entries
    .filter((e) => e.lat === 'null' && e.lng === 'null' && /_(\d+)$/.test(e.id))
    .map((e) => e.id);

  console.log('updated_count', updatedCount);
  console.log('remaining_null_count', stillNull.length);
  console.log('remaining_null_ids', stillNull.join(','));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
