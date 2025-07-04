'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/User';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { mapIntToPermissions } from '@/utils/permissionUtils';
import { getCookie } from 'cookies-next';

type AuthContextType = {
    user: User | null;
    error?: string;
    isLoading: boolean;
    isAuthenticated: boolean;
    isNewUser: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    fetchUserProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    error: undefined,
    isLoading: true,
    isAuthenticated: false,
    isNewUser: false,
    login: async () => { },
    logout: async () => { },
    fetchUserProfile: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const pendingReferralCode = getCookie('pendingReferralCode');
    const queryClient = useQueryClient();

    const fetchAccountData = async (): Promise<User> => {
        if (!session?.accessToken) {
            return Promise.reject('No access token');
        }

        const response = await apiService.getAccount();
        if (response.success) {
            const user = response.data as User;
            return user;
        } else {
            console.error('Failed to fetch user profile:', response.error);
            return Promise.reject('Failed to fetch user profile');
        }
    }

    const {
        data: userProfile,
        isLoading: userProfileLoading,
        isError: userProfileError,
        refetch
    } = useQuery({
        queryKey: ['userProfile', session?.accessToken],
        queryFn: fetchAccountData,
        enabled: !!session?.accessToken && status === 'authenticated',
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1
    })

    useEffect(() => {
        if (userProfile) {
            const permissions = mapIntToPermissions(userProfile.permissions);
            setUser({
                ...userProfile,
                mappedPermissions: permissions
            });
        }
    }, [userProfile]);

    useEffect(() => {
        if (session?.isNewUser) {
            setIsNewUser(true);
        }
    }, [session]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            setUser(null);
            setIsNewUser(false);
        }
    }, [status]);

    useEffect(() => {
        if (
            status === 'authenticated' &&
            session?.accessToken &&
            userProfileError &&
            !userProfileLoading
        ) {
            console.warn('Session valid but failed to fetch user profile, redirecting to login');
            router.push('/login');
        }
    }, [status, session?.accessToken, userProfileError, userProfileLoading, router]);

    const login = async () => {
        signIn('google', {
            callbackUrl: '/dashboard'
        }, {
            referralCode: pendingReferralCode
        });
    };

    const logout = async () => {
        await signOut();
        queryClient.clear();
        setUser(null);
        setIsNewUser(false);
    };

    const fetchUserProfile = async () => {
        await refetch();
    }

    const isSessionLoading = status === 'loading';
    const hasValidSession = status === 'authenticated' && !!session?.accessToken;
    const isLoadingUserProfile = hasValidSession && userProfileLoading;

    const isLoading = isSessionLoading || isLoadingUserProfile;

    const isAuthenticated = hasValidSession && !userProfileError && (!!user || userProfileLoading);

    return (
        <AuthContext.Provider
            value={{
                user,
                error: session?.error,
                isLoading,
                isAuthenticated,
                isNewUser,
                login,
                logout,
                fetchUserProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};