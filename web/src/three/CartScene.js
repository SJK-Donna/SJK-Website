import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import gsap from "gsap";
import { WarpShader } from "./shaders/warpShader.js";
import { createWarpField } from "./shaders/warpField.js";
import { buildCartModel } from "./cartModel.js";

/**
 * The "5D" cart showcase: procedural cart + physical glass/clearcoat
 * materials + a recycling light-trail field + a post-processing chain
 * (bloom, chromatic aberration, a periodic warp/glitch pulse). Scene
 * setup, shaders, model, and interaction are separated into their own
 * modules; this class wires them together and owns the render loop and
 * disposal, same pattern as HeroScene/PartnersScene elsewhere in this app.
 */
export default class CartScene {
  constructor(canvas, { reducedMotion = false, initialColor = 0xe8c563 } = {}) {
    this.canvas = canvas;
    this.reducedMotion = reducedMotion;
    this.rafId = null;
    this.mouse = { x: 0, y: 0 };
    this.autoRotate = !reducedMotion;
    this.glitchClock = 0;
    this.nextGlitchAt = 3 + Math.random() * 4;

    this._initScene(initialColor);
    this._buildCart(initialColor);
    this._buildWarpField();
    this._initComposer();
    this._bindEvents();
    this._resize();

    if (!this.reducedMotion) {
      this._animate();
    } else {
      this.composer.render();
    }
  }

  _initScene(initialColor) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
    this.camera.position.set(3.2, 1.6, 4.2);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.5;

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0.3, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 9;
    this.controls.maxPolarAngle = Math.PI * 0.53;
    this.controls.autoRotate = this.autoRotate;
    this.controls.autoRotateSpeed = 1.1;
    this.controls.enabled = true; // orbiting is user-driven, so allowed even under reduced motion

    this.ambient = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(this.ambient);

    this.keyLight = new THREE.PointLight(initialColor, 7, 30);
    this.keyLight.position.set(4, 5, 3);
    this.scene.add(this.keyLight);

    this.rimLight = new THREE.PointLight(0x7dd3fc, 3.5, 30);
    this.rimLight.position.set(-4, 2, -3);
    this.scene.add(this.rimLight);

    this.fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.fillLight.position.set(0, 6, 6);
    this.scene.add(this.fillLight);

    this.ground = new THREE.Mesh(
      new THREE.CircleGeometry(9, 48),
      new THREE.MeshStandardMaterial({ color: 0x0d1512, roughness: 0.9, metalness: 0.1 })
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = -0.62;
    this.scene.add(this.ground);
  }

  _buildCart(initialColor) {
    const { group, bodyMat, trimMat } = buildCartModel(initialColor);
    this.cart = group;
    this.bodyMat = bodyMat;
    this.trimMat = trimMat;
    this.scene.add(this.cart);
  }

  _buildWarpField() {
    this.warpField = createWarpField();
    this.scene.add(this.warpField);
  }

  _initComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.1, 0.55, 0.62);
    this.composer.addPass(this.bloomPass);

    this.warpPass = new ShaderPass(WarpShader);
    this.warpPass.uniforms.uTint.value = this.bodyMat.color.clone();
    this.composer.addPass(this.warpPass);

    this.composer.addPass(new OutputPass());
  }

  _bindEvents() {
    this._onResize = () => this._resize();
    this._onPointerMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    this._onVisibility = () => {
      if (document.hidden) this._stop();
      else if (!this.reducedMotion && this.rafId === null) this._animate();
    };
    window.addEventListener("resize", this._onResize);
    this.canvas.addEventListener("pointermove", this._onPointerMove);
    document.addEventListener("visibilitychange", this._onVisibility);
  }

  _resize() {
    const parent = this.canvas.parentElement;
    const w = parent.clientWidth || 1;
    const h = parent.clientHeight || 1;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.bloomPass.setSize(w, h);
  }

  /** Smoothly tweens the cart's paint/trim, the two accent lights, and
   * the post-process tint to a new theme color — the "atmospheric
   * color shift" the brief asks for, all driven off one GSAP timeline
   * so everything settles together. */
  setThemeColor(hex) {
    const target = new THREE.Color(hex);
    const proxy = {
      br: this.bodyMat.color.r, bg: this.bodyMat.color.g, bb: this.bodyMat.color.b,
      kr: this.keyLight.color.r, kg: this.keyLight.color.g, kb: this.keyLight.color.b,
      tr: this.warpPass.uniforms.uTint.value.r, tg: this.warpPass.uniforms.uTint.value.g, tb: this.warpPass.uniforms.uTint.value.b
    };
    gsap.to(proxy, {
      br: target.r, bg: target.g, bb: target.b,
      kr: target.r, kg: target.g, kb: target.b,
      tr: target.r, tg: target.g, tb: target.b,
      duration: 1.1,
      ease: "power2.out",
      onUpdate: () => {
        this.bodyMat.color.setRGB(proxy.br, proxy.bg, proxy.bb);
        this.trimMat.color.setRGB(proxy.br, proxy.bg, proxy.bb);
        this.trimMat.emissive.setRGB(proxy.br, proxy.bg, proxy.bb);
        this.keyLight.color.setRGB(proxy.kr, proxy.kg, proxy.kb);
        this.warpPass.uniforms.uTint.value.setRGB(proxy.tr, proxy.tg, proxy.tb);
        this.warpField.material.uniforms.uTint.value.setRGB(proxy.tr, proxy.tg, proxy.tb);
      }
    });
  }

  setAutoRotate(on) {
    this.autoRotate = on;
    this.controls.autoRotate = on;
  }

  _animate = (now = 0) => {
    this.rafId = requestAnimationFrame(this._animate);
    const t = now * 0.001;

    // Mouse parallax nudges the rim light and the warp intensity, subtly.
    this.rimLight.position.x = -4 + this.mouse.x * 1.5;
    this.rimLight.position.y = 2 + this.mouse.y * 1.5;

    // A brief warp/glitch pulse every few seconds rather than constant noise.
    this.glitchClock += 1 / 60;
    let glitch = 0;
    if (this.glitchClock > this.nextGlitchAt) {
      const p = this.glitchClock - this.nextGlitchAt;
      glitch = Math.max(0, 1 - p / 0.35);
      if (p > 0.4) {
        this.glitchClock = 0;
        this.nextGlitchAt = 3 + Math.random() * 4;
      }
    }

    this.warpPass.uniforms.uTime.value = t;
    this.warpPass.uniforms.uGlitch.value = glitch;
    this.warpField.material.uniforms.uTime.value = t;
    this.bloomPass.strength = 1.1 + glitch * 0.6 + Math.abs(this.mouse.x) * 0.15;

    this.controls.update();
    this.composer.render();
  };

  _stop() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  dispose() {
    this._stop();
    gsap.killTweensOf(this.bodyMat.color);
    window.removeEventListener("resize", this._onResize);
    this.canvas.removeEventListener("pointermove", this._onPointerMove);
    document.removeEventListener("visibilitychange", this._onVisibility);
    this.controls.dispose();

    this.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material?.dispose();
      }
    });
    this.warpField.geometry.dispose();
    this.warpField.material.dispose();
    this.ground.geometry.dispose();
    this.ground.material.dispose();

    this.bloomPass.dispose();
    this.warpPass.dispose();
    this.composer.dispose();
    this.renderer.dispose();
  }
}
