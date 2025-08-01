export const getHangfireBaseUrl = (): string => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hangfireBaseUrl = isDevelopment
        ? 'http://localhost:5206/hangfire'
        : process.env.NEXT_PUBLIC_HANGFIRE_URL;

    if (!hangfireBaseUrl || process.env.NEXT_PUBLIC_HANGFIRE_URL === '') {
        console.error('Hangfire URL not configured');
        return '';
    }

    return hangfireBaseUrl;
};