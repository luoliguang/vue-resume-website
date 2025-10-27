<template>
  <div class="language-switcher">
    <button 
      class="language-btn"
      :class="{ active: isChinese }"
      @click="setLanguage('zh')"
    >
      中文
    </button>
    <button 
      class="language-btn"
      :class="{ active: isEnglish }"
      @click="setLanguage('en')"
    >
      EN
    </button>
  </div>
</template>

<script setup>
import { setLanguage, isChinese, isEnglish } from '../../composables/useI18n.js'
</script>

<style scoped>
.language-switcher {
  display: flex;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 25px;
  padding: 4px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.language-btn {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #666;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 50px;
}

.language-btn:hover {
  color: #333;
  background: rgba(0, 0, 0, 0.05);
}

.language-btn.active {
  background: #3498db;
  color: white;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}

.language-btn.active:hover {
  background: #2980b9;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .language-switcher {
    padding: 3px;
  }
  
  .language-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
    min-width: 45px;
  }
}
</style>
