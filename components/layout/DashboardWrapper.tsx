"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-secondary/30">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32"
            >
                {children}
            </motion.div>
        </div>
    );
}
