<template>
  <button
    @click="toggleLanguage"
    class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-dark-bg-mute rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-dark-bg-soft hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    <span v-if="currentLocale === 'en'" class="flex items-center">
      <img src="https://flagcdn.com/w20/us.png" width="20" height="15" class="mr-2" alt="English" />
      EN
    </span>
    <span v-else-if="currentLocale === 'vi'" class="flex items-center">
      <img src="https://flagcdn.com/w20/vn.png" width="20" height="15" class="mr-2" alt="Tiếng Việt" />
      VI
    </span>
    <span v-else class="flex items-center">
      <img src="https://flagcdn.com/w20/kr.png" width="20" height="15" class="mr-2" alt="한국어" />
      KO
    </span>
  </button>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { toggleLocale, getLocale } from '../i18n'

// Current locale for rendering flag and code
const currentLocale = computed(() => getLocale())

const toggleLanguage = () => {
  toggleLocale()
}
</script>