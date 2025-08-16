<template>
  <!-- Save & Sync Control Panel -->
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-[#0f0f0f] mb-6 overflow-hidden">
    <!-- Header with gradient background -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0f0f0f] dark:to-[#0a0a0a] px-6 py-4 border-b border-gray-200 dark:border-[#0f0f0f]">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('vocabulary.save.title', 'Save & Sync') }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('vocabulary.save.subtitle', 'Manage your vocabulary data storage') }}</p>
          </div>
        </div>
        
        <!-- Save Mode Toggle -->
        <div class="flex items-center space-x-3">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('vocabulary.save.mode', 'Save Mode')}}</span>
          <button
            @click="emit('update:autoSaveEnabled', !autoSaveEnabled)"
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
              autoSaveEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
            ]"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                autoSaveEnabled ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ autoSaveEnabled ? t('vocabulary.save.auto', 'Auto') : t('vocabulary.save.manual', 'Manual') }}
          </span>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left Section: Save Actions -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Manual Save Card -->
          <div v-if="!autoSaveEnabled" class="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 class="text-sm font-medium text-green-800 dark:text-green-400 mb-3">{{ t('vocabulary.save.manualMode', 'Manual Save Mode') }}</h4>
            <button
              @click="emit('manual-save')"
              :disabled="isSaving"
              class="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md"
            >
              <svg v-if="isSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <span>{{ isSaving ? t('common.saving', 'Saving...') : t('vocabulary.save.saveNow', 'Save Now') }}</span>
            </button>
          </div>

          <!-- Auto Save Configuration -->
          <div v-if="autoSaveEnabled" class="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 class="text-sm font-medium text-blue-800 dark:text-blue-400 mb-3">{{ t('vocabulary.save.autoMode', 'Auto Save Configuration') }}</h4>
            
            <!-- Storage Type Selector -->
            <div class="mb-4">
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('vocabulary.save.storageType', 'Storage Type') }}</label>
              <select
                :value="storageType"
                @change="handleStorageTypeChange"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="local">{{ t('vocabulary.save.localStorage', 'Local File') }}</option>
                <option value="google-drive">{{ t('vocabulary.save.googleDrive', 'Google Drive') }}</option>
              </select>
            </div>

            <!-- Storage Actions -->
            <div class="space-y-2">
              <!-- Local File Setup -->
              <button
                v-if="storageType === 'local' && !hasAutoSaveFile"
                @click="emit('setup-auto-save')"
                class="w-full px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>{{ t('vocabulary.save.chooseAutoFile', 'Choose Auto File') }}</span>
              </button>

              <!-- Google Drive Authentication -->
              <button
                v-if="storageType === 'google-drive' && !isGoogleSignedIn"
                @click="emit('google-sign-in')"
                class="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"></path>
                </svg>
                <span>{{ t('vocabulary.save.signInGoogle', 'Sign in Google') }}</span>
              </button>

              <!-- Google Drive Setup -->
              <button
                v-if="storageType === 'google-drive' && isGoogleSignedIn && !hasGoogleDriveFile"
                @click="emit('setup-google-drive')"
                class="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <span>{{ t('vocabulary.save.setupDrive', 'Setup Google Drive') }}</span>
              </button>

              <!-- Google Drive Sync -->
              <button
                v-if="storageType === 'google-drive' && isGoogleSignedIn && hasGoogleDriveFile"
                @click="emit('sync-from-google-drive')"
                class="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>{{ t('vocabulary.save.syncFromDrive', 'Sync from Drive') }}</span>
              </button>

              <!-- Reset/Change buttons -->
              <button
                v-if="(storageType === 'local' && hasAutoSaveFile) || (storageType === 'google-drive' && isGoogleSignedIn)"
                @click="storageType === 'local' ? emit('reset-auto-save') : emit('google-sign-out')"
                class="w-full px-4 py-2.5 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>{{ storageType === 'local' ? t('vocabulary.save.changeAutoFile', 'Change Auto File') : t('vocabulary.save.signOutGoogle', 'Sign Out Google') }}</span>
              </button>
            </div>
          </div>

          <!-- Import & Export Actions -->
          <div class="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h4 class="text-sm font-medium text-purple-800 dark:text-purple-400 mb-3">{{ t('vocabulary.save.importExport', 'Import & Export') }}</h4>
            <div class="relative">
              <input
                ref="fileInputRef"
                type="file"
                accept=".json"
                @change="handleFileSelected"
                class="hidden"
              />
              <button
                @click="openFilePicker"
                class="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
                <span>{{ t('vocabulary.save.importFile', 'Import File') }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Section: Status & Information -->
        <div class="space-y-4">
          <!-- Save Status Card -->
          <div class="bg-gray-50 dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#0f0f0f] rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">{{ t('vocabulary.save.status', 'Save Status') }}</h4>
            
            <div class="space-y-3">
              <!-- Current Status -->
              <div class="flex items-center space-x-2">
                <div :class="['h-3 w-3 rounded-full', saveStatusColor]" />
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ saveStatusText }}</span>
              </div>
              
              <!-- Last Save Time -->
              <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="truncate">{{ formattedLastSave }}</span>
              </div>
            </div>
          </div>

          <!-- Storage Info Card -->
          <div v-if="autoSaveEnabled" class="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
            <h4 class="text-sm font-medium text-indigo-800 dark:text-indigo-400 mb-3">{{ t('vocabulary.save.storageInfo', 'Storage Information') }}</h4>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <p class="mb-2">
                <span class="font-medium">{{ t('vocabulary.save.type', 'Type') }}:</span>
                {{ storageType === 'local' ? t('vocabulary.save.localStorage', 'Local File') : t('vocabulary.save.googleDrive', 'Google Drive') }}
              </p>
              <p v-if="storageType === 'local' && hasAutoSaveFile" class="text-xs text-green-600 dark:text-green-400">
                ✓ {{ t('vocabulary.save.fileConfigured', 'Auto-save file configured') }}
              </p>
              <p v-if="storageType === 'google-drive' && isGoogleSignedIn" class="text-xs text-green-600 dark:text-green-400">
                ✓ {{ t('vocabulary.save.googleConnected', 'Google Drive connected') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props {
  autoSaveEnabled: boolean;
  isSaving: boolean;
  hasAutoSaveFile: boolean;
  hasGoogleDriveFile: boolean;
  isGoogleSignedIn: boolean;
  lastSaveTime: string;
  saveStatusColor: string;
  saveStatusText: string;
  autoSaveFilePath: string;
  storageType: 'local' | 'google-drive';
}

const props = defineProps<Props>();

const emit = defineEmits([
  'update:autoSaveEnabled',
  'update:storageType',
  'update:hasAutoSaveFile',
  'update:hasGoogleDriveFile',
  'update:isGoogleSignedIn',
  'update:autoSaveFilePath',
  'manual-save',
  'setup-auto-save',
  'reset-auto-save',
  'import-file',
  'google-sign-in',
  'google-sign-out',
  'setup-google-drive',
  'sync-from-google-drive'
]);

// LocalStorage keys for persisting save settings
const AUTO_SAVE_KEY = 'vocabulary-auto-save-enabled';
const STORAGE_TYPE_KEY = 'vocabulary-storage-type';
const HAS_AUTO_SAVE_FILE_KEY = 'vocabulary-has-auto-save-file';
const HAS_GOOGLE_DRIVE_FILE_KEY = 'vocabulary-has-google-drive-file';
const IS_GOOGLE_SIGNED_IN_KEY = 'vocabulary-is-google-signed-in';
const AUTO_SAVE_FILE_PATH_KEY = 'vocabulary-auto-save-file-path';

const { t } = useI18n();
const fileInputRef = ref<HTMLInputElement | null>(null);

// LocalStorage utility functions
const loadAutoSaveEnabled = (): boolean | null => {
  try {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    return saved !== null ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load auto save setting from localStorage:', error);
    return null;
  }
};

const saveAutoSaveEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(enabled));
  } catch (error) {
    console.warn('Failed to save auto save setting to localStorage:', error);
  }
};

