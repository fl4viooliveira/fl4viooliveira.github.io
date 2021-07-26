import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere,
} from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas>
      <mesh
        visible
        userData={{ test: "hello" }}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="#7222d3"
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, -10, 5]} intensity={1} />
      <Sphere visible position={[-3, 0, 0]} args={[1, 16, 200]}>
        <MeshWobbleMaterial
          attach="material"
          color="#eb1e99"
          factor={1}
          speed={2}
          roughness={0}
        />
      </Sphere>
      <Sphere visible position={[3, 0, 0]} args={[1, 16, 200]}>
        <MeshDistortMaterial
          color="#00a38d"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
        />
      </Sphere>
    </Canvas>
  );
}
