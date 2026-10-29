import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICES, type Service } from "@/data/services";
import { cn } from "@/lib/utils";

// Only confirmed "From …" prices are shown as figures; everything else stays a placeholder.
function displayPrice(price: string) {
  return price.startsWith("From") ? price : "Price TBC";
}

function PriceTag({ price }: { price: string }) {
  const confirmed = price.startsWith("From");
  return (
    <span
      className={cn(
        "text-sm",
        confirmed
          ? "inline-flex rounded-full bg-brand-gold/15 px-2.5 py-0.5 font-semibold text-primary"
          : "text-muted-foreground",
      )}
    >
      {displayPrice(price)}
    </span>
  );
}

/**
 * One contact button for the whole table, labelled by the page: at the right of the header row
 * on large screens, above the stacked cards below that.
 */
function ContactButton({ label }: { label: string }) {
  return (
    <Link
      to="/contact"
      hash="contact-form"
      className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-medium tracking-normal whitespace-nowrap text-primary-foreground normal-case transition-opacity hover:opacity-90"
    >
      {label}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

/** The row number, with an invisible lead so a lettered-only part sits under the first part's letter. */
function RowNumber({ row }: { row: PriceRow }) {
  return (
    <>
      <span className="invisible" aria-hidden>
        {row.numberLead}
      </span>
      {row.number}
    </>
  );
}

function ServiceLink({ service, name }: { service: Service; name: string }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="text-sm font-medium text-primary hover:underline"
    >
      {name}
    </Link>
  );
}

type PriceRow = {
  key: string;
  service: Service;
  name: string;
  price: string;
  included: string;
  /** Split services get a letter per row: the first shows the number too (1 (a)), the rest only the letter ((b)). */
  number?: string;
  /** Invisible copy of the number that lines a lettered-only part up under the first one. */
  numberLead?: string;
};

// A service with tiers gets one row per tier, all linking to the same service page.
const ROWS: PriceRow[] = SERVICES.flatMap((s) =>
  s.tiers
    ? s.tiers.map((t, i) => ({
        key: `${s.slug}-${i}`,
        service: s,
        name: t.name,
        price: t.price,
        included: t.included,
        number: i === 0 ? `${Number(s.number)} (a)` : `(${String.fromCharCode(97 + i)})`,
        numberLead: i === 0 ? undefined : `${Number(s.number)} `,
      }))
    : [
        {
          key: s.slug,
          service: s,
          name: s.name,
          price: s.price,
          included: s.included,
          number: s.number,
        },
      ],
);

const th =
  "px-4 py-3 text-left text-[0.6875rem] font-semibold tracking-[0.16em] text-primary uppercase";

/** Every service with its starting price: a table on large screens, stacked cards below. */
export function PricingTable({ ctaLabel = "Contact Us" }: { ctaLabel?: string }) {
  return (
    <>
      <div className="mb-3 flex justify-end lg:hidden">
        <ContactButton label={ctaLabel} />
      </div>

      <div className="hidden overflow-hidden rounded-xl border border-border lg:block">
        <table className="w-full border-collapse">
          <thead className="bg-tint">
            <tr>
              <th scope="col" className={cn(th, "w-14 pl-5")}>
                #
              </th>
              <th scope="col" className={th}>
                Service
              </th>
              <th scope="col" className={th}>
                What Is Included
              </th>
              <th scope="col" className={cn(th, "w-72 py-2 pr-4")}>
                <span className="whitespace-nowrap">Starting From</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ROWS.map((r) => (
              <tr key={r.key}>
                <td className="py-2.5 pr-2 pl-5 text-sm whitespace-pre text-muted-foreground">
                  <RowNumber row={r} />
                </td>
                <th
                  scope="row"
                  className="border-r border-border px-4 py-2.5 text-left font-normal"
                >
                  <ServiceLink service={r.service} name={r.name} />
                </th>
                <td className="border-r border-border px-4 py-2.5 text-sm text-muted-foreground">
                  {r.included}
                </td>
                <td className="px-4 py-2.5">
                  <PriceTag price={r.price} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 hidden justify-center lg:flex">
        <ContactButton label={ctaLabel} />
      </div>

      {/* Two cards a row from phones up; phones (max-sm) get tighter padding and smaller text,
          with the number above the name so the half-width card has room. */}
      <ul className="grid grid-cols-2 gap-3 max-sm:gap-2.5 lg:hidden">
        {ROWS.map((r) => (
          <li
            key={r.key}
            className="flex flex-col rounded-xl border border-border bg-card p-4 max-sm:p-3"
          >
            {/* Number and name across the full width, the starting price on its own line below. */}
            <div className="flex items-baseline gap-2 max-sm:flex-col max-sm:gap-0.5 max-sm:[&_a]:text-[0.8125rem] max-sm:[&_a]:leading-snug">
              {r.number && (
                <span className="text-xs whitespace-pre text-muted-foreground max-sm:text-[0.6875rem]">
                  <RowNumber row={r} />
                </span>
              )}
              <ServiceLink service={r.service} name={r.name} />
            </div>
            <div className="mt-2 max-sm:[&>span:last-child]:px-2 max-sm:[&>span:last-child]:text-xs">
              <span className="sr-only">Starting From </span>
              <PriceTag price={r.price} />
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground max-sm:text-xs max-sm:leading-snug">
              {r.included}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
