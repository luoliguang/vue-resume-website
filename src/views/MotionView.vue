<template>
  <div class="mv" ref="rootRef">

    <!-- ── 持续环境层（总是在动）── -->
    <div class="mv-grain"    aria-hidden="true"></div>
    <div class="mv-ambient"  aria-hidden="true"></div>
    <canvas class="mv-particles" ref="particlesRef" aria-hidden="true"></canvas>

    <!-- ── 交互系统层 ── -->
    <div class="mv-scan"     ref="scanRef"     aria-hidden="true"></div>
    <canvas class="mv-trail" ref="trailRef"    aria-hidden="true"></canvas>
    <div class="mv-progress" ref="progressRef" aria-hidden="true"></div>
    <div class="mv-cur-dot"  ref="curDotRef"   aria-hidden="true"></div>
    <div class="mv-cur-ring" ref="curRingRef"  aria-hidden="true"></div>

    <!-- ── 导航 ── -->
    <header class="mv-header" ref="headerRef">
      <a href="#home" class="mv-brand mono">罗洋洋 · giluoo</a>
      <nav class="mv-nav" ref="navRef">
        <a href="#about"    class="mv-nav-link mono" data-sec="about">{{ t('nav.about') }}</a>
        <a href="#skills"   class="mv-nav-link mono" data-sec="skills">{{ t('nav.skills') }}</a>
        <a href="#journey"  class="mv-nav-link mono" data-sec="journey">{{ t('nav.journey') }}</a>
        <a href="#projects" class="mv-nav-link mono" data-sec="projects">{{ t('nav.projects') }}</a>
        <a href="#contact"  class="mv-nav-link mono" data-sec="contact">{{ t('nav.contact') }}</a>
      </nav>
      <div class="mv-header-r">
        <span class="mv-clock mono" ref="clockRef">00:00:00</span>
        <button class="mv-lang-btn mono magnetic" @click="toggleLanguage">
          {{ isChinese ? 'EN' : '中' }}
        </button>
      </div>
    </header>

    <!-- ══════════ HERO ══════════ -->
    <section id="home" class="mv-hero">
      <div class="mv-l0" ref="l0Ref" aria-hidden="true"></div>
      <div class="mv-l1" ref="l1Ref" aria-hidden="true">{{ isChinese ? '罗洋洋' : 'LLG' }}</div>
      <div class="mv-l2" ref="l2Ref" aria-hidden="true">
        <div class="mv-deco-h"></div>
        <div class="mv-deco-v"></div>
      </div>

      <div class="mv-hero-inner">
        <span class="mv-eyebrow mono">
          {{ isChinese ? '服装行业 · 全栈开发 · AI 应用实践' : 'Fashion Industry · Full Stack · AI Practice' }}
        </span>

        <h1 class="mv-hero-title" aria-label="罗洋洋">
          <span v-for="(c, i) in heroChunks" :key="`h${c}${i}`"
            class="rv-outer" :style="{ '--ri': i, marginRight: isChinese ? '0.04em' : '0.2em' }">
            <span class="rv-inner" :class="{ 'rv-in': heroIn }">{{ c }}</span>
          </span>
        </h1>

        <p class="mv-hero-sub">
          <span v-for="(w, i) in heroSubChunks" :key="`s${w}${i}`"
            class="rv-outer" :style="{ '--ri': i, marginRight: '0.2em' }">
            <span class="rv-inner" :class="{ 'rv-in': heroSubIn }">{{ w }}</span>
          </span>
        </p>

        <div class="mv-stats" ref="statsRef">
          <div class="mv-stat">
            <div class="mv-stat-val"><span class="mv-counter" data-target="2">0</span><span class="mv-stat-u">yr+</span></div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '跟单经验' : 'Merchandising' }}</span>
          </div>
          <div class="mv-stat-sep"></div>
          <div class="mv-stat">
            <div class="mv-stat-val"><span class="mv-counter" data-target="200">0</span><span class="mv-stat-u">+</span></div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '服务客户' : 'Clients' }}</span>
          </div>
          <div class="mv-stat-sep"></div>
          <div class="mv-stat">
            <div class="mv-stat-val">↓<span class="mv-counter" data-target="15">0</span><span class="mv-stat-u">%</span></div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '降低返工率' : 'Rework cut' }}</span>
          </div>
          <div class="mv-stat-sep"></div>
          <div class="mv-stat">
            <div class="mv-stat-val"><span class="mv-counter" data-target="3">0</span></div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '自研工具' : 'Tools built' }}</span>
          </div>
        </div>

        <div class="mv-cta">
          <a href="#about"    class="mv-btn-primary magnetic">{{ t('hero.cta') }}</a>
          <a href="#projects" class="mv-btn-outline  magnetic">{{ t('hero.cta2') }}</a>
          <a href="/api/uploads/resume.pdf" download target="_blank" class="mv-btn-outline magnetic">{{ t('hero.cta4') }}</a>
        </div>
      </div>

      <!-- 跑马灯 -->
      <div class="mv-ticker" aria-hidden="true">
        <div class="mv-ticker-track">
          <span v-for="n in 8" :key="n" class="mv-ticker-item mono">
            服装跟单 &nbsp;·&nbsp; AI 应用开发 &nbsp;·&nbsp; 流程自动化 &nbsp;·&nbsp; Vue.js &nbsp;·&nbsp; Node.js &nbsp;·&nbsp; 供应链数字化 &nbsp;·&nbsp;
          </span>
        </div>
      </div>

      <div class="mv-scroll-cue" aria-hidden="true">
        <span class="mono">SCROLL</span>
        <div class="mv-scroll-line"></div>
      </div>
    </section>

    <!-- ══════════ ABOUT ══════════ -->
    <section id="about" class="mv-section mv-about">
      <div class="mv-bg-num mv-bg-num--a" ref="aboutNumRef" aria-hidden="true">01</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.about') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">{{ isChinese ? '关于我' : 'About Me' }}</h2>
        </header>
        <div class="mv-about-body" data-reveal="list">
          <p class="list-item mv-about-text">{{ t('about.description') }}</p>
          <div class="list-item mv-tag-row">
            <span v-for="tag in (isChinese ? tagsZh : tagsEn)" :key="tag" class="mv-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ SKILLS ══════════ -->
    <section id="skills" class="mv-section mv-skills">
      <div class="mv-bg-num mv-bg-num--b" ref="skillsNumRef" aria-hidden="true">02</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.skills') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">{{ isChinese ? '技能专长' : 'Skills' }}</h2>
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

    <!-- ══════════ JOURNEY ══════════ -->
    <section id="journey" class="mv-section mv-journey">
      <div class="mv-bg-num mv-bg-num--c" ref="journeyNumRef" aria-hidden="true">03</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.journey') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">{{ isChinese ? '我的历程' : 'My Journey' }}</h2>
        </header>
        <div class="mv-timeline" data-reveal="list">
          <div v-for="item in journeyMilestones" :key="item.id"
            class="mv-tl-item list-item"
            :class="{ 'mv-tl-live': item.status === 'in-progress' }">
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

    <!-- ══════════ PROJECTS ══════════ -->
    <section id="projects" class="mv-section mv-projects">
      <div class="mv-bg-num mv-bg-num--d" ref="projectsNumRef" aria-hidden="true">04</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.projects') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">{{ isChinese ? '项目展示' : 'Projects' }}</h2>
        </header>

        <div class="mv-proj-grid">
          <div
            v-for="(proj, i) in displayProjects" :key="proj.id ?? i"
            class="mv-proj-card list-item"
            :class="{ 'mv-proj-card--wide': i === 0 || i === displayProjects.length - 1 }"
            @click="openProject(proj)"
            role="button" tabindex="0"
            @keydown.enter="openProject(proj)"
          >
            <div class="mv-proj-frame mv-img-reveal"
              :data-delay="i === 0 ? 0 : i === displayProjects.length - 1 ? 0 : i % 2 === 1 ? 80 : 220"
            >
              <img v-if="getImage(proj)" :src="getImage(proj)" :alt="getTitle(proj)" class="mv-proj-img" loading="lazy">
              <div v-else class="mv-proj-img-ph">
                <span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>
              </div>
              <!-- 幕布揭示 -->
              <div class="mv-proj-curtain"></div>

              <!-- 序号角标 -->
              <span class="mv-proj-idx mono">{{ String(i + 1).padStart(2, '0') }}</span>

              <!-- 右上角类型标签 -->
              <span v-if="proj.type" class="mv-proj-type-badge mono">{{ proj.type }}</span>

              <!-- 常显底部 -->
              <div class="mv-proj-foot">
                <h3 class="mv-proj-name">{{ getTitle(proj) }}</h3>
                <div class="mv-proj-techs" v-if="proj.technologies?.length">
                  <span v-for="tech in proj.technologies.slice(0, 3)" :key="tech" class="mv-tech mono">{{ tech }}</span>
                </div>
              </div>

              <!-- 悬停详情（从底部滑入） -->
              <div class="mv-proj-panel">
                <p class="mv-proj-desc">{{ getDesc(proj) }}</p>
                <div class="mv-proj-panel-ft">
                  <span class="mv-proj-cta mono">{{ isChinese ? '查看详情' : 'View Details' }} →</span>
                  <span v-if="proj.status" class="mv-proj-status mono">{{ proj.status }}</span>
                </div>
              </div>

              <!-- 悬停时图片微发光边框 -->
              <div class="mv-proj-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ CONTACT ══════════ -->
    <section id="contact" class="mv-section mv-contact">
      <div class="mv-bg-num mv-bg-num--e" ref="contactNumRef" aria-hidden="true">05</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.contact') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">{{ isChinese ? '联系方式' : 'Contact' }}</h2>
        </header>
        <p class="mv-contact-sub">{{ t('contact.subtitle') }}</p>
        <div class="mv-contact-grid" data-reveal="list">
          <a class="mv-ci list-item" href="mailto:giluo@vip.qq.com">
            <span class="mv-ci-lbl mono">EMAIL</span>
            <span class="mv-ci-val">giluo@vip.qq.com</span>
            <span class="mv-ci-arrow">→</span>
          </a>
          <div class="mv-ci list-item">
            <span class="mv-ci-lbl mono">WECHAT</span>
            <span class="mv-ci-val">giluoo</span>
          </div>
          <a class="mv-ci list-item" href="https://github.com/luoliguang" target="_blank" rel="noopener">
            <span class="mv-ci-lbl mono">GITHUB</span>
            <span class="mv-ci-val">luoliguang</span>
            <span class="mv-ci-arrow">→</span>
          </a>
          <div class="mv-ci list-item">
            <span class="mv-ci-lbl mono">{{ isChinese ? '现居' : 'LOCATION' }}</span>
            <span class="mv-ci-val">{{ isChinese ? '广东 · 惠州' : 'Huizhou, Guangdong' }}</span>
          </div>
        </div>
        <div class="mv-contact-cta">
          <a class="mv-btn-primary magnetic" href="/api/uploads/resume.pdf" download target="_blank">
            {{ t('hero.cta4') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mv-footer">
      <span class="mono mv-ft-copy">© 2025 罗洋洋</span>
      <span class="mv-ft-dot" aria-hidden="true">✦</span>
      <span class="mono mv-ft-tag">Full Stack · Fashion Industry</span>
    </footer>

    <!-- 项目详情 overlay -->
    <Transition name="mv-fade">
      <div v-if="activeProject" class="mv-overlay" @click.self="closeProject">
        <div class="mv-detail">
          <button class="mv-detail-close" @click="closeProject" aria-label="Close">✕</button>
          <div class="mv-detail-img" v-if="getImage(activeProject)">
            <img :src="getImage(activeProject)" :alt="getTitle(activeProject)" loading="lazy">
          </div>
          <span class="mv-detail-type mono" v-if="activeProject.type">{{ activeProject.type }}</span>
          <h3 class="mv-detail-title">{{ getTitle(activeProject) }}</h3>
          <p class="mv-detail-desc">{{ getDesc(activeProject) }}</p>
          <div class="mv-detail-techs" v-if="activeProject.technologies?.length">
            <span v-for="tech in activeProject.technologies" :key="tech" class="mv-tag">{{ tech }}</span>
          </div>
          <div class="mv-detail-actions">
            <a v-if="activeProject.link && activeProject.link !== '#'"
              :href="activeProject.link" target="_blank" rel="noopener" class="mv-btn-primary">
              {{ isChinese ? '访问项目 →' : 'Visit Project →' }}
            </a>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { t, isChinese, toggleLanguage } from '../composables/useI18n.js'
import { useContent } from '../composables/useContent.js'
import { skillCategories } from '../data/skills.js'
import { journeyMilestones } from '../data/journey.js'
import { projectShowcase as staticProjects } from '../data/projectShowcase.js'

// ── 静态数据 ──────────────────────────────────────────────────
const tagsZh = ['服装跟单', '客户沟通', '生产协调', 'Vue.js', 'Node.js', 'WPS脚本', '服务器部署']
const tagsEn = ['Garment Merchandising', 'Client Communication', 'Production Coordination', 'Vue.js', 'Node.js', 'WPS Scripting']

// ── CMS 数据 ──────────────────────────────────────────────────
const { data: cmsProjects } = useContent('projects')
const displayProjects = computed(() =>
  cmsProjects.value?.length ? cmsProjects.value : staticProjects
)

const getTitle = (proj) => {
  if (proj.title && typeof proj.title === 'object')
    return proj.title[isChinese.value ? 'zh' : 'en'] ?? proj.title.zh ?? ''
  if (typeof proj.title === 'string') return proj.title
  return isChinese.value ? (proj.title_zh ?? '') : (proj.title_en ?? '')
}
const getDesc = (proj) => {
  if (proj.description && typeof proj.description === 'object')
    return proj.description[isChinese.value ? 'zh' : 'en'] ?? proj.description.zh ?? ''
  if (typeof proj.description === 'string') return proj.description
  return isChinese.value ? (proj.description_zh ?? '') : (proj.description_en ?? '')
}
const getImage = (proj) => proj.image || proj.cover_image || proj.preview_gif || null

// ── Hero 分词 ─────────────────────────────────────────────────
const heroChunks    = computed(() => isChinese.value ? [...'罗洋洋'] : 'Luo Yangyang'.split(' '))
const heroSubChunks = computed(() => {
  const s = isChinese.value
    ? '服装跟单 · AI应用实践 · 流程自动化'
    : 'Garment Merchandising · AI Practitioner · Process Automation'
  return s.split(' ')
})
const heroIn    = ref(false)
const heroSubIn = ref(false)

// ── 项目详情 ──────────────────────────────────────────────────
const activeProject = ref(null)
const openProject   = (p) => { activeProject.value = p }
const closeProject  = () => { activeProject.value = null }

// ── DOM refs ──────────────────────────────────────────────────
const rootRef        = ref(null)
const headerRef      = ref(null)
const navRef         = ref(null)
const clockRef       = ref(null)
const scanRef        = ref(null)
const trailRef       = ref(null)
const progressRef    = ref(null)
const curDotRef      = ref(null)
const curRingRef     = ref(null)
const statsRef       = ref(null)
const particlesRef   = ref(null)
const l0Ref          = ref(null)
const l1Ref          = ref(null)
const l2Ref          = ref(null)
const aboutNumRef    = ref(null)
const skillsNumRef   = ref(null)
const journeyNumRef  = ref(null)
const projectsNumRef = ref(null)
const contactNumRef  = ref(null)

// ── 字体注入 ──────────────────────────────────────────────────
function injectFont() {
  if (document.querySelector('link[data-mv-font]')) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.dataset.mvFont = true
  link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@200;400;700;900&family=Space+Mono:wght@400;700&display=swap'
  document.head.appendChild(link)
}

// ── 扫描线 ────────────────────────────────────────────────────
function runScanLine() {
  const line = scanRef.value
  if (!line) return
  line.style.transition = 'none'
  line.style.top = '0'
  line.style.opacity = '1'
  void line.offsetWidth
  line.style.transition = 'top 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.15s 1s'
  line.style.top = '100vh'
  line.style.opacity = '0'
}

// ── 实时时钟 ──────────────────────────────────────────────────
let clockTimer = null
function startClock() {
  const update = () => {
    if (!clockRef.value) return
    const now = new Date()
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    const s = String(now.getSeconds()).padStart(2, '0')
    clockRef.value.textContent = `${h}:${m}:${s}`
  }
  update()
  clockTimer = setInterval(update, 1000)
}

const lerp = (a, b, t) => a + (b - a) * t

// ══ 粒子系统（融入视差 rAF）═════════════════════════════════
const particles = []
let pCanvas = null, pCtx = null

function initParticles() {
  pCanvas = particlesRef.value
  if (!pCanvas) return
  pCanvas.width  = window.innerWidth
  pCanvas.height = window.innerHeight
  pCtx = pCanvas.getContext('2d')

  for (let i = 0; i < 48; i++) {
    particles.push({
      x:     Math.random() * pCanvas.width,
      y:     Math.random() * pCanvas.height,
      vx:    (Math.random() - 0.5) * 0.18,
      vy:    (Math.random() - 0.5) * 0.18,
      r:     Math.random() * 1.1 + 0.25,
      maxA:  Math.random() * 0.13 + 0.02,
      speed: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2,
    })
  }
}

function drawParticles(now) {
  if (!pCtx || !pCanvas) return
  pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height)
  particles.forEach(p => {
    p.x = (p.x + p.vx + pCanvas.width)  % pCanvas.width
    p.y = (p.y + p.vy + pCanvas.height) % pCanvas.height
    const a = (Math.sin(now * p.speed + p.phase) * 0.5 + 0.5) * p.maxA
    pCtx.beginPath()
    pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    pCtx.fillStyle = `rgba(200,195,255,${a})`
    pCtx.fill()
  })
}

// ══ 视差引擎 + 环境动效 + 粒子（单一 rAF 循环）═══════════════
let lerpY = 0, targetY = 0, parallaxRaf = null, scrollListener = null
let frameCount = 0

function initParallax() {
  scrollListener = () => { targetY = window.scrollY }
  window.addEventListener('scroll', scrollListener, { passive: true })
  // 同时更新 --scroll 供 CSS 使用
  window.addEventListener('scroll', () => {
    const ms = document.documentElement.scrollHeight - window.innerHeight
    if (ms > 0) {
      document.documentElement.style.setProperty('--scroll', (window.scrollY / ms).toFixed(4))
    }
  }, { passive: true })

  function tick() {
    lerpY = lerp(lerpY, targetY, 0.08)
    const ms  = document.documentElement.scrollHeight - window.innerHeight
    const pct = ms > 0 ? Math.min(lerpY / ms, 1) : 0
    const now = performance.now() * 0.001

    // 关键修复：l1 / bg-num 有 CSS top:50%，JS 需合并 -50%
    if (l0Ref.value)          l0Ref.value.style.transform          = `translateY(${lerpY * 0.08}px)`
    if (l1Ref.value)          l1Ref.value.style.transform          = `translateY(calc(-50% + ${lerpY * 0.28}px))`
    if (l2Ref.value)          l2Ref.value.style.transform          = `translateY(${lerpY * 0.42}px)`
    if (aboutNumRef.value)    aboutNumRef.value.style.transform    = `translateY(calc(-50% + ${lerpY * 0.16}px))`
    if (skillsNumRef.value)   skillsNumRef.value.style.transform   = `translateY(calc(-50% + ${lerpY * 0.13}px))`
    if (journeyNumRef.value)  journeyNumRef.value.style.transform  = `translateY(calc(-50% + ${lerpY * 0.10}px))`
    if (projectsNumRef.value) projectsNumRef.value.style.transform = `translateY(calc(-50% + ${lerpY * 0.08}px))`
    if (contactNumRef.value)  contactNumRef.value.style.transform  = `translateY(calc(-50% + ${lerpY * 0.06}px))`

    // 滚动进度线
    if (progressRef.value && ms > 0)
      progressRef.value.style.transform = `scaleX(${pct})`

    // 环境光跟随滚动（CSS var → background-position）
    const glowY = 20 + pct * 62
    rootRef.value?.style.setProperty('--glow-y', `${glowY}%`)

    // 粒子绘制（隔帧，约 30fps）
    frameCount++
    if (frameCount % 2 === 0) drawParticles(now)

    parallaxRaf = requestAnimationFrame(tick)
  }
  tick()
}

// ══ 自定义光标（dot 即时 + ring lerp 0.12）══════════════════
let mx = 0, my = 0, rx = 0, ry = 0
let cursorRaf = null, cursorMoveHandler = null

function initCursor() {
  cursorMoveHandler = (e) => { mx = e.clientX; my = e.clientY }
  document.addEventListener('mousemove', cursorMoveHandler)

  function cursorTick() {
    const dot  = curDotRef.value
    const ring = curRingRef.value
    if (dot)  { dot.style.left = mx + 'px'; dot.style.top = my + 'px' }
    if (ring) {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
    }
    cursorRaf = requestAnimationFrame(cursorTick)
  }
  cursorTick()

  // 磁吸效果
  rootRef.value?.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => { el.style.transition = 'transform 0.1s ease' })
    el.addEventListener('mousemove', (e) => {
      const r  = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width  / 2)
      const dy = e.clientY - (r.top  + r.height / 2)
      el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`
    })
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
      el.style.transform  = 'translate(0,0)'
    })
  })
}

// ══ 光标拖尾 ════════════════════════════════════════════════
const pts = []
let trailRunning = false, trailRaf = null
let trailMouseHandler = null, particleResizeHandler = null

function initTrail() {
  const canvas = trailRef.value
  if (!canvas) return
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i]
      p.life -= 0.04
      if (p.life <= 0) { pts.splice(i, 1); continue }
      alive = true
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2.5 * p.life, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,45,0,${p.life * 0.5})`
      ctx.fill()
    }
    if (alive) trailRaf = requestAnimationFrame(draw)
    else       trailRunning = false
  }

  trailMouseHandler = (e) => {
    pts.push({ x: e.clientX, y: e.clientY, life: 1 })
    if (!trailRunning) { trailRunning = true; draw() }
  }
  particleResizeHandler = () => {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    if (pCanvas) { pCanvas.width = window.innerWidth; pCanvas.height = window.innerHeight }
  }
  window.addEventListener('mousemove', trailMouseHandler)
  window.addEventListener('resize',   particleResizeHandler)
}

