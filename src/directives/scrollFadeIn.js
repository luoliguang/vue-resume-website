import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// GSAP ScrollTrigger 版：二段式“先标题，后内容”滚动归位
export const scrollFadeIn = {
  mounted(el, binding) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const options = binding.value || {}

    const isMobile = window.innerWidth <= 768
    // 移动端用更小的位移，避免元素入场时已超出视口
    const distance = isMobile ? Math.min((options.distance ?? 60) * 0.35, 22) : (options.distance ?? 60)
    const scrub = options.scrub ?? 0.9
    const start = isMobile ? 'top 102%' : (options.start ?? 'top 92%')
    const end   = isMobile ? 'top 50%'  : (options.end   ?? 'top 62%')
    const titleSelector = options.titleSelector ?? 'h1, h2, h3, .section-title, .title'
    const contentSelector = options.contentSelector ?? 'p, li, .card, .item, .content, .section-content, .project-card'

    if (prefersReducedMotion) {
      gsap.set(el, { y: 0, clearProps: 'transform' })
      return
    }

    const titles = Array.from(el.querySelectorAll(titleSelector)).slice(0, 2)
    const contents = Array.from(el.querySelectorAll(contentSelector)).slice(0, 6)

    gsap.set(el, { y: distance, willChange: 'transform' })
    if (titles.length) gsap.set(titles, { y: distance * 0.42, willChange: 'transform' })
    if (contents.length) gsap.set(contents, { y: distance * 0.72, willChange: 'transform' })

    const wrapperTween = gsap.to(el, {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        invalidateOnRefresh: true
      }
    })

    const titleTween = titles.length
      ? gsap.to(titles, {
          y: 0,
          ease: 'none',
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            start,
            end: 'top 70%',
            scrub,
            invalidateOnRefresh: true
          }
        })
      : null

    const contentTween = contents.length
      ? gsap.to(contents, {
          y: 0,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end,
            scrub: scrub + 0.15,
            invalidateOnRefresh: true
          }
        })
      : null

    el._gsapTweens = [wrapperTween, titleTween, contentTween].filter(Boolean)
  },

  unmounted(el) {
    el._gsapTweens?.forEach((tween) => {
      tween?.scrollTrigger?.kill()
      tween?.kill()
    })
    delete el._gsapTweens
  }
}
