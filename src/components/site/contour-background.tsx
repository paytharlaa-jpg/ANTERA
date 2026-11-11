"use client";

import { prefersReducedMotion } from "@/lib/motion-pref";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/* ---- tiny 3D gradient noise (Perlin-style) ---- */
const P = new Uint8Array(512);
{
  const p = Array.from({ length: 256 }, (_, i) => i);
  let seed = 1337;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807) % 2147483647;
    const j = seed % (i + 1);
    [p[i], p[j]] = [p[j]!, p[i]!];
  }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255]!;
}
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + t * (b - a);
function grad(h: number, x: number, y: number, z: number) {
  const k = h & 15;
  const u = k < 8 ? x : y;
  const v = k < 4 ? y : k === 12 || k === 14 ? x : z;
  return ((k & 1) === 0 ? u : -u) + ((k & 2) === 0 ? v : -v);
}
function noise(x: number, y: number, z: number) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  const u = fade(x);
  const v = fade(y);
  const w = fade(z);
  const A = P[X]! + Y;
  const AA = P[A]! + Z;
  const AB = P[A + 1]! + Z;
  const B = P[X + 1]! + Y;
  const BA = P[B]! + Z;
  const BB = P[B + 1]! + Z;
  return lerp(
    lerp(
      lerp(grad(P[AA]!, x, y, z), grad(P[BA]!, x - 1, y, z), u),
      lerp(grad(P[AB]!, x, y - 1, z), grad(P[BB]!, x - 1, y - 1, z), u),
      v,
    ),
    lerp(
      lerp(grad(P[AA + 1]!, x, y, z - 1), grad(P[BA + 1]!, x - 1, y, z - 1), u),
      lerp(grad(P[AB + 1]!, x, y - 1, z - 1), grad(P[BB + 1]!, x - 1, y - 1, z - 1), u),
      v,
    ),
    w,
  );
}

/**
 * Animated topographic contour lines — a land-survey motif for "open plots".
 * Canvas + marching squares; pauses off-screen; static for reduced motion.
 * The cursor raises a gentle "hill" the lines flow around.
 */
export function ContourBackground({
  className,
  color = "rgba(201, 164, 99, 0.22)",
  accent = "rgba(201, 164, 99, 0.5)",
  levels = 11,
  scale = 0.0032,
  speed = 0.045,
  interactive = true,
}: {
  className?: string;
  color?: string;
  accent?: string;
  levels?: number;
  scale?: number;
  speed?: number;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = prefersReducedMotion();
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const CELL = mobile ? 18 : 13;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);
    let raf = 0;
    let visible = false;
    let last = 0;
    let t = Math.random() * 100;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      field = new Float32Array(cols * rows);
    };

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * CELL;
          const y = j * CELL;
          let v =
            noise(x * scale, y * scale, t) * 0.9 +
            noise(x * scale * 2.3, y * scale * 2.3, t * 1.3) * 0.25;
          if (interactive) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            v += 0.55 * Math.exp(-(dx * dx + dy * dy) / 26000);
          }
          field[j * cols + i] = v;
        }
      }
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (let l = 0; l < levels; l++) {
        const iso = -0.55 + (l / (levels - 1)) * 1.3;
        ctx.strokeStyle = l % 4 === 0 ? accent : color;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i]!;
            const b = field[j * cols + i + 1]!;
            const c = field[(j + 1) * cols + i + 1]!;
            const d = field[(j + 1) * cols + i]!;
            const idx =
              (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x = i * CELL;
            const y = j * CELL;
            const top = () => [x + ((iso - a) / (b - a)) * CELL, y] as const;
            const right = () => [x + CELL, y + ((iso - b) / (c - b)) * CELL] as const;
            const bottom = () => [x + ((iso - d) / (c - d)) * CELL, y + CELL] as const;
            const left = () => [x, y + ((iso - a) / (d - a)) * CELL] as const;
            const seg = (p: readonly [number, number], q: readonly [number, number]) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (idx) {
              case 1:
              case 14:
                seg(left(), bottom());
                break;
              case 2:
              case 13:
                seg(bottom(), right());
                break;
              case 3:
              case 12:
                seg(left(), right());
                break;
              case 4:
              case 11:
                seg(top(), right());
                break;
              case 5:
                seg(left(), top());
                seg(bottom(), right());
                break;
              case 6:
              case 9:
                seg(top(), bottom());
                break;
              case 7:
              case 8:
                seg(left(), top());
                break;
              case 10:
                seg(top(), right());
                seg(left(), bottom());
                break;
            }
          }
        }
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 33) return; // ~30fps
      t += speed * (last ? Math.min((now - last) / 1000, 0.1) : 0.033);
      last = now;
      draw();
    };

    resize();
    draw();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
    });
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -1000) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };
    if (!reduce) {
      raf = requestAnimationFrame(loop);
      if (interactive && !mobile) window.addEventListener("pointermove", onMove, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [accent, color, interactive, levels, scale, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
