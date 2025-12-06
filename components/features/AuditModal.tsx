"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Layout, Image as ImageIcon, Share2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function AuditModal({ isOpen, onClose }: AuditModalProps) {
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "scanning" | "complete">("idle");
    const [progress, setProgress] = useState(0);
    const [steps, setSteps] = useState<ScanStep[]>(INITIAL_STEPS);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const startScan = async () => {
        if (!url) return;
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
            const response = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

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
        } catch (err: any) {
            setError(err.message);
            setStatus("idle");
        }
    };

    const sendReport = async () => {
        if (!email || !results) return;
        setSending(true);
        try {
            const response = await fetch("/api/send-report", {
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

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
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
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && startScan()}
                                />
                                {error && <p className="text-sm text-destructive">{error}</p>}
                            </div>
                            <Button className="w-full" onClick={startScan} disabled={!url}>
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
                        <div className="space-y-8 animate-in fade-in duration-500">
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
                            </div>

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
                                    <Layout className="w-5 h-5 text-purple-500" />
                                    <div className="text-2xl font-bold">{results.details.performance.wordCount}</div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase">Words</div>
                                </div>
                                <div className="p-4 rounded-xl border bg-muted/40 space-y-2">
                                    <ImageIcon className="w-5 h-5 text-orange-500" />
                                    <div className="text-2xl font-bold">{results.details.images.missingAlt}</div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase">Missing Alt</div>
                                </div>
                            </div>

                            {/* ISSUES LIST */}
                            <div className="space-y-3">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                    Optimization Opportunities
                                </h3>
                                {results.details.issues.length > 0 ? (
                                    <div className="space-y-2">
                                        {results.details.issues.map((issue: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-sm">
                                                <div className="h-2 w-2 rounded-full bg-yellow-500 shrink-0" />
                                                {issue}
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
                                        <p className="text-sm text-muted-foreground">Get the detailed 15-point analysis sent to your inbox.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Button onClick={sendReport} disabled={!email || sending}>
                                            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Report"}
                                        </Button>
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
