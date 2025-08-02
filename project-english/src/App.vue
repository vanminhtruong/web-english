<script setup lang="ts">
import { RouterView } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { loadComponentSafely } from './utils/import-helper'

// Import components - use direct import for header to ensure proper positioning
const AppHeader = defineAsyncComponent(
  () => import('./components/common/AppHeader.vue')
)
const BackToTop = defineAsyncComponent(
  () => import('./components/common/BackToTop.vue')
)
const LazyLoadComponent = defineAsyncComponent(() => import('./components/LazyLoadComponent.vue'))
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
    <BackToTop />
  </div>
</template>

<style scoped>

</style>
