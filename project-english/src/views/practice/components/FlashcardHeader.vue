<template>
  <div class="bg-white dark:bg-black shadow border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-4xl mx-auto py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6">
      <!-- Mobile Layout (below sm) -->
      <div class="sm:hidden">
        <!-- Top Row: Back button + Title -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <button @click="$emit('go-back')" class="mr-3 text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">{{ t('flashcard.modes.flashcard', 'Flashcard') }}</h1>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500 dark:text-white/60">{{ t('flashcard.header.progress', 'Progress') }}</p>
            <p class="text-sm font-semibo ld text-gray-900 dark:text-white">{{ currentIndex + 1 }}/{{ totalCards }}</p>
          </div>
        </div>
        
        <!-- Bottom Row: Controls -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <!-- History Button -->
            <button @click="$emit('show-history')" class="text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white" :title="t('flashcard.header.history', 'History')">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
            </button>
            
            <!-- Settings Button -->
            <button
              @click="onShowSettings"
              :disabled="practiceStarted"
              :aria-disabled="practiceStarted ? 'true' : 'false'"
              class="text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white"
              :class="practiceStarted ? 'opacity-50 cursor-not-allowed' : ''"
              :title="practiceStarted ? t('flashcard.settings.disabledDuringPractice', 'Settings are disabled during practice') : t('flashcard.header.settings', 'Settings')"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
          
          <div class="flex items-center space-x-2">
            <!-- Practice Mode Select (custom dropdown to allow image-mode toggle) -->
            <div class="relative">
              <button
                type="button"
                @click="toggleMobileDropdown"
                class="relative pl-2 pr-8 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] cursor-pointer text-gray-900 dark:text-white flex items-center min-w-[120px]"
                :class="practiceStarted ? 'opacity-50 cursor-not-allowed' : ''"
                :disabled="practiceStarted"
                :aria-disabled="practiceStarted ? 'true' : 'false'"
                :title="practiceStarted ? t('flashcard.modes.change_disabled_during_practice', 'Mode change is disabled during practice') : t('flashcard.header.selectMode', 'Select mode')"
                :aria-label="t('flashcard.header.selectMode', 'Select mode')"
              >
                <span class="truncate">
                  {{
                    practiceMode === 'flashcard' ? t('flashcard.modes.flashcard', 'Flashcard') :
                    practiceMode === 'quiz' ? t('flashcard.modes.quiz', 'Quiz') :
                    practiceMode === 'typing' ? t('flashcard.modes.typing', 'Typing') :
                    practiceMode === 'listening' ? t('flashcard.modes.listening', 'Listening') :
                    practiceMode === 'image' ? t('flashcard.modes.image', 'Image') :
                    practiceMode === 'pictionary' ? t('flashcard.modes.pictionary', 'Pictionary') :
                    t('flashcard.modes.pronunciation', 'Pronunciation')
                  }}
                </span>
                <svg class="w-3.5 h-3.5 opacity-80 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                </svg>
              </button>
              <transition name="fade" appear>
                <div
                  v-if="mobileDropdownOpen && !practiceStarted"
                  class="absolute right-0 mt-1 w-44 z-[9999] rounded-md shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f0f0f] overflow-hidden"
                >
                  <ul class="py-1 text-xs text-gray-900 dark:text-white">
                    <li><button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10" @click="selectMode('flashcard')">{{ t('flashcard.modes.flashcard', 'Flashcard') }}</button></li>
                    <li><button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10" @click="selectMode('quiz')">{{ t('flashcard.modes.quiz', 'Quiz') }}</button></li>
                    <li class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2">
                      <button class="text-left flex-1 truncate" @click="selectMode('typing')">{{ t('flashcard.modes.typing', 'Typing') }}</button>
                      <button
                        class="relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600"
                        :class="typingQuizEnabled ? 'bg-purple-600' : 'bg-gray-200 dark:bg-[#0a0a0a]'"
                        @click.stop="toggleTypingQuizFromDropdown()"
                        :title="t('flashcard.typing.quizToggle', 'Multiple Choice')"
                        :aria-label="t('flashcard.typing.quizToggle', 'Multiple Choice')"
                      >
                        <span :class="['inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform', typingQuizEnabled ? 'translate-x-4' : 'translate-x-0.5']" />
                      </button>
                    </li>
                    <!-- Listening option with inline toggle -->
                    <li class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2">
                      <button class="text-left flex-1 truncate" @click="selectMode('listening')">{{ t('flashcard.modes.listening', 'Listening') }}</button>
                      <button
                        class="relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600"
                        :class="listeningQuizEnabled ? 'bg-cyan-600' : 'bg-gray-200 dark:bg-[#0a0a0a]'"
                        @click.stop="toggleListeningQuizFromDropdown()"
                        :title="t('flashcard.listening.quizToggle', 'Multiple Choice')"
                        :aria-label="t('flashcard.listening.quizToggle', 'Multiple Choice')"
                      >
                        <span :class="['inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform', listeningQuizEnabled ? 'translate-x-4' : 'translate-x-0.5']" />
                      </button>
                    </li>
                    <!-- Image option with inline toggle -->
                    <li class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2">
                      <button
                        class="text-left flex-1 truncate"
                        @click="selectMode('image')"
                        :disabled="!imageModeAvailable"
                        :aria-disabled="!imageModeAvailable ? 'true' : 'false'"
                        :title="!imageModeAvailable ? t('flashcard.image.unavailable', 'Image mode is unavailable for the selected date') : t('flashcard.modes.image', 'Image')"
                        :class="!imageModeAvailable ? 'opacity-50 cursor-not-allowed' : ''"
                      >
                        {{ t('flashcard.modes.image', 'Image') }}
                      </button>
                      <button
                        class="relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600"
                        :class="[
                          imageModeAvailable ? (imageQuizEnabled ? 'bg-purple-600' : 'bg-gray-200 dark:bg-[#0a0a0a]') : 'opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]'
                        ]"
                        @click.stop="imageModeAvailable && toggleImageQuizFromDropdown()"
                        :title="t('flashcard.image.quizToggle', 'Multiple Choice')"
                        :aria-label="t('flashcard.image.quizToggle', 'Multiple Choice')"
                      >
                        <span :class="['inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform', imageQuizEnabled ? 'translate-x-4' : 'translate-x-0.5']" />
                      </button>
                    </li>
                    <li>
                      <button 
                        class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10" 
                        @click="selectMode('pictionary')"
                        :disabled="!pictionaryModeAvailable"
                        :aria-disabled="!pictionaryModeAvailable ? 'true' : 'false'"
                        :title="!pictionaryModeAvailable ? t('flashcard.pictionary.unavailable', 'Pictionary mode is unavailable for the selected date') : t('flashcard.modes.pictionary', 'Pictionary')"
                        :class="!pictionaryModeAvailable ? 'opacity-50 cursor-not-allowed' : ''"
                      >
                        {{ t('flashcard.modes.pictionary', 'Pictionary') }}
                      </button>
                    </li>
                    <li><button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10" @click="selectMode('pronunciation')">{{ t('flashcard.modes.pronunciation', 'Pronunciation') }}</button></li>
                  </ul>
                </div>
              </transition>
            </div>
            
            <!-- Shuffle Toggle -->
            <button
              @click="$emit('toggle-shuffle')"
              :disabled="practiceStarted"
              :class="[
                'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
                shuffleEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600',
                practiceStarted ? 'opacity-50 cursor-not-allowed' : ''
              ]"
              :title="practiceStarted ? t('flashcard.settings.shuffle_disabled_during_practice', 'Shuffle is disabled during practice') : t('flashcard.settings.shuffle', 'Shuffle')"
            >
              <span
                :class="[
                  'inline-block h-3 w-3 transform rounded-full bg-white transition-transform',
                  shuffleEnabled ? 'translate-x-5' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Tablet & Desktop Layout (sm and above) -->
      <div class="hidden sm:flex items-center justify-between">
        <div class="flex items-center">
          <button @click="$emit('go-back')" class="mr-4 text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white">
            <svg class="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">{{ t('flashcard.modes.flashcard', 'Flashcard') }}</h1>
            <p class="mt-1 md:mt-2 text-sm md:text-base text-gray-600 dark:text-white/70">{{ t('flashcard.header.description', 'Practice vocabulary with flashcards') }}</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-3 md:space-x-4">
          <!-- History Button -->
          <button @click="$emit('show-history')" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" :title="t('flashcard.header.history', 'History')">
            <svg class="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Shuffle Toggle -->
          <div class="flex items-center space-x-2 md:space-x-3">
            <span class="text-sm md:text-base text-gray-600 dark:text-white/70">{{ t('flashcard.settings.shuffle', 'Shuffle') }}</span>
            <button
              @click="$emit('toggle-shuffle')"
              :disabled="practiceStarted"
              :class="[
                'relative inline-flex items-center rounded-full transition-colors',
                'h-6 w-11 md:h-7 md:w-12',
                shuffleEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600',
                practiceStarted ? 'opacity-50 cursor-not-allowed' : ''
              ]"
              :title="practiceStarted ? t('flashcard.settings.shuffle_disabled_during_practice', 'Shuffle is disabled during practice') : t('flashcard.settings.shuffle', 'Shuffle')"
            >
              <span
                :class="[
                  'inline-block transform rounded-full bg-white transition-transform',
                  'h-4 w-4 md:h-5 md:w-5',
                  shuffleEnabled ? 'translate-x-6 md:translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>

          <div class="text-right">
            <p class="text-sm md:text-base text-gray-500 dark:text-white/60">{{ t('flashcard.header.progress', 'Progress') }}</p>
            <p class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{{ currentIndex + 1 }} / {{ totalCards }}</p>
          </div>
          
          <div class="flex items-center space-x-2 md:space-x-3">
            <div class="relative">
              <button
                type="button"
                @click="toggleDesktopDropdown"
                class="relative pl-3 pr-10 py-1 md:pl-4 md:pr-12 md:py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] cursor-pointer text-gray-900 dark:text-white flex items-center min-w-[140px]"
                :class="practiceStarted ? 'opacity-50 cursor-not-allowed' : ''"
                :disabled="practiceStarted"
                :aria-disabled="practiceStarted ? 'true' : 'false'"
                :title="practiceStarted ? t('flashcard.modes.change_disabled_during_practice', 'Mode change is disabled during practice') : t('flashcard.header.selectMode', 'Select mode')"
                :aria-label="t('flashcard.header.selectMode', 'Select mode')"
              >
                <span class="truncate">
                  {{
                    practiceMode === 'flashcard' ? t('flashcard.modes.flashcard', 'Flashcard') :
                    practiceMode === 'quiz' ? t('flashcard.modes.quiz', 'Quiz') :
                    practiceMode === 'typing' ? t('flashcard.modes.typing', 'Typing') :
                    practiceMode === 'listening' ? t('flashcard.modes.listening', 'Listening') :
                    practiceMode === 'image' ? t('flashcard.modes.image', 'Image') :
                    practiceMode === 'pictionary' ? t('flashcard.modes.pictionary', 'Pictionary') :
                    t('flashcard.modes.pronunciation', 'Pronunciation')
                  }}
                </span>
                <svg class="w-4 h-4 opacity-80 absolute right-2 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                </svg>
              </button>
              <transition name="fade" appear>
                <div
                  v-if="desktopDropdownOpen && !practiceStarted"
                  class="absolute right-0 mt-1 w-52 z-[9999] rounded-md shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f0f0f] overflow-hidden"
                >
                  <ul class="py-1 text-sm text-gray-900 dark:text-white">
                    <li><button class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10" @click="selectMode('flashcard')">{{ t('flashcard.modes.flashcard', 'Flashcard') }}</button></li>
                    <li><button class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10" @click="selectMode('quiz')">{{ t('flashcard.modes.quiz', 'Quiz') }}</button></li>
                    <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3">
                      <button class="text-left flex-1 truncate" @click="selectMode('typing')">{{ t('flashcard.modes.typing', 'Typing') }}</button>
                      <button
                        class="relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600"
                        :class="typingQuizEnabled ? 'bg-purple-600' : 'bg-gray-200 dark:bg-[#0a0a0a]'"
                        @click.stop="toggleTypingQuizFromDropdown()"
                        :title="t('flashcard.typing.quizToggle', 'Multiple Choice')"
                        :aria-label="t('flashcard.typing.quizToggle', 'Multiple Choice')"
                      >
                        <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', typingQuizEnabled ? 'translate-x-5' : 'translate-x-0.5']" />
                      </button>
                    </li>
                    <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3">
                      <button class="text-left flex-1 truncate" @click="selectMode('listening')">{{ t('flashcard.modes.listening', 'Listening') }}</button>
                      <button
                        class="relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600"
                        :class="listeningQuizEnabled ? 'bg-cyan-600' : 'bg-gray-200 dark:bg-[#0a0a0a]'"
                        @click.stop="toggleListeningQuizFromDropdown()"
                        :title="t('flashcard.listening.quizToggle', 'Multiple Choice')"
                        :aria-label="t('flashcard.listening.quizToggle', 'Multiple Choice')"
                      >
                        <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', listeningQuizEnabled ? 'translate-x-5' : 'translate-x-0.5']" />
                      </button>
                    </li>
                    <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3">
                      <button
                        class="text-left flex-1 truncate"
                        @click="selectMode('image')"
                        :disabled="!imageModeAvailable"
                        :aria-disabled="!imageModeAvailable ? 'true' : 'false'"
                        :title="!imageModeAvailable ? t('flashcard.image.unavailable', 'Image mode is unavailable for the selected date') : t('flashcard.modes.image', 'Image')"
                        :class="!imageModeAvailable ? 'opacity-50 cursor-not-allowed' : ''"
                      >
                        {{ t('flashcard.modes.image', 'Image') }}
                      </button>
                      <button
                        class="relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600"
                        :class="[
                          imageModeAvailable ? (imageQuizEnabled ? 'bg-purple-600' : 'bg-gray-200 dark:bg-[#0a0a0a]') : 'opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]'
                        ]"
                        @click.stop="imageModeAvailable && toggleImageQuizFromDropdown()"
                        :title="t('flashcard.image.quizToggle', 'Multiple Choice')"
                        :aria-label="t('flashcard.image.quizToggle', 'Multiple Choice')"
                      >
                        <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', imageQuizEnabled ? 'translate-x-5' : 'translate-x-0.5']" />
                      </button>
                    </li>
                    <li>
                      <button 
                        class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10" 
                        @click="selectMode('pictionary')"
                        :disabled="!pictionaryModeAvailable"
                        :aria-disabled="!pictionaryModeAvailable ? 'true' : 'false'"
                        :title="!pictionaryModeAvailable ? t('flashcard.pictionary.unavailable', 'Pictionary mode is unavailable for the selected date') : t('flashcard.modes.pictionary', 'Pictionary')"
                        :class="!pictionaryModeAvailable ? 'opacity-50 cursor-not-allowed' : ''"
                      >
                        {{ t('flashcard.modes.pictionary', 'Pictionary') }}
                      </button>
                    </li>
                    <li><button class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10" @click="selectMode('pronunciation')">{{ t('flashcard.modes.pronunciation', 'Pronunciation') }}</button></li>
                  </ul>
                </div>
              </transition>
            </div>
            <button
              @click="onShowSettings"
              :disabled="practiceStarted"
              :aria-disabled="practiceStarted ? 'true' : 'false'"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              :class="practiceStarted ? 'opacity-50 cursor-not-allowed' : ''"
              :title="practiceStarted ? t('flashcard.settings.disabledDuringPractice', 'Settings are disabled during practice') : t('flashcard.header.settings', 'Settings')"
            >
              <svg class="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { PracticeMode } from '../types'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

