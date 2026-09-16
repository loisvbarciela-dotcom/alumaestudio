import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import manifesto01 from "@/assets/manifesto/01.png.asset.json";
import manifesto02 from "@/assets/manifesto/02.png.asset.json";
import manifesto03 from "@/assets/manifesto/03.png.asset.json";
import manifesto04 from "@/assets/manifesto/04.png.asset.json";
import manifesto05 from "@/assets/manifesto/05.png.asset.json";
import manifesto06 from "@/assets/manifesto/06.png.asset.json";
import manifesto07 from "@/assets/manifesto/07.png.asset.json";
import manifesto08 from "@/assets/manifesto/08.png.asset.json";
import manifesto09 from "@/assets/manifesto/09.png.asset.json";
import { dict, type Lang } from "@/lib/i18n";

const slides = [
  manifesto01.url,
  manifesto02.url,
  manifesto03.url,
  manifesto04.url,
  manifesto05.url,
  manifesto06.url,
  manifesto07.url,
  manifesto08.url,
  manifesto09.url,
];

export function ManifestoCarousel({ lang }: { lang: Lang }) {
  const t = dict(lang).manifestoCarousel;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const syncCurrent = useCallback((carousel: CarouselApi) => {
    if (carousel) setCurrent(carousel.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    syncCurrent(api);
    api.on("select", syncCurrent);
    api.on("reInit", syncCurrent);
    return () => {
      api.off("select", syncCurrent);
      api.off("reInit", syncCurrent);
    };
  }, [api, syncCurrent]);

  return (
    <section className="border-t bg-tinta py-[12vh]" aria-labelledby="manifesto-title">
      <div className="gutter mx-auto max-w-[1600px]">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 id="manifesto-title" className="display text-4xl text-oso sm:text-6xl">
            {t.title}
          </h2>
          <p className="label-xs shrink-0 text-bruma" aria-live="polite" aria-atomic="true">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true }}
          aria-label={t.label}
          className="mx-auto w-full max-w-[920px]"
        >
          <CarouselContent className="-ml-0">
            {slides.map((src, index) => (
              <CarouselItem key={src} className="pl-0">
                <img
                  src={src}
                  alt={`${t.imageAlt} ${index + 1}`}
                  width={1024}
                  height={1024}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="aspect-square size-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex items-center justify-between gap-6">
            <div className="flex gap-2" aria-hidden="true">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`h-px w-5 transition-colors ${index === current ? "bg-ouro" : "bg-bruma/40"}`}
                />
              ))}
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => api?.scrollPrev()}
                aria-label={t.previous}
                className="rounded-none border border-bruma/40 text-oso hover:border-ouro hover:bg-transparent hover:text-ouro"
              >
                <ArrowLeft />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => api?.scrollNext()}
                aria-label={t.next}
                className="rounded-none border border-bruma/40 text-oso hover:border-ouro hover:bg-transparent hover:text-ouro"
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}