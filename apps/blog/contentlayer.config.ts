import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

type RawDoc = { _raw: { flattenedPath: string } };
type RawBody = { body: { raw: string } };

type PostResolverDoc = RawDoc &
  RawBody & {
    tags?: string[];
    category?: string;
  };

const estimateReadingTimeMinutes = (content: string) => {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: false },
    category: { type: "string", required: false },
    published: { type: "boolean", default: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    series: { type: "string", required: false },
    difficulty: { type: "string", required: false },
    topics: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post: PostResolverDoc) =>
        `/blog/${post._raw.flattenedPath.split("/").pop()}`,
    },
    slug: {
      type: "string",
      resolve: (post: PostResolverDoc) => post._raw.flattenedPath.split("/").pop(),
    },
    normalizedTags: {
      type: "list",
      of: { type: "string" },
      resolve: (post: PostResolverDoc) => {
        const original = post.tags ?? [];
        if (original.length > 0) return original;
        if (post.category) return [post.category];
        return ["general"];
      },
    },
    readingTimeMinutes: {
      type: "number",
      resolve: (post: PostResolverDoc) => estimateReadingTimeMinutes(post.body.raw),
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    techStack: { type: "list", of: { type: "string" }, required: false },
    githubUrl: { type: "string", required: false },
    liveUrl: { type: "string", required: false },
    featured: { type: "boolean", default: false },
    published: { type: "boolean", default: true },
    order: { type: "number", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (project: RawDoc) =>
        `/projects/${project._raw.flattenedPath.split("/").pop()}`,
    },
    slug: {
      type: "string",
      resolve: (project: RawDoc) => project._raw.flattenedPath.split("/").pop(),
    },
  },
}));

export const Note = defineDocumentType(() => ({
  name: "Note",
  filePathPattern: `notes/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (note: RawDoc) => `/note/${note._raw.flattenedPath.split("/").pop()}`,
    },
    slug: {
      type: "string",
      resolve: (note: RawDoc) => note._raw.flattenedPath.split("/").pop(),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Project, Note],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
        },
      ],
    ],
  },
});
