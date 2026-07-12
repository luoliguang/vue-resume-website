<template>
  <canvas ref="canvasRef" class="hl-canvas" aria-hidden="true" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)

// ── Lucide-style SVG line icons ──────────────────────────────
const _S = `stroke="rgba(232,232,230,0.88)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`
const _W = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ${_S}>`

const SVG_SCISSORS = _W + `<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`
const SVG_CPU      = _W + `<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/></svg>`
const SVG_CODE     = _W + `<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`
const SVG_PACKAGE  = _W + `<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/></svg>`
const SVG_STAR     = _W + `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
const SVG_SHIRT    = _W + `<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>`

const STICKERS = [
  { svg: SVG_SCISSORS, label: '跟单', x: -4.0, y:  1.8, rz:  0.30 },
  { svg: SVG_CPU,      label: 'AI',   x:  3.8, y:  2.0, rz: -0.18 },
  { svg: SVG_CODE,     label: '代码', x:  4.4, y: -0.5, rz:  0.12 },
  { svg: SVG_PACKAGE,  label: '出货', x: -4.3, y: -1.2, rz: -0.22 },
  { svg: SVG_STAR,     label: '品质', x:  1.0, y:  2.6, rz:  0.35 },
  { svg: SVG_SHIRT,    label: '服装', x: -1.4, y: -2.4, rz: -0.14 },
]

const TRAIL_N    = 16
const TRAIL_LIFE = 0.7

// ── Canvas texture (dark glass card + SVG line icon) ─────────
function makeTexture({ svg, label }) {
  const S = 256, cv = document.createElement('canvas')
  cv.width = cv.height = S
  const ctx = cv.getContext('2d')
  const cx = S / 2, cy = S / 2, r = S * 0.44

  function drawBase() {
    ctx.clearRect(0, 0, S, S)
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(14,14,12,0.90)'; ctx.fill()
    const shine = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.38, 0, cx, cy, r * 0.9)
    shine.addColorStop(0, 'rgba(255,255,255,0.08)')
    shine.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = shine; ctx.fill()
    ctx.beginPath(); ctx.arc(cx, cy, r - 0.75, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(232,232,230,0.18)'; ctx.lineWidth = 1.5; ctx.stroke()
    ctx.font = `600 ${Math.floor(S * 0.082)}px "Space Mono",monospace`
    ctx.fillStyle = 'rgba(232,232,230,0.48)'
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

// ── Shaders ──────────────────────────────────────────────────
// Vertex: Z-axis jelly membrane deformation on touch
const VERT = /* glsl */`
  varying vec2 vUv;
  uniform vec2  uContact;
  uniform float uRipple;
  uniform float uRippleStr;
  // Jelly membrane
  uniform vec2  uJellyOrig;
  uniform float uJellyT;
  uniform float uJellyAmp;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // ── UV-plane ripple ring on exit (existing) ────────────
    if (uRippleStr > 0.001) {
      float d = length(pos.xy - uContact);
      if (d < 0.60) {
        vec2  dir  = d > 0.001 ? normalize(pos.xy - uContact) : vec2(0.0);
        float rD   = abs(d / 0.60 - uRipple);
        float ring = exp(-rD * 12.0) * uRippleStr * (1.0 - uRipple);
        pos.xy += dir * ring * 0.45;
      }
    }

    // ── Z-axis jelly membrane (new) ────────────────────────
    // Feels like tapping a soap bubble or rubber drumhead
    if (uJellyAmp > 0.001) {
      float r = length(pos.xy - uJellyOrig);

      // 1. Gaussian press-in at contact origin (quick decay)
      float press = -exp(-r * r * 7.0) * exp(-uJellyT * 5.5) * uJellyAmp;

      // 2. Travelling ring wave propagating outward
      //    phase = r*spatial_freq - t*wave_speed
      float wave  = sin(r * 9.5 - uJellyT * 11.0)
                    * exp(-r * 2.0)            // spatial envelope: decays with distance
                    * exp(-uJellyT * 1.5)      // temporal envelope: decays over time
                    * uJellyAmp;

      pos.z += (press + wave) * 0.22;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

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
  uniform float uFadeIn;

  void main() {
    vec2  uv     = vUv;
    float bright = 1.0;

    // ── Trail: Gaussian splat each history point ──────────
    float trailVal = 0.0;
    for (int i = 0; i < ${TRAIL_N}; i++) {
      if (uTrail[i].z >= 1.0) continue;
      vec2  delta = vUv - uTrail[i].xy;
      float d2    = dot(delta, delta);
      float age   = 1.0 - uTrail[i].z;
      trailVal   += exp(-d2 / 0.0025) * age;
    }
    trailVal = clamp(trailVal, 0.0, 1.0);

    if (trailVal > 0.01) {
      vec2  perp       = vec2(-uWakeDir.y, uWakeDir.x);
      float signedPerp = dot(vUv - uContactUV, perp);
      uv += sign(signedPerp) * perp * trailVal * 0.28;
      bright += trailVal * 1.6;
    }

    // ── UV ripple on exit ─────────────────────────────────
    if (uRippleStr > 0.001) {
      float d   = length(vUv - uContactUV);
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
    vec2  c    = (vUv - 0.5) * 2.0;
    float mask = smoothstep(1.0, 0.78, length(c));
    vec4  col  = texture2D(uMap, uv);
    col.rgb   *= bright;
    col.a     *= mask * uFadeIn;
    gl_FragColor = col;
  }
`

// ── Three.js ─────────────────────────────────────────────────
let renderer, scene, camera, animId
const clock     = new THREE.Clock()
const mouseNDC  = new THREE.Vector2(9999, 9999)
const mouse3D   = new THREE.Vector3()
const raycaster = new THREE.Raycaster()
const zPlane    = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
let stickerObjs = []

let scrollVelY = 0, _lastScrollY = 0, _scrollHandler = null

function buildSticker(data) {
  const trailPts = Array.from({ length: TRAIL_N },
    () => new THREE.Vector3(0.5, 0.5, 1.0))

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
      uFadeIn:     { value: 0.0 },
      // Jelly membrane deformation
      uJellyOrig:  { value: new THREE.Vector2(0, 0) },
      uJellyT:     { value: 0.0 },
      uJellyAmp:   { value: 0.0 },
    },
    vertexShader:   VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite:  false,
    side: THREE.DoubleSide,
  })

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.44, 1.44, 20, 20), mat)
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
    // ── 磁斥力弹簧（位置层面的物理碰撞感）
    repulseX:   0, repulseY:   0,
    repulseVX:  0, repulseVY:  0,
    // ── 弹性膜涟漪（顶点 Z 轴形变）
    jellyT:    0.0,
    jellyAmp:  0.0,
    jellyOX:   0.0,
    jellyOY:   0.0,
    isClose:   false,
    // ── UV 涟漪（exit shader）
    rippling:   false,
    rippleAge:  0,
    rippleAmp:  0,
    // ── Trail
    isHovered:  false,
    trailPts,
    trailHead:  0,
    lastUVx:    0.5,
    lastUVy:    0.5,
    wakeDir:    new THREE.Vector2(1, 0),
    prevUVx:    0.5,
    prevUVy:    0.5,
  }
}