interface Props {
  currentIndex: number
  totalCards: number
  practiceMode: PracticeMode
  shuffleEnabled: boolean
  practiceStarted?: boolean
  imageQuizEnabled?: boolean
  listeningQuizEnabled?: boolean
  typingQuizEnabled?: boolean
  imageModeAvailable?: boolean
  pictionaryModeAvailable?: boolean
}

const props = defineProps<Props>()
const imageQuizEnabled = computed(() => props.imageQuizEnabled ?? false)
const listeningQuizEnabled = computed(() => props.listeningQuizEnabled ?? false)
const typingQuizEnabled = computed(() => props.typingQuizEnabled ?? false)
const imageModeAvailable = computed(() => props.imageModeAvailable ?? true)
const pictionaryModeAvailable = computed(() => props.pictionaryModeAvailable ?? true)

const { t } = useI18n()

const emit = defineEmits<{
  'go-back': []
  'show-history': []
  'change-practice-mode': [mode: PracticeMode]
  'show-settings': []
  'toggle-shuffle': []
  'update:image-quiz-enabled': [enabled: boolean]
  'update:listening-quiz-enabled': [enabled: boolean]
  'update:typing-quiz-enabled': [enabled: boolean]
}>()

const handlePracticeModeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('change-practice-mode', target.value as PracticeMode)
}

