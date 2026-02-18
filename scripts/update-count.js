const fs = require('fs');
const path = require('path');

// Paths
const dataPath = path.join(__dirname, '../public/assets/js/data.js');
const indexPath = path.join(__dirname, '../public/index.html');

try {
    // 1. Read data.js
    console.log('Reading data.js...');
    let dataContent = fs.readFileSync(dataPath, 'utf8');

    // Hack: Replace 'const PORTAL_DATA' with 'global.PORTAL_DATA' to load it into global scope
    // We can't use 'require' because it's not a module
    dataContent = dataContent.replace('const PORTAL_DATA', 'global.PORTAL_DATA');

    // Execute data.js in the current context
    eval(dataContent);

    const data = global.PORTAL_DATA;

    // 2. Count Total Templates
    let totalTemplates = 0;
    if (data && data.templates) {
        Object.values(data.templates).forEach(categoryList => {
            if (Array.isArray(categoryList)) {
                totalTemplates += categoryList.length;
            }
        });
    }

    console.log(`Total Templates Found: ${totalTemplates}`);

    // 3. Update index.html
    console.log('Reading index.html...');
    let indexHtml = fs.readFileSync(indexPath, 'utf8');

    // Regex to find "XX+ Premium Designs" (allowing for existing numbers)
    // We look for: number literal + "+ Premium Designs"
    const regex = /(\d+)\+ Premium Designs/;

    if (regex.test(indexHtml)) {
        const currentMatch = indexHtml.match(regex)[1];
        if (currentMatch !== totalTemplates.toString()) {
            console.log(`Updating count from ${currentMatch} to ${totalTemplates}...`);
            const newHtml = indexHtml.replace(regex, `${totalTemplates}+ Premium Designs`);
            fs.writeFileSync(indexPath, newHtml, 'utf8');
            console.log('index.html updated successfully!');
        } else {
            console.log('Count is already up to date.');
        }
    } else {
        console.warn('Warning: Could not find "XX+ Premium Designs" pattern in index.html. Please check the file.');
    }

} catch (err) {
    console.error('Error updating template count:', err);
    process.exit(1);
}
