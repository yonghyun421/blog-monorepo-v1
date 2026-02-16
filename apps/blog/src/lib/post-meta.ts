import type { Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { toSlug } from "@/lib/taxonomy";

type ExtendedPost = Post & {
  normalizedTags?: string[];
  readingTimeMinutes?: number;
  series?: string;
  difficulty?: string;
  topics?: string[];
};

export const getPostTags = (post: Post): string[] => {
  const item = post as ExtendedPost;
  if (item.normalizedTags && item.normalizedTags.length > 0) {
    return item.normalizedTags;
  }
  if (post.tags && post.tags.length > 0) {
    return post.tags;
  }
  return post.category ? [post.category] : ["general"];
};

export const getReadingTime = (post: Post): number => {
  const item = post as ExtendedPost;
  if (item.readingTimeMinutes) return item.readingTimeMinutes;

  const words = post.body.raw.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
};

export const sortPostsByDateDesc = (posts: Post[]) =>
  [...posts].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

export const getPrevNextPosts = (posts: Post[], slug: string) => {
  const sorted = sortPostsByDateDesc(posts);
  const index = sorted.findIndex((item) => item.slug === slug);

  if (index < 0) return { prev: undefined, next: undefined };

  return {
    prev: sorted[index + 1],
    next: sorted[index - 1],
  };
};

export const getRelatedPosts = (posts: Post[], current: Post, limit = 3) => {
  const currentTags = new Set(getPostTags(current).map((tag) => toSlug(tag)));
  const currentCategorySlug = current.category ? toSlug(current.category) : "";

  return posts
    .filter((item) => item.slug !== current.slug)
    .map((item) => {
      const tags = getPostTags(item).map((tag) => toSlug(tag));
      const sharedTags = tags.filter((tag) => currentTags.has(tag)).length;
      const sameCategory =
        item.category && currentCategorySlug
          ? toSlug(item.category) === currentCategorySlug
          : false;

      const score = sharedTags * 3 + (sameCategory ? 2 : 0);
      return { item, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return compareDesc(new Date(a.item.date), new Date(b.item.date));
    })
    .filter((entry) => entry.score > 0)
    .slice(0, limit)
    .map((entry) => entry.item);
};

export const getPostMeta = (post: Post) => {
  const item = post as ExtendedPost;
  return {
    series: item.series,
    difficulty: item.difficulty,
    topics: item.topics ?? [],
  };
};
