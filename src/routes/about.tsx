import { createFileRoute, Link } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Play,
  ShieldCheck,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FOUNDERS, OFFICES } from "@/data/site";
import { CountUp, Reveal, Section, SectionLabel } from "@/components/site/primitives";
// import { CtaBand } from "@/components/site/CtaBand";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import advisersImage from "@/assets/worthprime-advisers-blue.webp";
import { FOUNDER_PHOTOS } from "@/components/site/founderPhotos";
import aboutHeroImage from "@/assets/about hero.png";
import aboutHeroMobileImage from "@/assets/about-hero-mobile.webp";
import { PricingMarquee } from "@/components/site/PricingMarquee";

const TITLE = "About WorthPrime Tax | Built on Experience";
const DESCRIPTION =
  "Co-founded in 2020, WorthPrime Tax combines Big Four experience across accounting, taxation, audit, payroll, legal and compliance in the U.S., UAE and India.";

const HEADING = "font-serif font-bold leading-[1.08] tracking-[-0.01em] text-primary";

const HERO_POINTS = [
  // { icon: ChartColumn, label: "Sound Structure" },
  { icon: ShieldCheck, label: "Trusted Guidance" },
  { icon: Users, label: "Confident Decisions" },
];

const PILLARS = [
  {
    title: "Our Foundation",
    text: "A vision to deliver reliable, client-centric tax and advisory services.",
  },
  {
    title: "Our Expertise",
    text: "Deep experience across accounting, taxation, audit, payroll, legal and compliance.",
  },
  {
    title: "Our Partnership",
    text: "Helping individuals and businesses navigate financial decisions with confidence.",
  },
];

// Mark is either an icon or a short monogram, drawn in a soft circle like the mockup.
const CREDENTIALS: { label: string; text: string; icon?: LucideIcon; monogram?: string }[] = [
  { label: "CPA", text: "Certified Public Accountant", icon: Users },
  { label: "Enrolled Agent", text: "IRS Enrolled Agent", monogram: "EA" },
  { label: "AICPA", text: "American Institute of CPAs", icon: BadgeCheck },
  { label: "IRS", text: "Authorized E-File Provider", icon: ShieldCheck },
];

// Landmark drawing per office, in OFFICES order.
const OFFICE_LANDMARKS = [StatueOfLiberty, BurjKhalifa, IndiaGate];

/*
 * World land for the dotted map, generated from Natural Earth 1:110m land (public domain):
 * a 144×52 grid of 2.5° cells from 75°N and 180°W, listing the land column
 * ranges in each row.
 */
