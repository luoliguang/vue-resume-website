<template>
  <div class="mv" ref="rootRef">

    <!-- ── 系统层 ── -->
    <div class="mv-scan"       ref="scanRef"       aria-hidden="true"></div>
    <canvas class="mv-trail"   ref="trailRef"      aria-hidden="true"></canvas>
    <!-- 滚动进度线 -->
    <div class="mv-progress"   ref="progressRef"   aria-hidden="true"></div>
    <!-- 自定义光标 -->
    <div class="mv-cur-dot"    ref="curDotRef"     aria-hidden="true"></div>
    <div class="mv-cur-ring"   ref="curRingRef"    aria-hidden="true"></div>

    <!-- ── 导航 ── -->
    <header class="mv-header">
      <a href="#home" class="mv-brand mono">罗洋洋 · giluoo</a>
      <nav class="mv-nav">
        <a href="#about"    class="mv-nav-link mono">{{ t('nav.about') }}</a>
        <a href="#skills"   class="mv-nav-link mono">{{ t('nav.skills') }}</a>
        <a href="#journey"  class="mv-nav-link mono">{{ t('nav.journey') }}</a>
        <a href="#projects" class="mv-nav-link mono">{{ t('nav.projects') }}</a>
        <a href="#contact"  class="mv-nav-link mono">{{ t('nav.contact') }}</a>
      </nav>
      <button class="mv-lang-btn mono magnetic" @click="toggleLanguage"
              :aria-label="isChinese ? 'Switch to English' : '切换中文'">
        {{ isChinese ? 'EN' : '中' }}
      </button>
    </header>

    <!-- ══════════ HERO ══════════ -->
    <section id="home" class="mv-hero">
      <!-- L0 · 背景网格 · speed ×0.10 -->
      <div class="mv-l0" ref="l0Ref" aria-hidden="true"></div>
      <!-- L1 · 幽灵大字 · speed ×0.30 -->
      <div class="mv-l1" ref="l1Ref" aria-hidden="true">
        {{ isChinese ? '罗洋洋' : 'LLG' }}
      </div>
      <!-- L2 · 装饰线 · speed ×0.45 -->
      <div class="mv-l2" ref="l2Ref" aria-hidden="true">
        <div class="mv-deco-h"></div>
        <div class="mv-deco-v"></div>
      </div>

      <div class="mv-hero-inner">
        <span class="mv-eyebrow mono">
          {{ isChinese ? '服装行业 · 全栈开发 · AI应用实践' : 'Fashion Industry · Full Stack Dev · AI Practitioner' }}
        </span>

        <!-- 文字劈入 -->
        <h1 class="mv-hero-title" aria-label="罗洋洋">
          <span
            v-for="(c, i) in heroChunks" :key="`h${c}${i}`"
            class="rv-outer"
            :style="{ '--ri': i, marginRight: isChinese ? '0.04em' : '0.2em' }"
          ><span class="rv-inner" :class="{ 'rv-in': heroIn }">{{ c }}</span></span>
        </h1>

        <p class="mv-hero-sub">
          <span
            v-for="(w, i) in heroSubChunks" :key="`s${w}${i}`"
            class="rv-outer"
            :style="{ '--ri': i, marginRight: '0.2em' }"
          ><span class="rv-inner" :class="{ 'rv-in': heroSubIn }">{{ w }}</span></span>
        </p>

        <!-- 数字滚动统计 -->
        <div class="mv-stats" ref="statsRef">
          <div class="mv-stat">
            <div class="mv-stat-val">
              <span class="mv-counter" data-target="2">0</span><span class="mv-stat-u">yr+</span>
            </div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '跟单经验' : 'Merchandising' }}</span>
          </div>
          <div class="mv-stat-sep"></div>
          <div class="mv-stat">
            <div class="mv-stat-val">
              <span class="mv-counter" data-target="200">0</span><span class="mv-stat-u">+</span>
            </div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '服务客户' : 'Clients' }}</span>
          </div>
          <div class="mv-stat-sep"></div>
          <div class="mv-stat">
            <div class="mv-stat-val">
              ↓<span class="mv-counter" data-target="15">0</span><span class="mv-stat-u">%</span>
            </div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '降低返工率' : 'Rework cut' }}</span>
          </div>
          <div class="mv-stat-sep"></div>
          <div class="mv-stat">
            <div class="mv-stat-val">
              <span class="mv-counter" data-target="3">0</span>
            </div>
            <span class="mv-stat-lbl mono">{{ isChinese ? '自研工具' : 'Tools built' }}</span>
          </div>
        </div>

        <div class="mv-cta">
          <a href="#about"    class="mv-btn-primary magnetic">{{ t('hero.cta') }}</a>
          <a href="#projects" class="mv-btn-outline magnetic">{{ t('hero.cta2') }}</a>
          <a href="/api/uploads/resume.pdf" download target="_blank" class="mv-btn-outline magnetic">{{ t('hero.cta4') }}</a>
        </div>
      </div>

      <div class="mv-scroll-cue" aria-hidden="true">
        <span class="mono">SCROLL</span>
        <div class="mv-scroll-line"></div>
      </div>
    </section>

    <!-- ══════════ ABOUT ══════════ -->
    <section id="about" class="mv-section mv-about">
      <div class="mv-bg-num" ref="aboutNumRef" aria-hidden="true">01</div>
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
      <div class="mv-bg-num" ref="skillsNumRef" aria-hidden="true">02</div>
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
      <div class="mv-bg-num" ref="journeyNumRef" aria-hidden="true">03</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.journey') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">{{ isChinese ? '我的历程' : 'My Journey' }}</h2>
        </header>
        <div class="mv-timeline" data-reveal="list">
          <div
            v-for="item in journeyMilestones" :key="item.id"
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

    <!-- ══════════ PROJECTS ══════════ -->
    <section id="projects" class="mv-section mv-projects">
      <div class="mv-bg-num" ref="projectsNumRef" aria-hidden="true">04</div>
      <div class="mv-container">
        <header class="mv-sec-hd">
          <span class="mv-sec-tag mono">{{ t('nav.projects') }}</span>
          <h2 class="mv-sec-title" data-reveal="title">{{ isChinese ? '项目展示' : 'Projects' }}</h2>
        </header>

        <!-- 图片卡片网格 -->
        <div class="mv-proj-grid" data-reveal="list">
          <div
            v-for="(proj, i) in displayProjects" :key="proj.id ?? i"
            class="mv-proj-card list-item"
            @click="openProject(proj)"
            role="button" tabindex="0"
            @keydown.enter="openProject(proj)"
          >
            <!-- 图片区 · clip-path 揭示 -->
            <div class="mv-proj-img-wrap mv-img-reveal">
              <img
                v-if="getImage(proj)"
                :src="getImage(proj)"
                :alt="getTitle(proj)"
                class="mv-proj-img"
                loading="lazy"
              >
              <div v-else class="mv-proj-img-ph">
                <span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>
              </div>
              <!-- 悬停遮罩 -->
              <div class="mv-proj-hover-mask">
                <span class="mv-proj-cta mono">{{ isChinese ? '查看详情 →' : 'View Project →' }}</span>
              </div>
            </div>

            <!-- 文字区 -->
            <div class="mv-proj-body">
              <div class="mv-proj-meta">
                <span class="mv-proj-num mono">{{ String(i + 1).padStart(2, '0') }}</span>
                <span
                  v-if="proj.type || proj.category"
                  class="mv-proj-cat mono"
                >{{ proj.type ?? proj.category }}</span>
              </div>
              <h3 class="mv-proj-name">{{ getTitle(proj) }}</h3>
              <p class="mv-proj-desc">{{ getDesc(proj) }}</p>
              <div class="mv-proj-tags" v-if="proj.technologies?.length">
                <span v-for="tech in proj.technologies.slice(0, 4)" :key="tech" class="mv-tag mv-tag-sm">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ CONTACT ══════════ -->
    <section id="contact" class="mv-section mv-contact">
      <div class="mv-bg-num" ref="contactNumRef" aria-hidden="true">05</div>
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
          <h3 class="mv-detail-title">{{ getTitle(activeProject) }}</h3>
          <p class="mv-detail-desc">{{ getDesc(activeProject) }}</p>
          <div class="mv-detail-techs" v-if="activeProject.technologies?.length">
            <span v-for="tech in activeProject.technologies" :key="tech" class="mv-tag">{{ tech }}</span>
          </div>
          <div class="mv-detail-actions">
            <a v-if="activeProject.link" :href="activeProject.link" target="_blank" rel="noopener" class="mv-btn-primary">
              {{ isChinese ? '访问项目 →' : 'Visit Project →' }}
            </a>
          </div>
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

