import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { photos, type EventInquiry } from "../data/site";
import { InquiryForm } from "./InquiryForm";
import { LogoMark } from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2%", "7%"]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden bg-canvas text-white">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[6%] h-[112%]">
        <img
          src={photos.hero.src}
          alt={photos.hero.alt}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      {/* measured hero gradient: 70% black at the top edge fading to transparent */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.45)_50%,rgba(0,0,0,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(51,51,51,0.55)_0%,rgba(51,51,51,0.2)_55%,transparent_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-10 px-6 pt-36 pb-20 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:pt-44 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="max-w-xl"
        >
          <p className="flex items-center gap-3 type-label text-sage">
            <LogoMark className="h-5 w-4 text-sage" />
            Luxury weddings &amp; events in Marrakech
          </p>

          <h1 className="type-display mt-7 text-white">
            Timeless Weddings,
            <br />
            <span className="italic text-sage">Magical Celebrations</span>
          </h1>

          <p className="type-body-xl mt-7 max-w-lg text-sage">
            Where lush gardens, Moroccan elegance and unforgettable moments come together.
          </p>

          <p className="type-body-md mt-6 max-w-lg text-white/90">
            Nestled in Marrakech's Palmeraie, Jnane Tamsna offers an enchanting setting for
            extraordinary weddings and private celebrations.
          </p>
          <p className="type-body-md mt-4 max-w-lg text-sage">
            From romantic ceremonies beneath the palms to candlelit receptions and vibrant
            parties under the stars, every moment reflects timeless elegance and authentic
            Moroccan charm.
          </p>

          <a href="#inquiry" className="btn-sage mt-9">
            Plan your celebration
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="w-full lg:ml-auto"
        >
          <InquiryForm
            variant="hero"
            inquiry={inquiry}
            onChange={onInquiryChange}
            submitting={submitting}
            submitError={submitError}
            onSubmitInquiry={onSubmitInquiry}
          />
        </motion.div>
      </div>
    </section>
  );
}
