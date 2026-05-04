<template>
  <div class="app">
    <Navbar />
    <main class="main-content">
      <HeroSection />
      <div v-scroll-fade-in="{ distance: 72, start: 'top 95%', end: 'top 65%', scrub: 1 }">
        <AboutSection />
      </div>
      <div v-scroll-fade-in="{ distance: 68, start: 'top 95%', end: 'top 66%', scrub: 1 }">
        <ProjectsSection />
      </div>
      <div v-scroll-fade-in="{ distance: 64, start: 'top 94%', end: 'top 66%', scrub: 0.95 }">
        <ProjectShowcase />
      </div>
      <div v-scroll-fade-in="{ distance: 60, start: 'top 94%', end: 'top 67%', scrub: 0.9 }">
        <JourneySection />
      </div>
      <div v-scroll-fade-in="{ distance: 56, start: 'top 93%', end: 'top 67%', scrub: 0.85 }">
        <SkillsSection />
      </div>
      <div v-scroll-fade-in="{ distance: 52, start: 'top 93%', end: 'top 68%', scrub: 0.8 }">
        <ContactSection />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import HeroSection from './components/home/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ProjectShowcase from './components/sections/ProjectShowcase.vue'
import JourneySection from './components/sections/JourneySection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: transparent;
}

.main-content {
  margin-top: 70px;
}

@media (max-width: 768px) {
  .main-content {
    margin-top: 60px;
  }
}
</style>