const MAP_COLS = 144;
const MAP_ROWS = 52;
const LAND: [number, number][][] = [
  [
    [22, 25],
    [34, 35],
    [37, 37],
    [50, 63],
    [93, 94],
    [105, 116],
    [128, 128],
  ],
  [
    [0, 0],
    [9, 9],
    [23, 23],
    [25, 29],
    [33, 34],
    [36, 42],
    [51, 62],
    [93, 94],
    [99, 101],
    [103, 123],
    [125, 132],
  ],
  [
    [0, 4],
    [26, 26],
    [28, 28],
    [30, 33],
    [37, 37],
    [40, 41],
    [45, 50],
    [61, 78],
    [87, 92],
    [94, 94],
    [99, 99],
    [101, 101],
  ],
  [
    [4, 5],
    [38, 41],
    [47, 50],
    [58, 64],
    [66, 76],
    [86, 86],
    [88, 89],
  ],
  [
    [8, 35],
    [37, 37],
    [39, 39],
    [43, 45],
    [51, 55],
    [64, 64],
    [76, 79],
    [81, 142],
  ],
  [
    [6, 33],
    [41, 42],
    [52, 54],
    [74, 78],
    [81, 134],
    [136, 140],
  ],
  [
    [7, 10],
    [17, 34],
    [41, 44],
    [46, 46],
    [74, 78],
    [81, 128],
    [136, 136],
  ],
  [
    [8, 8],
    [19, 36],
    [41, 46],
    [70, 70],
    [75, 75],
    [77, 77],
    [80, 126],
    [134, 136],
  ],
  [
    [20, 38],
    [40, 48],
    [68, 69],
    [71, 71],
    [75, 127],
    [134, 135],
  ],
  [
    [21, 49],
    [70, 127],
  ],
  [
    [22, 43],
    [45, 45],
    [48, 50],
    [70, 127],
  ],
  [
    [22, 45],
    [71, 83],
    [85, 85],
    [87, 91],
    [93, 126],
  ],
  [
    [22, 43],
    [71, 74],
    [76, 76],
    [78, 82],
    [88, 90],
    [92, 125],
    [129, 129],
  ],
  [
    [22, 42],
    [68, 72],
    [77, 78],
    [80, 83],
    [85, 86],
    [88, 91],
    [94, 123],
    [128, 128],
  ],
  [
    [23, 41],
    [68, 71],
    [78, 78],
    [80, 80],
    [83, 91],
    [94, 118],
    [122, 122],
    [128, 128],
  ],
  [
    [23, 41],
    [72, 75],
    [85, 119],
    [123, 123],
    [126, 127],
  ],
  [
    [25, 40],
    [69, 75],
    [86, 119],
    [125, 125],
  ],
  [
    [25, 25],
    [27, 38],
    [68, 78],
    [80, 82],
    [84, 84],
    [86, 120],
  ],
  [
    [26, 33],
    [39, 39],
    [68, 90],
    [92, 120],
  ],
  [
    [28, 32],
    [39, 39],
    [66, 85],
    [87, 91],
    [94, 119],
  ],
  [
    [29, 32],
    [66, 85],
    [87, 94],
    [99, 118],
    [120, 120],
  ],
  [
    [30, 32],
    [36, 36],
    [65, 86],
    [88, 95],
    [100, 106],
    [109, 114],
  ],
  [
    [30, 33],
    [35, 36],
    [43, 44],
    [66, 86],
    [88, 94],
    [101, 105],
    [110, 113],
    [115, 115],
  ],
  [
    [33, 36],
    [65, 87],
    [89, 92],
    [101, 104],
    [111, 114],
    [120, 120],
  ],
  [
    [36, 38],
    [65, 90],
    [102, 103],
    [111, 115],
    [120, 121],
  ],
  [
    [42, 42],
    [44, 44],
    [66, 88],
    [91, 91],
    [102, 103],
    [111, 111],
    [113, 114],
  ],
  [
    [39, 39],
    [41, 47],
    [67, 91],
    [111, 111],
    [122, 122],
  ],
  [
    [41, 48],
    [68, 72],
    [74, 91],
    [104, 104],
    [112, 112],
  ],
  [
    [41, 51],
    [76, 90],
    [111, 112],
    [117, 118],
  ],
  [
    [40, 51],
    [76, 89],
    [112, 113],
    [116, 118],
  ],
  [
    [40, 53],
    [76, 88],
    [112, 113],
    [116, 118],
    [120, 120],
    [124, 125],
  ],
  [
    [40, 56],
    [76, 87],
    [113, 113],
    [120, 120],
    [126, 129],
  ],
  [
    [40, 57],
    [77, 87],
    [114, 114],
    [127, 130],
  ],
  [
    [40, 57],
    [77, 87],
    [119, 120],
    [122, 122],
    [128, 128],
  ],
  [
    [41, 56],
    [77, 87],
  ],
  [
    [41, 55],
    [77, 87],
    [91, 91],
    [124, 125],
  ],
  [
    [43, 55],
    [77, 87],
    [90, 91],
    [121, 126],
    [129, 129],
  ],
  [
    [44, 55],
    [77, 85],
    [90, 91],
    [121, 130],
  ],
  [
    [44, 55],
    [77, 85],
    [89, 90],
    [118, 131],
  ],
  [
    [44, 53],
    [78, 85],
    [89, 90],
    [117, 131],
  ],
  [
    [44, 52],
    [78, 84],
    [117, 132],
  ],
  [
    [43, 51],
    [79, 84],
    [118, 132],
  ],
  [
    [43, 51],
    [79, 83],
    [118, 132],
  ],
  [
    [43, 50],
    [79, 81],
    [118, 121],
    [126, 132],
  ],
  [
    [43, 48],
    [128, 131],
  ],
  [
    [43, 47],
    [130, 130],
    [142, 142],
  ],
  [
    [42, 45],
    [130, 130],
    [141, 141],
  ],
  [
    [43, 45],
    [140, 140],
  ],
  [
    [42, 44],
    [139, 139],
  ],
  [[42, 44]],
  [
    [42, 43],
    [48, 48],
  ],
  [[43, 44]],
];
const LAND_DOTS = LAND.flatMap((ranges, row) =>
  ranges.flatMap(([from, to]) =>
    Array.from({ length: to - from + 1 }, (_, i) => ({ x: from + i + 0.5, y: row + 0.5 })),
  ),
);

