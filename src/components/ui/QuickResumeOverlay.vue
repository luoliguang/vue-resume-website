<template>
  <transition name="qr-fade">
    <div v-if="modelValue" class="qr-overlay" @click.self="close">
      <div class="qr-sheet" role="dialog" aria-modal="true" aria-label="快速浏览简历">
        <button class="qr-close" @click="close" aria-label="关闭">
          ✕
        </button>
        <div class="qr-frame">
          <QuickResumeCard @learnMore="close" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import QuickResumeCard from '../quick/QuickResumeCard.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  src: { type: String, default: '/pdf.html' }
})

const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)

const handleEsc = (e) => {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
  if (props.modelValue) document.documentElement.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc)
  document.documentElement.style.overflow = ''
})

watch(() => props.modelValue, (val) => {
  document.documentElement.style.overflow = val ? 'hidden' : ''
})
</script>

<style scoped>
.qr-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  z-index: 2000;
}

.qr-sheet {
  width: min(1100px, 96vw);
  height: min(760px, 92vh);
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 30px 80px rgba(0,0,0,.25);
  overflow: hidden;
  position: relative;
  transform: translateY(6px);
  animation: qr-pop .18s ease-out;
}

.qr-frame {
  width: 100%;
  height: 100%;
  border: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  padding: 12px 12px 12px 12px;
  padding-top: calc(env(safe-area-inset-top, 0px) + 12px);
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 12px);
}

.qr-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e5e9ef;
  background: #fff;
  cursor: pointer;
  color: #1f2d3d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  z-index: 10;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qr-close:hover {
  background: #f8fafc;
  transform: scale(1.05);
}

.qr-fade-enter-active, .qr-fade-leave-active { transition: opacity .18s ease; }
.qr-fade-enter-from, .qr-fade-leave-to { opacity: 0; }

@keyframes qr-pop { from { transform: translateY(12px); opacity: .96; } to { transform: translateY(6px); opacity: 1; } }

@media (max-width: 768px) {
  .qr-sheet { width: 96vw; height: 88vh; border-radius: 12px; }
  .qr-close { top: 8px; right: 8px; width: 32px; height: 32px; font-size: 16px; }
}
</style>


