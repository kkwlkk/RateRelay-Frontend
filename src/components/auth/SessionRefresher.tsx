'use client';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useCallback } from 'react';
import { refreshAccessToken } from '@/utils/refreshToken';
import { useInterval } from 'usehooks-ts';

export function SessionRefresher() {
    const { data: session, update, status } = useSession();

    const refreshInterval = 30 * 60 * 1000;

    const performTokenRefresh = useCallback(async () => {
        if (!session?.refreshToken || status !== 'authenticated') {
            console.log('Skipping refresh: no session or not authenticated');
            return;
        }

        try {
            console.log('Starting token refresh...');
            const result = await refreshAccessToken();

            if (result?.accessToken && result?.refreshToken) {
                console.log('Received new tokens, updating session...');

                const updateResult = await update({
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                });

                if (updateResult) {
                    console.log('Session update completed successfully');
                } else {
                    console.error('Session update returned null/undefined');
                }
            } else {
                console.error('Token refresh returned incomplete data:', result);
            }
        } catch (error) {
            console.error('Failed to refresh session:', error);
            await signOut({ redirect: false });
        }
    }, [session?.refreshToken, status, update]);

    useInterval(
        performTokenRefresh,
        session && status === 'authenticated' ? refreshInterval : null
    );

    useEffect(() => {
        if (!session || status !== 'authenticated') return;

        const handleFocus = () => {
            if (session.expires && new Date(session.expires) <= new Date()) {
                console.log('Session expired, performing refresh...');
                performTokenRefresh();
            } else {
                console.log('Session still valid, no refresh needed');
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [session, status, performTokenRefresh]);

    return null;
}