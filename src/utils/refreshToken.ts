import { apiService } from '@/services/api';
import { getSession, signOut } from 'next-auth/react';

type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

let refreshPromise: Promise<RefreshTokenResponse | null> | null = null;

export async function refreshAccessToken(providedRefreshToken?: string): Promise<RefreshTokenResponse | null> {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            let refreshToken = providedRefreshToken;

            if (!refreshToken) {
                const session = await getSession();
                if (!session?.refreshToken) {
                    await signOut({ redirect: false });
                    return null;
                }
                refreshToken = session.refreshToken;
            }

            const response = await apiService.refreshToken(refreshToken);

            if (!response.success) {
                await signOut({ redirect: false });
                return null;
            }

            if (response.error) {
                console.error('Error refreshing token:', response.error);
                await signOut({ redirect: false });
                return null;
            }

            return {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
            await signOut({ redirect: false });
            return null;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}