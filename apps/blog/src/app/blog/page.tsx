import { compareDesc } from "date-fns";
import { BentoGrid } from "@/components/bento-grid";
import { PostCard } from "@/components/post-card";
import { FilterBar } from "@/components/filter-bar";
import { SiteSidebar } from "@/components/site-sidebar";
import { AnimateInView } from "@/components/animate-in-view";
import { getPublishedPosts } from "@/lib/content";
import { getCategories, getTags } from "@/lib/taxonomy";

export const metadata = {
  title: "블로그",
  description: "기록하고, 만들고, 성장합니다.",
};

export default function BlogPage() {
  const posts = getPublishedPosts().sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const categories = getCategories(posts);
  const tags = getTags(posts);

  return (
    <main className="container mx-auto min-h-screen py-10">
      <header className="mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">블로그</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            기록하고, 만들고, 성장합니다.
          </p>
        </div>
      </header>

      <FilterBar categories={categories} tags={tags} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <BentoGrid>
            {posts.map((post, idx) => (
              <AnimateInView
                key={post._id}
                delay={idx * 100}
                className={idx === 0 ? "md:col-span-2 md:row-span-2" : ""}
              >
                <PostCard post={post} featured={idx === 0} />
              </AnimateInView>
            ))}
            {posts.length === 0 && (
              <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed bg-muted/50 p-6 text-muted-foreground md:col-span-3">
                아직 게시물이 없습니다. content/posts에 글을 추가해 주세요.
              </div>
            )}
          </BentoGrid>
        </div>
        <SiteSidebar categories={categories} tags={tags} />
      </div>
    </main>
  );
}
