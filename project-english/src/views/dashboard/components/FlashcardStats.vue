<template>
  <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full min-h-[420px] flex flex-col">
    <div class="px-6 py-8 sm:p-8 flex-1 flex flex-col">
      <!-- Header with title and icon -->
      <div class="flex items-center mb-6">
        <div class="animate-pulse-slow">
          <div class="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
        </div>
        <h3 class="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          {{ t('dashboard.flashcardStats.title', 'Flashcard Practice') }}
        </h3>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex-1 flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>

      <!-- No data state -->
      <div v-else-if="stats.totalSessions === 0" class="flex-1 flex flex-col items-center justify-center text-center space-y-4">
        <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
            {{ t('dashboard.flashcardStats.noData', 'No practice sessions yet') }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ t('dashboard.flashcardStats.startPracticing', 'Start practicing to see your stats!') }}
          </p>
        </div>
      </div>

      <!-- Stats content -->
      <div v-else class="space-y-6 flex-1">
        <!-- Circular Progress Displays -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6" style="background: transparent !important;">
          <!-- Total Sessions -->
          <div style="background: transparent !important;">
            <CircularProgress
              :value="stats.totalSessions"
              :max="Math.max(stats.totalSessions + 10, 50)"
              :size="110"
              :stroke-width="7"
              progress-color="#8b5cf6"
              progress-color-secondary="#a855f7"
              progress-color-tertiary="#c084fc"
              background-color="#1e1b4b"
              :label="t('dashboard.flashcardStats.sessions', 'Sessions')"
              show-icon
              :show-shimmer="true"
              :glow-effect="true"
              value-class="text-lg sm:text-xl font-bold"
              :animation-delay="100"
            >
              <template #icon>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </template>
            </CircularProgress>
          </div>

          <!-- Current Streak -->
          <div style="background: transparent !important;">
            <CircularProgress
              :value="stats.streakDays"
              :max="Math.max(stats.streakDays + 5, 30)"
              :size="110"
              :stroke-width="7"
              progress-color="#f97316"
              progress-color-secondary="#fb923c"
              progress-color-tertiary="#fdba74"
              background-color="#7c2d12"
              :label="t('dashboard.flashcardStats.streak', 'Streak')"
              :unit="t('dashboard.flashcardStats.days', 'days')"
              show-icon
              :show-shimmer="true"
              :glow-effect="true"
              value-class="text-lg sm:text-xl font-bold"
              :animation-delay="200"
            >
              <template #icon>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.657 18.657A8 8 0 716.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                </svg>
              </template>
            </CircularProgress>
          </div>

          <!-- Average Accuracy -->
          <div style="background: transparent !important;">
            <CircularProgress
              :value="stats.averageAccuracy"
              :max="100"
              :size="110"
              :stroke-width="7"
              progress-color="#10b981"
              progress-color-secondary="#34d399"
              progress-color-tertiary="#6ee7b7"
              background-color="#064e3b"
              :label="t('dashboard.flashcardStats.accuracy', 'Accuracy')"
              unit="%"
              show-icon
              :show-shimmer="true"
              :glow-effect="true"
              value-class="text-lg sm:text-xl font-bold"
              :animation-delay="300"
            >
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </template>
            </CircularProgress>
            <p class="text-xs font-medium mt-1" :class="formattedStats.accuracyLevel.color">
              {{ formattedStats.accuracyLevel.level }}
            </p>
          </div>

          <!-- Weekly Progress -->
          <div style="background: transparent !important;">
            <CircularProgress
              :value="stats.sessionsThisWeek"
              :max="7"
              :size="110"
              :stroke-width="7"
              progress-color="#3b82f6"
              progress-color-secondary="#60a5fa"
              progress-color-tertiary="#93c5fd"
              background-color="#1e3a8a"
              :label="t('dashboard.flashcardStats.weeklyProgress', 'This Week')"
              show-icon
              :show-shimmer="true"
              :glow-effect="true"
              value-class="text-lg sm:text-xl font-bold"
              :animation-delay="400"
            >
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </template>
            </CircularProgress>
            <p class="text-xs font-medium mt-1" :class="formattedStats.progressLevel.color">
              {{ stats.sessionsThisWeek }}/7 {{ t('dashboard.flashcardStats.sessions', 'sessions') }}
            </p>
          </div>
        </div>

        <!-- Additional Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Best Score -->
          <div class="bg-white/50 dark:bg-[#0a0a0a]/30 rounded-xl p-4 group/stat hover:bg-white/70 dark:hover:bg-[#0a0a0a]/50 transition-all duration-300"
               style="animation-delay: 0.5s">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {{ t('dashboard.flashcardStats.bestScore', 'Best Score') }}
              </span>
              <div class="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300">
                <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white counter-animate">{{ stats.bestScore }}</p>
          </div>

          <!-- Cards Studied -->
          <div class="bg-white/50 dark:bg-[#0a0a0a]/30 rounded-xl p-4 group/stat hover:bg-white/70 dark:hover:bg-[#0a0a0a]/50 transition-all duration-300"
               style="animation-delay: 0.6s">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wide">
                {{ t('dashboard.flashcardStats.cardsStudied', 'Cards Studied') }}
              </span>
              <div class="w-6 h-6 bg-pink-100 dark:bg-pink-900/50 rounded-lg flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300">
                <svg class="w-3 h-3 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                </svg>
              </div>
            </div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white counter-animate">{{ stats.totalCardsStudied.toLocaleString() }}</p>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="space-y-3">
          <!-- Practice Time -->
          <div class="group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-[#0a0a0a]/20 transition-all duration-300"
               style="animation-delay: 0.7s">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover/activity:rotate-12 group-hover/activity:scale-110 transition-all duration-300">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                {{ t('dashboard.flashcardStats.totalTime', 'Total Practice Time') }}
              </p>
              <p class="text-xs text-purple-600 dark:text-purple-400 font-medium">{{ formattedStats.totalPracticeTimeFormatted }}</p>
            </div>
          </div>

          <!-- Favorite Mode -->
          <div v-if="stats.favoriteMode" class="group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-[#0a0a0a]/20 transition-all duration-300"
               style="animation-delay: 0.8s">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center transform group-hover/activity:rotate-12 group-hover/activity:scale-110 transition-all duration-300">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                {{ t('dashboard.flashcardStats.favoriteMode', 'Favorite Mode') }}
              </p>
              <p class="text-xs text-yellow-600 dark:text-yellow-400 font-medium">{{ formattedStats.favoriteModeFormatted }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useFlashcardDashboardStats } from '../composables/useFlashcardDashboardStats'
import CircularProgress from './CircularProgress.vue'

const { t } = useI18n()
const { stats, getFormattedStats: formattedStats, isLoading } = useFlashcardDashboardStats()
</script>

<style scoped>
.counter-animate {
  animation: counter-animate 0.6s ease-out;
}

.animate-progress-slide {
  animation: progress-slide 1.5s ease-out;
}

@keyframes counter-animate {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progress-slide {
  from {
    width: 0%;
  }
  to {
    width: var(--target-width);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
