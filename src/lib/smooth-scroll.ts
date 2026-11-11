import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

/** Lock / unlock page scrolling (menus, lightboxes, loader) — works with or without Lenis. */
export function lockScroll(locked: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) instance?.stop();
  else instance?.start();
}
