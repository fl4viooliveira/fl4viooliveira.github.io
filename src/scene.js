import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  object.rotateX(THREE.Math.degToRad(degreeX));
  object.rotateY(THREE.Math.degToRad(degreeY));
  object.rotateZ(THREE.Math.degToRad(degreeZ));
}

// usage:

// Monitor container
const monitor = new THREE.Group();
scene.add(monitor);

// Screen
const screen = new THREE.Mesh(
  new THREE.BoxGeometry(5, 3, 0.1),
  new THREE.MeshBasicMaterial({ color: "#57b6fa" })
);
// screen.position.z = -1;
// screen.position.x = 2.5;
monitor.add(screen);

// Base Cylinder
const baseCylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.3, 0.3, 0.4, 10),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
baseCylinder.position.y = -1.67;
monitor.add(baseCylinder);

// Base Box
const baseBox = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.08, 1),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
baseBox.position.y = -1.9;
monitor.add(baseBox);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 4;
// camera.position.x = 0.5;
// camera.position.y = 1;
scene.add(camera);

// Renderer
let renderer;

export const createScene = (webgl) => {
  renderer = new THREE.WebGLRenderer({ canvas: webgl, alpha: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // Controls
  const controls = new OrbitControls(camera, webgl);
  controls.enabled = true;

  // Animate
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);
    renderer.setClearColor(0x000000, 0);
    // renderer.setClearColor("#ffffff");

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
