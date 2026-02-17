const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/assets/js/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Regex to find image property and add bgPosition after it if it doesn't exist yet
// Looking for: image: 'assets/thumbnails/...'
// We also capture the whitespace to maintain indentation
const regex = /(\s+)(image: 'assets\/thumbnails\/[^']+',)/g;

if (!content.includes('bgPosition:')) {
    const newContent = content.replace(regex, '$1$2$1bgPosition: \'center 10%\', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)');
    fs.writeFileSync(dataPath, newContent, 'utf8');
    console.log('Successfully added bgPosition to all templates.');
} else {
    console.log('bgPosition already exists in data.js. Skipping.');
}
