# AGENTS.md — Jnane Tamsna (Luxury Weddings & Events, Marrakech)

Briefing for AI coding agents and developers. Read fully before editing.

---

## 1. What this project is

A **marketing / lead-generation website** for **Jnane Tamsna**, a nine-acre garden
estate in Marrakech's Palmeraie, positioned for **luxury destination weddings and
private celebrations**: garden ceremonies, candlelit dinners, rooftop cocktails, live
music, poolside brunches and parties under the stars.

The site converts visitors into **event enquiries** through:
1. An inquiry form in the **hero** and a second one in the **final reservation section**
   (both share state).
2. **WhatsApp** buttons (navbar, mobile menu, footer, sticky button).

After a successful submission the browser navigates to a lightweight **`/thank-you`**
confirmation route (no server-side router), which offers “Back to home” and WhatsApp CTAs.

It is **not** a booking engine and has **no database**; inquiries are delivered by a
small PHP/PHPMailer endpoint (see §6).

> History: this project has previously been "Riad Azahar" (single riad), "Nelia
> Marrakech" (a riad collection) and "O'Atlas Marrakech" (single event estate). All of
> those have been fully replaced — do not reintroduce their content, colours or
> structure unless explicitly asked.

### Tone
Timeless elegance, botanical luxury, Moroccan hospitality. Copy is client-supplied —
keep it verbatim unless asked to edit. Headings/eyebrows come straight from the brief.

---

## 2. Tech stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript 5.9 (strict; `noUnusedLocals`/`noUnusedParameters` → unused imports FAIL type-check) |
| Bundler | Vite 7 + `vite-plugin-singlefile` → one inlined `dist/index.html` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), CSS-first `@theme` in `src/index.css` (no `tailwind.config.js`) |
| Animation | `framer-motion` |
| Icons | `lucide-react` + `WhatsAppIcon` (`src/components/WhatsAppIcon.tsx`, uses the supplied white WhatsApp mark, inverts on light backgrounds) |
| Utility | `cn()` in `src/utils/cn.ts` (`clsx` + `tailwind-merge`) |
| Fonts | Google Fonts in `index.html`: **Cormorant Garamond** (serif body/nav), **Jost** (display/UI stand-in for `oriyaMN`), **Amiri** (Arabic accent) |
| Backend | PHP 8+ + PHPMailer 7 (manual install in `public/api/lib`), SMTP via `.env` |

```bash
npm run dev
npm run build      # -> dist/index.html
npx tsc --noEmit   # always run together with build

# Built SPA + PHP API (Vite dev does not execute PHP)
php -S 127.0.0.1:8080 -t dist local-router.php
```
Rules: never hand-edit `package.json` or `vite.config.ts` (use `npm install`). Entry is `src/App.tsx`.

**Token-name gotcha:** do NOT add `@theme` spacing tokens named `xs/sm/md/lg/xl/2xl` —
they override Tailwind's `max-w-*` size scale (it collapsed text columns to 40px once).
Use explicit px values or prefixed names (e.g. `--spacing-token-xl`).

---

## 3. File map

```
index.html                       Title "Jnane Tamsna · Luxury Weddings & Events in Marrakech", meta, arched-garden favicon, fonts
.env.example                     SMTP + admin config template (copy to .env)
local-router.php                 PHP dev router for the built SPA (serves dist/)
public/
  .htaccess                      SPA fallback + .env deny
  images/                        Real venue photography (slugified source names)
  api/
    .htaccess                    Blocks bootstrap.php and sensitive files
    bootstrap.php                .env loader, helpers, PHPMailer includes
    send-inquiry.php             POST endpoint: validate → admin email → client email
    templates/                   Table-based admin + client email HTML
    lib/PHPMailer/               PHPMailer.php, SMTP.php, Exception.php
src/
  App.tsx                        Route split: HomePage (sections/state) vs ThankYouPage; sticky WhatsApp, back-to-top
  index.css                      Design tokens, typography classes, buttons, form fields, patterns
  data/site.ts                   ★ ALL content: photo map, brand, nav, sections, form options, WhatsApp config
  utils/
    cn.ts                        clsx + tailwind-merge helper
    navigation.ts                isHomePage / isThankYouPage / homeHref(hash) for client-only routing
  components/
    Logo.tsx                     LogoMark — arched garden doorway + palm frond (currentColor)
    WhatsAppIcon.tsx             White WhatsApp mark from /images, `inverted` for light surfaces
    Navbar.tsx                   Fixed 64px band: dark over hero → white on scroll; mobile overlay menu
    Hero.tsx                     SECTION 1 — garden photo + measured gradient; copy left, InquiryForm right
    InquiryForm.tsx              ★ Shared form (variant "hero" | "contact"), validation, submit error
    Marquee.tsx                  Decorative sage phrase band under the hero
    Celebrations.tsx             SECTION 2 — 3 category cards; image/title open CelebrationGallery
    CelebrationGallery.tsx       Per-category popup gallery: arrows, thumbnails, swipe, focus trap, fallback
    EventPromise.tsx             SECTION 3 — Our Event Promise, 3 pillars on dark canvas
    SignatureExperiences.tsx     SECTION 4 — 5 formats (2 wide + 3), single-image PhotoLightbox
    PhotoLightbox.tsx            ZoomableImage + single-photo lightbox (portal, Esc/backdrop close)
    Contact.tsx                  SECTION 5 — final reservation: garden photo + InquiryForm ("contact")
    ThankYouPage.tsx             `/thank-you` — hero photo, reference badge, back + WhatsApp CTAs, noindex
    Footer.tsx                   Brand, nav, enquiries
    Ornament.tsx                 Star8, Star8Outline, Eyebrow (tone "dark" | "light")
    Reveal.tsx                   Quiet fade/rise scroll reveal
```

