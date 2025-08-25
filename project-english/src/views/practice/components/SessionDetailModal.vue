<template>
  <div>
    <Transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center p-1 xs:p-2 sm:p-3 md:p-4 z-[60] backdrop-blur-sm">
        <Transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0" leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-4">
          <div class="w-4/5 max-w-md sm:w-4/5 sm:max-w-lg md:w-4/5 md:max-w-3xl lg:w-full lg:max-w-5xl max-h-[90vh] sm:max-h-[88vh] md:max-h-[84vh] lg:max-h-[82vh]" @click.stop>
            <div class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-lg sm:rounded-xl border border-gray-200 dark:border-dark-bg-mute flex flex-col max-h-[90vh] sm:max-h-[88vh] md:max-h-[84vh] lg:max-h-[82vh]">
              <!-- Header -->
              <div class="px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4 border-b border-gray-200 dark:border-dark-bg-mute flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-t-lg sm:rounded-t-xl">
                <div class="flex items-center justify-between">
                  <h3 class="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                    <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    <span class="truncate">{{ t('flashcard.history.details.title', 'Session Details') }}</span>
                  </h3>
                  <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-white/80 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-soft flex-shrink-0" :aria-label="t('common.close', 'Close')">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4 flex-1 overflow-y-auto min-h-0">
                <div v-if="!details" class="text-center py-10">
                  <div class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.details.noData', 'No details available for this session') }}</div>
                </div>

                <div v-else class="space-y-3 sm:space-y-4">
                  <!-- Summary -->
                  <SessionDetailSummary :details="details" />

                  <!-- Pagination Controls -->
                  <SessionDetailPagination
                    v-if="totalPages > 1"
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    :start-index="startIndex"
                    :end-index="endIndex"
                    :total-entries="details.entries.length"
                    @update:current-page="currentPage = $event"
                  />

                  <!-- Entries list -->
                  <div class="divide-y divide-gray-200 dark:divide-dark-bg-mute rounded-md sm:rounded-lg overflow-hidden border border-gray-200 dark:border-dark-bg-mute">
                    <div v-for="(e, idx) in paginatedEntries" :key="idx" class="p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-custom">
                      <div class="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3 max-md:block max-lg:block">
                        <div class="min-w-0 flex-1 max-xs:border max-xs:w-full max-sm:w-full">
                          <div class="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white break-words">{{ e.word }}</span>
                            <span class="text-xs text-gray-500 dark:text-white/70 break-words">— {{ e.meaningShort }}</span>
                          </div>
                          <div class="mt-1 text-xs sm:text-sm">
                            <span class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.details.yourAnswer', 'Your answer') }}:</span>
                            <span class="ml-1 break-words" :class="e.isCorrect === true ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">{{ e.userAnswer || t('flashcard.history.details.noAnswer', 'No answer') }}</span>
                          </div>
                          <div class="text-xs sm:text-sm text-gray-500 dark:text-white/70 mb-[10px] mb-[10px]">
                            <span>{{ t('flashcard.history.details.correctAnswer', 'Correct answer') }}:</span>
                            <span class="ml-1 text-gray-900 dark:text-white break-words">{{ e.correctAnswer }}</span>
                          </div>
                          <!-- Pictionary-specific details -->
                          <PictionaryDetail
                            v-if="e.mode === 'pictionary'"
                            :entry="e"
                            @open-zoom="openZoom"
                          />

                          <!-- Flip Tile-specific details -->
                          <FlipTileDetail
                            v-if="e.mode === 'flip-tile' && e.extra?.flipTile"
                            :entry="e"
                          />

                          <!-- Flashcard/Scramble Words Mode-specific details -->
                          <FlashcardDetail
                            v-if="e.mode === 'flashcard' || e.mode === 'scramble-words'"
                            :entry="e"
                            :card-key="`${idx}`"
                            :flashcard-flip-states="flashcardFlipStates"
                            @toggle-flip="toggleFlashcardFlip"
                          />

                          <!-- Quiz Mode-specific details -->
                          <QuizDetail
                            v-if="e.mode === 'quiz' && e.extra?.quiz"
                            :entry="e"
                          />

                          <!-- Typing Mode-specific details -->
                          <TypingDetail
                            v-if="e.mode === 'typing' && e.extra?.typing"
                            :entry="e"
                          />

                          <!-- Listening Mode-specific details -->
                          <ListeningDetail
                            v-if="e.mode === 'listening' && e.extra?.listening"
                            :entry="e"
                          />

                          <!-- Image Mode-specific details -->
                          <ImageDetail
                            v-if="e.mode === 'image' && e.extra?.image"
                            :entry="e"
                            @open-zoom="openZoom"
                          />

                          <!-- Pronunciation Mode-specific details -->
                          <PronunciationDetail
                            v-if="e.mode === 'pronunciation' && e.extra?.pronunciation"
                            :entry="e"
                          />
                          <!-- Snake Game-specific details -->
                          <SnakeGameDetail
                            v-if="e.mode === 'snake-game' && e.extra?.snakeGame"
                            :entry="e"
                          />
                          <div v-if="e.notes" class="text-xs text-gray-500 dark:text-white/70 mt-1">{{ e.notes }}</div>
                        </div>
                        <div class="flex items-center gap-2 mt-[15px]">
                            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                                  :class="e.isCorrect === true ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'">
                            <svg v-if="e.isCorrect === true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                            <span>{{ e.isCorrect === true ? t('flashcard.history.correct', 'Correct') : t('flashcard.history.incorrect', 'Incorrect') }}</span>
                          </span>
                          <span class="text-xs text-gray-500 dark:text-white/70">{{ new Date(e.timestamp).toLocaleString() }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <!-- Zoom Modal Overlay (pictionary) -->
        <Transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <div v-if="zoomOpen" class="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <Transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0" leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-4">
              <div class="w-full max-w-4xl max-h-[86vh]" @click.stop>
                <div class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-dark-bg-mute flex flex-col max-h-[86vh]">
                  <div class="px-6 py-4 border-b border-gray-200 dark:border-dark-bg-mute flex-shrink-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-t-xl">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                        <span>{{ t('flashcard.pictionary.preview', 'Pictionary Preview') }}</span>
                      </h3>
                      <button @click="closeZoom" class="text-gray-400 hover:text-gray-600 dark:hover:text-white/80 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-soft" :aria-label="t('common.close', 'Close')">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="p-4 md:p-6 overflow-y-auto min-h-0">
                    <div class="flex flex-col md:flex-row gap-6 items-start">
                      <!-- Large Image -->
                      <div v-if="zoomImage" class="flex-shrink-0">
                        <img :src="zoomImage" :alt="t('flashcard.pictionary.imageAlt', 'Pictionary image')" class="w-[320px] h-[240px] md:w-[420px] md:h-[300px] object-contain rounded-lg border border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-dark-bg-soft" />
                      </div>
                      <!-- Large Slots -->
                      <div class="flex-1">
                        <div class="flex flex-wrap gap-2 items-center">
                          <template v-for="(slot, sIdx) in zoomSlots">
                            <div v-if="slot.separator" :key="`sep-${sIdx}`" class="px-1 text-xl text-gray-700 dark:text-white/80 select-none">
                              {{ slot.char }}
                            </div>
                            <div v-else :key="`box-${sIdx}`" class="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center rounded-lg border text-2xl font-semibold bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute" :class="slot.fixed ? 'opacity-90' : ''">
                              <span class="uppercase tracking-wider">{{ slot.char || '\u00A0' }}</span>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, defineAsyncComponent, computed, watch, onUnmounted } from 'vue'
