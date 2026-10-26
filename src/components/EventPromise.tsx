import { HeartHandshake, Sparkles, TreePalm } from "lucide-react";
import { promises } from "../data/site";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";

const icons = {
  sparkles: Sparkles,
  palm: TreePalm,
  heart: HeartHandshake,
};

/** Section 3 — Our event promise */
export function EventPromise() {
  return (
    <section id="promise" className="relative scroll-mt-24 overflow-hidden bg-canvas text-sage">
      <div className="pattern-zellige pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_0%,rgba(184,173,133,0.12),transparent_72%)]" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow tone="light">The Jnane Tamsna experience</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="type-h2 mt-4 text-white">Our Event Promise</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="type-body-lg mt-4 text-sage">
              Three signature elements that make every celebration at Jnane Tamsna extraordinary.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
          {promises.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 0.1}>
                <article className="group flex h-full flex-col bg-canvas p-8 transition-colors duration-300 hover:bg-[#3a3a3a] sm:p-10">
                  <Icon className="h-7 w-7 text-sage" strokeWidth={1.2} />
                  <p className="mt-7 font-display text-[0.65rem] font-light tracking-[0.24em] text-[#b8ad85]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-[1.3rem] leading-snug font-light text-white">
                    {item.title}
                  </h3>
                  <p className="type-body-sm mt-3 text-sage">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
