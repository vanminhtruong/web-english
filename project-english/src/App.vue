<script setup lang="ts">
import { RouterView } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { loadComponentSafely } from './utils/import-helper'

// Use defineAsyncComponent to import components
const LazyLoadComponent = defineAsyncComponent(() => import('./components/LazyLoadComponent.vue'))
const AppHeader = defineAsyncComponent(
  loadComponentSafely(() => import('./components/common/AppHeader.vue'))
)
</script>

<template>
  <div id="app" class="min-h-screen">
    <!-- Lazy loaded header -->
    <LazyLoadComponent animation-type="fade-up" :threshold="0.1" root-margin="0px">
      <AppHeader />
    </LazyLoadComponent>

    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>
