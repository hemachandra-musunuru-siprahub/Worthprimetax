import { Link } from "@tanstack/react-router";
import { ArrowRight, ChartColumn, ShieldCheck, Users } from "lucide-react";
import { CTA_BAND } from "@/data/site";
import { CtaIllustration } from "./CtaIllustration";
import { Reveal } from "./primitives";

// One icon per CTA_BAND.points entry, in order.
const POINT_ICONS = [ShieldCheck, ChartColumn, Users];

/**
 * Closing call to action: a compact rounded blue panel (about 360px tall on desktop) with copy,
 * two buttons and three points on the left (55%) and an illustration in the bottom-right corner.
 */
export function CtaBand() {
  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8">
      <Reveal>
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-linear-to-br from-hero via-hero to-brand-secondary p-6 text-hero-foreground shadow-[0_24px_60px_-40px] shadow-primary/70 sm:p-8 lg:min-h-[360px] lg:p-10">
          {/* Anchored to the panel's bottom-right corner; the road in the drawing meets both edges. */}
          <CtaIllustration className="pointer-events-none absolute right-0 bottom-0 hidden w-[min(38%,26rem)] lg:block" />

          <div className="relative grid items-center gap-8 lg:min-h-[280px] lg:grid-cols-[55fr_45fr] lg:gap-6">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-hero-foreground/90 uppercase sm:text-[0.8rem]">
                {CTA_BAND.label}
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.3rem,1.8vw,1.9rem)] leading-[1.2] font-bold tracking-[-0.01em] text-hero-foreground">
                {CTA_BAND.heading}
              </h2>
              <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-hero-foreground/85 sm:text-base">
                {CTA_BAND.intro}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  hash="contact-form"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-hero-foreground px-5 text-[0.95rem] font-semibold text-primary transition-transform hover:scale-[1.03]"
                >
                  {CTA_BAND.primary} <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex h-11 items-center rounded-xl border border-hero-foreground/70 px-5 text-[0.95rem] font-semibold text-hero-foreground transition-colors hover:bg-hero-foreground/10"
                >
                  {CTA_BAND.secondary}
                </Link>
              </div>

              <ul className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-hero-foreground/25">
                {CTA_BAND.points.map((p, i) => {
                  const Icon = POINT_ICONS[i] ?? ShieldCheck;
                  return (
                    <li key={p.title} className="flex items-center gap-2.5 sm:px-3 sm:first:pl-0">
                      <Icon className="size-5 shrink-0" strokeWidth={1.4} aria-hidden />
                      <span className="text-[0.8125rem] leading-snug text-hero-foreground/90">
                        {p.title}
                        <span className="block">{p.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
