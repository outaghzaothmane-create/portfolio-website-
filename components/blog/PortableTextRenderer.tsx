import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { slugifyTag } from "@/lib/sanity";

function getBlockText(value: { children?: Array<{ text?: string } | Record<string, unknown>> }) {
    return value.children
        ?.map((child) => ("text" in child && typeof child.text === "string" ? child.text : ""))
        .join(" ") || "";
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            const url = value?.asset?.url;
            const width = value?.asset?.metadata?.dimensions?.width || 1200;
            const height = value?.asset?.metadata?.dimensions?.height || 675;

            if (!url) {
                return null;
            }

            return (
                <figure className="my-10">
                    <Image
                        src={url}
                        alt={value.alt || ""}
                        width={width}
                        height={height}
                        className="w-full rounded-lg border border-border object-cover"
                        sizes="(min-width: 1024px) 768px, 100vw"
                    />
                    {value.alt && <figcaption className="mt-3 text-sm text-muted-foreground">{value.alt}</figcaption>}
                </figure>
            );
        },
    },
    block: {
        h2: ({ children, value }) => {
            const id = slugifyTag(getBlockText(value));
            return <h2 id={id}>{children}</h2>;
        },
        h3: ({ children, value }) => {
            const id = slugifyTag(getBlockText(value));
            return <h3 id={id}>{children}</h3>;
        },
        blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
    marks: {
        link: ({ children, value }) => {
            const href = value?.href || "#";
            const isExternal = href.startsWith("http");

            if (isExternal) {
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                );
            }

            return <Link href={href}>{children}</Link>;
        },
    },
};

export function PortableTextRenderer({ value = [] }: { value?: any[] }) {
    if (!value.length) {
        return null;
    }

    return <PortableText value={value} components={components} />;
}
