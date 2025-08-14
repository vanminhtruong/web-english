const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ImageUpload-hZCxItwe.js","assets/vendor-DoTKyHPB.js","assets/TopicManager-B6adKRRq.js","assets/index-BQmcadNx.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-QvaKXH-Y.css","assets/TopicManager-SGNt9NVM.css"])))=>i.map(i=>d[i]);
import { c as useVocabularyStore, g as getTopicName, _ as __vitePreload, a as _export_sfc } from "./index-BQmcadNx.js";
import { d as defineComponent, H as useI18n, A as ref, B as computed, a1 as reactive, I as onMounted, q as nextTick, L as onUnmounted, K as watch, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, C as withDirectives, g as createTextVNode, S as vModelText, O as vModelSelect, b as createBlock, n as normalizeClass, a0 as Teleport, a as normalizeStyle, Z as withKeys, F as Fragment, j as renderList, D as defineAsyncComponent, N as vModelCheckbox } from "./vendor-DoTKyHPB.js";
import { u as useToast } from "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_7 = {
  class: "md:col-span-2 animate-fade-in-up",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_8 = {
  for: "word",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_9 = ["placeholder"];
const _hoisted_10 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_11 = {
  for: "pronunciation",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_12 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_13 = {
  for: "partOfSpeech",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_14 = { value: "" };
const _hoisted_15 = { value: "noun" };
const _hoisted_16 = { value: "verb" };
const _hoisted_17 = { value: "adjective" };
const _hoisted_18 = { value: "adverb" };
const _hoisted_19 = { value: "preposition" };
const _hoisted_20 = { value: "conjunction" };
const _hoisted_21 = { value: "interjection" };
const _hoisted_22 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_23 = {
  for: "category",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_24 = { class: "relative" };
const _hoisted_25 = ["title"];
const _hoisted_26 = { class: "relative" };
const _hoisted_27 = ["placeholder", "value"];
const _hoisted_28 = { class: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" };
const _hoisted_29 = ["placeholder"];
const _hoisted_30 = { class: "max-h-40 overflow-y-auto" };
const _hoisted_31 = {
  key: 0,
  class: "px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
};
const _hoisted_32 = ["onClick"];
const _hoisted_33 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_34 = {
  for: "level",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_35 = { value: "" };
const _hoisted_36 = { value: "beginner" };
const _hoisted_37 = { value: "intermediate" };
const _hoisted_38 = { value: "advanced" };
const _hoisted_39 = {
  class: "md:col-span-2 animate-fade-in-up",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_40 = {
  for: "meaning",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_41 = ["placeholder"];
const _hoisted_42 = {
  class: "md:col-span-2 animate-fade-in-up",
  style: { "animation-delay": "0.7s" }
};
const _hoisted_43 = {
  for: "example",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_44 = ["placeholder"];
const _hoisted_45 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.8s" }
};
const _hoisted_46 = {
  for: "synonyms",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_47 = ["placeholder"];
const _hoisted_48 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.9s" }
};
const _hoisted_49 = {
  for: "antonyms",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_50 = ["placeholder"];
const _hoisted_51 = {
  class: "md:col-span-2 animate-fade-in-up",
  style: { "animation-delay": "1.0s" }
};
const _hoisted_52 = {
  for: "imageUrl",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_53 = ["placeholder"];
const _hoisted_54 = {
  class: "md:col-span-2 animate-fade-in-up",
  style: { "animation-delay": "1.1s" }
};
const _hoisted_55 = {
  class: "md:col-span-2 animate-fade-in-up",
  style: { "animation-delay": "1.2s" }
};
const _hoisted_56 = { class: "flex items-center p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300" };
const _hoisted_57 = {
  for: "favorite",
  class: "ml-3 block text-sm text-gray-700 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
};
const _hoisted_58 = { class: "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_59 = { class: "flex justify-end space-x-3" };
const _hoisted_60 = ["disabled"];
const _hoisted_61 = {
  key: 0,
  class: "animate-spin h-4 w-4",
  fill: "none",
  viewBox: "0 0 24 24"
};
const SEARCH_FREQUENCY_KEY = "vocabulary-category-search-frequency";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyFormDialog",
  props: {
    modelValue: { type: Boolean },
    vocabulary: { default: null },
    targetDate: { default: null }
  },
  emits: ["update:modelValue", "vocabulary-saved"],
  setup(__props, { emit: __emit }) {
    const ImageUpload = defineAsyncComponent(() => __vitePreload(() => import("./ImageUpload-hZCxItwe.js"), true ? __vite__mapDeps([0,1]) : void 0));
    const TopicManager = defineAsyncComponent(() => __vitePreload(() => import("./TopicManager-B6adKRRq.js"), true ? __vite__mapDeps([2,1,3,4,5,6,7]) : void 0));
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const toast = useToast();
    const vocabularyStore = useVocabularyStore();
    const isSubmitting = ref(false);
    const refreshTrigger = ref(0);
    const showTopicManager = ref(false);
    const categorySearchQuery = ref("");
    const showCategoryDropdown = ref(false);
    const categorySearchInput = ref(null);
    const dropdownElement = ref(null);
    const modalContentRef = ref(null);
    const categorySearchFrequency = ref({});
    const searchFrequencyTimeout = ref(null);
    const loadSearchFrequency = () => {
      try {
        const stored = localStorage.getItem(SEARCH_FREQUENCY_KEY);
        if (stored) {
          categorySearchFrequency.value = JSON.parse(stored);
        }
      } catch (error) {
        console.warn("Failed to load search frequency:", error);
        categorySearchFrequency.value = {};
      }
    };
    const saveSearchFrequency = () => {
      try {
        localStorage.setItem(SEARCH_FREQUENCY_KEY, JSON.stringify(categorySearchFrequency.value));
      } catch (error) {
        console.warn("Failed to save search frequency:", error);
      }
    };
    const updateSearchFrequency = (categoryKey) => {
      if (!categoryKey) return;
      categorySearchFrequency.value[categoryKey] = (categorySearchFrequency.value[categoryKey] || 0) + 1;
      saveSearchFrequency();
      console.log("Updated search frequency for:", categoryKey, "new count:", categorySearchFrequency.value[categoryKey]);
    };
    const categoryKeys = computed(() => {
      refreshTrigger.value;
      const categories = vocabularyStore.getCategories.value;
      console.log("Category keys computed with refreshTrigger:", refreshTrigger.value, "Categories:", categories);
      return categories;
    });
    const form = reactive({
      word: "",
      pronunciation: "",
      partOfSpeech: "",
      meaning: "",
      example: "",
      category: "",
      level: "",
      synonyms: "",
      antonyms: "",
      notes: "",
      favorite: false,
      image: null
    });
    const isEditing = computed(() => !!props.vocabulary);
    const categoryUsage = computed(() => vocabularyStore.getCategoryUsage.value);
    const filteredCategoryKeys = computed(() => {
      let filtered;
      if (!categorySearchQuery.value.trim()) {
        filtered = [...categoryKeys.value];
      } else {
        const query = categorySearchQuery.value.toLowerCase();
        filtered = categoryKeys.value.filter(
          (key) => getTopicDisplayName(key).toLowerCase().includes(query)
        );
        if (query.length >= 2) {
          filtered.forEach((key) => {
            if (getTopicDisplayName(key).toLowerCase().includes(query)) {
              if (searchFrequencyTimeout.value) {
                clearTimeout(searchFrequencyTimeout.value);
              }
              searchFrequencyTimeout.value = setTimeout(() => {
                updateSearchFrequency(key);
              }, 1e3);
            }
          });
        }
      }
      return filtered.sort((a, b) => {
        const freqA = categorySearchFrequency.value[a] || 0;
        const freqB = categorySearchFrequency.value[b] || 0;
        if (freqA !== freqB) {
          return freqB - freqA;
        }
        return getTopicDisplayName(a).localeCompare(getTopicDisplayName(b));
      });
    });
    const simpleDropdownStyle = computed(() => {
      if (!showCategoryDropdown.value) {
        return { display: "none" };
      }
      const inputElement = document.getElementById("category");
      if (!inputElement) {
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          maxWidth: "90vw"
        };
      }
      const rect = inputElement.getBoundingClientRect();
      return {
        top: rect.bottom + 4 + "px",
        left: rect.left + "px",
        width: Math.max(rect.width, 300) + "px",
        maxWidth: "500px"
      };
    });
    const validateWord = () => {
      if (!form.word.trim()) {
        toast.error(t("vocabulary.validation.wordRequired", "Word is required"));
        return false;
      } else if (form.word.trim().length > 100) {
        toast.error(t("vocabulary.validation.wordTooLong", "Word is too long"));
        return false;
      }
      return true;
    };
    const validateMeaning = () => {
      if (!form.meaning.trim()) {
        toast.error(t("vocabulary.validation.meaningRequired", "Meaning is required"));
        return false;
      } else if (form.meaning.trim().length > 500) {
        toast.error(t("vocabulary.validation.meaningTooLong", "Meaning is too long"));
        return false;
      }
      return true;
    };
    const validatePartOfSpeech = () => {
      if (!form.partOfSpeech) {
        toast.error(t("vocabulary.validation.partOfSpeechRequired", "Part of speech is required"));
        return false;
      }
      return true;
    };
    const validateCategory = () => {
      if (!form.category) {
        toast.error(t("vocabulary.validation.categoryRequired", "Category is required"));
        return false;
      }
      return true;
    };
    const validateLevel = () => {
      if (!form.level) {
        toast.error(t("vocabulary.validation.levelRequired", "Level is required"));
        return false;
      }
      return true;
    };
    const validateExample = () => {
      if (form.example.length > 500) {
        toast.error(t("vocabulary.validation.exampleTooLong", "Example is too long"));
        return false;
      }
      return true;
    };
    const validateNotes = () => {
      if (form.notes.length > 500) {
        toast.error(t("vocabulary.validation.notesTooLong", "Notes are too long"));
        return false;
      }
      return true;
    };
    const validatePronunciation = () => {
      if (form.pronunciation.length > 100) {
        toast.error(t("vocabulary.validation.pronunciationTooLong", "Pronunciation is too long"));
        return false;
      }
      return true;
    };
    const validateSynonyms = () => {
      if (form.synonyms && form.synonyms.trim()) {
        const synonyms = form.synonyms.split(",").map((s) => s.trim()).filter((s) => s);
        if (synonyms.length === 0) {
          toast.error(t("vocabulary.validation.synonymsInvalid", "Synonyms are invalid"));
          return false;
        }
      }
      return true;
    };
    const validateAntonyms = () => {
      if (form.antonyms && form.antonyms.trim()) {
        const antonyms = form.antonyms.split(",").map((s) => s.trim()).filter((s) => s);
        if (antonyms.length === 0) {
          toast.error(t("vocabulary.validation.antonymsInvalid", "Antonyms are invalid"));
          return false;
        }
      }
      return true;
    };
    const resetForm = () => {
      form.word = "";
      form.pronunciation = "";
      form.partOfSpeech = "";
      form.meaning = "";
      form.example = "";
      form.category = "";
      form.level = "";
      form.synonyms = "";
      form.antonyms = "";
      form.notes = "";
      form.favorite = false;
    };
    const handleScroll = () => {
      if (showCategoryDropdown.value) {
        showCategoryDropdown.value = false;
        categorySearchQuery.value = "";
        console.log("Scroll detected, dropdown closed");
      }
    };
    onMounted(() => {
      loadSearchFrequency();
      console.log("Loaded category search frequency:", categorySearchFrequency.value);
      nextTick(() => {
        if (modalContentRef.value) {
          modalContentRef.value.addEventListener("scroll", handleScroll, { passive: true });
          console.log("Added scroll listener to modal content");
        }
      });
    });
    onUnmounted(() => {
      if (modalContentRef.value) {
        modalContentRef.value.removeEventListener("scroll", handleScroll);
        modalContentRef.value.removeEventListener("scroll", handleScroll);
        console.log("Removed scroll listeners from modal content");
      }
    });
    watch(() => props.modelValue, (isOpen) => {
      if (!isOpen) {
        showCategoryDropdown.value = false;
        categorySearchQuery.value = "";
        document.body.style.overflow = "";
        console.log("Modal closed, dropdown closed, body scroll enabled");
      } else {
        document.body.style.overflow = "hidden";
        nextTick(() => {
          setTimeout(() => {
            if (modalContentRef.value) {
              modalContentRef.value.addEventListener("scroll", handleScroll, { passive: true });
              console.log("Added scroll listener to modal content on modal open");
            }
          }, 100);
        });
        console.log("Modal opened, body scroll disabled");
      }
    });
    watch(
      () => props.vocabulary,
      (newVocabulary) => {
        if (newVocabulary) {
          form.word = newVocabulary.word;
          form.pronunciation = newVocabulary.pronunciation || "";
          form.partOfSpeech = newVocabulary.partOfSpeech;
          form.meaning = newVocabulary.meaning;
          form.example = newVocabulary.example || "";
          form.category = newVocabulary.category;
          form.level = newVocabulary.level;
          form.synonyms = newVocabulary.synonyms?.join(", ") || "";
          form.antonyms = newVocabulary.antonyms?.join(", ") || "";
          form.notes = newVocabulary.notes || "";
          form.favorite = !!newVocabulary.favorite;
          form.image = newVocabulary.image || null;
        } else {
          resetForm();
        }
      },
      { immediate: true }
    );
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        window.dispatchEvent(new CustomEvent("vocabulary-edit-word"));
        if (!props.vocabulary) {
          resetForm();
        }
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeydown);
      } else {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeydown);
      }
    });
    const getTopicDisplayName = (category) => {
      return getTopicName(category);
    };
    const toggleCategoryDropdown = () => {
      console.log("Toggle category dropdown clicked");
      showCategoryDropdown.value = !showCategoryDropdown.value;
      if (showCategoryDropdown.value) {
        categorySearchQuery.value = "";
        nextTick(() => {
          categorySearchInput.value?.focus();
        });
      }
    };
    const closeCategoryDropdown = () => {
      showCategoryDropdown.value = false;
      categorySearchQuery.value = "";
    };
    const selectCategory = (key) => {
      form.category = key;
      showCategoryDropdown.value = false;
      categorySearchQuery.value = "";
      updateSearchFrequency(key);
      console.log("Category selected:", getTopicDisplayName(key));
    };
    const onTopicAdded = (newTopic) => {
      refreshTrigger.value++;
      vocabularyStore.refreshCustomTopics();
      if (!form.category) {
        form.category = newTopic.key;
      }
      console.log("Topic added, refreshing categories:", newTopic.key);
    };
    const onTopicUpdated = () => {
      refreshTrigger.value++;
      vocabularyStore.refreshCustomTopics();
      console.log("Topic updated, refreshing categories");
    };
    const onTopicDeleted = (deletedTopicId) => {
      refreshTrigger.value++;
      vocabularyStore.refreshCustomTopics();
      if (form.category === deletedTopicId) {
        form.category = "";
      }
      console.log("Topic deleted, refreshing categories:", deletedTopicId);
    };
    const handleTopicsUpdated = () => {
      setTimeout(() => {
        refreshTrigger.value++;
        vocabularyStore.refreshCustomTopics();
        console.log("Topics updated, refreshing categories in form dialog");
      }, 100);
    };
    const handleClickOutside = (event) => {
      if (!showCategoryDropdown.value) return;
      const target = event.target;
      const dropdownContainer = target.closest(".relative");
      const dropdownMenu = target.closest('[class*="z-[99999]"]');
      if (dropdownContainer || dropdownMenu) {
        return;
      }
      closeCategoryDropdown();
    };
    onMounted(() => {
      window.addEventListener("topics-updated", handleTopicsUpdated);
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("topics-updated", handleTopicsUpdated);
      document.removeEventListener("click", handleClickOutside);
    });
    const closeDialog = () => {
      window.dispatchEvent(new CustomEvent("vocabulary-modal-closed"));
      emit("update:modelValue", false);
    };
    const submitForm = async () => {
      if (isSubmitting.value) return;
      if (!validateWord()) return;
      if (!validatePronunciation()) return;
      if (!validatePartOfSpeech()) return;
      if (!validateCategory()) return;
      if (!validateLevel()) return;
      if (!validateMeaning()) return;
      if (!validateExample()) return;
      if (!validateSynonyms()) return;
      if (!validateAntonyms()) return;
      if (!validateNotes()) return;
      isSubmitting.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const vocabularyData = {
          word: form.word.trim(),
          pronunciation: form.pronunciation.trim(),
          partOfSpeech: form.partOfSpeech,
          meaning: form.meaning.trim(),
          example: form.example.trim(),
          category: form.category,
          level: form.level,
          synonyms: form.synonyms ? form.synonyms.split(",").map((s) => s.trim()).filter((s) => s) : [],
          antonyms: form.antonyms ? form.antonyms.split(",").map((s) => s.trim()).filter((s) => s) : [],
          notes: form.notes.trim(),
          favorite: form.favorite,
          image: form.image
        };
        if (isEditing.value && props.vocabulary) {
          vocabularyStore.updateVocabulary(props.vocabulary.id, vocabularyData);
          console.log("Vocabulary updated:", props.vocabulary.id, vocabularyData);
          toast.success(t("vocabulary.validation.updateSuccess", "Vocabulary updated successfully!"));
        } else {
          if (props.targetDate) {
            const now = /* @__PURE__ */ new Date();
            const [year, month, day] = props.targetDate.split("-");
            const targetDateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
            vocabularyData.createdAt = targetDateObj.toISOString();
            vocabularyData.updatedAt = targetDateObj.toISOString();
          }
          const newVocabulary = vocabularyStore.addVocabulary(vocabularyData);
          console.log("Vocabulary added:", newVocabulary);
          toast.success(t("vocabulary.validation.saveSuccess", "Vocabulary added successfully!"));
        }
        emit("vocabulary-saved", { category: vocabularyData.category });
        setTimeout(() => {
          closeDialog();
        }, 500);
      } catch (error) {
        console.error("Error saving vocabulary:", error);
        toast.error(t("vocabulary.validation.saveError", "Error saving vocabulary"));
      } finally {
        isSubmitting.value = false;
      }
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
                    createBaseVNode("div", {
                      class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transform",
                      onClick: _cache[17] || (_cache[17] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("h2", _hoisted_5, [
                            _cache[19] || (_cache[19] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(isEditing.value ? unref(t)("vocabulary.editVocabulary", "Edit Vocabulary") : unref(t)("vocabulary.addVocabulary", "Add Vocabulary")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: closeDialog,
                            class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, _cache[20] || (_cache[20] = [
                            createBaseVNode("svg", {
                              class: "w-6 h-6",
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
                        ])
                      ]),
                      createBaseVNode("div", {
                        ref_key: "modalContentRef",
                        ref: modalContentRef,
                        class: "px-6 py-4 flex-1 overflow-y-auto min-h-0"
                      }, [
                        createBaseVNode("form", {
                          onSubmit: withModifiers(submitForm, ["prevent"]),
                          class: "space-y-6"
                        }, [
                          createBaseVNode("div", _hoisted_6, [
                            createBaseVNode("div", _hoisted_7, [
                              createBaseVNode("label", _hoisted_8, [
                                _cache[21] || (_cache[21] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.word", "Word")) + " ", 1),
                                _cache[22] || (_cache[22] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              withDirectives(createBaseVNode("input", {
                                id: "word",
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.word = $event),
                                type: "text",
                                required: "",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("vocabulary.wordPlaceholder", "Enter English word"),
                                onBlur: validateWord
                              }, null, 40, _hoisted_9), [
                                [vModelText, form.word]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_10, [
                              createBaseVNode("label", _hoisted_11, [
                                _cache[23] || (_cache[23] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.pronunciation", "Pronunciation")), 1)
                              ]),
                              withDirectives(createBaseVNode("input", {
                                id: "pronunciation",
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.pronunciation = $event),
                                type: "text",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]",
                                placeholder: "/ˈeksəmpl/",
                                onBlur: validatePronunciation
                              }, null, 544), [
                                [vModelText, form.pronunciation]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_12, [
                              createBaseVNode("label", _hoisted_13, [
                                _cache[24] || (_cache[24] = createBaseVNode("span", { class: "w-1 h-4 bg-purple-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.wordType", "Word Type")) + " ", 1),
                                _cache[25] || (_cache[25] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              withDirectives(createBaseVNode("select", {
                                id: "partOfSpeech",
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.partOfSpeech = $event),
                                required: "",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02] cursor-pointer",
                                onChange: validatePartOfSpeech
                              }, [
                                createBaseVNode("option", _hoisted_14, toDisplayString(unref(t)("vocabulary.selectWordType", "Select word type")), 1),
                                createBaseVNode("option", _hoisted_15, toDisplayString(unref(t)("vocabulary.wordTypes.noun", "Noun")), 1),
                                createBaseVNode("option", _hoisted_16, toDisplayString(unref(t)("vocabulary.wordTypes.verb", "Verb")), 1),
                                createBaseVNode("option", _hoisted_17, toDisplayString(unref(t)("vocabulary.wordTypes.adjective", "Adjective")), 1),
                                createBaseVNode("option", _hoisted_18, toDisplayString(unref(t)("vocabulary.wordTypes.adverb", "Adverb")), 1),
                                createBaseVNode("option", _hoisted_19, toDisplayString(unref(t)("vocabulary.wordTypes.preposition", "Preposition")), 1),
                                createBaseVNode("option", _hoisted_20, toDisplayString(unref(t)("vocabulary.wordTypes.conjunction", "Conjunction")), 1),
                                createBaseVNode("option", _hoisted_21, toDisplayString(unref(t)("vocabulary.wordTypes.interjection", "Interjection")), 1)
                              ], 544), [
                                [vModelSelect, form.partOfSpeech]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_22, [
                              createBaseVNode("label", _hoisted_23, [
                                _cache[26] || (_cache[26] = createBaseVNode("span", { class: "w-1 h-4 bg-orange-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.category", "Category")) + " ", 1),
                                _cache[27] || (_cache[27] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              createBaseVNode("div", _hoisted_24, [
                                createBaseVNode("button", {
                                  type: "button",
                                  onClick: _cache[3] || (_cache[3] = ($event) => showTopicManager.value = true),
                                  class: "absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110 hover:rotate-90 z-[10000] shadow-lg",
                                  title: unref(t)("vocabulary.addCategory", "Add Category")
                                }, " + ", 8, _hoisted_25),
                                createBaseVNode("div", _hoisted_26, [
                                  createBaseVNode("input", {
                                    id: "category",
                                    type: "text",
                                    required: "",
                                    readonly: "",
                                    onClick: toggleCategoryDropdown,
                                    class: "w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02] cursor-pointer",
                                    placeholder: unref(t)("vocabulary.selectCategory", "Select category"),
                                    value: form.category ? getTopicDisplayName(form.category) : ""
                                  }, null, 8, _hoisted_27),
                                  createBaseVNode("div", _hoisted_28, [
                                    (openBlock(), createElementBlock("svg", {
                                      class: normalizeClass(["w-4 h-4 text-gray-400 transition-transform duration-200", { "rotate-180": showCategoryDropdown.value }]),
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, _cache[28] || (_cache[28] = [
                                      createBaseVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M19 9l-7 7-7-7"
                                      }, null, -1)
                                    ]), 2))
                                  ]),
                                  (openBlock(), createBlock(Teleport, { to: "body" }, [
                                    createVNode(Transition, {
                                      "enter-active-class": "transition duration-200 ease-out",
                                      "enter-from-class": "transform scale-95 opacity-0",
                                      "enter-to-class": "transform scale-100 opacity-100",
                                      "leave-active-class": "transition duration-75 ease-in",
                                      "leave-from-class": "transform scale-100 opacity-100",
                                      "leave-to-class": "transform scale-95 opacity-0"
                                    }, {
                                      default: withCtx(() => [
                                        showCategoryDropdown.value ? (openBlock(), createElementBlock("div", {
                                          key: 0,
                                          ref_key: "dropdownElement",
                                          ref: dropdownElement,
                                          style: normalizeStyle(simpleDropdownStyle.value),
                                          class: "fixed z-[9999] bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-60 overflow-hidden"
                                        }, [
                                          createBaseVNode("div", {
                                            class: "p-2 border-b border-gray-200 dark:border-gray-600",
                                            onClick: _cache[8] || (_cache[8] = withModifiers(() => {
                                            }, ["stop"]))
                                          }, [
                                            withDirectives(createBaseVNode("input", {
                                              ref_key: "categorySearchInput",
                                              ref: categorySearchInput,
                                              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => categorySearchQuery.value = $event),
                                              type: "text",
                                              class: "w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
                                              placeholder: unref(t)("vocabulary.searchCategory", "Search categories..."),
                                              onKeydown: [
                                                _cache[5] || (_cache[5] = withKeys(withModifiers(() => {
                                                }, ["prevent"]), ["enter"])),
                                                withKeys(closeCategoryDropdown, ["escape"])
                                              ],
                                              onClick: _cache[6] || (_cache[6] = withModifiers(() => {
                                              }, ["stop"])),
                                              onFocus: _cache[7] || (_cache[7] = withModifiers(() => {
                                              }, ["stop"]))
                                            }, null, 40, _hoisted_29), [
                                              [vModelText, categorySearchQuery.value]
                                            ])
                                          ]),
                                          createBaseVNode("div", _hoisted_30, [
                                            filteredCategoryKeys.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_31, toDisplayString(unref(t)("vocabulary.noCategories", "No categories found")), 1)) : createCommentVNode("", true),
                                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCategoryKeys.value, (key) => {
                                              return openBlock(), createElementBlock("div", {
                                                key,
                                                class: normalizeClass(["px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-custom transition-colors duration-150", { "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300": form.category === key }]),
                                                onClick: ($event) => selectCategory(key)
                                              }, toDisplayString(getTopicDisplayName(key)), 11, _hoisted_32);
                                            }), 128))
                                          ])
                                        ], 4)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    })
                                  ]))
                                ])
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_33, [
                              createBaseVNode("label", _hoisted_34, [
                                _cache[29] || (_cache[29] = createBaseVNode("span", { class: "w-1 h-4 bg-red-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.level", "Level")) + " ", 1),
                                _cache[30] || (_cache[30] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              withDirectives(createBaseVNode("select", {
                                id: "level",
                                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => form.level = $event),
                                required: "",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400 dark:hover:border-red-500 transform hover:scale-[1.02] cursor-pointer",
                                onChange: validateLevel
                              }, [
                                createBaseVNode("option", _hoisted_35, toDisplayString(unref(t)("vocabulary.selectLevel", "Select level")), 1),
                                createBaseVNode("option", _hoisted_36, toDisplayString(unref(t)("vocabulary.levels.beginner", "Beginner")), 1),
                                createBaseVNode("option", _hoisted_37, toDisplayString(unref(t)("vocabulary.levels.intermediate", "Intermediate")), 1),
                                createBaseVNode("option", _hoisted_38, toDisplayString(unref(t)("vocabulary.levels.advanced", "Advanced")), 1)
                              ], 544), [
                                [vModelSelect, form.level]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_39, [
                              createBaseVNode("label", _hoisted_40, [
                                _cache[31] || (_cache[31] = createBaseVNode("span", { class: "w-1 h-4 bg-indigo-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.meaning", "Meaning")) + " ", 1),
                                _cache[32] || (_cache[32] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              withDirectives(createBaseVNode("textarea", {
                                id: "meaning",
                                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => form.meaning = $event),
                                required: "",
                                rows: "3",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("vocabulary.meaningPlaceholder", "Enter meaning in Vietnamese"),
                                onBlur: validateMeaning
                              }, null, 40, _hoisted_41), [
                                [vModelText, form.meaning]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_42, [
                              createBaseVNode("label", _hoisted_43, [
                                _cache[33] || (_cache[33] = createBaseVNode("span", { class: "w-1 h-4 bg-teal-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.example", "Example")), 1)
                              ]),
                              withDirectives(createBaseVNode("textarea", {
                                id: "example",
                                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => form.example = $event),
                                rows: "2",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 dark:hover:border-teal-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("vocabulary.examplePlaceholder", "Enter example sentence"),
                                onBlur: validateExample
                              }, null, 40, _hoisted_44), [
                                [vModelText, form.example]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_45, [
                              createBaseVNode("label", _hoisted_46, [
                                _cache[34] || (_cache[34] = createBaseVNode("span", { class: "w-1 h-4 bg-pink-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.synonyms", "Synonyms")), 1)
                              ]),
                              withDirectives(createBaseVNode("input", {
                                id: "synonyms",
                                "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => form.synonyms = $event),
                                type: "text",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("vocabulary.separateByComma", "Separate by comma"),
                                onBlur: validateSynonyms
                              }, null, 40, _hoisted_47), [
                                [vModelText, form.synonyms]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_48, [
                              createBaseVNode("label", _hoisted_49, [
                                _cache[35] || (_cache[35] = createBaseVNode("span", { class: "w-1 h-4 bg-yellow-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.antonyms", "Antonyms")), 1)
                              ]),
                              withDirectives(createBaseVNode("input", {
                                id: "antonyms",
                                "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => form.antonyms = $event),
                                type: "text",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("vocabulary.separateByComma", "Separate by comma"),
                                onBlur: validateAntonyms
                              }, null, 40, _hoisted_50), [
                                [vModelText, form.antonyms]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_51, [
                              createBaseVNode("label", _hoisted_52, [
                                _cache[36] || (_cache[36] = createBaseVNode("span", { class: "w-1 h-4 bg-cyan-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.imageUrl", "Image URL")), 1)
                              ]),
                              withDirectives(createBaseVNode("textarea", {
                                id: "imageUrl",
                                "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => form.image = $event),
                                rows: "3",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("vocabulary.imageUrlPlaceholder", "Enter image URL (optional)")
                              }, null, 8, _hoisted_53), [
                                [vModelText, form.image]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_54, [
                              createVNode(unref(ImageUpload), {
                                modelValue: form.image,
                                "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => form.image = $event)
                              }, null, 8, ["modelValue"])
                            ]),
                            createBaseVNode("div", _hoisted_55, [
                              createBaseVNode("div", _hoisted_56, [
                                withDirectives(createBaseVNode("input", {
                                  id: "favorite",
                                  "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => form.favorite = $event),
                                  type: "checkbox",
                                  class: "h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded transition-all duration-300 hover:scale-110 cursor-pointer"
                                }, null, 512), [
                                  [vModelCheckbox, form.favorite]
                                ]),
                                createBaseVNode("label", _hoisted_57, toDisplayString(unref(t)("vocabulary.isFavorite", "Mark as favorite")), 1)
                              ])
                            ])
                          ])
                        ], 32)
                      ], 512),
                      createBaseVNode("div", _hoisted_58, [
                        createBaseVNode("div", _hoisted_59, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: closeDialog,
                            class: "px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                          }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                          createBaseVNode("button", {
                            onClick: submitForm,
                            disabled: isSubmitting.value,
                            class: "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium disabled:cursor-not-allowed"
                          }, [
                            isSubmitting.value ? (openBlock(), createElementBlock("svg", _hoisted_61, _cache[37] || (_cache[37] = [
                              createBaseVNode("circle", {
                                class: "opacity-25",
                                cx: "12",
                                cy: "12",
                                r: "10",
                                stroke: "currentColor",
                                "stroke-width": "4"
                              }, null, -1),
                              createBaseVNode("path", {
                                class: "opacity-75",
                                fill: "currentColor",
                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              }, null, -1)
                            ]))) : createCommentVNode("", true),
                            createBaseVNode("span", null, toDisplayString(isSubmitting.value ? unref(t)("common.saving", "Saving...") : isEditing.value ? unref(t)("common.update", "Update") : unref(t)("vocabulary.saveVocabulary", "Save Vocabulary")), 1)
                          ], 8, _hoisted_60)
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(unref(TopicManager), {
          modelValue: showTopicManager.value,
          "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => showTopicManager.value = $event),
          "vocabulary-usage": categoryUsage.value,
          onTopicAdded,
          onTopicUpdated,
          onTopicDeleted
        }, null, 8, ["modelValue", "vocabulary-usage"])
      ]);
    };
  }
});
const VocabularyFormDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e673ad5f"]]);
export {
  VocabularyFormDialog as default
};
//# sourceMappingURL=VocabularyFormDialog-DmLdxJ7p.js.map
