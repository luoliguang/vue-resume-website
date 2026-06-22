<template>
  <section id="home" class="hero-section" :class="{ 'hero-ready': hasMounted }">
    <div class="hero-container">
      <!-- 左侧面板 -->
      <div class="hero-left hero-animate hero-animate-left">
        <div class="profile-section">
          <div class="avatar-container">
            <img 
              src="/images/me.jpg" 
              :alt="ht('title_zh', 'title_en', 'hero.title')"
              class="avatar-img"
              @error="handleImageError"
            >
            <div v-if="imageError" class="avatar-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>{{ ht('title_zh', 'title_en', 'hero.title') }}</span>
            </div>
          </div>
          <div class="tagline">
            <div class="tagline-line">{{ ht('subtitle_zh', 'subtitle_en', 'hero.subtitle') }}</div>
          </div>
        </div>
      </div>

      <!-- 右侧面板 -->
      <div class="hero-right hero-animate hero-animate-right">
        <h1 class="main-title hero-stagger hero-stagger-1">{{ ht('title_zh', 'title_en', 'hero.title') }}</h1>
        <p class="brand-name hero-stagger hero-stagger-2">
          <span class="real-name">{{ t('hero.realNameLabel') }} {{ ht('real_name_zh', 'real_name_en', 'hero.realName') }}</span>
          <span class="brand-sep">·</span>
          <span class="handle">{{ hv('nickname', 'hero.nickname') }}</span>
        </p>
        <div class="title-divider hero-stagger hero-stagger-3"></div>
        <p class="description hero-stagger hero-stagger-4">{{ ht('description_zh', 'description_en', 'hero.description') }}</p>
        <div class="action-buttons hero-stagger hero-stagger-5">
          <button class="animated-button btn-primary" @click="scrollToAbout">
            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
            <span class="text">{{ t('hero.cta') }}</span>
            <span class="circle"></span>
            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
          </button>
          <button class="animated-button btn-secondary" @click="scrollToProjects">
            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
            <span class="text">{{ t('hero.cta2') }}</span>
            <span class="circle"></span>
            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
          </button>
          <button class="btn-ghost" @click="openQuickIntro">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 14.93V18h-2v-1.07a6.002 6.002 0 0 1-4.93-4.93H6v-2h1.07A6.002 6.002 0 0 1 12 5.07V4h2v1.07a6.002 6.002 0 0 1 4.93 4.93H20v2h-1.07A6.002 6.002 0 0 1 13 16.93z"/>
            </svg>
            {{ t('hero.cta3') }}
          </button>
          <a class="btn-ghost btn-download" href="/resume.pdf" download="罗洋洋-简历.pdf" target="_blank">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 16l-5-5 1.41-1.41L11 13.17V4h2v9.17l2.59-2.58L17 11l-5 5zm-7 2h14v2H5v-2z"/>
            </svg>
            {{ t('hero.cta4') }}
          </a>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isQuickIntroOpen" class="quick-intro-overlay" @click.self="closeQuickIntro">
        <div class="quick-intro-card">
          <button class="quick-intro-close" @click="closeQuickIntro" aria-label="Close">×</button>

          <!-- 定位句 -->
          <p class="qi-tagline">{{ t('hero.quickIntro.tagline') }}</p>

          <!-- 4 个数字网格 -->
          <div class="qi-stats">
            <div class="qi-stat">
              <span class="qi-num">{{ t('hero.quickIntro.stat1num') }}</span>
              <span class="qi-label">{{ t('hero.quickIntro.stat1label') }}</span>
            </div>
            <div class="qi-stat">
              <span class="qi-num">{{ t('hero.quickIntro.stat2num') }}</span>
              <span class="qi-label">{{ t('hero.quickIntro.stat2label') }}</span>
            </div>
            <div class="qi-stat qi-stat-green">
              <span class="qi-num">{{ t('hero.quickIntro.stat3num') }}</span>
              <span class="qi-label">{{ t('hero.quickIntro.stat3label') }}</span>
            </div>
            <div class="qi-stat">
              <span class="qi-num">{{ t('hero.quickIntro.stat4num') }}</span>
              <span class="qi-label">{{ t('hero.quickIntro.stat4label') }}</span>
            </div>
          </div>

          <!-- 底部一句话 -->
          <p class="qi-footer">{{ t('hero.quickIntro.footer') }}</p>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { t, isChinese } from '../../composables/useI18n.js'
