// Configuración de la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Función para crear planetas
function createPlanet(radius, color, position) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(...position);
    scene.add(planet);
    return planet;
}

// Crear el Sol y los planetas
const sun = createPlanet(5, 0xffff00, [0, 0, 0]);
const mercury = createPlanet(2, 0xffaa00, [0, 0, 0]);
const venus = createPlanet(2.5, 0xffcc00, [0, 0, 0]);
const earth = createPlanet(4, 0x0000ff, [0, 0, 0]);
const mars = createPlanet(3, 0xff0000, [0, 0, 0]);
const jupiter = createPlanet(10, 0xffa500, [0, 0, 0]);
const saturn = createPlanet(9, 0xffcc99, [0, 0, 0]);
const uranus = createPlanet(7, 0x66ccff, [0, 0, 0]);
const neptune = createPlanet(7, 0x3366ff, [0, 0, 0]);

// Crear las líneas de las órbitas
const mercuryOrbitGeometry = new THREE.BufferGeometry();
const venusOrbitGeometry = new THREE.BufferGeometry();
const earthOrbitGeometry = new THREE.BufferGeometry();
const marsOrbitGeometry = new THREE.BufferGeometry();
const jupiterOrbitGeometry = new THREE.BufferGeometry();
const saturnOrbitGeometry = new THREE.BufferGeometry();
const uranusOrbitGeometry = new THREE.BufferGeometry();
const neptuneOrbitGeometry = new THREE.BufferGeometry();

const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const mercuryOrbitLine = new THREE.Line(mercuryOrbitGeometry, orbitMaterial);
const venusOrbitLine = new THREE.Line(venusOrbitGeometry, orbitMaterial);
const earthOrbitLine = new THREE.Line(earthOrbitGeometry, orbitMaterial);
const marsOrbitLine = new THREE.Line(marsOrbitGeometry, orbitMaterial);
const jupiterOrbitLine = new THREE.Line(jupiterOrbitGeometry, orbitMaterial);
const saturnOrbitLine = new THREE.Line(saturnOrbitGeometry, orbitMaterial);
const uranusOrbitLine = new THREE.Line(uranusOrbitGeometry, orbitMaterial);
const neptuneOrbitLine = new THREE.Line(neptuneOrbitGeometry, orbitMaterial);

scene.add(mercuryOrbitLine);
scene.add(venusOrbitLine);
scene.add(earthOrbitLine);
scene.add(marsOrbitLine);
scene.add(jupiterOrbitLine);
scene.add(saturnOrbitLine);
scene.add(uranusOrbitLine);
scene.add(neptuneOrbitLine);

// Configurar la cámara y los controles
camera.position.set(0, 50, 100);
camera.lookAt(scene.position);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Funciones de cálculo orbital (sin cambios)
function equation(ini, p, T) {
    return ini + p * T;
}

function normalizeAngle(angle) {
    return ((angle % 360) + 360) % 360 > 180 ? angle - 360 : angle;
}

function kepler(M, e) {
    e = e * (Math.PI / 180);
    let E = M + e * Math.sin(M);
    let Etri;
    do {
        let Mtri = M - (E - e * Math.sin(E));
        Etri = Mtri / (1 - e * Math.cos(E));
        E += Etri;
    } while (Math.abs(Etri) > 0.000001);
    return E;
}

function orbit(params, T_d) {
    const T = (T_d - 2451545.0) / 36525; // J2000 epoch
    const { a_0, e_0, i_0, L_0, B_0, alfa_0, ap, ep, ip, Lp, Bp, alfap, b, c, s, f } = params;

    const a = equation(a_0, ap, T);
    const e = equation(e_0, ep, T);
    const i = equation(i_0, ip, T);
    const L = equation(L_0, Lp, T);
    const B = equation(B_0, Bp, T);
    const alfa = equation(alfa_0, alfap, T);

    const w = B - alfa;
    let M = L - B + b * (T ** 2) + c * Math.cos(f * T) + s * Math.sin(f * T);
    M = normalizeAngle(M * Math.PI / 180) * 180 / Math.PI;
    const E = kepler(M, e);

    const xpri = a * (Math.cos(E) - e);
    const ypri = a * Math.sqrt(1 - e ** 2) * Math.sin(E);
    
    const x = xpri * (Math.cos(w) * Math.cos(alfa) - Math.sin(w) * Math.cos(i) * Math.sin(alfa)) +
              ypri * (-Math.sin(w) * Math.cos(alfa) - Math.cos(w) * Math.cos(i) * Math.sin(alfa));
    const y = xpri * (Math.cos(w) * Math.sin(alfa) + Math.sin(w) * Math.cos(i) * Math.cos(alfa)) +
              ypri * (-Math.sin(w) * Math.sin(alfa) + Math.cos(w) * Math.cos(i) * Math.cos(alfa));
    const z = xpri * (Math.sin(w) * Math.sin(i)) + ypri * (Math.cos(w) * Math.sin(i));

    return [x, y, z];
}

