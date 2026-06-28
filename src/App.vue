<template>
  <div class="app">
    <!-- Classic view -->
    <template v-if="!motionMode">
      <Navbar />
      <main class="main-content page-shell">
        <HeroSection />
        <section class="page-section page-section-dark" v-scroll-fade-in="{ distance: 72, start: 'top 95%', end: 'top 65%', scrub: 1 }">
          <AboutSection />
        </section>
        <section class="page-section page-section-dark" v-scroll-fade-in="{ distance: 68, start: 'top 95%', end: 'top 66%', scrub: 1 }">
          <ProjectsSection />
        </section>
        <section class="page-section page-section-dark" v-scroll-fade-in="{ distance: 64, start: 'top 94%', end: 'top 66%', scrub: 0.95 }">
          <ProjectShowcase />
        </section>
        <section class="page-section page-section-dark" v-scroll-fade-in="{ distance: 60, start: 'top 94%', end: 'top 67%', scrub: 0.9 }">
          <JourneySection />
        </section>
        <section class="page-section page-section-dark" v-scroll-fade-in="{ distance: 56, start: 'top 93%', end: 'top 67%', scrub: 0.85 }">
          <SkillsSection />
        </section>
        <section class="page-section page-section-dark" v-scroll-fade-in="{ distance: 52, start: 'top 93%', end: 'top 68%', scrub: 0.8 }">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </template>

    <!-- Motion view -->
    <MotionView v-else />

    <!-- Floating mode toggle (always visible) -->
    <button
      class="mode-toggle"
      :class="{ 'mode-toggle--motion': motionMode }"
      @click="switchMode"
      :aria-label="motionMode ? '返回经典版' : '体验动效版'"
    >
      <span class="mode-toggle-icon" aria-hidden="true">{{ motionMode ? '←' : '✦' }}</span>
      <span class="mode-toggle-label">{{ motionMode ? (isChinese ? '经典版' : 'Classic') : (isChinese ? '动效版' : 'Motion') }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isChinese } from './composables/useI18n.js'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import HeroSection from './components/home/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ProjectShowcase from './components/sections/ProjectShowcase.vue'
import JourneySection from './components/sections/JourneySection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import MotionView from './views/MotionView.vue'

const motionMode = ref(false)

function switchMode () {
  motionMode.value = !motionMode.value
  window.scrollTo({ top: 0, behavior: 'instant' })
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: transparent;
}

.main-content {
  margin-top: 70px;
}

.page-shell {
  background: var(--color-pitch-black);
}

.page-section {
  position: relative;
  padding: 0;
}

.page-section-light {
  background: var(--color-ghost-white);
  color: var(--color-space-gray);
}

.page-section-dark {
  background: var(--color-pitch-black);
  color: var(--color-cloud-white);
}

/* ── Floating mode toggle ─────────────────────────────────── */
.mode-toggle {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9000;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(20, 20, 20, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  color: rgba(255,255,255,0.75);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.2s;
  box-shadow: 0 4px 24px rgba(0,0,0,0.5);
}
.mode-toggle:hover {
  border-color: rgba(255,255,255,0.3);
  color: #fff;
  transform: translateY(-2px);
}

.mode-toggle--motion {
  background: rgba(255,45,0,0.12);
  border-color: rgba(255,45,0,0.3);
  color: rgba(255,200,195,0.9);
}
.mode-toggle--motion:hover {
  border-color: rgba(255,45,0,0.55);
  color: #ff8070;
}

.mode-toggle-icon {
  font-size: 0.9rem;
  line-height: 1;
}

.mode-toggle-label {
  font-family: -apple-system, 'SF Pro Text', 'PingFang SC', sans-serif;
}

@media (max-width: 768px) {
  .main-content {
    margin-top: 60px;
  }

  .mode-toggle {
    bottom: 20px;
    right: 16px;
    padding: 9px 14px;
    font-size: 0.74rem;
  }
}
</style>
