import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

// User-Agent rotation to avoid bot detection
const USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
];

function getRandomUserAgent(): string {
    return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return false;
    }

    if (record.count >= RATE_LIMIT) {
        return true;
    }

    record.count++;
    return false;
}

// Validate and sanitize URL to prevent SSRF
function validateUrl(input: string): { valid: boolean; url?: string; error?: string } {
    try {
        // Add protocol if missing
        const urlString = input.startsWith("http") ? input : `https://${input}`;
        const parsed = new URL(urlString);

        // Only allow http and https protocols
        if (!["http:", "https:"].includes(parsed.protocol)) {
            return { valid: false, error: "Only HTTP and HTTPS protocols are allowed" };
        }

        // Block internal/private IPs and localhost
        const hostname = parsed.hostname.toLowerCase();
        const blockedPatterns = [
            /^localhost$/i,
            /^127\./,
            /^10\./,
            /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
            /^192\.168\./,
            /^0\./,
            /^169\.254\./,
            /^\[::1\]$/,
            /^\[fc00:/i,
            /^\[fd00:/i,
            /^\[fe80:/i,
            /^\.internal$/i,
            /\.local$/i,
        ];

        for (const pattern of blockedPatterns) {
            if (pattern.test(hostname)) {
                return { valid: false, error: "Internal or private URLs are not allowed" };
            }
        }

        return { valid: true, url: parsed.href };
    } catch {
        return { valid: false, error: "Invalid URL format" };
    }
}

// Issue category types
type IssueCategory = "critical" | "warning" | "good-to-have";

interface SeoIssue {
    category: IssueCategory;
    issue: string;
    advice: string;
}

export async function POST(req: Request) {
    try {
        // Rate limiting
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const { url } = await req.json();
        if (!url || typeof url !== "string") {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Validate URL to prevent SSRF
        const validation = validateUrl(url.trim());
        if (!validation.valid) {
            return NextResponse.json({ error: validation.error }, { status: 400 });
        }

        const targetUrl = validation.url!;
        const startTime = Date.now();

        // 5-second strict timeout to save serverless execution time
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch(targetUrl, {
                headers: { "User-Agent": getRandomUserAgent() },
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            const ttfb = Date.now() - startTime;

            if (!response.ok) {
                return NextResponse.json({ error: `Failed to fetch: ${response.statusText}` }, { status: response.status });
            }

            const html = await response.text();
            const $ = cheerio.load(html);

            // 1. METADATA
            const title = $("title").text().trim();
            const description = $('meta[name="description"]').attr("content")?.trim() || "";
            const canonical = $('link[rel="canonical"]').attr("href") || null;
            const robots = $('meta[name="robots"]').attr("content") || "index, follow";
            const viewport = $('meta[name="viewport"]').attr("content");

            // 2. CONTENT STRUCTURE
            const h1Count = $("h1").length;
            const h1 = $("h1").first().text().trim();
            const h2Count = $("h2").length;

            const bodyText = $("body").text().replace(/\s+/g, " ").trim();
            const wordCount = bodyText.split(" ").length;

            // 3. SCHEMA DETECTION (JSON-LD)
            const schemaScripts = $('script[type="application/ld+json"]');
            const schemas: any[] = [];
            schemaScripts.each((_, el) => {
                try {
                    const content = $(el).html();
                    if (content) {
                        const parsed = JSON.parse(content);
                        schemas.push(parsed);
                    }
                } catch {
                    // Invalid JSON, skip
                }
            });
            const hasSchema = schemas.length > 0;
            const schemaTypes = schemas.map(s => s["@type"] || "Unknown").filter((v, i, a) => a.indexOf(v) === i);

            // 4. SOCIAL META TAGS
            const ogTitle = $('meta[property="og:title"]').attr("content");
            const ogDescription = $('meta[property="og:description"]').attr("content");
            const ogImage = $('meta[property="og:image"]').attr("content");
            const ogType = $('meta[property="og:type"]').attr("content");
            const ogUrl = $('meta[property="og:url"]').attr("content");

            const twitterCard = $('meta[name="twitter:card"]').attr("content");
            const twitterTitle = $('meta[name="twitter:title"]').attr("content");
            const twitterDescription = $('meta[name="twitter:description"]').attr("content");
            const twitterImage = $('meta[name="twitter:image"]').attr("content");

            const hasSocialTags = !!(ogTitle && ogDescription && ogImage);

            // 5. LINK ANALYSIS
            const links = $("a[href]");
            const parsedTargetUrl = new URL(targetUrl);
            const targetHostname = parsedTargetUrl.hostname;

            let internalLinks = 0;
            let externalLinks = 0;
            let nofollowLinks = 0;

            links.each((_, el) => {
                const href = $(el).attr("href");
                const rel = $(el).attr("rel") || "";

                if (href) {
                    // Count nofollow
                    if (rel.includes("nofollow")) {
                        nofollowLinks++;
                    }

                    // Determine internal vs external
                    try {
                        if (href.startsWith("/") || href.startsWith("#")) {
                            internalLinks++;
                        } else if (href.startsWith("http")) {
                            const linkUrl = new URL(href);
                            if (linkUrl.hostname === targetHostname) {
                                internalLinks++;
                            } else {
                                externalLinks++;
                            }
                        } else {
                            internalLinks++; // Relative links
                        }
                    } catch {
                        // Invalid link, skip
                    }
                }
            });

            // 6. SEMANTIC CHECK - Keyword in title appears in first H1
            const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
            const h1Words = h1.toLowerCase().split(/\s+/);
            const keywordMatch = titleWords.some(word => h1Words.includes(word));

            // 7. ASSETS
            const images = $("img");
            const totalImages = images.length;
            const missingAlt = images.filter((_, el) => !$(el).attr("alt")).length;

            const generator = $('meta[name="generator"]').attr("content") || "Unknown";

            // 8. WEIGHTED SCORING ALGORITHM
            let score = 100;
            const issues: SeoIssue[] = [];

            // CRITICAL ISSUES (30 points each)
            if (h1Count !== 1) {
                score -= 30;
                issues.push({
                    category: "critical",
                    issue: `H1 Tag Error (Found ${h1Count}, need exactly 1)`,
                    advice: "Add a single, descriptive H1 tag at the top of your page with your primary keyword."
                });
            }

            if (!viewport) {
                score -= 30;
                issues.push({
                    category: "critical",
                    issue: "Not Mobile Friendly (No Viewport Meta Tag)",
                    advice: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to your <head> section.'
                });
            }

            if (!targetUrl.startsWith("https")) {
                score -= 30;
                issues.push({
                    category: "critical",
                    issue: "Not Secure (No HTTPS)",
                    advice: "Install an SSL certificate and redirect all HTTP traffic to HTTPS for security and SEO."
                });
            }

            // WARNINGS (15 points each)
            if (ttfb > 600) {
                score -= 15;
                issues.push({
                    category: "warning",
                    issue: `Slow Server Response (${ttfb}ms TTFB)`,
                    advice: "Optimize your server, enable caching, use a CDN, or upgrade hosting to reduce load time."
                });
            }

            if (!title || title.length > 60) {
                score -= 15;
                issues.push({
                    category: "warning",
                    issue: title ? "Title Too Long (>60 chars)" : "Missing Title Tag",
                    advice: "Write a compelling title between 50-60 characters with your primary keyword near the beginning."
                });
            }

            if (!description) {
                score -= 15;
                issues.push({
                    category: "warning",
                    issue: "Missing Meta Description",
                    advice: "Add a meta description (150-160 chars) that summarizes your page and includes target keywords."
                });
            }

            if (missingAlt > 0) {
                score -= 15;
                issues.push({
                    category: "warning",
                    issue: `${missingAlt} Image${missingAlt > 1 ? 's' : ''} Missing Alt Text`,
                    advice: "Add descriptive alt text to all images for accessibility and SEO benefits."
                });
            }

            if (wordCount < 300) {
                score -= 15;
                issues.push({
                    category: "warning",
                    issue: `Thin Content (${wordCount} words)`,
                    advice: "Expand your content to at least 300-500 words with valuable, keyword-rich information."
                });
            }

            // GOOD TO HAVE (10 points each)
            if (!hasSocialTags) {
                score -= 10;
                issues.push({
                    category: "good-to-have",
                    issue: "Missing Open Graph Tags",
                    advice: "Add og:title, og:description, and og:image meta tags to control how your page appears when shared on social media."
                });
            }

            if (!hasSchema) {
                score -= 10;
                issues.push({
                    category: "good-to-have",
                    issue: "No Structured Data (Schema.org)",
                    advice: "Add JSON-LD structured data to help search engines understand your content and enable rich snippets."
                });
            }

            if (!keywordMatch && title && h1) {
                score -= 10;
                issues.push({
                    category: "good-to-have",
                    issue: "Low Keyword Relevance",
                    advice: "Ensure your main keyword from the title appears in the first H1 for better topical relevance."
                });
            }

            if (externalLinks > 0 && nofollowLinks === 0) {
                score -= 5;
                issues.push({
                    category: "good-to-have",
                    issue: "No Nofollow Links on External Links",
                    advice: "Consider adding rel='nofollow' to external links you don't want to endorse to preserve link equity."
                });
            }

            score = Math.max(0, score);

            const results = {
                url: targetUrl,
                score,
                isHttps: targetUrl.startsWith("https"),
                details: {
                    performance: {
                        ttfb,
                        wordCount,
                        internalLinks,
                        externalLinks,
                        nofollowLinks,
                    },
                    meta: {
                        title,
                        description,
                        canonical,
                        robots,
                        viewport,
                    },
                    headings: {
                        h1,
                        h1Count,
                        h2Count,
                    },
                    images: {
                        total: totalImages,
                        missingAlt,
                    },
                    social: {
                        ogTitle,
                        ogDescription,
                        ogImage,
                        ogType,
                        ogUrl,
                        twitterCard,
                        twitterTitle,
                        twitterDescription,
                        twitterImage,
                        hasSocialTags,
                    },
                    schema: {
                        hasSchema,
                        schemaTypes,
                        count: schemas.length,
                    },
                    semantic: {
                        keywordMatch,
                        titleWords: titleWords.slice(0, 5), // Top 5 keywords
                    },
                    tech: {
                        generator,
                    },
                    issues,
                }
            };

            return NextResponse.json(results);
        } catch (error: any) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
                return NextResponse.json(
                    { error: "Request timeout. Site took too long to respond (>5s)." },
                    { status: 408 }
                );
            }
            throw error;
        }
    } catch (error: any) {
        return NextResponse.json({ error: "Scan failed. Site may block bots." }, { status: 500 });
    }
}