// ── 项目卡片 3D 倾斜 ─────────────────────────────────────────
function initCardTilt() {
  rootRef.value?.querySelectorAll('.mv-proj-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s linear, border-color 0.4s'
    })
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 14
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 9
      card.style.transform = `perspective(1100px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(8px)`
    })
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.75s cubic-bezier(0.16,1,0.3,1), border-color 0.4s'
      card.style.transform  = ''
    })
  })
}

// ── 数字计数 ──────────────────────────────────────────────────
function runCounter(el, dur = 1100) {
  const target = parseFloat(el.dataset.target)
  const t0 = performance.now()
  const tick = (now) => {
    const p = Math.min((now - t0) / dur, 1)
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)))
    if (p < 1) requestAnimationFrame(tick)
    else       el.textContent = target
  }
  requestAnimationFrame(tick)
}

// ── IntersectionObserver ──────────────────────────────────────
let io = null, statsIo = null, imgIo = null, navIo = null

function initObservers() {
  // Section 内容动效
  io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return
      const type = target.dataset.reveal
      if (type === 'title') target.classList.add('mv-revealed')
      if (type === 'list')
        target.querySelectorAll('.list-item')
              .forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 72))
      io.unobserve(target)
    })
  }, { threshold: 0.1 })
  rootRef.value?.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))

  // Hero 数字计数
  if (statsRef.value) {
    statsIo = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return
        target.querySelectorAll('.mv-counter').forEach(c => runCounter(c, 1200))
        statsIo.unobserve(target)
      })
    }, { threshold: 0.5 })
    statsIo.observe(statsRef.value)
  }

  // 项目卡片幕布揭示（data-delay 错落）
  imgIo = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return
      const delay = parseInt(target.dataset.delay ?? '0')
      setTimeout(() => target.classList.add('img-revealed'), delay)
      imgIo.unobserve(target)
    })
  }, { threshold: 0.08 })
  rootRef.value?.querySelectorAll('.mv-img-reveal').forEach(el => imgIo.observe(el))

  // 导航高亮（当前区块）
  navIo = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return
      const id = target.id
      navRef.value?.querySelectorAll('.mv-nav-link').forEach(link => {
        link.classList.toggle('mv-nav-active', link.dataset.sec === id)
      })
    })
  }, { threshold: 0.35, rootMargin: '-60px 0px -40% 0px' })
  rootRef.value?.querySelectorAll('section[id]').forEach(s => navIo.observe(s))
}