---

## 4. Page structure

| # | Component | Anchor | Background | Content |
|---|---|---|---|---|
| – | Navbar | — | `#333`/95 → white | Links: Celebrations · Our promise · Signature experiences · Reservation. WhatsApp + Plan your celebration |
| 1 | Hero | `#top` (form `#inquiry`) | `#333` + garden photo | "LUXURY WEDDINGS & EVENTS IN MARRAKECH" / **Timeless Weddings, Magical Celebrations** / CTA "Plan your celebration"; form "Start Planning" |
| – | Marquee | — | sage `#D1D4BC` | decorative |
| 2 | Celebrations | `#celebrations` | white | "WHAT WE OFFER" / **Celebrations at Jnane Tamsna** — Weddings & Receptions, Private Dinners & Celebrations, Birthdays & Private Parties (3 galleries) |
| 3 | EventPromise | `#promise` | `#333` | **Our Event Promise** — Bespoke Celebrations, Enchanting Garden Settings, Seamless Guest Experiences |
| 4 | SignatureExperiences | `#experiences` | white | "SIGNATURE EXPERIENCES" / **Unforgettable Ways to Celebrate** — 5 formats |
| 5 | Contact | `#contact` | `#333` | "READY TO CELEBRATE?" / **Plan Your Dream Wedding** + arch photo + form "Wedding & Event Reservation" |
| – | Footer | — | `#2b2b2b` | brand, links, enquiries |

**`/thank-you`** is a separate client-side route (same `index.html`): full-height hero
photo, “Thank you” / **Your inquiry is on its way**, the `JT-XXXXXX` reference when
present in `?reference=`, and “Back to home” + “WhatsApp us” CTAs. It sets
`document.title` and a `noindex` robots meta, and uses `Navbar`/`Footer` with
home-prefixed links so navigation works away from `/`.

---

## 5. Content & galleries

All copy/images live in `src/data/site.ts`.

- `photos` — real Jnane Tamsna photography in `public/images/`, keyed by section
  (`hero`, `weddings`, `privateDinners`, `birthdays`, `gardenCeremony`, `candles`,
  `rooftop`, `party`, `brunch`, `contact`). Source files keep their section/title
  names; web filenames are slugified.
- `celebrations` — 3 categories, each `{title, description, photo, gallery: Photo[]}`.
  Galleries are built from the matching celebration/experience photos; the first is
  the card image. Clicking the card image or title opens `CelebrationGallery` (modal)
  with thumbnails, arrow keys, swipe and focus management. Broken images show an
  in-panel fallback.
- `promises` — 3 pillars with `icon` key (`sparkles | palm | heart`).
- `signatureExperiences` — 5 formats with photos.
- `eventTypeOptions`, `currencyOptions`, `formatEventDate`, `defaultEventInquiry`.
- `brand`, `navLinks`, `defaultWhatsappMessage`, `whatsappLink`.

---

## 6. Form & state

`App.tsx` owns `inquiry` (shared by both forms → stay in sync). On success it
navigates to `/thank-you?reference=JT-XXXXXX`; there is no in-form success panel.

`EventInquiry`: `name, email, phone, eventType` (default **Wedding**),
`eventDate, guestCount, budget, currency` (EUR/MAD/USD/GBP, default EUR), `message`,
plus `website` (hidden honeypot).
Validation: name ≥ 2 chars, valid email, eventType required, guests 1–2000.
Event date minimum = today. Budget and currency were re-added for this client brief.

Variant copy (`InquiryForm.tsx` → `copy`):
- hero: "Start Planning" / submit "Send inquiry"
- contact: "Wedding & Event Reservation" / submit "Send event inquiry"

