"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { cn } from "@repo/ui/utils";
import { getPostMeta, getPostTags, getReadingTime } from "@/lib/post-meta";

interface PostCardProps {
  post: Post;
  className?: string;
  featured?: boolean;
}

export function PostCard({ post, className, featured = false }: PostCardProps) {
  const reduceMotion = useReducedMotion();
  const tags = getPostTags(post);
  const readingTime = getReadingTime(post);
  const meta = getPostMeta(post);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, hsl(var(--accent) / 0.16), transparent 70%)`;

  const onPointerMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  return (
    <Link
      href={post.url}
      className={cn(
        "group block h-full",
        className
      )}
    >
      <motion.article
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-card p-6 shadow-card transition-colors duration-300 hover:border-accent/30 hover:shadow-card-hover"
        whileHover={reduceMotion ? undefined : { y: -7, scale: 1.012 }}
        whileTap={reduceMotion ? undefined : { scale: 0.996 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.35 }}
        onMouseMove={onPointerMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: spotlight, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.22 }}
          />
        )}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
            <span>•</span>
            <span>{readingTime} min read</span>
            {post.category && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                {post.category}
              </span>
            )}
            {meta.difficulty && (
              <span className="rounded-full border px-2 py-0.5 text-xs">
                {meta.difficulty}
              </span>
            )}
            {tags.length > 0 && (
              <div className="flex gap-1">
                {tags.slice(0, 2).map((tag) => (
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
      </motion.article>
    </Link>
  );
}
