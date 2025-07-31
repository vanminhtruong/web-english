<template>
  <div>
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Background overlay - Removed click handler -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"></div>

          <!-- Dialog panel -->
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
            enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
            leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
          >
            <div class="inline-block align-bottom bg-white dark:bg-[#0a0a0a] rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-200 dark:border-gray-700">
              <div class="bg-white dark:bg-[#0a0a0a] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] -mx-4 -mt-5 px-4 pt-5 sm:-mx-6 sm:-mt-6 sm:px-6 sm:pt-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>{{ isEdit ? t('grammar.editLesson') : t('grammar.addNewLesson') }}</span>
                  </h3>
                  <button @click="closeDialog" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <!-- Form Content - Adjusted max height and overflow -->
                <form @submit.prevent="submitForm" class="space-y-6 mt-4 max-h-[calc(100vh-200px)] overflow-y-auto px-2">
                  <!-- Basic Information -->
                  <div class="bg-white dark:bg-[#0f0f0f] shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style="animation-delay: 0.1s">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center">
                      <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                      {{ t('common.title') }}
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <!-- Title -->
                      <div class="md:col-span-2 animate-fade-in-up" style="animation-delay: 0.2s">
                        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-blue-500 rounded mr-2"></span>
                          {{ t('common.title') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          id="title"
                          v-model="form.title"
                          type="text"
                          required
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                          :placeholder="t('grammar.titlePlaceholder')"
                        />
                      </div>

                      <!-- Category -->
                      <div class="animate-fade-in-up" style="animation-delay: 0.3s">
                        <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-green-500 rounded mr-2"></span>
                          {{ t('grammar.category') }} <span class="text-red-500">*</span>
                        </label>
                        <select
                          id="category"
                          v-model="form.category"
                          required
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02] cursor-pointer"
                        >
                          <option value="">{{ t('grammar.selectCategory') }}</option>
                          <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                          </option>
                        </select>
                      </div>

                      <!-- Level -->
                      <div class="animate-fade-in-up" style="animation-delay: 0.4s">
                        <label for="level" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-purple-500 rounded mr-2"></span>
                          {{ t('grammar.level') }} <span class="text-red-500">*</span>
                        </label>
                        <select
                          id="level"
                          v-model="form.level"
                          required
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02] cursor-pointer"
                        >
                          <option value="">{{ t('grammar.selectLevel') }}</option>
                          <option value="beginner">{{ t('grammar.levels.beginner') }}</option>
                          <option value="intermediate">{{ t('grammar.levels.intermediate') }}</option>
                          <option value="advanced">{{ t('grammar.levels.advanced') }}</option>
                        </select>
                      </div>

                      <!-- Duration -->
                      <div class="animate-fade-in-up" style="animation-delay: 0.5s">
                        <label for="duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-orange-500 rounded mr-2"></span>
                          {{ t('grammar.durationLabel') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          id="duration"
                          v-model.number="form.duration"
                          type="number"
                          min="1"
                          required
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02]"
                          placeholder="30"
                        />
                      </div>

                      <!-- Description -->
                      <div class="md:col-span-2 animate-fade-in-up" style="animation-delay: 0.6s">
                        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-indigo-500 rounded mr-2"></span>
                          {{ t('grammar.description') }} <span class="text-red-500">*</span>
                        </label>
                        <textarea
                          id="description"
                          v-model="form.description"
                          rows="3"
                          required
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 transform hover:scale-[1.02] resize-none"
                          :placeholder="t('grammar.descriptionPlaceholder')"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="bg-white dark:bg-[#0f0f0f] shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style="animation-delay: 0.7s">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center">
                      <span class="w-1 h-4 bg-teal-500 rounded mr-2"></span>
                      {{ t('grammar.lessonContent') }}
                    </h3>
                    
                    <div class="space-y-6">
                      <!-- Theory -->
                      <div class="animate-fade-in-up" style="animation-delay: 0.8s">
                        <label for="theory" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-teal-500 rounded mr-2"></span>
                          {{ t('grammar.theory') }} <span class="text-red-500">*</span>
                        </label>
                        <textarea
                          id="theory"
                          v-model="form.theory"
                          rows="6"
                          required
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 dark:hover:border-teal-500 transform hover:scale-[1.02] resize-none"
                          :placeholder="t('grammar.theoryPlaceholder')"
                        ></textarea>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('grammar.markdownSupported') }}</p>
                      </div>

                      <!-- Structure -->
                      <div class="animate-fade-in-up" style="animation-delay: 0.9s">
                        <label for="structure" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-pink-500 rounded mr-2"></span>
                          {{ t('grammar.structure') }} <span class="text-red-500">*</span>
                        </label>
                        <textarea
                          id="structure"
                          v-model="form.structure"
                          rows="4"
                          required
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500 transform hover:scale-[1.02] resize-none"
                          :placeholder="t('grammar.structurePlaceholder')"
                        ></textarea>
                      </div>

                      <!-- Examples -->
                      <div class="animate-fade-in-up" style="animation-delay: 1.0s">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-yellow-500 rounded mr-2"></span>
                          {{ t('grammar.examples') }} <span class="text-red-500">*</span>
                        </label>
                        
                        <div class="space-y-2">
                          <div v-for="(example, index) in form.examples" :key="index" class="flex items-start space-x-2 animate-fade-in-up" :style="{ animationDelay: `${1.1 + index * 0.1}s` }">
                            <div class="flex-1">
                              <input
                                v-model="example.text"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02]"
                                :placeholder="t('grammar.examplePlaceholder', { index: index + 1 })"
                                required
                              />
                              <input
                                v-model="example.translation"
                                type="text"
                                class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02]"
                                :placeholder="t('grammar.translationPlaceholder', { index: index + 1 })"
                                required
                              />
                            </div>
                            <button 
                              type="button" 
                              @click="removeExample(index)" 
                              class="mt-2 text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900"
                              :disabled="form.examples.length <= 1"
                            >
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          type="button" 
                          @click="addExample" 
                          class="mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 hover:scale-105"
                        >
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                          </svg>
                          {{ t('grammar.addExample') }}
                        </button>
                      </div>

                      <!-- Usage Rules -->
                      <div class="animate-fade-in-up" style="animation-delay: 1.2s">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-cyan-500 rounded mr-2"></span>
                          {{ t('grammar.usageRules') }}
                        </label>
                        
                        <div class="space-y-2">
                          <div v-for="(rule, index) in form.usageRules" :key="index" class="flex items-start space-x-2 animate-fade-in-up" :style="{ animationDelay: `${1.3 + index * 0.1}s` }">
                            <div class="flex-1">
                              <input
                                v-model="rule.title"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02]"
                                :placeholder="t('grammar.ruleTitlePlaceholder', { index: index + 1 })"
                              />
                              <textarea
                                v-model="rule.description"
                                rows="2"
                                class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02] resize-none"
                                :placeholder="t('grammar.ruleDescriptionPlaceholder', { index: index + 1 })"
                              ></textarea>
                            </div>
                            <button 
                              type="button" 
                              @click="removeRule(index)" 
                              class="mt-2 text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900"
                            >
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          type="button" 
                          @click="addRule" 
                          class="mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 hover:scale-105"
                        >
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                          </svg>
                          {{ t('grammar.addRule') }}
                        </button>
                      </div>

                      <!-- Common Mistakes -->
                      <div class="animate-fade-in-up" style="animation-delay: 1.4s">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <span class="w-1 h-3 bg-red-500 rounded mr-2"></span>
                          {{ t('grammar.commonMistakes') }}
                        </label>
                        
                        <div class="space-y-2">
                          <div v-for="(mistake, index) in form.commonMistakes" :key="index" class="flex items-start space-x-2 animate-fade-in-up" :style="{ animationDelay: `${1.5 + index * 0.1}s` }">
                            <div class="flex-1">
                              <input
                                v-model="mistake.wrong"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400 dark:hover:border-red-500 transform hover:scale-[1.02]"
                                :placeholder="t('grammar.wrongSentencePlaceholder', { index: index + 1 })"
                              />
                              <input
                                v-model="mistake.correct"
                                type="text"
                                class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400 dark:hover:border-red-500 transform hover:scale-[1.02]"
                                :placeholder="t('grammar.correctSentencePlaceholder', { index: index + 1 })"
                              />
                              <textarea
                                v-model="mistake.explanation"
                                rows="2"
                                class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400 dark:hover:border-red-500 transform hover:scale-[1.02] resize-none"
                                :placeholder="t('grammar.explanationPlaceholder', { index: index + 1 })"
                              ></textarea>
                            </div>
                            <button 
                              type="button" 
                              @click="removeMistake(index)" 
                              class="mt-2 text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900"
                            >
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          type="button" 
                          @click="addMistake" 
                          class="mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 hover:scale-105"
                        >
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                          </svg>
                          {{ t('grammar.addMistake') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <!-- Dialog footer -->
              <div class="bg-gray-50 dark:bg-[#0f0f0f] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <button 
                  type="button" 
                  @click="submitForm"
                  :disabled="isSubmitting"
                  class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="isSubmitting" class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isSubmitting ? t('common.saving') : (isEdit ? t('common.update') : t('common.save')) }}
                </button>
                <button 
                  type="button" 
                  @click="closeDialog"
                  class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-[#0a0a0a] text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {{ t('common.cancel') }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGrammarStore } from '../../../composables/useGrammarStore'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  editId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'saved'])

const { t } = useI18n()
const grammarStore = useGrammarStore()
const isSubmitting = ref(false)
const isEdit = computed(() => !!props.editId)

// Prevent body scrolling when dialog is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Make sure to reset body overflow when component is unmounted
onUnmounted(() => {
  document.body.style.overflow = ''
})

const categories = ref([
  'Tenses', 'Conditionals', 'Passive Voice', 'Modal Verbs', 'Reported Speech', 
  'Articles', 'Prepositions', 'Adjectives & Adverbs', 'Phrasal Verbs', 'Gerunds & Infinitives'
])

// Form data
const form = ref({
  title: '',
  description: '',
  level: '',
  category: '',
  duration: 30,
  theory: '',
  structure: '',
  examples: [
    { text: '', translation: '' }
  ],
  usageRules: [
    { title: '', description: '' }
  ],
  commonMistakes: [
    { wrong: '', correct: '', explanation: '' }
  ]
})

// Define resetForm before using it in watch
const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    level: '',
    category: '',
    duration: 30,
    theory: '',
    structure: '',
    examples: [{ text: '', translation: '' }],
    usageRules: [{ title: '', description: '' }],
    commonMistakes: [{ wrong: '', correct: '', explanation: '' }]
  }
}

