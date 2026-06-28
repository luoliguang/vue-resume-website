<template>
  <div class="mv" ref="rootRef">
    <!-- One-shot scan line -->
    <div class="mv-scan" ref="scanRef"></div>

    <!-- Cursor trail canvas -->
    <canvas class="mv-trail" ref="trailRef"></canvas>

    <!-- Sticky minimal header with lang toggle -->
    <header class="mv-header">
      <a href="#home" class="mv-brand mono">罗洋洋 · giluoo</a>
      <nav class="mv-nav" aria-label="Sections">
        <a href="#about"    class="mv-nav-link mono">{{ t('nav.about') }}</a>
        <a href="#skills"   class="mv-nav-link mono">{{ t('nav.skills') }}</a>
        <a href="#journey"  class="mv-nav-link mono">{{ t('nav.journey') }}</a>
        <a href="#projects" class="mv-nav-link mono">{{ t('nav.projects') }}</a>
        <a href="#contact"  class="mv-nav-link mono">{{ t('nav.contact') }}</a>
      </nav>
      <button class="mv-lang-btn mono" @click="toggleLanguage" :aria-label="isChinese ? 'Switch to English' : '切换中文'">
        {{ isChinese ? 'EN' : '中' }}
      </button>
    </header>

    <!-- ══ HERO ══════════════════════════════════════════════ -->
    <section id="home" class="mv-hero">
      <!-- L0: grid texture (slowest parallax) -->
      <div class="mv-grid-bg" ref="gridBgRef" aria-hidden="true"></div>
      <!-- L1: ghost name (mid parallax) -->
      <div class="mv-ghost" ref="ghostRef" aria-hidden="true">
        {{ isChinese ? '罗洋洋' : 'LLG' }}
      </div>

      <div class="mv-hero-inner">
        <span class="mv-eyebrow mono">
          {{ isChinese ? '服装行业 · 全栈开发 · AI应用实践' : 'Fashion Industry · Full Stack Dev · AI Practitioner' }}
        </span>

        <!-- Word/char-by-word title reveal -->
        <h1 class="mv-hero-title" aria-label="罗洋洋">
          <span
            v-for="(chunk, i) in heroChunks"
            :key="`ht-${chunk}-${i}`"
            class="rv-outer"
            :style="{ '--rv-i': i, marginRight: isChinese ? '0.04em' : '0.2em' }"
          >
            <span class="rv-inner" :class="{ 'rv-in': heroIn }">{{ chunk }}</span>
          </span>
        </h1>

        <!-- Subtitle reveal -->
        <p class="mv-hero-sub" aria-label="subtitle">
          <span
            v-for="(word, i) in heroSubChunks"
            :key="`hs-${word}-${i}`"
            class="rv-outer"
            :style="{ '--rv-i': i, marginRight: '0.2em' }"
          >
            <span class="rv-inner" :class="{ 'rv-in': heroSubIn }">{{ word }}</span>
          </span>
        </p>

        <!-- Counter-roll stats -->
        <div class="mv-stats">
          <div class="mv-stat">
            <div class="mv-stat-val">
              <span class="mv-counter" data-target="2">0</span><span class="mv-stat-u">yr+</span>
            </div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '跟单经验' : 'Merchandising' }}</span>
          </div>
          <div class="mv-stat-sep" aria-hidden="true"></div>
          <div class="mv-stat">
            <div class="mv-stat-val">
              <span class="mv-counter" data-target="200">0</span><span class="mv-stat-u">+</span>
            </div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '服务客户' : 'Clients Served' }}</span>
          </div>
          <div class="mv-stat-sep" aria-hidden="true"></div>
          <div class="mv-stat">
            <div class="mv-stat-val">
              <span>↓</span><span class="mv-counter" data-target="15">0</span><span class="mv-stat-u">%</span>
            </div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '降低返工率' : 'Rework Reduced' }}</span>
          </div>
          <div class="mv-stat-sep" aria-hidden="true"></div>
          <div class="mv-stat">
            <div class="mv-stat-val">
              <span class="mv-counter" data-target="3">0</span>
            </div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '自研工具' : 'Tools Built' }}</span>
          </div>
        </div>

        <div class="mv-cta">
          <a href="#about"   class="mv-btn-primary">{{ t('hero.cta') }}</a>
          <a href="#projects" class="mv-btn-outline">{{ t('hero.cta2') }}</a>
          <a class="mv-btn-outline" href="/api/uploads/resume.pdf" download target="_blank">{{ t('hero.cta4') }}</a>
        </div>
      </div>

      <div class="mv-scroll-cue" aria-hidden="true">
        <span class="mono">SCROLL</span>
        <div class="mv-scroll-line"></div>
      </div>
    </section>

    <!-- ══ ABOUT ══════════════════════════════════════════════ -->
    <section id="about" class="mv-section mv-about">
      <div class="mv-bg-num" ref="aboutNumRef" aria-hidden="true">01</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.about') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">
            {{ isChinese ? '关于我' : 'About Me' }}
          </h2>
        </header>
        <div class="mv-about-body" data-reveal="list">
          <p class="list-item mv-about-text">{{ t('about.description') }}</p>
          <div class="list-item mv-tag-row">
            <span v-for="tag in (isChinese ? tagsZh : tagsEn)" :key="tag" class="mv-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ SKILLS ══════════════════════════════════════════════ -->
    <section id="skills" class="mv-section mv-skills">
      <div class="mv-bg-num" ref="skillsNumRef" aria-hidden="true">02</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.skills') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">
            {{ isChinese ? '技能专长' : 'Skills' }}
          </h2>
        </header>
        <div class="mv-skills-grid" data-reveal="list">
          <div v-for="cat in skillCategories" :key="cat.id" class="mv-skill-cat list-item">
            <h3 class="mv-skill-cat-hd">{{ cat.name[isChinese ? 'zh' : 'en'] }}</h3>
            <div class="mv-skill-rows">
              <div v-for="skill in cat.skills" :key="skill.name.zh" class="mv-skill-row">
                <span class="mv-skill-name">{{ skill.name[isChinese ? 'zh' : 'en'] }}</span>
                <span class="mv-skill-hl mono">{{ skill.highlight[isChinese ? 'zh' : 'en'] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ JOURNEY ══════════════════════════════════════════════ -->
    <section id="journey" class="mv-section mv-journey">
      <div class="mv-bg-num" ref="journeyNumRef" aria-hidden="true">03</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.journey') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">
            {{ isChinese ? '我的历程' : 'My Journey' }}
          </h2>
        </header>
        <div class="mv-timeline" data-reveal="list">
          <div
            v-for="item in journeyMilestones"
            :key="item.id"
            class="mv-tl-item list-item"
            :class="{ 'mv-tl-live': item.status === 'in-progress' }"
          >
            <div class="mv-tl-left">
              <span class="mv-tl-year mono">{{ item.year }}</span>
              <div class="mv-tl-vline"></div>
            </div>
            <div class="mv-tl-right">
              <h3 class="mv-tl-title">{{ item.title[isChinese ? 'zh' : 'en'] }}</h3>
              <p class="mv-tl-desc">{{ item.description[isChinese ? 'zh' : 'en'] }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ PROJECTS ══════════════════════════════════════════════ -->
    <section id="projects" class="mv-section mv-projects">
      <div class="mv-bg-num" ref="projectsNumRef" aria-hidden="true">04</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.projects') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">
            {{ isChinese ? '项目展示' : 'Projects' }}
          </h2>
        </header>
        <div class="mv-proj-list" data-reveal="list">
          <div
            v-for="(proj, i) in displayProjects"
            :key="proj.id ?? i"
            class="mv-proj-row list-item"
            @click="openProject(proj)"
            role="button"
            tabindex="0"
            @keydown.enter="openProject(proj)"
          >
            <span class="mv-proj-idx mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="mv-proj-info">
              <h3 class="mv-proj-name">{{ getTitle(proj) }}</h3>
              <p class="mv-proj-desc">{{ getDesc(proj) }}</p>
            </div>
            <div class="mv-proj-techs" v-if="proj.technologies?.length">
              <span v-for="tech in proj.technologies.slice(0, 3)" :key="tech" class="mv-tag mv-tag-sm">{{ tech }}</span>
            </div>
            <span class="mv-proj-arrow" aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CONTACT ══════════════════════════════════════════════ -->
    <section id="contact" class="mv-section mv-contact">
      <div class="mv-bg-num" ref="contactNumRef" aria-hidden="true">05</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.contact') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">
            {{ isChinese ? '联系方式' : 'Contact' }}
          </h2>
        </header>
        <p class="mv-contact-sub">{{ t('contact.subtitle') }}</p>
        <div class="mv-contact-grid" data-reveal="list">
          <a class="mv-ci list-item" href="mailto:giluo@vip.qq.com">
            <span class="mv-ci-lbl mono">EMAIL</span>
            <span class="mv-ci-val">giluo@vip.qq.com</span>
          </a>
          <div class="mv-ci list-item">
            <span class="mv-ci-lbl mono">WECHAT</span>
            <span class="mv-ci-val">giluoo</span>
          </div>
          <a class="mv-ci list-item" href="https://github.com/luoliguang" target="_blank" rel="noopener">
            <span class="mv-ci-lbl mono">GITHUB</span>
            <span class="mv-ci-val">luoliguang</span>
          </a>
          <div class="mv-ci list-item">
            <span class="mv-ci-lbl mono">{{ isChinese ? '现居' : 'LOCATION' }}</span>
            <span class="mv-ci-val">{{ isChinese ? '广东 · 惠州' : 'Huizhou, Guangdong' }}</span>
          </div>
        </div>
        <div class="mv-contact-cta">
          <a class="mv-btn-primary" href="/api/uploads/resume.pdf" download target="_blank">{{ t('hero.cta4') }}</a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mv-footer">
      <span class="mono mv-ft-copy">© 2025 罗洋洋</span>
      <span class="mv-ft-dot" aria-hidden="true">✦</span>
      <span class="mono mv-ft-tag">haoqi-motion-style</span>
    </footer>

    <!-- Project detail overlay -->
    <Transition name="mv-fade">
      <div v-if="activeProject" class="mv-overlay" @click.self="closeProject">
        <div class="mv-detail">
          <button class="mv-detail-close" @click="closeProject" aria-label="Close">✕</button>
          <div class="mv-detail-img" v-if="activeProject.image">
            <img :src="activeProject.image" :alt="getTitle(activeProject)" loading="lazy">
          </div>
          <h3 class="mv-detail-title">{{ getTitle(activeProject) }}</h3>
          <p class="mv-detail-desc">{{ getDesc(activeProject) }}</p>
          <div class="mv-detail-techs" v-if="activeProject.technologies?.length">
            <span v-for="tech in activeProject.technologies" :key="tech" class="mv-tag">{{ tech }}</span>
          </div>
          <a v-if="activeProject.link" :href="activeProject.link" target="_blank" rel="noopener" class="mv-btn-primary">
            {{ isChinese ? '访问项目 →' : 'Visit Project →' }}
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { t, isChinese, toggleLanguage } from '../composables/useI18n.js'
import { useContent } from '../composables/useContent.js'
import { skillCategories } from '../data/skills.js'
import { journeyMilestones } from '../data/journey.js'
import { projectShowcase as staticProjects } from '../data/projectShowcase.js'

// ── Static content ──────────────────────────────────────────
const tagsZh = ['服装跟单', '客户沟通', '生产协调', 'Vue.js', 'Node.js', 'WPS脚本', '服务器部署']
const tagsEn = ['Garment Merchandising', 'Client Communication', 'Production Coordination', 'Vue.js', 'Node.js', 'WPS Scripting']

// ── CMS projects with static fallback ──────────────────────
const { data: cmsProjects } = useContent('projects')
const displayProjects = computed(() =>
  cmsProjects.value?.length ? cmsProjects.value : staticProjects
)

const getTitle = (proj) => {
  // Static data: { title: { zh, en } }
  if (proj.title && typeof proj.title === 'object')
    return proj.title[isChinese.value ? 'zh' : 'en'] ?? proj.title.zh ?? ''
  if (typeof proj.title === 'string') return proj.title
  // CMS flat format: { title_zh, title_en }
  return isChinese.value ? (proj.title_zh ?? '') : (proj.title_en ?? '')
}

const getDesc = (proj) => {
  // Static data: { description: { zh, en } }
  if (proj.description && typeof proj.description === 'object')
    return proj.description[isChinese.value ? 'zh' : 'en'] ?? proj.description.zh ?? ''
  if (typeof proj.description === 'string') return proj.description
  // CMS flat format: { description_zh, description_en }
  return isChinese.value ? (proj.description_zh ?? '') : (proj.description_en ?? '')
}

// ── Hero text chunks for word/char reveal ──────────────────
const heroChunks = computed(() =>
  isChinese.value ? [...'罗洋洋'] : 'Luo Yangyang'.split(' ')
)
const heroSubChunks = computed(() => {
  const s = isChinese.value
    ? '服装跟单 · AI应用实践 · 流程自动化'
    : 'Garment Merchandising · AI Practitioner · Process Automation'
  return s.split(' ')
})

const heroIn    = ref(false)
const heroSubIn = ref(false)

// ── Project detail overlay ──────────────────────────────────
const activeProject = ref(null)
const openProject   = (proj) => { activeProject.value = proj }
const closeProject  = () => { activeProject.value = null }

// ── DOM refs ────────────────────────────────────────────────
const rootRef       = ref(null)
const scanRef       = ref(null)
const trailRef      = ref(null)
const ghostRef      = ref(null)
const gridBgRef     = ref(null)
const aboutNumRef   = ref(null)
const skillsNumRef  = ref(null)
const journeyNumRef = ref(null)
const projectsNumRef= ref(null)
const contactNumRef = ref(null)

// ── Font injection ──────────────────────────────────────────
function injectFont () {
  if (document.querySelector('link[data-mv-font]')) return
  const link = document.createElement('link')
  link.rel  = 'stylesheet'
  link.dataset.mvFont = true
  link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@200;400;700;900&family=Space+Mono:wght@400;700&display=swap'
  document.head.appendChild(link)
}

// ── Scan line (signature action) ────────────────────────────
function runScanLine () {
  const line = scanRef.value
  if (!line) return
  line.style.transition = 'none'
  line.style.top = '0'
  line.style.opacity = '1'
  void line.offsetWidth
  line.style.transition = 'top 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.2s 1s'
  line.style.top = '100vh'
  line.style.opacity = '0'
}

// ── Cursor trail (idle-aware: rAF only runs while particles alive) ──
const pts = []
let trailRaf = null, trailRunning = false
let mouseHandler = null, resizeHandler = null

function initTrail () {
  const canvas = trailRef.value
  if (!canvas) return
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')

  function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i]
      p.life -= 0.045
      if (p.life <= 0) { pts.splice(i, 1); continue }
      alive = true
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2.5 * p.life, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,45,0,${p.life * 0.55})`
      ctx.fill()
    }
    if (alive) {
      trailRaf = requestAnimationFrame(draw)
    } else {
      trailRunning = false
    }
  }

  mouseHandler = (e) => {
    pts.push({ x: e.clientX, y: e.clientY, life: 1 })
    if (!trailRunning) { trailRunning = true; draw() }
  }
  resizeHandler = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
  window.addEventListener('mousemove', mouseHandler)
  window.addEventListener('resize', resizeHandler)
}

// ── Parallax (window-scroll version) ────────────────────────
let scrollHandler = null

function initParallax () {
  const layers = [
    [ghostRef,      0.22],
    [gridBgRef,     0.08],
    [aboutNumRef,   0.14],
    [skillsNumRef,  0.11],
    [journeyNumRef, 0.09],
    [projectsNumRef,0.07],
    [contactNumRef, 0.05],
  ]
  scrollHandler = () => {
    const sy = window.scrollY
    layers.forEach(([r, s]) => {
      if (r.value) r.value.style.transform = `translateY(${sy * s}px)`
    })
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
}

// ── Counter roll ─────────────────────────────────────────────
function runCounter (el, dur = 1000) {
  const target = parseFloat(el.dataset.target)
  const t0 = performance.now()
  const tick = (now) => {
    const p = Math.min((now - t0) / dur, 1)
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)))
    if (p < 1) requestAnimationFrame(tick)
    else el.textContent = target
  }
  requestAnimationFrame(tick)
}

// ── IntersectionObserver ─────────────────────────────────────
let io = null, statsIo = null

function initObservers () {
  io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const el   = entry.target
      const type = el.dataset.reveal
      if (type === 'title') el.classList.add('mv-revealed')
      if (type === 'list') {
        el.querySelectorAll('.list-item').forEach((item, i) =>
          setTimeout(() => item.classList.add('in'), i * 70)
        )
      }
      io.unobserve(el)
    })
  }, { threshold: 0.12 })

  rootRef.value?.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))

  // Stats counter
  const statsEl = rootRef.value?.querySelector('.mv-stats')
  if (statsEl) {
    statsIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.querySelectorAll('.mv-counter').forEach(c => runCounter(c, 1200))
        statsIo.unobserve(entry.target)
      })
    }, { threshold: 0.5 })
    statsIo.observe(statsEl)
  }
}

// ── Lifecycle ─────────────────────────────────────────────────
onMounted(() => {
  injectFont()
  setTimeout(runScanLine, 400)
  initTrail()
  initParallax()
  setTimeout(() => { heroIn.value    = true }, 180)
  setTimeout(() => { heroSubIn.value = true }, 380)
  initObservers()
})

onUnmounted(() => {
  cancelAnimationFrame(trailRaf)
  if (mouseHandler)  window.removeEventListener('mousemove', mouseHandler)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  io?.disconnect()
  statsIo?.disconnect()
  pts.length = 0
})
</script>

<style scoped>
/* ── Design tokens ─────────────────────────────────────────── */
.mv {
  --mv-bg:    #0a0a0a;
  --mv-fg:    #e8e8e6;
  --mv-fg2:   #888884;
  --mv-fg3:   #252522;
  --mv-line:  #1e1e1c;
  --mv-accent:#ff2d00;
  --mv-ease:  cubic-bezier(0.16, 1, 0.3, 1);

  font-family: 'Space Grotesk', -apple-system, 'PingFang SC', 'Helvetica Neue', sans-serif;
  background: var(--mv-bg);
  color: var(--mv-fg);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

.mono {
  font-family: 'Space Mono', 'Menlo', 'SF Mono', monospace;
}

/* ── System overlays ───────────────────────────────────────── */
.mv-scan {
  position: fixed;
  left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--mv-accent) 40%, transparent);
  top: 0;
  opacity: 0;
  pointer-events: none;
  z-index: 9999;
}

.mv-trail {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
}

/* ── Header ────────────────────────────────────────────────── */
.mv-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 58px;
  display: flex;
  align-items: center;
  padding: 0 clamp(20px, 5vw, 64px);
  gap: 20px;
  background: rgba(10,10,10,0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--mv-line);
  z-index: 200;
}

.mv-brand {
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: var(--mv-fg);
  text-decoration: none;
  white-space: nowrap;
}

.mv-nav {
  display: flex;
  gap: 28px;
  flex: 1;
  justify-content: center;
}

.mv-nav-link {
  font-size: 0.63rem;
  letter-spacing: 0.1em;
  color: var(--mv-fg2);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s;
}
.mv-nav-link:hover { color: var(--mv-fg); }

.mv-lang-btn {
  background: none;
  border: 1px solid var(--mv-line);
  color: var(--mv-fg2);
  font-size: 0.63rem;
  letter-spacing: 0.1em;
  padding: 5px 11px;
  cursor: pointer;
  border-radius: 3px;
  transition: border-color 0.2s, color 0.2s;
  white-space: nowrap;
}
.mv-lang-btn:hover { border-color: var(--mv-fg2); color: var(--mv-fg); }

/* ── Text reveal primitives ────────────────────────────────── */
.rv-outer {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
}
.rv-inner {
  display: block;
  transform: translateY(110%);
  transition: transform 0.75s var(--mv-ease);
  transition-delay: calc(var(--rv-i, 0) * 85ms);
}
.rv-inner.rv-in { transform: translateY(0); }

/* ── Section title reveal ──────────────────────────────────── */
.mv-sec-title {
  font-size: clamp(2.5rem, 5.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.93;
  margin: 0;
  transform: translateY(36px);
  opacity: 0;
  transition: transform 0.75s var(--mv-ease), opacity 0.75s var(--mv-ease);
}
.mv-sec-title.mv-revealed { transform: translateY(0); opacity: 1; }

/* ── List stagger ──────────────────────────────────────────── */
.list-item {
  transform: translateY(26px);
  opacity: 0;
  transition: transform 0.65s var(--mv-ease), opacity 0.65s var(--mv-ease);
}
.list-item.in { transform: translateY(0); opacity: 1; }

/* ── Shared layout ─────────────────────────────────────────── */
.mv-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
  position: relative;
  z-index: 2;
}

.mv-section {
  position: relative;
  padding: clamp(80px, 12vw, 140px) 0;
  overflow: hidden;
}

.mv-sec-hd { margin-bottom: clamp(40px, 6vw, 64px); }

.mv-sec-tag {
  display: block;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--mv-fg2);
  text-transform: uppercase;
  margin-bottom: 18px;
}

.mv-bg-num {
  position: absolute;
  right: clamp(0px, 3vw, 48px);
  top: 50%;
  transform: translateY(-50%);
  font-size: clamp(7rem, 18vw, 22rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 1;
  color: var(--mv-fg3);
  pointer-events: none;
  user-select: none;
  will-change: transform;
  z-index: 0;
}

/* ── HERO ──────────────────────────────────────────────────── */
.mv-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px clamp(20px, 5vw, 64px) 64px;
  position: relative;
  overflow: hidden;
}

.mv-ghost {
  position: absolute;
  right: clamp(0px, 1vw, 20px);
  top: 50%;
  transform: translateY(-50%);
  font-size: clamp(6rem, 18vw, 22rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 1;
  color: var(--mv-fg3);
  pointer-events: none;
  user-select: none;
  will-change: transform;
  opacity: 0.5;
}

.mv-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--mv-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--mv-line) 1px, transparent 1px);
  background-size: 64px 64px;
  pointer-events: none;
  will-change: transform;
  opacity: 0.55;
}

.mv-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
}

.mv-eyebrow {
  display: block;
  font-size: 0.63rem;
  letter-spacing: 0.14em;
  color: var(--mv-fg2);
  text-transform: uppercase;
  margin-bottom: 28px;
}

.mv-hero-title {
  font-size: clamp(4rem, 11vw, 10rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin: 0 0 28px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}

.mv-hero-sub {
  font-size: clamp(0.9rem, 1.8vw, 1.15rem);
  font-weight: 400;
  color: var(--mv-fg2);
  margin: 0 0 52px;
  line-height: 1.65;
  display: flex;
  flex-wrap: wrap;
}

/* ── Counter stats ─────────────────────────────────────────── */
.mv-stats {
  display: flex;
  align-items: stretch;
  margin-bottom: 52px;
  flex-wrap: wrap;
  gap: 0;
}

.mv-stat {
  padding: 0 40px 0 0;
}
.mv-stat:first-child { padding-left: 0; }
.mv-stat:last-child  { padding-right: 0; }

.mv-stat-sep {
  width: 1px;
  background: var(--mv-line);
  margin-right: 40px;
  flex-shrink: 0;
}

.mv-stat-val {
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 6px;
}

.mv-stat-u {
  font-size: 0.65em;
  font-weight: 400;
  opacity: 0.7;
}

.mv-stat-lbl {
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--mv-fg2);
  text-transform: uppercase;
}

/* ── Buttons ───────────────────────────────────────────────── */
.mv-cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.mv-btn-primary {
  display: inline-flex;
  align-items: center;
  background: var(--mv-fg);
  color: var(--mv-bg);
  padding: 13px 26px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.mv-btn-primary:hover { opacity: 0.88; }

.mv-btn-outline {
  display: inline-flex;
  align-items: center;
  background: none;
  color: var(--mv-fg);
  padding: 13px 26px;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-decoration: none;
  border: 1px solid var(--mv-line);
  cursor: pointer;
  transition: border-color 0.2s;
}
.mv-btn-outline:hover { border-color: var(--mv-fg2); }

/* ── Scroll cue ────────────────────────────────────────────── */
.mv-scroll-cue {
  position: absolute;
  bottom: 40px;
  left: clamp(20px, 5vw, 64px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  z-index: 2;
}
.mv-scroll-cue span {
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  color: var(--mv-fg2);
}
.mv-scroll-line {
  width: 1px;
  height: 52px;
  background: linear-gradient(to bottom, var(--mv-fg2), transparent);
  animation: mv-pulse 2.2s ease-in-out infinite;
}
@keyframes mv-pulse {
  0%, 100% { opacity: 0.35; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(0.65); }
}

/* ── ABOUT ─────────────────────────────────────────────────── */
.mv-about { background: var(--mv-bg); }

.mv-about-text {
  font-size: clamp(0.92rem, 1.4vw, 1.08rem);
  line-height: 1.8;
  color: var(--mv-fg2);
  max-width: 740px;
  margin: 0 0 28px;
}

.mv-tag-row { display: flex; flex-wrap: wrap; gap: 8px; }

.mv-tag {
  background: var(--mv-fg3);
  color: var(--mv-fg2);
  padding: 6px 12px;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  border: 1px solid transparent;
  transition: border-color 0.2s, color 0.2s;
}
.mv-tag:hover { border-color: #3a3a38; color: var(--mv-fg); }

.mv-tag-sm { padding: 4px 8px; font-size: 0.64rem; }

/* ── SKILLS ────────────────────────────────────────────────── */
.mv-skills { background: color-mix(in srgb, var(--mv-bg) 97%, #fff); }

.mv-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: clamp(20px, 3vw, 36px);
}

.mv-skill-cat {
  border-top: 1px solid var(--mv-line);
  padding-top: 22px;
}

.mv-skill-cat-hd {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mv-fg2);
  margin: 0 0 18px;
}

.mv-skill-rows { display: flex; flex-direction: column; gap: 11px; }

.mv-skill-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  border-bottom: 1px solid var(--mv-line);
  padding-bottom: 11px;
}
.mv-skill-rows .mv-skill-row:last-child { border-bottom: none; padding-bottom: 0; }

.mv-skill-name { font-size: 0.9rem; color: var(--mv-fg); }
.mv-skill-hl {
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  color: var(--mv-fg2);
  text-align: right;
  flex-shrink: 0;
}

/* ── JOURNEY ───────────────────────────────────────────────── */
.mv-journey { background: var(--mv-bg); }

.mv-timeline { display: flex; flex-direction: column; }

.mv-tl-item {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 28px;
  padding: 28px 0;
  border-top: 1px solid var(--mv-line);
}
.mv-tl-item:last-child { border-bottom: 1px solid var(--mv-line); }

.mv-tl-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding-top: 3px;
}

.mv-tl-year { font-size: 0.68rem; letter-spacing: 0.08em; color: var(--mv-fg2); white-space: nowrap; }
.mv-tl-live .mv-tl-year { color: var(--mv-accent); }

.mv-tl-vline { width: 1px; flex: 1; background: var(--mv-line); min-height: 16px; }
.mv-tl-live .mv-tl-vline { background: var(--mv-accent); opacity: 0.35; }

.mv-tl-right {}

.mv-tl-title {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--mv-fg);
}

.mv-tl-desc {
  font-size: 0.86rem;
  line-height: 1.7;
  color: var(--mv-fg2);
  margin: 0;
}

/* ── PROJECTS ──────────────────────────────────────────────── */
.mv-projects { background: color-mix(in srgb, var(--mv-bg) 97%, #fff); }

.mv-proj-list { display: flex; flex-direction: column; }

.mv-proj-row {
  display: grid;
  grid-template-columns: 40px 1fr auto 28px;
  align-items: center;
  gap: 20px;
  padding: 24px 8px;
  border-top: 1px solid var(--mv-line);
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 2px;
}
.mv-proj-row:last-child { border-bottom: 1px solid var(--mv-line); }
.mv-proj-row:hover { background: rgba(255,255,255,0.025); }

.mv-proj-idx { font-size: 0.62rem; letter-spacing: 0.1em; color: var(--mv-fg2); }

.mv-proj-name {
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  font-weight: 700;
  margin: 0 0 6px;
  color: var(--mv-fg);
}

.mv-proj-desc {
  font-size: 0.8rem;
  line-height: 1.55;
  color: var(--mv-fg2);
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.mv-proj-techs { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }

.mv-proj-arrow {
  color: var(--mv-fg2);
  font-size: 1rem;
  transition: transform 0.2s, color 0.2s;
}
.mv-proj-row:hover .mv-proj-arrow { transform: translateX(4px); color: var(--mv-fg); }

/* ── CONTACT ───────────────────────────────────────────────── */
.mv-contact { background: var(--mv-bg); }

.mv-contact-sub {
  font-size: 0.88rem;
  color: var(--mv-fg2);
  margin: -32px 0 44px;
  letter-spacing: 0.01em;
}

.mv-contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  border-top: 1px solid var(--mv-line);
}

.mv-ci {
  border-right: 1px solid var(--mv-line);
  border-bottom: 1px solid var(--mv-line);
  padding: 24px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background 0.2s;
}
.mv-ci:hover { background: rgba(255,255,255,0.025); }

.mv-ci-lbl { font-size: 0.58rem; letter-spacing: 0.14em; color: var(--mv-fg2); text-transform: uppercase; }
.mv-ci-val { font-size: 0.92rem; color: var(--mv-fg); word-break: break-all; }

.mv-contact-cta { margin-top: 40px; display: flex; }

/* ── FOOTER ────────────────────────────────────────────────── */
.mv-footer {
  border-top: 1px solid var(--mv-line);
  padding: 28px clamp(20px, 5vw, 64px);
  display: flex;
  align-items: center;
  gap: 16px;
}
.mv-ft-copy, .mv-ft-tag { font-size: 0.68rem; letter-spacing: 0.06em; color: var(--mv-fg2); }
.mv-ft-dot { color: var(--mv-accent); font-size: 0.72rem; }

/* ── PROJECT DETAIL OVERLAY ─────────────────────────────────── */
.mv-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.86);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.mv-detail {
  background: #111110;
  border: 1px solid var(--mv-line);
  max-width: 580px;
  width: 100%;
  max-height: 86vh;
  overflow-y: auto;
  padding: 32px;
  position: relative;
}

.mv-detail-close {
  position: absolute;
  top: 16px; right: 16px;
  background: none; border: none;
  color: var(--mv-fg2); font-size: 1rem;
  cursor: pointer; padding: 4px 8px;
  transition: color 0.2s;
}
.mv-detail-close:hover { color: var(--mv-fg); }

.mv-detail-img { margin-bottom: 20px; overflow: hidden; border-radius: 3px; }
.mv-detail-img img { width: 100%; height: 200px; object-fit: cover; }

.mv-detail-title { font-size: 1.4rem; font-weight: 700; margin: 0 0 12px; }
.mv-detail-desc  { font-size: 0.88rem; line-height: 1.7; color: var(--mv-fg2); margin: 0 0 20px; }
.mv-detail-techs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }

/* ── Transitions ────────────────────────────────────────────── */
.mv-fade-enter-active, .mv-fade-leave-active { transition: opacity 0.3s var(--mv-ease); }
.mv-fade-enter-from,  .mv-fade-leave-to      { opacity: 0; }

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .mv-nav  { display: none; }
  .mv-hero { padding: 90px 20px 60px; }

  .mv-stats { gap: 20px; flex-wrap: wrap; }
  .mv-stat-sep { display: none; }
  .mv-stat { padding: 0; }

  .mv-proj-row { grid-template-columns: 32px 1fr 24px; }
  .mv-proj-techs { display: none; }

  .mv-tl-item { grid-template-columns: 68px 1fr; gap: 16px; }
  .mv-skills-grid { grid-template-columns: 1fr 1fr; }
  .mv-contact-grid { grid-template-columns: 1fr 1fr; }
  .mv-bg-num { font-size: 6rem; }
}

@media (max-width: 480px) {
  .mv-hero { padding: 80px 16px 56px; }
  .mv-hero-title { font-size: clamp(3rem, 14vw, 4.5rem); }
  .mv-stats { flex-direction: column; gap: 16px; }
  .mv-skills-grid { grid-template-columns: 1fr; }
  .mv-contact-grid { grid-template-columns: 1fr; }
  .mv-tl-item { grid-template-columns: 56px 1fr; gap: 12px; }
  .mv-bg-num { font-size: 5rem; }
  .mv-proj-row { grid-template-columns: 28px 1fr 20px; gap: 12px; }
}

/* ── Accessibility: reduced motion ──────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .rv-inner,
  .mv-sec-title,
  .list-item { transform: none !important; opacity: 1 !important; transition: none !important; }
  .mv-scroll-line { animation: none; }
}
</style>
