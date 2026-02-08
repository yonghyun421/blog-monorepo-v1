import type { MetadataRoute } from "next";
import { allPosts, allProjects } from "../../.contentlayer/generated/index.mjs";
import type { Post, Project } from "../../.contentlayer/generated/types";
import { siteConfig } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = (allPosts as Post[]).map((post) => ({
    url: `${siteConfig.url}${post.url}`,
    lastModified: new Date(post.date),
  }));

  const projects = (allProjects as Project[]).map((project) => ({
    url: `${siteConfig.url}${project.url}`,
    lastModified: new Date(project.date),
  }));

  const staticPages = [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/about`, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    { url: `${siteConfig.url}/projects`, lastModified: new Date() },
  ];

  return [...staticPages, ...posts, ...projects];
}
