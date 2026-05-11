import { createClient, groq } from "next-sanity";
import { apiVersion, dataset, projectId, siteUrl } from "@/sanity/env";

const token = process.env.SANITY_API_READ_TOKEN;

export type SanityImage = {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
};

export type SanityAuthor = {
    name?: string;
    slug?: string;
    role?: string;
    bio?: string;
    image?: SanityImage;
    sameAs?: string[];
};

export type SanityCategory = {
    title?: string;
    slug?: string;
    description?: string;
};

export type BlogFaq = {
    question: string;
    answer: string;
};

export type BlogCta = {
    title?: string;
    description?: string;
    href?: string;
    label?: string;
};

export type BlogSeo = {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    ogImage?: SanityImage;
};

export type BlogPostSummary = {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt?: string;
    updatedAt?: string;
    featured?: boolean;
    readingTime: number;
    mainImage?: SanityImage;
    categories?: SanityCategory[];
    tags?: string[];
    author?: SanityAuthor;
    seo?: BlogSeo;
};

export type BlogPost = BlogPostSummary & {
    body?: any[];
    faqs?: BlogFaq[];
    cta?: BlogCta;
    relatedPosts?: BlogPostSummary[];
};

export type BlogListResult = {
    posts: BlogPostSummary[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
};

export const blogPageSize = 9;

export const client = createClient({
    projectId: projectId || "missing-project-id",
    dataset,
    apiVersion,
    useCdn: !token,
    token,
    perspective: "published",
});

export function isSanityConfigured() {
    return Boolean(projectId);
}

export function slugifyTag(tag: string) {
    return tag
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function estimateReadingTime(text = "") {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 220));
}

const imageFields = groq`{
    "url": asset->url,
    "alt": coalesce(alt, asset->altText),
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
}`;

const authorFields = groq`{
    name,
    "slug": slug.current,
    role,
    bio,
    sameAs,
    "image": image${imageFields}
}`;

const categoryFields = groq`{
    title,
    "slug": slug.current,
    description
}`;

const seoFields = groq`{
    metaTitle,
    metaDescription,
    canonicalUrl,
    noIndex,
    "ogImage": ogImage${imageFields}
}`;

const postSummaryFields = groq`
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    updatedAt,
    featured,
    "readingTime": round(length(pt::text(body)) / 1100) + 1,
    "mainImage": mainImage${imageFields},
    "categories": categories[]->${categoryFields},
    tags,
    "author": author->${authorFields},
    "seo": seo${seoFields}
`;



async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
    if (!projectId) {
        return [] as T;
    }

    return client.fetch<T>(query, params, { next: { revalidate: 3600, tags: ["sanity"] } });
}



export async function getBlogPosts({
    page = 1,
    pageSize = blogPageSize,
    query,
    category,
    tag,
}: {
    page?: number;
    pageSize?: number;
    query?: string;
    category?: string;
    tag?: string;
} = {}): Promise<BlogListResult> {
    if (!projectId) {
        return { posts: [], total: 0, page, pageSize, totalPages: 1 };
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const search = query ? `${query}*` : "";

    const filter = groq`
        _type == "post" &&
        defined(slug.current) &&
        (!defined($query) || title match $search || excerpt match $search || pt::text(body) match $search) &&
        (!defined($category) || $category in categories[]->slug.current) &&
        (!defined($tag) || $tag in tags[])
    `;

    const params = {
        query: query || null,
        search,
        category: category || null,
        tag: tag || null,
        start,
        end,
    };

    const result = await fetchSanity<{ posts: BlogPostSummary[]; total: number }>(
        groq`{
            "posts": *[${filter}] | order(featured desc, publishedAt desc, _createdAt desc) [$start...$end] {
                ${postSummaryFields}
            },
            "total": count(*[${filter}])
        }`,
        params
    );

    const posts = result.posts || [];
    const total = result.total || 0;

    return {
        posts,
        total,
        page,
        pageSize,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
}

export async function getAllBlogPosts() {
    const { posts } = await getBlogPosts({ pageSize: 100 });
    return posts;
}

export async function getFeaturedPosts() {
    if (!projectId) {
        return [];
    }

    const posts = await fetchSanity<BlogPostSummary[]>(
        groq`*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc)[0...3] {
            ${postSummaryFields}
        }`
    );

    return posts || [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    if (!projectId) {
        return null;
    }

    return fetchSanity<BlogPost | null>(
        groq`*[_type == "post" && slug.current == $slug][0] {
            ${postSummaryFields},
            body[]{
                ...,
                _type == "image" => {
                    ...,
                    "asset": asset->{
                        url,
                        metadata { dimensions }
                    }
                }
            },
            faqs,
            cta,
            "relatedPosts": coalesce(relatedPosts[]->{
                ${postSummaryFields}
            }, *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc)[0...3] {
                ${postSummaryFields}
            })
        }`,
        { slug }
    );
}

export async function getCategories() {
    if (!projectId) {
        return [];
    }

    return fetchSanity<SanityCategory[]>(
        groq`*[_type == "category"] | order(title asc) ${categoryFields}`
    );
}

export async function getCategory(slug: string) {
    if (!projectId) {
        return null;
    }

    return fetchSanity<SanityCategory | null>(
        groq`*[_type == "category" && slug.current == $slug][0] ${categoryFields}`,
        { slug }
    );
}

export async function getTags() {
    const posts = await getAllBlogPosts();
    return Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort();
}

export function getPostUrl(post: Pick<BlogPostSummary, "slug">) {
    return `${siteUrl}/blog/${post.slug}`;
}

export function getCategoryUrl(category: Pick<SanityCategory, "slug">) {
    return `${siteUrl}/blog/category/${category.slug}`;
}

export function readingTimeFromBody(body?: any[]) {
    if (!body?.length) {
        return 1;
    }

    const text = body
        .flatMap((block) => block.children?.map((child: { text?: string }) => child.text || "") || [])
        .join(" ");

    return estimateReadingTime(text);
}
