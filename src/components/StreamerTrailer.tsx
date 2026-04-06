import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, useVideoConfig, staticFile } from "remotion";
import { useMemo, CSSProperties } from "react";

// Streamer テンプレート一覧（26 種類）
const STREAMER_TEMPLATES = [
    { id: 'a', name: 'Abyss Neon' },
    { id: 'b', name: 'Boss Room' },
    { id: 'c', name: 'Crystal Prism' },
    { id: 'd', name: 'Digital Ghost' },
    { id: 'e', name: 'E-Sports Pro' },
    { id: 'f', name: 'Future Tech' },
    { id: 'g', name: 'Glitch Core' },
    { id: 'h', name: 'Horror Mansion' },
    { id: 'i', name: 'Idol Stage' },
    { id: 'j', name: 'Jazz Lounge' },
    { id: 'k', name: 'Knight Honor' },
    { id: 'l', name: 'Lunar Phase' },
    { id: 'm', name: 'Metallic Chrome' },
    { id: 'n', name: 'Neon Night' },
    { id: 'o', name: 'Orbit Space' },
    { id: 'p', name: 'Pixel Retro' },
    { id: 'q', name: 'Quest Log' },
    { id: 'r', name: 'Rogue Stealth' },
    { id: 's', name: 'Steampunk Gear' },
    { id: 't', name: 'Tech Logic' },
    { id: 'u', name: 'Urban Graffiti' },
    { id: 'v', name: 'Vivid Glitch' },
    { id: 'w', name: 'Wide Pan' },
    { id: 'x', name: 'Xtreme Action' },
    { id: 'y', name: 'Yield Chart' },
    { id: 'z', name: 'Zen Brush' },
];

// 全カテゴリのテンプレート ID とファイル名プレフィックス
const ALL_TEMPLATES = {
    portfolio: { ids: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], basePath: '/assets/images/thumbnails/portfolio_v2', ext: 'jpg' },
    streamer: { ids: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], basePath: '/assets/images/thumbnails/streamer_v2', ext: 'jpg' },
    business: { ids: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], basePath: '/assets/images/thumbnails/business_v2', ext: 'jpg' },
    lp: { ids: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], basePath: '/assets/images/thumbnails/lp_v2', ext: 'jpg' },
};

// スクロール背景コンポーネント（4 列編成・上下交互スクロール・大サイズ）
const ScrollingBackground: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // 4 列分の独立したスクロール値
    const scroll1 = frame * 1.5;       // 1 列目：下向き（Portfolio）
    const scroll2 = -frame * 1.2;      // 2 列目：上向き（Business）
    const scroll3 = frame * 1.3;       // 3 列目：下向き（Streamer）
    const scroll4 = -frame * 1.0;      // 4 列目：上向き（LP）

    const renderColumn = (category: keyof typeof ALL_TEMPLATES, scrollValue: number, colIndex: number) => {
        const config = ALL_TEMPLATES[category];
        const ids = config.ids;
        const basePath = config.basePath;
        const ext = config.ext;
        // 3 周分をコピーして無限スクロールに見せる
        const duplicated = [...ids, ...ids, ...ids];
        const itemWidth = 480; // 画像幅
        const itemHeight = 270; // 画像高さ（16:9）
        const gap = 16;
        const itemTotalHeight = itemHeight + gap;

        // スクロール位置をアイテム高さで割った余りでループ
        const loopPosition = scrollValue % (ids.length * itemTotalHeight);

        const columnWidth = itemWidth + gap;
        const totalColumns = 4;
        const totalWidth = totalColumns * columnWidth;
        const startX = (Number(width) - totalWidth) / 2;

        return (
            <div
                key={colIndex}
                style={{
                    position: "absolute",
                    left: `${startX + colIndex * columnWidth}px`,
                    top: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: `${gap}px`,
                    transform: `translateY(${loopPosition}px)`,
                    opacity: 0.35,
                }}
            >
                {duplicated.map((id, idx) => (
                    <div
                        key={`${category}-${idx}`}
                        style={{
                            flexShrink: 0,
                            width: `${itemWidth}px`,
                            height: `${itemHeight}px`,
                            borderRadius: "12px",
                            overflow: "hidden",
                            backgroundColor: "#333",
                        }}
                    >
                        <img
                            src={staticFile(`${basePath}/${id}.${ext}`)}
                            alt=""
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#000000",
                overflow: "hidden",
            }}
        >
            {renderColumn('portfolio', scroll1, 0)}
            {renderColumn('business', scroll2, 1)}
            {renderColumn('streamer', scroll3, 2)}
            {renderColumn('lp', scroll4, 3)}

            {/* 全体に薄めの黒オーバーレイ */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
            />
        </AbsoluteFill>
    );
};

// サムネイルカードコンポーネント（シンプル版）
const ThumbnailCard: React.FC<{
    templateId: string;
    templateName: string;
    showName: boolean;
}> = ({ templateId, templateName, showName }) => {
    const frame = useCurrentFrame();
    const imagePath = `/assets/images/thumbnails/streamer_v2/${templateId}.jpg`;

    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
    const scale = interpolate(frame, [0, 15], [0.95, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                opacity,
                transform: `scale(${scale})`,
            }}
        >
            <div
                style={{
                    width: "900px",
                    height: "506px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    backgroundColor: "#1a1a1a",
                }}
            >
                <img
                    src={staticFile(imagePath)}
                    alt={templateName}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
            {showName && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "140px",
                        textAlign: "center",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "42px",
                            color: "#ffffff",
                            margin: 0,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                        }}
                    >
                        {templateName}
                    </h3>
                </div>
            )}
        </AbsoluteFill>
    );
};

