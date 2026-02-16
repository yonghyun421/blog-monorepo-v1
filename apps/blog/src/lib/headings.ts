export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export const slugifyHeading = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const createHeadingIdFactory = () => {
  const seen = new Map<string, number>();

  return (text: string) => {
    const base = slugifyHeading(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };
};

const cleanHeadingText = (raw: string) =>
  raw
    .replace(/\s+#+\s*$/, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .trim();

export const extractHeadingsFromMarkdown = (markdown: string): TocHeading[] => {
  const createId = createHeadingIdFactory();
  const headings: TocHeading[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const hashes = match[1];
    const rawText = match[2];
    if (!hashes || !rawText) continue;

    const level = hashes.length as 2 | 3;
    const text = cleanHeadingText(rawText);
    if (!text) continue;

    headings.push({
      level,
      text,
      id: createId(text),
    });
  }

  return headings;
};
