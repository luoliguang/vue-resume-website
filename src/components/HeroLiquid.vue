<template>
  <canvas ref="canvasRef" class="hl-canvas" aria-hidden="true" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)

const STICKERS = [
  { emoji: '✂️', label: '跟单', color: '#c0392b', x: -4.0, y:  1.8, rz:  0.30 },
  { emoji: '🤖', label: 'AI',   color: '#1565c0', x:  3.8, y:  2.0, rz: -0.18 },
  { emoji: '💻', label: '代码', color: '#1b5e20', x:  4.4, y: -0.5, rz:  0.12 },
  { emoji: '📦', label: '出货', color: '#e65100', x: -4.3, y: -1.2, rz: -0.22 },
  { emoji: '⭐', label: '品质', color: '#4527a0', x:  1.0, y:  2.6, rz:  0.35 },
  { emoji: '🧵', label: '服装', color: '#880e4f', x: -1.4, y: -2.4, rz: -0.14 },
]

// ── Canvas texture ───────────────────────────────────────────
function hexShift(hex, amt) {
  const h = hex.replace('#','')
  const c = [0,2,4].map(i => Math.max(0,Math.min(255, parseInt(h.slice(i,i+2),16)+amt)))
  return `rgb(${c[0]},${c[1]},${c[2]})`
}
function makeTexture({ emoji, label, color }) {
  const S = 256, cv = document.createElement('canvas')
  cv.width = cv.height = S
  const ctx = cv.getContext('2d')
  const cx = S/2, cy = S/2, r = S*0.46
  const g = ctx.createRadialGradient(cx-r*.3,cy-r*.3,r*.04, cx,cy, r)
  g.addColorStop(0, hexShift(color, 65))
  g.addColorStop(0.5, color)
  g.addColorStop(1, hexShift(color, -50))
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2)
  ctx.fillStyle = g; ctx.fill()
  const sh = ctx.createRadialGradient(cx-r*.25,cy-r*.42,0, cx-r*.1,cy-r*.28,r*.5)
  sh.addColorStop(0,'rgba(255,255,255,0.58)')
  sh.addColorStop(1,'rgba(255,255,255,0)')
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2)
  ctx.fillStyle = sh; ctx.fill()
  ctx.font = `${Math.floor(S*.40)}px serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(emoji, cx, cy - S*.04)
  ctx.font = `700 ${Math.floor(S*.09)}px monospace`
  ctx.fillStyle = 'rgba(255,255,255,0.88)'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(label, cx, cy + r*.76)
  return new THREE.CanvasTexture(cv)
}

// ── Shaders ──────────────────────────────────────────────────
// Vertex: mesh surface deforms outward from contact point
const VERT = /* glsl */`
  varying vec2 vUv;
  uniform vec2  uContact;   // contact point in local mesh space (metres, ±0.72)
  uniform float uPush;      // 0–1  push strength (hover)
  uniform float uRipple;    // 0–1  ripple phase (mouse exit, 0=start 1=done)
  uniform float uRippleStr; // amplitude of the exit ripple

  void main() {
    vUv = uv;
    vec3 pos = position;

    vec2  toContact = pos.xy - uContact;
    float d         = length(toContact);
    float influence = 0.58;   // world-space influence radius

    if (d < influence) {
      vec2 pushDir  = d > 0.001 ? normalize(toContact) : vec2(0.0);
      float falloff = smoothstep(influence, 0.0, d);

      // Steady push while mouse is over (dents inward under finger)
      pos.xy -= pushDir * falloff * falloff * uPush * 0.42;

      // Ripple ring expanding outward on mouse exit
      if (uRippleStr > 0.001) {
        float ringD   = abs(d / influence - uRipple);
        float ring    = exp(-ringD * 14.0) * uRippleStr * (1.0 - uRipple);
        pos.xy += pushDir * ring * 0.52;
      }
    }

    // Gentle idle breath on z (barely visible, keeps it "alive")
    // handled in fragment for performance

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Fragment: UV warp under contact + ripple + edge alpha
const FRAG = /* glsl */`
  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform vec2  uContactUV;  // contact point remapped to UV (0–1)
  uniform float uPush;
  uniform float uRipple;
  uniform float uRippleStr;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;

    vec2  toContact = uv - uContactUV;
    float d         = length(toContact);
    float influence = 0.40;

    if (d < influence) {
      vec2  dir     = d > 0.001 ? normalize(toContact) : vec2(0.0);
      float falloff = smoothstep(influence, 0.0, d);

      // UV push: texture "flows" away from finger
      uv -= dir * falloff * falloff * uPush * 0.32;

      // UV ripple ring
      if (uRippleStr > 0.001) {
        float ringD = abs(d / influence - uRipple);
        float ring  = exp(-ringD * 14.0) * uRippleStr * (1.0 - uRipple);
        uv += dir * ring * 0.38;
      }
    }

    // Subtle always-on surface shimmer (liquid at rest)
    float shimmer = sin(vUv.x * 9.0 + uTime * 1.4) * sin(vUv.y * 7.0 + uTime * 1.1);
    uv += shimmer * 0.004;

    uv = clamp(uv, 0.01, 0.99);

    // Circular alpha mask
    vec2  center  = (vUv - 0.5) * 2.0;
    float edgeMask = smoothstep(1.0, 0.78, length(center));

    vec4 col = texture2D(uMap, uv);
    col.a   *= edgeMask;
    gl_FragColor = col;
  }
`

// ── Three.js ─────────────────────────────────────────────────
let renderer, scene, camera, animId
const clock    = new THREE.Clock()
const mouseNDC = new THREE.Vector2(9999, 9999)
const mouse3D  = new THREE.Vector3()
const raycaster = new THREE.Raycaster()
const zPlane    = new THREE.Plane(new THREE.Vector3(0,0,1), 0)
let stickerObjs = []

function buildSticker(data, idx) {
  const tex = makeTexture(data)
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uMap:        { value: tex },
      uContact:    { value: new THREE.Vector2(0,0) },
      uContactUV:  { value: new THREE.Vector2(0.5,0.5) },
      uPush:       { value: 0 },
      uRipple:     { value: 0 },
      uRippleStr:  { value: 0 },
      uTime:       { value: 0 },
    },
    vertexShader:   VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite:  false,
    side: THREE.DoubleSide,
  })
  // More subdivisions = smoother deformation
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.44,1.44,20,20), mat)
  mesh.rotation.z = data.rz
  const home = new THREE.Vector3(data.x, data.y, 0)
  mesh.position.copy(home)
  scene.add(mesh)

  return {
    mesh, home,
    pos:        home.clone(),
    vel:        new THREE.Vector3(),
    baseRz:     data.rz,
    phase:      idx * 1.13 + Math.random() * 0.5,
    // hover state
    isHovered:  false,
    pushStr:    0,       // smooth 0→1
    // ripple state
    rippling:   false,
    rippleAge:  0,
    rippleAmp:  0,
  }
}

