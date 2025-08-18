import { d as defineComponent, B as computed, c as createElementBlock, v as openBlock, f as createBaseVNode, n as normalizeClass, t as toDisplayString } from "./vendor-DMqe9Z5T.js";
import { a as _export_sfc } from "./index-DVwj369_.js";
import "./vendor-toast-C02QcIAu.js";
const _hoisted_1 = { class: "relative inline-flex items-center justify-center" };
const _hoisted_2 = ["width", "height", "viewBox"];
const _hoisted_3 = ["cx", "cy", "r", "stroke-width"];
const _hoisted_4 = ["cx", "cy", "r", "stroke-width", "stroke-dasharray", "stroke-dashoffset"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CircularProgress",
  props: {
    percentage: { default: 0 },
    size: { default: 48 },
    strokeWidth: { default: 4 },
    color: { default: "" },
    showText: { type: Boolean, default: true },
    customText: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const radius = computed(() => (props.size - props.strokeWidth) / 2);
    const circumference = computed(() => radius.value * 2 * Math.PI);
    const strokeDashoffset = computed(() => {
      const progress = Math.min(Math.max(props.percentage, 0), 100);
      return circumference.value - progress / 100 * circumference.value;
    });
    const progressColor = computed(() => {
      if (props.color) return props.color;
      if (props.percentage >= 100) {
        return "text-green-500 dark:text-green-400";
      } else if (props.percentage >= 70) {
        return "text-blue-500 dark:text-blue-400";
      } else if (props.percentage >= 40) {
        return "text-yellow-500 dark:text-yellow-400";
      } else {
        return "text-orange-500 dark:text-orange-400";
      }
    });
    const textColor = computed(() => {
      if (props.percentage >= 100) {
        return "text-green-600 dark:text-green-300";
      } else if (props.percentage >= 70) {
        return "text-blue-600 dark:text-blue-300";
      } else if (props.percentage >= 40) {
        return "text-yellow-600 dark:text-yellow-300";
      } else {
        return "text-orange-600 dark:text-orange-300";
      }
    });
    const textSizeClass = computed(() => {
      if (props.size <= 32) {
        return "text-xs";
      } else if (props.size <= 48) {
        return "text-sm";
      } else if (props.size <= 64) {
        return "text-base";
      } else {
        return "text-lg";
      }
    });
    const displayValue = computed(() => {
      if (props.customText) {
        return props.customText;
      }
      if (!props.showText) {
        return "";
      }
      return `${Math.round(props.percentage)}%`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        (openBlock(), createElementBlock("svg", {
          width: _ctx.size,
          height: _ctx.size,
          class: "transform -rotate-90",
          viewBox: `0 0 ${_ctx.size} ${_ctx.size}`
        }, [
          createBaseVNode("circle", {
            cx: _ctx.size / 2,
            cy: _ctx.size / 2,
            r: radius.value,
            stroke: "currentColor",
            "stroke-width": _ctx.strokeWidth,
            fill: "transparent",
            class: "text-gray-200 dark:text-dark-bg-mute opacity-50"
          }, null, 8, _hoisted_3),
          createBaseVNode("circle", {
            cx: _ctx.size / 2,
            cy: _ctx.size / 2,
            r: radius.value,
            stroke: "currentColor",
            "stroke-width": _ctx.strokeWidth,
            fill: "transparent",
            "stroke-dasharray": circumference.value,
            "stroke-dashoffset": strokeDashoffset.value,
            class: normalizeClass([progressColor.value, "transition-all duration-500 ease-in-out"]),
            "stroke-linecap": "round"
          }, null, 10, _hoisted_4)
        ], 8, _hoisted_2)),
        createBaseVNode("div", {
          class: normalizeClass(["absolute inset-0 flex items-center justify-center z-10", textSizeClass.value])
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["font-bold transition-colors duration-300 bg-white dark:bg-dark-bg rounded-full px-0.5 py-0.5 shadow-sm", textColor.value]),
            style: { "line-height": "1" }
          }, toDisplayString(displayValue.value), 3)
        ], 2)
      ]);
    };
  }
});
const CircularProgress = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-938779d2"]]);
export {
  CircularProgress as default
};
//# sourceMappingURL=CircularProgress-BsQTcImb.js.map
