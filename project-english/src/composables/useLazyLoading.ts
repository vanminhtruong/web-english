import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'

export interface LazyLoadingOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useLazyLoading(options: LazyLoadingOptions = {}) {
  const {
    threshold = 0.1, // Show when 10% visible
    rootMargin = '50px', // Start loading 50px before entering viewport
    triggerOnce = false // Set to true if you want to show once and never hide
  } = options

  const isVisible = ref(false)
  const elementRef: Ref<HTMLElement | undefined> = ref()
  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Intersection Observer:', {
            isIntersecting: entry.isIntersecting,
            target: entry.target.className,
            threshold,
            rootMargin
          })
          if (entry.isIntersecting) {
            isVisible.value = true
            if (triggerOnce && observer) {
              observer.unobserve(entry.target)
            }
          } else {
            if (!triggerOnce) {
              isVisible.value = false
            }
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(elementRef.value)
    console.log('Observer initialized for element:', elementRef.value.className)
  }

  // Watch for element ref changes and initialize observer
  watch(elementRef, (newElement) => {
    if (newElement) {
      initObserver()
    }
  }, { immediate: true })

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
      observer.disconnect()
    }
  })

  // Return a ref callback function for template usage
  const setRef = (el: HTMLElement | null) => {
    elementRef.value = el || undefined
  }

  return {
    isVisible,
    elementRef,
    setRef
  }
}

// Specific composable for vocabulary components with fade animation
export function useVocabularyLazyLoading(options: LazyLoadingOptions = {}) {
  const { isVisible, elementRef, setRef } = useLazyLoading({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: false,
    ...options
  })

  return {
    isVisible,
    elementRef,
    setRef
  }
}
