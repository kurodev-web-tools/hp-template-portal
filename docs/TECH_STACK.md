# ストリーマーテンプレート技術スタック

## 概要

全26テーマ（A-Z）のストリーマー向けHPテンプレートに使用する技術スタックと実装ガイドライン。

**対象**: Codex / AIコーディングアシスタント  
**目的**: テンプレート実装時の技術的統一と品質担保

---

## 1. 共通技術スタック

### 1.1 コア技術

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | App Router 系 | テーマごとのルーティング、静的出力、metadata |
| React | 19.x | UI ライブラリ |
| TypeScript | 5.x | 型安全 |
| Node.js | 20.x | ランタイム |

### 1.2 スタイリング

| 技術 | 用途 |
|------|------|
| Tailwind CSS | ユーティリティ CSS、レスポンシブ制御 |
| CSS Variables | テーマカラー、背景、影、角丸の管理 |
| shadcn/ui | 必要時のみ使う共通 UI 部品 |

### 1.3 アニメーション

| 技術 | 用途 | 位置づけ |
|------|------|----------|
| GSAP | スクロール連動、出現、タイミング制御 | 基本採用 |
| React Three Fiber | 3D レンダリング | テーマの核が 3D の場合のみ採用 |
| Framer Motion | UI アニメーション | 必要なテーマのみ個別採用 |

### 1.4 アイコン・フォント

| 技術 | 用途 |
|------|------|
| Lucide React | アイコン |
| next/font | カスタムフォント配信 |

---

## 2. 3D技術詳細（React Three Fiber）

### 2.1 基本セットアップ

```typescript
// app/components/Scene.tsx
'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Environment } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      {/* テーマ固有の3Dオブジェクト */}
    </Canvas>
  )
}
```

### 2.2 パフォーマンス最適化

```typescript
// InstancedMesh for particles
import { InstancedMesh } from '@react-three/drei'

// useFrame for animations
import { useFrame } from '@react-three/fiber'

// LOD for mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const particleCount = isMobile ? 100 : 500
```

### 2.3 よく使うパターン

#### パーティクル
```typescript
const ParticleField = ({ count = 100 }) => {
  const mesh = useRef<InstancedMesh>(null)
  const dummy = new Object3D()
  
  useFrame(({ clock }) => {
    for (let i = 0; i < count; i++) {
      const t = clock.elapsedTime + i * 0.1
      dummy.position.set(
        Math.sin(t) * 2,
        Math.cos(t) * 2,
        Math.sin(t * 0.5) * 2
      )
      dummy.updateMatrix()
      mesh.current?.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })
  
  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  )
}
```

#### 回転するオブジェクト
```typescript
const RotatingObject = () => {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="#E040FB" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}
```

---

## 3. アニメーション技術詳細

### 3.1 GSAP ScrollTrigger

```typescript
// app/hooks/useScrollAnimation.ts
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return
    
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      })
    })
    
    return () => ctx.revert()
  }, [ref])
}
```

### 3.2 Framer Motion

- 基本基盤には含めない
- ページ遷移や局所的な UI 制御が GSAP だけでは扱いにくいテーマのみ個別採用する
- 使う場合も、テーマ全体の動きは GSAP と CSS を正にする

### 3.3 よく使うイージング

```typescript
const easings = {
  smooth: 'power2.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  slow: 'power4.out',
}
```

---

## 4. テーマ別技術要件

### 4.1 Tier 1（最優先実装）

#### C: Chorus（歌VTuber）
```yaml
技術要件:
  3D:
    - 同心円波形リング (TorusGeometry)
    - 音符パーティクル (InstancedMesh)
    - ステージスポットライト (SpotLight)
  アニメーション:
    - 波形の広がり (scale + opacity)
    - 音符の跳ねる動き (physics-like)
    - 照明の色変化 (color transition)
  特殊:
    - Web Audio API連携（オプション）
```

#### L: Lethal（FPS/TPS）
```yaml
技術要件:
  3D:
    - 銃のモデル (GLB import)
    - マズルフラッシュ (PointLight + Particle)
  UI:
    - HUD表示 (CSS + absolute positioning)
    - レーダー (Canvas 2D)
    - 照準レティクル (CSS center fixed)
  アニメーション:
    - リコイル (camera shake)
    - リロード (gun animation)
```

#### B: Barrage（弾幕STG）
```yaml
技術要件:
  3D:
    - 弾幕パターン (Bullet Manager)
    - 自機モデル
    - ボス魔法陣 (custom shader)
  アニメーション:
    - 弾の軌道 (bezier curves)
    - パターン切り替え (GSAP timeline)
  特殊:
    - 衝突判定（簡易）
```

