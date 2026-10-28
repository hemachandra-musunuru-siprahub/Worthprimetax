import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  Banknote,
  Building,
  Building2,
  Calculator,
  Check,
  ClipboardCheck,
  FileChartColumn,
  FileCheck,
  FileSearch,
  FileText,
  Globe,
  HeartHandshake,
  IdCard,
  Landmark,
  Laptop,
  Mail,
  Network,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getService, HOW_THE_WORK_MOVES, type Service } from "@/data/services";
import { type ServicePage } from "@/data/servicePages";
import { cn } from "@/lib/utils";
import { Container, Reveal } from "./primitives";
import { BackdropHero } from "./BackdropHero";
import { CtaBand } from "./CtaBand";
import { PricingMarquee } from "./PricingMarquee";
import { getServiceThumb, type ServiceDetailMedia } from "./serviceDetailMedia";

// Matched against each capability's text; first match wins, so specific topics come before
// broad ones (an amended 1040 is an amendment, a 1120S is not a 1120).
const CAPABILITY_ICONS: Array<[RegExp, LucideIcon]> = [
  [/amend|-X\b|correction|discrepanc/i, RotateCcw],
  [/planning|strategy/i, TrendingUp],
  [/foreign|international/i, Globe],
  [/payroll|W-2|1099/i, Banknote],
  [/ITIN|W-7/, IdCard],
  [/1040|individual|single owner|single-member/i, User],
  [/1120-?S|S Corp/i, Building2],
  [/1120|C Corp/i, Building],
  [/1065|partnership/i, Users],
  [/990|not for profit|nonprofit/i, HeartHandshake],
  [/audit|SOC 2|internal control/i, ShieldCheck],
  [/correspondence|notice|response/i, Mail],
  [/bank/i, Landmark],
  [/quickbooks|software|setup/i, Laptop],
  [/reconcil/i, ArrowLeftRight],
  [/report|statement|FBAR|FATCA|BOIR/i, FileChartColumn],
  [/document|record|contract|agreement|memorand/i, FileText],
  [/entity|structure/i, Network],
  [/EIN|registration/i, ClipboardCheck],
  [/compliance|requirement/i, FileCheck],
  [/review|analysis/i, FileSearch],
  [/bookkeeping|accounting/i, Calculator],
  [/preparation|filing/i, FileText],
];

function capabilityIcon(text: string) {
  return CAPABILITY_ICONS.find(([pattern]) => pattern.test(text))?.[1] ?? Check;
}

/** "Form 1040 — Individual Tax Returns" → title and subtitle; plain entries have no subtitle. */
function splitCapability(text: string) {
  const [title = text, ...rest] = text.split(/\s+—\s+|:\s+/);
  return { title, detail: rest.join(" ") };
}

function NumberedLabel({
  n,
  children,
  className,
}: {
  n: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase",
        className,
      )}
    >
      {String(n).padStart(2, "0")} / {children}
    </p>
  );
}

function GoldRule({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("block h-[3px] w-14 rounded-full bg-brand-gold", className)} />
  );
}

function SectionIntro({ heading, intro }: { heading: string; intro?: string }) {
  return (
    <>
      {heading && (
        <h2 className="mt-5 max-w-3xl font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] font-semibold text-primary">
          {heading}
        </h2>
      )}
      {intro && <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}
    </>
  );
}

