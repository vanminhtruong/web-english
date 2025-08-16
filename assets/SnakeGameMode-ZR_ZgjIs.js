import { A as ref, d as defineComponent, H as useI18n, B as computed, K as watch, I as onMounted, q as nextTick, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, e as createCommentVNode, y as createVNode, a as normalizeStyle, w as withCtx, M as Transition } from "./vendor-DoTKyHPB.js";
import { e as useVoiceStore, a as _export_sfc } from "./index-D7nXY4zy.js";
import "./vendor-toast-D1B2ty4j.js";
class SnakeStateManager {
  snake = ref({
    body: [{ x: 10, y: 10 }],
    direction: { x: 0, y: 0 },
    currentWord: ""
  });
  food = ref(null);
  secondaryFood = ref(null);
  score = ref(0);
  gameOver = ref(false);
  gameRunning = ref(false);
  currentTargetWord = ref("");
  wordsCompleted = ref(0);
  gameSpeed = ref(150);
  // milliseconds between moves
  lastEatenFoodPos = ref(null);
  lastEatenWord = ref(null);
  doubleBaitMode = ref(false);
  wrongEatenCount = ref(0);
  isLastWord = false;
  words = [];
  vietnameseMode = false;
  usedWords = /* @__PURE__ */ new Set();
  // Audio context for sound effects
  audioContext = null;
  // Timeline recording callback
  onMoveCallback;
  resetGame() {
    this.snake.value = {
      body: [{ x: 10, y: 10 }],
      direction: { x: 0, y: 0 },
      currentWord: ""
    };
    this.food.value = null;
    this.secondaryFood.value = null;
    this.score.value = 0;
    this.gameOver.value = false;
    this.gameRunning.value = false;
    this.currentTargetWord.value = "";
    this.wordsCompleted.value = 0;
    this.usedWords.clear();
    this.lastEatenFoodPos.value = null;
    this.lastEatenWord.value = null;
    this.doubleBaitMode.value = false;
    this.wrongEatenCount.value = 0;
    this.isLastWord = false;
  }
  updateDirection(direction) {
    const currentDir = this.snake.value.direction;
    if (direction.x !== -currentDir.x || direction.y !== -currentDir.y) {
      this.snake.value.direction = direction;
    }
  }
  moveSnake() {
    if (!this.gameRunning.value || this.gameOver.value) return;
    const snake = this.snake.value;
    const head = { ...snake.body[0] };
    head.x += snake.direction.x;
    head.y += snake.direction.y;
    if (head.x < 0) head.x = 29;
    else if (head.x >= 30) head.x = 0;
    if (head.y < 0) head.y = 19;
    else if (head.y >= 20) head.y = 0;
    if (this.checkCollision()) {
      this.setGameOver();
      return;
    }
    snake.body.unshift(head);
    const headNow = this.snake.value.body[0];
    const hitPrimary = this.food.value && headNow.x === this.food.value.position.x && headNow.y === this.food.value.position.y;
    const hitSecondary = this.secondaryFood.value && headNow.x === this.secondaryFood.value.position.x && headNow.y === this.secondaryFood.value.position.y;
    if (hitPrimary) {
      this.incrementScore();
      this.wordsCompleted.value++;
      if (this.food.value) {
        this.lastEatenFoodPos.value = { ...this.food.value.position };
        this.lastEatenWord.value = this.food.value.word;
      }
      this.playEatFoodSound();
      if (this.isLastWord) {
        this.setGameOver();
        return;
      }
      this.generateFood(this.words, this.vietnameseMode);
    } else if (hitSecondary) {
      this.wrongEatenCount.value++;
      if (this.secondaryFood.value) {
        this.lastEatenFoodPos.value = { ...this.secondaryFood.value.position };
        this.lastEatenWord.value = this.secondaryFood.value.word;
      }
      snake.body.pop();
      this.generateFood(this.words, this.vietnameseMode);
    } else {
      snake.body.pop();
    }
    if (this.onMoveCallback) {
      this.onMoveCallback([...snake.body.map((seg) => ({ x: seg.x, y: seg.y }))], { x: snake.direction.x, y: snake.direction.y });
    }
  }
  generateFood(words, vietnameseMode) {
    this.words = words;
    this.vietnameseMode = vietnameseMode;
    if (words.length === 0) return;
    const availableWords = words.filter((w) => !this.usedWords.has(w.word));
    if (availableWords.length === 0) {
      this.setGameOver();
      return;
    }
    const targetWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    this.usedWords.add(targetWord.word);
    this.currentTargetWord.value = targetWord.word;
    const remainingWords = words.filter((w) => !this.usedWords.has(w.word));
    if (remainingWords.length === 0) {
      this.isLastWord = true;
    } else {
      this.isLastWord = false;
    }
    const randomFreePos = (blocked = []) => {
      let pos;
      do {
        pos = {
          x: Math.floor(Math.random() * 25) + 2,
          // Grid 30x20, avoid edges
          y: Math.floor(Math.random() * 15) + 2
        };
      } while (this.snake.value.body.some((seg) => seg.x === pos.x && seg.y === pos.y) || blocked.some((b) => b.x === pos.x && b.y === pos.y));
      return pos;
    };
    const primaryPos = randomFreePos();
    this.food.value = {
      position: primaryPos,
      word: targetWord.word,
      firstLetter: vietnameseMode && targetWord.meaning ? targetWord.meaning.charAt(0).toUpperCase() : targetWord.word.charAt(0).toUpperCase(),
      meaning: targetWord.meaning
    };
    if (!this.doubleBaitMode.value) {
      this.secondaryFood.value = null;
      return;
    }
    const others = words.filter((w) => w.word !== targetWord.word);
    if (others.length === 0) {
      this.secondaryFood.value = null;
      return;
    }
    const wrong = others[Math.floor(Math.random() * others.length)];
    const secondaryPos = randomFreePos([primaryPos]);
    this.secondaryFood.value = {
      position: secondaryPos,
      word: wrong.word,
      firstLetter: vietnameseMode && wrong.meaning ? wrong.meaning.charAt(0).toUpperCase() : wrong.word.charAt(0).toUpperCase(),
      meaning: wrong.meaning
    };
  }
  checkCollision() {
    const head = this.snake.value.body[0];
    for (let i = 1; i < this.snake.value.body.length; i++) {
      if (head.x === this.snake.value.body[i].x && head.y === this.snake.value.body[i].y) {
        return true;
      }
    }
    return false;
  }
  checkFoodCollision() {
    if (!this.food.value) return false;
    const head = this.snake.value.body[0];
    return head.x === this.food.value.position.x && head.y === this.food.value.position.y;
  }
  incrementScore() {
    this.score.value += 10;
  }
  setGameOver() {
    this.gameOver.value = true;
    this.gameRunning.value = false;
  }
  setGameRunning(running) {
    this.gameRunning.value = running;
  }
  setDoubleBaitMode(enabled, words, vietnameseMode) {
    this.doubleBaitMode.value = enabled;
    if (words && typeof vietnameseMode === "boolean") {
      this.generateFood(words, vietnameseMode);
      return;
    }
    if (this.gameRunning.value && !this.gameOver.value) {
      this.generateFood(this.words, this.vietnameseMode);
    }
  }
  // Set timeline recording callback
  setTimelineCallback(callback) {
    this.onMoveCallback = callback;
  }
  initializeAudioContext() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (error) {
        console.warn("Web Audio API not supported:", error);
      }
    }
  }
  playEatFoodSound() {
    this.initializeAudioContext();
    if (!this.audioContext) return;
    try {
      const currentTime = this.audioContext.currentTime;
      const gainNode = this.audioContext.createGain();
      gainNode.connect(this.audioContext.destination);
      const frequencies = [261.63, 329.63, 392];
      frequencies.forEach((freq, index) => {
        const oscillator = this.audioContext.createOscillator();
        const noteGain = this.audioContext.createGain();
        oscillator.connect(noteGain);
        noteGain.connect(gainNode);
        oscillator.frequency.setValueAtTime(freq, currentTime);
        oscillator.type = "sine";
        const startTime = currentTime + index * 0.08;
        const endTime = startTime + 0.15;
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.01, endTime);
        oscillator.start(startTime);
        oscillator.stop(endTime);
      });
    } catch (error) {
      console.warn("Error playing eat food sound:", error);
    }
  }
}
class SnakeCanvasRenderer {
  canvasWidth = ref(600);
  canvasHeight = ref(400);
  gridSize = ref(20);
  canvas = null;
  ctx = null;
  // Simple particle system for explosion effect
  particles = [];
  // Tomato juice splatter stains (fade on the floor)
  stains = [];
  // Shock rings for a juicy burst feeling
  rings = [];
  initialize(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    canvas.width = this.canvasWidth.value;
    canvas.height = this.canvasHeight.value;
    const resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    resizeObserver.observe(canvas.parentElement || canvas);
  }
  // Draw a small label with the food meaning above the tile
  drawFoodLabel(food, variant) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const gridSize = this.gridSize.value;
    const x = food.position.x * gridSize;
    const y = food.position.y * gridSize;
    const text = (food.meaning || food.word || "").toString();
    if (!text) return;
    ctx.save();
    const bg = variant === "primary" ? "#065f46" : "#7c2d12";
    const stroke = variant === "primary" ? "#10b981" : "#f59e0b";
    const textColor = "#ffffff";
    ctx.font = `${Math.max(10, Math.floor(gridSize * 0.6))}px sans-serif`;
    const paddingX = 6;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const labelWidth = textWidth + paddingX * 2;
    const labelHeight = Math.max(gridSize * 0.7, 16);
    const labelX = x + gridSize / 2 - labelWidth / 2;
    const labelY = y - labelHeight - 6;
    const r = 6;
    ctx.beginPath();
    ctx.moveTo(labelX + r, labelY);
    ctx.lineTo(labelX + labelWidth - r, labelY);
    ctx.quadraticCurveTo(labelX + labelWidth, labelY, labelX + labelWidth, labelY + r);
    ctx.lineTo(labelX + labelWidth, labelY + labelHeight - r);
    ctx.quadraticCurveTo(labelX + labelWidth, labelY + labelHeight, labelX + labelWidth - r, labelY + labelHeight);
    ctx.lineTo(labelX + r, labelY + labelHeight);
    ctx.quadraticCurveTo(labelX, labelY + labelHeight, labelX, labelY + labelHeight - r);
    ctx.lineTo(labelX, labelY + r);
    ctx.quadraticCurveTo(labelX, labelY, labelX + r, labelY);
    ctx.closePath();
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = textColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, labelX + labelWidth / 2, labelY + labelHeight / 2);
    ctx.restore();
  }
  handleResize() {
    if (!this.canvas) return;
    const container = this.canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      const aspectRatio = 30 / 20;
      let width = Math.min(rect.width - 40, 600);
      let height = width / aspectRatio;
      if (height > rect.height - 40) {
        height = rect.height - 40;
        width = height * aspectRatio;
      }
      this.canvasWidth.value = width;
      this.canvasHeight.value = height;
      this.gridSize.value = width / 30;
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }
  render(stateManager) {
    if (!this.ctx) return;
    this.clearCanvas();
    this.drawGrid();
    this.updateAndDrawStains();
    this.drawFood(stateManager.food.value, "primary");
    this.drawFood(stateManager.secondaryFood?.value || null, "secondary");
    if (stateManager.doubleBaitMode?.value) {
      if (stateManager.food.value) this.drawFoodLabel(stateManager.food.value, "primary");
      if (stateManager.secondaryFood?.value) this.drawFoodLabel(stateManager.secondaryFood.value, "secondary");
    }
    this.drawSnake(stateManager.snake.value);
    if (stateManager.lastEatenFoodPos.value) {
      const gs = this.gridSize.value;
      const cx = stateManager.lastEatenFoodPos.value.x * gs + gs / 2;
      const cy = stateManager.lastEatenFoodPos.value.y * gs + gs / 2;
      this.spawnExplosion(cx, cy);
      this.spawnSplatStains(cx, cy);
      this.spawnShockRing(cx, cy);
      stateManager.lastEatenFoodPos.value = null;
    }
    this.updateAndDrawParticles();
    this.updateAndDrawRings();
  }
  clearCanvas() {
    if (!this.ctx) return;
    this.ctx.fillStyle = "#0a0a0a";
    this.ctx.fillRect(0, 0, this.canvasWidth.value, this.canvasHeight.value);
  }
  drawGrid() {
    if (!this.ctx) return;
    this.ctx.strokeStyle = "#0f0f0f";
    this.ctx.lineWidth = 1;
    const gridSize = this.gridSize.value;
    for (let x = 0; x <= 30; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * gridSize, 0);
      this.ctx.lineTo(x * gridSize, this.canvasHeight.value);
      this.ctx.stroke();
    }
    for (let y = 0; y <= 20; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * gridSize);
      this.ctx.lineTo(this.canvasWidth.value, y * gridSize);
      this.ctx.stroke();
    }
  }
  drawSnake(snake) {
    if (!this.ctx) return;
    const gridSize = this.gridSize.value;
    snake.body.forEach((segment, index) => {
      if (!this.ctx) return;
      if (index === 0) {
        this.ctx.fillStyle = "#10b981";
      } else {
        this.ctx.fillStyle = "#059669";
      }
      this.ctx.fillRect(
        segment.x * gridSize + 1,
        segment.y * gridSize + 1,
        gridSize - 2,
        gridSize - 2
      );
      this.ctx.strokeStyle = "#047857";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(
        segment.x * gridSize + 1,
        segment.y * gridSize + 1,
        gridSize - 2,
        gridSize - 2
      );
    });
  }
  drawFood(food, variant = "primary") {
    if (!this.ctx || !food) return;
    const gridSize = this.gridSize.value;
    const x = food.position.x * gridSize;
    const y = food.position.y * gridSize;
    this.ctx.fillStyle = variant === "secondary" ? "#f59e0b" : "#ef4444";
    this.ctx.beginPath();
    this.ctx.arc(x + gridSize / 2, y + gridSize / 2, gridSize * 0.35, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillStyle = "rgba(255,255,255,0.8)";
    this.ctx.beginPath();
    this.ctx.arc(x + gridSize / 2 - 3, y + gridSize / 2 - 3, gridSize * 0.12, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillStyle = "#111827";
    this.ctx.font = `${Math.floor(gridSize * 0.6)}px Inter, system-ui, -apple-system, Segoe UI, Roboto`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      food.firstLetter,
      x + gridSize / 2,
      y + gridSize / 2
    );
  }
  // Particle helpers
  spawnExplosion(cx, cy) {
    const colors = ["#ef4444", "#dc2626", "#f43f5e", "#f59e0b"];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const angle = Math.PI * 2 * i / count;
      const speed = 5 + Math.random() * 3;
      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 6 + Math.floor(Math.random() * 5),
        // very short for instant burst
        radius: 1.5 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    if (this.particles.length > 300) {
      this.particles.splice(0, this.particles.length - 300);
    }
  }
  updateAndDrawParticles() {
    if (!this.ctx) return;
    const gravity = 0;
    const friction = 1;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vx *= friction;
      p.vy = p.vy * friction + gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      const alpha = Math.max(0, 1 - p.life / p.maxLife);
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }
  }
  spawnSplatStains(cx, cy) {
    const stainColors = ["#b91c1c", "#dc2626", "#ef4444"];
    const splats = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < splats; i++) {
      const offsetR = Math.random() * 10;
      const offsetA = Math.random() * Math.PI * 2;
      const sx = cx + Math.cos(offsetA) * offsetR;
      const sy = cy + Math.sin(offsetA) * offsetR;
      this.stains.push({
        x: sx,
        y: sy,
        radius: 6 + Math.random() * 8,
        alpha: 0.6,
        decay: 0.06 + Math.random() * 0.06,
        color: stainColors[Math.floor(Math.random() * stainColors.length)]
      });
    }
    if (this.stains.length > 80) {
      this.stains.splice(0, this.stains.length - 80);
    }
  }
  updateAndDrawStains() {
    if (!this.ctx) return;
    for (let i = this.stains.length - 1; i >= 0; i--) {
      const s = this.stains[i];
      this.ctx.globalAlpha = Math.max(0, s.alpha);
      this.ctx.fillStyle = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
      s.alpha -= s.decay;
      if (s.alpha <= 0) {
        this.stains.splice(i, 1);
      }
    }
  }
  spawnShockRing(cx, cy) {
    this.rings.push({
      x: cx,
      y: cy,
      r: 2,
      maxR: 28,
      life: 0,
      maxLife: 10,
      color: "#ef4444"
    });
  }
  updateAndDrawRings() {
    if (!this.ctx) return;
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const ring = this.rings[i];
      ring.life++;
      const t = ring.life / ring.maxLife;
      ring.r = 2 + (ring.maxR - 2) * t;
      const alpha = Math.max(0, 1 - t);
      this.ctx.globalAlpha = alpha;
      this.ctx.strokeStyle = ring.color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
      if (ring.life >= ring.maxLife) {
        this.rings.splice(i, 1);
      }
    }
  }
}
class SnakeGameEngine {
  gameLoopId = ref(null);
  lastTimestamp = 0;
  accumulatorMs = 0;
  startGameLoop(stateManager, renderer) {
    if (this.gameLoopId.value) return;
    this.lastTimestamp = performance.now();
    this.accumulatorMs = 0;
    const frame = (ts) => {
      const dt = ts - this.lastTimestamp;
      this.lastTimestamp = ts;
      this.accumulatorMs += dt;
      while (stateManager.gameRunning.value && !stateManager.gameOver.value && this.accumulatorMs >= stateManager.gameSpeed.value) {
        stateManager.moveSnake();
        this.accumulatorMs -= stateManager.gameSpeed.value;
      }
      renderer.render(stateManager);
      if (stateManager.gameRunning.value && !stateManager.gameOver.value) {
        this.gameLoopId.value = requestAnimationFrame(frame);
      } else {
        this.gameLoopId.value = null;
      }
    };
    this.gameLoopId.value = requestAnimationFrame(frame);
  }
  stopGameLoop() {
    if (this.gameLoopId.value) {
      cancelAnimationFrame(this.gameLoopId.value);
      this.gameLoopId.value = null;
    }
  }
}
class SnakeGame {
  stateManager;
  canvasRenderer;
  gameEngine;
  constructor() {
    this.stateManager = new SnakeStateManager();
    this.canvasRenderer = new SnakeCanvasRenderer();
    this.gameEngine = new SnakeGameEngine();
  }
  initialize(canvas, words, vietnameseMode = false) {
    this.canvasRenderer.initialize(canvas);
    this.stateManager.resetGame();
    this.stateManager.generateFood(words, vietnameseMode);
    this.canvasRenderer.render(this.stateManager);
  }
  startGame() {
    if (this.stateManager.gameRunning.value) return;
    this.stateManager.setGameRunning(true);
    this.stateManager.updateDirection({ x: 1, y: 0 });
    this.gameEngine.startGameLoop(this.stateManager, this.canvasRenderer);
  }
  stopGame() {
    this.stateManager.setGameRunning(false);
    this.gameEngine.stopGameLoop();
  }
  handleKeyPress(event) {
    if (!this.stateManager.gameRunning.value || this.stateManager.gameOver.value) return;
    const directions = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      w: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      a: { x: -1, y: 0 },
      d: { x: 1, y: 0 }
    };
    const direction = directions[event.key];
    if (direction) {
      event.preventDefault();
      this.stateManager.updateDirection(direction);
    }
  }
  updateVietnameseMode(_vietnameseMode) {
    if (this.stateManager.gameRunning.value && this.stateManager.food.value) ;
  }
  cleanup() {
    this.stopGame();
  }
}
function useSnakeGame() {
  return new SnakeGame();
}
const _hoisted_1 = { class: "snake-game h-full min-h-[600px] sm:min-h-[500px] md:min-h-0 flex flex-col" };
const _hoisted_2 = { class: "p-4 sm:p-6 md:p-8 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-800 dark:to-emerald-800 text-white" };
const _hoisted_3 = { class: "flex justify-between items-center" };
const _hoisted_4 = { class: "text-lg sm:text-xl md:text-2xl font-bold" };
const _hoisted_5 = { class: "text-sm sm:text-base opacity-90" };
const _hoisted_6 = { class: "text-right" };
const _hoisted_7 = { class: "text-2xl sm:text-3xl font-bold" };
const _hoisted_8 = { class: "text-xs sm:text-sm opacity-90" };
const _hoisted_9 = { class: "flex-1 min-h-[450px] sm:min-h-[350px] md:min-h-0 relative bg-gradient-to-b from-gray-100 to-gray-200 dark:from-[#0a0a0a] dark:to-[#0f0f0f] overflow-hidden" };
const _hoisted_10 = { class: "text-center" };
const _hoisted_11 = { class: "text-sm sm:text-base font-bold text-gray-800 dark:text-white" };
const _hoisted_12 = {
  key: 0,
  class: "text-xs sm:text-sm text-gray-700 dark:text-white/80"
};
const _hoisted_13 = { class: "text-[11px] sm:text-xs text-gray-600 dark:text-white/70" };
const _hoisted_14 = {
  key: 1,
  class: "absolute top-4 left-4 bg-white/90 dark:bg-[#0a0a0a]/90 rounded-lg p-3 backdrop-blur-sm"
};
const _hoisted_15 = { class: "text-sm text-gray-700 dark:text-white" };
const _hoisted_16 = { class: "font-semibold mb-1" };
const _hoisted_17 = { class: "text-xs space-y-1" };
const _hoisted_18 = { class: "absolute top-4 right-4 bg-white/90 dark:bg-[#0a0a0a]/90 rounded-lg p-3 backdrop-blur-sm" };
const _hoisted_19 = { class: "text-center text-sm" };
const _hoisted_20 = { class: "text-xs text-gray-600 dark:text-white/70" };
const _hoisted_21 = { class: "text-lg font-bold text-green-600 dark:text-green-400" };
const _hoisted_22 = {
  key: 2,
  class: "absolute inset-0 flex items-center justify-center"
};
const _hoisted_23 = {
  class: "lg:hidden absolute bottom-3 left-0 right-0 flex items-center justify-center select-none",
  "aria-hidden": "false"
};
const _hoisted_24 = { class: "inline-flex flex-col items-center gap-2 bg-white/90 dark:bg-[#0a0a0a]/90 border border-gray-200 dark:border-[#0f0f0f] rounded-xl p-3 shadow-lg" };
const _hoisted_25 = ["aria-label"];
const _hoisted_26 = { class: "flex items-center gap-2" };
const _hoisted_27 = ["aria-label"];
const _hoisted_28 = ["aria-label"];
const _hoisted_29 = ["aria-label"];
const _hoisted_30 = {
  key: 0,
  class: "absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
};
const _hoisted_31 = { class: "bg-white dark:bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-gray-200 dark:border-[#0f0f0f]" };
const _hoisted_32 = { class: "text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white" };
const _hoisted_33 = { class: "text-gray-600 dark:text-white/70 mb-4" };
const _hoisted_34 = { class: "text-sm text-gray-500 dark:text-white/60 mb-6" };
const _hoisted_35 = { class: "flex gap-3 justify-center" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SnakeGameMode",
  props: {
    words: {},
    vietnameseMode: { type: Boolean },
    doubleBaitMode: { type: Boolean },
    recordTimeline: { type: Boolean }
  },
  emits: ["game-complete", "correct-food-eaten", "wrong-food-eaten"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { t } = useI18n();
    const emit = __emit;
    const game = useSnakeGame();
    const gameCanvas = ref();
    computed(() => game.canvasRenderer.canvasWidth.value);
    computed(() => game.canvasRenderer.canvasHeight.value);
    const gridSize = computed(() => game.canvasRenderer.gridSize.value);
    const score = computed(() => game.stateManager.score.value);
    const wordsCompleted = computed(() => game.stateManager.wordsCompleted.value);
    const gameOver = computed(() => game.stateManager.gameOver.value);
    const gameRunning = computed(() => game.stateManager.gameRunning.value);
    const currentTargetWord = computed(() => game.stateManager.currentTargetWord.value);
    const snakeHead = computed(() => game.stateManager.snake.value.body[0]);
    const timelineFrames = ref([]);
    const handleTimelineFrame = (body, direction) => {
      if (!props.recordTimeline) return;
      timelineFrames.value.push({
        body: [...body],
        direction: { ...direction }
      });
    };
    watch(
      () => props.recordTimeline,
      (enabled) => {
        if (enabled) {
          game.stateManager.setTimelineCallback(handleTimelineFrame);
          timelineFrames.value = [];
        } else {
          game.stateManager.setTimelineCallback(void 0);
          timelineFrames.value = [];
        }
      }
    );
    const snakeHeadDisplayStyle = computed(() => {
      if (!snakeHead.value || !gameRunning.value) {
        return { display: "none" };
      }
      const x = snakeHead.value.x * gridSize.value + gridSize.value / 2;
      const y = snakeHead.value.y * gridSize.value - 40;
      return {
        left: `${x}px`,
        top: `${y}px`,
        transform: "translateX(-50%)",
        zIndex: "10"
      };
    });
    const currentTargetPronunciation = computed(() => {
      const w = currentTargetWord.value;
      if (!w) return "";
      const found = props.words.find((v) => v.word === w);
      return found?.pronunciation || "";
    });
    const currentTargetPronunciationDisplay = computed(() => {
      const raw = (currentTargetPronunciation.value || "").trim();
      if (!raw) return "";
      const stripped = raw.replace(/^\s*[\/\[\]()]+|[\/\[\]()]+\s*$/g, "");
      return stripped ? `/${stripped}/` : "";
    });
    const prevWordsCompleted = ref(0);
    const stopWordsWatch = watch(
      () => game.stateManager.wordsCompleted.value,
      (newVal, oldVal) => {
        if (typeof oldVal === "number" && newVal > oldVal) {
          const lastWord = game.stateManager.lastEatenWord?.value || "";
          const lastPosition = game.stateManager.lastEatenFoodPos?.value || { x: 0, y: 0 };
          const currentVocab = props.words.find((w) => w.word === lastWord);
          const details = {
            word: lastWord,
            meaningShort: currentVocab?.meaning || lastWord,
            position: lastPosition,
            snakeLength: game.stateManager.snake.value.body.length,
            gameScore: game.stateManager.score.value,
            wordsCompleted: game.stateManager.wordsCompleted.value,
            wrongEatenCount: game.stateManager.wrongEatenCount?.value ?? 0,
            snakeBody: [...game.stateManager.snake.value.body],
            direction: { ...game.stateManager.snake.value.direction },
            timelineFrames: props.recordTimeline && timelineFrames.value.length ? [...timelineFrames.value.map((f) => ({
              body: f.body.map((seg) => ({ x: seg.x, y: seg.y })),
              direction: { x: f.direction.x, y: f.direction.y }
            }))] : void 0
          };
          console.log("[DEBUG] Snake correct food details:", details);
          console.log("[DEBUG] Snake body:", details.snakeBody);
          console.log("[DEBUG] Snake direction:", details.direction);
          emit("correct-food-eaten", details);
          if (props.recordTimeline) timelineFrames.value = [];
          if (lastWord) {
            const { playAudio } = useVoiceStore();
            playAudio(lastWord).catch(() => {
            });
          }
        }
        prevWordsCompleted.value = newVal;
      }
    );
    const prevWrongEaten = ref(0);
    const stopWrongWatch = watch(
      () => game.stateManager.wrongEatenCount?.value,
      (newVal, oldVal) => {
        if (typeof newVal === "number" && typeof oldVal === "number" && newVal > oldVal) {
          const lastWord = game.stateManager.lastEatenWord?.value || "";
          const lastPosition = game.stateManager.lastEatenFoodPos?.value || { x: 0, y: 0 };
          const currentVocab = props.words.find((w) => w.word === lastWord);
          const details = {
            word: lastWord,
            meaningShort: currentVocab?.meaning || lastWord,
            position: lastPosition,
            snakeLength: game.stateManager.snake.value.body.length,
            gameScore: game.stateManager.score.value,
            wordsCompleted: game.stateManager.wordsCompleted.value,
            wrongEatenCount: newVal,
            snakeBody: [...game.stateManager.snake.value.body],
            direction: { ...game.stateManager.snake.value.direction },
            timelineFrames: props.recordTimeline && timelineFrames.value.length ? [...timelineFrames.value.map((f) => ({
              body: f.body.map((seg) => ({ x: seg.x, y: seg.y })),
              direction: { x: f.direction.x, y: f.direction.y }
            }))] : void 0
          };
          emit("wrong-food-eaten", details);
          if (props.recordTimeline) timelineFrames.value = [];
          if (lastWord) {
            const { playAudio } = useVoiceStore();
            playAudio(lastWord).catch(() => {
            });
          }
        }
        if (typeof newVal === "number") prevWrongEaten.value = newVal;
      }
    );
    const stopGameOverWatch = watch(
      () => game.stateManager.gameOver.value,
      (isGameOver) => {
        if (isGameOver) {
          emit("game-complete");
        }
      }
    );
    watch(() => props.vietnameseMode, (newValue) => {
      game.updateVietnameseMode(newValue ?? false);
      if (game.stateManager.gameRunning.value) {
        game.stateManager.generateFood(props.words, newValue ?? false);
      }
    });
    watch(() => props.doubleBaitMode, (enabled) => {
      if (game.stateManager.setDoubleBaitMode) {
        game.stateManager.setDoubleBaitMode(!!enabled, props.words, props.vietnameseMode ?? false);
      }
    });
    const focusCanvas = () => {
      if (gameCanvas.value) {
        gameCanvas.value.focus();
      }
    };
    const startGame = () => {
      game.startGame();
      focusCanvas();
    };
    const restartGame = () => {
      game.stopGame();
      game.stateManager.resetGame();
      if (gameCanvas.value) {
        game.initialize(gameCanvas.value, props.words, props.vietnameseMode);
        if (game.stateManager.setDoubleBaitMode) {
          game.stateManager.setDoubleBaitMode(!!props.doubleBaitMode, props.words, props.vietnameseMode ?? false);
        }
        if (props.recordTimeline) {
          game.stateManager.setTimelineCallback(handleTimelineFrame);
        } else {
          game.stateManager.setTimelineCallback(void 0);
        }
      }
    };
    const handleKeyPress = (event) => {
      game.handleKeyPress(event);
    };
    const changeDirection = (dx, dy) => {
      if (gameOver.value) return;
      const notRunning = !gameRunning.value;
      if (notRunning) {
        game.startGame();
      }
      game.stateManager.updateDirection({ x: dx, y: dy });
    };
    onMounted(async () => {
      await nextTick();
      if (!gameCanvas.value) return;
      game.initialize(gameCanvas.value, props.words, props.vietnameseMode);
      if (game.stateManager.setDoubleBaitMode) {
        game.stateManager.setDoubleBaitMode(!!props.doubleBaitMode, props.words, props.vietnameseMode ?? false);
      }
      if (props.recordTimeline) {
        game.stateManager.setTimelineCallback(handleTimelineFrame);
      } else {
        game.stateManager.setTimelineCallback(void 0);
      }
      document.addEventListener("keydown", handleKeyPress);
    });
    onUnmounted(() => {
      stopGameOverWatch();
      stopWordsWatch();
      stopWrongWatch();
      document.removeEventListener("keydown", handleKeyPress);
      game.cleanup();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", null, [
              createBaseVNode("h2", _hoisted_4, toDisplayString(unref(t)("flashcard.snakeGame.title", "Snake Hunt")), 1),
              createBaseVNode("p", _hoisted_5, toDisplayString(unref(t)("flashcard.snakeGame.instruction", "Guide the snake to catch vocabulary letters!")), 1)
            ]),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, toDisplayString(score.value), 1),
              createBaseVNode("div", _hoisted_8, toDisplayString(unref(t)("flashcard.snakeGame.score", "Score")), 1)
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("canvas", {
            ref_key: "gameCanvas",
            ref: gameCanvas,
            class: "w-full h-full border-2 border-gray-300 dark:border-[#0f0f0f]",
            tabindex: "0",
            onKeydown: handleKeyPress
          }, null, 544),
          currentTargetWord.value && gameRunning.value && !gameOver.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "absolute bg-white dark:bg-[#0a0a0a] rounded-lg px-3 py-2 shadow-lg border-2 border-green-500 pointer-events-none",
            style: normalizeStyle(snakeHeadDisplayStyle.value)
          }, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, toDisplayString(currentTargetWord.value), 1),
              currentTargetPronunciationDisplay.value ? (openBlock(), createElementBlock("div", _hoisted_12, toDisplayString(currentTargetPronunciationDisplay.value), 1)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_13, toDisplayString(unref(t)("flashcard.snakeGame.target", "Target")), 1)
            ])
          ], 4)) : createCommentVNode("", true),
          !gameRunning.value && !gameOver.value ? (openBlock(), createElementBlock("div", _hoisted_14, [
            createBaseVNode("div", _hoisted_15, [
              createBaseVNode("div", _hoisted_16, toDisplayString(unref(t)("flashcard.snakeGame.controls", "Controls")) + ":", 1),
              createBaseVNode("div", _hoisted_17, [
                createBaseVNode("div", null, toDisplayString(unref(t)("flashcard.snakeGame.arrowKeys", "Arrow Keys / WASD")), 1),
                createBaseVNode("div", null, toDisplayString(unref(t)("flashcard.snakeGame.clickToStart", "Click START to begin")), 1)
              ])
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_18, [
            createBaseVNode("div", _hoisted_19, [
              createBaseVNode("div", _hoisted_20, toDisplayString(unref(t)("flashcard.snakeGame.completed", "Completed")), 1),
              createBaseVNode("div", _hoisted_21, toDisplayString(wordsCompleted.value), 1)
            ])
          ]),
          !gameRunning.value && !gameOver.value ? (openBlock(), createElementBlock("div", _hoisted_22, [
            createBaseVNode("button", {
              onClick: startGame,
              class: "px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-200 shadow-2xl"
            }, toDisplayString(unref(t)("flashcard.snakeGame.start", "START HUNT")), 1)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_23, [
            createBaseVNode("div", _hoisted_24, [
              createBaseVNode("button", {
                type: "button",
                "aria-label": unref(t)("flashcard.snakeGame.up", "Up"),
                class: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow active:scale-95 transition",
                onClick: _cache[0] || (_cache[0] = ($event) => changeDirection(0, -1))
              }, _cache[5] || (_cache[5] = [
                createBaseVNode("svg", {
                  class: "w-6 h-6 sm:w-7 sm:h-7",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M10 4a.75.75 0 01.53.22l5 5a.75.75 0 11-1.06 1.06L10.75 6.56V16a.75.75 0 01-1.5 0V6.56L5.53 10.28a.75.75 0 01-1.06-1.06l5-5A.75.75 0 0110 4z",
                    "clip-rule": "evenodd"
                  })
                ], -1)
              ]), 8, _hoisted_25),
              createBaseVNode("div", _hoisted_26, [
                createBaseVNode("button", {
                  type: "button",
                  "aria-label": unref(t)("flashcard.snakeGame.left", "Left"),
                  class: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow active:scale-95 transition",
                  onClick: _cache[1] || (_cache[1] = ($event) => changeDirection(-1, 0))
                }, _cache[6] || (_cache[6] = [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 sm:w-7 sm:h-7",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4 10a.75.75 0 01.22-.53l5-5a.75.75 0 111.06 1.06L6.56 9.25H16a.75.75 0 010 1.5H6.56l3.72 3.72a.75.75 0 11-1.06 1.06l-5-5A.75.75 0 014 10z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)
                ]), 8, _hoisted_27),
                createBaseVNode("button", {
                  type: "button",
                  "aria-label": unref(t)("flashcard.snakeGame.down", "Down"),
                  class: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow active:scale-95 transition",
                  onClick: _cache[2] || (_cache[2] = ($event) => changeDirection(0, 1))
                }, _cache[7] || (_cache[7] = [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 sm:w-7 sm:h-7",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M10 16a.75.75 0 01-.53-.22l-5-5a.75.75 0 111.06-1.06l3.72 3.72V4a.75.75 0 011.5 0v9.44l3.72-3.72a.75.75 0 111.06 1.06l-5 5A.75.75 0 0110 16z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)
                ]), 8, _hoisted_28),
                createBaseVNode("button", {
                  type: "button",
                  "aria-label": unref(t)("flashcard.snakeGame.right", "Right"),
                  class: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow active:scale-95 transition",
                  onClick: _cache[3] || (_cache[3] = ($event) => changeDirection(1, 0))
                }, _cache[8] || (_cache[8] = [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 sm:w-7 sm:h-7",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M16 10a.75.75 0 01-.22.53l-5 5a.75.75 0 11-1.06-1.06l3.72-3.72H4a.75.75 0 010-1.5h9.44L9.72 5.53a.75.75 0 111.06-1.06l5 5c.14.14.22.33.22.53z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)
                ]), 8, _hoisted_29)
              ])
            ])
          ]),
          createVNode(Transition, {
            name: "modal",
            appear: ""
          }, {
            default: withCtx(() => [
              gameOver.value ? (openBlock(), createElementBlock("div", _hoisted_30, [
                createBaseVNode("div", _hoisted_31, [
                  _cache[9] || (_cache[9] = createBaseVNode("div", { class: "w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse" }, [
                    createBaseVNode("svg", {
                      class: "w-8 h-8 sm:w-10 sm:h-10 text-white",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      })
                    ])
                  ], -1)),
                  createBaseVNode("h3", _hoisted_32, toDisplayString(unref(t)("flashcard.snakeGame.gameComplete", "Hunt Complete!")), 1),
                  createBaseVNode("p", _hoisted_33, toDisplayString(unref(t)("flashcard.snakeGame.finalScore", { score: score.value }, `Final Score: ${score.value}`)), 1),
                  createBaseVNode("p", _hoisted_34, toDisplayString(unref(t)("flashcard.snakeGame.wordsHunted", { count: wordsCompleted.value }, `Words hunted: ${wordsCompleted.value}`)), 1),
                  createBaseVNode("div", _hoisted_35, [
                    createBaseVNode("button", {
                      onClick: restartGame,
                      class: "px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
                    }, toDisplayString(unref(t)("flashcard.snakeGame.playAgain", "Hunt Again")), 1),
                    createBaseVNode("button", {
                      onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("game-complete")),
                      class: "px-6 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-[#0f0f0f] dark:hover:bg-[#1a1a1a] text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
                    }, toDisplayString(unref(t)("common.finish", "Finish")), 1)
                  ])
                ])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const SnakeGameMode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43ecfa73"]]);
export {
  SnakeGameMode as default
};
//# sourceMappingURL=SnakeGameMode-ZR_ZgjIs.js.map
