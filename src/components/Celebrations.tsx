import { useCallback, useState } from "react";
import { Images } from "lucide-react";
import { celebrations, type Celebration } from "../data/site";
import { CelebrationGallery } from "./CelebrationGallery";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";

/** Section 2 — Event categories */
export function Celebrations() {
  const [selected, setSelected] = useState<Celebration | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="celebrations" className="relative scroll-mt-24 overflow-hidden bg-white">
      <div className="pattern-zellige-dark pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>What we offer</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="type-h2 mt-4 text-[#1b1b1a]">Celebrations at Jnane Tamsna</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="type-body-lg mx-auto mt-4 text-[#70706e]">
              From intimate gatherings to spectacular wedding weekends, discover
              unforgettable ways to celebrate in Marrakech.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {celebrations.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <article className="group">
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  aria-label={`Open ${item.title} gallery (${item.gallery.length} photos)`}
                  aria-haspopup="dialog"
                  className="relative block aspect-square w-full cursor-zoom-in overflow-hidden bg-[#f2f2f0] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-canvas"
                >
                  <img
                    src={item.photo.src}
                    alt={item.photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55%,rgba(0,0,0,0.45)_100%)]" />
                  <span className="absolute right-0 bottom-0 left-0 flex items-center gap-2 px-4 py-3 text-[0.68rem] font-light tracking-[0.16em] text-white uppercase">
                    <Images className="h-3.5 w-3.5" />
                    View gallery · {item.gallery.length} photos
                  </span>
                </button>
                <p className="mt-5 font-display text-[0.68rem] font-light tracking-[0.22em] text-[#70706e]">
                  0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-[1.35rem] leading-snug font-light tracking-[0.02em] text-[#1b1b1a] transition-opacity group-hover:opacity-70">
                  <button type="button" onClick={() => setSelected(item)} aria-haspopup="dialog" className="text-left">
                    {item.title}
                  </button>
                </h3>
                <p className="type-body-sm mt-2.5 text-[#70706e]">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <CelebrationGallery celebration={selected} onClose={close} />
    </section>
  );
}
