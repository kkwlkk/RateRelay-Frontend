import Image from 'next/image';
import { SidebarHeader, SidebarSeparator, useSidebar } from "@/components/ui/sidebar";

interface SidebarHeaderProps {
    isOpen: boolean;
}

export function AppSidebarHeader({ isOpen }: SidebarHeaderProps) {
    const { isMobile } = useSidebar();

    const showExpandedContent = isMobile || isOpen;
    
    return (
        <SidebarHeader className="flex flex-col items-center justify-center py-4 pb-0 bg-white dark:bg-zinc-900">
            {showExpandedContent ? (
                <div className="transition-all duration-200">
                    <Image
                        src="/assets/logo-dark.png"
                        alt="TrustRate"
                        width={150}
                        height={40}
                        priority
                        fetchPriority='high'
                        className="dark:hidden"
                    />
                    <Image
                        src="/assets/logo-white.png"
                        alt="TrustRate"
                        width={150}
                        height={40}
                        priority
                        fetchPriority='high'
                        className="hidden dark:block"
                    />
                </div>
            ) : (
                <div className="transition-all duration-200">
                    <Image
                        src="/assets/logo-arrows.png"
                        alt="TrustRate"
                        width={30}
                        height={30}
                        priority
                        fetchPriority='high'
                    />
                </div>
            )}
            <SidebarSeparator className="mt-4 bg-zinc-200 dark:bg-zinc-800" />
        </SidebarHeader>
    );
}