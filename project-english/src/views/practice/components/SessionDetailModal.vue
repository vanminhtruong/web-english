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

                  <!-- Pagination Controls -->
                  <div v-if="totalPages > 1" class="flex items-center justify-between mb-4">
                    <div class="text-sm text-gray-500 dark:text-white/70">
                      {{ t('common.showing', 'Showing') }} {{ startIndex + 1 }}-{{ Math.min(endIndex, details.entries.length) }} {{ t('common.of', 'of') }} {{ details.entries.length }} {{ t('common.entries', 'entries') }}
                    </div>
                    <div class="flex items-center gap-1">
                      <button 
                        @click="currentPage--" 
                        :disabled="currentPage === 1"
                        class="px-2 py-1 text-sm rounded border border-gray-300 dark:border-dark-bg-mute bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ←
                      </button>
                      <span class="px-3 py-1 text-sm text-gray-700 dark:text-white">
                        {{ currentPage }} / {{ totalPages }}
                      </span>
                      <button 
                        @click="currentPage++" 
                        :disabled="currentPage === totalPages"
                        class="px-2 py-1 text-sm rounded border border-gray-300 dark:border-dark-bg-mute bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  <!-- Entries list -->
                  <div class="divide-y divide-gray-200 dark:divide-dark-bg-mute rounded-lg overflow-hidden border border-gray-200 dark:border-dark-bg-mute">
                    <div v-for="(e, idx) in paginatedEntries" :key="idx" class="p-3 md:p-4 bg-white dark:bg-gray-custom">
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

                          <!-- Flip Tile-specific details -->
                          <div v-if="e.mode === 'flip-tile' && e.extra?.flipTile" class="mt-3 space-y-3">
                            <!-- Main game context card -->
                            <div class="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800/50 p-4">
                              <!-- Category Badge & Game Info (matching FlipTileMode header) -->
                              <div class="mb-4 flex items-center justify-center gap-3">
                                <span class="px-3 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
                                  {{ e.extra.flipTile.category ? getTopicName(e.extra.flipTile.category) : 'Unknown Category' }}
                                </span>
                                <!-- Flipped tiles counter recreation -->
                                <div class="flex items-center gap-2">
                                  <span class="text-xs text-gray-600 dark:text-white/70">
                                    Tiles flipped: {{ e.extra.flipTile.flippedCount }}/{{ e.extra.flipTile.maxFlips }}
                                  </span>
                                </div>
                              </div>
                              
                              <div class="flex items-center gap-2 mb-3">
                                <span class="text-sm font-medium text-emerald-700 dark:text-emerald-300">🎯 Flip Tile Challenge</span>
                                <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200">
                                  {{ e.extra.flipTile.useHints ? 'Definition Mode' : 'Image Mode' }}
                                </span>
                              </div>
                              
                              <!-- Context Display: Image or Definition -->
                              <div class="mb-4">
                                <div class="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">Practice Context</div>
                                <div v-if="e.extra.flipTile.useHints || !e.extra.flipTile.image" 
                                     class="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-lg p-4 border border-teal-200 dark:border-teal-700/50">
                                  <div class="flex items-start gap-3">
                                    <div class="w-8 h-8 bg-teal-100 dark:bg-teal-800/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <svg class="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                      </svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                      <div class="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                                        {{ e.extra.flipTile.meaning || 'No definition available' }}
                                      </div>
                                      <div v-if="e.extra.flipTile.category" class="text-xs text-teal-600 dark:text-teal-400 mt-1">
                                        Category: {{ e.extra.flipTile.category }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div v-else-if="e.extra.flipTile.image" class="flex justify-center">
                                  <div class="relative">
                                    <img
                                      :src="e.extra.flipTile.image"
                                      alt="Flip tile challenge image"
                                      class="max-w-full max-h-32 object-contain rounded-lg shadow-md border border-gray-200 dark:border-dark-bg-mute filter blur-sm"
                                    />
                                    <div class="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                                      <span class="text-xs text-white bg-black/60 px-2 py-1 rounded">Blurred during practice</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- Tile Grid Display -->
                              <div class="mb-4">
                                <div class="flex items-center justify-between mb-2">
                                  <div class="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Letter Tiles</div>
                                  <div class="text-xs text-gray-500 dark:text-white/70">
                                    Max flips: {{ e.extra.flipTile.maxFlips }} | All revealed at end
                                  </div>
                                </div>
                                <div class="flex flex-wrap gap-1.5 justify-center bg-white dark:bg-[#0a0a0a] rounded-lg p-3 border border-gray-200 dark:border-dark-bg-mute">
                                  <template v-for="(tile, tIdx) in e.extra.flipTile.tiles">
                                    <div v-if="tile.separator" :key="`sep-${tIdx}`" class="px-1 text-sm text-gray-700 dark:text-white/80 flex items-center">
                                      {{ tile.char }}
                                    </div>
                                    <div v-else :key="`tile-${tIdx}`" class="relative w-8 h-10 flex items-center justify-center rounded-lg border-2 text-sm font-bold transition-all"
                                         :class="tile.flipped 
                                           ? 'bg-white dark:bg-dark-bg-soft border-green-400 dark:border-green-500 text-gray-900 dark:text-white shadow-sm' 
                                           : 'bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 border-blue-400 dark:border-blue-500 text-white'">
                                      <template v-if="tile.flipped">
                                        {{ tile.char.toUpperCase() }}
                                      </template>
                                      <template v-else>
                                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                                        </svg>
                                      </template>
                                    </div>
                                  </template>
                                </div>
                              </div>

                              <!-- User Input Recreation -->
                              <div class="mb-4">
                                <div class="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">User Input Interface</div>
                                <div class="max-w-md mx-auto">
                                  <div class="relative">
                                    <input
                                      type="text"
                                      :value="e.extra.flipTile.finalUserAnswer"
                                      placeholder="Type your answer..."
                                      readonly
                                      class="w-full px-4 py-3 text-lg font-medium text-center rounded-xl border-2 bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute cursor-not-allowed opacity-75"
                                    />
                                    <button
                                      v-if="e.extra.flipTile.finalUserAnswer?.trim()"
                                      disabled
                                      class="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500/50 text-white text-sm font-medium rounded-lg cursor-not-allowed"
                                    >
                                      Check
                                    </button>
                                    <div v-if="!e.extra.flipTile.finalUserAnswer?.trim()" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 dark:text-white/40">
                                      (No answer provided)
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- Feedback Recreation -->
                              <div class="mb-4">
                                <div class="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">Answer Feedback</div>
                                <div class="text-center space-y-2 bg-white dark:bg-[#0a0a0a] rounded-lg p-4 border border-gray-200 dark:border-dark-bg-mute">
                                  <div
                                    :class="[
                                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                                      e.isCorrect
                                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                                    ]"
                                  >
                                    <svg v-if="e.isCorrect" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                    <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                    </svg>
                                    {{ e.isCorrect ? 'Correct' : 'Incorrect' }}
                                  </div>
                                  <div v-if="!e.isCorrect" class="text-center">
                                    <p class="text-sm text-gray-600 dark:text-white/70">
                                      Correct answer:
                                      <span class="font-semibold text-gray-900 dark:text-white">{{ e.extra.flipTile.targetWord }}</span>
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2">
                                      {{ e.extra.flipTile.meaning }}
                                    </p>
                                  </div>
                                  <div v-else class="text-center">
                                    <p class="text-sm text-gray-600 dark:text-white/70 line-clamp-2">
                                      {{ e.extra.flipTile.meaning }}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <!-- User Input & Result -->
                              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                  <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">User Answer</div>
                                  <div class="font-semibold text-gray-900 dark:text-white break-all">
                                    {{ e.extra.flipTile.finalUserAnswer || '(Empty)' }}
                                  </div>
                                </div>
                                <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                  <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Correct Answer</div>
                                  <div class="font-semibold text-gray-900 dark:text-white break-all">{{ e.extra.flipTile.targetWord }}</div>
                                </div>
                                <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                  <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Result</div>
                                  <div class="font-semibold" :class="e.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                                    {{ e.isCorrect ? '✓ Correct' : '✗ Incorrect' }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Quiz Mode-specific details -->
                          <div v-if="e.mode === 'quiz' && e.extra?.quiz" class="mt-3 space-y-3">
                            <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 h-96 select-none">
                              <div class="h-full flex flex-col">
                                <!-- Header -->
                                <div class="text-center mb-4">
                                  <span class="px-4 py-2 bg-yellow-100 dark:bg-gray-800 text-yellow-800 dark:text-yellow-300 text-sm font-medium rounded-full">
                                    {{ e.extra.quiz.category ? getTopicName(e.extra.quiz.category) : 'Unknown Category' }}
                                  </span>
                                </div>

                                <!-- Question -->
                                <div class="text-center mb-4 flex-shrink-0">
                                  <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ e.extra.quiz.question }}</h2>
                                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ e.extra.quiz.pronunciation }}</p>
                                  <p class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">Choose the correct meaning:</p>
                                </div>

                                <!-- Options -->
                                <div class="flex-1 flex flex-col justify-center min-h-0">
                                  <div class="flex items-center justify-center">
                                    <div class="grid grid-cols-2 gap-3 w-full max-w-lg">
                                      <div
                                        v-for="(option, index) in e.extra.quiz.options"
                                        :key="index"
                                        :class="[
                                          'relative p-4 text-center rounded-lg border-2 font-semibold text-sm min-h-[60px] flex items-center justify-center cursor-not-allowed',
                                          option === e.extra.quiz.correctAnswer
                                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                                            : (option === e.extra.quiz.selectedAnswer
                                                ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                                : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
                                        ]"
                                      >
                                        <!-- Letter badge -->
                                        <span class="absolute top-2 left-2 w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80">
                                          {{ String.fromCharCode(65 + index) }}
                                        </span>

                                        <!-- Answer text -->
                                        <span class="text-center px-6">{{ option }}</span>

                                        <!-- Result icon -->
                                        <span v-if="option === e.extra.quiz.correctAnswer" class="absolute top-2 right-2 text-green-500">
                                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                          </svg>
                                        </span>
                                        <span v-else-if="option === e.extra.quiz.selectedAnswer && option !== e.extra.quiz.correctAnswer" class="absolute top-2 right-2 text-red-500">
                                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                          </svg>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Result Summary -->
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Your Answer</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.quiz.selectedAnswer || 'No answer' }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Correct Answer</div>
                                <div class="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                                  {{ e.extra.quiz.correctAnswer }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Result</div>
                                <div class="font-semibold" :class="e.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                                  {{ e.isCorrect ? '✓ Correct' : '✗ Incorrect' }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Typing Mode-specific details -->
                          <div v-if="e.mode === 'typing' && e.extra?.typing" class="mt-3 space-y-3">
                            <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 h-96 select-none">
                              <div class="h-full flex flex-col">
                                <!-- Header -->
                                <div class="text-center mb-6">
                                  <span class="px-4 py-2 bg-purple-100 dark:bg-gray-800 text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
                                    {{ e.extra.typing.category ? getTopicName(e.extra.typing.category) : 'Unknown Category' }}
                                  </span>
                                </div>

                                <!-- Question -->
                                <div class="text-center mb-8">
                                  <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ e.extra.typing.question }}</h2>
                                  <p v-if="!e.extra.typing.isQuizMode" class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">Type the corresponding English word:</p>
                                  <p v-else class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">Choose the correct English word:</p>
                                </div>

                                <!-- Input Area -->
                                <div class="flex-1 flex flex-col justify-center">
                                  <!-- Regular typing mode -->
                                  <div v-if="!e.extra.typing.isQuizMode" class="max-w-lg mx-auto w-full">
                                    <div class="relative">
                                      <input
                                        :value="e.extra.typing.userAnswer || ''"
                                        type="text"
                                        disabled
                                        readonly
                                        class="w-full p-3 text-center text-xl sm:text-2xl md:text-3xl border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
                                        placeholder="Type the word..."
                                      />
                                      
                                      <!-- Result indicator -->
                                      <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <span v-if="e.isCorrect" class="text-green-500">
                                          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                          </svg>
                                        </span>
                                        <span v-else class="text-red-500">
                                          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                          </svg>
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <!-- Correct answer display -->
                                    <div v-if="!e.isCorrect" class="mt-4 text-center">
                                      <p class="text-gray-600 dark:text-gray-400 text-sm">Correct answer:</p>
                                      <p class="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">{{ e.extra.typing.correctAnswer }}</p>
                                    </div>
                                  </div>

                                  <!-- Quiz mode -->
                                  <div v-else class="w-full px-2 sm:px-3 md:px-0">
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 justify-items-stretch w-full">
                                      <div
                                        v-for="(opt, idx) in e.extra.typing.options || []"
                                        :key="idx"
                                        class="px-3 py-1.5 sm:py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 opacity-70 cursor-not-allowed text-left flex items-center gap-2 w-full min-w-0"
                                        :class="[
                                          opt === e.extra.typing.correctAnswer
                                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                                            : (opt === e.extra.typing.selectedOption
                                                ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                                : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
                                        ]"
                                      >
                                        <span class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0">
                                          {{ String.fromCharCode(65 + idx) }}
                                        </span>
                                        <span class="truncate overflow-hidden min-w-0">{{ opt }}</span>
                                      </div>
                                    </div>
                                    <div class="mt-3 sm:mt-4 text-center px-2">
                                      <p v-if="e.isCorrect" class="text-green-600 dark:text-green-400 font-medium text-sm sm:text-base">✓ Correct!</p>
                                      <p v-else class="text-red-600 dark:text-red-400 font-medium text-sm sm:text-base break-words">✗ Correct answer: <span class="font-bold">{{ e.extra.typing.correctAnswer }}</span></p>
                                    </div>
                                  </div>
                                </div>

                                <!-- Submit button (disabled, for visual completeness) -->
                                <div class="text-center mt-6">
                                  <button
                                    v-if="!e.extra.typing.isQuizMode"
                                    disabled
                                    class="bg-gray-300 dark:bg-gray-700 text-white px-8 py-3 rounded-full font-medium cursor-not-allowed"
                                  >
                                    Check
                                  </button>
                                </div>
                              </div>
                            </div>

                            <!-- Result Summary -->
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Your Answer</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.typing.isQuizMode ? (e.extra.typing.selectedOption || 'No answer') : (e.extra.typing.userAnswer || 'No answer') }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Correct Answer</div>
                                <div class="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                                  {{ e.extra.typing.correctAnswer }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Result</div>
                                <div class="font-semibold" :class="e.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                                  {{ e.isCorrect ? '✓ Correct' : '✗ Incorrect' }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Listening Mode-specific details -->
                          <div v-if="e.mode === 'listening' && e.extra?.listening" class="mt-3 space-y-3">
                            <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 h-auto sm:h-96 select-none">
                              <div class="text-center h-full flex flex-col justify-center">
                                <!-- Header -->
                                <div class="mb-6">
                                  <span class="px-3 py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base font-medium rounded-full">
                                    {{ e.extra.listening.category ? getTopicName(e.extra.listening.category) : 'Unknown Category' }}
                                  </span>
                                </div>

                                <!-- Audio Play Button -->
                                <div class="mb-8">
                                  <button
                                    disabled
                                    class="bg-gray-400 text-white p-6 rounded-full cursor-not-allowed"
                                  >
                                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zm-2 6a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/>
                                    </svg>
                                  </button>
                                </div>

                                <!-- Instructions -->
                                <p v-if="!e.extra.listening.isQuizMode" class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">Listen and type the word you hear:</p>
                                <p v-else class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">Choose the word you hear:</p>

                                <!-- Input Area -->
                                <div v-if="!e.extra.listening.isQuizMode" class="max-w-md mx-auto">
                                  <input
                                    :value="e.extra.listening.userAnswer || ''"
                                    type="text"
                                    disabled
                                    readonly
                                    class="w-full p-4 text-center text-lg sm:text-xl md:text-2xl border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
                                    placeholder="Type the word you hear..."
                                  />
                                  <div class="mt-4">
                                    <p v-if="e.isCorrect" class="text-green-600 dark:text-green-400 font-medium">✓ Correct!</p>
                                    <p v-else class="text-red-600 dark:text-red-400 font-medium">✗ Correct answer: {{ e.extra.listening.correctAnswer }}</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ e.meaningShort }}</p>
                                  </div>
                                </div>

                                <!-- Quiz Options -->
                                <div v-else class="w-full px-2 sm:px-3 md:px-0">
                                  <div class="grid grid-cols-1 grid-2-cols-480 sm:grid-cols-2 gap-1.5 sm:gap-3 justify-items-stretch w-full max-w-none">
                                    <div
                                      v-for="(opt, idx) in e.extra.listening.options || []"
                                      :key="idx"
                                      class="px-3 py-1.5 sm:py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 opacity-70 cursor-not-allowed text-left flex items-center gap-2 w-full min-w-0"
                                      :class="[
                                        opt === e.extra.listening.correctAnswer
                                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                                          : (opt === e.extra.listening.selectedOption
                                              ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                              : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
                                      ]"
                                    >
                                      <span class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0">
                                        {{ String.fromCharCode(65 + idx) }}
                                      </span>
                                      <span class="truncate overflow-hidden min-w-0">{{ opt }}</span>
                                    </div>
                                  </div>
                                  <div class="mt-4 text-center">
                                    <p v-if="e.isCorrect" class="text-green-600 dark:text-green-400 font-medium">✓ Correct!</p>
                                    <p v-else class="text-red-600 dark:text-red-400 font-medium">✗ Correct answer: {{ e.extra.listening.correctAnswer }}</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ e.meaningShort }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Result Summary -->
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Your Answer</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.listening.isQuizMode ? (e.extra.listening.selectedOption || 'No answer') : (e.extra.listening.userAnswer || 'No answer') }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Correct Answer</div>
                                <div class="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                                  {{ e.extra.listening.correctAnswer }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Result</div>
                                <div class="font-semibold" :class="e.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                                  {{ e.isCorrect ? '✓ Correct' : '✗ Incorrect' }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Image Mode-specific details -->
                          <div v-if="e.mode === 'image' && e.extra?.image" class="mt-3 space-y-3">
                            <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-6 min-h-96 max-h-[500px] select-none">
                              <div class="h-full flex flex-col overflow-hidden">
                                <!-- Category Badge -->
                                <div class="mb-4 text-center">
                                  <span class="px-3 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
                                    {{ e.extra.image.category ? getTopicName(e.extra.image.category) : 'Unknown Category' }}
                                  </span>
                                </div>

                                <!-- Image Display -->
                                <div class="flex-1 flex items-center justify-center mb-4 min-h-0">
                                  <div v-if="e.extra.image.image" class="relative">
                                    <img 
                                      :src="e.extra.image.image" 
                                      alt="Flashcard image"
                                      class="max-w-full max-h-40 object-contain rounded-lg shadow-md border border-gray-200 dark:border-dark-bg-mute"
                                    />
                                  </div>
                                  
                                  <!-- No Image State -->
                                  <div v-else class="flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg p-8 w-full max-w-sm">
                                    <div class="text-center">
                                      <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      <p class="text-sm text-gray-500 dark:text-white/60 mt-2">No image available for this card.</p>
                                    </div>
                                  </div>
                                </div>

                                <!-- Answer Area -->
                                <div class="space-y-3 flex-shrink-0">
                                  <!-- Typing input when quiz mode is OFF -->
                                  <div v-if="!e.extra.image.isQuizMode">
                                    <input
                                      :value="e.extra.image.userAnswer || ''"
                                      type="text"
                                      disabled
                                      readonly
                                      placeholder="Enter your answer..."
                                      class="w-full px-4 py-3 text-center text-lg border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 cursor-not-allowed"
                                    />
                                  </div>

                                  <!-- Multiple choice when quiz mode is ON -->
                                  <div v-else>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center sm:justify-items-center justify-center mx-auto max-w-[560px] sm:max-w-[520px]">
                                      <div
                                        v-for="(opt, idx) in e.extra.image.options || []"
                                        :key="idx"
                                        class="px-3 py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 opacity-70 cursor-not-allowed text-left flex items-center gap-2 w-full max-w-[260px] sm:max-w-[240px]"
                                        :class="[
                                          opt === e.extra.image.correctAnswer
                                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                                            : (opt === e.extra.image.selectedOption
                                                ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                                : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
                                        ]"
                                      >
                                        <span
                                          class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80"
                                        >
                                          {{ String.fromCharCode(65 + idx) }}
                                        </span>
                                        <span class="truncate">{{ opt }}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Show result after answered -->
                                  <div class="text-center space-y-2 max-h-32 overflow-y-auto">
                                    <div 
                                      :class="[
                                        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                                        e.isCorrect 
                                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                                      ]"
                                    >
                                      <svg v-if="e.isCorrect" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                      </svg>
                                      <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                      </svg>
                                      {{ e.isCorrect ? 'Correct' : 'Incorrect' }}
                                    </div>
                                    
                                    <!-- Show correct answer if wrong -->
                                    <div v-if="!e.isCorrect" class="text-center">
                                      <p class="text-sm text-gray-600 dark:text-white/70">
                                        Correct answer: 
                                        <span class="font-semibold text-gray-900 dark:text-white">{{ e.extra.image.correctAnswer }}</span>
                                      </p>
                                      <p class="text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2">
                                        {{ e.meaningShort }}
                                      </p>
                                    </div>
                                    
                                    <!-- Show meaning if correct -->
                                    <div v-else class="text-center">
                                      <p class="text-sm text-gray-600 dark:text-white/70 line-clamp-2">
                                        {{ e.meaningShort }}
                                      </p>
                                    </div>
                                  </div>

                                  <!-- Instruction text -->
                                  <p v-if="!e.extra.image.isQuizMode" class="text-center text-sm text-gray-500 dark:text-white/60">
                                    Type the word for the image above and press Enter.
                                  </p>
                                  <p v-else class="text-center text-sm text-gray-500 dark:text-white/60">
                                    Choose the correct word for the image.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <!-- Result Summary -->
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Your Answer</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.image.isQuizMode ? (e.extra.image.selectedOption || 'No answer') : (e.extra.image.userAnswer || 'No answer') }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Correct Answer</div>
                                <div class="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                                  {{ e.extra.image.correctAnswer }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Result</div>
                                <div class="font-semibold" :class="e.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                                  {{ e.isCorrect ? '✓ Correct' : '✗ Incorrect' }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Flashcard Mode-specific details -->
                          <div v-if="e.mode === 'flashcard' && e.extra?.flashcard" class="mt-3 space-y-3">
                            <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 md:p-8 min-h-96 h-auto select-none">
                              <!-- Flashcard Recreation with Flip States -->
                              <div class="relative h-full">
                                <!-- Category Badge -->
                                <div class="mb-3 sm:mb-4 md:mb-5 text-center">
                                  <span class="px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base font-medium rounded-full">
                                    {{ e.extra.flashcard.category ? getTopicName(e.extra.flashcard.category) : 'Unknown Category' }}
                                  </span>
                                </div>

                                <!-- Front Side (Word) -->
                                <div v-if="!e.extra.flashcard.isFlipped" class="text-center flex-1 flex flex-col justify-center">
                                  <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-5">
                                    {{ e.extra.flashcard.word }}
                                  </h2>
                                  <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6">
                                    {{ e.extra.flashcard.pronunciation }}
                                  </p>
                                  <p class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
                                    Card was flipped to see meaning
                                  </p>
                                </div>

                                <!-- Back Side (Meaning) -->
                                <div v-else class="text-center flex-1 flex flex-col justify-center bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 rounded-lg p-6 text-white">
                                  <h3 class="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-5">
                                    {{ e.extra.flashcard.meaning }}
                                  </h3>
                                  <p v-if="e.extra.flashcard.partOfSpeech" class="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5">
                                    {{ t(`vocabulary.wordTypes.${e.extra.flashcard.partOfSpeech}`, e.extra.flashcard.partOfSpeech) }}
                                  </p>
                                  <p v-if="e.extra.flashcard.example" class="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-5 leading-relaxed">
                                    {{ e.extra.flashcard.example }}
                                  </p>
                                  <p class="text-xs sm:text-sm md:text-base opacity-75">
                                    Card was on back side (meaning shown)
                                  </p>
                                </div>

                                <!-- User Action Display -->
                                <div class="mt-6 text-center">
                                  <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border" 
                                       :class="e.extra.flashcard.markedAs === 'easy' 
                                         ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' 
                                         : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'">
                                    <svg v-if="e.extra.flashcard.markedAs === 'easy'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                    <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="font-medium">
                                      {{ e.extra.flashcard.markedAs === 'easy' ? 'Marked as Easy' : 'Marked as Difficult' }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Result Summary -->
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">User Action</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.flashcard.markedAs === 'easy' ? '✅ Easy' : '❌ Difficult' }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Word</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.flashcard.word }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Meaning</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.flashcard.meaning }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Scramble Words Mode-specific details -->
                          <div v-if="e.mode === 'scramble-words' && e.extra?.scrambleWords" class="mt-3 space-y-3">
                            <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 md:p-8 min-h-96 h-auto select-none">
                              <!-- Scramble Words Recreation -->
                              <div class="text-center">
                                <!-- Category Badge -->
                                <div class="mb-3 sm:mb-4 md:mb-5">
                                  <span class="px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base font-medium rounded-full">
                                    {{ e.extra.scrambleWords.category ? getTopicName(e.extra.scrambleWords.category) : 'Unknown Category' }}
                                  </span>
                                </div>

                                <!-- Game Instruction -->
                                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
                                  Arrange the letters to form the word
                                </h3>
                                <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6">
                                  {{ e.extra.scrambleWords.pronunciation }}
                                </p>

                                <!-- User's assembled word display -->
                                <div class="mb-4 sm:mb-5 md:mb-6">
                                  <div class="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4 min-h-[3rem] max-w-full px-2 sm:px-0">
                                    <div 
                                      v-for="(letter, index) in e.extra.scrambleWords.assembledWord" 
                                      :key="`assembled-${index}`"
                                      class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-gray-300 dark:border-dark-bg-mute rounded-lg flex items-center justify-center bg-blue-50 dark:bg-[#0f0f0f] text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white"
                                    >
                                      {{ letter }}
                                    </div>
                                    <!-- Empty slots for remaining letters -->
                                    <div 
                                      v-for="n in Math.max(0, e.extra.scrambleWords.targetWord.length - e.extra.scrambleWords.assembledWord.length)" 
                                      :key="`empty-${n}`"
                                      class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-dashed border-gray-300 dark:border-dark-bg-mute rounded-lg bg-gray-50 dark:bg-[#0f0f0f]"
                                    ></div>
                                  </div>

                                  <!-- Result Feedback -->
                                  <div class="text-center max-w-full px-2">
                                    <div v-if="e.extra.scrambleWords.isCorrect" class="text-green-600 dark:text-green-400">
                                      <p class="font-semibold text-sm sm:text-base mb-2">
                                        ✅ Correct!
                                      </p>
                                      <div class="bg-green-50 dark:bg-[#0f0f0f] border border-green-200 dark:border-dark-bg-mute rounded-lg p-3 sm:p-4">
                                        <p class="text-green-700 dark:text-green-400 font-medium text-sm sm:text-base">
                                          {{ e.extra.scrambleWords.meaning }}
                                        </p>
                                        <p v-if="e.extra.scrambleWords.partOfSpeech" class="text-green-600 dark:text-green-500 text-xs sm:text-sm mt-1 opacity-80">
                                          {{ t(`vocabulary.wordTypes.${e.extra.scrambleWords.partOfSpeech}`, e.extra.scrambleWords.partOfSpeech) }}
                                        </p>
                                      </div>
                                    </div>
                                    <div v-else class="text-red-600 dark:text-red-400">
                                      <p class="font-semibold text-sm sm:text-base mb-2">
                                        ❌ Incorrect!
                                      </p>
                                      <div class="bg-red-50 dark:bg-[#0f0f0f] border border-red-200 dark:border-dark-bg-mute rounded-lg p-3 sm:p-4">
                                        <p class="text-red-700 dark:text-red-400 font-bold text-base sm:text-lg mb-1">
                                          {{ e.extra.scrambleWords.targetWord.toUpperCase() }}
                                        </p>
                                        <p class="text-red-600 dark:text-red-500 text-sm sm:text-base">
                                          {{ e.extra.scrambleWords.meaning }}
                                        </p>
                                        <p v-if="e.extra.scrambleWords.partOfSpeech" class="text-red-500 dark:text-red-600 text-xs sm:text-sm mt-1 opacity-80">
                                          {{ t(`vocabulary.wordTypes.${e.extra.scrambleWords.partOfSpeech}`, e.extra.scrambleWords.partOfSpeech) }}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <!-- Scrambled letters display (readonly) -->
                                <div class="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 px-2 sm:px-4 md:px-6 max-w-full">
                                  <div 
                                    v-for="(letter, index) in e.extra.scrambleWords.scrambledLetters" 
                                    :key="`scrambled-${index}`"
                                    class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-gray-400 dark:border-dark-bg-soft rounded-lg flex items-center justify-center bg-gray-100 dark:bg-[#0f0f0f] text-lg sm:text-xl md:text-2xl font-bold text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-75"
                                  >
                                    {{ letter }}
                                  </div>
                                </div>

                                <!-- Control buttons (disabled) -->
                                <div class="flex flex-wrap justify-center gap-1.5 sm:gap-3 md:gap-4 px-2 sm:px-4 max-w-full">
                                  <button disabled class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2.5 bg-gray-400 text-white text-xs sm:text-sm md:text-base font-semibold rounded-md sm:rounded-lg cursor-not-allowed opacity-50 flex items-center gap-1 sm:gap-2">
                                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 3.707a1 1 0 00-1.414-1.414L8 8.586 6.707 7.293a1 1 0 10-1.414 1.414L6.586 10l-1.293 1.293a1 1 0 101.414 1.414L8 11.414l1.293 1.293a1 1 0 001.414-1.414L9.414 10l1.293-1.293z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="hidden sm:inline">Backspace</span>
                                  </button>
                                  <button disabled class="px-2 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gray-400 text-white text-xs sm:text-sm md:text-base font-semibold rounded-md sm:rounded-lg cursor-not-allowed opacity-50">
                                    Clear
                                  </button>
                                  <button disabled class="px-2 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gray-400 text-white text-xs sm:text-sm md:text-base font-semibold rounded-md sm:rounded-lg cursor-not-allowed opacity-50">
                                    Check
                                  </button>
                                </div>
                              </div>
                            </div>

                            <!-- Result Summary -->
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Your Answer</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.scrambleWords.userAnswer || 'No answer' }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Correct Answer</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.scrambleWords.targetWord }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Result</div>
                                <div class="font-semibold" :class="e.extra.scrambleWords.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                                  {{ e.extra.scrambleWords.isCorrect ? '✓ Correct' : '✗ Incorrect' }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Pronunciation Mode-specific details -->
                          <div v-if="e.mode === 'pronunciation' && e.extra?.pronunciation" class="mt-3 space-y-3">
                            <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-4 sm:p-6 md:p-8 min-h-96 h-auto select-none overflow-hidden">
                              <!-- Traditional Pronunciation Mode Recreation -->
                              <div class="text-center h-full flex flex-col justify-start md:justify-center items-center gap-3 md:gap-4">
                                <!-- Category Badge -->
                                <div class="mb-6">
                                  <span class="px-2.5 py-0.5 bg-blue-100 dark:bg-dark-bg-mute text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full">
                                    {{ e.extra.pronunciation.category ? getTopicName(e.extra.pronunciation.category) : 'Unknown Category' }}
                                  </span>
                                </div>

                                <!-- Target Word -->
                                <h2 class="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-gray-900 dark:text-white mb-3 md:mb-4 break-words">
                                  {{ e.extra.pronunciation.targetWord }}
                                </h2>

                                <!-- Pronunciation -->
                                <p class="text-base sm:text-lg md:text-xl text-gray-500 dark:text-white/70 mb-6 md:mb-8 break-words">
                                  {{ e.extra.pronunciation.pronunciation || 'No pronunciation available' }}
                                </p>

                                <!-- Disabled Recording Button -->
                                <div>
                                  <button
                                    disabled
                                    class="bg-gray-400 text-white p-4 sm:p-5 md:p-6 rounded-full cursor-not-allowed opacity-50"
                                  >
                                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                                      <path d="M5.5 9.5a.5.5 0 01.5.5v1a4 4 0 004 4h.5a.5.5 0 010 1h-.5a5 5 0 01-5-5v-1a.5.5 0 01.5-.5z" />
                                      <path d="M10 18a5 5 0 005-5h-1a4 4 0 01-4 4v1z" />
                                    </svg>
                                  </button>
                                </div>

                                <!-- Recording Result -->
                                <div class="mt-5 sm:mt-6 md:mt-8">
                                  <p v-if="e.extra.pronunciation.userPronunciation" class="text-gray-600 dark:text-white/80 text-sm sm:text-base break-words">
                                    Your Recording: <span class="font-medium text-gray-800 dark:text-white">{{ e.extra.pronunciation.userPronunciation }}</span>
                                  </p>
                                  <div class="mt-4">
                                    <p v-if="e.extra.pronunciation.isCorrect" class="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">✓ Correct!</p>
                                    <p v-else class="text-lg sm:text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">Try Again!</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Result Summary -->
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Your Pronunciation</div>
                                <div class="font-semibold text-gray-900 dark:text-white truncate">
                                  {{ e.extra.pronunciation.userPronunciation || 'No recording' }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Target Word</div>
                                <div class="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                                  {{ e.extra.pronunciation.targetWord }}
                                </div>
                              </div>
                              <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-3 border border-gray-200 dark:border-dark-bg-mute">
                                <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Result</div>
                                <div class="font-semibold" :class="e.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                                  {{ e.isCorrect ? '✓ Correct' : '✗ Incorrect' }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Snake Game-specific details -->
                          <div v-if="e.mode === 'snake-game' && e.extra?.snakeGame" class="mt-3 space-y-3">
                            <!-- Animated snake action card -->
                            <div class="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800/50 p-3 animate-fade-in-up">
                              <div class="flex items-center gap-3">
                                <!-- Snake icon with animation -->
                                <div class="flex-shrink-0">
                                  <div class="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
                                       :class="e.extra.snakeGame.wasCorrect ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-red-100 dark:bg-red-900/50'">
                                    <!-- Snake eating animation -->
                                    <svg v-if="e.extra.snakeGame.wasCorrect" class="w-6 h-6 text-emerald-600 dark:text-emerald-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    <!-- Wrong bite animation -->
                                    <svg v-else class="w-6 h-6 text-red-600 dark:text-red-400 animate-ping" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                    </svg>
                                  </div>
                                </div>

                                <!-- Action details -->
                                <div class="flex-1 min-w-0">
                                  <div class="flex items-center gap-2">
                                    <span class="text-sm font-medium"
                                          :class="e.extra.snakeGame.wasCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'">
                                      {{ e.extra.snakeGame.wasCorrect ? '🐍 Ate Correct Food' : '🐍 Ate Wrong Food' }}
                                    </span>
                                    <span class="text-xs px-2 py-0.5 rounded-full"
                                          :class="e.extra.snakeGame.foodType === 'primary' 
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' 
                                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'">
                                      {{ e.extra.snakeGame.foodType === 'primary' ? 'Target Food' : 'Decoy Food' }}
                                    </span>
                                  </div>
                                  <div class="text-xs text-gray-500 dark:text-white/70 mt-1">
                                    Position: ({{ e.extra.snakeGame.position.x }}, {{ e.extra.snakeGame.position.y }})
                                  </div>
                                </div>
                              </div>

                              <!-- Game statistics with animated counters -->
                              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs">
                                <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-2 border border-gray-200 dark:border-dark-bg-mute">
                                  <div class="text-gray-500 dark:text-white/70">Snake Length</div>
                                  <div class="font-semibold text-gray-900 dark:text-white animate-counter">
                                    {{ e.extra.snakeGame.snakeLength }}
                                  </div>
                                </div>
                                <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-2 border border-gray-200 dark:border-dark-bg-mute">
                                  <div class="text-gray-500 dark:text-white/70">Game Score</div>
                                  <div class="font-semibold text-emerald-600 dark:text-emerald-400 animate-counter">
                                    {{ e.extra.snakeGame.gameScore }}
                                  </div>
                                </div>
                                <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-2 border border-gray-200 dark:border-dark-bg-mute">
                                  <div class="text-gray-500 dark:text-white/70">Words Done</div>
                                  <div class="font-semibold text-blue-600 dark:text-blue-400 animate-counter">
                                    {{ e.extra.snakeGame.wordsCompleted }}
                                  </div>
                                </div>
                                <div class="bg-white dark:bg-[#0a0a0a] rounded-md p-2 border border-gray-200 dark:border-dark-bg-mute">
                                  <div class="text-gray-500 dark:text-white/70">Wrong Bites</div>
                                  <div class="font-semibold text-red-600 dark:text-red-400 animate-counter">
                                    {{ e.extra.snakeGame.wrongEatenCount }}
                                  </div>
                                </div>
                              </div>

                              <!-- Visual food position indicator -->
                              <div class="mt-3">
                                <div class="text-xs text-gray-500 dark:text-white/70 mb-2">Snake Movement & Food Position:</div>
                                <SnakeReplay :data="e.extra.snakeGame" />
                                <!-- Movement summary -->
                                <div class="mt-2 text-xs text-gray-500 dark:text-white/70 flex items-center gap-4">
                                  <span>🐍 Length: {{ e.extra.snakeGame.snakeLength }}</span>
                                  <span v-if="e.extra.snakeGame.direction">
                                    Direction: {{ getDirectionName(e.extra.snakeGame.direction) }}
                                  </span>
                                </div>
                              </div>
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
import { ref, defineAsyncComponent, computed } from 'vue'
import type { SessionDetails } from '../composables/usePracticeSessionDetails'
import { getTopicName } from '../../../utils/topicUtils'
const SnakeReplay = defineAsyncComponent(() => import('./SnakeReplay.vue'))

const props = defineProps<{
  show: boolean
  details: SessionDetails | null
}>()

const emit = defineEmits(['close'])

const { t } = useI18n()

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 3

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
</script>

