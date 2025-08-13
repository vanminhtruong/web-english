<template>
  <div class="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="floating-shapes">
        <div class="absolute top-20 left-10 w-40 h-40 sm:w-64 sm:h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-40 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-56 h-56 sm:w-80 sm:h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </div>
    
    <!-- Header -->
    <LazyLoadComponent animation-type="fade-up">
      <DashboardHeader />
    </LazyLoadComponent>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-3 sm:py-5 px-3 sm:px-6 lg:px-8 relative">
      <!-- Stats Overview -->
      <LazyLoadComponent animation-type="slide-up" :threshold="0.2">
        <DashboardStats :stats="stats" class="mb-8" />
      </LazyLoadComponent>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <LazyLoadComponent animation-type="slide-left" :threshold="0.15">
          <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full min-h-[360px] sm:min-h-[420px] flex flex-col">
            <div class="px-4 py-5 sm:p-8 flex-1 flex flex-col">
              <div class="flex items-center mb-6">
                <div class="animate-pulse-slow">
                  <div class="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></div>
                </div>
                <h3 class="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {{ t('dashboard.quickActions', 'Quick Actions') }}
                </h3>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
                <!-- Add Vocabulary Button -->
                <button @click="navigateTo('/vocabulary')" 
                        class="group/btn relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative z-10 text-center">
                    <svg class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-xs sm:text-sm md:text-base font-medium">{{ t('dashboard.actions.addVocabulary', 'Add Vocabulary') }}</span>
                  </div>
                  <div class="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                </button>
                
                <!-- Practice Flashcard Button -->
                <button @click="navigateTo('/practice/flashcard')" 
                        class="group/btn relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative z-10 text-center">
                    <svg class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                    </svg>
                    <span class="text-xs sm:text-sm md:text-base font-medium">{{ t('dashboard.actions.practiceFlashcard', 'Practice Flashcard') }}</span>
                  </div>
                  <div class="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                </button>
                
                <!-- Take Quiz Button -->
                <button @click="navigateTo('/practice/quiz')" 
                        class="group/btn relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative z-10 text-center">
                    <svg class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-xs sm:text-sm md:text-base font-medium">{{ t('dashboard.actions.takeQuiz', 'Take a Quiz') }}</span>
                  </div>
                  <div class="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                </button>
                
                <!-- Learn Grammar Button -->
                <button @click="navigateTo('/grammar')" 
                        class="group/btn relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative z-10 text-center">
                    <svg class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                    </svg>
                    <span class="text-xs sm:text-sm md:text-base font-medium">{{ t('dashboard.actions.learnGrammar', 'Learn Grammar') }}</span>
                  </div>
                  <div class="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </LazyLoadComponent>

        <!-- Recent Activity -->
        <LazyLoadComponent animation-type="slide-right" :threshold="0.15">
          <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full min-h-[420px] flex flex-col">
            <div class="px-6 py-8 sm:p-8 flex-1 flex flex-col">
              <div class="flex items-center mb-6">
                <div class="animate-pulse-slow">
                  <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3"></div>
                </div>
                <h3 class="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {{ t('dashboard.recentActivity', 'Recent Activity') }}
                </h3>
              </div>
              
              <div class="space-y-4 flex-1">
                <div v-for="(activity, index) in recentActivities" 
                     :key="activity.id" 
                     class="group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 transform hover:scale-105"
                     :style="{ animationDelay: `${index * 100}ms` }">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center transform group-hover/activity:rotate-12 group-hover/activity:scale-110 transition-all duration-300" 
                         :class="activity.iconColor">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white truncate">{{ activity.title }}</p>
                    <p class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">{{ activity.time }}</p>
                  </div>
                  <div class="opacity-0 group-hover/activity:opacity-100 transition-opacity duration-300">
                    <svg class="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LazyLoadComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loadComponentSafely } from '../../utils/import-helper'
import { useVocabularyStore } from '../../composables/useVocabularyStore'
import { getRelativeTime } from '../../utils/dateUtils'
// Sử dụng defineAsyncComponent để import components an toàn
const LazyLoadComponent = defineAsyncComponent(
  loadComponentSafely(() => import('../../components/LazyLoadComponent.vue'))
)
const DashboardHeader = defineAsyncComponent(
  loadComponentSafely(() => import('./components/DashboardHeader.vue'))
)
const DashboardStats = defineAsyncComponent(
  loadComponentSafely(() => import('./components/DashboardStats.vue'))
)

const router = useRouter()
const { t } = useI18n()
const vocabularyStore = useVocabularyStore()



// Computed stats data based on real vocabulary data
const stats = computed(() => {
  const allVocabs = vocabularyStore.allVocabularies.value
  const favoriteCount = vocabularyStore.favoriteVocabularies.value.length
  const categories = vocabularyStore.getCategories.value.length
  
  // Calculate learning streak (simplified)
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const todayVocabs = allVocabs.filter(v => 
    v.createdAt && v.createdAt.split('T')[0] === todayStr
  ).length
  
  return {
    vocabularyLearned: allVocabs.length,
    grammarLessons: categories, // Use categories count as grammar lessons
    currentStreak: Math.max(1, todayVocabs), // At least 1 if there are vocabularies
    totalTime: favoriteCount * 5 // Estimate 5 minutes per favorite vocabulary
  }
})

// Recent activities based on actual vocabulary data
const recentActivities = computed(() => {
  const allVocabs = vocabularyStore.allVocabularies.value
  const activities: Array<{
    id: number
    title: string
    time: string
    iconColor: string
  }> = []
  
  // Get recent vocabularies (sorted by creation/update time)
  const recentVocabs = [...allVocabs]
    .sort((a, b) => {
      const aTime = a.updatedAt || a.createdAt || ''
      const bTime = b.updatedAt || b.createdAt || ''
      return new Date(bTime).getTime() - new Date(aTime).getTime()
    })
    .slice(0, 4)
  
  recentVocabs.forEach((vocab, index) => {
    const isUpdated = vocab.updatedAt && vocab.updatedAt !== vocab.createdAt
    const timeStr = vocab.updatedAt || vocab.createdAt || ''
    
    const categoryTranslated = t(`categories.${vocab.category}`, vocab.category)
    
    activities.push({
      id: index + 1,
      title: isUpdated 
        ? t('dashboard.activity.updated', { word: vocab.word, category: categoryTranslated }, `Updated '${vocab.word}' in ${categoryTranslated}`)
        : t('dashboard.activity.added', { word: vocab.word, category: categoryTranslated }, `Added '${vocab.word}' to ${categoryTranslated}`),
      time: timeStr ? getRelativeTime(timeStr, t) : t('dashboard.activity.justNow', 'Just now'),
      iconColor: isUpdated ? 'bg-blue-500' : 'bg-green-500'
    })
  })
  
  // Add practice activity if no vocabulary activities (fallback)
  if (activities.length === 0) {
    activities.push({
      id: 1,
      title: t('dashboard.activity.noActivity', 'No recent activity'),
      time: t('dashboard.activity.addFirstVocab', 'Add your first vocabulary to get started!'),
      iconColor: 'bg-gray-500'
    })
  }
  
  return activities
})

const navigateTo = (path: string) => {
  router.push(path)
}

onMounted(() => {
  // Initialize vocabulary store
  vocabularyStore.initializeStore()
  console.log('Dashboard mounted with real data')
})
</script>
