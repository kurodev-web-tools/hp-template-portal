import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";

interface StaffRollProps {
  titleText?: string;
  subtitleText?: string;
  domainText?: string;
  ctaText?: string;
}

// カテゴリ別のテンプレート名リスト
const TEMPLATES = {
  business: [
    "TaskFlow - タスク管理",
    "Authentic - 企業サイト",
    "NEXUS - テクノロジー企業",
    "Evergreen - 環境コンサルティング",
    "Apex - ファイナンシャル",
  ],
  streamer: [
    "StreamHub - 配信者ポートフォリオ",
    "CreatorSpace - YouTube チャンネル",
    "VTuber Studio - VTuber サイト",
    "GameCast - ゲーム実況者",
    "LiveStage - ライブ配信者",
  ],
  lp: [
    "LandingPro - 商品販売 LP",
    "ServicePro - サービス紹介",
    "EventPage - イベント LP",
    "AppLaunch - アプリリリース",
    "CampaignPro - キャンペーン LP",
  ],
  portfolio: [
    "DesignerWorks - デザイナー作品集",
    "CodePortfolio - エンジニアポートフォリオ",
    "PhotoGallery - フォトグラファー",
    "ArtistSpace - アーティスト",
    "CreativeHub - クリエイター",
  ],
};

const CATEGORY_LABELS = {
  business: "BUSINESS",
  streamer: "STREAMER",
  lp: "LP",
  portfolio: "PORTFOLIO",
};

// オープニングコンポーネント
const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const opacityEnd = interpolate(frame, [100, 120], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        opacity: Math.min(opacity, opacityEnd),
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "64px",
            color: "#ffffff",
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          HP Template
        </h1>
        <h1
          style={{
            fontSize: "64px",
            color: "#60a5fa",
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          Portal
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// カテゴリセクションコンポーネント
const CategorySection: React.FC<{
  categoryName: keyof typeof TEMPLATES;
  startFrame: number;
  duration: number;
}> = ({ categoryName, startFrame, duration }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // フェードイン・アウト
  const opacity = interpolate(relativeFrame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const opacityEnd = interpolate(relativeFrame, [duration - 30, duration], [1, 0], {
    extrapolateLeft: "clamp",
  });

  // 上にスクロールする効果
  const translateY = interpolate(relativeFrame, [0, duration], [100, -100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const templates = TEMPLATES[categoryName];
  const label = CATEGORY_LABELS[categoryName];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: categoryName === "business" ? "#1e3a5f" :
                        categoryName === "streamer" ? "#4c1d95" :
                        categoryName === "lp" ? "#7f1d1d" : "#065f46",
        justifyContent: "center",
        alignItems: "center",
        opacity: Math.min(opacity, opacityEnd),
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            color: "#ffffff",
            margin: "0 0 40px 0",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          {label}
        </h2>
        <div style={{ width: "60px", height: "3px", backgroundColor: "#ffffff80", margin: "0 auto 30px" }} />
        {templates.map((template, index) => (
          <p
            key={index}
            style={{
              fontSize: "24px",
              color: "#ffffffc0",
              margin: "12px 0",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
            }}
          >
            {template}
          </p>
        ))}
        <p
          style={{
            fontSize: "20px",
            color: "#ffffff60",
            margin: "24px 0 0 0",
            fontFamily: "Inter, sans-serif",
            fontStyle: "italic",
          }}
        >
          ...and more templates
        </p>
      </div>
    </AbsoluteFill>
  );
};

// クロージングコンポーネント
const Closing: React.FC<{ ctaText: string; domainText: string }> = ({ ctaText, domainText }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "28px",
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
            fontSize: "36px",
            color: "#60a5fa",
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          {domainText}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// メインコンポーネント
export const StaffRoll: React.FC<StaffRollProps> = ({
  titleText = "HP Template Portal",
  subtitleText = "Professional Website Templates",
  domainText = "お問い合わせはこちらから",
  ctaText = "ご相談・ご質問お気軽に",
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* オープニング：0-120 フレーム (約 4 秒) */}
      <Sequence from={0} durationInFrames={120}>
        <Opening />
      </Sequence>

      {/* Business: 120-300 フレーム (約 6 秒) */}
      <Sequence from={120} durationInFrames={180}>
        <CategorySection categoryName="business" startFrame={120} duration={180} />
      </Sequence>

      {/* Streamer: 300-480 フレーム (約 6 秒) */}
      <Sequence from={300} durationInFrames={180}>
        <CategorySection categoryName="streamer" startFrame={300} duration={180} />
      </Sequence>

      {/* LP: 480-660 フレーム (約 6 秒) */}
      <Sequence from={480} durationInFrames={180}>
        <CategorySection categoryName="lp" startFrame={480} duration={180} />
      </Sequence>

      {/* Portfolio: 660-840 フレーム (約 6 秒) */}
      <Sequence from={660} durationInFrames={180}>
        <CategorySection categoryName="portfolio" startFrame={660} duration={180} />
      </Sequence>

      {/* クロージング：840-960 フレーム (約 4 秒) */}
      <Sequence from={840} durationInFrames={120}>
        <Closing ctaText={ctaText} domainText={domainText} />
      </Sequence>
    </AbsoluteFill>
  );
};
