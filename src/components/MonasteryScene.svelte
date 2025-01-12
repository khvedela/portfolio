<script lang="ts">
	import * as THREE from 'three';
	import { createEventDispatcher, onMount } from 'svelte';
	import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
	import { dustVertex, dustFragment } from '../shaders/DustShaders';
	import { venomWireVertex, venomWireFragment } from '../shaders/VenomWireShaders';

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let composer: EffectComposer;
	let monasteryGroup: THREE.Group;
	let monastery: THREE.Group | null = null;
	let particleSystem: THREE.Points | null = null;

	let isLoading = true;
	let revealHeight = 0;
	let revealMinY = 0;
	let revealMaxY = 10;
	let revealSpeed = 0.05;
	let clock = new THREE.Clock();

	const dispatch = createEventDispatcher();

	const WORKER_URL = import.meta.env.VITE_WORKER_URL;
	const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

	async function generateSignedToken(secretKey: string): Promise<string> {
		const encoder = new TextEncoder();
		const data = encoder.encode(secretKey);
		const hashBuffer = await crypto.subtle.digest('SHA-256', data);
		return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
	}

	async function loadModel() {
		const loader = new GLTFLoader();
		try {
			const token = await generateSignedToken(SECRET_KEY);
			const fileName = encodeURIComponent('SantesCreusMonastery.glb');
			const modelUrl = `${WORKER_URL}/${fileName}?token=${token}`;
			loader.load(
				modelUrl,
				(gltf: GLTF) => {
					monastery = gltf.scene;
					applyVenomWireShader(monastery);
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

	function setupParticles() {
		const particleCount = 3000;
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);
		const sizes = new Float32Array(particleCount);

		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 50;
			positions[i * 3 + 1] = Math.random() * 20;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

			velocities[i * 3] = (Math.random() - 0.5) * 0.02;
			velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01;
			velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

			sizes[i] = Math.random() * 0.02 + 0.1;
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
		geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

		const material = new THREE.ShaderMaterial({
			vertexShader: dustVertex,
			fragmentShader: dustFragment,
			uniforms: {
				uTime: { value: 0 }
			},
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});

		particleSystem = new THREE.Points(geometry, material);
		scene.add(particleSystem);
	}

	function animateParticles(delta: number) {
		if (!particleSystem) return;
		const positions = particleSystem.geometry.attributes.position.array as Float32Array;
		const velocities = particleSystem.geometry.attributes.velocity.array as Float32Array;

		for (let i = 0; i < positions.length / 3; i++) {
			positions[i * 3] += velocities[i * 3];
			positions[i * 3 + 1] += velocities[i * 3 + 1];
			positions[i * 3 + 2] += velocities[i * 3 + 2];

			if (positions[i * 3 + 1] > 30 || positions[i * 3 + 1] < -10) {
				positions[i * 3] = (Math.random() - 0.5) * 50;
				positions[i * 3 + 1] = -10;
				positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
			}
		}

		particleSystem.geometry.attributes.position.needsUpdate = true;
		particleSystem.material.uniforms.uTime.value += delta;
	}

	function applyVenomWireShader(object3D: THREE.Object3D) {
		object3D.traverse((child: any) => {
			if (child.isMesh && child.geometry) {
				const geometry = child.geometry;
				const randY = new Float32Array(geometry.attributes.position.count);
				for (let i = 0; i < randY.length; i++) {
					randY[i] = (Math.random() - 0.5) * 5.0;
				}
				geometry.setAttribute('aRandY', new THREE.BufferAttribute(randY, 1));

				child.material = new THREE.ShaderMaterial({
					vertexShader: venomWireVertex,
					fragmentShader: venomWireFragment,
					uniforms: {
						uTime: { value: 0 },
						uRevealHeight: { value: 0 },
						uBaseColor: { value: new THREE.Color(0xffffff) },
						uAccentColor: { value: new THREE.Color(0xdc143c) }
					},
					transparent: true,
					wireframe: true
				});
			}
		});
	}

	function animateScene() {
		requestAnimationFrame(animateScene);
		const delta = clock.getDelta();

		if (particleSystem) animateParticles(delta);
		if (monasteryGroup) monasteryGroup.rotation.y += 0.001;

		if (monastery && revealHeight < revealMaxY) {
			revealHeight += revealSpeed;
			if (revealHeight > revealMaxY) revealHeight = revealMaxY;
			monastery.traverse((child: any) => {
				if (child.material?.uniforms?.uRevealHeight) {
					child.material.uniforms.uRevealHeight.value = revealHeight;
				}
			});
		}

		composer.render();
	}

	function setupBloom() {
		composer = new EffectComposer(renderer);
		const renderPass = new RenderPass(scene, camera);
		composer.addPass(renderPass);
		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			1.0,
			0.3,
			0.9
		);
		composer.addPass(bloomPass);
	}

	function addLights() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
		directionalLight.position.set(10, 20, 10);
		scene.add(directionalLight);
	}

	onMount(() => {
		const canvas = document.querySelector('#bg-canvas') as HTMLCanvasElement;

		scene = new THREE.Scene();
		monasteryGroup = new THREE.Group();
		scene.add(monasteryGroup);

		renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.set(0, 10, 20);

		addLights();
		setupParticles();
		setupBloom();
		loadModel();
		animateScene();

		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			composer.setSize(window.innerWidth, window.innerHeight);
		});
	});
</script>

<canvas id="bg-canvas" class="pointer-events-none fixed left-0 top-0 h-full w-full"></canvas>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}
</style>
