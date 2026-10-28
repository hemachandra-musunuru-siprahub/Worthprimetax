import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ChartColumn,
  ChevronRight,
  FileSearch,
  FileText,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { HAS_LINKEDIN, LINKS, OFFICES } from "@/data/site";
import { Container } from "./primitives";
import { WhatsAppIcon } from "./ContactCluster";
import logoImage from "@/assets/worthprime-logo.webp";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "us-tax-services": FileText,
  "business-formation-entity-structuring": Building2,
  "accounting-bookkeeping": ChartColumn,
  "us-payroll-services": Users,
  "audit-financial-assurance": ShieldCheck,
  "irs-audit-notice-resolution": FileSearch,
};

// Only LinkedIn has a URL slot; the others show as placeholders until the client supplies profiles.
const SOCIALS: { label: string; Icon: LucideIcon; href?: string }[] = [
  { label: "LinkedIn", Icon: Linkedin, href: HAS_LINKEDIN ? LINKS.linkedin : undefined },
  { label: "Instagram", Icon: Instagram },
  { label: "YouTube", Icon: Youtube },
];

const focusRing =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold tracking-[0.2em] text-footer-heading uppercase">
        {children}
      </h2>
      <span aria-hidden className="mt-2.5 block h-0.5 w-10 bg-tint" />
    </div>
  );
}

function ContactLink({
  href,
  icon,
  label,
  external,
  children,
}: {
  href: string;
  icon: ReactNode;
  label?: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        aria-label={label}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        className={`group inline-flex items-center gap-3 text-sm text-footer-heading ${focusRing}`}
      >
        <span className="grid shrink-0 place-items-center">{icon}</span>
        <span className="group-hover:underline">{children}</span>
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-footer">
      {/* Extra right padding below lg keeps text clear of the fixed contact buttons. */}
      <Container className="pr-20 sm:pr-20 lg:pr-8">
        {/* max-sm: classes shorten the footer on phones only; sm and up are unchanged. */}
        <div className="grid gap-10 pt-12 pb-8 max-sm:gap-8 max-sm:pt-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr_1fr] lg:gap-10">
          <div>
            <Link to="/" aria-label="WorthPrime Tax home" className={`inline-block ${focusRing}`}>
              <img
                src={logoImage}
                alt="WorthPrime Tax"
                width={1438}
                height={1094}
                loading="lazy"
                className="h-16 w-auto object-contain max-sm:h-12"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your trusted partner for U.S. tax, compliance and business advisory services.
            </p>

            <ul className="mt-5 space-y-2.5">
              <ContactLink
                href={LINKS.phoneHref}
                icon={<Phone className="size-5" strokeWidth={1.5} />}
              >
                {LINKS.phone}
              </ContactLink>
              <ContactLink
                href={LINKS.whatsapp}
                external
                label={`Chat on WhatsApp ${LINKS.phone}`}
                icon={<WhatsAppIcon className="size-5" />}
              >
                WhatsApp
              </ContactLink>
              <ContactLink
                href={`mailto:${LINKS.email}`}
                icon={<Mail className="size-5" strokeWidth={1.5} />}
              >
                {LINKS.email}
              </ContactLink>
            </ul>

            <ul className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, Icon, href }) => {
                const circle =
                  "grid size-9 place-items-center rounded-full bg-tint text-footer-heading transition-colors";
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`WorthPrime Tax on ${label}`}
                        className={`${circle} hover:bg-primary hover:text-primary-foreground ${focusRing}`}
                      >
                        <Icon className="size-4" aria-hidden />
                      </a>
                    ) : (
                      <span className={circle} title={`${label} [client to supply]`}>
                        <Icon className="size-4" aria-hidden />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Services">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-5 space-y-3 max-sm:mt-4 max-sm:space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => {
                const Icon = SERVICE_ICONS[s.slug] ?? FileText;
                return (
                  <li key={s.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className={`group flex items-start gap-3 text-sm text-footer-link transition-colors hover:text-footer-link-hover ${focusRing}`}
                    >
                      <Icon
                        aria-hidden
                        className="mt-0.5 size-4.5 shrink-0 text-footer-heading"
                        strokeWidth={1.5}
                      />
                      <span className="leading-snug group-hover:underline">{s.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/services"
              className={`group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-link-accent transition-colors hover:text-footer-link-hover ${focusRing}`}
            >
              All Services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>

          <nav aria-label="Company">
            <ColumnHeading>Company</ColumnHeading>
            <ul className="mt-3 max-w-56 max-sm:grid max-sm:max-w-none max-sm:grid-cols-2 max-sm:gap-x-6">
              <FooterRowLink to="/about">About</FooterRowLink>
              <FooterRowLink to="/pricing">Pricing</FooterRowLink>
              <FooterRowLink to="/insights">Insights</FooterRowLink>
              <FooterRowLink to="/contact">Contact</FooterRowLink>
              <FooterRowLink href={LINKS.login}>Log in</FooterRowLink>
              <FooterRowLink href={LINKS.irs}>IRS Refund Status</FooterRowLink>
            </ul>
          </nav>

          <div>
            <ColumnHeading>Offices</ColumnHeading>
            <ul className="mt-3 divide-y divide-border">
              {OFFICES.map((o) => (
                <li key={o.label} className="flex gap-3 py-3 first:pt-2 last:pb-0">
                  <span className="grid shrink-0 place-items-start pt-0.5 text-footer-heading">
                    <MapPin aria-hidden className="size-5" strokeWidth={1.5} />
                  </span>
                  <address className="min-w-0 not-italic">
                    <span className="block text-[0.7rem] font-bold tracking-[0.14em] text-footer-heading uppercase">
                      {o.label}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-footer-link">
                      {o.address}
                    </span>
                  </address>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright centred; policy links on the right (both centred and stacked on phones). */}
        <div className="grid items-center gap-3 border-t border-border py-4 text-center sm:grid-cols-[1fr_auto_1fr]">
          <p className="text-xs text-muted-foreground sm:col-start-2">
            © {new Date().getFullYear()} WorthPrime. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-3 text-xs text-muted-foreground sm:justify-self-end">
            <Link
              to="/privacy-policy"
              className={`hover:text-footer-link-hover hover:underline ${focusRing}`}
            >
              Privacy Policy
            </Link>
            <span aria-hidden className="h-3 w-px bg-border" />
            <Link
              to="/terms-of-use"
              className={`hover:text-footer-link-hover hover:underline ${focusRing}`}
            >
              Terms of Use
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterRowLink({
  children,
  to,
  href,
}: {
  children: ReactNode;
  to?: "/about" | "/pricing" | "/insights" | "/contact";
  href?: string;
}) {
  const className = `group flex items-center justify-between gap-4 py-1.5 text-sm text-footer-link transition-colors hover:text-footer-link-hover ${focusRing}`;
  const content = (
    <>
      <span className="group-hover:underline">{children}</span>
      <ChevronRight
        aria-hidden
        className="size-4 shrink-0 text-muted-foreground transition-transform max-sm:hidden group-hover:translate-x-0.5 group-hover:text-footer-link-hover"
      />
    </>
  );
  return (
    <li>
      {to ? (
        <Link to={to} className={className}>
          {content}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
          {content}
        </a>
      )}
    </li>
  );
}
