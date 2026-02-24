const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'public', 'templates', 'portfolio');
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

let structures = {};

letters.forEach(letter => {
    const filePath = path.join(templatesDir, letter, 'index.html');
    if (fs.existsSync(filePath)) {
        const html = fs.readFileSync(filePath, 'utf-8');

        // Extract the content inside <main> or body
        let structuralContainer = '';
        const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
        if (mainMatch) {
            structuralContainer = mainMatch[1];
        } else {
            const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
            if (bodyMatch) {
                structuralContainer = bodyMatch[1].replace(/<header[^>]*>([\s\S]*?)<\/header>/gi, '').replace(/<footer[^>]*>([\s\S]*?)<\/footer>/gi, '');
            }
        }

        // Clean up non-structural elements
        structuralContainer = structuralContainer.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        structuralContainer = structuralContainer.replace(/<!--[\s\S]*?-->/g, '');
        structuralContainer = structuralContainer.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '<svg>'); // collapse svg

        // Keep ONLY high-level structural tags, ignore spans, a, p, br, content tags
        // Keep section, article, div (if it contains other block elements), ul, li, h1, h2, h3
        const tags = [...structuralContainer.matchAll(/<\/?([a-zA-Z0-9]+)[^>]*>/g)]
            .map(m => m[1].toLowerCase())
            .filter(t => ['section', 'article', 'div', 'ul', 'li', 'h1', 'h2', 'h3', 'nav', 'main', 'header', 'footer'].includes(t));

        // We just want a sequence of tags
        const skeleton = tags.join(' > ');

        if (!structures[skeleton]) {
            structures[skeleton] = [];
        }
        structures[skeleton].push(letter.toUpperCase());
    }
});

console.log("=== SEMANTIC STRUCTURAL OVERLAP ===");
let foundClones = false;
for (const [skeleton, templates] of Object.entries(structures)) {
    if (templates.length > 1) {
        foundClones = true;
        console.log(`\nSemantic overlap found in: [${templates.join(', ')}]`);
        console.log(`Tags: ${skeleton.substring(0, 100)}...`);
    }
}
if (!foundClones) {
    console.log("No semantic overlap found.");
}
