<template>
  <div class="mb-3 xs:mb-4 sm:mb-6">
    <!-- Date group header with accordion toggle -->
    <div class="sticky top-0 bg-gray-50 dark:bg-[#0f0f0f] px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-2.5 sm:py-3 border-b border-gray-200 dark:border-gray-700 z-10">
      <!-- Mobile layout: Block/Vertical -->
      <div class="max-xs:block xs:hidden">
        <!-- First row: Date header -->
        <div 
          @click="toggleAccordion"
          class="flex items-center justify-between mb-2 cursor-pointer py-1 -mx-1 px-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <!-- Header content -->
          <div class="flex items-center space-x-1 flex-1">
            <!-- Accordion toggle button -->
            <div class="p-0.5 rounded-md">
              <svg
                class="w-2.5 h-2.5 text-gray-500 dark:text-gray-400 transition-transform duration-200"
                :class="{ 'transform rotate-90': isExpanded }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>

            <h4 class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-1">
              <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
              <span>{{ group.displayDate }}</span>
              <span class="text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base text-gray-500 dark:text-gray-400">
                ({{ totalVocabularyCount }})
              </span>
            </h4>
          </div>

          <!-- Toggle switch for action buttons on mobile -->
          <div class="flex items-center space-x-1" @click.stop>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="showActionButtons"
                class="sr-only peer"
              >
              <div class="w-7 h-4 xl:w-9 xl:h-5 2xl:w-11 2xl:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] xl:after:top-[2px] 2xl:after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 xl:after:h-4 xl:after:w-4 2xl:after:h-5 2xl:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <!-- Pagination on mobile (if needed) -->
          <div v-if="isExpanded && group.totalPages && group.totalPages > 1" class="flex items-center space-x-1" @click.stop>
            <button
              @click="$emit('date-group-previous', group.date)"
              :disabled="(group.currentPage || 1) === 1"
              class="px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 xl:px-4 xl:py-1.5 2xl:px-5 2xl:py-2 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹
            </button>

            <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg text-gray-500 dark:text-gray-400">
              {{ group.currentPage || 1 }}/{{ group.totalPages }}
            </span>

            <button
              @click="$emit('date-group-next', group.date)"
              :disabled="(group.currentPage || 1) === group.totalPages"
              class="px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 xl:px-4 xl:py-1.5 2xl:px-5 2xl:py-2 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>

        <!-- Second row: Topic and Note buttons -->
        <div class="flex items-center justify-center space-x-2" @click.stop>
          <div v-if="!showTopicInput" class="flex items-center space-x-1">
            <!-- Topic display or add button -->
            <div v-if="groupTopic" class="flex items-center space-x-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/50 rounded-full border border-blue-200 dark:border-blue-700">
              <svg class="w-2 h-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <div class="relative">
                <span 
                  ref="topicSpanMobile"
                  class="text-xs xl:text-sm 2xl:text-base font-medium text-blue-700 dark:text-blue-300 truncate max-w-[80px] block cursor-default"
                  @mouseenter="showTopicTooltip = true"
                  @mouseleave="showTopicTooltip = false"
                >{{ groupTopic }}</span>
                
                <!-- Tooltip -->
                <div 
                  v-if="showTopicTooltip && isTopicTruncated"
                  class="absolute z-[9999] bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap"
                >
                  {{ groupTopic }}
                  <!-- Arrow -->
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                </div>
              </div>
              <button
                @click.stop="editTopic"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 focus:outline-none flex-shrink-0"
                :aria-label="t('vocabulary.accordion.editTopic')"
              >
                <svg class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
            </div>
            <button
              v-else
              @click.stop="showTopicInput = true"
              class="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-full border border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              :aria-label="t('vocabulary.accordion.addTopic')"
            >
              <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              <span class="xl:text-sm 2xl:text-base">{{ t('vocabulary.accordion.addTopic') }}</span>
            </button>

            <!-- Action buttons (Note and Add Vocabulary) - controlled by toggle -->
            <template v-if="showActionButtons">
              <!-- Note button -->
              <VocabularyNoteButton
                :date="group.date"
                :is-today="isTodayGroup"
                @open-note-dialog="() => emit('open-note-dialog', { date: group.date, words: group.vocabularies })"
              />
              
              <!-- Add Vocabulary button -->
              <button
                @click.stop="openAddVocabularyDialog"
                class="flex items-center space-x-1 px-2 py-1 text-xs sm:text-sm md:text-base lg:text-lg xl:text-sm 2xl:text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-full border border-dashed border-blue-300 dark:border-blue-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                :aria-label="t('vocabulary.addWord')"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <span>{{ t('vocabulary.addWord') }}</span>
              </button>
            </template>
          </div>

          <!-- Topic input form -->
          <div v-else class="flex items-center space-x-1 w-full max-w-[250px]" @click.stop>
            <input
              ref="topicInput"
              v-model="topicInputValue"
              @keyup.enter="saveTopic"
              @keyup.escape="cancelTopicInput"
              type="text"
              :placeholder="t('vocabulary.accordion.topicPlaceholder')"
              class="flex-1 px-2 py-1 text-xs xl:text-sm 2xl:text-base border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              @click="saveTopic"
              class="px-1.5 py-1 text-xs xl:text-sm 2xl:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              :aria-label="t('vocabulary.accordion.saveTopic')"
            >
              <svg class="w-2.5 h-2.5 xl:w-3 xl:h-3 2xl:w-3.5 2xl:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button
              @click="cancelTopicInput"
              class="px-1.5 py-1 text-xs xl:text-sm 2xl:text-base bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              :aria-label="t('vocabulary.accordion.cancelTopic')"
            >
              <svg class="w-2.5 h-2.5 xl:w-3 xl:h-3 2xl:w-3.5 2xl:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Desktop/Tablet layout: Horizontal -->
      <div 
        @click="toggleAccordion"
        class="hidden xs:flex items-center justify-between flex-wrap gap-1 cursor-pointer py-1 -mx-1 px-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <!-- Header content -->
        <div class="flex items-center space-x-2">
          <!-- Accordion toggle button -->
          <div class="p-1 rounded-md">
            <svg
              class="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200"
              :class="{ 'transform rotate-90': isExpanded }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>

          <h4 class="text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2">
            <svg class="w-3 xs:w-3.5 sm:w-4 md:w-5 lg:w-6 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <span>{{ group.displayDate }}</span>
            <span class="text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base text-gray-500 dark:text-gray-400">
              ({{ totalVocabularyCount }} {{ t('vocabulary.words') || 'words' }})
            </span>
          </h4>
        </div>

        <!-- Center topic section -->
        <div class="flex-1 flex justify-center mx-1 xs:mx-2 sm:mx-4 min-w-0">
          <div v-if="!showTopicInput" class="flex items-center space-x-1.5 xs:space-x-1.5 sm:space-x-2 flex-nowrap">
            <!-- Topic display or add button -->
            <div v-if="groupTopic" class="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-1.5 md:space-x-2 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 bg-blue-50 dark:bg-blue-900/50 rounded-full border border-blue-200 dark:border-blue-700 flex-shrink-0">
              <svg class="w-2.5 xs:w-3 sm:w-3 md:w-4 lg:w-4 h-2.5 xs:h-3 sm:h-3 md:h-4 lg:h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <div class="relative">
                <span
                  ref="topicSpanDesktop"
                  class="font-medium text-blue-700 dark:text-blue-300 truncate max-w-[80px] sm:max-w-none block cursor-default"
                  @mouseenter="showTopicTooltip = true"
                  @mouseleave="showTopicTooltip = false"
                >{{ groupTopic }}</span>
                
                <!-- Tooltip -->
                <div 
                  v-if="showTopicTooltip && isTopicTruncated"
                  class="absolute z-[9999] bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap"
                >
                  {{ groupTopic }}
                  <!-- Arrow -->
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                </div>
              </div>
              <button
                @click.stop="editTopic"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 focus:outline-none flex-shrink-0"
                :aria-label="t('vocabulary.accordion.editTopic')"
              >
                <svg class="w-2.5 xs:w-3 sm:w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-2.5 xs:h-3 sm:h-3 md:h-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
            </div>
            <button
              v-else
              @click.stop="showTopicInput = true"
              class="flex items-center space-x-0.5 xs:space-x-1 sm:space-x-1 md:space-x-1.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-800/30 text-blue-600 dark:text-blue-400 rounded-md border border-blue-200 dark:border-blue-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-150"
              :aria-label="t('vocabulary.accordion.addTopic')"
            >
              <svg class="w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              <span class="whitespace-nowrap xl:text-sm 2xl:text-base">{{ t('vocabulary.accordion.addTopic') || 'Add Topic' }}</span>
            </button>

            <!-- Action buttons (Note and Add Vocabulary) - controlled by toggle -->
            <template v-if="showActionButtons">
              <!-- Note button for all vocabulary groups -->
              <div class="flex-shrink-0" @click.stop>
                <VocabularyNoteButton
                  :date="group.date"
                  :is-today="isTodayGroup"
                  @open-note-dialog="() => emit('open-note-dialog', { date: group.date, words: group.vocabularies })"
                />
              </div>
              
              <!-- Add Vocabulary button -->
              <div class="flex-shrink-0" @click.stop>
                <button
                  @click="openAddVocabularyDialog"
                  class="flex items-center space-x-1 md:space-x-1.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-full border border-dashed border-blue-300 dark:border-blue-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :aria-label="t('vocabulary.addWord') || 'Add Word'"
                >
                  <svg class="w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ t('vocabulary.addWord') || 'Add Word' }}</span>
                </button>
              </div>
            </template>
          </div>

          <!-- Topic input form -->
          <div v-else class="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 w-full max-w-[150px] xs:max-w-[200px] sm:max-w-xs" @click.stop>
            <input
              ref="topicInput"
              v-model="topicInputValue"
              @keyup.enter="saveTopic"
              @keyup.escape="cancelTopicInput"
              type="text"
              :placeholder="t('vocabulary.accordion.topicPlaceholder')"
              class="flex-1 px-2 xs:px-2 sm:px-2 py-0.5 xs:py-1 sm:py-1 text-xs border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              @click="saveTopic"
              class="px-1.5 xs:px-2 sm:px-2 py-0.5 xs:py-1 sm:py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              :aria-label="t('vocabulary.accordion.saveTopic')"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button
              @click="cancelTopicInput"
              class="px-1.5 xs:px-2 sm:px-2 py-0.5 xs:py-1 sm:py-1 text-xs bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              :aria-label="t('vocabulary.accordion.cancelTopic')"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Date group pagination (only show when expanded) -->
        <div v-if="isExpanded && group.totalPages && group.totalPages > 1" class="flex items-center space-x-2" @click.stop>
          <button
            @click="$emit('date-group-previous', group.date)"
            :disabled="(group.currentPage || 1) === 1"
            class="px-2 py-1 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t('common.previous') }}
          </button>

          <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-sm 2xl:text-base text-gray-500 dark:text-gray-400">
            {{ group.currentPage || 1 }} / {{ group.totalPages }}
          </span>

          <button
            @click="$emit('date-group-next', group.date)"
            :disabled="(group.currentPage || 1) === group.totalPages"
            class="px-2 py-1 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t('common.next') }}
          </button>
        </div>

        <!-- Toggle switch for action buttons -->
        <div class="flex items-center space-x-2" @click.stop>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="showActionButtons"
              class="sr-only peer"
            >
            <div class="w-9 h-5 xl:w-11 xl:h-6 2xl:w-14 2xl:h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] xl:after:top-[2px] 2xl:after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 xl:after:h-5 xl:after:w-5 2xl:after:h-6 2xl:after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-sm 2xl:text-base text-gray-600 dark:text-gray-300">{{ t('common.actions') }}</span>
        </div>
      </div>
    </div>
    
    <!-- Collapsible content with simple transition -->
    <transition name="accordion">
      <div v-if="isExpanded" class="accordion-content">
        <!-- Topic-based sub-groups -->
        <div v-if="group.topics && group.topics.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
          <div 
            v-for="topicGroup in group.topics" 
            :key="topicGroup.topic" 
            class="topic-group"
            @mouseenter="hoverToExpandEnabled ? handleTopicHover(topicGroup.topic, true) : null"
            @mouseleave="hoverToExpandEnabled ? handleTopicHover(topicGroup.topic, false) : null"
          >
            <!-- Topic header with accordion toggle and pagination -->
            <div class="bg-gray-50 dark:bg-gray-custom border-b border-gray-200 dark:border-gray-700">
              <!-- Topic name and toggle -->
              <div 
                class="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50"
                @click="toggleTopicAccordion(topicGroup.topic)"
              >
                <div class="flex items-center space-x-2">
                  <svg 
                    class="w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200"
                    :class="{ 'transform rotate-90': isTopicExpanded(topicGroup.topic) }"
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <h5 class="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {{ getTopicName(topicGroup.topic) }}
                    <span class="text-xs text-gray-500">({{ topicGroup.vocabularies.length }})</span>
                  </h5>
                </div>
              </div>
              
              <!-- Category pagination (only show when expanded and has multiple pages) -->
              <div 
                v-if="isTopicExpanded(topicGroup.topic) && getPaginatedTopicVocabularies(topicGroup).totalPages > 1" 
                class="px-6 pb-3" 
                @click.stop
              >
                <div class="flex items-center justify-between text-xs">
                  <!-- Mobile pagination -->
                  <div class="flex-1 flex justify-between sm:hidden">
                    <button 
                      @click="previousTopicPage(topicGroup.topic)" 
                      :disabled="!getPaginatedTopicVocabularies(topicGroup).hasPrevious" 
                      class="relative inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ t('common.previous') }}
                    </button>
                    <button 
                      @click="nextTopicPage(topicGroup.topic)" 
                      :disabled="!getPaginatedTopicVocabularies(topicGroup).hasNext" 
                      class="ml-2 relative inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ t('common.next') }}
                    </button>
                  </div>
                  
                  <!-- Desktop pagination -->
                  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p class="text-xs text-gray-700 dark:text-gray-300">
                        {{ t('vocabulary.showingCategoryItems', { 
                          start: getPaginatedTopicVocabularies(topicGroup).startIndex, 
                          end: getPaginatedTopicVocabularies(topicGroup).endIndex, 
                          total: getPaginatedTopicVocabularies(topicGroup).totalItems 
                        }) }}
                      </p>
                    </div>
                    <div>
                      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <!-- Previous button -->
                        <button 
                          @click="previousTopicPage(topicGroup.topic)" 
                          :disabled="!getPaginatedTopicVocabularies(topicGroup).hasPrevious" 
                          class="relative inline-flex items-center px-1.5 py-1 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-xs font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span class="sr-only">{{ t('common.previous') }}</span>
                          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                        
                        <!-- Page numbers -->
                        <button
                          v-for="page in getVisibleTopicPages(getPaginatedTopicVocabularies(topicGroup).currentPage, getPaginatedTopicVocabularies(topicGroup).totalPages)"
                          :key="`${topicGroup.topic}-${page}`"
                          @click="page > 0 ? goToTopicPage(topicGroup.topic, page) : null"
                          :disabled="page === -1"
                          :class="[
                            page === getPaginatedTopicVocabularies(topicGroup).currentPage
                              ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300'
                              : page === -1
                              ? 'bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-default'
                              : 'bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600',
                            'relative inline-flex items-center px-2 py-1 border text-xs font-medium'
                          ]"
                        >
                          {{ page === -1 ? '...' : page }}
                        </button>
                        
                        <!-- Next button -->
                        <button 
                          @click="nextTopicPage(topicGroup.topic)" 
                          :disabled="!getPaginatedTopicVocabularies(topicGroup).hasNext" 
                          class="relative inline-flex items-center px-1.5 py-1 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-xs font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span class="sr-only">{{ t('common.next') }}</span>
                          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Collapsible content for topic -->
            <transition name="topic-accordion">
              <div v-if="isTopicExpanded(topicGroup.topic)" class="topic-accordion-content py-2">
                <div class="divide-y divide-gray-200 dark:divide-gray-700">
                  <VocabularyCard
                    v-for="word in getPaginatedTopicVocabularies(topicGroup).vocabularies"
                    :key="word.id"
                    :word="word"
                    @play-audio="$emit('play-audio', $event)"
                    @edit-word="$emit('edit-word', $event)"
                    @delete-word="$emit('delete-word', $event)"
                    @toggle-favorite="$emit('toggle-favorite', $event)"
                    @view-details="$emit('view-details', $event)"
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Fallback for words without topics -->
        <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
            <VocabularyCard
              v-for="word in group.vocabularies"
              :key="word.id"
              :word="word"
              @play-audio="$emit('play-audio', $event)"
              @edit-word="$emit('edit-word', $event)"
              @delete-word="$emit('delete-word', $event)"
              @toggle-favorite="$emit('toggle-favorite', $event)"
              @view-details="$emit('view-details', $event)"
            />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { loadComponentSafely } from '../../../utils/import-helper'
