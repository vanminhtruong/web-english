<template>
  <div class="space-y-4">
    <!-- Upload Area -->
    <div class="relative">
      <label for="image-upload" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {{ t('vocabulary.image.title', 'Image') }}
      </label>
      
      <!-- Method Toggle -->
      <div class="flex items-center space-x-4 mb-4">
        <button
          @click="inputMethod = 'upload'"
          type="button"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
            inputMethod === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ t('vocabulary.image.upload', 'Upload') }}
        </button>
        <button
          @click="inputMethod = 'url'"
          type="button"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
            inputMethod === 'url'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ t('vocabulary.image.url', 'URL') }}
        </button>
        <button
          @click="inputMethod = 'copy'"
          type="button"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
            inputMethod === 'copy'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ t('vocabulary.image.copyTab', 'Copy') }}
        </button>
      </div>
      
      <!-- File Input (Hidden) -->
      <input
        id="image-upload"
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileChange"
        class="hidden"
      />
      
      <!-- Upload Zone -->
      <div v-if="inputMethod === 'upload' && !imagePreview">
        <div
          @click="triggerFileInput"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          :class="[
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            isDragOver 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500',
            'bg-gray-50 dark:bg-[#0a0a0a]/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
          ]"
        >
          <div class="flex flex-col items-center space-y-2">
            <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <span class="font-medium text-blue-600 dark:text-blue-400">
                {{ t('vocabulary.image.clickToUpload', 'Click to upload') }}
              </span>
              {{ t('vocabulary.image.orDragDrop', ' or drag and drop') }}
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-500">
              {{ t('vocabulary.image.supportedFormats', 'PNG, JPG, GIF up to 10MB') }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- URL Input Zone -->
      <div v-if="inputMethod === 'url' && !imagePreview" class="space-y-3">
        <div>
          <input
            v-model="imageUrl"
            @blur="handleUrlInput"
            @keyup.enter="handleUrlInput"
            type="url"
            :placeholder="t('vocabulary.image.urlPlaceholder', 'Enter image URL')"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <button
          @click="handleUrlInput"
          :disabled="!imageUrl.trim() || isProcessing"
          type="button"
          class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <svg v-if="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isProcessing ? t('vocabulary.image.loading', 'Loading...') : t('vocabulary.image.loadFromUrl', 'Load from URL') }}</span>
        </button>
      </div>
      
      <!-- Copy Image Zone -->
      <div v-if="inputMethod === 'copy'" class="space-y-3">
        <div
          class="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 text-sm"
        >
          <p>
            {{ t('vocabulary.image.paste.hint', 'Press Ctrl+V to paste an image, or click the button:') }}
          </p>
          <div class="flex items-center space-x-2 mt-2">
            <button
              @click="pasteImageFromClipboard"
              type="button"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
              :disabled="isProcessing"
            >
              <svg v-if="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8m8-5H8l-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7z" />
              </svg>
              <span>{{ t('vocabulary.image.paste.button', 'Paste image from clipboard') }}</span>
            </button>
            <span v-if="copyStatus && copyStatus.type === 'success'" class="text-green-600 dark:text-green-400 text-sm">
              {{ copyStatus.message }}
            </span>
          </div>
        </div>
        <div
          class="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 text-sm"
        >
          <p v-if="!imagePreview">
            {{ t('vocabulary.image.copy.noImage', 'No image to copy. Please upload or load an image first.') }}
          </p>
          <div v-else class="space-y-2">
            <p>
              {{ t('vocabulary.image.copy.description', 'Copy the current image to your clipboard as an actual image, not just the URL.') }}
            </p>
            <div class="flex items-center space-x-2">
              <button
                @click="copyImageToClipboard"
                type="button"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
                :disabled="isProcessing"
              >
                <svg v-if="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8m-9 8h10a2 2 0 002-2V6a2 2 0 00-2-2H9l-3 3v11a2 2 0 002 2z" />
                </svg>
                <span>{{ t('vocabulary.image.copy.button', 'Copy image to clipboard') }}</span>
              </button>
              <span v-if="copyStatus && copyStatus.type === 'success'" class="text-green-600 dark:text-green-400 text-sm">
                {{ copyStatus.message }}
              </span>
              <span v-else-if="copyStatus && copyStatus.type === 'warning'" class="text-yellow-600 dark:text-yellow-400 text-sm">
                {{ copyStatus.message }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Image Preview -->
      <div v-if="imagePreview" class="relative">
        <div class="border-2 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <img
            :src="imagePreview"
            :alt="t('vocabulary.image.preview', 'Image preview')"
            class="w-full h-48 object-cover"
          />
        </div>
        
        <!-- Image Actions -->
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center space-x-2">
            <button
              v-if="inputMethod === 'upload'"
              @click="triggerFileInput"
              type="button"
              class="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
              <span>{{ t('vocabulary.image.changeFile', 'Change Image') }}</span>
            </button>
            
            <button
              v-if="inputMethod === 'url'"
              @click="showUrlEdit = true"
              type="button"
              class="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
              <span>{{ t('vocabulary.image.changeUrl', 'Change URL') }}</span>
            </button>
            
            <button
              @click="removeImage"
              type="button"
              class="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              <span>{{ t('vocabulary.image.remove', 'Remove') }}</span>
            </button>
          </div>
          
          <!-- Image Info -->
          <div class="text-xs text-gray-500 dark:text-gray-400">
            <div v-if="imageInfo && inputMethod === 'upload'">
              {{ formatFileSize(imageInfo.size) }}
            </div>
            <div v-if="inputMethod === 'url'">
              {{ t('vocabulary.image.fromUrl', 'From URL') }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- URL Edit Modal -->
      <div v-if="showUrlEdit" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-6 w-full max-w-md mx-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {{ t('vocabulary.image.changeUrl', 'Change URL') }}
          </h3>
          <div class="space-y-4">
            <input
              v-model="newImageUrl"
              @keyup.enter="handleUrlChange"
              type="url"
              :placeholder="t('vocabulary.image.urlPlaceholder', 'Enter image URL')"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div class="flex justify-end space-x-3">
              <button
                @click="showUrlEdit = false"
                type="button"
                class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {{ t('common.cancel', 'Cancel') }}
              </button>
              <button
                @click="handleUrlChange"
                :disabled="!newImageUrl.trim() || isProcessing"
                type="button"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {{ isProcessing ? t('vocabulary.image.loading', 'Loading...') : t('common.update', 'Update') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="isProcessing" class="absolute inset-0 bg-white dark:bg-[#0a0a0a] bg-opacity-75 flex items-center justify-center rounded-lg">
        <div class="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
          <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm">{{ t('vocabulary.image.processing', 'Processing...') }}</span>
        </div>
      </div>
    </div>
    
    <!-- Error Message -->
    <div v-if="errorMessage" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-sm text-red-700 dark:text-red-300">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue?: string | null
}

interface Emits {
  (e: 'update:modelValue', value: string | null): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null
})

const emit = defineEmits<Emits>()
const { t } = useI18n()

// Reactive state
const fileInput = ref<HTMLInputElement>()
const imagePreview = ref<string | null>(null)
const imageInfo = ref<{ name: string; size: number } | null>(null)
const isDragOver = ref(false)
const isProcessing = ref(false)
const errorMessage = ref<string | null>(null)
const inputMethod = ref<'upload' | 'url' | 'copy'>('upload')
const imageUrl = ref('')
const newImageUrl = ref('')
const showUrlEdit = ref(false)
const copyStatus = ref<{ type: 'success' | 'warning'; message: string } | null>(null)

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

// Handle paste from clipboard when on Copy tab
const handlePaste = async (e: ClipboardEvent) => {
  try {
    // Don't intercept when typing into inputs/textareas/contenteditable
    const target = e.target as HTMLElement | null
    if (target && target.closest('input, textarea, [contenteditable="true"]')) return

    if (inputMethod.value !== 'copy') return

    const cd = e.clipboardData
    if (!cd) return

    // Prefer image file from clipboard
    const items = cd.items
    let imageFile: File | null = null
    if (items && items.length) {
      for (let i = 0; i < items.length; i++) {
        const it = items[i]
        if (it.kind === 'file' && it.type.startsWith('image/')) {
          const f = it.getAsFile()
          if (f) { imageFile = f; break }
        }
      }
    }

    // Fallback: clipboard files
    if (!imageFile && cd.files && cd.files.length > 0 && cd.files[0].type.startsWith('image/')) {
      imageFile = cd.files[0]
    }

    if (imageFile) {
      e.preventDefault()
      await processFile(imageFile)
      copyStatus.value = { type: 'success', message: t('vocabulary.image.paste.success', 'Image pasted!') || 'Image pasted!' }
      return
    }

    // Fallback: detect image URL text
    const text = cd.getData('text/plain')
    if (text && isValidImageUrl(text)) {
      e.preventDefault()
      imageUrl.value = text
      await handleUrlInput()
      copyStatus.value = { type: 'success', message: t('vocabulary.image.paste.success', 'Image pasted!') || 'Image pasted!' }
      return
    }

    // Nothing useful found
    errorMessage.value = t('vocabulary.image.paste.noImage', 'Clipboard does not contain an image')
  } catch (err) {
    console.error('Paste handler error:', err)
    errorMessage.value = t('vocabulary.image.paste.error', 'Failed to paste from clipboard')
  }
}

// Register paste listener only when Copy tab is active
onMounted(() => {
  if (inputMethod.value === 'copy') {
    window.addEventListener('paste', handlePaste)
  }
})

watch(inputMethod, (val, oldVal) => {
  if (oldVal === 'copy') {
    window.removeEventListener('paste', handlePaste)
  }
  if (val === 'copy') {
    window.addEventListener('paste', handlePaste)
  }
})

onUnmounted(() => {
  window.removeEventListener('paste', handlePaste)
})

// Methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    processFile(files[0])
  }
}

const processFile = async (file: File) => {
  // Clear previous errors
  errorMessage.value = null
  
  // Validate file type
  if (!SUPPORTED_TYPES.includes(file.type)) {
    errorMessage.value = t('vocabulary.image.errors.unsupportedFormat', 'Unsupported file format')
    return
  }
  
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    errorMessage.value = t('vocabulary.image.errors.fileTooLarge', 'File size too large')
    return
  }
  
  isProcessing.value = true
  
  try {
    // Convert to base64
    const base64 = await fileToBase64(file)
    
    imagePreview.value = base64
    imageInfo.value = {
      name: file.name,
      size: file.size
    }
    
    // Emit the base64 string
    emit('update:modelValue', base64)
    
  } catch (error) {
    console.error('Error processing image:', error)
    errorMessage.value = t('vocabulary.image.errors.processingFailed', 'Failed to process image')
  } finally {
    isProcessing.value = false
  }
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      resolve(result)
    }
    reader.onerror = error => reject(error)
  })
}