// Load lesson data if in edit mode
watch(() => props.editId, (newId) => {
  if (newId) {
    const lesson = grammarStore.getLesson(newId)
    if (lesson) {
      form.value = {
        title: lesson.title,
        description: lesson.description,
        level: lesson.level,
        category: lesson.category,
        duration: lesson.duration,
        theory: lesson.theory,
        structure: lesson.structure || '',
        examples: lesson.examples.map(ex => ({
          text: ex.text,
          translation: ex.translation
        })),
        usageRules: lesson.usageRules?.map(rule => ({
          title: rule.title,
          description: rule.description
        })) || [{ title: '', description: '' }],
        commonMistakes: lesson.commonMistakes?.map(mistake => ({
          wrong: mistake.wrong,
          correct: mistake.correct,
          explanation: mistake.explanation
        })) || [{ wrong: '', correct: '', explanation: '' }]
      }
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Methods for adding and removing array items
const addExample = () => {
  form.value.examples.push({ text: '', translation: '' })
}

const removeExample = (index: number) => {
  if (form.value.examples.length > 1) {
    form.value.examples.splice(index, 1)
  }
}

const addRule = () => {
  form.value.usageRules.push({ title: '', description: '' })
}

const removeRule = (index: number) => {
  form.value.usageRules.splice(index, 1)
}

const addMistake = () => {
  form.value.commonMistakes.push({ wrong: '', correct: '', explanation: '' })
}

const removeMistake = (index: number) => {
  form.value.commonMistakes.splice(index, 1)
}

const closeDialog = () => {
  emit('update:modelValue', false)
}

// Form submission
const submitForm = () => {
  isSubmitting.value = true
  
  // Remove empty array items before submission
  const filteredUsageRules = form.value.usageRules.filter(rule => rule.title.trim() !== '' || rule.description.trim() !== '')
  const filteredMistakes = form.value.commonMistakes.filter(mistake => mistake.wrong.trim() !== '' || mistake.correct.trim() !== '' || mistake.explanation.trim() !== '')
  
  // Create rules array for compatibility with GrammarLesson interface
  const rules = filteredUsageRules.map((rule, index) => ({
    id: index + 1,
    title: rule.title,
    description: rule.description
  }))
  
  // Create examples array for compatibility with GrammarLesson interface
  const examples = form.value.examples.map((example, index) => ({
    id: index + 1,
    text: example.text,
    translation: example.translation
  }))
  
  // Create mistakes array for compatibility with GrammarLesson interface
  const commonMistakes = filteredMistakes.map((mistake, index) => ({
    id: index + 1,
    wrong: mistake.wrong,
    correct: mistake.correct,
    explanation: mistake.explanation
  }))
  
  // Create lesson object
  const lessonData = {
    id: isEdit.value ? props.editId : Date.now().toString(),
    title: form.value.title,
    description: form.value.description,
    level: form.value.level,
    category: form.value.category,
    duration: form.value.duration,
    rating: isEdit.value ? grammarStore.getLesson(props.editId)?.rating || 5.0 : 5.0,
    progress: isEdit.value ? grammarStore.getLesson(props.editId)?.progress || 0 : 0,
    exercises: Math.floor(form.value.duration / 5),
    theory: form.value.theory,
    structure: form.value.structure,
    examples: examples,
    rules: rules,
    usageRules: filteredUsageRules,
    commonMistakes: commonMistakes
  }
  
  // Save the lesson to the store
  if (isEdit.value) {
    grammarStore.updateLesson(props.editId, lessonData)
  } else {
    grammarStore.addLesson(lessonData)
  }
  
  // Simulate API call for UI feedback
  setTimeout(() => {
    isSubmitting.value = false
    emit('saved', lessonData)
    emit('update:modelValue', false)
    resetForm()
  }, 500)
}
</script>

<style scoped>
/* Fade in up animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Enhanced hover effects for form inputs */
input:focus, textarea:focus, select:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced button hover effects */
button:hover {
  transform: translateY(-1px);
}

/* Loading animation for submit button */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Smooth dialog entrance */
.dialog-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px) rotate(1deg);
}

.dialog-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0) rotate(0deg);
}

