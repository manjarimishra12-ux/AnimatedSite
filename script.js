let scene, camera, renderer, jellyfish, plankton, angler, bubbles, coral, seaweed;
let mouseX = 0, mouseY = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000814, 1);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create jellyfish
    jellyfish = new THREE.Group();
    const jellyfishBody = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0xff00ff, transparent: true, opacity: 0.7 })
    );
    jellyfish.add(jellyfishBody);

    for (let i = 0; i < 8; i++) {
        const tentacle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.01, 2, 8),
            new THREE.MeshPhongMaterial({ color: 0xff00ff, transparent: true, opacity: 0.5 })
        );
        tentacle.position.y = -1;
        tentacle.rotation.x = Math.PI / 2;
        tentacle.rotation.z = (i / 8) * Math.PI * 2;
        jellyfish.add(tentacle);
    }

    scene.add(jellyfish);
    jellyfish.position.set(0, 2, -5);

    // Create plankton
    plankton = new THREE.Group();
    const planktonGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const planktonMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x00ffff });

    for (let i = 0; i < 200; i++) {
        const p = new THREE.Mesh(planktonGeometry, planktonMaterial);
        p.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        plankton.add(p);
    }
    scene.add(plankton);

    // Create angler fish
    angler = new THREE.Group();
    const anglerBody = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 16),
        new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    angler.add(anglerBody);

    const anglerLight = new THREE.PointLight(0xffff00, 1, 3);
    anglerLight.position.set(0.7, 0.5, 0);
    angler.add(anglerLight);

    const anglerLure = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xffff00 })
    );
    anglerLure.position.set(0.7, 0.5, 0);
    angler.add(anglerLure);

    scene.add(angler);
    angler.position.set(-5, -2, -10);

    // Create bubbles
    bubbles = new THREE.Group();
    const bubbleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const bubbleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });

    for (let i = 0; i < 50; i++) {
        const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
        bubble.position.set(
            (Math.random() - 0.5) * 20,
            -10 + Math.random() * 5,
            (Math.random() - 0.5) * 20
        );
        bubbles.add(bubble);
    }
    scene.add(bubbles);

    // Create coral
    coral = new THREE.Group();
    const coralGeometry = new THREE.ConeGeometry(0.5, 1, 32);
    const coralMaterial = new THREE.MeshPhongMaterial({ color: 0xff6f61 });

    for (let i = 0; i < 20; i++) {
        const c = new THREE.Mesh(coralGeometry, coralMaterial);
        c.position.set(
            (Math.random() - 0.5) * 20,
            -5 + Math.random() * 2,
            (Math.random() - 0.5) * 20
        );
        c.rotation.x = Math.random() * Math.PI;
        c.rotation.z = Math.random() * Math.PI;
        coral.add(c);
    }
    scene.add(coral);

    // Create seaweed
    seaweed = new THREE.Group();
    const seaweedGeometry = new THREE.PlaneGeometry(0.5, 2);
    const seaweedMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });

    for (let i = 0; i < 30; i++) {
        const sw = new THREE.Mesh(seaweedGeometry, seaweedMaterial);
        sw.position.set(
            (Math.random() - 0.5) * 20,
            -5 + Math.random() * 2,
            (Math.random() - 0.5) * 20
        );
        sw.rotation.y = Math.random() * Math.PI;
        seaweed.add(sw);
    }
    scene.add(seaweed);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x001133);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 10;

    document.addEventListener('mousemove', onMouseMove);

    animate();
}

function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

function animate() {
    requestAnimationFrame(animate);

    // Animate jellyfish
    jellyfish.rotation.y += 0.01;
    jellyfish.children.forEach((tentacle, index) => {
        if (index !== 0) {  // Skip the body
            tentacle.rotation.z += Math.sin(Date.now() * 0.003 + index) * 0.02;
        }
    });

    // Animate plankton
    plankton.children.forEach((p, index) => {
        p.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        p.material.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.003 + index) * 0.5;
    });

    // Animate angler fish
    angler.rotation.y = Math.sin(Date.now() * 0.001) * 0.5;
    angler.position.x = -5 + Math.sin(Date.now() * 0.0005) * 2;

    // Animate bubbles
    bubbles.children.forEach((bubble) => {
        bubble.position.y += 0.05;
        if (bubble.position.y > 10) {
            bubble.position.y = -10;
        }
        bubble.position.x += Math.sin(Date.now() * 0.001 + bubble.position.z) * 0.01;
    });

    // Animate seaweed
    seaweed.children.forEach((sw, index) => {
        sw.rotation.y = Math.sin(Date.now() * 0.001 + index) * 0.2;
        sw.position.y += Math.sin(Date.now() * 0.002 + index) * 0.005;
    });

    // Move camera based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();

// GSAP animations
gsap.to(jellyfish.position, {
    duration: 4,
    y: '+=1',
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
});

gsap.to(coral.rotation, {
    duration: 10,
    y: Math.PI * 2,
    repeat: -1,
    ease: "none"
});

gsap.to(camera.position, {
    duration: 20,
    z: 15,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
});

// Add interactivity
document.addEventListener('click', onDocumentClick, false);

function onDocumentClick(event) {
    event.preventDefault();

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        gsap.to(object.scale, {
            duration: 0.5,
            x: 1.5,
            y: 1.5,
            z: 1.5,
            yoyo: true,
            repeat: 1,
            ease: "bounce.out"
        });
    }
}