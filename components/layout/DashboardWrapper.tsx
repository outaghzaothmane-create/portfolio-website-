"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-secondary/30">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="w-full pt-40"
            >
                {children}
            </motion.div>
        </main>
    );
}
