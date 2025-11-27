export function DashboardWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {children}
            </div>
        </div>
    );
}
