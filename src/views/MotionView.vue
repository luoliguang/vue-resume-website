<template>
  <div class="mv" ref="rootRef">

    <!-- ── 持续环境层 ── -->
    <canvas class="mv-particles" ref="particlesRef" aria-hidden="true"></canvas>
    <canvas class="mv-trail"     ref="trailRef"     aria-hidden="true"></canvas>
    <div    class="mv-grain"                        aria-hidden="true"></div>

    <!-- ── HUD 系统 ── -->
    <div class="mv-hud-grid" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none" width="100%" height="100%">
        <line x1="480" y1="0" x2="480" y2="900" stroke="rgba(232,232,230,0.035)"/>
        <line x1="960" y1="0" x2="960" y2="900" stroke="rgba(232,232,230,0.035)"/>
        <line x1="0" y1="450" x2="1440" y2="450" stroke="rgba(232,232,230,0.035)"/>
      </svg>
    </div>
    <div class="mv-hud-bar" aria-hidden="true">
      <span class="mv-hud-env">GMT+8 · CN · <time ref="clockRef">--:--:--</time></span>
      <span class="mv-hud-coords" ref="coordsRef">0000 X 0000 Y</span>
    </div>

    <!-- ── 光标 ── -->
    <div class="mv-cur"      ref="curDotRef"  id="mv-cur"      aria-hidden="true"></div>
    <div class="mv-cur-ring" ref="curRingRef" id="mv-cur-ring" aria-hidden="true"></div>
    <div class="mv-scan"     ref="scanRef"                     aria-hidden="true"></div>
    <div class="mv-progress" ref="progressRef"                 aria-hidden="true"></div>

    <!-- ── L0: 背景网格（fixed，视差 ×0.06） ── -->
    <div class="mv-l0" ref="l0Ref" aria-hidden="true"></div>

    <!-- ── L1: 幽灵大字（fixed，视差 ×0.22） ── -->
    <div class="mv-l1" ref="l1Ref" aria-hidden="true">{{ isChinese ? '罗洋洋' : 'LLG' }}</div>

    <!-- ── 导航 ── -->
    <header class="mv-header" ref="headerRef">
      <a href="#" class="mv-brand" @click.prevent="() => window.scrollTo({top:0,behavior:'smooth'})">
        <span>罗洋洋</span><span class="mv-brand-sep"> · </span><span class="mv-brand-en">giluoo</span>
      </a>
      <nav class="mv-nav" ref="navRef" aria-label="主导航">
        <a v-for="item in navItems" :key="item.id"
           class="mv-nav-link" :data-sec="item.id" :href="`#${item.id}`">
          {{ isChinese ? item.zh : item.en }}
        </a>
      </nav>
      <div class="mv-header-r">
        <button class="mv-lang magnetic" @click="toggleLanguage">{{ isChinese ? 'EN' : '中' }}</button>
      </div>
    </header>

    <!-- ══════ SCENE 1 · HERO (180vh) ══════ -->
    <div class="mv-scene" ref="heroSceneRef" style="min-height:180vh">
      <div class="mv-sticky">
        <div class="mv-hero-inner" ref="heroInnerRef">
          <p class="mv-eyebrow ui-label">
            {{ isChinese ? '服装行业 · 全栈开发 · AI 应用实践' : 'Fashion Industry · Full Stack · AI Practice' }}
          </p>
          <h1 class="mv-hero-title" ref="heroTitleRef" aria-label="罗洋洋">
            <span v-for="(ch, i) in heroChunks" :key="i" class="mv-char-outer">
              <span class="mv-char-inner" :style="{ transitionDelay: (i * 80) + 'ms' }">{{ ch }}</span>
            </span>
          </h1>
          <p class="mv-hero-sub" ref="heroSubRef">
            <span v-for="(w, i) in heroSubChunks" :key="i" class="mv-word-outer">
              <span class="mv-word-inner" :style="{ transitionDelay: (180 + i * 70) + 'ms' }">{{ w }}</span>
            </span>
          </p>
          <div class="mv-stats" ref="statsRef">
            <div class="mv-stat">
              <span class="mv-stat-num"><span class="mv-counter" data-target="2">0</span><span>yr+</span></span>
              <span class="mv-stat-lbl ui-label">{{ isChinese ? '跟单经验' : 'Experience' }}</span>
            </div>
            <div class="mv-stat">
              <span class="mv-stat-num"><span class="mv-counter" data-target="200">0</span><span>+</span></span>
              <span class="mv-stat-lbl ui-label">{{ isChinese ? '服务客户' : 'Clients' }}</span>
            </div>
            <div class="mv-stat">
              <span class="mv-stat-num">↓<span class="mv-counter" data-target="15">0</span><span>%</span></span>
              <span class="mv-stat-lbl ui-label">{{ isChinese ? '降低返工率' : 'Rework Rate' }}</span>
            </div>
            <div class="mv-stat">
              <span class="mv-stat-num"><span class="mv-counter" data-target="3">0</span></span>
              <span class="mv-stat-lbl ui-label">{{ isChinese ? '自研工具' : 'Tools Built' }}</span>
            </div>
          </div>
          <div class="mv-cta">
            <a href="#about"    class="mv-btn-fill magnetic">{{ isChinese ? '了解我' : 'About Me' }}</a>
            <a href="#projects" class="mv-btn-line magnetic">{{ isChinese ? '查看项目' : 'Projects' }}</a>
            <a href="/resume.pdf" download class="mv-btn-line magnetic">{{ isChinese ? '下载简历' : 'Download CV' }}</a>
          </div>
        </div>

        <!-- 跑马灯 -->
        <div class="mv-ticker" aria-hidden="true">
          <div class="mv-ticker-track">
            <span v-for="n in 8" :key="n" class="mv-ticker-item ui-label">
              服装跟单 · AI应用开发 · 流程自动化 · Vue.js · Node.js · 供应链数字化 ·&nbsp;
            </span>
          </div>
        </div>

        <!-- 滚动提示 -->
        <div class="mv-scroll-hint" ref="scrollHintRef" aria-hidden="true">
          <span class="ui-label">SCROLL</span>
          <span class="mv-sh-arrow">↓</span>
        </div>
      </div>
    </div>

    <!-- ══════ SCENE 2 · ABOUT (220vh) ══════ -->
    <div class="mv-scene" ref="aboutSceneRef" style="min-height:220vh" id="about">
      <div class="mv-sticky mv-sec-bg">
        <div class="mv-sec-in" :class="{ 'sec-visible': showAbout }">
          <div class="mv-sec-head">
            <span class="mv-sec-tag ui-label">{{ isChinese ? '关于我' : 'About' }}</span>
            <div class="mv-sec-title-clip"><h2 class="mv-sec-h2">{{ isChinese ? '关于我' : 'About Me' }}</h2></div>
          </div>
          <div class="mv-about-body">
            <p class="mv-about-text">
              {{ isChinese
                ? '我是罗力广，客户和朋友都习惯叫我罗洋洋。我做的是服装客服跟单，负责对接客户需求、推进从打样到出货的整个流程。两年多下来，我熟悉各个环节是怎么衔接的，也清楚哪里最容易出问题。借助 AI 自学开发，我陆续做出 AI 问答知识库、实拍素材平台和订单自动化脚本，把自己和同事每天最头疼的问题解决掉。'
                : 'I\'m Luo Liguang, known as Luo Yangyang. I work as a garment merchandiser — connecting client requirements and driving the full process from sampling to shipment. Teaching myself development with AI, I\'ve built an AI knowledge base, a product photo platform, and order automation scripts to solve our daily pain points.'
              }}
            </p>
            <div class="mv-about-tags">
              <span v-for="tag in (isChinese ? tagsZh : tagsEn)" :key="tag" class="mv-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
        <div class="mv-bg-num" aria-hidden="true">01</div>
      </div>
    </div>

    <!-- ══════ SCENE 3 · SKILLS (240vh) ══════ -->
    <div class="mv-scene" ref="skillsSceneRef" style="min-height:240vh" id="skills">
      <div class="mv-sticky mv-sec-bg">
        <div class="mv-sec-in" :class="{ 'sec-visible': showSkills }">
          <div class="mv-sec-head">
            <span class="mv-sec-tag ui-label">{{ isChinese ? '技能专长' : 'Skills' }}</span>
            <div class="mv-sec-title-clip"><h2 class="mv-sec-h2">{{ isChinese ? '技能专长' : 'Skills' }}</h2></div>
          </div>
          <div class="mv-skills-grid">
            <div v-for="(cat, i) in skillCategories" :key="cat.name || i"
                 class="mv-skill-col"
                 :class="{ 'col-in': skillRevealCount > i }">
              <h3 class="mv-skill-cat ui-label">{{ isChinese ? cat.name : (cat.nameEn || cat.name) }}</h3>
              <ul class="mv-skill-list">
                <li v-for="sk in (cat.skills || [])" :key="sk.name" class="mv-skill-row">
                  <span class="mv-skill-name">{{ isChinese ? sk.name : (sk.nameEn || sk.name) }}</span>
                  <span class="mv-skill-hl">{{ isChinese ? sk.highlight : (sk.highlightEn || sk.highlight) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mv-bg-num" aria-hidden="true">02</div>
      </div>
    </div>

    <!-- ══════ SCENE 4 · JOURNEY (300vh) ══════ -->
    <div class="mv-scene" ref="journeySceneRef" style="min-height:300vh" id="journey">
      <div class="mv-sticky mv-sec-bg">
        <div class="mv-sec-in" :class="{ 'sec-visible': showJourney }">
          <div class="mv-sec-head">
            <span class="mv-sec-tag ui-label">{{ isChinese ? '我的历程' : 'Journey' }}</span>
            <div class="mv-sec-title-clip"><h2 class="mv-sec-h2">{{ isChinese ? '我的历程' : 'My Journey' }}</h2></div>
          </div>
          <div class="mv-timeline">
            <div v-for="(m, i) in journeyMilestones" :key="m.year || i"
                 class="mv-tl-item"
                 :class="{ 'tl-in': journeyRevealCount > i }">
              <span class="mv-tl-year ui-label">{{ m.year }}</span>
              <div class="mv-tl-body">
                <h3 class="mv-tl-title">
                  {{ isChinese ? (m.title?.zh || m.title) : (m.title?.en || m.title) }}
                </h3>
                <p class="mv-tl-desc">
                  {{ isChinese ? (m.description?.zh || m.description) : (m.description?.en || m.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mv-bg-num" aria-hidden="true">03</div>
      </div>
    </div>

    <!-- ══════ SCENE 5 · PROJECTS (380vh · 水平镜头) ══════ -->
    <div class="mv-scene mv-proj-scene" ref="projSceneRef" style="min-height:380vh" id="projects">
      <div class="mv-sticky mv-sec-bg mv-proj-sticky">
        <div class="mv-proj-head">
          <div>
            <span class="mv-sec-tag ui-label">{{ isChinese ? '项目展示' : 'Projects' }}</span>
            <div class="mv-sec-title-clip" :class="{ 'sec-visible': showProjects }">
              <h2 class="mv-sec-h2">{{ isChinese ? '项目展示' : 'Projects' }}</h2>
            </div>
          </div>
          <div class="mv-proj-counter ui-label">
            <span ref="projCounterRef">01</span><span class="mv-proj-total"> / 0{{ displayProjects.length }}</span>
          </div>
        </div>
        <!-- 水平滚动轨道 -->
        <div class="mv-proj-track" ref="projTrackRef">
          <div v-for="(proj, i) in displayProjects" :key="proj.id || i"
               class="mv-proj-card"
               @click="openProject(proj)"
               @mouseenter="curDotRef?.classList.add('on-card')"
               @mouseleave="curDotRef?.classList.remove('on-card')">
            <div class="mv-proj-visual">
              <img v-if="getImage(proj)" :src="getImage(proj)" :alt="getTitle(proj)" loading="lazy" class="mv-proj-img">
              <div v-else class="mv-proj-ph"><span class="ui-label">{{ (proj.type || 'PROJECT').toUpperCase() }}</span></div>
            </div>
            <div class="mv-proj-info">
              <div class="mv-proj-meta">
                <span class="ui-label mv-proj-idx">0{{ i + 1 }}</span>
                <span class="ui-label mv-proj-type">{{ (proj.type || '').toUpperCase() }}</span>
              </div>
              <h3 class="mv-proj-name">{{ getTitle(proj) }}</h3>
              <div class="mv-proj-techs">
                <span v-for="tech in (proj.technologies || []).slice(0,3)" :key="tech" class="mv-proj-tech ui-label">{{ tech }}</span>
              </div>
            </div>
            <div class="mv-proj-hover">
              <p class="mv-proj-desc">{{ getDesc(proj) }}</p>
              <span class="ui-label">{{ isChinese ? '查看详情 ↗' : 'View ↗' }}</span>
            </div>
          </div>
        </div>
        <div class="mv-bg-num" aria-hidden="true">04</div>
      </div>
    </div>

    <!-- ══════ SCENE 6 · CONTACT (220vh) ══════ -->
    <div class="mv-scene" ref="contactSceneRef" style="min-height:220vh" id="contact">
      <div class="mv-sticky mv-sec-bg mv-contact-sticky">
        <div class="mv-sec-head">
          <span class="mv-sec-tag ui-label">{{ isChinese ? '联系方式' : 'Contact' }}</span>
        </div>
        <!-- 大字随滚动点亮 -->
        <div class="mv-contact-big" ref="contactBigRef" aria-hidden="true">
          <span v-for="(ch, i) in contactChars" :key="i" class="mv-contact-char">{{ ch }}</span>
        </div>
        <!-- 联系列表 -->
        <div class="mv-contact-links" :class="{ 'links-in': showContact }">
          <a href="mailto:giluo@vip.qq.com" class="mv-contact-row magnetic">
            <span class="mv-contact-lbl ui-label">EMAIL</span>
            <span class="mv-contact-val">giluo@vip.qq.com</span>
            <span class="mv-contact-arr">→</span>
          </a>
          <div class="mv-contact-row">
            <span class="mv-contact-lbl ui-label">WECHAT</span>
            <span class="mv-contact-val">giluoo</span>
          </div>
          <a href="https://github.com/luoliguang" target="_blank" rel="noopener" class="mv-contact-row magnetic">
            <span class="mv-contact-lbl ui-label">GITHUB</span>
            <span class="mv-contact-val">luoliguang</span>
            <span class="mv-contact-arr">→</span>
          </a>
          <div class="mv-contact-row">
            <span class="mv-contact-lbl ui-label">{{ isChinese ? '现居' : 'LOCATION' }}</span>
            <span class="mv-contact-val">{{ isChinese ? '广东 · 惠州' : 'Huizhou, Guangdong' }}</span>
          </div>
        </div>
        <a href="/resume.pdf" download class="mv-dl-btn mv-btn-fill magnetic">
          {{ isChinese ? '下载简历' : 'Download CV' }}
        </a>
        <div class="mv-bg-num" aria-hidden="true">05</div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mv-footer">
      <span class="ui-label">© 2025 罗洋洋</span>
      <span class="mv-footer-dot" aria-hidden="true">✦</span>
      <span class="ui-label">Full Stack · Fashion Industry</span>
    </footer>

    <!-- 项目详情 overlay -->
    <Transition name="mv-fade">
      <div v-if="activeProject" class="mv-overlay" @click.self="closeProject">
        <div class="mv-detail">
          <button class="mv-detail-close magnetic" @click="closeProject">✕</button>
          <div class="mv-detail-img" v-if="getImage(activeProject)">
            <img :src="getImage(activeProject)" :alt="getTitle(activeProject)" loading="lazy">
          </div>
          <span class="mv-detail-type ui-label" v-if="activeProject.type">{{ activeProject.type.toUpperCase() }}</span>
          <h3 class="mv-detail-title">{{ getTitle(activeProject) }}</h3>
          <p class="mv-detail-desc">{{ getDesc(activeProject) }}</p>
          <div class="mv-detail-techs" v-if="activeProject.technologies?.length">
            <span v-for="tech in activeProject.technologies" :key="tech" class="mv-tag">{{ tech }}</span>
          </div>
          <div class="mv-detail-actions">
            <a v-if="activeProject.link && activeProject.link !== '#'"
               :href="activeProject.link" target="_blank" rel="noopener" class="mv-btn-fill">
              {{ isChinese ? '访问项目 ↗' : 'Visit Project ↗' }}
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

const emit = defineEmits(['switch-mode'])

// ── 静态数据 ──────────────────────────────────────────────────
const tagsZh = ['服装跟单', '客户沟通', '生产协调', 'Vue.js', 'Node.js', 'WPS脚本', '服务器部署']
const tagsEn = ['Garment Merchandising', 'Client Communication', 'Production Coordination', 'Vue.js', 'Node.js']
const navItems = [
  { id: 'about',    zh: '关于我',   en: 'About' },
  { id: 'skills',   zh: '技能专长', en: 'Skills' },
  { id: 'journey',  zh: '我的历程', en: 'Journey' },
  { id: 'projects', zh: '项目展示', en: 'Projects' },
  { id: 'contact',  zh: '联系方式', en: 'Contact' },
]

// ── CMS 数据 ──────────────────────────────────────────────────
const { data: cmsProjects } = useContent('projects')
const displayProjects = computed(() =>
  cmsProjects.value?.length ? cmsProjects.value : staticProjects
)
const getTitle = (proj) => {
  if (proj.title && typeof proj.title === 'object')
    return proj.title[isChinese.value ? 'zh' : 'en'] ?? proj.title.zh ?? ''
  return isChinese.value ? (proj.title_zh ?? '') : (proj.title_en ?? '')
}
const getDesc = (proj) => {
  if (proj.description && typeof proj.description === 'object')
    return proj.description[isChinese.value ? 'zh' : 'en'] ?? proj.description.zh ?? ''
  return isChinese.value ? (proj.description_zh ?? '') : (proj.description_en ?? '')
}
const getImage = (proj) => proj.image || proj.cover_image || null

// ── Hero 文字 ──────────────────────────────────────────────────
const heroChunks    = computed(() => isChinese.value ? [...'罗洋洋'] : [...'Yangyang'])
const heroSubChunks = computed(() =>
  (isChinese.value
    ? '服装跟单 · AI应用实践 · 流程自动化'
    : 'Garment · AI Practitioner · Automation'
  ).split(' ')
)

// ── Contact 点亮文字 ──────────────────────────────────────────
const contactText  = computed(() => isChinese.value ? '一起做点什么' : "Let's build")
const contactChars = computed(() => [...contactText.value])

// ── Section 可见状态（用于触发 CSS transition） ──────────────
const showAbout   = ref(false)
const showSkills  = ref(false)
const showJourney = ref(false)
const showProjects= ref(false)
const showContact = ref(false)
const skillRevealCount   = ref(0)
const journeyRevealCount = ref(0)

// ── 项目详情 ──────────────────────────────────────────────────
const activeProject = ref(null)
const openProject   = (p) => { activeProject.value = p }
const closeProject  = () => { activeProject.value = null }

// ── DOM Refs ──────────────────────────────────────────────────
const rootRef         = ref(null)
const heroSceneRef    = ref(null)
const aboutSceneRef   = ref(null)
const skillsSceneRef  = ref(null)
const journeySceneRef = ref(null)
const projSceneRef    = ref(null)
const contactSceneRef = ref(null)
const heroInnerRef    = ref(null)
const heroTitleRef    = ref(null)
const scrollHintRef   = ref(null)
const projTrackRef    = ref(null)
const projCounterRef  = ref(null)
const statsRef        = ref(null)
const contactBigRef   = ref(null)
const l0Ref           = ref(null)
const l1Ref           = ref(null)
const clockRef        = ref(null)
const coordsRef       = ref(null)
const scanRef         = ref(null)
const progressRef     = ref(null)
const curDotRef       = ref(null)
const curRingRef      = ref(null)
const trailRef        = ref(null)
const particlesRef    = ref(null)

const lerp = (a, b, t) => a + (b - a) * t

// ── Scene 缓存（offsetTop/offsetHeight 避免每帧 reflow） ─────
let scenes = {}
let projTrackW = 0

function cacheScenes() {
  const pairs = [
    ['hero',     heroSceneRef],
    ['about',    aboutSceneRef],
    ['skills',   skillsSceneRef],
    ['journey',  journeySceneRef],
    ['projects', projSceneRef],
    ['contact',  contactSceneRef],
  ]
  pairs.forEach(([k, r]) => {
    if (r.value) scenes[k] = { top: r.value.offsetTop, height: r.value.offsetHeight }
  })
  if (projTrackRef.value) {
    projTrackRef.value.style.transform = 'translateX(0)'
    projTrackW = Math.max(0, projTrackRef.value.scrollWidth - window.innerWidth + 80)
  }
}

function sceneProgress(name) {
  const s = scenes[name]
  if (!s || s.height <= window.innerHeight) return 0
  return Math.max(0, Math.min(1, (lerpY - s.top) / (s.height - window.innerHeight)))
}

// ── 字体注入 ──────────────────────────────────────────────────
function injectFont() {
  if (document.querySelector('link[data-mv-font]')) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'; link.dataset.mvFont = true
  link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@200;400;900&family=Space+Mono:wght@400;700&display=swap'
  document.head.appendChild(link)
}

// ── 时钟 ──────────────────────────────────────────────────────
let clockTimer = null
function startClock() {
  const upd = () => {
    if (!clockRef.value) return
    const d = new Date()
    clockRef.value.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map(n => String(n).padStart(2, '0')).join(':')
  }
  upd(); clockTimer = setInterval(upd, 1000)
}

// ── 扫描线 ────────────────────────────────────────────────────
function runScanLine() {
  const s = scanRef.value; if (!s) return
  s.style.top = '0'; s.style.opacity = '1'
  void s.offsetWidth
  s.style.transition = 'top 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.15s 1.05s'
  s.style.top = '100vh'; s.style.opacity = '0'
}

// ── 数字计数 ──────────────────────────────────────────────────
function runCounter(el, dur = 1100) {
  const target = parseFloat(el.dataset.target)
  const t0 = performance.now()
  const tick = (now) => {
    const p = Math.min((now - t0) / dur, 1)
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)))
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target
  }
  requestAnimationFrame(tick)
}

// ══ 粒子系统 ═════════════════════════════════════════════════
const particles = []; let pCanvas = null, pCtx = null

function initParticles() {
  pCanvas = particlesRef.value; if (!pCanvas) return
  pCanvas.width = window.innerWidth; pCanvas.height = window.innerHeight
  pCtx = pCanvas.getContext('2d')
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * pCanvas.width, y: Math.random() * pCanvas.height,
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.1 + 0.2, maxA: Math.random() * 0.1 + 0.02,
      speed: Math.random() * 0.4 + 0.1, phase: Math.random() * Math.PI * 2,
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
    pCtx.beginPath(); pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    pCtx.fillStyle = `rgba(200,195,255,${a})`; pCtx.fill()
  })
}

