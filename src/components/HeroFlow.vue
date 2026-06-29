<template>
  <div class="hf">
    <!-- hidden video source -->
    <video ref="vid" class="hf-vid" autoplay playsinline muted />
    <!-- WebGL canvas -->
    <canvas ref="cvs" class="hf-canvas" aria-hidden="true" />

    <!-- Permission prompt -->
    <Transition name="hf-fade">
      <button v-if="status === 'idle'" class="hf-start magnetic" @click="initCam">
        <span class="hf-start-ring" />
        <span class="hf-start-dot" />
        <span class="hf-start-lbl ui-label">
          {{ isChinese ? '开启运动追踪' : 'Motion Tracking' }}
        </span>
      </button>
    </Transition>

    <Transition name="hf-fade">
      <p v-if="status === 'denied'" class="hf-msg ui-label">
        {{ isChinese ? '请允许摄像头权限以体验效果' : 'Allow camera access to enable the effect' }}
      </p>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { isChinese } from '../composables/useI18n.js'

const vid = ref(null)
const cvs = ref(null)
const status = ref('idle')  // idle | requesting | running | denied

// Flow computation resolution (independent of canvas size for performance)
const FW = 320, FH = 180

// ── Shader strings ───────────────────────────────────────────
const VS = /* glsl */`
  attribute vec2 aPos;
  varying vec2 vUV;
  void main() {
    vUV = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`

// Pass-through shader (copies a texture to screen)
const COPY_FS = /* glsl */`
  precision highp float;
  uniform sampler2D uTex;
  varying vec2 vUV;
  void main() { gl_FragColor = texture2D(uTex, vUV); }
`

// Optical flow: compare curr/prev frame, compute motion vector per pixel
// Based on Horn-Schunck simplified (brightness constancy + spatial gradient)
const FLOW_FS = /* glsl */`
  precision highp float;
  uniform sampler2D uCurr, uPrev;
  uniform vec2 uPx;
  uniform float uForce, uLambda;
  varying vec2 vUV;

  float luma(vec4 c) { return dot(c.rgb, vec3(0.299, 0.587, 0.114)); }

  void main() {
    // Temporal difference
    float ic = luma(texture2D(uCurr, vUV));
    float ip = luma(texture2D(uPrev, vUV));
    float diff = ic - ip;

    // Spatial gradient (central difference, 2-pixel offset for stability)
    vec2 o = uPx * 2.0;
    float gx = luma(texture2D(uCurr, vUV + vec2(o.x, 0.0)))
             - luma(texture2D(uCurr, vUV - vec2(o.x, 0.0)));
    float gy = luma(texture2D(uCurr, vUV + vec2(0.0, o.y)))
             - luma(texture2D(uCurr, vUV - vec2(0.0, o.y)));

    // Flow vector (Horn-Schunck constant brightness assumption)
    float denom = gx * gx + gy * gy + uLambda;
    float k = -uForce * diff / denom;

    // Encode: 0.5 = zero flow, >0.5 positive, <0.5 negative
    gl_FragColor = vec4(k * gx * 0.5 + 0.5, k * gy * 0.5 + 0.5, 0.0, 1.0);
  }
`

// Display: flow vectors → HSV color, with temporal trail decay (ping-pong)
const DISPLAY_FS = /* glsl */`
  precision highp float;
  uniform sampler2D uFlow, uPrevDisplay;
  uniform float uDecay, uScale, uThresh;
  varying vec2 vUV;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec2 f = (texture2D(uFlow, vUV).rg - 0.5) * 2.0;
    float mag = length(f);

    vec3 col = vec3(0.0);
    if (mag > uThresh) {
      float hue = atan(f.y, f.x) / 6.2832 + 0.5;
      float val = min(1.0, (mag - uThresh) * uScale);
      col = hsv2rgb(vec3(hue, 0.95, val));
    }

    // Temporal trail: blend new color with decayed previous frame
    vec3 prev = texture2D(uPrevDisplay, vUV).rgb * uDecay;
    gl_FragColor = vec4(max(col, prev), 1.0);
  }
`

