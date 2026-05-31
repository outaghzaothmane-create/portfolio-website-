/* eslint-disable @next/next/no-img-element */
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
            const url = value?.src || value?.asset?.url;
            const width = value?.width || value?.asset?.metadata?.dimensions?.width || 1200;
            const height = value?.height || value?.asset?.metadata?.dimensions?.height || 675;
            const caption = value?.caption || value?.alt;

            if (!url) {
                return null;
            }

            if (value?.src) {
                return (
                    <figure className="my-10">
                        <img
                            src={url}
                            alt={value.alt || ""}
                            title={value.title || undefined}
                            width={width}
                            height={height}
                            loading={value.loading || "lazy"}
                            fetchPriority={value.fetchPriority}
                            className="block h-auto w-full rounded-2xl border border-border object-cover"
                        />
                        {caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>}
                    </figure>
                );
            }

            return (
                <figure className="my-10">
                    <Image
                        src={url}
                        alt={value.alt || ""}
                        width={width}
                        height={height}
                        className="w-full rounded-2xl border border-border object-cover"
                        sizes="(min-width: 1024px) 768px, 100vw"
                    />
                    {caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>}
                </figure>
            );
        },
        table: ({ value }) => {
            if (!value?.rows?.length) {
                return null;
            }

            return (
                <div className="my-8 overflow-x-auto rounded-lg border border-border">
                    <table className="w-full border-collapse text-left text-sm">
                        <tbody>
                            {value.rows.map((row: { cells?: string[]; isHeader?: boolean }, rowIndex: number) => (
                                <tr key={rowIndex} className="border-b border-border last:border-b-0">
                                    {(row.cells || []).map((cell, cellIndex) =>
                                        row.isHeader ? (
                                            <th key={cellIndex} className="bg-primary/10 px-4 py-3 font-semibold text-foreground">
                                                {cell}
                                            </th>
                                        ) : (
                                            <td key={cellIndex} className="px-4 py-3 text-muted-foreground">
                                                {cell}
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        },
        codeBlock: ({ value }) => {
            if (!value?.code) {
                return null;
            }

            return (
                <pre className="my-8 overflow-x-auto rounded-lg border border-border bg-background/80 p-4 text-sm leading-relaxed text-foreground">
                    <code>{value.code}</code>
                </pre>
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
        em: ({ children }) => <em>{children}</em>,
        code: ({ children }) => <code>{children}</code>,
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
