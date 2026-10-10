import Link from "next/link";
import { getCategories, getPosts, PAGE_SIZE, type PostMeta } from "@/lib/blog";
import { PostCard } from "./PostCard";
import { Pagination } from "./Pagination";
import { BlogSearch } from "./BlogSearch";

export function BlogListing({
  posts, page, base, activeCategory, showFeatured,
}: { posts: PostMeta[]; page: number; base: string; activeCategory?: string; showFeatured?: boolean }) {
  const cats = getCategories();
  const pages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const featured = showFeatured && page === 1 ? posts[0] : undefined;
  const rest = featured ? posts.slice(1, PAGE_SIZE) : posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const index = getPosts().map((p) => ({ title: p.title, slug: p.slug, description: p.description, tags: p.tags }));
  return (
    <>
      <BlogSearch items={index} />
      <nav aria-label="Categories" className="mt-6 flex flex-wrap gap-2">
        <Link href="/blog/" aria-current={!activeCategory ? "page" : undefined}
          className={`rounded-full border px-6 py-1.5 text-sm ${!activeCategory ? "border-brand bg-brand text-white" : "border-card-line bg-white"}`}>All</Link>
        {cats.map((c) => (
          <Link key={c.slug} href={`/blog/category/${c.slug}/`} aria-current={activeCategory === c.slug ? "page" : undefined}
            className={`rounded-full border px-6 py-1.5 text-sm ${activeCategory === c.slug ? "border-brand bg-brand text-white" : "border-card-line bg-white"}`}>
            {c.name} ({c.count})
          </Link>
        ))}
      </nav>
      {posts.length === 0 && <p className="mt-10 text-muted">No articles yet. Check back soon.</p>}
      {featured && <div className="mt-8"><PostCard post={featured} featured /></div>}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{rest.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      <Pagination page={page} pages={pages} base={base} />
    </>
  );
}
