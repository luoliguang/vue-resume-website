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
  { emoji: '⭐', label: '品质', color: '#4527a0', x:  1.0, y:  3.0, rz:  0.35 },
  { emoji: '🧵', label: '服装', color: '#880e4f', x: -1.4, y: -2.8, rz: -0.14 },
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

// ── Draw sticker to canvas, return Three.js texture ─────────
function makeTexture({ emoji, label, color }) {
  const S = 256
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const ctx = cv.getContext('2d')
  const cx = S / 2, cy = S / 2, r = S * 0.44

  // Base circle with radial gradient (fake 3D top-left light)
  const g = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.28, r * 0.04, cx, cy, r)
  g.addColorStop(0,    shift(color,  60))
  g.addColorStop(0.55, color)
  g.addColorStop(1,    shift(color, -40))
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = g
  ctx.fill()

  // Specular highlight (top-left crescent)
  const sh = ctx.createRadialGradient(cx - r * 0.22, cy - r * 0.40, 0, cx - r * 0.08, cy - r * 0.25, r * 0.52)
  sh.addColorStop(0, 'rgba(255,255,255,0.52)')
  sh.addColorStop(1, 'rgba(255,255,255,0.00)')
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = sh
  ctx.fill()

  // Emoji
  ctx.font = `${Math.floor(S * 0.40)}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(emoji, cx, cy - S * 0.05)

  // Label
  ctx.font = `700 ${Math.floor(S * 0.095)}px monospace`
  ctx.fillStyle = 'rgba(255,255,255,0.90)'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(label, cx, cy + r * 0.74)

  return new THREE.CanvasTexture(cv)
}

// ── Three.js state ───────────────────────────────────────────
let renderer, scene, camera, animId
const clock     = new THREE.Clock()
const mouseNDC  = new THREE.Vector2(9999, 9999)
const mouse3D   = new THREE.Vector3()
const raycaster = new THREE.Raycaster()
const zPlane    = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
let stickerObjs = []

// ── Build sticker mesh + physics state ──────────────────────
function buildSticker(data, idx) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.45, 1.45),
    new THREE.MeshBasicMaterial({
      map: makeTexture(data),
      transparent: true,
      depthWrite: false,
    })
  )
  mesh.rotation.z = data.rz
  const home = new THREE.Vector3(data.x, data.y, 0)
  mesh.position.copy(home)
  scene.add(mesh)

  return {
    mesh,
    home,
    pos:    home.clone(),
    vel:    new THREE.Vector3(),
    baseRz: data.rz,
    phase:  idx * 1.07 + Math.random() * 0.4,
  }
}

// ── Spring + mouse physics ───────────────────────────────────
function stepSticker(s, t) {
  // Gentle idle float (sine wave on Y)
  const floatTarget = s.home.clone()
  floatTarget.y += Math.sin(t * 0.75 + s.phase) * 0.07

  // Spring toward float target
  s.vel.addScaledVector(floatTarget.clone().sub(s.pos), 0.055)

  // Mouse interaction: attract in range, repel when very close
  const toMouse = mouse3D.clone().sub(s.pos)
  toMouse.z = 0
  const d = toMouse.length()
  const attractR = 2.4
  const repelR   = 0.75
  if (d < attractR && d > 0.001) {
    if (d < repelR) {
      // Too close → push away
      s.vel.addScaledVector(toMouse.clone().negate().normalize(),
        ((repelR - d) / repelR) * 0.35)
    } else {
      // In range → pull toward cursor
      const norm = (d - repelR) / (attractR - repelR) // 0→1
      s.vel.addScaledVector(toMouse.normalize(), norm * 0.16)
    }
  }

  // Damping
  s.vel.multiplyScalar(0.875)
  s.pos.add(s.vel)
  s.mesh.position.copy(s.pos)

  // Squash & Stretch from velocity (volume-preserving)
  const spd = s.vel.length()
  const sx  = 1 + spd * 0.32
  const sy  = Math.max(0.55, 1 / sx)
  s.mesh.scale.set(sx, sy, 1)

  // Rotation sway with velocity
  s.mesh.rotation.z = s.baseRz + s.vel.x * 0.18
}

// ── Init ─────────────────────────────────────────────────────
function init() {
  const cv = canvasRef.value
  const W  = cv.clientWidth  || window.innerWidth
  const H  = cv.clientHeight || window.innerHeight

  renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(W, H, false)
  renderer.setClearColor(0x000000, 0)

  scene  = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  camera.position.z = 7

  stickerObjs = STICKERS.map((d, i) => buildSticker(d, i))
}

// ── RAF loop ─────────────────────────────────────────────────
function frame() {
  animId = requestAnimationFrame(frame)
  const t = clock.getElapsedTime()

  // Unproject mouse NDC → world z=0
  raycaster.setFromCamera(mouseNDC, camera)
  if (!raycaster.ray.intersectPlane(zPlane, mouse3D)) {
    mouse3D.set(9999, 9999, 0)
  }

  stickerObjs.forEach(s => stepSticker(s, t))
  renderer.render(scene, camera)
}

// ── Events ───────────────────────────────────────────────────
function onMove(e) {
  const cv = canvasRef.value
  if (!cv) return
  const rect = cv.getBoundingClientRect()
  mouseNDC.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
  mouseNDC.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
}

function onResize() {
  const cv = canvasRef.value
  if (!cv || !renderer) return
  const W = cv.clientWidth
  const H = cv.clientHeight
  renderer.setSize(W, H, false)
  camera.aspect = W / H
  camera.updateProjectionMatrix()
}

onMounted(() => {
  // Wait one frame for layout to stabilise
  requestAnimationFrame(() => {
    init()
    frame()
  })
  window.addEventListener('mousemove', onMove)
  window.addEventListener('resize',    onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  renderer?.dispose()
  stickerObjs.forEach(s => {
    s.mesh.geometry.dispose()
    s.mesh.material.map?.dispose()
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
