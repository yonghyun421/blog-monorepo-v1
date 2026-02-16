import Link from "next/link";
import { getPublishedPosts } from "@/lib/content";
import { getCategories, getTags } from "@/lib/taxonomy";
import { FilterBar } from "@/components/filter-bar";

export default function CategoryIndexPage() {
  const posts = getPublishedPosts();
  const categories = getCategories(posts);
  const tags = getTags(posts);

  return (
    <main className="container mx-auto min-h-screen py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">카테고리</h1>
        <p className="mt-2 text-muted-foreground">
          카테고리별로 게시물을 확인하세요.
        </p>
      </header>

      <FilterBar categories={categories} tags={tags} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="flex items-center justify-between rounded-xl border bg-card p-4 transition hover:bg-accent/40"
          >
            <span className="font-medium">{category.name}</span>
            <span className="text-sm text-muted-foreground">{category.count}</span>
          </Link>
        ))}
        {categories.length === 0 && (
          <div className="rounded-xl border border-dashed p-6 text-muted-foreground">
            카테고리가 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}
