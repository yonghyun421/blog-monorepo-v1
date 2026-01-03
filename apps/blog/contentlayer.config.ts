import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: false },
    published: { type: "boolean", default: true },
    tags: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath.split("/").pop()}`,
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.split("/").pop(),
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
      resolve: (note) => `/note/${note._raw.flattenedPath.split("/").pop()}`,
    },
    slug: {
      type: "string",
      resolve: (note) => note._raw.flattenedPath.split("/").pop(),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Note],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
}) as any;
