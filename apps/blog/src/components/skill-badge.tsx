import { cn } from "@repo/ui/utils";

interface SkillBadgeProps {
  name: string;
  className?: string;
}

export function SkillBadge({ name, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent transition-colors duration-200 hover:bg-accent/20",
        className
      )}
    >
      {name}
    </span>
  );
}
