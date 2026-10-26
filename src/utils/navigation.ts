export function isHomePage(): boolean {
  if (typeof window === "undefined") return true;
  return window.location.pathname.replace(/\/+$/, "") === "";
}

export function isThankYouPage(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.pathname.replace(/\/+$/, "") === "/thank-you";
}

export function homeHref(hash: string): string {
  return isHomePage() ? hash : `/${hash}`;
}
