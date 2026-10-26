import { Star8 } from "./Ornament";

const phrases = [
  "Destination weddings",
  "Poolside ceremonies",
  "Receptions beneath the stars",
  "Traditional Moroccan welcomes",
  "Illuminated palm gardens",
  "Private celebrations",
];

export function Marquee() {
  const row = [...phrases, ...phrases];
  return (
    <div className="relative overflow-hidden bg-sage py-3 text-canvas" aria-hidden="true">
      <div className="pattern-zellige-dark pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="animate-marquee flex w-max items-center gap-10 pr-10 whitespace-nowrap">
        {row.map((p, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-[0.72rem] font-light tracking-[0.22em] text-canvas uppercase sm:text-[0.78rem]">
              {p}
            </span>
            <Star8 className="h-3.5 w-3.5 shrink-0 text-canvas/45" />
          </span>
        ))}
      </div>
    </div>
  );
}