// Parámetros orbitales de los planetas (valores reales)
const planetParams = {
    mercury: { a_0: 0.38709843, e_0: 0.20563661, i_0: 7.00559432, L_0: 252.25166724, B_0: 77.45771895, alfa_0: 48.33961819, ap: 0.00000037, ep: 0.00001906, ip: -0.00594749, Lp: 149472.67486623, Bp: 0.16047689, alfap: -0.12534081, b: 0, c: 0, s: 0, f: 0 },
    venus: { a_0: 0.72332982, e_0: 0.00677672, i_0: 3.39471, L_0: 181.979732, B_0: 3.39471, alfa_0: 76.67992, ap: 0.0000039, ep: -0.00001826, ip: 0.00021, Lp: 58517.88255096, Bp: 0.002732, alfap: 0.00000756, b: 0, c: 0, s: 0, f: 0 },
    earth: { a_0: 1.000001018, e_0: 0.0167086, i_0: -0.0005, L_0: 100.46435, B_0: 0, alfa_0: 102.94719, ap: -0.0000002, ep: 0.00000562, ip: -0.000014, Lp: 628331.999, Bp: 0.0001, alfap: 0.000041, b: 0, c: 0, s: 0, f: 0 },
    mars: { a_0: 1.52366231, e_0: 0.09341233, i_0: 1.85061, L_0: 355.45332744, B_0: 49.57854427, alfa_0: 286.537, ap: 0.00000018, ep: 0.00007882, ip: -0.00813131, Lp: 149472.67410809, Bp: 0.29257343, alfap: -0.01294668, b: 0, c: 0, s: 0, f: 0 },
    jupiter: { a_0: 5.204267, e_0: 0.048775, i_0: 1.303, L_0: 34.351, B_0: 1.303, alfa_0: 14.331, ap: -0.000081, ep: 0.000040, ip: 0.00003, Lp: 22636.14062624, Bp: 0.0075, alfap: -0.00478, b: 0, c: 0, s: 0, f: 0 },
    saturn: { a_0: 9.582017, e_0: 0.056522, i_0: 2.485, L_0: 50.077, B_0: 2.485, alfa_0: 93.051, ap: 0.000211, ep: -0.000063, ip: 0.000045, Lp: 129582.44846536, Bp: 0.0008, alfap: 0.000014, b: 0, c: 0, s: 0, f: 0 },
    uranus: { a_0: 19.18171, e_0: 0.047318, i_0: 0.772, L_0: 314.055, B_0: 0.772, alfa_0: 170.964, ap: 0.000204, ep: 0.000158, ip: 0.000029, Lp: 16825.9797, Bp: 0.0306, alfap: -0.0044, b: 0, c: 0, s: 0, f: 0 },
    neptune: { a_0: 30.05826, e_0: 0.008590, i_0: 1.769, L_0: 304.348, B_0: 1.769, alfa_0: 44.971, ap: 0.000094, ep: 0.000024, ip: -0.000004, Lp: 52565.1247, Bp: 0.0494, alfap: -0.0035, b: 0, c: 0, s: 0, f: 0 }
};

// Crear puntos para las órbitas
function createOrbitPoints(params, orbitSegments, scaleFactor) {
    const points = [];
    for (let i = 0; i < orbitSegments; i++) {
        const t = 2451545.0 + (i / orbitSegments) * 365.25; // Un año terrestre
        const xyz = orbit(params, t);
        points.push(new THREE.Vector3(
            scaleFactor * xyz[0],
            scaleFactor * xyz[1],
            scaleFactor * xyz[2]
        ));
    }
    return points;
}

