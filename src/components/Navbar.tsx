import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brand, defaultWhatsappMessage, navLinks, whatsappLink } from "../data/site";
import { LogoMark } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "../utils/cn";
import { homeHref, isHomePage } from "../utils/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const onHome = isHomePage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          light
            ? "border-b border-[#d9d9d7] bg-white text-canvas"
            : "border-b border-white/10 bg-canvas/95 text-sage",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6 sm:px-8">
          {/* Wordmark */}
          <a href={onHome ? "#top" : "/"} className="group flex shrink-0 items-center gap-3">
            <LogoMark
              className={cn(
                "h-9 w-8 transition-colors duration-300",
                light ? "text-canvas" : "text-sage",
              )}
            />
            <span className="leading-none">
              <span
                className={cn(
                  "block font-display text-[1.05rem] font-normal tracking-[0.2em] uppercase transition-colors",
                  light ? "text-canvas" : "text-white",
                )}
              >
                {brand.name}
              </span>
              <span
                className={cn(
                  "mt-1 hidden text-[0.55rem] font-light tracking-[0.28em] uppercase transition-colors sm:block",
                  light ? "text-[#70706e]" : "text-sage/85",
                )}
              >
                {brand.location} · {brand.tagline}
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={homeHref(link.href)}
                  className={cn(
                    "relative py-2 text-[0.82rem] font-light tracking-[0.2em] uppercase transition-opacity hover:opacity-70",
                    isActive
                      ? light
                        ? "text-canvas"
                        : "text-white"
                      : light
                        ? "text-canvas/80"
                        : "text-sage",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-300",
                      light ? "bg-canvas" : "bg-sage",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2.5">
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              aria-label="Message Jnane Tamsna on WhatsApp"
              className={cn(
                "group hidden h-[34px] items-center gap-2 border px-4 text-[0.72rem] font-light tracking-[0.14em] uppercase transition-colors md:inline-flex",
                light
                  ? "border-canvas text-canvas hover:bg-canvas hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-canvas",
              )}
            >
              <WhatsAppIcon
                className={cn("h-3.5 w-3.5", light ? "invert group-hover:invert-0" : "group-hover:invert")}
              />
              WhatsApp
            </a>
            <a
              href={homeHref("#contact")}
              className={cn(
                "hidden h-[34px] items-center border px-5 text-[0.72rem] font-light tracking-[0.14em] uppercase transition-colors sm:inline-flex",
                light
                  ? "border-canvas bg-canvas text-white hover:bg-transparent hover:text-canvas"
                  : "border-sage bg-sage text-canvas hover:bg-white hover:border-white",
              )}
            >
              Plan your celebration
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={cn(
                "grid h-10 w-10 place-items-center border transition-colors lg:hidden",
                light
                  ? "border-canvas text-canvas hover:bg-canvas hover:text-white"
                  : "border-sage/40 text-sage hover:bg-sage hover:text-canvas",
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-canvas text-sage"
          >
            <div className="pattern-zellige pointer-events-none absolute inset-0 opacity-[0.05]" />
            <div className="relative flex items-center justify-between border-b border-white/12 px-6 py-4">
              <span className="flex items-center gap-3">
                <LogoMark className="h-9 w-8 text-sage" />
                <span className="font-display text-[1rem] tracking-[0.2em] text-white uppercase">
                  {brand.name}
                </span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center border border-sage/40 text-sage transition-colors hover:bg-sage hover:text-canvas"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col items-center justify-center gap-5 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={homeHref(link.href)}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.4 }}
                  className="text-center font-serif text-[1.6rem] font-light text-sage transition-opacity hover:opacity-70"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={homeHref("#contact")}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.4 }}
                className="btn-sage mt-4"
              >
                Plan your celebration
              </motion.a>
              <motion.a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="btn-outline-light group mt-3 inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="h-4 w-4 group-hover:invert" />
                WhatsApp us
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
