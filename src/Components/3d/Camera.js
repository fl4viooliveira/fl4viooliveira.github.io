import { PerspectiveCamera } from "@react-three/drei";

function Camera() {
  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  return (
    <PerspectiveCamera
      resolution={[sizes.width / sizes.height]}
      fieldOfView={75}
      near={0.1}
      far={1000}
      position={[3, -1.5, 7.7]}
    />
  );
}

export default Camera;
