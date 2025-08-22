<template>
  <BaseAccordion
    :title="t('vocabulary.filters.accordionTitle', 'Search & Filter')"
    :description="t('vocabulary.filters.accordionDescription', 'Search and filter vocabulary words')"
    icon="filter"
    :default-open="true"
    persist-key="vocabulary-filters"
  >
    <div class="p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
    <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
      <!-- Search -->
      <div class="col-span-1 xs:col-span-1 sm:col-span-2 md:col-span-2">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-white mb-1 xs:mb-1.5 sm:mb-2">{{ t('common.search', 'Search') }}</label>
        <!-- Decorative search with gradient frame and icon -->
        <div class="group relative">
          <div class="rounded-md p-[1px] bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 transition duration-300 group-focus-within:brightness-110">
            <div class="relative rounded-md bg-white dark:bg-[#0a0a0a]">
              <span class="pointer-events-none absolute inset-y-0 left-2.5 flex items-center">
                <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                :value="searchQuery"
                @input="handleSearchInput"
                type="text"
                :placeholder="t('vocabulary.searchPlaceholder', 'Search vocabulary...')"
                class="w-full pl-8 pr-3 py-1.5 xs:pl-9 xs:pr-3 xs:py-2 sm:pl-9 sm:pr-3 sm:py-2 text-xs sm:text-sm rounded-md bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Category Filter (Custom Dropdown with scroll after 10 items) -->
      <div class="col-span-1" ref="categoryDropdownRef">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-white mb-1 xs:mb-1.5 sm:mb-2">{{ t('vocabulary.category', 'Category') }}</label>
        <!-- Trigger button with decorative gradient frame -->
        <div class="group relative">
          <div class="rounded-md p-[1px] bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 transition duration-300 group-focus-within:brightness-110">
            <div class="relative rounded-md bg-white dark:bg-[#0a0a0a]">
              <button
                type="button"
                @click="toggleCategoryDropdown"
                :aria-expanded="isCategoryOpen ? 'true' : 'false'"
                ref="categoryTriggerRef"
                class="w-full inline-flex items-center justify-between px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span class="truncate text-left">{{ selectedCategoryLabel }}</span>
                <svg class="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Dropdown menu (teleported to body, fixed positioning) -->
        <teleport to="body">
            <div
              v-if="isCategoryOpen"
              class="fixed z-[9999] rounded-md border border-gray-300 dark:border-blue-900/30 bg-white dark:bg-[#0a0a0a] shadow-xl ring-1 ring-blue-100/50 dark:ring-blue-900/30 overflow-hidden"
              :style="menuStyles"
              ref="categoryMenuRef"
            >
              <!-- Inline search input for filtering categories -->
              <div class="p-2 border-b border-gray-200 dark:border-blue-900/30 bg-white dark:bg-[#0a0a0a]">
                <input
                  ref="categorySearchInputRef"
                  v-model="categorySearch"
                  type="text"
                  :placeholder="t('common.search', 'Search')"
                  class="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 dark:border-blue-900/30 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </teleport>
      </div>

      <!-- Level Filter -->
      <div class="col-span-1">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-white mb-1 xs:mb-1.5 sm:mb-2">{{ t('vocabulary.level', 'Level') }}</label>
        <!-- Level custom dropdown with decorative gradient frame -->
        <div class="group relative" ref="levelDropdownRef">
          <div class="rounded-md p-[1px] bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 transition duration-300 group-focus-within:brightness-110">
            <div class="relative rounded-md bg-white dark:bg-[#0a0a0a]">
              <button
                type="button"
                @click="toggleLevelDropdown"
                :aria-expanded="isLevelOpen ? 'true' : 'false'"
                ref="levelTriggerRef"
                class="w-full inline-flex items-center justify-between px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span class="truncate text-left">
                  {{ selectedLevelLabel }}
                </span>
                <svg class="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Level dropdown menu (teleported to body, fixed positioning, no transition for instant close) -->
              <teleport to="body">
                <div
                  v-if="isLevelOpen"
                  ref="levelMenuRef"
                  class="fixed z-[10000] rounded-md border border-blue-200 dark:border-blue-900/30 bg-white dark:bg-[#0a0a0a] shadow-xl ring-1 ring-blue-100/50 dark:ring-blue-900/30 overflow-hidden"
                  :style="levelMenuStyles"
                >
                  <ul class="max-h-80 overflow-y-auto py-1 divide-y divide-blue-50 dark:divide-blue-900/20">
                    <li>
                      <button
                        type="button"
                        @click="selectLevel('')"
                        class="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                      >
                        {{ t('common.all', 'All') }}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        @click="selectLevel('beginner')"
                        class="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                      >
                        {{ t('vocabulary.levels.beginner', 'Beginner') }}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        @click="selectLevel('intermediate')"
                        class="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                      >
                        {{ t('vocabulary.levels.intermediate', 'Intermediate') }}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        @click="selectLevel('advanced')"
                        class="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                      >
                        {{ t('vocabulary.levels.advanced', 'Advanced') }}
                      </button>
                    </li>
                  </ul>
                </div>
              </teleport>
            </div>
          </div>
        </div>
      </div>

      <!-- Favorites Filter (Styled Toggle Button) -->
      <div class="mt-2 xs:mt-3 sm:mt-4">
        <button
          type="button"
          :aria-pressed="showFavoritesOnly ? 'true' : 'false'"
          :title="t('vocabulary.showFavoritesOnly', 'Show favorites only')"
          @click="handleFavoritesClick"
          class="inline-flex items-center select-none rounded-full border px-3 py-1.5 xs:px-3 xs:py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm transition-all duration-150"
          :class="[
            showFavoritesOnly
              ? 'bg-rose-500 border-rose-600 text-white shadow hover:bg-rose-600'
              : 'bg-white border-blue-500 text-blue-600 hover:bg-blue-50 dark:bg-[#0a0a0a] dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/30'
          ]"
        >
          <svg
            class="w-4 h-4 sm:w-4.5 sm:h-4.5 mr-1.5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C6.4 16.36 4 14.28 4 11.5 4 9.5 5.5 8 7.5 8c1.04 0 2.04.5 2.65 1.32.61-.82 1.61-1.32 2.65-1.32C15.5 8 17 9.5 17 11.5c0 2.78-2.4 4.86-6.55 8.54L12 21.35z" />
          </svg>
          <span class="leading-none">{{ t('vocabulary.showFavoritesOnly', 'Show favorites only') }}</span>
        </button>
      </div>
    </div>
    </div>
  </BaseAccordion>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref, onMounted, onBeforeUnmount, nextTick, defineAsyncComponent } from 'vue'
