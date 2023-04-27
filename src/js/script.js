import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);
// camera.position.z = 5;
// camera.position.y = 1;
camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const spereMaterial = new THREE.MeshBasicMaterial({
  color: 0x000ff,
  wireframe: false,
});
const sphere1 = new THREE.Mesh(sphereGeometry, spereMaterial);
const sphere2 = new THREE.Mesh(sphereGeometry, spereMaterial);
scene.add(sphere1);
scene.add(sphere2);
sphere1.position.set(-10, -10, 0);
sphere2.position.set(10, 10, 0);
// box.rotation.set(5, 5, 0);
function animate() {
  box.rotation.x += 0.02;
  box.rotation.y += 0.02;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