import type { GroupedVocabulary } from '../../../utils/dateUtils'
import { getTopicName } from '../../../utils/topicUtils'
import { getDateKey } from '../../../utils/dateUtils'

const { t } = useI18n()

// Sử dụng defineAsyncComponent để import components an toàn
const VocabularyCard = defineAsyncComponent(
  loadComponentSafely(() => import('./VocabularyCard.vue'))
)

// Import the new components
const VocabularyNoteButton = defineAsyncComponent(
  loadComponentSafely(() => import('./VocabularyNoteButton.vue'))
)



interface Props {
  group: GroupedVocabulary
  defaultExpanded?: boolean
  accordionState?: Record<string, boolean>
  hoverToExpandEnabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpanded: false, // Changed to false for collapsed by default
  accordionState: () => ({}),
  hoverToExpandEnabled: false
})

// Computed property to calculate total vocabulary count (including paginated items)
const totalVocabularyCount = computed(() => {
  // Use totalItems if available (includes all paginated vocabularies)
  if (props.group.totalItems && props.group.totalItems > 0) {
    return props.group.totalItems
  }
  
  // Fallback: calculate from current visible data
  if (props.group.topics && props.group.topics.length > 0) {
    // Sum up vocabularies from all topics
    return props.group.topics.reduce((total, topicGroup) => {
      return total + (topicGroup.vocabularies?.length || 0)
    }, 0)
  } else {
    // Fallback to direct vocabularies array
    return props.group.vocabularies?.length || 0
  }
})

