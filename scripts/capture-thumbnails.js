const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = `http://127.0.0.1:8788`;
const PUBLIC_DIR = path.join(__dirname, '../public');
const TEMPLATES_DIR = path.join(PUBLIC_DIR, 'templates');
const THUMBNAILS_DIR = path.join(PUBLIC_DIR, 'assets/images/thumbnails');
const CHROME_CANDIDATES = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];

// コマンドライン引数からモードとカテゴリを取得
const MODE = process.argv[2] || 'mobile'; // 'mobile' | 'desktop' | 'x-social'
const TARGET_CATEGORY = process.argv[3] || 'all'; // 'all' | specific category name

// ビューポート定義
const VIEWPORTS = {
    mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
    desktop: { width: 1920, height: 1080, isMobile: false },
    'x-social': { width: 1200, height: 630, isMobile: false } // X 投稿用
};

// カテゴリ定義
const CATEGORIES = {
    portfolio: { dir: 'portfolio', outputDir: 'portfolio_v2', ext: 'jpg' },
    streamer: { dir: 'streamer', outputDir: 'streamer_v2', ext: 'jpg' },
    business: { dir: 'business', outputDir: 'business_v2', ext: 'jpg' },
    lp: { dir: 'lp', outputDir: 'lp_v2', ext: 'jpg' }
};

function getViewport() {
    const vp = VIEWPORTS[MODE] || VIEWPORTS.mobile;
    const modeLabel = MODE === 'mobile' ? 'Mobile' : MODE === 'desktop' ? 'Desktop' : 'X Social';
    console.log(`Viewport Mode: ${modeLabel} (${vp.width}x${vp.height})`);
    return vp;
}

function getTargetCategories() {
    if (TARGET_CATEGORY === 'all') {
        return Object.values(CATEGORIES);
    }
    const cat = CATEGORIES[TARGET_CATEGORY];
    return cat ? [cat] : [];
}

async function main() {
    const viewport = getViewport();
    const categories = getTargetCategories();

    if (categories.length === 0) {
        console.error(`Unknown category: ${TARGET_CATEGORY}`);
        console.error('Available categories: ' + Object.keys(CATEGORIES).join(', '));
        process.exit(1);
    }

    // 1. Ensure output directories exist
    categories.forEach(cat => {
        const dir = path.join(THUMBNAILS_DIR, cat.outputDir);
        if (!fs.existsSync(dir)) {
            console.log(`Creating directory: ${dir}`);
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    console.log(`Using existing DEV server at ${BASE_URL}...`);

    let browser;
    try {
        console.log('Launching browser...');
        const executablePath = CHROME_CANDIDATES.find(candidate => fs.existsSync(candidate));
        browser = await puppeteer.launch({
            headless: "new",
            executablePath,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        // Set viewport
        await page.setViewport(viewport);

        // Set user agent
        if (viewport.isMobile) {
            await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
        } else {
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
        }

        // 3. Process each category
        for (const cat of categories) {
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
                const filename = `${subdir}.${cat.ext}`;
                const outputPath = path.join(THUMBNAILS_DIR, cat.outputDir, filename);

                console.log(`  Capturing ${cat.dir}/${subdir} => ${filename}`);

                try {
                    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
                    // Provide a delay for animations/layout shift
                    await new Promise(r => setTimeout(r, 2000));

                    // Capture as JPEG to match current portal assets.
                    await page.screenshot({ path: outputPath, type: 'jpeg', quality: 82 });
                } catch (err) {
                    console.error(`  Error capturing ${url}:`, err.message);
                }
            }
        }

        console.log('Capture completed successfully!');

    } catch (e) {
        console.error('Fatal error:', e);
    } finally {
        if (browser) await browser.close();
        process.exit(0);
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    CATEGORIES,
    VIEWPORTS,
};
