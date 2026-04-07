const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT_DIR, 'public', 'templates');
const HTML_EXTENSIONS = new Set(['.html']);

const REQUIRED_PATTERNS = [
    { key: 'title', pattern: /<title>[\s\S]*?<\/title>/i },
    { key: 'description', pattern: /<meta\s+name=["']description["'][^>]*content=["'][^"']+["'][^>]*>/i },
    { key: 'canonical', pattern: /<link\s+rel=["']canonical["'][^>]*href=["'][^"']+["'][^>]*>/i },
    { key: 'og:title', pattern: /<meta\s+property=["']og:title["'][^>]*content=["'][^"']+["'][^>]*>/i },
    { key: 'og:description', pattern: /<meta\s+property=["']og:description["'][^>]*content=["'][^"']+["'][^>]*>/i },
    { key: 'og:url', pattern: /<meta\s+property=["']og:url["'][^>]*content=["'][^"']+["'][^>]*>/i },
    { key: 'og:image', pattern: /<meta\s+property=["']og:image["'][^>]*content=["'][^"']+["'][^>]*>/i },
    { key: 'robots', pattern: /<meta\s+name=["']robots["'][^>]*content=["'][^"']+["'][^>]*>/i },
];

const PLACEHOLDER_PATTERNS = [
    { key: 'example-domain', pattern: /example\.(?:com|jp)/i },
    { key: 'localhost', pattern: /localhost(?::\d+)?/i },
];

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

function findMissingSignals(content) {
    return REQUIRED_PATTERNS
        .filter(({ pattern }) => !pattern.test(content))
        .map(({ key }) => key);
}

function findPlaceholderSignals(content) {
    return PLACEHOLDER_PATTERNS
        .filter(({ pattern }) => pattern.test(content))
        .map(({ key }) => key);
}

function hasStructuredDataUrl(content) {
    return /<script[^>]*application\/ld\+json[^>]*>[\s\S]*?"url"\s*:\s*"[^"]+"[\s\S]*?<\/script>/i.test(content);
}

function auditFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const missing = findMissingSignals(content);
    const placeholders = findPlaceholderSignals(content);
    const missingStructuredDataUrl = !hasStructuredDataUrl(content);

    return {
        file: path.relative(ROOT_DIR, filePath).replace(/\\/g, '/'),
        missing,
        placeholders,
        missingStructuredDataUrl,
    };
}

function main() {
    const htmlFiles = listHtmlFiles(TEMPLATES_DIR);
    const results = htmlFiles.map(auditFile).filter((result) => {
        return result.missing.length > 0 || result.placeholders.length > 0 || result.missingStructuredDataUrl;
    });

    if (results.length === 0) {
        console.log('No metadata issues found.');
        return;
    }

    console.error(`Metadata issues found in ${results.length} file(s).`);
    for (const result of results) {
        console.error(`- ${result.file}`);
        if (result.missing.length > 0) {
            console.error(`  missing: ${result.missing.join(', ')}`);
        }
        if (result.missingStructuredDataUrl) {
            console.error('  missing: structured-data:url');
        }
        if (result.placeholders.length > 0) {
            console.error(`  placeholders: ${result.placeholders.join(', ')}`);
        }
    }

    process.exitCode = 1;
}

if (require.main === module) {
    main();
}

module.exports = {
    auditFile,
    hasStructuredDataUrl,
    listHtmlFiles,
};
