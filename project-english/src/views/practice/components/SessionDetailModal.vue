<template>
  <div>
    <Transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60] backdrop-blur-sm">
        <Transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0" leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-4">
          <div class="w-full max-w-5xl max-h-[82vh]" @click.stop>
            <div class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-dark-bg-mute flex flex-col max-h-[82vh]">
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-dark-bg-mute flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-t-xl">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    <span>{{ t('flashcard.history.details.title', 'Session Details') }}</span>
                  </h3>
                  <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-white/80 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-soft" :aria-label="t('common.close', 'Close')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="px-4 md:px-6 py-4 flex-1 overflow-y-auto min-h-0">
                <div v-if="!details" class="text-center py-10">
                  <div class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.details.noData', 'No details available for this session') }}</div>
                </div>

                <div v-else class="space-y-4">
                  <!-- Summary -->
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                      <div class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.totalCards', 'Total Cards') }}</div>
                      <div class="text-gray-900 dark:text-white font-semibold">{{ details.total }}</div>
                    </div>
                    <div class="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
                      <div class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.correct', 'Correct') }}</div>
                      <div class="text-green-700 dark:text-green-400 font-semibold">{{ details.correct }}</div>
                    </div>
                    <div class="bg-red-50 dark:bg-red-900/30 rounded-lg p-3">
                      <div class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.incorrect', 'Incorrect') }}</div>
                      <div class="text-red-700 dark:text-red-400 font-semibold">{{ details.incorrect }}</div>
                    </div>
                    <div class="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-3">
                      <div class="text-gray-500 dark:text-white/70">{{ t('flashcard.modes.mode', 'Mode') }}</div>
                      <div class="text-indigo-700 dark:text-indigo-300 font-semibold">{{ details.mode }}</div>
                    </div>
                  </div>

                  <!-- Entries list -->
                  <div class="divide-y divide-gray-200 dark:divide-dark-bg-mute rounded-lg overflow-hidden border border-gray-200 dark:border-dark-bg-mute">
                    <div v-for="(e, idx) in details.entries" :key="idx" class="p-3 md:p-4 bg-white dark:bg-gray-custom">
                      <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0">
                          <div class="flex items-center gap-2">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ e.word }}</span>
                            <span class="text-xs text-gray-500 dark:text-white/70 truncate">— {{ e.meaningShort }}</span>
                          </div>
                          <div class="mt-1 text-sm">
                            <span class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.details.yourAnswer', 'Your answer') }}:</span>
                            <span class="ml-1" :class="e.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">{{ e.userAnswer || t('flashcard.history.details.noAnswer', 'No answer') }}</span>
                          </div>
                          <div class="text-sm text-gray-500 dark:text-white/70">
                            <span>{{ t('flashcard.history.details.correctAnswer', 'Correct answer') }}:</span>
                            <span class="ml-1 text-gray-900 dark:text-white">{{ e.correctAnswer }}</span>
                          </div>
                          <!-- Pictionary-specific details -->
                          <div v-if="e.mode === 'pictionary'" class="mt-3 space-y-2">
                            <!-- Image preview -->
                            <div v-if="e.extra?.pictionary?.image" class="flex items-center gap-3 cursor-zoom-in select-none" @click="openZoom(e)">
                              <img
                                :src="e.extra.pictionary.image"
                                :alt="t('flashcard.pictionary.imageAlt', 'Pictionary image')"
                                class="w-24 h-24 object-contain rounded-lg border border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-dark-bg-soft"
                              />
                            </div>
                            <!-- Read-only letter slots -->
                            <div v-if="e.extra?.pictionary?.slots && e.extra.pictionary.slots.length" class="flex flex-wrap gap-1.5 items-center cursor-zoom-in select-none" @click="openZoom(e)">
                              <template v-for="(slot, sIdx) in e.extra.pictionary.slots">
                                <div v-if="slot.separator" :key="`sep-${sIdx}`" class="px-1 text-base text-gray-700 dark:text-white/80 select-none">
                                  {{ slot.char }}
                                </div>
                                <div
                                  v-else
                                  :key="`box-${sIdx}`"
                                  class="w-8 h-10 sm:w-9 sm:h-11 flex items-center justify-center rounded-md border text-lg font-semibold bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute"
                                  :class="slot.fixed ? 'opacity-90' : ''"
                                >
                                  <span class="uppercase tracking-wider">{{ slot.char || '\u00A0' }}</span>
                                </div>
                              </template>
                            </div>
                          </div>
                          <div v-if="e.notes" class="text-xs text-gray-500 dark:text-white/70 mt-1">{{ e.notes }}</div>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                                :class="e.isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'">
                            <svg v-if="e.isCorrect" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                            <span>{{ e.isCorrect ? t('flashcard.history.correct', 'Correct') : t('flashcard.history.incorrect', 'Incorrect') }}</span>
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
import { ref } from 'vue'
import type { SessionDetails } from '../composables/usePracticeSessionDetails'

const props = defineProps<{
  show: boolean
  details: SessionDetails | null
}>()

const emit = defineEmits(['close'])

const { t } = useI18n()

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
</script>

