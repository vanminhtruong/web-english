import { z as ref, D as computed, P as watch, A as onMounted, B as onUnmounted, d as defineComponent, M as useI18n, a3 as toRef, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, U as Transition, f as createBaseVNode, t as toDisplayString, u as unref, E as withDirectives, W as isRef, X as vModelText, g as createTextVNode, F as Fragment, j as renderList, a as normalizeStyle, n as normalizeClass, i as withModifiers } from "./vendor-CKTvmtu5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
function useTopicCRUD(emit) {
  const customTopics = ref([]);
  const editingTopic = ref(null);
  const topicToDelete = ref(null);
  const newTopic = ref({
    key: "",
    vi: "",
    en: "",
    ko: ""
  });
  const canSaveTopic = computed(() => {
    return newTopic.value.vi?.trim() && newTopic.value.en?.trim() && newTopic.value.ko?.trim();
  });
  const showDeleteModal = computed(() => {
    console.log("showDeleteModal computed - topicToDelete:", topicToDelete.value);
    return !!topicToDelete.value;
  });
  const generateTopicKey = (vi, en) => {
    const sourceName = vi.trim() || en.trim();
    if (!sourceName) return "";
    let key = sourceName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
    let counter = 1;
    let originalKey = key;
    while (isKeyTaken(key)) {
      key = `${originalKey}_${counter}`;
      counter++;
    }
    return key;
  };
  const isKeyTaken = (key) => {
    const builtInKeys = [
      "technology",
      "business",
      "travel",
      "food",
      "health",
      "education",
      "sports",
      "entertainment",
      "science",
      "art",
      "music",
      "literature",
      "politics",
      "environment",
      "fashion",
      "finance"
    ];
    if (builtInKeys.includes(key)) return true;
    const existingKeys = customTopics.value.filter((topic) => editingTopic.value ? topic.key !== editingTopic.value.key : true).map((topic) => topic.key);
    return existingKeys.includes(key);
  };
  const loadCustomTopics = () => {
    try {
      const saved = localStorage.getItem("customTopics");
      console.log("Loading custom topics from localStorage:", saved);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log("Parsed custom topics:", parsed);
        if (Array.isArray(parsed)) {
          customTopics.value = parsed;
          console.log("Custom topics loaded successfully:", customTopics.value);
        } else {
          console.log("Invalid data format, resetting to empty array");
          customTopics.value = [];
          localStorage.removeItem("customTopics");
        }
      } else {
        console.log("No custom topics found in localStorage");
        customTopics.value = [];
      }
      console.log("Final custom topics loaded:", customTopics.value);
    } catch (error) {
      console.error("Error loading custom topics:", error);
      customTopics.value = [];
      localStorage.removeItem("customTopics");
    }
  };
  const saveCustomTopics = () => {
    try {
      console.log("Saving custom topics to localStorage:", customTopics.value);
      localStorage.setItem("customTopics", JSON.stringify(customTopics.value));
      console.log("Custom topics saved successfully");
    } catch (error) {
      console.error("Error saving custom topics:", error);
    }
  };
  const notifyTopicsUpdated = () => {
    window.dispatchEvent(new CustomEvent("topics-updated"));
    console.log("Topics updated, dispatching topics-updated event");
  };
  const saveTopic = () => {
    if (!canSaveTopic.value) return;
    const generatedKey = editingTopic.value ? editingTopic.value.key : generateTopicKey(newTopic.value.vi, newTopic.value.en);
    const topic = {
      key: generatedKey,
      vi: newTopic.value.vi.trim(),
      en: newTopic.value.en.trim(),
      ko: newTopic.value.ko.trim()
    };
    if (editingTopic.value) {
      const index = customTopics.value.findIndex((t) => t.key === editingTopic.value.key);
      if (index !== -1) {
        const oldKey = customTopics.value[index].key;
        customTopics.value[index] = topic;
        saveCustomTopics();
        emit("topic-updated", oldKey, topic);
        notifyTopicsUpdated();
      }
      editingTopic.value = null;
    } else {
      customTopics.value.unshift(topic);
      saveCustomTopics();
      emit("topic-added", topic);
      notifyTopicsUpdated();
    }
    newTopic.value = { key: "", vi: "", en: "", ko: "" };
  };
  const editTopic = (topic) => {
    editingTopic.value = { ...topic };
    newTopic.value = { ...topic };
  };
  const cancelEdit = () => {
    editingTopic.value = null;
    newTopic.value = { key: "", vi: "", en: "", ko: "" };
  };
  const confirmDeleteTopic = (topic) => {
    console.log("Confirming delete for topic:", topic);
    topicToDelete.value = topic;
    console.log("topicToDelete set to:", topicToDelete.value);
  };
  const deleteTopic = () => {
    if (!topicToDelete.value) {
      console.log("No topic to delete");
      return;
    }
    console.log("Attempting to delete topic:", topicToDelete.value);
    console.log("Current custom topics:", customTopics.value);
    const index = customTopics.value.findIndex((t) => t.key === topicToDelete.value.key);
    console.log("Found index:", index);
    if (index !== -1) {
      const key = customTopics.value[index].key;
      console.log("Deleting topic with key:", key);
      const updatedTopics = [...customTopics.value];
      updatedTopics.splice(index, 1);
      customTopics.value = updatedTopics;
      console.log("Topics after deletion:", customTopics.value);
      saveCustomTopics();
      emit("topic-deleted", key);
      notifyTopicsUpdated();
      console.log("Topic deleted successfully");
    } else {
      console.log("Topic not found in custom topics");
    }
    topicToDelete.value = null;
  };
  const reloadCustomTopics = () => {
    console.log("Force reloading custom topics");
    loadCustomTopics();
    customTopics.value = [...customTopics.value];
  };
  const clearAllCustomTopics = () => {
    console.log("Clearing all custom topics");
    customTopics.value = [];
    localStorage.removeItem("customTopics");
    console.log("All custom topics cleared");
  };
  const testDeleteModal = () => {
    console.log("Testing delete modal");
    topicToDelete.value = {
      key: "test",
      vi: "Test Topic",
      en: "Test Topic",
      ko: "테스트 토픽"
    };
    console.log("Test topic set:", topicToDelete.value);
  };
  const resetForm = () => {
    editingTopic.value = null;
    newTopic.value = { key: "", vi: "", en: "", ko: "" };
    topicToDelete.value = null;
  };
  return {
    // State
    customTopics,
    editingTopic,
    topicToDelete,
    newTopic,
    // Computed
    canSaveTopic,
    showDeleteModal,
    // Methods
    loadCustomTopics,
    saveCustomTopics,
    saveTopic,
    editTopic,
    cancelEdit,
    confirmDeleteTopic,
    deleteTopic,
    reloadCustomTopics,
    clearAllCustomTopics,
    testDeleteModal,
    resetForm,
    generateTopicKey,
    isKeyTaken,
    notifyTopicsUpdated
  };
}
function useTopicSearch(customTopics, builtInTopics) {
  const searchQuery = ref("");
  const filteredCustomTopics = computed(() => {
    if (!searchQuery.value.trim()) {
      return customTopics.value;
    }
    const query = searchQuery.value.toLowerCase().trim();
    return customTopics.value.filter(
      (topic) => (topic.key || "").toLowerCase().includes(query) || (topic.vi || "").toLowerCase().includes(query) || (topic.en || "").toLowerCase().includes(query) || (topic.ko || "").toLowerCase().includes(query)
    );
  });
  const filteredBuiltInTopics = computed(() => {
    if (!searchQuery.value.trim()) {
      return builtInTopics.value;
    }
    const query = searchQuery.value.toLowerCase().trim();
    return builtInTopics.value.filter(
      (topic) => (topic.key || "").toLowerCase().includes(query) || (topic.vi || "").toLowerCase().includes(query) || (topic.en || "").toLowerCase().includes(query) || (topic.ko || "").toLowerCase().includes(query)
    );
  });
  const resetSearch = () => {
    searchQuery.value = "";
  };
  return {
    // State
    searchQuery,
    // Computed
    filteredCustomTopics,
    filteredBuiltInTopics,
    // Methods
    resetSearch
  };
}
function useTopicPagination(filteredCustomTopics, filteredBuiltInTopics, searchQuery) {
  const ITEMS_PER_PAGE = 3;
  const currentCustomPage = ref(1);
  const currentBuiltInPage = ref(1);
  const totalCustomPages = computed(() => {
    return Math.ceil(filteredCustomTopics.value.length / ITEMS_PER_PAGE);
  });
  const paginatedCustomTopics = computed(() => {
    const start = (currentCustomPage.value - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredCustomTopics.value.slice(start, end);
  });
  const totalBuiltInPages = computed(() => {
    return Math.ceil(filteredBuiltInTopics.value.length / ITEMS_PER_PAGE);
  });
  const paginatedBuiltInTopics = computed(() => {
    const start = (currentBuiltInPage.value - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredBuiltInTopics.value.slice(start, end);
  });
  const visibleCustomPages = computed(() => {
    const total = totalCustomPages.value;
    const current = currentCustomPage.value;
    const maxVisible = 3;
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });
  const visibleBuiltInPages = computed(() => {
    const total = totalBuiltInPages.value;
    const current = currentBuiltInPage.value;
    const maxVisible = 3;
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });
  const goToCustomPage = (page) => {
    if (page >= 1 && page <= totalCustomPages.value) {
      currentCustomPage.value = page;
    }
  };
  const goToBuiltInPage = (page) => {
    if (page >= 1 && page <= totalBuiltInPages.value) {
      currentBuiltInPage.value = page;
    }
  };
  const nextCustomPage = () => {
    if (currentCustomPage.value < totalCustomPages.value) {
      currentCustomPage.value++;
    }
  };
  const prevCustomPage = () => {
    if (currentCustomPage.value > 1) {
      currentCustomPage.value--;
    }
  };
  const nextBuiltInPage = () => {
    if (currentBuiltInPage.value < totalBuiltInPages.value) {
      currentBuiltInPage.value++;
    }
  };
  const prevBuiltInPage = () => {
    if (currentBuiltInPage.value > 1) {
      currentBuiltInPage.value--;
    }
  };
  const resetPagination = () => {
    currentCustomPage.value = 1;
    currentBuiltInPage.value = 1;
  };
  watch(searchQuery, () => {
    resetPagination();
  });
  return {
    // Constants
    ITEMS_PER_PAGE,
    // State
    currentCustomPage,
    currentBuiltInPage,
    // Computed
    totalCustomPages,
    totalBuiltInPages,
    paginatedCustomTopics,
    paginatedBuiltInTopics,
    visibleCustomPages,
    visibleBuiltInPages,
    // Methods
    goToCustomPage,
    goToBuiltInPage,
    nextCustomPage,
    prevCustomPage,
    nextBuiltInPage,
    prevBuiltInPage,
    resetPagination
  };
}
function useTopicModal(modelValue, emit, resetForm, resetSearch, resetPagination, loadCustomTopics) {
  const closeDialog = () => {
    emit("update:modelValue", false);
  };
  const lockBodyScroll = () => {
    document.body.style.overflow = "hidden";
  };
  const unlockBodyScroll = () => {
    document.body.style.overflow = "";
  };
  watch(() => modelValue.value, (newValue) => {
    if (newValue) {
      lockBodyScroll();
      loadCustomTopics();
    } else {
      unlockBodyScroll();
      resetForm();
      resetSearch();
      resetPagination();
    }
  }, { immediate: true });
  onMounted(() => {
    if (modelValue.value) {
      loadCustomTopics();
      lockBodyScroll();
    }
  });
  onUnmounted(() => {
    unlockBodyScroll();
  });
  return {
    // Methods
    closeDialog,
    lockBodyScroll,
    unlockBodyScroll
  };
}
function useBuiltInTopics() {
  const builtInTopics = computed(() => {
    return [
      { key: "technology", vi: "Công nghệ", en: "Technology", ko: "기술" },
      { key: "business", vi: "Kinh doanh", en: "Business", ko: "비즈니스" },
      { key: "travel", vi: "Du lịch", en: "Travel", ko: "여행" },
      { key: "food", vi: "Ẩm thực", en: "Food", ko: "음식" },
      { key: "health", vi: "Sức khỏe", en: "Health", ko: "건강" },
      { key: "education", vi: "Giáo dục", en: "Education", ko: "교육" },
      { key: "sports", vi: "Thể thao", en: "Sports", ko: "스포츠" },
      { key: "entertainment", vi: "Giải trí", en: "Entertainment", ko: "엔터테인먼트" },
      { key: "science", vi: "Khoa học", en: "Science", ko: "과학" },
      { key: "art", vi: "Nghệ thuật", en: "Art", ko: "예술" },
      { key: "music", vi: "Âm nhạc", en: "Music", ko: "음악" },
      { key: "literature", vi: "Văn học", en: "Literature", ko: "문학" },
      { key: "politics", vi: "Chính trị", en: "Politics", ko: "정치" },
      { key: "environment", vi: "Môi trường", en: "Environment", ko: "환경" },
      { key: "fashion", vi: "Thời trang", en: "Fashion", ko: "패션" },
      { key: "finance", vi: "Tài chính", en: "Finance", ko: "금융" }
    ];
  });
  const builtInTopicKeys = computed(() => {
    return builtInTopics.value.map((topic) => topic.key);
  });
  const isBuiltInTopic = (key) => {
    return builtInTopicKeys.value.includes(key);
  };
  const getBuiltInTopic = (key) => {
    return builtInTopics.value.find((topic) => topic.key === key);
  };
  return {
    // Computed
    builtInTopics,
    builtInTopicKeys,
    // Methods
    isBuiltInTopic,
    getBuiltInTopic
  };
}
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" };
const _hoisted_3 = { class: "flex-shrink-0 flex flex-row items-center justify-between p-4 sm:p-6 md:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700 space-x-4 sm:space-x-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex-1 min-w-0" };
const _hoisted_5 = { class: "text-base sm:text-lg md:text-2xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-0 flex items-center space-x-2" };
const _hoisted_6 = { class: "sticky top-0 z-10 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-dark-bg-mute" };
const _hoisted_7 = { class: "px-4 py-3 border-b border-gray-100 dark:border-dark-bg-mute" };
const _hoisted_8 = { class: "relative" };
const _hoisted_9 = ["placeholder"];
const _hoisted_10 = { class: "px-4 py-3 bg-gray-50 dark:bg-[#0a0a0a]" };
const _hoisted_11 = { class: "flex items-center gap-2 mb-2" };
const _hoisted_12 = { class: "text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_13 = { class: "flex flex-wrap gap-2" };
const _hoisted_14 = { class: "flex-1 min-w-[200px]" };
const _hoisted_15 = ["placeholder"];
const _hoisted_16 = { class: "flex-1 min-w-[200px]" };
const _hoisted_17 = ["placeholder"];
const _hoisted_18 = { class: "flex-1 min-w-[200px]" };
const _hoisted_19 = ["placeholder"];
const _hoisted_20 = { class: "flex gap-2" };
const _hoisted_21 = ["disabled"];
const _hoisted_22 = { class: "flex-1 p-4 sm:p-6 md:p-6 lg:p-8 overflow-y-auto min-h-0" };
const _hoisted_23 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_24 = { class: "text-base sm:text-lg md:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-3 lg:mb-4 flex items-center" };
const _hoisted_25 = {
  key: 0,
  class: "text-center py-6 sm:py-8 md:py-6 lg:py-8 text-sm md:text-sm lg:text-base text-gray-500 dark:text-gray-400"
};
const _hoisted_26 = {
  key: 1,
  class: "space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4"
};
const _hoisted_27 = { class: "flex-1" };
const _hoisted_28 = { class: "flex items-center gap-4 sm:gap-4 mb-2" };
const _hoisted_29 = { class: "px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded" };
const _hoisted_30 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_31 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm" };
const _hoisted_32 = { class: "flex gap-3 sm:gap-4 ml-4" };
const _hoisted_33 = ["onClick", "title"];
const _hoisted_34 = ["onClick", "disabled", "title"];
const _hoisted_35 = {
  key: 0,
  class: "flex justify-center mt-6"
};
const _hoisted_36 = { class: "flex items-center space-x-1" };
const _hoisted_37 = ["disabled"];
const _hoisted_38 = ["onClick"];
const _hoisted_39 = ["disabled"];
const _hoisted_40 = {
  class: "mt-6 animate-fade-in-up",
  style: { "animation-delay": "0.8s" }
};
const _hoisted_41 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center" };
const _hoisted_42 = { class: "text-sm text-gray-600 dark:text-gray-400 mb-4" };
const _hoisted_43 = { class: "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4" };
const _hoisted_44 = { class: "flex-1" };
const _hoisted_45 = { class: "flex items-center gap-3 mb-1" };
const _hoisted_46 = { class: "px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded" };
const _hoisted_47 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_48 = { class: "grid grid-cols-1 gap-1 text-sm" };
const _hoisted_49 = { class: "ml-4" };
const _hoisted_50 = { class: "px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded" };
const _hoisted_51 = {
  key: 0,
  class: "flex justify-center mt-6"
};
const _hoisted_52 = { class: "flex items-center space-x-1" };
const _hoisted_53 = ["disabled"];
const _hoisted_54 = ["onClick"];
const _hoisted_55 = ["disabled"];
const _hoisted_56 = { class: "flex-shrink-0 flex justify-end p-4 sm:p-6 border-t border-gray-200 dark:border-dark-bg-mute bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_57 = { class: "p-6" };
const _hoisted_58 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center" };
const _hoisted_59 = { class: "text-gray-600 dark:text-gray-300 mb-6" };
const _hoisted_60 = { class: "flex gap-3 justify-end" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TopicManager",
  props: {
    modelValue: { type: Boolean },
    vocabularyUsage: { default: () => ({}) }
  },
  emits: ["update:modelValue", "topic-added", "topic-updated", "topic-deleted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const modelValueRef = toRef(props, "modelValue");
    const topicCRUD = useTopicCRUD(emit);
    const { builtInTopics } = useBuiltInTopics();
    const topicSearch = useTopicSearch(topicCRUD.customTopics, builtInTopics);
    const topicPagination = useTopicPagination(
      topicSearch.filteredCustomTopics,
      topicSearch.filteredBuiltInTopics,
      topicSearch.searchQuery
    );
    const topicModal = useTopicModal(
      modelValueRef,
      emit,
      topicCRUD.resetForm,
      topicSearch.resetSearch,
      topicPagination.resetPagination,
      topicCRUD.loadCustomTopics
    );
    const {
      customTopics,
      editingTopic,
      topicToDelete,
      newTopic,
      canSaveTopic,
      showDeleteModal,
      saveTopic,
      editTopic,
      cancelEdit,
      confirmDeleteTopic,
      deleteTopic
    } = topicCRUD;
    const { searchQuery, filteredCustomTopics, filteredBuiltInTopics } = topicSearch;
    const {
      ITEMS_PER_PAGE,
      currentCustomPage,
      currentBuiltInPage,
      totalCustomPages,
      totalBuiltInPages,
      paginatedCustomTopics,
      paginatedBuiltInTopics,
      visibleCustomPages,
      visibleBuiltInPages
    } = topicPagination;
    const { closeDialog } = topicModal;
    const getTopicUsageCount = (key) => {
      return props.vocabularyUsage[key] || 0;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(Transition, {
          "enter-active-class": "transition-all duration-500 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-all duration-300 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            _ctx.modelValue ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-500 ease-out",
                "enter-from-class": "opacity-0 scale-90 translate-y-8 rotate-1",
                "enter-to-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-active-class": "transition-all duration-300 ease-in",
                "leave-from-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-to-class": "opacity-0 scale-90 translate-y-8 rotate-1"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2, [
                    createBaseVNode("div", _hoisted_3, [
                      createBaseVNode("div", _hoisted_4, [
                        createBaseVNode("h2", _hoisted_5, [
                          _cache[16] || (_cache[16] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                          createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.topicManager.title", "Topic Manager")), 1)
                        ])
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[0] || (_cache[0] = //@ts-ignore
                        (...args) => unref(closeDialog) && unref(closeDialog)(...args)),
                        class: "flex-shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 dark:bg-dark-bg-soft dark:text-white/70 dark:hover:text-white dark:hover:bg-dark-bg-mute transition-all duration-300 hover:scale-110 hover:rotate-90 hover:dark:bg-gray-800"
                      }, _cache[17] || (_cache[17] = [
                        createBaseVNode("svg", {
                          class: "w-5 h-5 sm:w-6 sm:h-6",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createBaseVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ], -1)
                      ]))
                    ]),
                    createBaseVNode("div", _hoisted_6, [
                      createBaseVNode("div", _hoisted_7, [
                        createBaseVNode("div", _hoisted_8, [
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
                            type: "text",
                            placeholder: unref(t)("vocabulary.topicManager.searchPlaceholder", "Search topics by name..."),
                            class: "w-full px-4 py-2.5 pl-10 border-2 animated-search-border rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-sm"
                          }, null, 8, _hoisted_9), [
                            [vModelText, unref(searchQuery)]
                          ]),
                          _cache[18] || (_cache[18] = createBaseVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                            createBaseVNode("svg", {
                              class: "w-4 h-4 text-gray-400 dark:text-gray-500",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              })
                            ])
                          ], -1))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_10, [
                        createBaseVNode("div", _hoisted_11, [
                          _cache[19] || (_cache[19] = createBaseVNode("span", { class: "w-1 h-3 bg-blue-500 rounded" }, null, -1)),
                          createBaseVNode("h3", _hoisted_12, toDisplayString(unref(editingTopic) ? unref(t)("vocabulary.topicManager.editTopic", "Edit Topic") : unref(t)("vocabulary.topicManager.addNewTopic", "Add New Topic")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_13, [
                          createBaseVNode("div", _hoisted_14, [
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(newTopic).vi = $event),
                              type: "text",
                              placeholder: unref(t)("vocabulary.topicManager.vietnameseNamePlaceholder", "Tên tiếng Việt"),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            }, null, 8, _hoisted_15), [
                              [vModelText, unref(newTopic).vi]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_16, [
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(newTopic).en = $event),
                              type: "text",
                              placeholder: unref(t)("vocabulary.topicManager.englishNamePlaceholder", "English name"),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            }, null, 8, _hoisted_17), [
                              [vModelText, unref(newTopic).en]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_18, [
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(newTopic).ko = $event),
                              type: "text",
                              placeholder: unref(t)("vocabulary.topicManager.koreanNamePlaceholder", "한국어 이름"),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            }, null, 8, _hoisted_19), [
                              [vModelText, unref(newTopic).ko]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_20, [
                            createBaseVNode("button", {
                              onClick: _cache[5] || (_cache[5] = //@ts-ignore
                              (...args) => unref(saveTopic) && unref(saveTopic)(...args)),
                              disabled: !unref(canSaveTopic),
                              class: "px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white text-sm rounded-md transition-all duration-300 disabled:cursor-not-allowed font-medium"
                            }, toDisplayString(unref(editingTopic) ? unref(t)("common.update", "Update") : unref(t)("common.add", "Add")), 9, _hoisted_21),
                            unref(editingTopic) ? (openBlock(), createElementBlock("button", {
                              key: 0,
                              onClick: _cache[6] || (_cache[6] = //@ts-ignore
                              (...args) => unref(cancelEdit) && unref(cancelEdit)(...args)),
                              class: "px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-md transition-all duration-300 font-medium"
                            }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1)) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_22, [
                      createBaseVNode("div", _hoisted_23, [
                        createBaseVNode("h3", _hoisted_24, [
                          _cache[20] || (_cache[20] = createBaseVNode("span", { class: "w-1 h-4 bg-indigo-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.topicManager.existingTopics", "Custom Topics")), 1)
                        ]),
                        unref(customTopics).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_25, toDisplayString(unref(t)("vocabulary.topicManager.noCustomTopics", "No custom topics created yet")), 1)) : (openBlock(), createElementBlock("div", _hoisted_26, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(paginatedCustomTopics), (topic, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: topic.key,
                              class: "flex items-center justify-between p-3 sm:p-4 md:p-3 lg:p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up",
                              style: normalizeStyle({ animationDelay: `${0.7 + index * 0.1}s` })
                            }, [
                              createBaseVNode("div", _hoisted_27, [
                                createBaseVNode("div", _hoisted_28, [
                                  createBaseVNode("span", _hoisted_29, toDisplayString(topic.key), 1),
                                  createBaseVNode("span", _hoisted_30, " (" + toDisplayString(getTopicUsageCount(topic.key)) + " " + toDisplayString(unref(t)("vocabulary.words", "words")) + ") ", 1)
                                ]),
                                createBaseVNode("div", _hoisted_31, [
                                  createBaseVNode("div", null, [
                                    _cache[21] || (_cache[21] = createBaseVNode("span", { class: "font-medium" }, "VI:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.vi), 1)
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[22] || (_cache[22] = createBaseVNode("span", { class: "font-medium" }, "EN:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.en), 1)
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[23] || (_cache[23] = createBaseVNode("span", { class: "font-medium" }, "KO:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.ko), 1)
                                  ])
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_32, [
                                createBaseVNode("button", {
                                  onClick: ($event) => unref(editTopic)(topic),
                                  class: "p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-300 hover:scale-110",
                                  title: unref(t)("common.edit", "Edit")
                                }, _cache[24] || (_cache[24] = [
                                  createBaseVNode("svg", {
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createBaseVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    })
                                  ], -1)
                                ]), 8, _hoisted_33),
                                createBaseVNode("button", {
                                  onClick: ($event) => unref(confirmDeleteTopic)(topic),
                                  disabled: getTopicUsageCount(topic.key) > 0,
                                  class: "p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-300 hover:scale-110 disabled:text-gray-400 disabled:cursor-not-allowed",
                                  title: getTopicUsageCount(topic.key) > 0 ? unref(t)("vocabulary.topicManager.cannotDeleteInUse", "Cannot delete topic in use") : unref(t)("common.delete", "Delete")
                                }, _cache[25] || (_cache[25] = [
                                  createBaseVNode("svg", {
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createBaseVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    })
                                  ], -1)
                                ]), 8, _hoisted_34)
                              ])
                            ], 4);
                          }), 128)),
                          unref(filteredCustomTopics).length > unref(ITEMS_PER_PAGE) ? (openBlock(), createElementBlock("div", _hoisted_35, [
                            createBaseVNode("div", _hoisted_36, [
                              createBaseVNode("button", {
                                onClick: _cache[7] || (_cache[7] = ($event) => currentCustomPage.value--),
                                disabled: unref(currentCustomPage) === 1,
                                class: "px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                              }, " ‹ ", 8, _hoisted_37),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(visibleCustomPages), (page) => {
                                return openBlock(), createElementBlock("button", {
                                  key: page,
                                  onClick: ($event) => currentCustomPage.value = page,
                                  class: normalizeClass([
                                    "px-3 py-2 rounded-lg text-sm transition-all duration-300",
                                    unref(currentCustomPage) === page ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-bg-soft"
                                  ])
                                }, toDisplayString(page), 11, _hoisted_38);
                              }), 128)),
                              createBaseVNode("button", {
                                onClick: _cache[8] || (_cache[8] = ($event) => currentCustomPage.value++),
                                disabled: unref(currentCustomPage) === unref(totalCustomPages),
                                class: "px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                              }, " › ", 8, _hoisted_39)
                            ])
                          ])) : createCommentVNode("", true)
                        ]))
                      ]),
                      createBaseVNode("div", _hoisted_40, [
                        createBaseVNode("h3", _hoisted_41, [
                          _cache[26] || (_cache[26] = createBaseVNode("span", { class: "w-1 h-4 bg-teal-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.topicManager.builtInTopics", "Built-in Topics")), 1)
                        ]),
                        createBaseVNode("p", _hoisted_42, toDisplayString(unref(t)("vocabulary.topicManager.builtInTopicsDescription", "These are system-provided topics that cannot be modified")), 1),
                        createBaseVNode("div", _hoisted_43, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(paginatedBuiltInTopics), (topic, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: topic.key,
                              class: "flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up",
                              style: normalizeStyle({ animationDelay: `${0.9 + index * 0.05}s` })
                            }, [
                              createBaseVNode("div", _hoisted_44, [
                                createBaseVNode("div", _hoisted_45, [
                                  createBaseVNode("span", _hoisted_46, toDisplayString(topic.key), 1),
                                  createBaseVNode("span", _hoisted_47, " (" + toDisplayString(getTopicUsageCount(topic.key)) + " " + toDisplayString(unref(t)("vocabulary.words", "words")) + ") ", 1)
                                ]),
                                createBaseVNode("div", _hoisted_48, [
                                  createBaseVNode("div", null, [
                                    _cache[27] || (_cache[27] = createBaseVNode("span", { class: "font-medium" }, "VI:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.vi), 1)
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[28] || (_cache[28] = createBaseVNode("span", { class: "font-medium" }, "EN:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.en), 1)
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[29] || (_cache[29] = createBaseVNode("span", { class: "font-medium" }, "KO:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.ko), 1)
                                  ])
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_49, [
                                createBaseVNode("span", _hoisted_50, toDisplayString(unref(t)("vocabulary.topicManager.builtIn", "Built-in")), 1)
                              ])
                            ], 4);
                          }), 128))
                        ]),
                        unref(filteredBuiltInTopics).length > unref(ITEMS_PER_PAGE) ? (openBlock(), createElementBlock("div", _hoisted_51, [
                          createBaseVNode("div", _hoisted_52, [
                            createBaseVNode("button", {
                              onClick: _cache[9] || (_cache[9] = ($event) => currentBuiltInPage.value--),
                              disabled: unref(currentBuiltInPage) === 1,
                              class: "px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                            }, " ‹ ", 8, _hoisted_53),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(visibleBuiltInPages), (page) => {
                              return openBlock(), createElementBlock("button", {
                                key: page,
                                onClick: ($event) => currentBuiltInPage.value = page,
                                class: normalizeClass([
                                  "px-3 py-2 rounded-lg text-sm transition-all duration-300",
                                  unref(currentBuiltInPage) === page ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-bg-soft"
                                ])
                              }, toDisplayString(page), 11, _hoisted_54);
                            }), 128)),
                            createBaseVNode("button", {
                              onClick: _cache[10] || (_cache[10] = ($event) => currentBuiltInPage.value++),
                              disabled: unref(currentBuiltInPage) === unref(totalBuiltInPages),
                              class: "px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                            }, " › ", 8, _hoisted_55)
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_56, [
                      createBaseVNode("button", {
                        onClick: _cache[11] || (_cache[11] = //@ts-ignore
                        (...args) => unref(closeDialog) && unref(closeDialog)(...args)),
                        class: "px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-sm sm:text-base animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                        style: { "animation-delay": "0.1s" }
                      }, toDisplayString(unref(t)("common.finish", "Finish")), 1)
                    ])
                  ])
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, {
          "enter-active-class": "transition-all duration-300 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-all duration-200 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            unref(showDeleteModal) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm",
              onClick: _cache[15] || (_cache[15] = withModifiers(($event) => topicToDelete.value = null, ["self"]))
            }, [
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-300 ease-out",
                "enter-from-class": "opacity-0 scale-95 translate-y-4",
                "enter-to-class": "opacity-100 scale-100 translate-y-0",
                "leave-active-class": "transition-all duration-200 ease-in",
                "leave-from-class": "opacity-100 scale-100 translate-y-0",
                "leave-to-class": "opacity-0 scale-95 translate-y-4"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", {
                    class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl max-w-md w-full",
                    onClick: _cache[14] || (_cache[14] = withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    createBaseVNode("div", _hoisted_57, [
                      createBaseVNode("h3", _hoisted_58, [
                        _cache[30] || (_cache[30] = createBaseVNode("span", { class: "w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" }, null, -1)),
                        createTextVNode(" " + toDisplayString(unref(t)("vocabulary.topicManager.confirmDeleteTitle", "Confirm Delete")), 1)
                      ]),
                      createBaseVNode("p", _hoisted_59, toDisplayString(unref(t)("vocabulary.topicManager.confirmDeleteMessage", { topic: unref(topicToDelete)?.vi || unref(topicToDelete)?.en || "this topic" }, `Are you sure you want to delete "${unref(topicToDelete)?.vi || unref(topicToDelete)?.en || "this topic"}"?`)), 1),
                      createBaseVNode("div", _hoisted_60, [
                        createBaseVNode("button", {
                          onClick: _cache[12] || (_cache[12] = ($event) => topicToDelete.value = null),
                          class: "px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                        }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                        createBaseVNode("button", {
                          onClick: _cache[13] || (_cache[13] = //@ts-ignore
                          (...args) => unref(deleteTopic) && unref(deleteTopic)(...args)),
                          class: "px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                        }, toDisplayString(unref(t)("common.delete", "Delete")), 1)
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const TopicManager = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a57cf80"]]);
export {
  TopicManager as default
};
//# sourceMappingURL=TopicManager-BYFvXmul.js.map
