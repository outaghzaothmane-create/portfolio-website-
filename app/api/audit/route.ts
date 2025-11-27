import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Ensure URL has protocol
        const targetUrl = url.startsWith("http") ? url : `https://${url}`;

        const startTime = Date.now();
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "OthmaneSEO-Audit-Bot/1.0",
            },
        });
        const endTime = Date.now();
        const ttfb = endTime - startTime;

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch URL: ${response.statusText}` },
                { status: response.status }
            );
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $("title").text();
        const description = $('meta[name="description"]').attr("content") || "";
        const h1 = $("h1").first().text();
        const isHttps = response.url.startsWith("https");

        const results = {
            url: response.url,
            ttfb,
            isHttps,
            title: {
                value: title,
                status: title && title.length > 0 && title.length < 60 ? "good" : "warning",
            },
            description: {
                value: description,
                status: description && description.length > 50 && description.length < 160 ? "good" : "warning",
            },
            h1: {
                value: h1,
                status: h1 && h1.length > 0 ? "good" : "error",
            },
        };

        return NextResponse.json(results);
    } catch (error: any) {
        console.error("Audit error:", error);
        return NextResponse.json(
            { error: "Failed to perform audit. Please check the URL and try again." },
            { status: 500 }
        );
    }
}
