import * as THREE from "three";

const STRUCTURE_COLOR = 0x173e2e;
const EDGE_COLOR = 0xe8c563;

// Slow shared orbit — same composition the client approved for the CSS
// version of this section (a stable central structure, cards drifting
// around it at varying depth, passing behind/in front of it for real).
const ORBIT_MS = 34000;
const RADIUS_X = 2.7;
const RADIUS_Z = 2.0;
const RADIUS_Y = 0.5;

/**
 * A real WebGL "Our Partners" showcase: a central structure with eight
 * partner-logo planes orbiting it, occluding behind it via the actual
 * depth buffer (not a CSS approximation). Cards always face the camera
 * (billboarded) so logos stay flat and readable regardless of orbit
 * position — ported as vanilla Three.js for the same explicit lifecycle
 * control as HeroScene.
 */
export default class PartnersScene {
  constructor(canvas, { partners, reducedMotion = false, onNavigate } = {}) {
    this.canvas = canvas;
    this.partners = partners;
    this.reducedMotion = reducedMotion;
    this.onNavigate = onNavigate;
    this.rafId = null;
    this.mouse = { x: 0, y: 0 };
    this.rot = { x: 0, y: 0 };
    this.hovered = null;
    this.cards = [];

    this._initScene();
    this._buildStructure();
    this._loadCards();
    this._bindEvents();
    this._resize();

    if (!this.reducedMotion) {
      this._animate();
    } else {
      this._placeCards(0);
      this.renderer.render(this.scene, this.camera);
    }
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.camera.position.set(0, 0, 9);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.PointLight(EDGE_COLOR, 1, 30);
    key.position.set(3, 3, 6);
    this.scene.add(key);
  }

  _buildStructure() {
    const geo = new THREE.BoxGeometry(2.3, 2.9, 0.6);
    const mat = new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, roughness: 0.6, metalness: 0.1 });
    this.structure = new THREE.Mesh(geo, mat);
    this.scene.add(this.structure);

    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: EDGE_COLOR, transparent: true, opacity: 0.5 }));
    this.structure.add(line);
  }

  _loadCards() {
    const loader = new THREE.TextureLoader();
    const n = this.partners.length;
    this.partners.forEach((p, i) => {
      const geo = new THREE.PlaneGeometry(1, 0.75);
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { index: i, phase: i / n, href: p.href || "#quote" };
      this.scene.add(mesh);
      this.cards.push(mesh);

      loader.load(p.src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        // Match the plane's aspect ratio to the actual logo image instead
        // of forcing every card into an identical 4:3 box.
        const ratio = tex.image.width / tex.image.height;
        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(ratio >= 1 ? 1.15 : 1.15 * ratio, ratio >= 1 ? 1.15 / ratio : 1.15);
        mat.map = tex;
        mat.needsUpdate = true;
      });
    });
  }

  _placeCards(tMs) {
    const n = this.cards.length;
    this.cards.forEach((mesh) => {
      const { index, phase: base } = mesh.userData;
      const isHot = this.hovered === mesh;
      const phase = ((tMs / ORBIT_MS) + base) % 1;
      const angle = phase * Math.PI * 2;
      const x = Math.cos(angle) * RADIUS_X;
      const z = Math.sin(angle) * RADIUS_Z + (isHot ? 1.1 : 0);
      const y = Math.sin(angle * 2 + index) * RADIUS_Y;
      mesh.position.set(x, y, z);
      mesh.lookAt(this.camera.position);
      const s = isHot ? 1.22 : 1;
      mesh.scale.set(s, s, s);
    });
  }

  _bindEvents() {
    this._onResize = () => this._resize();
    this._onPointerMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      this._pickHover();
    };
    this._onClick = () => {
      if (this.hovered) this.onNavigate?.(this.hovered.userData.href);
    };
    this._onVisibility = () => {
      if (document.hidden) this._stop();
      else if (!this.reducedMotion && this.rafId === null) this._animate();
    };
    window.addEventListener("resize", this._onResize);
    this.canvas.addEventListener("pointermove", this._onPointerMove);
    this.canvas.addEventListener("click", this._onClick);
    document.addEventListener("visibilitychange", this._onVisibility);
    this.raycaster = new THREE.Raycaster();
  }

  _pickHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(this.cards);
    const next = hits[0]?.object || null;
    if (next !== this.hovered) {
      this.hovered = next;
      this.canvas.style.cursor = next ? "pointer" : "default";
    }
  }

  _resize() {
    const parent = this.canvas.parentElement;
    const w = parent.clientWidth || 1;
    const h = parent.clientHeight || 1;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  _animate = (now = 0) => {
    this.rafId = requestAnimationFrame(this._animate);
    // Subtle parallax tilt of the whole scene toward the cursor.
    this.rot.y += (this.mouse.x * 0.12 - this.rot.y) * 0.03;
    this.rot.x += (-this.mouse.y * 0.06 - this.rot.x) * 0.03;
    this.scene.rotation.y = this.rot.y;
    this.scene.rotation.x = this.rot.x;
    this._placeCards(now);
    this.renderer.render(this.scene, this.camera);
  };

  _stop() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  dispose() {
    this._stop();
    window.removeEventListener("resize", this._onResize);
    this.canvas.removeEventListener("pointermove", this._onPointerMove);
    this.canvas.removeEventListener("click", this._onClick);
    document.removeEventListener("visibilitychange", this._onVisibility);

    this.structure.geometry.dispose();
    this.structure.material.dispose();
    this.cards.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.map?.dispose();
      mesh.material.dispose();
    });
    this.renderer.dispose();
  }
}