const orbitSegments = 10000;
const scaleFactorOrbit = 20; // Factor de escala para hacer visibles las órbitas

const mercuryOrbitPoints = createOrbitPoints(planetParams.mercury, orbitSegments, scaleFactorOrbit);
const venusOrbitPoints = createOrbitPoints(planetParams.venus, orbitSegments, scaleFactorOrbit);
const earthOrbitPoints = createOrbitPoints(planetParams.earth, orbitSegments, scaleFactorOrbit);
const marsOrbitPoints = createOrbitPoints(planetParams.mars, orbitSegments, scaleFactorOrbit);
const jupiterOrbitPoints = createOrbitPoints(planetParams.jupiter, orbitSegments, scaleFactorOrbit);
const saturnOrbitPoints = createOrbitPoints(planetParams.saturn, orbitSegments, scaleFactorOrbit);
const uranusOrbitPoints = createOrbitPoints(planetParams.uranus, orbitSegments, scaleFactorOrbit);
const neptuneOrbitPoints = createOrbitPoints(planetParams.neptune, orbitSegments, scaleFactorOrbit);

mercuryOrbitGeometry.setFromPoints(mercuryOrbitPoints);
venusOrbitGeometry.setFromPoints(venusOrbitPoints);
earthOrbitGeometry.setFromPoints(earthOrbitPoints);
marsOrbitGeometry.setFromPoints(marsOrbitPoints);
jupiterOrbitGeometry.setFromPoints(jupiterOrbitPoints);
saturnOrbitGeometry.setFromPoints(saturnOrbitPoints);
uranusOrbitGeometry.setFromPoints(uranusOrbitPoints);
neptuneOrbitGeometry.setFromPoints(neptuneOrbitPoints);

// Tiempo inicial (J2000)
let T_d = 2460587;

// Animación
function animate() {
    requestAnimationFrame(animate);
    
    const mercuryXYZ = orbit(planetParams.mercury, T_d);
    mercury.position.set(
        scaleFactorOrbit * mercuryXYZ[0],
        scaleFactorOrbit * mercuryXYZ[1],
        scaleFactorOrbit * mercuryXYZ[2]
    );

    const venusXYZ = orbit(planetParams.venus, T_d);
    venus.position.set(
        scaleFactorOrbit * venusXYZ[0],
        scaleFactorOrbit * venusXYZ[1],
        scaleFactorOrbit * venusXYZ[2]
    );

    const earthXYZ = orbit(planetParams.earth, T_d);
    earth.position.set(
        scaleFactorOrbit * earthXYZ[0],
        scaleFactorOrbit * earthXYZ[1],
        scaleFactorOrbit * earthXYZ[2]
    );

    const marsXYZ = orbit(planetParams.mars, T_d);
    mars.position.set(
        scaleFactorOrbit * marsXYZ[0],
        scaleFactorOrbit * marsXYZ[1],
        scaleFactorOrbit * marsXYZ[2]
    );

    const jupiterXYZ = orbit(planetParams.jupiter, T_d);
    jupiter.position.set(
        scaleFactorOrbit * jupiterXYZ[0],
        scaleFactorOrbit * jupiterXYZ[1],
        scaleFactorOrbit * jupiterXYZ[2]
    );

    const saturnXYZ = orbit(planetParams.saturn, T_d);
    saturn.position.set(
        scaleFactorOrbit * saturnXYZ[0],
        scaleFactorOrbit * saturnXYZ[1],
        scaleFactorOrbit * saturnXYZ[2]
    );

    const uranusXYZ = orbit(planetParams.uranus, T_d);
    uranus.position.set(
        scaleFactorOrbit * uranusXYZ[0],
        scaleFactorOrbit * uranusXYZ[1],
        scaleFactorOrbit * uranusXYZ[2]
    );

    const neptuneXYZ = orbit(planetParams.neptune, T_d);
    neptune.position.set(
        scaleFactorOrbit * neptuneXYZ[0],
        scaleFactorOrbit * neptuneXYZ[1],
        scaleFactorOrbit * neptuneXYZ[2]
    );

    T_d += 0.01; // Incrementar el tiempo (ajusta este valor para cambiar la velocidad de la animación)

    controls.update();
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
