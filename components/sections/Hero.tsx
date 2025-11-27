"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { motion } from "framer-motion";
import { OrbitSpace } from "@/components/ui/orbit-space";
import { Download } from "lucide-react";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";

export function Hero() {
    const { isTerminalMode } = useTerminal();
    const words = "Driving $1.3M+ in Organic Revenue through Data & Automation.".split(" ");

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section
            id="overview"
            className="w-full bg-white py-24 relative overflow-hidden"
        >
            <OrbitSpace density="high" />
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="space-y-4 max-w-4xl">
                    <motion.h1
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl flex flex-wrap gap-x-3 gap-y-1"
                    >
                        {words.map((word, i) => (
                            <motion.span key={i} variants={item}>
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="text-xl text-muted-foreground sm:text-2xl pt-4"
                    >
                        Othmane Outaghza - Senior SEO & Automation Manager.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="pt-4"
                    >
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                                "h-10 rounded-full px-8", // size="lg"
                                "border shadow-sm", // variant="outline" base
                                isTerminalMode
                                    ? "border-green-800 hover:bg-green-900/20 text-green-500 bg-black/90"
                                    : "border-gray-300 hover:bg-gray-100 text-gray-700 bg-background"
                            )}
                        >
                            <Download className="h-4 w-4" />
                            {isTerminalMode ? "export_resume.json" : "Download CV"}
                        </a>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
