<template>
  <section id="experience" class="experience-section" ref="projectsRoot">
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
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { workExperiences, achievements } from '../../data/experience.js'
import { t, isChinese } from '../../composables/useI18n.js'

gsap.registerPlugin(ScrollTrigger)

const selectedExperienceId = ref(1)
const projectsRoot = ref(null)

const selectExperience = (id) => {
  selectedExperienceId.value = id
  // 更新所有经历的状态
  workExperiences.forEach(exp => {
    exp.isActive = exp.id === id
  })
}

onMounted(() => {
  const root = projectsRoot.value
  if (!root) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  if (prefersReducedMotion || isMobile) return

  const about = document.getElementById('about')
  const rootRect = root.getBoundingClientRect()
  const aboutRect = about?.getBoundingClientRect()
  const fromTop = aboutRect ? (aboutRect.bottom - rootRect.top) * 0.28 : -140

  const title = root.querySelector('.section-title')
  const timeline = root.querySelector('.timeline-sidebar')
  const details = root.querySelector('.experience-details')
  const achievementsTitle = root.querySelector('.achievements-title')
  const achievementCards = root.querySelectorAll('.achievement-card')

  gsap.set(title, { x: -220, y: fromTop })
  gsap.set(timeline, { x: -180, y: fromTop * 0.85 })
  gsap.set(details, { x: 220, y: fromTop })
  gsap.set(achievementsTitle, { x: -120, y: fromTop * 0.55 })
  gsap.set(achievementCards, { x: 140, y: fromTop * 0.45 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: 'top 96%',
      end: 'top 42%',
      scrub: 1.05,
      invalidateOnRefresh: true
    }
  })

  tl.to(title, { x: 0, y: 0, ease: 'none' }, 0)
    .to(timeline, { x: 0, y: 0, ease: 'none' }, 0.1)
    .to(details, { x: 0, y: 0, ease: 'none' }, 0.12)
    .to(achievementsTitle, { x: 0, y: 0, ease: 'none' }, 0.2)
    .to(achievementCards, { x: 0, y: 0, stagger: 0.04, ease: 'none' }, 0.24)

  root._projectsTimeline = tl
})

onUnmounted(() => {
  projectsRoot.value?._projectsTimeline?.scrollTrigger?.kill()
  projectsRoot.value?._projectsTimeline?.kill()
})
</script>

<style scoped>
.experience-section {
  padding: 80px 20px;
  background: transparent;
}

.container {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.section-title {
  text-align: left;
  font-size: var(--text-heading);
  color: var(--text-on-dark-strong);
  margin-bottom: 44px;
  font-weight: 600;
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

.experience-content {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  margin-bottom: 72px;
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
  background: var(--surface-border-dark-strong);
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 15px 0;
}

.timeline-item.active .timeline-dot {
  background: var(--color-interactive-blue);
  border-color: var(--color-interactive-blue);
  transform: scale(1.2);
}

.timeline-item.active .timeline-period {
  color: var(--text-on-dark-strong);
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
  background: var(--surface-card-dark);
  border: 2px solid var(--surface-border-dark-strong);
  transition: all 0.3s ease;
  z-index: 1;
}

.timeline-period {
  margin-left: 30px;
  font-size: var(--text-body-sm);
  color: var(--text-on-dark-subtle);
  transition: all 0.3s ease;
}

/* 右侧详细展示 */
.experience-details {
  padding-left: 20px;
}

.experience-card {
  background: var(--surface-card-dark);
  border-radius: var(--radius-cards);
  padding: 30px;
  border: 1px solid var(--surface-border-dark-strong);
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
  background: var(--surface-card-darker);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-interactive-blue);
  flex-shrink: 0;
}

.experience-meta {
  flex: 1;
}

.date-range {
  color: var(--color-interactive-blue);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.job-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-on-dark-strong);
  margin-bottom: 5px;
}

.company-name {
  font-size: 1rem;
  color: var(--text-on-dark-muted);
  font-weight: 500;
}

.experience-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-on-dark);
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
  color: var(--text-on-dark-muted);
}

.responsibilities li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--color-interactive-blue);
  font-weight: bold;
}

/* 成就亮点 */
.achievements-section {
  margin-top: 60px;
}

.achievements-title {
  font-size: 1.8rem;
  color: var(--text-on-dark-strong);
  margin-bottom: 30px;
  font-weight: 600;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.achievement-card {
  background: var(--surface-card-dark);
  border-radius: var(--radius-cards);
  padding: 25px;
  border: 1px solid var(--surface-border-dark-strong);
  transition: all 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.achievement-icon {
  width: 40px;
  height: 40px;
  background: var(--surface-card-darker);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-interactive-blue);
  margin-bottom: 15px;
}

.achievement-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-on-dark-strong);
  margin-bottom: 10px;
}

.achievement-description {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-on-dark-muted);
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
