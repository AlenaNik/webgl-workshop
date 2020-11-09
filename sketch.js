// to run - canvas-sketch sketch.js

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  units: 'in',
  // Make the loop animated
  animate: true,
  pixelsPerInch: 72,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("black", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(3, 3, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // const geometry = new THREE.BoxGeometry( 1, 1, 1 );

  const texture = new THREE.TextureLoader().load("earth.jpg");
  const earthTexture = new THREE.TextureLoader().load("mars.jpg")

  // Setup a material
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 1,
    metalness: 0
  });

  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    roughness: 1,
    metalness: 0
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const earthGroup = new THREE.Group();

  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  earthMesh.position.set(1, 0.5, -1)
  earthMesh.scale.setScalar(0.25)

  earthGroup.add(earthMesh)
  scene.add(earthGroup)

  // light

  const light = new THREE.PointLight('white', 1.2)
  light.position.set(3, 3, 3);
  earthGroup.add(light)

  // helpers
  // light
  //scene.add( new THREE.PointLightHelper(light, 1))
  // grid
  //scene.add( new THREE.GridHelper(5, 50))
  // axes
  //let axesHelper = new THREE.AxesHelper(5)
  //scene.add(axesHelper)

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      mesh.rotation.y = time * 0.15;
      earthMesh.rotation.y = time * 0.2;

      earthGroup.rotation.y = time * 0.8;

      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
