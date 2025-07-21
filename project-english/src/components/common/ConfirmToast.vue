<template>
  <div class="flex flex-col items-center p-4">
    <p class="text-center mb-4 text-base font-medium">{{ message }}</p>
    <div class="flex space-x-4">
      <button
        @click="onConfirm"
        class="px-4 py-2 text-sm font-semibold text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
      >
        {{ confirmText }}
      </button>
      <button
        @click="onCancel"
        class="px-4 py-2 text-sm font-semibold text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
      >
        {{ cancelText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

defineProps<Props>();
</script>
