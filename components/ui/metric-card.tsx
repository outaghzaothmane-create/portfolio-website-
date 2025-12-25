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
    icon?: React.ReactNode;
}

export function MetricCard({
    title,
    value,
    trend,
    trendValue,
    subtext,
    prefix = "",
    suffix = "",
    icon,
}: MetricCardProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    // Extract prefix (like $) and suffix (like M, %, K) from the value string
    const valueStr = value.toString();
    const extractedPrefix = prefix || (valueStr.startsWith("$") ? "$" : "");
    const extractedSuffix = suffix || (valueStr.match(/[MKB%+]$/)?.[0] || "");

    // Parse number from value if it's a string like "$1.3M" -> 1.3
    const numericValue = typeof value === "number"
        ? value
        : parseFloat(valueStr.replace(/[^0-9.-]/g, ""));

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
                let formatted = latest.toFixed(valueStr.includes(".") ? 1 : 0);
                if (valueStr.includes(",")) {
                    formatted = Number(formatted).toLocaleString();
                }
                ref.current.textContent = `${extractedPrefix}${formatted}${extractedSuffix}`;
            }
        });
    }, [springValue, extractedPrefix, extractedSuffix, valueStr]);

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3 md:px-6 md:pt-6">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-2 leading-tight">
                    {icon}
                    <span className="line-clamp-2">{title}</span>
                </CardTitle>
                {trend && (
                    <div
                        className={cn(
                            "flex items-center text-xs font-medium shrink-0",
                            trend === "up" ? "text-green-600" : "text-red-600"
                        )}
                    >
                        {trend === "up" ? (
                            <ArrowUpRight className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                        ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                        )}
                        <span className="hidden md:inline">{trendValue}</span>
                    </div>
                )}
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <div className="text-xl md:text-2xl font-bold text-foreground">
                    {/* If value is not numeric (e.g. complex string), just show it. Otherwise animate. */}
                    {isNaN(numericValue) ? (
                        <span>{value}</span>
                    ) : (
                        <span ref={ref} />
                    )}
                </div>
                {subtext && (
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1 line-clamp-2">{subtext}</p>
                )}
            </CardContent>
        </Card>
    );
}
