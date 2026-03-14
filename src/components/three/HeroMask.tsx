"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/hooks/useScrollProgress";

export default function HeroMask() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Create the mask shape via lathe geometry (profile curve)
  const maskGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const segments = 40;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      // Profile: eye mask shape — wider in middle, tapered at edges
      const y = (t - 0.5) * 2.8; // vertical range
      // Width varies: wide at center (eyes), narrow at top/bottom
      const width =
        1.4 * Math.exp(-y * y * 0.4) * // gaussian base shape
        (1 + 0.15 * Math.sin(t * Math.PI * 2)); // subtle undulation
      points.push(new THREE.Vector2(Math.max(width, 0.01), y));
    }

    const geo = new THREE.LatheGeometry(points, 48);
    // Scale to eye-mask proportions
    geo.scale(1, 0.35, 0.3);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Strap geometry
  const strapGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.3, 0, 0),
      new THREE.Vector3(-1.8, 0.1, 0.8),
      new THREE.Vector3(-1.6, 0.2, 1.6),
      new THREE.Vector3(-0.8, 0.3, 2.0),
      new THREE.Vector3(0, 0.3, 2.1),
      new THREE.Vector3(0.8, 0.3, 2.0),
      new THREE.Vector3(1.6, 0.2, 1.6),
      new THREE.Vector3(1.8, 0.1, 0.8),
      new THREE.Vector3(1.3, 0, 0),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.04, 8, false);
  }, []);

  // Animate on scroll: 3/4 view → profile
  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    // Scroll drives Y rotation from ~-0.3 (3/4) to ~-1.3 (profile)
    const scrollY = scrollState.progress;
    targetRotation.current.y = -0.3 - scrollY * 1.0;

    // Subtle mouse influence
    targetRotation.current.x = pointer.y * 0.1;
    const mouseYaw = pointer.x * 0.15;

    // Smooth lerp
    groupRef.current.rotation.y +=
      (targetRotation.current.y + mouseYaw - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={0.8} color="#00f3ff" distance={10} />
      <pointLight position={[3, -1, 3]} intensity={0.4} color="#00f3ff" distance={8} />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={groupRef} rotation={[0, -0.3, 0]}>
          {/* Main mask body */}
          <mesh geometry={maskGeometry} castShadow>
            <meshPhysicalMaterial
              color="#1a1a1a"
              roughness={0.7}
              metalness={0.1}
              clearcoat={0.3}
              clearcoatRoughness={0.4}
              sheen={0.8}
              sheenRoughness={0.3}
              sheenColor={new THREE.Color("#00f3ff")}
              envMapIntensity={0.6}
            />
          </mesh>

          {/* Nose bridge piece */}
          <mesh position={[0, -0.15, -0.25]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.3, 0.12, 0.15]} />
            <meshPhysicalMaterial
              color="#0a0a0a"
              roughness={0.4}
              metalness={0.8}
              envMapIntensity={1.2}
            />
          </mesh>

          {/* Strap */}
          <mesh geometry={strapGeometry}>
            <meshPhysicalMaterial
              color="#111111"
              roughness={0.6}
              metalness={0.15}
              sheen={0.5}
              sheenRoughness={0.4}
              sheenColor={new THREE.Color("#333333")}
            />
          </mesh>

          {/* Chrome buckle left */}
          <mesh position={[-1.35, 0, 0.15]}>
            <boxGeometry args={[0.12, 0.18, 0.06]} />
            <meshStandardMaterial
              color="#c0c0c0"
              roughness={0.1}
              metalness={1.0}
              envMapIntensity={2.0}
            />
          </mesh>

          {/* Chrome buckle right */}
          <mesh position={[1.35, 0, 0.15]}>
            <boxGeometry args={[0.12, 0.18, 0.06]} />
            <meshStandardMaterial
              color="#c0c0c0"
              roughness={0.1}
              metalness={1.0}
              envMapIntensity={2.0}
            />
          </mesh>

          {/* Subtle eye contour indentations */}
          <mesh position={[-0.45, 0, -0.28]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshPhysicalMaterial
              color="#0d0d0d"
              roughness={0.8}
              metalness={0.05}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh position={[0.45, 0, -0.28]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshPhysicalMaterial
              color="#0d0d0d"
              roughness={0.8}
              metalness={0.05}
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* ASCND branding — small emissive strip */}
          <mesh position={[0, 0.42, -0.2]} rotation={[0.1, 0, 0]}>
            <planeGeometry args={[0.6, 0.04]} />
            <meshStandardMaterial
              color="#00f3ff"
              emissive="#00f3ff"
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      </Float>
    </>
  );
}
