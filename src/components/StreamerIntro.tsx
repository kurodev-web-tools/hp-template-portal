import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, useVideoConfig, staticFile } from "remotion";
import { useMemo, useState, useEffect, CSSProperties } from "react";

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

// 画像の事前読み込みフック
const useImagePreload = (imagePaths: string[]) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        const images = imagePaths.map(path => {
            const img = new Image();
            img.src = staticFile(path);
            return img;
        });

        const checkLoaded = () => {
            const allLoaded = images.every(img => img.complete);
            if (allLoaded && mounted) {
                setLoaded(true);
            }
        };

        // チェックを数回試行
        const checks = [100, 500, 1000].map(delay =>
            setTimeout(checkLoaded, delay)
        );

        return () => {
            mounted = false;
            checks.forEach(clearTimeout);
        };
    }, [imagePaths]);

    return loaded;
};

// オープニングコンポーネント（プロフェッショナル版）
const Opening: React.FC = () => {
    const frame = useCurrentFrame();

    // 全体のフェードイン
    const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

    // 背景グラデーションのアニメーション（複数レイヤー）
    const bgScale = interpolate(frame, [0, 60], [1.4, 1], { extrapolateRight: "clamp" });
    const bgRotation = interpolate(frame, [0, 90], [-20, 0], { extrapolateRight: "clamp" });
    const bg2Rotation = interpolate(frame, [0, 90], [30, 10], { extrapolateRight: "clamp" });

    // メインタイトルの 3D アニメーション
    const titleScale = interpolate(frame, [20, 55], [0.3, 1.08], { extrapolateRight: "clamp" });
    const titleOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });
    const titleBlur = interpolate(frame, [20, 40], [30, 0], { extrapolateRight: "clamp" });
    const titleY = interpolate(frame, [20, 55], [100, 0], { extrapolateRight: "clamp" });
    const titleRotateX = interpolate(frame, [20, 50], [-30, 0], { extrapolateRight: "clamp" });

    // サブタイトルのアニメーション
    const subtitleY = interpolate(frame, [50, 80], [60, 0], { extrapolateRight: "clamp" });
    const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });
    const subtitleScale = interpolate(frame, [50, 75], [0.8, 1], { extrapolateRight: "clamp" });

    // 装飾ラインのアニメーション（複数）
    const lineWidth1 = interpolate(frame, [55, 80], [0, 150], { extrapolateRight: "clamp" });
    const lineWidth2 = interpolate(frame, [60, 85], [0, 80], { extrapolateRight: "clamp" });
    const lineOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateRight: "clamp" });

    // 背景の光の輪（複数レイヤー）
    const ring1Scale = interpolate(frame, [0, 70], [0.3, 2], { extrapolateRight: "clamp" });
    const ring1Opacity = interpolate(frame, [0, 50], [0.8, 0], { extrapolateRight: "clamp" });
    const ring1Rotation = interpolate(frame, [0, 90], [0, 180], { extrapolateRight: "clamp" });

    const ring2Scale = interpolate(frame, [15, 75], [0.2, 2.5], { extrapolateRight: "clamp" });
    const ring2Opacity = interpolate(frame, [15, 55], [0.6, 0], { extrapolateRight: "clamp" });
    const ring2Rotation = interpolate(frame, [0, 90], [0, -120], { extrapolateRight: "clamp" });

    const ring3Scale = interpolate(frame, [30, 80], [0.1, 3], { extrapolateRight: "clamp" });
    const ring3Opacity = interpolate(frame, [30, 60], [0.5, 0], { extrapolateRight: "clamp" });

    // 光のエフェクト（タイトル背後）
    const glowScale = interpolate(frame, [15, 55], [0, 1.8], { extrapolateRight: "clamp" });
    const glowOpacity = interpolate(frame, [15, 45], [0.9, 0.2], { extrapolateRight: "clamp" });

    // 追加のバックライト
    const backLightScale = interpolate(frame, [0, 40], [0, 2.5], { extrapolateRight: "clamp" });
    const backLightOpacity = interpolate(frame, [0, 30], [0.5, 0], { extrapolateRight: "clamp" });

    // パーティクル（浮かぶ光点）
    const particle1Y = interpolate(frame, [0, 90], [200, -150], { extrapolateRight: "clamp" });
    const particle1Opacity = interpolate(frame, [0, 30], [0.6, 0], { extrapolateRight: "clamp" });

    const particle2Y = interpolate(frame, [10, 85], [180, -120], { extrapolateRight: "clamp" });
    const particle2Opacity = interpolate(frame, [10, 35], [0.5, 0], { extrapolateRight: "clamp" });

    const particle3Y = interpolate(frame, [20, 80], [150, -100], { extrapolateRight: "clamp" });
    const particle3Opacity = interpolate(frame, [20, 40], [0.4, 0], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#050510",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                perspective: "1000px",
            }}
        >
            {/* 最深層バックグラウンド */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "radial-gradient(ellipse at center, #0f0a1e 0%, #050510 70%)",
                }}
            />

            {/* 背景グラデーションレイヤー 1 */}
            <div
                style={{
                    position: "absolute",
                    width: "200%",
                    height: "200%",
                    background: "linear-gradient(135deg, rgba(76, 29, 149, 0.4) 0%, rgba(15, 10, 30, 0.3) 50%, rgba(30, 27, 75, 0.4) 100%)",
                    transform: `scale(${bgScale}) rotate(${bgRotation}deg)`,
                    opacity: opacity,
                    filter: "blur(40px)",
                }}
            />

            {/* 背景グラデーションレイヤー 2 */}
            <div
                style={{
                    position: "absolute",
                    width: "180%",
                    height: "180%",
                    background: "linear-gradient(45deg, rgba(124, 58, 237, 0.25) 0%, rgba(15, 10, 30, 0.2) 50%, rgba(59, 32, 120, 0.3) 100%)",
                    transform: `scale(${bgScale}) rotate(${bg2Rotation}deg)`,
                    opacity: opacity,
                    filter: "blur(60px)",
                }}
            />

            {/* バックライトエフェクト */}
            <div
                style={{
                    position: "absolute",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)",
                    opacity: backLightOpacity,
                    transform: `scale(${backLightScale})`,
                    filter: "blur(80px)",
                }}
            />

            {/* 光の輪エフェクト 1 */}
            <div
                style={{
                    position: "absolute",
                    width: "900px",
                    height: "900px",
                    borderRadius: "50%",
                    border: "3px solid rgba(139, 92, 246, 0.4)",
                    opacity: ring1Opacity,
                    transform: `scale(${ring1Scale}) rotate(${ring1Rotation}deg)`,
                    boxShadow: "0 0 80px rgba(139, 92, 246, 0.5), inset 0 0 80px rgba(139, 92, 246, 0.3)",
                }}
            />

            {/* 光の輪エフェクト 2 */}
            <div
                style={{
                    position: "absolute",
                    width: "700px",
                    height: "700px",
                    borderRadius: "50%",
                    border: "2px solid rgba(167, 139, 250, 0.3)",
                    opacity: ring2Opacity,
                    transform: `scale(${ring2Scale}) rotate(${ring2Rotation}deg)`,
                    boxShadow: "0 0 60px rgba(167, 139, 250, 0.4)",
                }}
            />

            {/* 光の輪エフェクト 3 */}
            <div
                style={{
                    position: "absolute",
                    width: "1100px",
                    height: "1100px",
                    borderRadius: "50%",
                    border: "1px solid rgba(196, 181, 253, 0.2)",
                    opacity: ring3Opacity,
                    transform: `scale(${ring3Scale})`,
                }}
            />

            {/* 中央グローエフェクト */}
            <div
                style={{
                    position: "absolute",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, rgba(88, 28, 135, 0.3) 40%, transparent 70%)",
                    opacity: glowOpacity,
                    transform: `scale(${glowScale})`,
                    filter: "blur(60px)",
                }}
            />

            {/* パーティクル 1 */}
            <div
                style={{
                    position: "absolute",
                    top: `${particle1Y + 100}px`,
                    left: "25%",
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#c4b5fd",
                    borderRadius: "50%",
                    opacity: particle1Opacity,
                    filter: "blur(3px)",
                    boxShadow: "0 0 20px rgba(196, 181, 253, 0.8)",
                }}
            />

            {/* パーティクル 2 */}
            <div
                style={{
                    position: "absolute",
                    top: `${particle2Y + 80}px`,
                    right: "20%",
                    width: "5px",
                    height: "5px",
                    backgroundColor: "#a78bfa",
                    borderRadius: "50%",
                    opacity: particle2Opacity,
                    filter: "blur(2px)",
                    boxShadow: "0 0 15px rgba(167, 139, 250, 0.7)",
                }}
            />

            {/* パーティクル 3 */}
            <div
                style={{
                    position: "absolute",
                    top: `${particle3Y + 60}px`,
                    left: "50%",
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#8b5cf6",
                    borderRadius: "50%",
                    opacity: particle3Opacity,
                    filter: "blur(2px)",
                    boxShadow: "0 0 12px rgba(139, 92, 246, 0.6)",
                }}
            />

            {/* コンテンツ */}
            <div style={{
                textAlign: "center",
                opacity,
                zIndex: 10,
                perspective: "1000px",
            }}>
                {/* メインタイトル */}
                <div style={{
                    transform: `translateY(${titleY}px) scale(${titleScale}) rotateX(${titleRotateX}deg)`,
                    transformStyle: "preserve-3d",
                }}>
                    <h1
                        style={{
                            fontSize: "110px",
                            color: "#ffffff",
                            margin: 0,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 900,
                            letterSpacing: "0.04em",
                            filter: `blur(${titleBlur}px)`,
                            opacity: titleOpacity,
                            background: "linear-gradient(180deg, #ffffff 0%, #e9d5ff 35%, #a78bfa 65%, #7c3aed 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0 0 80px rgba(124, 58, 237, 0.8), 0 0 120px rgba(139, 92, 246, 0.5), 0 10px 30px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        Streamer
                    </h1>
                </div>

                {/* 装飾ライン 1 */}
                <div
                    style={{
                        width: `${lineWidth1}px`,
                        height: "3px",
                        background: "linear-gradient(90deg, transparent, #7c3aed, #c4b5fd, #a78bfa, transparent)",
                        margin: "40px auto 20px auto",
                        opacity: lineOpacity,
                        borderRadius: "2px",
                        boxShadow: "0 0 30px rgba(124, 58, 237, 0.9), 0 0 60px rgba(139, 92, 246, 0.5)",
                    }}
                />

                {/* 装飾ライン 2（サブ） */}
                <div
                    style={{
                        width: `${lineWidth2}px`,
                        height: "2px",
                        background: "linear-gradient(90deg, transparent, #c4b5fd, transparent)",
                        margin: "0 auto",
                        opacity: lineOpacity * 0.7,
                        borderRadius: "1px",
                        boxShadow: "0 0 15px rgba(196, 181, 253, 0.7)",
                    }}
                />

                {/* サブタイトル */}
                <div style={{ transform: `translateY(${subtitleY}px) scale(${subtitleScale})` }}>
                    <h2
                        style={{
                            fontSize: "28px",
                            color: "#c4b5fd",
                            margin: "0",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            opacity: subtitleOpacity,
                            textShadow: "0 0 30px rgba(196, 181, 253, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)",
                        }}
                    >
                        Template Collection
                    </h2>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#6b7280",
                            margin: "12px 0 0 0",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 400,
                            letterSpacing: "0.1em",
                            opacity: subtitleOpacity,
                        }}
                    >
                        Professional Designs for Content Creators
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// サムネイルカードコンポーネント（プロフェッショナル版）

