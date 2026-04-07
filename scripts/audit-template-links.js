const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT_DIR, 'public', 'templates');
const HTML_EXTENSIONS = new Set(['.html']);
const ATTR_PATTERN = /\b(?:href|src)=["']([^"']+)["']/gi;

function listHtmlFiles(dir) {
    const files = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...listHtmlFiles(fullPath));
            continue;
        }

        if (entry.isFile() && HTML_EXTENSIONS.has(path.extname(entry.name))) {
            files.push(fullPath);
        }
    }

    return files;
}

function shouldSkipTarget(target) {
    return (
        !target ||
        target.startsWith('#') ||
        target.startsWith('http://') ||
        target.startsWith('https://') ||
        target.startsWith('//') ||
        target.startsWith('mailto:') ||
        target.startsWith('tel:') ||
        target.startsWith('javascript:')
    );
}

function normalizeTarget(target) {
    return target.split('#')[0].split('?')[0];
}

function resolveTarget(htmlFilePath, rawTarget) {
    const target = normalizeTarget(rawTarget);

    if (!target) {
        return null;
    }

    if (target.startsWith('/')) {
        return path.join(ROOT_DIR, 'public', target.slice(1));
    }

    const resolved = path.resolve(path.dirname(htmlFilePath), target);
    if (path.extname(resolved)) {
        return resolved;
    }

    return path.join(resolved, 'index.html');
}

function findBrokenRefs(htmlFilePath) {
    const content = fs.readFileSync(htmlFilePath, 'utf8');
    const broken = [];
    let match;

    while ((match = ATTR_PATTERN.exec(content)) !== null) {
        const rawTarget = match[1].trim();
        if (shouldSkipTarget(rawTarget)) {
            continue;
        }

        const resolved = resolveTarget(htmlFilePath, rawTarget);
        if (!resolved || fs.existsSync(resolved)) {
            continue;
        }

        broken.push({
            file: path.relative(ROOT_DIR, htmlFilePath).replace(/\\/g, '/'),
            target: rawTarget,
            resolved: path.relative(ROOT_DIR, resolved).replace(/\\/g, '/'),
        });
    }

    return broken;
}

function main() {
    const htmlFiles = listHtmlFiles(TEMPLATES_DIR);
    const broken = htmlFiles.flatMap(findBrokenRefs);

    if (broken.length === 0) {
        console.log('No broken relative template links found.');
        return;
    }

    console.error(`Broken relative template links found: ${broken.length}`);
    for (const item of broken) {
        console.error(`- ${item.file}`);
        console.error(`  target:   ${item.target}`);
        console.error(`  resolved: ${item.resolved}`);
    }

    process.exitCode = 1;
}

if (require.main === module) {
    main();
}

module.exports = {
    listHtmlFiles,
    findBrokenRefs,
    resolveTarget,
    shouldSkipTarget,
};
