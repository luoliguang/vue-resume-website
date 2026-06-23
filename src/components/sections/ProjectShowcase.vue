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

      <!-- 项目卡片网格 -->
      <div class="projects-grid">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card"
          :data-project-id="project.id"
          :class="{ 'status-developing': project.status === 'developing' }"
          @click="openDetail(project)"
        >
          <!-- 封面图 -->
          <div class="project-image">
            <img
              :src="project.image"
              :alt="project.title[isChinese ? 'zh' : 'en']"
              @error="handleImageError"
            >
            <div v-if="imageErrors[project.id]" class="image-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
            </div>
            <div v-if="project.status === 'developing'" class="status-badge">
              {{ isChinese ? '开发中' : 'Developing' }}
            </div>
            <div class="card-hover-hint">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <span>{{ isChinese ? '查看详情' : 'View Details' }}</span>
            </div>
          </div>

          <!-- 精简卡片内容 -->
          <div class="project-content">
            <h3 class="project-title">{{ project.title[isChinese ? 'zh' : 'en'] }}</h3>
            <p class="project-description">{{ project.description[isChinese ? 'zh' : 'en'] }}</p>
            <div class="tech-tags">
              <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
            <div class="project-action">
              <button class="view-more-btn" @click.stop="openDetail(project)">
                {{ isChinese ? '查看详情' : 'View Details' }} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目详情弹窗 -->
    <Teleport to="body">
      <Transition name="detail-pop">
      <div v-if="isDetailOpen" class="detail-overlay" @click.self="closeDetail">
        <div class="detail-modal">
          <button class="detail-close" @click="closeDetail" aria-label="Close">×</button>

          <!-- 弹窗标题 + 标签 -->
          <div class="detail-header">
            <h2 class="detail-title">{{ currentDetailProject?.title[isChinese ? 'zh' : 'en'] }}</h2>
            <div class="tech-tags">
              <span v-for="tech in currentDetailProject?.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- 多图预览（画廊模式） -->
          <div v-if="currentDetailProject?.detailImages?.length" class="detail-gallery">
            <img
              v-for="(src, i) in currentDetailProject.detailImages"
              :key="i"
              :src="src"
              :alt="`${currentDetailProject.title[isChinese ? 'zh' : 'en']} ${i + 1}`"
              class="gallery-img"
              :style="currentDetailProject.imageRatio ? { aspectRatio: currentDetailProject.imageRatio } : {}"
              @click.stop="openLightbox(currentDetailProject.detailImages, i)"
            />
          </div>

          <!-- 单媒体预览：GIF / 视频 / 图片 -->
          <div v-else-if="currentDetailProject?.modalContent" class="detail-media">
            <img
              v-if="currentDetailProject.modalContent.type === 'gif' || currentDetailProject.modalContent.type === 'image'"
              :src="currentDetailProject.modalContent.src"
              :alt="currentDetailProject.title[isChinese ? 'zh' : 'en']"
              class="detail-media-content"
            />
            <video
              v-else-if="currentDetailProject.modalContent.type === 'video'"
              :src="currentDetailProject.modalContent.src"
              controls
              class="detail-media-content"
            />
          </div>

          <!-- 项目描述 -->
          <p class="detail-desc">{{ currentDetailProject?.description[isChinese ? 'zh' : 'en'] }}</p>

          <!-- Before / After 对比 -->
          <div v-if="currentDetailProject?.before && currentDetailProject?.after" class="detail-ba">
            <div class="ba-item before">
              <div class="ba-label">Before</div>
              <div class="ba-content">{{ currentDetailProject.before[isChinese ? 'zh' : 'en'] }}</div>
            </div>
            <div class="ba-item after">
              <div class="ba-label">After</div>
              <div class="ba-content">{{ currentDetailProject.after[isChinese ? 'zh' : 'en'] }}</div>
            </div>
          </div>

          <!-- 三段式：痛点 → 解决方案 → 成果 -->
          <div v-if="currentDetailProject?.challenge" class="detail-process">
            <div class="dp-item challenge">
              <span class="dp-label">{{ isChinese ? '痛点' : 'Challenge' }}</span>
              <span class="dp-text">{{ currentDetailProject.challenge[isChinese ? 'zh' : 'en'] }}</span>
            </div>
            <div class="dp-item solution">
              <span class="dp-label">{{ isChinese ? '解决方案' : 'Solution' }}</span>
              <span class="dp-text">{{ currentDetailProject.solution?.[isChinese ? 'zh' : 'en'] }}</span>
            </div>
            <div class="dp-item result">
              <span class="dp-label">{{ isChinese ? '成果' : 'Result' }}</span>
              <span class="dp-text">{{ currentDetailProject.result?.[isChinese ? 'zh' : 'en'] }}</span>
            </div>
          </div>

          <!-- 访问链接 -->
          <div v-if="currentDetailProject?.link && currentDetailProject.link !== '#'" class="detail-action">
            <a
              :href="currentDetailProject.link"
              target="_blank"
              rel="noopener noreferrer"
              class="detail-link-btn"
            >
              {{ isChinese ? '访问项目' : 'Visit Project' }} →
            </a>
          </div>
        </div>
      </div>
      </Transition>
    </Teleport>

    <!-- Lightbox 全屏预览 -->
    <Teleport to="body">
      <div v-if="isLightboxOpen" class="lightbox-overlay" @click.self="closeLightbox">

        <!-- 关闭 -->
        <button class="lightbox-close" @click="closeLightbox" aria-label="Close">×</button>

        <!-- 计数器 -->
        <div class="lightbox-counter">{{ lightboxIndex + 1 }} / {{ lightboxImages.length }}</div>

        <!-- 上一张 -->
        <button
          v-if="lightboxImages.length > 1"
          class="lightbox-arrow lightbox-prev"
          @click.stop="prevImage"
          aria-label="Previous"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <!-- 图片 -->
        <img
          :src="lightboxImages[lightboxIndex]"
          :alt="`preview ${lightboxIndex + 1}`"
          class="lightbox-img"
        />

        <!-- 下一张 -->
        <button
          v-if="lightboxImages.length > 1"
          class="lightbox-arrow lightbox-next"
          @click.stop="nextImage"
          aria-label="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>

        <!-- 缩略图导航 -->
        <div v-if="lightboxImages.length > 1" class="lightbox-dots">
          <button
            v-for="(_, i) in lightboxImages"
            :key="i"
            class="lightbox-dot"
            :class="{ active: i === lightboxIndex }"
            @click.stop="lightboxIndex = i"
          />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { projectShowcase as staticShowcase, projectCategories as staticCategories } from '../../data/projectShowcase.js'
