<template>
  <canvas ref="canvasRef" class="hl-canvas" aria-hidden="true" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)

// ── SVG line icons (stroke only, no fill) ────────────────────
const _S = `stroke="rgba(232,232,230,0.92)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`
const _O = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ${_S}>`

const SVG_SCISSORS = _O + `<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`
const SVG_CPU      = _O + `<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/></svg>`
const SVG_CODE     = _O + `<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`
const SVG_PACKAGE  = _O + `<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/></svg>`
const SVG_STAR     = _O + `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
const SVG_SHIRT    = _O + `<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>`

const STICKERS = [
  { svg: SVG_SCISSORS, label: '跟单', x: -4.0, y:  1.8, rz:  0.30 },
  { svg: SVG_CPU,      label: 'AI',   x:  3.8, y:  2.0, rz: -0.18 },
  { svg: SVG_CODE,     label: '代码', x:  4.4, y: -0.5, rz:  0.12 },
  { svg: SVG_PACKAGE,  label: '出货', x: -4.3, y: -1.2, rz: -0.22 },
  { svg: SVG_STAR,     label: '品质', x:  1.0, y:  2.6, rz:  0.35 },
  { svg: SVG_SHIRT,    label: '服装', x: -1.4, y: -2.4, rz: -0.14 },
]

