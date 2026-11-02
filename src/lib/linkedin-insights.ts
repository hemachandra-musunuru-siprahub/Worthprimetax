import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { FALLBACK_INSIGHTS, INSIGHTS_PAGE, LINKEDIN_FEED, type Insight } from "@/data/site";

/**
 * Data file our SociableKIT widget loads. It is not a documented API, so every field is validated
 * and any failure falls back to the last good copy, then to FALLBACK_INSIGHTS.
 */
const FEED_URL = `https://data.accentapi.com/feed/${LINKEDIN_FEED.embedId}.json`;
const CACHE_MS = 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 5000;
const TITLE_MAX = 110;
const EXCERPT_MAX = 200;

const postSchema = z.object({
  id: z.string().min(1),
  raw_text: z.string().min(1),
  post_date_time: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
  profile_name: z.string().optional(),
  post_url: z.string().url().startsWith("https://www.linkedin.com/"),
  image_urls: z.array(z.string()).optional(),
  // When the post reshares another one, that post's text as HTML (<br> line breaks, links).
  shared_post_description: z.string().optional(),
});
const feedSchema = z.object({ posts: z.array(z.unknown()) });

type LinkedInPost = z.infer<typeof postSchema>;

let cache: { at: number; insights: Insight[] } | null = null;

/** Articles for the Insights pages, newest first. Server-side, cached for an hour. */
export async function loadInsights(): Promise<Insight[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.insights;
  try {
    const insights = await fetchLinkedInInsights();
    if (insights.length === 0) throw new Error("no LinkedIn posts left after filtering");
    cache = { at: Date.now(), insights };
    return insights;
  } catch (error) {
    console.error("LinkedIn insights feed unavailable:", error);
    return cache?.insights ?? FALLBACK_INSIGHTS;
  }
}

/** Callable from route loaders on both the server render and client-side navigation. */
export const getInsights = createServerFn({ method: "GET" }).handler(() => loadInsights());

async function fetchLinkedInInsights(): Promise<Insight[]> {
  const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`feed responded ${res.status}`);
  const feed = feedSchema.parse(await res.json());

  const insights = feed.posts.flatMap((raw) => {
    const parsed = postSchema.safeParse(raw);
    if (!parsed.success) return [];
    const post = withSharedText(parsed.data);
    if (isExcluded(post)) return [];
    const insight = postToInsight(post);
    return insight ? [insight] : [];
  });

  return dedupeSlugs(insights).sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * A reshare's own text is often just a one-line comment ("Health is Wealth - An initiative by
 * WorthPrime Tax!"), which would leave the article empty. Append the shared post's text so the
 * comment becomes the title and the shared post the body.
 */
function withSharedText(post: LinkedInPost): LinkedInPost {
  const shared = post.shared_post_description && htmlToText(post.shared_post_description);
  if (!shared || post.raw_text.trim().includes("\n")) return post;
  return { ...post, raw_text: `${post.raw_text}\n\n${shared}` };
}