const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
  // Using fetch for data URLs is widely supported and simpler
  const res = await fetch(dataUrl)
  return await res.blob()
}

const fetchImageBlob = async (url: string): Promise<Blob> => {
  // Try standard CORS fetch first
  const res = await fetch(url, { mode: 'cors' })
  if (!res.ok) throw new Error('Fetch failed')
  return await res.blob()
}

const urlToBlobViaCanvas = (url: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Canvas not supported'))
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Canvas toBlob failed'))
        })
      } catch (e) {
        reject(e as Error)
      }
    }
    img.onerror = () => reject(new Error('Image load error'))
    img.src = url
  })
}

const copyImageToClipboard = async () => {
  copyStatus.value = null
  errorMessage.value = null
  if (!imagePreview.value) {
    errorMessage.value = t('vocabulary.image.copy.noImage', 'No image to copy. Please upload or load an image first.')
    return
  }
  // Check support
  const hasClipboard = !!(navigator.clipboard && (navigator.clipboard as any).write && (window as any).ClipboardItem)
  if (!hasClipboard) {
    errorMessage.value = t('vocabulary.image.copy.unsupported', 'Clipboard API for images is not supported in this browser.')
    return
  }
  isProcessing.value = true
  try {
    let blob: Blob
    if (imagePreview.value.startsWith('data:')) {
      blob = await dataUrlToBlob(imagePreview.value)
    } else if (imagePreview.value.startsWith('http')) {
      try {
        blob = await fetchImageBlob(imagePreview.value)
      } catch {
        // Fallback: try canvas route (may fail if CORS not enabled)
        blob = await urlToBlobViaCanvas(imagePreview.value)
      }
    } else {
      throw new Error('Unknown image source')
    }

    const mime = blob.type || 'image/png'
    const item = new (window as any).ClipboardItem({ [mime]: blob })
    await (navigator.clipboard as any).write([item])
    copyStatus.value = { type: 'success', message: t('vocabulary.image.copy.success', 'Image copied to clipboard!') || 'Image copied to clipboard!' }
  } catch (err) {
    console.error('Copy image failed:', err)
    // Likely CORS/canvas taint issue
    errorMessage.value = t('vocabulary.image.copy.failed', 'Failed to copy image. Some images cannot be copied due to browser or CORS restrictions.')
    // Provide a gentle note if URL source
    if (imagePreview.value?.startsWith('http')) {
      copyStatus.value = { type: 'warning', message: t('vocabulary.image.copy.corsNote', 'Tip: Images from some websites block copying. Try uploading the image instead.') || 'Tip: Images from some websites block copying. Try uploading the image instead.' }
    }
  } finally {
    isProcessing.value = false
    // Auto clear status after short delay
    setTimeout(() => { copyStatus.value = null }, 2500)
  }
}

