import { dashboardRoutes, segmentRouteLabelMap } from "@/lib/navigationRoutes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import React from "react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    href: string;
    label: string;
    isLast: boolean;
}

const findRouteByPath = (path: string) => {
    const mainRoute = dashboardRoutes.find(route => route.path === path);
    if (mainRoute) return mainRoute;

    for (const route of dashboardRoutes) {
        if (route.subRoutes) {
            const subRoute = route.subRoutes.find(subRoute => subRoute.path === path);
            if (subRoute) return subRoute;
        }
    }
    return null;
};

const findParentRoute = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    
    for (let i = segments.length - 1; i >= 0; i--) {
        const partialPath = '/' + segments.slice(0, i + 1).join('/');
        const route = findRouteByPath(partialPath);
        if (route) return route;
    }
    return null;
};

const isNumericId = (segment: string): boolean => {
    return /^\d+$/.test(segment);
};

const getSegmentLabel = (segment: string, fullPath: string): string => {
    if (isNumericId(segment)) {
        const parentRoute = findParentRoute(fullPath.split('/').slice(0, -1).join('/'));
        if (parentRoute?.label === 'Zarządzanie firmą') {
            return 'Firma';
        }
        return segment;
    }

    return segmentRouteLabelMap[segment] || segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const DashboardBreadcrumb = () => {
    const pathname = usePathname();

    const generateBreadcrumbItems = (): BreadcrumbItem[] => {
        if (pathname === '/dashboard') {
            return [{
                href: '/dashboard',
                label: 'Przegląd',
                isLast: true
            }];
        }

        const pathSegments = pathname.split('/').filter(Boolean);
        const segmentsWithoutDashboard = pathSegments.slice(1);

        return segmentsWithoutDashboard.map((segment, index) => {
            const href = `/dashboard/${segmentsWithoutDashboard.slice(0, index + 1).join('/')}`;
            const isLast = index === segmentsWithoutDashboard.length - 1;

            const route = findRouteByPath(href);
            const label = route?.label || getSegmentLabel(segment, href);

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
                        {index > 0 && (
                            <BreadcrumbSeparator className="opacity-60" />
                        )}
                        {shouldShowEllipsis && index === 0 && (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild className={cn(
                                        "text-sm font-medium transition-colors duration-200",
                                        "hover:text-zinc-900 dark:hover:text-zinc-50"
                                    )}>
                                        <Link href={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="opacity-60" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-sm opacity-60">
                                        ...
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                        {(!shouldShowEllipsis || index === visibleItems.length - 1) && (
                            <BreadcrumbItem>
                                {item.isLast ? (
                                    <BreadcrumbPage className="text-sm font-semibold">
                                        {item.label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild className={cn(
                                        "text-sm font-medium transition-colors duration-200",
                                        "hover:text-zinc-900 dark:hover:text-zinc-50"
                                    )}>
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