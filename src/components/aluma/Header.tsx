import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LANGS,
  PAGE_KEYS,
  dict,
  homeLink,
  pageLink,
  pageFromSlug,
  pieceLink,
  postLink,
  rememberLang,
  type Lang,
  type PageKey,
} from "@/lib/i18n";

function useCurrentPage(lang: Lang): { page: PageKey | null; pieceSlug: string | null } {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  const sectionSlug = parts[1];
  const page = sectionSlug ? pageFromSlug(sectionSlug, lang) : null;
  return { page, pieceSlug: parts[2] ?? null };
}

export function Header({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const { page, pieceSlug } = useCurrentPage(lang);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [page, pieceSlug]);

  const targetFor = (to: Lang) => {
    if (!page) return homeLink(to);
    if (page === "work" && pieceSlug) return pieceLink(to, pieceSlug);
    if (page === "blog" && pieceSlug) return postLink(to, pieceSlug);
    return pageLink(page, to);
  };

  return (
    <header className="gutter sticky top-0 z-50 border-b bg-tinta/85 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between">
        <Link
          {...homeLink(lang)}
          className="label-xs text-oso hover:text-ouro"
          style={{ letterSpacing: "0.3em" }}
        >
          Aluma
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label={t.nav.menu}>
          {PAGE_KEYS.map((key) => (
            <Link
              key={key}
              {...pageLink(key, lang)}
              className="label-xs border-b border-transparent pb-0.5 text-bruma transition-colors hover:border-ouro hover:text-oso"
              activeProps={{ className: "label-xs border-b border-ouro pb-0.5 text-oso" }}
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2" aria-label={t.nav.language}>
            {LANGS.map((code) => (
              <Link
                key={code}
                {...targetFor(code)}
                onClick={() => rememberLang(code)}
                hrefLang={code}
                aria-current={code === lang ? "true" : undefined}
                className={`label-xs px-1 transition-colors ${
                  code === lang ? "text-ouro" : "text-bruma hover:text-oso"
                }`}
              >
                {code}
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="label-xs text-bruma hover:text-oso md:hidden"
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-5 border-t py-8 md:hidden" aria-label={t.nav.menu}>
          {PAGE_KEYS.map((key) => (
            <Link
              key={key}
              {...pageLink(key, lang)}
              className="display text-4xl text-oso"
              onClick={() => setOpen(false)}
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