// ── WebGL state ──────────────────────────────────────────────
let gl = null, animId = null
let offCvs = null, offCtx = null
let quadBuf = null
let flowProg = null, displayProg = null, copyProg = null
let currTex = null, prevTex = null, flowTex = null
let displayTex = []
let flowFBO = null, displayFBOs = []
let ping = 0
let W = 0, H = 0

// ── GL helpers ───────────────────────────────────────────────
function shader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s))
  return s
}

function program(gl, vs, fs) {
  const p = gl.createProgram()
  gl.attachShader(p, shader(gl, gl.VERTEX_SHADER, vs))
  gl.attachShader(p, shader(gl, gl.FRAGMENT_SHADER, fs))
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(p))
  return p
}

function makeTex(w, h, linear = true) {
  const t = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, t)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  const filter = linear ? gl.LINEAR : gl.NEAREST
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return t
}

function makeFBO(tex) {
  const fbo = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return fbo
}

function bindTex(unit, tex, prog, name) {
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.uniform1i(gl.getUniformLocation(prog, name), unit)
}

// Bind program + vertex attrib (no draw yet)
function useProg(prog) {
  gl.useProgram(prog)
  const loc = gl.getAttribLocation(prog, 'aPos')
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf)
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
}

function draw() {
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

// ── Webcam init ──────────────────────────────────────────────
async function initCam() {
  status.value = 'requesting'
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 360 }, facingMode: 'user' }
    })
    vid.value.srcObject = stream
    await new Promise(r => { vid.value.onloadedmetadata = r })
    await vid.value.play()
    initGL()
    status.value = 'running'
    tick()
  } catch (e) {
    console.warn('[HeroFlow] Camera error:', e)
    status.value = 'denied'
  }
}

function initGL() {
  const canvas = cvs.value
  W = canvas.clientWidth || window.innerWidth
  H = canvas.clientHeight || window.innerHeight
  canvas.width = W
  canvas.height = H

  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  if (!gl) { console.warn('[HeroFlow] WebGL not supported'); return }

  // Enable flip so canvas 2D → WebGL texture is right-side-up
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)

  // Offscreen canvas for video downsampling + mirroring
  offCvs = document.createElement('canvas')
  offCvs.width  = FW
  offCvs.height = FH
  offCtx = offCvs.getContext('2d')

  // Compile programs
  flowProg    = program(gl, VS, FLOW_FS)
  displayProg = program(gl, VS, DISPLAY_FS)
  copyProg    = program(gl, VS, COPY_FS)

  // Fullscreen quad buffer
  quadBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

  // Textures
  currTex    = makeTex(FW, FH)
  prevTex    = makeTex(FW, FH)
  flowTex    = makeTex(FW, FH, true)          // linear → smooth upscale
  displayTex = [makeTex(W, H), makeTex(W, H)] // display ping-pong

  // FBOs
  flowFBO     = makeFBO(flowTex)
  displayFBOs = [makeFBO(displayTex[0]), makeFBO(displayTex[1])]

  ping = 0

  // Blend: premultiplied alpha off
  gl.disable(gl.BLEND)
}

