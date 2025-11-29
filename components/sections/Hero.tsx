"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { motion } from "framer-motion";
import { OrbitSpace } from "@/components/ui/orbit-space";
import { Download } from "lucide-react";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";
import { HyperText } from "@/components/ui/hyper-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagneticButton } from "@/components/ui/magnetic-button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
export function Hero() {
    const { isTerminalMode } = useTerminal();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section
            ref={containerRef}
            id="overview"
            className="w-full bg-transparent pt-24 relative overflow-hidden min-h-[80vh] md:min-h-screen flex flex-col justify-center"
        >
            <OrbitSpace density={isMobile ? "low" : "high"} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="space-y-8 max-w-4xl">
                    <div className="flex flex-col gap-2">
                        <HyperText
                            text="Driving $1.3M+ in Organic"
                            className={cn(
                                "text-5xl font-bold tracking-tighter sm:text-7xl",
                                isTerminalMode ? "text-green-500" : "text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60"
                            )}
                        />
                        <HyperText
                            text="Revenue through Data & Automation."
                            className={cn(
                                "text-5xl font-bold tracking-tighter sm:text-7xl",
                                isTerminalMode ? "text-green-500" : "text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60"
                            )}
                        />
                    </div>

                    <BlurFade delay={0.25} inView>
                        <p className={cn(
                            "text-xl sm:text-2xl pt-4 font-light tracking-tight",
                            isTerminalMode ? "text-green-600" : "text-muted-foreground"
                        )}>
                            Othmane Outaghza - Senior SEO & Automation Manager.
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.5} inView>
                        <div className="pt-4">
                            <MagneticButton className={cn(
                                "shadow-sm transition-colors",
                                isTerminalMode
                                    ? "bg-green-900/20 text-green-500 border-green-500 hover:bg-green-500 hover:text-black transition-all"
                                    : "bg-black text-white hover:bg-black/90 border-transparent"
                            )}>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    {isTerminalMode ? "export_resume.json" : "Download CV"}
                                </a>
                            </MagneticButton>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </section >
    );
}