import { getTopicName } from '../../../utils/topicUtils'

const BaseAccordion = defineAsyncComponent(() => import('../../../components/BaseAccordion.vue'))

const { t, locale } = useI18n()

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
  return getTopicName(category, t, { value: locale.value })
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

// Custom dropdown state for Level
const isLevelOpen = ref(false)
const levelDropdownRef = ref<HTMLElement | null>(null)
const levelTriggerRef = ref<HTMLElement | null>(null)
const levelMenuRef = ref<HTMLElement | null>(null)
const levelMenuStyles = ref<Record<string, string>>({})
const selectedLevelLabel = computed(() => {
  switch (props.selectedLevel) {
    case 'beginner':
      return t('vocabulary.levels.beginner', 'Beginner')
    case 'intermediate':
      return t('vocabulary.levels.intermediate', 'Intermediate')
    case 'advanced':
      return t('vocabulary.levels.advanced', 'Advanced')
    default:
      return t('common.all', 'All')
  }
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

// Level dropdown actions
const updateLevelMenuPosition = () => {
  const trigger = levelTriggerRef.value
  if (!trigger) return
  const rect = trigger.getBoundingClientRect()
  const top = rect.bottom
  const left = rect.left
  const width = rect.width
  const margin = 8
  const maxLeft = window.innerWidth - margin - width
  const safeLeft = Math.max(margin, Math.min(left, maxLeft))
  levelMenuStyles.value = {
    top: `${top}px`,
    left: `${safeLeft}px`,
    width: `${width}px`
  }
}

const toggleLevelDropdown = async () => {
  isLevelOpen.value = !isLevelOpen.value
  if (isLevelOpen.value) {
    await nextTick()
    updateLevelMenuPosition()
  }
}

const selectLevel = (value: string) => {
  emit('update:selectedLevel', value)
  isLevelOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node
  // Category
  const catWrapper = categoryDropdownRef.value
  const catMenu = categoryMenuRef.value
  const clickedInsideCatWrapper = catWrapper ? catWrapper.contains(target) : false
  const clickedInsideCatMenu = catMenu ? catMenu.contains(target) : false
  if (!clickedInsideCatWrapper && !clickedInsideCatMenu) {
    if (isCategoryOpen.value) {
      isCategoryOpen.value = false
      removeListScrollGuards()
    }
  }
  
  // Level
  const lvlWrapper = levelDropdownRef.value
  const lvlMenu = levelMenuRef.value
  const clickedInsideLvlWrapper = lvlWrapper ? lvlWrapper.contains(target) : false
  const clickedInsideLvlMenu = lvlMenu ? lvlMenu.contains(target) : false
  if (!clickedInsideLvlWrapper && !clickedInsideLvlMenu) {
    if (isLevelOpen.value) {
      isLevelOpen.value = false
    }
  }
}

const handleViewportChange = () => {
  // Reposition on resize to keep alignment
  if (isCategoryOpen.value) updateMenuPosition()
  if (isLevelOpen.value) updateLevelMenuPosition()
}

const handleScrollClose = (e?: Event) => {
  // Close on page scroll, but ignore scrolls that originate inside the dropdown menu
  // Category
  if (isCategoryOpen.value) {
    const menu = categoryMenuRef.value
    const wrapper = categoryDropdownRef.value
    const target = (e?.target as Node) || null
    if (menu && target && menu.contains(target)) return
    if (wrapper && target && wrapper.contains(target)) return
    isCategoryOpen.value = false
  }
  // Level
  if (isLevelOpen.value) {
    const lvlMenu = levelMenuRef.value
    const lvlWrapper = levelDropdownRef.value
    const target = (e?.target as Node) || null
    if (lvlMenu && target && lvlMenu.contains(target)) return
    if (lvlWrapper && target && lvlWrapper.contains(target)) return
    isLevelOpen.value = false
  }
}

// Close immediately at the start of scroll interactions (but not when starting inside a dropdown menu itself)
const handleScrollStart = (e: Event) => {
  const t = e.target as Node | null
  const catMenu = categoryMenuRef.value
  const lvlMenu = levelMenuRef.value
  const catWrapper = categoryDropdownRef.value
  const lvlWrapper = levelDropdownRef.value

  // If the event starts inside any menu container, do nothing (allow list scroll)
  if ((catMenu && t && catMenu.contains(t)) || (lvlMenu && t && lvlMenu.contains(t))) return
  if ((catWrapper && t && catWrapper.contains(t)) || (lvlWrapper && t && lvlWrapper.contains(t))) return

  // Close both instantly
  if (isCategoryOpen.value) isCategoryOpen.value = false
  if (isLevelOpen.value) isLevelOpen.value = false
}

// Close on keyboard-based scrolling (PageUp/PageDown/Space/Home/End/Arrows)
const handleKeydownForScroll = (e: KeyboardEvent) => {
  const keys = ['PageUp', 'PageDown', 'Home', 'End', ' ', 'ArrowDown', 'ArrowUp']
  if (!keys.includes(e.key)) return
  // Category
  if (isCategoryOpen.value) {
    const menu = categoryMenuRef.value
    const wrapper = categoryDropdownRef.value
    const target = e.target as Node
    if (menu && target && menu.contains(target)) return
    if (wrapper && target && wrapper.contains(target)) return
    isCategoryOpen.value = false
  }
  // Level
  if (isLevelOpen.value) {
    const menu = levelMenuRef.value
    const wrapper = levelDropdownRef.value
    const target = e.target as Node
    if (menu && target && menu.contains(target)) return
    if (wrapper && target && wrapper.contains(target)) return
    isLevelOpen.value = false
  }
}


onMounted(() => {
  window.addEventListener('click', handleClickOutside, { passive: true })
  window.addEventListener('scroll', handleScrollClose, true)
  // React at the very start of scroll interactions and close immediately
  window.addEventListener('wheel', handleScrollStart, { passive: false, capture: true })
  window.addEventListener('touchstart', handleScrollStart, { passive: true, capture: true })
  window.addEventListener('touchmove', handleScrollStart, { passive: false, capture: true })
  // Also close on pointer/mouse down before any scroll can begin
  window.addEventListener('pointerdown', handleScrollStart, { capture: true })
  window.addEventListener('mousedown', handleScrollStart, { capture: true })
  window.addEventListener('keydown', handleKeydownForScroll)
  window.addEventListener('resize', handleViewportChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScrollClose, true)
  window.removeEventListener('wheel', handleScrollStart, true as any)
  window.removeEventListener('touchstart', handleScrollStart, true as any)
  window.removeEventListener('touchmove', handleScrollStart, true as any)
  window.removeEventListener('pointerdown', handleScrollStart, true as any)
  window.removeEventListener('mousedown', handleScrollStart, true as any)
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

// Toggle via styled button
const handleFavoritesClick = () => {
  emit('update:showFavoritesOnly', !props.showFavoritesOnly)
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