// ══ 核心 rAF 循环（视差 + 内容驱动） ════════════════════════
let lerpY = 0, targetY = 0, parallaxRaf = null
let scrollListener = null, resizeListener = null
let frameCount = 0

function initParallax() {
  scrollListener = () => {
    targetY = window.scrollY
    const ms = document.documentElement.scrollHeight - window.innerHeight
    if (ms > 0) document.documentElement.style.setProperty('--scroll', (window.scrollY / ms).toFixed(4))
  }
  resizeListener = () => { cacheScenes() }
  window.addEventListener('scroll',  scrollListener,  { passive: true })
  window.addEventListener('resize',  resizeListener)

  function tick() {
    lerpY = lerp(lerpY, targetY, 0.08)
    const now = performance.now() * 0.001

    const heroP    = sceneProgress('hero')
    const aboutP   = sceneProgress('about')
    const skillsP  = sceneProgress('skills')
    const journeyP = sceneProgress('journey')
    const projP    = sceneProgress('projects')
    const contactP = sceneProgress('contact')

    // ── L0: 背景网格 zoom（Hero 滚动时放大）
    if (l0Ref.value)
      l0Ref.value.style.transform = `scale(${1 + heroP * 0.15}) translateY(${lerpY * 0.04}px)`

    // ── L1: 幽灵大字视差
    if (l1Ref.value)
      l1Ref.value.style.transform = `translateY(${lerpY * 0.22}px)`

    // ── Hero 内容出场：滚动60%后才开始淡出，给 About 衔接留空间
    if (heroInnerRef.value) {
      const f = Math.max(0, 1 - (heroP - 0.6) * 3.5)
      heroInnerRef.value.style.opacity   = f
      heroInnerRef.value.style.transform = `translateY(${-heroP * 36}px)`
    }
    if (scrollHintRef.value)
      scrollHintRef.value.style.opacity = String(Math.max(0, 1 - heroP * 5))

    // 判断某个 scene 是否在视口内（场景 top 进入视口底部，且底部未离开视口顶部）
    const wh = window.innerHeight
    const inVP = (name) => {
      const s = scenes[name]
      return s && lerpY + wh > s.top && lerpY < s.top + s.height
    }

    // ── About：场景进入视口即触发（动画随 sticky 滑入同步出现）
    showAbout.value = inVP('about')

    // ── Skills 逐列触发（离开视口后重置，下次重播）
    if (inVP('skills')) {
      showSkills.value = true
      const sk = Math.max(0, Math.floor((skillsP - 0.08) / 0.16) + 1)
      if (sk > skillRevealCount.value) skillRevealCount.value = Math.min(skillCategories.length, sk)
    } else {
      showSkills.value = false
      skillRevealCount.value = 0
    }

    // ── Journey 逐条触发（离开视口后重置）
    if (inVP('journey')) {
      showJourney.value = true
      const jk = Math.max(0, Math.floor((journeyP - 0.06) / (0.85 / Math.max(1, journeyMilestones.length))) + 1)
      if (jk > journeyRevealCount.value) journeyRevealCount.value = Math.min(journeyMilestones.length, jk)
    } else {
      showJourney.value = false
      journeyRevealCount.value = 0
    }

    // ── 项目：水平镜头
    if (inVP('projects')) showProjects.value = true
    else showProjects.value = false
    if (projTrackRef.value && projTrackW > 0) {
      projTrackRef.value.style.transform = `translateX(${-projTrackW * projP}px)`
      const count = displayProjects.value.length
      const idx   = Math.min(count - 1, Math.floor(projP * count * 1.05))
      if (projCounterRef.value) projCounterRef.value.textContent = String(Math.max(1, idx + 1)).padStart(2, '0')
    }

    // ── Contact：字符点亮（直接操作 DOM，避免 Vue 响应式开销）
    if (contactBigRef.value && contactP > 0) {
      const chars = contactBigRef.value.children
      for (let i = 0; i < chars.length; i++) {
        const t = Math.max(0, Math.min(1, (contactP - 0.05) * chars.length * 1.8 - i * 0.85))
        const v = Math.round(40 + t * 192)
        chars[i].style.color     = `rgb(${v},${v},${v})`
        chars[i].style.transform = `translateY(${(1 - t) * 18}px)`
      }
    }
    if (contactP > 0.45 && !showContact.value) showContact.value = true

    // ── Nav 高亮（当前正在阅读的 scene）
    const secs = [
      { id: 'about',    p: aboutP },
      { id: 'skills',   p: skillsP },
      { id: 'journey',  p: journeyP },
      { id: 'projects', p: projP },
      { id: 'contact',  p: contactP },
    ]
    const active = [...secs].filter(s => s.p > 0.01 && s.p < 0.99).pop()
    if (navRef.value) {
      navRef.value.querySelectorAll('.mv-nav-link').forEach(link => {
        link.classList.toggle('mv-nav-active', !!(active && link.dataset.sec === active.id))
      })
    }

    // ── 进度线
    if (progressRef.value) {
      const ms  = document.documentElement.scrollHeight - window.innerHeight
      const pct = ms > 0 ? lerpY / ms : 0
      progressRef.value.style.transform = `scaleX(${Math.min(1, pct)})`
    }

    frameCount++
    if (frameCount % 2 === 0) drawParticles(now)

    parallaxRaf = requestAnimationFrame(tick)
  }
  tick()
}

