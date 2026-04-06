import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";

interface StaffRollProps {
  domainText?: string;
  ctaText?: string;
}

// カテゴリ別のテンプレート情報
const CATEGORIES = [
  {
    id: "business",
    label: "BUSINESS",
    color: "#1e3a5f",
    templates: [
      { name: "TaskFlow", sub: "タスク管理" },
      { name: "Authentic", sub: "企業サイト" },
      { name: "NEXUS", sub: "テクノロジー" },
      { name: "Evergreen", sub: "コンサルティング" },
      { name: "Apex", sub: "ファイナンシャル" },
    ],
  },
  {
    id: "streamer",
    label: "STREAMER",
    color: "#4c1d95",
    templates: [
      { name: "StreamHub", sub: "配信者ポートフォリオ" },
      { name: "CreatorSpace", sub: "YouTube チャンネル" },
      { name: "VTuber Studio", sub: "VTuber サイト" },
      { name: "GameCast", sub: "ゲーム実況者" },
      { name: "LiveStage", sub: "ライブ配信者" },
    ],
  },
  {
    id: "lp",
    label: "LP",
    color: "#7f1d1d",
    templates: [
      { name: "LandingPro", sub: "商品販売 LP" },
      { name: "ServicePro", sub: "サービス紹介" },
      { name: "EventPage", sub: "イベント LP" },
      { name: "AppLaunch", sub: "アプリリリース" },
      { name: "CampaignPro", sub: "キャンペーン LP" },
    ],
  },
  {
    id: "portfolio",
    label: "PORTFOLIO",
    color: "#065f46",
    templates: [
      { name: "DesignerWorks", sub: "デザイナー作品集" },
      { name: "CodePortfolio", sub: "エンジニアポートフォリオ" },
      { name: "PhotoGallery", sub: "フォトグラファー" },
      { name: "ArtistSpace", sub: "アーティスト" },
      { name: "CreativeHub", sub: "クリエイター" },
    ],
  },
];

// 幾何学模様の背景コンポーネント
const GeometricBackground: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const rotation = (frame * 0.1) % 360;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
      }}
    >
      {/* グラデーション背景 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}99 100%)`,
        }}
      />

      {/* 回転する幾何学模様 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "150%",
          height: "150%",
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          opacity: 0.1,
        }}
      >
        <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#grid)" />
        </svg>
      </div>

      {/* パーティクル */}
      {[...Array(20)].map((_, i) => {
        const x = (i * 37) % 100;
        const y = (i * 53) % 100;
        const delay = i * 3;
        const duration = 15 + (i % 10);
        const size = 2 + (i % 4);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: "50%",
              animation: `float ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
        }
      `}</style>
    </AbsoluteFill>
  );
};

