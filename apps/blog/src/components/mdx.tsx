import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer2/hooks";

const components = {
  Image,
  Link,
  // Add other components like CodeBlock here
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground">
      <Component components={components} />
    </div>
  );
}
