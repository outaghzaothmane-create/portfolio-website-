/**
 * SEO Audit Cloudflare Worker
 *
 * Deploy to Cloudflare Workers to handle SEO audits for your static GitHub Pages site.
 *
 * Required Environment Variables (set in Cloudflare Dashboard):
 * - RESEND_API_KEY: Your Resend.com API key for sending email reports
 *
 * Endpoints:
 * - POST /audit - Run SEO audit on a URL
 * - POST /send-report - Send audit report via email
 *
 * Deployment:
 * 1. Install Wrangler: npm install -g wrangler
 * 2. Login: wrangler login
 * 3. Create wrangler.toml (see below)
 * 4. Deploy: wrangler deploy
 *
 * wrangler.toml:
 * ```
 * name = "seo-audit-worker"
 * main = "seo-audit-worker.ts"
 * compatibility_date = "2024-01-01"
 *
 * [vars]
 * ALLOWED_ORIGINS = "https://yourdomain.com,https://yourname.github.io"
 * ```
 */

export interface Env {
  RESEND_API_KEY?: string;
  ALLOWED_ORIGINS?: string;
}

// Rate limiting using Cloudflare's edge cache
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 1000;

// In-memory rate limit (resets on worker restart, but good enough for edge)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

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

function validateUrl(input: string): { valid: boolean; url?: string; error?: string } {
  try {
    const urlString = input.startsWith("http") ? input : `https://${input}`;
    const parsed = new URL(urlString);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { valid: false, error: "Only HTTP and HTTPS protocols are allowed" };
    }

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

function getCorsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowedOrigins = env.ALLOWED_ORIGINS?.split(",") || ["*"];
  const isAllowed = allowedOrigins.includes("*") || (origin && allowedOrigins.includes(origin));

  return {
    "Access-Control-Allow-Origin": isAllowed && origin ? origin : allowedOrigins[0] || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

// Simple HTML parser (Cloudflare Workers don't have cheerio, so we use regex-based parsing)
class SimpleHTMLParser {
  private html: string;

  constructor(html: string) {
    this.html = html;
  }

  getTitle(): string {
    const match = this.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    return match ? this.decodeHtmlEntities(match[1].trim()) : "";
  }

  getMetaContent(name: string, property = false): string | undefined {
    const attr = property ? "property" : "name";
    const regex = new RegExp(`<meta[^>]*${attr}=["']${name}["'][^>]*content=["']([^"']*)["']`, "i");
    const regex2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${name}["']`, "i");
    const match = this.html.match(regex) || this.html.match(regex2);
    return match ? this.decodeHtmlEntities(match[1].trim()) : undefined;
  }

  getCanonical(): string | null {
    const match = this.html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    return match ? match[1] : null;
  }

  getH1s(): string[] {
    const matches = this.html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    return Array.from(matches).map(m => this.stripTags(m[1]).trim());
  }

  getH2Count(): number {
    const matches = this.html.matchAll(/<h2[^>]*>/gi);
    return Array.from(matches).length;
  }

  getBodyText(): string {
    // Remove script and style tags
    let text = this.html.replace(/<script[\s\S]*?<\/script>/gi, "");
    text = text.replace(/<style[\s\S]*?<\/style>/gi, "");
    text = this.stripTags(text);
    return text.replace(/\s+/g, " ").trim();
  }

  getImages(): { total: number; missingAlt: number } {
    const imgMatches = this.html.matchAll(/<img[^>]*>/gi);
    const images = Array.from(imgMatches);
    const missingAlt = images.filter(m => !m[0].match(/alt=["'][^"']+["']/i)).length;
    return { total: images.length, missingAlt };
  }

  getLinks(baseHostname: string): { internal: number; external: number; nofollow: number } {
    const linkMatches = this.html.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi);
    let internal = 0, external = 0, nofollow = 0;

    for (const match of Array.from(linkMatches)) {
      const href = match[1];
      const fullTag = match[0];

      if (fullTag.toLowerCase().includes("nofollow")) {
        nofollow++;
      }

      try {
        if (href.startsWith("/") || href.startsWith("#")) {
          internal++;
        } else if (href.startsWith("http")) {
          const linkUrl = new URL(href);
          if (linkUrl.hostname === baseHostname) {
            internal++;
          } else {
            external++;
          }
        } else if (!href.startsWith("mailto:") && !href.startsWith("tel:") && !href.startsWith("javascript:")) {
          internal++;
        }
      } catch {
        // Invalid URL
      }
    }

    return { internal, external, nofollow };
  }

  getJsonLdSchemas(): any[] {
    const matches = this.html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    const schemas: any[] = [];

    for (const match of Array.from(matches)) {
      try {
        schemas.push(JSON.parse(match[1]));
      } catch {
        // Invalid JSON
      }
    }

    return schemas;
  }

  getGenerator(): string {
    return this.getMetaContent("generator") || "Unknown";
  }

  private stripTags(html: string): string {
    return html.replace(/<[^>]*>/g, "");
  }

  private decodeHtmlEntities(text: string): string {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");
  }
}

type IssueCategory = "critical" | "warning" | "good-to-have";

interface SeoIssue {
  category: IssueCategory;
  issue: string;
  advice: string;
}

interface AuditResults {
  url: string;
  score: number;
  isHttps: boolean;
  details: {
    performance: {
      ttfb: number;
      wordCount: number;
      internalLinks: number;
      externalLinks: number;
      nofollowLinks: number;
    };
    meta: {
      title: string;
      description: string;
      canonical: string | null;
      robots: string;
      viewport: string | undefined;
    };
    headings: {
      h1: string;
      h1Count: number;
      h2Count: number;
    };
    images: {
      total: number;
      missingAlt: number;
    };
    social: {
      ogTitle: string | undefined;
      ogDescription: string | undefined;
      ogImage: string | undefined;
      ogType: string | undefined;
      ogUrl: string | undefined;
      twitterCard: string | undefined;
      twitterTitle: string | undefined;
      twitterDescription: string | undefined;
      twitterImage: string | undefined;
      hasSocialTags: boolean;
    };
    schema: {
      hasSchema: boolean;
      schemaTypes: string[];
      count: number;
    };
    technical: {
      hasSitemap: boolean;
      hasRobotsTxt: boolean;
      robotsTxtContent: string | null;
    };
    semantic: {
      keywordMatch: boolean;
      titleWords: string[];
    };
    tech: {
      generator: string;
    };
    issues: SeoIssue[];
  };
}

async function checkResourceExists(baseUrl: string, path: string): Promise<{ exists: boolean; content?: string }> {
  try {
    const url = new URL(path, baseUrl).href;
    const response = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": getRandomUserAgent() },
      cf: { cacheTtl: 300 },
    });

    if (response.ok) {
      const content = await response.text();
      return { exists: true, content };
    }
    return { exists: false };
  } catch {
    return { exists: false };
  }
}

