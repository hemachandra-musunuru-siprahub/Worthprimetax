import type { Insight } from "@/data/site";
import documentsImage from "@/assets/worthprime-documents-blue.webp";
import advisersImage from "@/assets/worthprime-advisers-blue.webp";
import pricingDeskImage from "@/assets/pricing-desk.jpg";

/** LinkedIn images have no known size, so width/height are only set for our own photos. */
type Image = { src: string; alt: string; width?: number; height?: number };

/** Cover photo for each article, keyed by insight slug. */
const INSIGHT_IMAGES: Record<string, Image> = {
  "key-us-tax-changes-2026": {
    src: documentsImage,
    alt: "Tax documents, a calculator and a pen on a desk",
    width: 1200,
    height: 896,
  },
  "strengthening-compliance-changing-regulatory-landscape": {
    src: advisersImage,
    alt: "Two advisers reviewing compliance documents together",
    width: 1200,
    height: 896,
  },
  "year-end-accounting-checklist-us-businesses": {
    src: pricingDeskImage,
    alt: "Calculator and financial statements prepared for year-end review",
    width: 1054,
    height: 436,
  },
};

/**
 * Cover image for an article: its LinkedIn image, or the photo of a hand-written fallback article.
 * Null when there is none; InsightImage then draws a branded cover instead of a stock photo.
 */
export function insightImage(insight: Insight): Image | null {
  return insight.images?.[0] ?? INSIGHT_IMAGES[insight.slug] ?? null;
}
