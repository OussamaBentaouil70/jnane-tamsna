import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Celebrations } from "./components/Celebrations";
import { Contact } from "./components/Contact";
import { EventPromise } from "./components/EventPromise";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Navbar } from "./components/Navbar";
import { SignatureExperiences } from "./components/SignatureExperiences";
import { ThankYouPage } from "./components/ThankYouPage";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import { defaultEventInquiry, defaultWhatsappMessage, whatsappLink, type EventInquiry } from "./data/site";
import { isThankYouPage } from "./utils/navigation";

function HomePage() {
  // Shared by the hero form and the final reservation form, so both stay in sync.
  const [inquiry, setInquiry] = useState<EventInquiry>(defaultEventInquiry);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitInquiry = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/send-inquiry.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(inquiry),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        reference?: string;
        message?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setSubmitError(data?.message ?? "We could not send your inquiry. Please try again.");
        return;
      }

      window.location.assign(
        data.reference
          ? `/thank-you?reference=${encodeURIComponent(data.reference)}`
          : "/thank-you",
      );
    } catch {
      setSubmitError("Connection problem. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formProps = {
    inquiry,
    onInquiryChange: setInquiry,
    submitting,
    submitError,
    onSubmitInquiry: submitInquiry,
  };

  return (
    <div className="min-h-screen bg-canvas font-serif text-sage antialiased">
      <Navbar />
      <main>
        <Hero {...formProps} />
        <Marquee />
        <Celebrations />
        <EventPromise />
        <SignatureExperiences />
        <Contact {...formProps} />
      </main>
      <Footer />

      {/* Sticky WhatsApp */}
      <a
        href={whatsappLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noreferrer"
        aria-label="Start a WhatsApp conversation with Jnane Tamsna"
        className="fixed right-4 bottom-[4.75rem] z-40 inline-flex h-11 items-center gap-2 rounded-full bg-white/80 px-4 text-[0.72rem] font-light tracking-[0.12em] text-canvas uppercase backdrop-blur-sm transition-opacity hover:opacity-80 sm:right-6 sm:bottom-20"
      >
        <WhatsAppIcon className="h-4 w-4" inverted />
        WhatsApp
      </a>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed right-4 bottom-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-white/80 text-canvas backdrop-blur-sm transition-opacity hover:opacity-80 sm:right-6 sm:bottom-6"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return isThankYouPage() ? <ThankYouPage /> : <HomePage />;
}