// Check if this group is today's vocabulary
const isTodayGroup = computed(() => {
  const today = new Date();
  const todayKey = getDateKey(today.toISOString());
  return props.group.date === todayKey;
});

// Check if topic text is truncated
const isTopicTruncated = computed(() => {
  if (!groupTopic.value) {
    return false
  }
  
  // Check mobile span (visible on small screens)
  if (topicSpanMobile.value) {
    return topicSpanMobile.value.scrollWidth > topicSpanMobile.value.clientWidth
  }
  
  // Check desktop span (visible on larger screens)
  if (topicSpanDesktop.value) {
    return topicSpanDesktop.value.scrollWidth > topicSpanDesktop.value.clientWidth
  }
  
  return false
})

// Local state for accordion
const isExpanded = ref(false)
const isHovered = ref(false)
const hoverTimeout = ref<number | null>(null)
const accordionContent = ref<HTMLElement>()
const accordionMaxHeight = ref(0)
// Toggle for action buttons visibility with localStorage persistence per date
const SHOW_ACTION_BUTTONS_KEY = 'vocabulary-show-action-buttons-by-date'
const showActionButtons = ref(true)

// Load initial state from localStorage for this specific date
const loadActionButtonsState = () => {
  try {
    const saved = localStorage.getItem(SHOW_ACTION_BUTTONS_KEY)
    if (saved !== null) {
      const allStates = JSON.parse(saved)
      if (typeof allStates === 'object' && allStates[props.group.date] !== undefined) {
        showActionButtons.value = allStates[props.group.date]
      }
    }
  } catch (error) {
    console.warn('Failed to load action buttons state from localStorage:', error)
    showActionButtons.value = true // fallback to default
  }
}