// Read image from clipboard on button click
const pasteImageFromClipboard = async () => {
  copyStatus.value = null
  errorMessage.value = null
  
  // Only act within Copy tab context; the button exists there, but keep the guard
  if (inputMethod.value !== 'copy') return
  
  const canRead = !!(navigator.clipboard && (navigator.clipboard as any).read)
  isProcessing.value = true
  try {
    // Preferred: ClipboardItem API (image blob)
    if (canRead) {
      const items = await (navigator.clipboard as any).read()
      for (const item of items) {
        const types: string[] = (item.types || []) as any
        const imageType = types.find(t => t.startsWith('image/'))
        if (imageType) {
          const blob = await item.getType(imageType)
          const ext = (blob.type.split('/')[1] || 'png').replace(/[^a-z0-9]/gi, '')
          const file = new File([blob], `clipboard-${Date.now()}.${ext}`, { type: blob.type })
          await processFile(file)
          copyStatus.value = { type: 'success', message: t('vocabulary.image.paste.success', 'Image pasted!') || 'Image pasted!' }
          return
        }
      }
    }
    
    // Fallback: readText for URL
    if (navigator.clipboard && (navigator.clipboard as any).readText) {
      const text = await (navigator.clipboard as any).readText()
      const url = text?.trim()
      if (url && isValidImageUrl(url)) {
        imageUrl.value = url
        await handleUrlInput()
        copyStatus.value = { type: 'success', message: t('vocabulary.image.paste.success', 'Image pasted!') || 'Image pasted!' }
        return
      }
    }
    
    // No image data found
    errorMessage.value = t('vocabulary.image.paste.noImage', 'Clipboard does not contain an image')
  } catch (err) {
    console.error('pasteImageFromClipboard failed:', err)
    errorMessage.value = t('vocabulary.image.paste.error', 'Failed to paste from clipboard')
  } finally {
    isProcessing.value = false
    if (copyStatus.value?.type === 'success') {
      setTimeout(() => { copyStatus.value = null }, 2500)
    }
  }
}

