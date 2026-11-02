import type { Insight } from "@/data/site";
import { InsightImage } from "@/components/site/InsightImage";

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="surface-card h-full overflow-hidden">
      <InsightImage insight={insight} lazy className="aspect-video w-full object-cover" />
      <div className="p-6">
        <p className="label-slash">{insight.tag}</p>
        <h3 className="mt-3 text-lg leading-snug">{insight.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{insight.excerpt}</p>
      </div>
    </article>
  );
}
