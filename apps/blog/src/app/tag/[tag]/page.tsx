import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { notFound } from "next/navigation";
import { BentoGrid } from "@/components/bento-grid";
import { PostCard } from "@/components/post-card";
import { FilterBar } from "@/components/filter-bar";
import { SiteSidebar } from "@/components/site-sidebar";
import { filterPostsByTag, getCategories, getTags } from "@/lib/taxonomy";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export const generateStaticParams = async () =>
  getTags(allPosts).map((tag) => ({ tag: tag.slug }));

export default async function TagPage({ params }: TagPageProps) {
  const slug = (await params).tag;
  const categories = getCategories(allPosts);
  const tags = getTags(allPosts);
  const filtered = filterPostsByTag(allPosts, slug).sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const current = tags.find((tag) => tag.slug === slug);
  if (!current) notFound();

  return (
    <main className="container mx-auto min-h-screen py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          태그: {current.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          #{current.name} 태그가 붙은 글입니다.
        </p>
      </header>

      <FilterBar categories={categories} tags={tags} activeTagSlug={slug} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <BentoGrid>
            {filtered.map((post, idx) => (
              <PostCard
                key={post._id}
                post={post}
                featured={idx === 0}
              />
            ))}
            {filtered.length === 0 && (
              <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed bg-muted/50 p-6 text-muted-foreground md:col-span-3">
                이 태그에 게시물이 없습니다.
              </div>
            )}
          </BentoGrid>
        </div>
        <SiteSidebar categories={categories} tags={tags} activeTagSlug={slug} />
      </div>
    </main>
  );
}