// ── 生命周期 ──────────────────────────────────────────────────
onMounted(async () => {
  injectFont()
  startClock()
  setTimeout(runScanLine, 400)
  initParallax()
  initCursor()
  initTrail()
  initParticles()
  setTimeout(() => { heroIn.value    = true }, 150)
  setTimeout(() => { heroSubIn.value = true }, 350)
  await nextTick()
  initObservers()
  initCardTilt()
})

onUnmounted(() => {
  cancelAnimationFrame(parallaxRaf)
  cancelAnimationFrame(cursorRaf)
  cancelAnimationFrame(trailRaf)
  clearInterval(clockTimer)
  if (scrollListener)          window.removeEventListener('scroll',     scrollListener)
  if (cursorMoveHandler)       document.removeEventListener('mousemove', cursorMoveHandler)
  if (trailMouseHandler)       window.removeEventListener('mousemove',  trailMouseHandler)
  if (particleResizeHandler)   window.removeEventListener('resize',     particleResizeHandler)
  io?.disconnect()
  statsIo?.disconnect()
  imgIo?.disconnect()
  navIo?.disconnect()
  pts.length = 0
  particles.length = 0
  pCtx = null
  pCanvas = null
})
</script>

<style scoped>
/* ── Design tokens ───────────────────────────────────────────── */
.mv {
  --mv-bg:    #080810;
  --mv-fg:    #e8e8e6;
  --mv-fg2:   #505050;
  --mv-fg3:   #141420;
  --mv-line:  #1c1c28;
  --mv-accent:#ff2d00;
  --mv-ease:  cubic-bezier(0.16, 1, 0.3, 1);
  --glow-y:   22%;

  font-family: 'Space Grotesk', -apple-system, 'PingFang SC', sans-serif;
  background: var(--mv-bg);
  color: var(--mv-fg);
  min-height: 100vh;
  overflow-x: hidden;
  cursor: none;
}
.mono { font-family: 'Space Mono', 'Menlo', monospace; }

