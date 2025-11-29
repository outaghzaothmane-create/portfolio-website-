'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    strength?: number; // Strength of the magnetic pull (default: 0.5)
    textStrength?: number; // Strength of the text parallax (default: 0.3)
    href?: string;
    target?: string;
    rel?: string;
}

export const MagneticButton = ({
    children,
    strength = 0.5,
    textStrength = 0.3,
    className = '',
    href,
    ...props
}: MagneticButtonProps) => {
    const buttonRef = useRef<any>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);
    const xToText = useRef<gsap.QuickToFunc | null>(null);
    const yToText = useRef<gsap.QuickToFunc | null>(null);

    useGSAP(() => {
        if (!buttonRef.current || !textRef.current) return;

        // Initialize quickTo for performance
        xTo.current = gsap.quickTo(buttonRef.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        yTo.current = gsap.quickTo(buttonRef.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

        xToText.current = gsap.quickTo(textRef.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        yToText.current = gsap.quickTo(textRef.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    }, { scope: buttonRef });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!buttonRef.current || !xTo.current || !yTo.current || !xToText.current || !yToText.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

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

    const Component = href ? 'a' : 'div';

    return (
        <Component
            ref={buttonRef}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${className}`}
            {...props}
        >
            <span ref={textRef} className="relative z-10 block">
                {children}
            </span>
        </Component>
    );
};
