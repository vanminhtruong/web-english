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
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      >
        <!-- Dialog Container -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
          enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
        >
          <div class="w-full max-h-[90vh] flex flex-col max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <!-- Dialog Content -->
            <div 
              class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transform"
              @click.stop
            >
              <!-- Header -->
              <div class="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                    </svg>
                    <span class="truncate">{{ t('vocabulary.notes.title', 'Vocabulary Notes') }} - {{ formattedDate }}</span>
                  </h2>
                  <button 
                    @click="close"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Form -->
              <div class="px-3 sm:px-6 py-3 sm:py-4 flex-1 overflow-y-auto min-h-0 custom-scrollbar">
                <div class="space-y-6">
                  <!-- Description -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.1s">
                    <p class="text-sm text-gray-600 dark:text-gray-400 p-3 bg-green-50 dark:bg-[#0a0a0a] rounded-lg border border-green-200 dark:border-gray-700">
                      {{ t('vocabulary.notes.description', 'Manage notes for vocabulary words learned today') }}
                    </p>
                  </div>
                  
                  <!-- Note Content -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                    <label for="note-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-green-500 rounded mr-2"></span>
                      {{ t('vocabulary.notes.noteLabel', 'Notes for vocabulary') }}
                    </label>
                    <textarea
                      id="note-content"
                      v-model="noteContent"
                      rows="6"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]"
                      :placeholder="t('vocabulary.notes.placeholder', 'Write your notes about this vocabulary learning session...')"
                    ></textarea>
                  </div>
                  
                  <!-- Word list section -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.3s">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                      {{ t('vocabulary.notes.wordsLearned', 'Words in this group') }} 
                      <span class="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-semibold">
                        {{ todayWords.length }}
                      </span>
                    </h4>
                    <div class="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-[#0a0a0a] custom-scrollbar">
                      <div v-if="todayWords.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
                        <svg class="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        {{ t('vocabulary.notes.noWordsLearned', 'No vocabulary words in this group') }}
                      </div>
                      <div v-else class="space-y-2">
                        <div 
                          v-for="(word, index) in todayWords" 
                          :key="word.id" 
                          class="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-white dark:hover:bg-[#0f0f0f] transition-all duration-300 border border-transparent hover:border-green-200 cursor-pointer hover:shadow-md hover:scale-[1.02] animate-fade-in-up"
                          :style="`animation-delay: ${0.4 + index * 0.1}s`"
                        >
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center space-x-1 sm:space-x-2 mb-1">
                              <span class="font-medium text-gray-900 dark:text-white truncate">{{ word.word }}</span>
                              <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono truncate">{{ word.pronunciation }}</span>
                            </div>
                            <div class="text-sm text-gray-600 dark:text-gray-300 truncate">{{ word.meaning }}</div>
                          </div>
                          <div class="text-xs px-1 sm:px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full whitespace-nowrap">
                            {{ word.level }}
                          </div>
                          <div class="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                            <button 
                              @click="speakWord(word.word)"
                              class="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-110 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800"
                              :title="`Play pronunciation: ${word.word}`"
                            >
                              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.776zM12.828 7.172a1 1 0 011.414 0 4 4 0 010 5.656 1 1 0 01-1.414-1.414 2 2 0 000-2.828 1 1 0 010-1.414z" clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M15.536 4.464a1 1 0 011.414 0 8 8 0 010 11.314 1 1 0 11-1.414-1.414 6 6 0 000-8.486 1 1 0 010-1.414z" clip-rule="evenodd"/>
                              </svg>
                            </button>
                            <button 
                              @click="toggleWordMarked(word.id)"
                              class="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:scale-110"
                              :class="markedWords.includes(word.id) ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400'"
                            >
                              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path v-if="markedWords.includes(word.id)" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                <path v-else d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Footer Actions -->
              <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-gray-50 to-green-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <div class="flex justify-end space-x-3">
                  <button 
                    @click="close" 
                    class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 hover:scale-105 hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    {{ t('common.cancel', 'Cancel') }}
                  </button>
                  <button 
                    @click="saveNote" 
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{{ t('common.save', 'Save') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatDate, getDateKey } from '../../../utils/dateUtils';
import { useVoiceStore } from '../../../stores/voiceStore';
import { useToast } from 'vue-toastification';

const { t, locale } = useI18n();
const toast = useToast();
const { playAudio } = useVoiceStore();

interface Props {
  modelValue: boolean;
  date: string;
  todayWords: any[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'save-note': [note: string, markedWords: string[]];
}>();

const noteContent = ref('');
const markedWords = ref<string[]>([]);

// Format the date for display
const formattedDate = computed(() => {
  const today = new Date();
  const todayKey = getDateKey(today.toISOString());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday.toISOString());
  
  if (props.date === todayKey) {
    return t('vocabulary.notes.today', 'Today');
  } else if (props.date === yesterdayKey) {
    return t('vocabulary.notes.yesterday', 'Yesterday');
  } else {
    return formatDate(props.date, locale.value);
  }
});

// Local storage keys
const NOTE_STORAGE_KEY = 'vocabulary-notes';
const MARKED_WORDS_STORAGE_KEY = 'vocabulary-marked-words';

// Load notes from localStorage
const loadNote = () => {
  try {
    const notesData = localStorage.getItem(NOTE_STORAGE_KEY);
    if (notesData) {
      const notes = JSON.parse(notesData);
      if (notes[props.date]) {
        noteContent.value = notes[props.date];
      } else {
        noteContent.value = '';
      }
    }
  } catch (error) {
    console.warn('Failed to load notes from localStorage:', error);
  }
};

// Load marked words from localStorage
const loadMarkedWords = () => {
  try {
    const markedData = localStorage.getItem(MARKED_WORDS_STORAGE_KEY);
    if (markedData) {
      const marked = JSON.parse(markedData);
      if (marked[props.date]) {
        markedWords.value = marked[props.date];
      } else {
        markedWords.value = [];
      }
    }
  } catch (error) {
    console.warn('Failed to load marked words from localStorage:', error);
  }
};

// Save note to localStorage
const saveNoteToStorage = (note: string) => {
  try {
    const notesData = localStorage.getItem(NOTE_STORAGE_KEY);
    const notes = notesData ? JSON.parse(notesData) : {};
    notes[props.date] = note;
    localStorage.setItem(NOTE_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.warn('Failed to save note to localStorage:', error);
  }
};

// Save marked words to localStorage
const saveMarkedWordsToStorage = (wordIds: string[]) => {
  try {
    const markedData = localStorage.getItem(MARKED_WORDS_STORAGE_KEY);
    const marked = markedData ? JSON.parse(markedData) : {};
    marked[props.date] = wordIds;
    localStorage.setItem(MARKED_WORDS_STORAGE_KEY, JSON.stringify(marked));
  } catch (error) {
    console.warn('Failed to save marked words to localStorage:', error);
  }
};

// Toggle word marked status
const toggleWordMarked = (wordId: string) => {
  const index = markedWords.value.indexOf(wordId);
  if (index === -1) {
    markedWords.value.push(wordId);
  } else {
    markedWords.value.splice(index, 1);
  }
};

// Speak word pronunciation using voice store settings
const speakWord = async (word: string) => {
  try {
    await playAudio(word);
  } catch (error) {
    console.warn('Failed to play word pronunciation:', error);
  }
};

// Save note and close dialog
const saveNote = () => {
  saveNoteToStorage(noteContent.value);
  saveMarkedWordsToStorage(markedWords.value);
  emit('save-note', noteContent.value, markedWords.value);
  
  // Trigger auto-save if available
  const event = new CustomEvent('vocabulary-notes-updated', {
    detail: {
      date: props.date,
      note: noteContent.value,
      markedWords: markedWords.value
    }
  });
  window.dispatchEvent(event);
  
  close();
};

// Close dialog
const close = () => {
  emit('update:modelValue', false);
};

// Watch for dialog open
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      loadNote();
      loadMarkedWords();
    }
  }
);

// Initialize when component mounts
onMounted(() => {
  if (props.modelValue) {
    loadNote();
    loadMarkedWords();
  }
});
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
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
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

/* Enhanced backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Enhanced shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Enhanced focus states */
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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

/* Enhanced checkbox styling */
input[type="checkbox"] {
  transition: all 0.3s ease;
}

input[type="checkbox"]:checked {
  transform: scale(1.1);
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

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Custom scrollbar styling */
.custom-scrollbar {
  scrollbar-width: thin;
    /* Light mode (default): thumb, track */
    scrollbar-color: #e5e7eb #ffffff;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

/* Light mode (default) */
.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #ffffff; /* white to match project light background */
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb; /* light gray thumb */
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #cbd5e1;
}

/* Dark mode overrides */
:global(.dark) .custom-scrollbar {
  scrollbar-color: #0a0a0a #0f0f0f;
}

:global(.dark) .custom-scrollbar::-webkit-scrollbar-track {
  background-color: #0f0f0f;
}

:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #0a0a0a;
}

:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #000000;
}

/* Disabled state styling */
.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}
</style> 