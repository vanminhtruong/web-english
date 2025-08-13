import { k as useThemeStore, a as _export_sfc } from "./index-BkaL7NHM.js";
import { d as defineComponent, A as ref, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, u as unref, g as createTextVNode, t as toDisplayString } from "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "relative" };
const _hoisted_2 = ["title"];
const _hoisted_3 = {
  key: 0,
  class: "w-5 h-5 text-yellow-500 transition-transform duration-200 hover:rotate-12",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_4 = {
  key: 1,
  class: "w-5 h-5 text-blue-400 transition-transform duration-200 hover:rotate-12",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_5 = {
  key: 2,
  class: "absolute inset-0 rounded-lg bg-blue-400 opacity-30 animate-ping"
};
const _hoisted_6 = {
  key: 0,
  class: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-black dark:text-white dark:border dark:border-gray-600 rounded shadow-lg whitespace-nowrap z-50"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ThemeToggle",
  setup(__props) {
    const themeStore = useThemeStore();
    const isAnimating = ref(false);
    const showTooltip = ref(false);
    let tooltipTimer = null;
    const toggleTheme = () => {
      isAnimating.value = true;
      themeStore.toggleTheme();
      setTimeout(() => {
        isAnimating.value = false;
      }, 300);
    };
    const handleMouseEnter = () => {
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }
      tooltipTimer = setTimeout(() => {
        showTooltip.value = true;
      }, 500);
    };
    const handleMouseLeave = () => {
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }
      showTooltip.value = false;
    };
    const handleKeydown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "T") {
        event.preventDefault();
        toggleTheme();
      }
    };
    onMounted(() => {
      const button = document.querySelector("[data-theme-toggle]");
      if (button) {
        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);
      }
      document.addEventListener("keydown", handleKeydown);
    });
    onUnmounted(() => {
      const button = document.querySelector("[data-theme-toggle]");
      if (button) {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
      document.removeEventListener("keydown", handleKeydown);
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("button", {
          onClick: toggleTheme,
          class: "relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
          title: unref(themeStore).themeLabel()
        }, [
          !unref(themeStore).isDarkMode ? (openBlock(), createElementBlock("svg", _hoisted_3, _cache[0] || (_cache[0] = [
            createBaseVNode("path", {
              "fill-rule": "evenodd",
              d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z",
              "clip-rule": "evenodd"
            }, null, -1)
          ]))) : (openBlock(), createElementBlock("svg", _hoisted_4, _cache[1] || (_cache[1] = [
            createBaseVNode("path", { d: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" }, null, -1)
          ]))),
          isAnimating.value ? (openBlock(), createElementBlock("span", _hoisted_5)) : createCommentVNode("", true)
        ], 8, _hoisted_2),
        showTooltip.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
          createTextVNode(toDisplayString(unref(themeStore).themeLabel()) + " ", 1),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-black" }, null, -1))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const ThemeToggle = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c550120"]]);
export {
  ThemeToggle as default
};
//# sourceMappingURL=ThemeToggle-OIat_Xbw.js.map