// ══ 自定义光标 ════════════════════════════════════════════════
let mx = 0, my = 0, rx = 0, ry = 0
let cursorRaf = null, cursorMoveHandler = null

function initCursor() {
  cursorMoveHandler = (e) => {
    mx = e.clientX; my = e.clientY
    if (coordsRef.value)
      coordsRef.value.textContent = `${String(Math.round(mx)).padStart(4,'0')} X ${String(Math.round(my)).padStart(4,'0')} Y`
  }
  document.addEventListener('mousemove', cursorMoveHandler)

  function cursorTick() {
    const dot = curDotRef.value, ring = curRingRef.value
    if (dot)  { dot.style.left  = mx + 'px'; dot.style.top  = my + 'px' }
    if (ring) {
      rx = lerp(rx, mx, 0.10); ry = lerp(ry, my, 0.10)
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
    }
    cursorRaf = requestAnimationFrame(cursorTick)
  }
  cursorTick()

  rootRef.value?.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => { el.style.transition = 'transform 0.08s ease' })
    el.addEventListener('mousemove',  (e) => {
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width/2) * 0.22}px,${(e.clientY - r.top - r.height/2) * 0.22}px)`
    })
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
      el.style.transform  = 'translate(0,0)'
    })
  })
}

// ══ 光标拖尾 ═════════════════════════════════════════════════
const pts = []; let trailRunning = false, trailRaf = null
let trailMoveHandler = null

function initTrail() {
  const canvas = trailRef.value; if (!canvas) return
  canvas.width = window.innerWidth; canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i]; p.life -= 0.035
      if (p.life <= 0) { pts.splice(i, 1); continue }
      alive = true
      ctx.beginPath(); ctx.arc(p.x, p.y, 2.2 * p.life, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(232,232,230,${p.life * 0.2})`; ctx.fill()
    }
    if (alive) trailRaf = requestAnimationFrame(draw); else trailRunning = false
  }

  trailMoveHandler = (e) => {
    pts.push({ x: e.clientX, y: e.clientY, life: 1 })
    if (!trailRunning) { trailRunning = true; draw() }
  }
  window.addEventListener('mousemove', trailMoveHandler)
}

