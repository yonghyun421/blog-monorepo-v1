export const profile = {
  name: "Yonghyun",
  role: "Frontend Developer",
  roles: ["Frontend Developer", "Problem Solver", "UI/UX Enthusiast"],
  positioning:
    "사용자 경험과 제품 목표를 함께 고려해, 작동하는 UI를 넘어 성과로 이어지는 프론트엔드를 만듭니다.",
  bio: {
    short: "사용자 경험을 중시하는 프론트엔드 개발자입니다.",
    long: "안녕하세요, 프론트엔드 개발자 Yonghyun입니다. 사용자 중심의 웹 애플리케이션을 만드는 것에 열정을 가지고 있습니다. 깔끔한 코드와 직관적인 UI/UX를 추구하며, 새로운 기술을 배우고 적용하는 것을 즐깁니다.",
  },
  proofPoints: [
    {
      value: "24+",
      label: "기술 아티클",
      description: "프론트엔드 아키텍처, 성능, 보안 중심",
    },
    {
      value: "1",
      label: "운영 중 프로젝트",
      description: "이 블로그를 포함한 실서비스 기반 개선",
    },
    {
      value: "10+",
      label: "핵심 스택",
      description: "React/Next.js/TypeScript 중심 개발 경험",
    },
  ],
  focusAreas: [
    "성능 최적화",
    "접근성/사용성 개선",
    "설계 일관성",
    "협업 가능한 코드베이스",
  ],
  highlights: [
    {
      title: "기술 블로그 모노레포 전환",
      problem: "콘텐츠/컴포넌트/설정이 분산되어 확장과 유지보수가 어려웠습니다.",
      approach:
        "Turborepo + Contentlayer 구조로 통합하고, 공통 UI와 콘텐츠 스키마를 분리했습니다.",
      outcome:
        "콘텐츠 생산과 UI 개선을 병렬로 진행할 수 있는 구조를 만들었습니다.",
      tags: ["Monorepo", "Content Architecture"],
    },
    {
      title: "콘텐츠 탐색 경험 개선",
      problem: "사용자가 글을 주제별로 탐색하기 어려웠습니다.",
      approach:
        "카테고리/태그 기반 정보 구조를 정리하고, 카드와 필터 UI를 개선했습니다.",
      outcome: "학습 목적에 맞는 글로 빠르게 이동할 수 있는 탐색 흐름을 제공했습니다.",
      tags: ["Information Architecture", "UX"],
    },
    {
      title: "읽기 몰입도 향상",
      problem: "긴 글에서 현재 읽는 위치와 구조를 파악하기 어려웠습니다.",
      approach:
        "TOC, 스크롤 진행바, 전환/리빌 애니메이션을 도입해 읽기 맥락을 강화했습니다.",
      outcome: "콘텐츠 구조 인지와 문서 탐색 속도를 개선했습니다.",
      tags: ["Reading Experience", "Framer Motion"],
    },
  ],
  timeline: [
    {
      period: "2026",
      title: "기술 블로그 플랫폼 고도화",
      description:
        "콘텐츠 중심 구조와 애니메이션 시스템을 확장하며 개발자 브랜딩 플랫폼으로 발전시키고 있습니다.",
    },
    {
      period: "2025",
      title: "React/Next.js 중심 실전 프로젝트",
      description:
        "실서비스 구현을 통해 상태관리, 성능, 컴포넌트 설계 역량을 집중적으로 강화했습니다.",
    },
    {
      period: "2024",
      title: "프론트엔드 기반 다지기",
      description:
        "웹 표준, TypeScript, UI 구현 기본기를 정리하며 문제 해결 중심 학습을 진행했습니다.",
    },
  ],
  collaboration: {
    title: "함께 제품을 만들 기회를 찾고 있습니다",
    description:
      "프론트엔드 개발, UI/UX 개선, 기술 문서화가 필요한 프로젝트라면 편하게 연락 주세요.",
    primary: { label: "이메일로 연락하기", href: "mailto:dydgus0421@gmail.com" },
    secondary: { label: "GitHub 보기", href: "https://github.com/yonghyun421" },
  },
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "PostgreSQL"],
    },
    {
      category: "DevOps",
      items: ["Docker", "Vercel", "GitHub Actions"],
    },
    {
      category: "Tools",
      items: ["Git", "VS Code", "Figma"],
    },
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/yonghyun421", icon: "github" },
    { name: "Email", url: "mailto:dydgus0421@gmail.com", icon: "mail" },
  ],
} as const;
