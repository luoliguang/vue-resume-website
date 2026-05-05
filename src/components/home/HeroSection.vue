<template>
  <section id="home" class="hero-section" :class="{ 'hero-ready': hasMounted }">
    <div class="hero-container">
      <!-- 左侧面板 -->
      <div class="hero-left hero-animate hero-animate-left">
        <div class="profile-section">
          <div class="avatar-container">
            <img 
              src="/images/me.jpg" 
              :alt="t('hero.title')" 
              class="avatar-img"
              @error="handleImageError"
            >
            <div v-if="imageError" class="avatar-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>{{ t('hero.title') }}</span>
            </div>
          </div>
          <div class="tagline">
            <div class="tagline-line">{{ t('hero.subtitle') }}</div>
          </div>
        </div>
      </div>

      <!-- 右侧面板 -->
      <div class="hero-right hero-animate hero-animate-right">
        <h1 class="main-title hero-stagger hero-stagger-1">{{ t('hero.title') }}</h1>
        <p class="brand-name hero-stagger hero-stagger-2">{{ t('hero.nickname') }}</p>
        <div class="title-divider hero-stagger hero-stagger-3"></div>
        <p class="description hero-stagger hero-stagger-4">{{ t('hero.description') }}</p>
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
          <button class="animated-button btn-quick" @click="openQuickIntro">
            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 14.93V18h-2v-1.07a6.002 6.002 0 0 1-4.93-4.93H6v-2h1.07A6.002 6.002 0 0 1 12 5.07V4h2v1.07a6.002 6.002 0 0 1 4.93 4.93H20v2h-1.07A6.002 6.002 0 0 1 13 16.93z"
              ></path>
            </svg>
            <span class="text">{{ t('hero.cta3') }}</span>
            <span class="circle"></span>
            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 14.93V18h-2v-1.07a6.002 6.002 0 0 1-4.93-4.93H6v-2h1.07A6.002 6.002 0 0 1 12 5.07V4h2v1.07a6.002 6.002 0 0 1 4.93 4.93H20v2h-1.07A6.002 6.002 0 0 1 13 16.93z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isQuickIntroOpen" class="quick-intro-overlay" @click.self="closeQuickIntro">
        <div class="quick-intro-card">
          <button class="quick-intro-close" @click="closeQuickIntro" aria-label="Close">×</button>

          <div class="qi-header">
            <span class="qi-badge">{{ t('hero.cta3') }}</span>
            <h2 class="qi-name">{{ t('hero.title') }}</h2>
            <p class="qi-brand">{{ t('hero.nickname') }}</p>
          </div>

          <p class="qi-text">{{ t('hero.quickIntro.text') }}</p>

          <div class="qi-divider"></div>

          <div class="qi-highlights">
            <div class="qi-highlight">
              <span class="qi-hlabel">{{ t('hero.quickIntro.label1') }}</span>
              <span class="qi-hvalue">{{ t('hero.quickIntro.value1') }}</span>
            </div>
            <div class="qi-highlight">
              <span class="qi-hlabel">{{ t('hero.quickIntro.label2') }}</span>
              <span class="qi-hvalue">{{ t('hero.quickIntro.value2') }}</span>
            </div>
            <div class="qi-highlight">
              <span class="qi-hlabel">{{ t('hero.quickIntro.label3') }}</span>
              <span class="qi-hvalue">{{ t('hero.quickIntro.value3') }}</span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { t } from '../../composables/useI18n.js'

gsap.registerPlugin(ScrollTrigger)

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
  font-size: 17px;
  font-weight: 400;
  color: #2997ff;
  margin: 4px 0 12px;
  letter-spacing: -0.32px;
  text-transform: none;
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
  padding: 9px 18px;
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

.btn-quick {
  border-color: #424245;
  color: #f5f5f7;
  background: rgba(22, 22, 23, 0.86);
}

.btn-quick svg {
  fill: #86868b;
}

.btn-quick .circle {
  background-color: #2997ff;
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
  width: min(620px, 100%);
  border-radius: 28px;
  padding: 32px;
  background: #1d1d1f;
  border: 1px solid #333336;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
}

.quick-intro-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 999px;
  background: #333336;
  color: #f5f5f7;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
}

.quick-intro-close:hover {
  background: #424245;
}

.qi-header { margin-bottom: 20px; }

.qi-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(41, 151, 255, 0.15);
  color: #2997ff;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: -0.48px;
  margin-bottom: 12px;
}

.qi-name {
  margin: 0 0 6px;
  font-size: 40px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -0.3px;
}

.qi-brand {
  margin: 0;
  color: #86868b;
  font-weight: 400;
  letter-spacing: -0.31px;
  font-size: 14px;
}

.qi-text {
  margin: 0 0 20px;
  color: #f5f5f7;
  line-height: 1.43;
  font-size: 14px;
  letter-spacing: -0.31px;
}

.qi-divider {
  height: 1px;
  background: #333336;
  margin-bottom: 20px;
}

.qi-highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.qi-highlight {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border-radius: 18px;
  background: #161617;
  border: 1px solid #333336;
}

.qi-hlabel {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: #2997ff;
}

.qi-hvalue {
  font-size: 14px;
  font-weight: 400;
  color: #f5f5f7;
  line-height: 1.43;
  letter-spacing: -0.31px;
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

  .quick-intro-card {
    width: min(100%, 520px);
    padding: 24px;
  }

  .qi-name { font-size: 32px; }
  .qi-highlights { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .main-title { font-size: 36px; }

  .brand-name,
  .description,
  .animated-button {
    font-size: 16px;
  }

  .avatar-container {
    width: 176px;
    height: 176px;
  }

  .quick-intro-overlay { padding: 16px; }

  .quick-intro-card {
    border-radius: 20px;
    padding: 20px;
  }
}
</style>
