"use client";

import { prefersReducedMotion } from "@/lib/motion-pref";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const STAGES = [
  {
    n: "01",
    title: "Open land",
    copy: "It begins with a clear title and a carefully chosen parcel on a growth corridor.",
  },
  {
    n: "02",
    title: "Planned roads",
    copy: "A Vastu-aligned grid and wide CC roads are drawn before a single plot is sold.",
  },
  {
    n: "03",
    title: "Green avenues",
    copy: "Avenue plantation, parks and open spaces soften every street.",
  },
  {
    n: "04",
    title: "Homes rise",
    copy: "Your plot becomes the foundation for the home you design — on your timeline.",
  },
  {
    n: "05",
    title: "A community",
    copy: "A clubhouse, lit streets and neighbours bring the whole place to life.",
  },
];
const BOUNDS = [0, 0.2, 0.4, 0.58, 0.8, 1];

/**
 * Pinned 3D scroll story — "from open plot to home". The section is 5 screens
 * tall; the canvas stays pinned while scroll progress builds the scene.
 */
export function PlotStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    const i = BOUNDS.findIndex((b, k) => v >= b && v < (BOUNDS[k + 1] ?? 1.01));
    if (i >= 0) setActive(Math.min(i, STAGES.length - 1));
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    let raf = 0;
    let visible = false;
    let disposed = false;
    let smooth = progressRef.current;
    let cleanup = () => {};
    const reduce = prefersReducedMotion();
    const mobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

    import("./plot-story-scene")
      .then(({ createPlotScene }) => {
        if (disposed) return;
        let scene: ReturnType<typeof createPlotScene>;
        try {
          scene = createPlotScene(canvas, { mobile });
        } catch {
          setFailed(true);
          return;
        }
        const resize = () => {
          const r = canvas.getBoundingClientRect();
          scene.resize(r.width, r.height);
          scene.render(smooth);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting), {
          rootMargin: "200px",
        });
        io.observe(section);
        const onMove = (e: PointerEvent) =>
          scene.setPointer(
            e.clientX / window.innerWidth - 0.5,
            -(e.clientY / window.innerHeight - 0.5),
          );
        if (!mobile) window.addEventListener("pointermove", onMove, { passive: true });

        const loop = () => {
          raf = requestAnimationFrame(loop);
          if (!visible) return;
          const target = progressRef.current;
          smooth += (target - smooth) * (reduce ? 1 : 0.09);
          scene.render(smooth);
        };
        raf = requestAnimationFrame(loop);
        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          window.removeEventListener("pointermove", onMove);
          scene.dispose();
        };
      })
      .catch(() => setFailed(true));

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-label="From open plot to home — an illustrative 3D story"
      className="relative h-[500vh] bg-[#0d1322] text-primary-foreground"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        {failed ? (
          <img
            src="/projects/magnus/gate-render.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1322]/90 via-[#0d1322]/30 to-transparent lg:bg-gradient-to-r lg:from-[#0d1322]/85 lg:via-[#0d1322]/20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0d1322] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d1322] to-transparent" />

        <div className="container-x relative flex h-full flex-col justify-between pb-10 pt-28">
          <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-champagne">
            <span className="h-px w-8 bg-current" /> From open plot to home
          </div>

          <div className="relative min-h-[16rem] max-w-md">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.n}
                className="absolute inset-x-0 bottom-0 flex flex-col gap-5"
                initial={false}
                animate={
                  active === i
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: active > i ? -30 : 30, filter: "blur(6px)" }
                }
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={active !== i}
              >
                <span className="font-mono text-sm text-champagne">{s.n} / 05</span>
                <h2 className="big-title">{s.title}</h2>
                <p className="text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
                  {s.copy}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-end justify-between gap-6">
            <StageRail progress={scrollYProgress} active={active} />
            <span className="max-w-[14rem] text-right text-[0.62rem] leading-relaxed text-primary-foreground/45">
              Illustrative 3D visualisation — not a depiction of any specific project.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageRail({ progress, active }: { progress: MotionValue<number>; active: number }) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex justify-between">
        {STAGES.map((s, i) => (
          <span
            key={s.n}
            className={cn(
              "font-mono text-[0.62rem] transition-colors duration-500",
              i <= active ? "text-champagne" : "text-primary-foreground/30",
            )}
          >
            {s.n}
          </span>
        ))}
      </div>
      <div className="relative h-px bg-primary-foreground/15">
        <motion.div className="absolute inset-y-0 left-0 bg-champagne" style={{ width }} />
      </div>
    </div>
  );
}
