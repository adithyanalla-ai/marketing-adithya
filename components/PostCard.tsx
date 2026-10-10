import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { slugify } from "@/lib/slug";

export function formatDate(d: string) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  return (
    <article className={`rounded-2xl border border-line bg-white p-6 ${featured ? "md:p-10" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        <Link href={`/blog/category/${slugify(post.category)}/`}>{post.category}</Link>
      </p>
      {featured ? (
        <h2 className="mt-2 text-3xl font-semibold"><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h2>
      ) : (
        <h3 className="mt-2 text-xl font-semibold"><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h3>
      )}
      <p className="mt-3 text-muted">{post.description}</p>
      <p className="mt-4 text-sm text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
      </p>
    </article>
  );
}
