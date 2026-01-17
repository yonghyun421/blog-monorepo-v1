import type { Post } from "contentlayer/generated";

export type TaxonomyItem = {
  name: string;
  slug: string;
  count: number;
};

export const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const getCategories = (posts: Post[]): TaxonomyItem[] => {
  const map = new Map<string, number>();
  posts.forEach((post) => {
    if (!post.category) return;
    map.set(post.category, (map.get(post.category) ?? 0) + 1);
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, slug: toSlug(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getTags = (posts: Post[]): TaxonomyItem[] => {
  const map = new Map<string, number>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, slug: toSlug(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const filterPostsByCategory = (posts: Post[], slug: string) =>
  posts.filter((post) => post.category && toSlug(post.category) === slug);

export const filterPostsByTag = (posts: Post[], slug: string) =>
  posts.filter((post) => post.tags?.some((tag) => toSlug(tag) === slug));
