import { allPosts, allProjects } from "contentlayer/generated";
import type { Post, Project } from "contentlayer/generated";

export const getPublishedPosts = (): Post[] =>
  allPosts.filter((post) => post.published);

export const getPublishedProjects = (): Project[] =>
  allProjects.filter((project) => project.published);
