import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import { PRICING_PAGE } from "@/data/site";
import { Container } from "@/components/site/primitives";
import { PricingTable } from "@/components/site/PricingTable";
import { cn } from "@/lib/utils";
// import { CtaBand } from "@/components/site/CtaBand";

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
      <section aria-labelledby="price-table" className="relative z-10 pt-8 pb-4 sm:pt-10 lg:pt-6">
        {/* On large screens the table is narrowed and centred so the prices sit close to the
            service names instead of across a wide gap. */}
        <Container className={cn(WIDE, "lg:max-w-4xl")}>
          {/* With no hero, this heading is the page's h1. */}
          <h1
            id="price-table"
            className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] font-bold text-primary"
          >
            Price Chart
          </h1>
          {/* The outer frame only wraps the desktop table; below lg the cards sit on the page. */}
          <div className="mt-5 rounded-2xl border border-border bg-card p-2 shadow-[0_24px_60px_-36px] shadow-primary/40 max-lg:border-0 max-lg:bg-transparent max-lg:p-0 max-lg:shadow-none lg:p-3">
            <PricingTable showIncluded={false} compact />
          </div>
        </Container>
      </section>

      {/* <CtaBand /> */}
    </>
  );
}
