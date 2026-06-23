<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-header">
        <h2 class="section-title">{{ t('contact.title') }}</h2>
        <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
      </div>

      <div class="contact-grid">
        <template v-for="(contact, key) in contactList" :key="key">
          <div
            v-if="isFlipCardContact(contact)"
            class="flip-card"
            @click="toggleFlip(contact)"
          >
            <div class="flip-card-inner" :class="{ flipped: isFlipped(contact) }">
              <div class="flip-card-face flip-card-front">
                <div class="contact-card-icon">
                  <component :is="getIconComponent(contact.icon)" :size="28" stroke-width="2" />
                </div>
                <div class="contact-card-content">
                  <h4 class="contact-card-label">{{ contact.label[isChinese ? 'zh' : 'en'] }}</h4>
                  <button class="contact-action-btn" @click.stop="toggleFlip(contact)">
                    {{ contact.icon === 'Mail' ? '查看邮箱' : contact.icon === 'Phone' ? '查看电话' : '查看地址' }}
                  </button>
                </div>
              </div>

              <div class="flip-card-face flip-card-back">
                <div class="contact-card-icon">
                  <component :is="getIconComponent(contact.icon)" :size="28" stroke-width="2" />
                </div>
                <div class="contact-card-content">
                  <h4 class="contact-card-label">{{ contact.label[isChinese ? 'zh' : 'en'] }}</h4>

                  <template v-if="isLocationContact(contact)">
                    <div class="location-lines">
                      <div class="location-line">
                        <span class="location-tag">{{ isChinese ? '现居' : 'Current' }}</span>
                        <span class="location-text">{{ getResidencyText(contact, 'current') }}</span>
                      </div>
                      <div class="location-divider"></div>
                      <div class="location-line">
                        <span class="location-tag">{{ isChinese ? '原籍' : 'Hometown' }}</span>
                        <span class="location-text">{{ getResidencyText(contact, 'hometown') }}</span>
                      </div>
                    </div>
                  </template>

                  <template v-else>
                    <p class="contact-card-value" :class="{ 'is-phone': contact.icon === 'Phone' }">{{ getContactValue(contact) }}</p>
                    <button class="contact-action-btn" @click.stop="copyPrivateContact(contact)">
                      {{ getCopyButtonText(contact) }}
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="contact-card"
            :class="{ clickable: isCardClickable(contact) }"
            @click="handleContactClick(contact)"
          >
            <div class="contact-card-icon">
              <component :is="getIconComponent(contact.icon)" :size="28" stroke-width="2" />
            </div>
            <div class="contact-card-content">
              <h4 class="contact-card-label">{{ contact.label[isChinese ? 'zh' : 'en'] }}</h4>
              <p class="contact-card-value">{{ getContactValue(contact) }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { contactInfo } from '../../data/contact.js'
import { t, isChinese } from '../../composables/useI18n.js'
import { deobfuscatePhone } from '../../utils/crypto.js'
import { Mail, Phone, MapPin, Github } from 'lucide-vue-next'

const iconMap = { Mail, Phone, MapPin, Github }
const contactList = computed(() => Object.values(contactInfo))

const flippedState = ref({
  Mail: false,
  Phone: false,
  MapPin: false
})

const copiedState = ref({
  Mail: false,
  Phone: false
})

const copyTimers = {
  Mail: null,
  Phone: null
}

const getIconComponent = (iconName) => iconMap[iconName] || Mail

const getContactValue = (contact) => {
  if (typeof contact.value === 'object') {
    return contact.value[isChinese.value ? 'zh' : 'en']
  }

  if (contact.encrypted && contact.value) {
    try {
      return deobfuscatePhone(contact.value)
    } catch (e) {
      console.error('Failed to decrypt phone:', e)
      return '隐私保护'
    }
  }

  return String(contact.value || '')
}

const getResidencyText = (contact, type) => {
  const lang = isChinese.value ? 'zh' : 'en'
  return contact.residency?.[type]?.[lang] || ''
}

const isPrivateContact = (contact) => contact.icon === 'Mail' || contact.icon === 'Phone'
const isLocationContact = (contact) => contact.icon === 'MapPin'
const isFlipCardContact = (contact) => isPrivateContact(contact) || isLocationContact(contact)

const isFlipped = (contact) => Boolean(flippedState.value[contact.icon])

const toggleFlip = (contact) => {
  if (!isFlipCardContact(contact)) return
  flippedState.value[contact.icon] = !flippedState.value[contact.icon]
}

const getCopyButtonText = (contact) => (copiedState.value[contact.icon] ? '已复制 ✓' : '复制')

const setCopiedFeedback = (iconName) => {
  copiedState.value[iconName] = true

  if (copyTimers[iconName]) {
    clearTimeout(copyTimers[iconName])
  }

  copyTimers[iconName] = setTimeout(() => {
    copiedState.value[iconName] = false
    copyTimers[iconName] = null
  }, 1500)
}

const copyPrivateContact = async (contact) => {
  try {
    await navigator.clipboard.writeText(getContactValue(contact))
    setCopiedFeedback(contact.icon)
  } catch (e) {
    console.error('Failed to copy contact:', e)
  }
}

const isCardClickable = (contact) => Boolean(contact.rawLink || contact.link)

const handleContactClick = (contact) => {
  if (!isCardClickable(contact)) return
  const link = contact.rawLink || contact.link
  if (link) window.open(link, '_blank')
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
  color: var(--text-on-dark-muted);
  font-weight: 400;
  letter-spacing: var(--tracking-subheading);
  word-break: keep-all;
  overflow-wrap: break-word;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.flip-card {
  perspective: 800px;
  min-height: 140px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 140px;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-face {
  position: absolute;
  inset: 0;
  background: var(--surface-card-dark);
  border-radius: var(--radius-cards);
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid var(--surface-border-dark-strong);
  backface-visibility: hidden;
}

.flip-card-front {
  backface-visibility: hidden;
}

.flip-card-back {
  backface-visibility: hidden;
  transform: rotateY(180deg);
}

.contact-card {
  background: var(--surface-card-dark);
  border-radius: var(--radius-cards);
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: background 0.25s ease, border-color 0.25s ease;
  border: 1px solid var(--surface-border-dark-strong);
}

.contact-card.clickable {
  cursor: pointer;
}

.contact-card.clickable:hover {
  background: var(--surface-card-darker);
  border-color: rgba(41, 151, 255, 0.55);
}

.contact-card-icon {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
  background: var(--color-interactive-blue);
}

.contact-card-content {
  flex: 1;
}

.contact-card-label {
  font-size: var(--text-caption);
  font-weight: 600;
  color: var(--text-on-dark-subtle);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.contact-card-value {
  font-size: var(--text-body);
  font-weight: 600;
  color: var(--text-on-dark-strong);
  margin: 0;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.35;
  letter-spacing: var(--tracking-body);
}

.contact-card-value.is-phone {
  white-space: nowrap;
  word-break: normal;
  overflow-wrap: normal;
}

.contact-action-btn {
  margin-top: 8px;
  background: var(--surface-card-darker);
  color: var(--text-on-dark);
  border: 1px solid var(--surface-border-dark-strong);
  border-radius: var(--radius-buttons);
  padding: 6px 12px;
  font-size: var(--text-body-sm);
  font-weight: 500;
  letter-spacing: var(--tracking-body-sm);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.contact-action-btn:hover {
  background: var(--surface-card-dark);
  border-color: var(--text-on-dark-subtle);
  color: var(--text-on-dark-strong);
}

.location-lines {
  margin-top: 4px;
}

.location-line {
  display: flex;
  align-items: baseline;
  gap: 8px;
  line-height: 1.4;
}

.location-tag {
  font-size: var(--text-body-sm);
  color: var(--text-on-dark-subtle);
  white-space: nowrap;
}

.location-text {
  font-size: var(--text-body-sm);
  color: var(--text-on-dark-strong);
  letter-spacing: var(--tracking-body-sm);
}

.location-divider {
  height: 1px;
  background: var(--surface-border-dark-strong);
  margin: 8px 0;
}

@media (max-width: 968px) {
  .contact-section {
    padding: 60px 20px;
  }

  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 48px 16px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .contact-card,
  .flip-card-face {
    padding: 22px;
    gap: 16px;
  }

  .contact-card-icon {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  .contact-section {
    padding: 40px 12px;
  }

  .contact-card,
  .flip-card-face {
    padding: 18px;
    gap: 14px;
  }

  .contact-card-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
  }
}
</style>
