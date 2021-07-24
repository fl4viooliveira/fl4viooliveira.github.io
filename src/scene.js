import { get_store_value } from "svelte/internal";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("#canvas1");

// Scene
const scene = new THREE.Scene();
// scene.position.x = 1;
// scene.position.z = -0.5;

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 7;
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
// monitor.position.x = 1.0;
// monitor.position.z = -1.0;
// monitor.rotation.y = -0.48;

// Header

const textureLoad = new THREE.TextureLoader();
const matcapTexture5 = textureLoad.load("textures/matcaps/3.png");
const matcapTexture6 = textureLoad.load("textures/matcaps/4.png");
const matcapTexture7 = textureLoad.load("textures/matcaps/2.png");
const matcapTexture8 = textureLoad.load("textures/matcaps/6.png");

const header = new THREE.Mesh(
  createBoxWithRoundedEdges(5, 0.6, 0.3, 0.1, 5),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 })
  // new THREE.MeshStandardMaterial({
  //   color: "#fcc2fb",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
header.position.y = 1.58;
monitor.add(header);

// Menu Head
for (let i = 0; i < 3; i++) {
  const menuHead = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32),
    new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 })
    // new THREE.MeshStandardMaterial({
    //   color: "#e0f6ff",
    //   roughness: 0.7,
    //   metalness: 0.6,
    // })
  );
  menuHead.position.x = -1.8 + i / 2;
  menuHead.position.y = 1.56;
  menuHead.position.z = 0.18;
  menuHead.rotation.z = 1.57;
  monitor.add(menuHead);
}

// Search
const search = new THREE.Mesh(
  createBoxWithRoundedEdges(1, 0.4, 0.2, 0.07, 5),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 })
  // new THREE.MeshStandardMaterial({
  //   color: "#e0f6ff",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
search.position.x = 1.58;
search.position.y = 1.58;
search.position.z = 0.12;
monitor.add(search);

//magnifier
const magnifier = new THREE.Mesh(
  new THREE.TorusGeometry(0.07, 0.02, 16, 100),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })
  // new THREE.MeshStandardMaterial({
  //   color: "#57b6fa",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
magnifier.position.x = 1.25;
magnifier.position.y = 1.62;
magnifier.position.z = 0.24;
monitor.add(magnifier);

const magnifierStick = new THREE.Mesh(
  new THREE.CylinderGeometry(0.02, 0.02, 0.1, 16),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })
  // new THREE.MeshStandardMaterial({
  //   color: "#57b6fa",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
magnifierStick.position.x = 1.31;
magnifierStick.position.y = 1.51;
magnifierStick.position.z = 0.24;
magnifierStick.rotation.z = 0.45;
monitor.add(magnifierStick);

// Main
const main = new THREE.Mesh(
  createBoxWithRoundedEdges(3.08, 2.2, 0.3, 0.1, 5),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 })
  // new THREE.MeshStandardMaterial({
  //   color: "#57b6fa",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
main.position.x = -0.95;
monitor.add(main);

// Img
const img = new THREE.Mesh(
  createBoxWithRoundedEdges(2.7, 1.82, 0.2, 0.1, 5),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 })
  // new THREE.MeshStandardMaterial({
  //   color: "#e0f6ff",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
img.position.x = -0.95;
img.position.z = 0.12;
monitor.add(img);

const triangleShape = new THREE.Shape();
triangleShape.moveTo(-0.4, -0.8);
// triangleShape.lineTo(0, 0);
triangleShape.lineTo(-1.3, 0.3);
triangleShape.lineTo(-2.2, -0.8);
const triangleGeometry = new THREE.ShapeGeometry(triangleShape);
const triangleMaterial = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture8,
});
// new THREE.MeshStandardMaterial({
//   color: "#57b6fa",
//   roughness: 0.7,
//   metalness: 0.6,
// });
const meshTriangle1 = new THREE.Mesh(triangleGeometry, triangleMaterial);
meshTriangle1.position.z = 0.23;
monitor.add(meshTriangle1);

const sun = new THREE.Mesh(
  new THREE.CircleGeometry(0.3, 32),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })
  // new THREE.MeshStandardMaterial({
  //   color: "#57b6fa",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
sun.position.x = -0.09;
sun.position.y = 0.44;
sun.position.z = 0.23;
monitor.add(sun);

// Menu
const menu = new THREE.Mesh(
  createBoxWithRoundedEdges(1.7, 2.2, 0.3, 0.1, 5),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture6 })
  // new THREE.MeshStandardMaterial({
  //   color: "#fcc2fb",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
menu.position.x = 1.65;
monitor.add(menu);

