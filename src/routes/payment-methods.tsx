import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import { Check, Copy, Headphones, ShieldCheck, Zap } from "lucide-react";
import { PAYMENT_PAGE } from "@/data/site";
import { Container } from "@/components/site/primitives";
// Original Zelle QR card supplied by the client (2026-10-23), used unchanged. Never generate, redraw
// or crop the QR. It already carries the Zelle logo, "Send Money with Zelle®" and the company name.
import zelleQrImage from "@/assets/payments/zelle-qr.jpeg";
// PayPal graphic supplied by the client (2026-10-23), used unchanged. It already carries "Secure
// Payments By", the PayPal logo, the accepted cards and "No PayPal account needed".
import paypalImage from "@/assets/payments/paypal-secure-payments.webp";
import { PricingMarquee } from "@/components/site/PricingMarquee";

const FEATURE_ICONS = [ShieldCheck, Zap, Headphones];

export const Route = createFileRoute("/payment-methods")({
  head: () =>
    seoHead({
      title: PAYMENT_PAGE.title,
      description: PAYMENT_PAGE.description,
      path: "/payment-methods",
    }),
  component: PaymentMethodsPage,
});

const card =
  "rounded-3xl border border-border bg-card p-5 shadow-[0_24px_60px_-36px] shadow-primary/40 sm:p-7";

function PaymentMethodsPage() {
  const { zelle, paypal } = PAYMENT_PAGE;
  return (
    <>
      <section className="bg-linear-to-br from-tint via-background to-tint">
        {/*
         * One screen on desktop: Zelle left, heading and OR in the middle, PayPal right, the three
         * features under the middle and right columns. DOM order is the stacked (mobile) order.
         */}
        <Container className="grid max-w-[1400px] gap-6 py-8 sm:py-10 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto] lg:content-center lg:gap-x-10 lg:gap-y-6 lg:px-10">
          <div className="text-center lg:col-start-2 lg:row-start-1 lg:self-end">
            <p className="flex items-center justify-center gap-4 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase sm:text-sm">
              <span className="h-px w-12 bg-border sm:w-16" aria-hidden />
              {PAYMENT_PAGE.label}
              <span className="h-px w-12 bg-border sm:w-16" aria-hidden />
            </p>
            <h1 className="mt-4 font-sans text-[clamp(2.5rem,7vw,3.5rem)] leading-tight font-bold tracking-[-0.02em] text-primary lg:text-[clamp(2.25rem,3.6vw,3.75rem)] lg:whitespace-nowrap">
              {PAYMENT_PAGE.heading}{" "}
              <span className="text-brand-secondary">{PAYMENT_PAGE.headingAccent}</span>
            </h1>
            <span className="mx-auto mt-4 block h-px w-12 bg-border" aria-hidden />
          </div>

          {/* Zelle */}
          <article
            className={`${card} mx-auto w-full max-w-[26rem] text-center lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:self-center`}
          >
            <h2 className="text-lg font-bold text-primary sm:text-xl">{zelle.label}</h2>
            <CopyableId value={zelle.id} />
            <img
              src={zelleQrImage}
              alt={zelle.qrAlt}
              width={936}
              height={1280}
              className="mx-auto mt-4 h-auto w-full max-w-[18rem] object-contain"
            />
          </article>

          <div className="text-center lg:col-start-2 lg:row-start-2">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-tint text-xl font-medium text-primary">
              {PAYMENT_PAGE.or}
            </span>
            <p className="mx-auto mt-5 max-w-[18rem] text-lg leading-snug text-muted-foreground">
              {PAYMENT_PAGE.intro}
            </p>
          </div>

          {/* PayPal */}
          <a
            href={paypal.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${card} mx-auto block w-full max-w-[28rem] transition-transform hover:scale-[1.01] lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-center`}
          >
            <img
              src={paypalImage}
              alt={paypal.alt}
              width={1620}
              height={971}
              className="h-auto w-full object-contain"
            />
            <span className="sr-only">{paypal.newTab}</span>
          </a>

          <ul className="grid gap-5 sm:grid-cols-3 lg:col-span-2 lg:col-start-2 lg:row-start-3 lg:gap-6">
            {PAYMENT_PAGE.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? ShieldCheck;
              return (
                <li key={f.title} className="flex items-start gap-4">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-full bg-tint text-primary"
                    aria-hidden
                  >
                    <Icon className="size-6.5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-semibold text-primary">{f.title}</p>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">{f.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <PricingMarquee />
    </>
  );
}

/**
 * The Zelle ID on one line with a copy button. If the browser blocks clipboard access, the text
 * is selected instead so the visitor can press Ctrl+C.
 */
function CopyableId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error("Copying the Zelle ID failed; selecting it instead.", error);
      const node = textRef.current;
      const selection = window.getSelection();
      if (node && selection) {
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  return (
    <div className="mt-1 flex items-center justify-center gap-2">
      <span ref={textRef} className="text-base font-bold whitespace-nowrap text-primary sm:text-lg">
        {value}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Zelle ID copied" : "Copy Zelle ID"}
        title={copied ? "Copied" : "Copy"}
        className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-primary transition-colors hover:bg-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {copied ? (
          <Check className="size-4" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Zelle ID copied to clipboard" : ""}
      </span>
    </div>
  );
}
