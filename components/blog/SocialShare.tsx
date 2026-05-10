import { Linkedin, Twitter } from "lucide-react";
import { getPostUrl, type BlogPostSummary } from "@/lib/sanity";

export function SocialShare({ post }: { post: BlogPostSummary }) {
    const url = getPostUrl(post);
    const text = encodeURIComponent(post.title);

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Share</span>
            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
            >
                <Linkedin className="h-4 w-4" />
            </a>
            <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
            >
                <Twitter className="h-4 w-4" />
            </a>
        </div>
    );
}
