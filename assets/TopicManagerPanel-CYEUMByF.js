import { d as defineComponent, H as useI18n, A as ref, B as computed, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, b as createBlock, t as toDisplayString, u as unref, y as createVNode, w as withCtx, C as withDirectives, e as createCommentVNode, g as createTextVNode, E as vShow, N as Transition, a0 as Teleport } from "./vendor-Cr_Qcp9o.js";
import { u as useModalStore, a as _export_sfc } from "./index-C8A7QfHx.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4" };
const _hoisted_2 = { class: "flex items-center space-x-4 sm:space-x-4" };
const _hoisted_3 = { class: "flex flex-col space-y-0.5 sm:space-y-1" };
const _hoisted_4 = { class: "text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_5 = { class: "text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_6 = {
  class: "fixed top-20 right-6 z-[9999]",
  style: { "position": "fixed !important" }
};
const _hoisted_7 = {
  key: 0,
  class: "absolute bottom-full right-0 mb-2 px-3 py-2 text-xs font-medium text-white bg-gray-900 dark:bg-[#0a0a0a] dark:border dark:border-dark-bg-mute rounded-lg shadow-lg whitespace-nowrap z-[10000]"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TopicManagerPanel",
  emits: ["open"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const modalStore = useModalStore();
    const containerRef = ref();
    const showStickyButton = ref(false);
    const showTooltip = ref(false);
    const isXlScreen = ref(false);
    const isToolsAccordionOpen = ref(true);
    const checkScreenSize = () => {
      isXlScreen.value = window.innerWidth >= 1280;
    };
    const checkAccordionState = () => {
      try {
        const stored = localStorage.getItem("accordion-vocabulary-tools");
        isToolsAccordionOpen.value = stored !== null ? JSON.parse(stored) : true;
      } catch {
        isToolsAccordionOpen.value = true;
      }
    };
    const shouldShowStickyButton = computed(() => {
      if (!isXlScreen.value) return false;
      if (modalStore.shouldHideBackToTop) return false;
      return showStickyButton.value || !isToolsAccordionOpen.value;
    });
    const handleScroll = () => {
      if (!containerRef.value) return;
      const rect = containerRef.value.getBoundingClientRect();
      const containerTop = rect.top;
      rect.bottom;
      showStickyButton.value = containerTop < -50;
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", checkScreenSize, { passive: true });
      window.addEventListener("storage", checkAccordionState);
      handleScroll();
      checkScreenSize();
      checkAccordionState();
      const accordionCheckInterval = setInterval(checkAccordionState, 1e3);
      window.__accordionCheckInterval = accordionCheckInterval;
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("storage", checkAccordionState);
      if (window.__accordionCheckInterval) {
        clearInterval(window.__accordionCheckInterval);
        delete window.__accordionCheckInterval;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "containerRef",
        ref: containerRef,
        class: "bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-dark-bg-mute p-4 sm:p-5 mb-6"
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            _cache[4] || (_cache[4] = createBaseVNode("svg", {
              class: "w-5 h-5 text-gray-500 dark:text-gray-400",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
                "clip-rule": "evenodd"
              })
            ], -1)),
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("h3", _hoisted_4, toDisplayString(unref(t)("vocabulary.topicManager.title", "Topic Manager")), 1),
              createBaseVNode("p", _hoisted_5, toDisplayString(unref(t)("vocabulary.topicManager.builtInTopicsDescription", "Manage built-in topics and categories")), 1)
            ])
          ]),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => emit("open")),
            class: "px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 self-start md:self-auto mt-3 sm:mt-3 md:mt-0 w-full md:w-auto"
          }, [
            _cache[5] || (_cache[5] = createBaseVNode("svg", {
              class: "h-4 w-4",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
              })
            ], -1)),
            createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.topicManager.manageTopics", "Manage Topics")), 1)
          ])
        ]),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          createVNode(Transition, { name: "sticky-fade" }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", _hoisted_6, [
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = ($event) => emit("open")),
                  onMouseenter: _cache[2] || (_cache[2] = ($event) => showTooltip.value = true),
                  onMouseleave: _cache[3] || (_cache[3] = ($event) => showTooltip.value = false),
                  class: "relative bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-medium w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                }, [
                  _cache[7] || (_cache[7] = createBaseVNode("svg", {
                    class: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                    })
                  ], -1)),
                  showTooltip.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
                    createTextVNode(toDisplayString(unref(t)("vocabulary.topicManager.manageTopics", "Manage Topics")) + " ", 1),
                    _cache[6] || (_cache[6] = createBaseVNode("div", { class: "absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-[#0a0a0a]" }, null, -1))
                  ])) : createCommentVNode("", true)
                ], 32)
              ], 512), [
                [vShow, shouldShowStickyButton.value]
              ])
            ]),
            _: 1
          })
        ]))
      ], 512);
    };
  }
});
const TopicManagerPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bddec3c6"]]);
export {
  TopicManagerPanel as default
};
//# sourceMappingURL=TopicManagerPanel-CYEUMByF.js.map
