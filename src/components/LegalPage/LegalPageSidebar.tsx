import { FileText, History, ChevronDown } from "lucide-react";

interface Heading {
    level: number;
    text: string;
    id: string;
}

interface VersionHistoryEntry {
    version: string;
    createdDate: string;
    lastUpdated: string;
    changes?: string[];
}

interface LegalPageSidebarProps {
    headings: Heading[];
    versionHistory: VersionHistoryEntry[];
    currentVersion: string;
}

export function LegalPageSidebar({ headings, versionHistory, currentVersion }: LegalPageSidebarProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="lg:w-80 order-first lg:order-last lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-6">
                {headings.length > 0 && (
                    <div className="bg-white dark:bg-neutral-900/75 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-900">
                        <details open className="group">
                            <summary className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                                    <span>Spis treści</span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <div className="px-3 pt-2 pb-3 max-h-[40vh] overflow-y-auto">
                                <nav className="space-y-1">
                                    {headings.map((heading, index) => (
                                        <a
                                            key={index}
                                            href={`#${heading.id}`}
                                            className={`block px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-md transition-colors duration-150 ${heading.level === 1 ? 'font-semibold' :
                                                heading.level === 2 ? 'ml-3' : 'ml-6'
                                                }`}
                                        >
                                            {heading.text}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </details>
                    </div>
                )}

                {versionHistory.length > 0 && (
                    <div className="bg-white dark:bg-neutral-900/75 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-900">
                        <details open className="group">
                            <summary className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <History className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                                    <span>Historia wersji</span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <div className="pt-2 pb-3 max-h-[40vh] overflow-y-auto">
                                <div className="px-8 mt-1">
                                    <div className="relative">
                                        <div className="absolute left-2 top-3 bottom-3 w-px bg-zinc-300 dark:bg-zinc-600"></div>
                                        <div className="space-y-6">
                                            {versionHistory.map((version, index) => (
                                                <div key={index} className="relative flex gap-4">
                                                    <div className={
                                                        version.version === currentVersion
                                                            ? "flex-shrink-0 w-4 h-4 bg-zinc-600 dark:bg-zinc-400 border-2 border-zinc-600 dark:border-zinc-400 rounded-full mt-1 relative z-10"
                                                            : "flex-shrink-0 w-4 h-4 bg-white dark:bg-neutral-900/75 border-2 border-zinc-400 dark:border-zinc-500 rounded-full mt-1 relative z-10"
                                                    }></div>
                                                    <div className="flex-1 pb-2">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                                                                Wersja {version.version}
                                                            </span>
                                                            <span className="text-xs text-zinc-600 dark:text-zinc-400">
                                                                {formatDate(version.lastUpdated)}
                                                            </span>
                                                        </div>
                                                        {version.changes && version.changes.length > 0 && (
                                                            <ul className="space-y-1 mt-2">
                                                                {version.changes.map((change, changeIndex) => (
                                                                    <li
                                                                        key={changeIndex}
                                                                        className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                                                                    >
                                                                        <div className="w-1 h-1 bg-zinc-500 dark:bg-zinc-500 rounded-full mt-2 flex-shrink-0"></div>
                                                                        {change}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>
                )}
            </div>
        </div>
    );
}