# C: Chorus 詳細設計書

## 1. 基本情報

| 項目 | 内容 |
|------|------|
| **テーマコード** | C |
| **テーマ名** | Chorus |
| **日本語名** | コーラス |
| **キャッチコピー** | "歌声が導く、光のステージ" |
| **コンセプト** | 歌VTuber/歌ってみた配信者のための舞台。ボーカル波形が3D空間に広がり、音符と歌詞が飛び交う。感情に応じて変化する色彩が特徴的な、音楽の可視化。 |
| **対象配信者** | 歌VTuber、歌ってみた勢、カラオケ配信者、ボカロP |
| **差別化ポイント** | j:JAZZは演奏、i:IDOLはアイドルパフォーマンス、C:CHORUSは「歌声そのもの」を視覚化。 |

---

## 2. デザイン仕様

### 2.1 カラーパレット

```
Primary（メイン）:      #E040FB - ビビッドマゼンタ（高音）
Secondary（サブ）:      #7C4DFF - ディープパープル（低音）
Accent（アクセント）:    #00E5FF - シアン（シャウト）
Emotion Blue（青）:      #2979FF - ブルー（哀愁）
Emotion Red（赤）:       #FF1744 - レッド（情熱）
Emotion Gold（金）:      #FFD700 - ゴールド（感動）
Background（背景）:      #0D0D1A - ステージの闇
Surface（表面）:          #1A1A2E - スポットライト
Text Primary（本文）:    #FFFFFF - 白
Text Secondary（副文）:  #B0B0C0 - シルバー
```

### 2.2 タイポグラフィ

| 用途 | フォント | ウェイト | サイズ（PC/SP） | 特徴 |
|------|---------|----------|----------------|------|
| ヒーロータイトル | Playfair Display | 900 | 80px/40px | 劇場感、優雅 |
| セクション見出し | Montserrat | 700 | 48px/28px | モダン |
| サブ見出し | Montserrat | 500 | 24px/18px | - |
| 本文 | Noto Sans JP | 300 | 16px/14px | 細字で繊細さ |
| 歌詞 | Dancing Script | 400 | 可変 | 手書き風、流れる |
| 音符装飾 | Music Font | - | - | 楽譜風 |

### 2.3 レイアウト方針

**独自性の核**: **3D音楽ステージ**

- 配信者がステージ中央に立つ構図
- 周囲にボーカル波形が広がる
- 音符が飛び交うパーティクル
- 感情に応じたステージ照明変化

---

## 3. ページ構成

### 3.1 レイアウトモード

- `LP single page`
- 歌の流れを 1 本の導線として見せる

### 3.2 トップの役割

- 歌・配信・告知を 1 画面目で迷わず読ませる
- 舞台感を出しつつ、情報の入口は明快にする

### 3.3 ヘッダー位置

- `top fixed`
- ナビゲーションは常に見えるが、演出の邪魔はしない

### 3.4 ナビゲーション形式

- `side dots`
- 五線譜的な縦ナビでセクション移動を見せる

### 3.5 下層ページ構成

- なし
- Playlist / Discography / Stream はトップ内で完結させる

### 3.6 PC / SP の見せ方

- PC では 2 カラムや余白を使って舞台感を出す
- SP では縦積み優先で、歌詞や曲情報の読みやすさを優先する

### 3.7 サイト構造

```
index.html (LP風シングルページ)
├── Section 1: Hero (3Dステージ)
├── Section 2: Profile (歌手プロフィール)
├── Section 3: Playlist (楽曲一覧)
├── Section 4: Discography (歌ってみた)
├── Section 5: Stream (配信情報)
└── Section 6: Contact
```

### 3.8 ナビゲーション

**音符型ドットナビ**
- 右側に五線譜風ライン
- 音符アイコンがセクションを示す
- アクティブな音符が光る・跳ねる

---

## 4. セクション詳細

### Section 1: Hero

**レイアウト**: フルスクリーン3Dステージ

**構成**:
1. **背景**: 
   - 暗いステージ空間
   - スポットライトの光筋（Three.js）
   - 奥行き感のあるパーティクル

2. **中央**:
   - 配信者キャラ立ち絵 or 3Dモデル（配置予定地）
   - ボーカル波形が同心円状に広がる
   - 音符が浮遊するパーティクル

3. **テキスト**:
   - 「SONG OF THE STARS」（タイトル）
   - 配信者名（大きく）
   - 「歌VTuber」などの肩書き

**3D要素**:
```typescript
// ボーカル波形（同心円リング）
const VocalWaveform = () => {
  // 周波数に応じてリングが変動
  // 低音=大きな波、高音=細かい波
}

// 音符パーティクル
const NoteParticles = () => {
  // ♪ ♫ 等の3Dモデルが浮遊
  // 音楽に合わせて軌道を描く
}

// スポットライト
const Spotlights = () => {
  // ステージライトが配信者を照らす
  // 光が揺らぐ
}
```

**アニメーション**:
```javascript
// 波形リングが広がる
scale: 1 → 5
opacity: 1 → 0
duration: 2s
repeat: -1
stagger: 0.2

// 音符が跳ねる
y: 0 → -50 → 0
rotation: 0 → 360
duration: 3s
ease: "sine.inOut"

// 照明の色変化
// 感情に応じてマゼンタ↔青↔赤↔金
```

### Section 2: Profile

**レイアウト**: 左右2カラム（PC）、縦（SP）

**左カラム（40%）**:
- 配信者立ち絵/アバター（円形フレーム）
- 円形フレームが回転する音符で装飾
- 年齢・誕生日・性別等（任意）

