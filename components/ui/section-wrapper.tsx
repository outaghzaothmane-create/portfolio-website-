"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export function SectionWrapper({ children, className, id, delay = 0 }: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.section>
    );
}
