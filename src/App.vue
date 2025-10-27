<template>
  <div class="app">
    <Navbar />
    <main class="main-content">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ProjectShowcase />
      <JourneySection />
      <SkillsSection />
      <ContactSection />
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
  background: #ffffff;
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