// サムネイルカードコンポーネント
const ThumbnailCard: React.FC<{
  name: string;
  sub: string;
  index: number;
  yOffset: number;
}> = ({ name, sub, index, yOffset }) => {
  const frame = useCurrentFrame();

  // 各カードが少し遅れてフェードイン
  const fadeIn = interpolate(frame, [index * 5, index * 5 + 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: fadeIn,
        transform: `translateY(${yOffset}px)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* サムネイルプレースホルダー */}
      <div
        style={{
          width: "200px",
          height: "120px",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "12px",
          overflow: "hidden",
        }}
      >
        {/* プレビュー用ミニマップ */}
        <svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%", opacity: 0.5 }}>
          <rect x="10" y="10" width="60" height="8" rx="2" fill="rgba(255,255,255,0.4)" />
          <rect x="10" y="25" width="40" height="30" rx="2" fill="rgba(255,255,255,0.2)" />
          <rect x="55" y="25" width="135" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x="55" y="38" width="100" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x="10" y="60" width="180" height="50" rx="2" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>

      {/* テキスト */}
      <span
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "#ffffff",
          fontFamily: "Inter, sans-serif",
          marginBottom: "4px",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.6)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {sub}
      </span>
    </div>
  );
};

// カテゴリセクションコンポーネント
const CategorySection: React.FC<{
  category: typeof CATEGORIES[0];
  startFrame: number;
  duration: number;
}> = ({ category, startFrame, duration }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // 上にスクロールする効果
  const scrollProgress = relativeFrame / duration;
  const totalScroll = 400;
  const yOffset = interpolate(scrollProgress, [0, 1], [totalScroll, -totalScroll], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // フェードイン・アウト
  const opacity = interpolate(relativeFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const opacityEnd = interpolate(relativeFrame, [duration - 20, duration], [1, 0], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(opacity, opacityEnd),
      }}
    >
      <GeometricBackground color={category.color} />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
        }}
      >
        {/* カテゴリタイトル */}
        <h2
          style={{
            fontSize: "56px",
            color: "#ffffff",
            margin: "0 0 20px 0",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          {category.label}
        </h2>

        <div style={{ width: "80px", height: "3px", backgroundColor: "#ffffff60", margin: "0 auto 40px" }} />

        {/* テンプレートカードグリッド */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "32px",
            transform: `translateY(${yOffset}px)`,
          }}
        >
          {category.templates.map((template, index) => (
            <ThumbnailCard
              key={template.name}
              name={template.name}
              sub={template.sub}
              index={index}
              yOffset={0}
            />
          ))}
        </div>

        {/* もっと見る表示 */}
        <p
          style={{
            marginTop: "40px",
            fontSize: "16px",
            color: "#ffffff50",
            fontFamily: "Inter, sans-serif",
            fontStyle: "italic",
          }}
        >
          ...and 21 more templates in this category
        </p>
      </div>
    </AbsoluteFill>
  );
};

// オープニングコンポーネント
const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 30], [0.95, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      {/* 背景エフェクト */}
      <GeometricBackground color="#0f172a" />

      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            color: "#ffffff",
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textShadow: "0 2px 30px rgba(0,0,0,0.5)",
          }}
        >
          HP Template
        </h1>
        <h1
          style={{
            fontSize: "56px",
            color: "#60a5fa",
            margin: "8px 0 0 0",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textShadow: "0 2px 30px rgba(96,165,250,0.4)",
          }}
        >
          Portal
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#94a3b8",
            margin: "24px 0 0 0",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
          }}
        >
          100+ Professional Templates
        </p>
      </div>
    </AbsoluteFill>
  );
};

// クロージングコンポーネント
const Closing: React.FC<{ ctaText: string; domainText: string }> = ({ ctaText, domainText }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 30], [1.05, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <GeometricBackground color="#0f172a" />

      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: "32px",
            color: "#94a3b8",
            margin: "0 0 16px 0",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
          }}
        >
          {ctaText}
        </p>
        <p
          style={{
            fontSize: "24px",
            color: "#60a5fa",
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          {domainText}
        </p>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: i < 3 ? "#60a5fa" : "#94a3b8",
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// メインコンポーネント
export const StaffRollPro: React.FC<StaffRollProps> = ({
  domainText = "ご相談・ご質問お気軽に",
  ctaText = "HP Template Portal",
}) => {
  const totalFrames = 900; // 30 秒 @ 30fps

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* オープニング：0-90 フレーム (約 3 秒) */}
      <Sequence from={0} durationInFrames={90}>
        <Opening />
      </Sequence>

      {/* Business: 90-315 フレーム (約 7.5 秒) */}
      <Sequence from={90} durationInFrames={225}>
        <CategorySection category={CATEGORIES[0]} startFrame={90} duration={225} />
      </Sequence>

      {/* Streamer: 315-540 フレーム (約 7.5 秒) */}
      <Sequence from={315} durationInFrames={225}>
        <CategorySection category={CATEGORIES[1]} startFrame={315} duration={225} />
      </Sequence>

      {/* LP: 540-765 フレーム (約 7.5 秒) */}
      <Sequence from={540} durationInFrames={225}>
        <CategorySection category={CATEGORIES[2]} startFrame={540} duration={225} />
      </Sequence>

      {/* Portfolio: 765-990 フレーム (約 7.5 秒) */}
      <Sequence from={765} durationInFrames={225}>
        <CategorySection category={CATEGORIES[3]} startFrame={765} duration={225} />
      </Sequence>

      {/* クロージング：990-1080 フレーム (約 3 秒) */}
      <Sequence from={990} durationInFrames={90}>
        <Closing ctaText={ctaText} domainText={domainText} />
      </Sequence>
    </AbsoluteFill>
  );
};
