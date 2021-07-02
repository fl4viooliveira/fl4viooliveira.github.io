import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas#canvas1");

// Scene
const scene = new THREE.Scene();

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

// Menu Head
for (let i = 0; i < 3; i++) {
  const menuHead = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32),
    new THREE.MeshStandardMaterial({
      color: "#e0f6ff",
      roughness: 0.7,
      metalness: 0.6,
    })
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
  new THREE.MeshStandardMaterial({
    color: "#e0f6ff",
    roughness: 0.7,
    metalness: 0.6,
  })
);
search.position.x = 1.58;
search.position.y = 1.58;
search.position.z = 0.12;
monitor.add(search);

//magnifier
const magnifier = new THREE.Mesh(
  new THREE.TorusGeometry(0.07, 0.02, 16, 100),
  new THREE.MeshStandardMaterial({
    color: "#57b6fa",
    roughness: 0.7,
    metalness: 0.6,
  })
);
magnifier.position.x = 1.25;
magnifier.position.y = 1.62;
magnifier.position.z = 0.24;
monitor.add(magnifier);

const magnifierStick = new THREE.Mesh(
  new THREE.CylinderGeometry(0.02, 0.02, 0.1, 16),
  new THREE.MeshStandardMaterial({
    color: "#57b6fa",
    roughness: 0.7,
    metalness: 0.6,
  })
);
magnifierStick.position.x = 1.31;
magnifierStick.position.y = 1.51;
magnifierStick.position.z = 0.24;
magnifierStick.rotation.z = 0.45;
monitor.add(magnifierStick);

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

// Img
const img = new THREE.Mesh(
  createBoxWithRoundedEdges(2.7, 1.82, 0.2, 0.1, 5),
  new THREE.MeshStandardMaterial({
    color: "#e0f6ff",
    roughness: 0.7,
    metalness: 0.6,
  })
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
const triangleMaterial = new THREE.MeshStandardMaterial({
  color: "#57b6fa",
  roughness: 0.7,
  metalness: 0.6,
});
const meshTriangle1 = new THREE.Mesh(triangleGeometry, triangleMaterial);
meshTriangle1.position.z = 0.23;
monitor.add(meshTriangle1);

const sun = new THREE.Mesh(
  new THREE.CircleGeometry(0.3, 32),
  new THREE.MeshStandardMaterial({
    color: "#57b6fa",
    roughness: 0.7,
    metalness: 0.6,
  })
);
sun.position.x = -0.09;
sun.position.y = 0.44;
sun.position.z = 0.23;
monitor.add(sun);

// Menu
const menu = new THREE.Mesh(
  createBoxWithRoundedEdges(1.7, 2.2, 0.3, 0.1, 5),
  new THREE.MeshStandardMaterial({
    color: "#fcc2fb",
    roughness: 0.7,
    metalness: 0.6,
  })
);
menu.position.x = 1.65;
monitor.add(menu);

// Side menu
for (let i = 0; i < 3; i++) {
  // Icon
  const menuIcon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32),
    new THREE.MeshStandardMaterial({
      color: "#57b6fa",
      roughness: 0.7,
      metalness: 0.6,
    })
  );
  menuIcon.position.x = 0.98;
  menuIcon.position.y = 0.87 - i / 1.5;
  menuIcon.position.z = 0.07;
  menuIcon.rotation.x = 1.57;

  // Lines
  const lines = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.7, 32),
    new THREE.MeshStandardMaterial({
      color: "#e0f6ff",
      roughness: 0.7,
      metalness: 0.6,
    })
  );
  lines.position.x = 1.45;
  lines.position.y = 0.87 - i / 1.5;
  lines.position.z = 0.18;
  lines.rotation.z = 1.57;

  // Lines 2
  const lines2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.4, 32),
    new THREE.MeshStandardMaterial({
      color: "#e0f6ff",
      roughness: 0.7,
      metalness: 0.6,
    })
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
  new THREE.MeshStandardMaterial({
    color: "#fcc2fb",
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
    color: "#57b6fa",
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
