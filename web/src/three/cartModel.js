import * as THREE from "three";

/**
 * Procedural fallback golf-cart geometry — no GLTF asset exists in this
 * project, so the cart is built from primitives: a clearcoat "paint"
 * body (the color-synced mesh), a glass windshield, a canopy roof on
 * four posts, wheels, and a steering column. Stylized, not a literal
 * replica.
 *
 * Returns { group, body, trim } so the caller can drive color sync on
 * the two material-bearing parts without reaching into the hierarchy.
 */
export function buildCartModel(themeColor) {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: themeColor,
    metalness: 0.6,
    roughness: 0.25,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
    reflectivity: 0.6
  });
  const trimMat = new THREE.MeshPhysicalMaterial({
    color: themeColor,
    metalness: 0.8,
    roughness: 0.35,
    emissive: themeColor,
    emissiveIntensity: 0.35
  });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x14181a, roughness: 0.7, metalness: 0.2 });
  const seatMat = new THREE.MeshStandardMaterial({ color: 0xcbb489, roughness: 0.8 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 1,
    thickness: 0.3,
    roughness: 0.04,
    ior: 1.5,
    metalness: 0,
    transparent: true
  });

  // Body shell.
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.75, 1.15, 3, 3, 3), bodyMat);
  body.position.set(0, 0, 0);
  group.add(body);

  // Front nose taper.
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.55, 1.05), bodyMat);
  nose.position.set(1.35, -0.05, 0);
  group.add(nose);

  // Bumper/trim strip — the accent that reads as "trim" in the brief.
  const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 1.2), trimMat);
  bumper.position.set(1.55, -0.28, 0);
  group.add(bumper);

  // Seats.
  [-0.35, 0.35].forEach((z) => {
    const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 0.5), seatMat);
    seatBase.position.set(-0.1, 0.45, z * 0.9);
    group.add(seatBase);
    const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 0.12), seatMat);
    seatBack.position.set(-0.42, 0.72, z * 0.9);
    group.add(seatBack);
  });

  // Windshield.
  const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.7), glassMat);
  windshield.position.set(0.85, 0.85, 0);
  windshield.rotation.y = Math.PI / 2;
  windshield.rotation.z = -0.18;
  group.add(windshield);

  // Canopy roof + posts.
  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.06, 1.3), bodyMat);
  roof.position.set(0.15, 1.55, 0);
  group.add(roof);
  const postGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.85, 8);
  [
    [0.85, 0.55],
    [-0.6, 0.55]
  ].forEach(([x]) => {
    [-0.55, 0.55].forEach((z) => {
      const post = new THREE.Mesh(postGeo, darkMat);
      post.position.set(x, 1.1, z);
      group.add(post);
    });
  });

  // Steering wheel.
  const wheelTorus = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 8, 20), darkMat);
  wheelTorus.position.set(0.5, 0.95, -0.25);
  wheelTorus.rotation.x = Math.PI / 2.4;
  group.add(wheelTorus);

  // Road wheels.
  const tireGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 20);
  const rimGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.24, 12);
  [
    [0.95, -0.62],
    [0.95, 0.62],
    [-0.85, -0.62],
    [-0.85, 0.62]
  ].forEach(([x, z]) => {
    const tire = new THREE.Mesh(tireGeo, darkMat);
    tire.rotation.z = Math.PI / 2;
    tire.position.set(x, -0.35, z);
    group.add(tire);
    const rim = new THREE.Mesh(rimGeo, trimMat);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(x, -0.35, z);
    group.add(rim);
  });

  group.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = false;
      obj.receiveShadow = false;
    }
  });

  return { group, body, nose, bumper, roof, trimMeshes: [bumper], bodyMat, trimMat };
}