const removeImage = () => {
  imagePreview.value = null
  imageInfo.value = null
  errorMessage.value = null
  imageUrl.value = ''
  
  // Clear file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  
  // Emit null to parent
  emit('update:modelValue', null)
}

const handleUrlInput = async () => {
  if (!imageUrl.value.trim()) {
    errorMessage.value = t('vocabulary.image.errors.emptyUrl')
    return
  }
  
  // Basic URL validation
  if (!isValidImageUrl(imageUrl.value)) {
    errorMessage.value = t('vocabulary.image.errors.invalidUrl')
    return
  }
  
  isProcessing.value = true
  errorMessage.value = null
  
  try {
    // Test if image can be loaded
    await validateImageUrl(imageUrl.value)
    
    imagePreview.value = imageUrl.value
    imageInfo.value = null // No file info for URLs
    
    // Emit the URL
    emit('update:modelValue', imageUrl.value)
    
  } catch (error) {
    console.error('Error loading image from URL:', error)
    // Still accept the URL if it looks valid (CORS might be blocking it)
    if (isValidImageUrl(imageUrl.value)) {
      imagePreview.value = imageUrl.value
      imageInfo.value = null
      emit('update:modelValue', imageUrl.value)
      // Show a warning instead of error
      errorMessage.value = t('vocabulary.image.errors.corsWarning')
    } else {
      errorMessage.value = t('vocabulary.image.errors.urlLoadFailed')
    }
  } finally {
    isProcessing.value = false
  }
}

