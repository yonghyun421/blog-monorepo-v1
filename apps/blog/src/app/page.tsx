import { compareDesc } from "date-fns";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { AnimateInView } from "@/components/animate-in-view";
import { getPublishedPosts, getPublishedProjects } from "@/lib/content";

export default function Home() {
  const featuredProjects = getPublishedProjects()
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 3);

  const recentPosts = getPublishedPosts()
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 4);

  return (
    <main className="container mx-auto min-h-screen px-4">
      <HeroSection />

      <section className="relative py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-accent/5 to-transparent"
        />
        <SectionHeading title="주요 프로젝트" href="/projects" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, idx) => (
            <AnimateInView key={project._id} delay={idx * 100}>
              <ProjectCard project={project} />
            </AnimateInView>
          ))}
          {featuredProjects.length === 0 && (
            <p className="text-muted-foreground">
              프로젝트를 준비 중입니다.
            </p>
          )}
        </div>
      </section>

      <section className="py-14">
        <SectionHeading title="최근 글" href="/blog" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {recentPosts.map((post, idx) => (
            <AnimateInView key={post._id} delay={idx * 100}>
              <PostCard post={post} />
            </AnimateInView>
          ))}
          {recentPosts.length === 0 && (
            <p className="text-muted-foreground">
              아직 게시물이 없습니다.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