import { t, isChinese } from '../../composables/useI18n.js'
import GlassToggle from '../ui/GlassToggle.vue'
import { useContent } from '../../composables/useContent.js'

const { data: cmsProjects } = useContent('projects')

const projectShowcase = computed(() => {
  if (cmsProjects.value?.length) {
    return cmsProjects.value.map(p => ({
      id: p.id, type: p.type,
      title:       { zh: p.title_zh,       en: p.title_en ?? p.title_zh },
      description: { zh: p.description_zh, en: p.description_en ?? p.description_zh },
      image: p.image, detailImages: p.detail_images ?? [], technologies: p.technologies ?? [],
      category: p.category, demoType: p.demo_type, link: p.link, status: p.status,
      imageRatio: p.image_ratio, mediaType: p.media_type, previewGif: p.preview_gif,
      modalContent: p.demo_type === 'media'
        ? { type: p.media_type ?? (p.preview_gif ? 'gif' : 'image'), src: p.preview_gif || p.image }
        : null,
      challenge: { zh: p.challenge_zh, en: p.challenge_en },
      solution:  { zh: p.solution_zh,  en: p.solution_en },
      result:    { zh: p.result_zh,    en: p.result_en },
      before:    { zh: p.before_zh,    en: p.before_en },
      after:     { zh: p.after_zh,     en: p.after_en },
    }))
  }
  return staticShowcase
})

const activeCategory = ref('all')
const imageErrors = ref({})

// 详情弹窗
const isDetailOpen = ref(false)
const currentDetailProject = ref(null)

// Lightbox
const isLightboxOpen = ref(false)
const lightboxImages = ref([])
const lightboxIndex = ref(0)

const projectCategories = computed(() => {
  const list = projectShowcase.value
  return [
    { id: 'all',      name: { zh: '全部项目', en: 'All Projects' },    count: list.length },
    { id: 'work',     name: { zh: '工作项目', en: 'Work Projects' },   count: list.filter(p => p.category === 'work').length },
    { id: 'personal', name: { zh: '个人项目', en: 'Personal Projects' }, count: list.filter(p => p.category === 'personal').length },
  ]
})

