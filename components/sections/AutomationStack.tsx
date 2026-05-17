"use client";;
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Database, FileSpreadsheet, Code2, Workflow, Bell, Terminal, Mail, Bot, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

// --- Components ---

const Connection = ({ isVertical = false }: { isVertical?: boolean }) => {
    return (
        <div className={cn(
            "relative flex items-center justify-center",
            isVertical ? "h-8 w-full" : "w-8 h-full"
        )}>
            <div className={cn(
                "absolute",
                isVertical ? "h-full w-[2px]" : "w-full h-[2px]",
                "bg-border"
            )} />
            <motion.div
                className={cn(
                    "absolute rounded-full z-10",
                    "bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                )}
                style={{ width: 6, height: 6 }}
                animate={isVertical ? { top: ["0%", "100%"] } : { left: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

const ForkConnection = () => {
    return (
        <div className="relative w-12 h-48 flex items-center">
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 48 192" preserveAspectRatio="none">
                {/* Top Branch - Goes from center (96) to top (48) */}
                <path d="M 0 96 C 20 96, 20 48, 48 48" fill="none" stroke="currentColor" strokeWidth="2" className={"text-border"} strokeLinecap="round" />
                {/* Bottom Branch - Goes from center (96) to bottom (144) */}
                <path d="M 0 96 C 20 96, 20 144, 48 144" fill="none" stroke="currentColor" strokeWidth="2" className={"text-border"} strokeLinecap="round" />

                {/* Particles */}
                <motion.circle r="3" fill={"#3b82f6"}>
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 96 C 20 96, 20 48, 48 48" />
                </motion.circle>
                <motion.circle r="3" fill={"#3b82f6"}>
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 96 C 20 96, 20 144, 48 144" />
                </motion.circle>
            </svg>
        </div>
    );
};

const NodeCard = ({ tool, isActive }: { tool: any, isActive: boolean }) => {
    return (
        <motion.div
            className="relative group z-20 max-w-full cursor-grab active:cursor-grabbing"
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
                "w-full min-w-[min(13rem,100%)] sm:min-w-[120px] h-auto relative overflow-hidden transition-all duration-300",
                "border-2",
                isActive
                    ? ("border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]")
                    : (tool.border),
                "bg-white/40 backdrop-blur-md hover:shadow-lg"
            )}>
                <div className="flex min-w-0 items-center p-3 gap-3">
                    <div className={cn(
                        "p-2 rounded-lg transition-colors duration-300 shrink-0",
                        cn(tool.bg, tool.color)
                    )}>
                        <tool.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 text-left">
                        <h3 className={cn("font-semibold text-sm leading-tight mb-1 break-words", false)}>{tool.name}</h3>
                        <p className={cn("text-[10px] font-mono uppercase tracking-wide leading-tight break-words", "text-muted-foreground")}>{tool.role}</p>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

const Console = ({ logs }: { logs: string[] }) => {
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
    }, [currentLineIndex, logs]);

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

export function AutomationStack({ dict }: { dict?: any }) {
    const [activeStep, setActiveStep] = useState(0);

    const safeDict = dict || {
        title: "PR Link Building Automation",
        subtitle: "Autonomous HARO outreach workflow with AI filtering and human-in-the-loop approvals.",
        linearTools: [
            {
                name: "Gmail API",
                role: "HARO Trigger"
            },
            {
                name: "Gemini AI",
                role: "Filter & Draft"
            },
            {
                name: "n8n",
                role: "Automation Engine"
            }
        ],
        outputTools: [
            {
                name: "Google Sheets",
                role: "Pitch Logging"
            },
            {
                name: "Slack",
                role: "Human Approval"
            }
        ],
        logs: [
            "> [TRIGGER] New HARO email received...",
            "> Deduplicating against pitch history...",
            "> Gemini AI analyzing healthcare relevance...",
            "> [DRAFT] Pitch generated by Gemini.",
            "> [ACTION] Slack approval requested...",
            "> [APPROVED] Sending pitch via Gmail...",
            "> [SUCCESS] Workflow logged to Sheets."
        ]
    };

    const linearToolsConfig = [
        {
            id: "source",
            name: safeDict.linearTools[0].name,
            role: safeDict.linearTools[0].role,
            icon: Mail,
            color: "text-red-500",
            bg: "bg-red-500/10",
            border: "border-red-500/20",
            delay: 0
        },
        {
            id: "processor",
            name: safeDict.linearTools[1].name,
            role: safeDict.linearTools[1].role,
            icon: Bot,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            delay: 1.5
        },
        {
            id: "orchestrator",
            name: safeDict.linearTools[2].name,
            role: safeDict.linearTools[2].role,
            icon: Workflow,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
            delay: 3
        },
    ];

    const outputToolsConfig = [
        {
            id: "output-a",
            name: safeDict.outputTools[0].name,
            role: safeDict.outputTools[0].role,
            icon: FileSpreadsheet,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            delay: 4.5
        },
        {
            id: "output-b",
            name: safeDict.outputTools[1].name,
            role: safeDict.outputTools[1].role,
            icon: MessageSquare,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            border: "border-pink-500/20",
            delay: 4.5
        },
    ];

    // Cycle through active steps for animation sync
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 5);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="tech-stack" className={cn(
            "w-full py-14 sm:py-16 relative overflow-hidden transition-colors duration-500 bg-transparent"
        )}>
            {/* Dot Pattern Background */}
            <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, ${'#94a3b8'} 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{safeDict.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{safeDict.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Flowchart Container */}
                    <div className="relative lg:col-span-3 p-4 md:p-6 rounded-xl border bg-background/50 backdrop-blur-sm overflow-hidden md:overflow-x-auto snap-x flex flex-col gap-8 min-h-[300px]">

                        {/* Flowchart Content */}
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-0 h-full w-full">

                            {/* Linear Part (Source -> Processor -> Orchestrator) */}
                            {linearToolsConfig.map((tool, index) => (
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
                                    {outputToolsConfig.map((tool, index) => (
                                        <NodeCard key={tool.id} tool={tool} isActive={activeStep >= 3} />
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Stack for Outputs (No Fork, just linear continuation) */}
                            <div className="flex md:hidden flex-col items-center w-full">
                                {outputToolsConfig.map((tool) => (
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
                        <Console logs={safeDict.logs} />
                    </div>
                </div>
            </div>
        </section>
    );
}
