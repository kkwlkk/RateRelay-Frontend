import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Filter, Users, Shield, Star } from "lucide-react";
import UserSelector from "@/components/AdminUserSelector";
import { AdminBusinessFilterDto } from "@/types/dtos/AdminBusinesses";
import { AdminGetUsersDto } from "@/types/dtos/AdminUsers";

interface AdminBusinessFiltersProps {
    onFiltersChange: (filters: Partial<AdminBusinessFilterDto>) => void;
    canViewAllUsers?: boolean;
}

export const AdminBusinessFilters = ({
    onFiltersChange,
    canViewAllUsers = false
}: AdminBusinessFiltersProps) => {
    const [localFilters, setLocalFilters] = useState<Partial<AdminBusinessFilterDto>>({});

    const handleFilterChange = (key: keyof AdminBusinessFilterDto, value: unknown) => {
        const newFilters = {
            ...localFilters,
            [key]: value === "all" || value === null || value === 0 ? undefined : value
        };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleOwnerSelect = (user: AdminGetUsersDto | null) => {
        handleFilterChange('ownerId' as keyof AdminBusinessFilterDto, user?.id || null);
    };

    const clearFilters = () => {
        setLocalFilters({});
        onFiltersChange({});
    };

    const activeFiltersCount = Object.values(localFilters).filter(v => v !== undefined && v !== "").length;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <Filter className="w-4 h-4" />
                Filtry wyszukiwania
                {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                        {activeFiltersCount}
                    </Badge>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {canViewAllUsers && (
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Właściciel
                        </label>
                        <UserSelector
                            selectedUserId={localFilters.ownerId || null}
                            onUserSelect={handleOwnerSelect}
                            placeholder="Wybierz właściciela..."
                            className="w-full"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Min. recenzje
                    </label>
                    <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        value={localFilters.minReviews || ""}
                        onChange={(e) => handleFilterChange('minReviews', e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Max. recenzje
                    </label>
                    <Input
                        type="number"
                        placeholder="∞"
                        min="0"
                        value={localFilters.maxReviews || ""}
                        onChange={(e) => handleFilterChange('maxReviews', e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Status weryfikacji
                    </label>
                    <Select
                        value={localFilters.isVerified?.toString() || "all"}
                        onValueChange={(value) => handleFilterChange('isVerified', value === "all" ? undefined : value === "true")}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Wszystkie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Wszystkie</SelectItem>
                            <SelectItem value="true">Zweryfikowane</SelectItem>
                            <SelectItem value="false">Niezweryfikowane</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {activeFiltersCount > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="flex flex-wrap gap-2">
                        {(localFilters as Partial<AdminBusinessFilterDto>).ownerId && (
                            <Badge variant="outline" className="text-xs">
                                Właściciel wybrany
                            </Badge>
                        )}
                        {localFilters.isVerified !== undefined && (
                            <Badge variant="outline" className="text-xs">
                                {localFilters.isVerified ? "Zweryfikowane" : "Niezweryfikowane"}
                            </Badge>
                        )}
                        {localFilters.minReviews && (
                            <Badge variant="outline" className="text-xs">
                                Min: {localFilters.minReviews} recenzji
                            </Badge>
                        )}
                        {localFilters.maxReviews && (
                            <Badge variant="outline" className="text-xs">
                                Max: {localFilters.maxReviews} recenzji
                            </Badge>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs"
                    >
                        <X className="w-3 h-3 mr-1" />
                        Wyczyść filtry
                    </Button>
                </div>
            )}
        </div>
    );
};