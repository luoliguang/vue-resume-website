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

const TRAIL_N = 16   // trail history length
const TRAIL_LIFE = 0.7  // seconds before a point fades out

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
const VERT = /* glsl */`
  varying vec2 vUv;
  uniform float uRipple;
  uniform float uRippleStr;
  uniform vec2  uContact;

  void main() {
    vUv = uv;
    vec3 pos = position;
    // Only ripple on exit — no other vertex deformation
    if (uRippleStr > 0.001) {
      float d    = length(pos.xy - uContact);
      float infl = 0.60;
      if (d < infl) {
        vec2  dir  = d > 0.001 ? normalize(pos.xy - uContact) : vec2(0.0);
        float rD   = abs(d / infl - uRipple);
        float ring = exp(-rD * 12.0) * uRippleStr * (1.0 - uRipple);
        pos.xy += dir * ring * 0.45;
      }
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Trail stored as TRAIL_N points: xy=UV coords, z=age (0=fresh → 1=dead)
const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform float uRipple;
  uniform float uRippleStr;
  uniform vec2  uContactUV;
  uniform vec3  uTrail[${TRAIL_N}];
  uniform vec2  uWakeDir;
  uniform float uTime;

  void main() {
    vec2  uv     = vUv;
    float bright = 1.0;

    // ── Trail: Gaussian splat each history point ──────────
    float trailVal = 0.0;
    for (int i = 0; i < ${TRAIL_N}; i++) {
      if (uTrail[i].z >= 1.0) continue;
      vec2  delta = vUv - uTrail[i].xy;
      float d2    = dot(delta, delta);
      float age   = 1.0 - uTrail[i].z;          // 1=fresh 0=faded
      trailVal   += exp(-d2 / 0.0025) * age;     // crisp gaussian per point
    }
    trailVal = clamp(trailVal, 0.0, 1.0);

    if (trailVal > 0.01) {
      // Perpendicular to wake direction = the two sides of the groove
      vec2  perp       = vec2(-uWakeDir.y, uWakeDir.x);
      float signedPerp = dot(vUv - uContactUV, perp);

      // Part UVs outward from the trail (texture pushed apart)
      uv += sign(signedPerp) * perp * trailVal * 0.28;

      // Strong bright highlight — this is the visible line
      bright += trailVal * 1.6;
    }

    // ── Ripple on exit ────────────────────────────────────
    if (uRippleStr > 0.001) {
      float d    = length(vUv - uContactUV);
      float infl = 0.44;
      if (d < infl) {
        vec2  dir  = d > 0.001 ? normalize(vUv - uContactUV) : vec2(0.0);
        float rD   = abs(d / infl - uRipple);
        float ring = exp(-rD * 14.0) * uRippleStr * (1.0 - uRipple);
        uv += dir * ring * 0.35;
      }
    }

    // Surface shimmer
    uv += sin(vUv.x * 9.0 + uTime * 1.4) * sin(vUv.y * 7.0 + uTime * 1.1) * 0.004;

    uv = clamp(uv, 0.01, 0.99);
    vec2  c      = (vUv - 0.5) * 2.0;
    float mask   = smoothstep(1.0, 0.78, length(c));
    vec4  col    = texture2D(uMap, uv);
    col.rgb     *= bright;
    col.a       *= mask;
    gl_FragColor  = col;
  }
`

// ── Three.js ─────────────────────────────────────────────────
let renderer, scene, camera, animId
const clock     = new THREE.Clock()
const mouseNDC  = new THREE.Vector2(9999, 9999)
const mouse3D   = new THREE.Vector3()
const raycaster = new THREE.Raycaster()
const zPlane    = new THREE.Plane(new THREE.Vector3(0,0,1), 0)
let stickerObjs = []

function buildSticker(data) {
  // Pre-create trail array as THREE.Vector3 so Three.js can upload as vec3[]
  const trailPts = Array.from({ length: TRAIL_N },
    () => new THREE.Vector3(0.5, 0.5, 1.0))  // z=1 means dead/invisible

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uMap:        { value: makeTexture(data) },
      uContact:    { value: new THREE.Vector2(0, 0) },
      uContactUV:  { value: new THREE.Vector2(0.5, 0.5) },
      uRipple:     { value: 0 },
      uRippleStr:  { value: 0 },
      uWakeDir:    { value: new THREE.Vector2(1, 0) },
      uTrail:      { value: trailPts },
      uTime:       { value: 0 },
    },
    vertexShader:   VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite:  false,
    side: THREE.DoubleSide,
  })

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.44, 1.44, 16, 16), mat)
  mesh.rotation.z = data.rz
  mesh.position.set(data.x, data.y, 0)
  scene.add(mesh)

  return {
    mesh,
    pos:         new THREE.Vector3(data.x, data.y, 0),
    baseRz:      data.rz,
    driftX:      (Math.random() - 0.5) * 0.35,
    driftY:      -(0.35 + Math.random() * 0.55),
    angularVel:  (Math.random() - 0.5) * 1.1,
    // hover
    isHovered:   false,
    rippling:    false,
    rippleAge:   0,
    rippleAmp:   0,
    // trail history
    trailPts,          // reference to the same array in uniforms
    trailHead:   0,
    lastUVx:     0.5,
    lastUVy:     0.5,
    wakeDir:     new THREE.Vector2(1, 0),
    prevUVx:     0.5,
    prevUVy:     0.5,
  }
}

