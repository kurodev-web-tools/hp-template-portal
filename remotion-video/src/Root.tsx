
import { Composition } from 'remotion';
import { HeroVideo } from './Composition';
import './style.css';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="HeroVideo"
                component={HeroVideo}
                durationInFrames={300} // 10 seconds at 30fps
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
