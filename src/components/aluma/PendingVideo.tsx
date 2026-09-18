import { useEffect, useRef, useState } from "react";

type Props = {
  videoUrl: string | null;
  posterUrl: string | null;
  alt: string;
  className?: string;
  playOnHover?: boolean;
  autoPlay?: boolean;
};

/**
 * Renders a lazy, muted looping <video> when a source exists, and a poster
 * frame when the client has not supplied the file yet.
 */
export function PendingVideo({
  videoUrl,
  posterUrl,
  alt,
  className = "",
  playOnHover = false,
  autoPlay = false,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(!autoPlay ? false : true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !autoPlay) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        setInView(visible);
        if (visible) void el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay]);

  if (!videoUrl) {
    return (
      <div
        className={`relative flex items-center justify-center border bg-tinta ${className}`}
        role="img"
        aria-label={alt}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={alt}
            className="size-full object-cover"
            loading={autoPlay ? "eager" : "lazy"}
            fetchPriority={autoPlay ? "high" : "auto"}
          />
        ) : null}
      </div>
    );
  }

  return (
    <video
      ref={ref}
      src={videoUrl}
      poster={posterUrl ?? undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      onMouseEnter={playOnHover ? (e) => void e.currentTarget.play().catch(() => {}) : undefined}
      onMouseLeave={
        playOnHover
          ? (e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }
          : undefined
      }
      autoPlay={autoPlay && inView}
      className={`size-full object-cover ${className}`}
    >
      <track kind="captions" />
    </video>
  );
}
