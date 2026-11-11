/**
 * Reduced-motion preference with a preview override.
 * Visiting any page with `?motion=full` forces full motion for the session
 * (useful when the device has OS animations turned off); `?motion=auto` resets.
 */
const KEY = "antera-motion";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const q = new URLSearchParams(window.location.search).get("motion");
    if (q === "full") sessionStorage.setItem(KEY, "full");
    if (q === "auto") sessionStorage.removeItem(KEY);
    if (sessionStorage.getItem(KEY) === "full") return false;
  } catch {
    /* storage blocked */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Inline head script: tags <html> before paint so CSS and the loader agree with JS. */
export const MOTION_HEAD_SCRIPT =
  "try{var q=new URLSearchParams(location.search).get('motion');if(q==='full')sessionStorage.setItem('antera-motion','full');if(q==='auto')sessionStorage.removeItem('antera-motion');var full=sessionStorage.getItem('antera-motion')==='full';var reduce=!full&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(full)document.documentElement.classList.add('motion-full');if(reduce)document.documentElement.classList.add('motion-reduce');if(sessionStorage.getItem('antera-loaded')==='1'||reduce)document.documentElement.classList.add('loader-seen')}catch(e){}";
