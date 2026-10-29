import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  formatInsightDate,
  HAS_LINKEDIN,
  INSIGHTS,
  INSIGHTS_PAGE,
  insightReadMinutes,
  type Insight,
} from "@/data/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/primitives";
import { InsightTag } from "@/components/site/ArticleCard";
import { INSIGHT_IMAGES } from "@/components/site/insightImages";
import { LinkedInBand } from "@/components/site/LinkedInBand";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/insights/")({
  head: () =>
    seoHead({
      title: INSIGHTS_PAGE.title,
      description: INSIGHTS_PAGE.description,
      path: "/insights",
    }),
  component: InsightsPage,
});

/** How long each article stays in the featured card before the next one fades in. */
const ROTATE_MS = 2000;

function InsightsPage() {
  // The featured card cycles through every article; the Latest Articles row it shows is highlighted.
  const [featured, setFeatured] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || INSIGHTS.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFeatured((i) => (i + 1) % INSIGHTS.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <>
      <section className="bg-linear-to-b from-tint to-background pt-9 pb-8 sm:pt-10 sm:pb-10">
        <Container>
          <h1 className="font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-bold tracking-[-0.01em] text-primary">
            {INSIGHTS_PAGE.heading} {INSIGHTS_PAGE.headingMuted}
          </h1>

          <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8">
            <FeaturedRotator
              insights={INSIGHTS}
              active={featured}
              onSelect={setFeatured}
              onPause={setPaused}
            />
            <LatestArticles insights={INSIGHTS} activeSlug={INSIGHTS[featured]?.slug} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="explore-by-topic" className="pb-8 sm:pb-10">
        <Container>
          <TopicCarousel insights={INSIGHTS} />

          {HAS_LINKEDIN && (
            <div className="mt-6">
              <LinkedInBand />
            </div>
          )}
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {INSIGHTS_PAGE.disclaimer}
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

function ReadTime({ insight }: { insight: Insight }) {
  return <>{insightReadMinutes(insight)} min read</>;
}

/**
 * Large featured card that fades from one article to the next. Hovering or focusing it pauses the
 * rotation; the dots pick an article directly.
 */
function FeaturedRotator({
  insights,
  active,
  onSelect,
  onPause,
}: {
  insights: Insight[];
  active: number;
  onSelect: (index: number) => void;
  onPause: (paused: boolean) => void;
}) {
  return (
    <section
      aria-label="Featured articles"
      className="relative min-h-[22rem] overflow-hidden rounded-xl bg-hero shadow-[0_24px_50px_-36px] shadow-primary/70 sm:min-h-[26rem] lg:min-h-[23rem]"
      onMouseEnter={() => onPause(true)}
      onMouseLeave={() => onPause(false)}
      onFocus={() => onPause(true)}
      onBlur={() => onPause(false)}
    >
      {insights.map((insight, i) => (
        <FeaturedArticle key={insight.slug} insight={insight} visible={i === active} />
      ))}

      {insights.length > 1 && (
        <div className="absolute top-6 right-5 flex items-center gap-1.5 sm:right-6">
          {insights.map((insight, i) => (
            <button
              key={insight.slug}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Show article ${i + 1}: ${insight.title}`}
              aria-current={i === active}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active
                  ? "w-5 bg-hero-foreground"
                  : "w-2 bg-hero-foreground/50 hover:bg-hero-foreground/80",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/** One article in the featured card: photo, with its copy over a navy fade at the bottom. */
function FeaturedArticle({ insight, visible }: { insight: Insight; visible: boolean }) {
  const image = INSIGHT_IMAGES[insight.slug];
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: insight.slug }}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "group absolute inset-0 isolate flex flex-col justify-end overflow-hidden text-hero-foreground transition-opacity duration-700",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-t from-hero/95 via-hero/45 via-45% to-transparent"
        aria-hidden
      />

      <InsightTag
        tag={insight.tag}
        className="absolute top-5 left-5 rounded-md bg-card px-3 text-primary shadow-sm sm:top-6 sm:left-6"
      />

      <div className="p-5 sm:p-7">
        <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-hero-foreground/85 uppercase">
          <time dateTime={insight.date}>{formatInsightDate(insight.date)}</time>
          <span className="mx-2.5 text-hero-foreground/50" aria-hidden>
            |
          </span>
          <ReadTime insight={insight} />
        </p>
        <h2 className="mt-2.5 max-w-xl font-serif text-[clamp(1.6rem,2.6vw,2.15rem)] leading-[1.15] font-bold text-hero-foreground">
          {insight.title}
        </h2>
        <p className="mt-2.5 max-w-xl text-[0.95rem] leading-snug text-hero-foreground/85">
          {insight.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-[0.95rem] font-semibold">
          Read full article
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

/**
 * "Latest Articles" list beside the featured card: thumbnail, tag, date, title, read time. The row
 * for the article now in the featured card is highlighted.
 */
function LatestArticles({ insights, activeSlug }: { insights: Insight[]; activeSlug?: string }) {
  return (
    <section aria-labelledby="latest-articles" className="min-w-0">
      <div className="flex items-end justify-between gap-4">
        <h2
          id="latest-articles"
          className="font-serif text-[clamp(1.5rem,2.2vw,1.85rem)] leading-tight font-bold text-primary"
        >
          {INSIGHTS_PAGE.latestHeading}
        </h2>
      </div>

      <ul className="mt-3 divide-y divide-border">
        {insights.map((insight) => {
          const image = INSIGHT_IMAGES[insight.slug];
          return (
            <li key={insight.slug}>
              <Link
                to="/insights/$slug"
                params={{ slug: insight.slug }}
                className={cn(
                  "group -mx-2 flex items-center gap-4 rounded-lg px-2 py-3 transition-colors duration-500",
                  insight.slug === activeSlug && "bg-tint",
                )}
              >
                {image && (
                  <img
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="aspect-[3/2] w-24 shrink-0 rounded-md object-cover sm:w-28"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <InsightTag tag={insight.tag} className="px-2 py-0.5 text-[0.5625rem]" />
                    <time
                      dateTime={insight.date}
                      className="text-xs whitespace-nowrap text-muted-foreground"
                    >
                      {formatInsightDate(insight.date)}
                    </time>
                  </div>
                  <h3 className="mt-1 font-serif text-[0.95rem] leading-snug font-bold text-primary group-hover:underline">
                    {insight.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <ReadTime insight={insight} />
                  </p>
                </div>
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-primary transition-colors group-hover:bg-tint"
                  aria-hidden
                >
                  <ChevronRight className="size-4" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** "Explore by Topic": a row of horizontal article cards, swiped sideways on narrow screens. */
function TopicCarousel({ insights }: { insights: Insight[] }) {
  return (
    <>
      <h2
        id="explore-by-topic"
        className="font-serif text-[clamp(1.5rem,2.2vw,1.85rem)] leading-tight font-bold text-primary"
      >
        {INSIGHTS_PAGE.topicsHeading}
      </h2>

      <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {insights.map((insight) => {
          const image = INSIGHT_IMAGES[insight.slug];
          return (
            <article
              key={insight.slug}
              // `relative` keeps the card's sr-only text inside the scroller; without it that
              // absolutely positioned text escaped to the page and widened it on phones.
              className="group relative flex shrink-0 basis-[88%] snap-start gap-4 rounded-xl border border-border bg-card p-3 sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
            >
              {image && (
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  className="w-[34%] shrink-0 self-stretch rounded-md object-cover"
                />
              )}
              <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
                <div className="flex flex-wrap items-center gap-2">
                  <InsightTag tag={insight.tag} className="px-2 py-0.5 text-[0.5625rem]" />
                  <time dateTime={insight.date} className="text-xs text-muted-foreground">
                    {formatInsightDate(insight.date)}
                  </time>
                </div>
                <h3 className="mt-2 font-serif text-[0.95rem] leading-snug font-bold text-primary">
                  {insight.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {insight.excerpt}
                </p>
                <Link
                  to="/insights/$slug"
                  params={{ slug: insight.slug }}
                  className="mt-3 inline-flex items-center gap-2 self-start text-xs font-semibold text-primary"
                >
                  Read article
                  <span className="sr-only">: {insight.title}</span>
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
