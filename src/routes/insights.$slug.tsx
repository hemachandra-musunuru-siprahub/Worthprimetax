import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  HeartPulse,
  Lightbulb,
  Linkedin,
} from "lucide-react";
import {
  formatInsightDate,
  HAS_LINKEDIN,
  INSIGHTS_PAGE,
  isIndexableInsight,
  SITE,
} from "@/data/site";
import { getInsights } from "@/lib/linkedin-insights";
import { cn } from "@/lib/utils";
import { absoluteUrl, breadcrumbJsonLd, insightCrumbs, jsonLdScript, seoHead } from "@/lib/seo";
import { Container, Section } from "@/components/site/primitives";
import { insightImage } from "@/components/site/insightImages";
import { InsightImage } from "@/components/site/InsightImage";
import { LinkedInBand } from "@/components/site/LinkedInBand";
// import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ params }) => {
    const insights = await getInsights();
    const insight = insights.find((a) => a.slug === params.slug);
    if (!insight) throw notFound();
    // The next few articles, for "More Insights" under the post.
    const related = insights.filter((a) => a.slug !== insight.slug).slice(0, 3);
    return { insight, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article Not Found | WorthPrime Tax" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { insight } = loaderData;
    const path = `/insights/${insight.slug}`;
    const image = insightImage(insight);
    const seo = seoHead({
      title: `${insight.title} | WorthPrime Tax`,
      description: insight.excerpt || insight.title,
      path,
      type: "article",
    });
    return {
      ...seo,
      meta: isIndexableInsight(insight)
        ? seo.meta
        : [...seo.meta, { name: "robots", content: "noindex, follow" }],
      scripts: [
        breadcrumbJsonLd(insightCrumbs(insight)),
        jsonLdScript({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          description: insight.excerpt,
          datePublished: insight.date,
          mainEntityOfPage: absoluteUrl(path),
          ...(image && { image: absoluteUrl(image.src) }),
          author: { "@id": `${SITE.url}/#organization` },
          publisher: { "@id": `${SITE.url}/#organization` },
        }),
      ],
    };
  },
  component: InsightPage,
  notFoundComponent: () => (
    <Section>
      <h1 className="font-serif text-3xl font-bold text-primary">Article Not Found</h1>
      <Link to="/insights" className="mt-4 inline-block text-primary underline">
        Back to all insights
      </Link>
    </Section>
  ),
});

