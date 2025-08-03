import { apiService, PagedRequest } from "@/services/api";
import { AdminGetUsersDto, AdminGetUsersFiltersDto } from "@/types/dtos/AdminUsers";
import { Users, Search, Filter, Check } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface UserSelectorProps {
    onUserSelect?: (user: AdminGetUsersDto | null) => void;
    selectedUserId?: number | null;
    placeholder?: string;
    searchInputPlaceholder?: string;
    className?: string;
}

const UserSelector: React.FC<UserSelectorProps> = ({
    onUserSelect,
    selectedUserId = null,
    placeholder = "Wybierz użytkownika...",
    searchInputPlaceholder = "Wyszukaj użytkowników...",
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [isVerifiedFilter, setIsVerifiedFilter] = useState<boolean | null>(null);
    const [selectedUser, setSelectedUser] = useState<AdminGetUsersDto | null>(null);

    const scrollRef = useRef(null);
    const searchInputRef = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setDebouncedSearchQuery(query);
        }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(searchQuery);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchQuery, debouncedSearch]);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery<
        { users: AdminGetUsersDto[]; pagination: { hasNextPage: boolean }; currentPage: number },
        Error,
        { pages: { users: AdminGetUsersDto[]; pagination: { hasNextPage: boolean }; currentPage: number }[] },
        string[],
        number
    >({
        queryKey: ['users', debouncedSearchQuery, isVerifiedFilter?.toString() ?? 'null'],
        queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
            const requestParams: PagedRequest<AdminGetUsersFiltersDto> = {
                page: pageParam,
                pageSize: 20,
                sortBy: 'displayName',
                sortDirection: 'asc' as const,
                search: debouncedSearchQuery.trim() || undefined,
                filters: isVerifiedFilter !== null ? { isVerified: isVerifiedFilter } : undefined,
            };

            const result = await apiService.getAllUsers(requestParams);

            if (!result.success || !result.data) {
                throw new Error(result.error?.message || 'Wystąpił błąd podczas pobierania użytkowników');
            }

            return {
                users: result.data,
                pagination: {
                    hasNextPage: result.pagination?.hasNextPage ?? false
                },
                currentPage: pageParam
            };
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pagination?.hasNextPage ? (lastPage.currentPage + 1) : undefined;
        },
        initialPageParam: 1,
        enabled: isOpen,
        staleTime: 30000,
        gcTime: 300000,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const users = data?.pages.flatMap(page => page.users) ?? [];

    useEffect(() => {
        if (selectedUserId && users.length > 0) {
            const user = users.find(u => u.id === selectedUserId);
            if (user) {
                setSelectedUser(user);
            }
        }
    }, [selectedUserId, users]);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;

        if (scrollHeight - scrollTop <= clientHeight + 100 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleUserSelect = (user: AdminGetUsersDto) => {
        setSelectedUser(user);
        setIsOpen(false);
        onUserSelect?.(user);
    };

    const clearFilters = () => {
        setIsVerifiedFilter(null);
        setSearchQuery('');
        setDebouncedSearchQuery('');
        debouncedSearch.cancel();
    };

    const getUserDisplayText = (user: AdminGetUsersDto) => {
        if (user.username) return user.username;
        return `User #${user.id}`;
    };

    const formatDate = (date: Date) => {
        return dayjs(date).format('DD.MM.YYYY');
    }

    const getUserSecondaryText = (user: AdminGetUsersDto) => {
        const parts = [];
        if (user.email) parts.push(user.email);
        if (user.dateCreatedUtc) {
            parts.push(formatDate(user.dateCreatedUtc));
        }
        return parts.join(' • ');
    };

    return (
        <div className={cn("relative w-full", className)}>
            <div
                className="flex items-center justify-between w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-input/30"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center flex-1 min-w-0">
                    <Users className="w-4 h-4 mr-2 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                    <span className="truncate text-zinc-900 dark:text-zinc-100">
                        {selectedUser ? getUserDisplayText(selectedUser) : (
                            <span className="text-zinc-500 dark:text-zinc-400">{placeholder}</span>
                        )}
                    </span>
                </div>
                <div className="flex items-center ml-2">
                    {selectedUser && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(null);
                                onUserSelect?.(null);
                            }}
                            className="mr-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            ✕
                        </button>
                    )}
                    <svg
                        className={`w-4 h-4 transition-transform text-zinc-400 dark:text-zinc-500 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute z-20 w-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg">
                        <div className="p-3 border-b border-zinc-200 dark:border-zinc-700">
                            <div className="relative mb-3">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder={searchInputPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                                    autoFocus
                                />
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex items-center gap-1">
                                    <Filter className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Filtry:</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsVerifiedFilter(isVerifiedFilter === true ? null : true)}
                                    className={`px-2 py-1 text-xs rounded-full border transition-colors ${isVerifiedFilter === true
                                        ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-600 text-green-800 dark:text-green-300'
                                        : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                        }`}
                                >
                                    Zweryfikowani
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsVerifiedFilter(isVerifiedFilter === false ? null : false)}
                                    className={`px-2 py-1 text-xs rounded-full border transition-colors ${isVerifiedFilter === false
                                        ? 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-600 text-red-800 dark:text-red-300'
                                        : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                        }`}
                                >
                                    Niezweryfikowani
                                </button>

                                {(isVerifiedFilter !== null || searchQuery) && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                                    >
                                        Wyczyść filtry
                                    </button>
                                )}
                            </div>
                        </div>

                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="max-h-64 overflow-y-auto"
                        >
                            {error && (
                                <div className="px-3 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20">
                                    Wystąpił błąd podczas ładowania użytkowników. Spróbuj ponownie później.
                                </div>
                            )}

                            {users.length === 0 && !isLoading && !error && (
                                <div className="px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400 text-center">
                                    Nie znaleziono użytkowników
                                </div>
                            )}

                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserSelect(user)}
                                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                                {getUserDisplayText(user)}
                                            </span>
                                            {user.isVerified && (
                                                <div className="ml-2 w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-2.5 h-2.5 text-green-600 dark:text-green-400" />
                                                </div>
                                            )}
                                        </div>
                                        {getUserSecondaryText(user) && (
                                            <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                                {getUserSecondaryText(user)}
                                            </div>
                                        )}
                                    </div>
                                    {selectedUser?.id === user.id && (
                                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                    )}
                                </div>
                            ))}

                            {(isLoading || isFetching) && (
                                <div className="px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400 text-center">
                                    <div className="animate-spin w-4 h-4 border-2 border-zinc-300 dark:border-zinc-600 border-t-blue-600 dark:border-t-blue-400 rounded-full mx-auto"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserSelector;