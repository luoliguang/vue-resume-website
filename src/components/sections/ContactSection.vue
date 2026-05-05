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
          <div class="contact-card-icon">
            <component :is="getIconComponent(contact.icon)" :size="28" stroke-width="2" />
          </div>
          <div class="contact-card-content">
            <h4 class="contact-card-label">{{ contact.label[isChinese ? 'zh' : 'en'] }}</h4>
            <p class="contact-card-value" :class="{ 'is-phone': contact.icon === 'Phone' }">{{ getContactValue(contact) }}</p>
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
    if (contact.icon === 'Phone') {
    return String(contact.value).replace(/\s+/g, '')
  }
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

</script>

<style scoped>
.contact-section {
  padding: 80px 20px;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: var(--page-max-width);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.contact-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-title {
  font-size: var(--text-heading);
  font-weight: 600;
  color: var(--color-cloud-white);
  margin-bottom: 16px;
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

.section-subtitle {
  font-size: var(--text-subheading);
  color: #c7c7cc;
  font-weight: 400;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.contact-card {
  background: var(--color-space-gray);
  border-radius: var(--radius-cards);
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: background 0.25s ease, border-color 0.25s ease;
  border: 1px solid #333336;
}

.contact-card.clickable {
  cursor: pointer;
}

.contact-card.clickable:hover {
  background: #2a2a2d;
  border-color: rgba(41, 151, 255, 0.55);
}

.contact-card-icon {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-cloud-white);
  flex-shrink: 0;
  background: var(--color-interactive-blue);
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
  color: var(--color-cloud-white);
  margin: 0;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.35;
}

.contact-card-value.is-phone {
  white-space: nowrap;
  word-break: normal;
  overflow-wrap: normal;
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
