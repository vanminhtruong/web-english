<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
    <!-- Header -->
    <div class="bg-white dark:bg-[#0a0a0a] shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button
              @click="goBackToGrammarDetail"
              class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ t('grammar.practice.title') }}
              </h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ t('grammar.practice.subtitle') }}
              </p>
            </div>
          </div>
          
          <!-- Settings and Progress -->
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ t('grammar.practice.score') }}: <span class="font-medium text-blue-600 dark:text-blue-400">{{ totalScore }}</span>
            </div>
            
            <!-- Exercise Management Button -->
            <button
              @click="showExerciseManager = true"
              class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :title="t('grammar.practice.exerciseManager.title')"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>
            
            <!-- Settings Button -->
            <button
              @click="showSettings = true"
              class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :title="t('grammar.practice.settings.title')"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Exercise Type Selection -->
      <div v-if="!selectedExercise" class="space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('grammar.practice.chooseExercise') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            {{ t('grammar.practice.chooseDescription') }}
          </p>
        </div>

        <!-- Exercise Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="exercise in exerciseTypes"
            :key="exercise.type"
            @click="startExercise(exercise.type)"
            class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200 group"
          >
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" :class="exercise.colorClass">
                <component :is="exercise.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ t(`grammar.practice.exercises.${exercise.type}.title`) }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ t(`grammar.practice.exercises.${exercise.type}.description`) }}
              </p>
              <div class="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{{ exercise.duration }}</span>
                <span>•</span>
                <span>{{ exercise.difficulty }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Exercise Content -->
      <div v-else class="space-y-6">
        <!-- Exercise Header -->
        <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button
                @click="goBackToSelection"
                class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ t(`grammar.practice.exercises.${selectedExercise}.title`) }}
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ t('grammar.practice.question') }} {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}
                </p>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="flex items-center space-x-4">
              <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ Math.round((currentQuestionIndex / totalQuestions) * 100) }}%
              </span>
            </div>
          </div>
        </div>

        <!-- Exercise Component -->
        <component 
          :is="currentExerciseComponent"
          :question="currentQuestion"
          :question-index="currentQuestionIndex"
          :total-questions="totalQuestions"
          @answer="handleAnswer"
          @next="nextQuestion"
          @complete="completeExercise"
        />
      </div>
    </div>

    <!-- Settings Modal -->
    <div v-if="showSettings" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ t('grammar.practice.settings.title') }}
          </h3>
          <button
            @click="showSettings = false"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <!-- Difficulty Level -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('grammar.practice.settings.difficulty') }}
            </label>
            <select 
              v-model="settings.difficulty"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="easy">{{ t('grammar.practice.settings.levels.easy') }}</option>
              <option value="medium">{{ t('grammar.practice.settings.levels.medium') }}</option>
              <option value="hard">{{ t('grammar.practice.settings.levels.hard') }}</option>
            </select>
          </div>
          
          <!-- Auto-play Audio -->
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('grammar.practice.settings.autoPlay') }}
            </label>
            <button
              @click="settings.autoPlayAudio = !settings.autoPlayAudio"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                settings.autoPlayAudio ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  settings.autoPlayAudio ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
          
          <!-- Show Explanations -->
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('grammar.practice.settings.showExplanations') }}
            </label>
            <button
              @click="settings.showExplanations = !settings.showExplanations"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                settings.showExplanations ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              ]"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  settings.showExplanations ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
        </div>
        
        <div class="flex justify-end space-x-4 mt-6">
          <button
            @click="showSettings = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#0a0a0a] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {{ t('common.cancel') }}
          </button>
          <button
            @click="saveSettings"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {{ t('common.save') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Results Modal -->
    <div v-if="showResults" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-lg w-full mx-4">
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg class="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {{ t('grammar.practice.results.title') }}
          </h3>
          
          <div class="space-y-4 mb-6">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ exerciseResults.correct }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.results.correct') }}</div>
              </div>
              <div class="bg-red-50 dark:bg-red-900/30 rounded-lg p-4">
                <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ exerciseResults.incorrect }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.results.incorrect') }}</div>
              </div>
              <div class="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ exerciseResults.percentage }}%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.results.accuracy') }}</div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-center space-x-4">
            <button
              @click="restartExercise"
              class="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {{ t('grammar.practice.results.tryAgain') }}
            </button>
            <button
              @click="goBackToSelection"
              class="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {{ t('grammar.practice.results.chooseAnother') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Exercise Manager Component -->
    <ExerciseManager
      v-model="showExerciseManager"
      :exercise-types="exerciseTypes"
      @add-exercise="addExerciseType"
      @edit-exercise="editExerciseType"
      @delete-exercise="deleteExerciseType"
      @save-exercises="saveExerciseTypes"
      @open-question-manager="openQuestionManager"
    />

    <!-- Question Manager Modal -->
    <div v-if="showQuestionManager" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ t('grammar.practice.questionManager.title') }}: {{ t(`grammar.practice.exercises.${selectedExerciseTypeForQuestions}.title`) }}
          </h3>
          <button
            @click="closeQuestionManager"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Question Management -->
        <div class="space-y-6">
          <!-- Add New Question Form -->
          <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
              {{ editingQuestionIndex >= 0 ? t('grammar.practice.questionManager.editQuestion') : t('grammar.practice.questionManager.addNew') }}
            </h4>
            
            <!-- Writing Exercise Form -->
            <div v-if="selectedExerciseTypeForQuestions === 'writing'" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.practice.questionManager.taskType') }}
                  </label>
                  <select
                    v-model="newQuestion.taskType"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="essay">{{ t('grammar.practice.exercises.writing.essay') }}</option>
                    <option value="email">{{ t('grammar.practice.exercises.writing.email') }}</option>
                    <option value="letter">{{ t('grammar.practice.exercises.writing.letter') }}</option>
                    <option value="paragraph">{{ t('grammar.practice.exercises.writing.paragraph') }}</option>
                  </select>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {{ t('grammar.practice.questionManager.minWords') }}
                    </label>
                    <input
                      v-model.number="newQuestion.minWords"
                      type="number"
                      min="50"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {{ t('grammar.practice.questionManager.timeLimit') }}
                    </label>
                    <input
                      v-model.number="newQuestion.timeLimit"
                      type="number"
                      min="5"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('grammar.practice.questionManager.prompt') }}
                </label>
                <textarea
                  v-model="newQuestion.prompt"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="t('grammar.practice.questionManager.promptPlaceholder')"
                ></textarea>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ t('grammar.practice.questionManager.requirements') }}
                  </label>
                  <button
                    @click="addRequirement"
                    class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    + {{ t('grammar.practice.questionManager.addRequirement') }}
                  </button>
                </div>
                <div class="space-y-2">
                  <div 
                    v-for="(requirement, index) in newQuestion.requirements" 
                    :key="index"
                    class="flex items-center space-x-2"
                  >
                    <input
                      v-model="newQuestion.requirements[index]"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      :placeholder="t('grammar.practice.questionManager.requirementPlaceholder')"
                    >
                    <button
                      @click="removeRequirement(index)"
                      class="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                      :disabled="newQuestion.requirements.length === 1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Multiple Choice Form -->
            <div v-else-if="selectedExerciseTypeForQuestions === 'multiple-choice'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('grammar.practice.questionManager.question') }}
                </label>
                <textarea
                  v-model="newQuestion.question"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="t('grammar.practice.questionManager.questionPlaceholder')"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('grammar.practice.questionManager.options') }}
                </label>
                <div class="space-y-2">
                  <div v-for="(option, index) in newQuestion.options" :key="index" class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">{{ String.fromCharCode(65 + index) }}.</span>
                    <input
                      v-model="newQuestion.options[index]"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      :placeholder="t('grammar.practice.questionManager.optionPlaceholder')"
                    >
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('grammar.practice.questionManager.correctAnswer') }}
                </label>
                <select
                  v-model="newQuestion.correctAnswer"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option v-for="(option, index) in newQuestion.options" :key="index" :value="option">
                    {{ String.fromCharCode(65 + index) }}. {{ option }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('grammar.practice.questionManager.explanation') }}
                </label>
                <textarea
                  v-model="newQuestion.explanation"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="t('grammar.practice.questionManager.explanationPlaceholder')"
                ></textarea>
              </div>
            </div>
            
            <!-- Generic Form for other exercise types -->
            <div v-else class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('grammar.practice.questionManager.question') }}
                </label>
                <textarea
                  v-model="newQuestion.question"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="t('grammar.practice.questionManager.questionPlaceholder')"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('grammar.practice.questionManager.explanation') }}
                </label>
                <textarea
                  v-model="newQuestion.explanation"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="t('grammar.practice.questionManager.explanationPlaceholder')"
                ></textarea>
              </div>
            </div>
            
            <div class="flex justify-end mt-4">
              <button
                @click="addQuestion"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {{ editingQuestionIndex >= 0 ? t('common.update') : t('grammar.practice.questionManager.addQuestion') }}
              </button>
            </div>
          </div>
          
          <!-- Existing Questions List -->
          <div v-if="exerciseQuestions[selectedExerciseTypeForQuestions]?.length > 0">
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
              {{ t('grammar.practice.questionManager.existingQuestions') }} ({{ exerciseQuestions[selectedExerciseTypeForQuestions].length }})
            </h4>
            <div class="space-y-4 max-h-96 overflow-y-auto">
              <div
                v-for="(question, index) in exerciseQuestions[selectedExerciseTypeForQuestions]"
                :key="question.id"
                class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="mb-2">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        #{{ index + 1 }}
                      </span>
                      <span v-if="selectedExerciseTypeForQuestions === 'writing'" class="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {{ t(`grammar.practice.exercises.writing.${question.taskType}`) }}
                      </span>
                    </div>
                    <div class="text-sm text-gray-900 dark:text-white mb-2">
                      <strong>{{ selectedExerciseTypeForQuestions === 'writing' ? t('grammar.practice.questionManager.prompt') : t('grammar.practice.questionManager.question') }}:</strong>
                      <p class="mt-1">{{ selectedExerciseTypeForQuestions === 'writing' ? question.prompt : question.question }}</p>
                    </div>
                    <div v-if="selectedExerciseTypeForQuestions === 'writing' && question.requirements?.length > 0" class="text-xs text-gray-600 dark:text-gray-400">
                      <strong>{{ t('grammar.practice.questionManager.requirements') }}:</strong>
                      <ul class="list-disc list-inside mt-1">
                        <li v-for="req in question.requirements" :key="req">{{ req }}</li>
                      </ul>
                    </div>
                    <div v-if="selectedExerciseTypeForQuestions === 'multiple-choice' && question.options" class="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      <strong>{{ t('grammar.practice.questionManager.correctAnswer') }}:</strong> {{ question.correctAnswer }}
                    </div>
                  </div>
                  <div class="flex items-center space-x-2 ml-4">
                    <button
                      @click="editQuestion(index)"
                      class="p-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      :title="t('common.edit')"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="deleteQuestion(index)"
                      class="p-1 rounded text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      :title="t('common.delete')"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- No Questions Message -->
          <div v-else class="text-center py-8">
            <div class="text-gray-500 dark:text-gray-400">
              <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>{{ t('grammar.practice.questionManager.noQuestions') }}</p>
              <p class="text-sm mt-1">{{ t('grammar.practice.questionManager.addFirstQuestion') }}</p>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-4 mt-6">
          <button
            @click="closeQuestionManager"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#0a0a0a] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {{ t('common.close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, defineAsyncComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useVoiceStore } from '../../stores/voiceStore'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { playAudio } = useVoiceStore()

