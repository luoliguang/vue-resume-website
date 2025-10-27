<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand" @click="scrollToTop">
        <h2>{{ t('hero.title') }}</h2>
      </div>
      <div class="nav-right">
        <ul class="nav-menu" :class="{ active: isMobileMenuOpen }">
          <li><a href="#home" class="nav-link" @click="closeMobileMenu">{{ t('nav.home') }}</a></li>
          <li><a href="#about" class="nav-link" @click="closeMobileMenu">{{ t('nav.about') }}</a></li>
          <li><a href="#experience" class="nav-link" @click="closeMobileMenu">{{ t('nav.experience') }}</a></li>
          <li><a href="#projects" class="nav-link" @click="closeMobileMenu">{{ t('nav.projects') }}</a></li>
          <li><a href="#journey" class="nav-link" @click="closeMobileMenu">{{ t('nav.journey') }}</a></li>
          <li><a href="#skills" class="nav-link" @click="closeMobileMenu">{{ t('nav.skills') }}</a></li>
          <li><a href="#contact" class="nav-link" @click="closeMobileMenu">{{ t('nav.contact') }}</a></li>
        </ul>
        <div class="nav-actions">
          <GlassToggle 
            v-model="currentLanguage"
            :items="languageOptions"
            color="#3498db"
            @change="handleLanguageChange"
          />
          <div class="hamburger" :class="{ active: isMobileMenuOpen }" @click="toggleMobileMenu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import GlassToggle from '../ui/GlassToggle.vue'
import { t, currentLanguage, setLanguage } from '../../composables/useI18n.js'

const isMobileMenuOpen = ref(false)

const languageOptions = computed(() => [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' }
])

const handleLanguageChange = (lang) => {
  setLanguage(lang)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const scrollToTop = () => {
  // 清空 URL 中的 hash
  window.history.pushState('', '', window.location.pathname)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e0e0e0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-brand {
  cursor: pointer;
  user-select: none;
}

.nav-brand h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.nav-brand:hover h2 {
  color: #3498db;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #3498db;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #3498db;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: 0.3s;
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
    height: 60px;
  }
  
  .nav-brand h2 {
    font-size: 1.25rem;
  }
  
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 60px;
    flex-direction: column;
    background-color: white;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 20px 0;
    gap: 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-menu li {
    padding: 12px 0;
  }

  .nav-link {
    font-size: 1rem;
    padding: 8px 0;
    display: block;
  }

  .nav-actions {
    gap: 10px;
  }
  
  .hamburger {
    display: flex;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 12px;
  }
  
  .nav-brand h2 {
    font-size: 1.125rem;
  }
  
  .nav-menu li {
    padding: 10px 0;
  }
  
  .nav-link {
    font-size: 0.9375rem;
  }
}
</style>
