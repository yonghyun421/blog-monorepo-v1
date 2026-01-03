# Blog Monorepo v1

Next.js와 Turborepo로 구축된 모던 블로그 플랫폼 및 모노레포 프로젝트입니다.

## 🚀 Tech Stack

### Core
- **Monorepo**: [Turborepo](https://turbo.build/)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

### Design System (`packages/ui`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) (Headless Primitives)
- **Architecture**: CVA (Class Variance Authority) + Radix Slot
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```bash
.
├── apps/
│   ├── blog/          # 메인 블로그 애플리케이션 (Port: 3001)
│   └── web/           # (Legacy) 초기 생성 웹 앱 (Port: 3000)
├── packages/
│   ├── ui/            # 공유 디자인 시스템 (Button, Card 등)
│   ├── eslint-config/ # ESLint 공유 설정
│   └── typescript-config/ # TSConfig 공유 설정
```

## 🛠 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

전체 앱을 동시에 실행합니다:

```bash
pnpm dev
```

특정 앱만 실행하려면:

```bash
pnpm --filter blog dev
```

### 3. Build

```bash
pnpm build
```

## 📝 Design System Usage

`packages/ui`에 정의된 컴포넌트는 모든 앱에서 다음과 같이 사용할 수 있습니다:

```tsx
import { Button } from "@repo/ui/button";

export default function Page() {
  return (
    <Button variant="destructive">Delete Project</Button>
  );
}
```
