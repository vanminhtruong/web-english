<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-5 lg:p-6 mb-4 sm:mb-6">
    <!-- Group by Date Toggle -->
    <div class="flex items-center justify-between mb-3 sm:mb-4">
      <div class="flex items-center space-x-2 sm:space-x-3">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.grouping.title', 'Group by Date') }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{{ t('vocabulary.grouping.description', 'Group vocabulary words by creation date') }}</p>
        </div>
      </div>
      <button
        @click="emit('update:modelValue', !modelValue)"
        :class="[
          'relative inline-flex items-center rounded-full transition-colors',
          'h-5 w-9 sm:h-6 sm:w-11',
          modelValue ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
        ]"
      >
        <span
          :class="[
            'inline-block transform rounded-full bg-white transition-transform',
            'h-3 w-3 sm:h-4 sm:w-4',
            modelValue ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
          ]"
        />
      </button>
    </div>
    
    <!-- Hover to Expand Toggle (only show when grouping is enabled) -->
    <div v-if="modelValue" class="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 mb-3 sm:mb-4">
      <div class="flex items-center space-x-2 sm:space-x-3">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.grouping.hoverToExpand', 'Hover to Expand') }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{{ t('vocabulary.grouping.hoverDescription', 'Expand date groups on hover instead of click') }}</p>
        </div>
      </div>
      <button
        @click="emit('update:hoverEnabled', !hoverEnabled)"
        :class="[
          'relative inline-flex items-center rounded-full transition-colors',
          'h-5 w-9 sm:h-6 sm:w-11',
          hoverEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
        ]"
      >
        <span
          :class="[
            'inline-block transform rounded-full bg-white transition-transform',
            'h-3 w-3 sm:h-4 sm:w-4',
            hoverEnabled ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
          ]"
        />
      </button>
    </div>
    
    <!-- Move Mode Toggle (only show when grouping is enabled) -->
    <div v-if="modelValue" class="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-2 sm:space-x-3">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
        <div>
          <h3 class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.moveMode', 'Move Mode') }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
            {{ moveMode ? t('vocabulary.moveModeActive', 'Active - Click arrows to move words') : t('vocabulary.moveModeInactive', 'Inactive - Enable to show move arrows') }}
          </p>
        </div>
      </div>
      <button
        @click="emit('update:moveMode', !moveMode)"
        :class="[
          'relative inline-flex items-center rounded-full transition-colors',
          'h-5 w-9 sm:h-6 sm:w-11',
          moveMode ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'
        ]"
      >
        <span
          :class="[
            'inline-block transform rounded-full bg-white transition-transform',
            'h-3 w-3 sm:h-4 sm:w-4',
            moveMode ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
          ]"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
  modelValue: boolean;
  hoverEnabled: boolean;
  moveMode: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'update:hoverEnabled', 'update:moveMode']);

const { t } = useI18n();
</script>