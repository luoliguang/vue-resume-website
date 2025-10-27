<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-header">
        <h2 class="section-title">{{ t('contact.title') }}</h2>
        <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
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
            <h4 class="contact-card-label">{{ contact.label[isChinese ? 'zh' : 'en'] }}</h4>
            <p class="contact-card-value">{{ getContactValue(contact) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { contactInfo } from '../../data/contact.js'
import { t, isChinese } from '../../composables/useI18n.js'
import { deobfuscatePhone } from '../../utils/crypto.js'
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

// 获取联系信息的值（支持多语言和加密）
const getContactValue = (contact) => {
  if (typeof contact.value === 'object') {
    return contact.value[isChinese.value ? 'zh' : 'en']
  }
  // 如果是加密字段，解密显示
  if (contact.encrypted && contact.value) {
    try {
      return deobfuscatePhone(contact.value)
    } catch (e) {
      console.error('Failed to decrypt phone:', e)
      return '隐私保护'
    }
  }
  return contact.value
}

// 处理联系信息点击
const handleContactClick = (contact) => {
  // 使用 rawLink 或 link
  const link = contact.rawLink || contact.link
  if (link) {
    window.open(link, '_blank')
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
  background: linear-gradient(180deg, #e8eaf0 0%, #f0f2f5 100%);
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
  background: 
    radial-gradient(circle at 20% 20%, rgba(52, 152, 219, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(155, 89, 182, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(46, 204, 113, 0.06) 0%, transparent 50%);
  opacity: 0.8;
}

.contact-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%233498db" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
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
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.contact-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.contact-card.clickable {
  cursor: pointer;
}

.contact-card.clickable:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.98);
}

.contact-card-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.contact-card:hover .contact-card-icon {
  transform: scale(1.05);
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
