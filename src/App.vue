<template>
  <div class="app">
    <Navbar />
    <main class="main-content">
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
}

.main-content {
  margin-top: 70px;
}
</style>
