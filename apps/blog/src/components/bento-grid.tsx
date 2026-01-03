import { ReactNode } from "react";
import { cn } from "@repo/ui/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(180px,auto)]",
        className
      )}
    >
      {children}
    </div>
  );
}
