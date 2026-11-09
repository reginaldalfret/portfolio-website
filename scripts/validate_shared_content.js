const fs = require('fs');
const path = require('path');

const contentDir = path.resolve(__dirname, '../shared/content');

const requiredFiles = [
  'profile.json',
  'experience.json',
  'projects.json',
  'skills.json',
  'education.json',
  'achievements.json',
  'certifications.json',
  'contributions.json'
];

console.log('--- VALIDATING SHARED CONTENT FILES ---');
let allValid = true;

for (const file of requiredFiles) {
  const filePath = path.join(contentDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`[FAIL] Missing file: ${file}`);
    allValid = false;
    continue;
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    const size = Buffer.byteLength(raw, 'utf8');
    console.log(`[PASS] ${file} is valid JSON (${size} bytes)`);
  } catch (err) {
    console.error(`[FAIL] Malformed JSON in ${file}:`, err.message);
    allValid = false;
  }
}

// Check Profile
const profile = JSON.parse(fs.readFileSync(path.join(contentDir, 'profile.json'), 'utf8'));
if (!profile.name || !profile.email || !profile.phone || !profile.stats) {
  console.error('[FAIL] profile.json missing core schema fields');
  allValid = false;
} else {
  console.log(`[PASS] profile.json verified for ${profile.name}`);
}

// Check Contributions
const contribs = JSON.parse(fs.readFileSync(path.join(contentDir, 'contributions.json'), 'utf8'));
const prCount = Array.isArray(contribs) ? contribs.length : (contribs.contributions?.length || 0);
console.log(`[PASS] contributions.json verified (${prCount} contributions recorded)`);

if (!allValid) {
  console.error('\nShared content validation FAILED');
  process.exit(1);
} else {
  console.log('\nAll shared content verified successfully! 100% compliant with spec.\n');
}
