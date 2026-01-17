import Link from "next/link";
import type { TaxonomyItem } from "@/lib/taxonomy";
import { cn } from "@repo/ui/utils";

interface FilterBarProps {
  categories: TaxonomyItem[];
  tags: TaxonomyItem[];
  activeCategorySlug?: string;
  activeTagSlug?: string;
}

export function FilterBar({
  categories,
  tags,
  activeCategorySlug,
  activeTagSlug,
}: FilterBarProps) {
  return (
    <section className="mb-8 space-y-4 lg:hidden">
      <div>
        <div className="mb-2 text-xs font-semibold text-muted-foreground">
          카테고리
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={cn(
                "rounded-full border px-3 py-1 text-xs text-muted-foreground",
                "hover:text-foreground",
                activeCategorySlug === category.slug &&
                  "border-foreground text-foreground"
              )}
            >
              {category.name}
            </Link>
          ))}
          {categories.length === 0 && (
            <span className="text-xs text-muted-foreground">카테고리가 없습니다.</span>
          )}
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold text-muted-foreground">태그</div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className={cn(
                "rounded-full border px-3 py-1 text-xs text-muted-foreground",
                "hover:text-foreground",
                activeTagSlug === tag.slug && "border-foreground text-foreground"
              )}
            >
              #{tag.name}
            </Link>
          ))}
          {tags.length === 0 && (
            <span className="text-xs text-muted-foreground">태그가 없습니다.</span>
          )}
        </div>
      </div>
    </section>
  );
}
