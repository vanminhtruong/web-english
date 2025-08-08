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
        v-if="show"
        class="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[10000] backdrop-blur-sm"
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
          <div class="w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl">
            <!-- Dialog Content -->
            <div
              class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-[#0f0f0f] flex flex-col h-full overflow-hidden transform"
              @click.stop
            >
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-[#0f0f0f] flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] animate-fade-in-up" style="animation-delay: 0.1s">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>{{ t('voice.settings.title', 'Voice Settings') }}: {{ voiceName }}</span>
                  </h2>
                  <button
                    @click="close"
                    class="text-gray-500 hover:text-gray-700 dark:text-white/70 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-black"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div ref="modalContentRef" class="px-6 py-4 flex-1 overflow-y-auto min-h-0 space-y-6">
                <!-- Rate -->
                <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                  <label for="rate" class="block text-sm font-medium text-gray-700 dark:text-white/80">{{ t('voice.settings.rate', 'Rate') }} ({{ localSettings.rate.toFixed(2) }})</label>
                  <input id="rate" type="range" min="0.5" max="2" step="0.1" v-model.number="localSettings.rate" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#0f0f0f]">
                </div>

                <!-- Pitch -->
                <div class="animate-fade-in-up" style="animation-delay: 0.3s">
                  <label for="pitch" class="block text-sm font-medium text-gray-700 dark:text-white/80">{{ t('voice.settings.pitch', 'Pitch') }} ({{ localSettings.pitch.toFixed(2) }})</label>
                  <input id="pitch" type="range" min="0" max="2" step="0.1" v-model.number="localSettings.pitch" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#0f0f0f]">
                </div>

                <!-- Volume -->
                <div class="animate-fade-in-up" style="animation-delay: 0.4s">
                  <label for="volume" class="block text-sm font-medium text-gray-700 dark:text-white/80">{{ t('voice.settings.volume', 'Volume') }} ({{ localSettings.volume.toFixed(2) }})</label>
                  <input id="volume" type="range" min="0" max="1" step="0.1" v-model.number="localSettings.volume" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#0f0f0f]">
                </div>
              </div>

              <!-- Footer -->
              <div class="px-6 py-4 border-t border-gray-200 dark:border-[#0f0f0f] flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] animate-fade-in-up" style="animation-delay: 0.5s">
                <div class="flex justify-between items-center">
                  <button @click="resetToDefaults" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-[#0a0a0a] dark:text-white/80 dark:hover:bg-black border dark:border-[#0f0f0f] transition-colors">
                    {{ t('common.resetToDefault', 'Reset to Default') }}
                  </button>
                  <div class="space-x-3">
                    <button @click="close" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 dark:bg-[#0a0a0a] dark:text-white/80 dark:hover:bg-black border dark:border-[#0f0f0f] transition-colors">
                      {{ t('common.cancel', 'Cancel') }}
                    </button>
                    <button @click="save" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                      {{ t('common.save', 'Save') }}
                    </button>
                  </div>
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
import { ref, watch, defineProps, defineEmits, onUnmounted } from 'vue';
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
const modalContentRef = ref<HTMLElement | null>(null);

watch(() => props.initialSettings, (newSettings) => {
  if (newSettings) {
    localSettings.value = { ...newSettings };
  }
}, { deep: true, immediate: true });

// Disable body scroll when modal opens
watch(() => props.show, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, { immediate: true });

onUnmounted(() => {
  document.body.style.overflow = '';
});

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

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out both;
}
</style>