import { useContent } from '../../composables/useContent.js'

gsap.registerPlugin(ScrollTrigger)

const { data: cmsHero } = useContent('hero')
// CMS 双语字段：优先用数据库值，否则 fallback 到 i18n
const ht = (zhKey, enKey, i18nKey) =>
  (isChinese.value ? cmsHero.value?.[zhKey] : cmsHero.value?.[enKey]) || t(i18nKey)
// CMS 单值字段（中英相同，如 nickname）
const hv = (key, i18nKey) => cmsHero.value?.[key] || t(i18nKey)

const imageError = ref(false)
const isQuickIntroOpen = ref(false)
const hasMounted = ref(false)

const handleImageError = () => {
  imageError.value = true
}

const scrollToAbout = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' })
}

const scrollToProjects = () => {
  const projectsSection = document.getElementById('projects')
  if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' })
}

const openQuickIntro = () => {
  isQuickIntroOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeQuickIntro = () => {
  isQuickIntroOpen.value = false
  document.body.style.overflow = ''
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && isQuickIntroOpen.value) closeQuickIntro()
}

const runHeroCinematicAnimation = () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.fromTo(
    '.avatar-container',
    { opacity: 0, y: 40, scale: 0.92, rotate: -2 },
    { opacity: 1, y: 0, scale: 1, rotate: 0, duration: isMobile ? 0.9 : 1.1 }
  )
    .fromTo(
      '.tagline-line',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.7'
    )
    .fromTo(
      ['.main-title', '.brand-name', '.title-divider', '.description'],
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: isMobile ? 0.68 : 0.8, stagger: 0.12 },
      '-=0.55'
    )
    .fromTo(
      '.action-buttons .animated-button',
      { opacity: 0, y: 18, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.72, stagger: 0.08 },
      '-=0.45'
    )
}

