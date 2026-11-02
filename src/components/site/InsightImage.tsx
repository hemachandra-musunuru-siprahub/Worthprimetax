import type { Insight } from "@/data/site";
import { insightImage } from "@/components/site/insightImages";
import brandWallImage from "@/assets/about hero.png";

/**
 * An article's cover in any image slot. Posts without an image of their own get the WorthPrime
 * logo-wall photo (the About page hero) rather than a stock photo. `decorative` slots, such as the
 * featured card that already sits on navy, render nothing.
 */
export function InsightImage({
  insight,
  className,
  alt,
  lazy = false,
  decorative = false,
}: {
  insight: Insight;
  className?: string;
  /** Overrides the image's alt text; "" marks it as decorative for screen readers. */
  alt?: string;
  lazy?: boolean;
  decorative?: boolean;
}) {
  const image = insightImage(insight);

  if (image) {
    return (
      <img
        src={image.src}
        alt={alt ?? image.alt}
        width={image.width}
        height={image.height}
        loading={lazy ? "lazy" : undefined}
        className={className}
      />
    );
  }
  if (decorative) return null;

  return (
    <img
      src={brandWallImage}
      alt={alt ?? "WorthPrime logo and the line Your Compliance Partner! on a marble office wall"}
      width={1672}
      height={941}
      loading={lazy ? "lazy" : undefined}
      // Centred on the sign, which sits a little above the middle of the photo.
      className={`${className ?? ""} object-[52%_42%]`}
    />
  );
}
