import { photos, type EventInquiry } from "../data/site";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";
import { InquiryForm } from "./InquiryForm";

/** Section 5 — Final reservation & contact */
export function Contact({
  inquiry,
  onInquiryChange,
  submitting,
  submitError,
  onSubmitInquiry,
}: {
  inquiry: EventInquiry;
  onInquiryChange: (inquiry: EventInquiry) => void;
  submitting: boolean;
  submitError: string | null;
  onSubmitInquiry: () => void;
}) {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-canvas text-sage">
      <div className="pattern-zellige pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_55%)]" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="light">Ready to celebrate?</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="type-h2 mt-4 text-white">Plan Your Dream Wedding</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="type-body-lg mt-4 text-sage">
              Let us bring your vision to life at Jnane Tamsna, where romantic gardens,
              timeless architecture and unforgettable experiences create the perfect
              setting for your celebration.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <figure className="arch overflow-hidden border border-sage/25">
              <img
                src={photos.contact.src}
                alt={photos.contact.alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="font-display text-[0.72rem] font-light tracking-[0.2em] text-[#b8ad85] uppercase">
                Jnane Tamsna
              </p>
              <p className="type-body-sm mt-2 text-sage">Marrakech Palmeraie · Morocco</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <InquiryForm
              variant="contact"
              inquiry={inquiry}
              onChange={onInquiryChange}
              submitting={submitting}
              submitError={submitError}
              onSubmitInquiry={onSubmitInquiry}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
