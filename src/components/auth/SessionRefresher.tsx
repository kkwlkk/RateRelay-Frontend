'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { refreshAccessToken } from '@/utils/refreshToken';
import type { Session } from 'next-auth';

export function SessionRefresher() {
    const { data: session, update } = useSession();
    const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (session?.accessToken) {
            console.log(
                'Session updated, current token:',
                session.accessToken.substring(0, 10) + '...'
            );
        }
    }, [session?.accessToken]);

    useEffect(() => {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
            refreshTimeoutRef.current = null;
        }

        if (!session) {
            return;
        }

        console.log('Setting up refresh for session');

        const refreshInterval = 10 * 60 * 1000;

        console.log(`Will refresh token in ${Math.floor(refreshInterval / 60000)} minutes`);

        refreshTimeoutRef.current = setTimeout(async () => {
            try {
                console.log('Attempting to refresh token...');
                const result = await refreshAccessToken();

                if (result && update) {
                    console.log('Received new tokens, updating session...');
                    await update({
                        accessToken: result.accessToken,
                        refreshToken: result.refreshToken,
                    } as Session);
                    console.log('Session updated with new tokens');
                } else {
                    console.warn('Token refresh returned no result');
                }
            } catch (error) {
                console.error('Failed to refresh session:', error);
            }
        }, refreshInterval);

        return () => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
                refreshTimeoutRef.current = null;
            }
        };
    }, [session, update]);

    return null;
}