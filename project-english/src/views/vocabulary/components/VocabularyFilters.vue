<template>
  <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 border border-gray-200 dark:border-gray-700">
    <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
      <!-- Search -->
      <div class="col-span-1 xs:col-span-1 sm:col-span-2 md:col-span-2">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 xs:mb-1.5 sm:mb-2">{{ t('common.search', 'Search') }}</label>
        <input
          :value="searchQuery"
          @input="handleSearchInput"
          type="text"
          :placeholder="t('vocabulary.searchPlaceholder', 'Search vocabulary...')"
          class="w-full px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Category Filter (Custom Dropdown with scroll after 10 items) -->
      <div class="col-span-1" ref="categoryDropdownRef">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 xs:mb-1.5 sm:mb-2">{{ t('vocabulary.category', 'Category') }}</label>
        <!-- Trigger button -->
        <button
          type="button"
          @click="toggleCategoryDropdown"
          :aria-expanded="isCategoryOpen ? 'true' : 'false'"
          ref="categoryTriggerRef"
          class="w-full inline-flex items-center justify-between px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-transparent focus-visible:ring-transparent focus:border-gray-400 dark:focus:border-gray-500"
        >
          <span class="truncate text-left">{{ selectedCategoryLabel }}</span>
          <svg class="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Dropdown menu (teleported to body, fixed positioning) -->
        <teleport to="body">
          <transition name="fade-scale">
            <div
              v-if="isCategoryOpen"
              class="fixed z-[9999] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] shadow-xl ring-1 ring-blue-100/50 dark:ring-blue-900/30 overflow-hidden"
              :style="menuStyles"
              ref="categoryMenuRef"
            >
              <!-- Inline search input for filtering categories -->
              <div class="p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a]">
                <input
                  ref="categorySearchInputRef"
                  v-model="categorySearch"
                  type="text"
                  :placeholder="t('common.search', 'Search')"
                  class="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <ul class="max-h-80 overflow-y-auto divide-y divide-blue-50 dark:divide-blue-900/20" ref="categoryMenuListRef">
                <li>
                  <button
                    type="button"
                    @click="selectCategory('')"
                    class="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                  >
                    {{ t('common.all', 'All') }}
                  </button>
                </li>
                <li v-for="category in filteredCategories" :key="category">
                  <button
                    type="button"
                    @click="selectCategory(category)"
                    class="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                  >
                    {{ getTopicDisplayName(category) }}
                  </button>
                </li>
              </ul>
            </div>
          </transition>
        </teleport>
      </div>

      <!-- Level Filter -->
      <div class="col-span-1">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 xs:mb-1.5 sm:mb-2">{{ t('vocabulary.level', 'Level') }}</label>
        <select 
          :value="selectedLevel" 
          @change="handleLevelChange"
          class="w-full px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{{ t('common.all', 'All') }}</option>
          <option value="beginner">{{ t('vocabulary.levels.beginner', 'Beginner') }}</option>
          <option value="intermediate">{{ t('vocabulary.levels.intermediate', 'Intermediate') }}</option>
          <option value="advanced">{{ t('vocabulary.levels.advanced', 'Advanced') }}</option>
        </select>
      </div>
    </div>
    
    <!-- Favorites Filter -->
    <div class="mt-2 xs:mt-3 sm:mt-4">
      <label class="inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          :checked="showFavoritesOnly" 
          @change="handleFavoritesChange"
          class="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-[#0a0a0a] dark:border-gray-600"
        >
        <span class="ml-1.5 xs:ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{{ t('vocabulary.showFavoritesOnly', 'Show favorites only') }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { getTopicName } from '../../../utils/topicUtils'

const { t } = useI18n()

interface Props {
  searchQuery: string
  selectedCategory: string
  selectedLevel: string
  categories: string[]
  showFavoritesOnly: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCategory': [value: string]
  'update:selectedLevel': [value: string]
  'update:showFavoritesOnly': [value: boolean]
}>()

// Function to get topic display name
const getTopicDisplayName = (category: string): string => {
  return getTopicName(category)
}

// Custom dropdown state for Category
const isCategoryOpen = ref(false)
const categoryDropdownRef = ref<HTMLElement | null>(null)
const categoryTriggerRef = ref<HTMLElement | null>(null)
const categoryMenuRef = ref<HTMLElement | null>(null)
const categoryMenuListRef = ref<HTMLElement | null>(null)
const categorySearchInputRef = ref<HTMLInputElement | null>(null)
const categorySearch = ref('')
const menuStyles = ref<Record<string, string>>({})
const selectedCategoryLabel = computed(() => {
  if (!props.selectedCategory) return t('common.all', 'All')
  return getTopicDisplayName(props.selectedCategory)
})

// Filtered categories based on inline search
const filteredCategories = computed(() => {
  const q = categorySearch.value.trim().toLowerCase()
  if (!q) return props.categories
  return props.categories.filter(c => {
    const name = getTopicDisplayName(c).toLowerCase()
    return name.includes(q) || c.toLowerCase().includes(q)
  })
})

const updateMenuPosition = () => {
  const trigger = categoryTriggerRef.value
  if (!trigger) return
  const rect = trigger.getBoundingClientRect()
  // Fixed-position menu uses viewport coordinates; do NOT add scroll offsets
  const top = rect.bottom
  const left = rect.left
  const width = rect.width
  // Constrain horizontally within viewport with small margin
  const margin = 8
  const maxLeft = window.innerWidth - margin - width
  const safeLeft = Math.max(margin, Math.min(left, maxLeft))
  menuStyles.value = {
    top: `${top}px`,
    left: `${safeLeft}px`,
    width: `${width}px`
  }
}

