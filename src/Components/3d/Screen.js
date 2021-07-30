import {RoundedBox} from "@react-three/drei";

function Screen() {
  return (
    <group visible position={[0, -0, 1]}>
      {/* Header*/}
      <mesh position={[0, 1.58, 0]}>
        <RoundedBox args={[5, 0.6, 0.3]} radius={0.1} smoothness={5}>
          <meshStandardMaterial
            color={"#fcc2fb"}
            roughness={0.7}
            metalness={0.6}
          />
        </RoundedBox>
      </mesh>
      {/* Main Screen*/}
      <mesh position={[-0.95, 0, 0]}>
        <RoundedBox args={[3.08, 2.2, 0.3]} radius={0.1} smoothness={5}>
          <meshStandardMaterial
            color={"#57b6fa"}
            roughness={0.7}
            metalness={0.6}
          />
        </RoundedBox>
      </mesh>
      {/*Menu*/}
      <mesh position={[1.65, 0, 0]}>
        <RoundedBox args={[1.7, 2.2, 0.3]} radius={0.1} smoothness={5}>
          <meshStandardMaterial
            color={"#fcc2fb"}
            roughness={0.7}
            metalness={0.6}
          />
        </RoundedBox>
      </mesh>
      {/*Footer*/}
      <mesh position={[-1.65, -1.8, 0]}>
        <RoundedBox args={[1.7, 1, 0.3]} radius={0.1} smoothness={5}>
          <meshStandardMaterial
            color={"#fcc2fb"}
            roughness={0.7}
            metalness={0.6}
          />
        </RoundedBox>
      </mesh>
      {/*Footer2*/}
      <mesh position={[0.95, -1.8, 0]}>
        <RoundedBox args={[3.08, 1, 0.3]} radius={0.1} smoothness={5}>
          <meshStandardMaterial
            color={"#57b6fa"}
            roughness={0.7}
            metalness={0.6}
          />
        </RoundedBox>
      </mesh>
    </group>
  );
}

export default Screen;
