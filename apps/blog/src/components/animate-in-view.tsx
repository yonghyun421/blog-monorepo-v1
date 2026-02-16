"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@repo/ui/utils";

interface AnimateInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateInView({
  children,
  className,
  delay = 0,
}: AnimateInViewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0.35 : 0.55,
        ease: "easeOut",
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
