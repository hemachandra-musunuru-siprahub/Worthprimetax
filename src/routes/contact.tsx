import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_PAGE, LINKS, OFFICES } from "@/data/site";
import { Container } from "@/components/site/primitives";
// import { CtaBand } from "@/components/site/CtaBand";
import { ContactSection } from "@/components/site/ContactSection";
import { WhatsAppIcon } from "@/components/site/ContactCluster";
import { cn } from "@/lib/utils";

const CHANNELS = [
  {
    label: "Phone Number",
    value: LINKS.phone,
    href: LINKS.phoneHref,
    Icon: Phone,
    external: false,
  },
  {
    label: "Drop Us an Email",
    value: LINKS.email,
    href: `mailto:${LINKS.email}`,
    Icon: Mail,
    external: false,
  },
  {
    label: "WhatsApp",
    value: LINKS.phone,
    href: LINKS.whatsapp,
    Icon: WhatsAppIcon,
    external: true,
  },
];

// The contact page runs wider than the standard 1200px container, as in the approved layout.
const WIDE = "max-w-[1540px] lg:px-10";

export const Route = createFileRoute("/contact")({
  head: () =>
    seoHead({ title: CONTACT_PAGE.title, description: CONTACT_PAGE.description, path: "/contact" }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      {/* No PricingMarquee here: the client asked for it to be removed from the contact page. */}
      <ContactSection asPageHeading compact />

      <section aria-labelledby="contact-details" className="pt-5 pb-10 sm:pb-12">
        <Container className={WIDE}>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center xl:gap-10">
            <div>
              <div className="flex items-center gap-6">
                <h2
                  id="contact-details"
                  className="font-serif text-[clamp(1.75rem,2.6vw,2.4rem)] leading-tight font-bold text-primary"
                >
                  {CONTACT_PAGE.detailsHeading}
                </h2>
              </div>
              <p className="mt-1 text-base text-muted-foreground sm:text-lg">
                {CONTACT_PAGE.detailsIntro}
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-flow-dense sm:grid-cols-2 lg:grid-cols-[repeat(3,auto)] xl:justify-end">
              {CHANNELS.map(({ label, value, href, Icon, external }) => (
                <li
                  key={label}
                  // The long email address takes its own row on tablet, so Phone and WhatsApp pair up.
                  className={cn("min-w-0", Icon === Mail && "sm:col-span-2 lg:col-span-1")}
                >
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    className="group flex h-full items-center gap-3.5 rounded-xl border border-border bg-card py-3 pr-5 pl-3 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_14px_30px_-22px] hover:shadow-primary/50"
                  >
                    <span className="grid shrink-0 place-items-center text-primary" aria-hidden>
                      <Icon className="size-6.5" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.8125rem] text-muted-foreground">{label}</span>
                      <span className="block text-base font-semibold break-words text-primary group-hover:underline sm:text-[1.0625rem]">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-3 grid gap-3 lg:grid-cols-3 lg:gap-4">
            {OFFICES.map((office) => (
              <li
                key={office.label}
                className="flex min-w-0 items-start gap-5 rounded-xl border border-border bg-card px-5 py-4"
              >
                <span className="grid shrink-0 place-items-center text-primary" aria-hidden>
                  <MapPin className="size-6.5" strokeWidth={1.5} />
                </span>
                <address className="min-w-0 not-italic">
                  <span className="flex items-center gap-3 text-[0.95rem] font-semibold text-primary">
                    {office.label}
                    <OfficeFlag region={office.region} />
                  </span>
                  <span className="mt-1.5 block text-base leading-snug text-foreground sm:text-[1.0625rem]">
                    {office.address}
                  </span>
                </address>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* <CtaBand /> */}
    </>
  );
}

/*
 * Small inline flags beside each office name. Flag emoji render as plain letters on Windows,
 * so these are drawn as SVG; the fills are the flags' own colours, not theme tokens.
 */
function OfficeFlag({ region }: { region: string }) {
  const flag = FLAGS[region];
  if (!flag) return null;
  return (
    <svg
      viewBox={flag.viewBox}
      role="img"
      aria-label={`${region} flag`}
      className="h-[1.1rem] w-auto shrink-0 rounded-[2px] shadow-[0_0_0_1px] shadow-border"
    >
      {flag.body}
    </svg>
  );
}

const FLAGS: Record<string, { viewBox: string; body: ReactNode }> = {
  "United States": {
    viewBox: "0 0 38 20",
    body: (
      <>
        <rect width="38" height="20" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((row) => (
          <rect key={row} y={(row * 20) / 13} width="38" height={20 / 13} fill="#B22234" />
        ))}
        <rect width="15.2" height={(7 * 20) / 13} fill="#3C3B6E" />
        {[0, 1, 2].flatMap((r) =>
          [0, 1, 2, 3].map((c) => (
            <circle key={`${r}-${c}`} cx={2.2 + c * 3.6} cy={2 + r * 3.4} r="0.6" fill="#fff" />
          )),
        )}
      </>
    ),
  },
  "United Arab Emirates": {
    viewBox: "0 0 12 6",
    body: (
      <>
        <rect width="12" height="2" fill="#00732F" />
        <rect y="2" width="12" height="2" fill="#fff" />
        <rect y="4" width="12" height="2" fill="#000" />
        <rect width="3" height="6" fill="#FF0000" />
      </>
    ),
  },
  India: {
    viewBox: "0 0 9 6",
    body: (
      <>
        <rect width="9" height="2" fill="#FF9933" />
        <rect y="2" width="9" height="2" fill="#fff" />
        <rect y="4" width="9" height="2" fill="#138808" />
        <circle cx="4.5" cy="3" r="0.75" fill="none" stroke="#000080" strokeWidth="0.15" />
      </>
    ),
  },
};
