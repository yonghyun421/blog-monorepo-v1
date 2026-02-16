import Link from "next/link";
import { Github } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { SearchCommand } from "@/components/search-command";
import { siteConfig } from "@/data/site-config";
import { getPublishedPosts } from "@/lib/content";
import { getPostTags } from "@/lib/post-meta";

export function SiteHeader() {
  const searchItems = getPublishedPosts().map((post) => ({
    title: post.title,
    url: post.url,
    description: post.description,
    category: post.category,
    tags: getPostTags(post),
  }));

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:h-16">
        <div className="flex items-center gap-5 md:gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight transition-colors duration-200 hover:text-accent">
            {siteConfig.name}
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/" className="transition-colors duration-200 hover:text-accent">
              홈
            </Link>
            <Link href="/about" className="transition-colors duration-200 hover:text-accent">
              소개
            </Link>
            <Link href="/projects" className="transition-colors duration-200 hover:text-accent">
              프로젝트
            </Link>
            <Link href="/blog" className="transition-colors duration-200 hover:text-accent">
              블로그
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2.5 md:gap-3">
          <SearchCommand items={searchItems} />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-muted-foreground transition-colors duration-200 hover:text-accent sm:block"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