// Exercise Components (lazy loaded)
const MultipleChoiceExercise = defineAsyncComponent(() => import('./components/MultipleChoiceExercise.vue'))
const FillBlankExercise = defineAsyncComponent(() => import('./components/FillBlankExercise.vue'))
const PronunciationExercise = defineAsyncComponent(() => import('./components/PronunciationExercise.vue'))
const ReadingExercise = defineAsyncComponent(() => import('./components/ReadingExercise.vue'))
const ListeningExercise = defineAsyncComponent(() => import('./components/ListeningExercise.vue'))
const WritingExercise = defineAsyncComponent(() => import('./components/WritingExercise.vue'))
const ExerciseManager = defineAsyncComponent(() => import('./components/ExerciseManager.vue'))

// Icons for exercises
const BookOpenIcon = () => h('svg', { class: 'w-8 h-8 text-white', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
])

const PencilIcon = () => h('svg', { class: 'w-8 h-8 text-white', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' })
])

const SpeakerWaveIcon = () => h('svg', { class: 'w-8 h-8 text-white', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.71-1.59-1.59V9.84c0-.88.71-1.59 1.59-1.59h2.24z' })
])

const MicrophoneIcon = () => h('svg', { class: 'w-8 h-8 text-white', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8' })
])

const EyeIcon = () => h('svg', { class: 'w-8 h-8 text-white', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' })
])