// 3D キューブの各面を描画するコンポーネント
const CubeFace: React.FC<{
    transform: string;
    templateId: string;
    templateName: string;
    opacity?: number;
}> = ({ transform, templateId, templateName, opacity = 1 }) => {
    const frame = useCurrentFrame();

    const imagePath = `/assets/images/thumbnails/streamer_v2/${templateId}.jpg`;

    // 軽いズーム効果
    const imageScale = interpolate(frame, [0, 45], [1.05, 1], { extrapolateRight: "clamp" });

    return (
        <div
            style={{
                position: "absolute",
                width: "1000px",
                height: "562px",
                transform,
                backfaceVisibility: "hidden",
                opacity,
            }}
        >
            {/* サムネイル画像コンテナ */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.15), 0 0 60px rgba(124, 58, 237, 0.5), inset 0 0 60px rgba(124, 58, 237, 0.15)",
                    backgroundColor: "#1e1e2e",
                    border: "2px solid rgba(167, 139, 250, 0.7)",
                }}
            >
                {/* 画像 */}
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={staticFile(imagePath)}
                        alt={templateName}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transform: `scale(${imageScale})`,
                        }}
                    />
                </div>

                {/* グラデーションオーバーレイ */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "220px",
                        background: "linear-gradient(to top, rgba(15,15,26,0.98) 0%, rgba(15,15,26,0.7) 40%, rgba(15,15,26,0.3) 60%, transparent 100%)",
                    }}
                />

                {/* 装飾ライン */}
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "30px",
                        right: "30px",
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.6), transparent)",
                    }}
                />

                {/* テンプレート名 */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "50px",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "56px",
                            color: "#ffffff",
                            margin: 0,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 800,
                            textShadow: "0 4px 40px rgba(0,0,0,0.9), 0 0 30px rgba(167, 139, 250, 0.4)",
                            letterSpacing: "0.02em",
                            background: "linear-gradient(180deg, #ffffff 0%, #e9d5ff 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {templateName}
                    </h3>
                    <p
                        style={{
                            fontSize: "16px",
                            color: "#a78bfa",
                            margin: "12px 0 0 0",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 500,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                        }}
                    >
                        Streamer Template
                    </p>
                </div>

                {/* コーナー装飾 */}
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        width: "40px",
                        height: "40px",
                        borderTop: "2px solid rgba(167, 139, 250, 0.8)",
                        borderLeft: "2px solid rgba(167, 139, 250, 0.8)",
                        borderRadius: "8px 0 0 0",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        width: "40px",
                        height: "40px",
                        borderTop: "2px solid rgba(167, 139, 250, 0.8)",
                        borderRight: "2px solid rgba(167, 139, 250, 0.8)",
                        borderRadius: "0 8px 0 0",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                        width: "40px",
                        height: "40px",
                        borderBottom: "2px solid rgba(167, 139, 250, 0.8)",
                        borderLeft: "2px solid rgba(167, 139, 250, 0.8)",
                        borderRadius: "0 0 0 8px",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        width: "40px",
                        height: "40px",
                        borderBottom: "2px solid rgba(167, 139, 250, 0.8)",
                        borderRight: "2px solid rgba(167, 139, 250, 0.8)",
                        borderRadius: "0 0 8px 0",
                    }}
                />
            </div>
        </div>
    );
};

