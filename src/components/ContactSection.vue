<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-header">
        <h2 class="section-title">联系方式</h2>
        <p class="section-subtitle">期待与您合作</p>
      </div>
      
      <div class="contact-grid">
        <!-- 联系卡片 -->
        <div 
          v-for="(contact, key) in contactList" 
          :key="key"
          class="contact-card"
          :class="{ 'clickable': contact.link }"
          @click="handleContactClick(contact)"
        >
          <div class="contact-card-icon" :style="{ background: `linear-gradient(135deg, ${contact.color} 0%, ${adjustColor(contact.color)} 100%)` }">
            <component :is="getIconComponent(contact.icon)" :size="28" stroke-width="2" />
          </div>
          <div class="contact-card-content">
            <h4 class="contact-card-label">{{ contact.label }}</h4>
            <p class="contact-card-value">{{ contact.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { contactInfo } from '../data/contact.js'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github
} from 'lucide-vue-next'

// 图标映射
const iconMap = {
  Mail,
  Phone,
  MapPin,
  Github
}

const contactList = computed(() => Object.values(contactInfo))

const getIconComponent = (iconName) => {
  return iconMap[iconName] || Mail
}

// 处理联系信息点击
const handleContactClick = (contact) => {
  if (contact.link) {
    window.open(contact.link, '_blank')
  }
}

// 调整颜色亮度
const adjustColor = (hex) => {
  // 简单的颜色调整，让渐变更自然
  return hex
}
</script>

<style scoped>
.contact-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #f0f4ff 0%, #f8f0ff 100%);
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23667eea" fill-opacity="0.03"><circle cx="30" cy="30" r="4"/></g></svg>');
  opacity: 0.8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.contact-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.contact-card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.contact-card.clickable {
  cursor: pointer;
}

.contact-card.clickable:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.contact-card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.contact-card-content {
  flex: 1;
}

.contact-card-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.contact-card-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  word-break: break-all;
}

/* 平板端 */
@media (max-width: 968px) {
  .contact-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 14px;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  .contact-card {
    padding: 28px;
    gap: 18px;
  }
  
  .contact-card-icon {
    width: 60px;
    height: 60px;
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .contact-section {
    padding: 50px 16px;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 12px;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .contact-card {
    padding: 24px;
    gap: 16px;
  }
  
  .contact-card-icon {
    width: 56px;
    height: 56px;
  }
  
  .contact-card-label {
    font-size: 0.8125rem;
    margin-bottom: 6px;
  }
  
  .contact-card-value {
    font-size: 1rem;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .contact-section {
    padding: 40px 12px;
  }
  
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 10px;
  }
  
  .section-subtitle {
    font-size: 0.95rem;
  }
  
  .contact-grid {
    gap: 16px;
  }
  
  .contact-card {
    padding: 20px;
    gap: 14px;
  }
  
  .contact-card-icon {
    width: 48px;
    height: 48px;
  }
  
  .contact-card-label {
    font-size: 0.75rem;
    margin-bottom: 4px;
  }
  
  .contact-card-value {
    font-size: 0.9375rem;
  }
}
</style>
