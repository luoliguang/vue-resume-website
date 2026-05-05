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
  background: transparent;
}

.container {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.about-card {
  background: var(--color-space-gray);
  border-radius: var(--radius-cards);
  border: 1px solid #333336;
  overflow: hidden;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.about-text {
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-title {
  font-size: var(--text-heading);
  font-weight: 600;
  color: var(--color-cloud-white);
  margin-bottom: 24px;
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

.about-description {
  font-size: var(--text-body);
  line-height: 1.5;
  color: #c7c7cc;
  margin-bottom: 32px;
  letter-spacing: var(--tracking-body);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  background: #2a2a2d;
  color: #f5f5f7;
  padding: 8px 14px;
  border-radius: var(--radius-buttons);
  font-size: var(--text-body-sm);
  font-weight: 400;
  border: 1px solid #424245;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.skill-tag:hover {
  background: #333336;
  border-color: #55555a;
}

.about-image {
  background: #161617;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-left: 1px solid #333336;
}

.image-container {
  width: 300px;
  height: 300px;
  border-radius: var(--radius-cards);
  overflow: hidden;
  border: 1px solid #424245;
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
  background: var(--color-ghost-white);
  color: var(--color-cool-gray);
}

@media (max-width: 968px) {
  .about-text {
    padding: 48px 36px;
  }

  .about-title {
    font-size: 36px;
  }

  .image-container {
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 56px 0;
  }

  .about-content {
    grid-template-columns: 1fr;
  }

  .about-text {
    padding: 36px 28px;
    text-align: center;
  }

  .about-title {
    font-size: 32px;
    margin-bottom: 16px;
  }

  .about-description {
    margin-bottom: 24px;
  }

  .about-image {
    padding: 28px;
  }

  .image-container {
    width: 200px;
    height: 200px;
  }

  .skill-tags {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 44px 0;
  }

  .about-text {
    padding: 28px 20px;
  }

  .about-title {
    font-size: 28px;
  }

  .about-description {
    font-size: 16px;
  }
}
</style>