// Save state to localStorage for this specific date
const saveActionButtonsState = () => {
  try {
    const saved = localStorage.getItem(SHOW_ACTION_BUTTONS_KEY)
    let allStates: Record<string, boolean> = {}
    
    if (saved !== null) {
      allStates = JSON.parse(saved)
    }
    
    allStates[props.group.date] = showActionButtons.value
    localStorage.setItem(SHOW_ACTION_BUTTONS_KEY, JSON.stringify(allStates))
  } catch (error) {
    console.warn('Failed to save action buttons state to localStorage:', error)
  }
}

// Watch for changes and save to localStorage
watch(showActionButtons, () => {
  saveActionButtonsState()
})

// State for topic accordions
const expandedTopics = ref<Record<string, boolean>>({})

// State for topic pagination (5 words per page)
const topicPaginationState = ref<Record<string, { currentPage: number }>>({}) 
const itemsPerCategoryPage = 5
const TOPIC_PAGINATION_STORAGE_KEY = 'vocabulary-topic-pagination-state'

// Load topic pagination state from localStorage
const loadTopicPaginationState = (): Record<string, { currentPage: number }> => {
  try {
    const stored = localStorage.getItem(TOPIC_PAGINATION_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.warn('Failed to load topic pagination state from localStorage:', error)
    return {}
  }
}

// Save topic pagination state to localStorage
const saveTopicPaginationState = (state: Record<string, { currentPage: number }>) => {
  try {
    localStorage.setItem(TOPIC_PAGINATION_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Failed to save topic pagination state to localStorage:', error)
  }
}

// Toggle topic accordion
const toggleTopicAccordion = (topic: string) => {
  expandedTopics.value[topic] = !expandedTopics.value[topic]
  
  // Initialize pagination state for this topic if not exists
  if (!topicPaginationState.value[topic]) {
    topicPaginationState.value[topic] = { currentPage: 1 }
  }
}

const isTopicExpanded = (topic: string) => {
  return expandedTopics.value[topic] || false
}

// Get current page for a topic
const getTopicCurrentPage = (topic: string): number => {
  return topicPaginationState.value[topic]?.currentPage || 1
}

// Set current page for a topic
const setTopicCurrentPage = (topic: string, page: number) => {
  if (!topicPaginationState.value[topic]) {
    topicPaginationState.value[topic] = { currentPage: 1 }
  }
  topicPaginationState.value[topic].currentPage = page
  // Save to localStorage
  saveTopicPaginationState(topicPaginationState.value)
}

// Get paginated vocabularies for a topic
const getPaginatedTopicVocabularies = (topicGroup: any) => {
  const currentPage = getTopicCurrentPage(topicGroup.topic)
  const totalItems = topicGroup.vocabularies.length
  const startIndex = (currentPage - 1) * itemsPerCategoryPage
  const endIndex = startIndex + itemsPerCategoryPage
  
  return {
    vocabularies: topicGroup.vocabularies.slice(startIndex, endIndex),
    currentPage,
    totalPages: Math.ceil(totalItems / itemsPerCategoryPage),
    totalItems,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, totalItems),
    hasNext: currentPage < Math.ceil(totalItems / itemsPerCategoryPage),
    hasPrevious: currentPage > 1
  }
}

// Category pagination functions
const goToTopicPage = (topic: string, page: number) => {
  const totalItems = props.group.topics?.find(t => t.topic === topic)?.vocabularies.length || 0
  const totalPages = Math.ceil(totalItems / itemsPerCategoryPage)
  
  if (page >= 1 && page <= totalPages) {
    setTopicCurrentPage(topic, page)
  }
}

const nextTopicPage = (topic: string) => {
  const currentPage = getTopicCurrentPage(topic)
  const totalItems = props.group.topics?.find(t => t.topic === topic)?.vocabularies.length || 0
  const totalPages = Math.ceil(totalItems / itemsPerCategoryPage)
  
  if (currentPage < totalPages) {
    setTopicCurrentPage(topic, currentPage + 1)
  }
}

const previousTopicPage = (topic: string) => {
  const currentPage = getTopicCurrentPage(topic)
  if (currentPage > 1) {
    setTopicCurrentPage(topic, currentPage - 1)
  }
}

// Generate visible page numbers for topic pagination (smart pagination)
const getVisibleTopicPages = (currentPage: number, totalPages: number): number[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, -1, totalPages]
  }
  
  if (currentPage >= totalPages - 3) {
    return [1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }
  
  return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages]
}

