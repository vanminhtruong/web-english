<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="floating-shapes">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div class="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-1000"></div>
        <div class="hidden sm:block absolute bottom-24 right-24 w-52 h-52 bg-indigo-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3000"></div>
      </div>
    </div>
    
    <!-- Header -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3 sm:pt-6">
      <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6">
        <div class="flex flex-col xs:flex-col sm:flex-row items-start xs:items-start sm:items-center justify-between mb-3 xs:mb-3 sm:mb-4 gap-3 xs:gap-3 sm:gap-4">
          <div class="flex items-center">
            <div class="animate-pulse-slow">
              <div class="w-2 xs:w-2.5 sm:w-2.5 h-2 xs:h-2.5 sm:h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2 xs:mr-2.5 sm:mr-2.5"></div>
            </div>
            <div>
              <h1 class="text-base xs:text-lg sm:text-xl md:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-1 xs:mb-1 sm:mb-2">
                {{ t('vocabulary.examples.title', 'Example Manager') }}
              </h1>
              <p class="text-xs xs:text-sm sm:text-base md:text-base text-gray-600 dark:text-gray-300">
                {{ t('vocabulary.examples.description', 'Create and manage example sentences based on your vocabulary words') }}
              </p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 xs:space-x-3 sm:space-x-4">
            <!-- Topic Grouping Toggle -->
            <div class="flex items-center space-x-2 xs:space-x-2 sm:space-x-3">
              <span class="text-xs xs:text-sm sm:text-sm md:text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ t('vocabulary.examples.groupByTopic', 'Group by Topic') }}
              </span>
              <button
                @click="toggleGrouping"
                class="relative inline-flex h-5 xs:h-6 sm:h-6 w-9 xs:w-11 sm:w-11 items-center rounded-full transition-colors duration-300"
                :class="groupByTopic ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-200 dark:bg-[#0a0a0a]'"
              >
                <span
                  class="inline-block h-3 xs:h-4 sm:h-4 w-3 xs:w-4 sm:w-4 transform rounded-full bg-white transition-transform duration-300 shadow-lg"
                  :class="groupByTopic ? 'translate-x-5 xs:translate-x-6 sm:translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden">
      <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
        <div class="flex items-center mb-3 xs:mb-3 sm:mb-4">
          <div class="animate-pulse-slow">
            <div class="w-2 xs:w-2.5 sm:w-2.5 h-2 xs:h-2.5 sm:h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2 xs:mr-2.5 sm:mr-2.5"></div>
          </div>
          <h3 class="text-sm xs:text-base sm:text-lg md:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {{ t('common.search', 'Search') }}
          </h3>
        </div>
        <div class="relative">
          <input
            v-model="searchTerm"
            type="text"
            :placeholder="t('vocabulary.examples.searchVocabulary', 'Search vocabulary words...')"
            class="w-full pl-8 xs:pl-9 sm:pl-10 md:pl-10 pr-3 xs:pr-4 sm:pr-4 py-1.5 xs:py-2 sm:py-2 md:py-2 text-sm xs:text-sm sm:text-base md:text-base border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-300"
          />
          <svg class="absolute left-2 xs:left-2.5 sm:left-3 top-1.5 xs:top-2 sm:top-2.5 h-4 xs:h-4 sm:h-5 w-4 xs:w-4 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Vocabulary List with Examples -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden">
      <div class="space-y-6">
        <!-- Empty State -->
        <div v-if="filteredVocabulary.length === 0" class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
          <div class="text-center py-6 xs:py-6 sm:py-8">
            <div class="animate-pulse-slow">
              <div class="w-2.5 xs:w-3 sm:w-3 h-2.5 xs:h-3 sm:h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mx-auto mb-2 xs:mb-2 sm:mb-3"></div>
            </div>
            <svg class="mx-auto h-8 xs:h-10 sm:h-12 w-8 xs:w-10 sm:w-12 text-gray-400 mb-3 xs:mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 class="text-base xs:text-lg sm:text-lg md:text-lg font-medium text-gray-900 dark:text-white mb-1 xs:mb-1 sm:mb-2">
              {{ t('vocabulary.examples.noVocabulary', 'No vocabulary words found') }}
            </h3>
            <p class="text-xs xs:text-sm sm:text-base md:text-base text-gray-600 dark:text-gray-300">
              {{ t('vocabulary.examples.noVocabularyDescription', 'Add some vocabulary words first to create examples for them.') }}
            </p>
          </div>
        </div>

        <!-- Normal View: Individual Vocabulary Cards -->
        <template v-else-if="!groupByTopic">
          <div
            v-for="vocab in paginatedVocabulary"
            :key="vocab.id"
            class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6"
          >
            <!-- Vocabulary Header -->
            <div @click="toggleVocabExamples(vocab.id)" class="flex flex-col xs:flex-col sm:flex-row items-start justify-between mb-3 xs:mb-3 sm:mb-4 pb-2 xs:pb-2 sm:pb-3 border-b border-gray-200/50 dark:border-gray-700/50 gap-3 xs:gap-3 sm:gap-0">
              <div class="flex items-start space-x-2 xs:space-x-2 sm:space-x-3 flex-1">
                <div class="animate-pulse-slow mt-1">
                  <div class="w-2 xs:w-2.5 sm:w-2.5 h-2 xs:h-2.5 sm:h-2.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-1 xs:space-x-1 sm:space-x-2 mb-1">
                    <h3 class="text-base xs:text-lg sm:text-lg md:text-lg font-bold text-gray-900 dark:text-white truncate">{{ vocab.word }}</h3>
                    <button
                      @click.stop="playVocabularyAudio(vocab.word)"
                      class="p-1 xs:p-1.5 sm:p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 group flex-shrink-0"
                      :title="t('vocabulary.examples.playPronunciation', 'Play pronunciation')"
                    >
                      <svg class="w-3 xs:w-4 sm:w-4 h-3 xs:h-4 sm:h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.464-9.536a9 9 0 010 12.728M9 9l3-3v6l-3-3H4a1 1 0 01-1-1V10a1 1 0 011-1h5z" />
                      </svg>
                    </button>
                    <!-- Examples Toggle Button -->
                    <button
                      v-if="getVocabExampleCount(vocab.id) > 0"
                      @click.stop="toggleVocabExamples(vocab.id)"
                      class="p-1 xs:p-1.5 sm:p-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-[#0a0a0a]/20 rounded-lg transition-all duration-300 group flex-shrink-0"
                      :title="expandedExamples[vocab.id] ? t('vocabulary.examples.hideExamples', 'Hide examples') : t('vocabulary.examples.showExamples', 'Show examples')"
                    >
                      <svg 
                        class="w-3 xs:w-4 sm:w-4 h-3 xs:h-4 sm:h-4 group-hover:scale-110 transition-all duration-200" 
                        :class="{ 'rotate-180': expandedExamples[vocab.id] }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <p class="text-xs xs:text-sm sm:text-sm md:text-sm text-gray-600 dark:text-gray-300 mb-1 xs:mb-1 sm:mb-2">{{ vocab.meaning }}</p>
                  <div class="flex items-center space-x-1 xs:space-x-1 sm:space-x-2">
                    <span class="inline-flex items-center px-1.5 xs:px-2 sm:px-2.5 py-0.5 rounded-full text-2xs xs:text-xs sm:text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                      {{ vocab.partOfSpeech }}
                    </span>
                    <span class="text-2xs xs:text-xs sm:text-xs text-gray-500 dark:text-gray-400">
                      {{ getVocabExampleCount(vocab.id) }} {{ getVocabExampleCount(vocab.id) === 1 ? 'example' : 'examples' }}
                    </span>
                  </div>
                </div>
              </div>
              <button
                @click.stop="openCreateDialogForVocab(vocab)"
                class="px-2 xs:px-2.5 sm:px-3 py-1.5 xs:py-1.5 sm:py-2 text-xs xs:text-xs sm:text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-1 xs:space-x-1 sm:space-x-2 flex-shrink-0"
              >
                <svg class="w-3 xs:w-3 sm:w-4 h-3 xs:h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="hidden xs:inline sm:inline">{{ t('vocabulary.examples.addExample', 'Add Example') }}</span>
                <span class="xs:hidden sm:hidden">{{ t('common.add', 'Add') }}</span>
              </button>
            </div>

            <!-- Examples for this vocabulary (Collapsible) -->
            <transition
              name="examples-accordion"
              @enter="examplesEnter"
              @after-enter="examplesAfterEnter"
              @enter-cancelled="examplesEnterCancelled"
              @before-leave="examplesBeforeLeave"
              @leave="examplesLeave"
              @after-leave="examplesAfterLeave"
            >
              <div v-if="expandedExamples[vocab.id]" class="border-t border-slate-200 dark:border-dark-bg-mute bg-slate-50 dark:bg-dark-bg-mute">
                <div v-if="getVocabExamples(vocab.id).length === 0" class="p-3 xs:p-4 sm:p-6 text-center text-slate-500 dark:text-slate-400">
                  <p class="text-xs xs:text-sm sm:text-base">{{ t('vocabulary.examples.noExamples', 'No examples found for this vocabulary.') }}</p>
                </div>
                <div v-else>
                  <!-- Examples Content -->
                  <div class="p-2 xs:p-3 sm:p-4 space-y-2 xs:space-y-3 sm:space-y-4">
                    <div 
                      v-for="example in getPaginatedVocabExamples(vocab.id)" 
                      :key="example.id" 
                      class="bg-white dark:bg-dark-bg border border-slate-200 dark:border-dark-bg-mute rounded-lg p-2 xs:p-3 sm:p-4 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 xs:gap-2 sm:gap-3">
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-1 xs:gap-1 sm:gap-2 mb-1 xs:mb-1 sm:mb-2">
                            <h4 class="text-xs xs:text-sm sm:text-sm md:text-sm font-medium text-slate-900 dark:text-slate-100 truncate flex-1">{{ example.title }}</h4>
                            <button
                              @click="audioSystem.playVocabularySound(example.content, 'en')"
                              class="flex-shrink-0 p-1 xs:p-1.5 sm:p-1.5 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200 transform hover:scale-110"
                              :title="t('vocabulary.examples.playExample', 'Play example pronunciation')"
                            >
                              <svg class="w-3 xs:w-4 sm:w-4 h-3 xs:h-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9l3-3v12l-3-3H5a2 2 0 01-2-2V9a2 2 0 012-2h4z"></path>
                              </svg>
                            </button>
                          </div>
                          <p class="text-slate-700 dark:text-slate-300 text-xs xs:text-sm sm:text-sm md:text-sm mb-1 xs:mb-1 sm:mb-2 leading-relaxed">{{ example.content }}</p>
                          <div class="flex flex-wrap gap-1 xs:gap-1 sm:gap-2 text-2xs xs:text-xs sm:text-xs">
                            <span class="px-1.5 xs:px-2 sm:px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full capitalize">{{ example.type }}</span>
                            <span v-if="example.difficulty" class="px-1.5 xs:px-2 sm:px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full capitalize">{{ example.difficulty }}</span>
                            <span v-if="example.context" class="px-1.5 xs:px-2 sm:px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full">{{ example.context }}</span>
                          </div>
                        </div>
                        <div class="flex flex-row xs:flex-row sm:flex-row gap-1 xs:gap-1 sm:gap-2 flex-shrink-0 mt-2 xs:mt-0 sm:mt-0">
                          <button 
                            @click="editExample(example)"
                            class="px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1 sm:py-1.5 text-2xs xs:text-xs sm:text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center gap-1"
                          >
                            <svg class="w-2.5 xs:w-3 sm:w-3 h-2.5 xs:h-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            <span class="hidden xs:inline sm:inline">{{ t('common.edit', 'Edit') }}</span>
                          </button>
                          <button 
                            @click="deleteExample(example)"
                            class="px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1 sm:py-1.5 text-2xs xs:text-xs sm:text-xs bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center gap-1"
                          >
                            <svg class="w-2.5 xs:w-3 sm:w-3 h-2.5 xs:h-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            <span class="hidden xs:inline sm:inline">{{ t('common.delete', 'Delete') }}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Examples Pagination -->
                  <div v-if="getVocabExamplePages(vocab.id) > 1" class="border-t border-slate-200 dark:border-dark-bg-mute px-2 xs:px-3 sm:px-4 py-2 xs:py-2 sm:py-3">
                    <div class="flex items-center justify-between">
                      <!-- Mobile Pagination (Simple) -->
                      <div class="flex sm:hidden items-center gap-1 xs:gap-1 sm:gap-2">
                        <button
                          @click="previousExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasPrevious"
                          class="px-1.5 xs:px-2 py-0.5 xs:py-1 text-2xs xs:text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          {{ t('common.previous', 'Prev') }}
                        </button>
                        <span class="text-2xs xs:text-xs text-slate-600 dark:text-slate-400 px-1">
                          {{ getExamplePaginationInfo(vocab.id).currentPage }} / {{ getExamplePaginationInfo(vocab.id).totalPages }}
                        </span>
                        <button
                          @click="nextExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasNext"
                          class="px-1.5 xs:px-2 py-0.5 xs:py-1 text-2xs xs:text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          {{ t('common.next', 'Next') }}
                        </button>
                      </div>
                      
                      <!-- Desktop Pagination (Full) -->
                      <div class="hidden sm:flex items-center gap-2">
                        <button
                          @click="previousExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasPrevious"
                          class="px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          {{ t('common.previous', 'Previous') }}
                        </button>
                        
                        <div class="flex gap-1">
                          <button
                            v-for="page in Math.min(getExamplePaginationInfo(vocab.id).totalPages, 5)"
                            :key="page"
                            @click="goToExamplePage(vocab.id, page)"
                            :class="[
                              'px-3 py-1.5 text-sm rounded transition-colors',
                              getExamplePaginationInfo(vocab.id).currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                            ]"
                          >
                            {{ page }}
                          </button>
                        </div>
                        
                        <button
                          @click="nextExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasNext"
                          class="px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          {{ t('common.next', 'Next') }}
                        </button>
                      </div>
                      
                      <!-- Examples count info -->
                      <div class="text-2xs xs:text-xs sm:text-xs text-slate-500 dark:text-slate-400">
                        {{ t('vocabulary.examples.showingExamples', { start: getExamplePaginationInfo(vocab.id).start, end: getExamplePaginationInfo(vocab.id).end, total: getExamplePaginationInfo(vocab.id).totalExamples }, 'Showing {start} to {end} of {total} examples') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          
          <!-- Pagination for Normal View -->
          <div v-if="totalPages > 1" class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-4">
            <div class="flex items-center justify-between">
              <!-- Mobile pagination -->
              <div class="flex-1 flex justify-between sm:hidden">
                <button 
                  @click="previousPage" 
                  :disabled="currentPage === 1" 
                  class="relative inline-flex items-center px-2 xs:px-3 py-1 xs:py-1.5 border border-gray-300 dark:border-gray-600 text-xs xs:text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ t('common.previous', 'Prev') }}
                </button>
                <div class="flex items-center px-2">
                  <span class="text-2xs xs:text-xs text-gray-600 dark:text-gray-400">
                    {{ currentPage }} / {{ totalPages }}
                  </span>
                </div>
                <button 
                  @click="nextPage" 
                  :disabled="currentPage === totalPages" 
                  class="relative inline-flex items-center px-2 xs:px-3 py-1 xs:py-1.5 border border-gray-300 dark:border-gray-600 text-xs xs:text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ t('common.next', 'Next') }}
                </button>
              </div>
              
              <!-- Desktop pagination -->
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-xs xs:text-sm sm:text-sm md:text-sm text-gray-700 dark:text-gray-300">
                    {{ t('vocabulary.examples.showingVocabulary', { 
                      start: startIndex, 
                      end: endIndex, 
                      total: filteredVocabulary.length 
                    }, `Showing ${startIndex} to ${endIndex} of ${filteredVocabulary.length} vocabulary words`) }}
                  </p>
                </div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <!-- Previous button -->
                  <button 
                    @click="previousPage" 
                    :disabled="currentPage === 1" 
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">{{ t('common.previous', 'Previous') }}</span>
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                  
                  <!-- Page numbers -->
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      page === currentPage
                        ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300'
                        : 'bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600',
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    ]"
                  >
                    {{ page }}
                  </button>
                  
                  <!-- Next button -->
                  <button 
                    @click="nextPage" 
                    :disabled="currentPage === totalPages" 
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">{{ t('common.next', 'Next') }}</span>
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </template>

        <!-- Grouped View: Topic-based Accordion -->
        <TopicGroupAccordion
          v-else
          :vocabulary-list="filteredVocabulary"
          :examples="examples"
          @add-example="openCreateDialogForVocab"
          @edit-example="editExample"
          @delete-example="deleteExample"
        />
      </div>
    </div>

    <!-- Create/Edit Example Dialog -->
    <ExampleFormDialog
      v-if="showCreateDialog || showEditDialog"
      :show="showCreateDialog || showEditDialog"
      :example="currentExample"
      :vocabulary-id="selectedVocabulary"
      :vocabulary-list="vocabularyList"
      @close="closeDialog"
      @save="saveExample"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast, POSITION } from 'vue-toastification'
