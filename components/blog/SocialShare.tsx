import { Linkedin, Twitter } from "lucide-react";
import { getPostUrl, type BlogPostSummary } from "@/lib/sanity";

export function SocialShare({ post }: { post: BlogPostSummary }) {
    const url = getPostUrl(post);
    const text = encodeURIComponent(post.title);

    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Share</span>
            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border transition-colors hover:border-primary hover:text-primary"
            >
                <Linkedin className="h-4 w-4" />
            </a>
            <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border transition-colors hover:border-primary hover:text-primary"
            >
                <Twitter className="h-4 w-4" />
            </a>
        </div>
    );
}
