import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, Send } from "lucide-react";
import { currencyOptions, eventTypeOptions, type EventInquiry } from "../data/site";
import { cn } from "../utils/cn";

interface InquiryErrors {
  name?: string;
  email?: string;
  eventType?: string;
  guestCount?: string;
}

const copy = {
  hero: {
    title: "Start Planning",
    subtitle: "Tell us about your vision — we'll help bring it to life.",
    submit: "Send inquiry",
  },
  contact: {
    title: "Wedding & Event Reservation",
    subtitle: "Share your celebration details and let's begin planning your special day.",
    submit: "Send event inquiry",
  },
} as const;

export function InquiryForm({
  variant,
  inquiry,
  onChange,
  submitting,
  submitError,
  onSubmitInquiry,
}: {
  variant: "hero" | "contact";
  inquiry: EventInquiry;
  onChange: (inquiry: EventInquiry) => void;
  submitting: boolean;
  submitError: string | null;
  onSubmitInquiry: () => void;
}) {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const isHero = variant === "hero";
  const text = copy[variant];
  const prefix = `${variant}-inquiry`;
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const update = (patch: Partial<EventInquiry>) => onChange({ ...inquiry, ...patch });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const next: InquiryErrors = {};
    if (inquiry.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inquiry.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!inquiry.eventType) next.eventType = "Please choose an event type.";
    if (!inquiry.guestCount || Number(inquiry.guestCount) < 1 || Number(inquiry.guestCount) > 2000) {
      next.guestCount = "Enter an estimated guest count between 1 and 2,000.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onSubmitInquiry();
  };

  return (
    <div
      id={isHero ? "inquiry" : undefined}
      className="relative scroll-mt-28 overflow-hidden bg-white text-[#241314] shadow-[0_18px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <motion.form
        onSubmit={submit}
        noValidate
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="relative p-5 sm:p-7"
      >
            <div>
              <h2 className="type-h3 font-normal tracking-[0.04em] text-[#241314]">{text.title}</h2>
              <p className={cn("type-body-sm mt-1.5 text-[#70706e]", !isHero && "mb-1")}>{text.subtitle}</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${prefix}-name`} className="field-label">Full name *</label>
                <input
                  id={`${prefix}-name`}
                  className={cn("field", errors.name && "field-error")}
                  placeholder="Your full name"
                  value={inquiry.name}
                  onChange={(e) => update({ name: e.target.value })}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="mt-1 type-body-sm text-[#a1473c]">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor={`${prefix}-email`} className="field-label">Email address *</label>
                <input
                  id={`${prefix}-email`}
                  type="email"
                  className={cn("field", errors.email && "field-error")}
                  placeholder="you@example.com"
                  value={inquiry.email}
                  onChange={(e) => update({ email: e.target.value })}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="mt-1 type-body-sm text-[#a1473c]">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor={`${prefix}-phone`} className="field-label">Phone / WhatsApp</label>
                <input
                  id={`${prefix}-phone`}
                  type="tel"
                  className="field"
                  placeholder="+212 6 00 00 00 00"
                  value={inquiry.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  autoComplete="tel"
                />
              </div>

              <div>
                <label htmlFor={`${prefix}-type`} className="field-label">Event type</label>
                <select
                  id={`${prefix}-type`}
                  className={cn("field", errors.eventType && "field-error")}
                  value={inquiry.eventType}
                  onChange={(e) => update({ eventType: e.target.value })}
                  aria-invalid={Boolean(errors.eventType)}
                >
                  {eventTypeOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.eventType && <p className="mt-1 type-body-sm text-[#a1473c]">{errors.eventType}</p>}
              </div>

              <div>
                <label htmlFor={`${prefix}-date`} className="field-label">Event date</label>
                <input
                  id={`${prefix}-date`}
                  type="date"
                  min={minDate}
                  className="field"
                  value={inquiry.eventDate}
                  onChange={(e) => update({ eventDate: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor={`${prefix}-guests`} className="field-label">Number of guests *</label>
                <input
                  id={`${prefix}-guests`}
                  type="number"
                  min="1"
                  max="2000"
                  inputMode="numeric"
                  className={cn("field", errors.guestCount && "field-error")}
                  placeholder="e.g. 120"
                  value={inquiry.guestCount}
                  onChange={(e) => update({ guestCount: e.target.value })}
                  aria-invalid={Boolean(errors.guestCount)}
                />
                {errors.guestCount && <p className="mt-1 type-body-sm text-[#a1473c]">{errors.guestCount}</p>}
              </div>

              <div>
                <label htmlFor={`${prefix}-budget`} className="field-label">Estimated budget</label>
                <input
                  id={`${prefix}-budget`}
                  type="number"
                  min="0"
                  inputMode="decimal"
                  className="field"
                  placeholder="e.g. 30000"
                  value={inquiry.budget}
                  onChange={(e) => update({ budget: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor={`${prefix}-currency`} className="field-label">Preferred currency</label>
                <select
                  id={`${prefix}-currency`}
                  className="field"
                  value={inquiry.currency}
                  onChange={(e) => update({ currency: e.target.value })}
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${prefix}-message`} className="sr-only">Tell us about your dream celebration</label>
                <textarea
                  id={`${prefix}-message`}
                  className="field min-h-[5.5rem] resize-y"
                  placeholder="Tell us about your dream celebration..."
                  value={inquiry.message}
                  onChange={(e) => update({ message: e.target.value })}
                />
              </div>

              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor={`${prefix}-website`}>Leave this field empty</label>
                <input
                  id={`${prefix}-website`}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={inquiry.website}
                  onChange={(e) => update({ website: e.target.value })}
                />
              </div>
            </div>

            {submitError && (
              <p role="alert" className="mt-5 border border-[#a1473c]/30 bg-[#a1473c]/5 px-4 py-3 text-[0.82rem] leading-relaxed text-[#a1473c]">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="btn-sage group mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : text.submit}
              {submitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
      </motion.form>
    </div>
  );
}
