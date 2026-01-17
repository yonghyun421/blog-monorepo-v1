import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@repo/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            My Blog
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/" className="hover:text-foreground">
              홈
            </Link>
            <Link href="/category" className="hover:text-foreground">
              카테고리
            </Link>
            <Link href="/tag" className="hover:text-foreground">
              태그
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button size="sm">구독</Button>
        </div>
      </div>
    </header>
  );
}
