const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../public/templates/business');
const reportPath = 'C:\\Users\\taka\\.gemini\\antigravity\\brain\\3de34b54-4984-4c71-945d-e6bbbd7ba0fd\\a_to_z_audit_report.md';

const templates = fs.readdirSync(templatesDir).filter(t => fs.statSync(path.join(templatesDir, t)).isDirectory() && t.length === 1);
let report = '# A-Z Templates UI/UX Initial Audit Report\n\n';
report += '各テンプレートのPC/スマホ表示に関する基礎的・構造的な問題点をリストアップしました。\n\n';

const requiredPages = ['index.html', 'about.html', 'service.html', 'contact.html'];

templates.forEach(t => {
    const tDir = path.join(templatesDir, t);
    let templateIssues = [];

    // 1. Page Existence & Basic Structure
    requiredPages.forEach(page => {
        const pagePath = path.join(tDir, page);
        if (!fs.existsSync(pagePath)) {
            templateIssues.push(`- [構造] \`${page}\` が不足しています。`);
            return;
        }

        const html = fs.readFileSync(pagePath, 'utf8');

        // 2. Broken Images
        const imgRegex = /<img[^>]+src="([^"]+)"/g;
        let match;
        while ((match = imgRegex.exec(html)) !== null) {
            const imgSrc = match[1];
            if (!imgSrc.startsWith('http') && !imgSrc.startsWith('data:')) {
                // local image
                const absImagePath = path.resolve(path.dirname(pagePath), imgSrc);
                if (!fs.existsSync(absImagePath)) {
                    templateIssues.push(`- [画像リンク切れ] \`${page}\`: \`${imgSrc}\` が存在しません。`);
                }
            }
        }

        // 3. Overflow Detection (w-screen, 100vw without overflow-hidden)
        if ((html.includes('w-screen') || html.includes('w-[100vw]')) && !html.includes('overflow-x-hidden')) {
            templateIssues.push(`- [はみ出し警告] \`${page}\`: \`w-screen\` が使用されていますが、横スクロールを抑制する \`overflow-x-hidden\` が見当たりません。スマホ表示でレイアウトが崩れる恐れがあります。`);
        }

        // 3b. Missing viewport meta
        if (!html.includes('name="viewport"')) {
            templateIssues.push(`- [スマホ対応警告] \`${page}\`: viewport メタタグがありません。レスポンシブ崩れの原因になります。`);
        }

        // 4. Information Priority / Visual Hierarchy
        const h1Count = (html.match(/<h1/g) || []).length;
        if (h1Count > 1) {
            templateIssues.push(`- [情報設計] \`${page}\`: H1タグが複数存在します。主役がブレるためSEOと視線誘導の観点で1つに絞るべきです。`);
        } else if (h1Count === 0) {
            templateIssues.push(`- [情報設計] \`${page}\`: H1タグが存在しません。`);
        }

        // Primary vs Secondary CTAs in Hero (simple check for repetitive heavy buttons)
        const primaryBtnCount = (html.match(/bg-primary.*text-white(?!.*hover)/g) || []).length;
        if (primaryBtnCount > 3) {
            templateIssues.push(`- [視線の流れ] \`${page}\`: \`bg-primary\` を持つ強いボタン/要素が多すぎます（${primaryBtnCount}箇所）。「次に比較する→最後に行動する」流れを作るため、装飾を減らし本当に必要な要素に絞るべきです。`);
        }

        // 5. Hardcoded long text robustness
        if (html.includes('h-64') && html.includes('overflow-hidden') && !html.includes('line-clamp')) {
            templateIssues.push(`- [破綻耐性] \`${page}\`: 固定高さ＋オーバーフロー隠しを使用していますが、長いテキストの省略（\`line-clamp\`）が設定されていない箇所があります。`);
        }

        // 6. Bunsetsu wrapping
        if (!html.includes('class="ib"')) {
            templateIssues.push(`- [文節改行] \`${page}\`: \`.ib\` (inline-block) クラスが一度も使用されていません。日本語の可読性が低下する恐れがあります。`);
        }

        // 7. Theme colors duplication / multiple meanings
        // E.g. using text-primary for both body text and warnings
        if (html.includes('text-primary') && html.includes('border-red') && !html.includes('text-red')) {
            templateIssues.push(`- [役割色] \`${page}\`: 状態色（エラーや警告）の設計が不十分な可能性があります。ブランド色(primary)に複数の意味を持たせないよう調整してください。`);
        }
    });

    if (templateIssues.length > 0) {
        report += `## Template ${t.toUpperCase()}\n`;
        report += [...new Set(templateIssues)].join('\n') + '\n\n';
    } else {
        report += `## Template ${t.toUpperCase()}\n- [OK] 重大な構造的な問題は検出されませんでした。\n\n`;
    }
});

fs.writeFileSync(reportPath, report);
console.log('Audit complete.');
