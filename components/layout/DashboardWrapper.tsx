"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
    const { isTerminalMode } = useTerminal();

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
                "min-h-screen w-full relative pt-0 transition-colors duration-500 bg-transparent"
            )}
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="w-full pt-0"
            >
                {children}
            </motion.div>
        </motion.main>
    );
}
