"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

interface JawModelProps {
  morphProgress: number; // 0 = receding, 1 = defined
}

export default function JawModel({ morphProgress }: JawModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentMorph = useRef(0);

  // Generate jaw geometry with morph targets
  const { geometry } = useMemo(() => {
    const segments = 32;
    const rings = 24;
    const vertices: number[] = [];
    const morphVertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let ring = 0; ring <= rings; ring++) {
      const v = ring / rings;
      const y = (v - 0.5) * 3.0; // vertical range

      for (let seg = 0; seg <= segments; seg++) {
        const u = seg / segments;
        const theta = u * Math.PI * 2;

        // BASE SHAPE (receding jaw)
        let radius: number;
        if (y > 0.5) {
          // Forehead/top — round
          radius = 0.9 - (y - 0.5) * 0.3;
        } else if (y > -0.2) {
          // Mid-face — cheeks
          radius = 0.85 + 0.1 * Math.cos(theta * 2);
        } else if (y > -0.8) {
          // Jaw area — weak/receding
          const jawFade = (-0.2 - y) / 0.6;
          radius = 0.8 - jawFade * 0.35; // weak taper
          // Less angular, more rounded
          radius += 0.03 * Math.cos(theta * 2);
        } else {
          // Chin — recessed
          radius = 0.4 - (y + 0.8) * 0.3;
          radius = Math.max(radius, 0.05);
        }

        const x = Math.sin(theta) * radius;
        const z = Math.cos(theta) * radius * 0.75; // flatten front-to-back
        vertices.push(x, y, z);

        // MORPH TARGET (defined/ascended jaw)
        let morphRadius: number;
        if (y > 0.5) {
          morphRadius = 0.9 - (y - 0.5) * 0.3; // same forehead
        } else if (y > -0.2) {
          // Slightly more defined cheekbones
          morphRadius = 0.88 + 0.15 * Math.cos(theta * 2);
        } else if (y > -0.8) {
          // DEFINED jaw — wider, more angular
          const jawFade = (-0.2 - y) / 0.6;
          morphRadius = 0.9 - jawFade * 0.15; // much less taper
          // Sharp angular jaw
          morphRadius += 0.08 * Math.abs(Math.cos(theta * 2));
          // Jaw "corners"
          const cornerAngle = Math.abs(Math.sin(theta));
          morphRadius += cornerAngle * 0.06 * (1 - jawFade);
        } else {
          // Chin — projected forward, stronger
          morphRadius = 0.5 - (y + 0.8) * 0.25;
          morphRadius = Math.max(morphRadius, 0.08);
        }

        const mx = Math.sin(theta) * morphRadius;
        const mz = Math.cos(theta) * morphRadius * 0.78;
        morphVertices.push(mx, y, mz);

        // Normal (approximate)
        normals.push(Math.sin(theta), 0, Math.cos(theta));

        // UVs
        uvs.push(u, v);
      }
    }

    // Build indices
    for (let ring = 0; ring < rings; ring++) {
      for (let seg = 0; seg < segments; seg++) {
        const a = ring * (segments + 1) + seg;
        const b = a + segments + 1;
        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    const geo = new THREE.BufferGeometry();
    const basePositions = new Float32Array(vertices);
    const morphPositions = new Float32Array(morphVertices);

    geo.setAttribute("position", new THREE.BufferAttribute(basePositions, 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(normals), 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geo.setIndex(indices);

    // Morph target: the delta from base to defined
    const morphDeltas = new Float32Array(morphPositions.length);
    for (let i = 0; i < morphPositions.length; i++) {
      morphDeltas[i] = morphPositions[i] - basePositions[i];
    }

    geo.morphAttributes.position = [new THREE.BufferAttribute(morphDeltas, 3)];
    geo.computeVertexNormals();

    return { geometry: geo };
  }, []);

  // Update morph target influence
  useFrame(() => {
    if (!meshRef.current) return;
    currentMorph.current += (morphProgress - currentMorph.current) * 0.04;
    meshRef.current.morphTargetInfluences![0] = currentMorph.current;

    // Slow rotation
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.0} />
      <pointLight position={[-2, 0, 3]} intensity={0.6} color="#00f3ff" />

      <mesh
        ref={meshRef}
        geometry={geometry}
        rotation={[0, -0.5, 0]}
        position={[0, -0.3, 0]}
        morphTargetInfluences={[0]}
      >
        <meshPhysicalMaterial
          color="#2a2a2a"
          roughness={0.5}
          metalness={0.3}
          clearcoat={0.2}
          wireframe={false}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay for tech aesthetic */}
      <mesh
        geometry={geometry}
        rotation={[0, -0.5, 0]}
        position={[0, -0.3, 0]}
        morphTargetInfluences={[currentMorph.current]}
      >
        <meshBasicMaterial
          color="#00f3ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </>
  );
}
