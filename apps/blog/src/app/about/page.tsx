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
        <SocialLinks className="mt-6 flex items-center gap-4" />
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
