import { A as ref, d as defineComponent, H as useI18n, B as computed, K as watch, I as onMounted, q as nextTick, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, e as createCommentVNode, y as createVNode, w as withCtx, M as Transition } from "./vendor-DoTKyHPB.js";
import { e as useVoiceStore, a as _export_sfc } from "./index-CKyoWkJ5.js";
import "./vendor-toast-D1B2ty4j.js";
class GameStateManager {
  // Game State
  score = ref(0);
  wordsMatched = ref(0);
  gameOver = ref(false);
  bubbles = ref([]);
  shootingBubble = ref(null);
  currentShooterWord = ref("");
  currentShooterColor = ref("#FF6B6B");
  explosions = ref([]);
  particles = ref([]);
  screenShake = ref({ x: 0, y: 0, intensity: 0 });
  aimLine = ref({ visible: false, x: 0, y: 0 });
  shooterPosition = ref({ x: 400, y: 550 });
  rowAnimationActive = ref(false);
  // Private state for color mapping
  wordColorMap = /* @__PURE__ */ new Map();
  COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#FFB347"];
  // Game Management Methods
  resetGame() {
    this.score.value = 0;
    this.wordsMatched.value = 0;
    this.gameOver.value = false;
    this.bubbles.value = [];
    this.shootingBubble.value = null;
    this.explosions.value = [];
    this.particles.value = [];
    this.screenShake.value = { x: 0, y: 0, intensity: 0 };
    this.aimLine.value = { visible: false, x: 0, y: 0 };
    this.currentShooterWord.value = "";
    this.currentShooterColor.value = "#FF6B6B";
  }
  updateScore(points) {
    this.score.value += points;
  }
  incrementWordsMatched() {
    this.wordsMatched.value += 1;
  }
  setGameOver(gameOver) {
    this.gameOver.value = gameOver;
  }
  setRowAnimationActive(active) {
    this.rowAnimationActive.value = active;
  }
  // Bubble Management
  addBubble(bubble) {
    this.bubbles.value.push(bubble);
  }
  removeBubbles(bubbleIds) {
    this.bubbles.value = this.bubbles.value.filter(
      (bubble) => !bubbleIds.includes(bubble.id)
    );
  }
  setShootingBubble(bubble) {
    this.shootingBubble.value = bubble;
  }
  selectNextShooterWord(words) {
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      this.currentShooterWord.value = randomWord.word;
      this.currentShooterColor.value = this.getColorForWord(randomWord.word);
    }
  }
  // Visual Effects Management
  updateAimLine(position) {
    if (position) {
      this.aimLine.value = {
        visible: true,
        x: position.x,
        y: position.y
      };
    } else {
      this.aimLine.value.visible = false;
    }
  }
  addExplosion(explosion) {
    this.explosions.value.push(explosion);
  }
  updateExplosions() {
    this.explosions.value.forEach((explosion) => {
      if (!explosion.active) return;
      if (explosion.shockwave.radius < explosion.shockwave.maxRadius) {
        explosion.shockwave.radius += 2;
        explosion.shockwave.intensity = Math.max(0, 1 - explosion.shockwave.radius / explosion.shockwave.maxRadius);
      }
      let activeParticles = 0;
      explosion.particles.forEach((particle) => {
        if (particle.life > 0) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.rotation += particle.rotationSpeed;
          switch (particle.type) {
            case "burst":
              particle.vy += 0.15;
              particle.vx *= 0.96;
              particle.vy *= 0.96;
              particle.life -= 0.025;
              break;
            case "spark":
              particle.vy += 0.05;
              particle.vx *= 0.99;
              particle.vy *= 0.99;
              particle.life -= 0.04;
              break;
            case "glow":
              particle.vy += 0.08;
              particle.vx *= 0.97;
              particle.vy *= 0.97;
              particle.life -= 0.015;
              break;
          }
          activeParticles++;
        }
      });
      if (activeParticles === 0 && explosion.shockwave.radius >= explosion.shockwave.maxRadius) {
        explosion.active = false;
      }
    });
    this.updateScreenShake();
    this.explosions.value = this.explosions.value.filter((explosion) => explosion.active);
  }
  // Screen Shake Management
  addScreenShake(intensity) {
    this.screenShake.value.intensity = Math.max(this.screenShake.value.intensity, intensity);
  }
  updateScreenShake() {
    if (this.screenShake.value.intensity > 0) {
      this.screenShake.value.x = (Math.random() - 0.5) * this.screenShake.value.intensity;
      this.screenShake.value.y = (Math.random() - 0.5) * this.screenShake.value.intensity;
      this.screenShake.value.intensity *= 0.9;
      if (this.screenShake.value.intensity < 0.1) {
        this.screenShake.value.intensity = 0;
        this.screenShake.value.x = 0;
        this.screenShake.value.y = 0;
      }
    }
  }
  // Private helper method for color mapping
  getColorForWord(word) {
    if (!this.wordColorMap.has(word)) {
      let hash = 0;
      for (let i = 0; i < word.length; i++) {
        hash = (hash << 5) - hash + word.charCodeAt(i) & 4294967295;
      }
      const colorIndex = Math.abs(hash) % this.COLORS.length;
      this.wordColorMap.set(word, this.COLORS[colorIndex]);
    }
    return this.wordColorMap.get(word);
  }
}
const useGameStateManager = () => {
  return new GameStateManager();
};
class AudioSystem {
  voiceStore = useVoiceStore();
  createAudioContext() {
    try {
      return new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.log("Audio context not available");
      return null;
    }
  }
  playImpactSound() {
    const audioContext = this.createAudioContext();
    if (!audioContext) return;
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      oscillator.type = "sine";
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      console.log("Impact sound failed:", error);
    }
  }
  playExplosionSound() {
    const audioContext = this.createAudioContext();
    if (!audioContext) return;
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
      filterNode.frequency.setValueAtTime(2e3, audioContext.currentTime);
      filterNode.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.3);
      filterNode.Q.setValueAtTime(3, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.type = "sawtooth";
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log("Explosion sound failed:", error);
    }
  }
  playBounceSound() {
    const audioContext = this.createAudioContext();
    if (!audioContext) return;
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.08);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
      oscillator.type = "triangle";
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.08);
    } catch (error) {
      console.log("Bounce sound failed:", error);
    }
  }
  playVocabularySound(text, language = "en") {
    try {
      if (!("speechSynthesis" in window)) {
        console.log("Speech Synthesis not supported");
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = this.voiceStore.createUtterance(text);
      if (language === "vi") {
        utterance.lang = "vi-VN";
        const vietnameseVoices = window.speechSynthesis.getVoices().filter(
          (voice) => voice.lang.startsWith("vi")
        );
        if (vietnameseVoices.length > 0) {
          utterance.voice = vietnameseVoices[0];
        }
      } else if (language === "ko") {
        utterance.lang = "ko-KR";
        const koreanVoices = window.speechSynthesis.getVoices().filter(
          (voice) => voice.lang.startsWith("ko")
        );
        if (koreanVoices.length > 0) {
          utterance.voice = koreanVoices[0];
        }
      }
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.log("Vocabulary sound failed:", error);
    }
  }
}
const useAudioSystem = () => {
  return new AudioSystem();
};
class PhysicsEngine {
  BUBBLE_SIZE = 40;
  COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#FFB347"];
  // Small epsilon to treat tiny gaps as contact to avoid visible spacing
  CONTACT_EPS = 8;
  wordColorMap = /* @__PURE__ */ new Map();
  stateManager;
  constructor(stateManager) {
    this.stateManager = stateManager;
  }
  getColorForWord(word) {
    if (!this.wordColorMap.has(word)) {
      let hash = 0;
      for (let i = 0; i < word.length; i++) {
        hash = (hash << 5) - hash + word.charCodeAt(i) & 4294967295;
      }
      const colorIndex = Math.abs(hash) % this.COLORS.length;
      this.wordColorMap.set(word, this.COLORS[colorIndex]);
    }
    return this.wordColorMap.get(word);
  }
  checkCollision(bubble1, bubble2) {
    const dx = bubble2.x - bubble1.x;
    const dy = bubble2.y - bubble1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= this.BUBBLE_SIZE;
  }
  animateShootingBubble(bubble, vx, vy, onLand, existingBubbles, canvasWidth = 800, canvasHeight = 600) {
    let bounceCount = 0;
    const maxBounces = 3;
    let currentVx = vx;
    let currentVy = vy;
    const animate = () => {
      bubble.x += currentVx;
      bubble.y += currentVy;
      if (existingBubbles) {
        for (const existing of existingBubbles) {
          const isAnimating = this.stateManager?.rowAnimationActive.value;
          const isNewRow = isAnimating && (existing.row ?? 0) < 0;
          const existingX = isNewRow ? existing.x : isAnimating && existing.stableX !== void 0 ? existing.stableX : existing.x;
          const existingY = isNewRow ? this.BUBBLE_SIZE / 2 : isAnimating && existing.stableY !== void 0 ? existing.stableY : existing.y;
          const dx0 = bubble.x - existingX;
          const dy0 = bubble.y - existingY;
          const dist0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);
          const nearThreshold = this.BUBBLE_SIZE + this.CONTACT_EPS;
          const approaching = dx0 * currentVx + dy0 * currentVy <= 0;
          if (dist0 <= nearThreshold && approaching) {
            console.log("Collision/near-contact detected! Computing tangent and triple-contact placement");
            let dx = dx0;
            let dy = dy0;
            let dist = dist0;
            if (dist < 0.01) {
              dx = -currentVx || 0;
              dy = -currentVy || -1;
              const norm = Math.sqrt(dx * dx + dy * dy) || 1;
              dx /= norm;
              dy /= norm;
            } else {
              dx /= dist;
              dy /= dist;
            }
            const tangentX = existingX + dx * this.BUBBLE_SIZE;
            const tangentY = existingY + dy * this.BUBBLE_SIZE;
            bubble.x = tangentX;
            bubble.y = tangentY;
            if (existingBubbles) {
              this.snapToGrid(bubble, existingBubbles);
              this.forceToNearestFreeSeat(bubble, existingBubbles, canvasWidth, canvasHeight);
            } else {
              const verticalSpacing = this.BUBBLE_SIZE * Math.sqrt(3) / 2;
              const baseX = this.BUBBLE_SIZE / 2;
              const baseY = this.BUBBLE_SIZE / 2;
              bubble.row = Math.max(0, Math.round((bubble.y - baseY) / verticalSpacing));
              bubble.col = Math.max(0, Math.round((bubble.x - baseX) / this.BUBBLE_SIZE));
            }
            currentVx = 0;
            currentVy = 0;
            onLand(bubble);
            return;
          }
        }
      }
      if (bubble.x <= this.BUBBLE_SIZE / 2 || bubble.x >= canvasWidth - this.BUBBLE_SIZE / 2) {
        currentVx = -currentVx * 0.8;
        bounceCount++;
        bubble.x = Math.max(this.BUBBLE_SIZE / 2, Math.min(canvasWidth - this.BUBBLE_SIZE / 2, bubble.x));
      }
      if (bubble.y <= this.BUBBLE_SIZE / 2) {
        bubble.y = this.BUBBLE_SIZE / 2;
        const baseX = this.BUBBLE_SIZE / 2;
        const targetCol = Math.round((bubble.x - baseX) / this.BUBBLE_SIZE);
        bubble.x = baseX + targetCol * this.BUBBLE_SIZE;
        bubble.row = 0;
        bubble.col = Math.max(0, targetCol);
        currentVy = 0;
        bounceCount = maxBounces;
      }
      if (bubble.y >= canvasHeight - this.BUBBLE_SIZE / 2) {
        bubble.y = canvasHeight - this.BUBBLE_SIZE / 2;
        currentVy = 0;
        bounceCount = maxBounces;
      }
      if (bounceCount > 0 && currentVy > 2) {
        currentVy += 0.05;
      }
      const slowMoving = Math.abs(currentVx) < 3 && Math.abs(currentVy) < 3;
      const nearLeftWall = bubble.x <= this.BUBBLE_SIZE / 2 + 20;
      const nearRightWall = bubble.x >= canvasWidth - this.BUBBLE_SIZE / 2 - 20;
      const nearTopWall = bubble.y <= this.BUBBLE_SIZE / 2 + 20;
      const stickToWall = bounceCount > 0 && (slowMoving && (nearLeftWall || nearRightWall) || nearTopWall && Math.abs(currentVy) < 2);
      if (bubble.y <= this.BUBBLE_SIZE / 2 && currentVy <= 0 || bounceCount >= maxBounces || stickToWall) {
        if (existingBubbles && existingBubbles.length > 0) {
          const captureRadius = this.BUBBLE_SIZE + this.CONTACT_EPS;
          let nearest = null;
          let bestDist = Number.POSITIVE_INFINITY;
          for (const b of existingBubbles) {
            const isAnimating = this.stateManager?.rowAnimationActive.value;
            const isNewRow = isAnimating && (b.row ?? 0) < 0;
            const bx = isNewRow ? b.x : isAnimating && b.stableX !== void 0 ? b.stableX : b.x;
            const by = isNewRow ? this.BUBBLE_SIZE / 2 : isAnimating && b.stableY !== void 0 ? b.stableY : b.y;
            const dx = bubble.x - bx;
            const dy = bubble.y - by;
            const d = Math.sqrt(dx * dx + dy * dy);
            const dot = dx * currentVx + dy * currentVy;
            if (dot > 0) continue;
            if (d < captureRadius && d < bestDist) {
              nearest = b;
              bestDist = d;
            }
          }
          if (nearest) {
            const isAnimating2 = this.stateManager?.rowAnimationActive.value;
            const isNewRow2 = isAnimating2 && (nearest.row ?? 0) < 0;
            const nx = isNewRow2 ? nearest.x : isAnimating2 && nearest.stableX !== void 0 ? nearest.stableX : nearest.x;
            const ny = isNewRow2 ? this.BUBBLE_SIZE / 2 : isAnimating2 && nearest.stableY !== void 0 ? nearest.stableY : nearest.y;
            let ndx = bubble.x - nx;
            let ndy = bubble.y - ny;
            const nlen = Math.sqrt(ndx * ndx + ndy * ndy) || 1;
            ndx /= nlen;
            ndy /= nlen;
            const tangentX = nx + ndx * this.BUBBLE_SIZE;
            const tangentY = ny + ndy * this.BUBBLE_SIZE;
            const triple = this.findTripleContactPosition(
              nearest,
              existingBubbles,
              { x: tangentX, y: tangentY },
              canvasWidth,
              canvasHeight
            );
            const finalX = triple ? triple.x : tangentX;
            const finalY = triple ? triple.y : tangentY;
            bubble.x = finalX;
            bubble.y = finalY;
            this.snapToGrid(bubble, existingBubbles);
            this.forceToNearestFreeSeat(bubble, existingBubbles, canvasWidth, canvasHeight);
            onLand(bubble);
            return;
          }
        }
        onLand(bubble);
        return;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }
  // Attempt to find a position where the new bubble touches the collided bubble
  // and one of its neighbors simultaneously (triple-contact). Returns null if none valid.
  findTripleContactPosition(collided, existingBubbles, tangentPoint, canvasWidth, canvasHeight) {
    const R = this.BUBBLE_SIZE;
    const rWall = this.BUBBLE_SIZE / 2;
    const intersections = (ax, ay, bx, by) => {
      const dx = bx - ax;
      const dy = by - ay;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 1e-6 || d > 2 * R) return [];
      const a = d / 2;
      const h2 = R * R - a * a;
      if (h2 < -1e-6) return [];
      const h = h2 > 0 ? Math.sqrt(Math.max(0, h2)) : 0;
      const mx = ax + a * dx / d;
      const my = ay + a * dy / d;
      const rx = -dy * h / d;
      const ry = dx * h / d;
      return [
        { x: mx + rx, y: my + ry },
        { x: mx - rx, y: my - ry }
      ];
    };
    const inBounds = (x, y) => x >= rWall && x <= canvasWidth - rWall && y >= rWall && y <= canvasHeight - rWall;
    const positionFree = (x, y) => {
      for (const b of existingBubbles) {
        const dx = b.x - x;
        const dy = b.y - y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < this.BUBBLE_SIZE - 0.1) return false;
      }
      return true;
    };
    const neighbors = existingBubbles.filter((b) => b !== collided).filter((b) => {
      const dx = b.x - collided.x;
      const dy = b.y - collided.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      return d > 0.5 * this.BUBBLE_SIZE && d < 1.5 * this.BUBBLE_SIZE;
    });
    let best = null;
    let bestScore = Number.POSITIVE_INFINITY;
    for (const nb of neighbors) {
      const pts = intersections(collided.x, collided.y, nb.x, nb.y);
      for (const p of pts) {
        if (!inBounds(p.x, p.y)) continue;
        if (!positionFree(p.x, p.y)) continue;
        const dx = p.x - tangentPoint.x;
        const dy = p.y - tangentPoint.y;
        const score = dx * dx + dy * dy;
        if (score < bestScore) {
          best = p;
          bestScore = score;
        }
      }
    }
    return best;
  }
  // Quantize the dynamic baseY to the nearest valid grid line to stabilize row/column mapping
  getQuantizedBaseY(existingBubbles) {
    if (!existingBubbles || existingBubbles.length === 0) return this.BUBBLE_SIZE / 2;
    const verticalSpacing = this.BUBBLE_SIZE * Math.sqrt(3) / 2;
    const baseRef = this.BUBBLE_SIZE / 2;
    const isAnimating = this.stateManager?.rowAnimationActive.value;
    if (isAnimating) {
      const stableRowBubbles = existingBubbles.filter((b) => (b.row ?? 0) >= 0);
      if (stableRowBubbles.length === 0) return baseRef;
      const minRow = Math.min(...stableRowBubbles.map((b) => b.row ?? 0));
      const quantized = baseRef + minRow * verticalSpacing;
      console.log("getQuantizedBaseY (ANIMATION): minRow =", minRow, "quantized baseY =", quantized);
      return quantized;
    } else {
      const minRow = Math.min(...existingBubbles.map((b) => b.row ?? 0));
      const quantized = baseRef + minRow * verticalSpacing;
      console.log("getQuantizedBaseY (NORMAL): minRow =", minRow, "quantized baseY =", quantized);
      return quantized;
    }
  }
  // Compute the pixel center for a given grid seat (row, col)
  getSeatCenter(row, col, existingBubbles) {
    const verticalSpacing = this.BUBBLE_SIZE * Math.sqrt(3) / 2;
    const baseX = this.BUBBLE_SIZE / 2;
    const baseY = this.getQuantizedBaseY(existingBubbles);
    const topOffset = this.getTopRowOffset(existingBubbles);
    const rowOffset = row % 2 === 0 ? topOffset : topOffset === 0 ? this.BUBBLE_SIZE / 2 : 0;
    const x = baseX + rowOffset + col * this.BUBBLE_SIZE;
    const y = baseY + row * verticalSpacing;
    return { x, y };
  }
  // Infer the current top-row horizontal offset (0 or B/2) from existing row-0 bubbles
  // Uses stableX during row animation to avoid drift.
  getTopRowOffset(existingBubbles) {
    const B = this.BUBBLE_SIZE;
    const baseX = B / 2;
    const isAnimating = this.stateManager?.rowAnimationActive.value;
    const row0 = existingBubbles.filter((b) => (b.row ?? 0) === 0);
    if (row0.length === 0) return 0;
    let sumEven = 0;
    let sumOdd = 0;
    for (const b of row0) {
      const bx = isAnimating && b.stableX !== void 0 ? b.stableX : b.x;
      const nearestEven = baseX + Math.round((bx - baseX) / B) * B;
      const nearestOdd = baseX + B / 2 + Math.round((bx - (baseX + B / 2)) / B) * B;
      sumEven += Math.abs(bx - nearestEven);
      sumOdd += Math.abs(bx - nearestOdd);
    }
    return sumEven <= sumOdd ? 0 : B / 2;
  }
  // Check if a seat (by center coords) is already occupied by an existing bubble
  isSeatOccupied(x, y, existingBubbles) {
    const seatTol = 0.25;
    const isAnimating = this.stateManager?.rowAnimationActive.value;
    for (const b of existingBubbles) {
      const bubbleX = isAnimating && b.stableX !== void 0 ? b.stableX : b.x;
      const bubbleY = isAnimating && b.stableY !== void 0 ? b.stableY : b.y;
      const dx = bubbleX - x;
      const dy = bubbleY - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d <= seatTol) return true;
    }
    return false;
  }
  // Force bubble to its computed seat or the nearest free seat to avoid overlaps/mis-seating
  forceToNearestFreeSeat(bubble, existingBubbles, canvasWidth, canvasHeight) {
    const rWall = this.BUBBLE_SIZE / 2;
    const inBounds = (x, y) => x >= rWall && x <= canvasWidth - rWall && y >= rWall && y <= canvasHeight - rWall;
    let center = this.getSeatCenter(bubble.row, bubble.col, existingBubbles);
    if (inBounds(center.x, center.y) && !this.isSeatOccupied(center.x, center.y, existingBubbles)) {
      bubble.x = center.x;
      bubble.y = center.y;
      return;
    }
    let best = null;
    let bestScore = Number.POSITIVE_INFINITY;
    const MAX_DELTA = 2;
    for (let dr = -MAX_DELTA; dr <= MAX_DELTA; dr++) {
      const rr = Math.max(0, bubble.row + dr);
      for (let dc = -MAX_DELTA; dc <= MAX_DELTA; dc++) {
        const cc = Math.max(0, bubble.col + dc);
        center = this.getSeatCenter(rr, cc, existingBubbles);
        if (!inBounds(center.x, center.y)) continue;
        if (this.isSeatOccupied(center.x, center.y, existingBubbles)) continue;
        const dx = center.x - bubble.x;
        const dy = center.y - bubble.y;
        const score = dx * dx + dy * dy;
        if (score < bestScore) {
          bestScore = score;
          best = { row: rr, col: cc, x: center.x, y: center.y };
        }
      }
    }
    if (best) {
      bubble.row = best.row;
      bubble.col = best.col;
      bubble.x = best.x;
      bubble.y = best.y;
    } else {
      bubble.x = Math.max(rWall, Math.min(canvasWidth - rWall, center.x));
      bubble.y = Math.max(rWall, Math.min(canvasHeight - rWall, center.y));
    }
  }
  snapToGrid(bubble, existingBubbles) {
    console.log("Snapping bubble to grid. Current position:", bubble.x, bubble.y);
    const verticalSpacing = this.BUBBLE_SIZE * Math.sqrt(3) / 2;
    const baseX = this.BUBBLE_SIZE / 2;
    const baseY = this.getQuantizedBaseY(existingBubbles);
    const targetRow = Math.max(0, Math.round((bubble.y - baseY) / verticalSpacing));
    const topOffset = this.getTopRowOffset(existingBubbles);
    const offsetX = targetRow % 2 === 0 ? topOffset : topOffset === 0 ? this.BUBBLE_SIZE / 2 : 0;
    const targetCol = Math.max(0, Math.round((bubble.x - baseX - offsetX) / this.BUBBLE_SIZE));
    bubble.row = targetRow;
    bubble.col = targetCol;
    console.log("Grid coordinates assigned:", `row=${bubble.row}, col=${bubble.col}`, "Position preserved:", bubble.x, bubble.y);
  }
  lightenColor(color, amount) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * amount * 100);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 255) + amt;
    const B = (num & 255) + amt;
    return "#" + (16777216 + (R < 255 ? R < 1 ? 0 : R : 255) * 65536 + (G < 255 ? G < 1 ? 0 : G : 255) * 256 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
}
const usePhysicsEngine = (stateManager) => {
  return new PhysicsEngine(stateManager);
};
class VisualEffects {
  BUBBLE_SIZE = 40;
  createBounceEffect(x, y) {
    const particlesArray = [];
    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random(),
        color: "#87CEEB",
        life: 0.5,
        maxLife: 0.5,
        type: "spark",
        rotation: 0,
        rotationSpeed: 0
      });
    }
    return {
      x,
      y,
      particles: particlesArray,
      active: true,
      shockwave: {
        radius: 0,
        maxRadius: this.BUBBLE_SIZE / 3,
        intensity: 0.3
      }
    };
  }
  createImpactEffect(x, y, color) {
    const particlesArray = [];
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color,
        life: 0.8,
        maxLife: 0.8,
        type: "burst",
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }
    return {
      x,
      y,
      particles: particlesArray,
      active: true,
      shockwave: {
        radius: 0,
        maxRadius: this.BUBBLE_SIZE,
        intensity: 0.6
      }
    };
  }
  createExplosion(x, y, color) {
    const particlesArray = [];
    for (let i = 0; i < 15; i++) {
      const angle = Math.PI * 2 * i / 15;
      const speed = 3 + Math.random() * 5;
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 6,
        color,
        life: 1,
        maxLife: 1,
        type: "burst",
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3
      });
    }
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 4;
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2,
        color: "#FFD700",
        life: 0.8,
        maxLife: 0.8,
        type: "spark",
        rotation: 0,
        rotationSpeed: 0
      });
    }
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 8 + Math.random() * 4,
        color: this.lightenColor(color, 0.3),
        life: 1.2,
        maxLife: 1.2,
        type: "glow",
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      });
    }
    return {
      x,
      y,
      particles: particlesArray,
      active: true,
      shockwave: {
        radius: 0,
        maxRadius: this.BUBBLE_SIZE * 2,
        intensity: 1
      }
    };
  }
  updateParticles(particles) {
    particles.forEach((particle) => {
      if (particle.life > 0) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        switch (particle.type) {
          case "burst":
            particle.vy += 0.15;
            particle.vx *= 0.96;
            particle.vy *= 0.96;
            particle.life -= 0.025;
            break;
          case "spark":
            particle.vy += 0.05;
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            particle.life -= 0.04;
            break;
          case "glow":
            particle.vy += 0.08;
            particle.vx *= 0.97;
            particle.vy *= 0.97;
            particle.life -= 0.015;
            break;
        }
      }
    });
  }
  lightenColor(color, amount) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * amount * 100);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 255) + amt;
    const B = (num & 255) + amt;
    return "#" + (16777216 + (R < 255 ? R < 1 ? 0 : R : 255) * 65536 + (G < 255 ? G < 1 ? 0 : G : 255) * 256 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
}
const useVisualEffects = () => {
  return new VisualEffects();
};
class CanvasRenderer {
  canvasWidth = ref(800);
  canvasHeight = ref(600);
  gameCanvas = ref();
  ctx = null;
  BUBBLE_SIZE = 40;
  initializeCanvas() {
    if (!this.gameCanvas.value) return false;
    const canvas = this.gameCanvas.value;
    this.ctx = canvas.getContext("2d");
    if (!this.ctx) return false;
    const container = canvas.parentElement;
    if (container) {
      this.canvasWidth.value = container.clientWidth;
      this.canvasHeight.value = container.clientHeight;
      canvas.width = this.canvasWidth.value;
      canvas.height = this.canvasHeight.value;
    }
    return true;
  }
  setCanvasSize(width, height) {
    this.canvasWidth.value = width;
    this.canvasHeight.value = height;
    if (this.gameCanvas.value) {
      this.gameCanvas.value.width = width;
      this.gameCanvas.value.height = height;
    }
  }
  clearCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvasWidth.value, this.canvasHeight.value);
  }
  drawBackground() {
    if (!this.ctx) return;
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvasHeight.value);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvasWidth.value, this.canvasHeight.value);
  }
  drawBubble(bubble) {
    if (!this.ctx) return;
    const cx = Math.round(bubble.x * 2) / 2;
    const cy = Math.round(bubble.y * 2) / 2;
    const r = this.BUBBLE_SIZE / 2 - 1;
    this.ctx.save();
    this.ctx.shadowColor = bubble.color;
    this.ctx.shadowBlur = 6;
    const gradient = this.ctx.createRadialGradient(
      cx - this.BUBBLE_SIZE / 6,
      cy - this.BUBBLE_SIZE / 6,
      0,
      cx,
      cy,
      r
    );
    gradient.addColorStop(0, this.lightenColor(bubble.color, 0.3));
    gradient.addColorStop(1, bubble.color);
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.strokeStyle = "rgba(255,255,255,0.4)";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();
    this.ctx.save();
    this.ctx.shadowColor = "rgba(0,0,0,0.7)";
    this.ctx.shadowBlur = 3;
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 1;
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 16px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    const text = bubble.displayText || bubble.word.charAt(0).toUpperCase();
    if (bubble.isBomb) {
      const time = Date.now() / 1e3;
      const pulse = 0.9 + 0.1 * Math.sin(time * 8);
      this.ctx.save();
      this.ctx.scale(pulse, pulse);
      this.ctx.fillStyle = "#FFA500";
      this.ctx.font = "bold 22px Arial";
      this.ctx.fillText("💣", cx / pulse, (cy - 2) / pulse);
      this.ctx.restore();
      this.ctx.fillStyle = "#fff";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(text, cx, cy + 14);
      this.ctx.strokeStyle = "#FF4444";
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([5, 5]);
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r + 5, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    } else {
      this.ctx.fillText(text, cx, cy);
    }
    this.ctx.restore();
  }
  drawShooter(position, word, color, displayText) {
    if (!this.ctx) return;
    this.ctx.save();
    const pulseIntensity = 0.8 + 0.2 * Math.sin(Date.now() * 8e-3);
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 15 * pulseIntensity;
    const gradient = this.ctx.createRadialGradient(
      position.x - this.BUBBLE_SIZE / 6,
      position.y - this.BUBBLE_SIZE / 6,
      0,
      position.x,
      position.y,
      this.BUBBLE_SIZE / 2
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color);
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, this.BUBBLE_SIZE / 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.strokeStyle = "rgba(255,255,255,0.3)";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, this.BUBBLE_SIZE / 2 - 4, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();
    this.ctx.save();
    this.ctx.shadowColor = "rgba(0,0,0,0.8)";
    this.ctx.shadowBlur = 4;
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 1;
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 18px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    const text = displayText || word.charAt(0).toUpperCase();
    this.ctx.fillText(text, position.x, position.y);
    this.ctx.restore();
  }
  drawShootingBubble(bubble) {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.shadowColor = bubble.color;
    this.ctx.shadowBlur = 15;
    const pulseIntensity = 0.98 + 0.02 * Math.sin(Date.now() * 0.01);
    const sx = Math.round(bubble.x * 2) / 2;
    const sy = Math.round(bubble.y * 2) / 2;
    const r0 = this.BUBBLE_SIZE / 2 - 1;
    const gradient = this.ctx.createRadialGradient(
      sx - this.BUBBLE_SIZE / 5,
      sy - this.BUBBLE_SIZE / 5,
      0,
      sx,
      sy,
      r0
    );
    gradient.addColorStop(0, this.lightenColor(bubble.color, 0.5));
    gradient.addColorStop(1, bubble.color);
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(sx, sy, r0 * pulseIntensity, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.strokeStyle = "rgba(255,255,255,0.6)";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(sx, sy, (r0 - 3) * pulseIntensity, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();
    this.ctx.save();
    this.ctx.shadowColor = "rgba(0,0,0,0.9)";
    this.ctx.shadowBlur = 5;
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 1;
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 17px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    const text = bubble.displayText || bubble.word.charAt(0).toUpperCase();
    this.ctx.fillText(text, sx, sy);
    this.ctx.restore();
  }
  drawExplosions(explosions) {
    if (!this.ctx) return;
    explosions.forEach((explosion) => {
      if (!explosion.active || !this.ctx) return;
      if (explosion.shockwave.intensity > 0) {
        this.ctx.save();
        this.ctx.globalAlpha = explosion.shockwave.intensity * 0.3;
        this.ctx.strokeStyle = "#FFD700";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(explosion.x, explosion.y, explosion.shockwave.radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.restore();
      }
      explosion.particles.forEach((particle) => {
        if (particle.life <= 0 || !this.ctx) return;
        const alpha = particle.life / particle.maxLife;
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation);
        this.ctx.globalAlpha = alpha;
        switch (particle.type) {
          case "burst":
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, particle.size * alpha, 0, Math.PI * 2);
            this.ctx.fill();
            break;
          case "spark":
            this.ctx.strokeStyle = particle.color;
            this.ctx.lineWidth = particle.size * alpha;
            this.ctx.lineCap = "round";
            this.ctx.beginPath();
            this.ctx.moveTo(-particle.size, 0);
            this.ctx.lineTo(particle.size, 0);
            this.ctx.stroke();
            break;
          case "glow":
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * alpha);
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, "transparent");
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, particle.size * alpha, 0, Math.PI * 2);
            this.ctx.fill();
            break;
        }
        this.ctx.restore();
      });
    });
  }
  drawAimLine(aimLine, shooterPosition) {
    if (!this.ctx || !aimLine.visible) return;
    const ctx = this.ctx;
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    const leftX = this.BUBBLE_SIZE / 2;
    const rightX = this.canvasWidth.value - this.BUBBLE_SIZE / 2;
    const topY = this.BUBBLE_SIZE / 2;
    let px = shooterPosition.x;
    let py = shooterPosition.y;
    let vx = aimLine.x - shooterPosition.x;
    let vy = aimLine.y - shooterPosition.y;
    const len = Math.sqrt(vx * vx + vy * vy) || 1;
    vx /= len;
    vy /= len;
    if (vy > -0.01) vy = -0.01;
    ctx.beginPath();
    ctx.moveTo(px, py);
    let bounces = 0;
    const maxBounces = 2;
    let safeGuard = 0;
    while (bounces <= maxBounces && safeGuard++ < 10) {
      const tTop = (topY - py) / vy;
      let tWall = Number.POSITIVE_INFINITY;
      let wallX = px;
      if (vx > 0) {
        tWall = (rightX - px) / vx;
        wallX = rightX;
      } else if (vx < 0) {
        tWall = (leftX - px) / vx;
        wallX = leftX;
      }
      const tMin = Math.min(
        tTop > 0 ? tTop : Number.POSITIVE_INFINITY,
        tWall > 0 ? tWall : Number.POSITIVE_INFINITY
      );
      const nx = px + vx * tMin;
      const ny = py + vy * tMin;
      ctx.lineTo(nx, ny);
      if (tTop > 0 && tTop <= tMin + 1e-6) {
        break;
      }
      px = wallX;
      py = ny;
      vx = -vx;
      bounces++;
      ctx.moveTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  lightenColor(color, amount) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * amount * 100);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 255) + amt;
    const B = (num & 255) + amt;
    return "#" + (16777216 + (R < 255 ? R < 1 ? 0 : R : 255) * 65536 + (G < 255 ? G < 1 ? 0 : G : 255) * 256 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
}
const useCanvasRenderer = () => {
  return new CanvasRenderer();
};
class InputHandler {
  updateAim(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    console.log(`Mouse: ${event.clientX}, ${event.clientY} | Canvas: ${mouseX}, ${mouseY} | Scale: ${scaleX.toFixed(2)}, ${scaleY.toFixed(2)}`);
    const shooterX = canvas.width / 2;
    const shooterY = canvas.height - 50;
    const dx = mouseX - shooterX;
    const dy = mouseY - shooterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (mouseY < shooterY - 20 && distance > 20) {
      return {
        x: mouseX,
        y: mouseY
      };
    }
    return null;
  }
  getShootingVector(event, canvas, shooterPosition) {
    const rect = canvas.getBoundingClientRect();
    if (!rect) return null;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const targetX = (event.clientX - rect.left) * scaleX;
    const targetY = (event.clientY - rect.top) * scaleY;
    console.log(`Shooting at: ${targetX}, ${targetY} (scaled from ${event.clientX}, ${event.clientY})`);
    const BUBBLE_SIZE = 40;
    const leftX = BUBBLE_SIZE / 2;
    const rightX = canvas.width - BUBBLE_SIZE / 2;
    const topY = BUBBLE_SIZE / 2;
    let vx = targetX - shooterPosition.x;
    let vy = targetY - shooterPosition.y;
    const len0 = Math.sqrt(vx * vx + vy * vy) || 1;
    vx /= len0;
    vy /= len0;
    if (vy > -0.01) vy = -0.01;
    let px = shooterPosition.x;
    let py = shooterPosition.y;
    let bounces = 0;
    const maxBounces = 2;
    let endX = targetX;
    let endY = targetY;
    while (bounces <= maxBounces) {
      const tTop = (topY - py) / vy;
      let tWall = Number.POSITIVE_INFINITY;
      if (vx > 0) {
        tWall = (rightX - px) / vx;
      } else if (vx < 0) {
        tWall = (leftX - px) / vx;
      }
      const tMin = Math.min(
        tTop > 0 ? tTop : Number.POSITIVE_INFINITY,
        tWall > 0 ? tWall : Number.POSITIVE_INFINITY
      );
      endX = px + vx * tMin;
      endY = py + vy * tMin;
      break;
    }
    const dx = endX - shooterPosition.x;
    const dy = endY - shooterPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
    const speed = 8;
    const normalizedDx = dx / distance * speed;
    const normalizedDy = dy / distance * speed;
    console.log(`Direction (reflected): dx=${normalizedDx.toFixed(2)}, dy=${normalizedDy.toFixed(2)}`);
    return { vx: normalizedDx, vy: normalizedDy };
  }
}
const useInputHandler = () => {
  return new InputHandler();
};
class GameLogic {
  BUBBLE_SIZE = 40;
  COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#FFB347"];
  checkForMatches(newBubble, bubbles) {
    console.log("Checking matches for bubble:", newBubble.word, newBubble.x, newBubble.y);
    const visited = /* @__PURE__ */ new Set();
    const connectedBubbles = [];
    const findConnected = (bubble) => {
      if (visited.has(bubble.id)) return;
      visited.add(bubble.id);
      connectedBubbles.push(bubble);
      console.log("Found connected bubble:", bubble.word, bubble.x, bubble.y);
      bubbles.forEach((other) => {
        if (other.id !== bubble.id && !visited.has(other.id) && other.word === bubble.word) {
          const dx = other.x - bubble.x;
          const dy = other.y - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          console.log(`Distance between ${bubble.word} and ${other.word}: ${distance}, BUBBLE_SIZE: ${this.BUBBLE_SIZE}`);
          if (distance <= this.BUBBLE_SIZE * 1.2) {
            console.log("Found adjacent bubble:", other.word, other.x, other.y);
            findConnected(other);
          }
        }
      });
    };
    findConnected(newBubble);
    console.log(`Found ${connectedBubbles.length} connected bubbles:`, connectedBubbles.map((b) => b.word));
    const shouldRemove = connectedBubbles.length >= 3;
    if (shouldRemove) {
      console.log("MATCH FOUND! Removing bubbles:", connectedBubbles.map((b) => b.word));
    } else {
      console.log("No match - not enough connected bubbles");
    }
    return {
      matchedBubbles: connectedBubbles,
      shouldRemove
    };
  }
  removeFloatingBubbles(bubbles) {
    const topConnected = /* @__PURE__ */ new Set();
    const markTopConnected = (bubble) => {
      if (topConnected.has(bubble.id)) return;
      topConnected.add(bubble.id);
      bubbles.forEach((other) => {
        if (other.id !== bubble.id && !topConnected.has(other.id)) {
          const dx = other.x - bubble.x;
          const dy = other.y - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= this.BUBBLE_SIZE * 1.1) {
            markTopConnected(other);
          }
        }
      });
    };
    bubbles.forEach((bubble) => {
      if (bubble.row === 0) {
        markTopConnected(bubble);
      }
    });
    const remainingBubbles = bubbles.filter((bubble) => topConnected.has(bubble.id));
    const removedBubbles = bubbles.filter((bubble) => !topConnected.has(bubble.id));
    return {
      remainingBubbles,
      removedBubbles
    };
  }
  setupInitialBubbles(words, vietnameseMode = false) {
    const bubbles = [];
    const verticalSpacing = this.BUBBLE_SIZE * Math.sqrt(3) / 2;
    const baseX = this.BUBBLE_SIZE / 2;
    const baseY = this.BUBBLE_SIZE / 2;
    const bubblesPerRow = 8;
    for (let i = 0; i < words.length; i++) {
      const row = Math.floor(i / bubblesPerRow);
      const col = i % bubblesPerRow;
      const offsetX = row % 2 === 0 ? 0 : this.BUBBLE_SIZE / 2;
      const x = baseX + offsetX + col * this.BUBBLE_SIZE;
      const y = baseY + row * verticalSpacing;
      const bubble = {
        x,
        y,
        word: words[i].word,
        color: this.getColorForWord(words[i].word),
        // Use consistent color for same word
        id: `initial-${i}`,
        row,
        col,
        vietnameseMeaning: words[i].meaning,
        // Store Vietnamese meaning
        displayText: vietnameseMode && words[i].meaning ? words[i].meaning.substring(0, 2).toUpperCase() : words[i].word.charAt(0).toUpperCase()
        // Default to English first 1 letter
      };
      bubbles.push(bubble);
    }
    return bubbles;
  }
  isGameWon(bubbles) {
    return bubbles.length === 0;
  }
  calculateScore(matchedBubbles, floatingBubbles) {
    return matchedBubbles * 10 + floatingBubbles * 5;
  }
  getColorForWord(word) {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i) & 4294967295;
    }
    const colorIndex = Math.abs(hash) % this.COLORS.length;
    return this.COLORS[colorIndex];
  }
}
const useGameLogic = () => {
  return new GameLogic();
};
class BubbleShooterGame {
  // Dependencies
  stateManager;
  audioSystem;
  physicsEngine;
  visualEffects;
  canvasRenderer;
  inputHandler;
  gameLogic;
  // Private properties
  animationFrame = null;
  currentWords = [];
  vietnameseMode = false;
  // Timed row insertion & animation state
  rowInsertTimer = null;
  ROW_INSERT_INTERVAL = 2e4;
  rowAnimationActive = false;
  // Bomb system
  bombHits = /* @__PURE__ */ new Map();
  // Track hits per bomb bubble
  rowAnimationStart = 0;
  rowAnimationDuration = 600;
  // ms
  rowShiftAmount = 34;
  // will be recalculated in constructor
  rowStartYMap = /* @__PURE__ */ new Map();
  rowStartXMap = /* @__PURE__ */ new Map();
  newRowBubbles = [];
  newRowDelays = /* @__PURE__ */ new Map();
  constructor() {
    this.stateManager = useGameStateManager();
    this.audioSystem = useAudioSystem();
    this.physicsEngine = usePhysicsEngine(this.stateManager);
    this.visualEffects = useVisualEffects();
    this.canvasRenderer = useCanvasRenderer();
    this.inputHandler = useInputHandler();
    this.gameLogic = useGameLogic();
    this.rowShiftAmount = this.physicsEngine.BUBBLE_SIZE * Math.sqrt(3) / 2;
  }
  // ===== Row Insertion Feature =====
  triggerRowInsertion() {
    if (this.rowAnimationActive || this.stateManager.gameOver.value) return;
    if (this.stateManager.shootingBubble.value) return;
    this.rowAnimationActive = true;
    this.stateManager.setRowAnimationActive(true);
    this.rowAnimationStart = performance.now();
    this.rowStartYMap.clear();
    this.rowStartXMap.clear();
    this.newRowBubbles = [];
    this.newRowDelays.clear();
    this.stateManager.bubbles.value.forEach((b) => {
      this.rowStartYMap.set(b.id, b.y);
      this.rowStartXMap.set(b.id, b.x);
      const verticalSpacing = this.physicsEngine.BUBBLE_SIZE * Math.sqrt(3) / 2;
      const baseX2 = this.physicsEngine.BUBBLE_SIZE / 2;
      const baseY = this.physicsEngine.BUBBLE_SIZE / 2;
      const offsetX2 = (b.row ?? 0) % 2 === 0 ? 0 : this.physicsEngine.BUBBLE_SIZE / 2;
      b.stableX = baseX2 + offsetX2 + (b.col ?? 0) * this.physicsEngine.BUBBLE_SIZE;
      b.stableY = baseY + (b.row ?? 0) * verticalSpacing;
    });
    const B = this.physicsEngine.BUBBLE_SIZE;
    const baseX = B / 2;
    const currentTop = this.stateManager.bubbles.value.filter((b) => (b.row ?? 0) === 0);
    const nearestGridX = (x, offsetX2) => {
      const colF = Math.round((x - (baseX + offsetX2)) / B);
      return baseX + offsetX2 + colF * B;
    };
    let sumEven = 0, sumOdd = 0;
    if (currentTop.length > 0) {
      currentTop.forEach((b) => {
        sumEven += Math.abs(b.x - nearestGridX(b.x, 0));
        sumOdd += Math.abs(b.x - nearestGridX(b.x, B / 2));
      });
    }
    const effOffsetRow1 = currentTop.length === 0 ? 0 : sumEven <= sumOdd ? 0 : B / 2;
    const desiredOffsetRow0 = effOffsetRow1 === 0 ? B / 2 : 0;
    const canvasW = this.canvasRenderer.canvasWidth.value || 800;
    const offsetX = desiredOffsetRow0;
    const Bsize = this.physicsEngine.BUBBLE_SIZE;
    const bubblesPerRow = Math.max(1, Math.floor((canvasW - 10 - offsetX) / Bsize));
    for (let col = 0; col < bubblesPerRow; col++) {
      const vocab = this.currentWords[Math.floor(Math.random() * Math.max(1, this.currentWords.length))];
      const word = vocab?.word || "·";
      const color = this.physicsEngine.getColorForWord(word);
      const x = col * this.physicsEngine.BUBBLE_SIZE + this.physicsEngine.BUBBLE_SIZE / 2 + offsetX;
      const startY = -this.physicsEngine.BUBBLE_SIZE;
      const isBomb = Math.random() < 0.2;
      const bubble = {
        x,
        y: startY,
        word,
        color: isBomb ? "#FF4444" : color,
        // Bomb bubbles are red
        id: `row-${Date.now()}-${col}`,
        row: -1,
        col,
        vietnameseMeaning: vocab?.meaning || "",
        displayText: this.vietnameseMode && vocab?.meaning ? vocab.meaning.substring(0, 2).toUpperCase() : word.charAt(0).toUpperCase(),
        isBomb
      };
      this.stateManager.addBubble(bubble);
      this.newRowBubbles.push(bubble);
      this.newRowDelays.set(bubble.id, col * 60);
    }
  }
  updateRowInsertionAnimation() {
    if (!this.rowAnimationActive) return;
    const now = performance.now();
    const elapsed = now - this.rowAnimationStart;
    const t = Math.min(1, elapsed / this.rowAnimationDuration);
    const ease = 1 - Math.pow(1 - t, 3);
    this.stateManager.bubbles.value.forEach((b) => {
      if (this.newRowDelays.has(b.id)) return;
      const startY = this.rowStartYMap.get(b.id);
      const startX = this.rowStartXMap.get(b.id);
      if (startY != null) {
        b.y = startY + ease * this.rowShiftAmount;
      }
      if (startX != null) {
        b.x = startX;
      }
    });
    const targetTopY = this.physicsEngine.BUBBLE_SIZE / 2;
    const movingTopY = targetTopY + ease * this.rowShiftAmount;
    const epsilon = 1;
    const rowBelow = this.stateManager.bubbles.value.filter((b) => !this.newRowDelays.has(b.id) && (b.row ?? 0) === 0);
    let allNewSettled = true;
    for (const nb of this.newRowBubbles) {
      const delay = this.newRowDelays.get(nb.id) || 0;
      const localElapsed = Math.max(0, elapsed - delay);
      const tt = Math.min(1, localElapsed / Math.max(1, this.rowAnimationDuration - delay));
      const ease2 = 1 - Math.pow(1 - tt, 3);
      const startY = -this.physicsEngine.BUBBLE_SIZE;
      const plannedY = startY + (targetTopY - startY) * ease2;
      let allowed = movingTopY - this.rowShiftAmount - epsilon;
      if (rowBelow.length > 0) {
        let nearest = rowBelow[0];
        let bestDx = Math.abs(nearest.x - nb.x);
        for (let i = 1; i < rowBelow.length; i++) {
          const dx = Math.abs(rowBelow[i].x - nb.x);
          if (dx < bestDx) {
            bestDx = dx;
            nearest = rowBelow[i];
          }
        }
        const B = this.physicsEngine.BUBBLE_SIZE;
        const dxClamped = Math.min(bestDx, B);
        const dyMin = dxClamped >= B ? 0 : Math.sqrt(B * B - dxClamped * dxClamped);
        allowed = Math.min(allowed, nearest.y - dyMin - epsilon);
      }
      nb.y = Math.round(Math.min(plannedY, allowed) * 2) / 2;
      if (tt < 1) allNewSettled = false;
    }
    if (t >= 1 && allNewSettled) {
      this.stateManager.bubbles.value.forEach((b) => {
        if (this.newRowDelays.has(b.id)) return;
        const prevRow = b.row ?? 0;
        const nextRow = prevRow + 1;
        const startX = this.rowStartXMap.get(b.id);
        if (startX != null) b.x = startX;
        b.row = nextRow;
        const yExact = this.physicsEngine.BUBBLE_SIZE / 2 + nextRow * this.rowShiftAmount;
        b.y = Math.round(yExact * 2) / 2;
        const offsetX = nextRow % 2 === 0 ? 0 : this.physicsEngine.BUBBLE_SIZE / 2;
        const colF = Math.round(
          (b.x - (this.physicsEngine.BUBBLE_SIZE / 2 + offsetX)) / this.physicsEngine.BUBBLE_SIZE
        );
        b.col = Math.max(0, colF);
      });
      const B2 = this.physicsEngine.BUBBLE_SIZE;
      const baseX2 = B2 / 2;
      const currentTop2 = this.stateManager.bubbles.value.filter((b) => (b.row ?? 0) === 1);
      let sumEven2 = 0, sumOdd2 = 0;
      if (currentTop2.length > 0) {
        currentTop2.forEach((b) => {
          sumEven2 += Math.abs(b.x - (baseX2 + Math.round((b.x - baseX2) / B2) * B2));
          sumOdd2 += Math.abs(b.x - (baseX2 + B2 / 2 + Math.round((b.x - (baseX2 + B2 / 2)) / B2) * B2));
        });
      }
      const effOffsetRow1b = currentTop2.length === 0 ? 0 : sumEven2 <= sumOdd2 ? 0 : B2 / 2;
      const desiredOffsetRow0b = effOffsetRow1b === 0 ? B2 / 2 : 0;
      this.newRowBubbles.forEach((nb) => {
        const col0 = Math.round((nb.x - (baseX2 + desiredOffsetRow0b)) / B2);
        nb.col = Math.max(0, col0);
        nb.row = 0;
        nb.y = Math.round(targetTopY * 2) / 2;
      });
      this.stateManager.addScreenShake(4);
      this.audioSystem.playImpactSound();
      this.stateManager.bubbles.value.forEach((b) => {
        delete b.stableX;
        delete b.stableY;
      });
      this.rowAnimationActive = false;
      this.stateManager.setRowAnimationActive(false);
      this.rowStartYMap.clear();
      this.rowStartXMap.clear();
      this.newRowDelays.clear();
      this.newRowBubbles = [];
    }
  }
  initialize(canvas, words, vietnameseMode = false) {
    this.canvasRenderer.gameCanvas.value = canvas;
    this.currentWords = words;
    this.vietnameseMode = vietnameseMode;
    if (!this.canvasRenderer.initializeCanvas()) {
      console.error("Failed to initialize canvas");
      return;
    }
    this.stateManager.shooterPosition.value = {
      x: this.canvasRenderer.canvasWidth.value / 2,
      y: this.canvasRenderer.canvasHeight.value - 50
    };
    const initialBubbles = this.gameLogic.setupInitialBubbles(words, this.vietnameseMode);
    initialBubbles.forEach((bubble) => this.stateManager.addBubble(bubble));
    this.stateManager.selectNextShooterWord(words);
    this.startGameLoop();
    if (this.rowInsertTimer) window.clearInterval(this.rowInsertTimer);
    this.rowInsertTimer = window.setInterval(() => this.triggerRowInsertion(), this.ROW_INSERT_INTERVAL);
  }
  startGameLoop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    const gameLoop = () => {
      this.updateRowInsertionAnimation();
      this.stateManager.updateExplosions();
      this.canvasRenderer.clearCanvas();
      const shake = this.stateManager.screenShake.value;
      const ctx = this.canvasRenderer.gameCanvas.value?.getContext("2d");
      if (ctx) {
        ctx.save();
        ctx.translate(shake.x, shake.y);
        this.canvasRenderer.drawBackground();
        this.stateManager.bubbles.value.forEach((bubble) => {
          this.canvasRenderer.drawBubble(bubble);
        });
        this.canvasRenderer.drawExplosions(this.stateManager.explosions.value);
        this.canvasRenderer.drawShooter(
          this.stateManager.shooterPosition.value,
          this.stateManager.currentShooterWord.value,
          this.stateManager.currentShooterColor.value,
          this.getShooterDisplayText()
        );
        if (this.stateManager.shootingBubble.value) {
          this.canvasRenderer.drawShootingBubble(this.stateManager.shootingBubble.value);
        }
        this.canvasRenderer.drawAimLine(
          this.stateManager.aimLine.value,
          this.stateManager.shooterPosition.value
        );
        ctx.restore();
      }
      if (this.gameLogic.isGameWon(this.stateManager.bubbles.value)) {
        this.stateManager.setGameOver(true);
        return;
      }
      if (!this.stateManager.gameOver.value) {
        this.animationFrame = requestAnimationFrame(gameLoop);
      }
    };
    gameLoop();
  }
  stopGameLoop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    if (this.rowInsertTimer) {
      window.clearInterval(this.rowInsertTimer);
      this.rowInsertTimer = null;
    }
  }
  updateAim(event) {
    const canvas = this.canvasRenderer.gameCanvas.value;
    if (!canvas || this.stateManager.shootingBubble.value) return;
    const aimPosition = this.inputHandler.updateAim(event, canvas);
    this.stateManager.updateAimLine(aimPosition);
  }
  shootBubble(event) {
    const canvas = this.canvasRenderer.gameCanvas.value;
    if (!canvas || this.stateManager.shootingBubble.value || !this.stateManager.currentShooterWord.value || this.rowAnimationActive) {
      return;
    }
    const shootingVector = this.inputHandler.getShootingVector(
      event,
      canvas,
      this.stateManager.shooterPosition.value
    );
    if (!shootingVector) return;
    this.stateManager.updateAimLine(null);
    const shooterWord = this.stateManager.currentShooterWord.value;
    const currentWordVocab = this.currentWords.find((vocab) => vocab.word === shooterWord);
    const bubble = {
      x: this.stateManager.shooterPosition.value.x,
      y: this.stateManager.shooterPosition.value.y,
      word: shooterWord,
      color: this.stateManager.currentShooterColor.value,
      id: `shooting-${Date.now()}`,
      row: -1,
      col: -1,
      vietnameseMeaning: currentWordVocab?.meaning || "",
      displayText: shooterWord.charAt(0).toUpperCase()
      // Shooter bubble always shows English first letter
    };
    this.stateManager.setShootingBubble(bubble);
    if (bubble.word) {
      this.audioSystem.playVocabularySound(bubble.word, "en");
    }
    this.physicsEngine.animateShootingBubble(
      bubble,
      shootingVector.vx,
      shootingVector.vy,
      (landedBubble) => this.handleBubbleLanded(landedBubble),
      this.stateManager.bubbles.value,
      // Pass existing bubbles for immediate collision detection
      this.canvasRenderer.canvasWidth.value,
      // Pass actual canvas width for responsive boundaries
      this.canvasRenderer.canvasHeight.value
      // Pass actual canvas height for responsive boundaries
    );
    this.stateManager.selectNextShooterWord(this.currentWords);
  }
  restartGame(words) {
    this.stopGameLoop();
    this.currentWords = words;
    this.stateManager.resetGame();
    const initialBubbles = this.gameLogic.setupInitialBubbles(words);
    initialBubbles.forEach((bubble) => this.stateManager.addBubble(bubble));
    this.stateManager.selectNextShooterWord(words);
    this.startGameLoop();
    if (this.rowInsertTimer) window.clearInterval(this.rowInsertTimer);
    this.rowInsertTimer = window.setInterval(() => this.triggerRowInsertion(), this.ROW_INSERT_INTERVAL);
  }
  updateVietnameseMode(enabled) {
    this.vietnameseMode = enabled;
    this.stateManager.bubbles.value.forEach((bubble) => {
      if (enabled && bubble.vietnameseMeaning) {
        bubble.displayText = bubble.vietnameseMeaning.substring(0, 2).toUpperCase();
      } else {
        bubble.displayText = bubble.word.charAt(0).toUpperCase();
      }
    });
  }
  getShooterDisplayText() {
    const word = this.stateManager.currentShooterWord.value;
    if (!word) return "";
    const vocab = this.currentWords.find((w) => w.word === word);
    if (this.vietnameseMode && vocab?.meaning) {
      return vocab.meaning.substring(0, 2).toUpperCase();
    } else {
      return word.charAt(0).toUpperCase();
    }
  }
  cleanup() {
    this.stopGameLoop();
  }
  handleBubbleLanded(bubble) {
    const impactEffect = this.visualEffects.createImpactEffect(bubble.x, bubble.y, bubble.color);
    this.stateManager.addExplosion(impactEffect);
    this.audioSystem.playImpactSound();
    this.stateManager.setShootingBubble(null);
    if (this.vietnameseMode && bubble.vietnameseMeaning) {
      bubble.displayText = bubble.vietnameseMeaning.substring(0, 2).toUpperCase();
    } else {
      bubble.displayText = bubble.word.charAt(0).toUpperCase();
    }
    this.physicsEngine.snapToGrid(bubble, this.stateManager.bubbles.value);
    this.stateManager.addBubble(bubble);
    this.checkBombHits(bubble);
    const matchResult = this.gameLogic.checkForMatches(bubble, this.stateManager.bubbles.value);
    if (matchResult.shouldRemove) {
      matchResult.matchedBubbles.forEach((matchedBubble) => {
        const explosion = this.visualEffects.createExplosion(
          matchedBubble.x,
          matchedBubble.y,
          matchedBubble.color
        );
        this.stateManager.addExplosion(explosion);
      });
      const bubbleIds = matchResult.matchedBubbles.map((b) => b.id);
      this.stateManager.removeBubbles(bubbleIds);
      const matchScore = this.gameLogic.calculateScore(matchResult.matchedBubbles.length, 0);
      this.stateManager.updateScore(matchScore);
      this.stateManager.incrementWordsMatched();
      this.audioSystem.playExplosionSound();
      this.stateManager.addScreenShake(8);
      this.handleFloatingBubbles();
    }
  }
  handleFloatingBubbles() {
    const floatingResult = this.gameLogic.removeFloatingBubbles(this.stateManager.bubbles.value);
    if (floatingResult.removedBubbles.length > 0) {
      floatingResult.removedBubbles.forEach((floatingBubble) => {
        const effect = this.visualEffects.createImpactEffect(
          floatingBubble.x,
          floatingBubble.y,
          floatingBubble.color
        );
        this.stateManager.addExplosion(effect);
      });
      this.stateManager.bubbles.value = floatingResult.remainingBubbles;
      const bonusScore = this.gameLogic.calculateScore(0, floatingResult.removedBubbles.length);
      this.stateManager.updateScore(bonusScore);
    }
  }
  checkBombHits(landedBubble) {
    const adjacentBombs = this.stateManager.bubbles.value.filter((bubble) => {
      if (!bubble.isBomb) return false;
      const dx = bubble.x - landedBubble.x;
      const dy = bubble.y - landedBubble.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= this.physicsEngine.BUBBLE_SIZE * 1.1;
    });
    adjacentBombs.forEach((bomb) => {
      const currentHits = this.bombHits.get(bomb.id) || 0;
      const newHits = currentHits + 1;
      this.bombHits.set(bomb.id, newHits);
      console.log(`Bomb ${bomb.id} hit ${newHits}/2 times`);
      if (newHits >= 2) {
        this.triggerMassiveExplosion(bomb);
        this.bombHits.delete(bomb.id);
      }
    });
  }
  triggerMassiveExplosion(bombBubble) {
    console.log("💥 MASSIVE BOMB EXPLOSION! DEVASTATION!");
    for (let i = 0; i < 3; i++) {
      const offsetX = (Math.random() - 0.5) * this.physicsEngine.BUBBLE_SIZE * 2;
      const offsetY = (Math.random() - 0.5) * this.physicsEngine.BUBBLE_SIZE * 2;
      const massiveExplosion = this.visualEffects.createExplosion(
        bombBubble.x + offsetX,
        bombBubble.y + offsetY,
        "#FF4444"
      );
      massiveExplosion.shockwave.maxRadius = this.physicsEngine.BUBBLE_SIZE * 12;
      massiveExplosion.particles.forEach((particle) => {
        particle.size *= 4;
        particle.maxLife *= 3;
        particle.vx *= 3;
        particle.vy *= 3;
      });
      this.stateManager.addExplosion(massiveExplosion);
    }
    for (let i = 0; i < 60; i++) {
      const angle = Math.PI * 2 * i / 60;
      const speed = 20 + Math.random() * 15;
      const explosionParticles = {
        x: bombBubble.x,
        y: bombBubble.y,
        particles: [{
          x: bombBubble.x,
          y: bombBubble.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 12 + Math.random() * 8,
          color: ["#FF2222", "#FF4444", "#FF6666", "#FFAA44", "#FFFF44", "#FF8844"][Math.floor(Math.random() * 6)],
          life: 150,
          maxLife: 150,
          type: "burst",
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.5
        }],
        active: true,
        shockwave: {
          radius: 0,
          maxRadius: this.physicsEngine.BUBBLE_SIZE * 10,
          intensity: 1
        },
        radius: 0,
        maxRadius: this.physicsEngine.BUBBLE_SIZE * 10,
        intensity: 1
      };
      this.stateManager.addExplosion(explosionParticles);
    }
    const explosionRadius = this.physicsEngine.BUBBLE_SIZE * 6;
    const bubblesInRange = this.stateManager.bubbles.value.filter((bubble) => {
      const dx = bubble.x - bombBubble.x;
      const dy = bubble.y - bombBubble.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= explosionRadius;
    });
    const bubbleIds = bubblesInRange.map((b) => b.id);
    this.stateManager.removeBubbles(bubbleIds);
    bubblesInRange.forEach((bubble) => {
      if (bubble.isBomb) {
        this.bombHits.delete(bubble.id);
      }
    });
    this.stateManager.addScreenShake(35);
    this.audioSystem.playExplosionSound();
    setTimeout(() => this.audioSystem.playExplosionSound(), 100);
    setTimeout(() => this.audioSystem.playExplosionSound(), 200);
    this.stateManager.updateScore(1e3 + bubblesInRange.length * 50);
    console.log(`💥 BOMB DEVASTATION: Destroyed ${bubblesInRange.length} bubbles!`);
    const floatingResult = this.gameLogic.removeFloatingBubbles(this.stateManager.bubbles.value);
    if (floatingResult.removedBubbles.length > 0) {
      this.stateManager.removeBubbles(floatingResult.removedBubbles.map((b) => b.id));
      const floatingScore = this.gameLogic.calculateScore(0, floatingResult.removedBubbles.length);
      this.stateManager.updateScore(floatingScore);
    }
  }
}
const useBubbleShooterGame = () => {
  return new BubbleShooterGame();
};
const _hoisted_1 = { class: "bubble-shooter-game h-full min-h-[600px] sm:min-h-[500px] md:min-h-0 flex flex-col" };
const _hoisted_2 = { class: "p-4 sm:p-6 md:p-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800 text-white" };
const _hoisted_3 = { class: "flex justify-between items-center" };
const _hoisted_4 = { class: "text-lg sm:text-xl md:text-2xl font-bold" };
const _hoisted_5 = { class: "text-sm sm:text-base opacity-90" };
const _hoisted_6 = { class: "text-right" };
const _hoisted_7 = { class: "text-2xl sm:text-3xl font-bold" };
const _hoisted_8 = { class: "text-xs sm:text-sm opacity-90" };
const _hoisted_9 = { class: "flex-1 min-h-[450px] sm:min-h-[350px] md:min-h-0 relative bg-gradient-to-b from-blue-100 to-blue-200 dark:from-[#0a0a0a] dark:to-[#0f0f0f] overflow-hidden" };
const _hoisted_10 = ["viewBox"];
const _hoisted_11 = ["x1", "y1", "x2", "y2"];
const _hoisted_12 = { class: "absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#0a0a0a] rounded-lg px-4 py-2 shadow-lg border-2 border-purple-500" };
const _hoisted_13 = { class: "text-center" };
const _hoisted_14 = { class: "text-lg sm:text-xl font-bold text-gray-800 dark:text-white" };
const _hoisted_15 = { class: "text-xs sm:text-sm text-gray-600 dark:text-white/70" };
const _hoisted_16 = {
  key: 0,
  class: "absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
};
const _hoisted_17 = { class: "bg-white dark:bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-gray-200 dark:border-[#0f0f0f]" };
const _hoisted_18 = { class: "text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white" };
const _hoisted_19 = { class: "text-gray-600 dark:text-white/70 mb-4" };
const _hoisted_20 = { class: "text-sm text-gray-500 dark:text-white/60 mb-6" };
const _hoisted_21 = { class: "flex gap-3 justify-center" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BubbleShooterMode",
  props: {
    words: {},
    vietnameseMode: { type: Boolean }
  },
  emits: ["game-complete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { t } = useI18n();
    const emit = __emit;
    const game = useBubbleShooterGame();
    const gameCanvas = ref();
    const canvasWidth = computed(() => game.canvasRenderer.canvasWidth.value);
    const canvasHeight = computed(() => game.canvasRenderer.canvasHeight.value);
    const score = computed(() => game.stateManager.score.value);
    const wordsMatched = computed(() => game.stateManager.wordsMatched.value);
    const gameOver = computed(() => game.stateManager.gameOver.value);
    const currentShooterWord = computed(() => game.stateManager.currentShooterWord.value);
    computed(() => {
      const word = game.stateManager.currentShooterWord.value;
      if (!word) return "";
      const vocab = props.words.find((w) => w.word === word);
      if (props.vietnameseMode && vocab?.meaning) {
        return vocab.meaning.substring(0, 2).toUpperCase();
      } else {
        return word.charAt(0).toUpperCase();
      }
    });
    const aimLine = computed(() => game.stateManager.aimLine.value);
    const shooterPosition = computed(() => game.stateManager.shooterPosition.value);
    const stopGameOverWatch = watch(
      () => game.stateManager.gameOver.value,
      (isGameOver) => {
        if (isGameOver) {
          emit("game-complete");
        }
      }
    );
    onMounted(async () => {
      await nextTick();
      if (!gameCanvas.value) return;
      game.initialize(gameCanvas.value, props.words, props.vietnameseMode);
    });
    watch(() => props.vietnameseMode, (newValue) => {
      game.updateVietnameseMode(newValue ?? false);
    });
    onUnmounted(() => {
      stopGameOverWatch();
      game.cleanup();
    });
    const updateAim = (event) => {
      game.updateAim(event);
    };
    const shootBubble = (event) => {
      game.shootBubble(event);
    };
    const restartGame = () => {
      game.stopGameLoop();
      game.stateManager.resetGame();
      if (gameCanvas.value) {
        game.initialize(gameCanvas.value, props.words);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", null, [
              createBaseVNode("h2", _hoisted_4, toDisplayString(unref(t)("flashcard.bubbleShooter.title", "Bubble Shooter")), 1),
              createBaseVNode("p", _hoisted_5, toDisplayString(unref(t)("flashcard.bubbleShooter.instruction", "Shoot bubbles to match 4 or more words!")), 1)
            ]),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, toDisplayString(score.value), 1),
              createBaseVNode("div", _hoisted_8, toDisplayString(unref(t)("flashcard.bubbleShooter.score", "Score")), 1)
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("canvas", {
            ref_key: "gameCanvas",
            ref: gameCanvas,
            class: "w-full h-full cursor-crosshair",
            onClick: shootBubble,
            onMousemove: updateAim
          }, null, 544),
          aimLine.value.visible ? (openBlock(), createElementBlock("svg", {
            key: 0,
            class: "absolute inset-0 w-full h-full pointer-events-none",
            viewBox: `0 0 ${canvasWidth.value} ${canvasHeight.value}`
          }, [
            createBaseVNode("line", {
              x1: shooterPosition.value.x,
              y1: shooterPosition.value.y,
              x2: aimLine.value.x,
              y2: aimLine.value.y,
              stroke: "rgba(255,255,255,0.7)",
              "stroke-width": "2",
              "stroke-dasharray": "5,5"
            }, null, 8, _hoisted_11)
          ], 8, _hoisted_10)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("div", _hoisted_13, [
              createBaseVNode("div", _hoisted_14, toDisplayString(currentShooterWord.value), 1),
              createBaseVNode("div", _hoisted_15, toDisplayString(unref(t)("flashcard.bubbleShooter.currentWord", "Current Word")), 1)
            ])
          ]),
          createVNode(Transition, {
            name: "modal",
            appear: ""
          }, {
            default: withCtx(() => [
              gameOver.value ? (openBlock(), createElementBlock("div", _hoisted_16, [
                createBaseVNode("div", _hoisted_17, [
                  _cache[1] || (_cache[1] = createBaseVNode("div", { class: "w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse" }, [
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
                  createBaseVNode("h3", _hoisted_18, toDisplayString(unref(t)("flashcard.bubbleShooter.gameComplete", "Game Complete!")), 1),
                  createBaseVNode("p", _hoisted_19, toDisplayString(unref(t)("flashcard.bubbleShooter.finalScore", { score: score.value })), 1),
                  createBaseVNode("p", _hoisted_20, toDisplayString(unref(t)("flashcard.bubbleShooter.wordsMatched", { count: wordsMatched.value })), 1),
                  createBaseVNode("div", _hoisted_21, [
                    createBaseVNode("button", {
                      onClick: restartGame,
                      class: "px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
                    }, toDisplayString(unref(t)("flashcard.bubbleShooter.playAgain", "Play Again")), 1),
                    createBaseVNode("button", {
                      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("game-complete")),
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
const BubbleShooterMode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-98a69fca"]]);
export {
  BubbleShooterMode as default
};
//# sourceMappingURL=BubbleShooterMode-ONTU2fRu.js.map
