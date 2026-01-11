# SEO Audit Cloudflare Worker

This folder contains a standalone Cloudflare Worker that powers the SEO audit functionality for your static GitHub Pages site.

## Why a Cloudflare Worker?

GitHub Pages only serves static files - it cannot execute server-side code. The SEO audit tool needs to:
- Fetch and parse external websites (requires server-side)
- Send emails via Resend API (requires secret API keys)
- Apply rate limiting and SSRF protection

Cloudflare Workers solves this with:
- **100,000 free requests/day** - More than enough for a portfolio
- **Global edge network** - Fast response times worldwide
- **Built-in security** - DDoS protection, rate limiting support

## Features

- Full SEO audit with scoring algorithm
- JSON-LD Schema detection
- Open Graph & Twitter Card analysis
- Sitemap.xml and robots.txt detection
- TTFB (Time to First Byte) measurement
- SSRF protection (blocks internal IPs)
- Rate limiting (10 requests/minute per IP)
- Email report delivery via Resend

## Deployment

### Prerequisites
- [Cloudflare account](https://dash.cloudflare.com/sign-up) (free)
- [Resend account](https://resend.com) for email (free tier: 100 emails/day)
- Node.js 18+

### Steps

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Configure your domain** (optional but recommended)

   Edit `wrangler.toml` and update `ALLOWED_ORIGINS` with your domains:
   ```toml
   [vars]
   ALLOWED_ORIGINS = "https://yourusername.github.io,https://yourcustomdomain.com"
   ```

4. **Set your Resend API key**
   ```bash
   wrangler secret put RESEND_API_KEY
   # Paste your API key when prompted
   ```

5. **Deploy**
   ```bash
   cd cloudflare-worker
   wrangler deploy
   ```

6. **Note your Worker URL**

   After deployment, you'll see something like:
   ```
   Published seo-audit-worker (1.00 sec)
   https://seo-audit-worker.YOUR-SUBDOMAIN.workers.dev
   ```

7. **Configure your Next.js site**

   Create `.env.local` or set in GitHub Actions:
   ```bash
   NEXT_PUBLIC_AUDIT_WORKER_URL=https://seo-audit-worker.YOUR-SUBDOMAIN.workers.dev
   ```

## API Endpoints

### POST /audit
Run an SEO audit on a URL.

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "score": 85,
  "isHttps": true,
  "details": {
    "performance": { "ttfb": 234, "wordCount": 1500, ... },
    "meta": { "title": "...", "description": "...", ... },
    "social": { "ogTitle": "...", "hasSocialTags": true, ... },
    "schema": { "hasSchema": true, "schemaTypes": ["WebPage"], ... },
    "technical": { "hasSitemap": true, "hasRobotsTxt": true },
    "issues": [...]
  }
}
```

### POST /send-report
Send an audit report via email.

**Request:**
```json
{
  "email": "user@example.com",
  "results": { /* audit results object */ }
}
```

## Local Development

For local testing, you can use Wrangler's dev mode:

```bash
cd cloudflare-worker
wrangler dev
```

This runs the worker locally at `http://localhost:8787`.

## Troubleshooting

### CORS Errors
Make sure your domain is in `ALLOWED_ORIGINS` in `wrangler.toml`.

### Rate Limiting
The worker limits requests to 10/minute per IP. Wait 60 seconds between bursts.

### Email Not Sending
1. Verify your Resend API key is set: `wrangler secret list`
2. Check Resend dashboard for errors
3. Ensure sender domain is verified in Resend

## Security

- SSRF protection blocks requests to internal/private IPs
- Rate limiting prevents abuse
- CORS restricts which domains can call the API
- No secrets are exposed to the client
