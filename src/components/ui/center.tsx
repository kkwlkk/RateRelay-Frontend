import { cn } from "@/lib/utils"

export const Center = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex items-center justify-center size-full", className)}>
            {children}
        </div>
    )
}