/* ══ 持续环境层 ════════════════════════════════════════════════ */

/* 1. 胶片颗粒感（CSS，永远在动）*/
.mv-grain {
  position: fixed; inset: 0; z-index: 9992; pointer-events: none;
  opacity: 0.042;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  animation: grain 0.55s steps(3) infinite;
}
@keyframes grain {
  0%   { background-position:    0px   0px }
  11%  { background-position:  -32px -52px }
  22%  { background-position:   48px  18px }
  33%  { background-position:  -16px  72px }
  44%  { background-position:   72px -36px }
  55%  { background-position:  -56px  24px }
  66%  { background-position:   28px  56px }
  77%  { background-position:  -72px -16px }
  88%  { background-position:   16px -48px }
}

/* 2. 环境光球（JS-driven --glow-y，跟随滚动）*/
.mv-ambient {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(ellipse 85vw 55vh at 50% var(--glow-y, 22%),
      rgba(30, 20, 60, 0.6) 0%, transparent 70%),
    radial-gradient(ellipse 40vw 30vh at 80% 10%,
      rgba(0, 10, 40, 0.3) 0%, transparent 70%);
}

/* 3. 粒子画布（JS 绘制，全屏浮动）*/
.mv-particles {
  position: fixed; inset: 0; z-index: 2; pointer-events: none;
}