/** Map grid position for a longitude/latitude. */
const toGrid = (lon: number, lat: number) => ({
  x: (lon + 180) / 2.5,
  y: (75 - lat) / 2.5,
});

// Office pins in OFFICES order: Glastonbury, Dubai, Hyderabad.
const PINS = [
  { name: "USA", ...toGrid(-72.6, 41.7), labelBelow: false },
  { name: "UAE", ...toGrid(55.3, 25.2), labelBelow: true },
  { name: "India", ...toGrid(78.5, 17.4), labelBelow: false },
];

export const Route = createFileRoute("/about")({
  head: () => seoHead({ title: TITLE, description: DESCRIPTION, path: "/about" }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Skip the layout's nav spacer so the photo runs up behind the transparent bar. */}
      {/* Phones (max-sm) follow the service hero: the photo sits behind the copy under a white
          wash so the price strip shows on the first screen. sm and up keep the chevron layout. */}
      <section className="relative isolate overflow-hidden before:!hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden bg-linear-to-r from-background from-55% via-background/85 via-75% to-background/0 max-sm:block"
        />
        {/* Lifts the lower part of the phone photo (navy desk and shelves) so the points stay readable. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 hidden h-2/5 bg-linear-to-t from-background from-30% via-background/80 to-background/0 max-sm:block"
        />
        {/* Phones use a bright office interior (city view, desk on the right) instead of the
            logo-wall photo. */}
        <img
          src={aboutHeroMobileImage}
          alt=""
          width={1024}
          height={1536}
          className="absolute inset-0 -z-20 hidden size-full object-cover object-[right_top] max-sm:block"
        />
        {/* Chevron for the hero photo: rounded point on the left, matching rounded notch on the right. */}
        <svg width="0" height="0" className="absolute" aria-hidden>
          <clipPath id="about-hero-shape" clipPathUnits="objectBoundingBox">
            <path d="M0.18,0 L0.84,0 L0.752,0.2 Q0.73,0.25 0.748,0.3 L1,1 L0.35,1 L0.023,0.3 Q0,0.25 0.036,0.2 Z" />
          </clipPath>
        </svg>
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 max-sm:gap-6 lg:grid-cols-[1fr_1.15fr_auto] lg:gap-0">
          <div className="px-5 pt-24 sm:px-8 lg:pt-28 lg:pb-16 lg:pl-[max(2rem,calc((100vw-1200px)/2))]">
            <h1
              className={cn(
                "text-[clamp(2.3rem,3.9vw,3.6rem)] max-sm:text-[1.95rem] max-sm:leading-[1.05]",
                HEADING,
              )}
            >
              Experienced Professionals. <span className="block">Real Perspective.</span>
            </h1>
            {/* Phones only: a short rule under the heading, and the hero buttons below the intro. */}
            <span
              className="mt-5 hidden h-0.5 w-12 rounded-full bg-brand-secondary/60 max-sm:block"
              aria-hidden
            />
            <p className="mt-6 max-w-xl leading-relaxed max-sm:mt-4 max-sm:max-w-[16.5rem] max-sm:text-[0.875rem] max-sm:text-foreground/80">
              WorthPrime Tax brings together deep domain expertise, practical guidance and a
              client-centric approach to help individuals and businesses navigate U.S. tax
              requirements with confidence.
            </p>
            {/* Phones only: the same two buttons as the home hero, in one row. */}
            <div className="mt-6 hidden gap-2 max-sm:flex">
              <Link
                to="/services"
                className="inline-flex flex-auto items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-3 text-[0.8125rem] leading-[1.43] font-semibold whitespace-nowrap text-primary-foreground"
              >
                <span>
                  {/* "Explore" is dropped on the narrowest phones so both buttons still fit. */}
                  <span className="hidden min-[360px]:inline">Explore </span>Our Services
                </span>
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to="/contact"
                className="inline-flex flex-auto items-center justify-center rounded-md border border-primary bg-background px-3 py-3 text-[0.8125rem] leading-[1.43] font-semibold whitespace-nowrap text-primary"
              >
                Request a Quote
              </Link>
            </div>
          </div>
          <img
            src={aboutHeroImage}
            alt="WorthPrime logo on a marble office wall"
            width={1672}
            height={941}
            className="aspect-[4/3] h-full w-full object-cover object-[60%_center] [clip-path:url(#about-hero-shape)] max-sm:hidden lg:aspect-auto lg:min-h-[560px]"
          />
          <div className="flex flex-col justify-between gap-8 px-5 pb-8 sm:px-8 lg:h-full lg:pt-24 lg:pb-10 lg:pr-[max(2rem,calc((100vw-1200px)/2))] lg:pl-6">
            <ul className="flex flex-wrap gap-5 max-sm:grid max-sm:grid-cols-2 max-sm:gap-0 max-sm:divide-x max-sm:divide-border lg:flex-col lg:gap-7">
              {HERO_POINTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm font-semibold text-primary max-sm:px-4 max-sm:first:pl-0"
                >
                  <IconCircle className="max-sm:border-transparent max-sm:bg-muted">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </IconCircle>
                  <span className="max-w-24 leading-snug">{label}</span>
                </li>
              ))}
            </ul>
            <p className="hidden text-xs leading-loose tracking-[0.2em] text-muted-foreground uppercase lg:block">
              People
              <br />
              Process
              <br />
              Perspective
            </p>
          </div>
        </div>
      </section>

      <PricingMarquee />

      <section className="border-y border-border bg-card">
        <dl className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-5 py-8 max-sm:gap-0 max-sm:py-3 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-border">
          <Stat
            value={<CountUp value={15} suffix="+" />}
            label="Years of Combined Leadership Experience"
            icon={Trophy}
          />
          <Stat value={<CountUp value={500} suffix="+" />} label="Satisfied Clients" icon={Users} />
          <Stat value={<CountUp value={3} />} label="Global Offices" icon={MapPin} />
          <Stat value="End-to-end" label="Tax & Compliance Support" icon={FileText} />
        </dl>
      </section>

      <section id="foundation" className="scroll-mt-24 bg-muted/40">
        <div className="mx-auto grid max-w-[1440px] items-center lg:grid-cols-2">
          <div className="relative">
            <img
              src={aboutHeroImage}
              alt="WorthPrime logo on a marble wall"
              width={1672}
              height={941}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover object-[45%_center] lg:aspect-auto lg:h-[480px]"
            />
            <div className="relative mx-5 -mt-16 bg-card p-5 shadow-xl sm:mx-8 lg:absolute lg:right-0 lg:top-1/2 lg:mx-0 lg:mt-0 lg:w-[220px] lg:-translate-y-1/2 lg:translate-x-1/4">
              <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
                Our Foundation
              </p>
              <span className="mt-3 block h-px w-24 bg-primary/40" aria-hidden />
              <h2 className={cn("mt-5 text-[clamp(1.3rem,1.9vw,1.7rem)]", HEADING)}>
                A Stronger Foundation for What's Next.
              </h2>
            </div>
          </div>
          <div className="px-5 py-12 max-sm:py-8 sm:px-8 lg:py-16 lg:pr-[max(2rem,calc((100vw-1200px)/2))] lg:pl-32">
            <p className="max-w-xl text-sm leading-relaxed">
              WorthPrime Tax was built on the belief that every financial decision deserves clarity,
              structure and the right perspective. We combine institutional experience with
              personalised guidance to help clients stay compliant and make confident decisions —
              today and for the future.
            </p>
            {/* Phones (max-sm): each pillar is a row, number on the left joined by a vertical line. */}
            <ol className="relative mt-10 grid gap-8 max-sm:mt-7 max-sm:gap-5 sm:grid-cols-3">
              <span
                className="absolute top-5 bottom-11 left-[1.125rem] hidden w-px bg-primary/30 max-sm:block"
                aria-hidden
              />
              <span
                className="absolute top-5 right-[16%] left-[8%] hidden h-px bg-primary/30 sm:block"
                aria-hidden
              />
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <li className="relative max-sm:grid max-sm:grid-cols-[2.25rem_1fr] max-sm:gap-x-3.5">
                    <span className="grid size-10 place-items-center rounded-full border border-primary bg-card text-xs font-semibold text-primary max-sm:row-span-2 max-sm:size-9">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-primary max-sm:mt-1.5">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground max-sm:mt-1">
                      {p.text}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Founders />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionLabel>Professional Standards</SectionLabel>
            <h2 className={cn("mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)]", HEADING)}>
              Expertise You Can Rely On.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Our team holds recognised professional credentials and maintains compliance with the
            highest industry standards.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {CREDENTIALS.map(({ label, text, icon: Icon, monogram }) => (
            <li key={label} className="flex items-center gap-4 lg:px-6 lg:first:pl-0">
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-muted text-primary">
                {Icon ? (
                  <Icon className="size-7" strokeWidth={1.4} aria-hidden />
                ) : (
                  <span className="font-serif text-2xl font-bold">{monogram}</span>
                )}
              </span>
              <span>
                <span className="block text-sm font-semibold text-primary">{label}</span>
                <span className="text-xs text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.5fr_0.95fr] lg:items-center lg:gap-6">
          <div>
            <SectionLabel>Our Presence</SectionLabel>
            <h2 className={cn("mt-4 text-[clamp(1.7rem,2.3vw,2.2rem)]", HEADING)}>
              Local Understanding. Global Perspective.
            </h2>
            <p className="mt-5 text-sm text-muted-foreground">
              With offices in the U.S., UAE and India, we bring a global outlook and local insight
              to serve individuals and businesses across borders.
            </p>
          </div>
          <PresenceMap />
          <ul className="grid gap-3">
            {OFFICES.map((o, i) => {
              const Landmark = OFFICE_LANDMARKS[i] ?? StatueOfLiberty;
              return (
                <li
                  key={o.label}
                  className="flex items-center gap-4 rounded-xl bg-card px-4 py-3.5 shadow-[0_10px_30px_-18px] shadow-primary/40"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-muted text-primary">
                    <Landmark />
                  </span>
                  <span className="block min-w-0">
                    <span className="block text-sm leading-snug font-semibold text-primary">
                      {o.label}
                    </span>
                    <span className="mt-1 block text-xs leading-normal text-muted-foreground">
                      {o.address}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-2">
          <div className="px-5 pt-12 sm:px-8 lg:py-16 lg:pl-[max(2rem,calc((100vw-1200px)/2))]">
            <SectionLabel>Get to Know WorthPrime</SectionLabel>
            <h2 className={cn("mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)]", HEADING)}>
              Meet the People Behind the Expertise.
            </h2>
            <p className="mt-5 max-w-lg text-sm text-muted-foreground">
              A closer look into our approach, our values and our commitment to helping clients make
              informed financial decisions.
            </p>
            <p className="mt-6 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
                <Play className="size-5" aria-hidden />
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-primary">Play Company Video</span>
                <span className="text-muted-foreground">[Video — client to supply]</span>
              </span>
            </p>
          </div>
          <img
            src={aboutHeroImage}
            alt="WorthPrime office with logo wall"
            width={1672}
            height={941}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover lg:h-[340px]"
          />
        </div>
      </section>

      {/* <CtaBand /> */}
    </>
  );
}

function IconCircle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Phones (max-sm) get a 2×2 grid split by hairlines, with the icon in a soft circle left of the
 * figure; the icon only shows there.
 */
function Stat({ value, label, icon: Icon }: { value: ReactNode; label: string; icon: LucideIcon }) {
  return (
    <div className="lg:px-10 lg:first:pl-0 max-sm:relative max-sm:border-border max-sm:py-4 max-sm:pl-12 max-sm:odd:border-r max-sm:odd:pr-2 max-sm:even:ml-3 max-sm:[&:nth-child(-n+2)]:border-b">
      <dt className="sr-only">{label}</dt>
      <dd
        className={cn(
          "text-[clamp(1.6rem,2.6vw,2.1rem)] max-sm:text-[1.3rem] max-sm:leading-tight",
          HEADING,
        )}
      >
        <span
          className="absolute top-4 left-0 hidden size-9 place-items-center rounded-full bg-muted text-primary max-sm:grid"
          aria-hidden
        >
          <Icon className="size-[1.125rem]" strokeWidth={1.6} />
        </span>
        {value}
      </dd>
      <dd className="mt-2 text-xs text-muted-foreground max-sm:mt-1 max-sm:leading-snug">
        {label}
      </dd>
    </div>
  );
}

/** Dotted world map with a WP pin on each office, joined by arcs from the U.S. headquarters. */
function PresenceMap() {
  const [hq, ...branches] = PINS;
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${MAP_COLS} / ${MAP_ROWS}` }}
      role="img"
      aria-label="World map with offices in the USA, UAE and India"
    >
      <svg
        className="absolute inset-0 size-full"
        viewBox={`0 0 ${MAP_COLS} ${MAP_ROWS}`}
        aria-hidden
      >
        <g className="fill-muted-foreground/30">
          {LAND_DOTS.map((d) => (
            <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={0.32} />
          ))}
        </g>
        <g className="stroke-primary/50" fill="none" strokeWidth={0.22}>
          {branches.map((b) => (
            <path
              key={b.name}
              d={`M${hq.x},${hq.y} Q${(hq.x + b.x) / 2},${hq.y - 16} ${b.x},${b.y}`}
            />
          ))}
        </g>
      </svg>
      {PINS.map((p) => (
        // The badge is centred on the office; the label hangs off it so it doesn't shift the badge.
        <span
          key={p.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(p.x / MAP_COLS) * 100}%`, top: `${(p.y / MAP_ROWS) * 100}%` }}
        >
          <span className="grid size-6 place-items-center rounded-full bg-primary font-serif text-[0.5rem] font-bold text-primary-foreground shadow-md ring-2 ring-card sm:size-7 sm:text-[0.6rem]">
            WP
          </span>
          <span
            className={cn(
              "absolute text-[0.7rem] font-semibold whitespace-nowrap text-primary sm:text-xs",
              p.labelBelow
                ? "top-full left-1/2 mt-1 -translate-x-1/2"
                : "top-1/2 left-full ml-1.5 -translate-y-1/2",
            )}
          >
            {p.name}
          </span>
        </span>
      ))}
    </div>
  );
}

