import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageLink, type Lang } from "@/lib/i18n";
import copy from "@/content/love.json";
import hero from "@/assets/love/hero.jpg";
import thumbnail from "@/assets/love/thumbnail.png.asset.json";

export function LovePage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [playing, setPlaying] = useState(false);
  const [world, setWorld] = useState(1);
  const selected = t.worlds[world];
  return (
    <>
      <section className="relative isolate flex min-h-[620px] items-end overflow-hidden lg:min-h-[680px]">
        <img src={hero} alt="" width={1536} height={864} fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover object-[65%_center]" />
        <div className="absolute inset-0 -z-10 bg-tinta/40" />
        <div className="gutter w-full pb-14 pt-28">
          <p className="label-xs text-oso">{t.eyebrow}</p>
          <h1 className="mt-7 max-w-[680px] text-6xl leading-[0.98] sm:text-7xl lg:text-8xl">{t.title}</h1>
          <p className="mt-7 max-w-md text-lg text-oso">{t.intro}</p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Button variant="cinema" size="lg" asChild><Link {...pageLink("contact", lang)}>{t.cta}<ArrowUpRight /></Link></Button>
            <Button variant="cinema" className="border-0 px-0" onClick={() => document.getElementById("film-example")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><Play />{t.watch}</Button>
          </div>
        </div>
      </section>
      <div className="gutter grid grid-cols-1 gap-4 border-b py-7 sm:grid-cols-3">
        {t.facts.map((fact, i) => <p key={fact} className="label-xs flex items-center gap-4 text-bruma"><span className="text-ouro">0{i + 1}</span>{fact}</p>)}
      </div>

      <section className="gutter py-24 lg:py-40">
        <p className="label-xs text-ouro">{t.painLabel}</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <h2 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl">{t.painTitle}</h2>
          <p className="max-w-xl self-end text-lg text-bruma">{t.painText}</p>
        </div>
      </section>

      <section id="film-example" className="gutter scroll-mt-24 pb-24 lg:pb-40">
        <p className="label-xs text-ouro">{t.filmLabel}</p>
        <h2 className="mt-7 max-w-3xl text-4xl sm:text-5xl">{t.filmTitle}</h2>
        <div className="relative mt-12 aspect-video w-full bg-tinta">
          {playing ? <iframe src="https://www.youtube-nocookie.com/embed/GvkblfoP1J8?autoplay=1&rel=0" title={t.play} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="size-full border-0" /> :
            <Button variant="cinema" className="group relative size-full overflow-hidden border-0 p-0" aria-label={t.play} onClick={() => setPlaying(true)}>
              <img src={thumbnail.url} alt={t.filmTitle} width={1365} height={768} loading="lazy" className="size-full object-contain" />
              <span className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full border border-ouro bg-tinta/85 text-oso transition-transform group-hover:scale-105 sm:bottom-8 sm:right-8 sm:size-16"><Play className="size-5" /></span>
            </Button>}
        </div>
        <div className="mt-5 flex flex-col justify-between gap-4 border-t pt-5 sm:flex-row">
          <p className="max-w-2xl text-sm text-bruma">{t.filmCaption}</p>
          <Button variant="cinema" asChild className="h-auto shrink-0 self-start border-0 p-0 text-bruma"><a href="https://youtu.be/GvkblfoP1J8" target="_blank" rel="noopener noreferrer">{t.external}<ArrowUpRight /></a></Button>
        </div>
      </section>

      <section className="gutter border-y bg-papel py-24 text-tinta lg:py-36">
        <p className="label-xs text-ouro">{t.worldLabel}</p>
        <h2 className="mt-7 max-w-3xl text-4xl sm:text-6xl">{t.worldTitle}</h2>
        <p className="mt-8 max-w-2xl">{t.worldIntro}</p>
        <div role="tablist" aria-label={t.worldTitle} className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-b border-tinta/20 pb-5">
          {t.worlds.map((item, i) => <Button key={item.name} variant="cinema" role="tab" id={`world-tab-${i}`} aria-selected={world === i} aria-controls="world-panel" className={`h-auto rounded-none border-0 border-b px-0 pb-2 text-base ${world === i ? "border-ouro text-tinta" : "border-transparent text-tinta/60"}`} onClick={() => setWorld(i)} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); const next = (world + (event.key === "ArrowRight" ? 1 : -1) + t.worlds.length) % t.worlds.length; setWorld(next); document.getElementById(`world-tab-${next}`)?.focus(); } }} tabIndex={world === i ? 0 : -1}>{item.name}</Button>)}
        </div>
        <div id="world-panel" role="tabpanel" aria-labelledby={`world-tab-${world}`} className="mt-10 min-h-40 max-w-3xl">
          <p className="label-xs text-ouro">0{world + 1}</p><h3 className="mt-5 text-4xl">{selected?.name}</h3><p className="mt-5 max-w-xl text-lg">{selected?.text}</p>
        </div>
      </section>

      <section className="gutter py-24 lg:py-40">
        <p className="label-xs text-ouro">{t.processLabel}</p>
        <h2 className="mt-7 max-w-3xl text-4xl sm:text-6xl">{t.processTitle}</h2>
        <ol className="mt-16 grid gap-12 lg:grid-cols-3">
          {t.steps.map((step, i) => <li key={step.title} className="border-t pt-6"><span className="label-xs text-ouro">0{i+1}</span><h3 className="mt-8 text-3xl">{step.title}</h3><p className="mt-6 text-bruma">{step.text}</p></li>)}
        </ol>
      </section>
      <section className="gutter border-y py-24 lg:py-36">
        <p className="label-xs text-ouro">{t.plannerLabel}</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div><h2 className="text-4xl sm:text-6xl">{t.plannerTitle}</h2><Button variant="cinema" asChild size="lg" className="mt-10"><Link {...pageLink("contact", lang)}>{t.plannerCta}<ArrowUpRight /></Link></Button></div>
          <div><p className="text-lg text-bruma">{t.plannerText}</p><ul className="mt-10 space-y-5">{t.plannerPoints.map(point => <li className="flex gap-4 border-t pt-5" key={point}><span className="text-ouro">—</span>{point}</li>)}</ul></div>
        </div>
      </section>
      <section className="gutter py-24 lg:py-36">
        <h2 className="label-xs text-ouro">{t.faqLabel}</h2>
        <div className="mt-10 max-w-4xl">{t.faqs.map(faq => <details key={faq.q} className="group border-t py-6 last:border-b"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl [&::-webkit-details-marker]:hidden">{faq.q}<ArrowDown className="size-4 shrink-0 text-ouro transition-transform group-open:rotate-180" /></summary><p className="mt-5 max-w-3xl text-bruma">{faq.a}</p></details>)}</div>
      </section>
      <section className="gutter border-t pb-28 pt-20 lg:pb-40"><h2 className="max-w-3xl text-5xl sm:text-6xl">{t.closeTitle}</h2><p className="mt-8 max-w-xl text-lg text-bruma">{t.closeText}</p><Button variant="cinema" size="lg" asChild className="mt-10"><Link {...pageLink("contact", lang)}>{t.cta}<ArrowUpRight /></Link></Button></section>
    </>
  );
}