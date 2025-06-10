import LegalPageWrapper from '@/components/LegalPage/LegalPageWrapper';

export default async function PrivacyPage() {
    return (
        <LegalPageWrapper
            filePath="privacy-policy"
            fallbackTitle="Polityka Prywatności"
            fallbackType="Polityka Prywatności"
        />
    );
}