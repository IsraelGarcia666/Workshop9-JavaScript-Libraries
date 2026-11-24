/*
  Workshop 9 – Interactive 3D Weather Advisor

  I decided to use Three.js to create different
  weather animations instead of static backgrounds.

  First scene: Sunny weather.
*/

const weatherContainer = document.getElementById("weather-3d");

// Create the 3D scene, camera and renderer.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 10, 28);

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.z = 14;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

weatherContainer.appendChild(renderer.domElement);

// Lighting makes the 3D objects look more realistic.
scene.add(new THREE.AmbientLight(0xffffff, 1.5));

const sunlight = new THREE.DirectionalLight(0xffffff, 1.2);
sunlight.position.set(-3, 5, 8);
scene.add(sunlight);

// Group the sunny weather objects together.
const sunnyScene = new THREE.Group();
scene.add(sunnyScene);

// Create a glowing 3D sun.
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(1.3, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0xffe27a,
    emissive: 0xffb300,
    emissiveIntensity: 0.7,
  }),
);

sun.position.set(-8, 3.5, -2);
sunnyScene.add(sun);

// Create clouds from groups of 3D spheres.
function createCloud(x, y, z) {
  const cloud = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({
    color: 0xf7fbff,
    roughness: 0.95,
  });

  const geometry = new THREE.SphereGeometry(1, 20, 16);

  const parts = [
    [-1, 0, 1.2, 0.6],
    [0, 0.3, 1.4, 0.9],
    [1, 0, 1.2, 0.6],
  ];

  parts.forEach(([px, py, sx, sy]) => {
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(px, py, 0);
    sphere.scale.set(sx, sy, 0.7);

    cloud.add(sphere);
  });

  cloud.position.set(x, y, z);
  sunnyScene.add(cloud);

  return cloud;
}

const cloud1 = createCloud(8, 2, -3);
const cloud2 = createCloud(-8, -2.5, -4);

/* Adjust the sun and clouds for desktop and mobile screens. */
function layoutSunnyScene() {
  const mobile = window.innerWidth <= 600;

  // On mobile, move the sun above the Weather Advisor card.
  sun.position.set(mobile ? -1.3 : -8, mobile ? 5 : 3.5, -2);
  sun.scale.setScalar(mobile ? 0.7 : 1);

  // Position the clouds within the phone's visible area.
  cloud1.position.set(mobile ? 1.5 : 8, mobile ? 4 : 2, -3);
  cloud1.scale.setScalar(mobile ? 0.55 : 1);

  cloud2.position.set(mobile ? -1.4 : -8, mobile ? 2.8 : -2.5, -4);
  cloud2.scale.setScalar(mobile ? 0.5 : 1);
}

layoutSunnyScene();

/* Rainy weather scene with dark clouds and animated rain. */

const rainyScene = new THREE.Group();
scene.add(rainyScene);

// Reuse our existing 3D clouds, but make them darker.
function createStormCloud(source, x, y, z) {
  const cloud = source.clone(true);

  cloud.traverse((object) => {
    if (object.isMesh) {
      // Dark clouds unaffected by the scene's bright sunlight.
      object.material = new THREE.MeshBasicMaterial({
        color: 0x26384d,
      });
    }
  });

  cloud.position.set(x, y, z);
  cloud.scale.set(1.3, 1.3, 1.3);
  rainyScene.add(cloud);
}

createStormCloud(cloud1, -8, 3, -3);
createStormCloud(cloud2, 8, 3.5, -4);

// Create 180 raindrops using 3D line segments.
const rainPositions = new Float32Array(180 * 6);

for (let i = 0; i < rainPositions.length; i += 6) {
  const x = (Math.random() - 0.5) * 24;
  const y = (Math.random() - 0.5) * 16;

  rainPositions.set([x, y, 0, x + 0.08, y - 0.35, 0], i);
}

const rainGeometry = new THREE.BufferGeometry();
rainGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(rainPositions, 3),
);

const rain = new THREE.LineSegments(
  rainGeometry,
  new THREE.LineBasicMaterial({
    color: 0xd1e9ff,
    transparent: true,
    opacity: 0.8,
  }),
);

rainyScene.add(rain);

/* Snowy weather scene with falling 3D snowflakes. */

const snowyScene = new THREE.Group();
scene.add(snowyScene);

// Create 400 snowflakes at random positions and depths.
const snowCount = 400;
const snowPositions = new Float32Array(snowCount * 3);

for (let i = 0; i < snowCount; i++) {
  const index = i * 3;

  snowPositions[index] = (Math.random() - 0.5) * 26;
  snowPositions[index + 1] = (Math.random() - 0.5) * 18;
  snowPositions[index + 2] = -4 + Math.random() * 6;
}

// Create the snowflake geometry.
const snowGeometry = new THREE.BufferGeometry();

snowGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(snowPositions, 3),
);

// Give the snowflakes a soft white appearance.
const snowMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.13,
  transparent: true,
  opacity: 0.9,
  sizeAttenuation: true,
  depthWrite: false,
});

const snowflakes = new THREE.Points(snowGeometry, snowMaterial);

snowyScene.add(snowflakes);

