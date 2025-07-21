<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900">
    <!-- Header -->
    <FlashcardHeader
      :current-index="currentIndex"
      :total-cards="currentFlashcards.length"
      :practice-mode="practiceMode"
      :shuffle-enabled="shuffleEnabled"
      @go-back="goBack"
      @show-history="showHistory = true"
      @change-practice-mode="changePracticeMode"
      @show-settings="showSettingsDialog = true"
      @toggle-shuffle="toggleShuffle"
    />

    <!-- Progress Bar -->
    <FlashcardProgress :progress-percentage="currentProgressPercentage" />

    <!-- Voice Settings -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <VoiceSelector :show-voice-info="false" />
      </div>
    </div>

    <!-- Date Filter -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <FlashcardDateFilter
          :vocabularies="allVocabularies"
          :enabled="dateFilterEnabled"
          :selectedDate="selectedDate"
          @update:enabled="dateFilterEnabled = $event"
          @update:selectedDate="selectedDate = $event"
        />
      </div>
    </div>

    <!-- Practice Container -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="currentFlashcards.length > 0" class="relative">
        
        <!-- Practice Timer -->
        <PracticeTimer
          ref="practiceTimerRef"
          :max-time="30"
          @start="handlePracticeStart"
          @timeout="handleTimeout"
          @restart="handleTimerRestart"
          @skip="handleSkip"
        />

        <!-- Practice Content (only show after started) -->
        <div v-if="practiceStarted">
          <!-- Flashcard Mode -->
          <FlashcardCard
            v-if="practiceMode === 'flashcard'"
            :current-card="currentShuffledCard"
            :is-flipped="isFlipped"
            @flip-card="flipCard"
          />

          <!-- Quiz Mode -->
          <FlashcardQuiz
            v-else-if="practiceMode === 'quiz'"
            :current-card="currentShuffledCard"
            :quiz-options="quizOptions"
            :selected-answer="selectedAnswer"
            :quiz-answered="quizAnswered"
            @select-answer="handleQuizAnswer"
          />

          <!-- Typing Mode -->
          <FlashcardTyping
            v-else-if="practiceMode === 'typing'"
            :current-card="currentShuffledCard"
            :typing-answer="typingAnswer"
            :typing-answered="typingAnswered"
            :typing-correct="typingCorrect"
            @update:typing-answer="typingAnswer = $event"
            @check-answer="handleTypingAnswer"
          />

          <!-- Image Mode -->
          <FlashcardImage
            v-else-if="practiceMode === 'image'"
            :current-card="currentShuffledCard"
            :image-answer="imageAnswer"
            :image-answered="imageAnswered"
            :image-correct="imageCorrect"
            @update:image-answer="imageAnswer = $event"
            @check-answer="handleImageAnswer"
          />

          <!-- Listening Mode -->
          <div v-else-if="practiceMode === 'listening'" class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 h-96">
          <div class="text-center h-full flex flex-col justify-center">
            <div class="mb-6">
              <span class="px-3 py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                {{ currentShuffledCard?.category ? getTopicName(currentShuffledCard.category) : '' }}
              </span>
            </div>
            <div class="mb-8">
              <button
                @click="playAudio"
                class="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-full transition-colors"
              >
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zm-2 6a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">{{ $t('flashcard.listening.instruction') }}</p>

            <div class="max-w-md mx-auto">
              <input
                v-model="listeningAnswer"
                @keyup.enter="handleListeningAnswer"
                type="text"
                :disabled="listeningAnswered"
                class="w-full p-4 text-center text-xl border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                :placeholder="$t('flashcard.listening.placeholder')"
              />
              <div v-if="listeningAnswered" class="mt-4">
                <p v-if="listeningCorrect" class="text-green-600 dark:text-green-400 font-medium">{{ $t('flashcard.listening.correct') }}</p>
                <p v-else class="text-red-600 dark:text-red-400 font-medium">{{ $t('flashcard.listening.incorrect') }} {{ currentShuffledCard?.word }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ currentShuffledCard?.meaning }}</p>
              </div>
            </div>
          </div>
        </div>

          <!-- Controls -->
          <FlashcardControls
          :practice-mode="practiceMode"
          :current-index="currentIndex"
          :total-cards="currentFlashcards.length"
          :can-proceed="getCanProceed()[practiceMode]"
          :practice-started="practiceStarted"
          :typing-answer="typingAnswer"
          :typing-answered="typingAnswered"
          :listening-answer="listeningAnswer"
          :listening-answered="listeningAnswered"
          :image-answer="imageAnswer"
          :image-answered="imageAnswered"
          @mark-difficult="enhancedMarkDifficult"
          @mark-easy="enhancedMarkEasy"
          @previous-card="enhancedPreviousCard"
          @next-card="enhancedNextCard"
          @check-typing-answer="handleTypingAnswer"
          @check-listening-answer="handleListeningAnswer"
          @check-image-answer="handleImageAnswer"
          @exit-practice="handleExitPractice"
        />

          <!-- Stats -->
          <div v-if="practiceMode === 'flashcard'" class="grid grid-cols-3 gap-4 mt-8">
            <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.easy }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ $t('common.easy') }}</p>
            </div>
            <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.reviewed }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ $t('common.reviewed') }}</p>
            </div>
            <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
              <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.difficult }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ $t('common.difficult') }}</p>
            </div>
          </div>

          <!-- Practice Stats -->
          <div v-else class="grid grid-cols-2 gap-4 mt-8">
            <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.correct }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ $t('common.correct') }}</p>
            </div>
            <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
              <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.incorrect }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ $t('common.incorrect') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('flashcard.empty.title') }}</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ $t('flashcard.empty.description') }}</p>
        <div class="mt-6">
          <button @click="goToVocabulary" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            {{ $t('flashcard.empty.action') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Settings Modal -->
    <div v-if="showSettingsDialog" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-[#0a0a0a] dark:border-gray-800">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">{{ $t('flashcard.settings.title') }}</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('flashcard.settings.category') }}</label>
              <select v-model="settings.category" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
                <option value="">{{ $t('flashcard.settings.all') }}</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('flashcard.settings.level') }}</label>
              <select v-model="settings.level" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
                <option value="">{{ $t('flashcard.settings.all') }}</option>
                <option value="beginner">{{ $t('flashcard.settings.beginner') }}</option>
                <option value="intermediate">{{ $t('flashcard.settings.intermediate') }}</option>
                <option value="advanced">{{ $t('flashcard.settings.advanced') }}</option>
              </select>
            </div>
            
            <div>
              <label class="flex items-center">
                <input type="checkbox" v-model="localSettings.autoFlip" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ $t('flashcard.settings.autoFlip') }}</span>
              </label>
            </div>
            
            <div>
              <label class="flex items-center">
                <input type="checkbox" v-model="localSettings.shuffleCards" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ $t('flashcard.settings.shuffle') }}</span>
              </label>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button @click="cancelSettings" class="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
              {{ $t('common.cancel') }}
            </button>
            <button @click="applyGameSettings" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              {{ $t('common.apply') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- History Modal -->
    <div v-if="showHistory" class="modal-overlay fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center h-full w-full z-50">
      <div class="relative mx-auto p-5 border w-full max-w-4xl max-h-[80vh] shadow-lg rounded-md bg-white dark:bg-[#0a0a0a] dark:border-gray-800 flex flex-col">
        <div class="flex justify-between items-center mb-4 flex-shrink-0">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ $t('flashcard.history.title') }}</h3>
          <button @click="showHistory = false" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div v-if="practiceHistory.length === 0" class="text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('flashcard.history.empty.title') }}</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ $t('flashcard.history.empty.description') }}</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="session in practiceHistory" :key="session.id" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getModeColor(session.mode)">
                      {{ getModeText(session.mode) }}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(session.date) }}</span>
                  </div>

                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span class="text-gray-500 dark:text-gray-400">{{ $t('flashcard.history.totalCards') }}:</span>
                      <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ session.totalCards }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500 dark:text-gray-400">{{ $t('flashcard.history.correct') }}:</span>
                      <span class="ml-1 font-medium text-green-600 dark:text-green-400">{{ session.correctAnswers }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500 dark:text-gray-400">{{ $t('flashcard.history.incorrect') }}:</span>
                      <span class="ml-1 font-medium text-red-600 dark:text-red-400">{{ session.incorrectAnswers }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500 dark:text-gray-400">{{ $t('flashcard.history.duration') }}:</span>
                      <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ formatDuration(session.duration) }}</span>
                    </div>
                  </div>

                  <div class="mt-2">
                    <span class="text-gray-500 dark:text-gray-400 text-sm">{{ $t('flashcard.history.categories') }}:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span v-for="category in session.categories" :key="category" class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                        {{ category }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="text-right">
                  <div class="text-lg font-bold text-gray-900 dark:text-white">
                    {{ Math.round((session.correctAnswers / session.totalCards) * 100) }}%
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">{{ $t('flashcard.history.accuracy') }}</div>
                  <div class="mt-1">
                    <span 
                      class="text-xs font-medium px-2 py-0.5 rounded-full" 
                      :class="Math.round((session.correctAnswers / session.totalCards) * 100) >= 70 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
                    >
                      {{ Math.round((session.correctAnswers / session.totalCards) * 100) >= 70 ? $t('flashcard.history.pass') : $t('flashcard.history.fail') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Completion Modal -->
    <div v-if="showCompletionModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-[#0a0a0a] dark:border-gray-800">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-gray-800">
            <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-4">{{ $t('flashcard.completion.title') }}</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('flashcard.completion.description', { count: flashcards.length }) }}</p>
            <div class="mt-4 text-left">
              <p class="text-sm"><span class="font-medium text-green-600 dark:text-green-400">{{ $t('flashcard.completion.correct') }}:</span> {{ stats.correct }}</p>
              <p class="text-sm"><span class="font-medium text-red-600 dark:text-red-400">{{ $t('flashcard.completion.incorrect') }}:</span> {{ stats.incorrect }}</p>
              <p class="text-sm"><span class="font-medium text-gray-600 dark:text-gray-400">{{ $t('flashcard.completion.accuracy') }}:</span> {{ (stats.correct + stats.incorrect) > 0 ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) : 0 }}%</p>
              <p class="text-sm mt-2">
                <span class="font-medium">{{ $t('flashcard.completion.result') }}:</span>
                <span 
                  class="ml-1 px-2 py-0.5 text-xs font-medium rounded-full" 
                  :class="(stats.correct + stats.incorrect) > 0 && Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) >= 70 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
                >
                  {{ (stats.correct + stats.incorrect) > 0 && Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) >= 70 ? $t('flashcard.history.pass') : $t('flashcard.history.fail') }}
                </span>
              </p>
            </div>
          </div>
          <div class="items-center px-4 py-3 space-y-2">
            <button @click="restartSession" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600">
              {{ $t('common.restart') }}
            </button>
            <button @click="goBack" class="px-4 py-2 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 dark:hover:bg-gray-700">
              {{ $t('common.back') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Exit Warning Modal -->
    <div v-if="showExitWarning" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center">
        <div class="text-orange-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ t('practice.exitWarning.title') }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ t('practice.exitWarning.message') }}
        </p>
        <div class="flex gap-3">
          <button
            @click="continueSession"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {{ t('practice.exitWarning.continue') }}
          </button>
          <button
            @click="confirmExit"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {{ t('practice.exitWarning.exit') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVocabularyStore } from '../../composables/useVocabularyStore'
import type { Vocabulary } from '../../composables/useVocabularyStore'
import { getDateKey } from '../../utils/dateUtils'

// Initialize i18n
const { t } = useI18n()
const router = useRouter()

// Component imports using defineAsyncComponent
const FlashcardHeader = defineAsyncComponent(() => import('./components/FlashcardHeader.vue'))
const FlashcardProgress = defineAsyncComponent(() => import('./components/FlashcardProgress.vue'))
const FlashcardDateFilter = defineAsyncComponent(() => import('./components/FlashcardDateFilter.vue'))
const FlashcardCard = defineAsyncComponent(() => import('./components/FlashcardCard.vue'))
const FlashcardQuiz = defineAsyncComponent(() => import('./components/FlashcardQuiz.vue'))
const FlashcardTyping = defineAsyncComponent(() => import('./components/FlashcardTyping.vue'))
const FlashcardImage = defineAsyncComponent(() => import('./components/FlashcardImage.vue'))
const FlashcardControls = defineAsyncComponent(() => import('./components/FlashcardControls.vue'))
const PracticeTimer = defineAsyncComponent(() => import('./components/PracticeTimer.vue'))
const VoiceSelector = defineAsyncComponent(() => import('../../components/VoiceSelector.vue'))

// Composables
import { useFlashcardGame } from './composables/useFlashcardGame'
import { useFlashcardModes } from './composables/useFlashcardModes'
import { useFlashcardHistory } from './composables/useFlashcardHistory'
import { useFlashcardSettings } from './composables/useFlashcardSettings'
import { useFlashcardStats } from './composables/useFlashcardStats'
import { getTopicName } from '../../utils/topicUtils'

// Vocabulary store
const { allVocabularies } = useVocabularyStore()

// Date filter state with localStorage persistence
const STORAGE_KEY = 'flashcard-date-filter'

// Load date filter state from localStorage
const loadDateFilterState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        enabled: parsed.enabled || false,
        selectedDate: parsed.selectedDate || ''
      }
    }
  } catch (error) {
    console.error('Error loading date filter state:', error)
  }
  return { enabled: false, selectedDate: '' }
}