const EditIcon = () => h('svg', { class: 'w-8 h-8 text-white', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' })
])

// State
const grammarId = computed(() => route.params.id as string)
const selectedExercise = ref<string | null>(null)
const currentQuestionIndex = ref(0)
const totalQuestions = ref(10)
const currentQuestion = ref(null)
const exerciseResults = ref({
  correct: 0,
  incorrect: 0,
  percentage: 0,
  answers: []
})
const showSettings = ref(false)
const showResults = ref(false)
const showExerciseManager = ref(false)
const totalScore = ref(0)

// Exercise Manager State
const newExercise = ref({
  type: '',
  title: '',
  description: '',
  difficulty: 'medium',
  duration: ''
})

// Question Management State
const exerciseQuestions = ref({})
const showQuestionManager = ref(false)
const selectedExerciseTypeForQuestions = ref('')
const newQuestion = ref({
  id: '',
  type: '',
  question: '',
  options: ['', '', '', ''],
  correctAnswer: '',
  explanation: '',
  // Writing specific fields
  taskType: 'essay',
  prompt: '',
  requirements: [''],
  minWords: 100,
  timeLimit: 20
})
const editingQuestionIndex = ref(-1)

// Settings
const settings = ref({
  difficulty: 'medium',
  autoPlayAudio: true,
  showExplanations: true
})

