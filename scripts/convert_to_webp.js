const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public/assets/thumbnails/streamer');

async function convert() {
    console.log(`Scanning: ${targetDir}`);

    if (!fs.existsSync(targetDir)) {
        console.error('Target directory not found!');
        return;
    }

    const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.png'));
    console.log(`Found ${files.length} PNG images.`);

    let originalTotalSize = 0;
    let newTotalSize = 0;

    for (const file of files) {
        const inputPath = path.join(targetDir, file);
        const outputPath = inputPath.replace('.png', '.webp');

        const stats = fs.statSync(inputPath);
        originalTotalSize += stats.size;

        try {
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);

            const newStats = fs.statSync(outputPath);
            newTotalSize += newStats.size;

            console.log(`Converted: ${file} (${(stats.size / 1024).toFixed(1)}KB -> ${(newStats.size / 1024).toFixed(1)}KB)`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }

    console.log('--- Conversion Complete ---');
    console.log(`Original Total: ${(originalTotalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`New Total:      ${(newTotalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Reduction:      ${((1 - newTotalSize / originalTotalSize) * 100).toFixed(1)}%`);
}

convert();
