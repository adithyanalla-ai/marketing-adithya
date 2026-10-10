import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { slugify } from "./slug";

export type Source = { title: string; url: string };

export type PostMeta = {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated: string;
  category: string;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  sources: Source[];
  author: string;
  draft: boolean;
  trendSource?: string;
  trendScore?: number;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };
export type TocItem = { id: string; text: string; depth: 2 | 3 };
export type FaqItem = { q: string; a: string };

export const POSTS_DIR = path.join(process.cwd(), "content", "blog");
export const PAGE_SIZE = 9;

function toDateString(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v ?? "");
}

function parseFile(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const date = toDateString(data.date);
  return {
    title: String(data.title),
    description: String(data.description),
    slug: String(data.slug ?? file.replace(/\.mdx?$/, "")),
    date,
    updated: toDateString(data.updated ?? data.date),
    category: String(data.category ?? "General"),
    tags: (data.tags ?? []).map(String),
    primaryKeyword: String(data.primaryKeyword ?? ""),
    secondaryKeywords: (data.secondaryKeywords ?? []).map(String),
    sources: (data.sources ?? []) as Source[],
    author: String(data.author ?? "Adithya Reddy"),
    // Anything other than an explicit `draft: false` is treated as a draft.
    draft: data.draft !== false,
    trendSource: data.trendSource ? String(data.trendSource) : undefined,
    trendScore: typeof data.trendScore === "number" ? data.trendScore : undefined,
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
    content,
  };
}

/** Every post on disk, drafts included. Only scripts should use this. */
export function getAllPostsIncludingDrafts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map(parseFile);
}

/** Published posts only (draft: false), newest first. The single source for pages, sitemap and RSS. */
export function getPosts(): Post[] {
  return getAllPostsIncludingDrafts()
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export function getCategories(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of getPosts()) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return [...map].map(([name, count]) => ({ name, slug: slugify(name), count }));
}

export function getTags(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of getPosts()) for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
  return [...map].map(([name, count]) => ({ name, slug: slugify(name), count }));
}

export const postsInCategory = (slug: string) => getPosts().filter((p) => slugify(p.category) === slug);
export const postsWithTag = (slug: string) => getPosts().filter((p) => p.tags.some((t) => slugify(t) === slug));

export function relatedPosts(post: Post, limit = 3): Post[] {
  return getPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.p);
}

export function postsForTags(tags: string[], limit = 3): Post[] {
  const wanted = tags.map((t) => t.toLowerCase());
  return getPosts()
    .filter((p) => p.tags.some((t) => wanted.includes(t.toLowerCase())))
    .slice(0, limit);
}

/** Headings outside code fences, with ids matching rehype-slug. */
export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let fenced = false;
  for (const line of content.split("\n")) {
    if (/^```/.test(line)) fenced = !fenced;
    if (fenced) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[`*_]|\[([^\]]+)\]\([^)]*\)/g, "$1");
    items.push({ id: slugger.slug(text), text, depth: m[1].length as 2 | 3 });
  }
  return items;
}

const stripMd = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>]/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Q&A pairs from a "## FAQ" section: each "### question" followed by its answer. */
export function extractFaq(content: string): FaqItem[] {
  const lines = content.split("\n");
  const start = lines.findIndex((l) => /^##\s+(faq|frequently asked questions)\b/i.test(l));
  if (start === -1) return [];
  const items: FaqItem[] = [];
  let q = "";
  let a: string[] = [];
  const flush = () => {
    if (q && a.join(" ").trim()) items.push({ q: stripMd(q), a: stripMd(a.join(" ")) });
  };
  for (const line of lines.slice(start + 1)) {
    if (/^##\s/.test(line)) break;
    const h = /^###\s+(.+)/.exec(line);
    if (h) {
      flush();
      q = h[1];
      a = [];
    } else if (q) a.push(line);
  }
  flush();
  return items;
}
