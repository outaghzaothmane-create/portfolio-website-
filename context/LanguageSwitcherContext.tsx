"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type LanguagePaths = {
    en?: string;
    fr?: string;
};

type LanguageSwitcherContextType = {
    customPaths: LanguagePaths | null;
    setCustomPaths: (paths: LanguagePaths | null) => void;
};

const LanguageSwitcherContext = createContext<LanguageSwitcherContextType>({
    customPaths: null,
    setCustomPaths: () => {},
});

export function LanguageSwitcherProvider({ children }: { children: React.ReactNode }) {
    const [customPaths, setCustomPaths] = useState<LanguagePaths | null>(null);

    return (
        <LanguageSwitcherContext.Provider value={{ customPaths, setCustomPaths }}>
            {children}
        </LanguageSwitcherContext.Provider>
    );
}

export function useLanguageSwitcher() {
    return useContext(LanguageSwitcherContext);
}

export function SetLanguagePaths({ paths }: { paths: LanguagePaths | null }) {
    const { setCustomPaths } = useLanguageSwitcher();

    useEffect(() => {
        setCustomPaths(paths);
        return () => {
            setCustomPaths(null);
        };
    }, [paths, setCustomPaths]);

    return null;
}
