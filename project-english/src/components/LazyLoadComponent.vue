<template>
  <div
    ref="elementRef"
    :class="[
      'lazy-wrapper',
      animationType,
      { 'is-visible': isVisible, 'is-hidden': !isVisible }
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue'

interface Props {
  animationType?: 'fade-up' | 'slide-left' | 'slide-right' | 'scale' | 'blur'
  threshold?: number
  rootMargin?: string
}

const props = withDefaults(defineProps<Props>(), {
  animationType: 'fade-up',
  threshold: 0.99, // Yêu cầu hiển thị gần như hoàn toàn (99%) mới kích hoạt
  rootMargin: '0px'
})

const elementRef = ref<HTMLElement>()
const isVisible = ref(false)
let observer: IntersectionObserver | null = null
let isFullyVisible = false // Biến theo dõi trạng thái hiển thị hoàn toàn

onMounted(() => {
  if (elementRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const showThreshold = props.threshold;
          const hideThreshold = Math.max(0, props.threshold - 0.1); // Ẩn khi thấp hơn 10%
          
          if (ratio >= showThreshold) {
            if (!isFullyVisible) {
              isFullyVisible = true;
              isVisible.value = true;
            }
          } else if (ratio <= hideThreshold) {
            // Chỉ ẩn khi tỷ lệ hiển thị thấp hơn ngưỡng ẩn
            if (isFullyVisible) {
              isFullyVisible = false;
              isVisible.value = false;
            }
          }
          // Vùng giữa showThreshold và hideThreshold: giữ nguyên trạng thái
        })
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 0.9, 0.99, 1.0], // Theo dõi nhiều ngưỡng để phát hiện chính xác
        rootMargin: props.rootMargin
      }
    )

    observer.observe(elementRef.value)
  }
})

onUnmounted(() => {
  if (observer && elementRef.value) {
    observer.unobserve(elementRef.value)
    observer.disconnect()
  }
})
</script>

export default {
  name: 'LazyLoadComponent'
}

<style scoped>
.lazy-wrapper {
  transition: all 0.4s ease-out;
  transform-origin: center;
  transform-style: preserve-3d;
  will-change: opacity, transform;
  backface-visibility: hidden;
}

/* Default hidden state - COMPLETELY HIDDEN */
.lazy-wrapper.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.2s ease-out; /* Ẩn nhanh hơn hiện */
}

.lazy-wrapper.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

/* Fade up animation - LESS DRAMATIC */
.fade-up.is-hidden {
  transform: translateY(30px) scale(0.98);
  opacity: 0;
}

.fade-up.is-visible {
  transform: translateY(0) scale(1);
  opacity: 1;
  animation: smoothFadeUp 0.4s ease-out;
}

/* Slide left animation - LESS DRAMATIC */
.slide-left.is-hidden {
  transform: translateX(-30px) scale(0.98);
  opacity: 0;
}

.slide-left.is-visible {
  transform: translateX(0) scale(1);
  opacity: 1;
  animation: smoothSlideLeft 0.4s ease-out;
}

/* Slide right animation - LESS DRAMATIC */
.slide-right.is-hidden {
  transform: translateX(30px) scale(0.98);
  opacity: 0;
}

.slide-right.is-visible {
  transform: translateX(0) scale(1);
  opacity: 1;
  animation: smoothSlideRight 0.4s ease-out;
}

/* Scale animation - LESS DRAMATIC */
.scale.is-hidden {
  transform: scale(0.9);
  opacity: 0;
}

.scale.is-visible {
  transform: scale(1);
  opacity: 1;
  animation: smoothScaleIn 0.4s ease-out;
}

/* Blur animation - LESS DRAMATIC */
.blur.is-hidden {
  filter: blur(5px);
  transform: translateY(20px) scale(0.98);
  opacity: 0;
}

.blur.is-visible {
  filter: blur(0);
  transform: translateY(0) scale(1);
  opacity: 1;
  animation: smoothBlurIn 0.4s ease-out;
}

/* Smoother keyframe animations */
@keyframes smoothFadeUp {
  0% {
    transform: translateY(30px) scale(0.98);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes smoothSlideLeft {
  0% {
    transform: translateX(-30px) scale(0.98);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes smoothSlideRight {
  0% {
    transform: translateX(30px) scale(0.98);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes smoothScaleIn {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes smoothBlurIn {
  0% {
    filter: blur(5px);
    transform: translateY(20px) scale(0.98);
    opacity: 0;
  }
  100% {
    filter: blur(0);
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
