"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    delay?: number;
    variants?: Variants;
}

export function SectionWrapper({ children, className, id, delay = 0, variants = fadeInUp }: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.section>
    );
}
