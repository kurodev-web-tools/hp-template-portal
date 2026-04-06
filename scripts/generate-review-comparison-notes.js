const fs = require('fs');
const path = require('path');

const codexDir = path.join(__dirname, '..', 'codexレビュー結果');
const claudeDir = path.join(__dirname, '..', 'claude', 'レビュー結果');
const outputDir = path.join(codexDir, '比較改善');
const reviewDate = '2026-03-15';
const checklistPath = path.join(outputDir, 'review-checklist.md');

const patterns = [
  {
    id: 'numerical_annotation',
    title: '数値・実績の編集注記',
    claude: /数値の編集注記|出典のない数値|数値の丸さ|数値の現実性/u,
    codex: /数値の編集注記|数値・実績に編集注記|出典のない数値|数値の丸さ|数値の現実性/u,
    recommendation: '実績値や KPI が出てくるテンプレートでは、出典の有無と「編集前提の注記」を追加で確認する。',
  },
  {
    id: 'link_integrity',
    title: 'フッター/アンカーリンク整合性',
    claude: /フッターリンク|リンクの不一致|Privacy\/Terms|内部リンク/u,
    codex: /フッターリンク|リンクの不一致|リンク整合性|欠落アンカー参照|欠落ファイル参照|Privacy\/Terms|内部リンク/u,
    recommendation: 'ナビゲーション、フッター、アンカー先 ID の整合性を機械的に確認するチェックを追加する。',
  },
  {
    id: 'design_mix',
    title: 'デザインシステム混在の具体診断',
    claude: /デザインシステムの混在|2 つの異なるデザインシステム|Tailwind CSS と従来 CSS|Tailwind CSS v4 と従来 CSS/u,
    codex: /デザインシステムの混在|デザインシステムが混在している|2 つの異なるデザインシステム|Tailwind CSS と従来 CSS|Tailwind CSS v4 と従来 CSS/u,
    recommendation: 'Tailwind と独自 CSS の混在は、ページ群を分けてどこで切れているかまで書き分ける。',
  },
  {
    id: 'meta_detail',
    title: 'OG/Twitter/robots の粒度',
    claude: /OG タグ|Twitter カード|robots meta|og:locale/u,
    codex: /OG タグ|Twitter Card|Twitter カード|robots|og:locale|メタタグ確認の粒度/u,
    recommendation: 'meta の有無だけでなく、OG/Twitter/robots/locale まで粒度を揃えて見る。',
  },
  {
    id: 'form_behavior',
    title: 'フォーム送信仕様の確認',
    claude: /フォーム送信|action 属性|送信処理/u,
    codex: /フォーム送信|フォーム送信仕様|action 未設定|method 未設定|送信ハンドラ/u,
    recommendation: 'フォームがあるテンプレートは action、method、JS ハンドラの有無まで確認する。',
  },
  {
    id: 'mobile_behavior',
    title: 'モバイルメニュー挙動の確認',
    claude: /モバイルメニュー|Escape キー|スクロールロック|バックドロップ/u,
    codex: /モバイルメニュー挙動|Escape キー|Escape で閉じる|スクロールロック|バックドロップ/u,
    recommendation: 'ARIA 属性だけでなく、Escape、スクロールロック、バックドロップまで挙動確認の軸に含める。',
  },
  {
    id: 'uiux_detail',
    title: 'UI/UX 独自性分析の解像度',
    claude: /UI\/UX 独自性分析|レイアウト特徴|カードデザイン|UX フロー|他テンプレートとの比較/u,
    codex: /レイアウト特徴|カードデザイン|UX フロー|他テンプレートとの比較/u,
    recommendation: '配色、余白、カード、タイポ、視線誘導、他テンプレート比較まで含めて UI/UX を言語化する。',
  },
  {
    id: 'positive_checks',
    title: '問題なし項目の明記',
    claude: /問題なし項目|\[x\]/u,
    codex: /問題なし項目|\[x\]/u,
    recommendation: '指摘だけでなく、確認済みで問題なかった項目も別枠で残す。',
  },
  {
    id: 'naming_consistency',
    title: '命名・属性・テーマ実装の統一性',
    claude: /クラス命名|クラス命名規則|フォント体系|フォント体系の不一致|HTML 言語属性|dark クラス|ダークモード対応統一|dark クラス不使用/u,
    codex: /クラス命名|クラス命名規則|フォント体系|フォント体系の不一致|HTML 言語属性|dark クラス|ダークモード対応統一|dark クラス不使用/u,
    recommendation: 'クラス命名、lang/dark などのルート属性、フォント体系まで揃っているかを確認する。',
  },
  {
    id: 'backup_assets',
    title: 'バックアップ資産の混入',
    claude: /バックアップ/u,
    codex: /バックアップ/u,
    recommendation: '配布対象フォルダにバックアップや退避ファイルが残っていないかも確認する。',
  },
];

