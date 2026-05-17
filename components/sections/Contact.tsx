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

export function Contact() {
    const [isAuditOpen, setIsAuditOpen] = useState(false);

    return (
        <section id="contact" className="w-full py-16 bg-transparent">
            <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Book a Free SEO Audit</h2>
            <Card className={cn(
                "relative overflow-hidden border transition-all duration-500 rounded-[2.5rem]",
                "bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/5"
            )}>
                {/* Background Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <OrbitSpace density="low" />
                </div>
                <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className={cn("text-2xl font-bold", "text-gray-900")}>Ready to scale your organic revenue?</h3>
                        <p className={cn("text-gray-600")}>
                            Let's audit your current setup and identify automation opportunities.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">

                        <MagneticButton
                            onClick={() => setIsAuditOpen(true)}
                            className={cn(
                                "shadow-lg transition-colors cursor-pointer",
                                "bg-black text-white hover:bg-black/90 border-transparent"
                            )}
                        >
                            <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium">
                                Book a Free SEO & AI Search Audit
                                <ArrowRight className="h-3 w-3" />
                            </div>
                        </MagneticButton>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
