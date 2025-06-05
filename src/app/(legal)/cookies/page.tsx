import LegalPageWrapper from '@/components/LegalPage/LegalPageWrapper';

export default async function CookiesPage() {
    return (
        <LegalPageWrapper
            filePath="src/content/legal/cookies-policy.md"
            fallbackTitle="Polityka Cookies"
            fallbackType="Polityka Cookies"
        />
    );
}