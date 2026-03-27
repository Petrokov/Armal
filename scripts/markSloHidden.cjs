const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/data/partnerLocations.js');
let text = fs.readFileSync(filePath, 'utf8');

const regex = /country: 'SLO',\n(\s*)(?!\/\/ SLO address hidden from map\n\1disabledOnMap: true,\n)/g;
let marked = 0;

text = text.replace(regex, (match, indent) => {
  marked += 1;
  return `country: 'SLO',\n${indent}// SLO address hidden from map\n${indent}disabledOnMap: true,\n`;
});

fs.writeFileSync(filePath, text, 'utf8');
console.log('marked_slo_entries', marked);
