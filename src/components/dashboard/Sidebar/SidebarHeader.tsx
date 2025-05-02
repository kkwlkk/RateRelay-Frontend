import Image from 'next/image';
import { SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";

interface SidebarHeaderProps {
    isOpen: boolean;
}

export function AppSidebarHeader({ isOpen }: SidebarHeaderProps) {
    return (
        <SidebarHeader className="flex flex-col items-center justify-center py-4">
            {isOpen ? (
                <Image
                    src="/assets/logo-dark.png"
                    alt="TrustRate"
                    width={150}
                    height={40}
                    priority
                    fetchPriority='high'
                />
            ) : (
                <Image
                    src="/assets/logo-arrows.png"
                    alt="TrustRate"
                    width={30}
                    height={30}
                    priority
                    fetchPriority='high'
                />
            )}
            <SidebarSeparator className="mt-4" />
        </SidebarHeader>
    );
} 