import type { SessionDetails } from '../composables/usePracticeSessionDetails'
import { getTopicName } from '../../../utils/topicUtils'

// Async component imports for child components
const SessionDetailSummary = defineAsyncComponent(() => import('./component-child/SessionDetailModal/SessionDetailSummary.vue'))
const SessionDetailPagination = defineAsyncComponent(() => import('./component-child/SessionDetailModal/SessionDetailPagination.vue'))
const PictionaryDetail = defineAsyncComponent(() => import('./component-child/SessionDetailModal/PictionaryDetail.vue'))
const FlipTileDetail = defineAsyncComponent(() => import('./component-child/SessionDetailModal/FlipTileDetail.vue'))
const FlashcardDetail = defineAsyncComponent(() => import('./component-child/SessionDetailModal/FlashcardDetail.vue'))
const QuizDetail = defineAsyncComponent(() => import('./component-child/SessionDetailModal/QuizDetail.vue'))
const TypingDetail = defineAsyncComponent(() => import('./component-child/SessionDetailModal/TypingDetail.vue'))
const ListeningDetail = defineAsyncComponent(() => import('./component-child/SessionDetailModal/ListeningDetail.vue'))
const ImageDetail = defineAsyncComponent(() => import('./component-child/SessionDetailModal/ImageDetail.vue'))
const PronunciationDetail = defineAsyncComponent(() => import('./component-child/SessionDetailModal/PronunciationDetail.vue'))
const SnakeGameDetail = defineAsyncComponent(() => import('./component-child/SessionDetailModal/SnakeGameDetail.vue'))
const SnakeReplay = defineAsyncComponent(() => import('./SnakeReplay.vue'))

