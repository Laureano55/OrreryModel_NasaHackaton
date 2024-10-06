// Configura la escena
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear esfera para el planeta
var geocircle = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var sphere = new THREE.Mesh(geocircle, material);
scene.add(sphere);

// Crear esfera para el Sol
var solGeo = new THREE.SphereGeometry(4, 32, 32);
var solMaterial = new THREE.MeshBasicMaterial({ color: 0xffff10 });
var sol = new THREE.Mesh(solGeo, solMaterial);
scene.add(sol);

// Posicionar la cámara
camera.position.set(4, -13, 20);
camera.rotation.set(Math.PI/6, Math.PI/6, 0);
// Configurar OrbitControls
//const controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.update();

let angle = 0;
const radius = 10;
const radiusl = 7;

// Animación
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    sphere.position.x = radius * Math.cos(angle);
    sphere.position.z = radius * Math.sin(angle);

  

    // Increase the angle for the next frame
    angle += 0.05; // Adjust the speed by changing the increment value

    
    renderer.render(scene, camera);
}

animate();
