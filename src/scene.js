import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Rounded Edges Function
function createBoxWithRoundedEdges(width, height, depth, radius0, smoothness) {
  let shape = new THREE.Shape();
  let eps = 0.00001;
  let radius = radius0 - eps;
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(
    width - radius * 2,
    height - radius * 2,
    eps,
    Math.PI / 2,
    0,
    true
  );
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
  let geometry = new THREE.ExtrudeBufferGeometry(shape, {
    amount: depth - radius0 * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius0,
    curveSegments: smoothness,
  });

  geometry.center();

  return geometry;
}

// Objects

// Monitor container
const monitor = new THREE.Group();
scene.add(monitor);

// Header
const header = new THREE.Mesh(
  createBoxWithRoundedEdges(5, 0.6, 0.3, 0.1, 5),
  new THREE.MeshStandardMaterial({
    color: "#fcc2fb",
    roughness: 0.7,
    metalness: 0.6,
  })
);
header.position.y = 1.58;
monitor.add(header);

// Main
const main = new THREE.Mesh(
  createBoxWithRoundedEdges(3.08, 2.2, 0.3, 0.1, 5),
  new THREE.MeshStandardMaterial({
    color: "#57b6fa",
    roughness: 0.7,
    metalness: 0.6,
  })
);
main.position.x = -0.95;
monitor.add(main);

// Menu
const menu = new THREE.Mesh(
  createBoxWithRoundedEdges(1.7, 2.2, 0.3, 0.1, 5),
  new THREE.MeshStandardMaterial({
    color: "#00fc0d",
    roughness: 0.7,
    metalness: 0.6,
  })
);
menu.position.x = 1.65;
monitor.add(menu);

// Footer
const footer = new THREE.Mesh(
  createBoxWithRoundedEdges(1.7, 1, 0.3, 0.1, 5),
  new THREE.MeshStandardMaterial({
    color: "#ffcc12",
    roughness: 0.7,
    metalness: 0.6,
  })
);
footer.position.x = -1.65;
footer.position.y = -1.8;
monitor.add(footer);

const footer2 = new THREE.Mesh(
  createBoxWithRoundedEdges(3.08, 1, 0.3, 0.1, 5),
  new THREE.MeshStandardMaterial({
    color: "#ff6d12",
    roughness: 0.7,
    metalness: 0.6,
  })
);
footer2.position.x = 0.95;
footer2.position.y = -1.8;
monitor.add(footer2);

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
