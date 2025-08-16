const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BaseAccordion-CUOx37yh.js","assets/vendor-DoTKyHPB.js","assets/index-CcXa6_K7.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-6WIjl2aI.css","assets/BaseAccordion-BJ8zJQLG.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-CcXa6_K7.js";
import { d as defineComponent, H as useI18n, b as createBlock, v as openBlock, w as withCtx, f as createBaseVNode, t as toDisplayString, u as unref, g as createTextVNode, D as defineAsyncComponent } from "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0" };
const _hoisted_2 = { class: "text-3xl font-bold text-gray-900 dark:text-white" };
const _hoisted_3 = { class: "mt-2 text-sm text-gray-600 dark:text-white/80" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyHeader",
  emits: ["add-vocabulary"],
  setup(__props) {
    const BaseAccordion = defineAsyncComponent(() => __vitePreload(() => import("./BaseAccordion-CUOx37yh.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(BaseAccordion), {
        title: unref(t)("vocabulary.header.accordionTitle", "Vocabulary Manager"),
        description: unref(t)("vocabulary.header.accordionDescription", "Add and manage your vocabulary words"),
        icon: "vocabulary",
        "default-open": true,
        "persist-key": "vocabulary-header",
        "data-vocabulary-header": ""
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", null, [
              createBaseVNode("h1", _hoisted_2, toDisplayString(unref(t)("vocabulary.title", "Vocabulary")), 1),
              createBaseVNode("p", _hoisted_3, toDisplayString(unref(t)("vocabulary.description", "Manage and learn English vocabulary")), 1)
            ]),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("add-vocabulary")),
              "data-original-add-button": "",
              class: "bg-blue-500 hover:bg-blue-600 text-white font-medium w-full md:w-auto py-1.5 px-3 xs:py-2 xs:px-4 rounded-lg transition-colors"
            }, [
              _cache[1] || (_cache[1] = createBaseVNode("svg", {
                class: "w-4 h-4 xs:w-5 xs:h-5 inline mr-1 xs:mr-2",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                  "clip-rule": "evenodd"
                })
              ], -1)),
              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.addNew", "Add New Word")), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title", "description"]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=VocabularyHeader-j6iMJTOj.js.map
