"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { OrbitSpace } from "@/components/ui/orbit-space";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AuditModal } from "@/components/features/AuditModal";
import { useState } from "react";

export function Contact({ dict, auditModalDict }: { dict?: any, auditModalDict?: any }) {
    const [isAuditOpen, setIsAuditOpen] = useState(false);

    const safeDict = dict || {
        title: "Book a Free SEO Audit",
        headline: "Ready to scale your organic revenue?",
        description: "Let's audit your current setup and identify automation opportunities.",
        buttonText: "Book a Free SEO & AI Search Audit"
    };

    return (
        <section id="contact" className="w-full py-16 bg-transparent">
            <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} dict={auditModalDict} />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">{safeDict.title}</h2>
            <Card className={cn(
                "relative overflow-hidden border transition-all duration-500 rounded-2xl sm:rounded-[2.5rem]",
                "bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/5"
            )}>
                {/* Background Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <OrbitSpace density="low" />
                </div>
                <CardContent className="p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 text-center md:text-left min-w-0">
                        <h3 className={cn("text-xl sm:text-2xl font-bold leading-tight", "text-gray-900")}>{safeDict.headline}</h3>
                        <p className={cn("text-sm sm:text-base text-gray-600")}>
                            {safeDict.description}
                        </p>
                    </div>
                    <div className="flex w-full flex-col sm:w-auto sm:flex-row gap-4">

                        <MagneticButton
                            onClick={() => setIsAuditOpen(true)}
                            className={cn(
                                "w-full shadow-lg transition-colors cursor-pointer sm:w-auto",
                                "bg-black text-white hover:bg-black/90 border-transparent"
                            )}
                        >
                            <div className="flex min-w-0 items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-medium">
                                <span className="min-w-0 break-words">{safeDict.buttonText}</span>
                                <ArrowRight className="h-3 w-3 shrink-0" />
                            </div>
                        </MagneticButton>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