// ── 画布 resize ───────────────────────────────────────────────
let resizeCanvasHandler = null
function initCanvasResize() {
  resizeCanvasHandler = () => {
    if (trailRef.value)     { trailRef.value.width    = window.innerWidth; trailRef.value.height    = window.innerHeight }
    if (pCanvas)             { pCanvas.width           = window.innerWidth; pCanvas.height           = window.innerHeight }
  }
  window.addEventListener('resize', resizeCanvasHandler)
}

// ── Hero 文字劈入 ─────────────────────────────────────────────
function revealHeroTitle() {
  setTimeout(() => {
    heroTitleRef.value?.querySelectorAll('.mv-char-inner').forEach(el => { el.style.transform = 'none' })
  }, 150)
  setTimeout(() => {
    document.querySelectorAll('.mv-word-inner').forEach(el => { el.style.transform = 'none' })
  }, 350)
}

// ── IO: Hero 数字计数 ─────────────────────────────────────────
let statsIo = null
function initObservers() {
  if (statsRef.value) {
    statsIo = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return
        target.querySelectorAll('.mv-counter').forEach(c => runCounter(c, 1200))
        statsIo?.unobserve(target)
      })
    }, { threshold: 0.3 })
    statsIo.observe(statsRef.value)
  }
}

// ── 生命周期 ──────────────────────────────────────────────────
let navRef = ref(null)  // declared early for use in initParallax

