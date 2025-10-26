<template>
  <div class="project-card">
    <!-- 布局：图片在左，内容在右 -->
    <div class="project-layout">
      <!-- 左侧：媒体展示区域 -->
      <div v-if="project.media" class="project-media">
        <div class="media-wrapper" :class="{ 'clickable': isClickableMedia }">
          <!-- 普通图片 -->
          <img 
            v-if="project.media.type === 'image' && !isGif" 
            :src="project.media.src" 
            :alt="project.title"
            class="media-content"
            @click="openLightbox(project.media)"
          />
          
          <!-- GIF 动图 -->
          <img 
            v-else-if="project.media.type === 'image' && isGif" 
            :src="project.media.src" 
            :alt="project.title"
            class="media-content gif-image"
          />
          
          <!-- 视频 -->
          <div v-else-if="project.media.type === 'video'" class="video-wrapper" @click="openLightbox(project.media)">
            <video 
              ref="videoPreview"
              :src="project.media.src" 
              class="media-content video-preview"
              preload="metadata"
              @loadedmetadata="onVideoLoaded"
              muted
              @mouseenter="playPreview"
              @mouseleave="pausePreview"
            />
            <div class="video-play-btn">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div class="video-duration">{{ videoDuration }}</div>
          </div>
          
          <!-- GIF 标签 -->
          <div v-if="isGif" class="gif-label">GIF</div>
        </div>
      </div>
      
      <!-- 右侧：项目信息和文字说明 -->
      <div class="project-content">
        <div class="project-header">
          <div class="project-icon">
            <component 
              v-if="getIconComponent" 
              :is="getIconComponent" 
              :size="32"
              :stroke-width="2"
            />
          </div>
          <h3 class="project-title">{{ project.title }}</h3>
        </div>
        
        <div class="project-details">
          <div 
            v-for="(detail, index) in project.details" 
            :key="index" 
            class="detail-item"
          >
            <div class="detail-label">{{ detail.label }}</div>
            <p class="detail-text">{{ detail.text }}</p>
          </div>
        </div>
        
        <div class="project-tech">
          <span 
            v-for="(tech, index) in project.tech" 
            :key="index" 
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Image Lightbox Modal -->
    <Teleport to="body">
      <div v-if="visible && imgs.length > 0" class="lightbox-modal" @click="hide">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" @click="hide" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <img 
            v-if="imgs.length > 0"
            :src="imgs[0].src" 
            :alt="imgs[0].title"
            class="lightbox-image"
          />
        </div>
      </div>
    </Teleport>
    
    <!-- Video Modal -->
    <Teleport to="body">
      <div v-if="visible && videos.length > 0" class="video-modal" @click="hide">
        <div class="video-modal-content" @click.stop>
          <button class="video-modal-close" @click="hide" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <video 
            v-if="videos.length > 0"
            :src="videos[0].src" 
            controls 
            autoplay
            class="video-modal-player"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  FileCheck, 
  BarChart3, 
  Smartphone,
  Code,
  Database,
  Zap
} from 'lucide-vue-next'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const visible = ref(false)
const imgs = ref([])
const videos = ref([])
const videoPreview = ref(null)
const videoDuration = ref('')

// 根据项目ID映射图标
const getIconComponent = computed(() => {
  const iconMap = {
    1: FileCheck,
    2: BarChart3,
    3: Smartphone
  }
  return iconMap[props.project.id]
})

// 检测是否为 GIF 图片
const isGif = computed(() => {
  return props.project.media?.type === 'image' && 
         props.project.media?.src?.toLowerCase().endsWith('.gif')
})

// 判断是否为可点击的媒体（普通图片）
const isClickableMedia = computed(() => {
  return props.project.media?.type === 'image' && !isGif.value
})

const openLightbox = (media) => {
  if (media.type === 'image' && !isGif.value) {
    imgs.value = [{ src: media.src, title: props.project.title }]
    visible.value = true
    // 禁用页面滚动
    document.body.style.overflow = 'hidden'
  } else if (media.type === 'video') {
    videos.value = [{ src: media.src, title: props.project.title }]
    visible.value = true
    // 禁用页面滚动
    document.body.style.overflow = 'hidden'
  }
}

const hide = () => {
  visible.value = false
  // 清空数据
  imgs.value = []
  videos.value = []
  // 恢复页面滚动
  document.body.style.overflow = ''
}

// 视频预览处理
const onVideoLoaded = () => {
  if (videoPreview.value) {
    const duration = videoPreview.value.duration
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
    videoDuration.value = `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
}

const playPreview = () => {
  if (videoPreview.value) {
    videoPreview.value.play().catch(err => console.log('Play failed:', err))
  }
}

const pausePreview = () => {
  if (videoPreview.value) {
    videoPreview.value.pause()
    videoPreview.value.currentTime = 0
  }
}

// ESC 键关闭
const handleEsc = (e) => {
  if (e.key === 'Escape' && visible.value) {
    hide()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
})
</script>

<style scoped>
.project-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.project-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 400px;
}

/* 左侧媒体区域 */
.project-media {
  background: #f8f9fa;
  overflow: hidden;
  position: relative;
}

.media-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-wrapper.clickable {
  cursor: pointer;
}

.media-content {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease;
  cursor: pointer;
  pointer-events: auto;
}

.gif-image {
  object-fit: cover;
  cursor: default;
  pointer-events: none;
}

.media-wrapper.clickable .media-content:hover {
  transform: scale(1.02);
}

/* GIF 标签 */
.gif-label {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(102, 126, 234, 0.95);
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 视频时长标签 */
.video-duration {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-wrapper:hover .video-duration {
  opacity: 1;
}

/* 视频相关样式 */
.video-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.video-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.video-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(102, 126, 234, 0.9);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  pointer-events: none;
}

.video-wrapper:hover .video-preview {
  transform: scale(1.05);
}

.video-wrapper:hover .video-play-btn {
  transform: translate(-50%, -50%) scale(1.1);
  background: rgba(102, 126, 234, 1);
}

/* 右侧内容区域 */
.project-content {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-header {
  margin-bottom: 24px;
}

.project-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
  flex-shrink: 0;
  margin-bottom: 16px;
}

.project-title {
  font-size: 1.8rem;
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

.project-details {
  flex: 1;
}

.detail-item {
  margin-bottom: 24px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #3498db;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-text {
  font-size: 1rem;
  color: #666;
  line-height: 1.7;
  margin: 0;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.tech-tag {
  display: inline-block;
  padding: 6px 14px;
  background: #e8f4f8;
  color: #2c3e50;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* 移动端响应式 */
@media (max-width: 968px) {
  .project-layout {
    grid-template-columns: 1fr;
  }
  
  .project-media {
    height: 300px;
  }
  
  .project-content {
    padding: 32px;
  }
  
  .project-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .project-content {
    padding: 24px;
  }
  
  .project-title {
    font-size: 1.3rem;
  }
  
  .project-icon {
    width: 56px;
    height: 56px;
  }
  
  .detail-text {
    font-size: 0.95rem;
  }
}

/* Lightbox Modal Styles */
.lightbox-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
  overflow: auto;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.3s ease;
  z-index: 10000;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  display: block;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Video Modal Styles */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
  overflow: auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.video-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
}

.video-modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.3s ease;
  z-index: 10000;
}

.video-modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.video-modal-player {
  max-width: 100%;
  max-height: 90vh;
  display: block;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .video-modal-content {
    max-width: 95vw;
  }
  
  .video-modal-close {
    top: -35px;
  }
}
</style>
