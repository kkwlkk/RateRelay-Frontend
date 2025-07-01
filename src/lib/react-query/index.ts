import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: 0,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
        mutations: {
            retry: 0,
        },
    },
});