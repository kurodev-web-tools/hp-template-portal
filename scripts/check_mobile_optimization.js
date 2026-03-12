const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../public/templates/business');
const templates = fs.readdirSync(templatesDir).filter(t => t.length === 1 && fs.statSync(path.join(templatesDir, t)).isDirectory());
const pages = ['index.html', 'about.html', 'service.html', 'contact.html'];

let issues = 0;

for (const t of templates) {
    for (const p of pages) {
        const pagePath = path.join(templatesDir, t, p);
        if (!fs.existsSync(pagePath)) continue;
        
        const content = fs.readFileSync(pagePath, 'utf8');
        
        // Find huge fonts on mobile
        // Regex looks for class="..." then inside it, text-5xl etc without md: or lg:
        // Or simply search whole file for space text-5xl etc
        const fontRegex = /(?:^|["'\s])text-(?:5xl|6xl|7xl|8xl|9xl|\[\d+rem\])(?:["'\s]|$)/g;
        let match;
        while ((match = fontRegex.exec(content)) !== null) {
            console.log(`❌ [Mobile Optimization Issue] File: ${t}/${p} -> Found hardcoded massive font (no md: prefix): "${match[0].trim()}"`);
            issues++;
        }
        
        // Find huge vertical padding on mobile
        const paddingRegex = /(?:^|["'\s])p[ybt]-(?:24|32|40|48|64)(?:["'\s]|$)/g;
        while ((match = paddingRegex.exec(content)) !== null) {
            console.log(`❌ [Padding Issue] File: ${t}/${p} -> Found hardcoded massive padding (no md: prefix): "${match[0].trim()}"`);
            issues++;
        }
        
    }
}

if (issues === 0) {
    console.log("✅ All templates passed semantic check! No hardcoded massive fonts/paddings on mobile detected.");
} else {
    console.log(`\\n⚠️ Found ${issues} mobile optimization issues needing review.`);
}
