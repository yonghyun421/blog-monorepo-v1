import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { FilterBar } from "@/components/filter-bar";
import { getCategories, getTags } from "@/lib/taxonomy";

export default function TagIndexPage() {
  const tags = getTags(allPosts);
  const categories = getCategories(allPosts);

  return (
    <main className="container mx-auto min-h-screen py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">태그</h1>
        <p className="mt-2 text-muted-foreground">태그별로 글을 살펴보세요.</p>
      </header>

      <FilterBar categories={categories} tags={tags} />

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tag/${tag.slug}`}
            className="rounded-full border px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            #{tag.name} <span className="ml-1 text-xs">{tag.count}</span>
          </Link>
        ))}
        {tags.length === 0 && (
          <div className="rounded-xl border border-dashed p-6 text-muted-foreground">
            태그가 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}