// 3D 円筒カルーセルコンポーネント（横回転）
const RotatingCube: React.FC = () => {
    const frame = useCurrentFrame();
    const { height } = useVideoConfig();

    const templates = useMemo(() => STREAMER_TEMPLATES.slice(0, 6), []);
    const totalDuration = 360; // 12 秒（30fps × 12）
    const framesPerFace = totalDuration / 6; // 60 フレーム/面（2 秒/面）

    // 円筒の半径計算：パネル幅 1000px、6 等分（各 60°）の場合
    // 弦の長さ = 2R × sin(θ/2) → 1000 = 2R × sin(30°) → R = 1000
    const radius = 1000;
    const anglePerPanel = 60; // 360° / 6

    // Y 軸回転：0 度から 360 度まで（6 面 × 60 度）
    const baseRotation = interpolate(
        frame,
        [0, totalDuration],
        [0, 360],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // 画像の事前読み込み
    const imagePaths = useMemo(() =>
        templates.map(t => `/assets/images/thumbnails/streamer_v2/${t.id}.jpg`),
        [templates]
    );
    const imagesLoaded = useImagePreload(imagePaths);

    // 現在の面のインデックス（進行状況表示用）
    const currentFaceIndex = Math.min(
        Math.floor(frame / framesPerFace),
        templates.length - 1
    );

    if (!imagesLoaded) {
        return (
            <AbsoluteFill
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#0a0a14",
                }}
            >
                <div style={{ color: "#7c3aed", fontSize: "24px", fontFamily: "Inter, sans-serif" }}>
                    Loading thumbnails...
                </div>
            </AbsoluteFill>
        );
    }

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#0a0a14",
                perspective: "2000px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* 円筒カルーセル本体 */}
            <div
                style={{
                    width: "1000px",
                    height: "562px",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${baseRotation}deg)`,
                }}
            >
                {/* 6 つのパネルを円筒状に配置（端がぴったり接する） */}
                <CubeFace transform={`rotateY(0deg) translateZ(${radius}px)`} templateId={templates[0].id} templateName={templates[0].name} />
                <CubeFace transform={`rotateY(60deg) translateZ(${radius}px)`} templateId={templates[1].id} templateName={templates[1].name} />
                <CubeFace transform={`rotateY(120deg) translateZ(${radius}px)`} templateId={templates[2].id} templateName={templates[2].name} />
                <CubeFace transform={`rotateY(180deg) translateZ(${radius}px)`} templateId={templates[3].id} templateName={templates[3].name} />
                <CubeFace transform={`rotateY(240deg) translateZ(${radius}px)`} templateId={templates[4].id} templateName={templates[4].name} />
                <CubeFace transform={`rotateY(300deg) translateZ(${radius}px)`} templateId={templates[5].id} templateName={templates[5].name} />
            </div>

            {/* プログレスインジケーター */}
            <div
                style={{
                    position: "absolute",
                    bottom: `${height * 0.08}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                }}
            >
                {templates.map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: "48px",
                            height: "4px",
                            borderRadius: "2px",
                            backgroundColor: "#ffffff20",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                width: i === currentFaceIndex ? "100%" : "0%",
                                background: "linear-gradient(90deg, #7c3aed, #c4b5fd)",
                                transition: "width 0.3s ease",
                                boxShadow: "0 0 10px rgba(124, 58, 237, 0.8)",
                            }}
                        />
                    </div>
                ))}
            </div>
        </AbsoluteFill>
    );
};

