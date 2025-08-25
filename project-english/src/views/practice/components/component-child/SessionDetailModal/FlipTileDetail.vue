<template>
  <!-- Flip Tile-specific details -->
  <div class="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
    <!-- Main game context card -->
    <div class="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-md sm:rounded-lg border border-emerald-200 dark:border-emerald-800/50 p-2 sm:p-3 md:p-4">
      <!-- Category Badge & Game Info (matching FlipTileMode header) -->
      <div class="mb-3 sm:mb-4 flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3">
        <span class="px-2 py-1 xs:px-3 xs:py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-xs sm:text-sm font-medium rounded-full truncate">
          {{ entry.extra.flipTile.category ? getTopicName(entry.extra.flipTile.category) : 'Unknown Category' }}
        </span>
        <!-- Flipped tiles counter recreation -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-600 dark:text-white/70">
            Tiles flipped: {{ entry.extra.flipTile.flippedCount }}/{{ entry.extra.flipTile.maxFlips }}
          </span>
        </div>
      </div>
      
      <div class="flex items-center gap-2 mb-3">
        <span class="text-sm font-medium text-emerald-700 dark:text-emerald-300">🎯 Flip Tile Challenge</span>
        <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200">
          {{ entry.extra.flipTile.useHints ? 'Definition Mode' : 'Image Mode' }}
        </span>
      </div>
      
      <!-- Context Display: Image or Definition -->
      <div class="mb-4">
        <div class="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">Practice Context</div>
        <div v-if="entry.extra.flipTile.useHints || !entry.extra.flipTile.image" 
             class="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-lg p-4 border border-teal-200 dark:border-teal-700/50">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-teal-100 dark:bg-teal-800/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                {{ entry.extra.flipTile.meaning || 'No definition available' }}
              </div>
              <div v-if="entry.extra.flipTile.category" class="text-xs text-teal-600 dark:text-teal-400 mt-1">
                Category: {{ entry.extra.flipTile.category }}
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="entry.extra.flipTile.image" class="flex justify-center">
          <div class="relative">
            <img
              :src="entry.extra.flipTile.image"
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
      <div class="mb-3 sm:mb-4">
        <div class="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 xs:gap-0 mb-2">
          <div class="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-center xs:text-left">Letter Tiles</div>
          <div class="text-xs text-gray-500 dark:text-white/70 text-center xs:text-right">
            Max flips: {{ entry.extra.flipTile.maxFlips }} | All revealed at end
          </div>
        </div>
        <div class="flex flex-wrap gap-1 xs:gap-1.5 justify-center bg-white dark:bg-[#0a0a0a] rounded-md sm:rounded-lg p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute">
          <template v-for="(tile, tIdx) in entry.extra.flipTile.tiles">
            <div v-if="tile.separator" :key="`sep-${tIdx}`" class="px-0.5 xs:px-1 text-xs xs:text-sm text-gray-700 dark:text-white/80 flex items-center">
              {{ tile.char }}
            </div>
            <div v-else :key="`tile-${tIdx}`" class="relative w-6 h-8 xs:w-7 xs:h-9 sm:w-8 sm:h-10 flex items-center justify-center rounded border-2 text-xs xs:text-sm font-bold transition-all"
                 :class="tile.flipped 
                   ? 'bg-white dark:bg-dark-bg-soft border-green-400 dark:border-green-500 text-gray-900 dark:text-white shadow-sm' 
                   : 'bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 border-blue-400 dark:border-blue-500 text-white'">
              <template v-if="tile.flipped">
                {{ tile.char.toUpperCase() }}
              </template>
              <template v-else>
                <svg class="w-2.5 h-2.5 xs:w-3 xs:h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                </svg>
              </template>
            </div>
          </template>
        </div>
      </div>

      <!-- User Input Recreation -->
      <div class="mb-3 sm:mb-4">
        <div class="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider text-center xs:text-left">User Input Interface</div>
        <div class="max-w-xs xs:max-w-sm sm:max-w-md mx-auto">
          <div class="relative">
            <input
              type="text"
              :value="entry.extra.flipTile.finalUserAnswer"
              placeholder="Type your answer..."
              readonly
              class="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base sm:text-lg font-medium text-center rounded-lg xs:rounded-xl border-2 bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute cursor-not-allowed opacity-75"
            />
            <button
              v-if="entry.extra.flipTile.finalUserAnswer?.trim()"
              disabled
              class="absolute right-2 xs:right-3 top-1/2 transform -translate-y-1/2 px-2 xs:px-3 py-0.5 xs:py-1 bg-blue-500/50 text-white text-xs xs:text-sm font-medium rounded cursor-not-allowed"
            >
              Check
            </button>
            <div v-if="!entry.extra.flipTile.finalUserAnswer?.trim()" class="absolute right-2 xs:right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 dark:text-white/40">
              (No answer)
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
              entry.isCorrect === true
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
            ]"
          >
            <svg v-if="entry.isCorrect === true" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            {{ entry.isCorrect === true ? 'Correct' : 'Incorrect' }}
          </div>
          <div v-if="entry.isCorrect !== true" class="text-center">
            <p class="text-sm text-gray-600 dark:text-white/70">
              Correct answer:
              <span class="font-semibold text-gray-900 dark:text-white">{{ entry.extra.flipTile.targetWord }}</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2">
              {{ entry.extra.flipTile.meaning }}
            </p>
          </div>
          <div v-else class="text-center">
            <p class="text-sm text-gray-600 dark:text-white/70 line-clamp-2">
              {{ entry.extra.flipTile.meaning }}
            </p>
          </div>
        </div>
      </div>

      <!-- User Input & Result -->
      <div class="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
        <div class="bg-white dark:bg-[#0a0a0a] rounded p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute">
          <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">User Answer</div>
          <div class="font-semibold text-gray-900 dark:text-white break-all text-xs xs:text-sm">
            {{ entry.extra.flipTile.finalUserAnswer || '(Empty)' }}
          </div>
        </div>
        <div class="bg-white dark:bg-[#0a0a0a] rounded p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute">
          <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Correct Answer</div>
          <div class="font-semibold text-gray-900 dark:text-white break-all text-xs xs:text-sm">{{ entry.extra.flipTile.targetWord }}</div>
        </div>
        <div class="bg-white dark:bg-[#0a0a0a] rounded p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute">
          <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Result</div>
          <div class="font-semibold text-xs xs:text-sm" :class="entry.isCorrect === true ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
            {{ entry.isCorrect === true ? '✓ Correct' : '✗ Incorrect' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTopicName } from '../../../../../utils/topicUtils'

defineProps<{
  entry: any
}>()
</script>
