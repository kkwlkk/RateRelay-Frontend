import { FileText, Tag, Calendar, Clock } from "lucide-react";

interface VersionInfo {
    version: string;
    createdDate: string;
    lastUpdated: string;
}

interface LegalPageHeaderProps {
    title: string;
    documentType: string;
    versionInfo: VersionInfo;
}

export function LegalPageHeader({ title, documentType, versionInfo }: LegalPageHeaderProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white dark:bg-zinc-950 pt-20">
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-neutral-900/75 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-900 p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-sm shadow-sm">
                                {documentType}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            {title}
                        </h1>
                        <div className="flex items-start gap-4 text-sm text-zinc-600 dark:text-zinc-400 flex-col sm:flex-row sm:items-center">
                            <div className="flex items-center gap-1.5">
                                <Tag className="h-4 w-4 text-zinc-500" />
                                <span className="font-medium">Wersja {versionInfo.version}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-zinc-500" />
                                <span>Utworzono: {formatDate(versionInfo.createdDate)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-zinc-500" />
                                <span>Ostatnia aktualizacja: {formatDate(versionInfo.lastUpdated)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}