// ── Icon overlay texture (transparent background, just strokes + label) ──
// When composited on the liquid sphere, only the white lines show.
function makeTexture({ svg, label }) {
  const S = 256
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const ctx = cv.getContext('2d')
  const cx = S / 2, cy = S / 2, r = S * 0.44

  function drawBase() {
    ctx.clearRect(0, 0, S, S)
    // Thin ring border only (no dark fill)
    ctx.beginPath(); ctx.arc(cx, cy, r - 1, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(232,232,230,0.28)'; ctx.lineWidth = 1.5; ctx.stroke()
    // Label text
    ctx.font = `600 ${Math.floor(S * 0.082)}px "Space Mono",monospace`
    ctx.fillStyle = 'rgba(232,232,230,0.72)'
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
    ctx.fillText(label, cx, cy + r * 0.76)
  }

  drawBase()
  const tex = new THREE.CanvasTexture(cv)
  const img = new Image()
  img.onload = () => {
    drawBase()
    const iSz = S * 0.40
    ctx.drawImage(img, cx - iSz / 2, cy - iSz / 2 - S * 0.055, iSz, iSz)
    tex.needsUpdate = true
  }
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  return tex
}

// ══ Liquid Sphere Shader ══════════════════════════════════════
//
// Each sticker is a PlaneGeometry.
// Fragment shader ray-marches a single SDF sphere in local space.
// The sphere surface is shaded with the same dark iridescent noise
// used by the reference "interactive-droplets" demo.
// The icon texture (transparent bg, white strokes) is composited on top.
//
const SPHERE_R   = 0.84   // sphere radius in local units
const SPHERE_QUAD = 1.90  // PlaneGeometry size (desktop)

const SPHERE_VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const SPHERE_FRAG = /* glsl */`
  precision highp float;

  const float R    = ${SPHERE_R.toFixed(4)};
  const float QUAD = ${SPHERE_QUAD.toFixed(2)};
  const int   STEPS = 20;
  const float EPS   = 1e-4;

  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform float     uTime;
  uniform float     uFadeIn;
  uniform vec2      uJellyOrig;  // hit point in local space xy (normalised to sphere)
  uniform float     uJellyT;
  uniform float     uJellyAmp;

  // ── 3D value noise (same as reference) ──────────────────────
  float rnd3D(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453123);
  }
  float noise3D(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p);
    vec3 u = f*f*(3.0-2.0*f);
    float a000=rnd3D(i),             a100=rnd3D(i+vec3(1,0,0)),
          a010=rnd3D(i+vec3(0,1,0)), a110=rnd3D(i+vec3(1,1,0)),
          a001=rnd3D(i+vec3(0,0,1)), a101=rnd3D(i+vec3(1,0,1)),
          a011=rnd3D(i+vec3(0,1,1)), a111=rnd3D(i+vec3(1,1,1));
    float k0=a000, k1=a100-a000, k2=a010-a000, k3=a001-a000,
          k4=a000-a100-a010+a110, k5=a000-a010-a001+a011,
          k6=a000-a100-a001+a101,
          k7=-a000+a100+a010-a110+a001-a101-a011+a111;
    return k0+k1*u.x+k2*u.y+k3*u.z
           +k4*u.x*u.y+k5*u.y*u.z+k6*u.z*u.x
           +k7*u.x*u.y*u.z;
  }

  // ── Deformable sphere SDF ────────────────────────────────────
  // uJellyOrig is a unit-sphere direction (xy of normalized hit point)
  float map(vec3 p) {
    float r = R;
    if (uJellyAmp > 0.001) {
      vec3  pn  = normalize(p);
      // Angular distance from hit direction on sphere surface
      float ang = length(pn.xy - uJellyOrig);
      float press = -exp(-ang*ang*2.2) * exp(-uJellyT*4.5) * uJellyAmp * 0.38;
      float wave  =  sin(ang*7.5 - uJellyT*11.0) * exp(-ang*1.5)
                      * exp(-uJellyT*1.4) * uJellyAmp * 0.25;
      r += press + wave;
    }
    return length(p) - r;
  }

  vec3 getNormal(vec3 p) {
    return normalize(vec3(
      map(p+vec3(EPS,0,0))-map(p-vec3(EPS,0,0)),
      map(p+vec3(0,EPS,0))-map(p-vec3(0,EPS,0)),
      map(p+vec3(0,0,EPS))-map(p-vec3(0,0,EPS))
    ));
  }

  // ── Dark obsidian liquid — muted warmth, not vivid ──────────
  vec3 dropletColor(vec3 normal, vec3 rayDir) {
    vec3 ref = reflect(rayDir, normal);

    float n1 = noise3D(ref * 2.0 + uTime * 0.9);
    float n2 = noise3D(ref * 4.2 - uTime * 1.6);
    float n3 = noise3D(ref * 1.0 + uTime * 0.45);

    // Near-black base with muted warm-iron tones — no vivid red
    vec3 c_void  = vec3(0.05, 0.02, 0.01) * n1;   // near-black
    vec3 c_iron  = vec3(0.22, 0.06, 0.03) * n2;   // dark iron-brown
    vec3 c_bronze= vec3(0.38, 0.14, 0.05) * n3;   // muted bronze-amber

    vec3 color = (c_void + c_iron + c_bronze * 0.65) * 2.4;

    // Higher pow → stays dark and moody
    color = pow(max(color, vec3(0.0)), vec3(5.5));

    // Soft warm specular — not white-hot, more like polished stone
    vec3  lightDir = normalize(vec3(-0.45, 1.0, 1.2));
    float spec     = pow(max(dot(ref, lightDir), 0.0), 42.0);
    color += spec * vec3(0.80, 0.48, 0.22) * 0.75;

    return color;
  }

  void main() {
    // Map vUv → local position in [-QUAD/2, QUAD/2]
    vec2 lp = (vUv - 0.5) * QUAD;

    // Orthographic ray from front (+Z → -Z)
    vec3 ro = vec3(lp, 2.0);
    vec3 rd = vec3(0.0, 0.0, -1.0);

    // Ray march
    vec3  p = ro;
    float d = 0.0;
    for (int i = 0; i < STEPS; i++) {
      d = map(p);
      if (d < EPS) break;
      p += rd * d;
    }

    // Outside sphere → discard (transparent)
    if (d > EPS) discard;

    // Surface shading
    vec3 normal = getNormal(p);
    vec3 color  = dropletColor(normal, rd);

    // Rim light: very subtle warm dark edge
    float rim = 1.0 - max(0.0, dot(normal, -rd));
    color += pow(rim, 4.0) * vec3(0.45, 0.12, 0.03) * 0.50;

    // Icon overlay: map sphere surface hit-point to texture UV
    vec2 iconUV = p.xy / R * 0.46 + 0.5;
    vec4 icon   = texture2D(uMap, clamp(iconUV, 0.0, 1.0));
    // White strokes glow bright on the dark sphere
    color = mix(color, color * 1.3 + icon.rgb * 0.65, icon.a * 0.92);

    // Smooth alpha: fade at sphere silhouette edge + fade-in spawn
    float edgeAlpha = smoothstep(1.03, 0.80, length(lp) / R);
    float alpha = uFadeIn * edgeAlpha;

    gl_FragColor = vec4(color, alpha);
  }
`

// ── Three.js setup ────────────────────────────────────────────
let renderer, scene, camera, animId
const clock     = new THREE.Clock()
const mouseNDC  = new THREE.Vector2(9999, 9999)
const mouse3D   = new THREE.Vector3()
const raycaster = new THREE.Raycaster()
const zPlane    = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
let stickerObjs = []
let scrollVelY  = 0, _lastScrollY = 0, _scrollHandler = null

// ── Build one liquid-sphere sticker ──────────────────────────
function buildSticker(data) {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uMap:       { value: makeTexture(data) },
      uTime:      { value: 0 },
      uFadeIn:    { value: 0.0 },
      uJellyOrig: { value: new THREE.Vector2(0, 0) },
      uJellyT:    { value: 0.0 },
      uJellyAmp:  { value: 0.0 },
    },
    vertexShader:   SPHERE_VERT,
    fragmentShader: SPHERE_FRAG,
    transparent: true,
    depthWrite:  false,
    side: THREE.DoubleSide,
  })

  // Simple quad — all 3D work is in fragment shader
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(SPHERE_QUAD, SPHERE_QUAD), mat)
  mesh.rotation.z = data.rz
  mesh.position.set(data.x, data.y, 0)
  scene.add(mesh)

  return {
    mesh,
    pos:        new THREE.Vector3(data.x, data.y, 0),
    baseRz:     data.rz,
    driftX:     (Math.random() - 0.5) * 0.18,
    driftY:     -(0.30 + Math.random() * 0.45),
    angularVel: (Math.random() - 0.5) * 0.75,
    swayAmp:    0.10 + Math.random() * 0.13,
    swayFreq:   0.35 + Math.random() * 0.30,
    swayPhase:  Math.random() * Math.PI * 2,
    spawnAge:   0,
    fadeIn:     true,
    repulseX:  0, repulseY:  0,
    repulseVX: 0, repulseVY: 0,
    jellyT:    0.0, jellyAmp:  0.0,
    jellyOX:   0.0, jellyOY:   0.0,
    isClose:   false,
  }
}