onMounted(() => {
  hasMounted.value = true
  window.addEventListener('keydown', handleKeydown)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReducedMotion) {
    runHeroCinematicAnimation()

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (!isMobile) {
      gsap.to('.hero-left', {
        y: -34,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      })

      gsap.to('.hero-right', {
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      })

      gsap.to('.hero-section', {
        backgroundPosition: '50% 42%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })
    }
  }
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.hero-section {
  min-height: 680px;
  background: radial-gradient(110% 140% at 50% 0%, var(--color-space-gray) 0%, #101012 45%, var(--color-pitch-black) 100%);
  background-size: 100% 120%;
  background-position: 50% 50%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  overflow: hidden;
  color: var(--color-ghost-white);
}

.hero-container {
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(340px, 1fr);
  gap: clamp(20px, 4vw, 48px);
  align-items: center;
}

.hero-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-container {
  width: 280px;
  height: 280px;
  border-radius: 28px;
  overflow: hidden;
  margin-bottom: 24px;
  border: 1px solid #333336;
  background: #161617;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #161617;
  color: #86868b;
}

.tagline-line {
  font-size: 20px;
  font-weight: 400;
  color: var(--text-on-dark);
  line-height: 1.25;
  letter-spacing: -0.2px;
}

html[data-theme='legacy'] .tagline-line {
  color: var(--text-on-light) !important;
}

.hero-right {
  min-width: 0;
}

.main-title {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
  line-height: 1.07;
  letter-spacing: -0.73px;
}

.brand-name {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 16px;
  font-weight: 400;
  margin: 6px 0 12px;
  letter-spacing: -0.32px;
  text-transform: none;
}

.brand-name .real-name {
  color: #5a6472;
}

.brand-name .brand-sep {
  color: #c2c8d0;
}

.brand-name .handle {
  color: #2997ff;
  letter-spacing: 0.5px;
}

.title-divider {
  width: 72px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #0071e3, rgba(0, 113, 227, 0.1));
  margin-bottom: 24px;
}

.description {
  font-size: 17px;
  line-height: 1.5;
  color: #c7c7cc;
  margin-bottom: 32px;
  max-width: 54ch;
  letter-spacing: -0.32px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.animated-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 9px 30px;
  border: 1px solid transparent;
  font-size: 17px;
  background-color: transparent;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: -0.32px;
  cursor: pointer;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.animated-button svg {
  position: absolute;
  width: 18px;
  z-index: 2;
  transition: all 0.35s ease;
}

.animated-button .arr-1 {
  right: 12px;
}

.animated-button .arr-2 {
  left: -22px;
}

.animated-button .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.35s ease;
}

.animated-button .text {
  position: relative;
  z-index: 1;
  transform: translateX(-6px);
  transition: all 0.35s ease;
}

.animated-button:hover .arr-1 {
  right: -20px;
}

.animated-button:hover .arr-2 {
  left: 12px;
}

.animated-button:hover .text {
  transform: translateX(8px);
}

.animated-button:active {
  transform: scale(0.97);
}

.animated-button:hover .circle {
  width: 170px;
  height: 170px;
  opacity: 0.16;
}

.btn-primary {
  background: linear-gradient(180deg, #0a84ff 0%, #0071e3 100%);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.18);
}

.btn-primary:hover {
  transform: translateY(-1px);
  background: linear-gradient(180deg, #2997ff 0%, #0077ed 100%);
}

.btn-primary svg {
  fill: #ffffff;
}

.btn-primary .circle {
  background-color: #ffffff;
}

.btn-secondary {
  border-color: #424245;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(29, 29, 31, 0.86);
}

.btn-secondary:hover {
  background: rgba(51, 51, 54, 0.92);
  border-color: #5a5a5f;
}

.btn-secondary svg {
  fill: rgba(255, 255, 255, 0.9);
}

.btn-secondary .circle {
  background-color: #2997ff;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: transparent;
  color: #86868b;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: color 0.2s ease;
  align-self: center;
}

.btn-ghost:hover {
  color: #c7c7cc;
}

.btn-download {
  text-decoration: none;
  margin-left: 4px;
}

.quick-intro-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 2000;
}

.quick-intro-card {
  position: relative;
  width: min(480px, 100%);
  border-radius: 28px;
  padding: 36px 32px 32px;
  background: #1d1d1f;
  border: 1px solid #333336;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
}

.quick-intro-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 999px;
  background: #333336;
  color: #86868b;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  transition: background 0.2s, color 0.2s;
}

.quick-intro-close:hover {
  background: #424245;
  color: #f5f5f7;
}

/* 定位句 */
.qi-tagline {
  font-size: 22px;
  font-weight: 600;
  color: #f5f5f7;
  letter-spacing: -0.5px;
  line-height: 1.25;
  margin: 0 0 28px;
  padding-right: 24px;
}

/* 4 数字网格 */
.qi-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.qi-stat {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 18px;
  border-radius: 18px;
  background: #161617;
  border: 1px solid #2a2a2d;
}

.qi-num {
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -1.5px;
  line-height: 1;
}

.qi-stat-green .qi-num {
  color: #30d158;
}

.qi-label {
  font-size: 12px;
  font-weight: 500;
  color: #86868b;
  letter-spacing: -0.2px;
}

/* 底部说明 */
.qi-footer {
  font-size: 13px;
  line-height: 1.6;
  color: #6e6e73;
  margin: 0;
  letter-spacing: -0.2px;
  border-top: 1px solid #2a2a2d;
  padding-top: 18px;
}

@media (max-width: 968px) {
  .hero-container {
    gap: 32px;
  }

  .main-title {
    font-size: clamp(36px, 7vw, 52px);
  }

  .avatar-container {
    width: 240px;
    height: 240px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 28px 16px;
    min-height: auto;
  }

  .hero-container {
    grid-template-columns: 1fr;
    gap: 28px;
    text-align: center;
  }

  .main-title {
    font-size: 44px;
  }

  .description {
    margin-left: auto;
    margin-right: auto;
  }

  .avatar-container {
    width: 208px;
    height: 208px;
  }

  .action-buttons {
    justify-content: center;
  }

  .brand-name {
    justify-content: center;
  }

  .quick-intro-card {
    width: min(100%, 480px);
    padding: 28px 24px 24px;
  }

  .qi-tagline { font-size: 19px; }
  .qi-num { font-size: 30px; }
}

@media (max-width: 480px) {
  .main-title { font-size: 36px; }

  .brand-name,
  .description,
  .animated-button {
    font-size: 16px;
  }

  .animated-button {
    padding: 9px 26px;
  }

  .avatar-container {
    width: 176px;
    height: 176px;
  }

  .quick-intro-overlay { padding: 16px; }

  .quick-intro-card {
    border-radius: 20px;
    padding: 24px 20px 20px;
  }

  .qi-tagline { font-size: 17px; margin-bottom: 20px; }
  .qi-num { font-size: 28px; }
  .qi-stat { padding: 16px 14px; }
}
</style>
