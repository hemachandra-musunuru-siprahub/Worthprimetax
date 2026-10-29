import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "./Breadcrumbs";
import { HeroCta } from "./HeroCta";
import { Container } from "./primitives";

/** One heading line; `accent` parts are bright blue and `underline` adds a curved stroke beneath. */
export type HeroLine = Array<{ text: string; accent?: boolean; underline?: boolean }>;

/**
 * Hero on a full-width illustrated background: the artwork fills the right and its pale left side
 * carries the copy. Below lg the artwork stacks under the copy so it never sits behind the text.
 */
export function BackdropHero({
  lines,
  intro,
  image,
  crumbs,
}: {
  lines: HeroLine[];
  intro: string;
  image: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <Container className="relative max-w-[1540px] lg:px-10">
        <div className="flex flex-col py-8 max-sm:pb-10 sm:py-10 lg:min-h-[min(calc(100svh-4rem),30rem)] lg:max-w-[52%] lg:justify-center lg:py-12">
          {crumbs && <Breadcrumbs crumbs={crumbs} className="mb-4" />}
          <h1 className="font-serif text-[clamp(2rem,3.4vw,3.5rem)] leading-[1.16] font-bold tracking-[-0.02em] text-primary max-sm:text-[1.6rem]">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line.map((part) => (
                  <span
                    key={part.text}
                    className={cn(
                      part.accent && "text-brand-secondary",
                      part.underline && "relative inline-block",
                    )}
                  >
                    {part.text}
                    {part.underline && (
                      <svg
                        aria-hidden
                        viewBox="0 0 200 16"
                        preserveAspectRatio="none"
                        className="absolute -bottom-[0.14em] left-[2%] h-[0.16em] w-full"
                      >
                        <path
                          d="M2 13 Q 100 0 198 9"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    )}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          {/* pre-line keeps any "\n" in the intro as a line break. */}
          <p className="mt-5 max-w-[38rem] text-[0.9375rem] leading-relaxed whitespace-pre-line text-foreground/85 sm:text-base xl:text-[1.0625rem]">
            {intro}
          </p>
          <div className="mt-6">
            {/* Services and service pages ask for a quote rather than a general contact. */}
            <HeroCta label="Request a Quote" />
          </div>
        </div>
      </Container>

      {/* From lg the artwork covers the right 72% so the copy keeps more room; its pale left edge fades into the page. */}
      {/* Phones: the artwork sits behind the copy as a background (like the home hero), under a
          white wash so the text stays readable, and the price strip shows on the first screen. */}
      <div className="relative aspect-[5/2] w-full max-sm:absolute max-sm:inset-0 max-sm:-z-10 max-sm:aspect-auto lg:absolute lg:inset-y-0 lg:right-0 lg:-z-10 lg:aspect-auto lg:w-[72%]">
        <img
          src={image}
          alt=""
          width={1671}
          height={941}
          fetchPriority="high"
          className="h-full w-full object-cover object-[85%_center] max-sm:object-right lg:object-[right_25%]"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 hidden w-1/4 bg-linear-to-r from-background to-transparent lg:block"
        />
        <div aria-hidden className="absolute inset-0 hidden bg-linear-to-b from-background/90 via-background/75 to-background/40 max-sm:block" />
      </div>
    </section>
  );
}
