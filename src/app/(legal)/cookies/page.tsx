import LegalPageWrapper from '@/components/LegalPage/LegalPageWrapper';

export default async function CookiesPage() {
    return (
        <LegalPageWrapper
            filePath="cookie-policy"
            fallbackTitle="Polityka Cookies"
            fallbackType="Polityka Cookies"
        />
    );
}