// ── 静态数据 ────────────────────────────────────────────────
const tagsZh = ['服装跟单', '客户沟通', '生产协调', 'Vue.js', 'Node.js', 'WPS脚本', '服务器部署']
const tagsEn = ['Garment Merchandising', 'Client Communication', 'Production Coordination', 'Vue.js', 'Node.js', 'WPS Scripting']

// ── CMS 项目数据 ────────────────────────────────────────────
const { data: cmsProjects } = useContent('projects')
const displayProjects = computed(() =>
  cmsProjects.value?.length ? cmsProjects.value : staticProjects
)

// 兼容 CMS 平铺字段 和 静态嵌套对象
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

// ── Hero 分词 ───────────────────────────────────────────────
const heroChunks    = computed(() => isChinese.value ? [...'罗洋洋'] : 'Luo Yangyang'.split(' '))
const heroSubChunks = computed(() => {
  const s = isChinese.value
    ? '服装跟单 · AI应用实践 · 流程自动化'
    : 'Garment Merchandising · AI Practitioner · Process Automation'
  return s.split(' ')
})
const heroIn    = ref(false)
const heroSubIn = ref(false)

// ── 项目详情 ─────────────────────────────────────────────────
const activeProject = ref(null)
const openProject   = (p) => { activeProject.value = p }
const closeProject  = () => { activeProject.value = null }

