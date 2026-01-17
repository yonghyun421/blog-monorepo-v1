import Link from "next/link";
import type { TaxonomyItem } from "@/lib/taxonomy";
import { cn } from "@repo/ui/utils";

interface SiteSidebarProps {
  categories: TaxonomyItem[];
  tags: TaxonomyItem[];
  activeCategorySlug?: string;
  activeTagSlug?: string;
}

export function SiteSidebar({
  categories,
  tags,
  activeCategorySlug,
  activeTagSlug,
}: SiteSidebarProps) {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24 space-y-8">
        <div>
          <div className="mb-3 text-sm font-semibold text-foreground">카테고리</div>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={cn(
                  "flex items-center justify-between rounded-md px-2 py-1 hover:text-foreground",
                  activeCategorySlug === category.slug &&
                    "bg-accent text-foreground"
                )}
              >
                <span>{category.name}</span>
                <span className="text-xs">{category.count}</span>
              </Link>
            ))}
            {categories.length === 0 && (
              <span className="text-xs text-muted-foreground">카테고리가 없습니다.</span>
            )}
          </nav>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-foreground">태그</div>
          <nav className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className={cn(
                  "rounded-full border px-3 py-1 hover:text-foreground",
                  activeTagSlug === tag.slug && "border-foreground text-foreground"
                )}
              >
                #{tag.name}
              </Link>
            ))}
            {tags.length === 0 && (
              <span className="text-xs text-muted-foreground">태그가 없습니다.</span>
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
}
