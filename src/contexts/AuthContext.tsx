import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from '@/types/User';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { mapIntToPermissions } from '@/utils/permissionUtils';

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isNewUser: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    fetchUserProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
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
    const [user, setUser] = useState<User | null>(null);
    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const fetchAccountData = async (): Promise<User> => {
        if (!session?.accessToken) {
            return Promise.reject('No access token');
        }

        const response = await apiService.getAccount();
        if (response.success) {
            const user = response.data as User;
            setUser(user);
            return user;
        } else {
            console.error('Failed to fetch user profile:', response.error);
            return Promise.reject('Failed to fetch user profile');
        }
    }

    const {
        data: userProfile,
        isLoading: userProfileLoading,
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

    const login = async () => {
        await signIn('google');
    };

    const logout = async () => {
        await signOut();
        queryClient.clear();
        setUser(null);
    };

    const fetchUserProfile = async () => {
        await refetch();
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading: status === 'loading' || userProfileLoading,
                isAuthenticated: !!user,
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