import { createFileRoute, Link } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Folder,
  MessageSquareQuote,
  Play,
  Quote,
  Star,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import {
  CLIENT_EXPERIENCE,
  FAQ_INTRO,
  FAQS,
  // FOUNDERS,
  HOME_PRICING,
  INSIGHTS,
  REASONS,
  STATS,
} from "@/data/site";
import {
  Container,
  CountUp,
  Reveal,
  Section,
  SectionLabel,
  useInView,
  useSnapCarousel,
} from "@/components/site/primitives";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SERVICE_GRID } from "@/components/site/serviceGrid";
import { ContactSection } from "@/components/site/ContactSection";
import { HeroCta } from "@/components/site/HeroCta";
import { FaqIllustration } from "@/components/site/FaqIllustration";
import { InsightCard } from "@/components/site/InsightCard";
// import { CtaBand } from "@/components/site/CtaBand";
import { PricingMarquee } from "@/components/site/PricingMarquee";
import { SERVICE_IMAGES } from "@/components/site/serviceImages";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/worthprime-hero-team.webp";
import heroMobileImage from "@/assets/home-hero-mobile.webp";
import advisersImage from "@/assets/worthprime-advisers-blue.webp";
// import { FOUNDER_PHOTOS } from "@/components/site/founderPhotos";
import workspaceImage from "@/assets/worthprime-workspace.webp";
import whatWeDoImage from "@/assets/what-we-do-tax-desk.webp";
import pricingDeskImage from "@/assets/pricing-desk.jpg";
import googleLogo from "@/assets/google-g.svg";

const TITLE = "WorthPrime Tax | U.S. Tax, Accounting & Compliance";
const DESCRIPTION =
  "WorthPrime Tax brings U.S. tax, accounting, payroll, audit and IRS compliance together through a single, integrated professional relationship.";

export const Route = createFileRoute("/")({
  head: () => seoHead({ title: TITLE, description: DESCRIPTION, path: "/" }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* On large screens the hero fills the first screen so the price strip sits on its bottom edge.
          The layout's nav spacer moves from this wrapper into the hero, so the photo still runs up
          behind the transparent nav. */}
      {/* Portrait tablets (e.g. iPad at 1024x1366) skip the full-screen stretch: on a tall screen it
          made the photo huge and squeezed the copy into the top. The hero sizes to its content there. */}
      <div className="before:!hidden lg:landscape:flex lg:landscape:min-h-svh lg:landscape:flex-col">
        <Hero />
        <PricingMarquee />
      </div>
      <StatsBand />
      {/* <WhoWeAre /> */}
      <ServicesGrid />
      <ProofSection />
      <PricingPreview />
      <ClientExperience />
      <Insights />
      <Faq />
      <WhatComesNext />
      {/* <CtaBand /> */}
      <ContactSection compact />
    </>
  );
}