onMounted(async () => {
  injectFont()
  startClock()
  setTimeout(runScanLine, 400)
  initParticles()
  initParallax()
  initCursor()
  initTrail()
  initCanvasResize()
  revealHeroTitle()
  await nextTick()
  cacheScenes()
  initObservers()
  // 兜底：2s 后重新缓存（字体加载可能改变布局高度）
  setTimeout(cacheScenes, 2000)
})

onUnmounted(() => {
  cancelAnimationFrame(parallaxRaf)
  cancelAnimationFrame(cursorRaf)
  cancelAnimationFrame(trailRaf)
  clearInterval(clockTimer)
  if (scrollListener)       window.removeEventListener('scroll',    scrollListener)
  if (resizeListener)       window.removeEventListener('resize',    resizeListener)
  if (cursorMoveHandler)    document.removeEventListener('mousemove', cursorMoveHandler)
  if (trailMoveHandler)     window.removeEventListener('mousemove', trailMoveHandler)
  if (resizeCanvasHandler)  window.removeEventListener('resize',    resizeCanvasHandler)
  statsIo?.disconnect()
  pts.length = 0; particles.length = 0
})
</script>

<style scoped>
/* ══ 色彩 Token ══════════════════════════════════════════════ */
.mv {
  --bg:      rgb(10, 10, 8);
  --bg-hi:   rgb(18, 18, 16);
  --l1:      rgba(232,232,230,1.00);
  --l2:      rgba(232,232,230,0.60);
  --l3:      rgba(232,232,230,0.32);
  --l4:      rgba(232,232,230,0.08);
  --line:    rgba(232,232,230,0.08);
  --accent:  #ff2d00;
  --ease:    cubic-bezier(0.16, 1, 0.3, 1);
}

