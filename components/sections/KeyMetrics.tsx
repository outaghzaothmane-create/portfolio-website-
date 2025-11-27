"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function KeyMetrics() {
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
        <section className="w-full bg-gray-50/80 border-y border-gray-100 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                    >
                        <motion.div variants={item}>
                            <MetricCard
                                title="Total Revenue Generated"
                                value={1.3}
                                prefix="$"
                                suffix="M+"
                                trend="up"
                                trendValue="Trending"
                                subtext="Organic Growth Impact"
                            />
                        </motion.div>
                        <motion.div variants={item}>
                            <MetricCard
                                title="Organic Growth"
                                value={7000}
                                suffix="%"
                                trend="up"
                                trendValue="Year over Year"
                                subtext="Consistent Scaling"
                            />
                        </motion.div>
                        <motion.div variants={item}>
                            <MetricCard
                                title="Top 3 Keywords"
                                value={54}
                                trend="up"
                                trendValue="Up from 6"
                                subtext="High Intent Rankings"
                            />
                        </motion.div>
                        <motion.div variants={item}>
                            <MetricCard
                                title="Clicks/Month"
                                value={5000}
                                suffix="+"
                                trend="up"
                                trendValue="Up from 700"
                                subtext="Qualified Traffic"
                            />
                        </motion.div>
                    </motion.div>
                </SectionWrapper>
            </div>
        </section>
    );
}