// Exercise types with metadata
const exerciseTypes = ref([
  {
    type: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'Choose the correct answer from multiple options',
    icon: BookOpenIcon,
    colorClass: 'bg-gray-500',
    duration: '10-15 min',
    difficulty: 'Easy'
  },
  {
    type: 'fill-blank',
    title: 'Fill in the Blanks',
    description: 'Complete sentences by filling in missing words',
    icon: PencilIcon,
    colorClass: 'bg-green-500',
    duration: '15-20 min',
    difficulty: 'Medium'
  },
  {
    type: 'pronunciation',
    title: 'Pronunciation Practice',
    description: 'Practice speaking and pronunciation skills',
    icon: MicrophoneIcon,
    colorClass: 'bg-purple-500',
    duration: '10-15 min',
    difficulty: 'Medium'
  },
  {
    type: 'reading',
    title: 'Reading Comprehension',
    description: 'Read passages and answer comprehension questions',
    icon: EyeIcon,
    colorClass: 'bg-orange-500',
    duration: '20-25 min',
    difficulty: 'Hard'
  },
  {
    type: 'listening',
    title: 'Listening Exercise',
    description: 'Listen to audio and answer related questions',
    icon: SpeakerWaveIcon,
    colorClass: 'bg-indigo-500',
    duration: '15-20 min',
    difficulty: 'Medium'
  },
  {
    type: 'writing',
    title: 'Writing Practice',
    description: 'Practice writing skills with various prompts',
    icon: EditIcon,
    colorClass: 'bg-red-500',
    duration: '25-30 min',
    difficulty: 'Hard'
  }
])

