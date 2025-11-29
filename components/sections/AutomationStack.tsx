"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Database, FileSpreadsheet, Code2, Workflow, Bell, Terminal } from "lucide-react";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

// --- Data ---
const linearTools = [
    {
        id: "source",
        name: "Ahrefs API",
        role: "Source",
        icon: Database,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        delay: 0
    },
    {
        id: "processor",
        name: "Python Scripts",
        role: "Processor",
        icon: Code2,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        delay: 1.5
    },
    {
        id: "orchestrator",
        name: "Make.com",
        role: "Orchestrator",
        icon: Workflow,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        delay: 3
    },
];

const outputTools = [
    {
        id: "output-a",
        name: "Google Sheets",
        role: "Data Storage",
        icon: FileSpreadsheet,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        delay: 4.5
    },
    {
        id: "output-b",
        name: "Slack Alerts",
        role: "Alerts & Reporting",
        icon: Bell,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20",
        delay: 4.5
    },
];

const logs = [
    "> Initializing Python script...",
    "> Fetching Ahrefs keywords via API...",
    "> Data processed by Make.com...",
    "> [SUCCESS] Data stored in Google Sheets.",
    "> [SUCCESS] Alert sent to Slack."
];

// --- Components ---

const Connection = ({ isVertical = false }: { isVertical?: boolean }) => {
    const { isTerminalMode } = useTerminal();

    return (
        <div className={cn(
            "relative flex items-center justify-center",
            isVertical ? "h-8 w-full" : "w-8 h-full" // Reduced from w-12/h-12 to w-8/h-8
        )}>
            <div className={cn(
                "absolute",
                isVertical ? "h-full w-[2px]" : "w-full h-[2px]",
                isTerminalMode ? "bg-green-900/30" : "bg-border"
            )} />
            <motion.div
                className={cn(
                    "absolute rounded-full z-10",
                    isTerminalMode ? "bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]" : "bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                )}
                style={{ width: 6, height: 6 }}
                animate={isVertical ? { top: ["0%", "100%"] } : { left: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

const ForkConnection = () => {
    const { isTerminalMode } = useTerminal();
    return (
        <div className="relative w-12 h-48 flex items-center"> {/* Reduced width w-16 -> w-12, height h-64 -> h-48 */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 48 192" preserveAspectRatio="none"> {/* Updated viewBox */}
                {/* Top Branch - Goes from center (96) to top (48) */}
                <path d="M 0 96 C 20 96, 20 48, 48 48" fill="none" stroke="currentColor" strokeWidth="2" className={isTerminalMode ? "text-green-900/30" : "text-border"} strokeLinecap="round" />
                {/* Bottom Branch - Goes from center (96) to bottom (144) */}
                <path d="M 0 96 C 20 96, 20 144, 48 144" fill="none" stroke="currentColor" strokeWidth="2" className={isTerminalMode ? "text-green-900/30" : "text-border"} strokeLinecap="round" />

                {/* Particles */}
                <motion.circle r="3" fill={isTerminalMode ? "#22c55e" : "#3b82f6"}>
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 96 C 20 96, 20 48, 48 48" />
                </motion.circle>
                <motion.circle r="3" fill={isTerminalMode ? "#22c55e" : "#3b82f6"}>
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 96 C 20 96, 20 144, 48 144" />
                </motion.circle>
            </svg>
        </div>
    );
};

const NodeCard = ({ tool, isActive }: { tool: any, isActive: boolean }) => {
    const { isTerminalMode } = useTerminal();

    return (
        <motion.div
            className="relative group z-20 cursor-grab active:cursor-grabbing"
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Ports */}
            <div className="absolute top-1/2 -left-1.5 w-2.5 h-2.5 rounded-full border-2 border-border bg-background -translate-y-1/2 z-30 hidden md:block" />
            <div className="absolute top-1/2 -right-1.5 w-2.5 h-2.5 rounded-full border-2 border-border bg-background -translate-y-1/2 z-30 hidden md:block" />

            {/* Mobile Ports */}
            <div className="absolute left-1/2 -top-1.5 w-2.5 h-2.5 rounded-full border-2 border-border bg-background -translate-x-1/2 z-30 md:hidden" />
            <div className="absolute left-1/2 -bottom-1.5 w-2.5 h-2.5 rounded-full border-2 border-border bg-background -translate-x-1/2 z-30 md:hidden" />

            <Card className={cn(
                "min-w-[120px] w-auto h-auto relative overflow-hidden transition-all duration-300",
                "border-2",
                isActive
                    ? (isTerminalMode ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]")
                    : (isTerminalMode ? "border-green-900/40" : tool.border),
                isTerminalMode ? "bg-black/60 backdrop-blur-md" : "bg-white/40 backdrop-blur-md hover:shadow-lg"
            )}>
                <div className="flex items-center p-3 gap-3">
                    <div className={cn(
                        "p-2 rounded-lg transition-colors duration-300 shrink-0",
                        isTerminalMode ? "bg-green-900/20 text-green-500" : cn(tool.bg, tool.color)
                    )}>
                        <tool.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <h3 className={cn("font-semibold text-sm leading-none mb-1", isTerminalMode && "text-green-400")}>{tool.name}</h3>
                        <p className={cn("text-[10px] font-mono uppercase tracking-wider leading-none", isTerminalMode ? "text-green-600" : "text-muted-foreground")}>{tool.role}</p>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

const Console = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);

    useEffect(() => {
        if (currentLineIndex >= logs.length) {
            const timeout = setTimeout(() => {
                setLines([]);
                setCurrentLineIndex(0);
            }, 3000); // Wait before clearing
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setLines(prev => [...prev, logs[currentLineIndex]]);
            setCurrentLineIndex(prev => prev + 1);
        }, 1000); // Delay between lines

        return () => clearTimeout(timeout);
    }, [currentLineIndex]);

    return (
        <div className="w-full bg-black rounded-lg border border-green-900/50 p-4 font-mono text-[10px] h-full min-h-[200px] overflow-hidden flex flex-col shadow-inner">
            <div className="flex items-center gap-2 mb-2 border-b border-green-900/30 pb-2 shrink-0">
                <Terminal className="w-3 h-3 text-green-500" />
                <span className="text-green-700">LIVE LOGS</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-green-900/50 scrollbar-track-transparent">
                <AnimatePresence>
                    {lines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-400 break-words"
                        >
                            {line}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-green-500 inline-block align-middle ml-1"
                />
            </div>
        </div>
    );
};

export function AutomationStack() {
    const { isTerminalMode } = useTerminal();
    const [activeStep, setActiveStep] = useState(0);

    // Cycle through active steps for animation sync
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 5);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="tech-stack" className={cn(
            "w-full py-16 relative overflow-hidden transition-colors duration-500 bg-transparent"
        )}>
            {/* Dot Pattern Background */}
            <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, ${isTerminalMode ? '#00ff00' : '#94a3b8'} 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Automation Pipeline</h2>
                    <p className="text-muted-foreground">Complex logic handling and real-time processing workflows.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Flowchart Container */}
                    <div className="relative lg:col-span-3 p-4 md:p-6 rounded-xl border bg-background/50 backdrop-blur-sm overflow-x-auto snap-x flex flex-col gap-8 min-h-[300px]">

                        {/* Flowchart Content */}
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-0 h-full w-full">

                            {/* Linear Part (Source -> Processor -> Orchestrator) */}
                            {linearTools.map((tool, index) => (
                                <div key={tool.id} className="contents">
                                    {index > 0 && (
                                        <>
                                            <div className="hidden md:block">
                                                <Connection isVertical={false} />
                                            </div>
                                            <div className="block md:hidden">
                                                <Connection isVertical={true} />
                                            </div>
                                        </>
                                    )}
                                    <NodeCard tool={tool} isActive={activeStep === index} />
                                </div>
                            ))}

                            {/* Branching Part */}
                            <div className="hidden md:flex items-center">
                                <ForkConnection />
                                <div className="flex flex-col gap-4">
                                    {outputTools.map((tool, index) => (
                                        <NodeCard key={tool.id} tool={tool} isActive={activeStep >= 3} />
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Stack for Outputs (No Fork, just linear continuation) */}
                            <div className="flex md:hidden flex-col items-center w-full">
                                {outputTools.map((tool) => (
                                    <div key={tool.id} className="contents">
                                        <Connection isVertical={true} />
                                        <NodeCard tool={tool} isActive={activeStep >= 3} />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Live Console - Right Column */}
                    <div className="lg:col-span-1 h-full">
                        <Console />
                    </div>
                </div>
            </div>
        </section>
    );
}
