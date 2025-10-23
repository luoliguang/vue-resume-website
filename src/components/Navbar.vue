<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <h2>我的简历</h2>
      </div>
      <ul class="nav-menu" :class="{ active: isMobileMenuOpen }">
        <li><a href="#about" class="nav-link" @click="closeMobileMenu">关于我</a></li>
        <li><a href="#skills" class="nav-link" @click="closeMobileMenu">核心能力</a></li>
        <li><a href="#projects" class="nav-link" @click="closeMobileMenu">项目经验</a></li>
        <li><a href="#contact" class="nav-link" @click="closeMobileMenu">联系方式</a></li>
      </ul>
      <div class="hamburger" :class="{ active: isMobileMenuOpen }" @click="toggleMobileMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
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

.nav-brand h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
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

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: white;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 20px 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .hamburger {
    display: flex;
  }
}
</style>
