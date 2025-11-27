"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}

export function Switch({ checked, onCheckedChange, className }: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                checked ? "bg-green-500" : "bg-input",
                className
            )}
        >
            <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={cn(
                    "block h-5 w-5 rounded-full bg-background shadow-lg ring-0",
                    checked ? "translate-x-5" : "translate-x-0.5"
                )}
            />
        </button>
    );
}
