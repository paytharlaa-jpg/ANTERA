"use client";

import { useEffect, useRef } from "react";

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
}

interface FireworkRocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
}

interface GoldenMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  color: string;
}

export function HeroCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", onResize);

    // Particle Palettes for Royal Diwali
    const goldPalette = [
      "#FFF8DC", // Ivory white-gold
      "#FFD700", // Bright gold
      "#FFA500", // Deep amber
      "#FF8C00", // Tangerine gold
      "#F6D88B", // Warm champagne
      "#E6B325", // Diya gold
    ];

    // 1. Golden Motes & Floating Embers (Optimized for mobile)
    const motesCount = Math.min(width < 768 ? 35 : 85, 90);
    const motes: GoldenMote[] = [];

    for (let i = 0; i < motesCount; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.25 - Math.random() * 0.6,
        size: width < 768 ? 1 + Math.random() * 1.8 : 1 + Math.random() * 2.5,
        baseAlpha: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 1.5 + Math.random() * 2.2,
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
      });
    }

    // 2. Fireworks System
    const particles: FireworkParticle[] = [];
    const rockets: FireworkRocket[] = [];
    let lastAutoLaunch = performance.now();
    const autoLaunchInterval = width < 768 ? 4000 : 3200;

    const launchRocket = (startX?: number, targetY?: number) => {
      const x = startX ?? width * 0.15 + Math.random() * (width * 0.7);
      const ty = targetY ?? height * 0.1 + Math.random() * (height * 0.3);
      const color = goldPalette[Math.floor(Math.random() * goldPalette.length)];

      rockets.push({
        x,
        y: height,
        targetY: ty,
        vy: -5.5 - Math.random() * 2.5,
        color,
        trail: [],
      });
    };

    const explode = (x: number, y: number, baseColor: string) => {
      const count = width < 768 ? 32 : 60;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.1 + Math.random() * 3.5;
        const color =
          Math.random() > 0.35
            ? baseColor
            : goldPalette[Math.floor(Math.random() * goldPalette.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1.0,
          decay: 0.014 + Math.random() * 0.02,
          size: width < 768 ? 1.2 + Math.random() * 1.5 : 1.5 + Math.random() * 2,
        });
      }
    };

    // First initial launch after 1s
    setTimeout(() => {
      launchRocket(width * 0.3, height * 0.2);
    }, 900);

    // Interactive launch via click or touch
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      launchRocket(x, y);
    };

    const handleCanvasTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        launchRocket(x, y);
      }
    };

    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("touchstart", handleCanvasTouch, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Automated fireworks interval
      if (now - lastAutoLaunch > autoLaunchInterval) {
        lastAutoLaunch = now;
        launchRocket();
      }

      // Update & draw rockets
      for (let r = rockets.length - 1; r >= 0; r--) {
        const rocket = rockets[r];
        rocket.trail.push({ x: rocket.x, y: rocket.y, alpha: 0.9 });
        if (rocket.trail.length > 6) rocket.trail.shift();

        // Draw trail
        for (let i = 0; i < rocket.trail.length; i++) {
          const pt = rocket.trail[i];
          ctx.fillStyle = `rgba(255, 215, 0, ${pt.alpha * 0.4})`;
          ctx.fillRect(pt.x - 1, pt.y - 1, 2, 3);
          pt.alpha *= 0.82;
        }

        rocket.y += rocket.vy;

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = rocket.color;
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (rocket.y <= rocket.targetY || rocket.vy >= 0) {
          explode(rocket.x, rocket.y, rocket.color);
          rockets.splice(r, 1);
        }
      }

      // Update & draw explosion particles
      for (let p = particles.length - 1; p >= 0; p--) {
        const part = particles[p];

        part.vx *= 0.96;
        part.vy = part.vy * 0.96 + 0.04;
        part.x += part.vx;
        part.y += part.vy;
        part.alpha -= part.decay;

        if (part.alpha <= 0) {
          particles.splice(p, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, part.alpha);
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        ctx.fillStyle = part.color;
        ctx.shadowColor = part.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.restore();
      }

      // Update & draw golden motes
      for (let m = 0; m < motes.length; m++) {
        const mote = motes[m];
        mote.x += mote.vx + Math.sin(now * 0.001 * mote.speed + mote.phase) * 0.25;
        mote.y += mote.vy;

        if (mote.y < -10) {
          mote.y = height + 10;
          mote.x = Math.random() * width;
        }
        if (mote.x < -10) mote.x = width + 10;
        if (mote.x > width + 10) mote.x = -10;

        const pulse = Math.sin(now * 0.002 * mote.speed + mote.phase);
        const currentAlpha = Math.max(0.1, mote.baseAlpha + pulse * 0.25);

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
        ctx.fillStyle = mote.color;
        ctx.shadowColor = mote.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("click", handleCanvasClick);
      canvas.removeEventListener("touchstart", handleCanvasTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-auto cursor-crosshair ${className}`}
    />
  );
}