/* ══ 全局重置 ════════════════════════════════════════════════ */
.mv *, .mv *::before, .mv *::after {
  box-sizing: border-box;
  border-radius: 0;
  -webkit-font-smoothing: antialiased;
}
.mv {
  position: relative;
  background: var(--bg);
  color: var(--l1);
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  cursor: none;
  min-height: 100vh;
}
.ui-label {
  font-family: 'Space Mono', 'Geist Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--l3);
}

/* ══ 固定环境层 ══════════════════════════════════════════════ */
.mv-particles, .mv-trail {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0;
}
.mv-grain {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: grain 0.65s steps(3) infinite;
}
@keyframes grain {
  0%  { background-position: 0 0 }
  33% { background-position: -70px 40px }
  66% { background-position: 50px -60px }
}

/* ── HUD ── */
.mv-hud-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 2;
}
.mv-hud-bar {
  position: fixed; bottom: 1.4rem; left: 0; right: 0;
  display: flex; justify-content: space-between;
  padding-inline: clamp(1.5rem, 4vw, 5rem);
  pointer-events: none; z-index: 50;
}

/* ── L0/L1 ── */
.mv-l0 {
  position: fixed; inset: 0; z-index: 3; pointer-events: none;
  will-change: transform;
  background-image:
    linear-gradient(rgba(232,232,230,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(232,232,230,0.035) 1px, transparent 1px);
  background-size: 72px 72px;
}
.mv-l1 {
  position: fixed; left: 0; right: 0; top: 50%;
  z-index: 4; pointer-events: none;
  will-change: transform;
  font-size: clamp(10rem, 28vw, 20rem);
  font-weight: 900; line-height: 1;
  color: rgba(232,232,230,0.025);
  text-align: right; padding-right: 4vw;
  letter-spacing: -0.04em;
  transform: translateY(-50%);
}

/* ── 扫描线 ── */
.mv-scan {
  position: fixed; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 50%, transparent);
  top: 0; z-index: 9999; pointer-events: none; opacity: 0;
}

/* ── 进度线 ── */
.mv-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 1px;
  background: var(--accent); z-index: 9998; pointer-events: none;
  transform-origin: left; transform: scaleX(0);
}

/* ── 光标 ── */
.mv-cur {
  position: fixed; width: 5px; height: 5px;
  background: var(--l1); border-radius: 50%;
  pointer-events: none; z-index: 9997;
  transform: translate(-50%, -50%);
  transition: transform 0.15s var(--ease), background 0.15s;
}
.mv-cur.on-card {
  transform: translate(-50%, -50%) scale(4.5);
  background: transparent;
  border: 1px solid rgba(232,232,230,0.35);
}
.mv-cur-ring {
  position: fixed; width: 28px; height: 28px;
  border: 1px solid rgba(232,232,230,0.18);
  border-radius: 50%; pointer-events: none; z-index: 9996;
  transform: translate(-50%, -50%);
}

/* ══ 导航 ════════════════════════════════════════════════════ */
.mv-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(1.5rem, 4vw, 5rem);
  height: 52px;
  border-bottom: 1px solid var(--line);
  background: rgba(10,10,8,0.85);
  backdrop-filter: blur(12px);
}
.mv-brand {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 900; font-size: 0.85rem;
  color: var(--l1) !important; text-decoration: none !important;
  letter-spacing: -0.01em;
}
.mv-brand-sep { color: var(--l3) !important; margin-inline: 0.1em; }
.mv-brand-en  { font-weight: 400; color: var(--l2) !important; }
.mv-nav { display: flex; gap: 1.8rem; }
.mv-nav-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--l3) !important; text-decoration: none !important;
  transition: color 0.2s ease;
  position: relative;
}
.mv-nav-link::after {
  content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 1px;
  background: var(--accent); transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s var(--ease);
}
.mv-nav-link:hover { color: var(--l1) !important; }
.mv-nav-link:hover::after, .mv-nav-link.mv-nav-active::after { transform: scaleX(1); }
.mv-nav-link.mv-nav-active { color: var(--l1) !important; }
.mv-header-r { display: flex; align-items: center; gap: 1rem; }
.mv-lang {
  font-family: 'Space Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.08em;
  background: transparent; border: 1px solid var(--line);
  color: var(--l2) !important; padding: 0.3rem 0.7rem;
  cursor: none; transition: border-color 0.2s, color 0.2s;
}
.mv-lang:hover { border-color: var(--l2); color: var(--l1) !important; }

/* ══ SCENE 骨架 ══════════════════════════════════════════════ */
.mv-scene {
  position: relative;
}
.mv-sticky {
  position: sticky; top: 0; height: 100vh; overflow: hidden;
  background: var(--bg); /* 必须有背景色，否则透视到下一层 */
  z-index: 10;
}

/* 通用区块内容容器 */
.mv-sec-bg { }
.mv-sec-in {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  padding: 80px clamp(1.5rem, 4vw, 5rem) clamp(4rem, 8vw, 7rem);
  justify-content: center; gap: 2.5rem;
}
.mv-sec-head {
  display: flex; flex-direction: column; gap: 0.6rem;
}
.mv-sec-tag { transition: opacity 0.5s ease 0.05s; }
.mv-sec-title-clip { overflow: hidden; }
.mv-sec-h2 {
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 900; line-height: 0.9;
  letter-spacing: -0.04em; margin: 0;
  transform: translateY(110%);
  transition: transform 0.85s var(--ease) 0.1s;
}