const handleUrlChange = async () => {
  if (!newImageUrl.value.trim()) {
    errorMessage.value = t('vocabulary.image.errors.emptyUrl')
    return
  }
  
  // Basic URL validation
  if (!isValidImageUrl(newImageUrl.value)) {
    errorMessage.value = t('vocabulary.image.errors.invalidUrl')
    return
  }
  
  isProcessing.value = true
  errorMessage.value = null
  
  try {
    // Test if image can be loaded
    await validateImageUrl(newImageUrl.value)
    
    imagePreview.value = newImageUrl.value
    imageUrl.value = newImageUrl.value
    
    // Emit the new URL
    emit('update:modelValue', newImageUrl.value)
    
    // Close modal
    showUrlEdit.value = false
    newImageUrl.value = ''
    
  } catch (error) {
    console.error('Error loading image from URL:', error)
    // Still accept the URL if it looks valid (CORS might be blocking it)
    if (isValidImageUrl(newImageUrl.value)) {
      imagePreview.value = newImageUrl.value
      imageUrl.value = newImageUrl.value
      emit('update:modelValue', newImageUrl.value)
      showUrlEdit.value = false
      newImageUrl.value = ''
      // Show a warning instead of error
      errorMessage.value = t('vocabulary.image.errors.corsWarning')
    } else {
      errorMessage.value = t('vocabulary.image.errors.urlLoadFailed')
    }
  } finally {
    isProcessing.value = false
  }
}

const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    // Check if it's a valid HTTP/HTTPS URL
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }
    
    // Check if URL ends with common image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg']
    const pathname = urlObj.pathname.toLowerCase()
    const hasImageExtension = imageExtensions.some(ext => pathname.includes(ext))
    
    // Check for common image hosting patterns and services
    const commonImageHosts = [
      'imgur.com', 'cloudinary.com', 'unsplash.com', 'pexels.com', 'pixabay.com',
      'googleusercontent.com', 'gstatic.com', 'ggpht.com', // Google services
      'fbcdn.net', 'cdninstagram.com', // Facebook/Instagram
      'twimg.com', // Twitter
      'amazonaws.com', 's3.', // AWS S3
      'githubusercontent.com', // GitHub
      'wikimedia.org', 'wikipedia.org', // Wikipedia
      'flickr.com', 'staticflickr.com', // Flickr
      'dropbox.com', 'dropboxusercontent.com', // Dropbox
      'drive.google.com', // Google Drive
      'ibb.co', 'postimg.cc', // Image hosting services
      'cdn.', 'images.', 'img.', 'static.', 'media.' // Common CDN patterns
    ]
    const hasImageHost = commonImageHosts.some(host => url.includes(host))
    
    // Check for query parameters that suggest image content
    const imageQueryParams = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'image', 'img', 'photo']
    const queryString = urlObj.search.toLowerCase()
    const hasImageQuery = imageQueryParams.some(param => queryString.includes(param))
    
    // More lenient: accept if ANY of these conditions are true
    return hasImageExtension || hasImageHost || hasImageQuery
  } catch {
    return false
  }
}

const validateImageUrl = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Try without crossOrigin first to avoid CORS issues
    const img = new Image()
    
    // Set a timeout for slow loading images
    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout'))
    }, 8000) // 8 seconds timeout
    
    img.onload = () => {
      clearTimeout(timeout)
      resolve()
    }
    
    img.onerror = () => {
      clearTimeout(timeout)
      // Try a fallback method - just accept the URL if it looks like an image
      if (isValidImageUrl(url)) {
        console.warn('Image validation failed but URL looks valid, accepting anyway')
        resolve() // Accept the URL anyway
      } else {
        reject(new Error('Failed to load image'))
      }
    }
    
    img.src = url
  })
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== imagePreview.value) {
      imagePreview.value = newValue
      
      if (!newValue) {
        imageInfo.value = null
        errorMessage.value = null
        imageUrl.value = ''
      } else {
        // Detect if it's a URL or base64
        if (newValue.startsWith('http')) {
          inputMethod.value = 'url'
          imageUrl.value = newValue
        } else {
          inputMethod.value = 'upload'
        }
      }
    }
  },
  { immediate: true }
)

// Watch inputMethod changes
watch(inputMethod, (newMethod) => {
  // Clear previous errors when switching methods
  errorMessage.value = null
  
  // If switching to URL and there's already an image, keep it
  // If switching to upload and current image is URL, keep it but allow file upload
})

onMounted(() => {
  // Initialize with prop value
  if (props.modelValue) {
    imagePreview.value = props.modelValue
  }
})
</script>