// ── DOM refs ────────────────────────────────────────────────
const rootRef        = ref(null)
const scanRef        = ref(null)
const trailRef       = ref(null)
const progressRef    = ref(null)
const curDotRef      = ref(null)
const curRingRef     = ref(null)
const statsRef       = ref(null)
// 视差层
const l0Ref          = ref(null) // 网格 ×0.10
const l1Ref          = ref(null) // 幽灵字 ×0.30
const l2Ref          = ref(null) // 装饰线 ×0.45
const aboutNumRef    = ref(null)
const skillsNumRef   = ref(null)
const journeyNumRef  = ref(null)
const projectsNumRef = ref(null)
const contactNumRef  = ref(null)

// ── 字体注入 ─────────────────────────────────────────────────
function injectFont() {
  if (document.querySelector('link[data-mv-font]')) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.dataset.mvFont = true
  link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@200;400;700;900&family=Space+Mono:wght@400;700&display=swap'
  document.head.appendChild(link)
}

// ── 扫描线 ───────────────────────────────────────────────────
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

// ── lerp 函数 ────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t

// ══ 视差引擎（lerp 惯性 + 持续 rAF）═══════════════════════════
let lerpY = 0, targetY = 0, parallaxRaf = null, scrollListener = null

function initParallax() {
  // 视差层配置：[ref, speed系数]
  const layers = [
    [l0Ref,          0.10],  // 网格
    [l1Ref,          0.30],  // 幽灵大字
    [l2Ref,          0.45],  // 装饰线
    [aboutNumRef,    0.18],
    [skillsNumRef,   0.15],
    [journeyNumRef,  0.12],
    [projectsNumRef, 0.09],
    [contactNumRef,  0.06],
  ]

  scrollListener = () => { targetY = window.scrollY }
  window.addEventListener('scroll', scrollListener, { passive: true })

  const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

  function tick() {
    lerpY = lerp(lerpY, targetY, 0.08)

    layers.forEach(([r, s]) => {
      if (r.value) r.value.style.transform = `translateY(${lerpY * s}px)`
    })

    // 滚动进度线
    const ms = maxScroll()
    if (progressRef.value && ms > 0) {
      progressRef.value.style.transform = `scaleX(${lerpY / ms})`
    }

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
    if (dot) {
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }
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
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.1s ease'
    })
    el.addEventListener('mousemove', (e) => {
      const r  = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top  + r.height / 2)
      el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`
    })
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
      el.style.transform  = 'translate(0,0)'
    })
  })
}

// ══ 光标拖尾（idle-aware rAF）══════════════════════════════
const pts = []
let trailRaf = null, trailRunning = false
let trailMouseHandler = null, resizeHandler = null

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
      p.life -= 0.045
      if (p.life <= 0) { pts.splice(i, 1); continue }
      alive = true
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2.5 * p.life, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,45,0,${p.life * 0.55})`
      ctx.fill()
    }
    if (alive) trailRaf = requestAnimationFrame(draw)
    else       trailRunning = false
  }

  trailMouseHandler = (e) => {
    pts.push({ x: e.clientX, y: e.clientY, life: 1 })
    if (!trailRunning) { trailRunning = true; draw() }
  }
  resizeHandler = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
  window.addEventListener('mousemove', trailMouseHandler)
  window.addEventListener('resize', resizeHandler)
}

