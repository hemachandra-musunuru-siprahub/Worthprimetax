import { useEffect } from "react";
import { GLOSSARY } from "@/data/glossary";

/**
 * Adds keyword-definition tooltips (from `GLOSSARY`) to text inside `#main`.
 *
 * Copy is spread across many components and data files, so instead of hand-wrapping each keyword
 * this scans the rendered DOM after hydration and wraps matches in focusable `.wp-term` spans. A
 * MutationObserver rescans when routes or sections render new content. One shared popup element
 * is reused so only a single tooltip is ever open.
 */

const TIP_ID = "wp-glossary-tip";
const TERM_CLASS = "wp-term";
const CLOSE_DELAY_MS = 120;
const GAP_PX = 8;
const EDGE_PX = 8;

// Interactive, decorative or already-processed areas we must not alter (keeps links and controls intact).
const SKIP_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "option",
  "label",
  "script",
  "style",
  "noscript",
  "svg",
  "code",
  "pre",
  "h1",
  "summary",
  "[role='button']",
  "[role='tab']",
  "[role='link']",
  "[aria-hidden='true']",
  "[contenteditable='true']",
  "[data-no-glossary]",
  `.${TERM_CLASS}`,
].join(",");

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function buildMatcher() {
  const byVariant = new Map<string, number>();
  GLOSSARY.forEach((entry, index) => {
    for (const variant of entry.match ?? [entry.term]) {
      byVariant.set(variant.toLowerCase(), index);
    }
  });
  // Longest first so "U.S. Tax Compliance" wins over "U.S. Tax" and "Tax Compliance".
  const variants = [...byVariant.keys()].sort((a, b) => b.length - a.length).map(escapeRegExp);
  const pattern = new RegExp(`(?<![\\w-])(${variants.join("|")})(?![\\w-])`, "gi");
  return { pattern, byVariant };
}