// タイトルカードコンポーネント
const TitleCard: React.FC<{
    title: string;
    subtitle?: string;
}> = ({ title, subtitle }) => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" });
    const titleScale = interpolate(frame, [0, 25], [0.95, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px) scale(${titleScale})`,
                    textAlign: "center",
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <h1
                    style={{
                        fontSize: "64px",
                        color: "#ffffff",
                        margin: 0,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        textShadow: "0 2px 30px rgba(0,0,0,0.8)",
                    }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p
                        style={{
                            fontSize: "24px",
                            color: "#cccccc",
                            margin: "20px 0 0 0",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 400,
                            letterSpacing: "0.05em",
                            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </AbsoluteFill>
    );
};

// カテゴリ表示コンポーネント
const CategoryDisplay: React.FC = () => {
    const frame = useCurrentFrame();

    const mainOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    const mainY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: "clamp" });

    const gridOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
    const gridY = interpolate(frame, [15, 35], [30, 0], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* テキスト */}
            <div
                style={{
                    opacity: mainOpacity,
                    transform: `translateY(${mainY}px)`,
                    textAlign: "center",
                    position: "relative",
                    zIndex: 10,
                    textShadow: "0 2px 30px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.8)",
                    marginBottom: "40px",
                }}
            >
                <h1
                    style={{
                        fontSize: "56px",
                        color: "#ffffff",
                        margin: 0,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                    }}
                >
                    Total 104 Templates
                </h1>
            </div>

            <div
                style={{
                    opacity: gridOpacity,
                    transform: `translateY(${gridY}px)`,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px 80px",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <div>
                    <p
                        style={{
                            fontSize: "32px",
                            color: "#ffffff",
                            margin: 0,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textShadow: "0 2px 20px rgba(0,0,0,1)",
                        }}
                    >
                        Business
                    </p>
                </div>
                <div>
                    <p
                        style={{
                            fontSize: "32px",
                            color: "#ffffff",
                            margin: 0,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textShadow: "0 2px 20px rgba(0,0,0,1)",
                        }}
                    >
                        Streamer
                    </p>
                </div>
                <div>
                    <p
                        style={{
                            fontSize: "32px",
                            color: "#ffffff",
                            margin: 0,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textShadow: "0 2px 20px rgba(0,0,0,1)",
                        }}
                    >
                        LP
                    </p>
                </div>
                <div>
                    <p
                        style={{
                            fontSize: "32px",
                            color: "#ffffff",
                            margin: 0,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textShadow: "0 2px 20px rgba(0,0,0,1)",
                        }}
                    >
                        Portfolio
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// ファイナルカード
const FinalCard: React.FC = () => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    const scale = interpolate(frame, [0, 25], [0.9, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    opacity,
                    transform: `scale(${scale})`,
                    textAlign: "center",
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <h1
                    style={{
                        fontSize: "72px",
                        color: "#ffffff",
                        margin: 0,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 800,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        textShadow: "0 2px 30px rgba(0,0,0,0.8)",
                    }}
                >
                    Available Now
                </h1>
            </div>
        </AbsoluteFill>
    );
};

// メインコンポーネント
export const StreamerTrailer: React.FC = () => {
    const templates = useMemo(() => STREAMER_TEMPLATES.slice(0, 6), []);

    return (
        <AbsoluteFill style={{ backgroundColor: "#000000" }}>
            {/* 背景：全編通してスクロール */}
            <Sequence from={0} durationInFrames={600}>
                <ScrollingBackground />
            </Sequence>

            {/* 0-2 秒：オープニングタイトル */}
            <Sequence from={0} durationInFrames={60}>
                <TitleCard title="STREAMER TEMPLATES" />
            </Sequence>

            {/* 2-5 秒：高速表示（0.5 秒/枚 = 15 フレーム） */}
            <Sequence from={60} durationInFrames={90}>
                <AbsoluteFill>
                    {templates.map((template, index) => (
                        <Sequence
                            key={template.id}
                            from={index * 15}
                            durationInFrames={15}
                        >
                            <ThumbnailCard
                                templateId={template.id}
                                templateName={template.name}
                                showName={false}
                            />
                        </Sequence>
                    ))}
                </AbsoluteFill>
            </Sequence>

            {/* 5-7 秒：テキストカード */}
            <Sequence from={150} durationInFrames={60}>
                <TitleCard
                    title="26 Designs"
                    subtitle="for Streamers"
                />
            </Sequence>

            {/* 7-16 秒：通常表示（1.5 秒/枚 = 45 フレーム） */}
            <Sequence from={210} durationInFrames={270}>
                <AbsoluteFill>
                    {templates.map((template, index) => (
                        <Sequence
                            key={template.id}
                            from={index * 45}
                            durationInFrames={45}
                        >
                            <ThumbnailCard
                                templateId={template.id}
                                templateName={template.name}
                                showName={true}
                            />
                        </Sequence>
                    ))}
                </AbsoluteFill>
            </Sequence>

            {/* 16-18 秒：カテゴリ表示 */}
            <Sequence from={480} durationInFrames={60}>
                <CategoryDisplay />
            </Sequence>

            {/* 18-20 秒：ファイナル */}
            <Sequence from={540} durationInFrames={60}>
                <FinalCard />
            </Sequence>
        </AbsoluteFill>
    );
};
