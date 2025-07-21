<template>
  <div v-if="show" class="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-[10000]" @click.self="close">
    <div class="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-gray-800">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ t('voice.settings.title') }}: {{ voiceName }}</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="space-y-6">
        <!-- Rate -->
        <div>
          <label for="rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('voice.settings.rate') }} ({{ localSettings.rate.toFixed(2) }})</label>
          <input id="rate" type="range" min="0.5" max="2" step="0.1" v-model.number="localSettings.rate" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
        </div>

        <!-- Pitch -->
        <div>
          <label for="pitch" class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('voice.settings.pitch') }} ({{ localSettings.pitch.toFixed(2) }})</label>
          <input id="pitch" type="range" min="0" max="2" step="0.1" v-model.number="localSettings.pitch" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
        </div>

        <!-- Volume -->
        <div>
          <label for="volume" class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('voice.settings.volume') }} ({{ localSettings.volume.toFixed(2) }})</label>
          <input id="volume" type="range" min="0" max="1" step="0.1" v-model.number="localSettings.volume" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
        </div>
      </div>

      <div class="flex justify-between items-center mt-8">
        <button @click="resetToDefaults" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
          {{ t('common.resetToDefault') }}
        </button>
        <div class="space-x-3">
          <button @click="close" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            {{ t('common.cancel') }}
          </button>
          <button @click="save" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            {{ t('common.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import type { VoiceSettings, VoiceType } from '../stores/voiceStore';

const props = defineProps<{
  show: boolean;
  voiceType: VoiceType;
  voiceName: string;
  initialSettings: VoiceSettings;
}>();

const emit = defineEmits(['close', 'save', 'reset']);

const { t } = useI18n();

const localSettings = ref<VoiceSettings>({ ...props.initialSettings });

watch(() => props.initialSettings, (newSettings) => {
  if (newSettings) {
    localSettings.value = { ...newSettings };
  }
}, { deep: true, immediate: true });

const close = () => {
  emit('close');
};

const save = () => {
  emit('save', { voiceType: props.voiceType, settings: localSettings.value });
  close();
};

const resetToDefaults = () => {
  emit('reset', props.voiceType);
};
</script> 