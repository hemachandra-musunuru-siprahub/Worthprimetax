import type { ComponentType, ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { HOME_CONTACT, LINKS, OFFICES } from "@/data/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./ContactCluster";
import { EnquiryForm } from "./EnquiryForm";
import { Section } from "./primitives";

/**
 * "Let's talk about what comes next" block: contact lines beside the enquiry form.
 * The contact page uses it as its hero (h1); the home page uses the smaller `compact` size.
 */
export function ContactSection({
  asPageHeading = false,
  compact = false,
}: {
  asPageHeading?: boolean;
  compact?: boolean;
}) {
  const Heading = asPageHeading ? "h1" : "h2";
  const value = compact ? "text-[0.95rem]" : "text-lg";
  return (
    <Section
      id="contact-form"
      className={cn("relative isolate scroll-mt-28 overflow-hidden", compact && "py-10 sm:py-12")}
    >
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-background via-tint/70 to-tint/40"
        aria-hidden
      />
      <div
        className="absolute top-1/4 left-[38%] -z-10 hidden size-[32rem] rounded-full bg-brand-secondary/10 blur-3xl lg:block"
        aria-hidden
      />
      <div
        className={cn(
          "grid items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
          // Compact: the heading lines up with the top of the form card.
          compact && "lg:items-start",
          compact ? "gap-8 lg:gap-12" : "gap-10 lg:gap-14",
        )}
      >
        <div>
          <Heading
            className={cn(
              "font-serif leading-[1.04] font-bold tracking-[-0.02em] text-primary",
              // The contact page hero uses a smaller heading than the home page section.
              asPageHeading
                ? "text-[clamp(1.75rem,3vw,2.5rem)]"
                : compact
                  ? "text-[clamp(2rem,4vw,3.25rem)]"
                  : "text-[clamp(2.4rem,5vw,4.25rem)]",
            )}
          >
            {HOME_CONTACT.heading} <span className="block">{HOME_CONTACT.headingAccent}</span>
          </Heading>
          <p
            className={cn(
              "max-w-xl leading-relaxed text-foreground/80",
              compact ? "mt-4 text-[0.95rem]" : "mt-5 text-base sm:text-lg",
            )}
          >
            {HOME_CONTACT.intro}
          </p>

          <ul className={compact ? "mt-6 space-y-4" : "mt-8 space-y-5"}>
            <ContactLine icon={Phone} title="Call Us" compact={compact}>
              <a href={LINKS.phoneHref} className={cn(value, "text-foreground hover:text-primary")}>
                {LINKS.phone}
              </a>
            </ContactLine>
            <ContactLine icon={WhatsAppIcon} title="WhatsApp" compact={compact}>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(value, "text-foreground hover:text-primary")}
              >
                {LINKS.phone}
              </a>
            </ContactLine>
            <ContactLine
              icon={Mail}
              title="Drop Us an Email"
              note={HOME_CONTACT.replyNote}
              compact={compact}
            >
              <a
                href={`mailto:${LINKS.email}`}
                className={cn(value, "break-all text-foreground hover:text-primary")}
              >
                {LINKS.email}
              </a>
            </ContactLine>
            <ContactLine icon={MapPin} title="Visit Us" compact={compact}>
              <span className={cn(value, "text-foreground")}>{OFFICES[0].address}</span>
            </ContactLine>
          </ul>
        </div>
        <EnquiryForm headingLevel={asPageHeading ? 2 : 3} submitLabel="Submit Request" />
      </div>
    </Section>
  );
}

function ContactLine({
  icon: Icon,
  title,
  note,
  compact,
  children,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  note?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-4">
      <span className="grid shrink-0 place-items-center text-primary" aria-hidden>
        <Icon className={compact ? "size-5.5" : "size-6.5"} strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <p className={cn("font-semibold text-primary", compact && "text-sm")}>{title}</p>
        <div className="mt-0.5">{children}</div>
        {note && <p className="mt-0.5 text-sm text-foreground/70">{note}</p>}
      </div>
    </li>
  );
}
