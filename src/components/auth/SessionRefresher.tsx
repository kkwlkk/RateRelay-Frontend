'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { refreshAccessToken } from '@/utils/refreshToken';
import type { Session } from 'next-auth';
import { useInterval } from 'usehooks-ts'

export function SessionRefresher() {
    const { data: session, update } = useSession();

    useEffect(() => {
        if (session?.accessToken) {
            console.log(
                'Session updated, current token:',
                session.accessToken.substring(0, 10) + '...'
            );
        }
    }, [session?.accessToken]);

    const refreshInterval = 30 * 1000 * 60;

    useInterval(async () => {
        if (!session) return;

        try {
            console.log('Attempting to refresh token...');
            const result = await refreshAccessToken();

            if (result && update) {
                console.log('Received new tokens, updating session...');

                const updatedSession = {
                    ...session,
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                } as Session;

                await update(updatedSession);
                console.log('Session updated with new tokens');
            } else {
                console.warn('Token refresh returned no result');
            }
        } catch (error) {
            console.error('Failed to refresh session:', error);
        }
    }, session ? refreshInterval : null);

    return null;
}