import { d as defineComponent, B as computed, a1 as reactive, A as ref, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, F as Fragment, j as renderList, n as normalizeClass, e as createCommentVNode, a as normalizeStyle } from "./vendor-DoTKyHPB.js";
import { a as _export_sfc } from "./index-B_vvULnT.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "relative bg-gray-100 dark:bg-[#0a0a0a] rounded-md p-2 overflow-hidden" };
const _hoisted_2 = {
  class: "grid grid-cols-15 gap-px",
  style: { "grid-template-columns": "repeat(15, minmax(0, 1fr))" }
};
const _hoisted_3 = { class: "absolute inset-0 pointer-events-none" };
const _hoisted_4 = { class: "w-full h-full flex items-center justify-center" };
const _hoisted_5 = { class: "absolute inset-0 pointer-events-none" };
const gridW = 15;
const gridH = 10;
const cellSize = 8;
const gap = 1;
const padding = 8;
const stepInterval = 140;
const maxSteps = 18;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SnakeReplay",
  props: {
    data: {}
  },
  setup(__props) {
    const props = __props;
    const totalCells = gridW * gridH;
    const scalePos = (p) => ({ x: Math.floor(p.x / 2), y: Math.floor(p.y / 2) });
    const scaledFood = computed(() => scalePos(props.data.position));
    const state = reactive({
      head: scalePos(props.data.snakeBody[0] || { x: 0, y: 0 }),
      body: props.data.snakeBody.slice(1).map(scalePos),
      dir: { ...props.data.direction }
    });
    const head = computed(() => state.head);
    const renderBody = computed(() => state.body);
    const currentDirection = computed(() => state.dir);
    const baseCellClass = (index) => {
      const x = index % gridW;
      const y = Math.floor(index / gridW);
      if (x === scaledFood.value.x && y === scaledFood.value.y) {
        return props.data.wasCorrect ? "bg-emerald-300/70 dark:bg-emerald-700/60" : "bg-red-300/70 dark:bg-red-700/60";
      }
      return "bg-gray-200 dark:bg-dark-bg-soft hover:bg-gray-300 dark:hover:bg-dark-bg-soft";
    };
    const toPixel = (p) => ({
      left: `${padding + p.x * (cellSize + gap)}px`,
      top: `${padding + p.y * (cellSize + gap)}px`
    });
    const headStyle = (p) => ({
      position: "absolute",
      zIndex: 10,
      ...toPixel(p)
    });
    const segmentStyle = (p, idx) => ({
      position: "absolute",
      zIndex: 5,
      opacity: Math.max(0.35, 1 - idx * 0.1),
      transition: "left 120ms linear, top 120ms linear, opacity 300ms ease",
      ...toPixel(p)
    });
    const foodStyle = (p) => ({
      position: "absolute",
      ...toPixel(p)
    });
    const directionDotStyle = (d) => {
      let transform = "translate(-50%, -50%)";
      if (d.x === 1) transform += " translateX(25%)";
      else if (d.x === -1) transform += " translateX(-25%)";
      else if (d.y === 1) transform += " translateY(25%)";
      else if (d.y === -1) transform += " translateY(-25%)";
      return { position: "absolute", left: "50%", top: "50%", transform };
    };
    let rafId = null;
    let lastStep = 0;
    const inBounds = (p) => p.x >= 0 && p.y >= 0 && p.x < gridW && p.y < gridH;
    let frameIndex = 0;
    const nextStep = () => {
      const now = performance.now();
      if (now - lastStep < stepInterval) {
        rafId = requestAnimationFrame(nextStep);
        return;
      }
      lastStep = now;
      const hasTimeline = props.data.timelineFrames && props.data.timelineFrames.length > 0;
      if (hasTimeline) {
        const frames = props.data.timelineFrames;
        const f = frames[frameIndex % frames.length];
        const headSeg = f.body[0] || { x: 0, y: 0 };
        state.head = scalePos(headSeg);
        state.body = f.body.slice(1).map(scalePos);
        state.dir = { x: f.direction.x, y: f.direction.y };
        frameIndex = (frameIndex + 1) % frames.length;
      } else {
        const target = scaledFood.value;
        const dx = target.x - state.head.x;
        const dy = target.y - state.head.y;
        const step = { x: Math.sign(dx), y: Math.sign(dy) };
        const move = Math.abs(dx) >= Math.abs(dy) ? { x: step.x, y: 0 } : { x: 0, y: step.y };
        const newBody = [{ ...state.head }, ...state.body.slice(0, Math.max(0, state.body.length - 0))];
        state.body = newBody.slice(0, props.data.snakeBody.length - 1);
        const newHead = { x: state.head.x + move.x, y: state.head.y + move.y };
        state.dir = move;
        if (inBounds(newHead)) state.head = newHead;
        loopCounter.value++;
        const reached = state.head.x === target.x && state.head.y === target.y;
        if (reached || loopCounter.value >= maxSteps) {
          state.head = scalePos(props.data.snakeBody[0] || { x: 0, y: 0 });
          state.body = props.data.snakeBody.slice(1).map(scalePos);
          state.dir = { ...props.data.direction };
          loopCounter.value = 0;
        }
      }
      rafId = requestAnimationFrame(nextStep);
    };
    const loopCounter = ref(0);
    onMounted(() => {
      lastStep = performance.now();
      rafId = requestAnimationFrame(nextStep);
    });
    onUnmounted(() => {
      if (rafId) cancelAnimationFrame(rafId);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (openBlock(), createElementBlock(Fragment, null, renderList(totalCells, (i) => {
            return createBaseVNode("div", {
              key: i,
              class: normalizeClass(["w-2 h-2 transition-colors duration-300", baseCellClass(i - 1)])
            }, null, 2);
          }), 64))
        ]),
        createBaseVNode("div", _hoisted_3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(renderBody.value, (seg, idx) => {
            return openBlock(), createElementBlock("div", {
              key: `seg-${idx}`,
              class: "w-2 h-2 rounded-sm bg-green-300 dark:bg-green-600",
              style: normalizeStyle(segmentStyle(seg, idx))
            }, null, 4);
          }), 128)),
          head.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "w-3 h-3 rounded-full bg-green-500 border border-green-300 animate-pulse",
            style: normalizeStyle(headStyle(head.value))
          }, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", {
                class: "w-1 h-1 bg-white rounded-full",
                style: normalizeStyle(directionDotStyle(currentDirection.value))
              }, null, 4)
            ])
          ], 4)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", {
            class: normalizeClass(["w-3 h-3 rounded-full animate-ping", _ctx.data.wasCorrect ? "bg-emerald-400 dark:bg-emerald-500" : "bg-red-400 dark:bg-red-500"]),
            style: normalizeStyle(foodStyle(scaledFood.value))
          }, null, 6)
        ])
      ]);
    };
  }
});
const SnakeReplay = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b407b167"]]);
export {
  SnakeReplay as default
};
//# sourceMappingURL=SnakeReplay-B6XsFOcG.js.map