// Computed
const currentExerciseComponent = computed(() => {
  const componentMap = {
    'multiple-choice': MultipleChoiceExercise,
    'fill-blank': FillBlankExercise,
    'pronunciation': PronunciationExercise,
    'reading': ReadingExercise,
    'listening': ListeningExercise,
    'writing': WritingExercise
  }
  return componentMap[selectedExercise.value] || null
})

// Methods
const startExercise = (exerciseType: string) => {
  selectedExercise.value = exerciseType
  currentQuestionIndex.value = 0
  exerciseResults.value = {
    correct: 0,
    incorrect: 0,
    percentage: 0,
    answers: []
  }
  generateQuestions()
  
  // Update URL to include selected exercise
  const newQuery = { ...route.query, exercise: exerciseType }
  router.replace({ query: newQuery })
}

const generateQuestions = () => {
  // Get questions from localStorage or use default data
  const savedQuestions = exerciseQuestions.value[selectedExercise.value] || []
  
  if (savedQuestions.length > 0) {
    // Use saved questions
    const questionIndex = currentQuestionIndex.value % savedQuestions.length
    currentQuestion.value = savedQuestions[questionIndex]
  } else {
    // Use default mock data if no saved questions
    generateDefaultQuestions()
  }
}

const generateDefaultQuestions = () => {
  if (selectedExercise.value === 'writing') {
    // Default writing exercise data
    const writingTasks = [
      {
        id: 1,
        type: 'writing',
        taskType: 'essay',
        prompt: 'Write an essay about the importance of learning English in today\'s globalized world. Discuss how English proficiency can benefit individuals in their personal and professional lives.',
        requirements: [
          'Write at least 250 words',
          'Include an introduction, body paragraphs, and conclusion',
          'Use specific examples to support your points',
          'Demonstrate proper grammar and vocabulary usage'
        ],
        minWords: 250,
        timeLimit: 30
      },
      {
        id: 2,
        type: 'writing',
        taskType: 'email',
        prompt: 'Write a formal email to your manager requesting time off for a family vacation. Include the dates, reason, and any work arrangements you have made.',
        requirements: [
          'Use formal email format',
          'Include appropriate subject line',
          'Be polite and professional',
          'Provide all necessary details'
        ],
        minWords: 150,
        timeLimit: 20
      },
      {
        id: 3,
        type: 'writing',
        taskType: 'letter',
        prompt: 'Write a letter to a friend describing your recent trip to a new city. Share your experiences, what you liked most, and recommend places to visit.',
        requirements: [
          'Use informal, friendly tone',
          'Include specific details about places visited',
          'Share personal experiences and feelings',
          'Make recommendations'
        ],
        minWords: 200,
        timeLimit: 25
      }
    ]
    
    const taskIndex = currentQuestionIndex.value % writingTasks.length
    currentQuestion.value = writingTasks[taskIndex]
    
  } else if (selectedExercise.value === 'multiple-choice') {
    // Default multiple choice data
    const mcQuestions = [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Choose the correct form of the verb: "She _____ to the store yesterday."',
        options: ['go', 'goes', 'went', 'going'],
        correctAnswer: 'went',
        explanation: 'Past tense is used for actions completed in the past.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Which sentence is grammatically correct?',
        options: [
          'I have been living here since 5 years.',
          'I have been living here for 5 years.',
          'I am living here since 5 years.',
          'I live here since 5 years.'
        ],
        correctAnswer: 'I have been living here for 5 years.',
        explanation: 'Use "for" with duration and present perfect continuous for ongoing actions.'
      }
    ]
    
    const questionIndex = currentQuestionIndex.value % mcQuestions.length
    currentQuestion.value = mcQuestions[questionIndex]
    
  } else if (selectedExercise.value === 'fill-blank') {
    // Default fill in the blank data
    const fillBlankQuestions = [
      {
        id: 1,
        type: 'fill-blank',
        question: 'Complete the sentence: "I _____ been studying English _____ three years."',
        blanks: ['have', 'for'],
        sentence: 'I _____ been studying English _____ three years.',
        explanation: 'Present perfect continuous with "have" and duration with "for".'
      }
    ]
    
    const questionIndex = currentQuestionIndex.value % fillBlankQuestions.length
    currentQuestion.value = fillBlankQuestions[questionIndex]
    
  } else {
    // Default generic question for other exercise types
    currentQuestion.value = {
      id: 1,
      type: selectedExercise.value,
      question: `Sample ${selectedExercise.value} question`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: 'This is the correct answer because...'
    }
  }
}

