"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
    { id: "dns", label: "Checking DNS Configuration...", status: "pending" },
    { id: "ssl", label: "Verifying SSL Certificate...", status: "pending" },
    { id: "cwv", label: "Analyzing Core Web Vitals...", status: "pending" },
    { id: "seo", label: "Crawling On-Page SEO...", status: "pending" },
    { id: "backlinks", label: "Evaluating Backlink Profile...", status: "pending" },
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

    const sendReport = async () => {
        if (!email || !results) return;
        setSending(true);
        try {
            const response = await fetch("/api/send-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, results }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to send email");
            }

            setEmailSent(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSending(false);
        }
    };

    const startScan = async () => {
        if (!url) return;
        setStatus("scanning");
        setProgress(0);
        setSteps(INITIAL_STEPS);
        setError("");
        setResults(null);

        // Simulate initial steps for visual feedback
        for (let i = 0; i < 2; i++) {
            setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "scanning" } : s));
            await new Promise(resolve => setTimeout(resolve, 600));
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

            // Complete remaining steps visually
            for (let i = 2; i < INITIAL_STEPS.length; i++) {
                setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "complete" } : s));
                setProgress(((i + 1) / INITIAL_STEPS.length) * 100);
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            setStatus("complete");
        } catch (err: any) {
            setError(err.message);
            setStatus("idle");
        }
    };

    const handleReset = () => {
        setStatus("idle");
        setUrl("");
        setEmail("");
        setProgress(0);
        setSteps(INITIAL_STEPS);
        setResults(null);
        setError("");
        setSending(false);
        setEmailSent(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Live Site Audit</DialogTitle>
                    <DialogDescription>
                        {status === "idle" && "Enter your website URL to start a preliminary technical analysis."}
                        {status === "scanning" && `Scanning ${url}...`}
                        {status === "complete" && "Scan Complete. Here are your results."}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {status === "idle" && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="url">Website URL</Label>
                                <Input
                                    id="url"
                                    placeholder="example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                                {error && <p className="text-sm text-destructive">{error}</p>}
                            </div>
                            <Button className="w-full" onClick={startScan} disabled={!url}>
                                Start Scan
                            </Button>
                        </div>
                    )}

                    {status === "scanning" && (
                        <div className="space-y-6">
                            <Progress value={progress} className="h-2" />
                            <div className="space-y-2">
                                {steps.map((step) => (
                                    <div key={step.id} className="flex items-center gap-3 text-sm">
                                        {step.status === "pending" && <div className="h-4 w-4 rounded-full border-2 border-muted" />}
                                        {step.status === "scanning" && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                                        {step.status === "complete" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                        <span className={cn(
                                            step.status === "pending" && "text-muted-foreground",
                                            step.status === "scanning" && "text-foreground font-medium",
                                            step.status === "complete" && "text-muted-foreground line-through"
                                        )}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {status === "complete" && results && !emailSent && (
                        <div className="space-y-4">
                            <div className="rounded-lg border bg-muted/50 p-6 text-center space-y-4">
                                <div className="flex justify-center">
                                    <AlertCircle className="h-12 w-12 text-yellow-500" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">Analysis Complete</h3>
                                    <p className="text-muted-foreground">
                                        We've analyzed your site's performance, security, and SEO.
                                        Enter your email to unlock the full breakdown.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <Button className="w-full" size="lg" onClick={sendReport} disabled={!email || sending}>
                                    {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    Unlock Full Report
                                </Button>
                                {error && <p className="text-sm text-destructive text-center">{error}</p>}
                            </div>
                        </div>
                    )}

                    {status === "complete" && results && emailSent && (
                        <div className="space-y-6">
                            <div className="p-3 rounded-md bg-green-50 text-green-700 text-sm text-center font-medium">
                                Report unlocked and sent to {email}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg border bg-muted/50 text-center">
                                    <div className="text-2xl font-bold text-primary">{results.ttfb}ms</div>
                                    <div className="text-xs text-muted-foreground">Response Time</div>
                                </div>
                                <div className="p-4 rounded-lg border bg-muted/50 text-center">
                                    <div className={cn("text-2xl font-bold", results.isHttps ? "text-green-500" : "text-red-500")}>
                                        {results.isHttps ? "Secure" : "Insecure"}
                                    </div>
                                    <div className="text-xs text-muted-foreground">SSL Status</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Title Tag</Label>
                                        <span className={cn("text-xs font-medium px-2 py-0.5 rounded",
                                            results.title.status === "good" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                        )}>
                                            {results.title.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-md border bg-muted/30 text-sm font-mono break-all">
                                        {results.title.value || "Missing"}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Meta Description</Label>
                                        <span className={cn("text-xs font-medium px-2 py-0.5 rounded",
                                            results.description.status === "good" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                        )}>
                                            {results.description.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-md border bg-muted/30 text-sm font-mono break-all">
                                        {results.description.value || "Missing"}
                                    </div>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full" onClick={onClose}>
                                Close
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
