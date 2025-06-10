import LegalPageWrapper from '@/components/LegalPage/LegalPageWrapper';

export default async function TermsPage() {
    return (
        <LegalPageWrapper
            filePath="terms-of-service"
            fallbackTitle="Regulamin Serwisu"
            fallbackType="Regulamin"
        />
    );
}