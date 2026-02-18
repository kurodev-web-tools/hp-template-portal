
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/assets/js/data.js');
const remotionPublicDir = path.join(__dirname, '../remotion-video/public');
const outputJsonPath = path.join(remotionPublicDir, 'templates.json');
const imagesDir = path.join(remotionPublicDir, 'images');

// Ensure directories exist
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

try {
    let dataContent = fs.readFileSync(dataPath, 'utf8');
    dataContent = dataContent.replace('const PORTAL_DATA', 'global.PORTAL_DATA');
    eval(dataContent);

    const data = global.PORTAL_DATA;
    const allTemplates = [];

    if (data && data.templates) {
        Object.values(data.templates).forEach(list => {
            if (Array.isArray(list)) {
                list.forEach(t => {
                    if (t.image && !t.image.includes('placeholder')) { // Filter valid images
                        allTemplates.push(t);
                    }
                });
            }
        });
    }

    // Shuffle and pick ALL (limit to 100 for sanity if needed, but let's go for max impact)
    const selected = allTemplates.sort(() => 0.5 - Math.random());

    const remotionData = selected.map((t, index) => {
        // Copy image to remotion-video/public/images/
        const srcPath = path.join(__dirname, '../public', t.image);
        const ext = path.extname(t.image);
        const newFileName = `template-${index}${ext}`;
        const destPath = path.join(imagesDir, newFileName);

        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${t.image} to ${newFileName}`);
            return {
                name: t.name,
                image: `/images/${newFileName}`, // Path relative to Remotion public root
                category: t.category || '',
            };
        } else {
            console.warn(`Warning: Image not found ${srcPath}`);
            return null;
        }
    }).filter(Boolean);

    fs.writeFileSync(outputJsonPath, JSON.stringify(remotionData, null, 2));
    console.log(`Exported ${remotionData.length} templates to ${outputJsonPath}`);

} catch (err) {
    console.error('Error extracting template data:', err);
    process.exit(1);
}
