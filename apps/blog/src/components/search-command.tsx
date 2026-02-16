"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { cn } from "@repo/ui/utils";

interface SearchItem {
  title: string;
  url: string;
  description?: string;
  category?: string;
  tags: string[];
}

interface SearchCommandProps {
  items: SearchItem[];
}

export function SearchCommand({ items }: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isMetaK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isMetaK) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(id);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? items.filter((item) => {
          const haystack = [
            item.title,
            item.description ?? "",
            item.category ?? "",
            ...item.tags,
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        })
      : items;

    return base.slice(0, 8);
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;

    const onNavigate = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "Enter" && results[activeIndex]) {
        window.location.href = results[activeIndex].url;
      }
    };

    window.addEventListener("keydown", onNavigate);
    return () => window.removeEventListener("keydown", onNavigate);
  }, [activeIndex, open, results]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-md border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground md:flex"
        aria-label="검색 열기"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search</span>
        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-muted-foreground md:hidden"
        aria-label="검색 열기"
      >
        <Search className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] bg-black/40 p-3 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="mx-auto mt-16 w-full max-w-2xl overflow-hidden rounded-xl border bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="글 제목, 태그, 카테고리로 검색"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="검색 닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-2 py-8 text-center text-sm text-muted-foreground">
                  검색 결과가 없습니다.
                </p>
              ) : (
                <ul className="space-y-1">
                  {results.map((item, index) => (
                    <li key={item.url}>
                      <Link
                        href={item.url}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2 transition-colors",
                          index === activeIndex
                            ? "bg-accent/10 text-accent"
                            : "hover:bg-muted/70"
                        )}
                      >
                        <div className="text-sm font-medium">{item.title}</div>
                        {item.description && (
                          <div className="line-clamp-1 text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        )}
                        <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-muted-foreground">
                          {item.category && <span>{item.category}</span>}
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={`${item.url}-${tag}`}>#{tag}</span>
                          ))}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
