import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const container = document.getElementById('canvas');
const loader = new GLTFLoader();

const back = document.getElementById('back');
const forward = document.getElementById('forward');

const light = new THREE.DirectionalLight( 0x404040, 20 ); // soft white light
light.position.set(4.5, 10, 4.5)
scene.add( light );

// const spotLight = new THREE.SpotLight( 0xffffff );
// // spotLight.position.set( 0, 100, 10 );
// spotLight.position.x += 10
// spotLight.position.y += 10
// scene.add( spotLight );

// const spotLight2 = new THREE.SpotLight( 0xffffff );
// spotLight2.position.x -= 10
// spotLight2.position.y -= 10
// scene.add( spotLight2 );
let valueOfPos = 0
loader.load( 'assets/car.gltf', function ( gltf ) {
	
	scene.add( gltf.scene );
	gsap.timeline()
	// gsap.to(gltf.scene.position, {duration: 1, x: 1})
	back.addEventListener('click', () => {
		valueOfPos -= 1
		gsap.to(gltf.scene.rotation, {duration: 1, y: valueOfPos})
	})
	
	forward.addEventListener('click', () => {
		valueOfPos += 1
		gsap.to(gltf.scene.rotation, {duration: 1, y: valueOfPos})
	})
	
}, function(xhr) {
	
	console.log((xhr.loaded/xhr.total * 100) + '% loaded')
	
} );

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshPhongMaterial({
//     color: 0x0095DD
// });
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;
camera.position.x = 0;
// gsap.timeline()
// gsap.to(camera.position, {duration: 1, x: 0.5, ease: "slow(0.7, 0.7, false)"})
camera.position.y = 1;

const renderer = new THREE.WebGLRenderer({ antialias: true });


// const controls = new OrbitControls( camera, renderer.domElement );
function animate() {
	// cube.rotation.y += 0.01
	// cube.rotation.x += 0.01
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
renderer.setClearColor('#111111')
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );