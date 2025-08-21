import { d as defineComponent, A as ref, B as computed, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, e as createCommentVNode, t as toDisplayString, n as normalizeClass, w as withCtx, C as withDirectives, x as renderSlot, E as vShow, N as Transition } from "./vendor-DI3yOcyn.js";
import { a as _export_sfc } from "./index-CRibYnh9.js";
import "./vendor-toast-BpLwVhAX.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] shadow rounded-lg border border-gray-200 dark:border-dark-bg-mute overflow-hidden" };
const _hoisted_2 = ["aria-expanded"];
const _hoisted_3 = { class: "flex items-center space-x-3 flex-1 min-w-0" };
const _hoisted_4 = {
  key: 0,
  class: "flex-shrink-0"
};
const _hoisted_5 = {
  class: "w-5 h-5 xs:w-6 xs:h-6 text-blue-500 dark:text-blue-400",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_6 = ["d"];
const _hoisted_7 = { class: "flex-1 min-w-0" };
const _hoisted_8 = { class: "text-sm xs:text-base sm:text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_9 = {
  key: 0,
  class: "text-xs xs:text-sm text-gray-600 dark:text-white/70 mt-1"
};
const _hoisted_10 = { class: "flex items-center justify-end space-x-3 mt-4 md:mt-0 md:ml-3" };
const _hoisted_11 = {
  key: 0,
  class: "flex items-center space-x-3 mr-auto"
};
const _hoisted_12 = { class: "text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate max-w-48 sm:max-w-64" };
const _hoisted_13 = { class: "accordion-content" };
const _hoisted_14 = { class: "px-3 py-3 xs:px-4 xs:py-4 sm:px-5 sm:py-5" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseAccordion",
  props: {
    title: {},
    description: {},
    icon: {},
    defaultOpen: { type: Boolean, default: true },
    persistKey: { default: void 0 },
    statusText: { default: void 0 },
    statusColor: { default: void 0 },
    showStatusWhenClosed: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const getInitialState = () => {
      if (props.persistKey && typeof localStorage !== "undefined") {
        try {
          const stored = localStorage.getItem(`accordion-${props.persistKey}`);
          return stored !== null ? JSON.parse(stored) : props.defaultOpen;
        } catch {
          return props.defaultOpen;
        }
      }
      return props.defaultOpen;
    };
    const isOpen = ref(getInitialState());
    const iconPaths = computed(() => {
      const iconMap = {
        "vocabulary": "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
        "filter": "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
        "settings": "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
      };
      return iconMap[props.icon || ""] || null;
    });
    const toggle = () => {
      isOpen.value = !isOpen.value;
      if (props.persistKey && typeof localStorage !== "undefined") {
        try {
          localStorage.setItem(`accordion-${props.persistKey}`, JSON.stringify(isOpen.value));
        } catch {
        }
      }
    };
    const enter = (el) => {
      const element = el;
      element.style.height = "0";
      element.style.overflow = "hidden";
    };
    const afterEnter = (el) => {
      const element = el;
      element.style.height = "auto";
      element.style.overflow = "visible";
    };
    const leave = (el) => {
      const element = el;
      element.style.height = element.offsetHeight + "px";
      element.style.overflow = "hidden";
      element.offsetHeight;
      element.style.height = "0";
    };
    const afterLeave = (el) => {
      const element = el;
      element.style.height = "auto";
      element.style.overflow = "visible";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("button", {
          onClick: toggle,
          "aria-expanded": isOpen.value ? "true" : "false",
          class: "w-full flex flex-col md:flex-row md:items-center px-3 py-3 xs:px-4 xs:py-3 sm:px-5 sm:py-4 text-left bg-gray-50 dark:bg-[#0f0f0f] hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors border-b border-gray-200 dark:border-dark-bg-mute focus:outline-none focus:ring-2 focus:ring-blue-500"
        }, [
          createBaseVNode("div", _hoisted_3, [
            _ctx.icon && iconPaths.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
              (openBlock(), createElementBlock("svg", _hoisted_5, [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: iconPaths.value,
                  "clip-rule": "evenodd"
                }, null, 8, _hoisted_6)
              ]))
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("h3", _hoisted_8, toDisplayString(_ctx.title), 1),
              _ctx.description ? (openBlock(), createElementBlock("p", _hoisted_9, toDisplayString(_ctx.description), 1)) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_10, [
            _ctx.statusText && _ctx.showStatusWhenClosed && !isOpen.value ? (openBlock(), createElementBlock("div", _hoisted_11, [
              _ctx.statusColor ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["h-2 w-2 rounded-full", _ctx.statusColor])
              }, null, 2)) : createCommentVNode("", true),
              createBaseVNode("span", _hoisted_12, toDisplayString(_ctx.statusText), 1)
            ])) : createCommentVNode("", true),
            (openBlock(), createElementBlock("svg", {
              class: normalizeClass(["w-5 h-5 text-gray-500 dark:text-white/60 transition-transform duration-200 flex-shrink-0", { "rotate-180": isOpen.value }]),
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, _cache[0] || (_cache[0] = [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ])
        ], 8, _hoisted_2),
        createVNode(Transition, {
          name: "accordion",
          onEnter: enter,
          onAfterEnter: afterEnter,
          onLeave: leave,
          onAfterLeave: afterLeave
        }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", _hoisted_13, [
              createBaseVNode("div", _hoisted_14, [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])
            ], 512), [
              [vShow, isOpen.value]
            ])
          ]),
          _: 3
        })
      ]);
    };
  }
});
const BaseAccordion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f39e0c05"]]);
export {
  BaseAccordion as default
};
//# sourceMappingURL=BaseAccordion-BCP9xUGY.js.map
