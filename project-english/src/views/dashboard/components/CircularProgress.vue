<template>
  <div 
    class="relative group cursor-pointer"
    style="display: inline-block; background: transparent !important;"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <!-- Animated Background Glow -->
    <div 
      class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 blur-xl animate-pulse"
      :style="{ 
        background: `radial-gradient(circle, ${progressColor}20, transparent 70%)`,
        transform: 'scale(1.2)'
      }"
    ></div>
    
    <!-- SVG Circle with Gradients -->
    <svg 
      :width="size" 
      :height="size" 
      class="transform -rotate-90 transition-all duration-500 group-hover:scale-105 relative z-10"
      style="display: block; background: transparent !important; filter: drop-shadow(0 4px 20px rgba(0,0,0,0.15));"
    >
      <!-- Gradient Definitions -->
      <defs>
        <linearGradient :id="`progressGradient-${gradientId}`" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" :style="{ stopColor: progressColor, stopOpacity: 1 }" />
          <stop offset="50%" :style="{ stopColor: progressColorSecondary, stopOpacity: 0.9 }" />
          <stop offset="100%" :style="{ stopColor: progressColorTertiary, stopOpacity: 1 }" />
        </linearGradient>
        <linearGradient :id="`backgroundGradient-${gradientId}`" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" :style="{ stopColor: backgroundColor, stopOpacity: 0.1 }" />
          <stop offset="100%" :style="{ stopColor: backgroundColor, stopOpacity: 0.3 }" />
        </linearGradient>
        <!-- Glowing Effect -->
        <filter :id="`glow-${gradientId}`">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background Circle with Gradient -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke="`url(#backgroundGradient-${gradientId})`"
        :stroke-width="strokeWidth"
        fill="transparent"
        class="opacity-40"
      />
      
      <!-- Progress Circle with Animated Gradient -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke="`url(#progressGradient-${gradientId})`"
        :stroke-width="strokeWidth + 1"
        fill="transparent"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        :stroke-linecap="strokeLinecap"
        class="transition-all duration-1500 ease-out transform-gpu"
        :style="{ 
          filter: glowEffect ? `url(#glow-${gradientId}) drop-shadow(0 0 15px ${progressColor}40)` : 'none',
          animation: 'progressShine 3s infinite linear'
        }"
      />
      
      <!-- Shimmer Effect -->
      <circle
        v-if="showShimmer"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        stroke="rgba(255, 255, 255, 0.6)"
        :stroke-width="1"
        fill="transparent"
        stroke-dasharray="20 80"
        :stroke-dashoffset="shimmerOffset"
        stroke-linecap="round"
        class="animate-spin"
        style="animation-duration: 4s;"
        opacity="0.8"
      />
    </svg>
    
    <!-- Center Content with Enhanced Typography -->
    <div 
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
      :style="{ 
        width: size + 'px', 
        height: size + 'px' 
      }"
    >
      <div class="flex flex-col items-center justify-center text-center space-y-1 transform transition-all duration-300 group-hover:scale-105">
        <!-- Icon with Glow -->
        <div v-if="showIcon" class="flex-shrink-0 mb-1 relative">
          <div 
            :class="['transition-all duration-300 group-hover:text-white', iconSize]"
            :style="{ 
              color: progressColor,
              filter: `drop-shadow(0 0 8px ${progressColor}40)`,
              textShadow: `0 0 10px ${progressColor}60`
            }"
          >
            <slot name="icon" />
          </div>
        </div>
        
        <!-- Value and Unit with Enhanced Typography -->
        <div class="flex flex-col items-center justify-center">
          <div 
            :class="['font-bold tracking-tight transition-all duration-300 group-hover:scale-110', valueClass]"
            :style="{ 
              color: 'white',
              textShadow: `0 0 15px ${progressColor}50, 0 2px 4px rgba(0,0,0,0.3)`,
              letterSpacing: '-0.02em'
            }"
          >
            {{ displayValue }}{{ unit }}
          </div>
          
          <!-- Label with Enhanced Styling -->
          <div 
            v-if="label" 
            class="text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:text-white mt-1"
            :style="{ 
              color: `${progressColor}dd`,
              textShadow: `0 0 8px ${progressColor}40`,
              letterSpacing: '0.05em'
            }"
          >
            {{ label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Particles Effect -->
    <div v-if="showShimmer" class="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
      <div 
        v-for="i in 3" 
        :key="i"
        class="absolute w-1 h-1 rounded-full animate-pulse"
        :style="{ 
          background: `radial-gradient(circle, ${progressColor}, transparent)`,
          top: Math.random() * 80 + 10 + '%',
          left: Math.random() * 80 + 10 + '%',
          animationDelay: i * 0.5 + 's',
          animationDuration: '2s'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
  max: number
  size?: number
  strokeWidth?: number
  progressColor?: string
  progressColorSecondary?: string
  progressColorTertiary?: string
  backgroundColor?: string
  label?: string
  unit?: string
  showIcon?: boolean
  iconClass?: string
  valueClass?: string
  glowEffect?: boolean
  showShimmer?: boolean
  strokeLinecap?: 'round' | 'square' | 'butt'
  animationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 120,
  strokeWidth: 8,
  progressColor: '#8b5cf6',
  progressColorSecondary: '#a855f7',
  progressColorTertiary: '#c084fc',
  backgroundColor: '#e5e7eb',
  showIcon: false,
  iconClass: '',
  valueClass: 'text-2xl',
  glowEffect: true,
  showShimmer: true,
  strokeLinecap: 'round',
  animationDelay: 0
})

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const percentage = computed(() => Math.min((props.value / props.max) * 100, 100))
const strokeDashoffset = computed(() => 
  circumference.value - (percentage.value / 100) * circumference.value
)

const displayValue = computed(() => {
  if (props.unit === '%') {
    return Math.round(percentage.value)
  }
  return props.value
})

const iconSize = computed(() => {
  if (props.size >= 140) return 'w-6 h-6'
  if (props.size >= 100) return 'w-5 h-5'
  return 'w-4 h-4'
})

// Generate unique ID for gradients
const gradientId = computed(() => Math.random().toString(36).substr(2, 9))

// Shimmer animation offset
const shimmerOffset = computed(() => circumference.value)
</script>

<script lang="ts">
export default {
  name: 'CircularProgress'
}
</script>

<style scoped>
/* Add animation delay support */
.transition-all {
  transition-delay: v-bind('animationDelay + "ms"');
}

/* Progressive shimmer animation */
@keyframes progressShine {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Floating glow animation */
@keyframes floatingGlow {
  0%, 100% { 
    transform: scale(1.1);
    opacity: 0.4;
  }
  50% { 
    transform: scale(1.3);
    opacity: 0.7;
  }
}

/* Enhanced hover animations */
.group:hover .animate-pulse {
  animation: floatingGlow 2s ease-in-out infinite;
}

/* Gradient animation for progress stroke */
@keyframes gradientShift {
  0% { stroke-dasharray: 0 100; }
  50% { stroke-dasharray: 50 50; }
  100% { stroke-dasharray: 100 0; }
}

/* 3D depth shadow */
.group {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover {
  transform: translateY(-2px);
  filter: drop-shadow(0 8px 25px rgba(0, 0, 0, 0.2));
}

/* Responsive glow intensity */
@media (prefers-reduced-motion: no-preference) {
  .transition-all {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

/* Ensure no background styling */
* {
  background: transparent !important;
}
</style>
