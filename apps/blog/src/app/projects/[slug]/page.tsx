import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { ExternalLink, Github } from "lucide-react";
import { Mdx } from "@/components/mdx";
import { SkillBadge } from "@/components/skill-badge";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = async () =>
  allProjects.map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({ params }: ProjectPageProps) => {
  const slug = (await params).slug;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Project not found for slug: ${slug}`);
  return {
    title: project.title,
    description: project.description,
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const slug = (await params).slug;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="container mx-auto min-h-screen px-4 py-10">
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← 프로젝트 목록
        </Link>
      </div>

      <article className="mx-auto max-w-3xl">
        <header className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {project.description}
          </p>

          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <SkillBadge key={tech} name={tech} />
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
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
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </header>

        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
