<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <h2 class="section-title">{{ t('skills.title') }}</h2>
      
      <div class="skills-content">
        <!-- 左侧技能分类 -->
        <div class="skills-sidebar">
          <div 
            v-for="category in skillCategories" 
            :key="category.id"
            class="category-item"
            :class="{ active: activeCategory === category.id }"
            @click="setActiveCategory(category.id)"
          >
            <div class="category-icon">
              <svg v-if="category.id === 'apparel'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <svg v-else-if="category.id === 'communication'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <path d="M13 8H7"/>
                <path d="M17 12H7"/>
              </svg>
              <svg v-else-if="category.id === 'technical'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              <svg v-else-if="category.id === 'design'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
            </div>
            <span class="category-name">{{ category.name[isChinese ? 'zh' : 'en'] }}</span>
          </div>
        </div>

        <!-- 右侧技能详情 -->
        <div class="skills-details">
          <div 
            v-for="category in skillCategories" 
            :key="category.id"
            class="skill-category"
            :class="{ active: activeCategory === category.id }"
            v-show="activeCategory === category.id"
          >
            <h3 class="category-title">{{ category.name[isChinese ? 'zh' : 'en'] }}</h3>
            
            <div class="skills-list">
              <div 
                v-for="(skill, index) in category.skills" 
                :key="`${category.id}-${index}`"
                class="skill-item"
              >
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name[isChinese ? 'zh' : 'en'] }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-progress">
                  <div 
                    class="progress-bar"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
                <p class="skill-description">{{ skill.description[isChinese ? 'zh' : 'en'] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { skillCategories } from '../../data/skills.js'
import { t, isChinese } from '../../composables/useI18n.js'

const activeCategory = ref('apparel')

const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}
</script>

<style scoped>
.skills-section {
  padding: 80px 20px;
  background: linear-gradient(180deg, #f0f2f5 0%, #e8eaf0 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 16px;
  font-weight: 600;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 50px;
}

.skills-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 40px;
}

/* 左侧技能分类 */
.skills-sidebar {
  background: white;
  border-radius: 15px;
  padding: 30px 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover {
  background: #f8f9fa;
}

.category-item.active {
  background: #e3f2fd;
  color: #1976d2;
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #666;
}

.category-item.active .category-icon {
  color: #1976d2;
}

.category-name {
  font-size: 0.95rem;
  font-weight: 500;
}

/* 右侧技能详情 */
.skills-details {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.skill-category {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.skill-category.active {
  opacity: 1;
  transform: translateY(0);
}

.category-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.skill-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.skill-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.skill-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.skill-level {
  font-size: 0.9rem;
  font-weight: 600;
  color: #3498db;
}

.skill-progress {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3498db 0%, #2980b9 100%);
  border-radius: 4px;
  transition: width 0.8s ease;
}

.skill-description {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

/* 平板端 */
@media (max-width: 968px) {
  .skills-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 2.25rem;
    margin-bottom: 12px;
  }
  
  .section-subtitle {
    font-size: 1.05rem;
    margin-bottom: 40px;
  }
  
  .skills-content {
    grid-template-columns: 200px 1fr;
    gap: 30px;
  }
  
  .skills-sidebar {
    padding: 25px 15px;
  }
  
  .skills-details {
    padding: 30px;
  }
  
  .category-title {
    font-size: 1.6rem;
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .skills-section {
    padding: 50px 16px;
  }
  
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 10px;
  }
  
  .section-subtitle {
    font-size: 0.95rem;
    margin-bottom: 32px;
    line-height: 1.6;
  }
  
  .skills-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .skills-sidebar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
  }
  
  .category-item {
    flex: 1;
    min-width: 120px;
    justify-content: center;
    margin-bottom: 0;
    padding: 12px 16px;
  }
  
  .skills-details {
    padding: 25px;
  }
  
  .category-title {
    font-size: 1.5rem;
  }
  
  .skills-list {
    gap: 20px;
  }
  
  .skill-item {
    padding: 18px;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .skills-section {
    padding: 40px 12px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
    margin-bottom: 28px;
  }
  
  .skills-sidebar {
    padding: 15px;
  }
  
  .category-item {
    padding: 10px 12px;
    font-size: 0.85rem;
  }
  
  .skills-details {
    padding: 20px;
  }
  
  .category-title {
    font-size: 1.3rem;
  }
  
  .skill-item {
    padding: 15px;
  }
  
  .skill-name {
    font-size: 1rem;
  }
}
</style>
