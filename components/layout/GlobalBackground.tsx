"use client";

import { cn } from "@/lib/utils";

export function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Base Background Color */}
            <div className={cn(
                "absolute inset-0 transition-colors duration-500",
                "bg-white"
            )} />
            {/* Aurora Blobs */}
            <div className={cn(
                "absolute top-[-10%] left-[-10%] w-[70%] h-[40%] sm:w-[50%] sm:h-[50%] rounded-full blur-[70px] sm:blur-[100px] sm:animate-pulse transition-colors duration-500",
                "bg-blue-200 opacity-40 sm:opacity-60"
            )} />
            <div className={cn(
                "absolute top-[20%] right-[-10%] w-[55%] h-[45%] sm:w-[40%] sm:h-[60%] rounded-full blur-[70px] sm:blur-[100px] sm:animate-pulse delay-1000 transition-colors duration-500",
                "bg-purple-200 opacity-35 sm:opacity-60"
            )} />
            <div className={cn(
                "absolute bottom-[-10%] left-[20%] w-[70%] h-[35%] sm:w-[60%] sm:h-[40%] rounded-full blur-[70px] sm:blur-[100px] sm:animate-pulse delay-2000 transition-colors duration-500",
                "bg-indigo-200 opacity-35 sm:opacity-60"
            )} />
        </div>
    );
}
