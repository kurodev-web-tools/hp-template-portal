
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import React from 'react';
import templates from '../public/templates.json';

// Configuration
const COLUMNS = 4;
const SCROLL_SPEED_BASE = 2; // Pixels per frame approx

const Column: React.FC<{
    images: any[];
    speed: number;
    delay: number;
}> = ({ images, speed, delay }) => {
    const frame = useCurrentFrame();

    // Fixed image height for calculation
    const IMAGE_HEIGHT = 400; // Aspect ratio of around 0.6
    const GAP = 15;
    const TOTAL_ITEM_HEIGHT = IMAGE_HEIGHT + GAP;
    const NUM_IMAGES = images.length;
    const TOTAL_HEIGHT = NUM_IMAGES * TOTAL_ITEM_HEIGHT;

    // Calculate scroll
    // We scroll UP (negative Y)
    // Offset by delay to stagger
    const scrollY = (frame * speed) + delay;

    // Infinite loop math
    // We render 3 sets: [Set1][Set2][Set3]
    // We translate the whole container up.
    // When we scroll past Set1 (TOTAL_HEIGHT), we wrap around.
    // Actually, simple modulo on the translation is better.
    // TranslateY = -(scrollY % TOTAL_HEIGHT)
    // But this jumps.
    // To be seamless, we need at least 2 full sets visible if the screen is tall.
    // For 1080p, we need about 3 screen heights to be safe.

    const yParams = -(scrollY % TOTAL_HEIGHT);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: GAP,
            width: '100%',
            position: 'absolute',
            top: 0,
            transform: `translateY(${yParams}px)`
        }}>
            {/* 
               Render enough duplicates to cover the scroll.
               If TOTAL_HEIGHT is large enough, 2 sets are fine.
               If small, we need more. 
               Let's render 3 full sets to be safe.
            */}
            {[...images, ...images, ...images].map((t, i) => (
                <div key={i} style={{
                    height: IMAGE_HEIGHT,
                    width: '100%',
                    borderRadius: 8,
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    flexShrink: 0,
                    margin: 0,
                }}>
                    {t.image ? (
                        <Img
                            src={staticFile(t.image)}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : <div style={{ width: '100%', height: '100%', background: '#333' }} />}
                </div>
            ))}
        </div>
    );
};

export const HeroVideo: React.FC = () => {
    if (!templates || templates.length === 0) return <AbsoluteFill style={{ backgroundColor: '#000' }}><h1 style={{ color: 'white' }}>No Data</h1></AbsoluteFill>;

    // Split templates into columns
    const columnData: any[][] = Array.from({ length: COLUMNS }, () => []);
    templates.forEach((t: any, i: number) => {
        columnData[i % COLUMNS].push(t);
    });

    return (
        <AbsoluteFill style={{
            backgroundColor: '#050510',
            flexDirection: 'row',
            gap: 15,
            padding: 0,
            overflow: 'hidden'
        }}>
            {columnData.map((colImages, i) => (
                <div key={i} style={{
                    flex: 1,
                    position: 'relative',
                    height: '100%',
                    // Staggered margin top to break alignment
                    marginTop: i % 2 === 0 ? -100 : 0
                }}>
                    <Column
                        images={colImages}
                        speed={SCROLL_SPEED_BASE + (i === 1 || i === 3 ? 1.5 : 0)} // Vary speed
                        delay={i * 500} // Initial offset
                    />
                </div>
            ))}

            {/* Vignette & Color Grade */}
            <AbsoluteFill style={{
                background: 'radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)',
                pointerEvents: 'none',
                zIndex: 10
            }} />
            <AbsoluteFill style={{
                background: 'linear-gradient(to top, #000 0%, transparent 20%, transparent 80%, #000 100%)',
                pointerEvents: 'none',
                zIndex: 10
            }} />
        </AbsoluteFill>
    );
};
