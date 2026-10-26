/* ------------------------------------------------------------------ */
/*  Jnane Tamsna — all site content lives here                         */
/* ------------------------------------------------------------------ */

export interface Photo {
  src: string;
  alt: string;
}

/**
 * Venue photography, served from /public/images. Files are named after the
 * section or experience they illustrate.
 */
export const photos = {
  hero: {
    src: "/images/hero.jpg",
    alt: "A wedding celebration in the gardens at Jnane Tamsna, Marrakech",
  },
  weddings: {
    src: "/images/weddings-receptions.jpg",
    alt: "A wedding reception at Jnane Tamsna",
  },
  privateDinners: {
    src: "/images/private-dinners.jpg",
    alt: "A private dinner celebration at Jnane Tamsna",
  },
  birthdays: {
    src: "/images/birthdays-private-parties.jpg",
    alt: "A private birthday party at Jnane Tamsna",
  },
  gardenCeremony: {
    src: "/images/romantic-garden-ceremonies.jpg",
    alt: "A romantic garden ceremony at Jnane Tamsna",
  },
  candles: {
    src: "/images/candlelit-garden-dinners.jpg",
    alt: "A candlelit garden dinner at Jnane Tamsna",
  },
  rooftop: {
    src: "/images/rooftop-cocktail-receptions.jpg",
    alt: "A rooftop cocktail reception at Jnane Tamsna",
  },
  party: {
    src: "/images/live-music-evening-parties.jpg",
    alt: "Live music and an evening party at Jnane Tamsna",
  },
  brunch: {
    src: "/images/poolside-brunch-celebrations.jpg",
    alt: "A poolside brunch celebration at Jnane Tamsna",
  },
  contact: {
    src: "/images/final-reservation-contact.jpg",
    alt: "The gardens at Jnane Tamsna, Marrakech",
  },
} satisfies Record<string, Photo>;

/* ------------------------------ Brand ------------------------------- */

export const brand = {
  name: "Jnane Tamsna",
  shortName: "Jnane Tamsna",
  tagline: "Weddings & Events",
  location: "Marrakech",
};

// Business phone number in international format, digits only.
export const whatsappBusinessNumber = "212728585823";

export const whatsappLink = (message: string) =>
  `https://wa.me/${whatsappBusinessNumber}?text=${encodeURIComponent(message)}`;

export const defaultWhatsappMessage =
  "Hello, I would like information about a wedding or event at Jnane Tamsna.";

export const navLinks = [
  { label: "Celebrations", href: "#celebrations" },
  { label: "Our promise", href: "#promise" },
  { label: "Signature experiences", href: "#experiences" },
  { label: "Reservation", href: "#contact" },
];

/* --------------------------- Section 2 ------------------------------ */

export interface Celebration {
  title: string;
  description: string;
  photo: Photo;
  gallery: Photo[];
}

// Category galleries, built from the matching Jnane Tamsna photography.
export const celebrations: Celebration[] = [
  {
    title: "Weddings & Receptions",
    description:
      "Celebrate your love with romantic garden ceremonies, elegant receptions and unforgettable moments surrounded by the beauty of Marrakech.",
    photo: photos.weddings,
    gallery: [photos.weddings, photos.gardenCeremony, photos.hero, photos.candles],
  },
  {
    title: "Private Dinners & Celebrations",
    description:
      "Enjoy magical evenings beneath the palms, with beautifully styled tables, exquisite cuisine and a warm candlelit atmosphere.",
    photo: photos.privateDinners,
    gallery: [photos.privateDinners, photos.candles, photos.rooftop],
  },
  {
    title: "Birthdays & Private Parties",
    description:
      "Celebrate life's milestones with sunset cocktails, live entertainment, intimate gatherings and unforgettable nights under the stars.",
    photo: photos.birthdays,
    gallery: [photos.birthdays, photos.party, photos.brunch, photos.rooftop],
  },
];

/* --------------------------- Section 3 ------------------------------ */

export const promises = [
  {
    title: "Bespoke Celebrations",
    description: "Thoughtfully personalized events that reflect your traditions, unique style and vision.",
    icon: "sparkles",
  },
  {
    title: "Enchanting Garden Settings",
    description:
      "Lush gardens, elegant courtyards and palm-lined pathways create extraordinary backdrops for your celebration.",
    icon: "palm",
  },
  {
    title: "Seamless Guest Experiences",
    description:
      "From welcome cocktails to elegant dining and live entertainment, every moment is designed to feel effortless.",
    icon: "heart",
  },
] as const;

/* --------------------------- Section 4 ------------------------------ */

export interface SignatureExperience {
  title: string;
  description: string;
  photo: Photo;
}

export const signatureExperiences: SignatureExperience[] = [
  {
    title: "Romantic Garden Ceremonies",
    description: "Exchange vows beneath the palms in a naturally beautiful setting.",
    photo: photos.gardenCeremony,
  },
  {
    title: "Candlelit Garden Dinners",
    description: "Dine beneath glowing lanterns and the Marrakech night sky.",
    photo: photos.candles,
  },
  {
    title: "Rooftop Cocktail Receptions",
    description: "Welcome your guests with sunset drinks overlooking the gardens.",
    photo: photos.rooftop,
  },
  {
    title: "Live Music & Evening Parties",
    description: "Create unforgettable moments with live music and entertainment.",
    photo: photos.party,
  },
  {
    title: "Poolside Brunch Celebrations",
    description: "Extend the festivities with a relaxed poolside gathering.",
    photo: photos.brunch,
  },
];

/* ----------------------------- Inquiry ------------------------------ */

export interface EventInquiry {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budget: string;
  currency: string;
  message: string;
  website: string;
}

export const eventTypeOptions = [
  "Wedding",
  "Wedding reception",
  "Engagement party",
  "Private dinner",
  "Birthday celebration",
  "Anniversary",
  "Private party",
  "Corporate event",
  "Other",
];

export const currencyOptions = [
  { value: "EUR", label: "EUR — Euro" },
  { value: "MAD", label: "MAD — Moroccan dirham" },
  { value: "USD", label: "USD — US dollar" },
  { value: "GBP", label: "GBP — Pound sterling" },
];

export const defaultEventInquiry = (): EventInquiry => ({
  name: "",
  email: "",
  phone: "",
  eventType: "Wedding",
  eventDate: "",
  guestCount: "",
  budget: "",
  currency: "EUR",
  message: "",
  website: "",
});

export const formatEventDate = (iso: string) => {
  if (!iso) return "Date to be confirmed";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