// ── 数字计数 ─────────────────────────────────────────────────
function runCounter(el, dur = 1000) {
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

// ── IntersectionObserver ─────────────────────────────────────
let io = null, statsIo = null, imgIo = null

function initObservers() {
  // Section 内容触发
  io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return
      const type = target.dataset.reveal
      if (type === 'title') target.classList.add('mv-revealed')
      if (type === 'list')  target.querySelectorAll('.list-item')
                                   .forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 70))
      io.unobserve(target)
    })
  }, { threshold: 0.12 })
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

  // 项目图片 clip-path 揭示
  imgIo = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return
      target.classList.add('img-revealed')
      imgIo.unobserve(target)
    })
  }, { threshold: 0.1 })
  rootRef.value?.querySelectorAll('.mv-img-reveal').forEach(el => imgIo.observe(el))
}

// ── 生命周期 ──────────────────────────────────────────────────
onMounted(() => {
  injectFont()
  setTimeout(runScanLine, 400)
  initParallax()
  initCursor()
  initTrail()
  setTimeout(() => { heroIn.value    = true }, 150)
  setTimeout(() => { heroSubIn.value = true }, 350)
  initObservers()
})

onUnmounted(() => {
  cancelAnimationFrame(parallaxRaf)
  cancelAnimationFrame(cursorRaf)
  cancelAnimationFrame(trailRaf)
  if (scrollListener)     window.removeEventListener('scroll',     scrollListener)
  if (cursorMoveHandler)  document.removeEventListener('mousemove', cursorMoveHandler)
  if (trailMouseHandler)  window.removeEventListener('mousemove',  trailMouseHandler)
  if (resizeHandler)      window.removeEventListener('resize',     resizeHandler)
  io?.disconnect()
  statsIo?.disconnect()
  imgIo?.disconnect()
  pts.length = 0
})
</script>

<style scoped>
/* ── Design tokens ──────────────────────────────────────────── */
.mv {
  --mv-bg:    #0a0a0a;
  --mv-fg:    #e8e8e6;
  --mv-fg2:   #555550;
  --mv-fg3:   #1e1e1c;
  --mv-line:  #1a1a18;
  --mv-accent:#ff2d00;
  --mv-ease:  cubic-bezier(0.16, 1, 0.3, 1);

  font-family: 'Space Grotesk', -apple-system, 'PingFang SC', sans-serif;
  background: var(--mv-bg);
  color: var(--mv-fg);
  min-height: 100vh;
  overflow-x: hidden;
  cursor: none; /* 隐藏系统光标，使用自定义光标 */
}

