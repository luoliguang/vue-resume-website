<template>
  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title">懂服装供应链的流程优化者</h2>
      <div class="about-content">
        <div class="about-text">
          <p>我拥有两年以上服装行业一线跟单经验，深刻理解从接单到生产的业务全流程。</p>
          <p>我擅长发现工作流中的重复劳动和潜在风险点，并能主动运用WPS脚本、AI工具及全栈开发技术（Vue/Node.js）来构建解决方案，实现流程自动化与效率提升。</p>
        </div>
        <div class="about-image">
          <div class="placeholder-avatar">
            <span>头像</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 关于我组件逻辑
</script>

<style scoped>
.section {
  padding: 80px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
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
  margin-bottom: 50px;
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
  gap: 50px;
  align-items: center;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  color: #555;
}

.placeholder-avatar {
  width: 200px;
  height: 200px;
  background: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #6c757d;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