/* Enhanced shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Enhanced focus states */
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Smooth scale transitions */
.transform {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced button states */
button:active {
  transform: scale(0.95);
}

/* Loading spinner enhancement */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Smooth color transitions */
.transition-colors {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

/* Enhanced border radius */
.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

/* Gradient backgrounds */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Enhanced hover effects for interactive elements */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Smooth rotation effects */
.hover\:rotate-90:hover {
  transform: rotate(90deg);
}

/* Enhanced shadow on hover */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Disabled state styling */
.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

/* Stagger animation delays for form fields */
.animate-fade-in-up:nth-child(1) { animation-delay: 0.1s; }
.animate-fade-in-up:nth-child(2) { animation-delay: 0.2s; }
.animate-fade-in-up:nth-child(3) { animation-delay: 0.3s; }
.animate-fade-in-up:nth-child(4) { animation-delay: 0.4s; }
.animate-fade-in-up:nth-child(5) { animation-delay: 0.5s; }
.animate-fade-in-up:nth-child(6) { animation-delay: 0.6s; }
.animate-fade-in-up:nth-child(7) { animation-delay: 0.7s; }
.animate-fade-in-up:nth-child(8) { animation-delay: 0.8s; }
.animate-fade-in-up:nth-child(9) { animation-delay: 0.9s; }
.animate-fade-in-up:nth-child(10) { animation-delay: 1.0s; }
.animate-fade-in-up:nth-child(11) { animation-delay: 1.1s; }
.animate-fade-in-up:nth-child(12) { animation-delay: 1.2s; }

/* Prevent scrollbar shift when dialog opens */
.overflow-hidden {
  padding-right: 0 !important;
}
</style> 