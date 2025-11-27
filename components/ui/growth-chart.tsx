import { useRef, useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTerminal } from "@/components/providers/terminal-context";
import { useInView } from "framer-motion";

interface GrowthChartProps {
    data: any[];
    dataKey: string;
    color?: string;
    formatter?: (value: number) => string;
    chartId: string;
}

const CustomTooltip = ({ active, payload, label, formatter }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border border-border p-4 rounded-lg shadow-lg">
                <p className="font-bold text-foreground">{label}</p>
                <p className="text-primary">
                    {formatter ? formatter(payload[0].value) : payload[0].value}
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
};

export function GrowthChart({ data, dataKey, color = "#3b82f6", formatter, chartId }: GrowthChartProps) {
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
                            tickFormatter={formatter ? (val) => formatter(val).split(' ')[0] : undefined}
                            width={40}
                        />
                        <Tooltip content={<CustomTooltip formatter={formatter} />} />
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