// Save date filter state to localStorage
const saveDateFilterState = () => {
  try {
    const state = {
      enabled: dateFilterEnabled.value,
      selectedDate: selectedDate.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving date filter state:', error)
  }
}

// Initialize state from localStorage
const initialState = loadDateFilterState()
const dateFilterEnabled = ref(initialState.enabled)
const selectedDate = ref(initialState.selectedDate)

// Filter flashcards by date if date filter is enabled
const filteredVocabularies = computed(() => {
  if (!dateFilterEnabled.value || !selectedDate.value) {
    return allVocabularies.value
  }
  
  return allVocabularies.value.filter((vocab: Vocabulary) => {
    const vocabDateKey = getDateKey(vocab.createdAt)
    return vocabDateKey === selectedDate.value
  })
})

// Practice Timer State
const practiceStarted = ref(false)
const practiceTimerRef = ref()

// Exit Warning State
const showExitWarning = ref(false)
const allowExit = ref(false)

// Modal states (showSettingsDialog and showHistory are imported from composables)

// Timer Event Handlers
const handlePracticeStart = () => {
  practiceStarted.value = true
  console.log('Practice started!')
}

const handleExitPractice = () => {
  if (practiceStarted.value && !allowExit.value) {
    showExitWarning.value = true
  } else {
    goBack()
  }
}

const handleTimeout = () => {
  console.log('Time out for current card!')
  // Timer modal will handle the UI
}

const handleTimerRestart = () => {
  console.log('Timer restarted for current card')
  // Card stays the same, timer restarts
}

const handleSkip = () => {
  console.log('Skip current card')
  // Move to next card
  enhancedNextCard()
}

// Exit Warning Handlers
const continueSession = () => {
  showExitWarning.value = false
}

const confirmExit = () => {
  allowExit.value = true
  showExitWarning.value = false
  // End the practice session
  practiceStarted.value = false
  // Remove navigation guard to allow exit
  removeNavigationGuard()
  // Navigate back or complete session
  goBack()
}

// Navigation guard to prevent leaving page during practice
let unregisterGuard: (() => void) | null = null

const setupNavigationGuard = () => {
  if (unregisterGuard) {
    unregisterGuard()
  }
  
  unregisterGuard = router.beforeEach((to, from, next) => {
    if (practiceStarted.value && !allowExit.value && from.path.includes('/practice/flashcard')) {
      showExitWarning.value = true
      // Prevent navigation temporarily
      return false
    }
    next()
  })
}

const removeNavigationGuard = () => {
  if (unregisterGuard) {
    unregisterGuard()
    unregisterGuard = null
  }
}

// Image Answer Handler
const handleImageAnswer = () => {
  checkImageAnswer()
  recordAnswer(imageCorrect.value)
}

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (practiceStarted.value && !allowExit.value) {
    event.preventDefault()
    event.returnValue = ''
    return ''
  }
}

