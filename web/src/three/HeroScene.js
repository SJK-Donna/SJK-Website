import * as THREE from "three";

// Brand colors ported from style.css :root — gold accent, green line,
// dark ink background — so the scene reads as "SJK Guahan," not a
// generic tech demo.
const NODE_COLOR = 0xe8c563;
const LINE_COLOR = 0x3f7d54;

/**
 * A quiet "business network" scene for the hero background: a field of
 * gold nodes with faint connecting lines, gently drifting and tilting
 * toward the cursor. Deliberately restrained — this is meant to sit
 * behind the real headline/CTAs, not compete with them.
 *
 * Vanilla Three.js (no react-three-fiber) so scene/camera/renderer
 * lifecycle and disposal are explicit and easy to audit from dispose().
 */
export default class HeroScene {
  constructor(canvas, { reducedMotion = false } = {}) {
    this.canvas = canvas;
    this.reducedMotion = reducedMotion;
    this.rafId = null;
    this.mouse = { x: 0, y: 0 };
    this.rot = { x: 0, y: 0 };

    this._initScene();
    this._buildNetwork();
    this._bindEvents();
    this._resize();

    if (!this.reducedMotion) {
      this._animate();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    this.camera.position.z = 18;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.group = new THREE.Group();
    this.scene.add(this.group);
  }

  // Fewer nodes on narrow viewports — the biggest lever for mobile GPU cost.
  _nodeCount() {
    const w = window.innerWidth;
    if (w < 640) return 32;
    if (w < 1024) return 52;
    return 80;
  }

  _buildNetwork() {
    const count = this._nodeCount();
    const radiusXZ = 11;
    const radiusY = 6;
    const positions = new Float32Array(count * 3);
    const points = [];

    for (let i = 0; i < count; i++) {
      const p = new THREE.Vector3(
        (Math.random() - 0.5) * radiusXZ * 2,
        (Math.random() - 0.5) * radiusY * 2,
        (Math.random() - 0.5) * radiusXZ
      );
      points.push(p);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: NODE_COLOR,
      size: 0.14,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    });
    this.points = new THREE.Points(pointsGeo, pointsMat);
    this.group.add(this.points);

    // Connect only nearby nodes, capped per-node, so this stays O(n) in
    // practice rather than drawing a dense unreadable web.
    const linePositions = [];
    const MAX_DIST = 4.4;
    const MAX_LINKS_PER_NODE = 3;
    for (let i = 0; i < points.length; i++) {
      let links = 0;
      for (let j = i + 1; j < points.length && links < MAX_LINKS_PER_NODE; j++) {
        if (points[i].distanceTo(points[j]) < MAX_DIST) {
          linePositions.push(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z);
          links++;
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lineMat = new THREE.LineBasicMaterial({ color: LINE_COLOR, transparent: true, opacity: 0.22 });
    this.lines = new THREE.LineSegments(lineGeo, lineMat);
    this.group.add(this.lines);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.PointLight(NODE_COLOR, 0.7, 40);
    key.position.set(6, 4, 10);
    this.scene.add(key);
  }

  _bindEvents() {
    this._onResize = () => this._resize();
    this._onMouseMove = (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    this._onVisibility = () => {
      if (document.hidden) this._stop();
      else if (!this.reducedMotion && this.rafId === null) this._animate();
    };
    window.addEventListener("resize", this._onResize);
    window.addEventListener("mousemove", this._onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", this._onVisibility);
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
    // Ease toward the cursor rather than snapping — a subtle parallax,
    // plus a very slow constant drift so the scene never feels static.
    this.rot.y += (this.mouse.x * 0.18 - this.rot.y) * 0.02;
    this.rot.x += (-this.mouse.y * 0.08 - this.rot.x) * 0.02;
    this.group.rotation.y = this.rot.y + now * 0.00002;
    this.group.rotation.x = this.rot.x;
    this.renderer.render(this.scene, this.camera);
  };

  _stop() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  dispose() {
    this._stop();
    window.removeEventListener("resize", this._onResize);
    window.removeEventListener("mousemove", this._onMouseMove);
    document.removeEventListener("visibilitychange", this._onVisibility);

    this.points.geometry.dispose();
    this.points.material.dispose();
    this.lines.geometry.dispose();
    this.lines.material.dispose();
    this.renderer.dispose();
  }
}
