const textureLoader = new THREE.TextureLoader();

var earthMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/earth.jpg')
});

var jupiterMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/jupiter.jpg')
});

var marsMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/mars.jpg')
});

var mercuryMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/mercury.jpg')
});

var moonMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/moon.jpg')
});

var neptuneMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/neptune.jpg')
});

var saturnMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/saturn.jpg')
});

var uranusMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/uranus.jpg')
});

var venusMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/venus.jpg')
});

var solMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/sun.jpg')
});

// Crear esfera para el Sol
var solGeo = new THREE.SphereGeometry(4, 32, 32);

var sol = new THREE.Mesh(solGeo, solMaterial);



// Crear esfera para Mercurio
var mercuryGeo = new THREE.SphereGeometry(2, 32, 32);

var mercury = new THREE.Mesh(mercuryGeo, mercuryMaterial);


var venusGeo = new THREE.SphereGeometry(2, 32, 32);

var venus = new THREE.Mesh(venusGeo, venusMaterial);


// Earth


var earthGeo = new THREE.SphereGeometry(4.5, 32, 32);

var earth = new THREE.Mesh(earthGeo, earthMaterial);


// Mars
var marsGeo = new THREE.SphereGeometry(3.5, 32, 32);

var mars = new THREE.Mesh(marsGeo, marsMaterial);


// Jupiter
var jupiterGeo = new THREE.SphereGeometry(10, 32, 32);

var jupiter = new THREE.Mesh(jupiterGeo, jupiterMaterial);


// Saturn (excluding rings)
var saturnGeo = new THREE.SphereGeometry(9, 32, 32);

var saturn = new THREE.Mesh(saturnGeo, saturnMaterial);


// Uranus
var uranusGeo = new THREE.SphereGeometry(7, 32, 32);

var uranus = new THREE.Mesh(uranusGeo, uranusMaterial);


// Neptune
var neptuneGeo = new THREE.SphereGeometry(7, 32, 32);

var neptune = new THREE.Mesh(neptuneGeo, neptuneMaterial);