/* ── 扫描线 / 拖尾 / 进度线 / 光标 ────────────────────────── */
.mv-scan {
  position: fixed; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--mv-accent) 40%, transparent);
  top: 0; opacity: 0; pointer-events: none; z-index: 9999;
}
.mv-trail {
  position: fixed; inset: 0; pointer-events: none; z-index: 9998;
}
.mv-progress {
  position: fixed; top: 0; left: 0; width: 100%; height: 2px;
  background: linear-gradient(90deg, var(--mv-accent), rgba(255,45,0,0.3));
  transform: scaleX(0); transform-origin: left;
  pointer-events: none; z-index: 201; will-change: transform;
}
.mv-cur-dot {
  position: fixed; width: 5px; height: 5px;
  background: var(--mv-fg); border-radius: 50%;
  transform: translate(-50%, -50%); pointer-events: none; z-index: 9997;
}
.mv-cur-ring {
  position: fixed; width: 30px; height: 30px;
  border: 1px solid rgba(232,232,230,0.25); border-radius: 50%;
  transform: translate(-50%, -50%); pointer-events: none; z-index: 9996;
  transition: width 0.3s var(--mv-ease), height 0.3s var(--mv-ease);
}

/* ── 导航 ───────────────────────────────────────────────────── */
.mv-header {
  position: fixed; top: 0; left: 0; right: 0; height: 58px;
  display: flex; align-items: center;
  padding: 0 clamp(20px, 5vw, 64px); gap: 20px;
  background: rgba(8, 8, 16, 0.9);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--mv-line);
  z-index: 200;
  animation: header-in 0.7s var(--mv-ease) 50ms both;
}
@keyframes header-in { from { transform: translateY(-100%); opacity: 0 } }

.mv-brand {
  font-size: 0.78rem; letter-spacing: 0.06em;
  color: var(--mv-fg); text-decoration: none; white-space: nowrap;
}
.mv-nav { display: flex; gap: 28px; flex: 1; justify-content: center; }
.mv-nav-link {
  font-size: 0.61rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--mv-fg2); text-decoration: none;
  position: relative; padding-bottom: 3px;
  transition: color 0.25s;
}
.mv-nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 0; height: 1px; background: var(--mv-fg);
  transition: width 0.35s var(--mv-ease);
}
.mv-nav-link:hover      { color: var(--mv-fg); }
.mv-nav-link:hover::after { width: 100%; }
.mv-nav-link.mv-nav-active { color: var(--mv-fg); }
.mv-nav-link.mv-nav-active::after { width: 100%; background: var(--mv-accent); }

.mv-header-r { display: flex; align-items: center; gap: 16px; }
.mv-clock {
  font-size: 0.6rem; letter-spacing: 0.1em; color: var(--mv-fg2);
  animation: fade-up 0.65s var(--mv-ease) 0.3s both;
}
.mv-lang-btn {
  background: none; border: 1px solid var(--mv-line);
  color: var(--mv-fg2); font-size: 0.61rem; letter-spacing: 0.1em;
  padding: 5px 10px; border-radius: 2px; cursor: none;
  transition: border-color 0.2s, color 0.2s;
}
.mv-lang-btn:hover { border-color: var(--mv-fg2); color: var(--mv-fg); }

/* ── 文字劈入 ───────────────────────────────────────────────── */
.rv-outer { display: inline-block; overflow: hidden; vertical-align: bottom; }
.rv-inner {
  display: block; transform: translateY(110%);
  transition: transform 0.78s var(--mv-ease);
  transition-delay: calc(var(--ri, 0) * 85ms);
}
.rv-inner.rv-in { transform: translateY(0); }

/* Section title 入场 */
.mv-sec-title {
  font-size: clamp(2.4rem, 5.5vw, 5rem);
  font-weight: 900; letter-spacing: -0.04em; line-height: 0.92; margin: 0;
  transform: translateY(44px); opacity: 0;
  transition: transform 0.82s var(--mv-ease), opacity 0.82s var(--mv-ease);
}
.mv-sec-title.mv-revealed { transform: translateY(0); opacity: 1; }

/* 列表错落 */
.list-item {
  transform: translateY(30px); opacity: 0;
  transition: transform 0.7s var(--mv-ease), opacity 0.7s var(--mv-ease);
}
.list-item.in { transform: translateY(0); opacity: 1; }

/* ── 通用布局 ───────────────────────────────────────────────── */
.mv-container {
  max-width: 1120px; margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
  position: relative; z-index: 2;
}
.mv-section {
  position: relative;
  padding: clamp(80px, 12vw, 140px) 0;
  overflow: hidden;
}

/* 每个 section 左侧颜色竖条（视觉区分） */
.mv-section::before {
  content: '';
  position: absolute; left: 0; top: 20%; bottom: 20%; width: 2px;
  background: var(--sec-line, transparent);
  border-radius: 2px; z-index: 1;
}
.mv-about   { --sec-line: rgba(64, 120, 255, 0.35); }
.mv-skills  { --sec-line: rgba(0,  200, 100, 0.28); }
.mv-journey { --sec-line: rgba(255,160,  0, 0.28); }
.mv-projects{ --sec-line: rgba(180,  0, 255, 0.28); }
.mv-contact { --sec-line: rgba(255, 45,  0, 0.35); }

