<template>
  <div>
    <!-- Header -->
    <LazyLoadComponent animation-type="fade-up">
      <DashboardHeader />
    </LazyLoadComponent>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <!-- Stats Overview -->
      <LazyLoadComponent animation-type="slide-up" :threshold="0.2">
        <DashboardStats :stats="stats" class="mb-8" />
      </LazyLoadComponent>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <LazyLoadComponent animation-type="slide-left" :threshold="0.15">
          <div class="bg-white dark:bg-dark-bg-soft shadow rounded-lg border border-gray-200 dark:border-gray-800">
            <div class="px-4 py-8 sm:px-4 sm:py-5 sm:p-6 2xl:py-[29.5px]">
              <h3 class="text-base sm:text-lg leading-6 font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">{{ t('dashboard.quickActions', 'Quick Actions') }}</h3>
              <div class="grid grid-cols-2 gap-4">
                <button @click="navigateTo('/vocabulary/add')" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg transition-colors">
                  <div class="text-center">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-xs sm:text-sm">{{ t('dashboard.actions.addVocabulary', 'Add Vocabulary') }}</span>
                  </div>
                </button>
                
                <button @click="navigateTo('/practice/flashcard')" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg transition-colors">
                  <div class="text-center">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                    </svg>
                    <span class="text-xs sm:text-sm">{{ t('dashboard.actions.practiceFlashcard', 'Practice Flashcard') }}</span>
                  </div>
                </button>
                
                <button @click="navigateTo('/practice/quiz')" class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg transition-colors">
                  <div class="text-center">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-xs sm:text-sm">{{ t('dashboard.actions.takeQuiz', 'Take a Quiz') }}</span>
                  </div>
                </button>
                
                <button @click="navigateTo('/grammar')" class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg transition-colors">
                  <div class="text-center">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                    </svg>
                    <span class="text-xs sm:text-sm">{{ t('dashboard.actions.learnGrammar', 'Learn Grammar') }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </LazyLoadComponent>

        <!-- Recent Activity -->
        <LazyLoadComponent animation-type="slide-right" :threshold="0.15">
          <div class="bg-white dark:bg-dark-bg-soft shadow rounded-lg border border-gray-200 dark:border-gray-800">
            <div class="px-4 py-4 sm:px-4 sm:py-5 sm:p-6">
              <h3 class="text-base sm:text-lg leading-6 font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">{{ t('dashboard.recentActivity', 'Recent Activity') }}</h3>
              <div class="space-y-2 sm:space-y-3">
                <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-2 sm:space-x-3">
                  <div class="flex-shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" :class="activity.iconColor">
                      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">{{ activity.title }}</p>
                    <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
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

// Helper function to format relative time
const formatRelativeTime = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`
  } else if (diffInDays === 1) {
    return '1 ngày trước'
  } else {
    return `${diffInDays} ngày trước`
  }
}

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
      time: timeStr ? formatRelativeTime(timeStr) : t('dashboard.activity.justNow', 'Just now'),
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
