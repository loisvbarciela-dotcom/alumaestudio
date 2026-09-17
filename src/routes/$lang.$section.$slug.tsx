import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { PendingVideo } from "@/components/aluma/PendingVideo";
import { SiteShell } from "@/components/aluma/SiteShell";
import { YouTubeFacade } from "@/components/aluma/YouTubeFacade";
import {
  LANGS,
  SITE_URL,
  dict,
  isLang,
  nextPiece,
  pieceBySlug,
  pieceLink,
  slugFor,
  youtubeId,
  type Lang,
} from "@/lib/i18n";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang/$section/$slug")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
    if (params.section !== slugFor("work", params.lang)) throw notFound();
    if (!pieceBySlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "gl") as Lang;
    const piece = pieceBySlug(params.slug);
    const t = dict(lang);
    if (!piece) {
      return { meta: [{ title: "Aluma" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${piece.titulo[lang]} — Aluma`;
    const description = [
      t.work.rooms[piece.sala],
      piece.ano,
      piece.desglose[0]?.texto[lang],
    ]
      .filter(Boolean)
      .join(" · ");
    const alternates = Object.fromEntries(
      LANGS.map((code) => [code, `/${code}/${slugFor("work", code)}/${piece.slug}`]),
    ) as Record<Lang, string>;
    const head = buildHead({
      lang,
      title,
      description,
      path: `/${lang}/${slugFor("work", lang)}/${piece.slug}`,
      alternates,
      ...(piece.posterUrl ? { image: piece.posterUrl } : {}),
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: piece.titulo[lang],
            description,
            inLanguage: lang,
            ...(piece.ano && /^\d{4}$/.test(piece.ano)
              ? { uploadDate: `${piece.ano}-01-01` }
              : {}),
            ...(piece.posterUrl ? { thumbnailUrl: piece.posterUrl } : {}),
            ...(piece.videoUrl ? { contentUrl: piece.videoUrl } : {}),
            ...(piece.youtubeUrl ? { embedUrl: piece.youtubeUrl } : {}),
            productionCompany: { "@type": "Organization", name: "Aluma", url: SITE_URL },
          }),
        },
      ],
    };
  },
  component: CaseRoute,
});

function CaseRoute() {
  const params = Route.useParams();
  const lang = (isLang(params.lang) ? params.lang : "gl") as Lang;
  const t = dict(lang);
  const piece = pieceBySlug(params.slug);
  if (!piece) throw notFound();
  const next = nextPiece(piece.slug);
  const currentYoutubeId = piece.youtubeUrl ? youtubeId(piece.youtubeUrl) : null;

  return (
    <SiteShell lang={lang}>
      <article>
        <div
          className={
            piece.aspectRatio === "portrait"
              ? "mx-auto aspect-[3/4] w-full max-w-2xl"
              : "aspect-video w-full"
          }
        >
          {currentYoutubeId ? (
            <YouTubeFacade
              videoId={currentYoutubeId}
              posterUrl={piece.posterUrl}
              title={piece.titulo[lang]}
            />
          ) : (
            <PendingVideo
              videoUrl={piece.videoUrl}
              posterUrl={piece.posterUrl}
              label={t.case.pendingVideo}
              alt={piece.titulo[lang]}
              className="size-full border-0"
              autoPlay
              hideLabel
            />
          )}
        </div>

        <header className="gutter py-[10vh]">
          <h1 className="display max-w-3xl text-5xl sm:text-7xl">{piece.titulo[lang]}</h1>
          <dl className="mt-16 grid gap-8 border-t pt-8 sm:grid-cols-4">
            {[
              [t.case.client, piece.cliente ?? t.case.ownPiece],
              [t.case.room, t.work.rooms[piece.sala]],
              [t.case.year, piece.ano ?? "—"],
              [t.case.duration, piece.duracion ?? "—"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="label-xs text-bruma">{label}</dt>
                <dd className="mt-3 text-[15px] text-oso">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {piece.desglose.length > 0 && (
        <section className="gutter pb-[12vh]">
          <h2 className="label-xs text-ouro">{t.case.breakdown}</h2>
          <div className="mt-16 space-y-24">
            {piece.desglose.map((block, i) => {
              const generated = block.tipo === "xerado";
              return (
                <div
                  key={i}
                  className={`grid items-center gap-10 md:grid-cols-2 ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="aspect-video">
                    {block.imagen ? (
                      <img
                        src={block.imagen}
                        alt={`${piece.titulo[lang]} — ${generated ? t.case.generated : t.case.filmed}`}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex size-full items-center justify-center border"
                        role="img"
                        aria-label={`${piece.titulo[lang]} — ${t.case.pendingImage}`}
                      >
                        <span className="label-xs text-bruma">{t.case.pendingImage}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      className="w-16 border-t-2"
                      style={{
                        borderColor: generated ? "var(--color-ouro)" : "var(--color-oso)",
                      }}
                    />
                    <p
                      className="label-xs mt-5"
                      style={{ color: generated ? "var(--color-ouro)" : "var(--color-oso)" }}
                    >
                      {generated ? t.case.generated : t.case.filmed}
                    </p>
                    <p className="mt-5 max-w-md text-[15px] text-bruma">{block.texto[lang]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        )}

        {piece.ferramentas.length > 0 && (
        <section className="gutter border-t py-12">
          <p className="label-xs text-bruma">{t.case.tools}</p>
          <p className="mt-4 text-[13px] text-bruma/80">{piece.ferramentas.join(" · ")}</p>
        </section>
        )}

        {next && (
          <nav className="gutter border-t py-[10vh]">
            <p className="label-xs text-bruma">{t.case.next}</p>
            <Link
              {...pieceLink(lang, next.slug)}
              className="display mt-6 inline-block border-b border-transparent text-4xl text-oso hover:border-ouro sm:text-6xl"
            >
              {next.titulo[lang]}
            </Link>
          </nav>
        )}
      </article>
    </SiteShell>
  );
}