// ── Per-sticker frame step ────────────────────────────────────
function step(s, t, dt) {
  // Fall + sway physics — always at full speed, cursor contact doesn't pause
  const swayVx = Math.sin(t * s.swayFreq + s.swayPhase) * s.swayAmp
  s.pos.x += (s.driftX + swayVx) * dt
  s.pos.y += (s.driftY - scrollVelY * 0.9) * dt
  s.baseRz += s.angularVel * dt

  const X_LIMIT = 5.6, Y_DEAD = -3.9, Y_SPAWN = 4.5
  if (s.pos.y < Y_DEAD) {
    s.pos.y = Y_SPAWN; s.pos.x = (Math.random() - 0.5) * X_LIMIT * 1.8
    s.driftX    = (Math.random() - 0.5) * 0.18
    s.driftY    = -(0.30 + Math.random() * 0.45)
    s.angularVel = (Math.random() - 0.5) * 0.75
    s.swayAmp   = 0.10 + Math.random() * 0.13
    s.swayFreq  = 0.35 + Math.random() * 0.30
    s.swayPhase = Math.random() * Math.PI * 2
    s.spawnAge  = 0; s.fadeIn = true; s.mesh.scale.setScalar(0.55)
    s.repulseX = s.repulseY = s.repulseVX = s.repulseVY = 0
    s.jellyAmp = 0
  }
  if (s.pos.x >  X_LIMIT) { s.pos.x =  X_LIMIT; s.driftX *= -0.6 }
  if (s.pos.x < -X_LIMIT) { s.pos.x = -X_LIMIT; s.driftX *= -0.6 }

  // Magnetic repulsion spring
  const REPULSE_R = 1.55
  const ex = mouse3D.x - (s.pos.x + s.repulseX)
  const ey = mouse3D.y - (s.pos.y + s.repulseY)
  const ed  = Math.sqrt(ex*ex + ey*ey)
  if (ed < REPULSE_R && ed > 0.001) {
    const t01  = 1 - ed / REPULSE_R
    const force = t01 * t01 * 5.2
    s.repulseVX -= (ex / ed) * force * dt
    s.repulseVY -= (ey / ed) * force * dt
  }
  s.repulseVX += (-s.repulseX * 82 - s.repulseVX * 9) * dt
  s.repulseVY += (-s.repulseY * 82 - s.repulseVY * 9) * dt
  s.repulseX  += s.repulseVX * dt
  s.repulseY  += s.repulseVY * dt

  const effX = s.pos.x + s.repulseX
  const effY = s.pos.y + s.repulseY
  s.mesh.position.set(effX, effY, 0)
  s.mesh.rotation.z = s.baseRz

  // Fade-in on spawn
  const u = s.mesh.material.uniforms
  if (s.fadeIn) {
    s.spawnAge += dt
    const p = Math.min(1, s.spawnAge / 0.55)
    u.uFadeIn.value = p
    s.mesh.scale.setScalar(0.55 + (1 - Math.pow(1-p, 2)) * 0.45)
    if (p >= 1) { s.fadeIn = false; s.mesh.scale.setScalar(1) }
  }

  // Jelly interaction with hysteresis
  const dx = mouse3D.x - effX, dy = mouse3D.y - effY
  const dist = Math.sqrt(dx*dx + dy*dy)
  // Rotate to local sticker space, then normalise to unit-sphere direction
  const cosRz = Math.cos(-s.baseRz), sinRz = Math.sin(-s.baseRz)
  const lxRaw = dx*cosRz - dy*sinRz
  const lyRaw = dx*sinRz + dy*cosRz
  const len2d = Math.sqrt(lxRaw*lxRaw + lyRaw*lyRaw)
  // Unit direction on sphere surface (what the shader expects for uJellyOrig)
  const jOX = len2d > 0.001 ? lxRaw/len2d : 0
  const jOY = len2d > 0.001 ? lyRaw/len2d : 0

  const ENTER_R = 0.85, EXIT_R = 1.10
  const nowClose = s.isClose ? dist < EXIT_R : dist < ENTER_R
  if (!s.isClose && nowClose) {
    s.jellyT = 0; s.jellyAmp = 1.0; s.jellyOX = jOX; s.jellyOY = jOY
    window.dispatchEvent(new CustomEvent('sticker-hit'))
  }
  if (s.isClose && !nowClose) {
    s.jellyT = 0; s.jellyAmp = 0.65; s.jellyOX = jOX; s.jellyOY = jOY
  }
  s.isClose = nowClose
  if (s.jellyAmp > 0.001) { s.jellyT += dt; if (s.jellyT > 2.4) s.jellyAmp = 0 }

  u.uTime.value = t
  u.uJellyOrig.value.set(s.jellyOX, s.jellyOY)
  u.uJellyT.value   = s.jellyT
  u.uJellyAmp.value = s.jellyAmp
}

