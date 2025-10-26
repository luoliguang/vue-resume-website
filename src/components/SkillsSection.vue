<template>
  <section id="skills" class="section">
    <div class="container">
      <h2 class="section-title">核心能力</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <h3>业务流程优化</h3>
          <div class="skill-tags">
            <span class="skill-tag">供应链协调</span>
            <span class="skill-tag">风险管控</span>
            <span class="skill-tag">流程自动化</span>
            <span class="skill-tag">WPS脚本</span>
          </div>
        </div>
        <div class="skill-category">
          <h3>全栈技术与AI应用</h3>
          <div class="skill-tags">
            <span class="skill-tag">Vue.js</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">AI工具应用</span>
            <span class="skill-tag">Web开发</span>
            <span class="skill-tag">Git</span>
          </div>
        </div>
        <div class="skill-category">
          <h3>行业知识</h3>
          <div class="skill-tags">
            <span class="skill-tag">服装跟单</span>
            <span class="skill-tag">面料知识</span>
            <span class="skill-tag">生产排期</span>
            <span class="skill-tag">客户沟通</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 核心能力组件逻辑
</script>

<style scoped>
.section {
  padding: 80px 0;
  display: flex;
  align-items: center;
  background: #f8f9fa;
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.skill-category h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.skill-tag {
  background: #3498db;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
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
  
  .skills-grid {
    gap: 28px;
  }
  
  .skill-category h3 {
    font-size: 1.375rem;
    margin-bottom: 18px;
  }
  
  .skill-tag {
    padding: 7px 14px;
    font-size: 0.875rem;
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .section-title {
    font-size: 1.875rem;
    margin-bottom: 20px;
  }
  
  .skill-category h3 {
    font-size: 1.25rem;
    margin-bottom: 16px;
  }
  
  .skill-tags {
    gap: 8px;
  }
  
  .skill-tag {
    padding: 6px 12px;
    font-size: 0.85rem;
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
  
  .skills-grid {
    gap: 20px;
  }
  
  .skill-category h3 {
    font-size: 1.125rem;
    margin-bottom: 14px;
  }
  
  .skill-tag {
    padding: 5px 12px;
    font-size: 0.8rem;
  }
}
</style>
