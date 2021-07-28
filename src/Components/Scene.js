import { Canvas } from "@react-three/fiber";
import Screen from "./Screen";
import RandomElements from "./RandomElements";
import Lights from "./Lights";
import Camera from "./Camera";

import "./Scene.css";

function Scene() {
  return (
    <Canvas>
      <Lights />
      <Camera />
      <Screen />
      <RandomElements />
    </Canvas>
  );
}

export default Scene;
