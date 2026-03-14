"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

interface MouthTapeProps {
  visible: boolean;
  attachProgress: number; // 0 = floating away, 1 = attached
}

export default function MouthTape({ visible, attachProgress }: MouthTapeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentProgress = useRef(0);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    currentProgress.current +=
      ((visible ? attachProgress : 0) - currentProgress.current) * 0.04;

    const p = currentProgress.current;

    // Float in from below-right, attach to chin
    groupRef.current.position.x = THREE.MathUtils.lerp(2.5, 0, p);
    groupRef.current.position.y = THREE.MathUtils.lerp(-2, -1.05, p);
    groupRef.current.position.z = THREE.MathUtils.lerp(3, 0.6, p);

    // Rotate to align with jaw
    groupRef.current.rotation.z = THREE.MathUtils.lerp(0.3, 0, p);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(-0.2, 0.1, p);

    // Gentle float when not fully attached
    if (p < 0.95) {
      groupRef.current.position.y += Math.sin(clock.getElapsedTime() * 2) * 0.05 * (1 - p);
    }

    // Opacity
    groupRef.current.visible = p > 0.01;
  });

  return (
    <group ref={groupRef}>
      {/* Tape strip */}
      <RoundedBox args={[1.0, 0.35, 0.02]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* ASCND branding on tape */}
      <Text
        position={[0, 0, 0.015]}
        fontSize={0.06}
        color="#00f3ff"
        font="/fonts/SpaceMono-Regular.woff2"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        ASCND
      </Text>

      {/* Subtle cyan edge glow */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.05, 0.4]} />
        <meshBasicMaterial
          color="#00f3ff"
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  );
}
