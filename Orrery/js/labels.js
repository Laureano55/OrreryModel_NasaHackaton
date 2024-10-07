function createTextLabel(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontSize = 100;

    canvas.width = 512;  // Change to desired width
    canvas.height = 256; // Change to desired height
    // Set canvas size and text properties
    context.font = `${fontSize}px Arial`;
    context.fillStyle = 'white';
    context.fillText(text, 0, fontSize);
    

    context.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Semi-transparent background
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the whole canvas

    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Create sprite material with the text texture
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });

    // Create and return the sprite
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(10, 3, 1); // Adjust scale to your liking
    return sprite;
}

function addLabelToPlanet(planet, labelText, offsetY) {
    const label = createTextLabel(labelText);
    label.position.set(planet.position.x, planet.position.y + offsetY, planet.position.z); // Offset in the Y-axis
    scene.add(label);
}


const mercuryLabel = createTextLabel('Mercury');
mercuryLabel.position.set(mercury.position.x, mercury.position.y + 5, mercury.position.z); // Adjust position above the planet
scene.add(mercuryLabel);

const venusLabel = createTextLabel('Venus');
venusLabel.position.set(venus.position.x, venus.position.y + 5, venus.position.z); // Adjust position above the planet
scene.add(venusLabel);

const earthLabel = createTextLabel('Earth');
earthLabel.position.set(earth.position.x, earth.position.y + 5, earth.position.z); // Adjust position above the planet
scene.add(earthLabel);

const marsLabel = createTextLabel('Mars');
marsLabel.position.set(mars.position.x, mars.position.y + 5, mars.position.z); // Adjust position above the planet
scene.add(marsLabel);

const jupiterLabel = createTextLabel('Jupiter');
jupiterLabel.position.set(jupiter.position.x, jupiter.position.y + 10, jupiter.position.z); // Adjust position above the planet
scene.add(jupiterLabel);

const saturnLabel = createTextLabel('Saturn');
saturnLabel.position.set(saturn.position.x, saturn.position.y + 10, saturn.position.z); // Adjust position above the planet
scene.add(saturnLabel);

const uranusLabel = createTextLabel('Uranus');
uranusLabel.position.set(uranus.position.x, uranus.position.y + 7, uranus.position.z); // Adjust position above the planet
scene.add(uranusLabel);

const neptuneLabel = createTextLabel('Neptune');
neptuneLabel.position.set(neptune.position.x, neptune.position.y + 7, neptune.position.z); // Adjust position above the planet
scene.add(neptuneLabel);


const planetLabels = [
    mercuryLabel,
    venusLabel,
    earthLabel,
    marsLabel,
    jupiterLabel,
    saturnLabel,
    uranusLabel,
    neptuneLabel
];
