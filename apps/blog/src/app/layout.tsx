import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Font usage example, skipping for now to avoid dependency if not installed
import "../styles/globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "A blog created with Next.js and Turborepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
