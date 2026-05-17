"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

export function KeyMetrics({ dict }: { dict?: any }) {
    const safeDict = dict || {
        revenue: {
            title: "Total Revenue Generated",
            trendValue: "Trending",
            subtext: "Organic Growth Impact"
        },
        growth: {
            title: "Organic Growth",
            trendValue: "Year over Year",
            subtext: "Consistent Scaling"
        },
        keywords: {
            title: "Top 3 Keywords",
            trendValue: "Up from 3",
            subtext: "High Intent Rankings"
        },
        clicks: {
            title: "Clicks/Month",
            trendValue: "Up from 700",
            subtext: "Qualified Traffic"
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

    return (
        <section className={cn(
            "w-full py-10 sm:py-12 md:py-16 border-y transition-colors duration-500 bg-transparent",
            "border-slate-200"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4"
                    >
                        <motion.div variants={item}>
                            <MetricCard
                                title={safeDict.revenue.title}
                                value={1.3}
                                prefix="$"
                                suffix="M+"
                                trend="up"
                                trendValue={safeDict.revenue.trendValue}
                                subtext={safeDict.revenue.subtext}
                            />
                        </motion.div>
                        <motion.div variants={item}>
                            <MetricCard
                                title={safeDict.growth.title}
                                value={7000}
                                suffix="%"
                                trend="up"
                                trendValue={safeDict.growth.trendValue}
                                subtext={safeDict.growth.subtext}
                            />
                        </motion.div>
                        <motion.div variants={item}>
                            <MetricCard
                                title={safeDict.keywords.title}
                                value={88}
                                trend="up"
                                trendValue={safeDict.keywords.trendValue}
                                subtext={safeDict.keywords.subtext}
                            />
                        </motion.div>
                        <motion.div variants={item}>
                            <MetricCard
                                title={safeDict.clicks.title}
                                value={5000}
                                suffix="+"
                                trend="up"
                                trendValue={safeDict.clicks.trendValue}
                                subtext={safeDict.clicks.subtext}
                            />
                        </motion.div>
                    </motion.div>
                </SectionWrapper>
            </div>
        </section>
    );
}
