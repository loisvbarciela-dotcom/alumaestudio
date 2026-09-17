import { useState } from "react";

type Props = {
  embedUrl: string;
  posterUrl: string | null;
  title: string;
};

export function InstagramFacade({ embedUrl, posterUrl, title }: Props) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="size-full border-0 bg-tinta"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative block size-full cursor-pointer"
      aria-label={title}
    >
      {posterUrl ? (
        <img src={posterUrl} alt={title} className="size-full object-cover" />
      ) : null}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-tinta/30 transition-colors group-hover:bg-tinta/10"
      >
        <span className="flex size-16 items-center justify-center rounded-full border border-ouro bg-tinta/80 transition-transform group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-ouro" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}