#### K: Kitsune（妖狐/和風）
```yaml
技術要件:
  3D:
    - 九尾の尻尾 (9個のmesh)
    - 狐火パーティクル (shader-based)
    - 鳥居 (TorusGeometry + Box)
  アニメーション:
    - 尻尾の揺れ (sine wave)
    - 狐火の揺らめき (noise shader)
    - 紙垂の風揺れ (vertex shader)
```

### 4.2 Tier 2（次点実装）

#### R: Requiem（吸血鬼/ゴシック）
```yaml
技術要件:
  3D:
    - 燭台の炎 (custom flame shader)
    - 血の月 (Sphere + 赤マテリアル)
    - 薔薇の花びら (InstancedMesh)
  アニメーション:
    - 炎の揺らめき (noise-based)
    - 花びらの舞い (falling animation)
    - 瞳の発光 (emissive pulse)
```

#### A: Astral（星幽体）
```yaml
技術要件:
  3D:
    - 半透明星幽体 (transparent material)
    - オーブ (glowing sphere)
    - オーラ波動 (ring expansion)
  アニメーション:
    - 浮遊 (floating animation)
    - 波動の広がり (scale animation)
    - オーブの導き (path following)
```

（他のテーマも同様に定義）

---

## 5. プロジェクト構成

### 5.1 ディレクトリ構造

```
templates-next/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── [theme]/
│   │   ├── a/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── b/
│   │   ├── c/
│   │   └── ...
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── SmoothScroll.tsx
│   │   └── themes/
│   │       ├── astral/
│   │       │   ├── AstralBody.tsx
│   │       │   ├── SpiritOrbs.tsx
│   │       │   └── AuraWaves.tsx
│   │       ├── chorus/
│   │       │   ├── VocalWaveform.tsx
│   │       │   ├── NoteParticles.tsx
│   │       │   └── StageLights.tsx
│   │       └── ...
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Profile.tsx
│   │   ├── Stream.tsx
│   │   └── Contact.tsx
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   └── useThemeColors.ts
│   └── lib/
│       ├── utils.ts
│       └── themes.ts
├── components/
│   └── ui/           # shadcn components
├── public/
│   ├── fonts/
│   └── images/
├── next.config.js
├── tailwind.config.ts
└── package.json
```

### 5.2 テーマ設定ファイル

```typescript
// app/lib/themes.ts
export const themes = {
  astral: {
    colors: {
      primary: '#E0FFFF',
      secondary: '#DDA0DD',
      accent: '#7B68EE',
      background: '#0A0A1A',
    },
    fonts: {
      heading: 'Cormorant Garamond',
      body: 'Noto Sans JP',
    },
    particles: 200,
    has3D: true,
  },
  chorus: {
    colors: {
      primary: '#E040FB',
      secondary: '#7C4DFF',
      accent: '#00E5FF',
      background: '#0D0D1A',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Noto Sans JP',
    },
    particles: 100,
    has3D: true,
  },
  // ...他のテーマ
}
```

---

## 6. パフォーマンス要件

### 6.1 Lighthouse目標

| 項目 | 目標値 |
|------|-------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

### 6.2 3D最適化

```typescript
// モバイル判定
const isMobile = typeof window !== 'undefined' 
  ? window.matchMedia('(pointer: coarse)').matches 
  : false

// パーティクル数調整
const particleCount = isMobile ? 50 : 200

// 解像度調整
<Canvas
  dpr={isMobile ? [1, 1.5] : [1, 2]}
  // ...
>
```

### 6.3 レンダリング最適化

- 高コストな計算だけを局所的に逃がす
- `React.memo` は再描画負荷が高い箇所だけに使う
- 画像は `next/image` で最適化

---

## 7. ビルド・デプロイ

### 7.1 ビルド設定

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

### 7.2 Cloudflare Pages設定

| 設定項目 | 値 |
|---------|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` |

---

## 8. 実装チェックリスト（各テーマ）

- [ ] テーマカラー設定（Tailwind config）
- [ ] フォント導入（next/font）
- [ ] 3Dシーン作成（R3F）
- [ ] パーティクル実装
- [ ] スクロールアニメーション（GSAP）
- [ ] ナビゲーション実装
- [ ] Heroセクション
- [ ] Profileセクション
- [ ] Streamセクション
- [ ] Contactセクション
- [ ] レスポンシブ対応
- [ ] OGP設定
- [ ] パフォーマンス最適化
- [ ] Lighthouseスコア確認

---

作成日: 2026-04-18
更新日: 2026-04-18
