<template>
  <section id="home" class="hero-section">
    <div class="hero-container">
      <!-- 左侧面板 -->
      <div class="hero-left">
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
      <div class="hero-right">
        <h1 class="main-title">{{ t('hero.title') }}</h1>
        <p class="nickname">「 {{ t('hero.nickname') }} 」</p>
        <p class="description">{{ t('hero.description') }}</p>
        <div class="action-buttons">
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { t } from '../../composables/useI18n.js'

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}

const scrollToAbout = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToProjects = () => {
  const projectsSection = document.getElementById('projects')
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 600px;
  background: linear-gradient(180deg, #fefcf3 0%, #f5f7fa 100%);
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-section {
  text-align: center;
}

.avatar-container {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 4px solid white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #6c757d;
  border-radius: 50%;
}

.avatar-placeholder svg {
  margin-bottom: 8px;
}

.avatar-placeholder span {
  font-size: 0.9rem;
}

.tagline {
  text-align: left;
}

.tagline-line {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.3;
  margin-bottom: 8px;
}

.hero-right {
  padding-left: 20px;
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  line-height: 1.2;
}

.nickname {
  font-size: 1.25rem;
  font-weight: 400;
  color: #667eea;
  margin-bottom: 24px;
  font-style: italic;
  opacity: 0.85;
  letter-spacing: 2px;
}

.description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 32px;
}

.action-buttons {
  display: flex;
  gap: 16px;
}

/* 动画按钮基础样式 */
.animated-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 36px;
  border: 4px solid;
  border-color: transparent;
  font-size: 16px;
  background-color: inherit;
  border-radius: 100px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button svg {
  position: absolute;
  width: 24px;
  z-index: 9;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button .arr-1 {
  right: 16px;
}

.animated-button .arr-2 {
  left: -25%;
}

.animated-button .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button .text {
  position: relative;
  z-index: 1;
  transform: translateX(-12px);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button:hover {
  box-shadow: 0 0 0 12px transparent;
  color: #212121;
  border-radius: 12px;
}

.animated-button:hover .arr-1 {
  right: -25%;
}

.animated-button:hover .arr-2 {
  left: 16px;
}

.animated-button:hover .text {
  transform: translateX(12px);
}

.animated-button:active {
  scale: 0.95;
}

.animated-button:hover .circle {
  width: 220px;
  height: 220px;
  opacity: 1;
}

/* 主按钮样式 - 蓝色主题 */
.btn-primary {
  color: #3498db;
  box-shadow: 0 0 0 2px #3498db;
}

.btn-primary svg {
  fill: #3498db;
}

.btn-primary .circle {
  background-color: #3498db;
}

.btn-primary:active {
  box-shadow: 0 0 0 4px #3498db;
}

/* 次按钮样式 - 绿色主题 */
.btn-secondary {
  color: #27ae60;
  box-shadow: 0 0 0 2px #27ae60;
}

.btn-secondary svg {
  fill: #27ae60;
}

.btn-secondary .circle {
  background-color: #27ae60;
}

.btn-secondary:active {
  box-shadow: 0 0 0 4px #27ae60;
}

/* 平板端 */
@media (max-width: 968px) {
  .hero-container {
    gap: 40px;
  }
  
  .main-title {
    font-size: 2.5rem;
    margin-bottom: 6px;
  }
  
  .nickname {
    font-size: 1.15rem;
    margin-bottom: 20px;
  }
  
  .description {
    font-size: 1.05rem;
    margin-bottom: 28px;
  }
  
  .tagline-line {
    font-size: 1.3rem;
  }
  
  .avatar-container {
    width: 240px;
    height: 240px;
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .hero-section {
    padding: 20px 16px;
    min-height: auto;
  }
  
  .hero-container {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
  
  .hero-right {
    padding-left: 0;
  }
  
  .main-title {
    font-size: 2rem;
    margin-bottom: 6px;
  }
  
  .nickname {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }
  
  .description {
    font-size: 1rem;
    margin-bottom: 24px;
  }
  
  .tagline {
    text-align: center;
  }
  
  .tagline-line {
    font-size: 1.2rem;
  }
  
  .avatar-container {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }
  
  .action-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .hero-section {
    padding: 16px 12px;
  }
  
  .main-title {
    font-size: 1.75rem;
    margin-bottom: 4px;
  }
  
  .nickname {
    font-size: 1rem;
    margin-bottom: 12px;
    letter-spacing: 1px;
  }
  
  .description {
    font-size: 0.95rem;
  }
  
  .tagline-line {
    font-size: 1.1rem;
  }
  
  .avatar-container {
    width: 180px;
    height: 180px;
  }
  
  .animated-button {
    padding: 12px 28px;
    font-size: 0.9rem;
  }
  
  .animated-button svg {
    width: 20px;
  }
}
</style>