.mv-sec-hd { margin-bottom: clamp(40px, 6vw, 64px); }
.mv-sec-tag {
  display: block; font-size: 0.6rem; letter-spacing: 0.14em;
  color: var(--mv-fg2); text-transform: uppercase; margin-bottom: 18px;
}

/* 背景大数字（JS控制 translateY(calc(-50%+Xpx))，CSS不设 transform）*/
.mv-bg-num {
  position: absolute; right: clamp(0px, 3vw, 40px); top: 50%;
  font-size: clamp(5rem, 17vw, 21rem);
  font-weight: 900; letter-spacing: -0.06em; line-height: 1;
  pointer-events: none; user-select: none;
  will-change: transform; z-index: 0;
}
.mv-bg-num--a { color: rgba(64, 120, 255, 0.07); animation: num-breathe 5.0s ease-in-out infinite; }
.mv-bg-num--b { color: rgba(0,  200, 100, 0.06); animation: num-breathe 6.2s ease-in-out 0.8s infinite; }
.mv-bg-num--c { color: rgba(255,160,  0, 0.06); animation: num-breathe 5.6s ease-in-out 1.4s infinite; }
.mv-bg-num--d { color: rgba(180,  0, 255, 0.06); animation: num-breathe 7.0s ease-in-out 0.4s infinite; }
.mv-bg-num--e { color: rgba(255, 45,  0, 0.07); animation: num-breathe 4.8s ease-in-out 1.0s infinite; }
@keyframes num-breathe {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1.0; }
}

/* ── 按钮 ───────────────────────────────────────────────────── */
.mv-btn-primary {
  display: inline-flex; align-items: center;
  background: var(--mv-fg); color: var(--mv-bg);
  padding: 13px 26px; font-size: 0.85rem; font-weight: 700;
  letter-spacing: 0.02em; text-decoration: none; border: none;
  cursor: none; transition: opacity 0.2s;
}
.mv-btn-primary:hover { opacity: 0.86; }
.mv-btn-outline {
  display: inline-flex; align-items: center;
  background: none; color: var(--mv-fg);
  padding: 13px 26px; font-size: 0.85rem; font-weight: 400;
  letter-spacing: 0.02em; text-decoration: none;
  border: 1px solid var(--mv-line); cursor: none;
  transition: border-color 0.2s;
}
.mv-btn-outline:hover { border-color: var(--mv-fg2); }

/* ── tags ───────────────────────────────────────────────────── */
.mv-tag {
  background: rgba(255,255,255,0.04); color: var(--mv-fg2);
  padding: 6px 12px; font-size: 0.72rem; letter-spacing: 0.04em;
  border: 1px solid var(--mv-line);
  transition: border-color 0.2s, color 0.2s;
}
.mv-tag:hover { border-color: #2e2e3c; color: var(--mv-fg); }

@keyframes fade-up { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }

/* ═════════════════════ HERO ════════════════════════════════ */
.mv-hero {
  min-height: 100vh; display: flex; flex-direction: column;
  justify-content: center;
  padding: 100px clamp(20px, 5vw, 64px) 0;
  position: relative; overflow: hidden;
}

/* L0 网格 */
.mv-l0 {
  position: absolute; inset: -30%; z-index: 0;
  background-image:
    linear-gradient(var(--mv-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--mv-line) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0; will-change: transform;
  animation: grid-in 1.4s var(--mv-ease) 0.1s both;
}
@keyframes grid-in { from { opacity: 0 } to { opacity: 0.45 } }

/* L1 幽灵大字 */
.mv-l1 {
  position: absolute; right: -1%; top: 50%;
  font-size: clamp(5rem, 18vw, 22rem);
  font-weight: 900; letter-spacing: -0.06em; line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(232,232,230,0.06);
  pointer-events: none; user-select: none; will-change: transform;
}

/* L2 装饰线 */
.mv-l2 {
  position: absolute; inset: 0; z-index: 1;
  pointer-events: none; will-change: transform;
}
.mv-deco-h {
  position: absolute; left: 0; right: 0;
  top: 38%; height: 1px; background: var(--mv-line);
}
.mv-deco-v {
  position: absolute; top: 0; bottom: 0;
  left: 55%; width: 1px; background: var(--mv-line);
}

.mv-hero-inner {
  position: relative; z-index: 3;
  max-width: 1120px; margin: 0 auto; width: 100%;
}
.mv-eyebrow {
  display: block; font-size: 0.6rem; letter-spacing: 0.16em;
  color: var(--mv-fg2); text-transform: uppercase; margin-bottom: 28px;
  animation: fade-up 0.65s var(--mv-ease) both;
}
.mv-hero-title {
  font-size: clamp(4rem, 12vw, 11rem);
  font-weight: 900; line-height: 0.88; letter-spacing: -0.04em;
  margin: 0 0 28px;
  display: flex; flex-wrap: wrap; align-items: flex-end;
}
.mv-hero-sub {
  font-size: clamp(0.88rem, 1.8vw, 1.1rem);
  color: var(--mv-fg2); margin: 0 0 52px; line-height: 1.65;
  display: flex; flex-wrap: wrap;
}

/* 统计数字 */
.mv-stats {
  display: flex; align-items: stretch;
  margin-bottom: 48px; flex-wrap: wrap;
}
.mv-stat { padding: 0 40px 0 0; }
.mv-stat:first-child { padding-left: 0; }
.mv-stat:last-child  { padding-right: 0; }
.mv-stat-sep { width: 1px; background: var(--mv-line); margin-right: 40px; }
.mv-stat-val {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 900; letter-spacing: -0.04em; line-height: 1; margin-bottom: 6px;
}
.mv-stat-u   { font-size: 0.65em; font-weight: 400; opacity: 0.55; }
.mv-stat-lbl { display: block; font-size: 0.58rem; letter-spacing: 0.1em; color: var(--mv-fg2); text-transform: uppercase; }

.mv-cta { display: flex; gap: 12px; flex-wrap: wrap; }

/* 跑马灯 */
.mv-ticker {
  position: relative; overflow: hidden;
  border-top: 1px solid var(--mv-line);
  padding: 14px 0; margin-top: 64px; z-index: 3;
  background: rgba(8,8,16,0.4);
}
.mv-ticker-track {
  display: flex; white-space: nowrap;
  animation: ticker-scroll 38s linear infinite;
  will-change: transform;
}
.mv-ticker-item { font-size: 0.6rem; letter-spacing: 0.14em; color: var(--mv-fg2); }
@keyframes ticker-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }

/* Scroll cue */
.mv-scroll-cue {
  position: absolute; bottom: 40px; left: clamp(20px, 5vw, 64px);
  display: flex; flex-direction: column; align-items: flex-start; gap: 10px; z-index: 3;
}
.mv-scroll-cue span { font-size: 0.56rem; letter-spacing: 0.18em; color: var(--mv-fg2); }
.mv-scroll-line {
  width: 1px; height: 52px;
  background: linear-gradient(to bottom, var(--mv-fg2), transparent);
  animation: scroll-pulse 2.4s ease-in-out infinite;
  transform-origin: top;
}
@keyframes scroll-pulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50%       { opacity: 0.9; transform: scaleY(0.5); }
}

