"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { motion } from "framer-motion";

export function Hero() {
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
        <section id="overview" className="w-full bg-white py-24 relative overflow-hidden">
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
                </div>
            </div>
        </section>
    );
}