const ThumbnailCard: React.FC<{
    templateId: string;
    templateName: string;
    index: number;
    frameOffset: number;
    isActive: boolean;
}> = ({ templateId, templateName, index, frameOffset, isActive }) => {
    const frame = useCurrentFrame();

    // 各カードの表示時間（1.5 秒 = 45 フレーム）
    const cardDuration = 45;
    const enterDuration = 10;
    const holdDuration = 28;
    const exitDuration = 7;

    // メインのアニメーション値
    const opacity = interpolate(frame, [0, enterDuration], [0, 1], {
        extrapolateRight: "clamp",
    });

    const opacityExit = interpolate(
        frame,
        [cardDuration - exitDuration, cardDuration],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // 3D スライドイン（右から）
    const slideInX = interpolate(frame, [0, enterDuration], [300, 0], {
        extrapolateRight: "clamp",
    });

    // スケールアニメーション（奥から手前へ）
    const scale = interpolate(frame, [0, enterDuration], [0.7, 1], {
        extrapolateRight: "clamp",
    });

    // 軽い回転（プロフェッショナルな印象）
    const rotateY = interpolate(frame, [0, enterDuration], [-15, 0], {
        extrapolateRight: "clamp",
    });

    // 縦方向の位置（パララックス）
    const translateY = index * 8;

    // 継続的なフローティング効果
    const floatY = Math.sin(frame * 0.15) * 6;

    // 背景パーティクル
    const particleOpacity = interpolate(frame, [0, cardDuration], [0, 0.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const particleScale = interpolate(frame, [0, cardDuration], [0.3, 1.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 光のリングエフェクト
    const ringOpacity = interpolate(frame, [5, 20], [0, 0.3], {
        extrapolateRight: "clamp",
    });
    const ringScale = interpolate(frame, [5, 25], [0.8, 1.1], {
        extrapolateRight: "clamp",
    });

    // テンプレート名のテキストエフェクト
    const textY = interpolate(frame, [8, 22], [30, 0], {
        extrapolateRight: "clamp",
    });
    const textOpacity = interpolate(frame, [8, 18], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 枠の光彩（アクティブ時に強化）
    const glowIntensity = isActive ? 1 : 0.6;
    const borderGlow = interpolate(frame, [0, enterDuration], [0, glowIntensity], {
        extrapolateRight: "clamp",
    });

    const finalOpacity = Math.min(opacity, opacityExit);

    // 画像パス
    const imagePath = `/assets/images/thumbnails/streamer_v2/${templateId}.jpg`;

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                perspective: "1000px",
            }}
        >
            {/* 動的背景エフェクト */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: `radial-gradient(ellipse at ${50 + index * 5}% ${50 + floatY}%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)`,
                }}
            />

            {/* 背景パーティクル */}
            <div
                style={{
                    position: "absolute",
                    width: "800px",
                    height: "800px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 60%)",
                    opacity: particleOpacity,
                    transform: `scale(${particleScale}) rotate(${frame * 0.5}deg)`,
                    filter: "blur(80px)",
                }}
            />

            {/* 光のリング */}
            <div
                style={{
                    position: "absolute",
                    width: "700px",
                    height: "700px",
                    borderRadius: "50%",
                    border: "3px solid rgba(167, 139, 250, 0.4)",
                    opacity: ringOpacity,
                    transform: `scale(${ringScale}) rotate(${frame * 0.3}deg)`,
                    boxShadow: "0 0 60px rgba(124, 58, 237, 0.4)",
                }}
            />

            {/* プログレスインジケーター */}
            <div
                style={{
                    position: "absolute",
                    bottom: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    opacity: finalOpacity,
                }}
            >
                {STREAMER_TEMPLATES.slice(0, 6).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: "48px",
                            height: "4px",
                            borderRadius: "2px",
                            backgroundColor: "#ffffff20",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                width: i === index ? "100%" : "0%",
                                background: "linear-gradient(90deg, #7c3aed, #c4b5fd)",
                                transition: "width 0.3s ease",
                                boxShadow: "0 0 10px rgba(124, 58, 237, 0.8)",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* カード本体 */}
            <div
                style={{
                    opacity: finalOpacity,
                    transform: `translateX(${slideInX}px) translateY(${translateY + floatY}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* サムネイル画像コンテナ */}
                <div
                    style={{
                        position: "relative",
                        width: "1000px",
                        height: "562px",
                        borderRadius: "28px",
                        overflow: "hidden",
                        boxShadow: `0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.15), 0 0 60px rgba(124, 58, 237, ${0.3 * borderGlow}), inset 0 0 60px rgba(124, 58, 237, ${0.1 * borderGlow})`,
                        backgroundColor: "#1e1e2e",
                        border: `2px solid rgba(167, 139, 250, ${0.3 + 0.4 * borderGlow})`,
                    }}
                >
                    {/* 画像に軽いズーム効果 */}
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={staticFile(imagePath)}
                            alt={templateName}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transform: `scale(${interpolate(frame, [0, cardDuration], [1.05, 1], { extrapolateRight: "clamp" })})`,
                                transition: "transform 0.1s linear",
                            }}
                        />
                    </div>

                    {/* グラデーションオーバーレイ（改善版） */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "220px",
                            background: "linear-gradient(to top, rgba(15,15,26,0.98) 0%, rgba(15,15,26,0.7) 40%, rgba(15,15,26,0.3) 60%, transparent 100%)",
                        }}
                    />

                    {/* 装飾ライン */}
                    <div
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "30px",
                            right: "30px",
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.6), transparent)",
                            opacity: finalOpacity,
                        }}
                    />

                    {/* テンプレート名（アニメーション付き） */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "50px",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            transform: `translateY(${textY}px)`,
                            opacity: textOpacity,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "56px",
                                color: "#ffffff",
                                margin: 0,
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 800,
                                textShadow: "0 4px 40px rgba(0,0,0,0.9), 0 0 30px rgba(167, 139, 250, 0.4)",
                                letterSpacing: "0.02em",
                                background: "linear-gradient(180deg, #ffffff 0%, #e9d5ff 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {templateName}
                        </h3>
                        <p
                            style={{
                                fontSize: "16px",
                                color: "#a78bfa",
                                margin: "12px 0 0 0",
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 500,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                            }}
                        >
                            Streamer Template
                        </p>
                    </div>

                    {/* コーナー装飾 */}
                    <div
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "20px",
                            width: "40px",
                            height: "40px",
                            borderTop: "2px solid rgba(167, 139, 250, 0.8)",
                            borderLeft: "2px solid rgba(167, 139, 250, 0.8)",
                            borderRadius: "8px 0 0 0",
                            opacity: finalOpacity,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            width: "40px",
                            height: "40px",
                            borderTop: "2px solid rgba(167, 139, 250, 0.8)",
                            borderRight: "2px solid rgba(167, 139, 250, 0.8)",
                            borderRadius: "0 8px 0 0",
                            opacity: finalOpacity,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            left: "20px",
                            width: "40px",
                            height: "40px",
                            borderBottom: "2px solid rgba(167, 139, 250, 0.8)",
                            borderLeft: "2px solid rgba(167, 139, 250, 0.8)",
                            borderRadius: "0 0 0 8px",
                            opacity: finalOpacity,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            right: "20px",
                            width: "40px",
                            height: "40px",
                            borderBottom: "2px solid rgba(167, 139, 250, 0.8)",
                            borderRight: "2px solid rgba(167, 139, 250, 0.8)",
                            borderRadius: "0 0 8px 0",
                            opacity: finalOpacity,
                        }}
                    />
                </div>
            </div>
        </AbsoluteFill>
    );
};

// サムネイルカルーセル（プロフェッショナル版）
// サムネイルカルーセル（3D キューブ版）
const ThumbnailCarousel: React.FC = () => {
    return <RotatingCube />;
};

// トランジションコンポーネント（プロフェッショナル版）
const TransitionCount: React.FC<{ count: number }> = ({ count }) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
    const scale = interpolate(frame, [0, 25], [0.2, 1.1], { extrapolateRight: "clamp" });
    const rotate = interpolate(frame, [0, 20], [-45, 0], { extrapolateRight: "clamp" });
    const rotateBack = interpolate(frame, [20, 45], [0, 3], { extrapolateRight: "clamp" });

    // 背景のバーストエフェクト（多重）
    const burstScale = interpolate(frame, [0, 20], [0, 3], { extrapolateRight: "clamp" });
    const burstOpacity = interpolate(frame, [0, 20], [1, 0], { extrapolateRight: "clamp" });

    const burstScale2 = interpolate(frame, [5, 25], [0, 2.5], { extrapolateRight: "clamp" });
    const burstOpacity2 = interpolate(frame, [5, 25], [0.8, 0], { extrapolateRight: "clamp" });

    // 光のリング
    const ringScale = interpolate(frame, [0, 30], [0.5, 2], { extrapolateRight: "clamp" });
    const ringOpacity = interpolate(frame, [0, 25], [0.6, 0], { extrapolateRight: "clamp" });

    // カウントの光彩
    const glowScale = interpolate(frame, [10, 35], [0.5, 1.5], { extrapolateRight: "clamp" });
    const glowOpacity = interpolate(frame, [10, 30], [0.8, 0.3], { extrapolateRight: "clamp" });

    // パーティクル爆発
    const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
        angle: (i / 12) * Math.PI * 2,
        speed: 150 + Math.random() * 100,
        size: 3 + Math.random() * 5,
    })), []);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#050510",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            {/* 放射状グラデーション背景 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "radial-gradient(ellipse at center, #1e1b4b 0%, #050510 70%)",
                }}
            />

            {/* バーストエフェクト 1 */}
            <div
                style={{
                    position: "absolute",
                    width: "1000px",
                    height: "1000px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 60%)",
                    opacity: burstOpacity,
                    transform: `scale(${burstScale})`,
                    filter: "blur(60px)",
                }}
            />

            {/* バーストエフェクト 2 */}
            <div
                style={{
                    position: "absolute",
                    width: "800px",
                    height: "800px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, transparent 50%)",
                    opacity: burstOpacity2,
                    transform: `scale(${burstScale2})`,
                    filter: "blur(40px)",
                }}
            />

            {/* 光のリング */}
            <div
                style={{
                    position: "absolute",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    border: "4px solid rgba(196, 181, 253, 0.5)",
                    opacity: ringOpacity,
                    transform: `scale(${ringScale})`,
                    boxShadow: "0 0 80px rgba(139, 92, 246, 0.6)",
                }}
            />

            {/* 中央グロー */}
            <div
                style={{
                    position: "absolute",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, transparent 70%)",
                    opacity: glowOpacity,
                    transform: `scale(${glowScale})`,
                    filter: "blur(80px)",
                }}
            />

            {/* パーティクル爆発 */}
            {particles.map((particle, i) => {
                const x = Math.cos(particle.angle) * particle.speed * interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
                const y = Math.sin(particle.angle) * particle.speed * interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
                const pOpacity = interpolate(frame, [0, 15, 30], [1, 0.8, 0], { extrapolateRight: "clamp" });

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            backgroundColor: "#c4b5fd",
                            borderRadius: "50%",
                            opacity: pOpacity,
                            transform: `translate(${x}px, ${y}px)`,
                            filter: "blur(2px)",
                            boxShadow: "0 0 15px rgba(196, 181, 253, 0.8)",
                        }}
                    />
                );
            })}

            <div
                style={{
                    textAlign: "center",
                    opacity,
                    transform: `scale(${scale}) rotate(${rotate + rotateBack}deg)`,
                    zIndex: 10,
                }}
            >
                <h2
                    style={{
                        fontSize: "180px",
                        color: "#ffffff",
                        margin: 0,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 900,
                        background: "linear-gradient(135deg, #ffffff 0%, #e9d5ff 40%, #a78bfa 70%, #7c3aed 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 0 100px rgba(139, 92, 246, 0.8), 0 0 150px rgba(124, 58, 237, 0.5), 0 10px 40px rgba(0, 0, 0, 0.5)",
                        filter: "drop-shadow(0 0 40px rgba(139, 92, 246, 0.6))",
                    }}
                >
                    {count}
                </h2>
                <p
                    style={{
                        fontSize: "36px",
                        color: "#c4b5fd",
                        margin: "20px 0 0 0",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        textShadow: "0 0 30px rgba(196, 181, 253, 0.6)",
                    }}
                >
                    Templates Available
                </p>
            </div>
        </AbsoluteFill>
    );
};

// クロージングコンポーネント（プロフェッショナル版）
const Closing: React.FC = () => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
    const titleY = interpolate(frame, [0, 25], [80, 0], { extrapolateRight: "clamp" });
    const titleScale = interpolate(frame, [0, 30], [0.85, 1], { extrapolateRight: "clamp" });

    // 背景のグラデーションアニメーション
    const bgOpacity = interpolate(frame, [0, 35], [0, 1], { extrapolateRight: "clamp" });
    const bgScale = interpolate(frame, [0, 40], [1.2, 1], { extrapolateRight: "clamp" });

    // 複数のパーティクル
    const particles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
        startX: (i % 3) * 30 + 10,
        startY: (i / 8) * 100 + 50,
        speed: 80 + i * 20,
        size: 2 + (i % 3),
        color: i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#a78bfa" : "#c4b5fd",
    })), []);

    // 光のリング（背景）
    const ringScale = interpolate(frame, [0, 50], [0.5, 1.8], { extrapolateRight: "clamp" });
    const ringOpacity = interpolate(frame, [0, 40], [0.4, 0], { extrapolateRight: "clamp" });
    const ringRotation = interpolate(frame, [0, 90], [0, 90], { extrapolateRight: "clamp" });

    // フェードアウト準備
    const fadeOutOpacity = interpolate(frame, [70, 90], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#050510",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            {/* 深层グラデーション */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "radial-gradient(ellipse at center, #1e1b4b 0%, #0f0a1e 40%, #050510 80%)",
                    opacity: bgOpacity,
                    transform: `scale(${bgScale})`,
                }}
            />

            {/* 光のリング */}
            <div
                style={{
                    position: "absolute",
                    width: "800px",
                    height: "800px",
                    borderRadius: "50%",
                    border: "2px solid rgba(139, 92, 246, 0.3)",
                    opacity: ringOpacity,
                    transform: `scale(${ringScale}) rotate(${ringRotation}deg)`,
                    boxShadow: "0 0 60px rgba(139, 92, 246, 0.3)",
                }}
            />

            {/* 追加のリング */}
            <div
                style={{
                    position: "absolute",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    border: "1px solid rgba(167, 139, 250, 0.2)",
                    opacity: ringOpacity * 0.7,
                    transform: `scale(${ringScale * 0.8}) rotate(${-ringRotation}deg)`,
                }}
            />

            {/* パーティクル */}
            {particles.map((particle, i) => {
                const x = particle.startX + interpolate(frame, [0, 90], [0, (i % 2 === 0 ? 1 : -1) * 30], { extrapolateRight: "clamp" });
                const y = particle.startY + interpolate(frame, [0, 90], [0, -particle.speed], { extrapolateRight: "clamp" });
                const pOpacity = interpolate(frame, [0, 20, 70, 90], [0, 0.6, 0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            backgroundColor: particle.color,
                            borderRadius: "50%",
                            opacity: pOpacity,
                            filter: "blur(2px)",
                            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                            transition: "transform 0.05s linear",
                        }}
                    />
                );
            })}

            {/* 中央のグロー */}
            <div
                style={{
                    position: "absolute",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)",
                    opacity: interpolate(frame, [0, 30], [0.5, 0.2], { extrapolateRight: "clamp" }),
                    filter: "blur(80px)",
                }}
            />

            <div
                style={{
                    textAlign: "center",
                    opacity: fadeOutOpacity,
                    transform: `translateY(${titleY}px) scale(${titleScale})`,
                    zIndex: 10,
                }}
            >
                <h2
                    style={{
                        fontSize: "28px",
                        color: "#94a3b8",
                        margin: "0 0 20px 0",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        opacity: interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" }),
                        textShadow: "0 0 20px rgba(148, 163, 184, 0.4)",
                    }}
                >
                    Find Your Perfect Template
                </h2>

                <h1
                    style={{
                        fontSize: "84px",
                        color: "#ffffff",
                        margin: "24px 0",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 900,
                        letterSpacing: "-0.01em",
                        background: "linear-gradient(135deg, #ffffff 0%, #e9d5ff 40%, #a78bfa 70%, #60a5fa 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 0 60px rgba(139, 92, 246, 0.5), 0 0 100px rgba(96, 165, 250, 0.3), 0 10px 30px rgba(0, 0, 0, 0.5)",
                        filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))",
                    }}
                >
                    HP Template Portal
                </h1>

                {/* 装飾ライン */}
                <div
                    style={{
                        width: "150px",
                        height: "3px",
                        background: "linear-gradient(90deg, transparent, #60a5fa, #a78bfa, #60a5fa, transparent)",
                        margin: "32px auto",
                        borderRadius: "2px",
                        boxShadow: "0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(167, 139, 250, 0.4)",
                        opacity: interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" }),
                    }}
                />

                <p
                    style={{
                        fontSize: "18px",
                        color: "#64748b",
                        margin: "20px 0 0 0",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        letterSpacing: "0.08em",
                        opacity: interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" }),
                    }}
                >
                    Professional Website Templates
                </p>

                {/* CTA ボタン風デザイン */}
                <div
                    style={{
                        marginTop: "40px",
                        padding: "16px 40px",
                        background: "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(96, 165, 250, 0.2) 100%)",
                        borderRadius: "30px",
                        border: "1px solid rgba(139, 92, 246, 0.4)",
                        display: "inline-block",
                        opacity: interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" }),
                        boxShadow: "0 10px 40px rgba(124, 58, 237, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)",
                    }}
                >
                    <span
                        style={{
                            fontSize: "16px",
                            color: "#c4b5fd",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        Start Creating
                    </span>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// メインコンポーネント
interface StreamerIntroProps {
    ctaText?: string;
}

export const StreamerIntro: React.FC<StreamerIntroProps> = ({
    ctaText = "Get Started Today",
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0a0a14" }}>
            {/* オープニング：0-90 フレーム (3 秒) */}
            <Sequence from={0} durationInFrames={90}>
                <Opening />
            </Sequence>

            {/* サムネイルカルーセル：90-450 フレーム (12 秒) */}
            {/* 6 テンプレート × 60 フレーム = 360 フレーム */}
            <Sequence from={90} durationInFrames={360}>
                <ThumbnailCarousel />
            </Sequence>

            {/* カウント表示：450-495 フレーム (1.5 秒) */}
            <Sequence from={450} durationInFrames={45}>
                <TransitionCount count={26} />
            </Sequence>

            {/* クロージング：495-600 フレーム (3.5 秒) */}
            <Sequence from={495} durationInFrames={105}>
                <Closing />
            </Sequence>
        </AbsoluteFill>
    );
};