// Handle topic hover for expand/collapse
const hoverTimeouts = ref<Record<string, number>>({})

const handleTopicHover = (topic: string, isHovering: boolean) => {
  if (props.hoverToExpandEnabled) {
    // Clear any existing timeout for this topic
    if (hoverTimeouts.value[topic]) {
      clearTimeout(hoverTimeouts.value[topic])
      delete hoverTimeouts.value[topic]
    }
    
    if (isHovering) {
      // Immediately expand on hover
      expandedTopics.value[topic] = true
    } else {
      // Delay collapse to allow for modal interactions
      hoverTimeouts.value[topic] = setTimeout(() => {
        // Close the topic after delay, but check if modal opened during delay
        if (!isModalOpen()) {
          expandedTopics.value[topic] = false
        }
        delete hoverTimeouts.value[topic]
      }, 200) // 200ms delay
    }
  }
}

// Track if mouse is outside vocabulary area
const isMouseOutsideVocabulary = ref(false)

// Handle vocabulary list mouse leave event
const handleVocabularyListMouseLeave = () => {
  if (props.hoverToExpandEnabled) {
    isMouseOutsideVocabulary.value = true
    
    // If no modal is open, close immediately
    if (!isModalOpen()) {
      closeAllTopics()
    }
    // If modal is open, categories will close when modal closes (via watcher)
  }
}

