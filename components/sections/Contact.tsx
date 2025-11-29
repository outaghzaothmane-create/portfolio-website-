"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { OrbitSpace } from "@/components/ui/orbit-space";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Contact() {
    const { isTerminalMode } = useTerminal();

    return (
        <section id="contact" className="w-full py-16 bg-transparent">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Start a new property</h2>
            <Card className={cn(
                "relative overflow-hidden border transition-all duration-500 rounded-[2.5rem]",
                isTerminalMode
                    ? "bg-black/70 backdrop-blur-xl border-green-900/50 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                    : "bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/5"
            )}>
                {/* Background Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <OrbitSpace density="low" />
                </div>
                <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className={cn("text-2xl font-bold", isTerminalMode ? "text-foreground" : "text-gray-900")}>Ready to scale your organic revenue?</h3>
                        <p className={cn(isTerminalMode ? "text-primary-foreground/90" : "text-gray-600")}>
                            Let's audit your current setup and identify automation opportunities.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">

                        <MagneticButton
                            href="https://calendly.com/outaghza-othmane/seo-meeting"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "shadow-lg transition-colors",
                                isTerminalMode
                                    ? "bg-green-900/20 text-green-500 border-green-500 hover:bg-green-500 hover:text-black transition-all"
                                    : "bg-black text-white hover:bg-black/90 border-transparent"
                            )}
                        >
                            <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium">
                                Get Free Audit
                                <ArrowRight className="h-3 w-3" />
                            </div>
                        </MagneticButton>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