import { useVocabularyStore } from '../../composables/useVocabularyStore'
import { useAudioSystem } from '../practice/composables/bubble-shooter/useAudioSystem'
const TopicGroupAccordion = defineAsyncComponent(() => import('./components/TopicGroupAccordion.vue'))
const ExampleFormDialog = defineAsyncComponent(() => import('./components/ExampleFormDialog.vue'))
const ConfirmToast = defineAsyncComponent(() => import('../../components/common/ConfirmToast.vue'))

interface Example {
  id: string
  vocabularyId: string
  vocabulary?: {
    id: string
    word: string
  }
  title: string
  content: string
  translation?: string
  context?: string
  type: 'sentence' | 'dialogue' | 'phrase' | 'context'
  difficulty?: 'easy' | 'medium' | 'hard'
  tags?: string[]
  createdAt: string
  updatedAt: string
}

const { t } = useI18n()
const toast = useToast()
const vocabularyStore = useVocabularyStore()
const audioSystem = useAudioSystem()

// State
const examples = ref<Example[]>([])
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const currentExample = ref<Example | null>(null)
const searchTerm = ref('')
const selectedVocabulary = ref('')
const selectedType = ref('')
const groupByTopic = ref(false) // Toggle state for grouping by topic

// Pagination state for normal view
const currentPage = ref(1)
const itemsPerPage = ref(5) // 5 vocabulary items per page

