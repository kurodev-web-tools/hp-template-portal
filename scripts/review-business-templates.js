const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'public', 'templates', 'business');
const publicDir = path.join(__dirname, '..', 'public');
const outputDir = path.join(__dirname, '..', 'codexレビュー結果');
const reviewDate = '2026-03-15';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function listDirectTemplates(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => {
      if (entry.isFile()) {
        return entry.name.endsWith('.html');
      }
      if (!entry.isDirectory()) {
        return false;
      }
      const fullPath = path.join(dir, entry.name);
      return listFilesRecursive(fullPath).some((file) => file.endsWith('.html') && !file.includes(`${path.sep}_backup`));
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

function listFilesRecursive(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function extractCssReferences(content) {
  return [...content.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css)["'][^>]*>/gi)]
    .map((match) => path.basename(match[1].split('?')[0]));
}

function safeRelative(filePath) {
  return path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
}

function matchOne(content, regex) {
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function matchAll(content, regex) {
  const matches = content.match(regex);
  return matches || [];
}

function countRegex(content, regex) {
  return matchAll(content, regex).length;
}

function extractMeta(content, name, property = false) {
  const attr = property ? 'property' : 'name';
  const regex = new RegExp(`<meta[^>]*${attr}=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i');
  return matchOne(content, regex);
}

function extractTitle(content) {
  return matchOne(content, /<title>([\s\S]*?)<\/title>/i);
}

function extractLang(content) {
  return matchOne(content, /<html[^>]*lang=["']([^"']+)["']/i);
}

function extractCssVars(cssContent) {
  const vars = [];
  const regex = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(cssContent)) && vars.length < 6) {
    vars.push(`${match[1]}: ${match[2].trim()}`);
  }
  return vars;
}

function extractFontFamilies(content) {
  const fonts = [];
  const regex = /["']([A-Za-z0-9\s+-]+)["']\s*,\s*(?:serif|sans-serif|monospace)/g;
  let match;
  while ((match = regex.exec(content)) && fonts.length < 10) {
    fonts.push(match[1].trim());
  }
  return [...new Set(fonts)];
}

function extractClassPrefixes(content) {
  const classes = [];
  const regex = /class\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(content))) {
    match[1].split(/\s+/).forEach((cls) => {
      if (/^[a-z]+-[a-z0-9-]+$/i.test(cls) && !cls.startsWith('text-') && !cls.startsWith('bg-') && !cls.startsWith('grid-') && !cls.startsWith('flex-') && !cls.startsWith('border-') && !cls.startsWith('rounded-')) {
        classes.push(cls.split('-')[0]);
      }
    });
  }
  return [...new Set(classes)].slice(0, 8);
}

function stripHtml(content) {
  return content
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractIds(content) {
  const ids = [];
  const regex = /\bid\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(content))) {
    ids.push(match[1]);
  }
  return [...new Set(ids)];
}

function extractLinks(content) {
  const links = [];
  const regex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(content))) {
    links.push(match[1]);
  }
  return links;
}

function extractForms(content) {
  const forms = [];
  const formRegex = /<form\b([^>]*)>([\s\S]*?)<\/form>/gi;
  let match;
  while ((match = formRegex.exec(content))) {
    const attrs = match[1] || '';
    const body = match[2] || '';
    const actionMatch = attrs.match(/\baction=["']([^"']*)["']/i);
    const methodMatch = attrs.match(/\bmethod=["']([^"']*)["']/i);
    const submitButtons = (body.match(/<button\b[^>]*type=["']submit["'][^>]*>/gi) || []).length
      + (body.match(/<input\b[^>]*type=["']submit["'][^>]*>/gi) || []).length;
    const plainButtons = (body.match(/<button\b(?![^>]*type=)[^>]*>/gi) || []).length;
    forms.push({
      action: actionMatch ? actionMatch[1].trim() : '',
      method: methodMatch ? methodMatch[1].trim().toLowerCase() : '',
      hasOnsubmit: /\bonsubmit\s*=/.test(attrs),
      submitButtons,
      plainButtons,
    });
  }
  return forms;
}

function extractNumericClaims(content) {
  const text = stripHtml(content);
  const regex = /(?:\d{1,3}(?:[.,]\d{1,3})*(?:%|\+|x)|\d+(?:[.,]\d+)?\s?(?:min|ms|h|PB|TB|GB|MB|k|K|M|B|years?|regions?|countries?|clients?|projects?|members?|hours?))/g;
  const matches = text.match(regex) || [];
  return [...new Set(matches.map((item) => item.trim()))].slice(0, 8);
}

function extractFooterLinks(content) {
  const footerMatch = content.match(/<footer\b[\s\S]*?<\/footer>/i);
  if (!footerMatch) return [];
  return extractLinks(footerMatch[0]);
}

function stars(score) {
  const rounded = Math.max(1, Math.min(5, score));
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

function escapeMdCell(value) {
  return String(value || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function labelForScore(score) {
  if (score >= 5) return '優秀';
  if (score >= 4) return '良好';
  if (score >= 3) return '標準';
  if (score >= 2) return '要改善';
  return '要修正';
}

function summarizeTheme(firstPage) {
  const title = firstPage.title || 'タイトル未設定';
  const desc = firstPage.description || '説明未設定';
  return {
    title,
    catchcopy: desc.length > 70 ? `${desc.slice(0, 70)}...` : desc,
  };
}

function analyzePage(filePath) {
  const content = read(filePath);
  const title = extractTitle(content);
  const description = extractMeta(content, 'description');
  const viewport = extractMeta(content, 'viewport');
  const ogTitle = extractMeta(content, 'og:title', true);
  const ogDescription = extractMeta(content, 'og:description', true);
  const ogImage = extractMeta(content, 'og:image', true);
  const ogUrl = extractMeta(content, 'og:url', true);
  const twitterCard = extractMeta(content, 'twitter:card');
  const robots = extractMeta(content, 'robots');
  const ogLocale = extractMeta(content, 'og:locale', true);
  const ogType = extractMeta(content, 'og:type', true);
  const canonical = matchOne(content, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  const jsonLdUrlBlank = /"url"\s*:\s*""/.test(content);
  const jsonLdLogoBlank = /"logo"\s*:\s*""/.test(content);
  const lang = extractLang(content);
  const h1Count = countRegex(content, /<h1\b/gi);
  const h2Count = countRegex(content, /<h2\b/gi);
  const imgTags = matchAll(content, /<img\b[\s\S]*?>/gi);
  const missingAlt = imgTags.filter((tag) => !/\balt\s*=\s*["'][^"']*["']/i.test(tag)).length;
  const lazyCount = imgTags.filter((tag) => /\bloading\s*=\s*["']lazy["']/i.test(tag)).length;
  const externalImageUrls = new Set();
  const externalFonts = new Set();
  const externalScripts = new Set();
  const srcRegex = /\b(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  let srcMatch;
  while ((srcMatch = srcRegex.exec(content))) {
    const url = srcMatch[1];
    if (/^https?:\/\//i.test(url) || /^\/\//.test(url)) {
      if (/\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(url) || /googleusercontent|images\.unsplash|cloudinary/i.test(url)) {
        externalImageUrls.add(url);
      }
      if (/fonts\.googleapis|fonts\.gstatic|use\.typekit|fonts\.adobe/i.test(url)) {
        externalFonts.add(url);
      }
      if (/\.js(\?|$)/i.test(url)) {
        externalScripts.add(url);
      }
    }
  }
  const cssBgUrls = matchAll(content, /background-image:\s*url\((['"]?)(https?:\/\/[^)'"]+)\1\)/gi);
  for (const item of cssBgUrls) {
    const url = item.replace(/^background-image:\s*url\((['"]?)/i, '').replace(/['"]?\)$/i, '');
    externalImageUrls.add(url);
  }
  const ariaCount = countRegex(content, /\baria-[a-z-]+\s*=/gi);
  const formCount = countRegex(content, /<form\b/gi);
  const forms = extractForms(content);
  const placeholderCount = countRegex(content, /\{\{[A-Z0-9_:-]+\}\}/g);
  const onclickCount = countRegex(content, /\bonclick\s*=/gi);
  const buttonCount = countRegex(content, /<button\b/gi);
  const anchorHashLinks = matchAll(content, /\bhref=["']#([^"']+)["']/gi).length;
  const ids = extractIds(content);
  const links = extractLinks(content);
  const footerLinks = extractFooterLinks(content);
  const numericClaims = extractNumericClaims(content);

  return {
    content,
    filePath,
    relPath: safeRelative(filePath),
    title,
    description,
    descriptionLength: description.length,
    viewport: Boolean(viewport),
    ogTitle: Boolean(ogTitle),
    ogDescription: Boolean(ogDescription),
    ogImage: Boolean(ogImage),
    ogType: Boolean(ogType),
    ogUrl,
    ogUrlBlank: ogUrl === '',
    twitterCard: Boolean(twitterCard),
    robots: Boolean(robots),
    ogLocale: Boolean(ogLocale),
    canonical: Boolean(canonical),
    jsonLdUrlBlank,
    jsonLdLogoBlank,
    lang,
    h1Count,
    h2Count,
    imgCount: imgTags.length,
    missingAlt,
    lazyCount,
    externalImageUrls: [...externalImageUrls],
    externalFonts: [...externalFonts],
    externalScripts: [...externalScripts],
    ariaCount,
    formCount,
    forms,
    placeholderCount,
    onclickCount,
    buttonCount,
    anchorHashLinks,
    ids,
    links,
    footerLinks,
    numericClaims,
  };
}

function buildTree(templatePath, files) {
  const base = path.basename(templatePath);
  const lines = [base];
  for (const file of files) {
    const rel = path.relative(templatePath, file).replace(/\\/g, '/');
    lines.push(`- ${rel}`);
  }
  return lines.join('\n');
}

function collectTemplate(entry) {
  const fullPath = path.join(rootDir, entry.name);
  if (entry.isFile()) {
    return {
      key: path.basename(entry.name, '.html'),
      label: path.basename(entry.name, '.html'),
      type: 'single',
      basePath: rootDir,
      htmlFiles: [fullPath],
      cssFiles: [],
      jsFiles: [],
      backupDirs: [],
    };
  }

  const allFiles = listFilesRecursive(fullPath);
  const backupDirs = fs.readdirSync(fullPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name.startsWith('_backup'))
    .map((dirent) => dirent.name);
  const htmlFiles = allFiles.filter((file) => file.endsWith('.html') && !file.includes(`${path.sep}_backup`));
  const cssFiles = allFiles.filter((file) => file.endsWith('.css') && !file.includes(`${path.sep}_backup`));
  const jsFiles = allFiles.filter((file) => file.endsWith('.js') && !file.includes(`${path.sep}_backup`));

  return {
    key: entry.name,
    label: entry.name,
    type: 'folder',
    basePath: fullPath,
    htmlFiles,
    cssFiles,
    jsFiles,
    backupDirs,
  };
}

function buildTemplateDiagnostics(template, pages) {
  const pageMap = new Map(pages.map((page) => [path.basename(page.filePath), page]));
  const pageNames = new Set([...pageMap.keys()]);
  const jsContents = template.jsFiles.map((file) => read(file)).join('\n');
  const allContent = `${pages.map((page) => page.content).join('\n')}\n${jsContents}`;
  const submitHandlerDetected = /addEventListener\(\s*['"]submit['"]|\.onsubmit\s*=|handleSubmit|submitForm|fetch\(/i.test(jsContents)
    || pages.some((page) => /\bonsubmit\s*=|addEventListener\(\s*['"]submit['"]/i.test(page.content));

  const brokenLinks = [];
  const brokenFooterLinks = [];
  const brokenFragmentLinks = [];

  for (const page of pages) {
    for (const href of page.links) {
      if (!href || /^(https?:|\/\/|mailto:|tel:|javascript:)/i.test(href)) continue;
      const [filePartRaw, hashRaw] = href.split('#');
      const filePart = filePartRaw || '';
      const hash = hashRaw || '';

      if (!filePart && hash) {
        if (!page.ids.includes(hash)) {
          brokenFragmentLinks.push(`${path.basename(page.filePath)} -> #${hash}`);
        }
        continue;
      }

      const normalizedTarget = path.basename(filePart);
      const resolvedPath = path.resolve(path.dirname(page.filePath), filePart);
      const targetExistsOnDisk = fs.existsSync(resolvedPath);
      const targetIsPublicFile = resolvedPath.startsWith(publicDir);
      if (normalizedTarget && !pageNames.has(normalizedTarget) && !(targetExistsOnDisk && targetIsPublicFile)) {
        brokenLinks.push(`${path.basename(page.filePath)} -> ${href}`);
        if (page.footerLinks.includes(href)) {
          brokenFooterLinks.push(`${path.basename(page.filePath)} -> ${href}`);
        }
        continue;
      }

      if (normalizedTarget && hash) {
        const targetPage = pageMap.get(normalizedTarget);
        if (targetPage && !targetPage.ids.includes(hash)) {
          brokenFragmentLinks.push(`${path.basename(page.filePath)} -> ${href}`);
          if (page.footerLinks.includes(href)) {
            brokenFooterLinks.push(`${path.basename(page.filePath)} -> ${href}`);
          }
        }
      }
    }
  }

  const numericPages = pages.filter((page) => page.numericClaims.length > 0);
  const numericAnnotationPages = numericPages.filter((page) => /数値は編集してください|Edit these values|編集してください|for your business/i.test(page.content));
  const metaCoverage = {
    ogTypeMissing: pages.filter((page) => !page.ogType).map((page) => path.basename(page.filePath)),
    twitterMissing: pages.filter((page) => !page.twitterCard).map((page) => path.basename(page.filePath)),
    robotsMissing: pages.filter((page) => !page.robots).map((page) => path.basename(page.filePath)),
    ogLocaleMissing: pages.filter((page) => !page.ogLocale).map((page) => path.basename(page.filePath)),
  };
  const formPages = pages.filter((page) => page.formCount > 0);
  const formsWithoutAction = formPages.flatMap((page) =>
    page.forms
      .filter((form) => !form.action)
      .map(() => path.basename(page.filePath))
  );
  const formsWithoutMethod = formPages.flatMap((page) =>
    page.forms
      .filter((form) => !form.method)
      .map(() => path.basename(page.filePath))
  );
  const formsWithoutHandler = formPages.flatMap((page) =>
    page.forms
      .filter((form) => !form.action && !form.hasOnsubmit && submitHandlerDetected === false)
      .map(() => path.basename(page.filePath))
  );

  const mobileTogglePresent = /mobile-toggle|menu-toggle|onclick\s*=\s*["'][^"']*toggle/i.test(allContent);
  const mobilePanelPresent = /mobile-menu/i.test(allContent);
  const backdropPresent = /menu-backdrop|backdrop/i.test(allContent);
  const ariaExpandedPresent = /\baria-expanded\s*=\s*["'](?:true|false)["']/i.test(allContent);
  const ariaControlsPresent = /\baria-controls\s*=\s*["'][^"']+["']/i.test(allContent);
  const escapeClosePresent = /event\.key\s*===?\s*['"]Escape['"]|key\s*===?\s*['"]Escape['"]/i.test(allContent);
  const scrollLockPresent = /body\.style\.overflow\s*=\s*['"]hidden['"]|document\.body\.style\.overflow\s*=\s*['"]hidden['"]|overflow-hidden/i.test(allContent);
  const backdropClosePresent = /backdrop[^;\n]*addEventListener\(\s*['"]click['"]|querySelector\([^)]*backdrop[^)]*\)[^;\n]*addEventListener\(\s*['"]click['"]|backdrop.*toggle/i.test(allContent);
  const menuLinkClosePresent = /mobile-menu a\[href\]|menuLinks\.forEach|querySelectorAll\([^)]*mobile-menu a/i.test(allContent);

  const implementedCount = [mobileTogglePresent, mobilePanelPresent, backdropPresent, ariaExpandedPresent, escapeClosePresent, scrollLockPresent, backdropClosePresent].filter(Boolean).length;
  const interactionStatus = !mobileTogglePresent
    ? 'missing'
    : (implementedCount >= 6 && ariaControlsPresent ? 'implemented' : implementedCount >= 4 ? 'partial' : 'missing');

    const referencedCssBasenames = [...new Set(pages.flatMap((page) => extractCssReferences(page.content)))];
    const styleCssContents = template.cssFiles
      .filter((file) => referencedCssBasenames.includes(path.basename(file)))
      .map((file) => ({ file, content: read(file) }));
    const tailwindCssFiles = styleCssContents
      .filter((item) => /@theme|@import "tailwindcss"|@custom-variant/i.test(item.content))
      .map((item) => path.basename(item.file));
    const customCssFiles = styleCssContents
      .filter((item) => !/@import "tailwindcss"|@theme|@custom-variant/i.test(item.content))
      .map((item) => path.basename(item.file));
  const darkClassPages = pages.filter((page) => /\bclass=["'][^"']*\bdark\b/i.test(page.content)).map((page) => path.basename(page.filePath));
  const fonts = [...new Set([
    ...styleCssContents.flatMap((item) => extractFontFamilies(item.content)),
    ...pages.flatMap((page) => extractFontFamilies(page.content)),
  ])].slice(0, 10);
  const classPrefixes = [...new Set(pages.flatMap((page) => extractClassPrefixes(page.content)))].slice(0, 10);
  const colorTokens = [...new Set(styleCssContents.flatMap((item) => extractCssVars(item.content)
    .filter((line) => /color|accent|bg|surface|gold|primary|ink|paper/i.test(line))))].slice(0, 8);
  const mixedDesignSystem = tailwindCssFiles.length > 0 && customCssFiles.length > 0 && pages.length > 4;
  const separateDashboardPages = pages
    .filter((page) => /analysis|settings|reports|workflows|network|library|archive|performance|strategy/i.test(path.basename(page.filePath)))
    .map((page) => path.basename(page.filePath));
  const langValues = [...new Set(pages.map((page) => page.lang).filter(Boolean))];
  const pagesWithDarkClass = pages.filter((page) => /\bclass=["'][^"']*\bdark\b/i.test(page.content)).map((page) => path.basename(page.filePath));
  const pagesWithoutDarkClass = pages.filter((page) => !/\bclass=["'][^"']*\bdark\b/i.test(page.content)).map((page) => path.basename(page.filePath));
    const namingConsistencyIssue = (pagesWithDarkClass.length > 0 && pagesWithoutDarkClass.length > 0)
      || langValues.length > 1;

  return {
    brokenLinks: [...new Set(brokenLinks)],
    brokenFooterLinks: [...new Set(brokenFooterLinks)],
    brokenFragmentLinks: [...new Set(brokenFragmentLinks)],
    numericPages: numericPages.map((page) => path.basename(page.filePath)),
    numericAnnotationPages: numericAnnotationPages.map((page) => path.basename(page.filePath)),
    numericExamples: numericPages.flatMap((page) => page.numericClaims).slice(0, 6),
    metaCoverage,
    formPages: formPages.map((page) => path.basename(page.filePath)),
    formsWithoutAction: [...new Set(formsWithoutAction)],
    formsWithoutMethod: [...new Set(formsWithoutMethod)],
    formsWithoutHandler: [...new Set(formsWithoutHandler)],
    submitHandlerDetected,
    interaction: {
      status: interactionStatus,
      mobileTogglePresent,
      mobilePanelPresent,
      backdropPresent,
      ariaExpandedPresent,
      ariaControlsPresent,
      escapeClosePresent,
      scrollLockPresent,
      backdropClosePresent,
      menuLinkClosePresent,
    },
    design: {
      tailwindCssFiles,
      customCssFiles,
      mixedDesignSystem,
      separateDashboardPages,
      darkClassPages,
      langValues,
      pagesWithDarkClass,
      pagesWithoutDarkClass,
      namingConsistencyIssue,
      fonts,
      classPrefixes,
      colorTokens,
    },
  };
}

function computeScores(template, pages) {
  const missingDescPages = pages.filter((page) => !page.description).length;
  const missingTitlePages = pages.filter((page) => !page.title).length;
  const missingViewportPages = pages.filter((page) => !page.viewport).length;
  const missingOgPages = pages.filter((page) => !page.ogTitle || !page.ogDescription || !page.ogImage).length;
  const missingCanonicalPages = pages.filter((page) => !page.canonical).length;
  const invalidH1Pages = pages.filter((page) => page.h1Count !== 1).length;
  const missingAltImages = pages.reduce((sum, page) => sum + page.missingAlt, 0);
  const externalImages = new Set(pages.flatMap((page) => page.externalImageUrls)).size;
  const externalFonts = new Set(pages.flatMap((page) => page.externalFonts)).size;
  const externalScripts = new Set(pages.flatMap((page) => page.externalScripts)).size;
  const placeholderPages = pages.filter((page) => page.placeholderCount > 0).length;
  const ariaSparsePages = pages.filter((page) => page.ariaCount === 0).length;
  const hasTailwind = template.cssFiles.some((file) => path.basename(file) === 'tailwind-built.css');
  const hasStyleCss = template.cssFiles.some((file) => path.basename(file) === 'style.css');
  const hasSharedJs = template.jsFiles.length > 0;

  let design = 5;
  if (!(hasTailwind || hasStyleCss)) design -= 2;
  if (template.backupDirs.length > 0) design -= 1;
  if (template.type === 'single') design -= 1;

  let codeQuality = 5;
  codeQuality -= Math.min(2, placeholderPages * 2);
  if (!hasSharedJs && template.type === 'folder') codeQuality -= 1;
  if (pages.some((page) => page.onclickCount > 0)) codeQuality -= 1;
  if (template.backupDirs.length > 0) codeQuality -= 1;

  let accessibility = 5;
  accessibility -= Math.min(2, invalidH1Pages);
  accessibility -= Math.min(2, missingAltImages > 0 ? 1 : 0);
  accessibility -= Math.min(1, ariaSparsePages > 0 ? 1 : 0);

  let seo = 5;
  seo -= Math.min(2, missingTitlePages + missingDescPages > 0 ? 2 : 0);
  seo -= Math.min(1, missingOgPages > 0 ? 1 : 0);
  seo -= Math.min(1, missingCanonicalPages > 0 ? 1 : 0);
  seo -= Math.min(1, pages.some((page) => page.ogUrlBlank || page.jsonLdUrlBlank || page.jsonLdLogoBlank) ? 1 : 0);

  let mobile = 5;
  mobile -= Math.min(2, missingViewportPages > 0 ? 2 : 0);
  mobile -= Math.min(1, pages.some((page) => page.buttonCount === 0 && page.anchorHashLinks === 0) ? 1 : 0);

  let performance = 5;
  performance -= Math.min(2, externalImages > 0 ? 1 : 0);
  performance -= Math.min(1, externalFonts > 2 ? 1 : 0);
  performance -= Math.min(1, externalScripts > 0 ? 1 : 0);
  performance -= Math.min(1, pages.some((page) => page.imgCount > 0 && page.lazyCount === 0) ? 1 : 0);

  return {
    design: Math.max(1, design),
    codeQuality: Math.max(1, codeQuality),
    accessibility: Math.max(1, accessibility),
    seo: Math.max(1, seo),
    mobile: Math.max(1, mobile),
    performance: Math.max(1, performance),
  };
}

function issue(severity, title, pages, problem, impact, recommendation, snippet) {
  return { severity, title, pages, problem, impact, recommendation, snippet };
}

function buildIssues(template, pages, diagnostics) {
  const issues = [];
  const pagesWithBlankOg = pages.filter((page) => page.ogUrlBlank || page.jsonLdUrlBlank || page.jsonLdLogoBlank);
  const pagesWithExternalImages = pages.filter((page) => page.externalImageUrls.length > 0);
  const pagesWithInvalidH1 = pages.filter((page) => page.h1Count !== 1);
  const pagesWithMissingAlt = pages.filter((page) => page.missingAlt > 0);
  const pagesWithPlaceholders = pages.filter((page) => page.placeholderCount > 0);
  const pagesMissingCanonical = pages.filter((page) => !page.canonical);
  const pagesWithNumericClaims = diagnostics.numericPages;
  const missingNumericNotes = diagnostics.numericPages.filter((page) => !diagnostics.numericAnnotationPages.includes(page));

  if (pagesWithPlaceholders.length > 0) {
    issues.push(issue(
      '高',
      'プレースホルダー文字列が未置換',
      pagesWithPlaceholders.map((page) => path.basename(page.filePath)),
      'テンプレートの主要テキストや構造化データに `{{TITLE}}` 形式の未置換プレースホルダーが残っています。',
      'そのまま公開すると信頼性を損ない、SEO/OGP でも未完成ページとして解釈されます。',
      '出荷前テンプレートとして使う場合は、最低限 title・description・JSON-LD・ブランド名を実値に差し替えてください。',
      '{{TITLE}}, {{DESCRIPTION}}, {{NAME}}'
    ));
  }

  if (pagesWithBlankOg.length > 0) {
    issues.push(issue(
      '中',
      'OGP / JSON-LD の URL・ロゴが空欄',
      pagesWithBlankOg.map((page) => path.basename(page.filePath)),
      '`og:url` や JSON-LD の `url` / `logo` が空文字のページがあります。',
      'SNS 共有時の情報不足、構造化データの品質低下、運用時の差し替え漏れにつながります。',
      'ダミー値を入れるのではなく、運用手順に沿って差し替える前提ならコメントを添えるか、未設定項目は削除してください。',
      '<meta property="og:url" content="">'
    ));
  }

  if (pagesWithExternalImages.length > 0) {
    const example = pagesWithExternalImages[0].externalImageUrls[0];
    issues.push(issue(
      '中',
      '外部画像 URL への依存が残っている',
      pagesWithExternalImages.map((page) => path.basename(page.filePath)),
      'Google Hosted などの外部画像 URL を背景や `<img>` に直接参照しています。',
      '長期運用時に画像切れ・配信制限・意図しない差し替えが起きると、ファーストビューが崩れます。',
      '`assets/images/` にローカル保存し、相対パス参照へ置き換えてください。',
      example
    ));
  }

  if (missingNumericNotes.length > 0) {
    issues.push(issue(
      '中',
      '数値・実績に編集注記がない',
      missingNumericNotes,
      'KPI や件数、応答時間などの数値表現がありますが、テンプレート利用者向けの編集注記が見当たりません。',
      `数値を未編集のまま公開すると、実績の根拠が不明なまま流用され、信頼性や法務面の説明責任が弱くなります。例: ${diagnostics.numericExamples.join(', ')}`,
      '統計値の近くかコメント内に「要編集」の注記を入れ、出典または差し替え前提を明示してください。',
      diagnostics.numericExamples.join(', ')
    ));
  }

  if (diagnostics.brokenLinks.length > 0 || diagnostics.brokenFragmentLinks.length > 0) {
    issues.push(issue(
      '中',
      'リンク整合性に確認が必要',
      [...diagnostics.brokenLinks, ...diagnostics.brokenFragmentLinks].slice(0, 8),
      '存在しないページやアンカー先を参照しているリンクがあります。',
      'ユーザーが移動できないリンクは回遊性を損ない、テンプレート品質を大きく下げます。',
      'フッター、ヘッダー、CTA、ページ内アンカーの参照先を実ファイルと `id` に合わせてください。',
      diagnostics.brokenLinks[0] || diagnostics.brokenFragmentLinks[0]
    ));
  }

  if (pagesWithInvalidH1.length > 0) {
    issues.push(issue(
      '中',
      '見出し構造に揺れがある',
      pagesWithInvalidH1.map((page) => `${path.basename(page.filePath)} (h1=${page.h1Count})`),
      'ページごとの `h1` 数が 1 で揃っていません。',
      'スクリーンリーダーの把握しやすさと SEO のトピック明確性が下がります。',
      '各ページで `h1` を 1 つに絞り、以降は `h2` 以下で階層化してください。',
      '<h1>...</h1>'
    ));
  }

  if (pagesWithMissingAlt.length > 0) {
    issues.push(issue(
      '低',
      '画像 alt の不足',
      pagesWithMissingAlt.map((page) => `${path.basename(page.filePath)} (${page.missingAlt} 件)`),
      '一部画像に `alt` 属性がありません。',
      '支援技術で情報が欠落し、画像検索や代替表示でも意味が伝わりません。',
      '装飾画像は空 alt、意味のある画像は内容を説明する alt を追加してください。',
      '<img src="..." alt="">'
    ));
  }

  if (pagesMissingCanonical.length > 0) {
    issues.push(issue(
      '低',
      'canonical が未設定',
      pagesMissingCanonical.map((page) => path.basename(page.filePath)),
      '正規 URL を示す canonical link がありません。',
      '複製公開やパラメータ付き URL の際に評価が分散しやすくなります。',
      '本番 URL が決まる運用なら `<link rel="canonical" ...>` を各ページに追加してください。',
      '<link rel="canonical" href="https://example.com/...">'
    ));
  }

  if (diagnostics.metaCoverage.robotsMissing.length > 0 || diagnostics.metaCoverage.ogLocaleMissing.length > 0 || diagnostics.metaCoverage.twitterMissing.length > 0) {
    issues.push(issue(
      '低',
      'メタタグ確認の粒度を上げたい',
      [
        diagnostics.metaCoverage.twitterMissing.length > 0 ? `Twitter Card なし: ${diagnostics.metaCoverage.twitterMissing.join(', ')}` : '',
        diagnostics.metaCoverage.robotsMissing.length > 0 ? `robots なし: ${diagnostics.metaCoverage.robotsMissing.join(', ')}` : '',
        diagnostics.metaCoverage.ogLocaleMissing.length > 0 ? `og:locale なし: ${diagnostics.metaCoverage.ogLocaleMissing.join(', ')}` : '',
      ].filter(Boolean),
      'description や OGP の基本要素に加えて、Twitter Card、robots、og:locale などの補助メタに欠落があります。',
      'SNS シェアや検索エンジンへの伝達情報がページごとに揃わず、公開時の品質差が出やすくなります。',
      '公開テンプレートとして使うなら、最低限の meta セットを共通化してください。',
      '<meta name="twitter:card" content="summary_large_image">'
    ));
  }

  if (diagnostics.formPages.length > 0 && (diagnostics.formsWithoutAction.length > 0 || diagnostics.formsWithoutMethod.length > 0 || diagnostics.formsWithoutHandler.length > 0)) {
    issues.push(issue(
      '低',
      'フォーム送信仕様が明示されていない',
      diagnostics.formPages,
      'フォームはありますが、`action` / `method` / 送信ハンドラのいずれかが不足しているページがあります。',
      'テンプレート利用者がそのまま使うと送信不可、または実装前提が分かりにくい状態になります。',
      'デモ用途なら注記を入れ、実装前提なら `action`・`method`・送信処理のうち最低限どれを利用するか明示してください。',
      '<form action="/contact" method="post">...</form>'
    ));
  }

  if (diagnostics.interaction.mobileTogglePresent && diagnostics.interaction.status !== 'implemented') {
    const missingBits = [];
    if (!diagnostics.interaction.ariaControlsPresent) missingBits.push('aria-controls');
    if (!diagnostics.interaction.escapeClosePresent) missingBits.push('Escape 閉じ');
    if (!diagnostics.interaction.scrollLockPresent) missingBits.push('スクロールロック');
    if (!diagnostics.interaction.backdropClosePresent) missingBits.push('バックドロップ閉じ');
    issues.push(issue(
      '低',
      'モバイルメニュー挙動が部分実装',
      pages.filter((page) => /mobile-toggle|mobile-menu|menu-backdrop|toggle/i.test(page.content)).map((page) => path.basename(page.filePath)),
      'モバイルメニュー自体はありますが、支援属性や閉じ方の実装が揃っていません。',
      `キーボード操作や状態同期が弱いと、モバイル利用時の操作感とアクセシビリティが不安定になります。未検出: ${missingBits.join(', ') || '一部挙動'}`,
      'メニュー開閉は `aria-expanded` / `aria-controls` / Escape / スクロールロック / バックドロップ閉じをセットで揃えてください。',
      '<button aria-expanded="false" aria-controls="mobile-menu">...</button>'
    ));
  }

  if (diagnostics.design.mixedDesignSystem) {
    issues.push(issue(
      '中',
      'デザインシステムが混在している',
      diagnostics.design.separateDashboardPages.length > 0 ? diagnostics.design.separateDashboardPages : pages.map((page) => path.basename(page.filePath)),
      'Tailwind 系 CSS と独自 CSS が同居しており、ページ群ごとに実装ルールが分かれている可能性があります。',
      `保守負荷が上がり、テンプレート利用者が「どのルールで直せばよいか」を判断しづらくなります。Tailwind: ${diagnostics.design.tailwindCssFiles.join(', ')} / Custom: ${diagnostics.design.customCssFiles.join(', ')}`,
      '用途分離が明確でないならどちらかへ寄せ、分離するならランディング用とアプリ用の境界をレポート上でも明示してください。',
      `${diagnostics.design.tailwindCssFiles.join(', ')} | ${diagnostics.design.customCssFiles.join(', ')}`
    ));
  }

  if (diagnostics.design.namingConsistencyIssue) {
    const namingPages = [...new Set([
      ...diagnostics.design.pagesWithDarkClass,
      ...diagnostics.design.pagesWithoutDarkClass,
      ...diagnostics.design.separateDashboardPages,
    ])];
    issues.push(issue(
      '低',
      'クラス命名・HTML 言語属性・dark クラスの統一性を確認したい',
      namingPages,
      'ページ群によってクラス命名、HTML 言語属性、dark クラスの付け方に差があり、テーマ実装の境界が見えます。',
      `テンプレート利用者がどの命名規則を採用すべきか判断しづらくなります。dark クラスあり: ${diagnostics.design.pagesWithDarkClass.join(', ') || 'なし'} / dark クラスなし: ${diagnostics.design.pagesWithoutDarkClass.join(', ') || 'なし'}`,
      'クラス命名プレフィックス、html の lang 属性、dark クラスの採用方針をテンプレート内で統一するか、意図的な差分なら用途を明記してください。',
      `クラス命名: ${diagnostics.design.classPrefixes.join(', ') || '抽出なし'} | HTML 言語属性: ${diagnostics.design.langValues.join(', ') || '抽出なし'} | dark クラス: ${diagnostics.design.pagesWithDarkClass.length > 0 ? diagnostics.design.pagesWithDarkClass.join(', ') : 'なし'}`
    ));
  }

  if (template.backupDirs.length > 0) {
    issues.push(issue(
      '低',
      'バックアップ資産がテンプレート内に残っている',
      template.backupDirs,
      '公開テンプレート配下にバックアップ用のディレクトリが同居しています。',
      '配布時のノイズになり、利用者がどのファイルを採用すべきか迷いやすくなります。',
      'レビュー対象から除外するだけでなく、運用上不要ならテンプレート外へ退避してください。',
      template.backupDirs.join(', ')
    ));
  }

  if (issues.length === 0) {
    issues.push(issue(
      '低',
      '重大な構造問題は見当たらない',
      pages.map((page) => path.basename(page.filePath)),
      '静的確認の範囲では致命的な欠陥は見つかっていません。',
      'ただし、公開前には実ブラウザ確認とフォーム送信の動作確認が必要です。',
      'Lighthouse と実機確認を追加すると完成度が上がります。',
      '追加の重大問題なし'
    ));
  }

  return issues;
}

function aiAssessment(template, pages) {
  const placeholders = pages.some((page) => page.placeholderCount > 0);
  const abstractCopy = pages.some((page) => /(未来|革新|信頼|次世代|premium|vision|legacy|transform)/i.test(page.description || page.title));
  const result = placeholders ? '高' : abstractCopy ? '中' : '低';
  const reason = placeholders
    ? '未置換プレースホルダーがあり、量産テンプレートの初期状態がそのまま残っています。'
    : abstractCopy
      ? '抽象度の高い価値訴求が中心で、テンプレート由来の汎用コピーが多めです。'
      : 'テーマ表現は定型的ですが、業種・機能の切り分けは比較的自然です。';
  return { result, reason };
}

function designAssessment(template, pages, firstPage, diagnostics) {
  const cssFiles = template.cssFiles.map((file) => path.basename(file));
  const tone = firstPage.description || firstPage.title || template.label;
  let uniqueness = '中';
  if (template.type === 'single') uniqueness = '低';
  if (diagnostics.design.classPrefixes.some((prefix) => ['wa', 'future', 'logic', 'luxe', 'global', 'eco', 'dynamic'].includes(prefix))) uniqueness = '中〜高';
  if (diagnostics.design.mixedDesignSystem) uniqueness = '中';
  const notes = [];
  if (cssFiles.includes('tailwind-built.css')) {
    notes.push('Tailwind ベースの統一は取れている');
  }
  if (cssFiles.includes('style.css')) {
    notes.push('独自 CSS でテーマ固有の演出を足している');
  }
  if (diagnostics.design.mixedDesignSystem) {
    notes.push('Tailwind と独自 CSS が並走しており、ページ群の境界説明が必要');
  }
  if (pages.some((page) => page.externalImageUrls.length > 0)) {
    notes.push('ビジュアルの説得力を外部画像に依存している');
  }
  if (template.type === 'single') {
    notes.push('一覧・ボイラープレート用途で、体験設計より説明用途が前面に出ている');
  }
  if (diagnostics.design.fonts.length > 0) {
    notes.push(`主なフォントは ${diagnostics.design.fonts.slice(0, 3).join(' / ')} で、テーマ性は読み取れる`);
  }
  if (diagnostics.design.colorTokens.length > 0) {
    notes.push(`色トークンは ${diagnostics.design.colorTokens.slice(0, 3).join(' / ')} が主軸`);
  }

  let layout = '標準的なランディングページ構成';
  if (diagnostics.design.classPrefixes.includes('logic')) layout = '制御盤風のダッシュボード併設構成';
  else if (diagnostics.design.classPrefixes.includes('wa')) layout = '余白と和紙質感を主役にした静的構成';
  else if (diagnostics.design.classPrefixes.includes('future')) layout = 'サイバー演出を重ねたヒーロー主導構成';
  else if (diagnostics.design.classPrefixes.includes('luxe')) layout = '余白広めのラグジュアリー誌面構成';
  else if (diagnostics.design.classPrefixes.includes('global')) layout = '数値カードと運用パネルを併置した業務説明構成';

  let cardStyle = '標準カード';
  if (diagnostics.design.classPrefixes.includes('future')) cardStyle = 'ネオン/グラスモーフィズム';
  else if (diagnostics.design.classPrefixes.includes('wa')) cardStyle = '和紙パネル';
  else if (diagnostics.design.classPrefixes.includes('logic')) cardStyle = 'システムパネル';
  else if (diagnostics.design.classPrefixes.includes('luxe')) cardStyle = 'ラグジュアリーパネル';
  else if (diagnostics.design.classPrefixes.includes('global')) cardStyle = '業務ダッシュボードカード';

  return {
    uniqueness,
    concept: tone.length > 90 ? `${tone.slice(0, 90)}...` : tone,
    notes,
    layout,
    cardStyle,
  };
}

function recommendationList(issues) {
  return issues.map((item, index) => ({
    priority: item.severity,
    action: item.title,
    effort: item.severity === '高' ? '中〜大' : item.severity === '中' ? '小〜中' : '小',
    reason: item.problem,
  }));
}

function buildPassedChecks(pages, diagnostics) {
  const items = [];
  if (pages.every((page) => page.viewport)) items.push('viewport 設定あり');
  if (pages.every((page) => page.lang)) items.push('lang 属性あり');
  if (pages.every((page) => page.h1Count === 1)) items.push('1 ページ 1 h1 を維持');
  if (pages.every((page) => page.missingAlt === 0)) items.push('img alt 欠落なし');
  if (pages.some((page) => page.ariaCount > 0)) items.push('ARIA 属性の実装あり');
  if (diagnostics.interaction.escapeClosePresent) items.push('モバイルメニューの Escape 閉じあり');
  if (diagnostics.interaction.backdropClosePresent) items.push('モバイルメニューのバックドロップ閉じあり');
  if (diagnostics.brokenLinks.length === 0 && diagnostics.brokenFragmentLinks.length === 0) items.push('主要リンクの静的整合性に問題なし');
  if (diagnostics.formPages.length === 0) items.push('フォームなし');
  else if (diagnostics.submitHandlerDetected || diagnostics.formsWithoutAction.length === 0) items.push('フォーム送信処理の入口は存在');
  if (diagnostics.design.mixedDesignSystem === false) items.push('デザインシステムの大きな混在なし');
  if (pages.every((page) => page.placeholderCount === 0)) items.push('未置換プレースホルダーなし');
  return items;
}

function extractCssVariableBlock(template) {
  const styleCss = template.cssFiles.find((file) => path.basename(file) === 'style.css')
    || template.cssFiles.find((file) => path.basename(file) === 'tailwind-input.css');
  if (!styleCss || !fs.existsSync(styleCss)) {
    return ['主要なカスタムプロパティは確認できませんでした。'];
  }
  const vars = extractCssVars(read(styleCss));
  return vars.length > 0 ? vars : ['主要なカスタムプロパティは確認できませんでした。'];
}

function renderReport(template) {
  const pages = template.htmlFiles.map(analyzePage).sort((a, b) => a.relPath.localeCompare(b.relPath, 'en'));
  const firstPage = pages.find((page) => path.basename(page.filePath).toLowerCase() === 'index.html') || pages[0];
  const theme = summarizeTheme(firstPage);
  const scores = computeScores(template, pages);
  const diagnostics = buildTemplateDiagnostics(template, pages);
  const issues = buildIssues(template, pages, diagnostics);
  const ai = aiAssessment(template, pages);
  const design = designAssessment(template, pages, firstPage, diagnostics);
  const actions = recommendationList(issues);
  const cssVars = extractCssVariableBlock(template);
  const passedChecks = buildPassedChecks(pages, diagnostics);

  const highIssuePenalty = actions.some((item) => item.priority === '高') ? 1 : 0;
  const totalScore = Math.max(1, Math.round((scores.design + scores.codeQuality + scores.accessibility + scores.seo + scores.mobile + scores.performance) / 6) - highIssuePenalty);
  const totalStars = stars(totalScore);
  const pageTable = pages.map((page) => {
    const problems = [];
    if (!page.title) problems.push('title なし');
    if (!page.description) problems.push('description なし');
    if (page.ogUrlBlank) problems.push('og:url 空');
    if (!page.canonical) problems.push('canonical なし');
    if (page.h1Count !== 1) problems.push(`h1=${page.h1Count}`);
    if (page.missingAlt > 0) problems.push(`alt 欠落 ${page.missingAlt}`);
    if (page.placeholderCount > 0) problems.push(`プレースホルダー ${page.placeholderCount}`);
    return `| ${escapeMdCell(path.basename(page.filePath))} | ${escapeMdCell(page.title || '未設定')} | ${page.description ? 'あり' : 'なし'} | ${page.descriptionLength} | ${escapeMdCell(problems.length ? problems.join(' / ') : '✅')} |`;
  }).join('\n');

  const issueBlocks = issues.map((item, index) => {
    const pagesText = item.pages.length > 0 ? item.pages.join(', ') : '該当なし';
    return `### 3.${index + 1}. ${item.title}（重要度：${item.severity}）

**該当ページ**: \`${pagesText}\`

**問題**: ${item.problem}

**現状**:
\`\`\`html
${item.snippet}
\`\`\`

**影響**:
- ${item.impact}

**推奨**:
- ${item.recommendation}
`;
  }).join('\n---\n\n');

  const actionsHigh = actions.filter((item) => item.priority === '高');
  const actionsMid = actions.filter((item) => item.priority === '中');
  const actionsLow = actions.filter((item) => item.priority === '低');

  const renderActionTable = (items) => {
    if (items.length === 0) {
      return '| - | なし | - | - |';
    }
    return items.map((item, index) => `| ${index + 1} | ${escapeMdCell(item.action)} | ${escapeMdCell(item.reason)} | ${item.effort} |`).join('\n');
  };

  const passedChecksText = passedChecks.length > 0
    ? passedChecks.map((item) => `- [x] ${item}`).join('\n')
    : '- [ ] 明示できる完了項目は今回の静的確認だけでは不足';

  const metaCoverageLines = [
    `- Twitter Card 未設定: ${diagnostics.metaCoverage.twitterMissing.length > 0 ? diagnostics.metaCoverage.twitterMissing.join(', ') : 'なし'}`,
    `- robots 未設定: ${diagnostics.metaCoverage.robotsMissing.length > 0 ? diagnostics.metaCoverage.robotsMissing.join(', ') : 'なし'}`,
    `- og:locale 未設定: ${diagnostics.metaCoverage.ogLocaleMissing.length > 0 ? diagnostics.metaCoverage.ogLocaleMissing.join(', ') : 'なし'}`,
  ].join('\n');

  const numericSummary = diagnostics.numericPages.length > 0
    ? `- 数値表現あり: ${diagnostics.numericPages.join(', ')}\n- 編集注記あり: ${diagnostics.numericAnnotationPages.length > 0 ? diagnostics.numericAnnotationPages.join(', ') : 'なし'}\n- 数値例: ${diagnostics.numericExamples.join(', ')}`
    : '- 目立つ KPI / 実績数値は検出されませんでした。';

  const linkSummary = [
    `- 欠落ファイル参照: ${diagnostics.brokenLinks.length > 0 ? diagnostics.brokenLinks.join(', ') : 'なし'}`,
    `- 欠落アンカー参照: ${diagnostics.brokenFragmentLinks.length > 0 ? diagnostics.brokenFragmentLinks.join(', ') : 'なし'}`,
    `- フッター由来の不整合: ${diagnostics.brokenFooterLinks.length > 0 ? diagnostics.brokenFooterLinks.join(', ') : 'なし'}`,
  ].join('\n');

  const formSummary = diagnostics.formPages.length > 0
    ? [
      `- フォーム掲載ページ: ${diagnostics.formPages.join(', ')}`,
      `- action 未設定: ${diagnostics.formsWithoutAction.length > 0 ? diagnostics.formsWithoutAction.join(', ') : 'なし'}`,
      `- method 未設定: ${diagnostics.formsWithoutMethod.length > 0 ? diagnostics.formsWithoutMethod.join(', ') : 'なし'}`,
      `- 送信ハンドラ検出: ${diagnostics.submitHandlerDetected ? 'あり' : '明確な検出なし'}`,
    ].join('\n')
    : '- フォームはありません。';

  const interactionStatusLabel = diagnostics.interaction.status === 'implemented'
    ? 'implemented'
    : diagnostics.interaction.status === 'partial'
      ? 'partial'
      : 'missing';
  const interactionSummary = [
    `- 判定: ${interactionStatusLabel}`,
    `- aria-expanded: ${diagnostics.interaction.ariaExpandedPresent ? 'あり' : 'なし'}`,
    `- aria-controls: ${diagnostics.interaction.ariaControlsPresent ? 'あり' : 'なし'}`,
    `- Escape で閉じる: ${diagnostics.interaction.escapeClosePresent ? 'あり' : 'なし'}`,
    `- スクロールロック: ${diagnostics.interaction.scrollLockPresent ? 'あり' : 'なし'}`,
    `- バックドロップ閉じ: ${diagnostics.interaction.backdropClosePresent ? 'あり' : 'なし'}`,
    `- メニューリンククリックで閉じる: ${diagnostics.interaction.menuLinkClosePresent ? 'あり' : 'なし'}`,
  ].join('\n');

  const designSystemSummary = [
    `- Tailwind 系 CSS: ${diagnostics.design.tailwindCssFiles.length > 0 ? diagnostics.design.tailwindCssFiles.join(', ') : 'なし'}`,
    `- 独自 CSS: ${diagnostics.design.customCssFiles.length > 0 ? diagnostics.design.customCssFiles.join(', ') : 'なし'}`,
    `- 混在判定: ${diagnostics.design.mixedDesignSystem ? 'あり' : 'なし'}`,
    `- HTML 言語属性: ${diagnostics.design.langValues.length > 0 ? diagnostics.design.langValues.join(', ') : '抽出なし'}`,
    `- dark クラス採用ページ: ${diagnostics.design.pagesWithDarkClass.length > 0 ? diagnostics.design.pagesWithDarkClass.join(', ') : 'なし'}`,
    `- 主なフォント: ${diagnostics.design.fonts.length > 0 ? diagnostics.design.fonts.join(', ') : '抽出なし'}`,
    `- 主な命名プレフィックス: ${diagnostics.design.classPrefixes.length > 0 ? diagnostics.design.classPrefixes.join(', ') : '抽出なし'}`,
  ].join('\n');

  return `# テンプレート ${template.label.toUpperCase()} レビュー結果

**テーマ**: ${theme.title} / ${theme.catchcopy}
**レビュー日**: ${reviewDate}

---

## 1. 総合評価テーブル

| 評価項目 | 評価 | 備考 |
|---------|------|------|
| デザイン一貫性 | ${stars(scores.design)} | ${labelForScore(scores.design)} |
| コード品質 | ${stars(scores.codeQuality)} | ${labelForScore(scores.codeQuality)} |
| アクセシビリティ | ${stars(scores.accessibility)} | ${labelForScore(scores.accessibility)} |
| SEO 最適化 | ${stars(scores.seo)} | ${labelForScore(scores.seo)} |
| モバイル対応 | ${stars(scores.mobile)} | ${labelForScore(scores.mobile)} |
| パフォーマンス | ${stars(scores.performance)} | ${labelForScore(scores.performance)} |

---

## 2. 構成ファイル

\`\`\`
${buildTree(template.basePath, [...template.htmlFiles, ...template.cssFiles, ...template.jsFiles].sort())}
\`\`\`

---

## 3. 構造的・技術的問題点

${issueBlocks}

---

## 4. メタタグ分析

### 4.1. 各ページのメタ情報

| ページ | タイトル | メタ記述 | 文字数 | 問題 |
|--------|----------|----------|--------|------|
${pageTable}

### 4.2. 評価

**良い点**:
- ${pages.every((page) => page.viewport) ? '全ページで viewport が設定されています。' : '一部ページでは viewport が設定されています。'}
- ${pages.some((page) => page.twitterCard) ? 'Twitter Card の指定があります。' : 'SNS 向けメタタグは最小限です。'}

**課題**:
- ${pages.some((page) => page.ogUrlBlank || page.jsonLdUrlBlank || page.jsonLdLogoBlank) ? 'URL / ロゴなど運用時に差し替える前提の空欄が残っています。' : '運用 URL を明示する canonical / OGP の整理余地があります。'}
- ${pages.every((page) => page.canonical) ? 'canonical は定義済みです。' : 'canonical が未設定で、公開 URL 確定後の追記が必要です。'}

### 4.3. 詳細チェック

${metaCoverageLines}

---

## 5. AI 生成コンテンツ分析

### 5.1. 総合評価

**AI 生成可能性：${ai.result}**

${ai.reason}

### 5.2. UI/UX 独自性

**テーマコンセプト**:
> ${design.concept}

**独自性評価**: ${design.uniqueness}

**観察**:
- ${design.notes.join('\n- ')}

**レイアウト特徴**:
- ${design.layout}

**カードスタイル**:
- ${design.cardStyle}

---

## 6. デザインシステム分析

### 6.1. CSS / JS 構成

- HTML: ${template.htmlFiles.length} ファイル
- CSS: ${template.cssFiles.length} ファイル
- JS: ${template.jsFiles.length} ファイル
- 外部画像参照: ${new Set(pages.flatMap((page) => page.externalImageUrls)).size} 件
- 外部フォント参照: ${new Set(pages.flatMap((page) => page.externalFonts)).size} 件

### 6.2. 主な CSS 変数

\`\`\`css
${cssVars.join('\n')}
\`\`\`

### 6.3. システム診断

${designSystemSummary}

---

## 7. 数値・リンク・フォーム確認

### 7.1. 数値・実績表現

${numericSummary}

### 7.2. リンク整合性

${linkSummary}

### 7.3. フォーム送信仕様

${formSummary}

### 7.4. モバイルメニュー挙動

${interactionSummary}

---

## 8. アクセシビリティ評価

| 項目 | 状況 |
|------|------|
| lang 属性 | ${pages.every((page) => page.lang) ? '✅ 全ページあり' : '⚠️ 一部欠落'} |
| aria-* 属性 | ${pages.some((page) => page.ariaCount > 0) ? '✅ 実装あり' : '⚠️ ほぼ未実装'} |
| モバイルメニュー挙動 | ${diagnostics.interaction.status === 'implemented' ? '✅ implemented' : diagnostics.interaction.status === 'partial' ? '⚠️ partial' : '❌ missing'} |
| h1 の一意性 | ${pages.every((page) => page.h1Count === 1) ? '✅ 1 ページ 1 h1' : '⚠️ ページ差あり'} |
| 画像 alt | ${pages.every((page) => page.missingAlt === 0) ? '✅ 欠落なし' : `⚠️ 欠落 ${pages.reduce((sum, page) => sum + page.missingAlt, 0)} 件`} |
| フォーム | ${pages.some((page) => page.formCount > 0) ? 'あり' : 'なし'} |

---

## 9. 問題なし項目

${passedChecksText}

---

## 10. 改善推奨事項（優先度順）

### 優先度：高

| # | 項目 | 理由 | 工数 |
|---|------|------|------|
${renderActionTable(actionsHigh)}

### 優先度：中

| # | 項目 | 理由 | 工数 |
|---|------|------|------|
${renderActionTable(actionsMid)}

### 優先度：低

| # | 項目 | 理由 | 工数 |
|---|------|------|------|
${renderActionTable(actionsLow)}

---

## 11. まとめ

### 長所

1. ${pages.every((page) => page.viewport) ? 'レスポンシブ前提の基本設定は揃っています。' : '最低限のマルチページ構成は整っています。'}
2. ${template.cssFiles.length > 0 ? 'CSS 資産がテンプレートごとにまとまっており、編集開始点が明確です。' : '単体ページとして確認しやすく、役割が明確です。'}
3. ${pages.some((page) => page.ariaCount > 0) ? 'モバイルメニューやナビゲーションに ARIA 属性が入り始めています。' : '構造が単純で把握しやすい HTML です。'}

### 主なリスク

1. ${issues[0].problem}
2. ${issues[1] ? issues[1].problem : '公開前の実機確認が未実施です。'}

### 推奨アクション（要約）

| 優先度 | アクション | 想定工数 |
|--------|-----------|---------|
${actions.slice(0, 3).map((item) => `| ${item.priority} | ${item.action} | ${item.effort} |`).join('\n')}

---

**総合評価：${totalStars}（${totalScore}/5）**

${template.label.toUpperCase()} は ${labelForScore(totalScore)} レベルの完成度です。静的なテンプレートとしては十分使えますが、${issues[0].title} を中心に運用前の整備を入れると品質が安定します。${passedChecks.length > 0 ? `一方で、${passedChecks.slice(0, 2).join(' / ')} は確認できています。` : ''}
`;
}

function outputFileName(key) {
  return `template-${key}-review.md`;
}

function main() {
  ensureDir(outputDir);
  const templates = listDirectTemplates(rootDir).map(collectTemplate);
  for (const template of templates) {
    const report = renderReport(template);
    const outPath = path.join(outputDir, outputFileName(template.key));
    fs.writeFileSync(outPath, report);
    console.log(`Generated: ${safeRelative(outPath)}`);
  }
}

main();
