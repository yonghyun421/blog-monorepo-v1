import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { PageTransition } from "@/components/page-transition";
import { Analytics } from "@/components/analytics";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/data/site-config";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og?title=${encodeURIComponent(siteConfig.title)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og?title=${encodeURIComponent(siteConfig.title)}`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.title,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "ko-KR",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      url: siteConfig.url,
      sameAs: profile.socialLinks
        .map((link) => link.url)
        .filter((url) => url.startsWith("http")),
    },
  ];

  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <StructuredData data={structuredData} />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <PageTransition>
              <div className="flex-1">{children}</div>
            </PageTransition>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
