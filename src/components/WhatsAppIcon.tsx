import { cn } from "../utils/cn";

export function WhatsAppIcon({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <img
      src="/images/whatsapp-white-icon.webp"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn("h-4 w-4 shrink-0 object-contain", inverted && "invert", className)}
    />
  );
}