const filteredProjects = computed(() => {
  const list = projectShowcase.value
  if (activeCategory.value === 'all') return list
  return list.filter(project => project.category === activeCategory.value)
})

const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const handleImageError = (event) => {
  const projectId = event.target.closest('.project-card')?.dataset.projectId
  if (projectId) imageErrors.value[projectId] = true
}

const openDetail = (project) => {
  currentDetailProject.value = project
  isDetailOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeDetail = () => {
  isDetailOpen.value = false
  currentDetailProject.value = null
  document.body.style.overflow = ''
}

const openLightbox = (images, index) => {
  lightboxImages.value = images
  lightboxIndex.value = index
  isLightboxOpen.value = true
}

const closeLightbox = () => {
  isLightboxOpen.value = false
}

const prevImage = () => {
  lightboxIndex.value = (lightboxIndex.value - 1 + lightboxImages.value.length) % lightboxImages.value.length
}

const nextImage = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % lightboxImages.value.length
}

const handleKeydown = (e) => {
  if (isLightboxOpen.value) {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'ArrowRight') nextImage()
    return
  }
  if (e.key === 'Escape' && isDetailOpen.value) closeDetail()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.projects-section {
  padding: 80px 20px;
  background: transparent;
  min-height: 100vh;
}

.container {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: var(--text-heading);
  color: var(--color-cloud-white);
  margin-bottom: 16px;
  font-weight: 600;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #c7c7cc;
  margin-bottom: 40px;
}

.filter-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

/* ── 卡片网格 ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.project-card {
  background: var(--color-space-gray);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.project-card.status-developing {
  border: 2px solid #f39c12;
}

/* ── 封面图 ── */
.project-image {
  position: relative;
  height: 180px;
  overflow: hidden;
  background: #161617;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f39c12;
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
}

.card-hover-hint {
  position: absolute;
  inset: 0;
  background: rgba(44, 62, 80, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.project-card:hover .card-hover-hint {
  opacity: 1;
}

/* ── 卡片内容（精简） ── */
.project-content {
  padding: 18px 20px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-cloud-white);
  margin: 0 0 8px;
}

.project-description {
  font-size: 0.875rem;
  line-height: 1.55;
  color: #86868b;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 14px;
}

.tech-tag {
  background: rgba(41, 151, 255, 0.1);
  color: #2997ff;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 500;
  border: 1px solid rgba(41, 151, 255, 0.2);
}

.project-action {
  margin-top: auto;
}

.view-more-btn {
  color: #3498db;
  background: transparent;
  border: none;
  padding: 0;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
}

.view-more-btn:hover {
  color: #2980b9;
}

/* ── 详情弹窗 ── */
.detail-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 2000;
}

.detail-modal {
  position: relative;
  width: min(680px, 100%);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  border-radius: 20px;
  background: #1d1d1f;
  border: 1px solid #333336;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
  padding: 36px;
}

.detail-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #333336;
  color: #f5f5f7;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
}

.detail-close:hover {
  background: #424245;
}

.detail-header {
  padding-right: 32px;
  margin-bottom: 20px;
}

.detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f5f5f7;
  margin: 0 0 12px;
}

/* 媒体区域 */
.detail-media {
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  background: #161617;
}

.detail-media-content {
  width: 100%;
  max-height: 360px;
  object-fit: contain;
  display: block;
}

/* 多图画廊 */
.detail-gallery {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  overflow-x: auto;
  /* 隐藏滚动条但保留滚动功能 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  /* 让内容超出时可以滚动，不溢出弹窗 */
  padding-bottom: 4px;
}

.detail-gallery::-webkit-scrollbar {
  display: none;
}

.gallery-img {
  width: 150px;
  flex-shrink: 0;
  aspect-ratio: 9 / 16;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  display: block;
  cursor: zoom-in;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.gallery-img:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
}

/* 描述 */
.detail-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #c7c7cc;
  margin: 0 0 20px;
}