// Main game composable - pass filtered vocabularies
const {
  currentIndex,
  isFlipped,
  practiceMode,
  showSettings,
  showCompletionModal,
  isCompleted,
  settings,
  stats,
  flashcards,
  currentCard,
  progressPercentage,
  nextCard,
  previousCard,
  flipCard,
  resetCurrentCard,
  completeSession,
  restartSession,
  changePracticeMode,
  applySettings,
  goBack,
  goToVocabulary,
  markEasy,
  markDifficult,
  cleanup
} = useFlashcardGame()

// Combine filter and shuffle logic
const baseFlashcards = computed(() => filteredVocabularies.value)

// Get current flashcards (filtered + shuffled if enabled)
const currentFlashcards = computed(() => {
  if (flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length > 0) {
    return shuffledFlashcards.value
  }
  return baseFlashcards.value
})

// Current card (works with both filtered and shuffled)
const currentShuffledCard = computed(() => {
  if (currentFlashcards.value.length === 0) return null
  return currentFlashcards.value[currentIndex.value]
})

// Progress (works with current flashcards)
const currentProgressPercentage = computed(() => {
  if (currentFlashcards.value.length === 0) return 0
  if (typeof currentIndex.value !== 'number' || isNaN(currentIndex.value)) return 0
  if (currentIndex.value >= currentFlashcards.value.length) return 100
  return ((currentIndex.value + 1) / currentFlashcards.value.length) * 100
})

