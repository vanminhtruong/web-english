<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 mb-6">
    <!-- Group by Date Toggle -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.grouping.title') }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('vocabulary.grouping.description') }}</p>
        </div>
      </div>
      <button
        @click="emit('update:modelValue', !modelValue)"
        :class="[
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          modelValue ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
        ]"
      >
        <span
          :class="[
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            modelValue ? 'translate-x-6' : 'translate-x-1'
          ]"
        />
      </button>
    </div>
    
    <!-- Hover to Expand Toggle (only show when grouping is enabled) -->
    <div v-if="modelValue" class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-3">
        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.grouping.hoverToExpand') }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('vocabulary.grouping.hoverDescription') }}</p>
        </div>
      </div>
      <button
        @click="emit('update:hoverEnabled', !hoverEnabled)"
        :class="[
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          hoverEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
        ]"
      >
        <span
          :class="[
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            hoverEnabled ? 'translate-x-6' : 'translate-x-1'
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
}>();

const emit = defineEmits(['update:modelValue', 'update:hoverEnabled']);

const { t } = useI18n();
</script> 