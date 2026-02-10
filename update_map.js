const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public/templates/lp/u/world-map.svg'); // This now contains the new SVG
const htmlPath = path.join(__dirname, 'public/templates/lp/u/index.html');

try {
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Extract paths from SVG
    const gMatch = svgContent.match(/<g[^>]*>([\s\S]*?)<\/g>/);

    if (!gMatch) {
        console.error('Could not find <g> tag in SVG');
        process.exit(1);
    }

    let paths = gMatch[1];

    // Construct new SVG block
    // Using the same structure as before since the new SVG shares the same Potrace output format
    const newSvgBlock = `
                    <!-- World Map SVG (User Provided: 307294.svg) -->
                    <svg class="world-map" viewBox="0 0 1280 640" preserveAspectRatio="xMidYMid meet" fill="none">
                        <g transform="translate(0,640) scale(0.1,-0.1)" fill="currentColor" stroke="none">
                            ${paths}
                        </g>
                    </svg>`;

    // Replace the existing SVG block in HTML
    const updatedHtml = htmlContent.replace(
        /<svg class="world-map"[\s\S]*?<\/svg>/,
        newSvgBlock
    );

    fs.writeFileSync(htmlPath, updatedHtml, 'utf8');
    console.log('Successfully injected new SVG map into index.html');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
