"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { motion } from "framer-motion";
import { OrbitSpace } from "@/components/ui/orbit-space";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { HyperText } from "@/components/ui/hyper-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagneticButton } from "@/components/ui/magnetic-button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
export function Hero({ dict, lang }: { dict?: any, lang?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const safeDict = dict || {
        title: "Technical SEO Consultant & AI Automation Specialist Driving $1.3M+ in Organic Revenue",
        subtitle: "Othmane Outaghza is a Technical SEO Consultant and AI Automation Specialist based in Morocco.",
        cta: "Download Resume"
    };

    return (
        <section
            ref={containerRef}
            id="overview"
            className="w-full max-w-full bg-transparent pt-28 sm:pt-24 relative overflow-hidden min-h-[72vh] md:min-h-screen flex flex-col justify-center"
        >
            <OrbitSpace density={isMobile ? "low" : "high"} />
            <div className="responsive-container relative z-10">
                <div className="mx-auto max-w-4xl space-y-8">
                    <h1 className={cn(
                        "text-[clamp(2rem,7vw,3.75rem)] font-bold leading-[1.08] break-words",
                        "text-foreground"
                    )}>
                        {safeDict.title}
                    </h1>

                    <BlurFade delay={0.25} inView>
                        <p className={cn(
                            "pt-4 text-[clamp(1rem,4vw,1.5rem)] font-bold leading-snug animate-text-shimmer",
                            "text-muted-foreground"
                        )}>
                            {safeDict.subtitle}
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.5} inView>
                        <div className="pt-4">
                            <MagneticButton
                                href="/icons/CV othmane outaghza seo geo aio (1).pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "w-full sm:w-auto shadow-sm transition-colors",
                                    "bg-black text-white hover:bg-black/90 border-transparent"
                                )}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Download className="h-4 w-4" />
                                    {safeDict.cta}
                                </div>
                            </MagneticButton>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </section >
    );
}
