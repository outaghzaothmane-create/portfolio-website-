import { cn } from "@/lib/utils";

// Rendered visible from the server on purpose: an opacity-0 entrance here hides
// the whole page (including the LCP heading) until framer-motion hydrates.
// Sections animate themselves via SectionWrapper / BlurFade.
export function DashboardWrapper({ children }: { children: React.ReactNode }) {
    return (
        <main
            className={cn(
                "min-h-screen w-full relative pt-0 transition-colors duration-500 bg-transparent"
            )}
        >
            <div className="w-full pt-0">{children}</div>
        </main>
    );
}
