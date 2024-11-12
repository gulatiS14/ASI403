import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import Stats from "three/addons/libs/stats.module.js";

// ----------------------------------------------------------------
createRender(
  "render1",
  800,
  [0, 0, 0],
  [0.02, 0.02, 0.02],
  [-Math.PI / 2, 0, 0],
  false,
  "../../assets/motherboard_schematic_v1.stl",
);


// ----------------------------------------------------------------
function createRender(
  id,
  height,
  position,
  scale,
  rotation,
  enableAxes,
  stlFilePath,
) {
  const element = document.getElementById(id);
  element.style.border = "1px solid black";
  let width = element.clientWidth;

  if (width > window.innerWidth) {
    width = window.innerWidth * 0.7;
    height = (height * width) / 600;
    console.log(width, height);
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  if (enableAxes) scene.add(new THREE.AxesHelper(5));
  scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));
  addShadowedLight(1, 1, 1, 0xffffff, 3.5);

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 2;
  camera.position.x = 2;
  camera.position.y = 2;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  element.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  function addShadowedLight(x, y, z, color, intensity) {
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    scene.add(directionalLight);

    directionalLight.castShadow = true;

    const d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.bias = -0.002;
  }

  const loader = new STLLoader();
  loader.load(
    stlFilePath,
    function (geometry) {
      const material = new THREE.MeshPhongMaterial({
        color: 0x008C4A,
        specular: 0x666666,
        shininess: 0,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.scale.set(...scale);
      mesh.rotation.set(...rotation);

      scene.add(mesh);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    },
  );

  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    render();
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
    stats.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  animate();
}