"use client";

import { useRef, useState, useEffect, memo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTerminal } from "@/components/providers/terminal-context";
import { useInView } from "framer-motion";

interface ChartDataPoint {
    year: string;
    [key: string]: string | number | undefined;
    milestone?: string;
}

interface GrowthChartProps {
    data: ChartDataPoint[];
    dataKey: string;
    color?: string;
    formatType?: "currency" | "number" | "percentage";
    formatter?: (value: number) => string;
    chartId: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; payload: ChartDataPoint }>;
    label?: string;
    formatter?: (value: number) => string;
    formatType?: "currency" | "number" | "percentage";
}

const CustomTooltip = memo(function CustomTooltip({ active, payload, label, formatter, formatType }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const rawValue = payload[0].value;
        let displayValue: string;

        if (formatter) {
            displayValue = formatter(rawValue);
        } else if (formatType === "currency") {
            displayValue = `$${(rawValue / 1000000).toFixed(1)}M`;
        } else if (formatType === "number") {
            displayValue = `${(rawValue / 1000).toFixed(1)}k`;
            if (displayValue.endsWith(".0k")) displayValue = displayValue.replace(".0k", "k");
        } else {
            displayValue = rawValue.toString();
        }

        return (
            <div className="bg-background border border-border p-4 rounded-lg shadow-lg">
                <p className="font-bold text-foreground">{label}</p>
                <p className="text-primary">
                    {displayValue}
                </p>
                {payload[0].payload.milestone && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {payload[0].payload.milestone}
                    </p>
                )}
            </div>
        );
    }
    return null;
});

export function GrowthChart({ data, dataKey, color = "#3b82f6", formatter, formatType, chartId }: GrowthChartProps) {
    const { isTerminalMode } = useTerminal();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isInView) {
            setShouldRender(true);
        }
    }, [isInView]);

    const chartColor = isTerminalMode ? "#00ff00" : color;
    const gradientId = `color${chartId}`;

    const formatValue = (val: number) => {
        if (formatter) return formatter(val);
        if (formatType === "currency") return `$${(val / 1000000).toFixed(1)}M`;
        if (formatType === "number") {
            let v = `${(val / 1000).toFixed(1)}k`;
            if (v.endsWith(".0k")) v = v.replace(".0k", "k");
            return v;
        }
        return val.toString();
    };

    return (
        <div ref={ref} className="w-full h-[200px] mt-4">
            {shouldRender && (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="year"
                            stroke={isTerminalMode ? "#00ff00" : "#888888"}
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke={isTerminalMode ? "#00ff00" : "#888888"}
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => formatValue(val).split(' ')[0]}
                            width={40}
                        />
                        <Tooltip content={<CustomTooltip formatter={formatter} formatType={formatType} />} />
                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke={chartColor}
                            fillOpacity={1}
                            fill={`url(#${gradientId})`}
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
