import Link from "next/link";
import Image from "next/image";
import { Children, isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { createHeadingIdFactory } from "@/lib/headings";

const getTextContent = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (!node) return "";
  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }
  if (isValidElement(node)) {
    return getTextContent((node.props as { children?: ReactNode }).children);
  }
  return "";
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  const createHeadingId = createHeadingIdFactory();

  const components = {
    Image,
    Link,
    h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
      const text = Children.toArray(children).map(getTextContent).join("").trim();
      const id = createHeadingId(text);
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
      const text = Children.toArray(children).map(getTextContent).join("").trim();
      const id = createHeadingId(text);
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      );
    },
  };

  return (
    <div className="prose prose-zinc prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-a:no-underline hover:prose-a:underline prose-pre:rounded-xl">
      <Component components={components} />
    </div>
  );
}
