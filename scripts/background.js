import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const container = document.getElementById('canvas');
const loader = new GLTFLoader();

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
light.position.set(4.5, 10, 4.5)
scene.add( light );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 5, 0, 0 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );

loader.load( 'assets/logo.gltf', function ( gltf ) {
	
	scene.add( gltf.scene ); 
	
}, undefined, function ( error ) {
	
	console.error( error );
	
} );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({
    color: 0x0095DD
});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();

function animate() {
	cube.rotation.y += 0.01
	cube.rotation.x += 0.01
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );