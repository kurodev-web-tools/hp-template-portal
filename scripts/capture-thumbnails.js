const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Configuration
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const VIEWPORT = { width: 1280, height: 800 };
const PUBLIC_DIR = path.join(__dirname, '../public');
const TEMPLATES_DIR = path.join(PUBLIC_DIR, 'templates');
const THUMBNAILS_DIR = path.join(PUBLIC_DIR, 'assets/thumbnails');

// Category mapping
// Prefixes must match assets/js/data.js
const CATEGORIES = [
    { dir: 'business', prefix: 'bus_' },
    { dir: 'streamer', prefix: 'st_' }, // Changed str_ to st_ to match data.js
    { dir: 'lp', prefix: 'lp_' }
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

    // 2. Start Local Server
    console.log('Starting local server...');
    const server = spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', ['serve', 'public', '-p', `${PORT}`], {
        cwd: path.join(__dirname, '..'), // Run from root
        stdio: 'inherit',
        shell: true
    });

    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 3000));

    let browser;
    try {
        console.log('Launching browser...');
        browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport(VIEWPORT);

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
                const filename = `${cat.prefix}${subdir}.webp`; // Changed to .webp
                const outputPath = path.join(THUMBNAILS_DIR, cat.dir, filename);

                console.log(`  Capturing ${cat.dir}/${subdir} => ${filename}`);

                try {
                    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 }); // Increased timeout
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

        console.log('Stopping server...');
        server.kill();
        // Force exit to ensure server process dies
        process.exit(0);
    }
}

main();
