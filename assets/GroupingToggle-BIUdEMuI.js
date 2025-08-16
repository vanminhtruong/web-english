const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BaseAccordion-CUOx37yh.js","assets/vendor-DoTKyHPB.js","assets/index-CcXa6_K7.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-6WIjl2aI.css","assets/BaseAccordion-BJ8zJQLG.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-CcXa6_K7.js";
import { d as defineComponent, H as useI18n, b as createBlock, v as openBlock, w as withCtx, f as createBaseVNode, c as createElementBlock, e as createCommentVNode, t as toDisplayString, u as unref, n as normalizeClass, D as defineAsyncComponent } from "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_2 = { class: "flex items-center justify-between mb-3 sm:mb-4" };
const _hoisted_3 = { class: "flex items-center space-x-2 sm:space-x-3" };
const _hoisted_4 = { class: "text-xs sm:text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_5 = { class: "text-xs text-gray-500 dark:text-gray-400 hidden sm:block" };
const _hoisted_6 = {
  key: 0,
  class: "flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 mb-3 sm:mb-4"
};
const _hoisted_7 = { class: "flex items-center space-x-2 sm:space-x-3" };
const _hoisted_8 = { class: "text-xs sm:text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_9 = { class: "text-xs text-gray-500 dark:text-gray-400 hidden sm:block" };
const _hoisted_10 = {
  key: 1,
  class: "flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700"
};
const _hoisted_11 = { class: "flex items-center space-x-2 sm:space-x-3" };
const _hoisted_12 = { class: "text-xs sm:text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_13 = { class: "text-xs text-gray-500 dark:text-gray-400 hidden sm:block" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GroupingToggle",
  props: {
    modelValue: { type: Boolean },
    hoverEnabled: { type: Boolean },
    moveMode: { type: Boolean }
  },
  emits: ["update:modelValue", "update:hoverEnabled", "update:moveMode"],
  setup(__props, { emit: __emit }) {
    const BaseAccordion = defineAsyncComponent(() => __vitePreload(() => import("./BaseAccordion-CUOx37yh.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const emit = __emit;
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(BaseAccordion), {
        title: unref(t)("vocabulary.grouping.accordionTitle", "Group by Date Settings"),
        description: unref(t)("vocabulary.grouping.accordionDescription", "Configure how vocabulary is grouped and displayed"),
        icon: "vocabulary",
        "default-open": true,
        "persist-key": "vocabulary-grouping",
        class: "mb-4 sm:mb-6"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                _cache[3] || (_cache[3] = createBaseVNode("svg", {
                  class: "w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                createBaseVNode("div", null, [
                  createBaseVNode("h3", _hoisted_4, toDisplayString(unref(t)("vocabulary.grouping.title", "Group by Date")), 1),
                  createBaseVNode("p", _hoisted_5, toDisplayString(unref(t)("vocabulary.grouping.description", "Group vocabulary words by creation date")), 1)
                ])
              ]),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", !_ctx.modelValue)),
                class: normalizeClass([
                  "relative inline-flex items-center rounded-full transition-colors",
                  "h-5 w-9 sm:h-6 sm:w-11",
                  _ctx.modelValue ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                ])
              }, [
                createBaseVNode("span", {
                  class: normalizeClass([
                    "inline-block transform rounded-full bg-white transition-transform",
                    "h-3 w-3 sm:h-4 sm:w-4",
                    _ctx.modelValue ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                  ])
                }, null, 2)
              ], 2)
            ]),
            _ctx.modelValue ? (openBlock(), createElementBlock("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, [
                _cache[4] || (_cache[4] = createBaseVNode("svg", {
                  class: "w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                createBaseVNode("div", null, [
                  createBaseVNode("h3", _hoisted_8, toDisplayString(unref(t)("vocabulary.grouping.hoverToExpand", "Hover to Expand")), 1),
                  createBaseVNode("p", _hoisted_9, toDisplayString(unref(t)("vocabulary.grouping.hoverDescription", "Expand date groups on hover instead of click")), 1)
                ])
              ]),
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = ($event) => emit("update:hoverEnabled", !_ctx.hoverEnabled)),
                class: normalizeClass([
                  "relative inline-flex items-center rounded-full transition-colors",
                  "h-5 w-9 sm:h-6 sm:w-11",
                  _ctx.hoverEnabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                ])
              }, [
                createBaseVNode("span", {
                  class: normalizeClass([
                    "inline-block transform rounded-full bg-white transition-transform",
                    "h-3 w-3 sm:h-4 sm:w-4",
                    _ctx.hoverEnabled ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                  ])
                }, null, 2)
              ], 2)
            ])) : createCommentVNode("", true),
            _ctx.modelValue ? (openBlock(), createElementBlock("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                _cache[5] || (_cache[5] = createBaseVNode("svg", {
                  class: "w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                createBaseVNode("div", null, [
                  createBaseVNode("h3", _hoisted_12, toDisplayString(unref(t)("vocabulary.moveMode.title", "Move Mode")), 1),
                  createBaseVNode("p", _hoisted_13, toDisplayString(_ctx.moveMode ? unref(t)("vocabulary.moveMode.active", "Active - Click arrows to move words") : unref(t)("vocabulary.moveMode.inactive", "Inactive - Enable to show move arrows")), 1)
                ])
              ]),
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = ($event) => emit("update:moveMode", !_ctx.moveMode)),
                class: normalizeClass([
                  "relative inline-flex items-center rounded-full transition-colors",
                  "h-5 w-9 sm:h-6 sm:w-11",
                  _ctx.moveMode ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                ])
              }, [
                createBaseVNode("span", {
                  class: normalizeClass([
                    "inline-block transform rounded-full bg-white transition-transform",
                    "h-3 w-3 sm:h-4 sm:w-4",
                    _ctx.moveMode ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                  ])
                }, null, 2)
              ], 2)
            ])) : createCommentVNode("", true)
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
//# sourceMappingURL=GroupingToggle-BIUdEMuI.js.map
