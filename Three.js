// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry for the diamond
const diamondGeometry = new THREE.Geometry();
const icosahedronGeometry = new THREE.IcosahedronGeometry(1);
const scale = 1.5; // Scale factor for increasing the size of the diamond

diamondGeometry.vertices.push(
    new THREE.Vector3(0, 1 * scale, 0), // Top
    new THREE.Vector3(1 * scale, 0, 0), // Right
    new THREE.Vector3(0, -1 * scale, 0), // Bottom
    new THREE.Vector3(-1 * scale, 0, 0), // Left
    new THREE.Vector3(0, 0, 1 * scale), // Front
    new THREE.Vector3(0, 0, -1 * scale) // Back
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
const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xfccb06, // Cyan color
    wireframe: true,
});
// Color in between wireframe
const filledMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF0000,
});

const icosahedronwireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xd7263d, // Cyan color
    wireframe: true,
});
// Color in between wireframe
const icosahedronfilledMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FFFF,
});

// Move the icosahedron to the side of the diamondGeometry
// icosahedronGeometry.translate(3, 0, 0);

// Create the mesh for the icosahedron
const icosahedronWireframeMesh = new THREE.Mesh(
    icosahedronGeometry,
    icosahedronwireframeMaterial
);

// Create the filled mesh using the diamond geometry and filled material
const icosahedronfilledMesh = new THREE.Mesh(
    icosahedronGeometry,
    icosahedronfilledMaterial
);

const wireframeMesh = new THREE.Mesh(diamondGeometry, wireframeMaterial);

const filledMesh = new THREE.Mesh(diamondGeometry, filledMaterial);

// Group the wireframe and filled meshes together
const group = new THREE.Group();
const group2 = new THREE.Group();

group.add(wireframeMesh);
group.add(filledMesh);

group2.add(icosahedronWireframeMesh);
group2.add(icosahedronfilledMesh);

// Add the group to the scene
scene.add(group);
scene.add(group2);

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
        group.rotation.x += 2 * (targetRotationY - group.rotation.x);
        group.rotation.y += 2 * (targetRotationX - group.rotation.y);
        group2.rotation.x += 1 * (targetRotationY - group2.rotation.x);
        group2.rotation.y += 1 * (targetRotationX - group2.rotation.y);
    } else {
        group.rotation.x += 0.01;
        group.rotation.y += 0.01;
        group2.rotation.x += 0.02;
        group2.rotation.y += 0.02;
    }

    group.rotation.x += 0.01;
    group.rotation.y += 0.01;
    group2.rotation.x += 0.01;
    group2.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();