const loadStorageType = (): 'local' | 'google-drive' | null => {
  try {
    const saved = localStorage.getItem(STORAGE_TYPE_KEY);
    if (saved && (saved === 'local' || saved === 'google-drive')) {
      return saved as 'local' | 'google-drive';
    }
    return null;
  } catch (error) {
    console.warn('Failed to load storage type from localStorage:', error);
    return null;
  }
};

const saveStorageType = (type: 'local' | 'google-drive'): void => {
  try {
    localStorage.setItem(STORAGE_TYPE_KEY, type);
  } catch (error) {
    console.warn('Failed to save storage type to localStorage:', error);
  }
};

// Auto Save File State
const loadHasAutoSaveFile = (): boolean | null => {
  try {
    const saved = localStorage.getItem(HAS_AUTO_SAVE_FILE_KEY);
    return saved !== null ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load auto save file state from localStorage:', error);
    return null;
  }
};

const saveHasAutoSaveFile = (hasFile: boolean): void => {
  try {
    localStorage.setItem(HAS_AUTO_SAVE_FILE_KEY, JSON.stringify(hasFile));
  } catch (error) {
    console.warn('Failed to save auto save file state to localStorage:', error);
  }
};

// Google Drive File State
const loadHasGoogleDriveFile = (): boolean | null => {
  try {
    const saved = localStorage.getItem(HAS_GOOGLE_DRIVE_FILE_KEY);
    return saved !== null ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load Google Drive file state from localStorage:', error);
    return null;
  }
};