/* Before / After */
.detail-ba {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.ba-item {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid;
}

.ba-item.before {
  background: rgba(255, 69, 58, 0.08);
  border-color: rgba(255, 69, 58, 0.3);
}

.ba-item.after {
  background: rgba(48, 209, 88, 0.08);
  border-color: rgba(48, 209, 88, 0.3);
}

.ba-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.ba-item.before .ba-label { color: #ff453a; }
.ba-item.after .ba-label  { color: #30d158; }

.ba-content {
  font-size: 0.84rem;
  line-height: 1.5;
  color: #ebebf0;
}

/* 三段式 */
.detail-process {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.dp-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 12px 14px;
  border-radius: 10px;
  background: #161617;
  border-left: 3px solid;
}

.dp-item.challenge { border-color: #ff9f0a; }
.dp-item.solution  { border-color: #2997ff; }
.dp-item.result    { border-color: #30d158; }

.dp-label {
  flex: 0 0 56px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #86868b;
  padding-top: 2px;
}

.dp-text {
  font-size: 0.875rem;
  line-height: 1.55;
  color: #c7c7cc;
}

/* 访问按钮 */
.detail-action {
  padding-top: 16px;
  border-top: 1px solid #333336;
}

.detail-link-btn {
  display: inline-block;
  color: #2997ff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.detail-link-btn:hover {
  color: #0a84ff;
}

/* ── 平板端 ── */
@media (max-width: 968px) {
  .projects-section {
    padding: 60px 20px;
  }

  .section-title {
    font-size: 2.25rem;
    margin-bottom: 12px;
  }

  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }

  .project-image {
    height: 160px;
  }
}

/* ── 移动端 ── */
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
    gap: 12px;
  }

  /* 横排卡片：左图右文 */
  .project-card {
    flex-direction: row;
    align-items: stretch;
    border-radius: 14px;
  }

  .project-image {
    width: 120px;
    min-height: 120px;
    height: auto;
    flex-shrink: 0;
    border-radius: 14px 0 0 14px;
  }

  /* 移动端无 hover，隐藏遮罩改为永久显示小指示器 */
  .card-hover-hint {
    display: none;
  }

  .project-content {
    padding: 12px 14px 12px;
  }

  .project-title {
    font-size: 0.95rem;
    margin-bottom: 5px;
  }

  .project-description {
    font-size: 0.82rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    margin-bottom: 8px;
  }

  .tech-tags {
    gap: 4px;
    margin-bottom: 8px;
  }

  .tech-tag {
    font-size: 0.68rem;
    padding: 2px 7px;
  }

  /* 按钮改为圆角边框样式，触摸目标更明显 */
  .view-more-btn {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border: 1.5px solid #3498db;
    border-radius: 20px;
    font-size: 0.78rem;
  }

  /* 详情弹窗从底部弹出 */
  .detail-overlay {
    padding: 0;
    align-items: flex-end;
  }

  .detail-modal {
    width: 100%;
    border-radius: 20px 20px 0 0;
    max-height: 90vh;
    padding: 28px 20px 32px;
  }

  .detail-ba {
    grid-template-columns: 1fr;
  }
}

/* ── 小屏手机 ── */
@media (max-width: 480px) {
  .projects-section {
    padding: 40px 12px;
  }

  .project-image {
    width: 105px;
    min-height: 105px;
  }

  .project-content {
    padding: 10px 12px 10px;
  }

  .detail-modal {
    padding: 24px 16px 28px;
  }

  .detail-title {
    font-size: 1.25rem;
  }

  .dp-item {
    flex-direction: column;
    gap: 4px;
  }

  .dp-label {
    flex: none;
  }

  /* 移动端画廊图片稍窄，方便露出下一张提示可滑动 */
  .gallery-img {
    width: 120px;
  }
}

/* ── 触屏设备：轻触反馈替代 hover ── */
@media (hover: none) {
  .project-card:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

/* ── Lightbox ── */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.lightbox-img {
  max-width: 90vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 8px;
  display: block;
  user-select: none;
}

.lightbox-close {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 1;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.22);
}

.lightbox-counter {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-weight: 500;
}

.lightbox-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox-arrow:hover {
  background: rgba(255, 255, 255, 0.24);
}

.lightbox-prev { left: 20px; }
.lightbox-next { right: 20px; }

.lightbox-dots {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.lightbox-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}

.lightbox-dot.active {
  background: white;
  transform: scale(1.25);
}

@media (max-width: 768px) {
  .lightbox-arrow {
    width: 36px;
    height: 36px;
  }

  .lightbox-prev { left: 10px; }
  .lightbox-next { right: 10px; }
}
</style>
