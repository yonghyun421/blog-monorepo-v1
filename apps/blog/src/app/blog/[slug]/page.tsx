import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import type { Metadata } from "next";
import { Mdx } from "@/components/mdx";
import Link from "next/link";
import { SiteSidebar } from "@/components/site-sidebar";
import { PostToc } from "@/components/post-toc";
import { PostCard } from "@/components/post-card";
import { StructuredData } from "@/components/structured-data";
import { getPublishedPosts } from "@/lib/content";
import { getCategories, getTags, toSlug } from "@/lib/taxonomy";
import { extractHeadingsFromMarkdown } from "@/lib/headings";
import {
  getPostMeta,
  getPostTags,
  getPrevNextPosts,
  getReadingTime,
  getRelatedPosts,
} from "@/lib/post-meta";
import { siteConfig } from "@/data/site-config";
import { profile } from "@/data/profile";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = async () => 
  getPublishedPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: PostPageProps): Promise<Metadata> => {
  const slug = (await params).slug;
  const post = getPublishedPosts().find((item) => item.slug === slug);
  if (!post) return { title: "글" };
  const description = post.description ?? siteConfig.description;
  const ogImage = `${siteConfig.url}/og?title=${encodeURIComponent(
    post.title
  )}&subtitle=${encodeURIComponent(description)}`;
  const url = `${siteConfig.url}${post.url}`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
    },
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const slug = (await params).slug;
  const posts = getPublishedPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  const categories = getCategories(posts);
  const tags = getTags(posts);
  const activeCategorySlug = post.category ? toSlug(post.category) : undefined;
  const headings = extractHeadingsFromMarkdown(post.body.raw);
  const readingTime = getReadingTime(post);
  const meta = getPostMeta(post);
  const displayTags = getPostTags(post);
  const { prev, next } = getPrevNextPosts(posts, post.slug);
  const relatedPosts = getRelatedPosts(posts, post, 3);
  const postUrl = `${siteConfig.url}${post.url}`;
  const postDescription = post.description ?? siteConfig.description;

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: postDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: postUrl,
    url: postUrl,
    keywords: displayTags.join(", "),
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "블로그",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <div className="container mx-auto min-h-screen py-10">
      <StructuredData data={articleStructuredData} />
      <StructuredData data={breadcrumbStructuredData} />
       {/* Top Navigation / Breadcrumb */}
      <div className="mb-8">
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
          ← 목록으로
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <SiteSidebar
          categories={categories}
          tags={tags}
          activeCategorySlug={activeCategorySlug}
        />

        {/* Main Content */}
        <main className="lg:col-span-6">
          <article>
            <header className="mb-8 space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
                <time dateTime={post.date}>
                  {format(parseISO(post.date), "LLLL d, yyyy")}
                </time>
                <span>•</span>
                <span>{readingTime} min read</span>
                {post.category && (
                  <>
                    <span>•</span>
                    <Link
                      href={`/category/${toSlug(post.category)}`}
                      className="hover:text-foreground"
                    >
                      {post.category}
                    </Link>
                  </>
                )}
                {displayTags.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{displayTags.join(", ")}</span>
                  </>
                )}
              </div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                {meta.series && (
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    Series: {meta.series}
                  </span>
                )}
                {meta.difficulty && (
                  <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    {meta.difficulty}
                  </span>
                )}
                {meta.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </header>
            
            <Mdx code={post.body.code} />
          </article>

          <section className="mt-12 space-y-6 border-t pt-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={prev.url}
                  className="rounded-xl border bg-card p-4 transition-colors hover:border-accent/40"
                >
                  <div className="text-xs text-muted-foreground">이전 글</div>
                  <div className="mt-1 font-medium">{prev.title}</div>
                </Link>
              ) : (
                <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  이전 글이 없습니다.
                </div>
              )}
              {next ? (
                <Link
                  href={next.url}
                  className="rounded-xl border bg-card p-4 text-right transition-colors hover:border-accent/40"
                >
                  <div className="text-xs text-muted-foreground">다음 글</div>
                  <div className="mt-1 font-medium">{next.title}</div>
                </Link>
              ) : (
                <div className="rounded-xl border border-dashed p-4 text-right text-sm text-muted-foreground">
                  다음 글이 없습니다.
                </div>
              )}
            </div>

            {relatedPosts.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold tracking-tight">관련 글</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {relatedPosts.map((item) => (
                    <PostCard key={item._id} post={item} />
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>

        <aside className="hidden lg:col-span-3 lg:block">
          <PostToc headings={headings} />
        </aside>
      </div>
    </div>
  );
}
