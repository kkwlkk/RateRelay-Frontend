import { Header } from "../landing/Header";
import { Footer } from "../landing/Footer";
import { LegalPageHeader } from "./LegalPageHeader";
import { LegalPageContent } from "./LegalPageContent";
import { LegalPageSidebar } from "./LegalPageSidebar";

interface VersionInfo {
    version: string;
    createdDate: string;
    lastUpdated: string;
}

interface VersionHistoryEntry {
    version: string;
    createdDate: string;
    lastUpdated: string;
    changes?: string[];
}

interface Heading {
    level: number;
    text: string;
    id: string;
}

interface LegalPageLayoutProps {
    content: string;
    title: string;
    documentType: string;
    versionInfo: VersionInfo;
    versionHistory: VersionHistoryEntry[];
    headings: Heading[];
}

export function LegalPageLayout({
    content,
    title,
    documentType,
    versionInfo,
    versionHistory,
    headings
}: LegalPageLayoutProps) {
    const hasSidebar = headings.length > 0 || versionHistory.length > 0;

    return (
        <>
            <Header />
            <LegalPageHeader
                title={title}
                documentType={documentType}
                versionInfo={versionInfo}
            />

            <div className="min-h-screen bg-white dark:bg-zinc-950">
                <div className="container mx-auto px-6 pb-12">
                    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                        <LegalPageContent content={content} />

                        {hasSidebar && (
                            <LegalPageSidebar
                                headings={headings}
                                versionHistory={versionHistory}
                                currentVersion={versionInfo.version}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-900">
                <Footer />
            </div>
        </>
    );
}