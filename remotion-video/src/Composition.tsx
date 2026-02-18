
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import React from 'react';
import templates from '../public/templates.json';

// Configuration
const COLUMNS = 4;
const IMAGES_PER_COLUMN = 8;
const IMAGE_HEIGHT = 400;
const GAP = 20;
const ITEM_HEIGHT = IMAGE_HEIGHT + GAP; // 420px
const TOTAL_HEIGHT = IMAGES_PER_COLUMN * ITEM_HEIGHT; // 3360px
const SPEED = 2; // px per frame. 3360 / 2 = 1680 frames.

// Pre-process data safely
const safeTemplates = (templates && templates.length > 0) ? templates : [];

const Column: React.FC<{
    images: any[];
    columnIndex: number;
    delayOffset: number; // To stagger the visual start position
}> = ({ images, columnIndex, delayOffset }) => {
    const frame = useCurrentFrame();

    // Scroll Logic
    // We want to scroll UP.
    // Base scroll = frame * SPEED
    // Add visual offset to stagger columns: (columnIndex * fixed_amount)
    // But this offset must NOT affect the loop period, just the phase.
    // Actually, simply shifting the initial Y position is enough.
    // translateY = - ((frame * SPEED + delayOffset) % TOTAL_HEIGHT)

    // Wait, if we add delayOffset, we shift the phase. 
    // At frame 1680, (1680*2 + delay) % 3360 = (3360 + delay) % 3360 = delay % 3360.
    // At frame 0, (0 + delay) % 3360 = delay % 3360.
    // So the start and end positions match perfectly!

    const scrollY = (frame * SPEED) + delayOffset;
    const translateY = -(scrollY % TOTAL_HEIGHT);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: GAP,
            width: '100%',
            position: 'absolute',
            top: 0,
            transform: `translateY(${translateY}px)`
        }}>
            {/* 
               Render 3 sets (Before, Current, After) to cover the view.
               Since TOTAL_HEIGHT (3360) > Screen Height (1080), 2 sets is theoretically enough,
               but 3 ensures no gaps at boundaries.
            */}
            {[...images, ...images, ...images].map((t, i) => (
                <div key={i} style={{
                    height: IMAGE_HEIGHT,
                    width: '100%',
                    borderRadius: 12, // Slightly more rounded
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.6)', // Deeper shadow
                    flexShrink: 0,
                    margin: 0,
                    position: 'relative',
                }}>
                    {t.image ? (
                        <Img
                            src={staticFile(t.image)}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'brightness(0.85) contrast(1.1)', // Subtle enhancement
                            }}
                        />
                    ) : <div style={{ background: '#222', width: '100%', height: '100%' }} />}

                    {/* Optional: template name overlay on hover-like effect? No, keep clean. */}
                </div>
            ))}
        </div>
    );
};

export const HeroVideo: React.FC = () => {
    if (safeTemplates.length === 0) return <AbsoluteFill style={{ backgroundColor: '#000' }} />;

    // Prepare columns
    // We need exactly COLUMNS * IMAGES_PER_COLUMN = 32 images.
    // If we have more, we pick first 32. If less, we repeat.
    const needed = COLUMNS * IMAGES_PER_COLUMN;
    const sourcePool = [...safeTemplates];
    while (sourcePool.length < needed) {
        sourcePool.push(...safeTemplates);
    }
    const usedTemplates = sourcePool.slice(0, needed);

    const columnData: any[][] = Array.from({ length: COLUMNS }, () => []);
    usedTemplates.forEach((t, i) => {
        columnData[i % COLUMNS].push(t);
    });

    return (
        <AbsoluteFill style={{
            backgroundColor: '#0a0a0a', // Almost black
            flexDirection: 'row',
            gap: 20, // Horizontal gap
            padding: '0 20px', // Horizontal padding
            overflow: 'hidden'
        }}>
            {columnData.map((colImages, i) => (
                <div key={i} style={{
                    flex: 1,
                    position: 'relative',
                    height: '100%',
                }}>
                    <Column
                        images={colImages}
                        columnIndex={i}
                        // Stagger each column by 1/4 of item height or similar to look random
                        // i * 300 ensures they don't align perfectly
                        delayOffset={i * 900}
                    />
                </div>
            ))}

            {/* Vignette Overlay for focus */}
            <AbsoluteFill style={{
                background: 'radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)',
                pointerEvents: 'none',
                zIndex: 10
            }} />

            {/* Bottom Fade for text readability */}
            <AbsoluteFill style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%)',
                pointerEvents: 'none',
                zIndex: 11
            }} />
        </AbsoluteFill>
    );
};
