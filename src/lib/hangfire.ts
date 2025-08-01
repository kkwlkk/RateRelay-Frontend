export const getHangfireBaseUrl = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hangfireBaseUrl = isDevelopment
        ? 'http://localhost:5206/hangfire'
        : process.env.HANGFIRE_URL;

    if (!hangfireBaseUrl || process.env.HANGFIRE_URL === '') {
        console.error('Hangfire URL not configured');
        return null;
    }

    return hangfireBaseUrl;
};