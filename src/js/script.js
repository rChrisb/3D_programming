import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// import river from "../images/news1.jpg";
// import sea from "../images/news2.jpg";
import clouds from "../images/clouds.jpg";
import moon from "../images/moon.jpg";
import earth from "../images/earth.jpg";
// import messi from "../images/debut-messi.gif";
// import space from "../images/space.gif";
// import design from "../images/design.gif";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.setClearColor(0x1f6c5a);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0xffffff, 0.01);
scene.fog = new THREE.Fog(0, 0, 700);

const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(sea);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  clouds,
  clouds,
  clouds,
  clouds,
  clouds,
  clouds,
]);
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
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
// scene.add(directionalLight);
// directionalLight.position.set(-20, 70, 0);
// // directionalLight.angle = Math.PI / 2;
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -10;
// // directionalLight.shadow.mapSize.width = 2000;
// const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dirLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-30, 60);
spotLight.castShadow = true;
spotLight.angle = 0.3;
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
const box2Geometry = new THREE.BoxGeometry(3, 3, 6);
const box2Material = new THREE.MeshStandardMaterial({
  /* color: 0xb33e24, */
  map: textureLoader.load(clouds),
});
const box2 = new THREE.Mesh(box2Geometry, box2Material);
scene.add(box2);
box2.position.set(-3, 13);
box.castShadow = true;
box2.castShadow = true;

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
  /* color: 0x4e37bf, */
  map: textureLoader.load(moon),
  wireframe: false,
});
const spereMaterial2 = new THREE.MeshStandardMaterial({
  /* color: 0xb89900, */
  map: textureLoader.load(earth),
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
  angle: 0.3,
  penumbra: 0,
  intensity: 1,
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

gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 1);

let step = 0;

function animate() {
  box.rotation.x += 0.02;
  box.rotation.y += 0.02;
  // sphere1.rotation.x += 0.0;
  // sphere1.rotation.y += 0.05;
  step += options.speed;
  sphere1.position.y = 10 * Math.abs(Math.sin(step));
  sphere2.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.angle = options.angle;
  spotLight.intensity = options.intensity;
  spotLight.penumbra = options.penumbra;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
