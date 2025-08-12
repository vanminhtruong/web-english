import { m as isEnglish, t as toggleLocale } from "./index-D-rjLU_m.js";
import { d as defineComponent, A as ref, I as onMounted, c as createElementBlock, v as openBlock, f as createBaseVNode, g as createTextVNode } from "./vendor-vEVloz7Q.js";
import "./vendor-toast-DqDt6EZQ.js";
const _hoisted_1 = {
  key: 0,
  class: "flex items-center"
};
const _hoisted_2 = {
  key: 1,
  class: "flex items-center"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LanguageSwitcher",
  setup(__props) {
    const isEnglish$1 = ref(false);
    onMounted(() => {
      isEnglish$1.value = isEnglish();
    });
    const toggleLanguage = () => {
      toggleLocale();
      isEnglish$1.value = !isEnglish$1.value;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        onClick: toggleLanguage,
        class: "inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      }, [
        isEnglish$1.value ? (openBlock(), createElementBlock("span", _hoisted_1, _cache[0] || (_cache[0] = [
          createBaseVNode("img", {
            src: "https://flagcdn.com/w20/us.png",
            width: "20",
            height: "15",
            class: "mr-2",
            alt: "English"
          }, null, -1),
          createTextVNode(" EN ")
        ]))) : (openBlock(), createElementBlock("span", _hoisted_2, _cache[1] || (_cache[1] = [
          createBaseVNode("img", {
            src: "https://flagcdn.com/w20/vn.png",
            width: "20",
            height: "15",
            class: "mr-2",
            alt: "Tiếng Việt"
          }, null, -1),
          createTextVNode(" VI ")
        ])))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=LanguageSwitcher-DCCG0Idl.js.map