/* ═════════════════════ ABOUT ═══════════════════════════════ */
.mv-about { background: var(--mv-bg); }
.mv-about-text {
  font-size: clamp(0.92rem, 1.4vw, 1.06rem);
  line-height: 1.86; color: var(--mv-fg2); max-width: 740px; margin: 0 0 28px;
}
.mv-tag-row { display: flex; flex-wrap: wrap; gap: 8px; }

/* ═════════════════════ SKILLS ══════════════════════════════ */
.mv-skills { background: linear-gradient(180deg, var(--mv-bg) 0%, #090912 100%); }
.mv-skills-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: clamp(20px, 3vw, 36px);
}
.mv-skill-cat { border-top: 1px solid var(--mv-line); padding-top: 22px; }
.mv-skill-cat-hd {
  font-size: 0.66rem; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--mv-fg2); margin: 0 0 18px;
}
.mv-skill-rows { display: flex; flex-direction: column; gap: 10px; }
.mv-skill-row {
  display: flex; justify-content: space-between; align-items: baseline; gap: 8px;
  border-bottom: 1px solid var(--mv-line); padding-bottom: 10px;
  transition: border-color 0.2s;
}
.mv-skill-row:hover { border-color: rgba(0,200,100,0.3); }
.mv-skill-rows .mv-skill-row:last-child { border-bottom: none; padding-bottom: 0; }
.mv-skill-name { font-size: 0.9rem; color: var(--mv-fg); }
.mv-skill-hl   { font-size: 0.6rem; letter-spacing: 0.04em; color: var(--mv-fg2); text-align: right; flex-shrink: 0; }

/* ═════════════════════ JOURNEY ═════════════════════════════ */
.mv-journey { background: var(--mv-bg); }
.mv-timeline { display: flex; flex-direction: column; }
.mv-tl-item {
  display: grid; grid-template-columns: 96px 1fr; gap: 28px;
  padding: 28px 0; border-top: 1px solid var(--mv-line);
  transition: background 0.2s;
}
.mv-tl-item:hover { background: rgba(255,160,0,0.02); }
.mv-tl-item:last-child { border-bottom: 1px solid var(--mv-line); }
.mv-tl-left  { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding-top: 3px; }
.mv-tl-year  { font-size: 0.66rem; letter-spacing: 0.08em; color: var(--mv-fg2); white-space: nowrap; }
.mv-tl-live .mv-tl-year { color: var(--mv-accent); }
.mv-tl-vline { width: 1px; flex: 1; background: var(--mv-line); min-height: 16px; }
.mv-tl-live .mv-tl-vline { background: var(--mv-accent); opacity: 0.4; }
.mv-tl-title { font-size: clamp(1rem, 1.8vw, 1.2rem); font-weight: 700; margin: 0 0 8px; }
.mv-tl-desc  { font-size: 0.86rem; line-height: 1.74; color: var(--mv-fg2); margin: 0; }

/* ═════════════════════ PROJECTS ════════════════════════════ */
.mv-projects { background: linear-gradient(180deg, #090912 0%, var(--mv-bg) 100%); }

/* 2列，首/尾全宽 */
.mv-proj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.mv-proj-card--wide { grid-column: 1 / -1; }

.mv-proj-card {
  position: relative; overflow: hidden;
  cursor: none;
  border: 1px solid transparent;
  transition: border-color 0.4s var(--mv-ease);
  will-change: transform;
}
.mv-proj-card:hover { border-color: rgba(232,232,230,0.1); }

/* 全图帧 */
.mv-proj-frame {
  position: relative;
  padding-top: 62%;
  overflow: hidden;
  background: var(--mv-fg3);
}
.mv-proj-card--wide .mv-proj-frame { padding-top: 38%; }

/* 图片 */
.mv-proj-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.7s var(--mv-ease);
  will-change: transform;
}
.mv-proj-card:hover .mv-proj-img { transform: scale(1.05); }

/* 占位符 */
.mv-proj-img-ph {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: clamp(3rem, 8vw, 7rem); font-weight: 900;
  color: rgba(232,232,230,0.04);
}

/* 幕布揭示 */
.mv-proj-curtain {
  position: absolute; inset: 0; z-index: 3;
  background: var(--mv-fg3);
  transform-origin: bottom;
  transform: scaleY(1);
  transition: transform 0.95s var(--mv-ease);
  will-change: transform;
}
.mv-img-reveal.img-revealed .mv-proj-curtain { transform: scaleY(0); }

/* 序号角标 */
.mv-proj-idx {
  position: absolute; top: 14px; left: 16px; z-index: 4;
  font-size: 0.58rem; letter-spacing: 0.14em;
  color: rgba(232,232,230,0.3);
}

/* 类型标签 */
.mv-proj-type-badge {
  position: absolute; top: 14px; right: 16px; z-index: 4;
  font-size: 0.54rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(232,232,230,0.35);
  border: 1px solid rgba(232,232,230,0.12);
  padding: 3px 8px;
  background: rgba(8,8,16,0.6);
}

/* 常显底部渐变 */
.mv-proj-foot {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 4;
  padding: clamp(40px, 5vw, 70px) 20px 20px;
  background: linear-gradient(to top, rgba(6,6,14,0.96) 0%, rgba(6,6,14,0.5) 55%, transparent 100%);
  transition: opacity 0.4s var(--mv-ease);
}
.mv-proj-card:hover .mv-proj-foot { opacity: 0; }

.mv-proj-name {
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 700; color: var(--mv-fg); margin: 0 0 9px;
}
.mv-proj-techs { display: flex; gap: 6px; flex-wrap: wrap; }
.mv-tech {
  font-size: 0.56rem; letter-spacing: 0.06em;
  color: rgba(232,232,230,0.45);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 3px 8px;
}

/* 悬停面板（从底部滑入）*/
.mv-proj-panel {
  position: absolute; inset: 0; z-index: 5;
  background: rgba(6,6,14,0.93);
  padding: 28px;
  display: flex; flex-direction: column; justify-content: flex-end; gap: 18px;
  transform: translateY(101%);
  transition: transform 0.55s var(--mv-ease);
  will-change: transform;
}
.mv-proj-card:hover .mv-proj-panel { transform: translateY(0); }

.mv-proj-desc {
  font-size: 0.82rem; line-height: 1.72; color: var(--mv-fg2); margin: 0;
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 5; overflow: hidden;
}
.mv-proj-panel-ft { display: flex; align-items: center; justify-content: space-between; }
.mv-proj-cta {
  font-size: 0.66rem; letter-spacing: 0.1em; color: var(--mv-fg);
  border-bottom: 1px solid rgba(232,232,230,0.2); padding-bottom: 2px;
  transition: border-color 0.25s;
}
.mv-proj-card:hover .mv-proj-cta { border-color: var(--mv-fg); }
.mv-proj-status {
  font-size: 0.54rem; letter-spacing: 0.1em; color: var(--mv-fg2);
}

/* 悬停微发光描边 */
.mv-proj-glow {
  position: absolute; inset: 0; z-index: 6; pointer-events: none;
  box-shadow: inset 0 0 0 0px rgba(180,0,255,0);
  transition: box-shadow 0.4s var(--mv-ease);
}
.mv-proj-card:hover .mv-proj-glow {
  box-shadow: inset 0 0 0 1px rgba(180,0,255,0.25);
}

/* ═════════════════════ CONTACT ═════════════════════════════ */
.mv-contact { background: var(--mv-bg); }
.mv-contact-sub { font-size: 0.86rem; color: var(--mv-fg2); margin: -32px 0 44px; }
.mv-contact-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  border-top: 1px solid var(--mv-line);
}
.mv-ci {
  border-right: 1px solid var(--mv-line); border-bottom: 1px solid var(--mv-line);
  padding: 24px; text-decoration: none;
  display: flex; flex-direction: column; gap: 8px;
  transition: background 0.25s, border-color 0.25s;
  position: relative; overflow: hidden;
}
.mv-ci::after {
  content: '';
  position: absolute; bottom: 0; left: 0; width: 0; height: 1px;
  background: var(--mv-accent);
  transition: width 0.4s var(--mv-ease);
}
.mv-ci:hover { background: rgba(255,45,0,0.03); }
.mv-ci:hover::after { width: 100%; }
.mv-ci-lbl   { font-size: 0.58rem; letter-spacing: 0.14em; color: var(--mv-fg2); text-transform: uppercase; }
.mv-ci-val   { font-size: 0.92rem; color: var(--mv-fg); word-break: break-all; }
.mv-ci-arrow { font-size: 0.72rem; color: var(--mv-fg2); transition: transform 0.2s, color 0.2s; margin-top: auto; }
.mv-ci:hover .mv-ci-arrow { transform: translateX(4px); color: var(--mv-accent); }
.mv-contact-cta { margin-top: 40px; }

