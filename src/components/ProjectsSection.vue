<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <h2 class="section-title">工作经历</h2>
      <p class="section-subtitle">将复杂的工作问题转化为可量化的技术解决方案</p>
      
      <div class="projects-grid">
        <ProjectCard 
          v-for="project in projects" 
          :key="project.id" 
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.vue'
</script>

<style scoped>
.projects-section {
  padding: 40px 20px;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 16px;
  font-weight: 600;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .projects-section {
    padding: 40px 20px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 40px;
  }
  
  .projects-grid {
    gap: 24px;
  }
}
</style>
