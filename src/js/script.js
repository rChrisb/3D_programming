import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

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

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
scene.add(directionalLight);
directionalLight.position.set(-50, 70, 0);
// directionalLight.angle = Math.PI / 2;
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -10;
// directionalLight.shadow.mapSize.width = 2000;
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dirLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(dLightShadowHelper);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const spereMaterial1 = new THREE.MeshStandardMaterial({
  color: 0x4e37bf,
  wireframe: false,
});
const spereMaterial2 = new THREE.MeshStandardMaterial({
  color: 0xb89900,
  wireframe: false,
});
const sphere1 = new THREE.Mesh(sphereGeometry, spereMaterial1);
const sphere2 = new THREE.Mesh(sphereGeometry, spereMaterial2);
scene.add(sphere1);
sphere1.position.set(-10, -10, 0);
sphere1.castShadow = true;
scene.add(sphere2);
sphere2.position.set(10, 10, 0);
sphere2.castShadow = true;

const gui = new dat.GUI();
const options = {
  sphere2Color: "#ffea00",
  sphere1Color: "#ffea00",
  wireframe: false,
  speed: 0.02,
};
gui.addColor(options, "sphere1Color").onChange(function (e) {
  sphere1.material.color.set(e);
});
gui.addColor(options, "sphere2Color").onChange(function (e) {
  sphere2.material.color.set(e);
});
gui.add(options, "wireframe").onChange(function (e) {
  sphere1.material.wireframe = e;
  sphere2.material.wireframe = e;
});
gui.add(options, "speed", 0, 0.05);

let step = 0;

function animate() {
  box.rotation.x += 0.02;
  box.rotation.y += 0.02;
  // sphere1.rotation.x += 0.0;
  // sphere1.rotation.y += 0.05;
  step += options.speed;
  sphere1.position.y = 10 * Math.abs(Math.sin(step));
  sphere2.position.y = 10 * Math.abs(Math.sin(step));

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
