<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <h2 class="section-title">{{ t('projects.title') }}</h2>
      <p class="section-subtitle">{{ t('projects.subtitle') }}</p>
      
      <!-- 项目分类筛选 -->
      <div class="filter-wrapper">
        <GlassToggle 
          v-model="activeCategory"
          :items="projectCategories.map(cat => ({
            value: cat.id,
            label: cat.name[isChinese ? 'zh' : 'en'],
            count: cat.count
          }))"
          color="#3498db"
          @change="setActiveCategory"
        />
      </div>

      <!-- 项目展示网格 -->
      <div class="projects-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="project-card"
          :class="{ 'status-developing': project.status === 'developing' }"
        >
            <!-- 项目预览图 -->
          <div class="project-image" 
               :class="{ 'clickable': project.demoType === 'media' && project.modalContent }"
               @click="project.demoType === 'media' && project.modalContent ? openModal(project) : null">
            <img 
              :src="project.image" 
              :alt="project.title"
              @error="handleImageError"
            >
            <div v-if="imageErrors[project.id]" class="image-placeholder">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
            </div>
            <div v-if="project.status === 'developing'" class="status-badge">
              {{ isChinese ? '开发中' : 'Developing' }}
            </div>
            <!-- 模态框提示图标 -->
            <div v-if="project.demoType === 'media' && project.modalContent" class="demo-indicator">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          <!-- 项目信息 -->
          <div class="project-content">
            <h3 class="project-title">{{ project.title[isChinese ? 'zh' : 'en'] }}</h3>
            <p class="project-description">{{ project.description[isChinese ? 'zh' : 'en'] }}</p>

            <!-- 技术标签 -->
            <div class="tech-tags">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Before & After 对比展示 -->
            <div v-if="project.before && project.after" class="before-after-section">
              <div class="comparison-item before">
                <div class="comparison-label">{{ isChinese ? 'Before' : 'Before' }}</div>
                <div class="comparison-content">{{ project.before[isChinese ? 'zh' : 'en'] }}</div>
              </div>
              <div class="comparison-item after">
                <div class="comparison-label">{{ isChinese ? 'After' : 'After' }}</div>
                <div class="comparison-content">{{ project.after[isChinese ? 'zh' : 'en'] }}</div>
              </div>
            </div>

            <!-- 三段式展示：痛点 → 解决方案 → 成果 -->
            <div v-if="project.challenge || project.solution || project.result" class="project-process">
              <!-- 痛点 -->
              <div v-if="project.challenge" class="process-item challenge">
                <h4 class="process-title">{{ isChinese ? '痛点' : 'Challenge' }}</h4>
                <p class="process-text">{{ project.challenge[isChinese ? 'zh' : 'en'] }}</p>
              </div>

              <!-- 解决方案 -->
              <div v-if="project.solution" class="process-item solution">
                <h4 class="process-title">{{ isChinese ? '解决方案' : 'Solution' }}</h4>
                <p class="process-text">{{ project.solution[isChinese ? 'zh' : 'en'] }}</p>
              </div>

              <!-- 成果 -->
              <div v-if="project.result" class="process-item result">
                <h4 class="process-title">{{ isChinese ? '成果' : 'Result' }}</h4>
                <p class="process-text">{{ project.result[isChinese ? 'zh' : 'en'] }}</p>
              </div>
            </div>

            <!-- 查看详情按钮 - 根据项目类型显示不同文案 -->
            <div class="project-action">
              <a 
                v-if="project.demoType === 'link' && project.link !== '#'" 
                :href="project.link" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="view-more-btn"
              >
                {{ getActionText(project) }} →
              </a>
              <button 
                v-else-if="project.demoType === 'media' && project.modalContent"
                @click="openModal(project)"
                class="view-more-btn"
              >
                {{ getActionText(project) }} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框 - 用于展示GIF、视频、图片 -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <!-- GIF/图片展示 -->
          <img 
            v-if="currentModalContent?.type === 'gif' || currentModalContent?.type === 'image'" 
            :src="currentModalContent?.src" 
            :alt="currentModalContent?.title"
            class="modal-media"
          />
          <!-- 视频展示 -->
          <video 
            v-if="currentModalContent?.type === 'video'" 
            :src="currentModalContent?.src" 
            controls 
            autoplay
            class="modal-media"
          />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { projectShowcase, projectCategories } from '../../data/projectShowcase.js'
import { t, isChinese } from '../../composables/useI18n.js'
import GlassToggle from '../ui/GlassToggle.vue'

const activeCategory = ref('all')
const imageErrors = ref({})
const isModalOpen = ref(false)
const currentModalContent = ref(null)

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') {
    return projectShowcase
  }
  return projectShowcase.filter(project => project.category === activeCategory.value)
})

const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const handleImageError = (event) => {
  const projectId = event.target.closest('.project-card').dataset.projectId
  imageErrors.value[projectId] = true
}

