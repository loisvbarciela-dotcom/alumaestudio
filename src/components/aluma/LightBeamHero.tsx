import { useEffect, useRef, useState } from "react";
import { PendingVideo } from "./PendingVideo";
import { dict, type Lang, type Piece } from "@/lib/i18n";

// Beam radius as a fraction of the hero's shorter side.
const CLOSED_RADIUS = 0.26;
const OPEN_RADIUS = 2.2;

export function LightBeamHero({ lang, piece }: { lang: Lang; piece?: Piece }) {
  const t = dict(lang);
  const wrapRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 50, y: 50, r: CLOSED_RADIUS });
  const current = useRef({ x: 50, y: 50, r: CLOSED_RADIUS });
  const [open, setOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setOpen(true);
      target.current.r = OPEN_RADIUS;
      current.current.r = OPEN_RADIUS;
    }
  }, []);

  // Animation loop: the beam lerps toward the pointer, so it lags — that lag
  // is what makes the light feel physical rather than glued to the cursor.
  useEffect(() => {
    if (reduced) {
      const el = wrapRef.current;
      if (el) {
        const min = Math.min(el.clientWidth, el.clientHeight);
        el.style.setProperty("--beam-r", `${OPEN_RADIUS * min}px`);
        el.style.setProperty("--beam-x", "50%");
        el.style.setProperty("--beam-y", "50%");
      }
      return;
    }

    let frame = 0;
    const tick = () => {
      const el = wrapRef.current;
      if (el) {
        const c = current.current;
        const tg = target.current;
        c.x += (tg.x - c.x) * 0.07;
        c.y += (tg.y - c.y) * 0.07;
        c.r += (tg.r - c.r) * 0.045;
        el.style.setProperty("--beam-x", `${c.x.toFixed(2)}%`);
        el.style.setProperty("--beam-y", `${c.y.toFixed(2)}%`);
        const min = Math.min(el.clientWidth, el.clientHeight);
        el.style.setProperty("--beam-r", `${(c.r * min).toFixed(1)}px`);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  // Idle drift on touch devices plus the 3s auto-open.
  useEffect(() => {
    if (reduced) return;
    let drift = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) {
      const start = performance.now();
      const loop = () => {
        const s = (performance.now() - start) / 2600;
        target.current.x = 50 + Math.cos(s) * 16;
        target.current.y = 50 + Math.sin(s * 0.8) * 10;
        drift = requestAnimationFrame(loop);
      };
      drift = requestAnimationFrame(loop);
    }
    const timer = window.setTimeout(() => reveal(), 3000);
    return () => {
      window.clearTimeout(timer);
      if (drift) cancelAnimationFrame(drift);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => reveal();
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  function reveal() {
    setOpen(true);
    target.current.r = OPEN_RADIUS;
    target.current.x = 50;
    target.current.y = 50;
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (open || reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    target.current.x = ((e.clientX - rect.left) / rect.width) * 100;
    target.current.y = ((e.clientY - rect.top) / rect.height) * 100;
  }

  const maskStyle: React.CSSProperties = {
    maskImage:
      "radial-gradient(circle var(--beam-r, 140px) at var(--beam-x, 50%) var(--beam-y, 50%), #000 0%, #000 42%, rgba(0,0,0,0.4) 72%, transparent 100%)",
    maskRepeat: "no-repeat",
  };

  return (
    <section
      ref={wrapRef}
      onPointerMove={onPointerMove}
      onClick={() => reveal()}
      className="relative isolate h-[86vh] min-h-[520px] w-full overflow-hidden bg-tinta"
      style={
        {
          "--beam-x": "50%",
          "--beam-y": "50%",
          "--beam-r": `${(reduced ? OPEN_RADIUS : CLOSED_RADIUS) * 520}px`,
        } as React.CSSProperties
      }
    >
      {/* Base: the piece, almost extinguished. */}
      <div className="absolute inset-0" style={{ filter: "brightness(0.15)" }} aria-hidden="true">
        <PendingVideo
          videoUrl={piece?.videoUrl ?? null}
          posterUrl={piece?.posterUrl ?? null}
          label={t.case.pendingVideo}
          alt={t.hero.videoAlt}
          className="size-full border-0"
          autoPlay
        />
      </div>

      {/* Revealed: only where the light falls. */}
      <div className="absolute inset-0" style={maskStyle}>
        <PendingVideo
          videoUrl={piece?.videoUrl ?? null}
          posterUrl={piece?.posterUrl ?? null}
          label={t.case.pendingVideo}
          alt={t.hero.videoAlt}
          className="size-full border-0"
          autoPlay
        />
      </div>

      {/* Title lives inside the beam. */}
      <div
        className="gutter pointer-events-none absolute inset-0 flex flex-col justify-end pb-[10vh]"
        style={maskStyle}
      >
        <h1 className="hero-title text-oso">{t.hero.title}</h1>
        <p className="mt-6 max-w-md text-bruma">{t.hero.subtitle}</p>
      </div>

      <div className="gutter pointer-events-none absolute inset-x-0 bottom-6 flex justify-end">
        <span
          className={`label-xs text-bruma/60 transition-opacity duration-700 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        >
          {t.hero.reveal}
        </span>
      </div>
    </section>
  );
}
