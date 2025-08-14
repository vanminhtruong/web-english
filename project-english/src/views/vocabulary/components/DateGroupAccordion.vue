<template>
  <div>
    <div class="mb-3 xs:mb-4 sm:mb-6">
    <!-- Date group header with accordion toggle -->
    <div class="sticky top-0 bg-gray-50 dark:bg-[#0f0f0f] px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-2.5 sm:py-3 border-b border-gray-200 dark:border-gray-700 z-10">
      <!-- Mobile/Small layout: Block/Vertical with Grid -->
      <div class="sm:block md:hidden">
        <!-- First row: Date header -->
        <div 
          @click="toggleAccordion"
          class="flex items-center justify-between mb-2 cursor-pointer py-1 -mx-1 px-1 rounded hover:bg-gray-50 dark:hover:bg-gray-custom transition-colors"
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
              <div class="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
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

        <!-- Second row: Action buttons with 2x2 grid layout for mobile -->
        <div class="w-full" @click.stop>
          <!-- Topic input form (when editing) -->
          <div v-if="showTopicInput" class="flex items-center justify-center mb-3">
            <div class="flex items-center space-x-1 w-full max-w-[280px]">
              <input
                ref="topicInput"
                v-model="topicInputValue"
                @keyup.enter="saveTopic"
                @keyup.escape="cancelTopicInput"
                type="text"
                :placeholder="t('vocabulary.accordion.topicPlaceholder')"
                class="flex-1 px-3 py-2 text-xs border border-orange-300 dark:border-orange-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                @click="saveTopic"
                class="px-2 py-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                :aria-label="t('vocabulary.accordion.saveTopic')"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </button>
              <button
                @click="cancelTopicInput"
                class="px-2 py-2 text-xs bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
                :aria-label="t('vocabulary.accordion.cancelTopic')"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Normal state: 2x2 Grid layout for action buttons -->
          <div v-else>
            <!-- Current topic display (if exists) - Compact design -->
            <div v-if="groupTopic" class="flex items-center justify-center mb-1.5">
              <div class="flex items-center space-x-1 px-2.5 py-1 bg-orange-50 dark:bg-orange-900/50 rounded-lg border border-orange-200 dark:border-orange-700 max-w-[180px]">
                <svg class="w-3 h-3 text-orange-600 dark:text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                <div class="relative flex-1 min-w-0">
                  <span 
                    ref="topicSpanMobile"
                    class="text-xs font-medium text-orange-700 dark:text-orange-300 truncate block cursor-default"
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
                  class="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 focus:outline-none flex-shrink-0 p-0.5 rounded hover:bg-orange-100 dark:hover:bg-orange-800/50 transition-colors"
                  :aria-label="t('vocabulary.accordion.editTopic')"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 2x2 Grid for action buttons - Responsive mobile/small tablet design -->
            <div class="grid grid-cols-2 gap-2 max-w-[280px] sm:max-w-[320px] mx-auto">
              <!-- Row 1 -->
              <!-- Add Topic button (Top Left) -->
              <button
                v-if="!groupTopic"
                @click.stop="showTopicInput = true"
                class="flex flex-col items-center justify-center p-2 sm:p-3 text-xs sm:text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/50 rounded-md border border-dashed border-orange-300 dark:border-orange-600 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-orange-500 min-h-[56px] sm:min-h-[64px] hover:scale-[1.02]"
                :aria-label="t('vocabulary.accordion.addTopic', 'Add Topic')"
              >
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <span class="text-center leading-tight">{{ t('vocabulary.accordion.addTopic', 'Add Topic') }}</span>
              </button>

              <!-- Manage Notes button (Top Right or Top Left if topic exists) -->
              <div class="flex">
                <VocabularyNoteButton
                  :date="group.date"
                  :is-today="isTodayGroup"
                  :class="'w-full flex flex-col items-center justify-center p-2 sm:p-3 text-xs sm:text-sm font-medium min-h-[56px] sm:min-h-[64px] hover:scale-[1.02] transition-all duration-200 rounded-md'"
                  @open-note-dialog="() => emit('open-note-dialog', { date: group.date, words: group.vocabularies })"
                />
              </div>

              <!-- Row 2 -->
              <!-- Add Word button (Bottom Left) -->
              <button
                @click.stop="openAddVocabularyDialog"
                class="flex flex-col items-center justify-center p-2 sm:p-3 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-md border border-dashed border-blue-300 dark:border-blue-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[56px] sm:min-h-[64px] hover:scale-[1.02]"
                :aria-label="t('vocabulary.addWord', 'Add Word')"
              >
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <span class="text-center leading-tight">{{ t('vocabulary.addWord', 'Add Word') }}</span>
              </button>
              
              <!-- Manager Grammar button (Bottom Right) -->
              <div class="flex">
                <GrammarManagerButton
                  :date="group.date"
                  :class="'w-full flex flex-col items-center justify-center p-2 sm:p-3 text-xs sm:text-sm font-medium min-h-[56px] sm:min-h-[64px] hover:scale-[1.02] transition-all duration-200 rounded-md'"
                  @open-grammar-manager="openGrammarManager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop/Tablet layout: Responsive -->
      <div class="hidden md:block">
        <!-- Date Header Section -->
        <div 
          @click="toggleAccordion"
          class="flex items-center justify-between cursor-pointer py-1 -mx-1 px-1 rounded hover:bg-gray-50 dark:hover:bg-gray-custom transition-colors"
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

          <h4 class="text-xs xs:text-sm sm:text-sm md:text-base lg:text-base xl:text-sm 2xl:text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2">
            <svg class="w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <span>{{ group.displayDate }}</span>
            <span class="text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base text-gray-500 dark:text-gray-400">
              ({{ totalVocabularyCount }} {{ t('vocabulary.words', 'words') }})
            </span>
          </h4>
        </div>

        <!-- For xs, sm, md: Show toggle switch in header -->  
        <div class="lg:hidden flex items-center space-x-2" @click.stop>
          <!-- Toggle switch for action buttons -->
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="showActionButtons"
              class="sr-only peer"
            >
            <div class="w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <!-- For lg+: Show toggle and pagination in header -->
        <div class="hidden lg:flex items-center space-x-2">
          <!-- Date group pagination (only show when expanded) -->
          <div v-if="isExpanded && group.totalPages && group.totalPages > 1" class="flex items-center space-x-2" @click.stop>
            <button
              @click="$emit('date-group-previous', group.date)"
              :disabled="(group.currentPage || 1) === 1"
              class="px-2 md:px-2 py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ t('common.previous') }}
            </button>

            <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-sm 2xl:text-base text-gray-500 dark:text-gray-400">
              {{ group.currentPage || 1 }} / {{ group.totalPages }}
            </span>

            <button
              @click="$emit('date-group-next', group.date)"
              :disabled="(group.currentPage || 1) === group.totalPages"
              class="px-2 md:px-2 py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div class="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-sm 2xl:text-base text-gray-600 dark:text-gray-300">{{ t('common.actions', 'Actions') }}</span>
          </div>
        </div>
      </div>

      <!-- Pagination for xs, sm, md (when expanded) -->
      <div v-if="isExpanded && group.totalPages && group.totalPages > 1" class="lg:hidden flex items-center justify-center space-x-1 mt-2" @click.stop>
        <button
          @click="$emit('date-group-previous', group.date)"
          :disabled="(group.currentPage || 1) === 1"
          class="px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 text-xs xs:text-xs sm:text-sm md:text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ‹
        </button>

        <span class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
          {{ group.currentPage || 1 }}/{{ group.totalPages }}
        </span>

        <button
          @click="$emit('date-group-next', group.date)"
          :disabled="(group.currentPage || 1) === group.totalPages"
          class="px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 text-xs xs:text-xs sm:text-sm md:text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ›
        </button>
      </div>

      <!-- Buttons row for md+ - centered -->
      <div class="lg:hidden flex items-center justify-center space-x-2 mt-2" @click.stop>
        <div v-if="!showTopicInput" class="flex items-center space-x-2">
          <!-- Topic display or add button -->
          <div v-if="groupTopic" class="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-1.5 md:space-x-2 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 bg-orange-50 dark:bg-orange-900/50 rounded-full border border-orange-200 dark:border-orange-700">
            <svg class="w-2.5 xs:w-3 sm:w-3 md:w-4 h-2.5 xs:h-3 sm:h-3 md:h-4 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            <div class="relative">
              <span
                ref="topicSpanTablet"
                class="font-medium text-orange-700 dark:text-orange-300 truncate max-w-[80px] sm:max-w-none block cursor-default text-xs xs:text-xs sm:text-sm md:text-sm"
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
              class="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 focus:outline-none flex-shrink-0"
              :aria-label="t('vocabulary.accordion.editTopic')"
            >
              <svg class="w-2.5 xs:w-3 sm:w-3 md:w-4 h-2.5 xs:h-3 sm:h-3 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </button>
          </div>
          <button
            v-else
            @click.stop="showTopicInput = true"
            class="flex items-center space-x-0.5 xs:space-x-1 sm:space-x-1 md:space-x-1.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 text-xs xs:text-xs sm:text-sm md:text-sm bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-800/30 text-orange-600 dark:text-orange-400 rounded-full border border-orange-200 dark:border-orange-800 cursor-pointer transition-colors duration-150"
            :aria-label="t('vocabulary.accordion.addTopic', 'Add Topic')"
          >
            <svg class="w-3 md:w-4 h-3 md:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            <span class="whitespace-nowrap">{{ t('vocabulary.accordion.addTopic', 'Add Topic') }}</span>
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
              @click="openAddVocabularyDialog"
              class="flex items-center space-x-1 md:space-x-1.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-full border border-dashed border-blue-300 dark:border-blue-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              :aria-label="t('vocabulary.addWord', 'Add Word')"
            >
              <svg class="w-3 md:w-4 h-3 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              <span>{{ t('vocabulary.addWord', 'Add Word') }}</span>
            </button>
            
            <!-- Manager Grammar button -->
            <GrammarManagerButton
              :date="group.date"
              @open-grammar-manager="openGrammarManager"
            />
          </template>
        </div>

        <!-- Topic input form for md+ -->
        <div v-else class="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 w-full max-w-[150px] xs:max-w-[200px] sm:max-w-xs">
          <input
            ref="topicInputTablet"
            v-model="topicInputValue"
            @keyup.enter="saveTopic"
            @keyup.escape="cancelTopicInput"
            type="text"
            :placeholder="t('vocabulary.accordion.topicPlaceholder')"
            class="flex-1 px-2 xs:px-2 sm:px-2 md:px-2 py-0.5 xs:py-1 sm:py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 text-xs border border-orange-300 dark:border-orange-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            @click="saveTopic"
            class="px-1.5 xs:px-2 sm:px-2 md:px-2 py-0.5 xs:py-1 sm:py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            :aria-label="t('vocabulary.accordion.saveTopic')"
          >
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
          <button
            @click="cancelTopicInput"
            class="px-1.5 xs:px-2 sm:px-2 md:px-2 py-0.5 xs:py-1 sm:py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 text-xs bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            :aria-label="t('vocabulary.accordion.cancelTopic')"
          >
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- lg+ layout: horizontal with center topic section -->
      <div class="hidden lg:block">
        <!-- Center topic section for lg+ -->
        <div 
          @click="toggleAccordion"
          class="flex items-center justify-between flex-wrap gap-1 cursor-pointer py-1 -mx-1 px-1 rounded hover:bg-gray-50 dark:hover:bg-gray-custom transition-colors"
        >
          <!-- Center topic section -->
          <div class="flex-1 flex justify-center mx-1 xs:mx-2 sm:mx-4 min-w-0">
            <div v-if="!showTopicInput" class="flex items-center space-x-1.5 xs:space-x-1.5 sm:space-x-2 flex-nowrap">
              <!-- Topic display or add button -->
              <div v-if="groupTopic" class="flex items-center space-x-1 md:space-x-1.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 lg:py-1.5 xl:py-1.5 2xl:py-1.5 bg-orange-50 dark:bg-orange-900/50 rounded-full border border-orange-200 dark:border-orange-700 flex-shrink-0">
                <svg class="w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                <div class="relative">
                  <span
                    ref="topicSpanDesktop"
                    class="text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base font-medium text-orange-700 dark:text-orange-300 truncate max-w-[80px] sm:max-w-none block cursor-default"
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
                  class="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 focus:outline-none flex-shrink-0"
                  :aria-label="t('vocabulary.accordion.editTopic')"
                >
                  <svg class="w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                </button>
              </div>
              <button
                v-else
                @click.stop="showTopicInput = true"
                class="flex items-center space-x-1 md:space-x-1.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base font-medium bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-800/30 text-orange-600 dark:text-orange-400 rounded-full border border-dashed border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                :aria-label="t('vocabulary.accordion.addTopic', 'Add Topic')"
              >
                <svg class="w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <span>{{ t('vocabulary.accordion.addTopic', 'Add Topic') }}</span>
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
                    :aria-label="t('vocabulary.addWord', 'Add Word')"
                  >
                    <svg class="w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    <span>{{ t('vocabulary.addWord', 'Add Word') }}</span>
                  </button>
                </div>
                
                <!-- Manager Grammar button -->
                <div class="flex-shrink-0" @click.stop>
                  <GrammarManagerButton
                    :date="group.date"
                    @open-grammar-manager="openGrammarManager"
                  />
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
                class="flex-1 px-2 xs:px-2 sm:px-2 md:px-2 py-0.5 xs:py-1 sm:py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 text-xs border border-orange-300 dark:border-orange-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                @click="saveTopic"
                class="px-1.5 xs:px-2 sm:px-2 md:px-2 py-0.5 xs:py-1 sm:py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                :aria-label="t('vocabulary.accordion.saveTopic')"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </button>
              <button
                @click="cancelTopicInput"
                class="px-1.5 xs:px-2 sm:px-2 md:px-2 py-0.5 xs:py-1 sm:py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 text-xs bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                :aria-label="t('vocabulary.accordion.cancelTopic')"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
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
                :id="`date-group-${group.date}-topic-${topicGroup.topic}`"
                class="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-custom/50"
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
                  <div class="flex items-center space-x-1">
                    <h5 class="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {{ getTopicName(topicGroup.topic) }}
                      <span class="text-xs text-gray-500">({{ topicGroup.vocabularies.length }})</span>
                    </h5>
                    <!-- Info icon moved next to the topic name with tighter spacing -->
                    <div 
                      class="relative"
                      @mouseenter.stop="handleInfoMouseEnter(topicGroup.topic)"
                      @mouseleave="handleInfoMouseLeave"
                      @click.stop
                    >
                      <button
                        type="button"
                        class="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                        :aria-label="t('vocabulary.sameTopicDatesAria', 'Show dates with same topic')"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.75 15h-1.5v-6h1.5v6zm0-8h-1.5V7h1.5v2z"/>
                        </svg>
                      </button>
                      <!-- Tooltip panel -->
                      <div 
                        v-if="infoHoverTopic === topicGroup.topic"
                        class="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-64 rounded-lg shadow-xl ring-1 ring-black/5 bg-white text-gray-800 p-3 z-30 border border-gray-200 dark:bg-[#0a0a0a] dark:text-white dark:border dark:border-[#0f0f0f]"
                        @mouseenter="handleTooltipMouseEnter"
                        @mouseleave="handleTooltipMouseLeave"
                      >
                        <!-- Arrow pointer -->
                        <div 
                          class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-white dark:bg-[#0a0a0a]"
                          aria-hidden="true"
                        />
                        <div class="text-xs font-semibold mb-2">
                          {{ t('vocabulary.sameTopicDatesTitle', 'Dates with same topic') }}
                        </div>
                        <div 
                          v-if="!availableDatesByTopic[topicGroup.topic] || availableDatesByTopic[topicGroup.topic].length === 0"
                          class="text-xs text-gray-600 dark:text-white/70"
                        >
                          {{ t('vocabulary.sameTopicDatesEmpty', 'No other dates found for this topic') }}
                        </div>
                        <ul 
                          v-else 
                          class="text-xs space-y-1 pr-1 overflow-y-auto"
                          :class="{ 'max-h-24': (availableDatesByTopic[topicGroup.topic]?.length || 0) >= 4 }"
                        >
                          <li 
                            v-for="d in availableDatesByTopic[topicGroup.topic]" 
                            :key="d.date" 
                            class="flex items-center justify-between hover:bg-white dark:hover:bg-[#0f0f0f] rounded px-2 py-1 cursor-pointer"
                            @click="handleNavigateClick(d.date, topicGroup.topic)"
                          >
                            <span>{{ formatDateForDisplay(d.date) }}</span>
                            <span class="text-gray-500 dark:text-white/60">({{ d.count }})</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                <!-- Batch Move Arrow for Category -->
                <button
                  v-if="globalMoveMode && topicGroup.vocabularies.length > 0"
                  @click.stop="handleBatchMoveCategory(topicGroup)"
                  class="ml-auto mr-2 p-1.5 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                  :title="t('vocabulary.moveCategoryToAnotherDay', 'Move all words in this category to another day')"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </button>
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
                      class="relative inline-flex items-center px-2 md:px-2 py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ t('common.previous') }}
                    </button>
                    <button 
                      @click="nextTopicPage(topicGroup.topic)" 
                      :disabled="!getPaginatedTopicVocabularies(topicGroup).hasNext" 
                      class="ml-2 relative inline-flex items-center px-2 md:px-2 py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        }, `Showing ${getPaginatedTopicVocabularies(topicGroup).startIndex} to ${getPaginatedTopicVocabularies(topicGroup).endIndex} of ${getPaginatedTopicVocabularies(topicGroup).totalItems} items`) }}
                      </p>
                    </div>
                    <div>
                      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button 
                          @click="previousTopicPage(topicGroup.topic)" 
                          :disabled="!getPaginatedTopicVocabularies(topicGroup).hasPrevious" 
                          class="relative inline-flex items-center px-1.5 md:px-1.5 py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-xs font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            'relative inline-flex items-center px-2 md:px-2 py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 border text-xs font-medium'
                          ]"
                        >
                          {{ page === -1 ? '...' : page }}
                        </button>
                        
                        <!-- Next button -->
                        <button 
                          @click="nextTopicPage(topicGroup.topic)" 
                          :disabled="!getPaginatedTopicVocabularies(topicGroup).hasNext" 
                          class="relative inline-flex items-center px-1.5 md:px-1.5 py-1 md:py-1.5 xl:py-1.5 2xl:py-1.5 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-xs font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    :move-mode="globalMoveMode"
                    @play-audio="$emit('play-audio', $event)"
                    @edit-word="$emit('edit-word', $event)"
                    @delete-word="$emit('delete-word', $event)"
                    @toggle-favorite="$emit('toggle-favorite', $event)"
                    @view-details="$emit('view-details', $event)"
                    @move-vocabulary="handleMoveVocabulary"
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
              :move-mode="globalMoveMode"
              @play-audio="$emit('play-audio', $event)"
              @edit-word="$emit('edit-word', $event)"
              @delete-word="$emit('delete-word', $event)"
              @toggle-favorite="$emit('toggle-favorite', $event)"
              @view-details="$emit('view-details', $event)"
              @move-vocabulary="handleMoveVocabulary"
            />
        </div>
      </div>
    </transition>
    </div>


  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { loadComponentSafely } from '../../../utils/import-helper'
