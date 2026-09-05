import * as THREE from "three";

/**
 * A field of short glowing streaks recycling toward the camera — the
 * "warp-speed depth transition" / light-trail backdrop. Each streak is
 * a 2-vertex line segment; a custom vertex shader advances it along Z
 * and wraps it via modulo once it passes the camera, so the field
 * animates without ever reallocating buffers.
 */
export function createWarpField(count = 420, depth = 60) {
  const positions = new Float32Array(count * 2 * 3);
  const seeds = new Float32Array(count * 2);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 10;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.55;
    const z0 = Math.random() * depth - depth / 2;
    const len = 0.4 + Math.random() * 1.3;
    positions.set([x, y, z0, x, y, z0 - len], i * 6);
    const seed = Math.random();
    seeds[i * 2] = seed;
    seeds[i * 2 + 1] = seed;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: 7 },
      uTint: { value: new THREE.Color(0xe8c563) },
      uDepth: { value: depth }
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime, uSpeed, uDepth;
      varying float vFade;
      void main() {
        float z = mod(position.z - uTime * uSpeed * (0.4 + aSeed), uDepth) - uDepth * 0.5;
        vFade = smoothstep(-uDepth * 0.5, -uDepth * 0.1, z) * (1.0 - smoothstep(uDepth * 0.25, uDepth * 0.5, z));
        vec4 mv = modelViewMatrix * vec4(position.x, position.y, z, 1.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTint;
      varying float vFade;
      void main() {
        gl_FragColor = vec4(uTint, vFade * 0.55);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  return new THREE.LineSegments(geo, mat);
}
