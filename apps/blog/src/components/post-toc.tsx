"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";
import type { TocHeading } from "@/lib/headings";

interface PostTocProps {
  headings: TocHeading[];
}

export function PostToc({ headings }: PostTocProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const [currentUrl, setCurrentUrl] = useState("");
  const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings]);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (headingIds.length === 0) return;

    const elements = headingIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target instanceof HTMLElement) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0% -65% 0%", threshold: [0, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headingIds]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
    } catch {
      // no-op
    }
  };

  const onTocClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 86;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <div className="sticky top-24 space-y-6">
      <div>
        <div className="mb-3 text-sm font-semibold text-foreground">이 페이지에서</div>
        {headings.length === 0 ? (
          <p className="text-sm text-muted-foreground">목차가 없습니다.</p>
        ) : (
          <nav>
            <ul className="space-y-1.5">
              {headings.map((heading, index) => {
                const isActive = activeId === heading.id;

                return (
                  <motion.li
                    key={heading.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.25 }}
                  >
                    <a
                      href={`#${heading.id}`}
                      onClick={(event) => onTocClick(event, heading.id)}
                      className={cn(
                        "relative block rounded-md px-2 py-1 text-sm transition-colors",
                        heading.level === 3 && "pl-5",
                        isActive
                          ? "bg-accent/10 font-medium text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="toc-active-indicator"
                          className="absolute inset-y-1 left-0 w-1 rounded-full bg-accent"
                        />
                      )}
                      {heading.text}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      <div className="border-t pt-5">
        <div className="mb-2 text-sm font-semibold">공유</div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={copyLink}>
            링크 복사
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
          >
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