// Line drawings of each office city's landmark, sized for the office cards.
function LandmarkSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 40 48"
      className="h-11 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function StatueOfLiberty() {
  return (
    <LandmarkSvg>
      {/* torch and raised arm */}
      <path d="M25 3l2 3h-4zM25 6v3M24 9l-3 9" />
      {/* crown and head */}
      <path d="M15 13l1.5 2M17.5 11.5l.5 2.5M20 11l-.5 2.5M22.5 12l-1.5 2" />
      <circle cx={18.5} cy={16.5} r={2.2} />
      {/* robe and tablet */}
      <path d="M16 19c-2 4-2 10-3 16h12c-1-6-1-12-3-16" />
      <path d="M13 22l-2 5 3 1M18 24l1 6M21 25l-1 7" />
      {/* pedestal */}
      <path d="M12 35h16v4H12zM10 39h20v6H10zM16 41h8" />
    </LandmarkSvg>
  );
}

function BurjKhalifa() {
  return (
    <LandmarkSvg>
      <path d="M20 2v6" />
      <path d="M18.5 8h3l1 8 1.5 1 1 9 2 1 1 10 2 1v7H10v-7l2-1 1-10 2-1 1-9 1.5-1z" />
      <path d="M20 10v35M16.5 18v27M23.5 18v27M13 28v17M27 28v17" />
      <path d="M6 45h28" />
    </LandmarkSvg>
  );
}