// Handle vocabulary list mouse enter event
const handleVocabularyListMouseEnter = () => {
  if (props.hoverToExpandEnabled) {
    isMouseOutsideVocabulary.value = false
  }
}

// Close all topics helper function
const closeAllTopics = () => {
  Object.keys(expandedTopics.value).forEach(topic => {
    expandedTopics.value[topic] = false
  })
  // Clear any pending timeouts
  Object.keys(hoverTimeouts.value).forEach(topic => {
    if (hoverTimeouts.value[topic]) {
      clearTimeout(hoverTimeouts.value[topic])
      delete hoverTimeouts.value[topic]
    }
  })
}

// Check if any modal is currently open
const isModalOpen = (): boolean => {
  // Check for common modal/dialog selectors
  const modalSelectors = [
    '[role="dialog"]',
    '.modal',
    '.dialog',
    '[data-headlessui-state="open"]', // HeadlessUI modals
    '.fixed.inset-0', // Common modal backdrop pattern
  ]
  
  return modalSelectors.some(selector => {
    const elements = document.querySelectorAll(selector)
    return Array.from(elements).some(el => {
      const style = window.getComputedStyle(el)
      return style.display !== 'none' && style.visibility !== 'hidden'
    })
  })
}

// Topic functionality state
const showTopicInput = ref(false)
const topicInputValue = ref('')
const topicInput = ref<HTMLInputElement>()
const groupTopic = ref('')
const showTopicTooltip = ref(false)
const topicSpanMobile = ref<HTMLElement>()
const topicSpanDesktop = ref<HTMLElement>()

