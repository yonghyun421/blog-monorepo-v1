export const profile = {
  name: "Yonghyun",
  role: "Frontend Developer",
  roles: ["Frontend Developer", "Problem Solver", "UI/UX Enthusiast"],
  bio: {
    short: "사용자 경험을 중시하는 프론트엔드 개발자입니다.",
    long: "안녕하세요, 프론트엔드 개발자 Yonghyun입니다. 사용자 중심의 웹 애플리케이션을 만드는 것에 열정을 가지고 있습니다. 깔끔한 코드와 직관적인 UI/UX를 추구하며, 새로운 기술을 배우고 적용하는 것을 즐깁니다.",
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
    { name: "GitHub", url: "https://github.com/yonghyun", icon: "github" },
    { name: "Email", url: "mailto:yonghyun@example.com", icon: "mail" },
  ],
} as const;