// ── Per-frame step ───────────────────────────────────────────
function step(s, t, dt) {
  // ── Very gentle idle float (stays mostly in place) ──
  const floatTarget = s.home.clone()
  floatTarget.y += Math.sin(t * 0.7 + s.phase) * 0.06
  floatTarget.x += Math.cos(t * 0.5 + s.phase) * 0.03

  // Very soft spring — sticker barely moves; effect is on surface, not position
  s.vel.addScaledVector(floatTarget.clone().sub(s.pos), 0.018)
  s.vel.multiplyScalar(0.92)
  s.pos.add(s.vel)
  s.mesh.position.copy(s.pos)
  s.mesh.rotation.z = s.baseRz + s.vel.x * 0.08

  // ── Hover detection ──────────────────────────────────
  const dx   = mouse3D.x - s.pos.x
  const dy   = mouse3D.y - s.pos.y
  const dist = Math.sqrt(dx*dx + dy*dy)
  const nowHovered = dist < 0.78

  if (!s.isHovered && nowHovered) {
    // Mouse enters sticker
    s.isHovered = true
    s.rippling  = false
  }
  if (s.isHovered && !nowHovered) {
    // Mouse leaves → trigger ripple
    s.isHovered = false
    s.rippling  = true
    s.rippleAge = 0
    s.rippleAmp = Math.max(0.4, s.pushStr)
  }

  // Smooth push strength: lerps to 1 while hovered, 0 when not
  s.pushStr += ((s.isHovered ? 1 : 0) - s.pushStr) * (s.isHovered ? 0.10 : 0.06)

  // Advance ripple
  if (s.rippling) {
    s.rippleAge += dt * 2.8
    if (s.rippleAge >= 1.0) { s.rippling = false; s.rippleAge = 0 }
  }

  // ── Contact point ─────────────────────────────────────
  // Mouse in local mesh space (±0.72)
  const lx = dx   // same axis — mesh is at world position s.pos
  const ly = dy
  // Remap to UV (0–1): local ±0.72 → UV 0.5 ± 0.5
  const uvx = -lx / 1.44 + 0.5   // flip x so push feels natural
  const uvy =  ly / 1.44 + 0.5

  // ── Update uniforms ───────────────────────────────────
  const u = s.mesh.material.uniforms
  u.uTime.value       = t
  u.uContact.value.set(lx, ly)
  u.uContactUV.value.set(uvx, uvy)
  u.uPush.value       = s.pushStr
  u.uRipple.value     = s.rippleAge
  u.uRippleStr.value  = s.rippling ? s.rippleAmp * Math.max(0, 1 - s.rippleAge) : 0
}

// ── Init / loop ───────────────────────────────────────────────
function init() {
  const cv = canvasRef.value
  const W  = cv.clientWidth  || window.innerWidth
  const H  = cv.clientHeight || window.innerHeight
  renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(W, H, false)
  renderer.setClearColor(0,0)
  scene  = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, W/H, 0.1, 100)
  camera.position.z = 7
  stickerObjs = STICKERS.map((d, i) => buildSticker(d, i))
}

let prevT = 0
function frame() {
  animId = requestAnimationFrame(frame)
  const t  = clock.getElapsedTime()
  const dt = Math.min(t - prevT, 0.05)
  prevT = t

  raycaster.setFromCamera(mouseNDC, camera)
  if (!raycaster.ray.intersectPlane(zPlane, mouse3D))
    mouse3D.set(9999, 9999, 0)

  stickerObjs.forEach(s => step(s, t, dt))
  renderer.render(scene, camera)
}

function onMove(e) {
  const cv = canvasRef.value; if (!cv) return
  const r = cv.getBoundingClientRect()
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