const props = defineProps<{
  show: boolean
  details: SessionDetails | null
}>()

const emit = defineEmits(['close'])

const { t } = useI18n()

// Body scroll lock functions
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

// Watch for modal show/hide to control body scroll
watch(() => props.show, (newShow) => {
  if (newShow) {
    lockBodyScroll()
  } else {
    unlockBodyScroll()
  }
}, { immediate: true })

// Cleanup on unmount
onUnmounted(() => {
  unlockBodyScroll()
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 3

// Reset pagination when details change
watch(() => props.details, () => {
  currentPage.value = 1
})

// Computed properties for pagination
const totalPages = computed(() => {
  if (!props.details?.entries) return 0
  return Math.ceil(props.details.entries.length / itemsPerPage)
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)

const paginatedEntries = computed(() => {
  if (!props.details?.entries) return []
  return props.details.entries.slice(startIndex.value, endIndex.value)
})

// Zoom state for pictionary preview
type ZoomSlot = { char: string; fixed: boolean; separator?: boolean }
const zoomOpen = ref(false)
const zoomImage = ref<string | undefined>(undefined)
const zoomSlots = ref<ZoomSlot[]>([])

const openZoom = (entry: any) => {
  // Guard for entries without extra data
  const img = entry?.extra?.pictionary?.image as string | undefined
  const s: ZoomSlot[] = (entry?.extra?.pictionary?.slots || []).map((x: any) => ({
    char: x.char,
    fixed: !!x.fixed,
    separator: !!x.separator,
  }))
  zoomImage.value = img
  zoomSlots.value = s
  zoomOpen.value = true
}

const closeZoom = () => {
  zoomOpen.value = false
}

const getDirectionName = (direction: { x: number; y: number }) => {
  if (direction.x === 1) return '→ Right'
  if (direction.x === -1) return '← Left'
  if (direction.y === 1) return '↓ Down'
  if (direction.y === -1) return '↑ Up'
  return '⏸ Stopped'
}

// Flashcard flip state management
const flashcardFlipStates = ref<Record<string, boolean>>({})

const toggleFlashcardFlip = (cardKey: string) => {
  flashcardFlipStates.value[cardKey] = !flashcardFlipStates.value[cardKey]
}
</script>

<style scoped>
/* Flashcard flip animation styles (matching FlashcardCard.vue) */
.perspective-1000 {
  perspective: 1000px;
}

.flashcard-history {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flashcard-history.flipped {
  transform: rotateY(180deg);
}

.flashcard-face {
  backface-visibility: hidden;
}

.flashcard-front {
  transform: rotateY(0deg);
}

.flashcard-back {
  transform: rotateY(180deg);
}
</style>

