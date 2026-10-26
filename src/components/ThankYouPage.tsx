import { useEffect } from "react";
import { motion } from "framer-motion";
import { defaultWhatsappMessage, photos, whatsappLink } from "../data/site";
import { Footer } from "./Footer";
import { LogoMark } from "./Logo";
import { Navbar } from "./Navbar";
import { Star8Outline } from "./Ornament";
import { WhatsAppIcon } from "./WhatsAppIcon";

const ease = [0.22, 1, 0.36, 1] as const;

export function ThankYouPage() {
  const referenceParam =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("reference") ?? ""
      : "";
  const reference = /^JT-[A-Z0-9]{6}$/.test(referenceParam) ? referenceParam : "";

  useEffect(() => {
    document.title = "Thank you · Jnane Tamsna";
    window.scrollTo(0, 0);

    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    return () => {
      document.head.removeChild(robots);
    };
  }, []);

  return (
    <div className="min-h-screen bg-canvas font-serif text-sage antialiased">
      <Navbar />
      <main>
        <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-canvas text-white">
          <img
            src={photos.hero.src}
            alt={photos.hero.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.62)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(51,51,51,0.55)_0%,rgba(51,51,51,0.2)_60%,transparent_100%)]" />
          <div className="pattern-zellige pointer-events-none absolute inset-0 opacity-[0.05]" />
          <Star8Outline className="pointer-events-none absolute -right-28 -bottom-32 h-[26rem] w-[26rem] text-sage/10" />

          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-32 pb-20 text-center sm:px-8 lg:pt-40">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <p className="type-label flex items-center justify-center gap-3 text-sage">
                <LogoMark className="h-5 w-4 text-sage" />
                Thank you
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease }}
            >
              <h1 className="type-display mt-7 text-white">
                Your inquiry is
                <br />
                <span className="italic text-sage">on its way</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease }}
            >
              <p className="type-body-xl mx-auto mt-7 max-w-xl text-sage">
                Thank you for sharing your celebration with us. Our events team will be in
                touch within 24–48 hours to begin planning something unforgettable.
              </p>
            </motion.div>

            {reference && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease }}
              >
                <p className="mt-6 inline-block border border-white/25 px-4 py-2 font-display text-[0.68rem] tracking-[0.18em] text-white/90 uppercase">
                  Reference {reference}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a href="/" className="btn-sage w-full justify-center sm:w-auto">
                Back to home
              </a>
              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-light group w-full justify-center sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4 group-hover:invert" />
                WhatsApp us
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