/* 触发后的可见状态 */
.sec-visible .mv-sec-tag   { opacity: 1; }
.sec-visible .mv-sec-h2    { transform: translateY(0); }

/* 默认隐藏（进入 scene 前） */
.mv-sec-in:not(.sec-visible) .mv-sec-tag { opacity: 0; }

/* 大背景数字 */
.mv-bg-num {
  position: absolute; right: -0.04em; bottom: -0.08em;
  font-size: clamp(14rem, 32vw, 24rem);
  font-weight: 900; line-height: 1; pointer-events: none; user-select: none;
  color: rgba(232,232,230,0.028); letter-spacing: -0.06em;
}

/* ══ HERO ════════════════════════════════════════════════════ */
.mv-hero-inner {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center;
  padding: 0 clamp(1.5rem, 4vw, 5rem);
  gap: 1.5rem; will-change: transform, opacity;
}
.mv-eyebrow {
  color: var(--l2);
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem; letter-spacing: 0.12em;
  text-transform: uppercase; margin: 0;
}
.mv-hero-title {
  font-size: clamp(4.5rem, 11vw, 10rem);
  font-weight: 900; line-height: 0.88;
  letter-spacing: -0.04em; margin: 0;
  display: flex; flex-wrap: wrap;
}
.mv-char-outer { display: inline-block; overflow: hidden; vertical-align: bottom; }
.mv-char-inner {
  display: block; transform: translateY(110%);
  transition: transform 0.75s var(--ease);
}

.mv-hero-sub {
  font-size: clamp(0.9rem, 1.8vw, 1.15rem);
  color: var(--l2); margin: 0;
  display: flex; flex-wrap: wrap; gap: 0 0.25em;
}
.mv-word-outer { display: inline-block; overflow: hidden; }
.mv-word-inner {
  display: inline-block; transform: translateY(110%);
  transition: transform 0.65s var(--ease);
}

.mv-stats {
  display: flex; gap: clamp(1.5rem, 4vw, 3.5rem); flex-wrap: wrap;
}
.mv-stat { display: flex; flex-direction: column; gap: 0.25rem; }
.mv-stat-num {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 900; letter-spacing: -0.03em; line-height: 1;
  color: var(--l1);
}
.mv-stat-lbl { color: var(--l3); }

.mv-cta { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.mv-btn-fill {
  padding: 0.65rem 1.6rem;
  background: var(--l1); color: var(--bg);
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem; letter-spacing: 0.06em; text-transform: uppercase;
  text-decoration: none; border: none;
  transition: background 0.2s, color 0.2s;
  cursor: none; display: inline-block;
}
.mv-btn-fill:hover { background: rgba(232,232,230,0.85); }
.mv-btn-line {
  padding: 0.65rem 1.6rem;
  background: transparent; color: var(--l2);
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem; letter-spacing: 0.06em; text-transform: uppercase;
  text-decoration: none; border: 1px solid var(--line);
  transition: border-color 0.25s, color 0.25s;
  cursor: none; display: inline-block;
}
.mv-btn-line:hover { border-color: var(--l2); color: var(--l1); }

/* 跑马灯 */
.mv-ticker {
  position: absolute; bottom: 3.5rem; left: 0; right: 0;
  overflow: hidden; border-top: 1px solid var(--line);
  padding-block: 0.55rem;
}
.mv-ticker-track {
  display: flex; white-space: nowrap;
  animation: ticker 36s linear infinite;
}
.mv-ticker-item { padding-right: 1.5rem; color: var(--l3); flex-shrink: 0; }
@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }

/* 滚动提示 */
.mv-scroll-hint {
  position: absolute; bottom: 6.5rem; left: clamp(1.5rem,4vw,5rem);
  display: flex; align-items: center; gap: 0.5rem; transition: opacity 0.4s ease;
}
.mv-sh-arrow { font-size: 1.4rem; animation: sh-bounce 1.8s ease-in-out infinite; color: var(--l1); }
@keyframes sh-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }

/* ══ ABOUT ══════════════════════════════════════════════════ */
.mv-about-body {
  display: flex; flex-direction: column; gap: 2rem;
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.7s ease 0.2s, transform 0.7s var(--ease) 0.2s;
}
.sec-visible .mv-about-body { opacity: 1; transform: translateY(0); }
.mv-about-text {
  font-size: clamp(0.9rem, 1.6vw, 1.08rem); line-height: 1.7;
  color: var(--l2); max-width: 56ch; margin: 0;
}
.mv-about-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.mv-tag {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 0.3rem 0.7rem; border: 1px solid var(--line); color: var(--l3);
}

