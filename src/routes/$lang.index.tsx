import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LightBeamHero } from "@/components/aluma/LightBeamHero";
import heroPosterAsset from "@/assets/hero/abella-no-text-2.png.asset.json";
import { ManifestoCarousel } from "@/components/aluma/ManifestoCarousel";
import { PendingVideo } from "@/components/aluma/PendingVideo";
import { SiteShell } from "@/components/aluma/SiteShell";
import {
  dict,
  isLang,
  pageLink,
  pieceLink,
  pieces,
  type Lang,
  type Piece,
} from "@/lib/i18n";
import { buildHead, organizationJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/$lang/")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "gl";
    const t = dict(lang);
    const head = buildHead({
      lang,
      title: t.meta.home.title,
      description: t.meta.home.description,
      path: `/${lang}`,
      alternates: { gl: "/gl", es: "/es", en: "/en", ru: "/ru" },
      image: heroPosterAsset.url,
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(organizationJsonLd()),
        },
      ],
    };
  },
  component: Home,
});

function Home() {
  const { lang: rawLang } = Route.useParams();
  const lang = (isLang(rawLang) ? rawLang : "gl") as Lang;
  const t = dict(lang);
  const featured = pieces.find((p) => p.destacada) ?? pieces[0];
  const rest = pieces.filter((p) => p.slug !== featured?.slug).slice(0, 2);

  return (
    <SiteShell lang={lang}>
      <LightBeamHero
        lang={lang}
        posterOverride={heroPosterAsset.url}
        {...(featured ? { piece: featured } : {})}
      />

      <ManifestoCarousel lang={lang} />

      {/* Selected work */}
      <section className="gutter border-t py-[14vh]">
        <div className="flex items-baseline justify-between">
          <h2 className="label-xs text-ouro">{t.home.selectedWork}</h2>
          <Link
            {...pageLink("work", lang)}
            className="label-xs border-b border-transparent pb-0.5 text-bruma hover:border-ouro hover:text-oso"
          >
            {t.home.allWork}
          </Link>
        </div>

        {featured && <PieceTile lang={lang} piece={featured} large />}

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {rest.map((piece) => (
            <PieceTile key={piece.slug} lang={lang} piece={piece} />
          ))}
        </div>
      </section>

      {/* Method */}
      <section className="gutter border-t bg-papel py-[14vh] text-tinta">
        <h2 className="label-xs" style={{ color: "var(--color-ouro)" }}>
          {t.method.label}
        </h2>
        <p className="display mt-8 max-w-3xl text-4xl sm:text-6xl">{t.method.title}</p>
        <ol className="mt-20 grid gap-16 md:grid-cols-3">
          {t.method.steps.map((step) => (
            <li key={step.n} className="border-t pt-6" style={{ borderColor: "#16130f22" }}>
              <span className="label-xs" style={{ color: "var(--color-ouro)" }}>
                {step.n}
              </span>
              <h3 className="mt-6 text-3xl">{step.title}</h3>
              <p className="mt-4 text-[15px]" style={{ color: "#4a4a45" }}>
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Contact */}
      <section className="gutter border-t py-[16vh]">
        <h2 className="display max-w-3xl text-4xl sm:text-6xl">{t.contact.title}</h2>
        <Link
          {...pageLink("contact", lang)}
          className="label-xs mt-12 inline-block border-b border-ouro pb-1 text-oso"
        >
          {t.contact.submit}
        </Link>
      </section>
    </SiteShell>
  );
}

function PieceTile({ lang, piece, large }: { lang: Lang; piece: Piece; large?: boolean }) {
  const t = dict(lang);
  return (
    <Link
      {...pieceLink(lang, piece.slug)}
      className="group mt-8 block"
      aria-label={piece.titulo[lang]}
    >
      <div className={piece.aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-video"}>
        <PendingVideo
          videoUrl={piece.videoUrl}
          posterUrl={piece.posterUrl}
          alt={piece.titulo[lang]}
          className="size-full"
          playOnHover
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between border-t pt-3">
        <span className="text-[15px] text-oso group-hover:text-ouro">{piece.titulo[lang]}</span>
        <span className="label-xs text-bruma">
          {t.work.rooms[piece.sala]} · {piece.ano}
        </span>
      </div>
    </Link>
  );
}

