import { dashboardRoutes } from "@/lib/navigationRoutes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import React from "react";

interface BreadcrumbItem {
    href: string;
    label: string;
    isLast: boolean;
}

export const DashboardBreadcrumb = () => {
    const pathname = usePathname();

    const generateBreadcrumbItems = (): BreadcrumbItem[] => {
        const pathSegments = pathname.split('/').filter(Boolean);

        return pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            const route = dashboardRoutes.find(route => route.path === href);
            const label = route?.label || segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            return { href, label, isLast };
        });
    };

    const breadcrumbItems = generateBreadcrumbItems();
    const shouldShowEllipsis = breadcrumbItems.length > 3;
    const visibleItems = shouldShowEllipsis
        ? [breadcrumbItems[0], breadcrumbItems[breadcrumbItems.length - 1]]
        : breadcrumbItems;

    return (
        <Breadcrumb className="flex-1">
            <BreadcrumbList>
                {visibleItems.map((item, index) => (
                    <React.Fragment key={item.href}>
                        {item.href !== '/dashboard' && <BreadcrumbSeparator />}
                        {shouldShowEllipsis && index === 0 && (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>...</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                        {(!shouldShowEllipsis || index === visibleItems.length - 1) && (
                            <BreadcrumbItem>
                                {item.isLast ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
