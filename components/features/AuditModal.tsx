"use client";

import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Layout, Image as ImageIcon, Download, Lightbulb, Share2, Database, Link as LinkIcon, FileText, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

// Worker URL - set via environment variable for production
const AUDIT_WORKER_URL = process.env.NEXT_PUBLIC_AUDIT_WORKER_URL || "/api/audit";
const SEND_REPORT_URL = process.env.NEXT_PUBLIC_AUDIT_WORKER_URL
  ? `${process.env.NEXT_PUBLIC_AUDIT_WORKER_URL}/send-report`
  : "/api/send-report";

// Validation helpers
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?:\/\/)?([\\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

function validateEmail(email: string): boolean {
    return EMAIL_REGEX.test(email.trim());
}

function validateUrl(url: string): boolean {
    if (!url.trim()) return false;
    return URL_REGEX.test(url.trim());
}

interface AuditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ScanStep = {
    id: string;
    label: string;
    status: "pending" | "scanning" | "complete";
};

const INITIAL_STEPS: ScanStep[] = [
    { id: "connect", label: "Connecting to server...", status: "pending" },
    { id: "crawl", label: "Crawling page content...", status: "pending" },
    { id: "analyze", label: "Analyzing meta tags & structure...", status: "pending" },
    { id: "score", label: "Calculating health score...", status: "pending" },
];

type IssueCategory = "critical" | "warning" | "good-to-have";

interface SeoIssue {
    category: IssueCategory;
    issue: string;
    advice: string;
}

interface AuditResults {
    score: number;
    url: string;
    isHttps?: boolean;
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
        headings: { h1: string; h1Count: number; h2Count: number };
        images: { total: number; missingAlt: number };
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
        technical?: {
            hasSitemap: boolean;
            hasRobotsTxt: boolean;
            robotsTxtContent: string | null;
        };
        semantic: {
            keywordMatch: boolean;
            titleWords: string[];
        };
        tech: { generator: string };
        issues: SeoIssue[];
    };
}

// Google Search Preview Component
function GoogleSearchPreview({ title, description, url }: { title: string; description: string; url: string }) {
    const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

    return (
        <div className="p-6 rounded-xl border bg-gradient-to-br from-muted/30 to-muted/10 space-y-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                Google Search Preview
            </div>
            <div className="space-y-1">
                <div className="text-blue-600 dark:text-blue-400 text-lg font-medium hover:underline cursor-pointer line-clamp-1">
                    {title || "Untitled Page"}
                </div>
                <div className="text-green-700 dark:text-green-500 text-sm">
                    {displayUrl}
                </div>
                <div className="text-muted-foreground text-sm line-clamp-2">
                    {description || "No meta description available."}
                </div>
            </div>
        </div>
    );
}

export function AuditModal({ isOpen, onClose }: AuditModalProps) {
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "scanning" | "complete">("idle");
    const [progress, setProgress] = useState(0);
    const [steps, setSteps] = useState<ScanStep[]>(INITIAL_STEPS);
    const [results, setResults] = useState<AuditResults | null>(null);
    const [error, setError] = useState("");
    const [urlError, setUrlError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [sending, setSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleUrlChange = useCallback((value: string) => {
        setUrl(value);
        if (value && !validateUrl(value)) {
            setUrlError("Please enter a valid URL (e.g., example.com)");
        } else {
            setUrlError("");
        }
    }, []);

    const handleEmailChange = useCallback((value: string) => {
        setEmail(value);
        if (value && !validateEmail(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    }, []);

    const startScan = async () => {
        if (!url || !validateUrl(url)) {
            setUrlError("Please enter a valid URL");
            return;
        }
        setStatus("scanning");
        setProgress(0);
        setSteps(INITIAL_STEPS);
        setError("");
        setResults(null);

        // Simulate first 2 steps
        for (let i = 0; i < 2; i++) {
            setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "scanning" } : s));
            await new Promise(resolve => setTimeout(resolve, 800));
            setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "complete" } : s));
            setProgress(((i + 1) / INITIAL_STEPS.length) * 100);
        }

        try {
            const response = await fetch(AUDIT_WORKER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            // Handle non-JSON responses gracefully
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Site may block automated requests. Try a different URL.");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Audit failed");
            }

            setResults(data);

            // Complete remaining steps
            for (let i = 2; i < INITIAL_STEPS.length; i++) {
                setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "scanning" } : s));
                await new Promise(resolve => setTimeout(resolve, 400));
                setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "complete" } : s));
                setProgress(((i + 1) / INITIAL_STEPS.length) * 100);
            }

            setStatus("complete");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error
                ? err.message
                : "Scan failed. The site may block bots or be unavailable.";
            setError(errorMessage);
            setStatus("idle");
        }
    };

    const downloadReport = async (format: 'txt' | 'pdf' = 'txt') => {
        if (!results) return;

        const timestamp = new Date().toLocaleString();
        const criticalIssues = results.details.issues.filter(i => i.category === 'critical');
        const warnings = results.details.issues.filter(i => i.category === 'warning');
        const goodToHave = results.details.issues.filter(i => i.category === 'good-to-have');

        if (format === 'pdf') {
            // Dynamic import jspdf for client-side PDF generation
            const { jsPDF } = await import('jspdf');
            const doc = new jsPDF();
            let y = 20;
            const lineHeight = 7;
            const pageHeight = 280;
            const marginLeft = 20;
            const maxWidth = 170;

            const addText = (text: string, fontSize = 10, isBold = false) => {
                if (y > pageHeight) {
                    doc.addPage();
                    y = 20;
                }
                doc.setFontSize(fontSize);
                doc.setFont('helvetica', isBold ? 'bold' : 'normal');
                const lines = doc.splitTextToSize(text, maxWidth);
                doc.text(lines, marginLeft, y);
                y += lines.length * lineHeight;
            };

            const addSection = (title: string) => {
                y += 5;
                addText(title, 14, true);
                y += 2;
            };

            // Header
            doc.setFillColor(0, 0, 0);
            doc.rect(0, 0, 210, 45, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('SEO AUDIT REPORT', marginLeft, 25);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Score: ${results.score}/100  |  ${results.url}`, marginLeft, 35);

            doc.setTextColor(0, 0, 0);
            y = 55;

            // Summary
            addSection('SUMMARY');
            addText(`Generated: ${timestamp}`);
            addText(`Security: ${results.isHttps ? 'HTTPS (Secure)' : 'HTTP (Not Secure)'}`);
            addText(`Load Time: ${results.details.performance.ttfb}ms`);
            addText(`Word Count: ${results.details.performance.wordCount}`);
            addText(`Mobile Ready: ${results.details.meta.viewport ? 'Yes' : 'No'}`);
            if (results.details.technical) {
                addText(`Sitemap: ${results.details.technical.hasSitemap ? 'Found' : 'Not Found'}`);
                addText(`Robots.txt: ${results.details.technical.hasRobotsTxt ? 'Found' : 'Not Found'}`);
            }

            // Meta Information
            addSection('META INFORMATION');
            addText(`Title: ${results.details.meta.title || 'Missing'}`);
            addText(`Description: ${results.details.meta.description || 'Missing'}`);
            addText(`Social Tags: ${results.details.social.hasSocialTags ? 'Complete' : 'Missing'}`);
            addText(`Schema Markup: ${results.details.schema.hasSchema ? `Yes (${results.details.schema.schemaTypes.join(', ')})` : 'No'}`);

            // Issues
            if (criticalIssues.length > 0) {
                addSection(`CRITICAL ISSUES (${criticalIssues.length})`);
                criticalIssues.forEach((issue, i) => {
                    addText(`${i + 1}. ${issue.issue}`, 10, true);
                    addText(`   Fix: ${issue.advice}`);
                    y += 2;
                });
            }

            if (warnings.length > 0) {
                addSection(`WARNINGS (${warnings.length})`);
                warnings.forEach((issue, i) => {
                    addText(`${i + 1}. ${issue.issue}`, 10, true);
                    addText(`   Fix: ${issue.advice}`);
                    y += 2;
                });
            }

            if (goodToHave.length > 0) {
                addSection(`RECOMMENDATIONS (${goodToHave.length})`);
                goodToHave.forEach((issue, i) => {
                    addText(`${i + 1}. ${issue.issue}`, 10, true);
                    addText(`   Fix: ${issue.advice}`);
                    y += 2;
                });
            }

            if (results.details.issues.length === 0) {
                addSection('CONGRATULATIONS!');
                addText('No issues found. Your site is well optimized.');
            }

            // Footer
            y += 10;
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text('Report generated by OthmaneSEO Audit Tool', marginLeft, y);

            doc.save(`seo-audit-${results.url.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.pdf`);
        } else {
            // Text format
            let report = `SEO AUDIT REPORT\n`;
            report += `${'='.repeat(60)}\n\n`;
            report += `URL: ${results.url}\n`;
            report += `Score: ${results.score}/100\n`;
            report += `Generated: ${timestamp}\n`;
            report += `Security: ${results.isHttps ? 'HTTPS' : 'HTTP'}\n\n`;

            report += `PERFORMANCE METRICS\n`;
            report += `${'-'.repeat(60)}\n`;
            report += `Time to First Byte: ${results.details.performance.ttfb}ms\n`;
            report += `Word Count: ${results.details.performance.wordCount}\n`;
            report += `Internal Links: ${results.details.performance.internalLinks}\n`;
            report += `External Links: ${results.details.performance.externalLinks}\n`;
            report += `Nofollow Links: ${results.details.performance.nofollowLinks}\n`;
            if (results.details.technical) {
                report += `Sitemap: ${results.details.technical.hasSitemap ? 'Found' : 'Not Found'}\n`;
                report += `Robots.txt: ${results.details.technical.hasRobotsTxt ? 'Found' : 'Not Found'}\n`;
            }
            report += `\n`;

            report += `META INFORMATION\n`;
            report += `${'-'.repeat(60)}\n`;
            report += `Title: ${results.details.meta.title || 'N/A'}\n`;
            report += `Description: ${results.details.meta.description || 'N/A'}\n`;
            report += `Viewport: ${results.details.meta.viewport ? 'Yes' : 'No'}\n\n`;

            report += `SOCIAL & SCHEMA\n`;
            report += `${'-'.repeat(60)}\n`;
            report += `Social Tags: ${results.details.social.hasSocialTags ? 'Complete' : 'Missing'}\n`;
            report += `Schema Markup: ${results.details.schema.hasSchema ? 'Yes' : 'No'}\n`;
            if (results.details.schema.hasSchema) {
                report += `Schema Types: ${results.details.schema.schemaTypes.join(', ')}\n`;
            }
            report += `\n`;

            report += `ISSUES & RECOMMENDATIONS\n`;
            report += `${'='.repeat(60)}\n\n`;

            if (criticalIssues.length > 0) {
                report += `CRITICAL ISSUES (${criticalIssues.length})\n`;
                report += `${'-'.repeat(60)}\n`;
                criticalIssues.forEach((issue, i) => {
                    report += `${i + 1}. ${issue.issue}\n`;
                    report += `   -> ${issue.advice}\n\n`;
                });
            }

            if (warnings.length > 0) {
                report += `WARNINGS (${warnings.length})\n`;
                report += `${'-'.repeat(60)}\n`;
                warnings.forEach((issue, i) => {
                    report += `${i + 1}. ${issue.issue}\n`;
                    report += `   -> ${issue.advice}\n\n`;
                });
            }

            if (goodToHave.length > 0) {
                report += `GOOD TO HAVE (${goodToHave.length})\n`;
                report += `${'-'.repeat(60)}\n`;
                goodToHave.forEach((issue, i) => {
                    report += `${i + 1}. ${issue.issue}\n`;
                    report += `   -> ${issue.advice}\n\n`;
                });
            }

            if (results.details.issues.length === 0) {
                report += `No issues found! Your site is well optimized.\n\n`;
            }

            report += `${'-'.repeat(60)}\n`;
            report += `Report generated by OthmaneSEO Audit Tool\n`;

            const blob = new Blob([report], { type: 'text/plain' });
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `seo-audit-${results.url.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
        }
    };

    const sendReport = async () => {
        if (!email || !results) return;
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        setSending(true);
        try {
            const response = await fetch(SEND_REPORT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, results }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send email");
            }

            setEmailSent(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSending(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-500 border-green-500";
        if (score >= 70) return "text-yellow-500 border-yellow-500";
        return "text-red-500 border-red-500";
    };

    const getCategoryIcon = (category: IssueCategory) => {
        switch (category) {
            case "critical": return "🔴";
            case "warning": return "⚠️";
            case "good-to-have": return "💡";
        }
    };

    const getCategoryColor = (category: IssueCategory) => {
        switch (category) {
            case "critical": return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
            case "warning": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
            case "good-to-have": return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Professional SEO Audit</DialogTitle>
                    <DialogDescription>
                        {status === "idle" && "Enter your URL for a comprehensive technical analysis."}
                        {status === "scanning" && "Running expert-level diagnostics..."}
                        {status === "complete" && "Audit Complete. Review your health score below."}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {/* INPUT STATE */}
                    {status === "idle" && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="url">Website URL</Label>
                                <Input
                                    id="url"
                                    placeholder="example.com"
                                    value={url}
                                    onChange={(e) => handleUrlChange(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && startScan()}
                                    aria-label="Website URL to audit"
                                    aria-invalid={!!urlError}
                                    aria-describedby={urlError ? "url-error" : undefined}
                                    className={urlError ? "border-destructive" : ""}
                                />
                                {urlError && <p id="url-error" className="text-sm text-destructive">{urlError}</p>}
                                {error && <p className="text-sm text-destructive">{error}</p>}
                            </div>
                            <Button className="w-full" onClick={startScan} disabled={!url || !!urlError}>
                                Run Analysis
                            </Button>
                        </div>
                    )}

                    {/* SCANNING STATE */}
                    {status === "scanning" && (
                        <div className="space-y-6">
                            <Progress value={progress} className="h-2" />
                            <div className="space-y-3">
                                {steps.map((step) => (
                                    <div key={step.id} className="flex items-center gap-3 text-sm">
                                        {step.status === "pending" && <div className="h-4 w-4 rounded-full border-2 border-muted" />}
                                        {step.status === "scanning" && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                                        {step.status === "complete" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                        <span className={cn(
                                            step.status === "scanning" ? "text-foreground font-medium" : "text-muted-foreground"
                                        )}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RESULTS STATE */}
                    {status === "complete" && results && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            {/* SCORE GAUGE */}
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className={cn(
                                    "relative w-40 h-40 rounded-full border-8 flex items-center justify-center bg-background shadow-xl",
                                    getScoreColor(results.score)
                                )}>
                                    <div className="flex flex-col items-center">
                                        <span className="text-5xl font-bold">{results.score}</span>
                                        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Score</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => downloadReport('pdf')}
                                    >
                                        <FileText className="w-4 h-4" />
                                        PDF Report
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => downloadReport('txt')}
                                    >
                                        <Download className="w-4 h-4" />
                                        Text
                                    </Button>
                                </div>
                            </div>

                            {/* GOOGLE SEARCH PREVIEW */}
                            <GoogleSearchPreview
                                title={results.details.meta.title}
                                description={results.details.meta.description}
                                url={results.url}
                            />

                            {/* KEY METRICS GRID */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl border bg-muted/40 space-y-2">
                                    <Zap className="w-5 h-5 text-blue-500" />
                                    <div className="text-2xl font-bold">{results.details.performance.ttfb}ms</div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase">Load Time</div>
                                </div>
                                <div className="p-4 rounded-xl border bg-muted/40 space-y-2">
                                    <ShieldCheck className={cn("w-5 h-5", results.details.meta.viewport ? "text-green-500" : "text-red-500")} />
                                    <div className="text-2xl font-bold">{results.details.meta.viewport ? "Yes" : "No"}</div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase">Mobile Ready</div>
                                </div>
                                <div className="p-4 rounded-xl border bg-muted/40 space-y-2">
                                    <Share2 className={cn("w-5 h-5", results.details.social.hasSocialTags ? "text-green-500" : "text-red-500")} />
                                    <div className="text-2xl font-bold">{results.details.social.hasSocialTags ? "✓" : "✗"}</div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase">Social Ready</div>
                                </div>
                                <div className="p-4 rounded-xl border bg-muted/40 space-y-2">
                                    <Database className={cn("w-5 h-5", results.details.schema.hasSchema ? "text-green-500" : "text-orange-500")} />
                                    <div className="text-2xl font-bold">{results.details.schema.hasSchema ? "Yes" : "No"}</div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase">Schema</div>
                                </div>
                            </div>

                            {/* ADDITIONAL METRICS */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                                    <Layout className="w-4 h-4 text-purple-500" />
                                    <div className="text-lg font-bold">{results.details.performance.wordCount}</div>
                                    <div className="text-xs text-muted-foreground">Words</div>
                                </div>
                                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                                    <LinkIcon className="w-4 h-4 text-cyan-500" />
                                    <div className="text-lg font-bold">{results.details.performance.internalLinks}</div>
                                    <div className="text-xs text-muted-foreground">Internal Links</div>
                                </div>
                                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                                    <ImageIcon className="w-4 h-4 text-orange-500" />
                                    <div className="text-lg font-bold">{results.details.images.missingAlt}</div>
                                    <div className="text-xs text-muted-foreground">Missing Alt</div>
                                </div>
                            </div>

                            {/* TECHNICAL SEO INDICATORS */}
                            {results.details.technical && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                                        <FileSearch className={cn("w-4 h-4", results.details.technical.hasSitemap ? "text-green-500" : "text-orange-500")} />
                                        <div className="text-lg font-bold">{results.details.technical.hasSitemap ? "Found" : "Missing"}</div>
                                        <div className="text-xs text-muted-foreground">Sitemap.xml</div>
                                    </div>
                                    <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                                        <FileText className={cn("w-4 h-4", results.details.technical.hasRobotsTxt ? "text-green-500" : "text-orange-500")} />
                                        <div className="text-lg font-bold">{results.details.technical.hasRobotsTxt ? "Found" : "Missing"}</div>
                                        <div className="text-xs text-muted-foreground">Robots.txt</div>
                                    </div>
                                </div>
                            )}

                            {/* ISSUES LIST WITH ACTIONABLE ADVICE */}
                            <div className="space-y-3">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                    Optimization Opportunities
                                </h3>
                                {results.details.issues.length > 0 ? (
                                    <div className="space-y-3">
                                        {results.details.issues.map((issue: SeoIssue, i: number) => (
                                            <div key={i} className={cn(
                                                "p-4 rounded-lg border space-y-2",
                                                getCategoryColor(issue.category)
                                            )}>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-lg shrink-0">{getCategoryIcon(issue.category)}</span>
                                                    <div className="space-y-1 flex-1">
                                                        <div className="font-medium">{issue.issue}</div>
                                                        <div className="flex items-start gap-2 text-sm opacity-90">
                                                            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                                                            <div className="italic">{issue.advice}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-lg bg-green-500/10 text-green-600 flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="w-4 h-4" />
                                        No critical issues found!
                                    </div>
                                )}
                            </div>

                            {/* LEAD GEN */}
                            {!emailSent ? (
                                <div className="p-6 rounded-xl border-dashed border-2 bg-muted/30 space-y-4">
                                    <div className="text-center space-y-1">
                                        <h4 className="font-bold">Unlock Full Expert Report</h4>
                                        <p className="text-sm text-muted-foreground">Get the detailed analysis with actionable advice sent to your inbox.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => handleEmailChange(e.target.value)}
                                                aria-label="Email address for report"
                                                aria-invalid={!!emailError}
                                                aria-describedby={emailError ? "email-error" : undefined}
                                                className={emailError ? "border-destructive" : ""}
                                            />
                                            <Button onClick={sendReport} disabled={!email || !!emailError || sending}>
                                                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Report"}
                                            </Button>
                                        </div>
                                        {emailError && <p id="email-error" className="text-sm text-destructive">{emailError}</p>}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 rounded-lg bg-green-500/10 text-green-600 text-center font-medium animate-in zoom-in">
                                    Report sent to {email}!
                                </div>
                            )}

                            <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" onClick={onClose}>
                                Close Analysis
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
