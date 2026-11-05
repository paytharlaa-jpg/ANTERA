export interface QualitySettings {
  tier: "high" | "medium" | "low";
  particleCount: number;
  fireworkFrequencyMs: number;
  maxActiveFireworks: number;
  pixelRatio: number;
  enableShadows: boolean;
  enableBloom: boolean;
  prefersReducedMotion: boolean;
  hasWebGL: boolean;
}

export function detectQualitySettings(): QualitySettings {
  if (typeof window === "undefined") {
    return {
      tier: "medium",
      particleCount: 250,
      fireworkFrequencyMs: 3500,
      maxActiveFireworks: 3,
      pixelRatio: 1,
      enableShadows: false,
      enableBloom: false,
      prefersReducedMotion: false,
      hasWebGL: true,
    };
  }

  // Check WebGL availability
  let hasWebGL = false;
  try {
    const canvas = document.createElement("canvas");
    hasWebGL = Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")),
    );
  } catch {
    hasWebGL = false;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;
  const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
  const memory = nav.deviceMemory || 4;
  const cores = nav.hardwareConcurrency || 4;

  if (!hasWebGL) {
    return {
      tier: "low",
      particleCount: 0,
      fireworkFrequencyMs: 8000,
      maxActiveFireworks: 0,
      pixelRatio: 1,
      enableShadows: false,
      enableBloom: false,
      prefersReducedMotion,
      hasWebGL: false,
    };
  }

  if (prefersReducedMotion) {
    return {
      tier: "low",
      particleCount: 80,
      fireworkFrequencyMs: 12000,
      maxActiveFireworks: 1,
      pixelRatio: 1,
      enableShadows: false,
      enableBloom: false,
      prefersReducedMotion: true,
      hasWebGL: true,
    };
  }

  // High tier: desktop with >= 6 cores and >= 6GB memory
  if (!isMobile && cores >= 6 && memory >= 6) {
    return {
      tier: "high",
      particleCount: 500,
      fireworkFrequencyMs: 2600,
      maxActiveFireworks: 4,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      enableShadows: true,
      enableBloom: true,
      prefersReducedMotion: false,
      hasWebGL: true,
    };
  }

  // Medium tier: tablet or moderate desktop
  if (!isMobile || (cores >= 4 && memory >= 4)) {
    return {
      tier: "medium",
      particleCount: 260,
      fireworkFrequencyMs: 3600,
      maxActiveFireworks: 3,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
      enableShadows: false,
      enableBloom: false,
      prefersReducedMotion: false,
      hasWebGL: true,
    };
  }

  // Low tier: mobile or low power
  return {
    tier: "low",
    particleCount: 120,
    fireworkFrequencyMs: 5000,
    maxActiveFireworks: 2,
    pixelRatio: 1,
    enableShadows: false,
    enableBloom: false,
    prefersReducedMotion: false,
    hasWebGL: true,
  };
}
