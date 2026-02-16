import { ProjectCard } from "@/components/project-card";
import { AnimateInView } from "@/components/animate-in-view";
import { getPublishedProjects } from "@/lib/content";

export const metadata = {
  title: "프로젝트",
  description: "개인 프로젝트 목록입니다.",
};

export default function ProjectsPage() {
  const projects = getPublishedProjects()
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <main className="container mx-auto min-h-screen px-4 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">프로젝트</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          만들어 온 것들을 소개합니다.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <AnimateInView key={project._id} delay={idx * 100}>
            <ProjectCard project={project} />
          </AnimateInView>
        ))}
        {projects.length === 0 && (
          <p className="text-muted-foreground">프로젝트를 준비 중입니다.</p>
        )}
      </div>
    </main>
  );
}
