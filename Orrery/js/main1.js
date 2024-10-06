// Parámetros orbitales del objeto
const e = 0.682526943;  // Excentricidad
const q = 0.986192006;  // Perihelio en AU
const Q = 5.23;         // Afelio en AU
const i_deg = 4.894555854;  // Inclinación en grados
const node_deg = 295.9854497; // Longitud del nodo ascendente en grados
const w_deg = 0.626837835;    // Argumento del perihelio en grados

// Calcular el semieje mayor (a)
const a = (q + Q) / 2;  // Semieje mayor en AU

// Conversión de grados a radianes
const i = THREE.MathUtils.degToRad(i_deg);
const node = THREE.MathUtils.degToRad(node_deg);
const w = THREE.MathUtils.degToRad(w_deg);

// Crear la geometría elíptica
const curve = new THREE.EllipseCurve(
  0, 0,  // Centro de la órbita
  a, a * Math.sqrt(1 - e * e),  // Semieje mayor y semieje menor
  0, 2 * Math.PI,  // Ángulo inicial y final (óptima para una órbita completa)
  false,  // No sentido inverso
  0  // No rotación de la curva (se hará más adelante)
);

// Crear puntos a lo largo de la órbita
const points = curve.getPoints(100);  // 100 puntos a lo largo de la órbita
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// Crear la órbita con una línea
const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
const orbit = new THREE.Line(geometry, material);

// Posicionar la órbita en el espacio 3D
const orbitGroup = new THREE.Group();
orbitGroup.add(orbit);

// Rotar el plano orbital usando la inclinación y nodo ascendente
orbitGroup.rotation.set(i, 0, 0);  // Inclinación
orbitGroup.rotation.z = node;      // Nodo ascendente
scene.add(orbitGroup);

// Crear un punto para el planeta/cometa
const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);  // Pequeña esfera
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const planet = new THREE.Mesh(sphereGeometry, sphereMaterial);
orbitGroup.add(planet);

// Animar el movimiento del planeta en la órbita
let angle = 0;
const radius = a;  // Distancia aproximada del objeto al sol (semieje mayor)

// Configuración de la cámara y controles
camera.position.set(0, 0, 50);  // Alejar la cámara para ver toda la órbita

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();  // Actualiza los controles en cada frame

function animate() {
  requestAnimationFrame(animate);

  // Calcular la posición del planeta
  var r = a * (1 - e * e) / (1 + e * Math.cos(angle));  // Radio en cada ángulo
  var x = r * Math.cos(angle);
  var y = 0;  // El objeto está en el plano (lo rotaremos luego)
  var z = r * Math.sin(angle);

  planet.position.set(x, y, z);  // Actualizar la posición del planeta

  // Incrementar el ángulo (velocidad orbital aproximada)
  angle += 0.01;  // Puedes ajustar la velocidad

  controls.update();  // Asegúrate de actualizar los controles en cada frame

  // Renderizar la escena
  renderer.render(scene, camera);
}

animate();