// ── Per-frame logic ──────────────────────────────────────────
function tick() {
  animId = requestAnimationFrame(tick)
  if (!gl || vid.value.readyState < 2) return

  // 1. Copy video frame to offscreen canvas (mirrored)
  offCtx.save()
  offCtx.scale(-1, 1)
  offCtx.drawImage(vid.value, -FW, 0, FW, FH)
  offCtx.restore()

  // 2. Upload curr frame to currTex
  gl.bindTexture(gl.TEXTURE_2D, currTex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offCvs)

  // 3. Compute optical flow: (currTex, prevTex) → flowFBO
  gl.bindFramebuffer(gl.FRAMEBUFFER, flowFBO)
  gl.viewport(0, 0, FW, FH)
  useProg(flowProg)
  gl.uniform2f(gl.getUniformLocation(flowProg, 'uPx'),     1/FW, 1/FH)
  gl.uniform1f(gl.getUniformLocation(flowProg, 'uForce'),  0.6)
  gl.uniform1f(gl.getUniformLocation(flowProg, 'uLambda'), 0.015)
  bindTex(0, currTex, flowProg, 'uCurr')
  bindTex(1, prevTex, flowProg, 'uPrev')
  draw()

  // 4. Display: (flowTex, displayTex[1-ping]) → displayFBO[ping]
  const pong = 1 - ping
  gl.bindFramebuffer(gl.FRAMEBUFFER, displayFBOs[ping])
  gl.viewport(0, 0, W, H)
  useProg(displayProg)
  gl.uniform1f(gl.getUniformLocation(displayProg, 'uDecay'),  0.88)
  gl.uniform1f(gl.getUniformLocation(displayProg, 'uScale'),  12.0)
  gl.uniform1f(gl.getUniformLocation(displayProg, 'uThresh'), 0.04)
  bindTex(0, flowTex,          displayProg, 'uFlow')
  bindTex(1, displayTex[pong], displayProg, 'uPrevDisplay')
  draw()

  // 5. Blit displayTex[ping] → canvas
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.viewport(0, 0, W, H)
  useProg(copyProg)
  bindTex(0, displayTex[ping], copyProg, 'uTex')
  draw()

  // 6. Swap: prevTex ← currTex (by pointer swap)
  const tmp = prevTex; prevTex = currTex; currTex = tmp

  // 7. Flip ping
  ping = pong
}

// ── Resize ───────────────────────────────────────────────────
function onResize() {
  if (!gl || !cvs.value) return
  W = cvs.value.clientWidth
  H = cvs.value.clientHeight
  cvs.value.width  = W
  cvs.value.height = H

  // Recreate display textures and FBOs at new size
  gl.deleteTexture(displayTex[0])
  gl.deleteTexture(displayTex[1])
  displayTex = [makeTex(W, H), makeTex(W, H)]
  displayFBOs.forEach(f => gl.deleteFramebuffer(f))
  displayFBOs = [makeFBO(displayTex[0]), makeFBO(displayTex[1])]
  ping = 0
}

onUnmounted(() => {
  cancelAnimationFrame(animId)
  if (vid.value?.srcObject) {
    vid.value.srcObject.getTracks().forEach(t => t.stop())
  }
  window.removeEventListener('resize', onResize)
})

window.addEventListener('resize', onResize)
</script>

<style scoped>
.hf {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hf-vid {
  display: none;
}

.hf-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.85;
  mix-blend-mode: screen;
}

/* Start button */
.hf-start {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hf-start-ring {
  display: block;
  width: 56px;
  height: 56px;
  border: 1px solid rgba(255, 45, 0, 0.5);
  border-radius: 50%;
  animation: hf-ring-pulse 2s ease-in-out infinite;
}

.hf-start-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: var(--accent, #ff2d00);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  margin-top: -10px;
}

.hf-start-lbl {
  font-family: 'Space Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: rgba(232, 232, 230, 0.5);
  text-transform: uppercase;
}

.hf-start:hover .hf-start-ring {
  border-color: var(--accent, #ff2d00);
}
.hf-start:hover .hf-start-lbl {
  color: rgba(232, 232, 230, 0.9);
}

@keyframes hf-ring-pulse {
  0%, 100% { transform: scale(1);   opacity: 0.6; }
  50%       { transform: scale(1.2); opacity: 1.0; }
}

/* Denied message */
.hf-msg {
  position: absolute;
  bottom: 48%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  font-family: 'Space Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: rgba(232, 232, 230, 0.35);
  white-space: nowrap;
}

/* Transitions */
.hf-fade-enter-active,
.hf-fade-leave-active { transition: opacity 0.6s ease; }
.hf-fade-enter-from,
.hf-fade-leave-to     { opacity: 0; }
</style>
