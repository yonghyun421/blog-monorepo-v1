import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Mdx } from "@/components/mdx";
import Link from "next/link";
import { Button } from "@repo/ui/button";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = async () => 
  allPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: PostPageProps) => {
  const slug = (await params).slug;
  const post = allPosts.find((post) => post.slug === slug);
  if (!post) throw new Error(`Post not found for slug: ${slug}`);
  return { title: post.title };
};

export default async function PostPage({ params }: PostPageProps) {
  const slug = (await params).slug;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) notFound();

  return (
    <div className="container mx-auto min-h-screen py-10">
       {/* Top Navigation / Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Sidebar (Navigation/Series - Placeholder) */}
        <aside className="hidden lg:col-span-2 lg:block">
           <div className="sticky top-24 space-y-4">
             <div className="font-semibold text-sm text-foreground">Navigation</div>
             <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <Link href="#" className="hover:text-primary">Series</Link>
                <Link href="#" className="hover:text-primary">About</Link>
             </nav>
           </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-7">
          <article>
            <header className="mb-8 space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
                <time dateTime={post.date}>
                  {format(parseISO(post.date), "LLLL d, yyyy")}
                </time>
                <span>•</span>
                <span>{post.tags?.join(", ")}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {post.title}
              </h1>
            </header>
            
            <Mdx code={post.body.code} />
          </article>
        </main>

        {/* Right Sidebar (TOC - Placeholder) */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="font-semibold text-sm text-foreground">On This Page</div>
             <div className="text-sm text-muted-foreground">
              {/* Actual TOC implementation requires parsing headings */}
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary">Introduction</a></li>
                <li><a href="#" className="hover:text-primary">Features</a></li>
              </ul>
            </div>
             <div className="mt-8 border-t pt-8">
                <div className="font-semibold text-sm mb-2">Share</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Twitter</Button>
                  <Button size="sm" variant="outline">Copy Link</Button>
                </div>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
