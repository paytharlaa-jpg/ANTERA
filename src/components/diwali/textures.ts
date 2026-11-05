import * as THREE from "three";

/**
 * Procedurally generates a high-resolution traditional Indian Rangoli texture
 * with symmetrical floral geometry, gold filigree, maroon accents, and diya motifs.
 */
export function createRangoliTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.46;

  ctx.clearRect(0, 0, size, size);

  // Outer subtle dark circle base
  const baseGrad = ctx.createRadialGradient(cx, cy, maxR * 0.2, cx, cy, maxR);
  baseGrad.addColorStop(0, "rgba(74, 20, 40, 0.45)");
  baseGrad.addColorStop(0.7, "rgba(26, 12, 28, 0.35)");
  baseGrad.addColorStop(1, "rgba(16, 12, 24, 0)");
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
  ctx.fill();

  // Helper for drawing concentric petal rings
  const drawPetalRing = (
    radius: number,
    petals: number,
    petalLength: number,
    petalWidth: number,
    color: string,
    strokeColor: string,
  ) => {
    ctx.save();
    ctx.translate(cx, cy);
    for (let i = 0; i < petals; i++) {
      const angle = (i * 2 * Math.PI) / petals;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -radius);
      ctx.bezierCurveTo(
        petalWidth,
        -radius - petalLength * 0.5,
        petalWidth * 0.8,
        -radius - petalLength,
        0,
        -radius - petalLength,
      );
      ctx.bezierCurveTo(
        -petalWidth * 0.8,
        -radius - petalLength,
        -petalWidth,
        -radius - petalLength * 0.5,
        0,
        -radius,
      );
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = size * 0.003;
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  };

  // Outer decorative beaded ring
  ctx.save();
  ctx.translate(cx, cy);
  const beadCount = 48;
  const beadRadius = maxR * 0.94;
  for (let i = 0; i < beadCount; i++) {
    const angle = (i * 2 * Math.PI) / beadCount;
    const bx = Math.cos(angle) * beadRadius;
    const by = Math.sin(angle) * beadRadius;
    ctx.beginPath();
    ctx.arc(bx, by, size * 0.008, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? "#FFB547" : "#D4AF37";
    ctx.fill();
  }
  ctx.restore();

  // Ring 1: Outer golden floral petals
  drawPetalRing(maxR * 0.72, 16, maxR * 0.22, maxR * 0.12, "rgba(212, 175, 55, 0.4)", "#F6D88B");

  // Ring 2: Deep maroon inner petals
  drawPetalRing(maxR * 0.5, 16, maxR * 0.22, maxR * 0.09, "rgba(74, 20, 40, 0.8)", "#FFB547");

  // Ring 3: Amber decorative lotus petals
  drawPetalRing(maxR * 0.32, 12, maxR * 0.18, maxR * 0.08, "rgba(255, 181, 71, 0.7)", "#FFF5E6");

  // Concentric decorative golden rings
  const ringRadii = [maxR * 0.9, maxR * 0.72, maxR * 0.5, maxR * 0.32, maxR * 0.16];
  ringRadii.forEach((r, idx) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = idx % 2 === 0 ? "rgba(212, 175, 55, 0.8)" : "rgba(246, 216, 139, 0.5)";
    ctx.lineWidth = size * 0.004;
    ctx.stroke();
  });

  // Center lotus core
  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.16);
  coreGrad.addColorStop(0, "#FFF5E6");
  coreGrad.addColorStop(0.4, "#FFB547");
  coreGrad.addColorStop(0.8, "#D4AF37");
  coreGrad.addColorStop(1, "#4A1428");
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, maxR * 0.16, 0, Math.PI * 2);
  ctx.fill();

  // Central 8-point gold star
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  const starPoints = 8;
  for (let i = 0; i < starPoints * 2; i++) {
    const angle = (i * Math.PI) / starPoints;
    const r = i % 2 === 0 ? maxR * 0.14 : maxR * 0.06;
    const sx = Math.cos(angle) * r;
    const sy = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.closePath();
  ctx.fillStyle = "#FFF8DC";
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a soft radial glow sprite texture for diya flames and firework particles
 */
export function createGlowTexture(color = "#FFB547", size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const cx = size / 2;
    const cy = size / 2;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.2, color);
    grad.addColorStop(0.6, "rgba(212, 175, 55, 0.3)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
