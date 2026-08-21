import { dict, type Lang } from "@/lib/i18n";

export function EthicsPage({ lang }: { lang: Lang }) {
  const t = dict(lang);

  return (
    <>
      <header className="gutter pt-[14vh] pb-[8vh]">
        <p className="label-xs text-ouro">{t.ethics.label}</p>
        <h1 className="display mt-8 max-w-4xl text-5xl sm:text-7xl">{t.ethics.title}</h1>
      </header>

      <section className="gutter pb-[10vh]">
        <p className="display max-w-4xl text-2xl leading-snug text-oso sm:text-4xl">
          {t.ethics.lead}
        </p>
      </section>

      <section className="gutter pb-[16vh]">
        <ul className="divide-y border-t">
          {t.ethics.points.map((point) => (
            <li key={point} className="py-10 text-xl text-bruma sm:text-2xl">
              {point}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