// Custom dropdown logic (keeps original look & feel)
const mobileDropdownOpen = ref(false)
const desktopDropdownOpen = ref(false)

const closeAll = () => {
  mobileDropdownOpen.value = false
  desktopDropdownOpen.value = false
}

const toggleMobileDropdown = () => {
  if (props.practiceStarted) return
  mobileDropdownOpen.value = !mobileDropdownOpen.value
  if (mobileDropdownOpen.value) desktopDropdownOpen.value = false
}
const toggleDesktopDropdown = () => {
  if (props.practiceStarted) return
  desktopDropdownOpen.value = !desktopDropdownOpen.value
  if (desktopDropdownOpen.value) mobileDropdownOpen.value = false
}

const selectMode = (mode: PracticeMode) => {
  if (props.practiceStarted) {
    // Do not allow mode changes during active practice
    closeAll()
    return
  }
  if (mode === 'image' && !imageModeAvailable.value) {
    // Prevent selecting Image mode when unavailable for current date filter
    closeAll()
    return
  }
  if (mode === 'pictionary' && !pictionaryModeAvailable.value) {
    // Prevent selecting Pictionary mode when unavailable for current date filter
    closeAll()
    return
  }
  emit('change-practice-mode', mode)
  closeAll()
}

const toggleImageQuizFromDropdown = () => {
  // Prevent toggling during active practice or when image mode is unavailable
  if (props.practiceStarted) return
  if (!imageModeAvailable.value) return
  emit('update:image-quiz-enabled', !imageQuizEnabled.value)
}

const toggleListeningQuizFromDropdown = () => {
  if (props.practiceStarted) return 
  emit('update:listening-quiz-enabled', !listeningQuizEnabled.value)
}

const toggleTypingQuizFromDropdown = () => {
  if (props.practiceStarted) return
  emit('update:typing-quiz-enabled', !typingQuizEnabled.value)
}

// Guarded settings emitter to prevent opening during active practice
const onShowSettings = () => {
  if (props.practiceStarted) return
  emit('show-settings')
}

const onClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  // Close when clicking outside any dropdown container within this header
  if (!target.closest('.relative')) {
    closeAll()
  }
}

onMounted(() => {
  window.addEventListener('click', onClickOutside, { capture: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('click', onClickOutside, { capture: true } as any)
})
</script>