**右カルム（60%）**:
- セクション見出し「Vocalist」
- 配信者名
- 自己紹介テキスト
- 音域：XX〜XX（例：A3〜F5）
- 得意ジャンル：J-POP、ボカロ、アニソン等
- 使用機材：マイク、オーディオインターフェース

**特別演出**:
- 音域をピアノ鍵盤の図で可視化
- 得意ジャンルが音符アイコンで表示

### Section 3: Playlist

**レイアウト**: 縦スクロールリスト

**構成**:
- セクション見出し「Playlist」
- 楽曲カード（横長）
- 各カード：曲名 / アーティスト / 歌唱日 / 感情タグ

**感情タグと色**:
- 青系：哀愁、切ない
- 赤系：情熱、激しい
- 金系：感動、壮大
- 紫系：神秘、ファンタジー

**インタラクション**:
- ホバーで波形プレビュー表示
- クリックで楽曲詳細モーダル

### Section 4: Discography

**レイアウト**: カバーアートグリッド

**構成**:
- セクション見出し「Covers」
- 歌ってみた動画のサムネイル（縦長カード）
- Masonryレイアウト

**カード構成**:
- サムネイル画像
- 曲名
- 元アーティスト
- 投稿日
- 視聴回数（任意）

**3D演出**:
- CDジャケット風に3D回転
- ホバーで回転して裏面（詳細）表示

### Section 5: Stream

**レイアウト**: カレンダー + 次回予告

**構成**:
- 今週の歌配信スケジュール
- 「次回歌枠：X月X日」カウントダウン
- リクエスト受付中の表示
- 過去配信アーカイブ（YouTube埋め込み）

**特別演出**:
- カウントダウンが音符と連動

### Section 6: Contact

**レイアウト**: シンプル中央

**構成**:
- 歌ってほしい曲リクエスト
- コラボ依頼
- 各種SNSリンク

---

## 5. 機能仕様

### 5.1 テーマ特有機能

| 機能 | 説明 | 技術 | 優先度 |
|------|------|------|--------|
| **ボーカル波形3D** | 同心円状の波形リング | React Three Fiber | 必須 |
| **音符パーティクル** | ♪ ♫ が飛び交う | R3F + InstancedMesh | 必須 |
| **感情カラー変化** | 音楽ジャンルでステージ色変化 | React State + CSS | 推奨 |
| **五線譜ナビ** | 音符型ドットナビゲーション | Framer Motion | 推奨 |
| **CDジャケット3D** | カバーが回転 | R3F | 推奨 |

### 5.2 共通機能

- レスポンシブ対応
- OGP対応
- スムーススクロール

---

## 6. 技術仕様

### 6.1 3D実装詳細

**ボーカル波形**:
```typescript
const VocalWaveform = () => {
  const rings = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    // 時間で波形を変動
    rings.current.children.forEach((ring, i) => {
      const scale = 1 + Math.sin(clock.elapsedTime * 2 + i * 0.5) * 0.2;
      ring.scale.set(scale, scale, scale);
    });
  });

  return (
    <group>
      {[...Array(5)].map((_, i) => (
        <Torus
          key={i}
          args={[2 + i * 0.5, 0.02, 16, 100]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial color="#E040FB" transparent opacity={0.6 - i * 0.1} />
        </Torus>
      ))}
    </group>
  );
};
```

**音符パーティクル**:
```typescript
const NoteParticles = () => {
  const count = 50;
  const mesh = useRef<InstancedMesh>(null);
  
  useFrame(({ clock }) => {
    for (let i = 0; i < count; i++) {
      // 音符が螺旋を描いて飛ぶ
      const t = clock.elapsedTime + i * 0.1;
      const x = Math.cos(t) * (3 + i * 0.1);
      const y = Math.sin(t * 0.5) + i * 0.2;
      const z = Math.sin(t) * (3 + i * 0.1);
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  return <instancedMesh ref={mesh} args={[noteGeometry, noteMaterial, count]} />;
};
```

### 6.2 コンポーネント構成

```
app/
├── page.tsx
├── sections/
│   ├── Hero.tsx              # 3Dステージ
│   ├── Profile.tsx
│   ├── Playlist.tsx
│   ├── Discography.tsx
│   ├── Stream.tsx
│   └── Contact.tsx
├── components/
│   ├── VocalWaveform.tsx     # ボーカル波形
│   ├── NoteParticles.tsx     # 音符パーティクル
│   ├── StageLights.tsx       # スポットライト
│   ├── CDJacket.tsx          # 3D CD
│   ├── MusicNoteNav.tsx      # 五線譜ナビ
│   └── EmotionBadge.tsx      # 感情カラーバッジ
└── lib/
    └── emotions.ts           # 感情-色マッピング
```

---

## 7. アセット要件

| アセット名 | 種類 | サイズ/形式 | 用途 |
|-----------|------|------------|------|
| c-hero-stage.jpg | 画像 | 1920x1080 | ステージ背景 |
| c-character.png | 画像 | 1000x1500 | 立ち絵 |
| c-note.glb | 3D | - | 音符モデル |
| c-cd-jacket.jpg | 画像 | 1000x1000 | CDテクスチャ |
| c-ogp.jpg | 画像 | 1200x630 | OGP |

---

## 8. 独自性ポイント

1. **ボーカル波形**: 歌の「音」を視覚化
2. **感情カラー**: 音楽の感情が色になる
3. **五線譜ナビ**: 音楽を感じるナビゲーション
4. **3Dステージ**: 歌う空間の再現

---

作成日: 2026-04-18
