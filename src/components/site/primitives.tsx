import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fires when the element scrolls into view. With `once` (the default) it stays true from then on;
 * otherwise it turns false again whenever the element leaves the view.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && once) {
          setInView(true);
          observer.disconnect();
        } else if (!once) {
          setInView(visible);
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  // Counts up from zero every time the number scrolls into view, and resets when it leaves.
  const { ref, inView } = useInView<HTMLSpanElement>(0.4, false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/**
 * Active-slide state for a horizontal scroll-snap track. `goTo` scrolls the track only when it
 * overflows (on wide screens every slide is visible, so only the active state changes), and
 * swiping the track moves the active slide to whichever item is nearest its left edge.
 */
export function useSnapCarousel(count: number) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  // While goTo's own smooth scroll is under way, hold the chosen slide until the track arrives
  // (its duration varies by browser), unless the user takes over by swiping or scrolling.
  const scrollTarget = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      const next = (index + count) % count;
      setActive(next);
      const track = trackRef.current;
      const item = itemRefs.current[next];
      if (track && item && track.scrollWidth > track.clientWidth) {
        const max = track.scrollWidth - track.clientWidth;
        const left = Math.min(item.offsetLeft - track.offsetLeft, max);
        scrollTarget.current = left;
        track.scrollTo({ left, behavior: "smooth" });
      }
    },
    [count],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const release = () => {
      scrollTarget.current = null;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const left = track.scrollLeft;
        if (scrollTarget.current !== null) {
          if (Math.abs(left - scrollTarget.current) <= 2) release();
          return;
        }
        const max = track.scrollWidth - track.clientWidth;
        if (max <= 0) return;
        // At the far end the last slides cannot reach the left edge; treat that as the last one.
        if (left >= max - 2) {
          setActive(itemRefs.current.length - 1);
          return;
        }
        let nearest = 0;
        let nearestDist = Infinity;
        itemRefs.current.forEach((item, i) => {
          if (!item) return;
          const dist = Math.abs(item.offsetLeft - track.offsetLeft - left);
          if (dist < nearestDist) {
            nearest = i;
            nearestDist = dist;
          }
        });
        setActive(nearest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", release, { passive: true });
    track.addEventListener("wheel", release, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", release);
      track.removeEventListener("wheel", release);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { active, setActive, goTo, trackRef, itemRefs };
}

/** `as="h2"` when the label is the only heading of its section, so the outline has no gaps. */
export function SectionLabel({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "h2";
}) {
  return <Tag className={cn("label-slash", className)}>{children}</Tag>;
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-12 sm:py-16", className)}>
      <Container>{children}</Container>
    </section>
  );
}