function CapabilityList({ items }: { items: string[] }) {
  // In the three-column grid, stretch the final row so it never ends with a gap.
  const lastRow = items.length % 3;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:auto-rows-fr xl:grid-cols-6">
      {items.map((c, i) => {
        const Icon = capabilityIcon(c);
        const { title, detail } = splitCapability(c);
        const inLastRow = i >= items.length - lastRow;
        return (
          <li
            key={c}
            className={cn(
              "flex min-h-[4.75rem] items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 shadow-[0_12px_30px_-28px] shadow-primary/50 xl:col-span-2",
              items.length % 2 === 1 && i === items.length - 1 && "sm:col-span-2",
              inLastRow && lastRow === 2 && "xl:col-span-3",
              inLastRow && lastRow === 1 && "xl:col-span-6",
            )}
          >
            <Icon className="size-8 shrink-0 text-primary" strokeWidth={1.4} aria-hidden />
            <span className="min-w-0 leading-snug">
              <span className="block font-serif text-[0.95rem] font-semibold text-primary">
                {title}
              </span>
              {detail && <span className="block text-xs text-muted-foreground">{detail}</span>}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Full-width service detail layout: hero, overview, capabilities, audiences, process, related. */
export function ServiceDetailFeature({
  service,
  page,
  media,
}: {
  service: Service;
  page: ServicePage;
  media: ServiceDetailMedia;
}) {
  const related = page.related.items.flatMap((item) => {
    const s = getService(item.slug);
    return s ? [{ service: s, body: item.body }] : [];
  });
  const audiences = page.whoFor.audiences;

  return (
    <>
      <BackdropHero
        // Service pages keep the whole heading in the single brand blue (no bright-blue accent).
        lines={(page.heroBackdrop?.lines ?? [[{ text: page.heading }]]).map((line) =>
          line.map((part) => ({ ...part, accent: false })),
        )}
        intro={page.intro}
        image={media.heroBackdrop}
      />

      <PricingMarquee />

      {/* Overview */}
      <section id="overview" className="scroll-mt-20 py-12 sm:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* The heading sits on one line across the full width, above the text and photo. */}
          <Reveal className="lg:col-span-2">
            <NumberedLabel n={1}>Overview</NumberedLabel>
            <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.12] font-semibold text-primary lg:whitespace-nowrap">
              {page.overview.heading}
            </h2>
          </Reveal>
          <Reveal>
            {page.overview.lead && (
              <p className="mt-3 text-lg font-semibold text-primary">{page.overview.lead}</p>
            )}
            <div className="mt-6 space-y-4">
              {page.overview.paragraphs.map((p) => (
                <p key={p.slice(0, 30)} className="leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            {page.overview.cta && (
              <Link
                to="/contact"
                hash="contact-form"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {page.overview.cta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </Reveal>
          <Reveal delay={100}>
            <img
              src={media.overview.src}
              alt={media.overview.alt}
              width={1200}
              height={543}
              loading="lazy"
              className="aspect-[2.2/1] w-full rounded-2xl object-cover shadow-[0_30px_60px_-36px] shadow-primary/50"
            />
          </Reveal>
        </Container>
      </section>

      {/* What This Can Include */}
      <section className="bg-tint py-12 sm:py-16">
        <Container>
          <NumberedLabel n={2}>What This Can Include</NumberedLabel>
          <SectionIntro heading={page.included.heading} intro={page.included.intro} />
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <img
              src={media.included.src}
              alt={media.included.alt}
              width={1400}
              height={747}
              loading="lazy"
              className="aspect-[16/10] h-full max-h-[52rem] w-full rounded-2xl object-cover lg:aspect-auto"
            />
            <div className="space-y-6">
              {page.included.groups.map((group) => (
                <div key={group.title || "all"}>
                  {group.title && (
                    <h3 className="mb-3 text-[0.75rem] font-semibold tracking-[0.14em] text-primary uppercase">
                      {group.title}
                    </h3>
                  )}
                  <CapabilityList items={group.items} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Who It Is For */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Reveal>
              <NumberedLabel n={3}>Who It Is For</NumberedLabel>
              <h2 className="mt-5 font-serif text-[clamp(1.7rem,2.8vw,2.3rem)] leading-[1.18] font-semibold text-primary">
                {page.whoFor.heading}
              </h2>
              {page.whoFor.intro && (
                <p className="mt-4 leading-relaxed text-muted-foreground">{page.whoFor.intro}</p>
              )}
            </Reveal>
            <Reveal delay={100}>
              <img
                src={media.whoFor.src}
                alt={media.whoFor.alt}
                width={1600}
                height={411}
                loading="lazy"
                className="aspect-[16/7] w-full rounded-2xl object-cover object-[center_30%] sm:aspect-[1600/500]"
              />
            </Reveal>
          </div>
          {audiences.length > 0 && (
            <ul
              className={cn(
                "mt-10 grid gap-4 sm:grid-cols-2",
                audiences.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
              )}
            >
              {audiences.map((a, i) => (
                <li key={a.title}>
                  <Reveal delay={i * 60} className="h-full">
                    <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-[0_16px_36px_-30px] shadow-primary/50">
                      <h3 className="font-serif text-lg leading-snug font-semibold text-primary">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* How the work moves */}
      <section className="pb-12 sm:pb-16">
        <Container>
          <NumberedLabel n={4}>How the Work Moves</NumberedLabel>
          <SectionIntro heading={page.process.heading || "How the Work Moves"} />
          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {HOW_THE_WORK_MOVES.map((s, i) => (
              <li key={s.step}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="relative overflow-hidden rounded-2xl bg-hero shadow-[0_24px_50px_-30px] shadow-primary/70">
                    <img
                      src={media.steps[i]}
                      alt={`${s.title}: ${s.points.join(", ")}`}
                      width={880}
                      height={555}
                      loading="lazy"
                      className="aspect-[880/555] w-full object-cover"
                    />
                    <span
                      aria-hidden
                      className="absolute top-3 left-4 font-serif text-3xl font-semibold text-hero-foreground sm:text-2xl lg:text-3xl"
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3 className="sr-only">
                    {s.step} {s.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {page.process.steps[i] ?? s.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Related Services */}
      <section className="pb-12 sm:pb-16">
        <Container>
          <NumberedLabel n={5}>Related Services</NumberedLabel>
          <SectionIntro
            heading={page.related.heading || "Related Services"}
            intro={page.related.intro}
          />
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map(({ service: s, body }, i) => {
              const thumb = getServiceThumb(s.slug);
              return (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_16px_36px_-30px] shadow-primary/50 transition-[border-color,box-shadow] hover:border-brand-gold/60 hover:shadow-primary/70"
                  >
                    {thumb && (
                      <span className="block overflow-hidden">
                        <img
                          src={thumb}
                          alt=""
                          width={720}
                          height={679}
                          loading="lazy"
                          className="aspect-[2/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </span>
                    )}
                    <span className="flex flex-1 flex-col p-5">
                      <span className="text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 block font-serif text-lg leading-snug font-semibold text-primary">
                        {s.name}
                      </span>
                      <span className="mt-2 block flex-1 text-sm leading-relaxed text-muted-foreground">
                        {body}
                      </span>
                      <ArrowRight
                        className="mt-4 size-5 text-brand-gold transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