/** Rough reading time at 200 words a minute, never less than one minute. */
function readingMinutes(paragraphs: string[]) {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Short posts (a couple of paragraphs) read better as one highlighted note than as an essay. */
const HIGHLIGHT_MAX_PARAGRAPHS = 2;

function TopicPill({ tag }: { tag: string }) {
  return (
    <span className="inline-flex rounded-full bg-highlight/20 px-3 py-1 text-[0.6875rem] font-bold tracking-[0.08em] text-primary uppercase">
      {tag}
    </span>
  );
}

/** Short accent bar under a heading. */
function Underline({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-1 w-20 rounded-full bg-highlight", className)} />;
}

function InsightPage() {
  const { insight, related } = Route.useLoaderData();
  const [cover, ...gallery] = insight.images ?? [];
  const short = insight.body.length > 0 && insight.body.length <= HIGHLIGHT_MAX_PARAGRAPHS;
  const [highlightTitle, ...highlightRest] = insight.body;
  const HighlightIcon = /health|wellness|well-being/i.test(insight.body.join(" "))
    ? HeartPulse
    : Lightbulb;
  const ctaClass =
    "inline-flex w-full items-center justify-between gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90";

  return (
    <>
      <Container className="max-w-[1320px] pt-8 pb-12 sm:pt-10 sm:pb-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
          <article className="min-w-0">
            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {INSIGHTS_PAGE.backToAll}
            </Link>

            {/* Title block with the cover beside it from md up. */}
            <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-10">
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <TopicPill tag={insight.tag} />
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4" aria-hidden />
                    <time dateTime={insight.date}>{formatInsightDate(insight.date)}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden />
                    {readingMinutes(insight.body)} {INSIGHTS_PAGE.minRead}
                  </span>
                </div>
                <h1 className="mt-5 font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-bold tracking-[-0.01em] text-balance text-primary">
                  {insight.title}
                </h1>
                <Underline className="mt-5" />
                {insight.excerpt && (
                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
                    {insight.excerpt}
                  </p>
                )}
              </div>

              {/* Warm offset shapes behind the cover, top right and bottom left. */}
              <div className="relative mx-auto w-full max-w-md md:mx-0">
                <span
                  aria-hidden
                  className="absolute -top-3 -right-3 h-2/3 w-2/3 rounded-3xl bg-highlight/35"
                />
                <span
                  aria-hidden
                  className="absolute -bottom-3 -left-3 h-1/2 w-1/2 rounded-3xl bg-highlight/25"
                />
                {cover ? (
                  // Filled to the square frame; square LinkedIn flyers fit whole, taller photos are trimmed.
                  <img
                    src={cover.src}
                    alt={cover.alt}
                    className="relative aspect-square w-full rounded-2xl bg-card object-cover shadow-[0_24px_50px_-28px] shadow-primary/45"
                  />
                ) : (
                  <InsightImage
                    insight={insight}
                    className="relative aspect-square w-full rounded-2xl object-cover shadow-[0_24px_50px_-28px] shadow-primary/45"
                  />
                )}
              </div>
            </div>

            {short ? (
              <div className="mt-10 flex gap-5 rounded-2xl bg-highlight/10 p-5 sm:p-6">
                <span
                  aria-hidden
                  className="grid size-14 shrink-0 place-items-center rounded-full bg-highlight/20 text-primary"
                >
                  <HighlightIcon className="size-7" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-serif text-lg leading-snug font-bold text-primary">
                    {highlightTitle}
                  </p>
                  {highlightRest.map((paragraph, i) => (
                    <p key={i} className="mt-2 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-10 max-w-[70ch] space-y-5 text-[1.0625rem] leading-[1.8] text-foreground/85">
                {insight.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}

            {insight.takeaways.length > 0 && (
              <section
                aria-labelledby="takeaways"
                className="mt-10 rounded-2xl bg-hero p-6 text-hero-foreground sm:p-7"
              >
                <h2 id="takeaways" className="font-serif text-xl font-bold text-hero-foreground">
                  {INSIGHTS_PAGE.takeawaysHeading}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {insight.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm leading-snug">
                      <span
                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-highlight text-primary"
                        aria-hidden
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {gallery.length > 0 && (
              <section aria-labelledby="post-photos" className="mt-12">
                <h2 id="post-photos" className="font-serif text-2xl font-bold text-primary">
                  {INSIGHTS_PAGE.galleryHeading}
                </h2>
                <Underline className="mt-3" />
                <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {gallery.map((image, i) => (
                    <li key={image.src}>
                      <a
                        href={image.src}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group block overflow-hidden rounded-xl bg-card shadow-[0_14px_30px_-22px] shadow-primary/50"
                      >
                        <img
                          src={image.src}
                          alt={`${image.alt}, photo ${i + 2}`}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="mt-10 rounded-xl bg-muted/50 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
              <strong className="font-semibold">Disclaimer:</strong> {INSIGHTS_PAGE.disclaimer}
            </p>
          </article>

          {/* Stays in view beside the article while it scrolls (lg and up). */}
          <aside className="space-y-10 lg:sticky lg:top-24 lg:mt-12 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_18px_40px_-30px] shadow-primary/40">
              <p className="font-serif text-xl font-bold text-primary">
                {INSIGHTS_PAGE.helpHeading}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {INSIGHTS_PAGE.helpText}
              </p>
              <div className="mt-5 space-y-3">
                {insight.cta.serviceSlug ? (
                  <Link
                    to="/services/$slug"
                    params={{ slug: insight.cta.serviceSlug }}
                    className={ctaClass}
                  >
                    {insight.cta.label}
                    <ArrowRight className="size-4 shrink-0" aria-hidden />
                  </Link>
                ) : (
                  <Link to="/contact" hash="contact-form" className={ctaClass}>
                    {insight.cta.label}
                    <ArrowRight className="size-4 shrink-0" aria-hidden />
                  </Link>
                )}
                {insight.sourceUrl && (
                  <a
                    href={insight.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-tint"
                  >
                    <Linkedin className="size-4" aria-hidden />
                    {INSIGHTS_PAGE.viewOnLinkedIn}
                  </a>
                )}
              </div>
            </div>

            {related.length > 0 && (
              <section aria-labelledby="related-insights">
                <h2 id="related-insights" className="font-serif text-2xl font-bold text-primary">
                  {INSIGHTS_PAGE.relatedHeading}
                </h2>
                <Underline className="mt-3" />
                <ul className="mt-5 space-y-3">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link
                        to="/insights/$slug"
                        params={{ slug: a.slug }}
                        className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-shadow hover:shadow-[0_14px_30px_-20px] hover:shadow-primary/40"
                      >
                        <InsightImage
                          insight={a}
                          lazy
                          alt=""
                          className="aspect-[4/3] w-24 shrink-0 rounded-lg object-cover"
                        />
                        <span className="min-w-0 flex-1">
                          <TopicPill tag={a.tag} />
                          <span className="mt-1.5 line-clamp-2 block font-serif text-[0.9375rem] leading-snug font-bold text-primary">
                            {a.title}
                          </span>
                        </span>
                        <ArrowRight
                          className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </Container>

      {HAS_LINKEDIN && (
        <Container className="pb-6">
          <LinkedInBand />
        </Container>
      )}

      {/* <CtaBand /> */}
    </>
  );
}
