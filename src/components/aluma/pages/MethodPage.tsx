import { dict, type Lang } from "@/lib/i18n";

export function MethodPage({ lang }: { lang: Lang }) {
  const t = dict(lang);

  return (
    <>
      <header className="gutter pt-[14vh] pb-[10vh]">
        <p className="label-xs text-ouro">{t.method.label}</p>
        <h1 className="display mt-8 max-w-4xl text-5xl sm:text-7xl">{t.method.title}</h1>
      </header>

      <section className="gutter pb-[16vh]">
        <ol className="divide-y border-t">
          {t.method.steps.map((step) => (
            <li key={step.n} className="grid gap-6 py-16 md:grid-cols-12">
              <span className="label-xs text-ouro md:col-span-2">{step.n}</span>
              <h2 className="display text-4xl sm:text-5xl md:col-span-4">{step.title}</h2>
              <p className="max-w-lg text-bruma md:col-span-6">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
