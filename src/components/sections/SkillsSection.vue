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
              <svg v-else-if="category.id === 'productivity'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
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
  background: transparent;
}

.container {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: var(--text-heading);
  color: var(--color-cloud-white);
  margin-bottom: 16px;
  font-weight: 600;
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #86868b;
  margin-bottom: 50px;
}

.skills-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 40px;
}

/* 左侧技能分类 */
.skills-sidebar {
  background: var(--surface-card-dark);
  border: 1px solid var(--surface-border-dark-strong);
  border-radius: var(--radius-cards);
  padding: 24px 16px;
  height: fit-content;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 6px;
  border-radius: var(--radius-standard);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  color: var(--text-on-dark-muted);
}

.category-item:hover {
  background: var(--surface-card-darker);
  color: var(--text-on-dark);
}

.category-item.active {
  background: rgba(41, 151, 255, 0.14);
  color: var(--color-interactive-blue);
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.category-item.active .category-icon {
  color: var(--color-interactive-blue);
}

.category-name {
  font-size: var(--text-body-sm);
  font-weight: 500;
  letter-spacing: var(--tracking-body-sm);
}

/* 右侧技能详情 */
.skills-details {
  background: var(--surface-card-dark);
  border: 1px solid var(--surface-border-dark-strong);
  border-radius: var(--radius-cards);
  padding: 40px;
}

.skill-category {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.skill-category.active {
  opacity: 1;
  transform: translateY(0);
}

.category-title {
  font-size: var(--text-heading-sm);
  color: var(--text-on-dark-strong);
  margin-bottom: 28px;
  font-weight: 600;
  letter-spacing: var(--tracking-heading-sm);
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-item {
  padding: 20px;
  background: var(--surface-card-darker);
  border: 1px solid var(--surface-border-dark-strong);
  border-radius: 18px;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.skill-item:hover {
  border-color: var(--text-on-dark-subtle);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.skill-name {
  font-size: var(--text-body);
  font-weight: 600;
  color: var(--text-on-dark-strong);
  letter-spacing: var(--tracking-body);
}

.skill-level {
  font-size: var(--text-body-sm);
  font-weight: 600;
  color: var(--color-interactive-blue);
  letter-spacing: var(--tracking-body-sm);
}

.skill-progress {
  width: 100%;
  height: 6px;
  background: var(--surface-border-dark);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-interactive-blue) 0%, var(--color-vivid-blue) 100%);
  border-radius: 999px;
  transition: width 0.8s ease;
}

.skill-description {
  font-size: var(--text-body-sm);
  color: var(--text-on-dark-muted);
  line-height: 1.5;
  margin: 0;
  letter-spacing: var(--tracking-body-sm);
}

/* 平板端 */
@media (max-width: 968px) {
  .skills-section {
    padding: 60px 20px;
  }

  .skills-content {
    grid-template-columns: 190px 1fr;
    gap: 24px;
  }

  .skills-sidebar {
    padding: 20px 12px;
  }

  .skills-details {
    padding: 28px;
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .skills-section {
    padding: 48px 16px;
  }

  .skills-content {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .skills-sidebar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 12px;
    border-radius: var(--radius-standard);
  }

  .category-item {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 0;
    padding: 12px 8px;
    border-radius: var(--radius-standard);
    text-align: center;
  }

  .category-name {
    font-size: 12px;
    line-height: 1.3;
  }

  .skills-details {
    padding: 24px;
    border-radius: var(--radius-standard);
  }

  .category-title {
    margin-bottom: 20px;
  }

  .skills-list {
    gap: 14px;
  }

  .skill-item {
    padding: 16px;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .skills-section {
    padding: 40px 12px;
  }

  .skills-sidebar {
    padding: 12px;
    gap: 6px;
  }

  .category-item {
    padding: 9px 12px;
    min-width: 90px;
  }

  .skills-details {
    padding: 18px;
  }

  .skill-item {
    padding: 14px;
  }
}
</style>
