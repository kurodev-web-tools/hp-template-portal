
import { Composition } from 'remotion';
import { HeroVideo } from './Composition';

// 30 FPS
// Speed 2 px/frame
// 8 images per column * (400px image + 20px gap) = 3360px total height
// Duration = 3360 / 2 = 1680 frames (~56 seconds)
// This ensures perfect loop because at frame 1680, we have scrolled exactly the full height of the content, returning to start.

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="HeroVideo"
                component={HeroVideo}
                durationInFrames={1680}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
