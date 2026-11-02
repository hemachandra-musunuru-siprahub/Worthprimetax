import { useId } from "react";
import { LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

/** Solid handset, drawn in the button's text colour. */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.98.98 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99Z" />
    </svg>
  );
}

/** A bold "M" with a red-to-blue gradient for the email button. */
function MailIcon({ className }: { className?: string }) {
  const gradient = useId();
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradient} x1="4" y1="7" x2="20" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--theme-mail-red)" />
          <stop offset="0.45" stopColor="var(--theme-mail-red)" />
          <stop offset="0.65" stopColor="var(--theme-mail-orange)" />
          <stop offset="0.82" stopColor="var(--theme-mail-green)" />
          <stop offset="1" stopColor="var(--theme-mail-blue)" />
        </linearGradient>
      </defs>
      <path
        d="M4.5 18.5v-11l7.5 6 7.5-6v11"
        stroke={`url(#${gradient})`}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2a9.84 9.84 0 0 0-8.5 14.78L2 22l5.36-1.4A9.98 9.98 0 1 0 12.04 2Zm0 17.98a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.18.83.85-3.1-.2-.32a8.05 8.05 0 1 1 6.96 3.9Zm4.42-6.05c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.26 7.26 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.11-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46a.89.89 0 0 0-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

const button =
  "grid size-13 place-items-center rounded-full border shadow-lg shadow-hero/30 transition duration-200 sm:size-14 motion-reduce:transition-none";
const interactive =
  "hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0";
const whatsapp = "border-whatsapp bg-whatsapp text-card";
// White circles: the phone glyph takes the call blue, the email "M" carries its own gradient.
const call = "border-border bg-background text-call";
const mail = "border-border bg-background";

const items = [
  {
    href: LINKS.whatsapp,
    label: "Chat on WhatsApp",
    Icon: WhatsAppIcon,
    external: true,
    className: whatsapp,
  },
  {
    href: LINKS.phoneHref,
    label: `Call ${LINKS.phone}`,
    Icon: PhoneIcon,
    external: false,
    className: call,
  },
  {
    href: `mailto:${LINKS.email}`,
    label: `Email ${LINKS.email}`,
    Icon: MailIcon,
    external: false,
    className: mail,
  },
];

// Shown on every page so the quick contact buttons are always in the same place.
export function ContactCluster() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:bottom-5 sm:right-5"
    >
      {items.map(({ href, label, Icon, external, className }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          className={cn(button, interactive, className)}
        >
          <Icon className="size-6 sm:size-7" />
        </a>
      ))}
    </nav>
  );
}
