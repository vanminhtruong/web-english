<template>
  <div class="space-y-4">
    <div
      v-for="(group, topicKey) in groupedVocabulary"
      :key="topicKey"
      class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.002]"
    >
      <!-- Topic Header with Accordion Toggle -->
      <div 
        @click="toggleGroup(topicKey)"
        class="flex items-center justify-between p-4 cursor-pointer hover:bg-white/20 dark:hover:bg-[#0a0a0a]/20 rounded-t-2xl transition-all duration-300"
      >
        <div class="flex items-center space-x-3">
          <div class="animate-pulse-slow">
            <div class="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </div>
          <div>
            <h3 class="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {{ getTopicName(topicKey) }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ group.length }} {{ group.length === 1 ? t('vocabulary.word', 'word') : t('vocabulary.words', 'words') }}
            </p>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <!-- Examples count -->
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ getTotalExamplesForTopic(group) }} {{ t('vocabulary.examples.examples', 'examples') }}
          </span>
          
          <!-- Accordion toggle icon -->
          <svg 
            class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300"
            :class="{ 'rotate-180': expandedGroups[topicKey] }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- Vocabulary Content (Collapsible) -->
      <transition
        name="accordion"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div v-if="expandedGroups[topicKey]" class="accordion-content border-t border-gray-200/50 dark:border-gray-700/50">
          <div class="p-4 space-y-4">
            <div
              v-for="vocab in getPaginatedTopicVocabs(topicKey)"
              :key="vocab.id"
              class="bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-4 hover:shadow-lg transition-all duration-300"
            >
              <!-- Vocabulary Header -->
              <div @click="toggleVocabExamples(vocab.id)" class="flex items-center justify-between mb-3 pb-2 border-b border-gray-200/30 dark:border-gray-700/30 cursor-pointer">
                <div class="flex items-center space-x-3">
                  <div class="animate-pulse-slow">
                    <div class="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <div class="flex items-center space-x-2">
                      <h4 class="text-base font-bold text-gray-900 dark:text-white">{{ vocab.word }}</h4>
                      <button
                        @click.stop="playVocabularyAudio(vocab.word)"
                        class="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded transition-all duration-300 group"
                        :title="t('vocabulary.examples.playPronunciation', 'Play pronunciation')"
                      >
                        <svg class="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.464-9.536a9 9 0 010 12.728M9 9l3-3v6l-3-3H4a1 1 0 01-1-1V10a1 1 0 011-1h5z" />
                        </svg>
                      </button>
                      <!-- Examples Toggle Button (always visible, even if 0 examples) -->
                      <button
                        @click.stop="toggleVocabExamples(vocab.id)"
                        class="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-[#0a0a0a]/20 rounded transition-all duration-300 group"
                        :title="expandedVocabExamples[vocab.id] ? t('vocabulary.examples.hideExamples', 'Hide examples') : t('vocabulary.examples.showExamples', 'Show examples')"
                      >
                        <svg 
                          class="w-3.5 h-3.5 group-hover:scale-110 transition-all duration-200" 
                          :class="{ 'rotate-180': expandedVocabExamples[vocab.id] }"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ vocab.meaning }}</p>
                    <div class="flex items-center space-x-2 mt-1">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                        {{ vocab.partOfSpeech }}
                      </span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ getVocabExampleCount(vocab.id) }} {{ getVocabExampleCount(vocab.id) === 1 ? 'example' : 'examples' }}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  @click.stop="$emit('add-example', vocab)"
                  class="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-1.5"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span class="text-sm">{{ t('vocabulary.examples.addExample', 'Add Example') }}</span>
                </button>
              </div>

              <!-- Examples for this vocabulary (Collapsible) -->
              <transition
                name="vocab-examples-accordion"
                @enter="vocabExamplesEnter"
                @after-enter="vocabExamplesAfterEnter"
                @leave="vocabExamplesLeave"
                @after-leave="vocabExamplesAfterLeave"
              >
                <div v-if="expandedVocabExamples[vocab.id]" class="vocab-examples-accordion-content space-y-2">
                  <div v-if="getVocabExamples(vocab.id).length === 0" class="text-center py-3 text-gray-500 dark:text-gray-400">
                    <svg class="mx-auto h-6 w-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-xs">{{ t('vocabulary.examples.noExamplesForWord', 'No examples yet') }}</p>
                  </div>

                  <div
                    v-for="example in getPaginatedVocabExamples(vocab.id)"
                    :key="example.id"
                    class="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-sm rounded-lg border border-white/20 dark:border-white/10 p-3 hover:shadow-md transition-all duration-300"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-2">
                          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                :class="getTypeColorClass(example.type)">
                            {{ getTypeLabel(example.type) }}
                          </span>
                          <span v-if="example.difficulty" class="text-sm" :class="getDifficultyColorClass(example.difficulty)">
                            {{ getDifficultyLabel(example.difficulty) }}
                          </span>
                        </div>
                        
                        <div class="mb-2">
                          <div class="flex items-center justify-between">
                            <p class="text-gray-900 dark:text-white font-medium text-sm">{{ example.title }}</p>
                            <button
                              @click="playExampleAudio(example.content)"
                              class="p-1 text-green-600 hover:text-green-700 hover:bg-green-50/50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 rounded transition-all duration-300 group"
                              :title="t('vocabulary.examples.playExample', 'Play example')"
                            >
                              <svg class="w-3 h-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.464-9.536a9 9 0 010 12.728M9 9l3-3v6l-3-3H4a1 1 0 01-1-1V10a1 1 0 011-1h5z" />
                              </svg>
                            </button>
                          </div>
                          <p class="text-gray-700 dark:text-gray-300 mt-1 text-sm">{{ example.content }}</p>
                          <p v-if="example.translation" class="text-gray-600 dark:text-gray-400 text-xs mt-1 italic">
                            {{ example.translation }}
                          </p>
                        </div>

                        <div v-if="example.tags && example.tags.length > 0" class="flex flex-wrap gap-1">
                          <span
                            v-for="tag in example.tags"
                            :key="tag"
                            class="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {{ tag }}
                          </span>
                        </div>
                      </div>
                      
                      <div class="flex items-center gap-1.5 ml-3">
                        <button
                          @click="$emit('edit-example', example)"
                          class="px-2 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-md transition-all duration-300 text-sm"
                        >
                          {{ t('common.edit', 'Edit') }}
                        </button>
                        <button
                          @click="deleteExample(example, emit)"
                          class="px-2 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50/50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-md transition-all duration-300 text-sm"
                        >
                          {{ t('common.delete', 'Delete') }}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Examples Pagination -->
                  <div v-if="getVocabExamplePages(vocab.id) > 1" class="border-t border-white/20 dark:border-white/10 px-3 py-2 mt-3">
                    <div class="flex items-center justify-between">
                      <!-- Mobile Pagination (Simple) -->
                      <div class="flex sm:hidden items-center gap-2">
                        <button
                          @click="previousExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasPrevious"
                          class="px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          {{ t('common.previous', 'Previous') }}
                        </button>
                        <span class="text-xs text-slate-600 dark:text-slate-400">
                          {{ getExamplePaginationInfo(vocab.id).currentPage }} / {{ getExamplePaginationInfo(vocab.id).totalPages }}
                        </span>
                        <button
                          @click="nextExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasNext"
                          class="px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
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
                      <div class="text-xs text-slate-500 dark:text-slate-400">
                        {{ t('vocabulary.examples.showingExamples', { start: getExamplePaginationInfo(vocab.id).start, end: getExamplePaginationInfo(vocab.id).end, total: getExamplePaginationInfo(vocab.id).totalExamples }, 'Showing {start} to {end} of {total} examples') }}
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Topic-level Vocabulary Pagination -->
            <div v-if="getTopicVocabPagesCount(topicKey) > 1" class="border-t border-white/20 dark:border-white/10 px-3 py-2">
              <div class="flex items-center justify-between">
                <!-- Mobile Pagination (Simple) -->
                <div class="flex sm:hidden items-center gap-2">
                  <button
                    @click="previousTopicVocabPage(topicKey)"
                    :disabled="!getTopicVocabPaginationInfo(topicKey).hasPrevious"
                    class="px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    {{ t('common.previous', 'Previous') }}
                  </button>
                  <span class="text-xs text-slate-600 dark:text-slate-400">
                    {{ getTopicVocabPaginationInfo(topicKey).currentPage }} / {{ getTopicVocabPaginationInfo(topicKey).totalPages }}
                  </span>
                  <button
                    @click="nextTopicVocabPage(topicKey)"
                    :disabled="!getTopicVocabPaginationInfo(topicKey).hasNext"
                    class="px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    {{ t('common.next', 'Next') }}
                  </button>
                </div>

                <!-- Desktop Pagination (Full) -->
                <div class="hidden sm:flex items-center gap-2">
                  <button
                    @click="previousTopicVocabPage(topicKey)"
                    :disabled="!getTopicVocabPaginationInfo(topicKey).hasPrevious"
                    class="px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    {{ t('common.previous', 'Previous') }}
                  </button>

                  <div class="flex gap-1">
                    <button
                      v-for="page in getTopicVisiblePages(topicKey)"
                      :key="page"
                      @click="goToTopicVocabPage(topicKey, page)"
                      :class="[
                        'px-3 py-1.5 text-sm rounded transition-colors',
                        getTopicVocabPaginationInfo(topicKey).currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                      ]"
                    >
                      {{ page }}
                    </button>
                  </div>

                  <button
                    @click="nextTopicVocabPage(topicKey)"
                    :disabled="!getTopicVocabPaginationInfo(topicKey).hasNext"
                    class="px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    {{ t('common.next', 'Next') }}
                  </button>
                </div>

                <!-- Vocabulary count info -->
                <div class="text-xs text-slate-500 dark:text-slate-400">
                  {{ t('vocabulary.examples.showingVocabulary', { start: getTopicVocabPaginationInfo(topicKey).start, end: getTopicVocabPaginationInfo(topicKey).end, total: getTopicVocabPaginationInfo(topicKey).totalVocab }, 'Showing {start} to {end} of {total} words') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    
    <!-- Pagination for Grouped View -->
    <div v-if="paginationInfo.totalPages > 1" class="mt-6 group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-4">
      <div class="flex items-center justify-between">
        <!-- Mobile pagination -->
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="previousPage" 
            :disabled="!paginationInfo.hasPrevious" 
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t('common.previous', 'Previous') }}
          </button>
          <button 
            @click="nextPage" 
            :disabled="!paginationInfo.hasNext" 
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t('common.next', 'Next') }}
          </button>
        </div>
        
        <!-- Desktop pagination -->
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              {{ t('vocabulary.examples.showingTopics', { 
                start: paginationInfo.startIndex, 
                end: paginationInfo.endIndex, 
                total: paginationInfo.totalTopics 
              }, `Showing ${paginationInfo.startIndex} to ${paginationInfo.endIndex} of ${paginationInfo.totalTopics} topics`) }}
            </p>
          </div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <!-- Previous button -->
            <button 
              @click="previousPage" 
              :disabled="!paginationInfo.hasPrevious" 
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
              :disabled="!paginationInfo.hasNext" 
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
  </div>
