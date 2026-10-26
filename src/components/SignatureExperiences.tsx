import { useCallback, useState } from "react";
import { signatureExperiences } from "../data/site";
import { Eyebrow } from "./Ornament";
import { PhotoLightbox, ZoomableImage, type ZoomPhoto } from "./PhotoLightbox";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

/** Section 4 — Featured event formats. 2 wider cards, then 3 smaller ones. */
export function SignatureExperiences() {
  const [zoomed, setZoomed] = useState<ZoomPhoto | null>(null);
  const close = useCallback(() => setZoomed(null), []);

  return (
    <section id="experiences" className="relative scroll-mt-24 overflow-hidden bg-white">
      <div className="pattern-zellige-dark pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Signature experiences</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="type-h2 mt-4 text-[#1b1b1a]">Unforgettable Ways to Celebrate</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="type-body-lg mt-4 text-[#70706e]">
              Discover the beautiful settings and signature experiences that make Jnane
              Tamsna a distinctive destination for weddings and celebrations.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {signatureExperiences.map((item, index) => {
            const featured = index < 2;
            return (
              <Reveal
                key={item.title}
                delay={(featured ? index : index - 2) * 0.08}
                className={cn(featured ? "lg:col-span-3" : "lg:col-span-2")}
              >
                <article className="group h-full">
                  <ZoomableImage
                    photo={{ ...item.photo, title: item.title }}
                    onOpen={setZoomed}
                    className={cn("border border-[#e6e6e3]", featured ? "aspect-[4/3]" : "aspect-square")}
                  />
                  <div className="border-x border-b border-[#e6e6e3] bg-[#fcfcfa] px-5 py-5">
                    <h3
                      className={cn(
                        "font-display leading-snug font-light tracking-[0.02em] text-[#1b1b1a] transition-opacity group-hover:opacity-70",
                        featured ? "text-[1.3rem]" : "text-[1.15rem]",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="type-body-sm mt-2 text-[#70706e]">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
      <PhotoLightbox photo={zoomed} onClose={close} />
    </section>
  );
}
