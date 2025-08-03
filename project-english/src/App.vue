<script setup lang="ts">
import { RouterView } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { loadComponentSafely } from './utils/import-helper'
import { useModalStore } from './stores/modalStore'

// Import components - use direct import for header to ensure proper positioning
const AppHeader = defineAsyncComponent(
  () => import('./components/common/AppHeader.vue')
)
const BackToTop = defineAsyncComponent(
  () => import('./components/common/BackToTop.vue')
)
const LazyLoadComponent = defineAsyncComponent(() => import('./components/LazyLoadComponent.vue'))

// Modal store for managing button visibility
const modalStore = useModalStore()
</script>

<template>
  <div id="app" class="min-h-screen">
    <!-- Fixed header - positioned outside container constraints -->
    <AppHeader />

    <!-- Main content with proper padding for fixed header -->
    <main class="flex-1 pt-16">
      <RouterView />
    </main>

    <!-- Back to Top Button - Fixed position -->
    <BackToTop v-show="!modalStore.shouldHideBackToTop" />
  </div>
</template>

<style scoped>

</style>
