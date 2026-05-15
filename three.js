import * as THREE from "https://esm.sh/three@0.160.0";
import { OrbitControls } from "https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js";

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
  alpha: true, //allows to see the background of the website through the canvas
});
renderer.setClearColor(0x000000, 0); // Set the clear color to transparent

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }),
);

scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.01;
  controls.update();

  renderer.render(scene, camera);
}

animate();
