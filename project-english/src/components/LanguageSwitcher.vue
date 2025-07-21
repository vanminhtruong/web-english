<template>
  <button 
    @click="toggleLanguage" 
    class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    <span v-if="isEnglish" class="flex items-center">
      <img src="https://flagcdn.com/w20/us.png" width="20" height="15" class="mr-2" alt="English" />
      EN
    </span>
    <span v-else class="flex items-center">
      <img src="https://flagcdn.com/w20/vn.png" width="20" height="15" class="mr-2" alt="Tiếng Việt" />
      VI
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { toggleLocale, getLocale, isEnglish as checkIsEnglish } from '../i18n'

const isEnglish = ref(false)

// Update the isEnglish ref when the component mounts
onMounted(() => {
  isEnglish.value = checkIsEnglish()
})

const toggleLanguage = () => {
  toggleLocale()
  isEnglish.value = !isEnglish.value
}
</script> 