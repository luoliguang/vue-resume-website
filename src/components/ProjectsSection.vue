<template>
  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title" v-scroll-fade-in>项目经验</h2>
      
      <!-- 项目1 -->
      <div class="project-item" v-scroll-fade-in>
        <div class="project-content">
          <div class="project-text">
            <h3>订单处理自动化防错脚本</h3>
            <div class="project-details">
              <div class="detail-item">
                <h4>挑战</h4>
                <p>手工处理订单时容易出现数据录入错误，导致生产延误和客户投诉。传统Excel表格无法有效防止重复录入和格式错误。</p>
              </div>
              <div class="detail-item">
                <h4>方案</h4>
                <p>开发WPS脚本自动化工具，集成数据验证、重复检查、格式标准化功能。结合Vue.js构建可视化操作界面，提升用户体验。</p>
              </div>
              <div class="detail-item">
                <h4>成果</h4>
                <p>订单处理效率提升60%，错误率降低至0.1%以下，客户满意度显著提升。系统已稳定运行8个月，处理订单超过5000单。</p>
              </div>
            </div>
            <div class="project-tech">
              <span class="tech-tag">WPS脚本</span>
              <span class="tech-tag">Vue.js</span>
              <span class="tech-tag">数据验证</span>
            </div>
          </div>
        </div>
        <div class="project-media">
          <div class="video-placeholder">
            <div class="placeholder-content">
              <div class="placeholder-icon">🎬</div>
              <h4>订单处理自动化演示</h4>
              <p>展示WPS脚本自动化处理订单的完整流程</p>
              <div class="placeholder-features">
                <span>数据验证</span>
                <span>重复检查</span>
                <span>格式标准化</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 项目2 -->
      <div class="project-item" v-scroll-fade-in>
        <div class="project-content">
          <div class="project-text">
            <h3>订单执行流程防漏单监控脚本</h3>
            <div class="project-details">
              <div class="detail-item">
                <h4>挑战</h4>
                <p>复杂的订单执行流程中，容易出现漏单、重复下单等问题。传统人工检查效率低，且容易遗漏关键节点。</p>
              </div>
              <div class="detail-item">
                <h4>方案</h4>
                <p>构建实时监控系统，通过Node.js后端服务监控订单状态变化，结合React前端展示实时数据流和异常预警。</p>
              </div>
              <div class="detail-item">
                <h4>成果</h4>
                <p>实现100%订单流程覆盖，漏单率降至0，系统响应时间<2秒。成功预防潜在损失超过50万元。</p>
              </div>
            </div>
            <div class="project-tech">
              <span class="tech-tag">Node.js</span>
              <span class="tech-tag">React</span>
              <span class="tech-tag">实时监控</span>
            </div>
          </div>
        </div>
        <div class="project-media">
          <div class="video-placeholder">
            <div class="placeholder-content">
              <div class="placeholder-icon">📊</div>
              <h4>订单监控系统演示</h4>
              <p>展示实时监控订单执行流程的界面和功能</p>
              <div class="placeholder-features">
                <span>实时监控</span>
                <span>异常预警</span>
                <span>数据可视化</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 项目3 -->
      <div class="project-item" v-scroll-fade-in>
        <div class="project-content">
          <div class="project-text">
            <h3>服装款式面料数字化查询平台</h3>
            <div class="project-details">
              <div class="detail-item">
                <h4>挑战</h4>
                <p>设计师和采购人员需要快速查询面料信息，传统纸质档案查找效率低，信息更新滞后，影响设计决策速度。</p>
              </div>
              <div class="detail-item">
                <h4>方案</h4>
                <p>开发移动端PWA应用，集成面料数据库、图片识别、智能搜索功能。支持离线使用，提供流畅的移动端体验。</p>
              </div>
              <div class="detail-item">
                <h4>成果</h4>
                <p>查询效率提升80%，支持5000+面料数据，用户满意度95%+。应用已部署并服务设计团队20+人。</p>
              </div>
            </div>
            <div class="project-tech">
              <span class="tech-tag">Vue 3</span>
              <span class="tech-tag">PWA</span>
              <span class="tech-tag">移动端</span>
            </div>
          </div>
        </div>
        <div class="project-media">
          <div class="video-placeholder">
            <div class="placeholder-content">
              <div class="placeholder-icon">📱</div>
              <h4>面料查询平台演示</h4>
              <p>展示移动端面料数字化查询平台的界面和功能</p>
              <div class="placeholder-features">
                <span>移动端界面</span>
                <span>智能搜索</span>
                <span>离线使用</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 项目经验组件逻辑
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
  margin-bottom: 80px;
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

/* 项目项布局 */
.project-item {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 60px;
  margin-bottom: 120px;
  align-items: center;
}

.project-content {
  padding-right: 20px;
}

.project-text h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
}

.project-details {
  margin-bottom: 30px;
}

.detail-item {
  margin-bottom: 25px;
}

.detail-item h4 {
  font-size: 1.1rem;
  color: #3498db;
  margin-bottom: 8px;
  font-weight: 600;
}

.detail-item p {
  color: #666;
  line-height: 1.7;
  font-size: 0.95rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: #f8f9fa;
  color: #495057;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid #dee2e6;
  font-weight: 500;
}

/* 媒体区域 */
.project-media {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: #f8f9fa;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 滚动动画样式 */
.project-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.project-item.animate {
  opacity: 1;
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .project-item {
    grid-template-columns: 45% 55%;
    gap: 40px;
  }
  
  .project-media {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .project-item {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 80px;
  }
  
  .project-content {
    padding-right: 0;
    order: 2;
  }
  
  .project-media {
    order: 1;
  }
  
  .project-media {
    height: 300px;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 60px;
  }
  
  .project-text h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 40px;
  }
  
  .project-item {
    margin-bottom: 60px;
  }
  
  .project-media {
    height: 250px;
  }
  
  .project-text h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }
  
  .detail-item {
    margin-bottom: 20px;
  }
  
  .detail-item h4 {
    font-size: 1rem;
  }
  
  .detail-item p {
    font-size: 0.9rem;
  }
}

/* 视频占位符样式 */
.video-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 12px;
}

.placeholder-content {
  text-align: center;
  padding: 40px 20px;
  max-width: 300px;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  opacity: 0.9;
}

.placeholder-content h4 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.placeholder-content p {
  font-size: 0.9rem;
  margin-bottom: 20px;
  opacity: 0.9;
  line-height: 1.5;
}

.placeholder-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.placeholder-features span {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);
}

</style>

