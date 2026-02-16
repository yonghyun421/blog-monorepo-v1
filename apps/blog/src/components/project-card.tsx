"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "contentlayer/generated";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useState, type MouseEvent } from "react";
import { cn } from "@repo/ui/utils";
import { SkillBadge } from "@/components/skill-badge";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, hsl(var(--accent) / 0.16), transparent 70%)`;

  const onPointerMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  return (
    <motion.div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card p-6 shadow-card transition-colors duration-300 hover:border-accent/30 hover:shadow-card-hover",
        className
      )}
      whileHover={reduceMotion ? undefined : { y: -7, scale: 1.012 }}
      whileTap={reduceMotion ? undefined : { scale: 0.996 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.35 }}
      onMouseMove={onPointerMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.22 }}
        />
      )}
      <div className="flex flex-col gap-3">
        <Link href={project.url} className="block">
          <h3 className="text-xl font-bold tracking-tight transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <SkillBadge key={tech} name={tech} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
