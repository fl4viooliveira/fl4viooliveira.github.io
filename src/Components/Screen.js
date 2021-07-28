import { Canvas } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";

function Screen() {
  return (
    <group visible position={[0, -0, 1]}>
      <mesh position={[0, 1.58, 0]}>
        // Header
        <boxGeometry args={[5, 0.6, 0.3]} />
        <meshStandardMaterial
          color={"#fcc2fb"}
          roughness={0.7}
          metalness={0.6}
        />
      </mesh>
      // Main Screen
      <mesh position={[-0.95, 0, 0]}>
        <boxGeometry args={[3.08, 2.2, 0.3]} />
        <meshStandardMaterial
          color={"#57b6fa"}
          roughness={0.7}
          metalness={0.6}
        />
      </mesh>
      // Menu
      <mesh position={[1.65, 0, 0]}>
        <boxGeometry args={[1.7, 2.2, 0.3]} />
        <meshStandardMaterial
          color={"#fcc2fb"}
          roughness={0.7}
          metalness={0.6}
        />
      </mesh>
      // Footer
      <mesh position={[-1.65, -1.8, 0]}>
        <boxGeometry args={[1.7, 1, 0.3]} />
        <meshStandardMaterial
          color={"#fcc2fb"}
          roughness={0.7}
          metalness={0.6}
        />
      </mesh>
      // Footer 2
      <mesh position={[0.95, -1.8, 0]}>
        <boxGeometry args={[3.08, 1, 0.3]} />
        <meshStandardMaterial
          color={"#57b6fa"}
          roughness={0.7}
          metalness={0.6}
        />
      </mesh>{" "}
    </group>
  );
}

export default Screen;