// ── Per-frame ────────────────────────────────────────────────
function step(s, t, dt) {
  // Fall & tumble
  s.pos.x  += s.driftX     * dt
  s.pos.y  += s.driftY     * dt
  s.baseRz += s.angularVel * dt

  const X_LIMIT = 5.6, Y_DEAD = -3.9, Y_SPAWN = 4.1
  if (s.pos.y < Y_DEAD) {
    s.pos.y    = Y_SPAWN
    s.pos.x    = (Math.random() - 0.5) * X_LIMIT * 1.8
    s.driftX   = (Math.random() - 0.5) * 0.35
    s.driftY   = -(0.35 + Math.random() * 0.55)
    s.angularVel = (Math.random() - 0.5) * 1.1
  }
  if (s.pos.x >  X_LIMIT) { s.pos.x =  X_LIMIT; s.driftX *= -0.7 }
  if (s.pos.x < -X_LIMIT) { s.pos.x = -X_LIMIT; s.driftX *= -0.7 }
  s.mesh.position.copy(s.pos)
  s.mesh.rotation.z = s.baseRz

  // Contact point in local mesh space (rotate into sticker frame)
  const dx  = mouse3D.x - s.pos.x
  const dy  = mouse3D.y - s.pos.y
  const cosR = Math.cos(-s.baseRz)
  const sinR = Math.sin(-s.baseRz)
  const lx  =  dx * cosR - dy * sinR   // local x
  const ly  =  dx * sinR + dy * cosR   // local y
  const uvx =  lx / 1.44 + 0.5        // u: left=0, right=1
  const uvy =  ly / 1.44 + 0.5        // v: bottom=0, top=1

  // Hover detection
  const dist = Math.sqrt(dx*dx + dy*dy)
  const nowHovered = dist < 0.78

  if (!s.isHovered && nowHovered)  { s.isHovered = true;  s.rippling = false }
  if ( s.isHovered && !nowHovered) {
    s.isHovered = false
    s.rippling  = true
    s.rippleAge = 0
    s.rippleAmp = 0.85
  }

  if (s.rippling) {
    s.rippleAge += dt * 2.8
    if (s.rippleAge >= 1.0) { s.rippling = false; s.rippleAge = 0 }
  }

  // ── Trail history ─────────────────────────────────────
  // Age existing points
  for (let i = 0; i < TRAIL_N; i++) {
    const p = s.trailPts[i]
    if (p.z < 1.0) p.z = Math.min(1.0, p.z + dt / TRAIL_LIFE)
  }

  if (s.isHovered) {
    // Add new point when mouse moved enough distance in UV space
    const movDx = uvx - s.lastUVx
    const movDy = uvy - s.lastUVy
    const moved = Math.sqrt(movDx*movDx + movDy*movDy)

    if (moved > 0.012) {
      s.trailPts[s.trailHead].set(uvx, uvy, 0.0)
      s.trailHead = (s.trailHead + 1) % TRAIL_N
      s.lastUVx = uvx
      s.lastUVy = uvy

      // Update wake direction from actual movement
      const wdx = uvx - s.prevUVx
      const wdy = uvy - s.prevUVy
      const wlen = Math.sqrt(wdx*wdx + wdy*wdy)
      if (wlen > 0.001) s.wakeDir.set(wdx/wlen, wdy/wlen)
    }
    s.prevUVx = uvx
    s.prevUVy = uvy
  }

  // ── Uniforms ──────────────────────────────────────────
  const u = s.mesh.material.uniforms
  u.uTime.value      = t
  u.uContact.value.set(lx, ly)  // local space, matches pos.xy in vertex shader
  u.uContactUV.value.set(uvx, uvy)
  u.uRipple.value    = s.rippleAge
  u.uRippleStr.value = s.rippling ? s.rippleAmp * (1 - s.rippleAge) : 0
  u.uWakeDir.value.copy(s.wakeDir)
  // uTrail.value already points at trailPts — Three.js re-uploads each frame
}

// ── Init / loop ───────────────────────────────────────────────
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
}

let prevT = 0
function frame() {
  animId = requestAnimationFrame(frame)
  const t  = clock.getElapsedTime()
  const dt = Math.min(t - prevT, 0.05)
  prevT = t
  raycaster.setFromCamera(mouseNDC, camera)
  if (!raycaster.ray.intersectPlane(zPlane, mouse3D)) mouse3D.set(9999, 9999, 0)
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
