declare module "contentlayer2/source-files" {
  export function defineDocumentType(factory: () => unknown): unknown;
  export function makeSource(config: unknown): unknown;
}