`submitInquiry` POSTs the shared inquiry as JSON to `/api/send-inquiry.php`, exposes a
`submitting` state and an inline `submitError`, and on success does
`window.location.assign("/thank-you?reference=...")`. The endpoint repeats all
validation, checks the honeypot, emails the admin first and the visitor second, and
returns `{ ok, reference }`. SMTP credentials live in `.env` (see `.env.example`); the
API returns `503` until they are configured. Keep the shared-state design.

**Routing:** there is no react-router. `App.tsx` checks
`isThankYouPage()` (`src/utils/navigation.ts`) and renders `ThankYouPage` or the home
page. The host must serve `index.html` for `/thank-you` (both `public/.htaccess` and
`local-router.php` do).

**WhatsApp:** `whatsappBusinessNumber` is set to `212728585823` (international, digits
only). The same number can be set as `WHATSAPP_NUMBER` for the emails.

---

## 7. Design system (measured from jnanetamsna.com)

### Palette (tokens in `src/index.css`)
| Token | Hex | Role |
|---|---|---|
| `sage` | `#D1D4BC` | Primary accent, body copy on dark, CTA fill, marquee band |
| `canvas` | `#333333` | Dark page/canvas sections, header, hero, contact, footer |
| `white` | `#FFFFFF` | Light alternating bands, cards, form surface, text on dark |
| `muted-rose` | `#241314` | Form text / deepest ink |
| `warm` | `#B8AD85` | Decorative warm accent (small labels on dark) |
| `cream` | `#F3F2ED` | Neutral light surface |
| `soft-sage` | `#E5E7D8` | Sage hover tint |
| `#72774D` | — | Eyebrow/link accent on white (accessible olive) |
| `#70706E` | — | Muted body text on white (AA on white) |
| `#1B1B1A` | — | Headings on white |
| `#2B2B2B` | — | Footer base |

Use **colour blocking**, not shadows, for depth. Images may have the measured hero
gradient: `linear-gradient(180deg, rgba(0,0,0,.7), rgba(0,0,0,.45) 50%, transparent)`.

### Typography
- Display: **Jost 300** (stand-in for `oriyaMN`), 30px, line-height 1.2, tracking .75px (`type-display`).
- Section heading: Jost 400, 24px, line-height 1.3 (`type-h2`).
- Body: **Cormorant Garamond** — `type-body-xl` 24px, `type-body-lg` 20px, `type-body-md` 16px/500, `type-body-sm` 14px/400.
- Labels: Jost uppercase, 12px, tracking .2em (`type-label`).
- Navigation: Jost light, uppercase, 2px letter-spacing.

### Shape & controls
- Radii: **0** everywhere (buttons, inputs, cards, modals) except circular icon buttons.
- Buttons: `.btn-sage` (sage fill, charcoal text), `.btn-outline` (charcoal, on light),
  `.btn-outline-light` (white, on dark). Height ~34–44px, padding 6–12px 24px,
  Jost 14px 300, uppercase, 1px borders.
- Spacing rhythm: sections `py-16` (64px) / `sm:py-20` (80px), horizontal `px-6` (24px) /
  `sm:px-8` (32px), max content width **1280px**.
- Patterns: `pattern-zellige` (sage on dark), `pattern-zellige-dark` (charcoal on light),
  `texture-linen`, `arch` (arched photo frame in Contact), `garden-light`.
- Client preferences to preserve: category images **square** and clickable; galleries as
  popups; arch shape only for the single feature photo.

---

## 8. Conventions & gotchas
- Edit content in `src/data/site.ts`, not inside components.
- Removing UI usually requires removing its icon import (strict TS).
- Modals are portaled to `document.body`, lock scroll, close on Esc/backdrop, and trap
  focus; `CelebrationGallery` makes `#root` inert while open.
- Wrap blocks in `<Reveal delay>`; keep motion quiet. Above-the-fold content (hero,
  thank-you) animates on mount instead, so it never waits for a scroll observer.
- Sections use `scroll-mt-*` so anchors clear the fixed 64px navbar.
- Links that must work from `/thank-you` use `homeHref()` (renders `/#...` or `/`).
- Keep a11y: `aria-label` on icon buttons, `role="dialog"`/`aria-modal`, `aria-invalid`,
  visible focus, AA contrast (sage is only for large text/decorative on white).

## 9. Known gaps / TODO
1. `.env` SMTP credentials and `ADMIN_EMAIL` must be configured on the host.
2. Photography supplied for each section is in place; optimise/upscale the smaller
   source files before launch.
3. No address, phone/email, map, legal pages, analytics, SEO schema or i18n (French would suit the market).
4. The design's `oriyaMN` proprietary font is approximated with Jost; swap in the licensed face if available.
