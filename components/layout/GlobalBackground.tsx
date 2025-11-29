"use client";

import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";

export function GlobalBackground() {
    const { isTerminalMode } = useTerminal();

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Base Background Color */}
            <div className={cn(
                "absolute inset-0 transition-colors duration-500",
                isTerminalMode ? "bg-black" : "bg-white"
            )} />

            {/* Aurora Blobs */}
            <div className={cn(
                "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] animate-pulse transition-colors duration-500",
                isTerminalMode ? "bg-green-900 opacity-20" : "bg-blue-200 opacity-60"
            )} />
            <div className={cn(
                "absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full blur-[100px] animate-pulse delay-1000 transition-colors duration-500",
                isTerminalMode ? "bg-green-800 opacity-20" : "bg-purple-200 opacity-60"
            )} />
            <div className={cn(
                "absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full blur-[100px] animate-pulse delay-2000 transition-colors duration-500",
                isTerminalMode ? "bg-green-950 opacity-20" : "bg-indigo-200 opacity-60"
            )} />
        </div>
    );
}