.mono { font-family: 'Space Mono', 'Menlo', monospace; }

/* ── 系统层 ─────────────────────────────────────────────────── */
.mv-scan {
  position: fixed; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--mv-accent) 40%, transparent);
  top: 0; opacity: 0; pointer-events: none; z-index: 9999;
}

.mv-trail {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 9998;
}

/* 滚动进度线 */
.mv-progress {
  position: fixed; top: 0; left: 0; width: 100%; height: 1px;
  background: var(--mv-fg);
  transform: scaleX(0); transform-origin: left;
  pointer-events: none; z-index: 201;
  will-change: transform;
}

/* ── 自定义光标 ─────────────────────────────────────────────── */
.mv-cur-dot {
  position: fixed; width: 5px; height: 5px;
  background: var(--mv-fg); border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; z-index: 9997;
  transition: transform 0.1s;
}
.mv-cur-ring {
  position: fixed; width: 30px; height: 30px;
  border: 1px solid rgba(232,232,230,0.35); border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; z-index: 9996;
  transition: width 0.3s var(--mv-ease), height 0.3s var(--mv-ease), border-color 0.3s;
}

/* ── 导航 ───────────────────────────────────────────────────── */
.mv-header {
  position: fixed; top: 0; left: 0; right: 0; height: 58px;
  display: flex; align-items: center;
  padding: 0 clamp(20px, 5vw, 64px); gap: 20px;
  background: rgba(10,10,10,0.9);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--mv-line);
  z-index: 200;
}
.mv-brand {
  font-size: 0.78rem; letter-spacing: 0.06em;
  color: var(--mv-fg); text-decoration: none; white-space: nowrap;
}
.mv-nav {
  display: flex; gap: 28px; flex: 1; justify-content: center;
}
.mv-nav-link {
  font-size: 0.61rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--mv-fg2); text-decoration: none; transition: color 0.2s;
}
.mv-nav-link:hover { color: var(--mv-fg); }
.mv-lang-btn {
  background: none; border: 1px solid var(--mv-line);
  color: var(--mv-fg2); font-size: 0.61rem; letter-spacing: 0.1em;
  padding: 5px 10px; border-radius: 3px; cursor: none;
  transition: border-color 0.2s, color 0.2s;
}
.mv-lang-btn:hover { border-color: var(--mv-fg2); color: var(--mv-fg); }

/* ── 文字劈入 ───────────────────────────────────────────────── */
.rv-outer { display: inline-block; overflow: hidden; vertical-align: bottom; }
.rv-inner {
  display: block; transform: translateY(110%);
  transition: transform 0.75s var(--mv-ease);
  transition-delay: calc(var(--ri, 0) * 85ms);
}
.rv-inner.rv-in { transform: translateY(0); }

/* Section title 入场 */
.mv-sec-title {
  font-size: clamp(2.5rem, 5.5vw, 5rem);
  font-weight: 900; letter-spacing: -0.04em; line-height: 0.92; margin: 0;
  transform: translateY(36px); opacity: 0;
  transition: transform 0.75s var(--mv-ease), opacity 0.75s var(--mv-ease);
}
.mv-sec-title.mv-revealed { transform: translateY(0); opacity: 1; }

