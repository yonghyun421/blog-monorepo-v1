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
  const labelY1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const labelY2 = useTransform(scrollYProgress, [0, 1], [0, 28]);

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
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-6 -z-10 hidden font-bold uppercase tracking-[0.22em] text-foreground/[0.045] md:block md:text-7xl lg:text-8xl"
          style={{ y: labelY1 }}
        >
          Build
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-24 -z-10 hidden font-bold uppercase tracking-[0.22em] text-foreground/[0.04] md:block md:text-6xl lg:text-7xl"
          style={{ y: labelY2 }}
        >
          Iterate
        </motion.div>

        <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight md:text-5xl">
          {profile.name}
        </h1>
        <div className="animate-fade-in-up mt-2 h-8 text-lg text-muted-foreground [animation-delay:100ms]">
          <TypingRotator words={profile.roles} />
        </div>
        <p className="animate-fade-in-up mt-4 max-w-xl text-muted-foreground [animation-delay:200ms]">
          {profile.bio.short}
        </p>
        <p className="animate-fade-in-up mt-2 max-w-2xl text-sm text-muted-foreground [animation-delay:260ms]">
          {profile.positioning}
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
        <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {profile.proofPoints.map((point, idx) => (
            <motion.div
              key={point.label}
              className="rounded-xl border bg-card/80 p-4 text-left shadow-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.45 + idx * 0.08 }}
            >
              <div className="text-2xl font-bold tracking-tight">{point.value}</div>
              <div className="text-sm font-medium">{point.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {point.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