/* Windy weather scene with fast-moving clouds. */

const windyScene = new THREE.Group();
scene.add(windyScene);

// Keep this scene hidden until Windy is selected.
windyScene.visible = false;

// Reuse the existing cloud geometry.
const windCloud1 = cloud1.clone(true);
const windCloud2 = cloud2.clone(true);

// Position the clouds on opposite sides of the scene.
windCloud1.position.set(-7, 3, -3);
windCloud2.position.set(7, -2, -4);

// Make the clouds slightly larger.
windCloud1.scale.set(1.3, 1.3, 1.3);
windCloud2.scale.set(1.1, 1.1, 1.1);

windyScene.add(windCloud1);
windyScene.add(windCloud2);

/* Create horizontal wind streaks using Three.js. */

const windCount = 100;
const windPositions = new Float32Array(windCount * 6);

for (let i = 0; i < windPositions.length; i += 6) {
  const x = (Math.random() - 0.5) * 26;
  const y = (Math.random() - 0.5) * 18;
  const length = 0.4 + Math.random() * 0.8;

  windPositions.set([x, y, 0, x + length, y, 0], i);
}

const windGeometry = new THREE.BufferGeometry();

windGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(windPositions, 3),
);

const windStreaks = new THREE.LineSegments(
  windGeometry,
  new THREE.LineBasicMaterial({
    color: 0xe3faff,
    transparent: true,
    opacity: 0.65,
  }),
);

windyScene.add(windStreaks);

// Handle weather selection changes and update the 3D scene accordingly.
const weatherSelect = document.getElementById("weatherCondition");

function update3DWeather() {
  const weather = weatherSelect.value;

  sunnyScene.visible = weather === "sunny";
  rainyScene.visible = weather === "rainy";
  snowyScene.visible = weather === "snowy";
  windyScene.visible = weather === "windy";

  // Change the 3D sky and fog according to the weather.
  const skyColors = {
    sunny: 0x87ceeb, // Bright blue sky
    rainy: 0x52677f, // Dark stormy sky
    snowy: 0xc9e1ed, // Cold winter sky
    windy: 0x91b7ae, // Cloudy green-gray sky
  };

  const skyColor = skyColors[weather];

  scene.background = new THREE.Color(skyColor);
  scene.fog = new THREE.Fog(skyColor, 10, 28);
}

weatherSelect.addEventListener("change", update3DWeather);
update3DWeather();

// Animate the floating clouds.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let time = 0;

function animate() {
  requestAnimationFrame(animate);

  if (!reducedMotion.matches && !document.hidden) {
    time += 0.008;

    const mobile = window.innerWidth <= 600;

    // Use shorter movements on narrow screens.
    cloud1.position.x =
      (mobile ? 1.5 : 8) + Math.sin(time) * (mobile ? 0.25 : 0.8);

    cloud2.position.x =
      (mobile ? -1.4 : -8) + Math.sin(time * 0.7) * (mobile ? 0.25 : 0.7);

    sun.rotation.y += 0.002;

    // Animate falling rain only when Rainy is selected.
    if (rainyScene.visible) {
      for (let i = 0; i < rainPositions.length; i += 6) {
        rainPositions[i + 1] -= 0.1;
        rainPositions[i + 4] -= 0.1;

        // Move raindrops back to the top when they fall off-screen.
        if (rainPositions[i + 4] < -8) {
          rainPositions[i + 1] = 8;
          rainPositions[i + 4] = 7.65;
        }
      }

      rainGeometry.attributes.position.needsUpdate = true;
    }
  }

  // Animate snowflakes falling slowly with a gentle sideways drift.
  if (snowyScene.visible) {
    for (let i = 0; i < snowPositions.length; i += 3) {
      // Snow falls more slowly than rain.
      snowPositions[i + 1] -= 0.025 + (i % 5) * 0.008;

      // Gentle horizontal movement.
      snowPositions[i] += Math.sin(time * 2 + i) * 0.008;

      // Return snowflakes to the top when they disappear.
      if (snowPositions[i + 1] < -9) {
        snowPositions[i + 1] = 9;
        snowPositions[i] = (Math.random() - 0.5) * 26;
      }
    }

    snowGeometry.attributes.position.needsUpdate = true;
  }

  // Animate the clouds and horizontal wind streaks.
  if (windyScene.visible) {
    // Clouds travel from left to right at different intervals.
    windCloud1.position.x = -9 + ((time * 3) % 22);
    windCloud2.position.x = -9 + ((time * 3 + 13) % 22);

    // Move the wind streaks horizontally.
    for (let i = 0; i < windPositions.length; i += 6) {
      windPositions[i] += 0.15;
      windPositions[i + 3] += 0.15;

      // Return streaks to the left when they leave the screen.
      if (windPositions[i] > 13) {
        const length = windPositions[i + 3] - windPositions[i];

        windPositions[i] = -13;
        windPositions[i + 3] = -13 + length;
      }
    }

    windGeometry.attributes.position.needsUpdate = true;
  }

  renderer.render(scene, camera);
}

animate();

// Keep the 3D background responsive.
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  layoutSunnyScene();
});
