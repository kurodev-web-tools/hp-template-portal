const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/assets/js/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const lines = content.split('\n');
let currentLpTag = null;
let updatedCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect LP ID
    // example: id: 'lp_c', name: 'Campaign Flow', ...
    const idMatch = line.match(/id:\s*'lp_([a-z])'/);
    if (idMatch) {
        currentLpTag = idMatch[1];
    }

    // Detect image: ''
    // Only replacing if we found an lp_ tag recently and haven't reset it
    if (currentLpTag && line.includes("image: ''")) {
        // Replace
        const newLine = line.replace("image: ''", `image: 'assets/thumbnails/lp/lp_${currentLpTag}.webp'`);
        lines[i] = newLine;
        console.log(`Updated lp_${currentLpTag} image path.`);
        updatedCount++;
        currentLpTag = null; // Reset for next item
    }

    // Safety reset if we encounter closing brace without finding image
    if (line.trim() === '},') {
        currentLpTag = null;
    }
}

fs.writeFileSync(dataPath, lines.join('\n'), 'utf8');
console.log(`Done. Updated ${updatedCount} entries in data.js`);