import type { GroupedVocabulary } from '../../../utils/dateUtils'
import { getTopicName } from '../../../utils/topicUtils'
import { getDateKey } from '../../../utils/dateUtils'

const { t, locale } = useI18n()

// Sử dụng defineAsyncComponent để import components an toàn
const VocabularyCard = defineAsyncComponent(
  loadComponentSafely(() => import('./VocabularyCard.vue'))
)

// Import the new components
const VocabularyNoteButton = defineAsyncComponent(
  loadComponentSafely(() => import('./VocabularyNoteButton.vue'))
)

// Async component imports
const GrammarManagerButton = defineAsyncComponent(() => loadComponentSafely(() => import('./GrammarManagerButton.vue'))())



interface Props {
  group: GroupedVocabulary
  defaultExpanded?: boolean
  accordionState?: Record<string, boolean>
  hoverToExpandEnabled?: boolean
  globalMoveMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpanded: false, // Changed to false for collapsed by default
  accordionState: () => ({}),
  hoverToExpandEnabled: false,
  globalMoveMode: false
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

// Move modal state moved to parent (VocabularyListView)

// Handle move vocabulary event
const handleMoveVocabulary = (data: { word: any, targetDate: string }) => {
  // Always emit to parent - let parent handle modal display
  emit('move-vocabulary', data)
}

// Modal methods moved to parent (VocabularyListView)

// Format date for display
const formatDateForDisplay = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
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

// Open grammar manager modal for this specific date
const openGrammarManager = (date: string) => {
  emit('open-grammar-manager', date)
}

// Handle batch move for all words in a category
const handleBatchMoveCategory = (topicGroup: any) => {
  // Emit batch move event with all words in the category
  emit('batch-move-category', {
    topic: topicGroup.topic,
    words: topicGroup.vocabularies,
    sourceDate: props.group.date
  })
}

// Info tooltip: available dates with same topic
const availableDatesByTopic = ref<Record<string, { date: string; count: number }[]>>({})
const infoHoverTopic = ref<string | null>(null)
// Pending open key for cross-page navigation fallback
const PENDING_OPEN_KEY = 'open-date-topic-pending'

const handleInfoMouseEnter = (topic: string) => {
  infoHoverTopic.value = topic
  emit('request-available-dates', { topic, currentDate: props.group.date })
}

const handleInfoMouseLeave = () => {
  // Delay hiding so user can move into tooltip panel
  setTimeout(() => {
    if (!isHoveringTooltip.value) {
      infoHoverTopic.value = null
    }
  }, 120)
}

const handleAvailableDatesResponse = (e: Event) => {
  const detail = (e as CustomEvent).detail as { topic: string; currentDate: string; availableDates: { date: string; count: number }[] }
  if (!detail) return
  if (detail.currentDate !== props.group.date) return
  availableDatesByTopic.value[detail.topic] = detail.availableDates || []
}

// Navigate to another date/topic from tooltip  
const handleNavigateClick = (targetDate: string, topic: string) => {
  console.log('🎯 Tooltip navigation:', { targetDate, topic, currentDate: props.group.date })
  infoHoverTopic.value = null
  
  // If navigating within same date, expand the target topic immediately
  if (targetDate === props.group.date) {
    console.log('📍 Same date navigation - expanding locally')
    isExpanded.value = true
    expandedTopics.value[topic] = true
    nextTick(() => {
      const el = document.getElementById(`date-group-${props.group.date}-topic-${topic}`)
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  } else {
    // For different dates, emit to parent for navigation
    console.log('🚀 Cross-date navigation - emitting to parent')
    emit('navigate-to-date-topic', { date: targetDate, topic })
  }
}

// Receive open instructions from parent to expand and scroll
const handleOpenDateTopic = (e: Event) => {
  const detail = (e as CustomEvent).detail as { date: string; topic: string }
  console.log('📨 Received open-date-topic event:', { detail, currentDate: props.group.date })
  
  if (!detail) {
    console.log('❌ No detail in event')
    return
  }
  
  if (detail.date !== props.group.date) {
    console.log('⏭️ Event not for this date group')
    return
  }
  
  console.log('✅ Opening accordion for cross-date navigation:', detail.topic)
  // Expand group and topic, then scroll
  isExpanded.value = true
  expandedTopics.value[detail.topic] = true
  // Sync with parent for persistence
  emit('accordion-toggle', props.group.date, true)
  if (props.accordionState) {
    // Best-effort local persistence (object is passed by reference from parent)
    props.accordionState[props.group.date] = true
  }
  nextTick(() => {
    // Delay a bit to ensure inner topic list has fully rendered
    setTimeout(() => {
      const el = document.getElementById(`date-group-${props.group.date}-topic-${detail.topic}`)
      if (el && typeof el.scrollIntoView === 'function') {
        console.log('🎯 Scrolling to topic element')
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        console.log('❌ Topic element not found:', `date-group-${props.group.date}-topic-${detail.topic}`)
      }
      // Clear pending key if present to avoid later unintended opens
      try { sessionStorage.removeItem(PENDING_OPEN_KEY) } catch {}
    }, 100)
  })
}

// Track hover state inside tooltip to prevent flicker
const isHoveringTooltip = ref(false)
const handleTooltipMouseEnter = () => {
  isHoveringTooltip.value = true
}
const handleTooltipMouseLeave = () => {
  isHoveringTooltip.value = false
  // When leaving tooltip, close if icon isn't hovered either
  infoHoverTopic.value = null
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
  
  // Add event listeners for hover behavior
  window.addEventListener('vocabulary-list-mouse-leave', handleVocabularyListMouseLeave)
  window.addEventListener('vocabulary-list-mouse-enter', handleVocabularyListMouseEnter)
  
  // Start modal watcher
  startModalWatcher()
  
  // Calculate height for smooth animation
  await nextTick()
  await calculateHeight()

  // Fallback: If event fired before we mounted, open from sessionStorage
  try {
    const raw = sessionStorage.getItem(PENDING_OPEN_KEY)
    if (raw) {
      const pending = JSON.parse(raw) as { date: string; topic: string } | null
      if (pending && pending.date === props.group.date) {
        console.log('🧭 Applying pending open on mount:', pending)
        isExpanded.value = true
        expandedTopics.value[pending.topic] = true
        emit('accordion-toggle', props.group.date, true)
        if (props.accordionState) {
          props.accordionState[props.group.date] = true
        }
        nextTick(() => {
          setTimeout(() => {
            const el = document.getElementById(`date-group-${props.group.date}-topic-${pending.topic}`)
            if (el && typeof el.scrollIntoView === 'function') {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          }, 100)
        })
        sessionStorage.removeItem(PENDING_OPEN_KEY)
      }
    }
  } catch (err) {
    console.warn('Failed to apply pending open-date-topic on mount:', err)
  }

  // Listen for available dates response from parent
  window.addEventListener('available-dates-response', handleAvailableDatesResponse as EventListener)
  // Listen for open/scroll command from parent after pagination change
  window.addEventListener('open-date-topic', handleOpenDateTopic as EventListener)
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

  // Remove available dates response listener
  window.removeEventListener('available-dates-response', handleAvailableDatesResponse as EventListener)
  window.removeEventListener('open-date-topic', handleOpenDateTopic as EventListener)
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
  'open-grammar-manager': [date: string]
  'move-vocabulary': [data: { word: any, targetDate: string }]
  'request-available-dates': [data: { topic: string, currentDate: string }]
  'navigate-to-date-topic': [payload: { date: string, topic: string }]
  'batch-move-category': [data: { topic: string, words: any[], sourceDate: string }]
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