// Shuffle functionality
const shuffleEnabled = computed(() => flashcardSettings.value.shuffleCards)
const shuffledFlashcards = ref<any[]>([])

const toggleShuffle = () => {
  // Update settings through the settings composable to ensure localStorage persistence
  flashcardSettings.value.shuffleCards = !flashcardSettings.value.shuffleCards
  
  // If shuffle is enabled, create shuffled array
  if (flashcardSettings.value.shuffleCards) {
    shuffleFlashcards()
  } else {
    // Clear shuffled array when shuffle is disabled
    shuffledFlashcards.value = []
  }
  
  // Reset to first card after shuffle
  currentIndex.value = 0
  resetCurrentCardWithModes()
}

const shuffleFlashcards = (cards = baseFlashcards.value) => {
  // Fisher-Yates shuffle algorithm - use filtered flashcards
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  shuffledFlashcards.value = shuffled
}

// Modes composable
const {
  quizOptions,
  selectedAnswer,
  quizAnswered,
  generateQuizOptions,
  selectQuizAnswer,
  resetQuizMode,
  typingAnswer,
  typingAnswered,
  typingCorrect,
  checkTypingAnswer,
  resetTypingMode,
  listeningAnswer,
  listeningAnswered,
  listeningCorrect,
  checkListeningAnswer,
  playAudio,
  resetListeningMode,
  imageAnswer,
  imageAnswered,
  imageCorrect,
  checkImageAnswer,
  resetImageMode,
  resetAllModes,
  getCanProceed,
  getShortMeaning
} = useFlashcardModes(currentShuffledCard, currentFlashcards)

