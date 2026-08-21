import { dict, type Lang } from "@/lib/i18n";

export function StudioPage({ lang }: { lang: Lang }) {
  const t = dict(lang);

  return (
    <>
      <header className="gutter pt-[14vh] pb-[8vh]">
        <p className="label-xs text-ouro">{t.studio.label}</p>
        <h1 className="display mt-8 max-w-4xl text-5xl sm:text-7xl">{t.studio.title}</h1>
        <p className="display mt-12 max-w-3xl text-2xl text-bruma sm:text-3xl">{t.studio.lead}</p>
      </header>

      <section className="gutter pb-[16vh]">
        <div className="grid gap-12 border-t pt-16 md:grid-cols-3">
          {t.studio.body.map((para) => (
            <p key={para} className="text-[15px] text-bruma">
              {para}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
