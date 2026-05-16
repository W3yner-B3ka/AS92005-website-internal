import * as THREE from "https://esm.sh/three@0.160.0";
import { OrbitControls } from "https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js";

// Planet defines which texture to load,
// set in the HTML as a data attribute on the body element
const planet = document.body.dataset.planet;

const canvas = document.getElementById("scene");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

const controls = new OrbitControls(camera, renderer.domElement);

// ----------------------
// TEXTURE LOGIC
// ----------------------

const textureLoader = new THREE.TextureLoader();

const textures = {
  moon: "../textures/moon/8k_moon.jpg",
  mars: "../textures/mars/8k_mars.jpg",
};

const planetTexture = textureLoader.load(
  textures[planet],
  () => console.log("Texture loaded"),
  undefined,
  (err) => console.error(err),
);

// ----------------------
// SPHERE
// ----------------------

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
  }),
);

scene.add(sphere);

// ----------------------
// LIGHTING
// ----------------------

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// ----------------------
// STARS
// ----------------------

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// ----------------------
// ANIMATION LOOP
// ----------------------

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.01;
  controls.update();

  renderer.render(scene, camera);
}

animate();