// ── Per-frame ────────────────────────────────────────────────
function step(s, t, dt) {
  // ── 落叶飘动 ─────────────────────────────────────────────
  const swayVx = Math.sin(t * s.swayFreq + s.swayPhase) * s.swayAmp
  s.pos.x += (s.driftX + swayVx) * dt
  // 靠近时轻微减速（被"触碰住"的悬浮感）
  const fallMul = s.isClose ? 0.18 : 1.0
  s.pos.y += (s.driftY * fallMul - scrollVelY * 0.9) * dt
  s.baseRz += s.angularVel * (s.isClose ? 0.06 : 1.0) * dt

  // ── 边界反弹 ─────────────────────────────────────────────
  const X_LIMIT = 5.6, Y_DEAD = -3.9, Y_SPAWN = 4.5
  if (s.pos.y < Y_DEAD) {
    s.pos.y      = Y_SPAWN
    s.pos.x      = (Math.random() - 0.5) * X_LIMIT * 1.8
    s.driftX     = (Math.random() - 0.5) * 0.18
    s.driftY     = -(0.30 + Math.random() * 0.45)
    s.angularVel = (Math.random() - 0.5) * 0.75
    s.swayAmp    = 0.10 + Math.random() * 0.13
    s.swayFreq   = 0.35 + Math.random() * 0.30
    s.swayPhase  = Math.random() * Math.PI * 2
    s.spawnAge   = 0
    s.fadeIn     = true
    s.mesh.scale.setScalar(0.55)
    // 重生时重置磁斥力
    s.repulseX = s.repulseY = s.repulseVX = s.repulseVY = 0
    s.jellyAmp = 0
  }
  if (s.pos.x >  X_LIMIT) { s.pos.x =  X_LIMIT; s.driftX *= -0.6 }
  if (s.pos.x < -X_LIMIT) { s.pos.x = -X_LIMIT; s.driftX *= -0.6 }

  // ── 磁斥力：鼠标靠近时贴片被推开，弹回时有欠阻尼振荡 ────
  // 效果像磁铁同极相斥，松手后橡皮筋拉回
  const REPULSE_R = 1.55
  const ex = mouse3D.x - (s.pos.x + s.repulseX)
  const ey = mouse3D.y - (s.pos.y + s.repulseY)
  const ed  = Math.sqrt(ex * ex + ey * ey)

  if (ed < REPULSE_R && ed > 0.001) {
    const t01  = 1 - ed / REPULSE_R
    const force = t01 * t01 * 5.2          // quadratic: softer at edge, stronger at center
    s.repulseVX -= (ex / ed) * force * dt
    s.repulseVY -= (ey / ed) * force * dt
  }
  // 弹簧拉回（stiffness=82, damping=9 → ratio≈0.50，欠阻尼，约1.5次自然振荡）
  s.repulseVX += (-s.repulseX * 82 - s.repulseVX * 9) * dt
  s.repulseVY += (-s.repulseY * 82 - s.repulseVY * 9) * dt
  s.repulseX  += s.repulseVX * dt
  s.repulseY  += s.repulseVY * dt

  // ── 实际渲染位置 = 落叶路径 + 磁斥力偏移 ────────────────
  const effX = s.pos.x + s.repulseX
  const effY = s.pos.y + s.repulseY
  s.mesh.position.x = effX
  s.mesh.position.y = effY
  s.mesh.position.z = 0
  s.mesh.rotation.z = s.baseRz

  // ── 入场淡入 ─────────────────────────────────────────────
  const u = s.mesh.material.uniforms
  if (s.fadeIn) {
    s.spawnAge += dt
    const p = Math.min(1, s.spawnAge / 0.55)
    u.uFadeIn.value = p
    s.mesh.scale.setScalar(0.55 + (1 - Math.pow(1 - p, 2)) * 0.45)
    if (p >= 1) { s.fadeIn = false; s.mesh.scale.setScalar(1) }
  }

  // ── 鼠标与实际渲染位置的距离（用于 hover 判断）──────────
  const dx = mouse3D.x - effX
  const dy = mouse3D.y - effY
  const dist = Math.sqrt(dx * dx + dy * dy)

  // 本地坐标（旋转到贴片坐标系）
  const cosR = Math.cos(-s.baseRz)
  const sinR = Math.sin(-s.baseRz)
  const lx = dx * cosR - dy * sinR
  const ly = dx * sinR + dy * cosR
  const uvx =  lx / 1.44 + 0.5
  const uvy =  ly / 1.44 + 0.5

  // ── 弹性膜触发（带滞后 hysteresis 避免抖动）────────────
  const ENTER_R = 0.80, EXIT_R = 1.05
  const nowClose = s.isClose ? dist < EXIT_R : dist < ENTER_R

  if (!s.isClose && nowClose) {
    // 进入：强 jelly 冲击（指尖按压鼓面）
    s.jellyT   = 0
    s.jellyAmp = 1.0
    s.jellyOX  = lx
    s.jellyOY  = ly
  }
  if (s.isClose && !nowClose) {
    // 离开：较弱 jelly（手指离开鼓面的回弹）
    s.jellyT   = 0
    s.jellyAmp = 0.58
    s.jellyOX  = lx
    s.jellyOY  = ly
    // UV 涟漪保持
    s.rippling  = true
    s.rippleAge = 0
    s.rippleAmp = 0.85
  }
  s.isClose   = nowClose
  s.isHovered = nowClose   // trail 复用

  // ── Jelly 时间推进（超过 2.4s 自动停止）─────────────────
  if (s.jellyAmp > 0.001) {
    s.jellyT += dt
    if (s.jellyT > 2.4) s.jellyAmp = 0
  }

  // ── UV 涟漪时间推进 ───────────────────────────────────────
  if (s.rippling) {
    s.rippleAge += dt * 2.8
    if (s.rippleAge >= 1.0) { s.rippling = false; s.rippleAge = 0 }
  }

  // ── Trail history ─────────────────────────────────────────
  for (let i = 0; i < TRAIL_N; i++) {
    const p = s.trailPts[i]
    if (p.z < 1.0) p.z = Math.min(1.0, p.z + dt / TRAIL_LIFE)
  }
  if (s.isHovered) {
    const movDx = uvx - s.lastUVx
    const movDy = uvy - s.lastUVy
    const moved = Math.sqrt(movDx * movDx + movDy * movDy)
    if (moved > 0.012) {
      s.trailPts[s.trailHead].set(uvx, uvy, 0.0)
      s.trailHead = (s.trailHead + 1) % TRAIL_N
      s.lastUVx = uvx
      s.lastUVy = uvy
      const wdx = uvx - s.prevUVx
      const wdy = uvy - s.prevUVy
      const wlen = Math.sqrt(wdx * wdx + wdy * wdy)
      if (wlen > 0.001) s.wakeDir.set(wdx / wlen, wdy / wlen)
    }
    s.prevUVx = uvx
    s.prevUVy = uvy
  }

  // ── Uniforms 上传 ─────────────────────────────────────────
  u.uTime.value          = t
  u.uContact.value.set(lx, ly)
  u.uContactUV.value.set(uvx, uvy)
  u.uRipple.value        = s.rippleAge
  u.uRippleStr.value     = s.rippling ? s.rippleAmp * (1 - s.rippleAge) : 0
  u.uWakeDir.value.copy(s.wakeDir)
  u.uJellyOrig.value.set(s.jellyOX, s.jellyOY)
  u.uJellyT.value        = s.jellyT
  u.uJellyAmp.value      = s.jellyAmp
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
  camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
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
  const r = cv.getBoundingClientRect()
  mouseNDC.x =  ((e.clientX - r.left) / r.width)  * 2 - 1
  mouseNDC.y = -((e.clientY - r.top)  / r.height) * 2 + 1
}
function onResize() {
  const cv = canvasRef.value; if (!cv || !renderer) return
  const W = cv.clientWidth, H = cv.clientHeight
  renderer.setSize(W, H, false)
  camera.aspect = W / H; camera.updateProjectionMatrix()
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
