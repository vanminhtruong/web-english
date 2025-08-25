<template>
  <!-- Pictionary-specific details -->
  <div class="mt-2 sm:mt-3 space-y-2">
    <!-- Image preview -->
    <div v-if="entry.extra?.pictionary?.image" class="flex justify-center xs:justify-start items-center gap-2 xs:gap-3 cursor-zoom-in select-none" @click="openZoom(entry)">
      <img
        :src="entry.extra.pictionary.image"
        :alt="t('flashcard.pictionary.imageAlt', 'Pictionary image')"
        class="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 object-contain rounded-md sm:rounded-lg border border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-dark-bg-soft"
      />
    </div>
    <!-- Read-only letter slots -->
    <div v-if="entry.extra?.pictionary?.slots && entry.extra.pictionary.slots.length" class="flex flex-wrap gap-1 xs:gap-1.5 items-center justify-center xs:justify-start cursor-zoom-in select-none" @click="openZoom(entry)">
      <template v-for="(slot, sIdx) in entry.extra.pictionary.slots">
        <div v-if="slot.separator" :key="`sep-${sIdx}`" class="px-0.5 xs:px-1 text-sm xs:text-base text-gray-700 dark:text-white/80 select-none">
          {{ slot.char }}
        </div>
        <div
          v-else
          :key="`box-${sIdx}`"
          class="w-6 h-8 xs:w-7 xs:h-9 sm:w-8 sm:h-10 md:w-9 md:h-11 flex items-center justify-center rounded border text-sm xs:text-base sm:text-lg font-semibold bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute"
          :class="slot.fixed ? 'opacity-90' : ''"
        >
          <span class="uppercase tracking-wider">{{ slot.char || '\u00A0' }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  entry: any
}>()

const emit = defineEmits<{
  openZoom: [entry: any]
}>()

const { t } = useI18n()

const openZoom = (entry: any) => {
  emit('openZoom', entry)
}
</script>
