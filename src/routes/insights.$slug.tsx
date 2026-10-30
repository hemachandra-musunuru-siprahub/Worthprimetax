import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { formatInsightDate, getInsight, HAS_LINKEDIN, INSIGHTS_PAGE, SITE } from "@/data/site";
import { absoluteUrl, breadcrumbJsonLd, insightCrumbs, jsonLdScript, seoHead } from "@/lib/seo";
import { Container, Section } from "@/components/site/primitives";
import { InsightTag } from "@/components/site/ArticleCard";
import { INSIGHT_IMAGES } from "@/components/site/insightImages";
import { LinkedInBand } from "@/components/site/LinkedInBand";
// import { CtaBand } from "@/components/site/CtaBand";
import { PricingMarquee } from "@/components/site/PricingMarquee";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const insight = getInsight(params.slug);
    if (!insight) throw notFound();
    return { insight };
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
    const image = INSIGHT_IMAGES[insight.slug];
    return {
      ...seoHead({
        title: `${insight.title} | WorthPrime Tax`,
        description: insight.excerpt,
        path,
        type: "article",
      }),
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

function InsightPage() {
  const { insight } = Route.useLoaderData();
  const image = INSIGHT_IMAGES[insight.slug];
  const ctaClass =
    "inline-flex items-center gap-3 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90";

  return (
    <>
      <article className="bg-linear-to-b from-tint to-background pt-8 pb-10 sm:pt-10">
        <Container className="max-w-[880px]">
          <div className="flex items-center gap-4">
            <InsightTag tag={insight.tag} />
            <time dateTime={insight.date} className="text-sm text-muted-foreground">
              {formatInsightDate(insight.date)}
            </time>
          </div>
          <h1 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.01em] text-primary">
            {insight.title}
          </h1>
          <p className="mt-3 text-lg leading-snug text-muted-foreground">{insight.excerpt}</p>

          {image && (
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="mt-7 aspect-[2.2/1] w-full rounded-xl object-cover"
            />
          )}
        </Container>

        <div className="mt-8">
          <PricingMarquee />
        </div>

        <Container className="max-w-[880px]">
          <div className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-foreground">
            {insight.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <section
            aria-labelledby="takeaways"
            className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-7"
          >
            <h2 id="takeaways" className="font-serif text-2xl font-bold text-primary">
              Key Takeaways
            </h2>
            <ul className="mt-4 space-y-3">
              {insight.takeaways.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[1rem] leading-snug">
                  <span
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-gold/20 text-primary"
                    aria-hidden
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-7">
            {insight.cta.serviceSlug ? (
              <Link
                to="/services/$slug"
                params={{ slug: insight.cta.serviceSlug }}
                className={ctaClass}
              >
                {insight.cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            ) : (
              <Link to="/contact" hash="contact-form" className={ctaClass}>
                {insight.cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>

          <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
            <strong className="font-semibold">Disclaimer:</strong> {INSIGHTS_PAGE.disclaimer}
          </p>
        </Container>
      </article>

      {HAS_LINKEDIN && (
        <Container className="pb-6">
          <LinkedInBand />
        </Container>
      )}

      {/* <CtaBand /> */}
    </>
  );
}
