import { useEffect, useState } from "react";

const EVENT = "antera:loader-done";
export const LOADER_KEY = "antera-loaded";

let done = false;

export function markLoaderDone() {
  done = true;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

/** True once the intro loader has finished (or was skipped). Hero entrance animations wait for it. */
export function useLoaderDone() {
  const [ready, setReady] = useState(done);
  useEffect(() => {
    if (done) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener(EVENT, on);
    // Safety net: never hold the hero back for long.
    const t = window.setTimeout(on, 4200);
    return () => {
      window.removeEventListener(EVENT, on);
      window.clearTimeout(t);
    };
  }, []);
  return ready;
}
