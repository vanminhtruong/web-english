const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/VocabularyCard-nz80pLr1.js","assets/vendor-DoTKyHPB.js","assets/index-BClbihy6.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-W_m8ZO3y.css","assets/VocabularyCard-BJpZ1tLY.css","assets/DateGroupAccordion-Buf0VRDs.js","assets/DateGroupAccordion-Bh4wo0Gs.css"])))=>i.map(i=>d[i]);
import { g as getTopicName, b as groupVocabulariesByDateAndTopic, l as loadComponentSafely, _ as __vitePreload } from "./index-BClbihy6.js";
import { d as defineComponent, H as useI18n, A as ref, I as onMounted, B as computed, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, t as toDisplayString, u as unref, F as Fragment, j as renderList, g as createTextVNode, b as createBlock, D as defineAsyncComponent, n as normalizeClass, q as nextTick } from "./vendor-DoTKyHPB.js";
import { u as useToast } from "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 border-b border-gray-200 dark:border-gray-700" };
const _hoisted_2 = { class: "flex items-center justify-between" };
const _hoisted_3 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" };
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = { class: "text-sm font-semibold mb-2" };
const _hoisted_6 = {
  key: 0,
  class: "text-sm text-gray-600 dark:text-white/70"
};
const _hoisted_7 = {
  key: 1,
  class: "max-h-64 overflow-y-auto space-y-2 pr-1"
};
const _hoisted_8 = { class: "text-xs font-medium text-gray-700 mb-1 dark:text-white/80" };
const _hoisted_9 = { class: "font-semibold" };
const _hoisted_10 = { class: "text-xs pl-0 space-y-0.5" };
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { class: "min-w-0 pr-2" };
const _hoisted_13 = { class: "font-medium" };
const _hoisted_14 = { class: "truncate" };
const _hoisted_15 = { class: "text-gray-500 whitespace-nowrap" };
const _hoisted_16 = { key: 0 };
const _hoisted_17 = {
  key: 0,
  class: "bg-white dark:bg-[#0a0a0a] px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6"
};
const _hoisted_18 = { class: "flex items-center justify-between" };
const _hoisted_19 = { class: "flex-1 flex justify-between sm:hidden" };
const _hoisted_20 = ["disabled"];
const _hoisted_21 = ["disabled"];
const _hoisted_22 = { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" };
const _hoisted_23 = { class: "text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_24 = { class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px" };
const _hoisted_25 = ["disabled"];
const _hoisted_26 = { class: "sr-only" };
const _hoisted_27 = ["onClick", "disabled"];
const _hoisted_28 = ["disabled"];
const _hoisted_29 = { class: "sr-only" };
const _hoisted_30 = {
  key: 1,
  class: "divide-y divide-gray-200 dark:divide-gray-700"
};
const _hoisted_31 = {
  key: 2,
  class: "bg-white dark:bg-[#0a0a0a] px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6"
};
const _hoisted_32 = { class: "flex items-center justify-between" };
const _hoisted_33 = { class: "flex-1 flex justify-between sm:hidden" };
const _hoisted_34 = ["disabled"];
const _hoisted_35 = ["disabled"];
const _hoisted_36 = { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" };
const _hoisted_37 = { class: "text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_38 = { class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px" };
const _hoisted_39 = ["disabled"];
const _hoisted_40 = { class: "sr-only" };
const _hoisted_41 = ["onClick"];
const _hoisted_42 = ["disabled"];
const _hoisted_43 = { class: "sr-only" };
const ACCORDION_STATE_STORAGE_KEY = "vocabulary-accordion-state";
const PENDING_OPEN_KEY = "open-date-topic-pending";
const dateGroupsPerPage = 7;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyList",
  props: {
    paginatedWords: {},
    currentPage: {},
    totalPages: {},
    totalCount: {},
    startIndex: {},
    endIndex: {},
    visiblePages: {},
    useGrouping: { type: Boolean },
    allWords: {},
    dateGroupPages: {},
    itemsPerPageGrouped: {},
    hoverToExpandEnabled: { type: Boolean },
    globalMoveMode: { type: Boolean },
    recentlyAddedCategory: {}
  },
  emits: ["play-audio", "edit-word", "delete-word", "toggle-favorite", "view-details", "previous-page", "next-page", "go-to-page", "date-group-previous", "date-group-next", "date-group-go-to-page", "accordion-toggle", "open-note-dialog", "open-add-vocabulary-dialog", "open-grammar-manager", "move-vocabulary", "batch-move-category"],
  setup(__props, { emit: __emit }) {
    const { t, locale } = useI18n();
    const toast = useToast();
    const showMissingTooltip = ref(false);
    let missingTooltipHideTimer = null;
    const handleMissingTooltipEnter = () => {
      if (missingTooltipHideTimer) {
        clearTimeout(missingTooltipHideTimer);
        missingTooltipHideTimer = null;
      }
      showMissingTooltip.value = true;
    };
    const handleMissingTooltipLeave = () => {
      missingTooltipHideTimer = setTimeout(() => {
        showMissingTooltip.value = false;
        missingTooltipHideTimer = null;
      }, 120);
    };
    const VocabularyCard = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./VocabularyCard-nz80pLr1.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0))
    );
    const DateGroupAccordion = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./DateGroupAccordion-Buf0VRDs.js"), true ? __vite__mapDeps([7,2,1,3,4,5,8]) : void 0))
    );
    const accordionState = ref({});
    const getStoredAccordionState = () => {
      try {
        const stored = localStorage.getItem(ACCORDION_STATE_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        console.warn("Failed to load accordion state from localStorage:", error);
        return {};
      }
    };
    const setStoredAccordionState = (state) => {
      try {
        localStorage.setItem(ACCORDION_STATE_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn("Failed to save accordion state to localStorage:", error);
      }
    };
    onMounted(() => {
      accordionState.value = getStoredAccordionState();
    });
    const props = __props;
    const missingImagesByDate = computed(() => {
      const source = props.useGrouping ? props.allWords || [] : props.paginatedWords || [];
      if (!Array.isArray(source) || source.length === 0) return [];
      const normalizeDate = (d) => {
        if (!d) return "Unknown";
        const dt = new Date(d);
        return isNaN(dt.getTime()) ? "Unknown" : dt.toISOString().slice(0, 10);
      };
      const map = /* @__PURE__ */ new Map();
      for (const w of source) {
        const img = (w.image ?? "").trim();
        if (img) continue;
        const dateKey = normalizeDate(w.createdAt);
        const catKey = w.category || "uncategorized";
        const displayName = w.categoryName || getTopicName(catKey, w);
        if (!map.has(dateKey)) map.set(dateKey, /* @__PURE__ */ new Map());
        const catMap = map.get(dateKey);
        const prev = catMap.get(catKey) || { name: displayName, count: 0 };
        prev.count += 1;
        if (!prev.name && displayName) {
          prev.name = displayName;
        }
        catMap.set(catKey, prev);
      }
      const result = [];
      for (const [date, catMap] of map.entries()) {
        const categories = Array.from(catMap.entries()).map(([key, value]) => ({ key, name: value.name, count: value.count }));
        result.push({ date, categories });
      }
      result.sort((a, b) => {
        if (a.date === "Unknown") return 1;
        if (b.date === "Unknown") return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return result;
    });
    const dateGroupCurrentPage = ref(1);
    const groupedWords = computed(() => {
      if (!props.useGrouping) return [];
      const wordsToGroup = props.allWords || props.paginatedWords;
      let allGroups = groupVocabulariesByDateAndTopic(wordsToGroup, locale.value, t);
      if (props.recentlyAddedCategory) {
        allGroups = allGroups.map((group) => {
          if (!group.topics) return group;
          const recentCategoryIndex = group.topics.findIndex(
            (topic) => topic.topic === props.recentlyAddedCategory
          );
          if (recentCategoryIndex > -1) {
            const sortedTopics = [...group.topics];
            const [recentCategory] = sortedTopics.splice(recentCategoryIndex, 1);
            sortedTopics.unshift(recentCategory);
            return {
              ...group,
              topics: sortedTopics
            };
          }
          return group;
        });
      }
      if (props.dateGroupPages && props.itemsPerPageGrouped) {
        return allGroups.map((group) => {
          const currentPage = props.dateGroupPages[group.date] || 1;
          const itemsPerPage = props.itemsPerPageGrouped;
          const totalTopics = group.topics ? group.topics.length : 0;
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          return {
            ...group,
            topics: group.topics ? group.topics.slice(startIndex, endIndex) : [],
            currentPage,
            totalPages: Math.ceil(totalTopics / itemsPerPage),
            topicsTotal: totalTopics,
            totalItems: group.vocabularies.length
            // giữ lại số lượng từ vựng gốc
          };
        });
      }
      return allGroups;
    });
    const paginatedDateGroups = computed(() => {
      if (!props.useGrouping) return [];
      const allGroups = groupedWords.value;
      const startIndex = (dateGroupCurrentPage.value - 1) * dateGroupsPerPage;
      const endIndex = startIndex + dateGroupsPerPage;
      return allGroups.slice(startIndex, endIndex);
    });
    const dateGroupPaginationInfo = computed(() => {
      const totalGroups = groupedWords.value.length;
      const totalPages = Math.ceil(totalGroups / dateGroupsPerPage);
      const startIndex = (dateGroupCurrentPage.value - 1) * dateGroupsPerPage + 1;
      const endIndex = Math.min(startIndex + dateGroupsPerPage - 1, totalGroups);
      return {
        totalGroups,
        totalPages,
        currentPage: dateGroupCurrentPage.value,
        startIndex,
        endIndex,
        hasNext: dateGroupCurrentPage.value < totalPages,
        hasPrevious: dateGroupCurrentPage.value > 1
      };
    });
    const goToDateGroupPage = (page) => {
      if (page >= 1 && page <= dateGroupPaginationInfo.value.totalPages) {
        dateGroupCurrentPage.value = page;
      }
    };
    const nextDateGroupPage = () => {
      if (dateGroupPaginationInfo.value.hasNext) {
        dateGroupCurrentPage.value++;
      }
    };
    const previousDateGroupPage = () => {
      if (dateGroupPaginationInfo.value.hasPrevious) {
        dateGroupCurrentPage.value--;
      }
    };
    const visibleDateGroupPages = computed(() => {
      const totalPages = dateGroupPaginationInfo.value.totalPages;
      const currentPage = dateGroupCurrentPage.value;
      if (totalPages <= 0) return [];
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);
      start = Math.max(1, end - maxVisible + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    const handleAccordionToggle = (date, expanded) => {
      accordionState.value[date] = expanded;
      setStoredAccordionState(accordionState.value);
      console.log(`Accordion for ${date} toggled to:`, expanded);
    };
    const handleNoteSaved = (date, note, markedWords) => {
      toast.success(t("vocabulary.notes.saveSuccess", "Notes saved successfully"), {
        timeout: 2e3
      });
      const autoSaveEnabled = localStorage.getItem("vocabulary-auto-save-enabled");
      if (autoSaveEnabled === "true") {
        toast.info(t("vocabulary.notes.autoSaveNotice", "Notes will be included in auto-save"), {
          timeout: 3e3
        });
      }
      console.log(`Note saved for ${date} with ${markedWords.length} marked words`);
    };
    const handleVocabularyListMouseLeave = () => {
      if (props.hoverToExpandEnabled) {
        window.dispatchEvent(new CustomEvent("vocabulary-list-mouse-leave"));
      }
    };
    const handleVocabularyListMouseEnter = () => {
      if (props.hoverToExpandEnabled) {
        window.dispatchEvent(new CustomEvent("vocabulary-list-mouse-enter"));
      }
    };
    const emit = __emit;
    const handleMoveVocabulary = (data) => {
      const sourceDate = groupedWords.value.find(
        (group) => group.vocabularies.some((word) => word.id === data.word.id)
      )?.date;
      emit("move-vocabulary", {
        ...data,
        sourceDate
      });
    };
    const handleRequestAvailableDates = (data) => {
      const availableDates = groupedWords.value.filter((group) => {
        const hasSameTopic = group.vocabularies.some((word) => word.category === data.topic);
        return hasSameTopic && group.date !== data.currentDate;
      }).map((group) => ({
        date: group.date,
        count: group.vocabularies.filter((word) => word.category === data.topic).length
      })).filter((item) => item.count > 0).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      nextTick(() => {
        const event = new CustomEvent("available-dates-response", {
          detail: {
            topic: data.topic,
            currentDate: data.currentDate,
            availableDates
          }
        });
        window.dispatchEvent(event);
      });
    };
    const handleNavigateToDateTopic = (payload) => {
      const allGroups = groupedWords.value;
      const targetIndex = allGroups.findIndex((g) => g.date === payload.date);
      if (targetIndex === -1) return;
      const targetPage = Math.floor(targetIndex / dateGroupsPerPage) + 1;
      const dispatchOpenEvent = () => {
        const ev = new CustomEvent("open-date-topic", {
          detail: { date: payload.date, topic: payload.topic }
        });
        window.dispatchEvent(ev);
      };
      if (dateGroupCurrentPage.value !== targetPage) {
        try {
          sessionStorage.setItem(PENDING_OPEN_KEY, JSON.stringify({ date: payload.date, topic: payload.topic }));
        } catch {
        }
        dateGroupCurrentPage.value = targetPage;
        nextTick(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              dispatchOpenEvent();
            }, 50);
          });
        });
      } else {
        nextTick(() => {
          dispatchOpenEvent();
        });
      }
    };
    const handleMissingNavigate = (date, topicKey) => {
      handleNavigateToDateTopic({ date, topic: topicKey });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "bg-white dark:bg-[#0a0a0a] shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700",
        onMouseleave: handleVocabularyListMouseLeave,
        onMouseenter: handleVocabularyListMouseEnter
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("h3", _hoisted_3, toDisplayString(unref(t)("vocabulary.vocabularyList", "Vocabulary List")) + " (" + toDisplayString(_ctx.totalCount) + ") ", 1),
            createBaseVNode("div", {
              class: "relative ml-2 select-none",
              "aria-hidden": "false",
              onMouseenter: handleMissingTooltipEnter,
              onMouseleave: handleMissingTooltipLeave
            }, [
              createBaseVNode("button", {
                type: "button",
                class: "inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-300 dark:bg-dark-bg-soft dark:border-dark-bg-mute dark:hover:bg-dark-bg-mute transition",
                "aria-label": unref(t)("vocabulary.imageInfo.aria", "Show dates/categories missing images")
              }, _cache[20] || (_cache[20] = [
                createBaseVNode("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  class: "w-4 h-4 sm:w-5 sm:h-5"
                }, [
                  createBaseVNode("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.75 15h-1.5v-6h1.5v6zm0-8h-1.5V7h1.5v2z" })
                ], -1)
              ]), 8, _hoisted_4),
              showMissingTooltip.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "transition-opacity duration-150 absolute right-0 mt-2 w-72 sm:w-80 rounded-lg shadow-xl ring-1 ring-black/5 bg-white text-gray-800 p-3 z-30 border border-gray-200 dark:bg-[#0a0a0a] dark:text-white dark:border dark:border-dark-bg-mute",
                onMouseenter: handleMissingTooltipEnter,
                onMouseleave: handleMissingTooltipLeave
              }, [
                _cache[21] || (_cache[21] = createBaseVNode("div", {
                  class: "absolute -top-[2px] right-7 w-4 h-[4px] bg-white dark:bg-[#0a0a0a] pointer-events-none z-10",
                  "aria-hidden": "true"
                }, null, -1)),
                _cache[22] || (_cache[22] = createBaseVNode("div", {
                  class: "absolute -top-1.5 right-[29.5px] w-3 h-3 rotate-45 bg-white pointer-events-none z-20 dark:bg-[#0a0a0a] border-t border-l border-gray-200 dark:border-[#0f0f0f]",
                  "aria-hidden": "true"
                }, null, -1)),
                createBaseVNode("div", _hoisted_5, toDisplayString(unref(t)("vocabulary.imageInfo.title", "Missing images by date")), 1),
                missingImagesByDate.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(unref(t)("vocabulary.imageInfo.none", "All categories have images for the current list")), 1)) : (openBlock(), createElementBlock("div", _hoisted_7, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(missingImagesByDate.value, (item) => {
                    return openBlock(), createElementBlock("div", {
                      key: item.date,
                      class: "border border-gray-200 rounded-md p-2 dark:border-dark-bg-mute"
                    }, [
                      createBaseVNode("div", _hoisted_8, [
                        createTextVNode(toDisplayString(unref(t)("vocabulary.imageInfo.date", "Date")) + ": ", 1),
                        createBaseVNode("span", _hoisted_9, toDisplayString(item.date), 1)
                      ]),
                      createBaseVNode("ul", _hoisted_10, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(item.categories, (cat) => {
                          return openBlock(), createElementBlock("li", {
                            key: cat.key,
                            class: "flex items-center justify-between rounded px-2 py-1 cursor-pointer hover:bg-gray-custom dark:hover:bg-gray-custom",
                            onClick: ($event) => handleMissingNavigate(item.date, cat.key)
                          }, [
                            createBaseVNode("div", _hoisted_12, [
                              createBaseVNode("span", _hoisted_13, toDisplayString(unref(t)("vocabulary.imageInfo.category", "Category")) + ":", 1),
                              createBaseVNode("span", _hoisted_14, toDisplayString(cat.name), 1)
                            ]),
                            createBaseVNode("span", _hoisted_15, toDisplayString(unref(t)("vocabulary.imageInfo.missingCount", { count: cat.count }) || `${cat.count} without image`), 1)
                          ], 8, _hoisted_11);
                        }), 128))
                      ])
                    ]);
                  }), 128))
                ]))
              ], 32)) : createCommentVNode("", true)
            ], 32)
          ])
        ]),
        _ctx.useGrouping && groupedWords.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_16, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(paginatedDateGroups.value, (group) => {
            return openBlock(), createBlock(unref(DateGroupAccordion), {
              key: group.date,
              group,
              "default-expanded": false,
              "accordion-state": accordionState.value,
              "hover-to-expand-enabled": _ctx.hoverToExpandEnabled,
              "global-move-mode": _ctx.globalMoveMode,
              onPlayAudio: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("play-audio", $event)),
              onEditWord: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("edit-word", $event)),
              onDeleteWord: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("delete-word", $event)),
              onToggleFavorite: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("toggle-favorite", $event)),
              onViewDetails: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("view-details", $event)),
              onDateGroupPrevious: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("date-group-previous", $event)),
              onDateGroupNext: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("date-group-next", $event)),
              onAccordionToggle: handleAccordionToggle,
              onNoteSaved: handleNoteSaved,
              onOpenNoteDialog: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("open-note-dialog", $event.date, $event.words)),
              onOpenAddVocabularyDialog: _cache[8] || (_cache[8] = ($event) => _ctx.$emit("open-add-vocabulary-dialog", $event)),
              onOpenGrammarManager: _cache[9] || (_cache[9] = ($event) => _ctx.$emit("open-grammar-manager", $event)),
              onMoveVocabulary: handleMoveVocabulary,
              onRequestAvailableDates: handleRequestAvailableDates,
              onNavigateToDateTopic: handleNavigateToDateTopic,
              onBatchMoveCategory: _cache[10] || (_cache[10] = ($event) => _ctx.$emit("batch-move-category", $event))
            }, null, 8, ["group", "accordion-state", "hover-to-expand-enabled", "global-move-mode"]);
          }), 128)),
          dateGroupPaginationInfo.value.totalPages > 1 ? (openBlock(), createElementBlock("div", _hoisted_17, [
            createBaseVNode("div", _hoisted_18, [
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("button", {
                  onClick: previousDateGroupPage,
                  disabled: !dateGroupPaginationInfo.value.hasPrevious,
                  class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_20),
                createBaseVNode("button", {
                  onClick: nextDateGroupPage,
                  disabled: !dateGroupPaginationInfo.value.hasNext,
                  class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_21)
              ]),
              createBaseVNode("div", _hoisted_22, [
                createBaseVNode("div", null, [
                  createBaseVNode("p", _hoisted_23, toDisplayString(unref(t)("vocabulary.showingDateGroups", {
                    start: dateGroupPaginationInfo.value.startIndex,
                    end: dateGroupPaginationInfo.value.endIndex,
                    total: dateGroupPaginationInfo.value.totalGroups
                  }, `Showing ${dateGroupPaginationInfo.value.startIndex} to ${dateGroupPaginationInfo.value.endIndex} of ${dateGroupPaginationInfo.value.totalGroups} date groups`)), 1)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("nav", _hoisted_24, [
                    createBaseVNode("button", {
                      onClick: previousDateGroupPage,
                      disabled: !dateGroupPaginationInfo.value.hasPrevious,
                      class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    }, [
                      createBaseVNode("span", _hoisted_26, toDisplayString(unref(t)("common.previous", "Previous")), 1),
                      _cache[23] || (_cache[23] = createBaseVNode("svg", {
                        class: "h-5 w-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createBaseVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                          "clip-rule": "evenodd"
                        })
                      ], -1))
                    ], 8, _hoisted_25),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(visibleDateGroupPages.value, (page) => {
                      return openBlock(), createElementBlock("button", {
                        key: page,
                        onClick: ($event) => page > 0 ? goToDateGroupPage(page) : null,
                        disabled: page === -1,
                        class: normalizeClass([
                          page === dateGroupPaginationInfo.value.currentPage ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300" : page === -1 ? "bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-default" : "bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600",
                          "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        ])
                      }, toDisplayString(page === -1 ? "..." : page), 11, _hoisted_27);
                    }), 128)),
                    createBaseVNode("button", {
                      onClick: nextDateGroupPage,
                      disabled: !dateGroupPaginationInfo.value.hasNext,
                      class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    }, [
                      createBaseVNode("span", _hoisted_29, toDisplayString(unref(t)("common.next", "Next")), 1),
                      _cache[24] || (_cache[24] = createBaseVNode("svg", {
                        class: "h-5 w-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createBaseVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                          "clip-rule": "evenodd"
                        })
                      ], -1))
                    ], 8, _hoisted_28)
                  ])
                ])
              ])
            ])
          ])) : createCommentVNode("", true)
        ])) : (openBlock(), createElementBlock("div", _hoisted_30, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.paginatedWords, (word) => {
            return openBlock(), createBlock(unref(VocabularyCard), {
              key: word.id,
              word,
              onPlayAudio: _cache[11] || (_cache[11] = ($event) => _ctx.$emit("play-audio", $event)),
              onEditWord: _cache[12] || (_cache[12] = ($event) => _ctx.$emit("edit-word", $event)),
              onDeleteWord: _cache[13] || (_cache[13] = ($event) => _ctx.$emit("delete-word", $event)),
              onToggleFavorite: _cache[14] || (_cache[14] = ($event) => _ctx.$emit("toggle-favorite", $event)),
              onViewDetails: _cache[15] || (_cache[15] = ($event) => _ctx.$emit("view-details", $event))
            }, null, 8, ["word"]);
          }), 128))
        ])),
        !_ctx.useGrouping ? (openBlock(), createElementBlock("div", _hoisted_31, [
          createBaseVNode("div", _hoisted_32, [
            createBaseVNode("div", _hoisted_33, [
              createBaseVNode("button", {
                onClick: _cache[16] || (_cache[16] = ($event) => _ctx.$emit("previous-page")),
                disabled: _ctx.currentPage === 1,
                class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600"
              }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_34),
              createBaseVNode("button", {
                onClick: _cache[17] || (_cache[17] = ($event) => _ctx.$emit("next-page")),
                disabled: _ctx.currentPage === _ctx.totalPages,
                class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600"
              }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_35)
            ]),
            createBaseVNode("div", _hoisted_36, [
              createBaseVNode("div", null, [
                createBaseVNode("p", _hoisted_37, toDisplayString(unref(t)("vocabulary.showingResults", { start: _ctx.startIndex, end: _ctx.endIndex, total: _ctx.totalCount }, `Showing ${_ctx.startIndex} to ${_ctx.endIndex} of ${_ctx.totalCount} results`)), 1)
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("nav", _hoisted_38, [
                  createBaseVNode("button", {
                    onClick: _cache[18] || (_cache[18] = ($event) => _ctx.$emit("previous-page")),
                    disabled: _ctx.currentPage === 1,
                    class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  }, [
                    createBaseVNode("span", _hoisted_40, toDisplayString(unref(t)("common.previous", "Previous")), 1),
                    _cache[25] || (_cache[25] = createBaseVNode("svg", {
                      class: "h-5 w-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      })
                    ], -1))
                  ], 8, _hoisted_39),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.visiblePages, (page) => {
                    return openBlock(), createElementBlock("button", {
                      key: page,
                      onClick: ($event) => _ctx.$emit("go-to-page", page),
                      class: normalizeClass([page === _ctx.currentPage ? "bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300" : "bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600", "relative inline-flex items-center px-4 py-2 border text-sm font-medium"])
                    }, toDisplayString(page), 11, _hoisted_41);
                  }), 128)),
                  createBaseVNode("button", {
                    onClick: _cache[19] || (_cache[19] = ($event) => _ctx.$emit("next-page")),
                    disabled: _ctx.currentPage === _ctx.totalPages,
                    class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  }, [
                    createBaseVNode("span", _hoisted_43, toDisplayString(unref(t)("common.next", "Next")), 1),
                    _cache[26] || (_cache[26] = createBaseVNode("svg", {
                      class: "h-5 w-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l4 4a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      })
                    ], -1))
                  ], 8, _hoisted_42)
                ])
              ])
            ])
          ])
        ])) : createCommentVNode("", true)
      ], 32);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=VocabularyList-Dy2U7KzH.js.map