function Hero() {
  // The intro shows its first half until the visitor asks for the rest.
  const [introOpen, setIntroOpen] = useState(false);
  // While the intro is open the photo keeps the hero's collapsed height, so the extra text makes
  // the hero taller without the cover photo zooming in.
  const heroRef = useRef<HTMLElement | null>(null);
  const [photoHeight, setPhotoHeight] = useState<number | null>(null);
  const toggleIntro = () => {
    setPhotoHeight(introOpen ? null : (heroRef.current?.offsetHeight ?? null));
    setIntroOpen(!introOpen);
  };
  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden bg-background text-foreground before:block before:h-16 before:content-[''] lg:flex-1"
    >
      {/*
       * The photo fills the hero at every size; a soft white wash, strongest on the left, keeps the
       * navy copy readable while the advisers stay clear on the right, as in the approved design.
       */}
      {/* Phones use the advisers photo cut from the approved mobile design (its baked-in text and
          buttons removed), in the same place: the right half, from just above the heading. The file
          carries a blurred strip past the woman's shoulder that fades to white, and the left edge
          fades along a curve, so she is never cut off in a straight line. The top and bottom fade
          into the white too, so the copy beside it sits on plain white. */}
      <img
        src={heroMobileImage}
        alt=""
        width={502}
        height={812}
        fetchPriority="high"
        className="absolute top-[4.5rem] right-0 -z-10 hidden h-auto w-[58.1%] [mask-composite:intersect] [mask-image:radial-gradient(ellipse_100%_70%_at_100%_50%,black_85%,transparent),linear-gradient(to_bottom,transparent,black_16%,black_58%,transparent_84%)] max-sm:block"
      />
      <div
        className={cn(
          "absolute -z-10 max-sm:hidden",
          photoHeight
            ? "inset-x-0 top-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent)]"
            : "inset-0",
        )}
        style={photoHeight ? { height: photoHeight } : undefined}
      >
        <img
          src={heroImage}
          alt="Tax advisers reviewing financial documents together"
          width={1531}
          height={1027}
          fetchPriority="high"
          className="h-full w-full object-cover object-[68%_center]"
        />
        {/* A left-side fade behind the copy (no flat white wash over the whole photo), so the text
            stays readable while the advisers stay clear on the right. Tablets, where the copy runs
            further across the photo, get a stronger fade. */}
        <div
          className="absolute inset-0 bg-linear-to-r from-background/85 from-20% via-background/60 via-42% to-transparent to-62% max-lg:from-background/92 max-lg:from-40% max-lg:via-background/75 max-lg:via-65% max-lg:to-95% lg:portrait:from-background/92 lg:portrait:from-40% lg:portrait:via-background/75 lg:portrait:via-65% lg:portrait:to-95%"
          aria-hidden
        />
      </div>
      {/* Wider than the standard container, like the reference; the nav widens to match on this page. */}
      <Container className="relative max-w-[1540px] lg:px-10">
        <div className="flex max-w-[900px] flex-col pt-16 pb-20 max-sm:pt-10 max-sm:pb-9 sm:pt-20 sm:pb-24 lg:landscape:pt-[min(4rem,8svh)] lg:landscape:pb-[min(5rem,8svh)]">
          {/* Same heading size as the Services hero (BackdropHero). */}
          <h1 className="font-serif text-[clamp(2rem,3.4vw,3.5rem)] leading-[1.12] font-bold tracking-[-0.02em] text-primary max-sm:text-[1.75rem] max-sm:leading-[1.1]">
            {/* Two lines from tablet up, as requested by the client: the break falls after "a".
                Phones get four set lines. */}
            <span className="sm:block sm:whitespace-nowrap">
              <span className="max-sm:block">Your Business</span>{" "}
              <span className="max-sm:block">Is More Than</span> a
            </span>{" "}
            <span className="sm:block sm:whitespace-nowrap">
              Tax Return. <span className="max-sm:block">So Are We.</span>
            </span>
          </h1>
          <div className="mt-2 max-w-[37rem] text-base leading-relaxed text-foreground/85 max-sm:mt-3 max-sm:text-xs max-sm:leading-[1.5] sm:text-[0.9375rem] sm:max-w-[30rem] lg:landscape:max-w-[min(42rem,37vw)] xl:text-[clamp(0.875rem,1.6svh,0.9375rem)]">
            <p>
              {/* Phones: an empty float the size of the photo's area keeps the text in the narrow
                  column beside the photo, then the rest of the paragraph runs full width below it.
                  Its height tracks the photo, which scales with the screen width: the photo has
                  faded out 72px + 79vw from the top of the hero, and the paragraph starts 239px
                  down. */}
              <span
                aria-hidden
                className="float-right hidden h-[calc(79vw-9.6875rem)] w-[calc(100%-10.5rem)] max-sm:block"
              />
              Tax obligations rarely exist in isolation. Entity structure affects taxation.
              Accounting shapes financial visibility. Payroll carries its own compliance
              responsibilities. And an IRS notice can quickly become a business concern.
              {introOpen && (
                <span id="hero-intro-more">
                  {" "}
                  WorthPrime Tax brings these disciplines together through a considered approach to
                  U.S. tax, accounting and compliance—helping U.S. individuals, entrepreneurs and
                  businesses manage their financial responsibilities with greater clarity and
                  precision.
                </span>
              )}{" "}
              <button
                type="button"
                aria-expanded={introOpen}
                aria-controls="hero-intro-more"
                onClick={toggleIntro}
                className="font-semibold whitespace-nowrap text-primary underline underline-offset-2 hover:no-underline"
              >
                {introOpen ? "Read less" : "Read more"}
              </button>
            </p>
            <p className="mt-3 font-semibold text-primary max-sm:mt-2 max-sm:text-[0.8125rem]">
              Get Expert Tax Counsel, Optimized Tax Outcomes, All Handled With Perspective
            </p>
          </div>
          {/* Phones: both buttons share one row across the full width. */}
          <div className="mt-8 flex flex-wrap gap-4 max-sm:mt-5 max-sm:flex-nowrap max-sm:gap-2 xl:mt-[clamp(1rem,3.4svh,2rem)]">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-[0.8125rem] font-semibold text-primary-foreground transition-transform hover:scale-[1.03] max-sm:flex-auto max-sm:justify-center max-sm:gap-1.5 max-sm:px-3 max-sm:py-3 max-sm:text-[0.8125rem] max-sm:whitespace-nowrap"
            >
              <span>
                {/* "Explore" is dropped on the narrowest phones so both buttons still fit in one row. */}
                <span className="hidden min-[360px]:max-sm:inline">Explore </span>Our Services
              </span>
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-primary bg-background/70 px-5 py-2 text-[0.8125rem] font-semibold text-primary transition-transform hover:scale-[1.03] max-sm:flex-auto max-sm:justify-center max-sm:bg-background max-sm:px-3 max-sm:py-3 max-sm:text-[0.8125rem] max-sm:whitespace-nowrap"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatsBand() {
  return (
    <Section className="bg-card py-10 sm:py-14">
      {/* max-sm: classes make a compact 2x2 grid on phones only; sm and up are unchanged. */}
      <div className="grid overflow-hidden rounded-[2rem] border border-hero/15 bg-tint max-sm:grid-cols-2 max-sm:rounded-3xl sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div
              className={cn(
                "h-full p-7 max-sm:p-5 sm:p-9",
                i < STATS.length - 1 && "border-b border-border",
                (i === 0 || i === 2) && "max-sm:border-r sm:border-r",
                i === 2 && "max-sm:border-b-0",
                i < 2 && "sm:border-b",
                i < STATS.length - 1 && "lg:border-r",
                "lg:border-b-0",
              )}
            >
              <p className="font-sans text-[clamp(2.5rem,4vw,4rem)] font-medium leading-none text-brand-secondary max-sm:text-[1.75rem]">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm leading-snug text-muted-foreground max-sm:mt-2 max-sm:text-xs">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// "How We Started?" section hidden for now; uncomment it and <WhoWeAre /> above to restore.
// function WhoWeAre() {
//   return (
//     <Section>
//       <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
//         <div>
//           <SectionLabel>How We Started?</SectionLabel>
//           <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05]">
//             Built on Experience. <span className="text-primary">Shaped by Perspective.</span>
//           </h2>
//           <p className="mt-6 text-muted-foreground">
//             Behind every enduring enterprise lies a confluence of sound structure, considered
//             decisions and discerning professional counsel. WorthPrime Tax was shaped by precisely
//             that philosophy—bringing together the complementary expertise of its co-founders, with
//             extensive experience across accounting, taxation, audit, payroll, legal and compliance
//             services spanning the U.S., UAE and India.
//           </p>
//           <Link
//             to="/about"
//             className="mt-7 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-colors hover:bg-accent"
//           >
//             More About Us <ArrowRight className="size-4" />
//           </Link>
//         </div>
//         {/* Co-founder cards hidden for now; restore with the FOUNDERS / FOUNDER_PHOTOS imports.
//         <div className="grid gap-5 sm:grid-cols-2">
//           {FOUNDERS.map((f, i) => (
//             <Reveal key={f.name} delay={i * 100}>
//               <article className="surface-card overflow-hidden">
//                 <img
//                   src={FOUNDER_PHOTOS[i] ?? advisersImage}
//                   alt={
//                     FOUNDER_PHOTOS[i]
//                       ? `Portrait of ${f.name}`
//                       : "Professional tax advisers in consultation"
//                   }
//                   width={1408}
//                   height={1008}
//                   loading="lazy"
//                   className="aspect-4/5 w-full object-cover object-top"
//                 />
//                 <div className="p-5">
//                   <h3 className="text-xl leading-tight">{f.name}</h3>
//                   <p className="mt-1 text-xs uppercase tracking-widest text-primary">{f.title}</p>
//                   <p className="mt-3 text-xs text-muted-foreground">{f.credential}</p>
//                 </div>
//               </article>
//             </Reveal>
//           ))}
//         </div>
//         */}
//       </div>
//     </Section>
//   );
// }

function WhatComesNext() {
  return (
    <>
      <Section>
        <div className="text-center">
          <h2 className="font-serif text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1] font-bold tracking-[-0.01em] text-balance text-primary">
            For Individuals. For Businesses. For What Comes Next.
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* A pale panel sits offset behind the photo's top-left corner. */}
          <Reveal className="relative pt-4 pl-4">
            <span
              aria-hidden
              className="absolute top-0 left-0 h-[85%] w-[90%] rounded-2xl bg-tint"
            />
            <img
              src={advisersImage}
              alt="Two WorthPrime Tax advisers reviewing financial documents together"
              width={1200}
              height={896}
              loading="lazy"
              className="relative aspect-[3/2] w-full rounded-xl object-cover shadow-[0_24px_50px_-30px] shadow-primary/50"
            />
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p className="font-semibold text-primary">
              Your financial obligations change as your circumstances change.
            </p>
            <p>
              A new business requires the right structure. A growing company needs{" "}
              <strong className="text-foreground">reliable books</strong> and{" "}
              <strong className="text-foreground">payroll</strong>. Tax season calls for accurate
              filings. International activity can create additional reporting requirements. And when
              the IRS raises a question, the response needs to be deliberate.
            </p>
            <p>
              <strong className="text-foreground">WorthPrime Tax in U.S.</strong> provides the
              professional perspective to manage these moments with greater clarity—from formation
              and <strong className="text-foreground">bookkeeping</strong> to{" "}
              <strong className="text-foreground">U.S. tax</strong>, payroll,{" "}
              <strong className="text-foreground">audit</strong> and{" "}
              <strong className="text-foreground">IRS compliance</strong>.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Full-width closing band for this section. */}
      <section className="bg-linear-to-r from-hero to-brand-secondary text-hero-foreground">
        <Container className="flex flex-col gap-6 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-serif text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug font-bold">
              Whatever the next financial decision looks like, make it with perspective.
            </p>
            <p className="mt-2 text-base text-hero-foreground/90">
              From Setup to Success, We’re With You.
            </p>
          </div>
          <Link
            to="/contact"
            hash="contact-form"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-hero-foreground px-7 py-4 font-semibold text-primary transition-transform hover:scale-[1.03] lg:self-auto"
          >
            Talk to WorthPrime Tax <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>
    </>
  );
}
const pad2 = (n: number) => String(n).padStart(2, "0");

/** Furthest a card turns, in degrees, when the pointer is at its edge. */
const MAX_TILT = 10;

// Mouse only: on touch screens the cards scroll, so they stay flat.
function tiltCard(e: PointerEvent<HTMLDivElement>) {
  if (e.pointerType !== "mouse") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  // -0.5 to 0.5 across the card, so the card leans towards the pointer.
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `rotateX(${-y * MAX_TILT * 2}deg) rotateY(${x * MAX_TILT * 2}deg) scale(1.03)`;
}

function resetTilt(e: PointerEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = "";
}

function ProofSection() {
  const total = REASONS.length;
  // On narrow screens the cards become a swipeable track; on desktop tapping a card highlights it.
  const { active, setActive, trackRef, itemRefs: cardRefs } = useSnapCarousel(total);
  const { ref: cardsRef, inView: cardsInView } = useInView<HTMLDivElement>(0.2);

  return (
    <section
      aria-labelledby="why-worthprime-heading"
      className="relative isolate overflow-hidden bg-background py-12 sm:py-16"
    >
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-background via-tint/70 to-background"
        aria-hidden
      />
      <div
        className="absolute top-1/4 right-0 -z-10 size-[36rem] rounded-full bg-brand-secondary/10 blur-3xl"
        aria-hidden
      />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <h2
              id="why-worthprime-heading"
              className="font-serif text-[clamp(2.3rem,4.6vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.02em] text-balance text-primary"
            >
              Why WorthPrime Tax?
            </h2>
            <p className="mt-4 font-serif text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-semibold text-primary">
              One Firm. Every Business Need.
            </p>
            <p className="mt-6 max-w-[38rem] text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
              Business does not operate in separate compartments. A tax decision can affect
              accounting. Entity structure can influence tax treatment. Payroll creates reporting
              obligations. Financial records determine the quality of tax filings. An IRS issue may
              require both technical analysis and a broader understanding of the underlying
              business.
            </p>
            <p className="mt-4 max-w-[38rem] text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
              WorthPrime Tax brings these disciplines together through a single, integrated
              professional relationship, giving clients a more coherent way to manage their
              financial and compliance responsibilities.
            </p>
          </div>

          <Reveal className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-brand-secondary/20 bg-card shadow-[0_24px_60px_-28px] shadow-primary/35">
              <img
                src={workspaceImage}
                alt="WorthPrime Tax services — tax, accounting, payroll, audit, business formation, compliance and financial planning — connected around a financial dashboard"
                width={1672}
                height={941}
                loading="lazy"
                className="aspect-16/9 w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/5"
                aria-hidden
              />
            </div>
          </Reveal>
        </div>

        <div ref={cardsRef}>
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Why clients choose WorthPrime Tax"
            className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pt-1 pb-4 perspective-[1200px] [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:auto-rows-fr sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          >
            {REASONS.map((r, i) => {
              const isActive = active === i;
              // The first half of the cards comes in from the left, the rest from the right.
              const fromLeft = i < total / 2;
              return (
                <article
                  key={r.title}
                  ref={(n) => {
                    cardRefs.current[i] = n;
                  }}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(i)}
                  // The outer cards set off first, the inner pair just after.
                  style={{ transitionDelay: `${i === 0 || i === total - 1 ? 0 : 160}ms` }}
                  className={cn(
                    "flex w-[85%] shrink-0 snap-start perspective-[900px] transition-all duration-1000 ease-out motion-reduce:transition-none sm:w-auto",
                    cardsInView
                      ? "translate-x-0 translate-y-0 rotate-y-0 opacity-100"
                      : cn(
                          "translate-y-6 opacity-0 sm:translate-y-0",
                          fromLeft
                            ? "sm:-translate-x-[45vw] sm:rotate-y-[40deg]"
                            : "sm:translate-x-[45vw] sm:-rotate-y-[40deg]",
                        ),
                  )}
                >
                  <div
                    onPointerMove={tiltCard}
                    onPointerLeave={resetTilt}
                    className={cn(
                      "group relative flex w-full flex-col rounded-xl border bg-linear-to-b p-6 transform-3d transition-[transform,box-shadow,border-color] duration-300 ease-out sm:p-7",
                      isActive
                        ? "border-brand-secondary/40 from-tint to-card shadow-[0_18px_40px_-22px] shadow-brand-secondary/50"
                        : "border-brand-secondary/20 from-card to-card shadow-[0_10px_30px_-24px] shadow-primary/40 hover:border-brand-secondary/30 hover:shadow-[0_26px_50px_-24px]",
                    )}
                  >
                    {/* Lifted off the card face so the text floats above it as the card tilts. */}
                    <h3 className="font-serif text-xl leading-snug font-bold text-primary translate-z-6 sm:text-[1.3rem] lg:min-h-[4.125em]">
                      {r.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground translate-z-3 sm:text-[0.9375rem]">
                      {r.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServicesGrid() {
  return (
    <Section id="services">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] text-primary">
            What We Do?
          </h2>
          <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-semibold text-primary">
            The Numbers Behind Your Business. The Perspective Beyond Them.
          </p>
        </div>
      </div>
      {/* The copy on the left, the illustration in the space to its right; stacked below lg. */}
      <div className="mt-5 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
        <div className="max-w-2xl space-y-4 text-muted-foreground">
          <p>The right financial partner should understand what sits behind the numbers.</p>
          <p>
            WorthPrime Tax works with businesses and individuals across a broad spectrum of U.S. tax
            and compliance requirements, combining technical knowledge with a practical
            understanding of how financial decisions affect the wider business.
          </p>
          <p>
            From Individual Tax and Form 1040 filings to U.S. business tax, Form 1120, Form 1120S
            and Form 1065, our work is designed around accuracy, compliance and the broader
            objectives of the client.
          </p>
          <p>
            Whether you are forming an LLC, operating a C Corp, S Corp or Partnership, managing
            payroll, maintaining your books through QuickBooks, or responding to an IRS Audit, we
            bring the relevant expertise into sharper focus.
          </p>
        </div>
        <Reveal>
          <img
            src={whatWeDoImage}
            alt="Tax returns, a calculator and a laptop showing financial charts beside Form 1040, 1120, 1120S and 1065 binders"
            width={1536}
            height={1024}
            loading="lazy"
            className="mx-auto h-auto w-full max-w-xl"
          />
        </Reveal>
      </div>
      <div className={cn("mt-10", SERVICE_GRID)}>
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 5) * 80}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// Only confirmed prices ("From $5,000") are shown as-is; placeholders read as "Price TBC".
const displayPrice = (price: string) =>
  price.startsWith("From") ? price : HOME_PRICING.pendingPrice;

/** Auto-scroll speed in pixels per second. */
const AUTO_SCROLL_SPEED = 40;

function PricingPreview() {
  const services = SERVICES;
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [dragging, setDragging] = useState(false);
  // Mouse drag state; touch and trackpads use the browser's native scrolling instead.
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  // The cards are rendered three times, back to back, so the row can loop endlessly in either
  // direction: the visitor stays in the middle copy, and whenever the scroll reaches an outer
  // copy it jumps by one copy's width, which looks identical. This is that width.
  const loopWidth = () => {
    const items = trackRef.current?.querySelectorAll("li");
    if (!items || items.length < services.length * 3) return 0;
    return (
      (items[services.length] as HTMLElement).getBoundingClientRect().left -
      (items[0] as HTMLElement).getBoundingClientRect().left
    );
  };

  // Keeps the scroll position inside the middle copy.
  const wrap = () => {
    const track = trackRef.current;
    const width = loopWidth();
    if (!track || !width) return;
    if (track.scrollLeft >= width * 2) track.scrollLeft -= width;
    else if (track.scrollLeft < width) track.scrollLeft += width;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = loopWidth();
    track.addEventListener("scroll", wrap, { passive: true });
    return () => track.removeEventListener("scroll", wrap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll: moves the row a little on every animation frame, scaled by the time since the
  // last frame, so it glides at a steady speed instead of stepping. It stops while the visitor
  // hovers, focuses, touches or drags the row, and never stops at the end because the row loops.
  const paused = useRef(false);
  const holdUntil = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let last: number | null = null;
    // The browser rounds scrollLeft, so the exact position is kept here between frames.
    let position: number | null = null;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const track = trackRef.current;
      if (!track || paused.current || document.hidden || Date.now() < holdUntil.current) {
        last = null;
        return;
      }
      // Pick up wherever the visitor, an arrow press or the loop jump left the row.
      if (position === null || Math.abs(position - track.scrollLeft) > 2) {
        position = track.scrollLeft;
      }
      // Cap the step so a slow or skipped frame never makes the row jump.
      const elapsed = last === null ? 0 : Math.min(now - last, 50);
      last = now;
      position += (AUTO_SCROLL_SPEED * elapsed) / 1000;
      track.scrollLeft = position;
      wrap();
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Moves the row by exactly one card (plus the gap), so cards stay aligned after each press.
  const scrollByCard = (dir: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Let the arrow's smooth scroll finish before auto-scroll takes over again.
    holdUntil.current = Date.now() + 800;
    track.scrollBy({
      left: dir * (card.getBoundingClientRect().width + gap),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const arrow = (dir: -1 | 1) => {
    return (
      <button
        type="button"
        onClick={() => scrollByCard(dir)}
        aria-label={dir < 0 ? "Previous services" : "Next services"}
        className={cn(
          "grid size-11 place-items-center rounded-full border transition-colors",
          dir < 0
            ? "border-input bg-card text-primary hover:bg-accent"
            : "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        )}
      >
        {dir < 0 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
      </button>
    );
  };

  return (
    <section
      aria-labelledby="home-pricing-heading"
      className="relative isolate overflow-hidden bg-background py-12 sm:py-16"
    >
      <img
        src={pricingDeskImage}
        alt=""
        width={1054}
        height={436}
        loading="lazy"
        className="absolute top-0 right-0 -z-10 hidden h-[58%] w-[64%] object-cover object-left [mask-image:linear-gradient(to_right,transparent,black_38%),linear-gradient(to_bottom,black_65%,transparent)] [mask-composite:intersect] md:block"
      />
      <Container>
        <h2
          id="home-pricing-heading"
          className="font-serif text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.02] font-bold tracking-[-0.02em]"
        >
          <span className="block text-primary">{HOME_PRICING.heading}</span>
          <span className="block font-semibold text-brand-gold">{HOME_PRICING.headingMuted}</span>
        </h2>
        <p className="mt-5 max-w-[37rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
          {HOME_PRICING.intro}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-3 rounded-lg bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground shadow-[0_14px_30px_-16px] shadow-primary/70 transition-transform hover:scale-[1.02]"
          >
            {HOME_PRICING.cta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <div className="flex items-center gap-3">
            {arrow(-1)}
            {arrow(1)}
          </div>
        </div>

        <div className="relative mt-8">
          {/* Soft colour shapes behind the row: this is what the glass cards blur and tint. */}
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <span className="absolute -top-6 left-[6%] size-64 rounded-full bg-brand-secondary/40 blur-3xl" />
            <span className="absolute top-10 left-[38%] size-72 rounded-full bg-primary/25 blur-3xl" />
            <span className="absolute -bottom-6 left-[68%] size-64 rounded-full bg-brand-secondary/35 blur-3xl" />
          </div>
          <ul
            ref={trackRef}
            tabIndex={0}
            aria-label="Starting prices by service"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
            onFocus={() => (paused.current = true)}
            onBlur={() => (paused.current = false)}
            onTouchStart={() => (paused.current = true)}
            onTouchEnd={() => {
              // Let a swipe's momentum finish before the row starts moving again.
              holdUntil.current = Date.now() + 2500;
              paused.current = false;
            }}
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse" || e.button !== 0 || !trackRef.current) return;
              drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
            }}
            onPointerMove={(e) => {
              const track = trackRef.current;
              if (!drag.current || !track) return;
              const dx = e.clientX - drag.current.x;
              if (!drag.current.moved && Math.abs(dx) > 5) {
                drag.current.moved = true;
                setDragging(true);
                track.setPointerCapture(e.pointerId);
              }
              if (drag.current.moved) track.scrollLeft = drag.current.left - dx;
            }}
            onPointerUp={() => {
              // Keep `moved` until the click that follows, so a drag never opens a card.
              setDragging(false);
              if (drag.current && !drag.current.moved) drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
              setDragging(false);
            }}
            onClickCapture={(e) => {
              if (drag.current?.moved) {
                e.preventDefault();
                e.stopPropagation();
              }
              drag.current = null;
            }}
            className={cn(
              "-mx-5 flex gap-5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pt-2 pb-8 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-primary/30 sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden",
              // No scroll snapping: it would pull the slow auto-scroll back to the nearest card.
              dragging && "cursor-grabbing select-none",
              "[@media(pointer:fine)]:cursor-grab",
            )}
          >
            {[...services, ...services, ...services].map((s, index) => {
              const image = SERVICE_IMAGES[s.slug];
              // Only the middle copy is real for keyboards and screen readers.
              const isCopy = Math.floor(index / services.length) !== 1;
              return (
                <li
                  key={`${s.slug}-${index}`}
                  aria-hidden={isCopy || undefined}
                  className="w-[70%] max-w-[16rem] shrink-0 sm:w-[15rem]"
                >
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    tabIndex={isCopy ? -1 : undefined}
                    draggable={false}
                    className="group flex h-full flex-col rounded-3xl border border-card/80 bg-card/45 p-3 shadow-[inset_0_1px_0_var(--color-card),0_24px_48px_-20px] shadow-primary/40 backdrop-blur-xl backdrop-saturate-150 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_var(--color-card),0_32px_56px_-20px]"
                  >
                    <div className="aspect-2/1 overflow-hidden rounded-2xl bg-tint/60">
                      {image && (
                        <img
                          src={image}
                          alt=""
                          width={1400}
                          height={788}
                          draggable={false}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col px-1.5 pt-3 pb-1">
                      <h3 className="min-h-[2.4em] font-serif text-[1.125rem] leading-[1.2] font-semibold text-primary">
                        {s.name}
                      </h3>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                        <div>
                          <p className="text-xs text-foreground/70">{HOME_PRICING.priceLabel}</p>
                          <p className="mt-0.5 text-lg font-bold text-primary">
                            {displayPrice(s.price)}
                          </p>
                        </div>
                        <span
                          className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/30 bg-card/60 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                          aria-hidden
                        >
                          <ArrowRight className="size-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* Edge fade hinting that more cards are off-screen. */}
          <div
            className="pointer-events-none absolute inset-y-0 -right-5 w-16 bg-linear-to-l from-background to-transparent sm:-right-8"
            aria-hidden
          />
        </div>
      </Container>
    </section>
  );
}

const formatDuration = (seconds: number) => {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${pad2(total % 60)}`;
};

function ClientExperience() {
  const { heading, headingMuted } = CLIENT_EXPERIENCE;
  return (
    <section
      aria-labelledby="client-experience-heading"
      className="relative isolate overflow-hidden bg-background py-12 sm:py-16"
    >
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-background via-tint/60 to-background"
        aria-hidden
      />
      <div
        className="absolute top-16 right-6 -z-10 hidden h-28 w-40 [background-image:radial-gradient(var(--theme-border)_1.5px,transparent_1.5px)] [background-size:18px_18px] md:block"
        aria-hidden
      />
      <Container>
        <h2
          id="client-experience-heading"
          className="text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em]"
        >
          {heading} <span className="font-serif font-semibold">{headingMuted}</span>
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <ReviewsPanel />
          <VideoTestimonial />
        </div>
      </Container>
    </section>
  );
}

/** Five stars; without a rating they render as muted placeholders. */
function Stars({ rating, className }: { rating?: number; className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center gap-0.5",
        rating === undefined ? "text-border" : "text-rating",
      )}
      {...(rating === undefined
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": `${rating} out of 5 stars` })}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            className,
            "fill-current",
            rating !== undefined && i >= Math.round(rating) && "opacity-25",
          )}
          aria-hidden
        />
      ))}
    </span>
  );
}

// Initial-avatar tints, cycled per review card.
const AVATAR_TINTS = [
  "bg-brand-secondary/12 text-brand-secondary",
  "bg-brand-indigo/10 text-brand-indigo",
  "bg-brand-gold/15 text-brand-gold",
];

function ReviewsPanel() {
  const { google, reviews, reviewPlaceholders } = CLIENT_EXPERIENCE;
  const count = reviews.length || reviewPlaceholders;
  // The reviews swipe (touch) or scroll (mouse) in their row; there are no arrows or dots.
  const { trackRef, itemRefs } = useSnapCarousel(count);

  return (
    <div className="relative min-w-0 rounded-[1.75rem] border border-brand-secondary/10 bg-card p-5 shadow-[0_24px_60px_-36px] shadow-primary/40 sm:px-8 sm:pt-7 sm:pb-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div className="flex items-center gap-4">
          <span
            className="grid size-16 shrink-0 place-items-center rounded-full bg-card shadow-[0_8px_24px_-10px] shadow-primary/35 ring-1 ring-brand-secondary/10"
            aria-hidden
          >
            <img src={googleLogo} alt="" width={36} height={36} className="size-9" />
          </span>
          <div>
            <h3 className="text-xl leading-tight font-bold">{google.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground sm:text-[0.95rem]">
              {google.subtitle}
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div className="flex items-center gap-3 sm:justify-end">
            {google.rating !== null && (
              <span className="text-[2rem] leading-none font-bold text-primary">
                {google.rating.toFixed(1)}
              </span>
            )}
            <Stars
              {...(google.rating !== null ? { rating: google.rating } : {})}
              className="size-6"
            />
          </div>
          {google.rating !== null && google.reviewCount !== null ? (
            <a
              href={google.reviewsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1.5 inline-block text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline sm:text-sm"
            >
              Based on {google.reviewCount} {google.reviewCount === 1 ? "review" : "reviews"}
              <span className="sr-only"> (opens Google reviews in a new tab)</span>
            </a>
          ) : (
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              {google.ratingPlaceholder}
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-6">
        <Quote
          className="pointer-events-none absolute -top-3 right-0 size-16 rotate-180 fill-current text-brand-secondary/10"
          strokeWidth={0}
          aria-hidden
        />
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client reviews"
          className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {Array.from({ length: count }).map((_, i) => {
            const review = reviews[i];
            return (
              <article
                key={i}
                ref={(n) => {
                  itemRefs.current[i] = n;
                }}
                aria-roledescription="slide"
                aria-label={`Review ${i + 1} of ${count}`}
                className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-brand-secondary/10 bg-card/80 p-5 shadow-[0_12px_30px_-26px] shadow-primary/40 transition-shadow hover:shadow-[0_16px_34px_-22px] sm:w-[calc((100%-1rem)/2)] xl:w-[calc((100%-2rem)/3)]"
              >
                {/* Whole card links to the reviews on Google. */}
                <a
                  href={google.reviewsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="absolute inset-0 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                >
                  <span className="sr-only">
                    Read {review ? `${review.name}'s` : "this"} review on Google (opens in a new
                    tab)
                  </span>
                </a>
                <Stars {...(review ? { rating: review.rating } : {})} className="size-[1.125rem]" />
                {review && !review.text ? (
                  // Star-only Google ratings: say so plainly rather than inventing a quote.
                  <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                    Rated {review.rating} stars on Google.
                  </p>
                ) : (
                  <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground">
                    {review ? `“${review.text}”` : "[Verified Google review, client to supply]"}
                  </p>
                )}
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-full text-lg font-semibold",
                      AVATAR_TINTS[i % AVATAR_TINTS.length],
                    )}
                    aria-hidden
                  >
                    {review ? review.name.charAt(0) : "?"}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-primary">
                      {review ? review.name : "[Client name]"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review ? "Verified on Google" : "Review on Google"}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <a
          href={google.writeReviewUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/20 bg-card px-4 py-2 text-sm font-semibold text-primary shadow-[0_8px_20px_-14px] shadow-primary/50 transition-colors hover:bg-tint"
        >
          <img src={googleLogo} alt="" width={16} height={16} className="size-4" />
          Write a Google Review
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}

function VideoTestimonial() {
  const { video } = CLIENT_EXPERIENCE;
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const src = video.src;

  return (
    <div className="flex min-w-0 flex-col rounded-2xl border border-brand-secondary/15 bg-card p-3 shadow-[0_24px_60px_-36px] shadow-primary/40 sm:p-4">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-primary">
        {src && playing ? (
          <video
            src={src}
            controls
            autoPlay
            playsInline
            onEnded={() => setPlaying(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <img
              src={advisersImage}
              alt=""
              width={1408}
              height={1008}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-primary/60 via-primary/15 to-primary/5"
              aria-hidden
            />
            <button
              type="button"
              disabled={!src}
              onClick={() => setPlaying(true)}
              aria-label={src ? `Play ${video.title}` : `${video.title} (not yet available)`}
              className="absolute top-1/2 left-1/2 grid size-18 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary/85 text-primary-foreground ring-8 ring-primary-foreground/25 backdrop-blur-sm transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed sm:size-20"
            >
              <Play className="ml-1 size-7 fill-current" aria-hidden />
            </button>
            <span className="absolute right-3 bottom-3 rounded-md bg-primary/80 px-2 py-1 text-xs text-primary-foreground tabular-nums">
              {src ? (duration !== null ? formatDuration(duration) : "Video") : video.pendingNote}
            </span>
            {src && (
              // Loads only the metadata so the real duration can be shown before playback.
              <video
                src={src}
                preload="metadata"
                hidden
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              />
            )}
          </>
        )}
      </div>
      <div className="flex items-start gap-4 px-2 pt-4 pb-2 sm:px-3">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-tint text-primary"
          aria-hidden
        >
          <Video className="size-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-base leading-snug sm:text-lg">{video.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{video.body}</p>
        </div>
      </div>
    </div>
  );
}

function Insights() {
  return (
    <Section id="insights">
      <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05]">
        Latest From <span className="text-primary">WorthPrime Tax</span>
      </h2>
      <Link
        to="/insights"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-hero px-6 py-3 text-sm font-semibold text-hero-foreground transition-transform hover:scale-[1.03]"
      >
        See All Insights <ArrowRight className="size-4" />
      </Link>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {INSIGHTS.map((a, i) => (
          <Reveal key={i} delay={i * 80}>
            <InsightCard insight={a} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// One icon per FAQS entry, in order: pricing, clients, IRS notice, documents, timing.
const FAQ_ICONS = [CircleDollarSign, Users, FileText, Folder, CalendarDays];

function Faq() {
  // Pricing (the first question) starts open.
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-background via-tint/50 to-background"
        aria-hidden
      />
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
        <div>
          <h2 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.04] font-bold tracking-[-0.02em] text-primary">
            Questions, <span className="block text-brand-secondary">Answered.</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/80 sm:text-base">
            {FAQ_INTRO}
          </p>
          <Link
            to="/"
            hash="contact-form"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px] shadow-primary/70 transition-transform hover:scale-[1.03]"
          >
            Contact Us <ArrowRight className="size-4" aria-hidden />
          </Link>
          <FaqIllustration className="mt-5 hidden max-w-[14rem] lg:block" />
        </div>

        <ul className="space-y-2.5">
          {FAQS.map((f, i) => {
            const Icon = FAQ_ICONS[i] ?? FileText;
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li
                key={f.q}
                className={cn(
                  "rounded-2xl border shadow-[0_14px_34px_-28px] shadow-primary/60 transition-colors duration-300",
                  isOpen ? "border-brand-secondary/30 bg-tint/70" : "border-border bg-card",
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left sm:gap-4 sm:px-5 sm:py-3.5"
                  >
                    <span className="grid shrink-0 place-items-center text-primary" aria-hidden>
                      <Icon className="size-6.5" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-primary sm:text-base">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-primary transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="mx-4 border-t border-brand-secondary/15 pt-3 pb-4 text-sm leading-relaxed text-foreground/80 sm:mr-5 sm:ml-[4.25rem]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