/* 列表错落 */
.list-item {
  transform: translateY(24px); opacity: 0;
  transition: transform 0.65s var(--mv-ease), opacity 0.65s var(--mv-ease);
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
.mv-sec-hd { margin-bottom: clamp(40px, 6vw, 64px); }
.mv-sec-tag {
  display: block; font-size: 0.6rem; letter-spacing: 0.14em;
  color: var(--mv-fg2); text-transform: uppercase; margin-bottom: 18px;
}
.mv-bg-num {
  position: absolute; right: clamp(0px, 3vw, 48px); top: 50%;
  transform: translateY(-50%);
  font-size: clamp(6rem, 18vw, 22rem);
  font-weight: 900; letter-spacing: -0.06em; line-height: 1;
  color: var(--mv-fg3); pointer-events: none; user-select: none;
  will-change: transform; z-index: 0;
}

/* ── 按钮 ───────────────────────────────────────────────────── */
.mv-btn-primary {
  display: inline-flex; align-items: center;
  background: var(--mv-fg); color: var(--mv-bg);
  padding: 13px 26px; font-size: 0.85rem; font-weight: 700;
  letter-spacing: 0.02em; text-decoration: none; border: none;
  cursor: none; transition: opacity 0.2s;
}
.mv-btn-primary:hover { opacity: 0.88; }

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
  background: var(--mv-fg3); color: var(--mv-fg2);
  padding: 6px 12px; font-size: 0.72rem; letter-spacing: 0.04em;
  border: 1px solid transparent; transition: border-color 0.2s, color 0.2s;
}
.mv-tag:hover { border-color: #2e2e2c; color: var(--mv-fg); }
.mv-tag-sm { padding: 4px 8px; font-size: 0.64rem; }

/* ═════════════════════ HERO ════════════════════════════════ */
.mv-hero {
  min-height: 100vh; display: flex; flex-direction: column;
  justify-content: center;
  padding: 100px clamp(20px, 5vw, 64px) 64px;
  position: relative; overflow: hidden;
}

/* 视差层 */
.mv-l0 {
  position: absolute; inset: -30%; z-index: 0;
  background-image:
    linear-gradient(var(--mv-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--mv-line) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.55; will-change: transform;
  animation: grid-in 1.2s var(--mv-ease) both;
}
@keyframes grid-in { from { opacity:0 } to { opacity:0.55 } }

.mv-l1 {
  position: absolute; right: -2%; top: 50%;
  transform: translateY(-50%);
  font-size: clamp(5rem, 18vw, 22rem);
  font-weight: 900; letter-spacing: -0.06em; line-height: 1;
  color: var(--mv-fg3); opacity: 0.6;
  pointer-events: none; user-select: none; will-change: transform;
}

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
}
.mv-hero-title {
  font-size: clamp(4rem, 11vw, 10rem);
  font-weight: 900; line-height: 0.9; letter-spacing: -0.04em;
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
  margin-bottom: 52px; flex-wrap: wrap;
}
.mv-stat { padding: 0 40px 0 0; }
.mv-stat:first-child { padding-left: 0; }
.mv-stat:last-child  { padding-right: 0; }
.mv-stat-sep { width: 1px; background: var(--mv-line); margin-right: 40px; }
.mv-stat-val {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 900; letter-spacing: -0.04em; line-height: 1; margin-bottom: 6px;
}
.mv-stat-u { font-size: 0.65em; font-weight: 400; opacity: 0.7; }
.mv-stat-lbl { display: block; font-size: 0.58rem; letter-spacing: 0.1em; color: var(--mv-fg2); text-transform: uppercase; }

.mv-cta { display: flex; gap: 12px; flex-wrap: wrap; }

/* Scroll cue */
.mv-scroll-cue {
  position: absolute; bottom: 40px; left: clamp(20px, 5vw, 64px);
  display: flex; flex-direction: column; align-items: flex-start; gap: 10px; z-index: 3;
}
.mv-scroll-cue span { font-size: 0.56rem; letter-spacing: 0.18em; color: var(--mv-fg2); }
.mv-scroll-line {
  width: 1px; height: 52px;
  background: linear-gradient(to bottom, var(--mv-fg2), transparent);
  animation: scroll-pulse 2.2s ease-in-out infinite;
}
@keyframes scroll-pulse {
  0%,100% { opacity: 0.35; transform: scaleY(1); }
  50%      { opacity: 1;    transform: scaleY(0.6); }
}

/* ═════════════════════ ABOUT ═══════════════════════════════ */
.mv-about { background: var(--mv-bg); }
.mv-about-text {
  font-size: clamp(0.92rem, 1.4vw, 1.06rem);
  line-height: 1.82; color: var(--mv-fg2); max-width: 740px; margin: 0 0 28px;
}
.mv-tag-row { display: flex; flex-wrap: wrap; gap: 8px; }

/* ═════════════════════ SKILLS ══════════════════════════════ */
.mv-skills { background: color-mix(in srgb, var(--mv-bg) 97%, #fff); }
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
}
.mv-skill-rows .mv-skill-row:last-child { border-bottom: none; padding-bottom: 0; }
.mv-skill-name { font-size: 0.9rem; color: var(--mv-fg); }
.mv-skill-hl { font-size: 0.6rem; letter-spacing: 0.04em; color: var(--mv-fg2); text-align: right; flex-shrink: 0; }

/* ═════════════════════ JOURNEY ═════════════════════════════ */
.mv-journey { background: var(--mv-bg); }
.mv-timeline { display: flex; flex-direction: column; }
.mv-tl-item {
  display: grid; grid-template-columns: 96px 1fr; gap: 28px;
  padding: 28px 0; border-top: 1px solid var(--mv-line);
}
.mv-tl-item:last-child { border-bottom: 1px solid var(--mv-line); }
.mv-tl-left { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding-top: 3px; }
.mv-tl-year { font-size: 0.66rem; letter-spacing: 0.08em; color: var(--mv-fg2); white-space: nowrap; }
.mv-tl-live .mv-tl-year { color: var(--mv-accent); }
.mv-tl-vline { width: 1px; flex: 1; background: var(--mv-line); min-height: 16px; }
.mv-tl-live .mv-tl-vline { background: var(--mv-accent); opacity: 0.35; }
.mv-tl-title { font-size: clamp(1rem, 1.8vw, 1.2rem); font-weight: 700; margin: 0 0 8px; }
.mv-tl-desc  { font-size: 0.86rem; line-height: 1.7; color: var(--mv-fg2); margin: 0; }

/* ═════════════════════ PROJECTS ════════════════════════════ */
.mv-projects { background: color-mix(in srgb, var(--mv-bg) 97%, #fff); }

/* 2列图片卡片网格 */
.mv-proj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.mv-proj-card {
  background: var(--mv-fg3);
  border: 1px solid var(--mv-line);
  cursor: none;
  overflow: hidden;
  transition: border-color 0.35s var(--mv-ease), transform 0.35s var(--mv-ease);
}
.mv-proj-card:hover {
  border-color: rgba(232,232,230,0.14);
  transform: translateY(-4px);
}

/* 图片容器：clip-path 揭示动效 */
.mv-proj-img-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--mv-line);
}
.mv-proj-img {
  width: 100%; height: 100%; object-fit: cover;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.85s var(--mv-ease), transform 0.6s var(--mv-ease);
  will-change: transform;
}
.mv-img-reveal.img-revealed .mv-proj-img { clip-path: inset(0 0 0% 0); }
.mv-proj-card:hover .mv-proj-img { transform: scale(1.05); }

/* 占位符（无图时） */
.mv-proj-img-ph {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 3rem; font-weight: 900; color: rgba(232,232,230,0.06);
}

/* 悬停遮罩 */
.mv-proj-hover-mask {
  position: absolute; inset: 0;
  background: rgba(10,10,10,0.6);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
}
.mv-proj-card:hover .mv-proj-hover-mask { opacity: 1; }
.mv-proj-cta { font-size: 0.72rem; letter-spacing: 0.1em; color: var(--mv-fg); }

/* 文字区 */
.mv-proj-body { padding: 20px 22px 22px; }
.mv-proj-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.mv-proj-num  { font-size: 0.6rem; letter-spacing: 0.12em; color: var(--mv-fg2); }
.mv-proj-cat  { font-size: 0.6rem; letter-spacing: 0.08em; color: var(--mv-fg2); }
.mv-proj-name {
  font-size: clamp(1rem, 1.6vw, 1.2rem); font-weight: 700; margin: 0 0 8px; color: var(--mv-fg);
}
.mv-proj-desc {
  font-size: 0.8rem; line-height: 1.62; color: var(--mv-fg2); margin: 0 0 14px;
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;
}
.mv-proj-tags { display: flex; flex-wrap: wrap; gap: 6px; }

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
  display: flex; flex-direction: column; gap: 8px; transition: background 0.2s;
}
.mv-ci:hover { background: rgba(255,255,255,0.022); }
.mv-ci-lbl { font-size: 0.58rem; letter-spacing: 0.14em; color: var(--mv-fg2); text-transform: uppercase; }
.mv-ci-val { font-size: 0.92rem; color: var(--mv-fg); word-break: break-all; }
.mv-contact-cta { margin-top: 40px; }

/* ── Footer ─────────────────────────────────────────────────── */
.mv-footer {
  border-top: 1px solid var(--mv-line);
  padding: 28px clamp(20px, 5vw, 64px);
  display: flex; align-items: center; gap: 16px;
}
.mv-ft-copy, .mv-ft-tag { font-size: 0.66rem; letter-spacing: 0.06em; color: var(--mv-fg2); }
.mv-ft-dot { color: var(--mv-accent); font-size: 0.72rem; }

/* ── 项目详情 overlay ──────────────────────────────────────── */
.mv-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  z-index: 600; display: flex; align-items: center; justify-content: center; padding: 20px;
}
.mv-detail {
  background: #0f0f0e; border: 1px solid var(--mv-line);
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
.mv-detail-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 12px; }
.mv-detail-desc  { font-size: 0.88rem; line-height: 1.72; color: var(--mv-fg2); margin: 0 0 20px; }
.mv-detail-techs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.mv-detail-actions { display: flex; gap: 12px; }

