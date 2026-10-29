import { useId, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import type { ServiceFaq, ServiceFaqGroup } from "@/data/serviceFaqs";
import { cn } from "@/lib/utils";

/**
 * Up/Down move between the questions of one group, Home/End jump to its first/last question
 * (the WAI-ARIA accordion pattern); Enter and Space toggle through the native button.
 */
function moveFocus(event: KeyboardEvent<HTMLButtonElement>) {
  const list = event.currentTarget.closest("[data-faq-group]");
  if (!list) return;
  const buttons = Array.from(list.querySelectorAll<HTMLButtonElement>("button[aria-controls]"));
  const i = buttons.indexOf(event.currentTarget);
  const next = {
    ArrowDown: buttons[(i + 1) % buttons.length],
    ArrowUp: buttons[(i - 1 + buttons.length) % buttons.length],
    Home: buttons[0],
    End: buttons[buttons.length - 1],
  }[event.key];
  if (!next) return;
  event.preventDefault();
  next.focus();
}

function FaqItem({
  faq,
  id,
  isOpen,
  onToggle,
  headingLevel,
}: {
  faq: ServiceFaq;
  id: string;
  isOpen: boolean;
  onToggle: () => void;
  headingLevel: "h3" | "h4";
}) {
  const Heading = headingLevel;
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;
  return (
    <li
      className={cn(
        "rounded-2xl border shadow-[0_14px_34px_-28px] shadow-primary/60 transition-colors duration-300",
        isOpen ? "border-brand-secondary/30 bg-tint/70" : "border-border bg-card",
      )}
    >
      <Heading>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={moveFocus}
          className="flex w-full items-start gap-4 rounded-2xl px-4 py-3.5 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:px-5"
        >
          <span className="min-w-0 flex-1 text-sm leading-snug font-semibold text-primary">
            {faq.q}
          </span>
          <span
            aria-hidden
            className="grid size-6 shrink-0 place-items-center rounded-full border border-primary/25 text-primary"
          >
            <ChevronDown
              className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")}
              strokeWidth={2.25}
            />
          </span>
        </button>
      </Heading>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="px-4 pb-4 sm:px-5 sm:pb-5"
      >
        <p className="border-t border-brand-secondary/15 pt-3 text-[0.8125rem] leading-relaxed text-foreground/80">
          {faq.a}
        </p>
      </div>
    </li>
  );
}

/**
 * One FAQ group: all answers start collapsed and opening one closes the others. From `md` up the
 * questions sit in two independent columns, so an open answer drops down without pushing the
 * other column; DOM order (left column, then right) keeps keyboard order matching reading order.
 */
function FaqGroup({ group, headingLevel }: { group: ServiceFaqGroup; headingLevel: "h3" | "h4" }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  const half = Math.ceil(group.faqs.length / 2);
  const columns = [group.faqs.slice(0, half), group.faqs.slice(half)];
  return (
    <div>
      {group.title && (
        <h3 className="mb-3 text-[0.75rem] font-semibold tracking-[0.14em] text-primary uppercase">
          {group.title}
        </h3>
      )}
      <div data-faq-group className="grid items-start gap-2.5 md:grid-cols-2 md:gap-4">
        {columns.map((faqs, c) => (
          <ul key={c} className="space-y-2.5 md:space-y-4">
            {faqs.map((f, j) => {
              const i = c * half + j;
              return (
                <FaqItem
                  key={f.q}
                  faq={f}
                  id={`${id}-${i}`}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                  headingLevel={headingLevel}
                />
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** Accordion of the service's FAQ groups; each group keeps its own single open answer. */
export function ServiceFaqs({ groups }: { groups: ServiceFaqGroup[] }) {
  // Titled groups put their subheading at h3, so questions drop to h4.
  const headingLevel = groups.some((g) => g.title) ? "h4" : "h3";
  return (
    <div className="mt-8 space-y-8">
      {groups.map((group) => (
        <FaqGroup key={group.title ?? "all"} group={group} headingLevel={headingLevel} />
      ))}
    </div>
  );
}
