import { d as defineComponent, A as ref, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, x as renderSlot, n as normalizeClass } from "./vendor-DoTKyHPB.js";
import { a as _export_sfc } from "./index-1w8025Ge.js";
import "./vendor-toast-D1B2ty4j.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LazyLoadComponent",
  props: {
    animationType: { default: "fade-up" },
    threshold: { default: 0.99 },
    rootMargin: { default: "0px" }
  },
  setup(__props) {
    const props = __props;
    const elementRef = ref();
    const isVisible = ref(false);
    let observer = null;
    let isFullyVisible = false;
    onMounted(() => {
      if (elementRef.value) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const ratio = entry.intersectionRatio;
              const showThreshold = props.threshold;
              const hideThreshold = Math.max(0, props.threshold - 0.1);
              if (ratio >= showThreshold) {
                if (!isFullyVisible) {
                  isFullyVisible = true;
                  isVisible.value = true;
                }
              } else if (ratio <= hideThreshold) {
                if (isFullyVisible) {
                  isFullyVisible = false;
                  isVisible.value = false;
                }
              }
            });
          },
          {
            threshold: [0, 0.25, 0.5, 0.75, 0.9, 0.99, 1],
            // Theo dõi nhiều ngưỡng để phát hiện chính xác
            rootMargin: props.rootMargin
          }
        );
        observer.observe(elementRef.value);
      }
    });
    onUnmounted(() => {
      if (observer && elementRef.value) {
        observer.unobserve(elementRef.value);
        observer.disconnect();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "elementRef",
        ref: elementRef,
        class: normalizeClass([
          "lazy-wrapper",
          _ctx.animationType,
          { "is-visible": isVisible.value, "is-hidden": !isVisible.value }
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});
const LazyLoadComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e3e20eb0"]]);
export {
  LazyLoadComponent as default
};
//# sourceMappingURL=LazyLoadComponent-Dj2mbgsS.js.map
