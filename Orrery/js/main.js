
/// Configura la 
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


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

var venusGeo = new THREE.SphereGeometry(2, 32, 32);
var venusMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa10 });
var venus = new THREE.Mesh(venusGeo, venusMaterial);
scene.add(mercury);

// Earth
var earthGeo = new THREE.SphereGeometry(4.5, 32, 32);
var earthMaterial = new THREE.MeshBasicMaterial({ color: 0x2a79ff });
var earth = new THREE.Mesh(earthGeo, earthMaterial);
scene.add(earth);

// Mars
var marsGeo = new THREE.SphereGeometry(3.5, 32, 32);
var marsMaterial = new THREE.MeshBasicMaterial({ color: 0xff3300 });
var mars = new THREE.Mesh(marsGeo, marsMaterial);
scene.add(mars);

// Jupiter
var jupiterGeo = new THREE.SphereGeometry(10, 32, 32);
var jupiterMaterial = new THREE.MeshBasicMaterial({ color: 0xffb366 });
var jupiter = new THREE.Mesh(jupiterGeo, jupiterMaterial);
scene.add(jupiter);

// Saturn (excluding rings)
var saturnGeo = new THREE.SphereGeometry(9, 32, 32);
var saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc99 });
var saturn = new THREE.Mesh(saturnGeo, saturnMaterial);
scene.add(saturn);

// Uranus
var uranusGeo = new THREE.SphereGeometry(7, 32, 32);
var uranusMaterial = new THREE.MeshBasicMaterial({ color: 0x66ccff });
var uranus = new THREE.Mesh(uranusGeo, uranusMaterial);
scene.add(uranus);

// Neptune
var neptuneGeo = new THREE.SphereGeometry(7, 32, 32);
var neptuneMaterial = new THREE.MeshBasicMaterial({ color: 0x3366ff });
var neptune = new THREE.Mesh(neptuneGeo, neptuneMaterial);
scene.add(neptune);

var planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
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
//etst test tes tes
let T_d = 2460587;


planetData[0]

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

function orbit(a_0, e_0, i_0, L_0, B_0, alfa_0, ap, ep, ip, Lp, Bp, alfap, b, c, s, f, T_d) {
    var T = (T_d - 2451245.0) / 36525;
    var a = equation(a_0, ap, T);
    var e = equation(e_0, ep, T);
    var i = equation(i_0, ip, T);
    var L = equation(L_0, Lp, T);
    var B = equation(B_0, Bp, T);
    var alfa = equation(alfa_0, alfap, T);

    var w = B - alfa;
    var M = L - B + b*(T ** 2) + c*Math.cos(f*T) + s*Math.sin(f*T);
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
var xyz = []
// Animación
function animate() {
    requestAnimationFrame(animate);

    //var xyz = orbit(a_0, e_0, i_0, L_0, B_0, alfa_0, ap, ep, ip, Lp, Bp, alfap, T_d);
    //mercury.position.x = 100 * xyz[0];
    //mercury.position.y = 100 * xyz[1];
    //mercury.position.z = 100 * xyz[2];

    for(let i = 0; i < planets.length; i++) {
        xyz = orbit(
            planetData.planets[i].orbital_parameters.a.value, 
            planetData.planets[i].orbital_parameters.e.value, 
            planetData.planets[i].orbital_parameters.I.value, 
            planetData.planets[i].orbital_parameters.L.value, 
            planetData.planets[i].orbital_parameters.long_peri.value, 
            planetData.planets[i].orbital_parameters.long_node.value, // Corrected this line
            planetData.planets[i].orbital_parameters.a.rate, 
            planetData.planets[i].orbital_parameters.e.rate, 
            planetData.planets[i].orbital_parameters.I.rate, 
            planetData.planets[i].orbital_parameters.L.rate,
            planetData.planets[i].orbital_parameters.long_peri.rate, 
            planetData.planets[i].orbital_parameters.long_node.rate,
            planetData.planets[i].orbital_parameters.b.value,
            planetData.planets[i].orbital_parameters.c.value,
            planetData.planets[i].orbital_parameters.s.value,
            planetData.planets[i].orbital_parameters.f.value, 
            T_d
        );

        planets[i].position.x = 100 * xyz[0];
        planets[i].position.y = 100 * xyz[1];
        planets[i].position.z = 100 * xyz[2];
    }
    angle += -0.1;
    T_d += 0.01;

    // Actualizar los controles (rotación y zoom)
    controls.update();

    renderer.render(scene, camera);
    console.log(planetData);
}

animate();