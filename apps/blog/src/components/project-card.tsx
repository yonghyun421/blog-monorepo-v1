import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "contentlayer/generated";
import { cn } from "@repo/ui/utils";
import { SkillBadge } from "@/components/skill-badge";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between overflow-hidden rounded-xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover",
        className
      )}
    >
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
    </div>
  );
}
