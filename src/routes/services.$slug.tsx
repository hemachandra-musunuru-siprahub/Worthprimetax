import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getService } from "@/data/services";
import { breadcrumbJsonLd, seoHead, serviceCrumbs } from "@/lib/seo";
import { Section } from "@/components/site/primitives";
import { ServiceDetailFeature } from "@/components/site/ServiceDetailFeature";
import { getServiceDetailMedia } from "@/components/site/serviceDetailMedia";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Service Not Found | WorthPrime Tax" },
          { name: "robots", content: "noindex" },
          { property: "og:title", content: "Service Not Found | WorthPrime Tax" },
          {
            property: "og:description",
            content: "The requested WorthPrime Tax service could not be found.",
          },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
      };
    }
    const { service } = loaderData;
    return {
      ...seoHead({
        title: `${service.name} | WorthPrime Tax`,
        description: service.summary,
        path: `/services/${service.slug}`,
      }),
      scripts: [breadcrumbJsonLd(serviceCrumbs(service))],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServiceDetail,
});

function ServiceNotFound() {
  return (
    <Section>
      <h1 className="text-4xl">Service Not Found</h1>
      <Link to="/services" className="mt-6 inline-block text-primary hover:underline">
        ← All Services
      </Link>
    </Section>
  );
}

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  return (
    <ServiceDetailFeature
      service={service}
      media={getServiceDetailMedia(service.slug, service.name)}
    />
  );
}