const saveHasGoogleDriveFile = (hasFile: boolean): void => {
  try {
    localStorage.setItem(HAS_GOOGLE_DRIVE_FILE_KEY, JSON.stringify(hasFile));
  } catch (error) {
    console.warn('Failed to save Google Drive file state to localStorage:', error);
  }
};

// Google Sign-In State
const loadIsGoogleSignedIn = (): boolean | null => {
  try {
    const saved = localStorage.getItem(IS_GOOGLE_SIGNED_IN_KEY);
    return saved !== null ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load Google sign-in state from localStorage:', error);
    return null;
  }
};

const saveIsGoogleSignedIn = (isSignedIn: boolean): void => {
  try {
    localStorage.setItem(IS_GOOGLE_SIGNED_IN_KEY, JSON.stringify(isSignedIn));
  } catch (error) {
    console.warn('Failed to save Google sign-in state to localStorage:', error);
  }
};

// Auto Save File Path
const loadAutoSaveFilePath = (): string | null => {
  try {
    return localStorage.getItem(AUTO_SAVE_FILE_PATH_KEY);
  } catch (error) {
    console.warn('Failed to load auto save file path from localStorage:', error);
    return null;
  }
};

const saveAutoSaveFilePath = (filePath: string): void => {
  try {
    localStorage.setItem(AUTO_SAVE_FILE_PATH_KEY, filePath);
  } catch (error) {
    console.warn('Failed to save auto save file path to localStorage:', error);
  }
};

// Watch for changes in props and persist to localStorage
watch(
  () => props.autoSaveEnabled,
  (newValue) => {
    saveAutoSaveEnabled(newValue);
  }
);

watch(
  () => props.storageType,
  (newValue) => {
    saveStorageType(newValue);
  }
);

watch(
  () => props.hasAutoSaveFile,
  (newValue) => {
    saveHasAutoSaveFile(newValue);
  }
);

watch(
  () => props.hasGoogleDriveFile,
  (newValue) => {
    saveHasGoogleDriveFile(newValue);
  }
);

watch(
  () => props.isGoogleSignedIn,
  (newValue) => {
    saveIsGoogleSignedIn(newValue);
  }
);

watch(
  () => props.autoSaveFilePath,
  (newValue) => {
    if (newValue) {
      saveAutoSaveFilePath(newValue);
    }
  }
);

// Load saved settings on component mount and emit to parent if different
onMounted(() => {
  const savedAutoSave = loadAutoSaveEnabled();
  const savedStorageType = loadStorageType();
  const savedHasAutoSaveFile = loadHasAutoSaveFile();
  const savedHasGoogleDriveFile = loadHasGoogleDriveFile();
  const savedIsGoogleSignedIn = loadIsGoogleSignedIn();
  const savedAutoSaveFilePath = loadAutoSaveFilePath();
  
  // If saved settings exist and differ from current props, emit updates to parent
  if (savedAutoSave !== null && savedAutoSave !== props.autoSaveEnabled) {
    emit('update:autoSaveEnabled', savedAutoSave);
  }
  
  if (savedStorageType !== null && savedStorageType !== props.storageType) {
    emit('update:storageType', savedStorageType);
  }
  
  if (savedHasAutoSaveFile !== null && savedHasAutoSaveFile !== props.hasAutoSaveFile) {
    emit('update:hasAutoSaveFile', savedHasAutoSaveFile);
  }
  
  if (savedHasGoogleDriveFile !== null && savedHasGoogleDriveFile !== props.hasGoogleDriveFile) {
    emit('update:hasGoogleDriveFile', savedHasGoogleDriveFile);
  }
  
  if (savedIsGoogleSignedIn !== null && savedIsGoogleSignedIn !== props.isGoogleSignedIn) {
    emit('update:isGoogleSignedIn', savedIsGoogleSignedIn);
  }
  
  if (savedAutoSaveFilePath !== null && savedAutoSaveFilePath !== props.autoSaveFilePath) {
    emit('update:autoSaveFilePath', savedAutoSaveFilePath);
  }
});

// Generate Last save label robustly, even if translation key missing
const formattedLastSave = computed(() => {
  const notSaved = t('vocabulary.save.notSaved', 'Not saved');
  if (!props.lastSaveTime) {
    return notSaved;
  }
  // Attempt to use translation with interpolation
  const result = t('vocabulary.save.lastSave', { time: props.lastSaveTime }, 'Last save: {time}');
  // If result still contains {time}, manually replace
  if (result && result.includes('{time}')) {
    return result.replace('{time}', props.lastSaveTime);
  }
  return result || `Last save: ${props.lastSaveTime}`;
});

const handleStorageTypeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:storageType', target.value);
};

const openFilePicker = () => {
  fileInputRef.value?.click();
};

const handleFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    emit('import-file', target.files[0]);
    // Reset input value to allow re-selecting the same file
    target.value = '';
  }
};
</script> 