const extraCodexWins = [
  {
    id: 'backup_assets',
    title: 'バックアップ資産の混入',
  },
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function listReviewFiles(dir) {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((name) => /^template-.*-review\.md$/.test(name)).sort()
    : [];
}

function templateLabel(fileName) {
  return fileName.replace(/^template-/, '').replace(/-review\.md$/, '');
}

function buildMissingItems(claudeContent, codexContent) {
  return patterns.filter((pattern) => pattern.claude.test(claudeContent) && !pattern.codex.test(codexContent));
}

function buildCodexWins(claudeContent, codexContent) {
  return extraCodexWins.filter((pattern) => {
    const full = patterns.find((item) => item.id === pattern.id);
    return full && full.codex.test(codexContent) && !full.claude.test(claudeContent);
  });
}

function renderList(items, fallback) {
  if (items.length === 0) {
    return `- ${fallback}`;
  }
  return items.map((item) => `- ${item.title}`).join('\n');
}

function renderRecommendationList(items, fallback) {
  if (items.length === 0) {
    return `- ${fallback}`;
  }
  return items.map((item) => `- ${item.recommendation}`).join('\n');
}

function buildNote(template, codexExists, claudeExists, missingItems, codexWins) {
  const overlap = codexExists && claudeExists;
  const status = overlap ? '比較済み' : claudeExists ? 'Codex 側未作成' : 'Claude 比較対象なし';

  let summary = '';
  if (!codexExists) {
    summary = 'Codex 側のレビューが存在しないため比較できませんでした。';
  } else if (!claudeExists) {
    summary = 'Claude 側の比較対象がないため、今回の差分比較は未実施です。';
  } else if (missingItems.length === 0) {
    summary = '主要な論点は概ね重なっており、次回はレビューの具体性を上げる方向の改善が中心です。';
  } else {
    summary = `Claude 側には、Codex レビューで十分に言語化できていなかった観点が ${missingItems.length} 件ありました。`;
  }

  return `# テンプレート ${template.toUpperCase()} 比較改善メモ

**比較日**: ${reviewDate}
**比較状態**: ${status}

## 1. 比較サマリー

${summary}

## 2. Claude 側で拾えていて Codex 側で薄かった観点

${renderList(missingItems, '大きな抜けは見当たりません。')}

## 3. 次回の Codex レビューで追加したいチェック

${renderRecommendationList(missingItems, '表現の具体性と根拠の粒度を上げる。')}

## 4. Codex 側が補完できていた観点

${renderList(codexWins, '今回の比較では特筆すべき追加観点はありません。')}

## 5. テンプレート別メモ

${overlap
    ? `- まずは構造診断に加えて、テーマ固有の UX、コンテンツの現実味、リンク整合性まで踏み込む。`
    : `- Claude 側レビューがないため、今後比較する場合は同じ観点セットで再レビューする。`}
- 重点観点: ${missingItems.length > 0 ? missingItems.map((item) => item.title).join(' / ') : 'レビューの具体性向上'}
`;
}

function buildIndex(rows) {
  const tableRows = rows.map((row) => `| ${row.template.toUpperCase()} | ${row.status} | ${row.missingCount} | ${row.winCount} |`).join('\n');
  return `# Claude 比較改善一覧

**作成日**: ${reviewDate}

| テンプレート | 状態 | 追加したい観点数 | Codex 補完観点数 |
|-------------|------|------------------|------------------|
${tableRows}
`;
}

function buildCategorySummary(rows) {
  const counts = new Map();
  for (const row of rows) {
    for (const item of row.missingItems || []) {
      counts.set(item.title, (counts.get(item.title) || 0) + 1);
    }
  }

  if (counts.size === 0) {
    return '- 主要な残差は解消済みです。';
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ja'))
    .map(([title, count]) => `- ${title}: ${count} テンプレート`)
    .join('\n');
}

function buildWeakTemplateSummary(rows) {
  const weakRows = rows.filter((row) => row.status === '比較済み' && row.missingCount > 0);
  if (weakRows.length === 0) {
    return '- 比較済みテンプレートで大きな残差はありません。';
  }

  return weakRows
    .sort((a, b) => b.missingCount - a.missingCount || a.template.localeCompare(b.template, 'en'))
    .map((row) => `- ${row.template.toUpperCase()}: ${row.missingItems.map((item) => item.title).join(' / ')}`)
    .join('\n');
}

function buildChecklist() {
  const checklistItems = patterns
    .filter((pattern) => pattern.id !== 'positive_checks')
    .map((pattern) => `- [ ] ${pattern.title}\n  - ${pattern.recommendation}`)
    .join('\n');

  return `# Business Template Review Checklist

**更新日**: ${reviewDate}

## 基本方針

- [ ] 静的構造だけでなく、公開運用時の事故につながる項目を優先して見る
- [ ] 問題点だけでなく、問題なし項目も明記する
- [ ] テンプレート固有の UX と量産テンプレート由来の弱さを分けて書く

## 固定チェック項目

${checklistItems}

## 使い方メモ

- [ ] 問題は「該当ページ」「影響」「推奨」をセットで書く
- [ ] 数値や実績表現は、出典または要編集注記の有無まで見る
- [ ] 比較結果で残差が出た観点は、次回レビューで優先的に文章化する
`;
}

function main() {
  ensureDir(outputDir);

  const codexFiles = new Set(listReviewFiles(codexDir));
  const claudeFiles = new Set(listReviewFiles(claudeDir));
  const allFiles = [...new Set([...codexFiles, ...claudeFiles])].sort();
  const indexRows = [];

  for (const fileName of allFiles) {
    const template = templateLabel(fileName);
    const codexContent = readIfExists(path.join(codexDir, fileName));
    const claudeContent = readIfExists(path.join(claudeDir, fileName));
    const codexExists = Boolean(codexContent);
    const claudeExists = Boolean(claudeContent);
    const missingItems = codexExists && claudeExists ? buildMissingItems(claudeContent, codexContent) : [];
    const codexWins = codexExists && claudeExists ? buildCodexWins(claudeContent, codexContent) : [];
    const note = buildNote(template, codexExists, claudeExists, missingItems, codexWins);
    fs.writeFileSync(path.join(outputDir, `template-${template}-comparison.md`), note);

    indexRows.push({
      template,
      status: codexExists && claudeExists ? '比較済み' : claudeExists ? 'Codex なし' : 'Claude なし',
      missingCount: missingItems.length,
      winCount: codexWins.length,
      missingItems,
    });
  }

  const indexContent = `${buildIndex(indexRows)}

## 残っている弱点カテゴリ

${buildCategorySummary(indexRows)}

## 残差があるテンプレート

${buildWeakTemplateSummary(indexRows)}
`;

  fs.writeFileSync(path.join(outputDir, 'index.md'), indexContent);
  fs.writeFileSync(checklistPath, buildChecklist());
}

main();