/* ── Transitions ────────────────────────────────────────────── */
.mv-fade-enter-active, .mv-fade-leave-active { transition: opacity 0.3s var(--mv-ease); }
.mv-fade-enter-from,  .mv-fade-leave-to      { opacity: 0; }

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .mv-nav { display: none; }
  .mv-hero { padding: 88px 20px 60px; }
  .mv-stats { gap: 20px; flex-wrap: wrap; }
  .mv-stat-sep { display: none; }
  .mv-stat { padding: 0; }
  .mv-proj-grid { grid-template-columns: 1fr; }
  .mv-tl-item { grid-template-columns: 68px 1fr; gap: 16px; }
  .mv-skills-grid { grid-template-columns: 1fr 1fr; }
  .mv-contact-grid { grid-template-columns: 1fr 1fr; }
  .mv-bg-num { font-size: 5.5rem; }
  .mv-cur-dot, .mv-cur-ring { display: none; }
  .mv { cursor: auto; }
  .mv-btn-primary, .mv-btn-outline, .mv-lang-btn, .mv-proj-card,
  .mv-detail-close { cursor: auto; }
}

@media (max-width: 480px) {
  .mv-hero-title { font-size: clamp(3rem, 14vw, 4.5rem); }
  .mv-stats { flex-direction: column; gap: 14px; }
  .mv-skills-grid { grid-template-columns: 1fr; }
  .mv-contact-grid { grid-template-columns: 1fr; }
  .mv-tl-item { grid-template-columns: 54px 1fr; gap: 12px; }
  .mv-bg-num { font-size: 4.5rem; }
}

/* ── 减少动效降级 ─────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .rv-inner, .mv-sec-title, .list-item, .mv-proj-img {
    transform: none !important; opacity: 1 !important;
    clip-path: none !important; transition: none !important;
  }
  .mv-scroll-line { animation: none; }
  .mv-l0 { animation: none; }
}
</style>
