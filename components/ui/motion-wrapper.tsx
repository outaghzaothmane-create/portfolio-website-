"use client";

import { motion, MotionProps } from "framer-motion";

interface MotionDivProps extends MotionProps {
    children: React.ReactNode;
    className?: string;
}

export const MotionDiv = ({ children, className, ...props }: MotionDivProps) => {
    return (
        <motion.div className={className} {...props}>
            {children}
        </motion.div>
    );
};