async function runAudit(url: string): Promise<AuditResults> {
  const validation = validateUrl(url.trim());
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const targetUrl = validation.url!;
  const startTime = Date.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(targetUrl, {
      headers: { "User-Agent": getRandomUserAgent() },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const ttfb = Date.now() - startTime;

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const html = await response.text();
    const parser = new SimpleHTMLParser(html);
    const parsedUrl = new URL(targetUrl);

    // Parse all data
    const title = parser.getTitle();
    const description = parser.getMetaContent("description") || "";
    const canonical = parser.getCanonical();
    const robots = parser.getMetaContent("robots") || "index, follow";
    const viewport = parser.getMetaContent("viewport");

    const h1s = parser.getH1s();
    const h1Count = h1s.length;
    const h1 = h1s[0] || "";
    const h2Count = parser.getH2Count();

    const bodyText = parser.getBodyText();
    const wordCount = bodyText.split(" ").filter(w => w.length > 0).length;

    // Schema detection
    const schemas = parser.getJsonLdSchemas();
    const hasSchema = schemas.length > 0;
    const schemaTypes = schemas.map(s => s["@type"] || "Unknown").filter((v, i, a) => a.indexOf(v) === i);

    // Social meta tags
    const ogTitle = parser.getMetaContent("og:title", true);
    const ogDescription = parser.getMetaContent("og:description", true);
    const ogImage = parser.getMetaContent("og:image", true);
    const ogType = parser.getMetaContent("og:type", true);
    const ogUrl = parser.getMetaContent("og:url", true);

    const twitterCard = parser.getMetaContent("twitter:card");
    const twitterTitle = parser.getMetaContent("twitter:title");
    const twitterDescription = parser.getMetaContent("twitter:description");
    const twitterImage = parser.getMetaContent("twitter:image");

    const hasSocialTags = !!(ogTitle && ogDescription && ogImage);

    // Link analysis
    const links = parser.getLinks(parsedUrl.hostname);

    // Images
    const images = parser.getImages();

    // Semantic check
    const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const h1Words = h1.toLowerCase().split(/\s+/);
    const keywordMatch = titleWords.some(word => h1Words.includes(word));

    // Technical checks - sitemap and robots.txt
    const [sitemapCheck, robotsCheck] = await Promise.all([
      checkResourceExists(targetUrl, "/sitemap.xml"),
      checkResourceExists(targetUrl, "/robots.txt"),
    ]);

    const generator = parser.getGenerator();

    // Scoring algorithm
    let score = 100;
    const issues: SeoIssue[] = [];

    // CRITICAL ISSUES (30 points each)
    if (h1Count !== 1) {
      score -= 30;
      issues.push({
        category: "critical",
        issue: `H1 Tag Error (Found ${h1Count}, need exactly 1)`,
        advice: "Add a single, descriptive H1 tag at the top of your page with your primary keyword.",
      });
    }

    if (!viewport) {
      score -= 30;
      issues.push({
        category: "critical",
        issue: "Not Mobile Friendly (No Viewport Meta Tag)",
        advice: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to your <head> section.',
      });
    }

    if (!targetUrl.startsWith("https")) {
      score -= 30;
      issues.push({
        category: "critical",
        issue: "Not Secure (No HTTPS)",
        advice: "Install an SSL certificate and redirect all HTTP traffic to HTTPS for security and SEO.",
      });
    }

    // WARNINGS (15 points each)
    if (ttfb > 600) {
      score -= 15;
      issues.push({
        category: "warning",
        issue: `Slow Server Response (${ttfb}ms TTFB)`,
        advice: "Optimize your server, enable caching, use a CDN, or upgrade hosting to reduce load time.",
      });
    }

    if (!title || title.length > 60) {
      score -= 15;
      issues.push({
        category: "warning",
        issue: title ? "Title Too Long (>60 chars)" : "Missing Title Tag",
        advice: "Write a compelling title between 50-60 characters with your primary keyword near the beginning.",
      });
    }

    if (!description) {
      score -= 15;
      issues.push({
        category: "warning",
        issue: "Missing Meta Description",
        advice: "Add a meta description (150-160 chars) that summarizes your page and includes target keywords.",
      });
    }

    if (images.missingAlt > 0) {
      score -= 15;
      issues.push({
        category: "warning",
        issue: `${images.missingAlt} Image${images.missingAlt > 1 ? "s" : ""} Missing Alt Text`,
        advice: "Add descriptive alt text to all images for accessibility and SEO benefits.",
      });
    }

    if (wordCount < 300) {
      score -= 15;
      issues.push({
        category: "warning",
        issue: `Thin Content (${wordCount} words)`,
        advice: "Expand your content to at least 300-500 words with valuable, keyword-rich information.",
      });
    }

    // GOOD TO HAVE (10 points each)
    if (!hasSocialTags) {
      score -= 10;
      issues.push({
        category: "good-to-have",
        issue: "Missing Open Graph Tags",
        advice: "Add og:title, og:description, and og:image meta tags to control how your page appears when shared on social media.",
      });
    }

    if (!hasSchema) {
      score -= 10;
      issues.push({
        category: "good-to-have",
        issue: "No Structured Data (Schema.org)",
        advice: "Add JSON-LD structured data to help search engines understand your content and enable rich snippets.",
      });
    }

    if (!keywordMatch && title && h1) {
      score -= 10;
      issues.push({
        category: "good-to-have",
        issue: "Low Keyword Relevance",
        advice: "Ensure your main keyword from the title appears in the first H1 for better topical relevance.",
      });
    }

    if (!sitemapCheck.exists) {
      score -= 5;
      issues.push({
        category: "good-to-have",
        issue: "No Sitemap Found",
        advice: "Create a sitemap.xml file to help search engines discover and index all your pages efficiently.",
      });
    }

    if (!robotsCheck.exists) {
      score -= 5;
      issues.push({
        category: "good-to-have",
        issue: "No robots.txt Found",
        advice: "Add a robots.txt file to control how search engines crawl your site and point to your sitemap.",
      });
    }

    if (links.external > 0 && links.nofollow === 0) {
      score -= 5;
      issues.push({
        category: "good-to-have",
        issue: "No Nofollow Links on External Links",
        advice: "Consider adding rel='nofollow' to external links you don't want to endorse to preserve link equity.",
      });
    }

    score = Math.max(0, score);

    return {
      url: targetUrl,
      score,
      isHttps: targetUrl.startsWith("https"),
      details: {
        performance: {
          ttfb,
          wordCount,
          internalLinks: links.internal,
          externalLinks: links.external,
          nofollowLinks: links.nofollow,
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
        images,
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
        technical: {
          hasSitemap: sitemapCheck.exists,
          hasRobotsTxt: robotsCheck.exists,
          robotsTxtContent: robotsCheck.content || null,
        },
        semantic: {
          keywordMatch,
          titleWords: titleWords.slice(0, 5),
        },
        tech: {
          generator,
        },
        issues,
      },
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timeout. Site took too long to respond (>8s).");
    }
    throw error;
  }
}

async function sendEmailReport(email: string, results: AuditResults, env: Env): Promise<void> {
  if (!env.RESEND_API_KEY) {
    throw new Error("Email service not configured");
  }

  const criticalIssues = results.details.issues.filter(i => i.category === "critical");
  const warnings = results.details.issues.filter(i => i.category === "warning");
  const goodToHave = results.details.issues.filter(i => i.category === "good-to-have");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #ffffff; margin: 0; padding: 0; background-color: #000000; }
        .container { max-width: 600px; margin: 0 auto; background-color: #000000; border: 1px solid #333333; }
        .header { background-color: #000000; padding: 40px 24px; text-align: center; border-bottom: 1px solid #333333; }
        .score-ring {
          width: 100px; height: 100px; border-radius: 50%;
          border: 4px solid ${results.score >= 70 ? "#22c55e" : (results.score >= 50 ? "#eab308" : "#ef4444")};
          background: #000000; color: #ffffff;
          display: flex; align-items: center; justify-content: center;
          font-size: 36px; font-weight: 800; margin: 0 auto 20px;
          box-shadow: 0 0 20px ${results.score >= 70 ? "rgba(34,197,94,0.4)" : "rgba(0,0,0,0)"};
        }
        .greeting { padding: 24px; color: #d4d4d4; font-size: 14px; line-height: 1.8; border-bottom: 1px solid #333333; }
        .content { padding: 40px 24px; }
        .card { background: #1a1a1a; border: 1px solid #333333; border-radius: 12px; padding: 20px; text-align: center; }
        .label { font-size: 11px; text-transform: uppercase; color: #a3a3a3; letter-spacing: 1px; margin-bottom: 8px; font-weight: 700; }
        .value { font-size: 24px; font-weight: 800; color: #ffffff; }
        .section-title { font-size: 18px; font-weight: 700; color: #ffffff; margin: 40px 0 20px 0; padding-bottom: 16px; border-bottom: 1px solid #333333; display: flex; align-items: center; }
        .issue-card { background: #1a1a1a; border: 1px solid #333333; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
        .issue-card.critical { border-left: 4px solid #ef4444; background: #1a0a0a; }
        .issue-card.warning { border-left: 4px solid #eab308; background: #1a1a0a; }
        .issue-card.good-to-have { border-left: 4px solid #3b82f6; background: #0a0a1a; }
        .issue-header { font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
        .issue-advice { font-size: 13px; color: #a3a3a3; background: #0a0a0a; padding: 12px; border-radius: 6px; border: 1px solid #1a1a1a; font-style: italic; }
        .issue-advice::before { content: 'How to Fix: '; font-weight: 700; color: #22c55e; font-style: normal; }
        .list-item { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #333333; font-size: 14px; color: #d4d4d4; }
        .list-item strong { color: #ffffff; font-weight: 600; }
        .cta-button { display: block; width: 100%; box-sizing: border-box; background-color: #22c55e; color: #000000; text-decoration: none; padding: 18px 0; border-radius: 8px; font-weight: 800; text-align: center; margin-top: 40px; font-size: 16px; letter-spacing: 0.5px; }
        .badge { padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .badge-good { background: #14532d; color: #4ade80; border: 1px solid #166534; }
        .badge-warn { background: #713f12; color: #facc15; border: 1px solid #854d0e; }
        .badge-error { background: #450a0a; color: #fca5a5; border: 1px solid #7f1d1d; }
        .footer { background-color: #000000; padding: 40px 24px; text-align: center; font-size: 12px; color: #525252; border-top: 1px solid #333333; }
        .summary-box { background: #1a1a1a; border: 1px solid #333333; padding: 20px; border-radius: 8px; margin-bottom: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="score-ring">${results.score}</div>
          <h1 style="margin:0; font-size: 24px; font-weight: 700; color: #fff;">SEO Audit Complete</h1>
          <p style="margin:8px 0 0; color: #737373; font-size: 14px;">${results.url}</p>
        </div>

        <div class="greeting">
          <p style="margin: 0 0 16px 0;"><strong>Hi there,</strong></p>
          <p style="margin: 0;">I've completed a comprehensive technical analysis of your website. Your site scored <strong>${results.score}/100</strong>, and I've identified ${results.details.issues.length} optimization ${results.details.issues.length === 1 ? "opportunity" : "opportunities"} to help you rank higher in search results.</p>
        </div>

        <div class="content">
          <div class="summary-box">
            <div style="font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">Performance Snapshot</div>
            <div style="color: #a3a3a3; font-size: 13px; line-height: 1.6;">
              Your site loads in <strong style="color: #ffffff;">${results.details.performance.ttfb}ms</strong> with
              <strong style="color: #ffffff;">${results.details.performance.wordCount}</strong> words of content.
              ${results.details.social.hasSocialTags ? "Social media tags are configured." : "Social media tags need attention."}
              ${results.details.schema.hasSchema ? "Structured data detected." : "No structured data found."}
              ${results.details.technical.hasSitemap ? "Sitemap found." : "No sitemap detected."}
            </div>
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr>
              <td width="48%">
                <div class="card">
                  <div class="label">Load Time</div>
                  <div class="value">${results.details.performance.ttfb}ms</div>
                </div>
              </td>
              <td width="4%"></td>
              <td width="48%">
                <div class="card">
                  <div class="label">Words</div>
                  <div class="value">${results.details.performance.wordCount}</div>
                </div>
              </td>
            </tr>
            <tr><td height="12"></td></tr>
            <tr>
              <td width="48%">
                <div class="card">
                  <div class="label">Mobile</div>
                  <div class="value" style="color: ${results.details.meta.viewport ? "#4ade80" : "#ef4444"}">
                    ${results.details.meta.viewport ? "Yes" : "No"}
                  </div>
                </div>
              </td>
              <td width="4%"></td>
              <td width="48%">
                <div class="card">
                  <div class="label">HTTPS</div>
                  <div class="value" style="color: ${results.isHttps ? "#4ade80" : "#ef4444"}">
                    ${results.isHttps ? "Secure" : "Unsafe"}
                  </div>
                </div>
              </td>
            </tr>
            <tr><td height="12"></td></tr>
            <tr>
              <td width="48%">
                <div class="card">
                  <div class="label">Sitemap</div>
                  <div class="value" style="color: ${results.details.technical.hasSitemap ? "#4ade80" : "#eab308"}">
                    ${results.details.technical.hasSitemap ? "Yes" : "No"}
                  </div>
                </div>
              </td>
              <td width="4%"></td>
              <td width="48%">
                <div class="card">
                  <div class="label">Schema</div>
                  <div class="value" style="color: ${results.details.schema.hasSchema ? "#4ade80" : "#eab308"}">
                    ${results.details.schema.hasSchema ? "Yes" : "No"}
                  </div>
                </div>
              </td>
            </tr>
          </table>

          ${criticalIssues.length > 0 ? `
            <div class="section-title">Critical Issues (${criticalIssues.length})</div>
            <p style="color: #a3a3a3; margin-top: -10px; font-size: 13px;">These issues directly impact your search rankings and must be fixed immediately.</p>
            ${criticalIssues.map(issue => `
              <div class="issue-card critical">
                <div class="issue-header">${issue.issue}</div>
                <div class="issue-advice">${issue.advice}</div>
              </div>
            `).join("")}
          ` : ""}

          ${warnings.length > 0 ? `
            <div class="section-title">Warnings (${warnings.length})</div>
            <p style="color: #a3a3a3; margin-top: -10px; font-size: 13px;">Important optimizations that will improve your SEO performance.</p>
            ${warnings.map(issue => `
              <div class="issue-card warning">
                <div class="issue-header">${issue.issue}</div>
                <div class="issue-advice">${issue.advice}</div>
              </div>
            `).join("")}
          ` : ""}

          ${goodToHave.length > 0 ? `
            <div class="section-title">Good to Have (${goodToHave.length})</div>
            <p style="color: #a3a3a3; margin-top: -10px; font-size: 13px;">Additional enhancements to maximize your SEO potential.</p>
            ${goodToHave.map(issue => `
              <div class="issue-card good-to-have">
                <div class="issue-header">${issue.issue}</div>
                <div class="issue-advice">${issue.advice}</div>
              </div>
            `).join("")}
          ` : ""}

          ${results.details.issues.length === 0 ? `
            <div style="padding: 16px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); color: #4ade80; border-radius: 8px; text-align: center; margin-bottom: 24px;">
              Excellent! No critical issues found. Your site is well-optimized!
            </div>
          ` : ""}

          <div class="section-title">Technical Deep Dive</div>

          <div class="list-item">
            <span>Title Tag</span>
            <span class="badge ${results.details.meta.title ? "badge-good" : "badge-error"}">
              ${results.details.meta.title ? "PASS" : "FAIL"}
            </span>
          </div>
          <div class="list-item">
            <span>Meta Description</span>
            <span class="badge ${results.details.meta.description ? "badge-good" : "badge-error"}">
              ${results.details.meta.description ? "PASS" : "FAIL"}
            </span>
          </div>
          <div class="list-item">
            <span>H1 Structure</span>
            <span class="badge ${results.details.headings.h1Count === 1 ? "badge-good" : "badge-error"}">
              ${results.details.headings.h1Count} Found
            </span>
          </div>
          <div class="list-item">
            <span>Images w/ Alt</span>
            <strong>${results.details.images.total - results.details.images.missingAlt} / ${results.details.images.total}</strong>
          </div>
          <div class="list-item">
            <span>Internal Links</span>
            <strong style="color: #22c55e;">${results.details.performance.internalLinks}</strong>
          </div>
          <div class="list-item" style="border-bottom: none;">
            <span>Tech Stack</span>
            <strong style="color: #22c55e;">${results.details.tech.generator}</strong>
          </div>

          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border: 1px solid #333333; padding: 24px; border-radius: 8px; margin-top: 32px;">
            <div style="font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">Next Steps</div>
            <p style="color: #a3a3a3; margin: 0 0 16px 0; font-size: 13px;">
              ${results.score >= 90
                ? "Your site is performing well! Let's maintain this momentum with ongoing optimization."
                : results.score >= 70
                ? "Your site has a solid foundation. Let's work together to achieve a perfect 100 score."
                : "I can help you fix these issues and dramatically improve your search rankings."}
            </p>
            <a href="mailto:outaghza.othmane@gmail.com" class="cta-button">
              Book Free Strategy Call
            </a>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0;"><strong>Othmane Outaghza</strong> - SEO Consultant</p>
          <p style="margin: 8px 0 0; opacity: 0.5;">Automated Technical Analysis Powered by OthmaneSEO</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "OthmaneSEO <onboarding@resend.dev>",
      to: [email],
      subject: `SEO Health Score: ${results.score}/100 for ${results.url}`,
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send email");
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const corsHeaders = getCorsHeaders(origin, env);

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Only accept POST
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Rate limiting
    const ip = request.headers.get("CF-Connecting-IP") ||
               request.headers.get("X-Forwarded-For")?.split(",")[0] ||
               "unknown";

    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const body = await request.json();

      // Route: /audit or default
      if (path === "/audit" || path === "/" || path === "") {
        if (!body.url || typeof body.url !== "string") {
          return new Response(JSON.stringify({ error: "URL is required" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const results = await runAudit(body.url);
        return new Response(JSON.stringify(results), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Route: /send-report
      if (path === "/send-report") {
        if (!body.email || !body.results) {
          return new Response(JSON.stringify({ error: "Email and results are required" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        await sendEmailReport(body.email, body.results, env);
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message || "Scan failed. Site may block bots." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
