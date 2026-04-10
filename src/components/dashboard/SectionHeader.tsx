import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    description: string | React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export function SectionHeader({ title, description, children, className }: SectionHeaderProps) {
    return (
        <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6", className)}>
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <div className="text-sm text-muted-foreground">
                    {description}
                </div>
            </div>
            {children && <div className="flex items-center gap-2">{children}</div>}
        </div>
    );
}
