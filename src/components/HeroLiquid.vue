<template>
  <canvas ref="canvasRef" class="hl-canvas" aria-hidden="true" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)

// ── Sticker definitions ──────────────────────────────────────
const STICKERS = [
  { emoji: '✂️', label: '跟单', color: '#c0392b', x: -4.0, y:  1.8, rz:  0.30 },
  { emoji: '🤖', label: 'AI',   color: '#1565c0', x:  3.8, y:  2.0, rz: -0.18 },
  { emoji: '💻', label: '代码', color: '#1b5e20', x:  4.4, y: -0.5, rz:  0.12 },
  { emoji: '📦', label: '出货', color: '#e65100', x: -4.3, y: -1.2, rz: -0.22 },
  { emoji: '⭐', label: '品质', color: '#4527a0', x:  1.0, y:  2.6, rz:  0.35 },
  { emoji: '🧵', label: '服装', color: '#880e4f', x: -1.4, y: -2.4, rz: -0.14 },
]

// ── Color helpers ────────────────────────────────────────────
function hexRgb(hex) {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]
}
function shift(hex, amt) {
  const [r,g,b] = hexRgb(hex)
  return `rgb(${Math.max(0,Math.min(255,r+amt))},${Math.max(0,Math.min(255,g+amt))},${Math.max(0,Math.min(255,b+amt))})`
}

// ── Canvas texture ───────────────────────────────────────────
function makeTexture({ emoji, label, color }) {
  const S = 256, cv = document.createElement('canvas')
  cv.width = cv.height = S
  const ctx = cv.getContext('2d')
  const cx = S/2, cy = S/2, r = S*0.44

  const g = ctx.createRadialGradient(cx-r*.28, cy-r*.28, r*.04, cx, cy, r)
  g.addColorStop(0,    shift(color,  65))
  g.addColorStop(0.55, color)
  g.addColorStop(1,    shift(color, -45))
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2)
  ctx.fillStyle = g; ctx.fill()

  const sh = ctx.createRadialGradient(cx-r*.22, cy-r*.40, 0, cx-r*.08, cy-r*.25, r*.52)
  sh.addColorStop(0, 'rgba(255,255,255,0.55)')
  sh.addColorStop(1, 'rgba(255,255,255,0.00)')
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2)
  ctx.fillStyle = sh; ctx.fill()

  ctx.font = `${Math.floor(S*.40)}px serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(emoji, cx, cy - S*.05)

  ctx.font = `700 ${Math.floor(S*.095)}px monospace`
  ctx.fillStyle = 'rgba(255,255,255,0.90)'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(label, cx, cy + r*.74)

  return new THREE.CanvasTexture(cv)
}

// ── Liquid ShaderMaterial ────────────────────────────────────
const VERT = /* glsl */`
  varying vec2 vUv;
  uniform float uBend;       // 0–1, how much to trail edges
  uniform vec2  uVelDir;     // normalized velocity direction
  uniform float uWobble;     // 0–1, ring-down after stop
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distance from disc centre (normalized)
    float r  = length(position.xy) / 0.72;  // ~1 at edge for 1.44-wide plane
    float r2 = r * r;

    // Trailing edge: vertices lag opposite to motion direction
    pos.xy -= uVelDir * uBend * r2 * 0.38;

    // Jelly wobble: decaying sine ring expanding from centre
    float wobbleZ = sin(r * 7.0 - uTime * 18.0) * uWobble * 0.14 * r2;
    pos.z += wobbleZ;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const FRAG = /* glsl */`
  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform float uBend;
  uniform float uWobble;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;

    // UV stretch when moving fast (pull texture in motion direction)
    float stretch = uBend * 0.022;
    uv = uv * (1.0 - stretch) + vec2(0.5) * stretch;

    // UV jiggle on ring-down
    if (uWobble > 0.005) {
      float w = uWobble * 0.018;
      uv.x += sin(uv.y * 9.0 + uTime * 6.0) * w;
      uv.y += sin(uv.x * 9.0 + uTime * 5.3) * w;
    }

    uv = clamp(uv, 0.01, 0.99);
    vec4 col = texture2D(uMap, uv);

    // Edge softness (circular alpha mask)
    vec2 d = (uv - 0.5) * 2.0;
    float dist = length(d);
    float alpha = smoothstep(1.0, 0.82, dist);
    col.a *= alpha;

    gl_FragColor = col;
  }
`

function makeMaterial(texture) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uMap:    { value: texture },
      uBend:   { value: 0.0 },
      uVelDir: { value: new THREE.Vector2(0, 0) },
      uWobble: { value: 0.0 },
      uTime:   { value: 0.0 },
    },
    vertexShader:   VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite:  false,
    side: THREE.DoubleSide,
  })
}

