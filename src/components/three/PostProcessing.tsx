"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

interface PostProcessingProps {
  bloomIntensity?: number;
  bloomThreshold?: number;
}

export default function PostProcessing({
  bloomIntensity = 1.5,
  bloomThreshold = 0.3,
}: PostProcessingProps) {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
    </EffectComposer>
  );
}
