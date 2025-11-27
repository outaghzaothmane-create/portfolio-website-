"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface TerminalContextType {
    isTerminalMode: boolean;
    toggleTerminalMode: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
    const [isTerminalMode, setIsTerminalMode] = useState(false);

    useEffect(() => {
        if (isTerminalMode) {
            document.body.classList.add("terminal-mode");
        } else {
            document.body.classList.remove("terminal-mode");
        }
    }, [isTerminalMode]);

    const toggleTerminalMode = () => {
        setIsTerminalMode((prev) => !prev);
    };

    return (
        <TerminalContext.Provider value={{ isTerminalMode, toggleTerminalMode }}>
            {children}
        </TerminalContext.Provider>
    );
}

export function useTerminal() {
    const context = useContext(TerminalContext);
    if (context === undefined) {
        throw new Error("useTerminal must be used within a TerminalProvider");
    }
    return context;
}
