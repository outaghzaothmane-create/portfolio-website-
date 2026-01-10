import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

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

        const response = await fetch(targetUrl, {
            headers: { "User-Agent": "OthmaneSEO-Audit-Bot/1.0" },
        });
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

        // 3. ASSETS
        const images = $("img");
        const totalImages = images.length;
        const missingAlt = images.filter((_, el) => !$(el).attr("alt")).length;

        const links = $("a");
        const internalLinks = links.filter((_, el) => {
            const href = $(el).attr("href");
            return !!(href?.startsWith("/") || href?.includes(new URL(targetUrl).hostname));
        }).length;

        // 4. SOCIAL & TECH
        const ogTitle = $('meta[property="og:title"]').attr("content");
        const ogImage = $('meta[property="og:image"]').attr("content");
        const generator = $('meta[name="generator"]').attr("content") || "Unknown";

        // 5. SCORING ALGORITHM
        let score = 100;
        const issues = [];

        if (ttfb > 600) { score -= 10; issues.push("Slow Server Response (>600ms)"); }
        if (!title || title.length > 60) { score -= 10; issues.push("Title not optimized (0 or >60 chars)"); }
        if (!description) { score -= 10; issues.push("Missing Meta Description"); }
        if (h1Count !== 1) { score -= 15; issues.push("H1 Tag Error (Must be exactly 1)"); }
        if (missingAlt > 0) { score -= 10; issues.push(`${missingAlt} Images missing Alt Text`); }
        if (!viewport) { score -= 20; issues.push("Not Mobile Friendly (No Viewport)"); }
        if (!targetUrl.startsWith("https")) { score -= 15; issues.push("Not Secure (No HTTPS)"); }
        if (wordCount < 300) { score -= 10; issues.push("Thin Content (<300 words)"); }

        score = Math.max(0, score);

        const results = {
            url: targetUrl,
            score,
            details: {
                performance: { ttfb, wordCount, internalLinks },
                meta: { title, description, canonical, robots, viewport },
                headings: { h1, h1Count, h2Count },
                images: { total: totalImages, missingAlt },
                social: { ogTitle, ogImage },
                tech: { generator },
                issues
            }
        };

        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ error: "Scan failed. Site may block bots." }, { status: 500 });
    }
}
