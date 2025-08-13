import { z as defineStore, A as ref, d as defineComponent, H as useI18n, B as computed, I as onMounted, L as onUnmounted, b as createBlock, v as openBlock, w as withCtx, C as withDirectives, f as createBaseVNode, y as createVNode, M as Transition, g as createTextVNode, t as toDisplayString, E as vShow, u as unref, c as createElementBlock, e as createCommentVNode } from "./vendor-DoTKyHPB.js";
import { u as useModalStore, a as _export_sfc } from "./index-2m4mqVDb.js";
import "./vendor-toast-D1B2ty4j.js";
const useScrollStore = defineStore("scroll", () => {
  const scrollY = ref(0);
  const showBackToTop = ref(false);
  const isScrolling = ref(false);
  const SCROLL_THRESHOLD = 300;
  let scrollTimer = null;
  const handleScroll = () => {
    scrollY.value = window.scrollY;
    showBackToTop.value = scrollY.value > SCROLL_THRESHOLD;
    isScrolling.value = true;
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
      isScrolling.value = false;
    }, 150);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const initScrollListener = () => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  };
  const removeScrollListener = () => {
    window.removeEventListener("scroll", handleScroll);
    if (scrollTimer) {
      clearTimeout(scrollTimer);
      scrollTimer = null;
    }
  };
  const scrollPercentage = () => {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    return documentHeight > 0 ? Math.min(scrollY.value / documentHeight * 100, 100) : 0;
  };
  const isNearTop = () => scrollY.value < 100;
  const isNearBottom = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    return scrollY.value + viewportHeight >= documentHeight - 100;
  };
  return {
    // State
    scrollY,
    showBackToTop,
    isScrolling,
    // Actions
    scrollToTop,
    initScrollListener,
    removeScrollListener,
    // Getters
    scrollPercentage,
    isNearTop,
    isNearBottom
  };
});
const _hoisted_1 = { class: "fixed bottom-6 z-50 left-1/2 -translate-x-[calc(100%+1rem)] sm:left-1/2 sm:-translate-x-[calc(100%+4px)] lg:left-6 lg:translate-x-0" };
const _hoisted_2 = { class: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-dark-bg rounded shadow-lg whitespace-nowrap z-10 pointer-events-none" };
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = {
  key: 0,
  class: "absolute inset-0 w-full h-full -rotate-90",
  viewBox: "0 0 100 100"
};
const _hoisted_5 = ["stroke-dasharray", "stroke-dashoffset"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BackToTop",
  props: {
    showProgress: { type: Boolean, default: false }
  },
  setup(__props) {
    const { t } = useI18n();
    const scrollStore = useScrollStore();
    const modalStore = useModalStore();
    const showTooltip = ref(false);
    const showBackToTop = computed(() => {
      return scrollStore.showBackToTop && !modalStore.shouldHideBackToTop;
    });
    const scrollPercentage = computed(() => scrollStore.scrollPercentage());
    const circumference = computed(() => 2 * Math.PI * 45);
    const handleScrollToTop = () => {
      showTooltip.value = false;
      scrollStore.scrollToTop();
    };
    const displayPercent = computed(() => Math.round(scrollPercentage.value));
    const tooltipText = computed(() => {
      const key = "common.backToTopTooltip";
      const translated = t(key, { percent: displayPercent.value });
      const isMissing = translated === key || translated.includes("{percent}");
      return isMissing ? `Back to Top (${displayPercent.value}%)` : translated;
    });
    onMounted(() => {
      scrollStore.initScrollListener();
    });
    onUnmounted(() => {
      scrollStore.removeScrollListener();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "fade-scale",
        "enter-active-class": "fade-scale-enter-active",
        "enter-from-class": "fade-scale-enter-from",
        "leave-active-class": "fade-scale-leave-active",
        "leave-to-class": "fade-scale-leave-to"
      }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", _hoisted_1, [
            createVNode(Transition, {
              name: "fade",
              "enter-active-class": "transition-opacity duration-200",
              "enter-from-class": "opacity-0",
              "leave-active-class": "transition-opacity duration-200",
              "leave-to-class": "opacity-0"
            }, {
              default: withCtx(() => [
                withDirectives(createBaseVNode("div", _hoisted_2, [
                  createTextVNode(toDisplayString(tooltipText.value) + " ", 1),
                  _cache[2] || (_cache[2] = createBaseVNode("div", { class: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-dark-bg" }, null, -1))
                ], 512), [
                  [vShow, showTooltip.value]
                ])
              ]),
              _: 1
            }),
            createBaseVNode("button", {
              onClick: handleScrollToTop,
              onMouseenter: _cache[0] || (_cache[0] = ($event) => showTooltip.value = true),
              onMouseleave: _cache[1] || (_cache[1] = ($event) => showTooltip.value = false),
              class: "group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center",
              "aria-label": unref(t)("common.backToTop")
            }, [
              _cache[4] || (_cache[4] = createBaseVNode("svg", {
                class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transform group-hover:-translate-y-0.5 transition-transform duration-200",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M5 10l7-7m0 0l7 7m-7-7v18"
                })
              ], -1)),
              _ctx.showProgress ? (openBlock(), createElementBlock("svg", _hoisted_4, [
                _cache[3] || (_cache[3] = createBaseVNode("circle", {
                  cx: "50",
                  cy: "50",
                  r: "45",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  opacity: "0.3"
                }, null, -1)),
                createBaseVNode("circle", {
                  cx: "50",
                  cy: "50",
                  r: "45",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-dasharray": circumference.value,
                  "stroke-dashoffset": circumference.value - scrollPercentage.value / 100 * circumference.value,
                  class: "transition-all duration-300"
                }, null, 8, _hoisted_5)
              ])) : createCommentVNode("", true)
            ], 40, _hoisted_3)
          ], 512), [
            [vShow, showBackToTop.value]
          ])
        ]),
        _: 1
      });
    };
  }
});
const BackToTop = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c3ec54c8"]]);
export {
  BackToTop as default
};
//# sourceMappingURL=BackToTop-C_28KyhN.js.map
