import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'

export const useScrollStore = defineStore('scroll', () => {
  // State
  const scrollY = ref(0)
  const showBackToTop = ref(false)
  const isScrolling = ref(false)

  // Threshold để hiển thị nút back to top (pixels)
  const SCROLL_THRESHOLD = 300

  // Throttle scroll events để optimize performance
  let scrollTimer: number | null = null

  // Actions
  const handleScroll = () => {
    scrollY.value = window.scrollY
    showBackToTop.value = scrollY.value > SCROLL_THRESHOLD
    
    // Set scrolling state
    isScrolling.value = true
    
    // Clear existing timer
    if (scrollTimer) {
      clearTimeout(scrollTimer)
    }
    
    // Set timer to detect when scrolling stops
    scrollTimer = setTimeout(() => {
      isScrolling.value = false
    }, 150)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const initScrollListener = () => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial check
    handleScroll()
  }

  const removeScrollListener = () => {
    window.removeEventListener('scroll', handleScroll)
    if (scrollTimer) {
      clearTimeout(scrollTimer)
      scrollTimer = null
    }
  }

  // Getters
  const scrollPercentage = () => {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    return documentHeight > 0 ? Math.min((scrollY.value / documentHeight) * 100, 100) : 0
  }

  const isNearTop = () => scrollY.value < 100
  const isNearBottom = () => {
    const documentHeight = document.documentElement.scrollHeight
    const viewportHeight = window.innerHeight
    return scrollY.value + viewportHeight >= documentHeight - 100
  }

  return {
    // State
    scrollY,
    showBackToTop,
    isScrolling,
    
    // Actions
    scrollToTop,
    initScrollListener,
    removeScrollListener,
    
    // Getters
    scrollPercentage,
    isNearTop,
    isNearBottom
  }
})
