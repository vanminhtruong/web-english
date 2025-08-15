<template>
  <BaseAccordion
    :title="t('vocabulary.header.accordionTitle', 'Vocabulary Manager')"
    :description="t('vocabulary.header.accordionDescription', 'Add and manage your vocabulary words')"
    icon="vocabulary"
    :default-open="true"
    persist-key="vocabulary-header"
    data-vocabulary-header
  >
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ t('vocabulary.title', 'Vocabulary') }}</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-white/80">{{ t('vocabulary.description', 'Manage and learn English vocabulary') }}</p>
      </div>
      <button @click="$emit('add-vocabulary')" data-original-add-button class="bg-blue-500 hover:bg-blue-600 text-white font-medium w-full md:w-auto py-1.5 px-3 xs:py-2 xs:px-4 rounded-lg transition-colors">
        <svg class="w-4 h-4 xs:w-5 xs:h-5 inline mr-1 xs:mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
        </svg>
        {{ t('vocabulary.addNew', 'Add New Word') }}
      </button>
    </div>
  </BaseAccordion>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { defineAsyncComponent } from 'vue'

const BaseAccordion = defineAsyncComponent(() => import('../../../components/BaseAccordion.vue'))

const { t } = useI18n()

defineEmits<{
  'add-vocabulary': []
}>()
</script>