/* ══ SKILLS ═════════════════════════════════════════════════ */
.mv-skills-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0;
}
.mv-skill-col {
  border-top: 1px solid var(--line); padding: 1.5rem 1.5rem 1.5rem 0;
  opacity: 0; transform: translateX(-16px);
  transition: opacity 0.55s ease, transform 0.55s var(--ease);
}
.mv-skill-col.col-in { opacity: 1; transform: translateX(0); }
/* stagger via nth-child */
.mv-skill-col:nth-child(1) { transition-delay: 0.0s; }
.mv-skill-col:nth-child(2) { transition-delay: 0.08s; }
.mv-skill-col:nth-child(3) { transition-delay: 0.16s; }
.mv-skill-col:nth-child(4) { transition-delay: 0.24s; }
.mv-skill-cat { margin: 0 0 1.2rem; color: var(--l3); }
.mv-skill-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.85rem; }
.mv-skill-row { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
.mv-skill-name { font-size: 0.88rem; color: var(--l1); }
.mv-skill-hl   { font-size: 0.72rem; color: var(--l3); text-align: right; }

/* ══ JOURNEY ════════════════════════════════════════════════ */
.mv-timeline {
  display: flex; flex-direction: column; gap: 0;
}
.mv-tl-item {
  display: grid; grid-template-columns: 90px 1fr;
  gap: 1rem; padding: 1.2rem 0; border-top: 1px solid var(--line);
  opacity: 0; transform: translateX(-12px);
  transition: opacity 0.5s ease, transform 0.5s var(--ease);
}
.mv-tl-item.tl-in { opacity: 1; transform: translateX(0); }
.mv-tl-year { color: var(--l3); padding-top: 0.15rem; }
.mv-tl-title { font-size: clamp(1rem, 1.8vw, 1.2rem); font-weight: 700; margin: 0 0 0.4rem; }
.mv-tl-desc  { font-size: 0.85rem; line-height: 1.65; color: var(--l2); margin: 0; }

/* ══ PROJECTS ═══════════════════════════════════════════════ */
.mv-proj-sticky { padding-top: 0; }
.mv-proj-head {
  position: absolute; top: 0; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: flex-end;
  padding: 68px clamp(1.5rem,4vw,5rem) 0;
  z-index: 2;
}
.mv-proj-counter { color: var(--l3); font-size: 0.75rem; }
.mv-proj-total   { color: rgba(232,232,230,0.22); }
/* .mv-sec-h2 inside proj-head needs reveal */
.mv-proj-head .mv-sec-title-clip { overflow: hidden; }
.mv-proj-head .mv-sec-h2 {
  font-size: clamp(2.2rem, 5vw, 4rem);
}
.mv-proj-head .sec-visible .mv-sec-h2 { transform: translateY(0); }

/* 水平轨道 */
.mv-proj-track {
  display: flex; gap: 1.2rem;
  padding: 130px clamp(1.5rem,4vw,5rem) 0;
  will-change: transform;
  height: 100%;
  align-items: stretch;
}
.mv-proj-card {
  flex: 0 0 clamp(280px, 38vw, 480px);
  height: calc(100vh - 180px);
  display: flex; flex-direction: column;
  border: 1px solid var(--line);
  overflow: hidden; cursor: none; position: relative;
  transition: border-color 0.3s ease;
}
.mv-proj-card:hover { border-color: rgba(232,232,230,0.25); }
.mv-proj-visual {
  flex: 1 1 60%; overflow: hidden; position: relative;
  background: var(--bg-hi);
}
.mv-proj-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.65s var(--ease);
}
.mv-proj-card:hover .mv-proj-img { transform: scale(1.05); }
.mv-proj-ph {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
}
.mv-proj-info {
  flex: 0 0 auto; padding: 1.2rem 1.4rem;
  border-top: 1px solid var(--line);
}
.mv-proj-meta { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.mv-proj-idx  { color: var(--accent); }
.mv-proj-type { color: var(--l3); }
.mv-proj-name { font-size: clamp(1rem, 1.6vw, 1.3rem); font-weight: 700; margin: 0 0 0.6rem; }
.mv-proj-techs { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.mv-proj-tech  { padding: 0.2rem 0.5rem; border: 1px solid var(--line); color: var(--l3); }

/* 悬停遮罩 */
.mv-proj-hover {
  position: absolute; inset: 0; background: rgba(8,8,6,0.9);
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 1.5rem; gap: 0.8rem;
  opacity: 0; transition: opacity 0.3s ease;
}
.mv-proj-card:hover .mv-proj-hover { opacity: 1; }
.mv-proj-desc { font-size: 0.82rem; line-height: 1.6; color: var(--l2); margin: 0; }

/* ══ CONTACT ════════════════════════════════════════════════ */
.mv-contact-sticky {
  display: flex; flex-direction: column;
  justify-content: center;
  padding: 80px clamp(1.5rem,4vw,5rem) clamp(4rem,8vw,7rem);
  gap: 2rem;
}
.mv-contact-big {
  font-size: clamp(3rem, 9vw, 8rem);
  font-weight: 900; line-height: 0.9; letter-spacing: -0.04em;
  overflow: hidden;
}
.mv-contact-char {
  display: inline-block;
  color: rgb(40,40,38);
  transition: none;
}
.mv-contact-links {
  display: flex; flex-direction: column; gap: 0;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.6s ease 0.1s, transform 0.6s var(--ease) 0.1s;
}
.mv-contact-links.links-in { opacity: 1; transform: translateY(0); }
.mv-contact-row {
  display: flex; align-items: center; gap: 1.5rem;
  padding: 1rem 0; border-top: 1px solid var(--line);
  text-decoration: none; color: var(--l1);
  transition: color 0.2s ease;
}
a.mv-contact-row:hover { color: var(--l2); }
.mv-contact-lbl { min-width: 80px; color: var(--l3); }
.mv-contact-val { font-size: 0.95rem; flex: 1; }
.mv-contact-arr { color: var(--l3); margin-left: auto; transition: transform 0.2s var(--ease); }
a.mv-contact-row:hover .mv-contact-arr { transform: translateX(4px); }
.mv-dl-btn { align-self: flex-start; margin-top: 0.5rem; }

/* ══ FOOTER ═════════════════════════════════════════════════ */
.mv-footer {
  display: flex; justify-content: center; align-items: center; gap: 1rem;
  padding: 1.5rem clamp(1.5rem,4vw,5rem);
  border-top: 1px solid var(--line);
  background: var(--bg);
  position: relative; z-index: 20;
}
.mv-footer-dot { font-size: 0.5rem; color: var(--l3); }

/* ══ OVERLAY ════════════════════════════════════════════════ */
.mv-overlay {
  position: fixed; inset: 0; z-index: 5000;
  background: rgba(6,6,4,0.92); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
}
.mv-detail {
  background: var(--bg-hi); border: 1px solid var(--line);
  max-width: 600px; width: 100%; max-height: 88vh; overflow-y: auto;
  padding: 2rem; display: flex; flex-direction: column; gap: 1.2rem;
  position: relative;
}
.mv-detail-close {
  position: absolute; top: 1rem; right: 1rem;
  background: transparent; border: 1px solid var(--line);
  color: var(--l2); width: 32px; height: 32px;
  font-size: 0.8rem; cursor: none;
  transition: border-color 0.2s, color 0.2s;
}
.mv-detail-close:hover { border-color: var(--l2); color: var(--l1); }
.mv-detail-img img { width: 100%; height: 200px; object-fit: cover; display: block; }
.mv-detail-type  { color: var(--l3); }
.mv-detail-title { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 900; letter-spacing: -0.03em; margin: 0; }
.mv-detail-desc  { font-size: 0.88rem; line-height: 1.7; color: var(--l2); margin: 0; }
.mv-detail-techs { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.mv-detail-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }

/* ── Transition ── */
.mv-fade-enter-active, .mv-fade-leave-active { transition: opacity 0.3s ease; }
.mv-fade-enter-from,  .mv-fade-leave-to     { opacity: 0; }

/* ══ 模式切换按钮 ════════════════════════════════════════════ */

/* ══ Reduced motion ══════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .mv *, .mv *::before, .mv *::after {
    animation: none !important;
    transition: none !important;
  }
  .mv-char-inner, .mv-word-inner { transform: none !important; }
  .mv-sec-h2 { transform: none !important; }
  .mv-contact-links { opacity: 1 !important; transform: none !important; }
}
</style>
