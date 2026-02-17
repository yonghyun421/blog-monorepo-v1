import { compareDesc } from "date-fns";
import { notFound } from "next/navigation";
import { BentoGrid } from "@/components/bento-grid";
import { PostCard } from "@/components/post-card";
import { FilterBar } from "@/components/filter-bar";
import { SiteSidebar } from "@/components/site-sidebar";
import { StructuredData } from "@/components/structured-data";
import { getPublishedPosts } from "@/lib/content";
import { filterPostsByTag, getCategories, getTags } from "@/lib/taxonomy";
import { siteConfig } from "@/data/site-config";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export const generateStaticParams = async () =>
  getTags(getPublishedPosts()).map((tag) => ({ tag: tag.slug }));

export default async function TagPage({ params }: TagPageProps) {
  const slug = (await params).tag;
  const posts = getPublishedPosts();
  const categories = getCategories(posts);
  const tags = getTags(posts);
  const filtered = filterPostsByTag(posts, slug).sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const current = tags.find((tag) => tag.slug === slug);
  if (!current) notFound();
  const pageUrl = `${siteConfig.url}/tag/${slug}`;

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `태그: ${current.name}`,
    url: pageUrl,
    description: `태그 ${current.name}가 붙은 글 목록`,
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: filtered.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}${post.url}`,
        name: post.title,
      })),
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "태그",
        item: `${siteConfig.url}/tag`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: current.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="container mx-auto min-h-screen py-10">
      <StructuredData data={collectionStructuredData} />
      <StructuredData data={breadcrumbStructuredData} />
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
