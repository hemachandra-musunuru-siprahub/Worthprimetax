import { LINKS, SITE } from "@/data/site";
// Temporary social sharing image (see SITE in src/data/site.ts): needs client approval.
import socialImage from "@/assets/social-share.jpg";
import logoImage from "@/assets/worthprime-logo-2026.webp";

export function absoluteUrl(path: string) {
  return new URL(path, SITE.url).toString();
}

/** Title, description, canonical, Open Graph and Twitter tags for one indexable page. */
export function seoHead({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  const url = absoluteUrl(path);
  const image = absoluteUrl(socialImage);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE.name },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1264" },
      { property: "og:image:height", content: "848" },
      { property: "og:image:alt", content: SITE.socialImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function jsonLdScript(data: object) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

/** Site-wide Organization and WebSite schema (root head). Only facts already published on the site. */
export function siteJsonLd() {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: absoluteUrl(logoImage),
        email: LINKS.email,
        telephone: LINKS.phoneHref.replace("tel:", ""),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  });
}

export type Crumb = { name: string; path: string };

export function serviceCrumbs(service: { slug: string; name: string }): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];
}

export function insightCrumbs(insight: { slug: string; title: string }): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: insight.title, path: `/insights/${insight.slug}` },
  ];
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  });
}
