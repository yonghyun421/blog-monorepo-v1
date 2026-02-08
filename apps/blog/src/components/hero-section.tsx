"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@repo/ui/button";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/social-links";
import { TypingRotator } from "@/components/typing-rotator";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <section ref={ref} className="relative py-16 md:py-24">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-16 -z-10 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{
          y: blobY1,
          background:
            "radial-gradient(circle, hsl(var(--gradient-from)) 0%, hsl(var(--gradient-to)) 100%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 -z-10 h-56 w-56 rounded-full opacity-15 blur-3xl"
        style={{
          y: blobY2,
          background:
            "radial-gradient(circle, hsl(var(--gradient-to)) 0%, hsl(var(--gradient-from)) 100%)",
        }}
      />

      <motion.div
        className="flex flex-col items-center text-center md:items-start md:text-left"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight md:text-5xl">
          {profile.name}
        </h1>
        <div className="animate-fade-in-up mt-2 h-8 text-lg text-muted-foreground [animation-delay:100ms]">
          <TypingRotator words={profile.roles} />
        </div>
        <p className="animate-fade-in-up mt-4 max-w-xl text-muted-foreground [animation-delay:200ms]">
          {profile.bio.short}
        </p>
        <SocialLinks className="animate-fade-in-up mt-6 flex items-center gap-4 [animation-delay:300ms]" />
        <div className="animate-fade-in-up mt-8 flex gap-3 [animation-delay:400ms]">
          <Button asChild size="sm">
            <Link href="/projects">프로젝트 보기</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">블로그 읽기</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
