"use client";

import { useState } from "react";
import { List, X } from "lucide-react";
import { cn } from "@repo/ui/utils";
import type { TocHeading } from "@/lib/headings";

interface MobilePostTocProps {
  headings: TocHeading[];
}

export function MobilePostToc({ headings }: MobilePostTocProps) {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-1 rounded-full border bg-background px-3 py-2 text-xs shadow-lg lg:hidden"
        aria-label="목차 열기"
      >
        <List className="h-3.5 w-3.5" />
        목차
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[68vh] overflow-y-auto rounded-t-2xl border bg-background p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">이 페이지에서</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted-foreground"
                aria-label="목차 닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-1">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                      heading.level === 3 && "pl-5"
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