// Local storage key for topics
const TOPICS_STORAGE_KEY = 'vocabulary-group-topics'

// Load group topics from localStorage
const getStoredTopics = (): Record<string, string> => {
  try {
    const stored = localStorage.getItem(TOPICS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.warn('Failed to load group topics from localStorage:', error)
    return {}
  }
}

// Save group topics to localStorage
const setStoredTopics = (topics: Record<string, string>) => {
  try {
    localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(topics))
  } catch (error) {
    console.warn('Failed to save group topics to localStorage:', error)
  }
}

// Topic functionality methods
const editTopic = () => {
  topicInputValue.value = groupTopic.value
  showTopicInput.value = true
  nextTick(() => {
    topicInput.value?.focus()
  })
}

const saveTopic = () => {
  const trimmedTopic = topicInputValue.value.trim()
  groupTopic.value = trimmedTopic
  
  // Update localStorage
  const storedTopics = getStoredTopics()
  if (trimmedTopic) {
    storedTopics[props.group.date] = trimmedTopic
  } else {
    delete storedTopics[props.group.date]
  }
  setStoredTopics(storedTopics)
  
  // Reset input state
  showTopicInput.value = false
  topicInputValue.value = ''
}

const cancelTopicInput = () => {
  showTopicInput.value = false
  topicInputValue.value = ''
}





// Calculate accordion content height for smooth animation
const calculateHeight = async () => {
  if (!accordionContent.value) return
  
  const innerElement = accordionContent.value.querySelector('.accordion-inner') as HTMLElement
  if (innerElement) {
    // Create a temporary clone to measure height without affecting current element
    const clone = innerElement.cloneNode(true) as HTMLElement
    clone.style.visibility = 'hidden'
    clone.style.position = 'absolute'
    clone.style.height = 'auto'
    clone.style.maxHeight = 'none'
    clone.style.overflow = 'visible'
    
    document.body.appendChild(clone)
    
    await nextTick()
    
    accordionMaxHeight.value = clone.scrollHeight + 24 // Add padding
    
    document.body.removeChild(clone)
  }
}

