"use client";

import SceneCanvas from "@/components/three/SceneCanvas";
import JawModel from "@/components/three/JawModel";
import MouthTape from "@/components/three/MouthTape";
import PostProcessing from "@/components/three/PostProcessing";

interface JawSceneProps {
  morphProgress: number;
  tapeVisible: boolean;
  tapeAttach: number;
}

export default function JawScene({
  morphProgress,
  tapeVisible,
  tapeAttach,
}: JawSceneProps) {
  return (
    <SceneCanvas
      className="h-full w-full"
      cameraPosition={[0, 0, 4.5]}
      cameraFov={40}
    >
      <JawModel morphProgress={morphProgress} />
      <MouthTape visible={tapeVisible} attachProgress={tapeAttach} />
      <PostProcessing bloomIntensity={1.0} bloomThreshold={0.4} />
    </SceneCanvas>
  );
}