// History composable
const {
  showHistory,
  practiceHistory,
  saveSessionToHistory,
  getModeColor,
  getModeText,
  formatDate,
  formatDuration
} = useFlashcardHistory()

// Settings composable  
const {
  showSettings: showSettingsDialog,
  settings: flashcardSettings,
  localSettings,
  applySettings: applyGameSettings,
  resetSettings,
  cancelSettings,
  openSettings
} = useFlashcardSettings()

// Stats composable
const {
  sessionStats,
  initializeStats,
  recordAnswer,
  nextCard: nextCardStats,
  getDetailedStats
} = useFlashcardStats(stats)

// Synchronize settings
watch(flashcardSettings, (newSettings) => {
  settings.value = newSettings
}, { deep: true })

// Initialize stats when starting
watch(flashcards, (newFlashcards) => {
  if (newFlashcards.length > 0) {
    initializeStats(newFlashcards.length)
  }
}, { immediate: true })

// Watch for filter changes and update flashcards (after flashcardSettings is initialized)
watch(baseFlashcards, (newFlashcards) => {
  // Reset current index when filter changes
  currentIndex.value = 0
  
  // If shuffle is enabled, shuffle the new filtered cards
  if (flashcardSettings.value.shuffleCards) {
    shuffleFlashcards(newFlashcards)
  } else {
    shuffledFlashcards.value = []
  }
}, { immediate: true })

// Ensure currentIndex is valid for currentFlashcards
watch(currentFlashcards, (newFlashcards) => {
  if (newFlashcards.length === 0) {
    currentIndex.value = 0
  } else if (currentIndex.value >= newFlashcards.length) {
    currentIndex.value = Math.max(0, newFlashcards.length - 1)
  }
}, { immediate: true })

// Override resetCurrentCard to use modes composable
const handleQuizAnswer = (answer: string) => {
  const isCorrect = selectQuizAnswer(answer)
  recordAnswer(isCorrect)
}

const handleTypingAnswer = () => {
  checkTypingAnswer()
  recordAnswer(typingCorrect.value)
}

