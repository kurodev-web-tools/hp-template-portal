const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    // Launch headless browser
    const browser = await puppeteer.launch({ headless: 'new' });
    const templatesDir = path.join(__dirname, '../public/templates/business');
    const templates = fs.readdirSync(templatesDir).filter(t => t.length === 1 && fs.statSync(path.join(templatesDir, t)).isDirectory());
    const pages = ['index.html', 'about.html', 'service.html', 'contact.html'];

    const viewports = [
        { name: 'PC', width: 1280, height: 800 },
        { name: 'Mobile', width: 375, height: 667, isMobile: true }
    ];

    let hasErrors = false;
    let checkedCount = 0;

    console.log(`Starting verification for ${templates.length} templates (${templates.length * 4} pages) across PC and Mobile...`);

    for (const t of templates) {
        for (const p of pages) {
            const pagePath = path.resolve(templatesDir, t, p);
            const url = `file:///${pagePath.replace(/\\/g, '/')}`;
            const page = await browser.newPage();

            for (const vp of viewports) {
                await page.setViewport(vp);

                try {
                    const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
                    if (checkedCount % 10 === 0) console.log(`Verified ${checkedCount} views...`);
                    if (!response || !response.ok()) {
                        console.log(`❌ [${vp.name}] ${t}/${p} - HTTP Error: ${response ? response.status() : 'Unknown'}`);
                        hasErrors = true;
                        continue;
                    }

                    // Check horizontal overflow (見切れ)
                    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

                    if (overflow) {
                        const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: window.innerWidth }));
                        console.log(`❌ [${vp.name}] ${t}/${p} - Horizontal Overflow (scrollWidth: ${widths.scroll}, innerWidth: ${widths.inner})`);
                        hasErrors = true;
                    }

                    // Check broken images
                    const brokenImages = await page.evaluate(() => {
                        const imgs = document.querySelectorAll('img');
                        let broken = 0;
                        for (const img of imgs) {
                            if (img.complete && img.naturalWidth === 0) broken++;
                        }
                        return broken;
                    });

                    if (brokenImages > 0) {
                        console.log(`❌ [${vp.name}] ${t}/${p} - ${brokenImages} Broken Images detected!`);
                        hasErrors = true;
                    }

                    checkedCount++;

                } catch (e) {
                    console.log(`❌ [${vp.name}] ${t}/${p} - Navigation/Timeout Error: ${e.message}`);
                    hasErrors = true;
                }
            }
            await page.close();
        }
    }

    await browser.close();

    console.log('--------------------------------------------------');
    if (!hasErrors) {
        console.log(`✅ Success! All ${checkedCount} views verified. No horizontal overflows or broken images found.`);
    } else {
        console.log(`⚠️ Verification completed with some structural issues.`);
    }
    process.exit(hasErrors ? 1 : 0);
})();
