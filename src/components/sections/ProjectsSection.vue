<template>
  <section id="experience" class="experience-section">
    <div class="container">
      <h2 class="section-title">{{ t('experience.title') }}</h2>
      
      <div class="experience-content">
        <!-- 左侧时间线 -->
        <div class="timeline-sidebar">
          <div class="timeline-line"></div>
          <div 
            v-for="experience in workExperiences" 
            :key="experience.id"
            class="timeline-item"
            :class="{ active: experience.isActive }"
            @click="selectExperience(experience.id)"
          >
            <div class="timeline-dot"></div>
            <span class="timeline-period">{{ experience.period[isChinese ? 'zh' : 'en'] }}</span>
          </div>
        </div>

        <!-- 右侧详细展示 -->
        <div class="experience-details">
          <div 
            v-for="experience in workExperiences" 
            :key="experience.id"
            class="experience-card"
            :class="{ active: experience.isActive }"
            v-show="experience.isActive"
          >
            <div class="experience-header">
              <div class="experience-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div class="experience-meta">
                <div class="date-range">{{ experience.dateRange[isChinese ? 'zh' : 'en'] }}</div>
                <h3 class="job-title">{{ experience.title[isChinese ? 'zh' : 'en'] }}</h3>
                <div class="company-name">{{ experience.company[isChinese ? 'zh' : 'en'] }}</div>
              </div>
            </div>
            
            <p class="experience-description">{{ experience.description[isChinese ? 'zh' : 'en'] }}</p>
            
            <ul class="responsibilities">
              <li v-for="(responsibility, index) in experience.responsibilities" :key="index">
                {{ responsibility[isChinese ? 'zh' : 'en'] }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 成就亮点 -->
      <div class="achievements-section">
        <h3 class="achievements-title">{{ t('experience.achievements') }}</h3>
        <div class="achievements-grid">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.id"
            class="achievement-card"
          >
            <div class="achievement-icon">
              <svg v-if="achievement.icon === 'smile'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
              <svg v-else-if="achievement.icon === 'refresh-cw'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23,4 23,10 17,10"/>
                <polyline points="1,20 1,14 7,14"/>
                <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4L18.36,18.36A9,9,0,0,1,3.51,15"/>
              </svg>
              <svg v-else-if="achievement.icon === 'brain'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.5,2A2.5,2.5,0,0,1,12,4.5V6a2.5,2.5,0,0,1-2.5,2.5H9.5A2.5,2.5,0,0,1,7,6V4.5A2.5,2.5,0,0,1,9.5,2Z"/>
                <path d="M14.5,2A2.5,2.5,0,0,0,12,4.5V6a2.5,2.5,0,0,0,2.5,2.5h0A2.5,2.5,0,0,0,17,6V4.5A2.5,2.5,0,0,0,14.5,2Z"/>
                <path d="M9.5,8.5A2.5,2.5,0,0,1,12,11v1.5a2.5,2.5,0,0,1-2.5,2.5H9.5A2.5,2.5,0,0,1,7,12.5V11A2.5,2.5,0,0,1,9.5,8.5Z"/>
                <path d="M14.5,8.5A2.5,2.5,0,0,0,12,11v1.5a2.5,2.5,0,0,0,2.5,2.5h0A2.5,2.5,0,0,0,17,12.5V11A2.5,2.5,0,0,0,14.5,8.5Z"/>
                <path d="M9.5,15A2.5,2.5,0,0,1,12,17.5V19a2.5,2.5,0,0,1-2.5,2.5H9.5A2.5,2.5,0,0,1,7,19V17.5A2.5,2.5,0,0,1,9.5,15Z"/>
                <path d="M14.5,15A2.5,2.5,0,0,0,12,17.5V19a2.5,2.5,0,0,0,2.5,2.5h0A2.5,2.5,0,0,0,17,19V17.5A2.5,2.5,0,0,0,14.5,15Z"/>
              </svg>
            </div>
            <h4 class="achievement-title">{{ achievement.title[isChinese ? 'zh' : 'en'] }}</h4>
            <p class="achievement-description">{{ achievement.description[isChinese ? 'zh' : 'en'] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { workExperiences, achievements } from '../../data/experience.js'
import { t, isChinese } from '../../composables/useI18n.js'

const selectedExperienceId = ref(1)

const selectExperience = (id) => {
  selectedExperienceId.value = id
  // 更新所有经历的状态
  workExperiences.forEach(exp => {
    exp.isActive = exp.id === id
  })
}
</script>

<style scoped>
.experience-section {
  padding: 80px 20px;
  background: linear-gradient(180deg, #f0f2f5 0%, #e8eaf0 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: left;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 50px;
  font-weight: 600;
}

.experience-content {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  margin-bottom: 80px;
}

/* 左侧时间线 */
.timeline-sidebar {
  position: relative;
  padding-top: 20px;
}

.timeline-line {
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 15px 0;
}

.timeline-item.active .timeline-dot {
  background: #3498db;
  border-color: #3498db;
  transform: scale(1.2);
}

.timeline-item.active .timeline-period {
  color: #2c3e50;
  font-weight: 600;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 3px solid #e0e0e0;
  transition: all 0.3s ease;
  z-index: 1;
}

.timeline-period {
  margin-left: 30px;
  font-size: 0.9rem;
  color: #888;
  transition: all 0.3s ease;
}

/* 右侧详细展示 */
.experience-details {
  padding-left: 20px;
}

.experience-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.experience-card.active {
  opacity: 1;
  transform: translateY(0);
}

.experience-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}

.experience-icon {
  width: 50px;
  height: 50px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3498db;
  flex-shrink: 0;
}

.experience-meta {
  flex: 1;
}

.date-range {
  color: #3498db;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.job-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.company-name {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

.experience-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

.responsibilities {
  list-style: none;
  padding: 0;
}

.responsibilities li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
}

.responsibilities li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #3498db;
  font-weight: bold;
}

/* 成就亮点 */
.achievements-section {
  margin-top: 60px;
}

.achievements-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.achievement-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.achievement-icon {
  width: 40px;
  height: 40px;
  background: #f0f8ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3498db;
  margin-bottom: 15px;
}

.achievement-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.achievement-description {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
}

/* 平板端 */
@media (max-width: 968px) {
  .experience-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 2.25rem;
    margin-bottom: 40px;
  }
  
  .experience-content {
    grid-template-columns: 150px 1fr;
    gap: 30px;
  }
  
  .experience-card {
    padding: 25px;
  }
  
  .job-title {
    font-size: 1.25rem;
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .experience-section {
    padding: 50px 16px;
  }
  
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 30px;
  }
  
  .experience-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .timeline-sidebar {
    display: flex;
    justify-content: center;
    padding-top: 0;
    margin-bottom: 20px;
  }
  
  .timeline-line {
    display: none;
  }
  
  .timeline-item {
    margin-bottom: 0;
    margin-right: 20px;
  }
  
  .timeline-dot {
    position: static;
    transform: none;
    margin-right: 10px;
  }
  
  .timeline-period {
    margin-left: 0;
    font-size: 0.85rem;
  }
  
  .experience-details {
    padding-left: 0;
  }
  
  .experience-card {
    padding: 20px;
  }
  
  .experience-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .achievement-card {
    padding: 20px;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .experience-section {
    padding: 40px 12px;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 25px;
  }
  
  .experience-card {
    padding: 15px;
  }
  
  .job-title {
    font-size: 1.1rem;
  }
  
  .achievement-card {
    padding: 15px;
  }
}
</style>