export function GlossaryTooltips() {
  useEffect(() => {
    const root = document.getElementById("main");
    if (!root) return;

    const { pattern, byVariant } = buildMatcher();

    const tip = document.createElement("div");
    tip.id = TIP_ID;
    tip.className = "wp-tip";
    tip.setAttribute("role", "tooltip");
    tip.hidden = true;
    const tipTerm = document.createElement("strong");
    tipTerm.className = "wp-tip-term";
    const tipText = document.createElement("p");
    tipText.className = "wp-tip-text";
    tip.append(tipTerm, tipText);
    document.body.appendChild(tip);

    let active: HTMLElement | null = null;
    let closeTimer: number | undefined;

    const cancelClose = () => window.clearTimeout(closeTimer);

    const position = () => {
      if (!active) return;
      // Use the first line box so a keyword that wraps doesn't anchor to its whole bounding box.
      const rect = active.getClientRects()[0] ?? active.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const { offsetWidth: w, offsetHeight: h } = tip;

      const fitsAbove = rect.top - GAP_PX - h >= EDGE_PX;
      const fitsBelow = rect.bottom + GAP_PX + h <= vh - EDGE_PX;
      const placeAbove = fitsAbove || (!fitsBelow && rect.top > vh - rect.bottom);
      const top = placeAbove ? rect.top - GAP_PX - h : rect.bottom + GAP_PX;

      const centred = rect.left + rect.width / 2 - w / 2;
      const left = Math.min(Math.max(centred, EDGE_PX), Math.max(EDGE_PX, vw - w - EDGE_PX));

      tip.style.top = `${Math.round(Math.max(EDGE_PX, top))}px`;
      tip.style.left = `${Math.round(left)}px`;
      tip.dataset["side"] = placeAbove ? "top" : "bottom";
    };

    const close = () => {
      cancelClose();
      if (!active) return;
      active.removeAttribute("aria-describedby");
      active.setAttribute("aria-expanded", "false");
      active = null;
      tip.hidden = true;
    };

    const open = (term: HTMLElement) => {
      cancelClose();
      if (active === term) return;
      close();
      const entry = GLOSSARY[Number(term.dataset["term"])];
      if (!entry) return;
      active = term;
      tipTerm.textContent = entry.term;
      tipText.textContent = entry.definition;
      term.setAttribute("aria-describedby", TIP_ID);
      term.setAttribute("aria-expanded", "true");
      tip.hidden = false;
      position();
    };

    const scheduleClose = () => {
      cancelClose();
      closeTimer = window.setTimeout(close, CLOSE_DELAY_MS);
    };

    const wrapTextNode = (node: Text) => {
      const text = node.data;
      pattern.lastIndex = 0;
      let match: RegExpExecArray | null;
      let cursor = 0;
      const frag = document.createDocumentFragment();
      while ((match = pattern.exec(text))) {
        const index = byVariant.get(match[0].toLowerCase());
        if (index === undefined) continue;
        if (match.index > cursor) frag.append(text.slice(cursor, match.index));
        const span = document.createElement("span");
        span.className = TERM_CLASS;
        span.tabIndex = 0;
        span.dataset["term"] = String(index);
        span.setAttribute("aria-expanded", "false");
        span.textContent = match[0];
        frag.append(span);
        cursor = match.index + match[0].length;
      }
      if (cursor === 0) return;
      if (cursor < text.length) frag.append(text.slice(cursor));
      node.replaceWith(frag);
    };

    // Route components are lazy and hydrate after this effect runs. Editing server-rendered DOM that
    // React hasn't hydrated yet causes hydration mismatches, so only touch elements React has claimed
    // (it tags each hydrated node with a "__reactFiber$…" key) and retry until the rest catch up.
    const isHydrated = (el: Element) => Object.keys(el).some((k) => k.startsWith("__reactFiber$"));

    /** Wraps keywords in hydrated text; returns true if some text was skipped as not yet hydrated. */
    const scan = () => {
      let pending = false;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || !node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
          if (parent.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
          if (!isHydrated(parent)) {
            pending = true;
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach(wrapTextNode);
      if (active && !active.isConnected) close();
      return pending;
    };

    const OBSERVE = { childList: true, subtree: true, characterData: true } as const;
    let frame: number | undefined;
    let retryTimer: number | undefined;
    let retries = 0;
    const run = () => {
      // Our own wrapping would otherwise re-trigger the observer.
      observer.disconnect();
      const pending = scan();
      observer.observe(root, OBSERVE);
      window.clearTimeout(retryTimer);
      if (pending && retries < 50) {
        retries += 1;
        retryTimer = window.setTimeout(run, 200);
      }
    };
    const observer = new MutationObserver(() => {
      window.clearTimeout(frame);
      retries = 0;
      frame = window.setTimeout(run, 50);
    });
    // setTimeout rather than requestAnimationFrame: rAF never fires in background tabs.
    frame = window.setTimeout(run, 0);

    const termFrom = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>(`.${TERM_CLASS}`) : null;
    const inTip = (target: EventTarget | null) => target instanceof Node && tip.contains(target);

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const term = termFrom(e.target);
      if (term) open(term);
      else if (inTip(e.target)) cancelClose();
    };
    const onPointerOut = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !active) return;
      const to = e.relatedTarget;
      if (termFrom(to) === active || inTip(to)) return;
      if (termFrom(e.target) === active || inTip(e.target)) scheduleClose();
    };
    // Tap support: tapping a keyword toggles it, tapping anywhere else closes it. Remember what was
    // open when the press began, because a hover or focus during the same tap may have just opened it.
    let openAtPress: HTMLElement | null = null;
    const onPointerDown = () => {
      openAtPress = active;
    };
    const onClick = (e: MouseEvent) => {
      const term = termFrom(e.target);
      if (term) {
        const touch = (e as PointerEvent).pointerType !== "mouse";
        if (touch && openAtPress === term) close();
        else open(term);
      } else if (!inTip(e.target)) {
        close();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) {
        close();
        return;
      }
      const term = termFrom(e.target);
      if (term && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        if (active === term) close();
        else open(term);
      }
    };
    const onFocusIn = (e: FocusEvent) => {
      const term = termFrom(e.target);
      if (term) open(term);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (termFrom(e.target) === active && !inTip(e.relatedTarget)) close();
    };
    const onViewportChange = () => {
      if (active) position();
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    window.addEventListener("scroll", onViewportChange, { passive: true, capture: true });
    window.addEventListener("resize", onViewportChange);

    return () => {
      window.clearTimeout(retryTimer);
      observer.disconnect();
      window.clearTimeout(frame);
      cancelClose();
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("scroll", onViewportChange, { capture: true });
      window.removeEventListener("resize", onViewportChange);
      tip.remove();
    };
  }, []);

  return null;
}
