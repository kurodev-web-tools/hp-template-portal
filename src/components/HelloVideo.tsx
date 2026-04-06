import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";

interface HelloVideoProps {
  titleText: string;
  titleColor: string;
}

export const HelloVideo: React.FC<HelloVideoProps> = ({
  titleText,
  titleColor,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 30], [0.5, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a1a",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <Sequence from={0} durationInFrames={150}>
        <h1
          style={{
            fontSize: "120px",
            color: titleColor,
            transform: `scale(${scale})`,
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontWeight: "bold",
          }}
        >
          {titleText}
        </h1>
      </Sequence>
    </AbsoluteFill>
  );
};
