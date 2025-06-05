import { getMarkdownFile, createVersionInfo, createVersionHistory, extractHeadings } from '@/lib/markdown';
import { LegalPageLayout } from './LegalPageLayout';

interface LegalPageWrapperProps {
    filePath: string;
    fallbackTitle?: string;
    fallbackType?: string;
}

export default async function LegalPageWrapper({
    filePath,
    fallbackTitle = 'Dokument prawny',
    fallbackType = 'Dokument'
}: LegalPageWrapperProps) {
    const { content, frontmatter } = await getMarkdownFile(filePath);

    const pageData = {
        content,
        title: frontmatter.title || fallbackTitle,
        documentType: frontmatter.type || fallbackType,
        versionInfo: createVersionInfo(frontmatter),
        versionHistory: createVersionHistory(frontmatter),
        headings: extractHeadings(content)
    };

    return <LegalPageLayout {...pageData} />;
}