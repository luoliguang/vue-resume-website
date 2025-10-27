<template>
  <section id="journey" class="journey-section">
    <div class="container">
      <h2 class="section-title">{{ t('journey.title') }}</h2>
      
      <!-- 横向时间轴 -->
      <div class="timeline-wrapper">
        <a-timeline 
          :direction="timelineDirection" 
          :mode="timelineMode" 
          :labelPosition="timelineLabelPosition"
        >
          <a-timeline-item 
            v-for="milestone in journeyMilestones" 
            :key="milestone.id"
            :label="milestone.year"
          >
            <div class="timeline-item-content">
              <div :class="['timeline-icon', getStatusClass(milestone.status)]">
                <component :is="getIconComponent(milestone.icon)" />
              </div>
              <div class="timeline-text">
                <div class="timeline-title">{{ milestone.title[isChinese ? 'zh' : 'en'] }}</div>
                <div class="timeline-description">{{ milestone.description[isChinese ? 'zh' : 'en'] }}</div>
                <div :class="['timeline-status', getStatusClass(milestone.status)]">
                  {{ getStatusText(milestone.status) }}
                </div>
              </div>
            </div>
          </a-timeline-item>
        </a-timeline>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { journeyMilestones } from '../../data/journey.js'
import { t, isChinese } from '../../composables/useI18n.js'
import { GraduationCap, Briefcase, Code, Rocket, Contact } from 'lucide-vue-next'

// 响应式Timeline配置
const isMobile = ref(false)
const timelineMode = ref('alternate') // alternate: 上下交错布局
const timelineDirection = ref('horizontal') // horizontal: 水平方向
const timelineLabelPosition = ref('same') // same: 标签与内容同一侧

// 检测屏幕尺寸
const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768
  if (isMobile.value) {
    timelineMode.value = 'left'
    timelineDirection.value = 'vertical'
    timelineLabelPosition.value = 'same'
  } else {
    timelineMode.value = 'alternate' // 保持交替模式
    timelineDirection.value = 'horizontal' // 水平方向
    timelineLabelPosition.value = 'same'
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const getStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'status-completed'
    case 'in-progress':
      return 'status-in-progress'
    case 'not-started':
      return 'status-not-started'
    default:
      return 'status-completed'
  }
}

const getStatusText = (status) => {
  if (isChinese.value) {
    switch (status) {
      case 'completed':
        return '已完成'
      case 'in-progress':
        return '进行中'
      case 'not-started':
        return '未开始'
      default:
        return '已完成'
    }
  } else {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'not-started':
        return 'Not Started'
      default:
        return 'Completed'
    }
  }
}

const getIconComponent = (iconName) => {
  const iconMap = {
    graduation: GraduationCap,
    briefcase: Briefcase,
    code: Code,
    rocket: Rocket,
    contact: Contact
  }
  return iconMap[iconName] || Code
}
</script>

<style scoped>
.journey-section {
  padding: 80px 20px;
  background: linear-gradient(180deg, #e8eaf0 0%, #f0f2f5 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 40px;
  font-weight: 600;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 0;
}

/* Timeline 包装器 */
.timeline-wrapper {
  margin-top: 100px;
  padding: 20vh 0;
  overflow-x: visible;
  overflow-y: visible;
  width: 100%;
}

/* 水平交替布局时间轴样式 */
.timeline-wrapper :deep(.arco-timeline) {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline-wrapper :deep(.arco-timeline-item) {
  flex: 1;
  min-width: 100px;
  max-width: 300px;
}

/* 标签和内容的布局 */
.timeline-wrapper :deep(.arco-timeline-item-label) {
  text-align: center;
  padding: 0 15px;
}

.timeline-wrapper :deep(.arco-timeline-item-content) {
  padding: 0 15px;
}

/* Timeline 标签样式 */
.timeline-label {
  text-align: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  width: 100%;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
}

.timeline-year {
  font-size: 1.1rem;
  font-weight: 600;
  color: #3498db;
  margin-bottom: 6px;
}

.timeline-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 3px;
}

.timeline-subtitle {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
}

/* Timeline 内容样式 */
.timeline-content {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  width: 100%;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
}

.timeline-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
}

.timeline-status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Timeline 节点样式 */
.timeline-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid white;
}

.timeline-dot.status-completed {
  background: #52c41a;
  border: 3px solid #52c41a;
}

.timeline-dot.status-in-progress {
  background: #faad14;
  border: 3px solid #faad14;
}

.timeline-dot.status-not-started {
  background: #ff4d4f;
  border: 3px solid #ff4d4f;
}

.dot-icon {
  color: white;
}

/* 新的Timeline项目内容样式 - 水平交替布局 */
.timeline-item-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
}

.timeline-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  flex-shrink: 0;
  align-self: flex-start;
}

.timeline-icon svg {
  color: #fff;
}

.timeline-icon.status-completed {
  background: #52c41a;
}

.timeline-icon.status-in-progress {
  background: #faad14;
}

.timeline-icon.status-not-started {
  background: #ff4d4f;
}

.timeline-text {
  flex: 1;
  width: 100%;
}

.timeline-text .timeline-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.timeline-text .timeline-description {
  font-size: 0.85rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 8px;
}

.timeline-text .timeline-status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* 状态样式 */
.status-completed {
  background: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-in-progress {
  background: #fffbe6;
  color: #faad14;
  border: 1px solid #ffe58f;
}

.status-not-started {
  background: #fff2f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

/* 移动端响应式设计 - 竖向时间轴 */
@media (max-width: 768px) {
  .journey-section {
    padding: 50px 16px;
  }
  
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 10px;
  }
  
  .section-subtitle {
    font-size: 0.95rem;
    margin-bottom: 50px;
  }
  
  .timeline-wrapper {
    padding: 20px 0;
  }
  
  /* 移动端改为左对齐时间轴 */
  .timeline-wrapper :deep(.arco-timeline) {
    width: 100%;
    max-width: 100%;
  }
  
  .timeline-wrapper :deep(.arco-timeline-item) {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .timeline-wrapper :deep(.arco-timeline-item-label) {
    width: 100px;
    text-align: center;
    padding: 0 10px;
  }
  
  .timeline-wrapper :deep(.arco-timeline-item-content) {
    flex: 1;
    padding: 0 10px;
  }
  
  /* 移动端Timeline项目内容样式 */
  .timeline-item-content {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    max-width: 100%;
  }
  
  .timeline-icon {
    margin-right: 0;
    margin-bottom: 12px;
    align-self: flex-start;
  }
  
  .timeline-text {
    width: 100%;
  }
  
  .timeline-title {
    font-size: 1rem;
  }
  
  .timeline-description {
    font-size: 0.9rem;
  }
}

/* 小屏幕手机 - 竖向时间轴 */
@media (max-width: 480px) {
  .journey-section {
    padding: 40px 12px;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
    margin-bottom: 40px;
  }
  
  .timeline-wrapper {
    padding: 15px 0;
  }
  
  /* 小屏幕竖向时间轴 */
  .timeline-wrapper :deep(.arco-timeline) {
    width: 100%;
    max-width: 100%;
    padding: 0;
  }
  
  .timeline-wrapper :deep(.arco-timeline-item) {
    width: 100%;
    margin-bottom: 25px;
    padding-left: 0;
  }
  
  .timeline-item-content {
    padding: 14px;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
  
  .timeline-icon {
    margin-bottom: 10px;
  }
  
  .timeline-title {
    font-size: 0.95rem;
  }
  
  .timeline-description {
    font-size: 0.85rem;
  }
}
</style>