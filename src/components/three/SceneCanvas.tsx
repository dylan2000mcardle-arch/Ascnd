"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface SceneCanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  dpr?: [number, number];
}

export default function SceneCanvas({
  children,
  className = "",
  cameraPosition = [0, 0, 5],
  cameraFov = 45,
  dpr = [1, 2],
}: SceneCanvasProps) {
  return (
    <div className={`canvas-container ${className}`}>
      <Canvas
        dpr={dpr}
        camera={{ position: cameraPosition, fov: cameraFov, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
