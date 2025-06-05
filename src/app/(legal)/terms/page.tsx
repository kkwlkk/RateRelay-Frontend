import LegalPageWrapper from '@/components/LegalPage/LegalPageWrapper';

export default async function TermsPage() {
    return (
        <LegalPageWrapper
            filePath="src/content/legal/terms-of-service.md"
            fallbackTitle="Regulamin Serwisu"
            fallbackType="Regulamin"
        />
    );
}