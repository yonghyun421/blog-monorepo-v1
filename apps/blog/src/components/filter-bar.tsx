"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
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
  const pathname = usePathname();
  const [showDetail, setShowDetail] = useState(false);

  const isBlogRoot = useMemo(
    () => pathname === "/blog" || pathname === "/category" || pathname === "/tag",
    [pathname]
  );

  return (
    <section className="sticky top-14 z-30 mb-8 border-y bg-background/95 py-3 backdrop-blur lg:hidden md:top-16">
      <div className="space-y-3 px-4">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none]">
          <Link
            href="/blog"
            className={cn(
              "rounded-full border px-3 py-1 text-xs",
              isBlogRoot
                ? "border-accent text-accent"
                : "text-muted-foreground transition-colors hover:text-accent"
            )}
          >
            전체
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={cn(
                "rounded-full border px-3 py-1 text-xs",
                "transition-colors duration-200",
                activeCategorySlug === category.slug
                  ? "border-accent text-accent"
                  : "text-muted-foreground hover:text-accent"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-muted-foreground">
            필터
          </div>
          <button
            type="button"
            onClick={() => setShowDetail((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {showDetail ? "접기" : "태그/카테고리"}
          </button>
        </div>

        {showDetail && (
          <div className="space-y-3 rounded-lg border bg-card/60 p-3">
            <div>
              <div className="mb-2 text-[11px] font-semibold text-muted-foreground">
                카테고리
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={`panel-${category.slug}`}
                    href={`/category/${category.slug}`}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs",
                      "transition-colors duration-200",
                      activeCategorySlug === category.slug
                        ? "border-accent text-accent"
                        : "text-muted-foreground hover:text-accent"
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
              <div className="mb-2 text-[11px] font-semibold text-muted-foreground">태그</div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs",
                      "transition-colors duration-200",
                      activeTagSlug === tag.slug
                        ? "border-accent text-accent"
                        : "text-muted-foreground hover:text-accent"
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
          </div>
        )}
      </div>
    </section>
  );
}
