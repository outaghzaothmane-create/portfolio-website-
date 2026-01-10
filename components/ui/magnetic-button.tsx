'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticButtonProps {
    children: React.ReactNode;
    strength?: number;
    textStrength?: number;
    href?: string;
    target?: string;
    rel?: string;
    className?: string;
    onClick?: () => void;
}

export const MagneticButton = ({
    children,
    strength = 0.5,
    textStrength = 0.3,
    className = '',
    href,
    target,
    rel,
    onClick,
}: MagneticButtonProps) => {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);
    const xToText = useRef<gsap.QuickToFunc | null>(null);
    const yToText = useRef<gsap.QuickToFunc | null>(null);

    const containerRef = href ? buttonRef : divRef;

    useGSAP(() => {
        const element = containerRef.current;
        if (!element || !textRef.current) return;

        xTo.current = gsap.quickTo(element, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        yTo.current = gsap.quickTo(element, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

        xToText.current = gsap.quickTo(textRef.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        yToText.current = gsap.quickTo(textRef.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    }, { scope: containerRef });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const element = containerRef.current;
        if (!element || !xTo.current || !yTo.current || !xToText.current || !yToText.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = element.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        xTo.current(x * strength);
        yTo.current(y * strength);

        xToText.current(x * textStrength);
        yToText.current(y * textStrength);
    };

    const handleMouseLeave = () => {
        if (!xTo.current || !yTo.current || !xToText.current || !yToText.current) return;

        xTo.current(0);
        yTo.current(0);
        xToText.current(0);
        yToText.current(0);
    };

    const sharedClassName = `relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${className}`;

    if (href) {
        return (
            <a
                ref={buttonRef}
                href={href}
                target={target}
                rel={rel}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={sharedClassName}
            >
                <span ref={textRef} className="relative z-10 block">
                    {children}
                </span>
            </a>
        );
    }

    return (
        <div
            ref={divRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={sharedClassName}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
        >
            <span ref={textRef} className="relative z-10 block">
                {children}
            </span>
        </div>
    );
};
