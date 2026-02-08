import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  href?: string;
  linkText?: string;
}

export function SectionHeading({
  title,
  href,
  linkText = "전체 보기 →",
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-accent" />
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
        >
          {linkText.replace(" →", "")}
          <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
