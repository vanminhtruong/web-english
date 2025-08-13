import { d as defineComponent, H as useI18n, A as ref, B as computed, I as onMounted, $ as onBeforeUnmount, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, b as createBlock, e as createCommentVNode, a as normalizeStyle, C as withDirectives, S as vModelText, F as Fragment, j as renderList, a0 as Teleport, n as normalizeClass, q as nextTick } from "./vendor-DoTKyHPB.js";
import { g as getTopicName } from "./index-ZHZTE24u.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 border border-gray-200 dark:border-blue-900/30" };
const _hoisted_2 = { class: "grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-6" };
const _hoisted_3 = { class: "col-span-1 xs:col-span-1 sm:col-span-2 md:col-span-2" };
const _hoisted_4 = { class: "block text-xs sm:text-sm font-medium text-gray-700 dark:text-white mb-1 xs:mb-1.5 sm:mb-2" };
const _hoisted_5 = { class: "group relative" };
const _hoisted_6 = { class: "rounded-md p-[1px] bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 transition duration-300 group-focus-within:brightness-110" };
const _hoisted_7 = { class: "relative rounded-md bg-white dark:bg-[#0a0a0a]" };
const _hoisted_8 = ["value", "placeholder"];
const _hoisted_9 = { class: "block text-xs sm:text-sm font-medium text-gray-700 dark:text-white mb-1 xs:mb-1.5 sm:mb-2" };
const _hoisted_10 = { class: "group relative" };
const _hoisted_11 = { class: "rounded-md p-[1px] bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 transition duration-300 group-focus-within:brightness-110" };
const _hoisted_12 = { class: "relative rounded-md bg-white dark:bg-[#0a0a0a]" };
const _hoisted_13 = ["aria-expanded"];
const _hoisted_14 = { class: "truncate text-left" };
const _hoisted_15 = { class: "p-2 border-b border-gray-200 dark:border-blue-900/30 bg-white dark:bg-[#0a0a0a]" };
const _hoisted_16 = ["placeholder"];
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "col-span-1" };
const _hoisted_19 = { class: "block text-xs sm:text-sm font-medium text-gray-700 dark:text-white mb-1 xs:mb-1.5 sm:mb-2" };
const _hoisted_20 = { class: "rounded-md p-[1px] bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 transition duration-300 group-focus-within:brightness-110" };
const _hoisted_21 = { class: "relative rounded-md bg-white dark:bg-[#0a0a0a]" };
const _hoisted_22 = ["aria-expanded"];
const _hoisted_23 = { class: "truncate text-left" };
const _hoisted_24 = { class: "max-h-80 overflow-y-auto py-1 divide-y divide-blue-50 dark:divide-blue-900/20" };
const _hoisted_25 = { class: "mt-2 xs:mt-3 sm:mt-4" };
const _hoisted_26 = ["aria-pressed", "title"];
const _hoisted_27 = { class: "leading-none" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyFilters",
  props: {
    searchQuery: {},
    selectedCategory: {},
    selectedLevel: {},
    categories: {},
    showFavoritesOnly: { type: Boolean }
  },
  emits: ["update:searchQuery", "update:selectedCategory", "update:selectedLevel", "update:showFavoritesOnly"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const getTopicDisplayName = (category) => {
      return getTopicName(category);
    };
    const isCategoryOpen = ref(false);
    const categoryDropdownRef = ref(null);
    const categoryTriggerRef = ref(null);
    const categoryMenuRef = ref(null);
    const categoryMenuListRef = ref(null);
    const categorySearchInputRef = ref(null);
    const categorySearch = ref("");
    const menuStyles = ref({});
    const selectedCategoryLabel = computed(() => {
      if (!props.selectedCategory) return t("common.all", "All");
      return getTopicDisplayName(props.selectedCategory);
    });
    const isLevelOpen = ref(false);
    const levelDropdownRef = ref(null);
    const levelTriggerRef = ref(null);
    const levelMenuRef = ref(null);
    const levelMenuStyles = ref({});
    const selectedLevelLabel = computed(() => {
      switch (props.selectedLevel) {
        case "beginner":
          return t("vocabulary.levels.beginner", "Beginner");
        case "intermediate":
          return t("vocabulary.levels.intermediate", "Intermediate");
        case "advanced":
          return t("vocabulary.levels.advanced", "Advanced");
        default:
          return t("common.all", "All");
      }
    });
    const filteredCategories = computed(() => {
      const q = categorySearch.value.trim().toLowerCase();
      if (!q) return props.categories;
      return props.categories.filter((c) => {
        const name = getTopicDisplayName(c).toLowerCase();
        return name.includes(q) || c.toLowerCase().includes(q);
      });
    });
    const updateMenuPosition = () => {
      const trigger = categoryTriggerRef.value;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const top = rect.bottom;
      const left = rect.left;
      const width = rect.width;
      const margin = 8;
      const maxLeft = window.innerWidth - margin - width;
      const safeLeft = Math.max(margin, Math.min(left, maxLeft));
      menuStyles.value = {
        top: `${top}px`,
        left: `${safeLeft}px`,
        width: `${width}px`
      };
    };
    const toggleCategoryDropdown = async () => {
      isCategoryOpen.value = !isCategoryOpen.value;
      if (isCategoryOpen.value) {
        categorySearch.value = "";
        await nextTick();
        updateMenuPosition();
        addListScrollGuards();
        categorySearchInputRef.value?.focus();
      } else {
        removeListScrollGuards();
      }
    };
    const selectCategory = (value) => {
      emit("update:selectedCategory", value);
      isCategoryOpen.value = false;
      removeListScrollGuards();
    };
    const updateLevelMenuPosition = () => {
      const trigger = levelTriggerRef.value;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const top = rect.bottom;
      const left = rect.left;
      const width = rect.width;
      const margin = 8;
      const maxLeft = window.innerWidth - margin - width;
      const safeLeft = Math.max(margin, Math.min(left, maxLeft));
      levelMenuStyles.value = {
        top: `${top}px`,
        left: `${safeLeft}px`,
        width: `${width}px`
      };
    };
    const toggleLevelDropdown = async () => {
      isLevelOpen.value = !isLevelOpen.value;
      if (isLevelOpen.value) {
        await nextTick();
        updateLevelMenuPosition();
      }
    };
    const selectLevel = (value) => {
      emit("update:selectedLevel", value);
      isLevelOpen.value = false;
    };
    const handleClickOutside = (e) => {
      const target = e.target;
      const catWrapper = categoryDropdownRef.value;
      const catMenu = categoryMenuRef.value;
      const clickedInsideCatWrapper = catWrapper ? catWrapper.contains(target) : false;
      const clickedInsideCatMenu = catMenu ? catMenu.contains(target) : false;
      if (!clickedInsideCatWrapper && !clickedInsideCatMenu) {
        if (isCategoryOpen.value) {
          isCategoryOpen.value = false;
          removeListScrollGuards();
        }
      }
      const lvlWrapper = levelDropdownRef.value;
      const lvlMenu = levelMenuRef.value;
      const clickedInsideLvlWrapper = lvlWrapper ? lvlWrapper.contains(target) : false;
      const clickedInsideLvlMenu = lvlMenu ? lvlMenu.contains(target) : false;
      if (!clickedInsideLvlWrapper && !clickedInsideLvlMenu) {
        if (isLevelOpen.value) {
          isLevelOpen.value = false;
        }
      }
    };
    const handleViewportChange = () => {
      if (isCategoryOpen.value) updateMenuPosition();
      if (isLevelOpen.value) updateLevelMenuPosition();
    };
    const handleScrollClose = (e) => {
      if (isCategoryOpen.value) {
        const menu = categoryMenuRef.value;
        const wrapper = categoryDropdownRef.value;
        const target = e?.target || null;
        if (menu && target && menu.contains(target)) return;
        if (wrapper && target && wrapper.contains(target)) return;
        isCategoryOpen.value = false;
      }
      if (isLevelOpen.value) {
        const lvlMenu = levelMenuRef.value;
        const lvlWrapper = levelDropdownRef.value;
        const target = e?.target || null;
        if (lvlMenu && target && lvlMenu.contains(target)) return;
        if (lvlWrapper && target && lvlWrapper.contains(target)) return;
        isLevelOpen.value = false;
      }
    };
    const handleScrollStart = (e) => {
      const t2 = e.target;
      const catMenu = categoryMenuRef.value;
      const lvlMenu = levelMenuRef.value;
      const catWrapper = categoryDropdownRef.value;
      const lvlWrapper = levelDropdownRef.value;
      if (catMenu && t2 && catMenu.contains(t2) || lvlMenu && t2 && lvlMenu.contains(t2)) return;
      if (catWrapper && t2 && catWrapper.contains(t2) || lvlWrapper && t2 && lvlWrapper.contains(t2)) return;
      if (isCategoryOpen.value) isCategoryOpen.value = false;
      if (isLevelOpen.value) isLevelOpen.value = false;
    };
    const handleKeydownForScroll = (e) => {
      const keys = ["PageUp", "PageDown", "Home", "End", " ", "ArrowDown", "ArrowUp"];
      if (!keys.includes(e.key)) return;
      if (isCategoryOpen.value) {
        const menu = categoryMenuRef.value;
        const wrapper = categoryDropdownRef.value;
        const target = e.target;
        if (menu && target && menu.contains(target)) return;
        if (wrapper && target && wrapper.contains(target)) return;
        isCategoryOpen.value = false;
      }
      if (isLevelOpen.value) {
        const menu = levelMenuRef.value;
        const wrapper = levelDropdownRef.value;
        const target = e.target;
        if (menu && target && menu.contains(target)) return;
        if (wrapper && target && wrapper.contains(target)) return;
        isLevelOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("click", handleClickOutside, { passive: true });
      window.addEventListener("scroll", handleScrollClose, true);
      window.addEventListener("wheel", handleScrollStart, { passive: false, capture: true });
      window.addEventListener("touchstart", handleScrollStart, { passive: true, capture: true });
      window.addEventListener("touchmove", handleScrollStart, { passive: false, capture: true });
      window.addEventListener("pointerdown", handleScrollStart, { capture: true });
      window.addEventListener("mousedown", handleScrollStart, { capture: true });
      window.addEventListener("keydown", handleKeydownForScroll);
      window.addEventListener("resize", handleViewportChange);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScrollClose, true);
      window.removeEventListener("wheel", handleScrollStart, true);
      window.removeEventListener("touchstart", handleScrollStart, true);
      window.removeEventListener("touchmove", handleScrollStart, true);
      window.removeEventListener("pointerdown", handleScrollStart, true);
      window.removeEventListener("mousedown", handleScrollStart, true);
      window.removeEventListener("keydown", handleKeydownForScroll);
      window.removeEventListener("resize", handleViewportChange);
      removeListScrollGuards();
    });
    const handleSearchInput = (event) => {
      const target = event.target;
      emit("update:searchQuery", target.value);
    };
    const handleFavoritesClick = () => {
      emit("update:showFavoritesOnly", !props.showFavoritesOnly);
    };
    const touchStartY = ref(0);
    const onMenuWheel = (e) => {
      const el = categoryMenuListRef.value;
      if (!el) return;
      const delta = e.deltaY;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (delta < 0 && atTop || delta > 0 && atBottom) {
        e.preventDefault();
      }
      e.stopPropagation();
    };
    const onMenuTouchStart = (e) => {
      touchStartY.value = e.touches[0]?.clientY ?? 0;
    };
    const onMenuTouchMove = (e) => {
      const el = categoryMenuListRef.value;
      if (!el) return;
      const y = e.touches[0]?.clientY ?? 0;
      const delta = touchStartY.value - y;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (delta < 0 && atTop || delta > 0 && atBottom) {
        e.preventDefault();
      }
      e.stopPropagation();
    };
    const addListScrollGuards = () => {
      const el = categoryMenuListRef.value;
      if (!el) return;
      el.addEventListener("wheel", onMenuWheel, { passive: false });
      el.addEventListener("touchstart", onMenuTouchStart, { passive: true });
      el.addEventListener("touchmove", onMenuTouchMove, { passive: false });
    };
    const removeListScrollGuards = () => {
      const el = categoryMenuListRef.value;
      if (!el) return;
      el.removeEventListener("wheel", onMenuWheel);
      el.removeEventListener("touchstart", onMenuTouchStart);
      el.removeEventListener("touchmove", onMenuTouchMove);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("label", _hoisted_4, toDisplayString(unref(t)("common.search", "Search")), 1),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  _cache[6] || (_cache[6] = createBaseVNode("span", { class: "pointer-events-none absolute inset-y-0 left-2.5 flex items-center" }, [
                    createBaseVNode("svg", {
                      class: "h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 dark:text-blue-400",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "aria-hidden": "true"
                    }, [
                      createBaseVNode("circle", {
                        cx: "11",
                        cy: "11",
                        r: "8"
                      }),
                      createBaseVNode("line", {
                        x1: "21",
                        y1: "21",
                        x2: "16.65",
                        y2: "16.65"
                      })
                    ])
                  ], -1)),
                  createBaseVNode("input", {
                    value: _ctx.searchQuery,
                    onInput: handleSearchInput,
                    type: "text",
                    placeholder: unref(t)("vocabulary.searchPlaceholder", "Search vocabulary..."),
                    class: "w-full pl-8 pr-3 py-1.5 xs:pl-9 xs:pr-3 xs:py-2 sm:pl-9 sm:pr-3 sm:py-2 text-xs sm:text-sm rounded-md bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }, null, 40, _hoisted_8)
                ])
              ])
            ])
          ]),
          createBaseVNode("div", {
            class: "col-span-1",
            ref_key: "categoryDropdownRef",
            ref: categoryDropdownRef
          }, [
            createBaseVNode("label", _hoisted_9, toDisplayString(unref(t)("vocabulary.category", "Category")), 1),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: toggleCategoryDropdown,
                    "aria-expanded": isCategoryOpen.value ? "true" : "false",
                    ref_key: "categoryTriggerRef",
                    ref: categoryTriggerRef,
                    class: "w-full inline-flex items-center justify-between px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }, [
                    createBaseVNode("span", _hoisted_14, toDisplayString(selectedCategoryLabel.value), 1),
                    _cache[7] || (_cache[7] = createBaseVNode("svg", {
                      class: "ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 dark:text-blue-400 flex-shrink-0",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z",
                        "clip-rule": "evenodd"
                      })
                    ], -1))
                  ], 8, _hoisted_13)
                ])
              ])
            ]),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              isCategoryOpen.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "fixed z-[9999] rounded-md border border-gray-300 dark:border-blue-900/30 bg-white dark:bg-[#0a0a0a] shadow-xl ring-1 ring-blue-100/50 dark:ring-blue-900/30 overflow-hidden",
                style: normalizeStyle(menuStyles.value),
                ref_key: "categoryMenuRef",
                ref: categoryMenuRef
              }, [
                createBaseVNode("div", _hoisted_15, [
                  withDirectives(createBaseVNode("input", {
                    ref_key: "categorySearchInputRef",
                    ref: categorySearchInputRef,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => categorySearch.value = $event),
                    type: "text",
                    placeholder: unref(t)("common.search", "Search"),
                    class: "w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-300 dark:border-blue-900/30 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }, null, 8, _hoisted_16), [
                    [vModelText, categorySearch.value]
                  ])
                ]),
                createBaseVNode("ul", {
                  class: "max-h-80 overflow-y-auto divide-y divide-blue-50 dark:divide-blue-900/20",
                  ref_key: "categoryMenuListRef",
                  ref: categoryMenuListRef
                }, [
                  createBaseVNode("li", null, [
                    createBaseVNode("button", {
                      type: "button",
                      onClick: _cache[1] || (_cache[1] = ($event) => selectCategory("")),
                      class: "w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                    }, toDisplayString(unref(t)("common.all", "All")), 1)
                  ]),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCategories.value, (category) => {
                    return openBlock(), createElementBlock("li", { key: category }, [
                      createBaseVNode("button", {
                        type: "button",
                        onClick: ($event) => selectCategory(category),
                        class: "w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                      }, toDisplayString(getTopicDisplayName(category)), 9, _hoisted_17)
                    ]);
                  }), 128))
                ], 512)
              ], 4)) : createCommentVNode("", true)
            ]))
          ], 512),
          createBaseVNode("div", _hoisted_18, [
            createBaseVNode("label", _hoisted_19, toDisplayString(unref(t)("vocabulary.level", "Level")), 1),
            createBaseVNode("div", {
              class: "group relative",
              ref_key: "levelDropdownRef",
              ref: levelDropdownRef
            }, [
              createBaseVNode("div", _hoisted_20, [
                createBaseVNode("div", _hoisted_21, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: toggleLevelDropdown,
                    "aria-expanded": isLevelOpen.value ? "true" : "false",
                    ref_key: "levelTriggerRef",
                    ref: levelTriggerRef,
                    class: "w-full inline-flex items-center justify-between px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }, [
                    createBaseVNode("span", _hoisted_23, toDisplayString(selectedLevelLabel.value), 1),
                    _cache[8] || (_cache[8] = createBaseVNode("svg", {
                      class: "ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 dark:text-blue-400 flex-shrink-0",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z",
                        "clip-rule": "evenodd"
                      })
                    ], -1))
                  ], 8, _hoisted_22),
                  (openBlock(), createBlock(Teleport, { to: "body" }, [
                    isLevelOpen.value ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      ref_key: "levelMenuRef",
                      ref: levelMenuRef,
                      class: "fixed z-[10000] rounded-md border border-blue-200 dark:border-blue-900/30 bg-white dark:bg-[#0a0a0a] shadow-xl ring-1 ring-blue-100/50 dark:ring-blue-900/30 overflow-hidden",
                      style: normalizeStyle(levelMenuStyles.value)
                    }, [
                      createBaseVNode("ul", _hoisted_24, [
                        createBaseVNode("li", null, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: _cache[2] || (_cache[2] = ($event) => selectLevel("")),
                            class: "w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                          }, toDisplayString(unref(t)("common.all", "All")), 1)
                        ]),
                        createBaseVNode("li", null, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: _cache[3] || (_cache[3] = ($event) => selectLevel("beginner")),
                            class: "w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                          }, toDisplayString(unref(t)("vocabulary.levels.beginner", "Beginner")), 1)
                        ]),
                        createBaseVNode("li", null, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: _cache[4] || (_cache[4] = ($event) => selectLevel("intermediate")),
                            class: "w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                          }, toDisplayString(unref(t)("vocabulary.levels.intermediate", "Intermediate")), 1)
                        ]),
                        createBaseVNode("li", null, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: _cache[5] || (_cache[5] = ($event) => selectLevel("advanced")),
                            class: "w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-800/30 text-gray-700 dark:text-white"
                          }, toDisplayString(unref(t)("vocabulary.levels.advanced", "Advanced")), 1)
                        ])
                      ])
                    ], 4)) : createCommentVNode("", true)
                  ]))
                ])
              ])
            ], 512)
          ]),
          createBaseVNode("div", _hoisted_25, [
            createBaseVNode("button", {
              type: "button",
              "aria-pressed": _ctx.showFavoritesOnly ? "true" : "false",
              title: unref(t)("vocabulary.showFavoritesOnly", "Show favorites only"),
              onClick: handleFavoritesClick,
              class: normalizeClass(["inline-flex items-center select-none rounded-full border px-3 py-1.5 xs:px-3 xs:py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm transition-all duration-150", [
                _ctx.showFavoritesOnly ? "bg-rose-500 border-rose-600 text-white shadow hover:bg-rose-600" : "bg-white border-blue-500 text-blue-600 hover:bg-blue-50 dark:bg-[#0a0a0a] dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/30"
              ]])
            }, [
              _cache[9] || (_cache[9] = createBaseVNode("svg", {
                class: "w-4 h-4 sm:w-4.5 sm:h-4.5 mr-1.5",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true"
              }, [
                createBaseVNode("path", { d: "M12 21.35l-1.45-1.32C6.4 16.36 4 14.28 4 11.5 4 9.5 5.5 8 7.5 8c1.04 0 2.04.5 2.65 1.32.61-.82 1.61-1.32 2.65-1.32C15.5 8 17 9.5 17 11.5c0 2.78-2.4 4.86-6.55 8.54L12 21.35z" })
              ], -1)),
              createBaseVNode("span", _hoisted_27, toDisplayString(unref(t)("vocabulary.showFavoritesOnly", "Show favorites only")), 1)
            ], 10, _hoisted_26)
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=VocabularyFilters-BBMjpIps.js.map
