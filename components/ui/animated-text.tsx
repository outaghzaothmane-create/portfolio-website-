"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
    text: string;
    className?: string;
    type?: "words" | "lines" | "chars";
    delay?: number;
    duration?: number;
}

export function AnimatedText({
    text,
    className,
    type = "words",
    delay = 0,
    duration = 1,
}: AnimatedTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const elements = containerRef.current?.querySelectorAll(".animate-target");

        if (!elements || elements.length === 0) return;

        gsap.fromTo(
            elements,
            {
                y: "100%",
                opacity: 0,
            },
            {
                y: "0%",
                opacity: 1,
                duration: duration,
                stagger: 0.02,
                ease: "power3.out",
                delay: delay,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, { scope: containerRef, dependencies: [text, type, delay, duration] });

    // Helper to split text
    const renderContent = () => {
        if (type === "chars") {
            return text.split("").map((char, index) => (
                <span
                    key={index}
                    className="inline-block overflow-hidden"
                    style={{ verticalAlign: "bottom" }}
                >
                    <span className="animate-target inline-block">
                        {char === " " ? "\u00A0" : char}
                    </span>
                </span>
            ));
        }

        if (type === "words") {
            return text.split(" ").map((word, index) => (
                <span
                    key={index}
                    className="inline-block overflow-hidden mr-[0.2em]"
                    style={{ verticalAlign: "bottom" }}
                >
                    <span className="animate-target inline-block">
                        {word}
                    </span>
                </span>
            ));
        }

        if (type === "lines") {
            // Simple line splitting by newline character if present, otherwise treat as one block or handle wrapping logic if needed.
            // For true visual line splitting without explicit newlines, we'd need more complex logic or ResizeObserver.
            // Assuming explicit newlines or just treating the whole block as a "line" for now if no newlines.
            // If the user meant visual lines in a paragraph, that's harder without SplitText.
            // Let's assume input text might have \n for lines, or we wrap the whole thing if it's just one line.
            // Given the constraint "no SplitText", "lines" is tricky for responsive text.
            // I will implement a basic split by "\n" for now, or just wrap words if no newlines are found but "lines" is requested, 
            // effectively falling back to words or just animating the whole block?
            // The prompt says: "Word-by-Word" and "Line-by-Line".
            // Let's stick to a safe implementation: Split by words is safest for flow.
            // If type is lines, and no \n, maybe we just animate the whole block?
            // Let's try to split by `\n` first.
            const lines = text.split("\n");
            return lines.map((line, index) => (
                <div key={index} className="overflow-hidden">
                    <span className="animate-target inline-block">
                        {line}
                    </span>
                </div>
            ));
        }

        return text;
    };

    return (
        <div
            ref={containerRef}
            className={cn("relative", className)}
            aria-label={text}
        >
            {renderContent()}
        </div>
    );
}