const handleAnswer = (answer: any) => {
  // Process the answer and update results
  const isCorrect = answer.isCorrect
  if (isCorrect) {
    exerciseResults.value.correct++
  } else {
    exerciseResults.value.incorrect++
  }
  
  exerciseResults.value.answers.push({
    questionIndex: currentQuestionIndex.value,
    userAnswer: answer.userAnswer,
    correctAnswer: answer.correctAnswer,
    isCorrect
  })
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++
    generateQuestions()
  } else {
    completeExercise()
  }
}

const completeExercise = () => {
  const total = exerciseResults.value.correct + exerciseResults.value.incorrect
  exerciseResults.value.percentage = total > 0 ? Math.round((exerciseResults.value.correct / total) * 100) : 0
  totalScore.value += exerciseResults.value.correct * 10
  showResults.value = true
}

const restartExercise = () => {
  showResults.value = false
  currentQuestionIndex.value = 0
  exerciseResults.value = {
    correct: 0,
    incorrect: 0,
    percentage: 0,
    answers: []
  }
  generateQuestions()
}

const goBackToSelection = () => {
  selectedExercise.value = null
  showResults.value = false
  currentQuestionIndex.value = 0
  
  // Clear exercise query parameter
  const newQuery = { ...route.query }
  delete newQuery.exercise
  router.replace({ query: newQuery })
}

const saveSettings = () => {
  // Save settings to localStorage
  localStorage.setItem('grammarPracticeSettings', JSON.stringify(settings.value))
  showSettings.value = false
}

const goBackToGrammarDetail = () => {
  // Navigate back to grammar detail page using the ID from route params
  const grammarId = route.params.id
  if (grammarId) {
    router.push(`/grammar/${grammarId}`)
  } else {
    // Fallback to grammar list if no ID
    router.push('/grammar')
  }
}

// Exercise Manager Functions
const addExerciseType = () => {
  if (!newExercise.value.type || !newExercise.value.title) {
    return
  }
  
  const exerciseToAdd = {
    type: newExercise.value.type,
    title: newExercise.value.title,
    description: newExercise.value.description,
    difficulty: newExercise.value.difficulty,
    duration: newExercise.value.duration,
    icon: BookOpenIcon,
    colorClass: 'bg-blue-500'
  }
  
  exerciseTypes.value.push(exerciseToAdd)
  
  // Reset form
  newExercise.value = {
    type: '',
    title: '',
    description: '',
    difficulty: 'medium',
    duration: ''
  }
}

const editExerciseType = (index: number) => {
  const exercise = exerciseTypes.value[index]
  newExercise.value = {
    type: exercise.type,
    title: exercise.title,
    description: exercise.description,
    difficulty: exercise.difficulty,
    duration: exercise.duration
  }
  
  // Remove the exercise from list (will be re-added when saved)
  exerciseTypes.value.splice(index, 1)
}

const deleteExerciseType = (index: number) => {
  if (confirm(t('common.confirmDelete'))) {
    exerciseTypes.value.splice(index, 1)
  }
}

const saveExerciseTypes = () => {
  // Here you could save to localStorage or API
  localStorage.setItem('grammarExerciseTypes', JSON.stringify(exerciseTypes.value))
  showExerciseManager.value = false
}

// Question Management Functions
const openQuestionManager = (exerciseType: string) => {
  selectedExerciseTypeForQuestions.value = exerciseType
  showQuestionManager.value = true
  resetNewQuestionForm()
}

const closeQuestionManager = () => {
  showQuestionManager.value = false
  selectedExerciseTypeForQuestions.value = ''
  resetNewQuestionForm()
  editingQuestionIndex.value = -1
}

