<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- 左侧：Logo和导航 -->
        <div class="footer-left">
          <div class="footer-logo">
            <div class="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="logo-text">{{ t('hero.title') }}</span>
          </div>
          <nav class="footer-nav">
            <a href="#home" class="nav-link" @click="scrollToSection('home')">{{ t('nav.home') }}</a>
            <a href="#about" class="nav-link" @click="scrollToSection('about')">{{ t('nav.about') }}</a>
            <a href="#experience" class="nav-link" @click="scrollToSection('experience')">{{ t('nav.experience') }}</a>
            <a href="#projects" class="nav-link" @click="scrollToSection('projects')">{{ t('nav.projects') }}</a>
            <a href="#skills" class="nav-link" @click="scrollToSection('skills')">{{ t('nav.skills') }}</a>
            <a href="#journey" class="nav-link" @click="scrollToSection('journey')">{{ t('nav.journey') }}</a>
            <a href="#contact" class="nav-link" @click="scrollToSection('contact')">{{ t('nav.contact') }}</a>
          </nav>
        </div>
        
        <!-- 右侧：励志语和版权 -->
        <div class="footer-right">
          <div class="footer-quote">
            <p class="quote-text">{{ t('footer.quote') }}</p>
            <p class="copyright">{{ t('footer.copyright') }}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { t } from '../../composables/useI18n.js'

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, #f0f2f5 0%, #e8eaf0 100%);
  border-top: 1px solid #e9ecef;
  padding: 50px 0;
  margin-top: 80px;
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3498db, transparent);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3498db;
  letter-spacing: 0.5px;
}

.footer-nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.nav-link {
  color: #6c757d;
  text-decoration: none;
  font-size: 0.95rem;
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
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #3498db;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.footer-right {
  text-align: right;
}

.footer-quote {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quote-text {
  font-size: 0.95rem;
  color: #6c757d;
  font-style: italic;
  line-height: 1.5;
  margin: 0;
}

.copyright {
  font-size: 0.85rem;
  color: #adb5bd;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    padding: 30px 0;
    margin-top: 60px;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 25px;
  }
  
  .footer-left {
    align-items: center;
  }
  
  .footer-nav {
    justify-content: center;
    gap: 20px;
  }
  
  .footer-right {
    text-align: center;
  }
  
  .footer-quote {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 25px 0;
    margin-top: 50px;
  }
  
  .footer-nav {
    gap: 16px;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
  
  .quote-text {
    font-size: 0.9rem;
  }
  
  .copyright {
    font-size: 0.8rem;
  }
}
</style>
