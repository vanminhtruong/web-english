<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click.self="close">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>
      
      <div class="bg-white dark:bg-[#0a0a0a] rounded-lg overflow-hidden shadow-xl transform transition-all w-full max-w-2xl relative z-50">
        <!-- Dialog header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            <span>{{ t('vocabulary.notes.title', 'Vocabulary Notes') }} - {{ formattedDate }}</span>
          </h3>
          <button @click="close" class="text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Dialog content -->
        <div class="px-6 py-4">
          <div class="mb-4">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ t('vocabulary.notes.description', 'Manage notes for vocabulary words learned today') }}
            </p>
          </div>
          
          <div class="mb-4">
            <label for="note-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('vocabulary.notes.noteLabel', 'Notes for vocabulary') }}
            </label>
            <textarea
              id="note-content"
              v-model="noteContent"
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0f0f0f] focus:border-[#0f0f0f] bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100"
              :placeholder="t('vocabulary.notes.placeholder', 'Write your notes about this vocabulary learning session...')"
            ></textarea>
          </div>
          
          <!-- Word list section -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('vocabulary.notes.wordsLearned', 'Words in this group') }} ({{ todayWords.length }})
            </h4>
            <div class="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md p-2 dark:bg-[#0f0f0f]">
              <div v-if="todayWords.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
                {{ t('vocabulary.notes.noWordsLearned', 'No vocabulary words in this group') }}
              </div>
              <div v-else class="space-y-2">
                <div 
                  v-for="word in todayWords" 
                  :key="word.id" 
                  class="flex items-center justify-between p-2 bg-gray-50 dark:bg-[#0f0f0f] rounded-md"
                >
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white">{{ word.word }}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">{{ word.meaning }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="toggleWordMarked(word.id)"
                      class="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
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
        
        <!-- Dialog footer -->
        <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button 
            @click="close" 
            class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {{ t('common.cancel', 'Cancel') }}
          </button>
          <button 
            @click="saveNote" 
            class="flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {{ t('common.save', 'Save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatDate, getDateKey } from '../../../utils/dateUtils';
import { useToast } from 'vue-toastification';
import { useScrollStore } from '../../../stores/scroll';

const { t, locale } = useI18n();
const toast = useToast();

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