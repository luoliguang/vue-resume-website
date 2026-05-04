<template>
  <section :id="id" class="merge-shell" ref="shellRef">
    <div class="merge-sticky">
      <div class="merge-stage" :style="stageVars">
        <div class="panel panel-left">
          <slot name="left">
            <h3>Design</h3>
            <p>信息层级、视觉节奏、动效语言</p>
          </slot>
        </div>

        <div class="core-card">
          <slot name="center">
            <span class="badge">Merge / Split</span>
            <h2>Scroll Morph Demo</h2>
            <p>滚动时，左右内容合拢为一体，再从一体拆分回左右。</p>
          </slot>
        </div>

        <div class="panel panel-right">
          <slot name="right">
            <h3>Engineering</h3>
            <p>Sticky + Progress + Transform 驱动布局形态变化</p>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: 'merge-split'
  },
  leftStart: {
    type: Number,
    default: 260
  },
  rightStart: {
    type: Number,
    default: 260
  },
  splitOffset: {
    type: Number,
    default: 210
  },
  smoothing: {
    type: Number,
    default: 0.14
  }
})

const shellRef = ref(null)
const progress = ref(0)
let targetProgress = 0
let rafId = null
let ticking = false

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const lerp = (a, b, t) => a + (b - a) * t

const easeInOut = (t) => t * t * (3 - 2 * t)

const stageVars = computed(() => {
  const t = clamp(progress.value)
  const e = easeInOut(t)

  // 用连续曲线代替中点分段，避免“卡一下”
  const wave = Math.sin(Math.PI * e) // 0 -> 1 -> 0
  const split = easeInOut(Math.abs(2 * e - 1)) // 1 -> 0 -> 1

  const leftX = lerp(-props.leftStart, -props.splitOffset, split) * (1 - wave)
  const rightX = lerp(props.rightStart, props.splitOffset, split) * (1 - wave)

  const coreScale = 0.92 + 0.14 * wave
  const coreRadius = 28 - 12 * wave + 12 * split * 0.5

  const seam = 46 - 46 * wave + 40 * split
  const glow = 0.12 + 0.1 * wave - 0.08 * (1 - split)

  return {
    '--leftX': `${leftX}px`,
    '--rightX': `${rightX}px`,
    '--coreScale': coreScale.toFixed(3),
    '--coreRadius': `${coreRadius}px`,
    '--seam': `${seam}%`,
    '--glow': glow.toFixed(3)
  }
})

const computeProgress = () => {
  const el = shellRef.value
  if (!el) return 0

  const rect = el.getBoundingClientRect()
  const total = rect.height - window.innerHeight
  if (total <= 0) return 0

  const scrolled = -rect.top
  return clamp(scrolled / total)
}

const smoothUpdate = () => {
  const delta = targetProgress - progress.value
  progress.value += delta * props.smoothing

  if (Math.abs(delta) < 0.0007) {
    progress.value = targetProgress
    ticking = false
    rafId = null
    return
  }

  rafId = requestAnimationFrame(smoothUpdate)
}

const scheduleUpdate = () => {
  targetProgress = computeProgress()
  if (!ticking) {
    ticking = true
    rafId = requestAnimationFrame(smoothUpdate)
  }
}

onMounted(() => {
  targetProgress = computeProgress()
  progress.value = targetProgress
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.merge-shell {
  height: 240vh;
  position: relative;
  background: linear-gradient(180deg, #eef2f8 0%, #e9edf6 100%);
}

.merge-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.merge-stage {
  width: min(1120px, 92vw);
  height: min(620px, 78vh);
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  align-items: center;
  gap: 16px;
  position: relative;
}

.panel,
.core-card {
  min-height: 340px;
  padding: 28px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(32, 46, 66, 0.08);
  box-shadow: 0 14px 48px rgba(18, 30, 52, 0.09);
}

.panel {
  backdrop-filter: blur(3px);
}

.panel-left {
  transform: translateX(var(--leftX));
}

.panel-right {
  transform: translateX(var(--rightX));
}

.core-card {
  transform: scale(var(--coreScale));
  border-radius: var(--coreRadius);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.core-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(76, 113, 255, var(--glow)) 0%,
    transparent var(--seam),
    transparent calc(100% - var(--seam)),
    rgba(99, 209, 178, var(--glow)) 100%
  );
  pointer-events: none;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(76, 113, 255, 0.12);
  color: #3454cf;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.6px;
  margin-bottom: 12px;
}

h2,
h3 {
  color: #223047;
  margin: 0 0 12px;
}

p {
  margin: 0;
  color: #52627a;
  line-height: 1.8;
}

@media (max-width: 900px) {
  .merge-stage {
    grid-template-columns: 1fr;
    height: min(720px, 86vh);
  }

  .panel-left,
  .panel-right,
  .core-card {
    transform: none !important;
  }
}
</style>
