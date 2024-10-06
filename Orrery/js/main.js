/// Configura la escena
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

// Crear esfera para Mercurio
var mercuryGeo = new THREE.SphereGeometry(2, 32, 32);
var mercuryMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa10 });
var mercury = new THREE.Mesh(mercuryGeo, mercuryMaterial);
scene.add(mercury);

// Posicionar la cámara en el centro y alejarla un poco
camera.position.set(0, 0, 20);

// Configurar OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true; // Permitir zoom con la rueda del mouse
controls.enablePan = false; // Desactivar el movimiento de paneo (opcional)

// Variables para las fórmulas orbitales
let a_0 = 0.38709843;
let ap = 0;
let e_0 = 0.20563661;
let ep = 0.00002123;
let i_0 = 7.00497902;
let ip = -0.00594749;
let L_0 = 252.25032350;
let Lp = 149472.67411175;
let B_0 = 77.45779628;
let Bp = 0.16047689;
let alfa_0 = 48.33076593;
let alfap = -0.12534081;

let T_d = 2460587;

function equation(ini, p, T) {
    return ini + p * T;
}

function normalizeAngle(angle) {
    let modAngle = ((angle % 360) + 360) % 360;
    if (modAngle > 180) {
        modAngle -= 360;
    }
    return modAngle;
}

function kepler(M, e) {
    e = e * (Math.PI / 180);

    let E = M + e * Math.sin(M);
    let Mtri = M - (E - e * Math.sin(E));
    let Etri = Mtri / (1 - e * Math.cos(E));

    E = Etri + E;

    while (Math.abs(Etri) > 0.000001) {
        Mtri = M - (E - e * Math.sin(E));
        Etri = Mtri / (1 - e * Math.cos(E));
        E = Etri + E;
    }
    return E;
}

function orbit(a_0, e_0, i_0, L_0, B_0, alfa_0, ap, ep, ip, Lp, Bp, alfap, T_d) {
    var T = (T_d - 2451245.0) / 36525;
    var a = equation(a_0, ap, T);
    var e = equation(e_0, ep, T);
    var i = equation(i_0, ip, T);
    var L = equation(L_0, Lp, T);
    var B = equation(B_0, Bp, T);
    var alfa = equation(alfa_0, alfap, T);

    var w = B - alfa;
    var M = L - B + T ** 2 + Math.cos(T) + Math.sin(T);
    M = normalizeAngle(M);
    var E = kepler(M, e);

    var xpri = a * (Math.cos(E) - e);
    var ypri = a * Math.sqrt(1 - e ** 2) * Math.sin(E);
    var zpri = 0;

    var x = xpri * (Math.cos(w) * Math.cos(alfa) - Math.sin(w) * Math.cos(i) * Math.sin(alfa)) +
        ypri * (-Math.sin(w) * Math.cos(alfa) - Math.cos(w) * Math.cos(i) * Math.sin(alfa));
    var y = xpri * (Math.cos(w) * Math.sin(alfa) + Math.sin(w) * Math.cos(i) * Math.cos(alfa)) +
        ypri * (-Math.sin(w) * Math.sin(alfa) + Math.cos(w) * Math.cos(i) * Math.cos(alfa));
    var z = xpri * (Math.sin(w) * Math.sin(i)) + ypri * (Math.cos(w) * Math.sin(i));

    return [x, y, z];
}

let angle = 0;
let space = 0;

// Animación
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    sphere.position.x = 10 * Math.cos(angle);
    sphere.position.z = 10 * Math.sin(angle);

    var xyz = orbit(a_0, e_0, i_0, L_0, B_0, alfa_0, ap, ep, ip, Lp, Bp, alfap, T_d);
    mercury.position.x = 100 * xyz[0];
    mercury.position.z = 100 * xyz[2];

    angle += -0.1;
    T_d += 0.01;

    // Actualizar los controles (rotación y zoom)
    controls.update();

    renderer.render(scene, camera);
}

animate();