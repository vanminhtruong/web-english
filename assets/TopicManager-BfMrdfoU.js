import { d as defineComponent, H as useI18n, A as ref, B as computed, I as onMounted, L as onUnmounted, K as watch, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, M as Transition, f as createBaseVNode, t as toDisplayString, u as unref, g as createTextVNode, C as withDirectives, S as vModelText, F as Fragment, j as renderList, a as normalizeStyle, i as withModifiers } from "./vendor-DoTKyHPB.js";
import { a as _export_sfc } from "./index-BXPgUbOe.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-hidden" };
const _hoisted_3 = { class: "flex flex-col sm:flex-row sm:items-start sm:justify-between p-4 sm:p-6 md:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700 space-y-4 sm:space-y-0 sm:space-x-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex-1 min-w-0" };
const _hoisted_5 = { class: "text-base sm:text-lg md:text-2xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-2 flex items-center space-x-2" };
const _hoisted_6 = { class: "text-sm sm:text-base md:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed pr-0 sm:pr-4" };
const _hoisted_7 = { class: "p-4 sm:p-6 md:p-6 lg:p-8 max-h-[calc(90vh-140px)] overflow-y-auto" };
const _hoisted_8 = {
  class: "mb-4 sm:mb-6 md:mb-5 lg:mb-6 p-3 sm:p-4 md:p-4 lg:p-5 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg animate-fade-in-up",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_9 = { class: "text-base sm:text-lg md:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-3 lg:mb-4 flex items-center" };
const _hoisted_10 = { class: "space-y-4 sm:space-y-4 md:space-y-3 lg:space-y-4" };
const _hoisted_11 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_12 = { class: "block text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_13 = ["disabled", "placeholder"];
const _hoisted_14 = { class: "mt-1 text-xs md:text-xs lg:text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_15 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4 md:gap-3 lg:gap-4" };
const _hoisted_16 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_17 = { class: "block text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_18 = ["placeholder"];
const _hoisted_19 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_20 = { class: "block text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_21 = ["placeholder"];
const _hoisted_22 = {
  class: "flex gap-3 sm:gap-4 md:gap-3 lg:gap-4 animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_23 = ["disabled"];
const _hoisted_24 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_25 = { class: "text-base sm:text-lg md:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-3 lg:mb-4 flex items-center" };
const _hoisted_26 = {
  key: 0,
  class: "text-center py-6 sm:py-8 md:py-6 lg:py-8 text-sm md:text-sm lg:text-base text-gray-500 dark:text-gray-400"
};
const _hoisted_27 = {
  key: 1,
  class: "space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
};
const _hoisted_28 = { class: "flex-1" };
const _hoisted_29 = { class: "flex items-center gap-4 sm:gap-4 mb-2" };
const _hoisted_30 = { class: "px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded" };
const _hoisted_31 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_32 = { class: "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-sm" };
const _hoisted_33 = { class: "flex gap-3 sm:gap-4 ml-4" };
const _hoisted_34 = ["onClick", "title"];
const _hoisted_35 = ["onClick", "disabled", "title"];
const _hoisted_36 = {
  class: "mt-6 animate-fade-in-up",
  style: { "animation-delay": "0.8s" }
};
const _hoisted_37 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center" };
const _hoisted_38 = { class: "text-sm text-gray-600 dark:text-gray-400 mb-4" };
const _hoisted_39 = { class: "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800" };
const _hoisted_40 = { class: "flex-1" };
const _hoisted_41 = { class: "flex items-center gap-3 mb-1" };
const _hoisted_42 = { class: "px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded" };
const _hoisted_43 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_44 = { class: "grid grid-cols-1 gap-1 text-sm" };
const _hoisted_45 = { class: "ml-4" };
const _hoisted_46 = { class: "px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded" };
const _hoisted_47 = { class: "flex justify-end p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_48 = { class: "flex gap-3" };
const _hoisted_49 = { class: "p-6" };
const _hoisted_50 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center" };
const _hoisted_51 = { class: "text-gray-600 dark:text-gray-300 mb-6" };
const _hoisted_52 = { class: "flex gap-3 justify-end" };
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
    const customTopics = ref([]);
    const editingTopic = ref(null);
    const topicToDelete = ref(null);
    const newTopic = ref({
      key: "",
      vi: "",
      en: ""
    });
    const canSaveTopic = computed(() => {
      return newTopic.value.key.trim() && newTopic.value.vi.trim() && newTopic.value.en.trim();
    });
    const builtInTopics = computed(() => {
      return [
        { key: "technology", vi: "Công nghệ", en: "Technology" },
        { key: "business", vi: "Kinh doanh", en: "Business" },
        { key: "travel", vi: "Du lịch", en: "Travel" },
        { key: "food", vi: "Ẩm thực", en: "Food" },
        { key: "health", vi: "Sức khỏe", en: "Health" },
        { key: "education", vi: "Giáo dục", en: "Education" },
        { key: "sports", vi: "Thể thao", en: "Sports" },
        { key: "entertainment", vi: "Giải trí", en: "Entertainment" },
        { key: "science", vi: "Khoa học", en: "Science" },
        { key: "art", vi: "Nghệ thuật", en: "Art" },
        { key: "music", vi: "Âm nhạc", en: "Music" },
        { key: "literature", vi: "Văn học", en: "Literature" },
        { key: "politics", vi: "Chính trị", en: "Politics" },
        { key: "environment", vi: "Môi trường", en: "Environment" },
        { key: "fashion", vi: "Thời trang", en: "Fashion" },
        { key: "finance", vi: "Tài chính", en: "Finance" }
      ];
    });
    const showDeleteModal = computed(() => {
      console.log("showDeleteModal computed - topicToDelete:", topicToDelete.value);
      return !!topicToDelete.value;
    });
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
    const saveTopic = () => {
      if (!canSaveTopic.value) return;
      const topic = {
        key: newTopic.value.key.toLowerCase().replace(/\s+/g, "_"),
        vi: newTopic.value.vi.trim(),
        en: newTopic.value.en.trim()
      };
      if (editingTopic.value) {
        const index = customTopics.value.findIndex((t2) => t2.key === editingTopic.value.key);
        if (index !== -1) {
          const oldKey = customTopics.value[index].key;
          customTopics.value[index] = topic;
          saveCustomTopics();
          emit("topic-updated", oldKey, topic);
          notifyTopicsUpdated();
        }
        editingTopic.value = null;
      } else {
        if (customTopics.value.find((t2) => t2.key === topic.key)) {
          alert(t("vocabulary.topicManager.duplicateKey"));
          return;
        }
        customTopics.value.push(topic);
        saveCustomTopics();
        emit("topic-added", topic);
        notifyTopicsUpdated();
      }
      newTopic.value = { key: "", vi: "", en: "" };
    };
    const editTopic = (topic) => {
      editingTopic.value = { ...topic };
      newTopic.value = { ...topic };
    };
    const cancelEdit = () => {
      editingTopic.value = null;
      newTopic.value = { key: "", vi: "", en: "" };
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
      const index = customTopics.value.findIndex((t2) => t2.key === topicToDelete.value.key);
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
    const notifyTopicsUpdated = () => {
      window.dispatchEvent(new CustomEvent("topics-updated"));
      console.log("Topics updated, dispatching topics-updated event");
    };
    const getTopicUsageCount = (key) => {
      return props.vocabularyUsage[key] || 0;
    };
    const closeDialog = () => {
      emit("update:modelValue", false);
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
        en: "Test Topic"
      };
      console.log("Test topic set:", topicToDelete.value);
    };
    onMounted(() => {
      if (props.modelValue) {
        loadCustomTopics();
        document.body.style.overflow = "hidden";
      }
    });
    onUnmounted(() => {
      document.body.style.overflow = "";
    });
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        document.body.style.overflow = "hidden";
        loadCustomTopics();
      } else {
        document.body.style.overflow = "";
        editingTopic.value = null;
        newTopic.value = { key: "", vi: "", en: "" };
        topicToDelete.value = null;
      }
    }, { immediate: true });
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
                          _cache[6] || (_cache[6] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                          createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.topicManager.title", "Topic Manager")), 1)
                        ]),
                        createBaseVNode("p", _hoisted_6, " The system has " + toDisplayString(builtInTopics.value.length) + " built-in topics like Technology, Business, Travel... You can add custom topics here. ", 1)
                      ]),
                      createBaseVNode("button", {
                        onClick: closeDialog,
                        class: "self-end sm:self-start flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      }, _cache[7] || (_cache[7] = [
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
                    createBaseVNode("div", _hoisted_7, [
                      createBaseVNode("div", _hoisted_8, [
                        createBaseVNode("h3", _hoisted_9, [
                          _cache[8] || (_cache[8] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(editingTopic.value ? unref(t)("vocabulary.topicManager.editTopic", "Edit Topic") : unref(t)("vocabulary.topicManager.addNewTopic", "Add New Topic")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_10, [
                          createBaseVNode("div", _hoisted_11, [
                            createBaseVNode("label", _hoisted_12, [
                              _cache[9] || (_cache[9] = createBaseVNode("span", { class: "w-1 h-3 bg-green-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.topicManager.topicKey", "Topic Key")), 1)
                            ]),
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => newTopic.value.key = $event),
                              disabled: editingTopic.value !== null,
                              type: "text",
                              placeholder: unref(t)("vocabulary.topicManager.topicKeyPlaceholder", "e.g., technology, business, travel"),
                              class: "w-full px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm md:text-sm lg:text-base focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]"
                            }, null, 8, _hoisted_13), [
                              [vModelText, newTopic.value.key]
                            ]),
                            createBaseVNode("p", _hoisted_14, toDisplayString(unref(t)("vocabulary.topicManager.keyDescription", "Unique identifier for this topic (lowercase, no spaces)")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_15, [
                            createBaseVNode("div", _hoisted_16, [
                              createBaseVNode("label", _hoisted_17, [
                                _cache[10] || (_cache[10] = createBaseVNode("span", { class: "w-1 h-3 bg-purple-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.topicManager.vietnameseName", "Vietnamese Name")), 1)
                              ]),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => newTopic.value.vi = $event),
                                type: "text",
                                placeholder: unref(t)("vocabulary.topicManager.vietnameseNamePlaceholder", "Tên tiếng Việt"),
                                class: "w-full px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm md:text-sm lg:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02]"
                              }, null, 8, _hoisted_18), [
                                [vModelText, newTopic.value.vi]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_19, [
                              createBaseVNode("label", _hoisted_20, [
                                _cache[11] || (_cache[11] = createBaseVNode("span", { class: "w-1 h-3 bg-orange-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.topicManager.englishName", "English Name")), 1)
                              ]),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => newTopic.value.en = $event),
                                type: "text",
                                placeholder: unref(t)("vocabulary.topicManager.englishNamePlaceholder", "English name"),
                                class: "w-full px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm md:text-sm lg:text-base focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02]"
                              }, null, 8, _hoisted_21), [
                                [vModelText, newTopic.value.en]
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_22, [
                            createBaseVNode("button", {
                              onClick: saveTopic,
                              disabled: !canSaveTopic.value,
                              class: "px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white text-sm md:text-sm lg:text-base rounded-lg transition-all duration-300 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg font-medium"
                            }, toDisplayString(editingTopic.value ? unref(t)("common.update", "Update") : unref(t)("common.add", "Add")), 9, _hoisted_23),
                            editingTopic.value ? (openBlock(), createElementBlock("button", {
                              key: 0,
                              onClick: cancelEdit,
                              class: "px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm md:text-sm lg:text-base rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                            }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1)) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_24, [
                        createBaseVNode("h3", _hoisted_25, [
                          _cache[12] || (_cache[12] = createBaseVNode("span", { class: "w-1 h-4 bg-indigo-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.topicManager.existingTopics", "Custom Topics")), 1)
                        ]),
                        customTopics.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_26, toDisplayString(unref(t)("vocabulary.topicManager.noCustomTopics", "No custom topics created yet")), 1)) : (openBlock(), createElementBlock("div", _hoisted_27, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(customTopics.value, (topic, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: topic.key,
                              class: "flex items-center justify-between p-3 sm:p-4 md:p-3 lg:p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up",
                              style: normalizeStyle({ animationDelay: `${0.7 + index * 0.1}s` })
                            }, [
                              createBaseVNode("div", _hoisted_28, [
                                createBaseVNode("div", _hoisted_29, [
                                  createBaseVNode("span", _hoisted_30, toDisplayString(topic.key), 1),
                                  createBaseVNode("span", _hoisted_31, " (" + toDisplayString(getTopicUsageCount(topic.key)) + " " + toDisplayString(unref(t)("vocabulary.words", "words")) + ") ", 1)
                                ]),
                                createBaseVNode("div", _hoisted_32, [
                                  createBaseVNode("div", null, [
                                    _cache[13] || (_cache[13] = createBaseVNode("span", { class: "font-medium" }, "VI:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.vi), 1)
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[14] || (_cache[14] = createBaseVNode("span", { class: "font-medium" }, "EN:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.en), 1)
                                  ])
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_33, [
                                createBaseVNode("button", {
                                  onClick: ($event) => editTopic(topic),
                                  class: "p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-300 hover:scale-110",
                                  title: unref(t)("common.edit", "Edit")
                                }, _cache[15] || (_cache[15] = [
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
                                ]), 8, _hoisted_34),
                                createBaseVNode("button", {
                                  onClick: ($event) => confirmDeleteTopic(topic),
                                  disabled: getTopicUsageCount(topic.key) > 0,
                                  class: "p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-300 hover:scale-110 disabled:text-gray-400 disabled:cursor-not-allowed",
                                  title: getTopicUsageCount(topic.key) > 0 ? unref(t)("vocabulary.topicManager.cannotDeleteInUse", "Cannot delete topic in use") : unref(t)("common.delete", "Delete")
                                }, _cache[16] || (_cache[16] = [
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
                                ]), 8, _hoisted_35)
                              ])
                            ], 4);
                          }), 128))
                        ]))
                      ]),
                      createBaseVNode("div", _hoisted_36, [
                        createBaseVNode("h3", _hoisted_37, [
                          _cache[17] || (_cache[17] = createBaseVNode("span", { class: "w-1 h-4 bg-teal-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.topicManager.builtInTopics", "Built-in Topics")), 1)
                        ]),
                        createBaseVNode("p", _hoisted_38, toDisplayString(unref(t)("vocabulary.topicManager.builtInTopicsDescription", "These are system-provided topics that cannot be modified")), 1),
                        createBaseVNode("div", _hoisted_39, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(builtInTopics.value, (topic, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: topic.key,
                              class: "flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up",
                              style: normalizeStyle({ animationDelay: `${0.9 + index * 0.05}s` })
                            }, [
                              createBaseVNode("div", _hoisted_40, [
                                createBaseVNode("div", _hoisted_41, [
                                  createBaseVNode("span", _hoisted_42, toDisplayString(topic.key), 1),
                                  createBaseVNode("span", _hoisted_43, " (" + toDisplayString(getTopicUsageCount(topic.key)) + " " + toDisplayString(unref(t)("vocabulary.words", "words")) + ") ", 1)
                                ]),
                                createBaseVNode("div", _hoisted_44, [
                                  createBaseVNode("div", null, [
                                    _cache[18] || (_cache[18] = createBaseVNode("span", { class: "font-medium" }, "VI:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.vi), 1)
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[19] || (_cache[19] = createBaseVNode("span", { class: "font-medium" }, "EN:", -1)),
                                    createTextVNode(" " + toDisplayString(topic.en), 1)
                                  ])
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_45, [
                                createBaseVNode("span", _hoisted_46, toDisplayString(unref(t)("vocabulary.topicManager.builtIn", "Built-in")), 1)
                              ])
                            ], 4);
                          }), 128))
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_47, [
                      createBaseVNode("div", _hoisted_48, [
                        createBaseVNode("button", {
                          onClick: reloadCustomTopics,
                          class: "px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-sm"
                        }, " Reload "),
                        createBaseVNode("button", {
                          onClick: testDeleteModal,
                          class: "px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-sm"
                        }, " Test Modal "),
                        createBaseVNode("button", {
                          onClick: clearAllCustomTopics,
                          class: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-sm"
                        }, " Clear All "),
                        createBaseVNode("button", {
                          onClick: closeDialog,
                          class: "px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                        }, toDisplayString(unref(t)("common.finish", "Finish")), 1)
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
        createVNode(Transition, {
          "enter-active-class": "transition-all duration-300 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-all duration-200 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            showDeleteModal.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm",
              onClick: _cache[5] || (_cache[5] = withModifiers(($event) => topicToDelete.value = null, ["self"]))
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
                    onClick: _cache[4] || (_cache[4] = withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    createBaseVNode("div", _hoisted_49, [
                      createBaseVNode("h3", _hoisted_50, [
                        _cache[20] || (_cache[20] = createBaseVNode("span", { class: "w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" }, null, -1)),
                        createTextVNode(" " + toDisplayString(unref(t)("vocabulary.topicManager.confirmDeleteTitle", "Confirm Delete")), 1)
                      ]),
                      createBaseVNode("p", _hoisted_51, toDisplayString(unref(t)("vocabulary.topicManager.confirmDeleteMessage", { topic: topicToDelete.value?.vi || topicToDelete.value?.en || "this topic" }, `Are you sure you want to delete "${topicToDelete.value?.vi || topicToDelete.value?.en || "this topic"}"?`)), 1),
                      createBaseVNode("div", _hoisted_52, [
                        createBaseVNode("button", {
                          onClick: _cache[3] || (_cache[3] = ($event) => topicToDelete.value = null),
                          class: "px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                        }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                        createBaseVNode("button", {
                          onClick: deleteTopic,
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
const TopicManager = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-57e95f37"]]);
export {
  TopicManager as default
};
//# sourceMappingURL=TopicManager-BfMrdfoU.js.map
