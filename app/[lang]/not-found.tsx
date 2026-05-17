"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background text-foreground px-4">
            {/* Animated background blobs */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
                    style={{
                        background:
                            "radial-gradient(circle, hsl(214 82% 51%), transparent 70%)",
                        animation: "blob-drift 12s ease-in-out infinite",
                    }}
                />
                <div
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
                    style={{
                        background:
                            "radial-gradient(circle, hsl(265 70% 60%), transparent 70%)",
                        animation: "blob-drift 16s ease-in-out infinite reverse",
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
                    style={{
                        background:
                            "radial-gradient(circle, hsl(214 82% 51%), transparent 60%)",
                    }}
                />
            </div>

            {/* Floating particles */}
            {mounted && (
                <div className="pointer-events-none absolute inset-0 -z-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <span
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                background: `hsl(214 82% ${51 + Math.random() * 20}%)`,
                                opacity: Math.random() * 0.5 + 0.2,
                                animation: `float-particle ${Math.random() * 8 + 6}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 6}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Grid lines overlay */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(hsl(214 82% 51%) 1px, transparent 1px), linear-gradient(90deg, hsl(214 82% 51%) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Content */}
            <div className="relative flex flex-col items-center text-center max-w-2xl">
                {/* Glitch 404 */}
                <div className="relative select-none mb-4">
                    <span
                        className="block text-[clamp(6rem,20vw,14rem)] font-black leading-none tracking-tighter"
                        style={{
                            background:
                                "linear-gradient(135deg, hsl(214 82% 51%) 0%, hsl(265 70% 65%) 50%, hsl(214 82% 70%) 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            animation: "glitch 4s infinite",
                            filter: "drop-shadow(0 0 30px hsl(214 82% 51% / 0.4))",
                        }}
                    >
                        404
                    </span>
                    {/* Glitch clone layers */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 block text-[clamp(6rem,20vw,14rem)] font-black leading-none tracking-tighter"
                        style={{
                            background:
                                "linear-gradient(135deg, hsl(214 82% 51%), hsl(265 70% 65%))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            animation: "glitch-1 4s infinite",
                            opacity: 0.6,
                            clipPath: "polygon(0 30%, 100% 30%, 100% 55%, 0 55%)",
                        }}
                    >
                        404
                    </span>
                </div>

                {/* Badge */}
                <span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
                    style={{
                        background: "hsl(214 82% 51% / 0.12)",
                        border: "1px solid hsl(214 82% 51% / 0.3)",
                        color: "hsl(214 82% 65%)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Page Not Found
                </span>

                {/* Heading */}
                <h1
                    className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                >
                    Looks like you&apos;re lost in the void
                </h1>

                {/* Subtext */}
                <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-md leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                    Let&apos;s get you back on track.
                </p>

                {/* CTA Button */}
                <Link
                    href="/"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base md:text-lg text-white overflow-hidden transition-transform duration-200 hover:scale-105 active:scale-95"
                    style={{
                        background:
                            "linear-gradient(135deg, hsl(214 82% 51%) 0%, hsl(265 70% 60%) 100%)",
                        boxShadow:
                            "0 4px 24px hsl(214 82% 51% / 0.4), 0 1px 0 hsl(214 82% 80% / 0.2) inset",
                    }}
                >
                    {/* Shine sweep */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                        }}
                    />
                    {/* Arrow icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to Homepage
                </Link>

                {/* Secondary link */}
                <p className="mt-6 text-sm text-muted-foreground">
                    Or{" "}
                    <a
                        href="mailto:outaghza.othmane@gmail.com"
                        className="underline underline-offset-4 hover:text-foreground transition-colors duration-200"
                        style={{ color: "hsl(214 82% 60%)" }}
                    >
                        contact me
                    </a>{" "}
                    if you think something is broken.
                </p>
            </div>

            {/* Keyframes injected via style tag */}
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33%       { transform: translate(40px, -30px) scale(1.05); }
                    66%       { transform: translate(-20px, 20px) scale(0.96); }
                }
                @keyframes float-particle {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                    50%       { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
                }
                @keyframes glitch {
                    0%, 90%, 100% { transform: translate(0); }
                    91%           { transform: translate(-3px, 1px); }
                    93%           { transform: translate(3px, -1px); }
                    95%           { transform: translate(-2px, 0); }
                    97%           { transform: translate(2px, 1px); }
                }
                @keyframes glitch-1 {
                    0%, 90%, 100% { transform: translate(0); }
                    91%           { transform: translate(4px, -2px); }
                    93%           { transform: translate(-4px, 2px); }
                    95%           { transform: translate(2px, 0); }
                    97%           { transform: translate(-2px, -1px); }
                }
            `}</style>
        </main>
    );
}
