import { Composition } from "remotion";
import { HelloVideo } from "./components/HelloVideo";
import { StaffRoll } from "./components/StaffRoll";
import { StaffRollPro } from "./components/StaffRollPro";
import { StreamerIntro } from "./components/StreamerIntro";
import { StreamerTrailer } from "./components/StreamerTrailer";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HelloVideo"
        component={HelloVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "Hello World!",
          titleColor: "#3B82F6",
        }}
      />
      <Composition
        id="StaffRoll"
        component={StaffRoll}
        durationInFrames={960}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          domainText: "ご相談・ご質問お気軽に",
        }}
      />
      <Composition
        id="StaffRollPro"
        component={StaffRollPro}
        durationInFrames={1080}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          domainText: "ご相談・ご質問お気軽に",
        }}
      />
      <Composition
        id="StreamerIntro"
        component={StreamerIntro}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          ctaText: "Get Started Today",
        }}
      />
      <Composition
        id="StreamerTrailer"
        component={StreamerTrailer}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
