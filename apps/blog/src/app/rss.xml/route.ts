import { getPublishedPosts } from "@/lib/content";
import { siteConfig } from "@/data/site-config";
import { getPostTags } from "@/lib/post-meta";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const posts = getPublishedPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 100);

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}${post.url}`;
      const description = escapeXml(post.description ?? "");
      const title = escapeXml(post.title);
      const pubDate = new Date(post.date).toUTCString();
      const categories = getPostTags(post)
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");

      return `
        <item>
          <title>${title}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <description>${description}</description>
          ${categories}
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
