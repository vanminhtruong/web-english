<template>
  <div class="relative bg-gray-100 dark:bg-[#0a0a0a] rounded-md p-2 overflow-hidden">
    <!-- Mini grid -->
    <div class="grid grid-cols-15 gap-px" style="grid-template-columns: repeat(15, minmax(0, 1fr));">
      <div
        v-for="i in totalCells"
        :key="i"
        class="w-2 h-2 transition-colors duration-300"
        :class="baseCellClass(i - 1)"
      />
    </div>

    <!-- Animated snake segments -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Body (excluding head) -->
      <div
        v-for="(seg, idx) in renderBody"
        :key="`seg-${idx}`"
        class="w-2 h-2 rounded-sm bg-green-300 dark:bg-green-600"
        :style="segmentStyle(seg, idx)"
      />
      <!-- Head -->
      <div
        v-if="head"
        class="w-3 h-3 rounded-full bg-green-500 border border-green-300 animate-pulse"
        :style="headStyle(head)"
      >
        <div class="w-full h-full flex items-center justify-center">
          <div class="w-1 h-1 bg-white rounded-full" :style="directionDotStyle(currentDirection)" />
        </div>
      </div>
    </div>

    <!-- Food pulse -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="w-3 h-3 rounded-full animate-ping"
        :class="data.wasCorrect ? 'bg-emerald-400 dark:bg-emerald-500' : 'bg-red-400 dark:bg-red-500'"
        :style="foodStyle(scaledFood)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

type Vec = { x: number; y: number }

const props = defineProps<{ data: {
  position: Vec
  wasCorrect: boolean
  foodType: 'primary' | 'secondary'
  snakeLength: number
  gameScore: number
  wordsCompleted: number
  wrongEatenCount: number
  snakeBody: Vec[]
  direction: Vec
  // Optional recorded timeline frames for accurate replay
  timelineFrames?: Array<{ body: Vec[]; direction: Vec }>
} }>()

// Grid constants (scaled down from 30x20)
const gridW = 15
const gridH = 10
const cellSize = 8 // px
const gap = 1 // px
const padding = 8 // px (container p-2)

const totalCells = gridW * gridH

// Scale helpers (from original 30x20 grid to 15x10)
const scalePos = (p: Vec): Vec => ({ x: Math.floor(p.x / 2), y: Math.floor(p.y / 2) })

const scaledFood = computed(() => scalePos(props.data.position))

// Replay state
const state = reactive({
  head: scalePos(props.data.snakeBody[0] || { x: 0, y: 0 }),
  body: props.data.snakeBody.slice(1).map(scalePos) as Vec[],
  dir: { ...props.data.direction } as Vec,
})

// Derivatives for template
const head = computed(() => state.head)
const renderBody = computed(() => state.body)
const currentDirection = computed(() => state.dir)

// Base grid coloring (food cell highlight, otherwise subtle)
const baseCellClass = (index: number) => {
  const x = index % gridW
  const y = Math.floor(index / gridW)
  if (x === scaledFood.value.x && y === scaledFood.value.y) {
    return props.data.wasCorrect
      ? 'bg-emerald-300/70 dark:bg-emerald-700/60'
      : 'bg-red-300/70 dark:bg-red-700/60'
  }
  return 'bg-gray-200 dark:bg-dark-bg-soft hover:bg-gray-300 dark:hover:bg-dark-bg-soft'
}

// Position style helpers
const toPixel = (p: Vec) => ({
  left: `${padding + p.x * (cellSize + gap)}px`,
  top: `${padding + p.y * (cellSize + gap)}px`,
})

const headStyle = (p: Vec) => ({
  position: 'absolute',
  zIndex: 10,
  ...toPixel(p),
} as const)

const segmentStyle = (p: Vec, idx: number) => ({
  position: 'absolute',
  zIndex: 5,
  opacity: Math.max(0.35, 1 - idx * 0.1),
  transition: 'left 120ms linear, top 120ms linear, opacity 300ms ease',
  ...toPixel(p),
} as const)

const foodStyle = (p: Vec) => ({
  position: 'absolute',
  ...toPixel(p),
} as const)

const directionDotStyle = (d: Vec) => {
  let transform = 'translate(-50%, -50%)'
  if (d.x === 1) transform += ' translateX(25%)'
  else if (d.x === -1) transform += ' translateX(-25%)'
  else if (d.y === 1) transform += ' translateY(25%)'
  else if (d.y === -1) transform += ' translateY(-25%)'
  return { position: 'absolute', left: '50%', top: '50%', transform } as const
}

// Timeline-aware replay: prefer recorded frames; otherwise synthetic toward food
let rafId: number | null = null
let lastStep = 0
const stepInterval = 140 // ms
const maxSteps = 18

const inBounds = (p: Vec) => p.x >= 0 && p.y >= 0 && p.x < gridW && p.y < gridH

let frameIndex = 0

const nextStep = () => {
  const now = performance.now()
  if (now - lastStep < stepInterval) {
    rafId = requestAnimationFrame(nextStep)
    return
  }
  lastStep = now

  const hasTimeline = props.data.timelineFrames && props.data.timelineFrames.length > 0
  if (hasTimeline) {
    const frames = props.data.timelineFrames as Array<{ body: Vec[]; direction: Vec }>
    const f = frames[frameIndex % frames.length]
    const headSeg = f.body[0] || { x: 0, y: 0 }
    state.head = scalePos(headSeg)
    state.body = f.body.slice(1).map(scalePos)
    state.dir = { x: f.direction.x, y: f.direction.y }
    frameIndex = (frameIndex + 1) % frames.length
  } else {
    // Decide direction towards food from current head
    const target = scaledFood.value
    const dx = target.x - state.head.x
    const dy = target.y - state.head.y
    const step: Vec = { x: Math.sign(dx), y: Math.sign(dy) }
    // Prefer horizontal movement first for variety
    const move: Vec = Math.abs(dx) >= Math.abs(dy) ? { x: step.x, y: 0 } : { x: 0, y: step.y }

    // Shift body to follow
    const newBody = [ { ...state.head }, ...state.body.slice(0, Math.max(0, state.body.length - 0)) ]
    state.body = newBody.slice(0, props.data.snakeBody.length - 1)

    // Move head
    const newHead = { x: state.head.x + move.x, y: state.head.y + move.y }
    state.dir = move
    if (inBounds(newHead)) state.head = newHead

    // Looping conditions
    loopCounter.value++
    const reached = state.head.x === target.x && state.head.y === target.y
    if (reached || loopCounter.value >= maxSteps) {
      // Reset to original snapshot
      state.head = scalePos(props.data.snakeBody[0] || { x: 0, y: 0 })
      state.body = props.data.snakeBody.slice(1).map(scalePos)
      state.dir = { ...props.data.direction }
      loopCounter.value = 0
    }
  }

  rafId = requestAnimationFrame(nextStep)
}

const loopCounter = ref(0)

onMounted(() => {
  lastStep = performance.now()
  rafId = requestAnimationFrame(nextStep)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.grid-cols-15 { grid-template-columns: repeat(15, minmax(0, 1fr)); }
</style>