const resetNewQuestionForm = () => {
  newQuestion.value = {
    id: '',
    type: selectedExerciseTypeForQuestions.value,
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    // Writing specific fields
    taskType: 'essay',
    prompt: '',
    requirements: [''],
    minWords: 100,
    timeLimit: 20
  }
}

const addQuestion = () => {
  const exerciseType = selectedExerciseTypeForQuestions.value
  if (!exerciseType) return
  
  // Generate unique ID
  const id = Date.now().toString()
  
  const questionToAdd = {
    ...newQuestion.value,
    id,
    type: exerciseType
  }
  
  // Clean up empty requirements for writing exercises
  if (exerciseType === 'writing') {
    questionToAdd.requirements = questionToAdd.requirements.filter(req => req.trim() !== '')
  }
  
  // Initialize exercise questions array if it doesn't exist
  if (!exerciseQuestions.value[exerciseType]) {
    exerciseQuestions.value[exerciseType] = []
  }
  
  if (editingQuestionIndex.value >= 0) {
    // Update existing question
    exerciseQuestions.value[exerciseType][editingQuestionIndex.value] = questionToAdd
    editingQuestionIndex.value = -1
  } else {
    // Add new question
    exerciseQuestions.value[exerciseType].push(questionToAdd)
  }
  
  // Save to localStorage
  saveQuestionsToStorage()
  
  // Reset form
  resetNewQuestionForm()
}

const editQuestion = (index: number) => {
  const exerciseType = selectedExerciseTypeForQuestions.value
  const question = exerciseQuestions.value[exerciseType][index]
  
  newQuestion.value = { ...question }
  editingQuestionIndex.value = index
}

const deleteQuestion = (index: number) => {
  if (confirm(t('common.confirmDelete'))) {
    const exerciseType = selectedExerciseTypeForQuestions.value
    exerciseQuestions.value[exerciseType].splice(index, 1)
    saveQuestionsToStorage()
  }
}

const addRequirement = () => {
  newQuestion.value.requirements.push('')
}

const removeRequirement = (index: number) => {
  if (newQuestion.value.requirements.length > 1) {
    newQuestion.value.requirements.splice(index, 1)
  }
}

const saveQuestionsToStorage = () => {
  localStorage.setItem('grammarExerciseQuestions', JSON.stringify(exerciseQuestions.value))
}

const loadQuestionsFromStorage = () => {
  const saved = localStorage.getItem('grammarExerciseQuestions')
  if (saved) {
    exerciseQuestions.value = JSON.parse(saved)
  }
}

// Initialize from URL
const initializeFromUrl = () => {
  const exerciseFromUrl = route.query.exercise as string
  if (exerciseFromUrl && exerciseTypes.value.some(ex => ex.type === exerciseFromUrl)) {
    selectedExercise.value = exerciseFromUrl
    generateQuestions()
  } else {
    selectedExercise.value = null
  }
}

// Watch for route changes
watch(() => route.query.exercise, (newExercise) => {
  if (newExercise && exerciseTypes.value.some(ex => ex.type === newExercise)) {
    if (selectedExercise.value !== newExercise) {
      selectedExercise.value = newExercise as string
      currentQuestionIndex.value = 0
      exerciseResults.value = {
        correct: 0,
        incorrect: 0,
        percentage: 0,
        answers: []
      }
      generateQuestions()
    }
  } else {
    selectedExercise.value = null
  }
})

// Lifecycle
onMounted(() => {
  // Load settings from localStorage
  const savedSettings = localStorage.getItem('grammarPracticeSettings')
  if (savedSettings) {
    settings.value = { ...settings.value, ...JSON.parse(savedSettings) }
  }
  
  // Load saved score
  const savedScore = localStorage.getItem('grammarPracticeScore')
  if (savedScore) {
    totalScore.value = parseInt(savedScore)
  }
  
  // Load questions from localStorage
  loadQuestionsFromStorage()
  
  // Initialize from URL parameters
  initializeFromUrl()
})
</script>