function IndiaGate() {
  return (
    <LandmarkSvg>
      {/* cornice and dome */}
      <path d="M17 8c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5M14 8h12M12 11h16" />
      {/* main block with arch */}
      <path d="M8 14h24v4H8zM9 18h22v26H9z" />
      <path d="M15 44V30c0-3 2.2-5 5-5s5 2 5 5v14" />
      {/* side panels */}
      <path d="M11 22v4h2v-4zM27 22v4h2v-4zM11 32v8M29 32v8" />
      <path d="M5 44h30" />
    </LandmarkSvg>
  );
}

function Founders() {
  const [open, setOpen] = useState<number | null>(null);
  const scroll = (dir: number) =>
    document.getElementById("founders-track")?.scrollBy({ left: dir * 400, behavior: "smooth" });
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionLabel>Co-Founders</SectionLabel>
          <h2 className={cn("mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)]", HEADING)}>
            Leadership Grounded in Experience.
          </h2>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Our co-founders bring a unique combination of global experience, professional expertise
            and an entrepreneurial mindset to WorthPrime Tax.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            {[
              { dir: -1, Icon: ChevronLeft, label: "Previous co-founder" },
              { dir: 1, Icon: ChevronRight, label: "Next co-founder" },
            ].map(({ dir, Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => scroll(dir)}
                className="grid size-9 place-items-center rounded-full border border-border bg-card text-primary hover:bg-muted"
              >
                <Icon className="size-4" aria-hidden />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        id="founders-track"
        className="mt-8 grid snap-x snap-mandatory auto-cols-[minmax(300px,1fr)] grid-flow-col gap-6 overflow-x-auto pb-2 lg:auto-cols-[calc(50%-12px)]"
      >
        {FOUNDERS.map((f, i) => (
          <article
            key={f.name}
            className="group grid snap-start overflow-hidden bg-card shadow-sm transition duration-300 ease-out focus-within:-translate-y-1 focus-within:shadow-xl hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:grid-cols-[0.8fr_1fr]"
          >
            {/* Subtle reveal on hover or focus: the photo eases in and the credential slides up over it. */}
            <div className="relative overflow-hidden">
              <img
                src={FOUNDER_PHOTOS[i] ?? advisersImage}
                alt={
                  FOUNDER_PHOTOS[i]
                    ? `Portrait of ${f.name}`
                    : "Professional advisers in consultation"
                }
                width={1408}
                height={1008}
                loading="lazy"
                className="h-full min-h-56 w-full object-cover object-top transition-transform duration-700 ease-out group-focus-within:scale-105 group-hover:scale-105 motion-reduce:transition-none"
              />
              <div
                className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-hero/90 via-hero/70 to-transparent px-4 pt-10 pb-4 opacity-0 transition duration-500 ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
                aria-hidden
              >
                <p className="text-xs leading-snug font-medium text-hero-foreground">
                  {f.credential}
                </p>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-bold text-primary">{f.name}</h3>
              <p className="mt-1 text-[0.65rem] font-semibold tracking-[0.2em] text-primary uppercase">
                {f.title}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">{f.credential}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{f.summary}</p>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Read Full Biography
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden
                />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
        <h3 className={cn("text-[clamp(1.6rem,2.6vw,2.2rem)]", HEADING)}>
          Two Perspectives. One Purpose.
        </h3>
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Together, the co-founders bring a distinctive combination of Big Four experience,
            technical expertise, leadership, entrepreneurial thinking and hands-on knowledge of
            businesses at different stages of growth—from establishing processes at inception to
            addressing complex financial, tax and regulatory requirements.
          </p>
          <p>
            At WorthPrime Tax, this collective experience is grounded in a simple conviction:
            professional expertise should do more than address obligations. It should bring clarity
            to decisions, strengthen compliance and create a more considered path forward for the
            businesses and individuals we serve.
          </p>
        </div>
      </div>

      {/* Full bio opens in a dialog so the cards keep a fixed height. */}
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto p-0 sm:rounded-2xl">
          {open !== null && (
            <>
              <div className="grid gap-5 border-b border-border p-6 sm:grid-cols-[120px_1fr] sm:items-center sm:p-8">
                <img
                  src={FOUNDER_PHOTOS[open] ?? advisersImage}
                  alt=""
                  width={1408}
                  height={1008}
                  className="size-28 rounded-full object-cover object-top"
                />
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl font-bold text-primary">
                    {FOUNDERS[open].name}
                  </DialogTitle>
                  <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-primary uppercase">
                    {FOUNDERS[open].title}
                  </p>
                  <DialogDescription className="text-xs">
                    {FOUNDERS[open].credential}
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="space-y-4 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
                {FOUNDERS[open].bio.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
