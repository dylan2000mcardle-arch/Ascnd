"use client";

import SceneCanvas from "@/components/three/SceneCanvas";
import HeroMask from "@/components/three/HeroMask";
import LiquidGlassBackground from "@/components/three/LiquidGlassBackground";
import PostProcessing from "@/components/three/PostProcessing";

export default function HeroScene() {
  return (
    <SceneCanvas
      className="h-full w-full"
      cameraPosition={[0, 0, 4]}
      cameraFov={50}
    >
      <LiquidGlassBackground />
      <HeroMask />
      <PostProcessing bloomIntensity={1.5} bloomThreshold={0.2} />
    </SceneCanvas>
  );
}