const getActionText = (project) => {
  // 根据项目类型和媒体类型决定按钮文案
  if (project.demoType === 'media') {
    // 有视频/GIF等演示内容
    return isChinese.value ? '查看演示' : 'View Demo'
  } else if (project.demoType === 'link') {
    // 网站项目，直接访问
    return isChinese.value ? '查看详情' : 'View Details'
  }
  // 默认
  return isChinese.value ? '了解更多' : 'Learn More'
}

const openModal = (project) => {
  if (project.modalContent) {
    currentModalContent.value = project.modalContent
    isModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }
}

const closeModal = () => {
  isModalOpen.value = false
  currentModalContent.value = null
  document.body.style.overflow = ''
}

// ESC 键关闭模态框
const handleEscape = (e) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.projects-section {
  padding: 80px 20px;
  background: linear-gradient(180deg, #e8eaf0 0%, #f0f2f5 100%);
  min-height: 100vh;
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
  margin-bottom: 40px;
}

.filter-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

/* 项目网格 */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
}

.project-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.project-card.status-developing {
  border: 2px solid #f39c12;
}

/* 项目图片 */
.project-image {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-image.clickable {
  cursor: pointer;
}

/* 演示指示器 */
.demo-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: rgba(52, 152, 219, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-image.clickable:hover .demo-indicator {
  opacity: 1;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #6c757d;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f39c12;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* 项目内容 */
.project-content {
  padding: 20px;
}

.project-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.project-subtitle {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 12px;
  font-style: italic;
}

.project-description {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 15px;
}

/* 技术标签 */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
}

.tech-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* 项目亮点 */
.project-highlights {
  margin-bottom: 15px;
}

.highlights-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.highlights-list {
  list-style: none;
  padding: 0;
}

.highlights-list li {
  position: relative;
  padding-left: 12px;
  margin-bottom: 4px;
  font-size: 0.85rem;
  color: #555;
}

.highlights-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #3498db;
  font-weight: bold;
}

/* 项目结果 */
.project-result {
  margin-bottom: 15px;
}

.result-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 6px;
}

.result-text {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #555;
}

/* 查看详情按钮 */
.project-action {
  text-align: right;
}

.view-more-btn {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.85rem;
  transition: color 0.3s ease;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.view-more-btn:hover {
  color: #2980b9;
}

/* Before & After 对比展示 - 新的简洁样式 */
.before-after-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.comparison-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid;
}

.comparison-item.before {
  background: #fff5f5;
  border-color: #fecaca;
}

.comparison-item.after {
  background: #f0fdf4;
  border-color: #86efac;
}

.comparison-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 0;
}

.comparison-item.before .comparison-label {
  color: #dc2626;
}

.comparison-item.after .comparison-label {
  color: #16a34a;
}

.comparison-content {
  font-size: 0.8rem;
  line-height: 1.4;
  color: #555;
}

/* 三段式展示样式 - 改为简洁的标签样式 */
.project-process {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.process-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid;
}

.process-item.challenge {
  border-color: #f39c12;
}

.process-item.solution {
  border-color: #3498db;
}

.process-item.result {
  border-color: #27ae60;
}

.process-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.process-text {
  font-size: 0.8rem;
  line-height: 1.4;
  color: #555;
  margin: 0;
}

/* 平板端 */
@media (max-width: 968px) {
  .projects-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 2.25rem;
    margin-bottom: 12px;
  }
  
  .section-subtitle {
    font-size: 1.05rem;
    margin-bottom: 40px;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .project-content {
    padding: 18px;
  }
  
  .project-image {
    height: 140px;
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .projects-section {
    padding: 50px 16px;
  }
  
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 10px;
  }
  
  .section-subtitle {
    font-size: 0.95rem;
    margin-bottom: 32px;
    line-height: 1.6;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  
  .project-image {
    height: 120px;
  }
  
  .project-content {
    padding: 16px;
  }
  
  .project-title {
    font-size: 1.1rem;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .projects-section {
    padding: 40px 12px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
    margin-bottom: 28px;
  }
  
  .project-content {
    padding: 14px;
  }
  
  .project-title {
    font-size: 1rem;
  }
  
  .project-image {
    height: 100px;
  }
  
  .tech-tag {
    font-size: 0.7rem;
    padding: 2px 8px;
  }

  .before-after-section {
    flex-direction: column;
    gap: 8px;
  }

  .process-item {
    padding: 8px 10px;
  }

  .process-title {
    font-size: 0.7rem;
  }

  .process-text {
    font-size: 0.75rem;
  }
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
  padding: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 10000;
  width: 44px;
  height: 44px;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.modal-media {
  max-width: 100%;
  max-height: 90vh;
  display: block;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  object-fit: contain;
}

/* 移动端模态框 */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-content {
    max-width: 95vw;
  }

  .modal-close {
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    padding: 8px;
  }

  .modal-media {
    border-radius: 8px;
  }
}
</style>