const handleListeningAnswer = () => {
  checkListeningAnswer()
  recordAnswer(listeningCorrect.value)
}

// Override resetCurrentCard to use modes composable
const resetCurrentCardWithModes = () => {
  resetCurrentCard()
  resetQuizMode()
  resetTypingMode()
  resetListeningMode()
  resetImageMode()  // Fix: Reset image mode state when moving to next card
  
  // Generate quiz options after reset if in quiz mode
  if (practiceMode.value === 'quiz') {
    generateQuizOptions()
  }
}

// Override navigation functions to work with shuffled cards
const enhancedNextCard = () => {
  if (currentIndex.value < currentFlashcards.value.length - 1) {
    currentIndex.value++
    resetCurrentCardWithModes()
    // Reset timer for next card if practice started
    if (practiceStarted.value && practiceTimerRef.value) {
      practiceTimerRef.value.nextCard()
    }
  } else {
    handleSessionComplete()
  }
}

const enhancedPreviousCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    resetCurrentCardWithModes()
    // Reset timer for previous card if practice started
    if (practiceStarted.value && practiceTimerRef.value) {
      practiceTimerRef.value.nextCard()
    }
  }
}

const enhancedMarkEasy = () => {
  recordAnswer(true)
  nextCardStats()
  enhancedNextCard()
}

const enhancedMarkDifficult = () => {
  recordAnswer(false)
  nextCardStats()
  enhancedNextCard()
}

// Enhanced completion handling
const handleSessionComplete = () => {
  completeSession()
  const totalCards = currentFlashcards.value.length
  saveSessionToHistory(stats.value, totalCards)
}

// Auto flip functionality
let autoFlipTimer: number | null = null

watch([currentIndex, isFlipped], () => {
  if (autoFlipTimer) {
    clearTimeout(autoFlipTimer)
  }
  
  if (flashcardSettings.value.autoFlip && !isFlipped.value) {
    autoFlipTimer = setTimeout(() => {
      isFlipped.value = true
    }, 3000) as unknown as number
  }
})

// Watch for practice mode changes
watch(practiceMode, () => {
  resetCurrentCardWithModes()
})

watch(currentIndex, () => {
  resetCurrentCardWithModes()
})

// Save session to history when completed
watch(showCompletionModal, (newValue) => {
  if (newValue) {
    saveSessionToHistory(stats.value, currentFlashcards.value.length)
  }
})

// Prevent body scroll when modal is open
watch(showHistory, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

// Watch date filter state changes and save to localStorage
watch(dateFilterEnabled, () => {
  saveDateFilterState()
})

watch(selectedDate, () => {
  saveDateFilterState()
})

// Watch baseFlashcards changes and re-shuffle if shuffle is enabled
watch(baseFlashcards, (newCards) => {
  // If shuffle is enabled and we have cards, re-shuffle them
  if (flashcardSettings.value.shuffleCards && newCards.length > 0) {
    shuffleFlashcards(newCards)
    // Reset to first card after re-shuffle
    currentIndex.value = 0
    resetCurrentCardWithModes()
  }
  // If no cards and shuffle was enabled, clear shuffled array
  else if (flashcardSettings.value.shuffleCards && newCards.length === 0) {
    shuffledFlashcards.value = []
    currentIndex.value = 0
  }
}, { immediate: false })

// Initialize on mount
onMounted(() => {
  console.log('FlashcardView mounted')
  
  // Initialize stats
  initializeStats(currentFlashcards.value.length)
  
  // Initialize quiz options if in quiz mode
  if (practiceMode.value === 'quiz') {
    generateQuizOptions()
  }
  
  // Initialize shuffle if enabled
  if (flashcardSettings.value.shuffleCards) {
    shuffleFlashcards()
  }
  
  // Setup navigation guard for exit warning
  setupNavigationGuard()
  window.addEventListener('beforeunload', handleBeforeUnload)
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.classList.remove('modal-open')
  cleanup()
  
  // Remove navigation guard and event listeners
  removeNavigationGuard()
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.flashcard {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flashcard.flipped {
  transform: rotateY(180deg);
}

.flashcard-face {
  backface-visibility: hidden;
}

.flashcard-back {
  transform: rotateY(180deg);
}
</style>

<style>
/* Global styles for modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  overflow: hidden;
}

body.modal-open {
  overflow: hidden !important;
}
</style>
