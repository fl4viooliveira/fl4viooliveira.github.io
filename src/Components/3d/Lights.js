function Lights() {
  return (
    <scene>
      <ambientLight color="#ffffff" intensity="0.9" />
      <pointLight color="#ffffff" intensity="1.9" position={[2, 3, 7]} />
    </scene>
  );
}

export default Lights;
