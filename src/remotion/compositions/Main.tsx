import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Artifact,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Inter";
import {
  BounceChars,
  FlipInChars,
  WaveText,
  BlurReveal,
} from "../library/components/text/TextAnimation";
import { LinearGradient } from "../library/components/effects/LinearGradient";

const { fontFamily } = loadFont();

// Brand colors from Typeframes
const colors = {
  bg: "#0A0A0A",
  purple: "#A855F7",
  blue: "#3B82F6",
  white: "#FFFFFF",
  gray: "#9CA3AF",
};

// ===== SCENE COMPONENTS =====

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const glowOpacity = interpolate(frame, [0, 20], [0, 0.8], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily }}>
      {/* Animated gradient background */}
      <LinearGradient
        colors={["#0A0A0A", "#1a0a2e", "#0A0A0A"]}
        direction={45}
        animate
        animationType="breathe"
        speed={0.5}
      />

      {/* Floating orbs */}
      <FloatingOrbs />

      {/* Logo glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${colors.purple}40 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(60px)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <FlipInChars
          className="text-7xl font-black tracking-tight"
          style={{ color: colors.white }}
        >
          typeframes
        </FlipInChars>

        <BlurReveal
          className="text-xl tracking-widest uppercase"
          style={{ color: colors.gray }}
          stagger={0.03}
          startFrom={25}
        >
          Video Magic from Words
        </BlurReveal>
      </div>
    </AbsoluteFill>
  );
};

const PromptScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

  const typedText = "Create a stunning product demo video...";
  const charsToShow = Math.min(Math.floor(frame / 1.5), typedText.length);
  const displayText = typedText.slice(0, charsToShow);

  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily }}>
      <LinearGradient
        colors={["#0A0A0A", "#0f0520", "#0A0A0A"]}
        direction={135}
      />

      <FloatingOrbs />

      {/* Big Title */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <BounceChars
          className="text-5xl font-bold"
          style={{
            background: `linear-gradient(90deg, ${colors.purple}, ${colors.blue})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Just Type a Prompt
        </BounceChars>
      </div>

      {/* Prompt Box */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${boxScale})`,
          width: 700,
          padding: 30,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: `0 0 60px ${colors.purple}30`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: colors.gray, fontSize: 24 }}>✨</span>
          <span style={{ color: colors.white, fontSize: 22, fontWeight: 500 }}>
            {displayText}
            <span
              style={{ opacity: cursorBlink ? 1 : 0, color: colors.purple }}
            >
              |
            </span>
          </span>
        </div>
      </div>

      {/* Generate Button */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: "50%",
          transform: `translateX(-50%) scale(${spring({ frame: frame - 30, fps, config: { damping: 12 } })})`,
          opacity: frame > 30 ? 1 : 0,
        }}
      >
        <div
          style={{
            padding: "16px 48px",
            background: `linear-gradient(90deg, ${colors.purple}, ${colors.blue})`,
            borderRadius: 12,
            color: colors.white,
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Generate Video →
        </div>
      </div>
    </AbsoluteFill>
  );
};

const MagicScene: React.FC = () => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame, [0, 60], [0, 360]);
  const pulseScale = interpolate(Math.sin(frame * 0.3), [-1, 1], [0.9, 1.1]);

  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily }}>
      <LinearGradient
        colors={[colors.purple + "40", colors.bg, colors.blue + "40"]}
        direction={rotation}
      />

      {/* Spinning magic circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${pulseScale})`,
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: `3px solid ${colors.purple}`,
          boxShadow: `0 0 40px ${colors.purple}, inset 0 0 40px ${colors.purple}30`,
        }}
      />

      {/* AI Processing text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <WaveText
          className="text-4xl font-bold"
          style={{ color: colors.white }}
          amplitude={15}
        >
          AI Creating...
        </WaveText>
      </div>
    </AbsoluteFill>
  );
};

const SpeedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numberValue = Math.min(Math.floor(frame * 2), 60);
  const scale = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });

  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily }}>
      <LinearGradient
        colors={["#0A0A0A", "#0a1628", "#0A0A0A"]}
        direction={90}
      />

      <FloatingOrbs />

      {/* Big number */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 180,
            fontWeight: 900,
            background: `linear-gradient(135deg, ${colors.purple}, ${colors.blue})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}
        >
          {numberValue}s
        </div>
        <BlurReveal
          className="text-3xl font-medium"
          style={{ color: colors.gray, marginTop: 20 }}
          startFrom={15}
        >
          From prompt to video
        </BlurReveal>
      </div>
    </AbsoluteFill>
  );
};

const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = ["AI-Powered", "No Editing Skills", "Instant Export"];

  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily }}>
      <LinearGradient
        colors={["#0A0A0A", "#150a20", "#0A0A0A"]}
        direction={180}
      />

      <FloatingOrbs />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {features.map((feature, i) => {
          const delay = i * 12;
          const featureScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const opacity = frame > delay ? 1 : 0;

          return (
            <div
              key={feature}
              style={{
                transform: `scale(${featureScale})`,
                opacity,
                padding: "20px 60px",
                background: `linear-gradient(90deg, ${colors.purple}20, ${colors.blue}20)`,
                borderRadius: 100,
                border: `1px solid ${colors.purple}50`,
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                {feature}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  const glowPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.5, 1]);

  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily }}>
      <LinearGradient
        colors={[colors.purple + "30", colors.bg, colors.blue + "30"]}
        direction={135}
        animate
        animationType="breathe"
        speed={0.8}
      />

      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: `radial-gradient(circle, ${colors.purple}50 0%, transparent 60%)`,
          opacity: glowPulse,
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          textAlign: "center",
        }}
      >
        <BounceChars
          className="text-6xl font-black"
          style={{ color: colors.white, marginBottom: 30 }}
        >
          Try It Free
        </BounceChars>

        <BlurReveal
          className="text-2xl"
          style={{ color: colors.gray }}
          startFrom={20}
        >
          typeframes.com
        </BlurReveal>
      </div>
    </AbsoluteFill>
  );
};

// ===== HELPER COMPONENTS =====

const FloatingOrbs: React.FC = () => {
  const frame = useCurrentFrame();

  const orbs = [
    { x: "20%", y: "30%", size: 200, color: colors.purple, speed: 0.02 },
    { x: "80%", y: "60%", size: 150, color: colors.blue, speed: 0.015 },
    { x: "60%", y: "20%", size: 100, color: colors.purple, speed: 0.025 },
  ];

  return (
    <>
      {orbs.map((orb, i) => {
        const offsetY = Math.sin(frame * orb.speed + i) * 30;
        const offsetX = Math.cos(frame * orb.speed + i) * 20;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color}30 0%, transparent 70%)`,
              transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`,
              filter: "blur(40px)",
            }}
          />
        );
      })}
    </>
  );
};

// ===== MAIN COMPOSITION =====

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene durations (30fps)
  const INTRO = 50;
  const PROMPT = 70;
  const MAGIC = 45;
  const SPEED = 55;
  const FEATURES = 60;
  const CTA = 50;
  const TRANSITION = 12;

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={PROMPT}>
          <PromptScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={MAGIC}>
          <MagicScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SPEED}>
          <SpeedScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={FEATURES}>
          <FeaturesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={CTA}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
