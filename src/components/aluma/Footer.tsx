import { Link } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";
import { PAGE_KEYS, SOCIAL_LINKS, dict, pageLink, type Lang } from "@/lib/i18n";

export function Footer({ lang }: { lang: Lang }) {
  const t = dict(lang);

  return (
    <footer className="gutter border-t py-16">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-xs text-bruma">{t.footer.line}</p>
          <nav className="mt-6 flex flex-wrap gap-6" aria-label={t.nav.menu}>
            {PAGE_KEYS.map((key) => (
              <Link
                key={key}
                {...pageLink(key, lang)}
                className="label-xs border-b border-transparent pb-0.5 text-bruma hover:border-ouro hover:text-oso"
              >
                {t.nav[key]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex flex-row items-center gap-5">
            {SOCIAL_LINKS.filter(({ url }) => url).map(({ label, url }) => (
              <a
                key={label}
                href={url ?? undefined}
                aria-label={label}
                rel="noopener noreferrer"
                target="_blank"
                className="border-b border-transparent pb-0.5 text-bruma hover:border-ouro hover:text-oso"
              >
                {label === "Instagram" ? <Instagram className="size-5" aria-hidden="true" /> :
                  label === "YouTube" ? <Youtube className="size-5" aria-hidden="true" /> : (
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16.7 1h-3.4v14.9a3.1 3.1 0 1 1-2.7-3.1V9.3a6.6 6.6 0 1 0 6.1 6.6V8.3a9 9 0 0 0 5.3 1.7V6.6A5.5 5.5 0 0 1 16.7 1Z" />
                    </svg>
                  )}
              </a>
            ))}
          </div>
          <div className="flex gap-6">
            <span className="label-xs text-bruma/70">{t.footer.legal}</span>
            <span className="label-xs text-bruma/70">{t.footer.privacy}</span>
            <span className="label-xs text-bruma/70">{t.footer.cookies}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
