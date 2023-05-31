import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// legt neue Scene an
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x42f5f2 } );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

camera.position.z = 5;

const gloader = new GLTFLoader();
gloader.load('./models/buster_drone/scene.gltf', (drone) => {
    scene.add(drone.scene);
});

const light = new THREE.AmbientLight(0x83c5f7);
scene.add(light);

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    "./penguins-skybox-pack/penguins/divine_ft.jpg",
    "./penguins-skybox-pack/penguins/divine_bk.jpg",
    "./penguins-skybox-pack/penguins/divine_up.jpg",
    "./penguins-skybox-pack/penguins/divine_dn.jpg",
    "./penguins-skybox-pack/penguins/divine_rt.jpg",
    "./penguins-skybox-pack/penguins/divine_lf.jpg",
]);
scene.background = texture;


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();