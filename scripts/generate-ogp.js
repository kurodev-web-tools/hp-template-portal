const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            headless: 'new'
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 630 });

        const originalScreenshotPath = path.resolve('C:/Users/taka/.gemini/antigravity/brain/eaae6d3c-76dd-4bde-9cfa-266d18c697e9/og_screenshot_1771901268998.png');

        // Read file and convert to base64 to ensure it loads synchronously
        const imgBuffer = fs.readFileSync(originalScreenshotPath);
        const base64Image = 'data:image/png;base64,' + imgBuffer.toString('base64');

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        width: 1200px;
                        height: 630px;
                        background-image: url("${base64Image}");
                        background-size: cover;
                        background-position: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        font-family: 'Inter', sans-serif;
                        position: relative;
                        overflow: hidden;
                    }
                    .overlay {
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: rgba(0, 0, 0, 0.5); /* slightly darker */
                        z-index: 1;
                    }
                    .content {
                        position: relative;
                        z-index: 2;
                        text-align: center;
                        color: white;
                    }
                    h1 {
                        font-size: 90px;
                        font-weight: 800;
                        letter-spacing: -3px;
                        margin: 0 0 15px 0;
                        text-shadow: 0 4px 20px rgba(0,242,255,0.6);
                    }
                    p {
                        font-size: 34px;
                        color: #00f2ff;
                        margin: 0;
                        font-weight: 600;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                    }
                </style>
            </head>
            <body>
                <div class="overlay"></div>
                <div class="content">
                    <h1>HP TEMPLATES</h1>
                    <p>Design Your Future</p>
                </div>
            </body>
            </html>
        `;

        await page.setContent(html, { waitUntil: 'networkidle0' });
        // wait a tiny bit to ensure google fonts are rendered
        await new Promise(resolve => setTimeout(resolve, 1500));

        await page.screenshot({ path: path.join(__dirname, '../public/assets/images/og-image.png') });
        await browser.close();
        console.log('Successfully saved to public/assets/images/og-image.png');
    } catch (e) {
        console.error("Puppeteer Error:", e);
    }
})();
