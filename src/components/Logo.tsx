/**
 * Jnane Tamsna mark — an arched garden doorway with a palm frond,
 * echoing the property's Moroccan architecture and botanical setting.
 * Uses currentColor; set the colour with a text-* class.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* horseshoe arch */}
      <path d="M9 54V25C9 15 16 8 24 8s15 7 15 17v29" />
      {/* keystone / hanging lantern */}
      <path d="M24 8V3" />
      <path d="M24 14l3 4-3 4-3-4 3-4Z" />
      {/* palm fronds growing through the arch */}
      <path d="M24 46V27" />
      <path d="M24 31c-4-5-9-6-12-5 2 4 7 7 12 7" />
      <path d="M24 31c4-5 9-6 12-5-2 4-7 7-12 7" />
      <path d="M24 27c-2-4-6-6-10-6 1 4 5 7 10 7" />
      <path d="M24 27c2-4 6-6 10-6-1 4-5 7-10 7" />
      {/* ground line */}
      <path d="M4 54h40" />
    </svg>
  );
}
