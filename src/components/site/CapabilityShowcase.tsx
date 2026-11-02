import { useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/worthprime-logo-2026.webp";
import brandWallImage from "@/assets/about hero.png";
import { Container } from "./primitives";

function Pill({
  text,
  dot,
  dotRef,
}: {
  text: string;
  dot?: "left" | "right";
  dotRef?: (n: HTMLSpanElement | null) => void;
}) {
  return (
    <li className="relative z-10 flex min-h-14 items-center rounded-[2rem] border border-brand-secondary/20 bg-card px-6 py-3 shadow-[0_12px_30px_-20px] shadow-primary/50">
      <span className="text-sm leading-snug font-semibold text-primary">{text}</span>
      {dot && (
        <span
          ref={dotRef}
          aria-hidden
          className={cn(
            "absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-brand-secondary bg-card",
            dot === "right" ? "-right-1.5" : "-left-1.5",
          )}
        />
      )}
    </li>
  );
}

/** Curves from each pill's dot to the edge of the centre circle, measured from the layout. */
function useConnectors(count: number) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const circle = circleRef.current;
    if (!wrap || !circle) return;
    const measure = () => {
      const box = wrap.getBoundingClientRect();
      const c = circle.getBoundingClientRect();
      // Hidden below lg: nothing to draw.
      if (box.width === 0 || c.width === 0) return setPaths([]);
      const cx = c.left + c.width / 2 - box.left;
      const cy = c.top + c.height / 2 - box.top;
      const r = c.width / 2;
      const next: string[] = [];
      dotRefs.current.slice(0, count).forEach((dot) => {
        if (!dot) return;
        const d = dot.getBoundingClientRect();
        const sx = d.left + d.width / 2 - box.left;
        const sy = d.top + d.height / 2 - box.top;
        // Land on the circle's near side, pulled towards its middle so the lines fan in.
        const ey = cy + Math.max(-0.8 * r, Math.min(0.8 * r, (sy - cy) * 0.6));
        const side = sx < cx ? -1 : 1;
        const ex = cx + side * Math.sqrt(r * r - (ey - cy) ** 2);
        const mid = (ex - sx) / 2;
        next.push(`M${sx},${sy} C${sx + mid},${sy} ${ex - mid},${ey} ${ex},${ey}`);
      });
      setPaths(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [count]);

  return { wrapRef, circleRef, dotRefs, paths };
}

/**
 * Service capabilities as an infographic: pills either side of a branded circle, joined to it by
 * curved lines, with the call to action centred below. Below lg the pills simply stack.
 */
export function CapabilityShowcase({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const items = service.capabilities;
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  const { wrapRef, circleRef, dotRefs, paths } = useConnectors(items.length);

  return (
    <section
      aria-labelledby="capabilities-heading"
      className={cn(
        "relative isolate overflow-hidden bg-linear-to-b from-background via-tint/60 to-background py-12 sm:py-16",
        className,
      )}
    >
      <Container className="max-w-[1540px] lg:px-10">
        <div className="flex items-center justify-center gap-4" aria-hidden>
          <span className="h-px w-16 bg-linear-to-r from-transparent to-brand-secondary/60 sm:w-32" />
          {/* The mark only: the wordmark under it is clipped off. */}
          <span className="block h-6 overflow-hidden">
            <img src={logoImage} alt="" width={600} height={383} className="h-[2.15rem] w-auto" />
          </span>
          <span className="h-px w-16 bg-linear-to-l from-transparent to-brand-secondary/60 sm:w-32" />
        </div>
        <h2
          id="capabilities-heading"
          className="mt-3 text-center font-serif text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.15] font-bold text-primary"
        >
          {service.capabilitiesLabel}:
        </h2>

        {/* Desktop: two columns of pills around the circle. */}
        <div
          ref={wrapRef}
          className="relative mt-10 hidden grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-[clamp(3rem,6vw,7rem)] lg:grid"
        >
          <svg
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            aria-hidden
          >
            {paths.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                className="stroke-brand-secondary/45"
                strokeWidth={1.25}
              />
            ))}
          </svg>
          <ul className="flex flex-col gap-4 justify-self-end">
            {left.map((c, i) => (
              <Pill
                key={c}
                text={c}
                dot="right"
                dotRef={(n) => {
                  dotRefs.current[i] = n;
                }}
              />
            ))}
          </ul>
          <Centerpiece circleRef={circleRef} />
          <ul className="flex flex-col gap-4 justify-self-start">
            {right.map((c, i) => (
              <Pill
                key={c}
                text={c}
                dot="left"
                dotRef={(n) => {
                  dotRefs.current[half + i] = n;
                }}
              />
            ))}
          </ul>
        </div>

        {/* Phones and tablets: the pills stack, without the circle and lines. */}
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:hidden">
          {items.map((c) => (
            <Pill key={c} text={c} />
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            to="/contact"
            hash="contact-form"
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-brand-secondary px-6 py-3 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03]"
          >
            {service.cta}
            <ArrowRight
              className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function Centerpiece({ circleRef }: { circleRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div className="flex flex-col items-center">
      <div
        ref={circleRef}
        className="relative z-10 size-[clamp(11rem,15vw,14rem)] rounded-full bg-linear-to-b from-brand-secondary/60 to-brand-secondary/15 p-1.5 shadow-[0_30px_60px_-30px] shadow-primary/60"
      >
        {/* The logo-wall photo from the About page, cropped round its sign. */}
        <div className="relative size-full overflow-hidden rounded-full bg-card">
          <img
            src={brandWallImage}
            alt="WorthPrime logo and the line Your Compliance Partner! on a marble office wall"
            width={1672}
            height={941}
            loading="lazy"
            className="size-full object-cover object-[52%_45%]"
          />
        </div>
      </div>
      {/* Podium */}
      <span
        aria-hidden
        className="-mt-4 block h-6 w-[78%] rounded-[50%] border border-brand-secondary/20 bg-linear-to-b from-card to-tint shadow-[0_10px_20px_-12px] shadow-primary/50"
      />
      <span
        aria-hidden
        className="-mt-2 block h-6 w-[92%] rounded-[50%] border border-brand-secondary/15 bg-linear-to-b from-card to-tint shadow-[0_14px_24px_-14px] shadow-primary/50"
      />
    </div>
  );
}