// State for expanded examples - each vocabulary can expand/collapse its examples independently
const expandedExamples = ref<Record<string, boolean>>({})

// Pagination state for examples within each vocabulary
const examplePages = ref<Record<string, number>>({})
const examplesPerPage = ref(5) // 5 examples per page

// Computed
const vocabularyList = computed(() => vocabularyStore.allVocabularies.value.map(v => ({ 
  id: v.id.toString(), 
  word: v.word, 
  meaning: v.meaning, 
  partOfSpeech: v.partOfSpeech || 'unknown',
  category: v.category || 'uncategorized',
  level: v.level || 'unknown'
})))

const filteredVocabulary = computed(() => {
  let filtered = vocabularyList.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(v => 
      v.word.toLowerCase().includes(term) ||
      v.meaning.toLowerCase().includes(term)
    )
  }

  return filtered
})

// Pagination computeds for normal view
const totalPages = computed(() => {
  if (groupByTopic.value) return 1
  return Math.ceil(filteredVocabulary.value.length / itemsPerPage.value)
})

const paginatedVocabulary = computed(() => {
  if (groupByTopic.value) return filteredVocabulary.value
  
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredVocabulary.value.slice(start, end)
})

const startIndex = computed(() => {
  if (groupByTopic.value) return 1
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endIndex = computed(() => {
  if (groupByTopic.value) return filteredVocabulary.value.length
  return Math.min(currentPage.value * itemsPerPage.value, filteredVocabulary.value.length)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  const totalP = totalPages.value
  
  if (totalP <= maxVisible) {
    for (let i = 1; i <= totalP; i++) {
      pages.push(i)
    }
  } else {
    const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
    const end = Math.min(totalP, start + maxVisible - 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

const filteredExamples = computed(() => {
  let filtered = examples.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(e => 
      e.title.toLowerCase().includes(term) ||
      e.content.toLowerCase().includes(term) ||
      e.vocabulary?.word.toLowerCase().includes(term)
    )
  }

  if (selectedVocabulary.value) {
    filtered = filtered.filter(e => e.vocabularyId === selectedVocabulary.value)
  }

  if (selectedType.value) {
    filtered = filtered.filter(e => e.type === selectedType.value)
  }

  return filtered
})

// Methods
const loadExamples = () => {
  const stored = localStorage.getItem('vocabulary-examples')
  if (stored) {
    examples.value = JSON.parse(stored)
    // Populate vocabulary info
    examples.value.forEach(example => {
      const vocab = vocabularyList.value.find(v => v.id === example.vocabularyId)
      if (vocab) {
        example.vocabulary = { id: vocab.id, word: vocab.word }
      }
    })
  }
}

const saveExamplesToStorage = () => {
  localStorage.setItem('vocabulary-examples', JSON.stringify(examples.value))
}

const getVocabExamples = (vocabId: string) => {
  return examples.value.filter(e => e.vocabularyId === vocabId)
}

// Get paginated examples for a vocabulary
const getPaginatedVocabExamples = (vocabId: string) => {
  const allExamples = getVocabExamples(vocabId)
  const currentPage = examplePages.value[vocabId] || 1
  const start = (currentPage - 1) * examplesPerPage.value
  const end = start + examplesPerPage.value
  return allExamples.slice(start, end)
}

// Get total pages for vocabulary examples
const getVocabExamplePages = (vocabId: string) => {
  const totalExamples = getVocabExamples(vocabId).length
  return Math.ceil(totalExamples / examplesPerPage.value)
}

// Navigate example pages
const goToExamplePage = (vocabId: string, page: number) => {
  const totalPages = getVocabExamplePages(vocabId)
  if (page >= 1 && page <= totalPages) {
    examplePages.value[vocabId] = page
    saveExamplePagesState()
  }
}

// Previous/next example page
const previousExamplePage = (vocabId: string) => {
  const currentPage = examplePages.value[vocabId] || 1
  if (currentPage > 1) {
    goToExamplePage(vocabId, currentPage - 1)
  }
}

const nextExamplePage = (vocabId: string) => {
  const currentPage = examplePages.value[vocabId] || 1
  const totalPages = getVocabExamplePages(vocabId)
  if (currentPage < totalPages) {
    goToExamplePage(vocabId, currentPage + 1)
  }
}

// Get example pagination info
const getExamplePaginationInfo = (vocabId: string) => {
  const totalExamples = getVocabExamples(vocabId).length
  const currentPage = examplePages.value[vocabId] || 1
  const totalPages = getVocabExamplePages(vocabId)
  const start = (currentPage - 1) * examplesPerPage.value + 1
  const end = Math.min(currentPage * examplesPerPage.value, totalExamples)
  
  return {
    totalExamples,
    totalPages,
    currentPage,
    start,
    end,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1
  }
}

const getVocabExampleCount = (vocabId: string) => {
  return examples.value.filter(e => e.vocabularyId === vocabId).length
}

const openCreateDialogForVocab = (vocab: any) => {
  currentExample.value = null
  selectedVocabulary.value = vocab.id
  showCreateDialog.value = true
}

const editExample = (example: Example) => {
  currentExample.value = { ...example }
  showEditDialog.value = true
}

const deleteExample = (example: Example) => {
  const toastId = toast(
    {
      component: ConfirmToast,
      props: {
        message: t('vocabulary.examples.confirmDelete', 'Are you sure you want to delete this example?'),
        confirmText: t('common.confirm', 'Confirm'),
        cancelText: t('common.cancel', 'Cancel'),
        onConfirm: () => {
          examples.value = examples.value.filter(e => e.id !== example.id)
          saveExamplesToStorage()
          toast.dismiss(toastId)
          toast.success(t('vocabulary.examples.deleteSuccess', 'Example deleted successfully'))
        },
        onCancel: () => {
          toast.dismiss(toastId)
        },
      },
    },
    {
      position: POSITION.TOP_CENTER,
      timeout: false,
      closeButton: false,
      draggable: false,
      icon: false,
    }
  )
}

const saveExample = (exampleData: Partial<Example>) => {
  if (currentExample.value && showEditDialog.value) {
    // Update existing example
    const index = examples.value.findIndex(e => e.id === currentExample.value!.id)
    if (index !== -1) {
      examples.value[index] = {
        ...examples.value[index],
        ...exampleData,
        updatedAt: new Date().toISOString()
      }
      // Update vocabulary info
      const vocab = vocabularyList.value.find(v => v.id === examples.value[index].vocabularyId)
      if (vocab) {
        examples.value[index].vocabulary = { id: vocab.id, word: vocab.word }
      }
    }
  } else {
    // Create new example
    const newExample: Example = {
      id: Date.now().toString(),
      vocabularyId: exampleData.vocabularyId!,
      title: exampleData.title!,
      content: exampleData.content!,
      translation: exampleData.translation,
      context: exampleData.context,
      type: exampleData.type!,
      difficulty: exampleData.difficulty,
      tags: exampleData.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    // Add vocabulary info
    const vocab = vocabularyList.value.find(v => v.id === newExample.vocabularyId)
    if (vocab) {
      newExample.vocabulary = { id: vocab.id, word: vocab.word }
    }
    examples.value.push(newExample)
  }
  
  saveExamplesToStorage()
  closeDialog()
}

const closeDialog = () => {
  showCreateDialog.value = false
  showEditDialog.value = false
  currentExample.value = null
}

const getTypeLabel = (type: string) => {
  const labels = {
    'sentence': t('vocabulary.examples.types.sentence', 'Sentence'),
    'dialogue': t('vocabulary.examples.types.dialogue', 'Dialogue'),
    'phrase': t('vocabulary.examples.types.phrase', 'Phrase'),
    'context': t('vocabulary.examples.types.context', 'Context')
  }
  return labels[type as keyof typeof labels] || type
}

const getTypeColorClass = (type: string) => {
  const classes = {
    'sentence': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'dialogue': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'phrase': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'context': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

const getDifficultyLabel = (difficulty: string) => {
  const labels = {
    'easy': t('common.easy', 'Easy'),
    'medium': t('vocabulary.examples.difficulty.medium', 'Medium'),
    'hard': t('common.difficult', 'Difficult')
  }
  return labels[difficulty as keyof typeof labels] || difficulty
}

const getDifficultyColorClass = (difficulty: string) => {
  const classes = {
    'easy': 'text-green-600 dark:text-green-400',
    'medium': 'text-yellow-600 dark:text-yellow-400',
    'hard': 'text-red-600 dark:text-red-400'
  }
  return classes[difficulty as keyof typeof classes] || 'text-gray-600 dark:text-gray-400'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// Audio functions
const playVocabularyAudio = (word: string) => {
  audioSystem.playVocabularySound(word, 'en')
}

const playExampleAudio = (text: string) => {
  audioSystem.playVocabularySound(text, 'en')
}

// Pagination functions for normal view
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Toggle examples visibility for vocabulary
const toggleVocabExamples = (vocabId: string) => {
  expandedExamples.value[vocabId] = !expandedExamples.value[vocabId]
  saveExpandedExamplesState()
}

// Load expanded examples state from localStorage
const loadExpandedExamplesState = () => {
  try {
    const saved = localStorage.getItem('vocabulary-examples-expanded-vocab')
    if (saved) {
      const parsed = JSON.parse(saved)
      expandedExamples.value = { ...parsed }
    }
  } catch (error) {
    console.error('Error loading expanded examples state:', error)
  }
}

// Save expanded examples state to localStorage
const saveExpandedExamplesState = () => {
  try {
    localStorage.setItem('vocabulary-examples-expanded-vocab', JSON.stringify(expandedExamples.value))
  } catch (error) {
    console.error('Error saving expanded examples state:', error)
  }
}

// Load example pages state from localStorage
const loadExamplePagesState = () => {
  try {
    const saved = localStorage.getItem('vocabulary-examples-pages')
    if (saved) {
      const parsed = JSON.parse(saved)
      examplePages.value = { ...parsed }
    }
  } catch (error) {
    console.error('Error loading example pages state:', error)
  }
}

// Save example pages state to localStorage
const saveExamplePagesState = () => {
  try {
    localStorage.setItem('vocabulary-examples-pages', JSON.stringify(examplePages.value))
  } catch (error) {
    console.error('Error saving example pages state:', error)
  }
}

// Initialize expanded state for vocabulary
const initializeExpandedExamplesState = () => {
  let hasChanges = false
  
  paginatedVocabulary.value.forEach(vocab => {
    if (expandedExamples.value[vocab.id] === undefined) {
      expandedExamples.value[vocab.id] = false // Default to collapsed for better performance
      hasChanges = true
    }
    if (examplePages.value[vocab.id] === undefined) {
      examplePages.value[vocab.id] = 1 // Default to page 1
      hasChanges = true
    }
  })
  
  // Only save if there were changes
  if (hasChanges) {
    saveExpandedExamplesState()
    saveExamplePagesState()
  }
}

// Clean up old vocabulary IDs from localStorage
const cleanupOldVocabularyStates = () => {
  try {
    const currentVocabIds = new Set(vocabularyList.value.map(v => v.id))
    
    // Clean expanded examples state
    const expandedKeys = Object.keys(expandedExamples.value)
    let expandedChanged = false
    expandedKeys.forEach(vocabId => {
      if (!currentVocabIds.has(vocabId)) {
        delete expandedExamples.value[vocabId]
        expandedChanged = true
      }
    })
    
    // Clean example pages state  
    const pagesKeys = Object.keys(examplePages.value)
    let pagesChanged = false
    pagesKeys.forEach(vocabId => {
      if (!currentVocabIds.has(vocabId)) {
        delete examplePages.value[vocabId]
        pagesChanged = true
      }
    })
    
    // Save only if changed
    if (expandedChanged) {
      saveExpandedExamplesState()
    }
    if (pagesChanged) {
      saveExamplePagesState()
    }
  } catch (error) {
    console.error('Error cleaning up old vocabulary states:', error)
  }
}

// Examples accordion animation functions
const examplesEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.overflow = 'hidden'
}

const examplesAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

const examplesEnterCancelled = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

const examplesBeforeLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.style.overflow = 'hidden'
}

const examplesLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.style.overflow = 'hidden'
  // Force reflow
  element.offsetHeight
  element.style.height = '0'
}

const examplesAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

// Toggle grouping function
const toggleGrouping = () => {
  groupByTopic.value = !groupByTopic.value
  // Save preference to localStorage
  localStorage.setItem('vocabulary-examples-group-by-topic', JSON.stringify(groupByTopic.value))
}

// Load grouping preference from localStorage
const loadGroupingPreference = () => {
  try {
    const saved = localStorage.getItem('vocabulary-examples-group-by-topic')
    if (saved) {
      groupByTopic.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading grouping preference:', error)
    groupByTopic.value = false
  }
}

// Watch paginatedVocabulary to initialize expanded state for new vocabularies
watch(() => paginatedVocabulary.value, () => {
  initializeExpandedExamplesState()
}, { immediate: true })

// Watch vocabulary list changes to cleanup old states
watch(() => vocabularyList.value, () => {
  cleanupOldVocabularyStates()
}, { deep: true })

// Watch for changes in expanded state to auto-save
watch(() => expandedExamples.value, () => {
  saveExpandedExamplesState()
}, { deep: true })

// Watch for changes in example pages to auto-save
watch(() => examplePages.value, () => {
  saveExamplePagesState()
}, { deep: true })

onMounted(() => {
  loadExamples()
  loadGroupingPreference()
  loadExpandedExamplesState()
  loadExamplePagesState()
  // Clean up any orphaned vocabulary states on mount
  setTimeout(() => {
    cleanupOldVocabularyStates()
  }, 100)
})
</script>

<style scoped>
/* Examples accordion animation */
.examples-accordion-enter-active,
.examples-accordion-leave-active {
  transition: height 0.3s ease-in-out;
}

.examples-accordion-enter-from,
.examples-accordion-leave-to {
  height: 0;
  overflow: hidden;
}

.examples-accordion-content {
  overflow: hidden;
}

/* Custom text-2xs for extra small screens */
.text-2xs {
  font-size: 0.6875rem; /* 11px */
  line-height: 1rem; /* 16px */
}
</style>