</template>

<script setup lang="ts" name="TopicGroupAccordion">
import { useTopicGroupAccordion, type Example, type Vocabulary } from './composables/useTopicGroupAccordion'

interface Props {
  vocabularyList: Vocabulary[]
  examples: Example[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'add-example': [vocab: Vocabulary]
  'edit-example': [example: Example]
  'delete-example': [example: Example]
}>()

const {
  ExampleFormDialog,
  getTopicName,
  t,
  expandedGroups,
  expandedVocabExamples,
  examplePages,
  examplesPerPage,
  currentPage,
  topicsPerPage,
  topicVocabPages,
  topicVocabPerPage,
  allGroupedVocabulary,
  groupedVocabulary,
  paginationInfo,
  visiblePages,
  playVocabularyAudio,
  playExampleAudio,
  getVocabExamples,
  getPaginatedVocabExamples,
  getPaginatedTopicVocabs,
  getTopicVocabPagesCount,
  getTopicVocabPaginationInfo,
  getVocabExamplePages,
  getExamplePaginationInfo,
  getVocabExampleCount,
  getTotalExamplesForTopic,
  getTopicVisiblePages,
  goToTopicVocabPage,
  previousTopicVocabPage,
  nextTopicVocabPage,
  goToExamplePage,
  previousExamplePage,
  nextExamplePage,
  goToPage,
  previousPage,
  nextPage,
  toggleGroup,
  toggleVocabExamples,
  getTypeLabel,
  getTypeColorClass,
  getDifficultyLabel,
  getDifficultyColorClass,
  enter,
  afterEnter,
  leave,
  afterLeave,
  vocabExamplesEnter,
  vocabExamplesAfterEnter,
  vocabExamplesLeave,
  vocabExamplesAfterLeave,
  deleteExample
} = useTopicGroupAccordion(props)
</script>

<script lang="ts">
export default {
  name: 'TopicGroupAccordion'
}
</script>

<style scoped>
/* Accordion animation */
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease-in-out;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
  overflow: hidden;
}

.accordion-content {
  overflow: hidden;
}

/* Vocabulary examples accordion animation */
.vocab-examples-accordion-enter-active,
.vocab-examples-accordion-leave-active {
  transition: height 0.3s ease-in-out;
}

.vocab-examples-accordion-enter-from,
.vocab-examples-accordion-leave-to {
  height: 0;
  overflow: hidden;
}

.vocab-examples-accordion-content {
  overflow: hidden;
}

/* Smooth hover effects */
.group:hover .animate-pulse-slow > div {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
</style>
