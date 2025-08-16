const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ConfirmToast-C2z7ONQ6.js","assets/vendor-DoTKyHPB.js"])))=>i.map(i=>d[i]);
import { c as useVocabularyStore, f as getDateKey, g as getTopicName, _ as __vitePreload, a as _export_sfc } from "./index-BZ-pxgGI.js";
import { d as defineComponent, H as useI18n, A as ref, B as computed, I as onMounted, L as onUnmounted, K as watch, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, C as withDirectives, N as vModelCheckbox, g as createTextVNode, n as normalizeClass, F as Fragment, j as renderList, S as vModelText, O as vModelSelect, a as normalizeStyle, D as defineAsyncComponent } from "./vendor-DoTKyHPB.js";
import { u as useToast } from "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-w-4xl" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = { class: "flex items-center space-x-4" };
const _hoisted_7 = { class: "flex items-center space-x-3" };
const _hoisted_8 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_9 = { class: "relative inline-flex items-center cursor-pointer" };
const _hoisted_10 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_11 = {
  key: 0,
  class: "mt-3 p-2 bg-blue-50 dark:bg-gray-custom rounded-lg"
};
const _hoisted_12 = { class: "flex items-center justify-between" };
const _hoisted_13 = { class: "text-sm text-blue-700 dark:text-blue-300 flex items-center" };
const _hoisted_14 = {
  key: 0,
  class: "relative"
};
const _hoisted_15 = { class: "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full text-xs font-bold" };
const _hoisted_16 = {
  key: 0,
  class: "absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
};
const _hoisted_17 = { class: "p-3 border-b border-gray-200 dark:border-gray-700" };
const _hoisted_18 = { class: "text-sm font-semibold text-gray-900 dark:text-white flex items-center" };
const _hoisted_19 = {
  key: 0,
  class: "p-4 text-center text-gray-500 dark:text-gray-400 text-sm"
};
const _hoisted_20 = {
  key: 1,
  class: "divide-y divide-gray-200 dark:divide-gray-700"
};
const _hoisted_21 = { class: "flex items-start justify-between" };
const _hoisted_22 = { class: "flex-1 min-w-0" };
const _hoisted_23 = { class: "text-sm font-medium text-gray-900 dark:text-white truncate" };
const _hoisted_24 = { class: "text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2" };
const _hoisted_25 = { class: "flex items-center space-x-2 mt-2" };
const _hoisted_26 = { class: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200" };
const _hoisted_27 = { class: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200" };
const _hoisted_28 = { class: "px-6 py-4 max-h-[70vh] overflow-y-auto" };
const _hoisted_29 = {
  class: "mb-6 p-4 bg-gray-50 dark:bg-dark-bg-mute rounded-lg border border-gray-200 dark:border-dark-bg-mute animate-fade-in-up",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_30 = { class: "text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center" };
const _hoisted_31 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_32 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_33 = ["placeholder"];
const _hoisted_34 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_35 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_36 = { value: "" };
const _hoisted_37 = { value: "tenses" };
const _hoisted_38 = { value: "conditionals" };
const _hoisted_39 = { value: "passive" };
const _hoisted_40 = { value: "modals" };
const _hoisted_41 = { value: "articles" };
const _hoisted_42 = { value: "prepositions" };
const _hoisted_43 = { value: "conjunctions" };
const _hoisted_44 = { value: "other" };
const _hoisted_45 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_46 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_47 = { value: "" };
const _hoisted_48 = { value: "beginner" };
const _hoisted_49 = { value: "intermediate" };
const _hoisted_50 = { value: "advanced" };
const _hoisted_51 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_52 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_53 = { class: "space-y-2" };
const _hoisted_54 = ["placeholder"];
const _hoisted_55 = {
  key: 0,
  class: "p-2 bg-yellow-50 dark:bg-[#0a0a0a] border border-yellow-200 dark:border-yellow-600 rounded text-sm"
};
const _hoisted_56 = { class: "text-yellow-700 dark:text-yellow-400 font-medium mb-1" };
const _hoisted_57 = ["innerHTML"];
const _hoisted_58 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_59 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_60 = { class: "space-y-2" };
const _hoisted_61 = ["placeholder"];
const _hoisted_62 = {
  key: 0,
  class: "p-2 bg-teal-50 dark:bg-[#0a0a0a] border border-teal-200 dark:border-teal-600 rounded text-sm"
};
const _hoisted_63 = { class: "text-teal-700 dark:text-teal-400 font-medium mb-1" };
const _hoisted_64 = ["innerHTML"];
const _hoisted_65 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.7s" }
};
const _hoisted_66 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_67 = { class: "space-y-2" };
const _hoisted_68 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_69 = ["onClick"];
const _hoisted_70 = {
  class: "flex justify-end space-x-3 pt-4 animate-fade-in-up",
  style: { "animation-delay": "0.8s" }
};
const _hoisted_71 = {
  type: "submit",
  class: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
};
const _hoisted_72 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.9s" }
};
const _hoisted_73 = { class: "flex items-center justify-between mb-4" };
const _hoisted_74 = { class: "text-md font-medium text-gray-900 dark:text-white flex items-center" };
const _hoisted_75 = { value: "" };
const _hoisted_76 = { value: "tenses" };
const _hoisted_77 = { value: "conditionals" };
const _hoisted_78 = { value: "passive" };
const _hoisted_79 = { value: "modals" };
const _hoisted_80 = { value: "articles" };
const _hoisted_81 = { value: "prepositions" };
const _hoisted_82 = { value: "conjunctions" };
const _hoisted_83 = { value: "other" };
const _hoisted_84 = {
  key: 0,
  class: "space-y-4 max-h-96 overflow-y-auto scrollbar-custom"
};
const _hoisted_85 = { class: "flex items-start justify-between" };
const _hoisted_86 = { class: "flex-1" };
const _hoisted_87 = { class: "flex items-center space-x-2 mb-2" };
const _hoisted_88 = { class: "font-medium text-gray-900 dark:text-white" };
const _hoisted_89 = { class: "px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full" };
const _hoisted_90 = { class: "px-2 py-1 text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full" };
const _hoisted_91 = { class: "mb-2" };
const _hoisted_92 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" };
const _hoisted_93 = ["innerHTML"];
const _hoisted_94 = {
  key: 0,
  class: "mb-2"
};
const _hoisted_95 = ["innerHTML"];
const _hoisted_96 = {
  key: 1,
  class: "mb-2"
};
const _hoisted_97 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" };
const _hoisted_98 = { class: "text-sm text-gray-600 dark:text-gray-400 space-y-2" };
const _hoisted_99 = { class: "flex items-start flex-1" };
const _hoisted_100 = { class: "flex-1" };
const _hoisted_101 = ["onClick", "disabled", "title"];
const _hoisted_102 = {
  key: 0,
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_103 = {
  key: 1,
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_104 = { class: "text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_105 = { class: "flex items-center space-x-2 ml-4" };
const _hoisted_106 = ["onClick", "title"];
const _hoisted_107 = ["onClick", "title"];
const _hoisted_108 = {
  key: 1,
  class: "text-center py-8 animate-fade-in-up",
  style: { "animation-delay": "1.0s" }
};
const _hoisted_109 = { class: "text-gray-500 dark:text-gray-400" };
const _hoisted_110 = { class: "px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_111 = { class: "flex justify-end" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GrammarManagerModal",
  props: {
    modelValue: { type: Boolean },
    selectedDate: { default: null }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const ConfirmToast = defineAsyncComponent(() => __vitePreload(() => import("./ConfirmToast-C2z7ONQ6.js"), true ? __vite__mapDeps([0,1]) : void 0));
    const { t } = useI18n();
    const toast = useToast();
    const { allVocabularies } = useVocabularyStore();
    const isPlayingAudio = ref(null);
    const props = __props;
    const emit = __emit;
    const grammarRules = ref([]);
    const isEditing = ref(false);
    const editingId = ref(null);
    const filterCategory = ref("");
    const perDateMode = ref(false);
    const showVocabularyDropdown = ref(false);
    const formData = ref({
      title: "",
      category: "",
      level: "",
      formula: "",
      description: "",
      examples: [""]
    });
    const filteredGrammarRules = computed(() => {
      let filtered = grammarRules.value;
      if (perDateMode.value) {
        filtered = filtered.filter((rule) => rule.dateGroup === props.selectedDate);
      } else {
        filtered = filtered.filter((rule) => !rule.dateGroup);
      }
      if (filterCategory.value) {
        filtered = filtered.filter((rule) => rule.category === filterCategory.value);
      }
      return filtered;
    });
    const vocabulariesForSelectedDate = computed(() => {
      if (!props.selectedDate) return [];
      return allVocabularies.value.filter((vocab) => {
        const vocabDateKey = getDateKey(vocab.createdAt);
        return vocabDateKey === props.selectedDate;
      });
    });
    const renderHtmlContent = (content) => {
      if (!content) return "";
      return content.replace(/<\/br>/gi, "<br>").replace(/<br\s*\/?>/gi, "<br>").replace(/\n/g, "<br>");
    };
    const formulaPreview = computed(() => renderHtmlContent(formData.value.formula));
    const descriptionPreview = computed(() => renderHtmlContent(formData.value.description));
    const playExampleAudio = async (example) => {
      if (isPlayingAudio.value === example) return;
      try {
        isPlayingAudio.value = example;
        if ("speechSynthesis" in window) {
          return new Promise((resolve, reject) => {
            const utterance = new SpeechSynthesisUtterance(example);
            const savedSettings = localStorage.getItem("voice-settings");
            let voiceSettings = {
              rate: 0.8,
              pitch: 1,
              volume: 1
            };
            if (savedSettings) {
              try {
                const settings = JSON.parse(savedSettings);
                const currentVoiceType2 = localStorage.getItem("current-voice-type") || "female-sweet";
                if (settings[currentVoiceType2]) {
                  voiceSettings = settings[currentVoiceType2];
                }
              } catch (e) {
                console.warn("Failed to parse voice settings");
              }
            }
            utterance.lang = "en-US";
            utterance.rate = Math.max(0.1, Math.min(10, voiceSettings.rate));
            utterance.pitch = Math.max(0, Math.min(2, voiceSettings.pitch));
            utterance.volume = Math.max(0, Math.min(1, voiceSettings.volume));
            const voices = speechSynthesis.getVoices();
            const currentVoiceType = localStorage.getItem("current-voice-type") || "female-sweet";
            let targetVoice = null;
            if (currentVoiceType.includes("female")) {
              targetVoice = voices.find(
                (voice) => voice.lang.includes("en") && voice.name.toLowerCase().includes("female")
              ) || voices.find(
                (voice) => voice.lang.includes("en") && !voice.name.toLowerCase().includes("male")
              );
            } else {
              targetVoice = voices.find(
                (voice) => voice.lang.includes("en") && voice.name.toLowerCase().includes("male")
              );
            }
            if (!targetVoice) {
              targetVoice = voices.find((voice) => voice.lang.includes("en"));
            }
            if (targetVoice) {
              utterance.voice = targetVoice;
            }
            utterance.onend = () => resolve(void 0);
            utterance.onerror = (event) => reject(event.error);
            speechSynthesis.speak(utterance);
          });
        } else {
          console.warn("Speech synthesis not supported");
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      } finally {
        isPlayingAudio.value = null;
      }
    };
    const closeModal = () => {
      resetForm();
      emit("update:modelValue", false);
    };
    const resetForm = () => {
      formData.value = {
        title: "",
        category: "",
        level: "",
        formula: "",
        description: "",
        examples: [""]
      };
      isEditing.value = false;
      editingId.value = null;
    };
    const addExample = () => {
      formData.value.examples.push("");
    };
    const removeExample = (index) => {
      if (formData.value.examples.length > 1) {
        formData.value.examples.splice(index, 1);
      }
    };
    const submitForm = () => {
      const now = /* @__PURE__ */ new Date();
      let ruleId = "";
      if (isEditing.value) {
        const index = grammarRules.value.findIndex((rule) => rule.id === editingId.value);
        if (index !== -1) {
          grammarRules.value[index] = {
            ...grammarRules.value[index],
            title: formData.value.title,
            category: formData.value.category,
            level: formData.value.level,
            formula: formData.value.formula,
            description: formData.value.description,
            examples: formData.value.examples.filter((ex) => ex.trim()),
            updatedAt: now
          };
          ruleId = editingId.value || "";
        }
      } else {
        const newRule = {
          id: Date.now().toString(),
          title: formData.value.title,
          category: formData.value.category,
          level: formData.value.level,
          formula: formData.value.formula,
          description: formData.value.description,
          examples: formData.value.examples.filter((ex) => ex.trim()),
          createdAt: now,
          updatedAt: now,
          dateGroup: perDateMode.value ? props.selectedDate || void 0 : void 0
        };
        grammarRules.value.push(newRule);
        ruleId = newRule.id;
      }
      saveToLocalStorage();
      const event = new CustomEvent("grammar-rules-updated", {
        detail: {
          action: isEditing.value ? "updated" : "added",
          ruleId,
          dateGroup: perDateMode.value ? props.selectedDate || void 0 : void 0
        }
      });
      window.dispatchEvent(event);
      resetForm();
    };
    const editGrammar = (rule) => {
      formData.value = {
        title: rule.title,
        category: rule.category,
        level: rule.level,
        formula: rule.formula,
        description: rule.description || "",
        examples: rule.examples.length > 0 ? [...rule.examples] : [""]
      };
      isEditing.value = true;
      editingId.value = rule.id;
    };
    const deleteGrammar = (id) => {
      const rule = grammarRules.value.find((r) => r.id === id);
      if (!rule) return;
      const toastId = toast({
        component: ConfirmToast,
        props: {
          message: t("grammar.manager.confirmDelete", "Are you sure you want to delete this grammar rule?"),
          confirmText: t("common.delete", "Delete"),
          cancelText: t("common.cancel", "Cancel"),
          onConfirm: () => {
            grammarRules.value = grammarRules.value.filter((rule2) => rule2.id !== id);
            saveToLocalStorage();
            const event = new CustomEvent("grammar-rules-updated", {
              detail: {
                action: "deleted",
                ruleId: id,
                dateGroup: rule.dateGroup
              }
            });
            window.dispatchEvent(event);
            toast.success(t("grammar.manager.ruleDeleted", "Grammar rule deleted successfully"));
            toast.dismiss(toastId);
          },
          onCancel: () => {
            toast.dismiss(toastId);
          }
        }
      }, {
        timeout: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false
      });
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };
    const saveToLocalStorage = () => {
      localStorage.setItem("grammar-rules", JSON.stringify(grammarRules.value));
    };
    const saveToggleState = () => {
      localStorage.setItem("grammar-manager-per-date-mode", JSON.stringify(perDateMode.value));
    };
    const loadToggleState = () => {
      const stored = localStorage.getItem("grammar-manager-per-date-mode");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          perDateMode.value = typeof parsed === "boolean" ? parsed : false;
        } catch (error) {
          console.error("Error loading toggle state:", error);
          perDateMode.value = false;
        }
      }
    };
    const loadFromLocalStorage = () => {
      const stored = localStorage.getItem("grammar-rules");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          grammarRules.value = parsed.map((rule) => ({
            ...rule,
            createdAt: new Date(rule.createdAt),
            updatedAt: new Date(rule.updatedAt)
          }));
        } catch (error) {
          console.error("Error loading grammar rules:", error);
        }
      }
    };
    const handleVocabularyImport = () => {
      console.log("Vocabulary import detected, refreshing grammar rules");
      loadFromLocalStorage();
    };
    onMounted(() => {
      loadFromLocalStorage();
      loadToggleState();
      window.addEventListener("vocabularyImportComplete", handleVocabularyImport);
    });
    onUnmounted(() => {
      window.removeEventListener("vocabularyImportComplete", handleVocabularyImport);
      unlockBodyScroll();
    });
    const lockBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const unlockBodyScroll = () => {
      document.body.style.overflow = "";
    };
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        loadFromLocalStorage();
        lockBodyScroll();
      } else {
        resetForm();
        unlockBodyScroll();
      }
    });
    watch(perDateMode, (newValue) => {
      resetForm();
      filterCategory.value = "";
      saveToggleState();
      if (newValue && !props.selectedDate) {
        console.warn("Per-date mode enabled but no date selected");
      }
    });
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
            props.modelValue ? (openBlock(), createElementBlock("div", _hoisted_1, [
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
                      class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 transform overflow-hidden",
                      onClick: _cache[8] || (_cache[8] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("h3", _hoisted_5, [
                            _cache[9] || (_cache[9] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("grammar.manager.title", "Grammar Manager")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_6, [
                            createBaseVNode("div", _hoisted_7, [
                              createBaseVNode("span", _hoisted_8, toDisplayString(unref(t)("grammar.manager.globalMode", "Global")), 1),
                              createBaseVNode("label", _hoisted_9, [
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => perDateMode.value = $event),
                                  type: "checkbox",
                                  class: "sr-only peer"
                                }, null, 512), [
                                  [vModelCheckbox, perDateMode.value]
                                ]),
                                _cache[10] || (_cache[10] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" }, null, -1))
                              ]),
                              createBaseVNode("span", _hoisted_10, toDisplayString(unref(t)("grammar.manager.perDateMode", "Per Date")), 1)
                            ]),
                            createBaseVNode("button", {
                              onClick: closeModal,
                              class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            }, _cache[11] || (_cache[11] = [
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
                        perDateMode.value ? (openBlock(), createElementBlock("div", _hoisted_11, [
                          createBaseVNode("div", _hoisted_12, [
                            createBaseVNode("p", _hoisted_13, [
                              _cache[12] || (_cache[12] = createBaseVNode("svg", {
                                class: "w-4 h-4 mr-2",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createBaseVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                })
                              ], -1)),
                              createTextVNode(" " + toDisplayString(_ctx.selectedDate ? unref(t)("grammar.manager.perDateDescription", { date: _ctx.selectedDate }) || `Managing grammar rules for date: ${_ctx.selectedDate}` : unref(t)("grammar.manager.noDateSelected") || "No date selected for per-date mode"), 1)
                            ]),
                            _ctx.selectedDate ? (openBlock(), createElementBlock("div", _hoisted_14, [
                              createBaseVNode("button", {
                                onClick: _cache[1] || (_cache[1] = ($event) => showVocabularyDropdown.value = !showVocabularyDropdown.value),
                                class: "flex items-center space-x-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-200 text-sm font-medium"
                              }, [
                                _cache[14] || (_cache[14] = createBaseVNode("svg", {
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createBaseVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                  })
                                ], -1)),
                                createBaseVNode("span", null, toDisplayString(unref(t)("grammar.manager.showVocabulary", "Show Vocabulary")), 1),
                                createBaseVNode("span", _hoisted_15, toDisplayString(vocabulariesForSelectedDate.value.length), 1),
                                (openBlock(), createElementBlock("svg", {
                                  class: normalizeClass(["w-4 h-4 transition-transform duration-200", { "rotate-180": showVocabularyDropdown.value }]),
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, _cache[13] || (_cache[13] = [
                                  createBaseVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M19 9l-7 7-7-7"
                                  }, null, -1)
                                ]), 2))
                              ]),
                              createVNode(Transition, {
                                "enter-active-class": "transition-all duration-300 ease-out",
                                "enter-from-class": "opacity-0 scale-95 translate-y-2",
                                "enter-to-class": "opacity-100 scale-100 translate-y-0",
                                "leave-active-class": "transition-all duration-200 ease-in",
                                "leave-from-class": "opacity-100 scale-100 translate-y-0",
                                "leave-to-class": "opacity-0 scale-95 translate-y-2"
                              }, {
                                default: withCtx(() => [
                                  showVocabularyDropdown.value ? (openBlock(), createElementBlock("div", _hoisted_16, [
                                    createBaseVNode("div", _hoisted_17, [
                                      createBaseVNode("h4", _hoisted_18, [
                                        _cache[15] || (_cache[15] = createBaseVNode("svg", {
                                          class: "w-4 h-4 mr-2 text-green-500",
                                          fill: "none",
                                          stroke: "currentColor",
                                          viewBox: "0 0 24 24"
                                        }, [
                                          createBaseVNode("path", {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            "stroke-width": "2",
                                            d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                          })
                                        ], -1)),
                                        createTextVNode(" " + toDisplayString(unref(t)("grammar.manager.vocabularyForDate", { date: _ctx.selectedDate }) || `Vocabulary for ${_ctx.selectedDate}`), 1)
                                      ])
                                    ]),
                                    vocabulariesForSelectedDate.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_19, toDisplayString(unref(t)("grammar.manager.noVocabularyFound", "No vocabulary found for this date")), 1)) : (openBlock(), createElementBlock("div", _hoisted_20, [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(vocabulariesForSelectedDate.value, (vocab) => {
                                        return openBlock(), createElementBlock("div", {
                                          key: vocab.id,
                                          class: "p-3 hover:bg-gray-50 dark:hover:bg-gray-custom cursor-pointer transition-colors duration-150"
                                        }, [
                                          createBaseVNode("div", _hoisted_21, [
                                            createBaseVNode("div", _hoisted_22, [
                                              createBaseVNode("h5", _hoisted_23, toDisplayString(vocab.word), 1),
                                              createBaseVNode("p", _hoisted_24, toDisplayString(vocab.meaning), 1),
                                              createBaseVNode("div", _hoisted_25, [
                                                createBaseVNode("span", _hoisted_26, toDisplayString(unref(getTopicName)(vocab.category)), 1),
                                                createBaseVNode("span", _hoisted_27, toDisplayString(vocab.level), 1)
                                              ])
                                            ])
                                          ])
                                        ]);
                                      }), 128))
                                    ]))
                                  ])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ])) : createCommentVNode("", true)
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_28, [
                        createBaseVNode("div", _hoisted_29, [
                          createBaseVNode("h4", _hoisted_30, [
                            _cache[16] || (_cache[16] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                            createTextVNode(" " + toDisplayString(isEditing.value ? unref(t)("grammar.manager.editGrammar", "Edit Grammar Rule") : unref(t)("grammar.manager.addNew", "Add New Grammar Rule")), 1)
                          ]),
                          createBaseVNode("form", {
                            onSubmit: withModifiers(submitForm, ["prevent"]),
                            class: "space-y-4"
                          }, [
                            createBaseVNode("div", _hoisted_31, [
                              createBaseVNode("label", _hoisted_32, [
                                _cache[17] || (_cache[17] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("grammar.manager.title", "Title")) + " ", 1),
                                _cache[18] || (_cache[18] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.value.title = $event),
                                type: "text",
                                required: "",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("grammar.manager.titlePlaceholder", "e.g., Present Perfect Tense")
                              }, null, 8, _hoisted_33), [
                                [vModelText, formData.value.title]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_34, [
                              createBaseVNode("label", _hoisted_35, [
                                _cache[19] || (_cache[19] = createBaseVNode("span", { class: "w-1 h-4 bg-purple-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("grammar.manager.category", "Category")) + " ", 1),
                                _cache[20] || (_cache[20] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              withDirectives(createBaseVNode("select", {
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.value.category = $event),
                                required: "",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02] cursor-pointer"
                              }, [
                                createBaseVNode("option", _hoisted_36, toDisplayString(unref(t)("grammar.manager.selectCategory", "Select Category")), 1),
                                createBaseVNode("option", _hoisted_37, toDisplayString(unref(t)("grammar.categories.tenses", "Tenses")), 1),
                                createBaseVNode("option", _hoisted_38, toDisplayString(unref(t)("grammar.categories.conditionals", "Conditionals")), 1),
                                createBaseVNode("option", _hoisted_39, toDisplayString(unref(t)("grammar.categories.passive", "Passive Voice")), 1),
                                createBaseVNode("option", _hoisted_40, toDisplayString(unref(t)("grammar.categories.modals", "Modal Verbs")), 1),
                                createBaseVNode("option", _hoisted_41, toDisplayString(unref(t)("grammar.categories.articles", "Articles")), 1),
                                createBaseVNode("option", _hoisted_42, toDisplayString(unref(t)("grammar.categories.prepositions", "Prepositions")), 1),
                                createBaseVNode("option", _hoisted_43, toDisplayString(unref(t)("grammar.categories.conjunctions", "Conjunctions")), 1),
                                createBaseVNode("option", _hoisted_44, toDisplayString(unref(t)("grammar.categories.other", "Other")), 1)
                              ], 512), [
                                [vModelSelect, formData.value.category]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_45, [
                              createBaseVNode("label", _hoisted_46, [
                                _cache[21] || (_cache[21] = createBaseVNode("span", { class: "w-1 h-4 bg-orange-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("grammar.manager.level", "Level")) + " ", 1),
                                _cache[22] || (_cache[22] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              withDirectives(createBaseVNode("select", {
                                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => formData.value.level = $event),
                                required: "",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02] cursor-pointer"
                              }, [
                                createBaseVNode("option", _hoisted_47, toDisplayString(unref(t)("grammar.manager.selectLevel", "Select Level")), 1),
                                createBaseVNode("option", _hoisted_48, toDisplayString(unref(t)("grammar.levels.beginner", "Beginner")), 1),
                                createBaseVNode("option", _hoisted_49, toDisplayString(unref(t)("grammar.levels.intermediate", "Intermediate")), 1),
                                createBaseVNode("option", _hoisted_50, toDisplayString(unref(t)("grammar.levels.advanced", "Advanced")), 1)
                              ], 512), [
                                [vModelSelect, formData.value.level]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_51, [
                              createBaseVNode("label", _hoisted_52, [
                                _cache[23] || (_cache[23] = createBaseVNode("span", { class: "w-1 h-4 bg-yellow-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("grammar.manager.formula", "Grammar Formula")) + " ", 1),
                                _cache[24] || (_cache[24] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              createBaseVNode("div", _hoisted_53, [
                                withDirectives(createBaseVNode("textarea", {
                                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => formData.value.formula = $event),
                                  required: "",
                                  rows: "3",
                                  class: "w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02] resize-none",
                                  placeholder: unref(t)("grammar.manager.formulaPlaceholder", "e.g., Subject + have/has + past participle + <br> or </br> for line break")
                                }, null, 8, _hoisted_54), [
                                  [vModelText, formData.value.formula]
                                ]),
                                formData.value.formula.trim() ? (openBlock(), createElementBlock("div", _hoisted_55, [
                                  createBaseVNode("div", _hoisted_56, toDisplayString(unref(t)("grammar.manager.preview", "Preview")) + ":", 1),
                                  createBaseVNode("div", {
                                    class: "text-gray-900 dark:text-white",
                                    innerHTML: formulaPreview.value
                                  }, null, 8, _hoisted_57)
                                ])) : createCommentVNode("", true)
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_58, [
                              createBaseVNode("label", _hoisted_59, [
                                _cache[25] || (_cache[25] = createBaseVNode("span", { class: "w-1 h-4 bg-teal-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("grammar.manager.description", "Description")), 1)
                              ]),
                              createBaseVNode("div", _hoisted_60, [
                                withDirectives(createBaseVNode("textarea", {
                                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => formData.value.description = $event),
                                  rows: "3",
                                  class: "w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 dark:hover:border-teal-500 transform hover:scale-[1.02] resize-none",
                                  placeholder: unref(t)("grammar.manager.descriptionPlaceholder", "Explain when and how to use this grammar rule + <br> or </br> for line break")
                                }, null, 8, _hoisted_61), [
                                  [vModelText, formData.value.description]
                                ]),
                                formData.value.description.trim() ? (openBlock(), createElementBlock("div", _hoisted_62, [
                                  createBaseVNode("div", _hoisted_63, toDisplayString(unref(t)("grammar.manager.preview", "Preview")) + ":", 1),
                                  createBaseVNode("div", {
                                    class: "text-gray-900 dark:text-white",
                                    innerHTML: descriptionPreview.value
                                  }, null, 8, _hoisted_64)
                                ])) : createCommentVNode("", true)
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_65, [
                              createBaseVNode("label", _hoisted_66, [
                                _cache[26] || (_cache[26] = createBaseVNode("span", { class: "w-1 h-4 bg-pink-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("grammar.manager.examples", "Examples")), 1)
                              ]),
                              createBaseVNode("div", _hoisted_67, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(formData.value.examples, (example, index) => {
                                  return openBlock(), createElementBlock("div", {
                                    key: index,
                                    class: "flex items-center space-x-2"
                                  }, [
                                    withDirectives(createBaseVNode("input", {
                                      "onUpdate:modelValue": ($event) => formData.value.examples[index] = $event,
                                      type: "text",
                                      class: "flex-1 px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500 transform hover:scale-[1.02]",
                                      placeholder: unref(t)("grammar.manager.examplePlaceholder", "e.g., I have finished my homework.")
                                    }, null, 8, _hoisted_68), [
                                      [vModelText, formData.value.examples[index]]
                                    ]),
                                    createBaseVNode("button", {
                                      type: "button",
                                      onClick: ($event) => removeExample(index),
                                      class: "text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-110"
                                    }, _cache[27] || (_cache[27] = [
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
                                          d: "M6 18L18 6M6 6l12 12"
                                        })
                                      ], -1)
                                    ]), 8, _hoisted_69)
                                  ]);
                                }), 128)),
                                createBaseVNode("button", {
                                  type: "button",
                                  onClick: addExample,
                                  class: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-all duration-300 hover:scale-105"
                                }, " + " + toDisplayString(unref(t)("grammar.manager.addExample", "Add Example")), 1)
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_70, [
                              createBaseVNode("button", {
                                type: "button",
                                onClick: resetForm,
                                class: "px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                              }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                              createBaseVNode("button", _hoisted_71, toDisplayString(isEditing.value ? unref(t)("common.update", "Update") : unref(t)("common.add", "Add")), 1)
                            ])
                          ], 32)
                        ]),
                        createBaseVNode("div", _hoisted_72, [
                          createBaseVNode("div", _hoisted_73, [
                            createBaseVNode("h4", _hoisted_74, [
                              _cache[28] || (_cache[28] = createBaseVNode("span", { class: "w-1 h-4 bg-indigo-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("grammar.manager.existingRules", "Grammar Rules")), 1)
                            ]),
                            withDirectives(createBaseVNode("select", {
                              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => filterCategory.value = $event),
                              class: "px-3 py-1 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer"
                            }, [
                              createBaseVNode("option", _hoisted_75, toDisplayString(unref(t)("common.all", "All Categories")), 1),
                              createBaseVNode("option", _hoisted_76, toDisplayString(unref(t)("grammar.categories.tenses", "Tenses")), 1),
                              createBaseVNode("option", _hoisted_77, toDisplayString(unref(t)("grammar.categories.conditionals", "Conditionals")), 1),
                              createBaseVNode("option", _hoisted_78, toDisplayString(unref(t)("grammar.categories.passive", "Passive Voice")), 1),
                              createBaseVNode("option", _hoisted_79, toDisplayString(unref(t)("grammar.categories.modals", "Modal Verbs")), 1),
                              createBaseVNode("option", _hoisted_80, toDisplayString(unref(t)("grammar.categories.articles", "Articles")), 1),
                              createBaseVNode("option", _hoisted_81, toDisplayString(unref(t)("grammar.categories.prepositions", "Prepositions")), 1),
                              createBaseVNode("option", _hoisted_82, toDisplayString(unref(t)("grammar.categories.conjunctions", "Conjunctions")), 1),
                              createBaseVNode("option", _hoisted_83, toDisplayString(unref(t)("grammar.categories.other", "Other")), 1)
                            ], 512), [
                              [vModelSelect, filterCategory.value]
                            ])
                          ]),
                          filteredGrammarRules.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_84, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredGrammarRules.value, (rule, index) => {
                              return openBlock(), createElementBlock("div", {
                                key: rule.id,
                                class: "p-4 border border-gray-200 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-mute animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                                style: normalizeStyle(`animation-delay: ${1 + index * 0.1}s`)
                              }, [
                                createBaseVNode("div", _hoisted_85, [
                                  createBaseVNode("div", _hoisted_86, [
                                    createBaseVNode("div", _hoisted_87, [
                                      createBaseVNode("h5", _hoisted_88, toDisplayString(rule.title), 1),
                                      createBaseVNode("span", _hoisted_89, toDisplayString(unref(t)(`grammar.categories.${rule.category}`, rule.category)), 1),
                                      createBaseVNode("span", _hoisted_90, toDisplayString(unref(t)(`grammar.levels.${rule.level}`, rule.level)), 1)
                                    ]),
                                    createBaseVNode("div", _hoisted_91, [
                                      createBaseVNode("p", _hoisted_92, toDisplayString(unref(t)("grammar.manager.formula", "Formula")) + ": ", 1),
                                      createBaseVNode("div", {
                                        class: "text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-[#0a0a0a] p-2 rounded",
                                        innerHTML: renderHtmlContent(rule.formula)
                                      }, null, 8, _hoisted_93)
                                    ]),
                                    rule.description ? (openBlock(), createElementBlock("div", _hoisted_94, [
                                      createBaseVNode("div", {
                                        class: "text-sm text-gray-600 dark:text-gray-400",
                                        innerHTML: renderHtmlContent(rule.description)
                                      }, null, 8, _hoisted_95)
                                    ])) : createCommentVNode("", true),
                                    rule.examples && rule.examples.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_96, [
                                      createBaseVNode("p", _hoisted_97, toDisplayString(unref(t)("grammar.manager.examples", "Examples")) + ": ", 1),
                                      createBaseVNode("ul", _hoisted_98, [
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(rule.examples, (example) => {
                                          return openBlock(), createElementBlock("li", {
                                            key: example,
                                            class: "flex items-start justify-between"
                                          }, [
                                            createBaseVNode("div", _hoisted_99, [
                                              _cache[29] || (_cache[29] = createBaseVNode("span", { class: "text-gray-400 mr-2 mt-0.5" }, "•", -1)),
                                              createBaseVNode("span", _hoisted_100, toDisplayString(example), 1)
                                            ]),
                                            createBaseVNode("button", {
                                              onClick: ($event) => playExampleAudio(example),
                                              disabled: isPlayingAudio.value === example,
                                              class: normalizeClass(["ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-colors duration-200 flex-shrink-0", {
                                                "text-blue-500 dark:text-blue-400": isPlayingAudio.value !== example,
                                                "text-orange-500 dark:text-orange-400 animate-pulse": isPlayingAudio.value === example
                                              }]),
                                              title: unref(t)("grammar.examples.playAudio", "Play example audio")
                                            }, [
                                              isPlayingAudio.value !== example ? (openBlock(), createElementBlock("svg", _hoisted_102, _cache[30] || (_cache[30] = [
                                                createBaseVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  "stroke-width": "2",
                                                  d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10l4-4v12l-4-4H3a1 1 0 01-1-1v-2a1 1 0 011-1h3z"
                                                }, null, -1)
                                              ]))) : (openBlock(), createElementBlock("svg", _hoisted_103, _cache[31] || (_cache[31] = [
                                                createBaseVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  "stroke-width": "2",
                                                  d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                                }, null, -1)
                                              ])))
                                            ], 10, _hoisted_101)
                                          ]);
                                        }), 128))
                                      ])
                                    ])) : createCommentVNode("", true),
                                    createBaseVNode("p", _hoisted_104, toDisplayString(unref(t)("grammar.manager.createdAt", "Created")) + ": " + toDisplayString(formatDate(rule.createdAt)), 1)
                                  ]),
                                  createBaseVNode("div", _hoisted_105, [
                                    createBaseVNode("button", {
                                      onClick: ($event) => editGrammar(rule),
                                      class: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110",
                                      title: unref(t)("common.edit", "Edit")
                                    }, _cache[32] || (_cache[32] = [
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
                                    ]), 8, _hoisted_106),
                                    createBaseVNode("button", {
                                      onClick: ($event) => deleteGrammar(rule.id),
                                      class: "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-110",
                                      title: unref(t)("common.delete", "Delete")
                                    }, _cache[33] || (_cache[33] = [
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
                                          d: "M19 7l-.867 12.142A2 2 0 0016.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        })
                                      ], -1)
                                    ]), 8, _hoisted_107)
                                  ])
                                ])
                              ], 4);
                            }), 128))
                          ])) : (openBlock(), createElementBlock("div", _hoisted_108, [
                            _cache[34] || (_cache[34] = createBaseVNode("svg", {
                              class: "w-12 h-12 text-gray-400 mx-auto mb-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              })
                            ], -1)),
                            createBaseVNode("p", _hoisted_109, toDisplayString(unref(t)("grammar.manager.noRules", "No grammar rules found")), 1)
                          ]))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_110, [
                        createBaseVNode("div", _hoisted_111, [
                          createBaseVNode("button", {
                            onClick: closeModal,
                            class: "px-4 py-2 bg-gray-100 dark:bg-dark-bg-mute hover:bg-gray-200 dark:hover:bg-dark-bg-soft text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                          }, toDisplayString(unref(t)("common.close", "Close")), 1)
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
        })
      ]);
    };
  }
});
const GrammarManagerModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cbcef1c1"]]);
export {
  GrammarManagerModal as default
};
//# sourceMappingURL=GrammarManagerModal-DeWznyQr.js.map
