import Link from "next/link";
import { Button } from "@repo/ui/button";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/social-links";
import { SkillBadge } from "@/components/skill-badge";
import { AnimateInView } from "@/components/animate-in-view";

export const metadata = {
  title: "소개",
  description: "프론트엔드 개발자 Yonghyun을 소개합니다.",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-10">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{profile.role}</p>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
          {profile.bio.long}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {profile.positioning}
        </p>
        <SocialLinks className="mt-6 flex items-center gap-4" />
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">핵심 지표</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {profile.proofPoints.map((point, idx) => (
            <AnimateInView key={point.label} delay={idx * 60}>
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <div className="text-3xl font-bold tracking-tight">{point.value}</div>
                <div className="mt-1 text-sm font-semibold">{point.label}</div>
                <p className="mt-2 text-sm text-muted-foreground">{point.description}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">문제 해결 사례</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {profile.highlights.map((item, idx) => (
            <AnimateInView key={item.title} delay={idx * 80}>
              <article className="h-full rounded-xl border bg-card p-5 shadow-card">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">문제</span>: {item.problem}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">접근</span>: {item.approach}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">결과</span>: {item.outcome}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </AnimateInView>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">집중하는 영역</h2>
        <div className="flex flex-wrap gap-2">
          {profile.focusAreas.map((area, idx) => (
            <AnimateInView key={area} delay={idx * 40}>
              <span className="rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
                {area}
              </span>
            </AnimateInView>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">타임라인</h2>
        <div className="space-y-4">
          {profile.timeline.map((item, idx) => (
            <AnimateInView key={`${item.period}-${item.title}`} delay={idx * 70}>
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <div className="text-xs font-semibold text-accent">{item.period}</div>
                <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border bg-card/70 p-6 shadow-card">
        <h2 className="text-2xl font-bold tracking-tight">{profile.collaboration.title}</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          {profile.collaboration.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <a href={profile.collaboration.primary.href}>
              {profile.collaboration.primary.label}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href={profile.collaboration.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.collaboration.secondary.label}
            </a>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/projects">프로젝트 더 보기</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">기술 스택</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.skills.map((skill, idx) => (
            <AnimateInView key={skill.category} delay={idx * 100}>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <SkillBadge key={item} name={item} />
                  ))}
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </section>
    </main>
  );
}
