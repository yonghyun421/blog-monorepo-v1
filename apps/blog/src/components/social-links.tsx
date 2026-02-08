import { Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  mail: Mail,
};

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={className}>
      {profile.socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        if (!Icon) return null;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-accent"
            aria-label={link.name}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
