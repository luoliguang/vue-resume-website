<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <h2 class="section-title">{{ t('skills.title') }}</h2>

      <div class="skills-stack">
        <div
          v-for="category in skillCategories"
          :key="category.id"
          class="skill-group"
        >
          <!-- 分类标题行 -->
          <div class="group-header">
            <div class="group-icon">
              <svg v-if="category.id === 'apparel'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <svg v-else-if="category.id === 'communication'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <path d="M13 8H7"/><path d="M17 12H7"/>
              </svg>
              <svg v-else-if="category.id === 'technical'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              <svg v-else-if="category.id === 'productivity'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3 class="group-name">{{ category.name[isChinese ? 'zh' : 'en'] }}</h3>
          </div>

          <!-- 技能卡片网格 -->
          <div class="skills-grid">
            <div
              v-for="(skill, index) in category.skills"
              :key="`${category.id}-${index}`"
              class="skill-card"
            >
              <div class="skill-top">
                <span class="skill-name">{{ skill.name[isChinese ? 'zh' : 'en'] }}</span>
                <span class="skill-highlight">{{ skill.highlight[isChinese ? 'zh' : 'en'] }}</span>
              </div>
              <p class="skill-desc">{{ skill.description[isChinese ? 'zh' : 'en'] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { skillCategories as staticCategories } from '../../data/skills.js'
import { t, isChinese } from '../../composables/useI18n.js'
import { useContent } from '../../composables/useContent.js'

const { data: cmsSkills } = useContent('skills')

const skillCategories = computed(() => {
  if (cmsSkills.value?.length) {
    return cmsSkills.value.map(cat => ({
      id: cat.category_id,
      name: { zh: cat.name_zh, en: cat.name_en },
      skills: (cat.skills || []).map(s => ({
        name:        { zh: s.name_zh,        en: s.name_en },
        highlight:   { zh: s.highlight_zh,   en: s.highlight_en },
        description: { zh: s.description_zh, en: s.description_en },
      })),
    }))
  }
  return staticCategories
})
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
  margin-bottom: 56px;
  font-weight: 600;
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

/* ── 分类堆叠 ── */
.skills-stack {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.skill-group {}

/* 分类标题行 */
.group-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--surface-border-dark-strong);
}

.group-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(41, 151, 255, 0.12);
  border: 1px solid rgba(41, 151, 255, 0.2);
  color: var(--color-interactive-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.group-name {
  font-size: var(--text-heading-sm);
  font-weight: 600;
  color: var(--text-on-dark-strong);
  letter-spacing: var(--tracking-heading-sm);
  margin: 0;
}

/* ── 技能网格 ── */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.skill-card {
  padding: 20px;
  background: var(--surface-card-dark);
  border: 1px solid var(--surface-border-dark-strong);
  border-radius: 18px;
  transition: border-color 0.2s ease;
}

.skill-card:hover {
  border-color: rgba(41, 151, 255, 0.3);
}

.skill-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.skill-name {
  font-size: var(--text-body);
  font-weight: 600;
  color: var(--text-on-dark-strong);
  letter-spacing: var(--tracking-body);
}

.skill-highlight {
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(41, 151, 255, 0.12);
  border: 1px solid rgba(41, 151, 255, 0.25);
  color: var(--color-interactive-blue);
  font-size: var(--text-body-sm);
  font-weight: 600;
  letter-spacing: var(--tracking-body-sm);
  white-space: nowrap;
}

.skill-desc {
  font-size: var(--text-body-sm);
  color: var(--text-on-dark-muted);
  line-height: 1.55;
  margin: 0;
  letter-spacing: var(--tracking-body-sm);
}

/* ── 平板端 ── */
@media (max-width: 968px) {
  .skills-section { padding: 60px 20px; }
  .skills-stack { gap: 40px; }
}

/* ── 移动端 ── */
@media (max-width: 768px) {
  .skills-section { padding: 48px 16px; }
  .section-title { margin-bottom: 40px; }
  .skills-stack { gap: 36px; }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .skill-card { padding: 16px; }

  .skill-top {
    flex-wrap: wrap;
    gap: 8px;
  }
}

/* ── 小屏 ── */
@media (max-width: 480px) {
  .skills-section { padding: 40px 12px; }
  .skill-card { padding: 14px; }
}
</style>
