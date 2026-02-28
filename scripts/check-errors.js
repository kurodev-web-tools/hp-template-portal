const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request =>
        console.log('REQUEST FAILED:', request.url(), request.failure().errorText)
    );

    console.log('Navigating to Portfolio A...');
    await page.goto('http://127.0.0.1:8788/templates/portfolio/a/', { waitUntil: 'networkidle0' });

    console.log('Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    await browser.close();
})();
