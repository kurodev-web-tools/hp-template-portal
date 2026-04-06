const puppeteer = require('puppeteer');
(async() => {
  const browser = await puppeteer.launch({headless: 'new', executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--allow-file-access-from-files']});
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 2200, deviceScaleFactor: 1});
  await page.goto('file:///D:/hp-portal/.worktrees/q-template-improvement/public/templates/business/q/index.html', {waitUntil: 'networkidle0'});
  await page.screenshot({path: 'D:/hp-portal/output/q-index-desktop.png', fullPage: true});
  await page.setViewport({width: 390, height: 1600, deviceScaleFactor: 1});
  await page.goto('file:///D:/hp-portal/.worktrees/q-template-improvement/public/templates/business/q/index.html', {waitUntil: 'networkidle0'});
  await page.screenshot({path: 'D:/hp-portal/output/q-index-mobile.png', fullPage: true});
  await browser.close();
})();
