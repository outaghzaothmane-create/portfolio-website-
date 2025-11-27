"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { motion } from "framer-motion";

export function Hero() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="overview" className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Driving $1.3M+ in Organic Revenue through Data & Automation.
                </h1>
                <p className="text-lg text-muted-foreground">
                    Othmane Outaghza - Senior SEO & Automation Manager.
                </p>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
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
        </section>
    );
}
