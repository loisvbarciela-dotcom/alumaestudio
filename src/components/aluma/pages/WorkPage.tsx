import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PendingVideo } from "../PendingVideo";
import { ROOMS, dict, pieceLink, pieces, type Lang, type Room } from "@/lib/i18n";

export function WorkPage({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const [room, setRoom] = useState<Room | "all">("all");
  const list = room === "all" ? pieces : pieces.filter((p) => p.sala === room);


  return (
    <>
      <header className="gutter pt-[14vh] pb-16">
        <p className="label-xs text-ouro">{t.work.label}</p>
        <h1 className="display mt-8 text-5xl sm:text-7xl">{t.work.title}</h1>
        <div className="mt-14 flex flex-wrap gap-8 border-t pt-6">
          {(["all", ...ROOMS] as const).map((key) => {
            const active = room === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setRoom(key)}
                aria-pressed={active}
                className={`label-xs border-b pb-0.5 transition-colors ${
                  active ? "border-ouro text-oso" : "border-transparent text-bruma hover:text-oso"
                }`}
              >
                {key === "all" ? t.work.all : t.work.rooms[key]}
              </button>
            );
          })}
        </div>
      </header>

      <section className="gutter pb-[14vh]">
        {list.length === 0 ? (
          <p className="text-bruma">{t.work.empty}</p>
        ) : (
          <ul className="grid gap-x-8 gap-y-16 md:grid-cols-12">
            {list.map((piece, i) => (
              <li key={piece.slug} className={spanFor(i)}>
                <Link
                  {...pieceLink(lang, piece.slug)}
                  className="group block"
                  aria-label={piece.titulo[lang]}
                >
                  <div className={`relative ${aspectFor(i)}`}>
                    <PendingVideo
                      videoUrl={piece.videoUrl}
                      posterUrl={piece.posterUrl}
                      label={t.case.pendingVideo}
                      alt={piece.titulo[lang]}
                      className="size-full"
                      playOnHover
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-tinta/25 opacity-80 transition-all group-hover:bg-tinta/10 group-hover:opacity-100"
                    >
                      <span className="flex size-14 items-center justify-center rounded-full border border-ouro bg-tinta/80 transition-transform group-hover:scale-105">
                        <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-ouro">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between border-t pt-3">
                    <span className="text-[15px] text-oso group-hover:text-ouro">
                      {piece.titulo[lang]}
                    </span>
                    <span className="label-xs text-bruma">
                      {t.work.rooms[piece.sala]} · {piece.ano}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
