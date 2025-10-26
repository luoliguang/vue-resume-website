<template>
  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title">懂服装供应链的流程优化者</h2>
      <div class="about-content">
        <div class="about-text">
          <p>我于2023年毕业于重庆电子科技职业大学。</p>
          <p>我目前拥有两年以上服装行业一线跟单经验，深刻理解从接单到生产的业务全流程。</p>
          <p>在工作中，我没有止步于执行标准流程，而是发现痛点，主动挖掘操作瓶颈。我通过快速自学并应用WPS脚本、Vue.js及Node.js，成功开发并部署了3个自动化工具，将一线的低效痛点转变为稳定的、高效率的数字化解决方案，显著降低了错误率并优化了工作流。</p>
        </div>
        <div class="about-image">
          <div class="avatar-container">
            <img 
              src="/images/me.jpg" 
              alt="我的头像" 
              class="avatar-img"
              @error="handleImageError"
            >
            <div v-if="imageError" class="avatar-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>头像</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.section {
  padding: 80px 0;
  display: flex;
  align-items: center;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #3498db;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: center;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  color: #555;
}

.avatar-container {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 4px solid white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4px;
}

.avatar-img {
  /* width: 100%; */
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

/* 平板端 */
@media (max-width: 968px) {
  .section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2.25rem;
    margin-bottom: 24px;
  }
  
  .about-content {
    gap: 32px;
  }
  
  .about-text p {
    font-size: 1.05rem;
    line-height: 1.75;
    margin-bottom: 18px;
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
  }

  .section-title {
    font-size: 1.875rem;
    margin-bottom: 20px;
  }
  
  .about-text p {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 16px;
  }
  
  .avatar-container {
    width: 220px;
    height: 220px;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .section {
    padding: 50px 0;
  }

  .section-title {
    font-size: 1.625rem;
    margin-bottom: 16px;
  }
  
  .about-text p {
    font-size: 0.95rem;
    line-height: 1.65;
    margin-bottom: 14px;
  }
  
  .avatar-container {
    width: 180px;
    height: 180px;
  }
}
</style>
