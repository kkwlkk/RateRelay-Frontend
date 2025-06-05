import { UsePaginatedQueryResult } from "@/hooks/usePaginatedQuery";
import { Table } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    query?: UsePaginatedQueryResult<TData[], unknown>;
    showPageSize?: boolean;
}

export const DataTablePagination = <TData,>({
    table,
    query,
    showPageSize = true
}: DataTablePaginationProps<TData>) => {
    const meta = query?.meta;
    const actions = query?.actions;
    const isServerSide = !!query;

    const currentPage = isServerSide ? (meta?.currentPage || 1) : table.getState().pagination.pageIndex + 1;
    const pageSize = isServerSide ? (meta?.pageSize || 10) : table.getState().pagination.pageSize;
    const totalPages = isServerSide ? (meta?.totalPages || 1) : table.getPageCount();
    const totalRows = isServerSide ? (meta?.totalCount || 0) : table.getFilteredRowModel().rows.length;

    const canPreviousPage = isServerSide ? (meta?.hasPreviousPage || false) : table.getCanPreviousPage();
    const canNextPage = isServerSide ? (meta?.hasNextPage || false) : table.getCanNextPage();

    const handlePageChange = (page: number) => {
        if (isServerSide) {
            actions?.setPage(page);
        } else {
            table.setPageIndex(page - 1);
        }
    };

    const handlePageSizeChange = (size: string) => {
        const newSize = Number(size);
        if (isServerSide) {
            actions?.setPageSize(newSize);
            actions?.invalidateAll?.();
        } else {
            table.setPageSize(newSize);
        }
    };

    const from = totalRows > 0 ? ((currentPage - 1) * pageSize) + 1 : 0;
    const to = Math.min(currentPage * pageSize, totalRows);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-700 overflow-x-auto overscroll-x-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex justify-between sm:items-center gap-4 order-1 sm:order-2">
                {showPageSize && (
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                            Wierszy na stronę:
                        </label>
                        <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                            <SelectTrigger className="w-min !h-7 border-zinc-300 dark:border-zinc-700/75 dark:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 10, 20, 30, 50].map((size) => (
                                    <SelectItem key={size} value={size.toString()}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="font-medium">
                        {totalRows > 0 ? (
                            <>Wyniki: <span className="text-zinc-800 dark:text-zinc-200/75 font-semibold">{from}-{to}</span> z <span className="text-zinc-800 dark:text-zinc-200/75 font-semibold">{totalRows.toLocaleString()}</span></>
                        ) : (
                            <span className="text-zinc-500 dark:text-zinc-400 italic">Brak wyników</span>
                        )}
                    </span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 order-1 sm:order-2 w-full sm:w-auto">
                <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Strona {currentPage} z {totalPages}
                </div>

                <div className="flex items-center gap-1 w-full sm:w-auto justify-between">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(1)}
                        disabled={!canPreviousPage}
                        className="h-9 w-full sm:w-9 p-0 border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
                        title="Pierwsza strona"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!canPreviousPage}
                        className="h-9 w-full sm:w-9 p-0 border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
                        title="Poprzednia strona"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex sm:hidden items-center gap-2 mx-2 text-sm text-zinc-600 dark:text-zinc-400 min-w-[4rem] justify-center">
                        <span className="text-center font-semibold text-zinc-800 dark:text-zinc-200/75 px-2 py-1 rounded-md">
                            {currentPage} z {totalPages}
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!canNextPage}
                        className="h-9 w-full sm:w-9 p-0 border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
                        title="Następna strona"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={!canNextPage}
                        className="h-9 w-full sm:w-9 p-0 border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
                        title="Ostatnia strona"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}