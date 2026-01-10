import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { BentoGrid } from "@/components/bento-grid";
import { PostCard } from "@/components/post-card";
import { Button } from "@repo/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <main className="container mx-auto min-h-screen py-10">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Learning, coding, and building.
          </p>
        </div>
        <div className="flex gap-4">
          <ModeToggle />
          <Button>Subscribe</Button>
        </div>
      </header>

      <BentoGrid>
        {posts.map((post, idx) => (
          <PostCard 
            key={post._id} 
            post={post} 
            featured={idx === 0}
          />
        ))}
        {/* Placeholder for future Bento items */}
        {posts.length === 0 && (
          <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed bg-muted/50 p-6 text-muted-foreground md:col-span-3">
            No posts found. Create a post in content/posts to get started.
          </div>
        )}
      </BentoGrid>
    </main>
  );
}
