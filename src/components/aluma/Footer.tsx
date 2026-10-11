import { Link } from "@tanstack/react-router";
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
          {SOCIAL_LINKS.filter(({ url }) => url).map(({ label, url }) => (
            <a
              key={label}
              href={url ?? undefined}
              rel="noreferrer noopener"
              target="_blank"
              className="label-xs border-b border-transparent pb-0.5 text-bruma hover:border-ouro hover:text-oso"
            >
              {label}
            </a>
          ))}
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