const toggleCategoryDropdown = async () => {
  isCategoryOpen.value = !isCategoryOpen.value
  if (isCategoryOpen.value) {
    // reset search and open
    categorySearch.value = ''
    await nextTick()
    updateMenuPosition()
    addListScrollGuards()
    // focus the search input after render
    categorySearchInputRef.value?.focus()
  } else {
    removeListScrollGuards()
  }
}

const selectCategory = (value: string) => {
  emit('update:selectedCategory', value)
  isCategoryOpen.value = false
  removeListScrollGuards()
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node
  const wrapper = categoryDropdownRef.value
  const menu = categoryMenuRef.value
  if (!wrapper && !menu) return
  const clickedInsideWrapper = wrapper ? wrapper.contains(target) : false
  const clickedInsideMenu = menu ? menu.contains(target) : false
  if (!clickedInsideWrapper && !clickedInsideMenu) {
    isCategoryOpen.value = false
    removeListScrollGuards()
  }
}

const handleViewportChange = () => {
  // Reposition on resize to keep alignment
  if (isCategoryOpen.value) updateMenuPosition()
}

const handleScrollClose = (e?: Event) => {
  // Close on page scroll, but ignore scrolls that originate inside the dropdown menu
  if (!isCategoryOpen.value) return
  const menu = categoryMenuRef.value
  const wrapper = categoryDropdownRef.value
  const target = (e?.target as Node) || null
  if (menu && target && menu.contains(target)) return
  if (wrapper && target && wrapper.contains(target)) return
  isCategoryOpen.value = false
}

// Close immediately at the start of scroll interactions (but not when starting inside the menu)
const handleScrollStart = (e: Event) => {
  if (!isCategoryOpen.value) return
  const menu = categoryMenuRef.value
  const wrapper = categoryDropdownRef.value

  // If pointer position is within the menu rect, don't close
  const isPointerInsideMenu = (() => {
    if (!menu) return false
    const rect = menu.getBoundingClientRect()
    // WheelEvent
    if ((e as any).clientX !== undefined && (e as any).clientY !== undefined) {
      const x = (e as any).clientX as number
      const y = (e as any).clientY as number
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    }
    // TouchEvent
    const te = e as TouchEvent
    const touch = te.touches && te.touches[0]
    if (touch) {
      const x = touch.clientX
      const y = touch.clientY
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    }
    return false
  })()
  if (isPointerInsideMenu) return

  const target = e.target as Node
  if (menu && target && menu.contains(target)) return
  if (wrapper && target && wrapper.contains(target)) return
  isCategoryOpen.value = false
}

// Close on keyboard-based scrolling (PageUp/PageDown/Space/Home/End/Arrows)
const handleKeydownForScroll = (e: KeyboardEvent) => {
  const keys = ['PageUp', 'PageDown', 'Home', 'End', ' ', 'ArrowDown', 'ArrowUp']
  if (!keys.includes(e.key)) return
  if (!isCategoryOpen.value) return
  const menu = categoryMenuRef.value
  const wrapper = categoryDropdownRef.value
  const target = e.target as Node
  if (menu && target && menu.contains(target)) return
  if (wrapper && target && wrapper.contains(target)) return
  isCategoryOpen.value = false
}


onMounted(() => {
  window.addEventListener('click', handleClickOutside, { passive: true })
  window.addEventListener('scroll', handleScrollClose, true)
  // Use capture so we react at the start of scroll interactions
  window.addEventListener('wheel', handleScrollStart, { passive: true, capture: true })
  window.addEventListener('touchstart', handleScrollStart, { passive: true, capture: true })
  window.addEventListener('touchmove', handleScrollStart, { passive: true, capture: true })
  window.addEventListener('keydown', handleKeydownForScroll)
  window.addEventListener('resize', handleViewportChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScrollClose, true)
  window.removeEventListener('wheel', handleScrollStart, true as any)
  window.removeEventListener('touchstart', handleScrollStart, true as any)
  window.removeEventListener('touchmove', handleScrollStart, true as any)
  window.removeEventListener('keydown', handleKeydownForScroll)
  window.removeEventListener('resize', handleViewportChange)
  removeListScrollGuards()
})

// Event handlers

const handleLevelChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:selectedLevel', target.value)
}

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:searchQuery', target.value)
}

const handleFavoritesChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:showFavoritesOnly', target.checked)
}

// --- Scroll guards for dropdown list to prevent page scroll ---
const touchStartY = ref(0)

const onMenuWheel = (e: WheelEvent) => {
  const el = categoryMenuListRef.value
  if (!el) return
  const delta = e.deltaY
  const atTop = el.scrollTop <= 0
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
  // Prevent page scroll when trying to overscroll the list
  if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
    e.preventDefault()
  }
  e.stopPropagation()
}

const onMenuTouchStart = (e: TouchEvent) => {
  touchStartY.value = e.touches[0]?.clientY ?? 0
}

const onMenuTouchMove = (e: TouchEvent) => {
  const el = categoryMenuListRef.value
  if (!el) return
  const y = e.touches[0]?.clientY ?? 0
  const delta = touchStartY.value - y
  const atTop = el.scrollTop <= 0
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
  if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
    e.preventDefault()
  }
  e.stopPropagation()
}

const addListScrollGuards = () => {
  const el = categoryMenuListRef.value
  if (!el) return
  el.addEventListener('wheel', onMenuWheel, { passive: false })
  el.addEventListener('touchstart', onMenuTouchStart, { passive: true })
  el.addEventListener('touchmove', onMenuTouchMove, { passive: false })
}

const removeListScrollGuards = () => {
  const el = categoryMenuListRef.value
  if (!el) return
  el.removeEventListener('wheel', onMenuWheel as any)
  el.removeEventListener('touchstart', onMenuTouchStart as any)
  el.removeEventListener('touchmove', onMenuTouchMove as any)
}


</script>
