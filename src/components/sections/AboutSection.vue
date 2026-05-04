<template>
  <section id="about" class="section" ref="aboutRoot">
    <div class="container">
      <div class="about-card">
        <div class="about-content">
          <div class="about-text">
            <h2 class="about-title">{{ aboutData.title[isChinese ? 'zh' : 'en'] }}</h2>
            <p class="about-description">{{ aboutData.description[isChinese ? 'zh' : 'en'] }}</p>
            <div class="skill-tags">
              <span 
                v-for="(tag, index) in aboutData.skillTags" 
                :key="index" 
                class="skill-tag"
              >
                {{ tag[isChinese ? 'zh' : 'en'] }}
              </span>
            </div>
          </div>
          <div class="about-image">
            <div class="image-container">
              <img 
                :src="aboutData.avatar.src" 
                :alt="aboutData.avatar.alt[isChinese ? 'zh' : 'en']" 
                class="profile-img"
                @error="handleImageError"
              >
              <div v-if="imageError" class="image-placeholder">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>{{ isChinese ? '头像' : 'Avatar' }}</span>
              </div>
            </div>
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
import { aboutData } from '../../data/about.js'
import { isChinese } from '../../composables/useI18n.js'

gsap.registerPlugin(ScrollTrigger)

const imageError = ref(false)
const aboutRoot = ref(null)

const handleImageError = () => {
  imageError.value = true
}

onMounted(() => {
  const root = aboutRoot.value
  if (!root) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  if (prefersReducedMotion || isMobile) return

  const hero = document.getElementById('home')
  const left = root.querySelector('.about-text')
  const right = root.querySelector('.about-image')
  const title = root.querySelector('.about-title')
  const desc = root.querySelector('.about-description')
  const tags = root.querySelectorAll('.skill-tag')
  const image = root.querySelector('.image-container')

  const rootRect = root.getBoundingClientRect()
  const heroRect = hero?.getBoundingClientRect()
  const fromTop = heroRect ? (heroRect.bottom - rootRect.top) * 0.35 : -160

  gsap.set([left, title, desc], { x: -180, y: fromTop })
  gsap.set([right, image], { x: 180, y: fromTop })
  gsap.set(tags, { x: -120, y: fromTop * 0.8 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: 'top 95%',
      end: 'top 45%',
      scrub: 1.1,
      invalidateOnRefresh: true
    }
  })

  tl.to(left, { x: 0, y: 0, ease: 'none' }, 0)
    .to(right, { x: 0, y: 0, ease: 'none' }, 0)
    .to(title, { x: 0, y: 0, ease: 'none' }, 0.08)
    .to(desc, { x: 0, y: 0, ease: 'none' }, 0.14)
    .to(tags, { x: 0, y: 0, stagger: 0.03, ease: 'none' }, 0.2)
    .to(image, { x: 0, y: 0, ease: 'none' }, 0.06)

  root._aboutTimeline = tl
})

onUnmounted(() => {
  aboutRoot.value?._aboutTimeline?.scrollTrigger?.kill()
  aboutRoot.value?._aboutTimeline?.kill()
})
</script>

<style scoped>
.section {
  padding: 80px 0;
  background: linear-gradient(180deg, #f5f7fa 0%, #f0f2f5 100%);
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

.about-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 500px;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
}

.about-text {
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 30px;
  line-height: 1.2;
}

.about-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 40px;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  background: #f8f9fa;
  color: #555;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.about-image {
  background: #baa3c2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-container {
  width: 300px;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #6c757d;
}

.image-placeholder svg {
  margin-bottom: 8px;
}

.image-placeholder span {
  font-size: 0.9rem;
}

/* 平板端 */
@media (max-width: 968px) {
  .section {
    padding: 60px 0;
  }
  
  .about-text {
    padding: 50px 40px;
  }
  
  .about-title {
    font-size: 2.25rem;
    margin-bottom: 25px;
  }
  
  .about-description {
    font-size: 1.05rem;
    margin-bottom: 35px;
  }
  
  .image-container {
    width: 250px;
    height: 250px;
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .section {
    padding: 40px 0;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  .about-text {
    padding: 40px 30px;
    text-align: center;
  }
  
  .about-title {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .about-description {
    font-size: 1rem;
    margin-bottom: 30px;
  }
  
  .about-image {
    padding: 40px 30px;
  }
  
  .image-container {
    width: 200px;
    height: 200px;
  }
  
  .skill-tags {
    justify-content: center;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .section {
    padding: 30px 0;
  }
  
  .about-text {
    padding: 30px 20px;
  }
  
  .about-title {
    font-size: 1.75rem;
    margin-bottom: 16px;
  }
  
  .about-description {
    font-size: 0.95rem;
    margin-bottom: 25px;
  }
  
  .about-image {
    padding: 30px 20px;
  }
  
  .image-container {
    width: 180px;
    height: 180px;
  }
  
  .skill-tag {
    font-size: 0.85rem;
    padding: 6px 12px;
  }
}
</style>
