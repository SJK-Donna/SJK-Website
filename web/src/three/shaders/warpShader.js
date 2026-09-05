// A single combined full-screen pass: chromatic aberration (constant,
// subtle) + a periodic "warp pulse" (brief RGB-split/scanline flicker
// every few seconds, not a constant broken-TV glitch) + a soft vignette.
// Combined into one ShaderPass instead of three separate ones to keep
// the post-processing chain cheap — each pass is a full-resolution
// texture read.
export const WarpShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uAberration: { value: 0.0025 },
    uGlitch: { value: 0 }, // 0..1, driven by a periodic pulse in the render loop
    uTint: { value: null } // THREE.Color, synced to the active theme
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAberration;
    uniform float uGlitch;
    uniform vec3 uTint;
    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;

      // Glitch pulse: a brief horizontal line-shift, only when uGlitch > 0.
      float lineShift = (rand(vec2(floor(uv.y * 60.0), uTime)) - 0.5) * 0.02 * uGlitch;
      uv.x += lineShift;

      vec2 dir = uv - 0.5;
      float amt = uAberration + uGlitch * 0.01;
      float r = texture2D(tDiffuse, uv - dir * amt).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv + dir * amt).b;
      vec3 color = vec3(r, g, b);

      // Faint scanlines during a glitch pulse.
      float scan = sin(uv.y * 800.0 + uTime * 40.0) * 0.04 * uGlitch;
      color += scan;

      // Soft vignette, always on — keeps focus on the cart.
      float vig = smoothstep(0.9, 0.35, length(uv - 0.5));
      color *= mix(0.72, 1.0, vig);

      // A whisper of the active theme color in the shadows, so the
      // whole frame (not just the cart) reads as "themed."
      color = mix(color, color + uTint * 0.06, 0.5);

      gl_FragColor = vec4(color, 1.0);
    }
  `
};
