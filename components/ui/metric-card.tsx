"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: "up" | "down";
    trendValue?: string;
    subtext?: string;
    prefix?: string;
    suffix?: string;
}

export function MetricCard({
    title,
    value,
    trend,
    trendValue,
    subtext,
    prefix = "",
    suffix = "",
}: MetricCardProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    // Parse number from value if it's a string like "1.3M" -> 1.3
    const numericValue = typeof value === "number"
        ? value
        : parseFloat(value.toString().replace(/[^0-9.]/g, ""));

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });

    useEffect(() => {
        if (inView) {
            motionValue.set(numericValue);
        }
    }, [inView, numericValue, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                // Format based on original value type/content
                let formatted = latest.toFixed(typeof value === "string" && value.includes(".") ? 1 : 0);
                if (typeof value === "string" && value.includes(",")) {
                    formatted = Number(formatted).toLocaleString();
                }
                ref.current.textContent = `${prefix}${formatted}${suffix}`;
            }
        });
    }, [springValue, prefix, suffix, value]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {trend && (
                    <div
                        className={cn(
                            "flex items-center text-xs font-medium",
                            trend === "up" ? "text-green-600" : "text-red-600"
                        )}
                    >
                        {trend === "up" ? (
                            <ArrowUpRight className="mr-1 h-4 w-4" />
                        ) : (
                            <ArrowDownRight className="mr-1 h-4 w-4" />
                        )}
                        {trendValue}
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">
                    {/* If value is not numeric (e.g. complex string), just show it. Otherwise animate. */}
                    {isNaN(numericValue) ? (
                        <span>{value}</span>
                    ) : (
                        <span ref={ref} />
                    )}
                </div>
                {subtext && (
                    <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
                )}
            </CardContent>
        </Card>
    );
}
