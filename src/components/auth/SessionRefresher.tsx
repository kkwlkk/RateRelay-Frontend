'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useCallback, useRef } from 'react';
import { useInterval } from 'usehooks-ts';
import { apiService } from '@/services/api';

export function SessionRefresher() {
    const { data: session, update, status } = useSession();
    const refreshInProgressRef = useRef(false);

    const refreshInterval = 30 * 60 * 1000;

    const performTokenRefresh = useCallback(async () => {
        if (refreshInProgressRef.current) {
            console.log('Refresh already in progress, skipping...');
            return;
        }

        if (!session?.refreshToken || status !== 'authenticated') {
            console.log('Skipping refresh: no session or not authenticated');
            return;
        }

        refreshInProgressRef.current = true;

        try {
            console.log('Starting token refresh...');

            const response = await apiService.refreshToken(session.refreshToken);

            if (!response.success) {
                console.error('Token refresh failed:', response.error);
                await signOut({ redirect: false });
                return;
            }

            if (response.error) {
                console.error('Error refreshing token:', response.error);
                await signOut({ redirect: false });
                return;
            }

            if (response.data?.accessToken && response.data?.refreshToken) {
                console.log('Received new tokens, updating session...');

                const updateResult = await update({
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                });

                if (updateResult) {
                    console.log('Session update completed successfully');
                } else {
                    console.error('Session update returned null/undefined');
                }
            } else {
                console.error('Token refresh returned incomplete data:', response);
                throw new Error('Invalid response from refresh endpoint');
            }
        } catch (error) {
            console.error('Failed to refresh session:', error);

            if (error instanceof Error && (
                error.message.includes('401') ||
                error.message.includes('Unauthorized') ||
                error.message.includes('invalid_grant')
            )) {
                console.log('Authentication failed, signing out...');
                await signOut({ redirect: false });
            }
        } finally {
            refreshInProgressRef.current = false;
        }
    }, [session?.refreshToken, status, update]);

    useInterval(
        performTokenRefresh,
        session && status === 'authenticated' ? refreshInterval : null
    );

    useEffect(() => {
        if (!session || status !== 'authenticated') return;

        const handleFocus = async () => {
            if (!session.expires) return;

            const expiryTime = new Date(session.expires).getTime();
            const currentTime = Date.now();
            const timeUntilExpiry = expiryTime - currentTime;

            if (timeUntilExpiry <= 5 * 60 * 1000) {
                console.log('Session expired or expiring soon, performing refresh...');
                await performTokenRefresh();
            } else {
                console.log(`Session valid for ${Math.round(timeUntilExpiry / 60000)} more minutes`);
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [session, status, performTokenRefresh]);

    return null;
}