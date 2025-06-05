import LegalPageWrapper from '@/components/LegalPage/LegalPageWrapper';

export default async function PrivacyPage() {
    return (
        <LegalPageWrapper
            filePath="src/content/legal/privacy-policy.md"
            fallbackTitle="Polityka Prywatności"
            fallbackType="Polityka Prywatności"
        />
    );
}