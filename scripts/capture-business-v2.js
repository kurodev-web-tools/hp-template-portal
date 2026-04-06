const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');

const BASE_URL = 'http://127.0.0.1:8788';
const ROOT_DIR = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public/assets/images/thumbnails/business_v2');
const BUSINESS_TEMPLATE_DIR = path.join(ROOT_DIR, 'public/templates/business');
const CHROME_CANDIDATES = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];

const BUSINESS_TAGS = 'abcdefghijklmnopqrstuvwxyz'.split('');

const DEFAULT_CAPTURE_OPTIONS = {
    viewport: {
        width: 1440,
        height: 1600,
        deviceScaleFactor: 1,
        isMobile: false,
    },
    scrollY: 0,
    waitAfterLoadMs: 2200,
    settleDelayMs: 600,
    outputQuality: 82,
    clipWidth: 900,
    clipHeight: 1200,
    clipTop: 120,
    focusX: 0.5,
    clipScale: 1,
    hideSelectors: [
        'header',
        '.mobile-menu-toggle',
        '.clean-mobile-toggle',
        '.portal-nav-back',
        '.back-button',
        '#mobile-header',
    ],
};

const TEMPLATE_OVERRIDES = {
    b: { scrollY: 120, focusX: 0.56 },
    d: { scrollY: 110 },
    g: { scrollY: 120 },
    h: { scrollY: 80 },
    j: { scrollY: 150, focusX: 0.54 },
    m: { scrollY: 170, clipScale: 0.92 },
    q: { scrollY: 90, clipScale: 0.92 },
    r: { scrollY: 120, clipScale: 0.94 },
    s: { scrollY: 80, clipScale: 0.94 },
    t: { scrollY: 90, clipScale: 0.95 },
    w: { scrollY: 240, clipScale: 0.8, focusX: 0.6 },
    x: { scrollY: 200, clipScale: 0.9, focusX: 0.55 },
    y: { scrollY: 120, clipScale: 0.92 },
};

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getBusinessTemplateUrl(tag) {
    return `${BASE_URL}/templates/business/${tag}/`;
}

function getBusinessTemplateFileUrl(tag) {
    const filePath = path.join(BUSINESS_TEMPLATE_DIR, tag, 'index.html');
    return `file:///${filePath.replace(/\\/g, '/')}`;
}

function getBusinessV2OutputPath(tag) {
    return path.join(OUTPUT_DIR, `${tag}.jpg`);
}

function computeClip(options) {
    const width = Math.round(options.clipWidth * options.clipScale);
    const height = Math.round(options.clipHeight * options.clipScale);
    const maxX = options.viewport.width - width;
    const x = Math.round(clamp((options.viewport.width - width) * options.focusX, 0, maxX));

    return {
        x,
        y: options.clipTop,
        width,
        height,
    };
}

function resolveCapturePlan(tag, override = {}, source = 'server') {
    const merged = {
        ...DEFAULT_CAPTURE_OPTIONS,
        ...override,
        viewport: {
            ...DEFAULT_CAPTURE_OPTIONS.viewport,
            ...(override.viewport || {}),
        },
        hideSelectors: override.hideSelectors || DEFAULT_CAPTURE_OPTIONS.hideSelectors,
    };

    return {
        tag,
        url: source === 'file' ? getBusinessTemplateFileUrl(tag) : getBusinessTemplateUrl(tag),
        outputPath: getBusinessV2OutputPath(tag),
        viewport: merged.viewport,
        scrollY: merged.scrollY,
        waitAfterLoadMs: merged.waitAfterLoadMs,
        settleDelayMs: merged.settleDelayMs,
        outputQuality: merged.outputQuality,
        hideSelectors: merged.hideSelectors,
        clip: computeClip(merged),
    };
}

async function preparePage(page, plan) {
    await page.setViewport(plan.viewport);
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    );
    await page.goto(plan.url, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(plan.waitAfterLoadMs);

    await page.evaluate(({ selectors, scrollY }) => {
        selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((element) => {
                element.style.setProperty('display', 'none', 'important');
            });
        });

        window.scrollTo({ top: scrollY, behavior: 'instant' });
    }, { selectors: plan.hideSelectors, scrollY: plan.scrollY });

    await delay(plan.settleDelayMs);
}

async function captureTag(page, tag) {
    const source = process.env.BUSINESS_CAPTURE_SOURCE === 'file' ? 'file' : 'server';
    const plan = resolveCapturePlan(tag, TEMPLATE_OVERRIDES[tag], source);
    await preparePage(page, plan);

    await page.screenshot({
        path: plan.outputPath,
        type: 'jpeg',
        quality: plan.outputQuality,
        clip: plan.clip,
    });

    return plan;
}

async function main() {
    const requestedTags = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
    const tags = requestedTags.length > 0 ? requestedTags : BUSINESS_TAGS;
    const invalidTags = tags.filter((tag) => !BUSINESS_TAGS.includes(tag));

    if (invalidTags.length > 0) {
        console.error(`Unknown business template tag(s): ${invalidTags.join(', ')}`);
        process.exit(1);
    }

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const source = process.env.BUSINESS_CAPTURE_SOURCE === 'file' ? 'file' : 'server';
    const executablePath = CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate));
    const launchArgs = ['--no-sandbox', '--disable-setuid-sandbox'];

    if (source === 'file') {
        launchArgs.push('--allow-file-access-from-files');
    }

    const browser = await puppeteer.launch({
        headless: 'new',
        executablePath,
        args: launchArgs,
    });

    try {
        const page = await browser.newPage();

        for (const tag of tags) {
            const plan = await captureTag(page, tag);
            console.log(`Captured ${tag.toUpperCase()} -> ${path.relative(ROOT_DIR, plan.outputPath)}`);
        }
    } finally {
        await browser.close();
    }
}

if (require.main === module) {
    main().catch((error) => {
        console.error(error);
        process.exit(1);
    });
}

module.exports = {
    BASE_URL,
    BUSINESS_TAGS,
    DEFAULT_CAPTURE_OPTIONS,
    TEMPLATE_OVERRIDES,
    CHROME_CANDIDATES,
    computeClip,
    getBusinessTemplateFileUrl,
    getBusinessTemplateUrl,
    getBusinessV2OutputPath,
    resolveCapturePlan,
};
