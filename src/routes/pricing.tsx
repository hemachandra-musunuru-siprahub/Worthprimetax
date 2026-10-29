import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import { ShieldCheck, UsersRound, Globe } from "lucide-react";
import { PRICING_PAGE } from "@/data/site";
import { Container } from "@/components/site/primitives";
import { HeroCta } from "@/components/site/HeroCta";
import { PricingTable } from "@/components/site/PricingTable";
import { CtaBand } from "@/components/site/CtaBand";
import pricingDeskImage from "@/assets/pricing-desk.jpg";
import { PricingMarquee } from "@/components/site/PricingMarquee";

const HIGHLIGHT_ICONS = [ShieldCheck, UsersRound, Globe];

// Wider than the standard 1200px container so the ten-row table has room, as in the approved layout.
const WIDE = "max-w-[1440px] lg:px-10";

export const Route = createFileRoute("/pricing")({
  head: () =>
    seoHead({ title: PRICING_PAGE.title, description: PRICING_PAGE.description, path: "/pricing" }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-linear-to-b from-tint to-background">
        {/* Phones (max-sm) follow the service hero: the desk photo (the lg:hidden img below) sits
            behind the copy under this white wash, so the price strip shows on the first screen. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden bg-linear-to-b from-background/90 via-background/80 to-background/55 max-sm:block"
        />
        {/*
         * Desk photo filling the right of the hero behind a gold diagonal edge: the outer layer is
         * the gold, the photo sits a few pixels in with the same slant.
         */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 -z-10 hidden w-[52%] bg-brand-gold [clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)] lg:block"
        >
          <img
            src={pricingDeskImage}
            alt=""
            width={1054}
            height={436}
            className="absolute inset-y-0 right-0 left-1.5 h-full w-[calc(100%-0.375rem)] object-cover [clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
          />
        </div>

        <Container className={`${WIDE} pt-5 pb-8 sm:pt-6 lg:pt-6 lg:pb-6`}>
          <div className="max-w-[40rem] lg:max-w-[47%]">
            <h1 className="font-serif text-[clamp(2.25rem,3.9vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.02em] max-sm:text-[1.6rem] max-sm:leading-[1.16]">
              <span className="block text-primary">{PRICING_PAGE.heading}</span>
              <span className="block font-semibold text-primary">{PRICING_PAGE.headingMuted}</span>
            </h1>
            <p className="mt-3 max-w-[34rem] text-base leading-snug text-muted-foreground max-sm:text-[0.9375rem] max-sm:text-foreground/85 sm:text-[1.0625rem]">
              {PRICING_PAGE.intro}
            </p>
            <HeroCta className="mt-5" />

            <ul className="mt-5 grid gap-4 max-sm:gap-3 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
              {PRICING_PAGE.highlights.map((h, i) => {
                const Icon = HIGHLIGHT_ICONS[i] ?? Globe;
                return (
                  <li key={h.title} className="flex items-center gap-2.5 sm:px-3 sm:first:pl-0">
                    <span className="grid shrink-0 place-items-center text-primary" aria-hidden>
                      <Icon className="size-6.5" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.8125rem] font-semibold whitespace-nowrap text-primary">
                        {h.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{h.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <img
            src={pricingDeskImage}
            alt=""
            width={1054}
            height={436}
            className="mt-8 aspect-[16/7] w-full rounded-xl object-cover max-sm:absolute max-sm:inset-0 max-sm:-z-20 max-sm:mt-0 max-sm:aspect-auto max-sm:h-full max-sm:rounded-none lg:hidden"
          />
        </Container>
      </section>

      <PricingMarquee />

      <section aria-labelledby="price-table" className="relative z-10 pt-8 pb-4 sm:pt-10">
        <Container className={WIDE}>
          <h2 id="price-table" className="sr-only">
            Starting prices by service
          </h2>
          {/* The outer frame only wraps the desktop table; below lg the cards sit on the page. */}
          <div className="rounded-2xl border border-border bg-card p-2 shadow-[0_24px_60px_-36px] shadow-primary/40 max-lg:border-0 max-lg:bg-transparent max-lg:p-0 max-lg:shadow-none lg:p-3">
            <PricingTable />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