// Side menu
for (let i = 0; i < 3; i++) {
  // Icon
  const menuIcon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32),
    new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })
    // new THREE.MeshStandardMaterial({
    //   color: "#57b6fa",
    //   roughness: 0.7,
    //   metalness: 0.6,
    // })
  );
  menuIcon.position.x = 0.98;
  menuIcon.position.y = 0.87 - i / 1.5;
  menuIcon.position.z = 0.07;
  menuIcon.rotation.x = 1.57;

  // Lines
  const lines = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.7, 32),
    new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 })
    // new THREE.MeshStandardMaterial({
    //   color: "#e0f6ff",
    //   roughness: 0.7,
    //   metalness: 0.6,
    // })
  );
  lines.position.x = 1.45;
  lines.position.y = 0.87 - i / 1.5;
  lines.position.z = 0.18;
  lines.rotation.z = 1.57;

  // Lines 2
  const lines2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.4, 32),
    new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 })
    // new THREE.MeshStandardMaterial({
    //   color: "#e0f6ff",
    //   roughness: 0.7,
    //   metalness: 0.6,
    // })
  );
  lines2.position.x = 2.08;
  lines2.position.y = 0.87 - i / 1.5;
  lines2.position.z = 0.18;
  lines2.rotation.z = 1.57;

  monitor.add(menuIcon, lines, lines2);
}

// Footer
const footer = new THREE.Mesh(
  createBoxWithRoundedEdges(1.7, 1, 0.3, 0.1, 5),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture6 })
  // new THREE.MeshStandardMaterial({
  //   color: "#fcc2fb",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
footer.position.x = -1.65;
footer.position.y = -1.8;
monitor.add(footer);

const footer2 = new THREE.Mesh(
  createBoxWithRoundedEdges(3.08, 1, 0.3, 0.1, 5),
  new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 })
  // new THREE.MeshStandardMaterial({
  //   color: "#57b6fa",
  //   roughness: 0.7,
  //   metalness: 0.6,
  // })
);
footer2.position.x = 0.95;
footer2.position.y = -1.8;
monitor.add(footer2);
// -----------------------------------------

// Elements out of monitor
const randomElements = new THREE.Group();
scene.add(randomElements);

// Text
// TODO

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("textures/matcaps/4.png");
const matcapTexture2 = textureLoader.load("textures/matcaps/2.png");
const matcapTexture3 = textureLoader.load("textures/matcaps/8.png");
const matcapTexture4 = textureLoader.load("textures/matcaps/7.png");

const fontLoader = new THREE.FontLoader();

fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const parameters = {
    font: font,
    size: 0.7,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  };
  const textGeometry = new THREE.TextGeometry(".js", parameters);
  const text2Geometry = new THREE.TextGeometry(".py", parameters);
  const text3Geometry = new THREE.TextGeometry(".html", parameters);
  const text4Geometry = new THREE.TextGeometry(".css", parameters);
  // textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 });
  const material3 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 });
  const material4 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture4 });

  for (let i = 0; i < 50; i++) {
    const text = new THREE.Mesh(textGeometry, material);
    const text2 = new THREE.Mesh(text2Geometry, material2);
    const text3 = new THREE.Mesh(text3Geometry, material3);
    const text4 = new THREE.Mesh(text4Geometry, material4);

    text.position.x = (Math.random() - 0.5) * 20;
    text.position.y = (Math.random() - 0.5) * 20;
    text.position.z = (Math.random() - 0.5) * 20;

    text2.position.x = (Math.random() - 0.5) * 20;
    text2.position.y = (Math.random() - 0.5) * 20;
    text2.position.z = (Math.random() - 0.5) * 20;

    text3.position.x = (Math.random() - 0.5) * 20;
    text3.position.y = (Math.random() - 0.5) * 20;
    text3.position.z = (Math.random() - 0.5) * 20;

    text4.position.x = (Math.random() - 0.5) * 20;
    text4.position.y = (Math.random() - 0.5) * 20;
    text4.position.z = (Math.random() - 0.5) * 20;

    // text.rotation.x = Math.random() * Math.PI;
    text.rotation.y = Math.random() * Math.PI;

    // text2.rotation.x = Math.random() * Math.PI;
    text2.rotation.y = Math.random() * Math.PI;

    // text3.rotation.x = Math.random() * Math.PI;
    text3.rotation.y = Math.random() * Math.PI;

    // text4.rotation.x = Math.random() * Math.PI;
    text4.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    text.scale.set(scale, scale, scale);
    text2.scale.set(scale, scale, scale);
    text3.scale.set(scale, scale, scale);
    text4.scale.set(scale, scale, scale);

    randomElements.add(text, text2, text3, text4);
  }
});

const elementGeometry1 = new THREE.TorusGeometry(0.05, 0.01, 16, 100);
const elementMaterial = new THREE.MeshStandardMaterial({
  color: "#57b6fa",
  roughness: 0.7,
  metalness: 0.6,
});

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
camera.position.x = 3;
camera.position.y = -1.5;
camera.position.z = 7.7;
scene.add(camera);

// Pivot point
const pivotPoint = new THREE.Object3D();
monitor.add(pivotPoint);
pivotPoint.add(randomElements);

// Renderer
let renderer;

export const createScene = (webgl) => {
  renderer = new THREE.WebGLRenderer({
    canvas: webgl,
    alpha: false,
    antialias: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // Controls
  const controls = new OrbitControls(camera, webgl);
  controls.enabled = true;
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 0.5;

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

    pivotPoint.rotation.y += 0.003;

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  // Animate randomElements

  // ----------------------------------------
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
