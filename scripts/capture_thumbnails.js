const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    console.log('Starting batch thumbnail capture (C-Z)...');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 }); // Retain high quality

    // Targeted Re-capture (R, Z) - Maximum Delay
    const templates = ['r', 'z'];

    const outputDir = path.join(__dirname, '../public/assets/thumbnails/business');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const char of templates) {
        const fileUrl = `file://${path.join(__dirname, `../public/templates/business/${char}/index.html`).replace(/\\/g, '/')}`;
        const outputPath = path.join(outputDir, `bus_${char}.png`); // User will convert to WebP later

        console.log(`Processing Template ${char.toUpperCase()}...`);

        try {
            await page.goto(fileUrl, { waitUntil: 'networkidle0' });

            // SMART CAPTURE LOGIC
            await page.evaluate(() => {
                // 1. Hide Header Elements
                const selectors = [
                    'header',
                    '.mobile-menu-toggle',
                    '.clean-mobile-toggle',
                    '.portal-nav-back',
                    '.back-button',
                    '#mobile-header'
                ];
                selectors.forEach(s => {
                    document.querySelectorAll(s).forEach(el => el.style.setProperty('display', 'none', 'important'));
                });

                // 2. Smart Scroll (Center H1)
                const h1 = document.querySelector('h1');
                if (h1) {
                    const rect = h1.getBoundingClientRect();
                    const absoluteTop = window.scrollY + rect.top;
                    // Target: H1 center at 40% of viewport (approx 325px from top)
                    const targetScroll = absoluteTop - (812 * 0.4);
                    window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'instant' });
                }
            });

            // Wait for very slow animations (Safe buffer: 8000ms)
            await new Promise(r => setTimeout(r, 8000));

            await page.screenshot({ path: outputPath });
            console.log(`Saved: bus_${char}.png`);

        } catch (e) {
            console.error(`Failed to capture Template ${char}:`, e.message);
        }
    }

    await browser.close();
    console.log('Batch capture complete!');
})();
