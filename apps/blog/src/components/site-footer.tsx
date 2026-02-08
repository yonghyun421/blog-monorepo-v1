import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card/50">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <nav className="flex gap-4 text-sm text-muted-foreground">
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
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
        <SocialLinks className="flex items-center gap-4" />
      </div>
    </footer>
  );
}
