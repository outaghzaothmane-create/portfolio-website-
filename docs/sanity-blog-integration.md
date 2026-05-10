# Sanity + Next.js Blog Architecture

This portfolio now uses a Vercel-native Next.js blog with Sanity Studio embedded at `/studio`.

## Routes

- `/blog/` - blog index, search, featured posts, recent posts, topical hubs
- `/blog/[slug]/` - article template
- `/blog/category/[slug]/` - category hub pages
- `/blog/tag/[slug]/` - tag pages
- `/studio/` - Sanity Studio
- `/sitemap.xml` - dynamic XML sitemap
- `/robots.txt` - dynamic robots policy
- `/llms.txt` - dynamic AI-search index file

## Vercel Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://othmaneoutaghza.online
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=long_random_secret
```

Public Sanity datasets do not need `SANITY_API_READ_TOKEN`. Private datasets do.

## Sanity Content Model

The Studio includes:

- `post`
- `category`
- `author`
- reusable `seo` object

Recommended categories:

- SEO Morocco
- Technical SEO
- AI Search Optimization
- Shopify SEO
- Local SEO
- Case Studies

Each post supports:

- title and slug
- intro summary
- featured image with alt text
- categories
- tags
- author
- rich text body
- FAQs
- CTA block
- related posts
- SEO title, description, canonical, noindex, and social image

## Publishing Workflow

1. Add the Sanity environment variables in Vercel.
2. Deploy the site.
3. Visit `/studio/`.
4. Create one author: `Othmane Outaghza`.
5. Create the recommended categories.
6. Publish posts.
7. Optional: create a Sanity webhook to `https://othmaneoutaghza.online/api/revalidate?secret=SANITY_REVALIDATE_SECRET`.

## SEO / GEO Notes

Articles render as crawlable HTML with:

- dynamic Metadata API fields
- canonical URLs
- Open Graph and Twitter Cards
- Article schema
- Breadcrumb schema
- Author / Person schema
- visible FAQ sections
- dynamic sitemap URLs
- dynamic `llms.txt`
- semantic headings and table of contents anchors

The blog is designed for Google, AI Overviews, ChatGPT, Perplexity, Gemini, Claude, and other retrieval systems that benefit from clean HTML, concise summaries, entity-rich headings, and structured internal links.