// ── Renderer init ─────────────────────────────────────────────
function init() {
  const cv = canvasRef.value
  const W  = cv.clientWidth  || window.innerWidth
  const H  = cv.clientHeight || window.innerHeight
  renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(W, H, false)
  renderer.setClearColor(0, 0)
  scene  = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, W/H, 0.1, 100)
  camera.position.z = 7

  stickerObjs = STICKERS.map(d => buildSticker(d))

  _lastScrollY = window.scrollY
  _scrollHandler = () => {
    const dy = Math.abs(window.scrollY - _lastScrollY)
    _lastScrollY = window.scrollY
    scrollVelY = Math.min(4, scrollVelY + dy * 0.014)
  }
  window.addEventListener('scroll', _scrollHandler, { passive: true })
}

let prevT = 0
function frame() {
  animId = requestAnimationFrame(frame)
  const t  = clock.getElapsedTime()
  const dt = Math.min(t - prevT, 0.05)
  prevT = t

  scrollVelY = Math.max(0, scrollVelY - dt * 5)
  raycaster.setFromCamera(mouseNDC, camera)
  if (!raycaster.ray.intersectPlane(zPlane, mouse3D)) mouse3D.set(9999, 9999, 0)

  stickerObjs.forEach(s => step(s, t, dt))
  renderer.render(scene, camera)
}

function onMove(e) {
  const cv = canvasRef.value; if (!cv) return
  const r  = cv.getBoundingClientRect()
  mouseNDC.x =  ((e.clientX - r.left) / r.width)  * 2 - 1
  mouseNDC.y = -((e.clientY - r.top)  / r.height) * 2 + 1
}

function onResize() {
  const cv = canvasRef.value; if (!cv || !renderer) return
  const W = cv.clientWidth, H = cv.clientHeight
  renderer.setSize(W, H, false)
  camera.aspect = W/H; camera.updateProjectionMatrix()
}

onMounted(() => {
  requestAnimationFrame(() => { init(); frame() })
  window.addEventListener('mousemove', onMove)
  window.addEventListener('resize',    onResize)
})
onUnmounted(() => {
  cancelAnimationFrame(animId)
  renderer?.dispose()
  stickerObjs.forEach(s => {
    s.mesh.geometry.dispose()
    s.mesh.material.uniforms.uMap.value?.dispose()
    s.mesh.material.dispose()
  })
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('resize',    onResize)
  if (_scrollHandler) window.removeEventListener('scroll', _scrollHandler)
})
</script>

<style scoped>
.hl-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}
</style>
