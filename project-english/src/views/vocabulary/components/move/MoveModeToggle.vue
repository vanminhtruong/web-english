<template>
  <div v-if="showMoveToggle" class="flex items-center justify-between group bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 transition-all duration-200">
    <div>
      <h3 class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.moveMode', 'Move Mode') }}</h3>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
        {{ modelValue ? t('vocabulary.moveModeActive', 'Active - Click arrows to move words') : t('vocabulary.moveModeInactive', 'Inactive - Enable to show move arrows') }}
      </p>
    </div>
    <div class="flex items-center">
      <button
        @click="emit('update:modelValue', !modelValue)"
        :class="[
          'relative inline-flex h-6 w-11 sm:h-7 sm:w-12 md:h-8 md:w-14 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
          modelValue ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'
        ]"
        :aria-pressed="modelValue"
        :title="modelValue ? t('vocabulary.moveModeActive', 'Active - Click arrows to move words') : t('vocabulary.moveModeInactive', 'Inactive - Enable to show move arrows')"
      >
        <span class="sr-only">{{ t('vocabulary.moveMode', 'Move Mode') }}</span>
        <span
          :class="[
            'inline-block h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ease-in-out',
            modelValue ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
          ]"
        >
          <svg 
            v-if="modelValue"
            class="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
          <svg 
            v-else
            class="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  modelValue: boolean
  showWhenGrouping: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  showWhenGrouping: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Only show toggle when grouping is enabled
const showMoveToggle = computed(() => {
  return props.showWhenGrouping
})
</script>