function htmlToText(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function isExcluded(post: LinkedInPost) {
  if (LINKEDIN_FEED.excludePostIds.includes(post.id)) return true;
  const text = post.raw_text.toLowerCase();
  return LINKEDIN_FEED.excludeKeywords.some((word) =>
    new RegExp(`(^|[^\\p{L}])${word}`, "u").test(text),
  );
}

// ---- Turning a LinkedIn post into the article template -------------------------------------
// Posts use emoji, keycap numbers and one-line-per-sentence formatting. The template wants plain
// paragraphs, so lines are cleaned and regrouped: a numbered or 🔹 line starts a section (and
// becomes a Key Takeaway), bullet lines are joined into one sentence, the rest flow as prose.

type LineKind = "heading" | "bullet" | "lead" | "text";
type Line = { kind: LineKind; text: string; afterBlank: boolean };

const KEYCAP = /^(?:[0-9]\u{FE0F}?\u{20E3}|\u{1F51F})/u;
const SECTION_MARK = /^(?:\u{1F539}|\u{1F538}|\u{25AA}|\u{25B8}|\u{25BA})/u;
const BULLET_MARK = /^(?:\u{2022}|\u{25E6}|-|\u{2013}|\*|\u{2714}|\u{2713}|\u{2705}|\u{274C})/u;
const LEADING_EMOJI = /^\p{Extended_Pictographic}/u;
// Keycap numbers, pictographs, flags, skin tones and the invisible joiners/selectors around them.
const EMOJI =
  /[0-9#*]\u{FE0F}?\u{20E3}|\u{1F51F}|\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]|[\u{1F3FB}-\u{1F3FF}]|\u{FE0F}|\u{200D}|\u{200B}/gu;
const HASHTAG = /(^|\s)#[\p{L}\p{N}_]+/gu;

function cleanText(text: string) {
  return text.replace(HASHTAG, "$1").replace(EMOJI, "").replace(/\s+/g, " ").trim();
}

function toLines(post: LinkedInPost): Line[] {
  const lines: Line[] = [];
  let afterBlank = false;
  for (const raw of post.raw_text.split("\n")) {
    const trimmed = raw.trim();
    const text = cleanText(trimmed.replace(BULLET_MARK, ""));
    if (!text || text === post.profile_name) {
      afterBlank ||= !trimmed;
      continue;
    }
    const kind: LineKind =
      KEYCAP.test(trimmed) || SECTION_MARK.test(trimmed)
        ? "heading"
        : BULLET_MARK.test(trimmed)
          ? "bullet"
          : LEADING_EMOJI.test(trimmed)
            ? "lead"
            : "text";
    lines.push({ kind, text, afterBlank });
    afterBlank = false;
  }
  return lines;
}

function postToInsight(post: LinkedInPost): Insight | null {
  const lines = toLines(post);
  const first = lines.shift();
  if (!first) return null;

  const { title, rest } = splitTitle(first.text);
  if (rest) lines.unshift({ kind: "text", text: rest, afterBlank: false });

  // The first prose line doubles as the excerpt; it stays in the body only if it was shortened.
  let excerpt = "";
  if (lines[0] && lines[0].kind !== "heading" && lines[0].kind !== "bullet") {
    excerpt = truncate(lines[0].text, EXCERPT_MAX);
    if (excerpt === lines[0].text) lines.shift();
  }

  const images = (post.image_urls ?? [])
    .filter((url) => url.startsWith("https://"))
    .map((src) => ({ src, alt: title }));
  return {
    // The ID suffix keeps the URL stable if the post's first line is edited later.
    slug: `${slugify(title)}-${post.id.slice(-7)}`,
    tag: topicOf(post.raw_text),
    date: post.post_date_time.slice(0, 10),
    title,
    excerpt,
    body: toParagraphs(lines),
    takeaways: lines.filter((l) => l.kind === "heading").map((l) => stripEnd(l.text)),
    cta: { label: INSIGHTS_PAGE.postCta },
    ...(images.length > 0 && { images }),
    sourceUrl: post.post_url,
  };
}

/** A long first line is a paragraph, not a headline: its first sentence becomes the title. */
function splitTitle(line: string) {
  if (line.length <= TITLE_MAX) return { title: line, rest: "" };
  const sentence = /^(.{20,}?[.!?])\s+(.+)$/.exec(line);
  if (sentence && sentence[1]!.length <= TITLE_MAX) {
    return { title: sentence[1]!, rest: sentence[2]! };
  }
  return { title: truncate(line, TITLE_MAX), rest: line };
}

function toParagraphs(lines: Line[]) {
  const paragraphs: string[] = [];
  let heading = "";
  let parts: string[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length) parts.push(`${bullets.map(stripEnd).join("; ")}.`);
    bullets = [];
  };
  const flush = () => {
    flushBullets();
    const text = parts.join(" ");
    if (heading || text) paragraphs.push(heading ? `${stripEnd(heading)}: ${text}`.trim() : text);
    heading = "";
    parts = [];
  };

  for (const line of lines) {
    if (line.kind === "heading") {
      flush();
      heading = line.text;
    } else if (line.kind === "bullet") {
      bullets.push(line.text);
    } else {
      if (line.kind === "lead" || line.afterBlank) flush();
      flushBullets();
      parts.push(endSentence(line.text));
    }
  }
  flush();
  return paragraphs.map((p) => (p.endsWith(":") ? `${p.slice(0, -1)}.` : p));
}

function topicOf(text: string): Insight["tag"] {
  const hashtags = [...text.matchAll(/#([\p{L}\p{N}_]+)/gu)].map((m) => m[1]!.toLowerCase());
  if (hashtags.some((t) => /account|bookkeep/.test(t))) return "Accounting";
  if (hashtags.some((t) => t.includes("compliance"))) return "Compliance";
  return "Tax";
}

function endSentence(text: string) {
  return /[.!?:;…"”')]$/.test(text) ? text : `${text}.`;
}

function stripEnd(text: string) {
  return text.replace(/[\s.:;,]+$/, "");
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf(" ", max);
  return `${text.slice(0, cut > 0 ? cut : max).replace(/[\s,;:.]+$/, "")}…`;
}

function slugify(text: string) {
  return text
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

/** Two posts with the same title would share a URL; number the later ones. */
function dedupeSlugs(insights: Insight[]) {
  const seen = new Map<string, number>();
  return insights.map((insight) => {
    const count = (seen.get(insight.slug) ?? 0) + 1;
    seen.set(insight.slug, count);
    return count === 1 ? insight : { ...insight, slug: `${insight.slug}-${count}` };
  });
}
