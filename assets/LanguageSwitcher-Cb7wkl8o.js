import { o as getLocale, t as toggleLocale } from "./index-CqSyIMOO.js";
import { d as defineComponent, B as computed, c as createElementBlock, v as openBlock, f as createBaseVNode, g as createTextVNode } from "./vendor-DI3yOcyn.js";
import "./vendor-toast-BpLwVhAX.js";
const _hoisted_1 = {
  key: 0,
  class: "flex items-center"
};
const _hoisted_2 = {
  key: 1,
  class: "flex items-center"
};
const _hoisted_3 = {
  key: 2,
  class: "flex items-center"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LanguageSwitcher",
  setup(__props) {
    const currentLocale = computed(() => getLocale());
    const toggleLanguage = () => {
      toggleLocale();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        onClick: toggleLanguage,
        class: "inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-dark-bg-mute rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-dark-bg-soft hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      }, [
        currentLocale.value === "en" ? (openBlock(), createElementBlock("span", _hoisted_1, _cache[0] || (_cache[0] = [
          createBaseVNode("img", {
            src: "https://flagcdn.com/w20/us.png",
            width: "20",
            height: "15",
            class: "mr-2",
            alt: "English"
          }, null, -1),
          createTextVNode(" EN ")
        ]))) : currentLocale.value === "vi" ? (openBlock(), createElementBlock("span", _hoisted_2, _cache[1] || (_cache[1] = [
          createBaseVNode("img", {
            src: "https://flagcdn.com/w20/vn.png",
            width: "20",
            height: "15",
            class: "mr-2",
            alt: "Tiếng Việt"
          }, null, -1),
          createTextVNode(" VI ")
        ]))) : (openBlock(), createElementBlock("span", _hoisted_3, _cache[2] || (_cache[2] = [
          createBaseVNode("img", {
            src: "https://flagcdn.com/w20/kr.png",
            width: "20",
            height: "15",
            class: "mr-2",
            alt: "한국어"
          }, null, -1),
          createTextVNode(" KO ")
        ])))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=LanguageSwitcher-Cb7wkl8o.js.map
