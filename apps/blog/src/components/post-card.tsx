import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import { cn } from "@repo/ui/utils";

interface PostCardProps {
  post: Post;
  className?: string;
  featured?: boolean;
}

export function PostCard({ post, className, featured = false }: PostCardProps) {
  return (
    <Link
      href={post.url}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover",
        "h-full",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          {post.category && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              {post.category}
            </span>
          )}
          {post.tags && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <h3 className={cn("font-bold tracking-tight", featured ? "text-3xl" : "text-xl")}>
          {post.title}
        </h3>
        <p className="line-clamp-2 text-muted-foreground">
          {post.description}
        </p>
      </div>
      <div className="mt-4 flex items-center text-sm font-medium text-primary">
        Read more <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
