import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import { getServiceFaqs } from "@/data/serviceFaqs";
import { Container, Reveal } from "./primitives";
import { BackdropHero } from "./BackdropHero";
import { PricingMarquee } from "./PricingMarquee";
import { ServiceFaqs } from "./ServiceFaqs";
import type { ServiceDetailMedia } from "./serviceDetailMedia";

/** Plain bullet points, in two columns from tablet up. */
function CapabilityList({ items }: { items: string[] }) {
  return (
    <Reveal>
      <ul className="list-disc pl-6 text-lg leading-snug text-foreground marker:text-primary sm:columns-2 sm:gap-x-12 [&>li]:break-inside-avoid">
        {items.map((c) => (
          <li key={c} className="mb-3 pl-1">
            {c}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
// Same width as the hero (BackdropHero) so every section lines up with its copy.
const WIDE = "max-w-[1540px] lg:px-10";

/** Service detail layout: hero with the overview, the capabilities grid, then a closing call to action. */
export function ServiceDetailFeature({
  service,
  media,
}: {
  service: Service;
  media: ServiceDetailMedia;
}) {
  const faqs = getServiceFaqs(service.slug);

  return (
    <>
      <BackdropHero
        lines={[[{ text: service.name }]]}
        tagline={service.tagline}
        intro={service.overview}
        image={media.heroBackdrop}
        showCta={false}
      />

      <PricingMarquee />

      <section aria-labelledby="capabilities-heading" className="py-12 sm:py-16">
        <Container className={WIDE}>
          <h2
            id="capabilities-heading"
            className="font-serif text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.15] font-bold text-primary"
          >
            {service.capabilitiesLabel}:
          </h2>
          <div className="mt-8">
            <CapabilityList items={service.capabilities} />
          </div>
          {/* Call to action: a small button centred under the list, before the FAQs. */}
          <div className="mt-6 flex justify-center">
            <Link
              to="/contact"
              hash="contact-form"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              {service.cta}
              <ArrowRight
                className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQs: client-supplied questions */}
      {faqs.length > 0 && (
        <section id="faqs" aria-labelledby="faqs-heading" className="scroll-mt-20 pb-12 sm:pb-16">
          <Container className={WIDE}>
            <h2
              id="faqs-heading"
              className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] font-bold text-primary"
            >
              Frequently Asked Questions
            </h2>
            <ServiceFaqs groups={faqs} />
          </Container>
        </section>
      )}
    </>
  );
}