// Initialize accordion state and load topics
onMounted(async () => {
  // Check if there's a saved state for this date group
  if (props.accordionState && typeof props.accordionState[props.group.date] === 'boolean') {
    isExpanded.value = props.accordionState[props.group.date]
  }
  
  // Load saved topic for this group
  const storedTopics = getStoredTopics()
  if (storedTopics[props.group.date]) {
    groupTopic.value = storedTopics[props.group.date]
  }
  
  // Calculate height for smooth animation
  await nextTick()
  await calculateHeight()
})

// Recalculate height when vocabulary list changes
watch(
  () => props.group.vocabularies.length,
  async () => {
    await nextTick()
    await calculateHeight()
  }
)

// Watch for changes in accordionState prop
watch(
  () => props.accordionState?.[props.group.date],
  (newState) => {
    if (typeof newState === 'boolean') {
      isExpanded.value = newState
    }
  }
)

// Watch for modal state changes to close categories when modal closes
const modalWatchInterval = ref<number | null>(null)

// Start watching for modal changes when component mounts
const startModalWatcher = () => {
  if (modalWatchInterval.value) return
  
  modalWatchInterval.value = setInterval(() => {
    if (props.hoverToExpandEnabled && isMouseOutsideVocabulary.value && !isModalOpen()) {
      closeAllTopics()
    }
  }, 300) // Check every 300ms
}

// Stop modal watcher
const stopModalWatcher = () => {
  if (modalWatchInterval.value) {
    clearInterval(modalWatchInterval.value)
    modalWatchInterval.value = null
  }
}

const toggleAccordion = () => {
  isExpanded.value = !isExpanded.value
  emit('accordion-toggle', props.group.date, isExpanded.value)
}

// Open add vocabulary dialog for this specific date
const openAddVocabularyDialog = () => {
  emit('open-add-vocabulary-dialog', props.group.date)
}

// Initialize component
onMounted(async () => {
  // Load action buttons state from localStorage
  loadActionButtonsState()
  
  // Load topic pagination state from localStorage
  topicPaginationState.value = loadTopicPaginationState()
  
  // Check if there's a saved state for this date group
  if (props.accordionState && typeof props.accordionState[props.group.date] === 'boolean') {
    isExpanded.value = props.accordionState[props.group.date]
  }
  
  // Load saved topic for this group
  const storedTopics = getStoredTopics()
  if (storedTopics[props.group.date]) {
    groupTopic.value = storedTopics[props.group.date]
  }
  
  // Listen for vocabulary list mouse events
  window.addEventListener('vocabulary-list-mouse-leave', handleVocabularyListMouseLeave)
  window.addEventListener('vocabulary-list-mouse-enter', handleVocabularyListMouseEnter)
  
  // Start modal watcher
  startModalWatcher()
  
  // Calculate height for smooth animation
  await nextTick()
  await calculateHeight()
})

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('vocabulary-list-mouse-leave', handleVocabularyListMouseLeave)
  window.removeEventListener('vocabulary-list-mouse-enter', handleVocabularyListMouseEnter)
  
  // Stop modal watcher
  stopModalWatcher()
  
  // Clear any remaining timeouts
  Object.keys(hoverTimeouts.value).forEach(topic => {
    if (hoverTimeouts.value[topic]) {
      clearTimeout(hoverTimeouts.value[topic])
    }
  })
})

const emit = defineEmits<{
  'play-audio': [word: string]
  'edit-word': [word: any]
  'delete-word': [word: any]
  'toggle-favorite': [word: any]
  'view-details': [word: any]
  'date-group-previous': [date: string]
  'date-group-next': [date: string]
  'accordion-toggle': [date: string, expanded: boolean]
  'note-saved': [date: string, note: string, markedWords: string[]]
  'open-note-dialog': [payload: { date: string, words: any[] }]
  'open-add-vocabulary-dialog': [date: string]
}>()
</script>

<style scoped>
/* Smooth transition for chevron icon */
svg {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}

/* Accordion transition classes */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top;
}

.accordion-enter-from {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.8);
}

.accordion-leave-to {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.8);
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

/* Ensure smooth rendering */
.accordion-content {
  transform-origin: top;
  backface-visibility: hidden;
}

/* Topic Accordion transition classes */
.topic-accordion-enter-active,
.topic-accordion-leave-active {
  transition: all 0.3s ease-out;
}
.topic-accordion-enter-from,
.topic-accordion-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
