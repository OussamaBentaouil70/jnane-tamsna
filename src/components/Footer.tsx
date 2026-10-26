import { brand, defaultWhatsappMessage, navLinks, whatsappLink } from "../data/site";
import { homeHref, isHomePage } from "../utils/navigation";
import { LogoMark } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const onHome = isHomePage();

  return (
    <footer className="relative overflow-hidden border-t border-[#4b4b4b] bg-[#2b2b2b] text-sage">
      <div className="pattern-zellige pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="relative mx-auto max-w-[1280px] px-6 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <a href={onHome ? "#top" : "/"} className="inline-flex items-center gap-3">
              <LogoMark className="h-10 w-9 text-sage" />
              <span>
                <span className="block font-display text-[1.05rem] text-white uppercase tracking-[0.2em]">
                  {brand.name}
                </span>
                <span className="mt-1 block font-display text-[0.55rem] font-light tracking-[0.24em] text-sage uppercase">
                  {brand.location} · {brand.tagline}
                </span>
              </span>
            </a>
            <p className="type-body-sm mt-4 max-w-sm text-sage">
              Timeless weddings and magical celebrations in a lush nine-acre garden
              sanctuary in Marrakech's Palmeraie.
            </p>
          </div>

          <nav className="md:col-span-3">
            <h2 className="type-label text-[#b8ad85]">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={homeHref(link.href)} className="type-body-sm text-sage transition-opacity hover:opacity-70">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="type-label text-[#b8ad85]">Enquiries</h2>
            <a
              href={homeHref("#contact")}
              className="type-body-sm mt-4 block text-sage transition-opacity hover:opacity-70"
            >
              Plan your celebration
            </a>
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="type-body-sm mt-2.5 flex items-center gap-2 text-sage transition-opacity hover:opacity-70"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#4b4b4b] pt-5 type-body-sm text-sage/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {brand.name} · Luxury weddings &amp; events</p>
          <a href={onHome ? "#top" : "/"} className="font-display text-[0.68rem] tracking-[0.18em] uppercase transition-opacity hover:opacity-70">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
