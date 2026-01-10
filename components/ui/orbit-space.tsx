"use client";

import { useMemo, useRef, useEffect, useState, memo } from "react";
import { motion, useSpring, useMotionValue, useAnimationFrame, MotionValue } from "framer-motion";
import { Search, Code, TrendingUp, Database, Command, Cpu, Globe, Zap, Server, Activity, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrbitSpaceProps {
    className?: string;
    density?: "high" | "low";
}

type ElementType = "icon" | "circle" | "plus";

interface FloatingElement {
    id: number;
    type: ElementType;
    icon?: LucideIcon;
    size: number;
    color: string;
    radius: number;
    speed: number;
    offset: number;
}

export function OrbitSpace({ className, density = "high" }: OrbitSpaceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Local mouse position relative to container center
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Check for mobile
    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        // Optional: Reset to center or keep last position?
        // Let's keep last position for smoother exit, or maybe reset to center if we want "idle" state.
        // For now, keeping last position is less jarring.
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 2);
    };

    // Generate elements
    const elements = useMemo(() => {
        const items: FloatingElement[] = [];
        const icons = [Search, Code, TrendingUp, Database, Command, Cpu, Globe, Zap, Server, Activity];

        const colors = density === "high"
            ? ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#9AA0A6"] // Google Colors
            : ["#9CA3AF", "#6B7280", "#4B5563"]; // Grayscale

        // Reduce count on mobile for performance
        const baseCount = density === "high" ? 20 : 10;
        const count = isMobile ? Math.floor(baseCount / 2) : baseCount;

        const sizeMultiplier = density === "high" ? 1 : 0.7;

        for (let i = 0; i < count; i++) {
            const size = (Math.random() * 30 + 15) * sizeMultiplier;

            items.push({
                id: i,
                type: Math.random() > 0.6 ? "icon" : Math.random() > 0.5 ? "circle" : "plus",
                icon: icons[Math.floor(Math.random() * icons.length)],
                size: size,
                color: colors[Math.floor(Math.random() * colors.length)],
                radius: Math.random() * 300 + 100, // 100px to 400px orbit radius
                speed: (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1), // Random direction and speed
                offset: Math.random() * Math.PI * 2, // Random starting angle
            });
        }
        return items;
    }, [density, isMobile]);

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 overflow-hidden", className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Custom Cursor "Sun" */}
            <motion.div
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="absolute top-0 left-0 w-12 h-12 rounded-full border border-white/20 z-50 pointer-events-none"
            />

            {elements.map((el) => (
                <OrbitingItem
                    key={el.id}
                    element={el}
                    mouseX={smoothX}
                    mouseY={smoothY}
                    containerRef={containerRef}
                />
            ))}
        </div>
    );
}

interface OrbitingItemProps {
    element: FloatingElement;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    containerRef: React.RefObject<HTMLDivElement>;
}

const OrbitingItem = memo(function OrbitingItem({
    element,
    mouseX,
    mouseY,
    containerRef
}: OrbitingItemProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useAnimationFrame((time) => {
        const t = time / 1000;

        const currentMouseX = mouseX.get();
        const currentMouseY = mouseY.get();

        let centerX = currentMouseX;
        let centerY = currentMouseY;

        if (centerX === 0 && centerY === 0 && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            centerX = rect.width / 2;
            centerY = rect.height / 2;
        }

        const angle = t * element.speed + element.offset;

        const targetX = centerX + Math.cos(angle) * element.radius;
        const targetY = centerY + Math.sin(angle) * element.radius;

        x.set(targetX);
        y.set(targetY);
    });

    const IconComponent = element.icon;

    return (
        <motion.div
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                x,
                y,
                width: element.size,
                height: element.size,
                opacity: 0.2,
                color: element.color,
                zIndex: 0,
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
            }}
            className="flex items-center justify-center pointer-events-none"
        >
            {element.type === "icon" && IconComponent && (
                <IconComponent className="w-full h-full" />
            )}
            {element.type === "circle" && (
                <div className="w-full h-full rounded-full border-2 border-current" />
            )}
            {element.type === "plus" && (
                <div className="relative w-full h-full">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-current -translate-y-1/2" />
                    <div className="absolute left-1/2 top-0 h-full w-[2px] bg-current -translate-x-1/2" />
                </div>
            )}
        </motion.div>
    );
});