/* ── Footer ──────────────────────────────────────────────────── */
.mv-footer {
  border-top: 1px solid var(--mv-line);
  padding: 28px clamp(20px, 5vw, 64px);
  display: flex; align-items: center; gap: 16px;
}
.mv-ft-copy, .mv-ft-tag { font-size: 0.66rem; letter-spacing: 0.06em; color: var(--mv-fg2); }
.mv-ft-dot { color: var(--mv-accent); font-size: 0.72rem; animation: dot-pulse 3s ease-in-out infinite; }
@keyframes dot-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

/* ── Overlay ─────────────────────────────────────────────────── */
.mv-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.92);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  z-index: 600; display: flex; align-items: center; justify-content: center; padding: 20px;
}
.mv-detail {
  background: #0c0c16; border: 1px solid var(--mv-line);
  max-width: 600px; width: 100%; max-height: 88vh; overflow-y: auto;
  padding: 32px; position: relative;
}
.mv-detail-close {
  position: absolute; top: 16px; right: 16px;
  background: none; border: none; color: var(--mv-fg2);
  font-size: 1rem; cursor: none; padding: 4px 8px; transition: color 0.2s;
}
.mv-detail-close:hover { color: var(--mv-fg); }
.mv-detail-img { margin-bottom: 22px; overflow: hidden; }
.mv-detail-img img { width: 100%; height: 220px; object-fit: cover; }
.mv-detail-type  { display: inline-block; font-size: 0.58rem; letter-spacing: 0.1em; color: var(--mv-fg2); margin-bottom: 10px; }
.mv-detail-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 12px; }
.mv-detail-desc  { font-size: 0.88rem; line-height: 1.74; color: var(--mv-fg2); margin: 0 0 20px; }
.mv-detail-techs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.mv-detail-actions { display: flex; gap: 12px; }

/* ── Transitions ─────────────────────────────────────────────── */
.mv-fade-enter-active, .mv-fade-leave-active { transition: opacity 0.3s var(--mv-ease); }
.mv-fade-enter-from,  .mv-fade-leave-to      { opacity: 0; }

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .mv-nav, .mv-clock { display: none; }
  .mv-hero    { padding: 88px 20px 0; }
  .mv-stats   { gap: 20px; flex-wrap: wrap; }
  .mv-stat-sep { display: none; }
  .mv-stat    { padding: 0; }
  .mv-proj-grid { grid-template-columns: 1fr; }
  .mv-proj-card--wide { grid-column: auto; }
  .mv-proj-frame, .mv-proj-card--wide .mv-proj-frame { padding-top: 58%; }
  .mv-tl-item     { grid-template-columns: 68px 1fr; gap: 16px; }
  .mv-skills-grid { grid-template-columns: 1fr 1fr; }
  .mv-contact-grid { grid-template-columns: 1fr 1fr; }
  .mv-bg-num  { font-size: 5rem; }
  .mv-cur-dot, .mv-cur-ring { display: none; }
  .mv { cursor: auto; }
  .mv-btn-primary, .mv-btn-outline, .mv-lang-btn,
  .mv-proj-card, .mv-detail-close { cursor: auto; }
  .mv-ticker  { margin-top: 48px; }
  .mv-section::before { display: none; }
}
@media (max-width: 480px) {
  .mv-hero-title  { font-size: clamp(3rem, 15vw, 5rem); }
  .mv-stats       { flex-direction: column; gap: 14px; }
  .mv-skills-grid { grid-template-columns: 1fr; }
  .mv-contact-grid { grid-template-columns: 1fr; }
  .mv-tl-item     { grid-template-columns: 54px 1fr; gap: 12px; }
  .mv-bg-num      { font-size: 4rem; }
}

/* ── 减少动效降级 ────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .rv-inner, .mv-sec-title, .list-item {
    transform: none !important; opacity: 1 !important; transition: none !important;
  }
  .mv-proj-curtain { transform: scaleY(0) !important; transition: none !important; }
  .mv-proj-panel   { transform: translateY(0) !important; transition: none !important; }
  .mv-scroll-line, .mv-l0, .mv-ticker-track, .mv-header,
  .mv-eyebrow, .mv-grain, .mv-ft-dot, .mv-bg-num { animation: none !important; }
  .mv-grain { opacity: 0; }
}
</style>
