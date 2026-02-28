const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Configuration
const BASE_URL = `http://127.0.0.1:8788`;
// Updated to Mobile Viewport (iPhone 12/13/14 Pro dimensions)
const VIEWPORT = { width: 390, height: 844, isMobile: true, hasTouch: true };
const PUBLIC_DIR = path.join(__dirname, '../public');
const TEMPLATES_DIR = path.join(PUBLIC_DIR, 'templates');
const THUMBNAILS_DIR = path.join(PUBLIC_DIR, 'assets/thumbnails');

const CATEGORIES = [
    { dir: 'portfolio', prefix: 'pf_' }
];

async function main() {
    // 1. Ensure output directories exist
    CATEGORIES.forEach(cat => {
        const dir = path.join(THUMBNAILS_DIR, cat.dir);
        if (!fs.existsSync(dir)) {
            console.log(`Creating directory: ${dir}`);
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    console.log(`Using existing DEV server at ${BASE_URL}...`);

    let browser;
    try {
        console.log('Launching browser (Mobile Mode)...');
        browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        // Emulate Mobile Device
        await page.setViewport(VIEWPORT);
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');

        // 3. Process each category
        for (const cat of CATEGORIES) {
            const catDir = path.join(TEMPLATES_DIR, cat.dir);
            if (!fs.existsSync(catDir)) {
                console.warn(`Category directory not found: ${catDir}`);
                continue;
            }

            // Get subdirectories (a, b, c...)
            const subdirs = fs.readdirSync(catDir).filter(f => {
                return fs.statSync(path.join(catDir, f)).isDirectory();
            });

            console.log(`Processing ${cat.dir}: ${subdirs.length} templates found.`);

            for (const subdir of subdirs) {
                const templateIdx = path.join(catDir, subdir, 'index.html');
                if (!fs.existsSync(templateIdx)) continue;

                const url = `${BASE_URL}/templates/${cat.dir}/${subdir}/`;
                const filename = `${cat.prefix}${subdir}.webp`;
                const outputPath = path.join(THUMBNAILS_DIR, cat.dir, filename);

                console.log(`  Capturing ${cat.dir}/${subdir} => ${filename}`);

                try {
                    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
                    // Provide a delay for animations/layout shift (10s)
                    await new Promise(r => setTimeout(r, 10000));

                    // Capture as WebP
                    await page.screenshot({ path: outputPath, type: 'webp', quality: 80 });
                } catch (err) {
                    console.error(`  Error capturing ${url}:`, err.message);
                }
            }
        }

    } catch (e) {
        console.error('Fatal error:', e);
    } finally {
        if (browser) await browser.close();

        // Force exit to ensure script finishes
        process.exit(0);
    }
}

main();