// ── Three.js state ───────────────────────────────────────────
let renderer, scene, camera, animId
const clock     = new THREE.Clock()
const mouseNDC  = new THREE.Vector2(9999, 9999)
const mouse3D   = new THREE.Vector3()
const raycaster = new THREE.Raycaster()
const zPlane    = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
let   stickerObjs = []

function buildSticker(data, idx) {
  // Subdivided plane so vertices can deform
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.44, 1.44, 14, 14),
    makeMaterial(makeTexture(data))
  )
  mesh.rotation.z = data.rz
  const home = new THREE.Vector3(data.x, data.y, 0)
  mesh.position.copy(home)
  scene.add(mesh)

  return {
    mesh,
    home,
    pos:        home.clone(),
    vel:        new THREE.Vector3(),
    prevSpeed:  0,
    wobble:     0,     // current wobble amplitude
    wobbleAge:  0,     // time since wobble triggered
    baseRz:     data.rz,
    phase:      idx * 1.13 + Math.random() * 0.5,
  }
}

// ── Physics + liquid deformation ─────────────────────────────
function stepSticker(s, t, dt) {
  // Idle float
  const floatTarget = s.home.clone()
  floatTarget.y += Math.sin(t * 0.72 + s.phase) * 0.07

  // Spring toward float target
  s.vel.addScaledVector(floatTarget.clone().sub(s.pos), 0.052)

  // Mouse interaction
  const toMouse = mouse3D.clone().sub(s.pos); toMouse.z = 0
  const d = toMouse.length()
  const attractR = 2.5, repelR = 0.8
  if (d < attractR && d > 0.001) {
    if (d < repelR) {
      s.vel.addScaledVector(toMouse.clone().negate().normalize(),
        ((repelR - d) / repelR) * 0.38)
    } else {
      const norm = (d - repelR) / (attractR - repelR)
      s.vel.addScaledVector(toMouse.normalize(), norm * 0.15)
    }
  }

  s.vel.multiplyScalar(0.875)
  s.pos.add(s.vel)
  s.mesh.position.copy(s.pos)

  const spd = s.vel.length()

  // Trigger wobble when speed drops sharply (sticker just "landed")
  if (s.prevSpeed > 0.04 && spd < 0.02) {
    s.wobble    = Math.min(1.0, s.prevSpeed * 6)
    s.wobbleAge = 0
  }
  s.prevSpeed = spd

  // Decay wobble over time
  s.wobbleAge += dt
  const wobbleFade = Math.max(0, s.wobble * Math.exp(-s.wobbleAge * 4.5))

  // Rotation sway
  s.mesh.rotation.z = s.baseRz + s.vel.x * 0.20

  // ── Update shader uniforms ──────────────────────────────────
  const uni = s.mesh.material.uniforms
  uni.uTime.value    = t

  // Bend amount from current speed
  const bendAmt = Math.min(1.0, spd * 8)
  uni.uBend.value    = bendAmt

  // Velocity direction (normalized)
  if (spd > 0.001) {
    uni.uVelDir.value.set(s.vel.x / spd, s.vel.y / spd)
  } else {
    uni.uVelDir.value.set(0, 0)
  }

  uni.uWobble.value  = wobbleFade
}

// ── Renderer init ────────────────────────────────────────────
function init() {
  const cv = canvasRef.value
  const W  = cv.clientWidth  || window.innerWidth
  const H  = cv.clientHeight || window.innerHeight

  renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(W, H, false)
  renderer.setClearColor(0x000000, 0)

  scene  = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, W/H, 0.1, 100)
  camera.position.z = 7

  stickerObjs = STICKERS.map((d, i) => buildSticker(d, i))
}

// ── RAF loop ─────────────────────────────────────────────────
let prevT = 0
function frame() {
  animId = requestAnimationFrame(frame)
  const t  = clock.getElapsedTime()
  const dt = t - prevT; prevT = t

  raycaster.setFromCamera(mouseNDC, camera)
  if (!raycaster.ray.intersectPlane(zPlane, mouse3D)) {
    mouse3D.set(9999, 9999, 0)
  }

  stickerObjs.forEach(s => stepSticker(s, t, dt))
  renderer.render(scene, camera)
}

// ── Events ───────────────────────────────────────────────────
function onMove(e) {
  const cv = canvasRef.value; if (!cv) return
  const rect = cv.getBoundingClientRect()
  mouseNDC.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
  mouseNDC.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
}

function onResize() {
  const cv = canvasRef.value; if (!cv || !renderer) return
  const W = cv.clientWidth, H = cv.clientHeight
  renderer.setSize(W, H, false)
  camera.aspect = W / H
  camera.updateProjectionMatrix()
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
