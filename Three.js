// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
    65, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the background color of the renderer to grey
renderer.setClearColor(0x888888); // You can change the color as needed

// Create a sphereGeometry for the diamond
const diamondGeometry = new THREE.Geometry(2);
const icosahedronGeometry = new THREE.IcosahedronGeometry(0.5);
const sphereGeometry = new THREE.SphereGeometry(1.5);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

diamondGeometry.vertices.push(
    new THREE.Vector3(0, 1, 0), // Top
    new THREE.Vector3(1, 0, 0), // Right
    new THREE.Vector3(0, -1, 0), // Bottom
    new THREE.Vector3(-1, 0, 0), // Left
    new THREE.Vector3(0, 0, 1), // Front
    new THREE.Vector3(0, 0, -1) // Back
);

diamondGeometry.faces.push(
    new THREE.Face3(0, 1, 4), // Top-Right-Front
    new THREE.Face3(1, 2, 4), // Right-Bottom-Front
    new THREE.Face3(2, 3, 4), // Bottom-Left-Front
    new THREE.Face3(3, 0, 4), // Left-Top-Front
    new THREE.Face3(1, 0, 5), // Right-Top-Back
    new THREE.Face3(2, 1, 5), // Bottom-Right-Back
    new THREE.Face3(3, 2, 5), // Left-Bottom-Back
    new THREE.Face3(0, 3, 5) // Top-Left-Back
);

diamondGeometry.computeVertexNormals();

// Create a material for the diamond
// Wireframe
const diamondwireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xfccb06,
    wireframe: true,
});
// Color in between wireframe
const diamondfilledMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF0000,
});

const icosahedronwireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xd7263d,
    wireframe: true,
});
// Color in between wireframe
const icosahedronfilledMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FFFF,
});

const material = new THREE.MeshBasicMaterial({
    color: 0x000080,
    wireframe: true
});

// Move the icosahedron to the side of the diamondGeometry
// icosahedronGeometry.translate(3, 0, 0);

// Create the sphere for the icosahedron
const icosahedronWireframeMesh = new THREE.Mesh(
    icosahedronGeometry,
    icosahedronwireframeMaterial
);

// Create the filled sphere using the diamond sphereGeometry and filled material
const icosahedronfilledMesh = new THREE.Mesh(
    icosahedronGeometry,
    icosahedronfilledMaterial
);

const diamondwireframeMesh = new THREE.Mesh(
    diamondGeometry,
    diamondwireframeMaterial
);

const diamondfilledMesh = new THREE.Mesh(
    diamondGeometry,
    diamondfilledMaterial
);

const sphere = new THREE.Mesh(
    sphereGeometry,
    material
);

// Group the wireframe and filled meshes together
const diamond = new THREE.Group();
const icosahedron = new THREE.Group();

diamond.add(diamondwireframeMesh);
diamond.add(diamondfilledMesh);

icosahedron.add(icosahedronWireframeMesh);
icosahedron.add(icosahedronfilledMesh);

// Add to the scene
scene.add(sphere, diamond, icosahedron);

// Variables to track cursor position
let mouseX = 0;
let mouseY = 0;
let LeftClick = false;

// Event listener for mouse movement
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function handleMouseDown(event) {
    if (event.button === 0) {
        LeftClick = true;
    }
}

function handleMouseUp(event) {
    if (event.button === 0) {
        LeftClick = false;
    }
}

function animate() {
    const targetRotationX = (mouseX / window.innerWidth) * Math.PI * 2;
    const targetRotationY = (mouseY / window.innerHeight) * Math.PI * 2;

    if (LeftClick) {
        diamond.rotation.x += 1 * (targetRotationY - diamond.rotation.x);
        diamond.rotation.y += 1 * (targetRotationX - diamond.rotation.y);
        icosahedron.rotation.x += 1 * (targetRotationY - icosahedron.rotation.x);
        icosahedron.rotation.y += 1 * (targetRotationX - icosahedron.rotation.y);
        sphere.rotation.x += 1 * (targetRotationY - sphere.rotation.x);
        sphere.rotation.y += 1 * (targetRotationX - sphere.rotation.y);
    } else {
        diamond.rotation.x += 0.01;
        diamond.rotation.y += 0.01;
        icosahedron.rotation.x += 0.02;
        icosahedron.rotation.y += 0.02;
        sphere.rotation.x += 0.03;
        sphere.rotation.y += 0.03;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
