// 滚动触发淡入动画指令
export const scrollFadeIn = {
  mounted(el, binding) {
    // 设置初始状态
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
    
    // 创建 Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 元素进入视口时触发动画
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            
            // 动画完成后停止观察（可选）
            if (binding.value?.once !== false) {
              observer.unobserve(el)
            }
          } else if (binding.value?.once === false) {
            // 如果设置为重复触发，离开视口时重置
            el.style.opacity = '0'
            el.style.transform = 'translateY(30px)'
          }
        })
      },
      {
        threshold: 0.1, // 当元素10%可见时触发
        rootMargin: '0px 0px -50px 0px' // 提前50px触发
      }
    )
    
    // 开始观察元素
    observer.observe(el)
    
    // 将observer保存到元素上，以便在unmounted时清理
    el._scrollObserver = observer
  },
  
  unmounted(el) {
    // 清理observer
    if (el._scrollObserver) {
      el._scrollObserver.disconnect()
      delete el._scrollObserver
    }
  }
}
