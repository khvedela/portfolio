<script lang="ts">
  import * as THREE from 'three';
  import { createEventDispatcher, onMount } from 'svelte';
  import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
  import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
  import { convertMeshesVenom } from '../utils/convertMeshesVenom';

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let composer: EffectComposer;
  let monasteryGroup: THREE.Group;
  let monastery: THREE.Group | null = null;

  let isLoading = true;
  let revealHeight = 0;
  let revealMinY = 0;
  let revealMaxY = 10;
  let revealSpeed = 0.05;
  let clock = new THREE.Clock();

  const dispatch = createEventDispatcher();

  // Environment variables
  const WORKER_URL = import.meta.env.VITE_WORKER_URL;
  const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

  // Function to generate a signed token
  async function generateSignedToken(secretKey: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(secretKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
  }

  async function loadModel() {
    const loader = new GLTFLoader();

    try {
      // Generate the signed token
      const token = await generateSignedToken(SECRET_KEY);

      // URL-encode the file name
      const fileName = encodeURIComponent("SantesCreusMonastery.glb");

      // Construct the secure URL with the encoded filename
      const modelUrl = `${WORKER_URL}/${fileName}?token=${token}`;

      // Load the model
      loader.load(
        modelUrl,
        (gltf: GLTF) => {
          monastery = gltf.scene;
          convertMeshesVenom(monastery);
          computeBoundingBox(monastery);

          monastery.position.set(0, 0, 0);
          monastery.scale.set(1, 1, 1);
          monasteryGroup.add(monastery);

          isLoading = false;
          dispatch('loaded');
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
          isLoading = false;
          dispatch('loaded');
        }
      );
    } catch (error) {
      console.error('Error generating token or loading model:', error);
      isLoading = false;
    }
  }

  function computeBoundingBox(obj: THREE.Object3D) {
    obj.updateMatrixWorld(true);
    const bbox = new THREE.Box3().setFromObject(obj);
    revealMinY = bbox.min.y;
    revealMaxY = bbox.max.y;
    revealHeight = revealMinY;
  }

  function animateScene() {
    requestAnimationFrame(animateScene);

    // Animate reveal from bottom to top
    if (monastery && revealHeight < revealMaxY) {
      revealHeight += revealSpeed;
      if (revealHeight > revealMaxY) revealHeight = revealMaxY;
      monastery.traverse((child: any) => {
        if (child.material?.uniforms?.uRevealHeight) {
          child.material.uniforms.uRevealHeight.value = revealHeight;
        }
      });
    }

    // Rotate the group slowly
    monasteryGroup.rotation.y += 0.0005;

    composer.render();
  }

  function setupBloom() {
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,
      0.2,
      0.85
    );
    composer.addPass(bloomPass);
  }

  function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    scene.add(directionalLight);
  }

  onMount(() => {
    const canvas = document.querySelector('#bg-canvas') as HTMLCanvasElement;

    scene = new THREE.Scene();
    monasteryGroup = new THREE.Group();
    scene.add(monasteryGroup);

    renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(-3, 8, 15);
    scene.add(camera);

    addLights();
    setupBloom();
    loadModel();
    animateScene();

    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  });

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
</script>

<canvas id="bg-canvas" class="fixed top-0 left-0 w-full h-full pointer-events-none"></canvas>

{#if isLoading}
  <div class="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
    <p class="text-white text-2xl font-bold">Loading...</p>
  </div>
{/if}

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>