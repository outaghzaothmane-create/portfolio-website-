"use client";

import { NextStudio } from "next-sanity/studio";
import Link from "next/link";
import config from "@/sanity.config";
import { projectId } from "@/sanity/env";

export const dynamic = "force-static";

export default function StudioPage() {
    if (!projectId) {
        return (
            <main className="min-h-screen bg-background px-6 py-24 text-foreground">
                <div className="mx-auto max-w-2xl rounded-lg border border-border bg-background/80 p-8">
                    <p className="mb-3 text-sm font-medium text-primary">Sanity Studio setup</p>
                    <h1 className="mb-4 text-3xl font-bold">Add your Sanity project ID</h1>
                    <p className="mb-6 text-muted-foreground">
                        Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>, <code>NEXT_PUBLIC_SANITY_DATASET</code>, and <code>NEXT_PUBLIC_SANITY_API_VERSION</code> in your local and Vercel environments, then reload this page.
                    </p>
                    <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
                        Back to blog
                    </Link>
                </div>
            </main>
        );
    }

    return <NextStudio config={config} />;
}
