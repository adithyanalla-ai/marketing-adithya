"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

function Shape() {
  const ref = useRef<Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.2;
      ref.current.rotation.y += d * 0.3;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#b4360c" wireframe />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]} aria-hidden="true">
      <Shape />
    </Canvas>
  );
}
