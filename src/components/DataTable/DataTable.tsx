'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ColumnSizingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  Settings2,
  FileX
} from 'lucide-react';
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { UsePaginatedQueryResult } from '@/hooks/usePaginatedQuery';
import { useDebounceValue } from 'usehooks-ts';
import { DataTablePagination } from './DataTablePagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  query?: UsePaginatedQueryResult<TData[], unknown>;
  pageSize?: number;
  showSearch?: boolean;
  searchPlaceholder?: string;
  showViewOptions?: boolean;
  showPagination?: boolean;
  className?: string;
  onRowClick?: (row: TData) => void;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  enableColumnResizing?: boolean;
  columnResizeMode?: 'onChange' | 'onEnd';
  customToolbar?: React.ReactNode;
  toolbarPosition?: 'above' | 'below' | 'replace';
  customFilters?: React.ReactNode;
  displayToolbar?: boolean;
  showBorders?: boolean;
}

const DataTableComponent = <TData, TValue>({
  columns,
  data = [],
  query,
  pageSize = 10,
  showSearch = true,
  searchPlaceholder = "Wyszukaj...",
  showViewOptions = true,
  showPagination = true,
  className,
  onRowClick,
  emptyMessage = "Brak wyników",
  emptyIcon,
  emptyDescription,
  emptyAction,
  enableColumnResizing = false,
  columnResizeMode = 'onChange',
  customToolbar,
  toolbarPosition = 'above',
  customFilters,
  displayToolbar = true,
  showBorders = true
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounceValue(searchValue, 500);

  const shouldEnableResizing = useMemo(() => {
    return enableColumnResizing || columns.some(col => col.enableResizing === true);
  }, [columns, enableColumnResizing]);

  const processedColumns = useMemo(() => {
    const hasResizableColumns = columns.some(col => col.enableResizing === true);
    const shouldResize = enableColumnResizing || hasResizableColumns;

    return shouldResize ? columns.map(col => ({
      ...col,
      enableResizing: col.enableResizing !== false && (enableColumnResizing || col.enableResizing === true)
    })) : columns;
  }, [columns, enableColumnResizing]);

  const initialColumnSizing = useMemo(() => {
    const sizing: ColumnSizingState = {};
    if (shouldEnableResizing) {
      processedColumns.forEach((column) => {
        if (column.id && column.size) {
          sizing[column.id] = column.size;
        }
      });
    }
    return sizing;
  }, [processedColumns, shouldEnableResizing]);

  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(initialColumnSizing);

  useEffect(() => {
    setColumnSizing(initialColumnSizing);
    setColumnVisibility({});
  }, [initialColumnSizing]);

  const isServerSide = !!query;
  const tableData = isServerSide ? (query.data || []) : data;
  const isLoading = isServerSide ? query.isLoading : false;
  const error = isServerSide ? query.error : null;

  const table = useReactTable({
    data: tableData,
    columns: processedColumns,
    state: {
      sorting: isServerSide ? [] : sorting,
      columnFilters: isServerSide ? [] : columnFilters,
      columnVisibility,
      columnSizing,
      rowSelection,
      pagination: isServerSide ? undefined : {
        pageIndex: 0,
        pageSize,
      },
      globalFilter: isServerSide ? undefined : debouncedSearchValue,
    },
    enableRowSelection: true,
    enableColumnResizing: shouldEnableResizing,
    columnResizeMode,
    onSortingChange: isServerSide ? undefined : setSorting,
    onColumnFiltersChange: isServerSide ? undefined : setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: isServerSide ? undefined : getFilteredRowModel(),
    getPaginationRowModel: isServerSide ? undefined : getPaginationRowModel(),
    getSortedRowModel: isServerSide ? undefined : getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: isServerSide,
    manualSorting: isServerSide,
    manualFiltering: isServerSide,
    pageCount: isServerSide ? (query.meta?.totalPages || -1) : undefined,
    defaultColumn: {
      size: 150,
      minSize: 50,
      maxSize: 500,
    },
  });

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
    if (!isServerSide) {
      table.setGlobalFilter(value);
    } else if (query?.actions) {
      // Debounce the server-side search manually
      const timeoutId = setTimeout(() => {
        if (value !== query.pagination.search) {
          query.actions.setSearch(value);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isServerSide, table, query]);

  const handleSort = useCallback((columnId: string) => {
    if (isServerSide && query?.actions) {
      const currentSortBy = query.pagination.sortBy;
      const currentDirection = query.pagination.sortDirection;

      if (currentSortBy === columnId) {
        if (currentDirection === 'asc') {
          query.actions.setSort(columnId, 'desc');
        } else if (currentDirection === 'desc') {
          query.actions.setSort(columnId, undefined);
        } else {
          query.actions.setSort(columnId, 'asc');
        }
      } else {
        query.actions.setSort(columnId, 'asc');
      }
    }
  }, [isServerSide, query]);

  const renderSkeletonRows = useCallback(() => {
    return Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {table.getVisibleFlatColumns().map((column, colIndex) => {
          return (
            <TableCell
              key={`skeleton-${index}-${colIndex}`}
              className={cn(
                "px-4 py-4 align-middle",
                showBorders && "border-r border-zinc-200 dark:border-zinc-700 last:border-r-0",
                shouldEnableResizing ? "overflow-hidden" : "whitespace-nowrap"
              )}
              style={shouldEnableResizing ? {
                width: column.getSize(),
                minWidth: column.getSize(),
                maxWidth: column.getSize()
              } : undefined}
            >
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-full max-w-[120px]" />
            </TableCell>
          );
        })}
      </TableRow>
    ));
  }, [table, showBorders, shouldEnableResizing]);

  const renderEmptyState = useCallback(() => {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center min-h-[300px]">
        <div className="mb-4 text-zinc-400 dark:text-zinc-500">
          {emptyIcon || <FileX className="h-12 w-12" />}
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
          {emptyMessage}
        </h3>
        {emptyDescription && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 max-w-md">
            {emptyDescription}
          </p>
        )}
        {emptyAction && (
          <div className="mt-4">
            {emptyAction}
          </div>
        )}
      </div>
    );
  }, [emptyIcon, emptyMessage, emptyDescription, emptyAction]);

  const defaultToolbar = useMemo(() => (showSearch || showViewOptions || customFilters) && (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-3 py-3 sm:px-4 sm:py-3 bg-zinc-50/30 dark:bg-zinc-800/20 border-b border-zinc-200 dark:border-zinc-700">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center flex-1">
        {showSearch && (
          <div className="flex-1 max-w-full sm:max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 pointer-events-none z-1" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 h-9 w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}
      </div>
      {customFilters && (
        <div className="flex flex-wrap gap-2">
          {customFilters}
        </div>
      )}
      {showViewOptions && (
        <div className="flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Settings2 className="h-4 w-4" />
                <span>Kolumny</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== 'undefined' && column.getCanHide()
                )
                .map((column, index) => {
                  const isFirstColumn = index === 0;
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      disabled={isFirstColumn}
                      onCheckedChange={(value) => {
                        if (!isFirstColumn) {
                          column.toggleVisibility(!!value);
                        }
                      }}
                    >
                      {column.columnDef.header as string}
                      {isFirstColumn && (
                        <span className="ml-2 text-xs text-zinc-400">(wymagane)</span>
                      )}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  ), [showSearch, showViewOptions, customFilters, searchPlaceholder, searchValue, handleSearch, table]);

  const renderToolbar = useCallback(() => {
    if (toolbarPosition === 'replace' && customToolbar) {
      return (
        <div className="px-5 py-4 sm:px-6 sm:py-5 bg-zinc-50/30 dark:bg-zinc-800/20 border-b border-zinc-200 dark:border-zinc-700">
          {customToolbar}
        </div>
      )
    }

    return (
      <>
        {toolbarPosition === 'above' && customToolbar && (
          <div className="px-5 py-4 sm:px-6 sm:py-5 bg-zinc-50/30 dark:bg-zinc-800/20 border-b border-zinc-200 dark:border-zinc-700">
            {customToolbar}
          </div>
        )}
        {defaultToolbar}
        {toolbarPosition === 'below' && customToolbar && (
          <div className="px-5 py-4 sm:px-6 sm:py-5 bg-zinc-50/30 dark:bg-zinc-800/20 border-b border-zinc-200 dark:border-zinc-700">
            {customToolbar}
          </div>
        )}
      </>
    );
  }, [toolbarPosition, customToolbar, defaultToolbar]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-500 dark:text-zinc-400 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <div className="text-center">
          <p className="text-lg font-medium">Błąd ładowania danych</p>
          <p className="text-sm mt-2">Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.</p>
        </div>
      </div>
    );
  }

  const hasNoData = !isLoading && table.getRowModel().rows?.length === 0;

  return (
    <div className={cn("space-y-0", className)}>
      <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
        {displayToolbar && renderToolbar()}

        {hasNoData ? (
          renderEmptyState()
        ) : (
          <>
            <div className="w-full overflow-x-auto overscroll-x-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              <TableComponent
                className="w-full min-table-width"
                style={shouldEnableResizing ? {
                  width: table.getCenterTotalSize(),
                  minWidth: '100%',
                  tableLayout: 'fixed'
                } : {
                  width: '100%',
                  tableLayout: 'auto'
                }}
              >
                <TableHeader className="bg-zinc-50/50 dark:bg-zinc-800/30">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className={cn(
                      "hover:bg-transparent",
                      showBorders && "border-b border-zinc-200 dark:border-zinc-700"
                    )}>
                      {headerGroup.headers.map((header) => {
                        const canSort = header.column.getCanSort();
                        const canResize = header.column.getCanResize();

                        const isSorted = isServerSide
                          ? query?.pagination.sortBy === header.column.id
                          : header.column.getIsSorted();

                        const sortDirection = isServerSide
                          ? (isSorted ? query?.pagination.sortDirection : false)
                          : header.column.getIsSorted();

                        return (
                          <TableHead
                            key={header.id}
                            className={cn(
                              "h-11 px-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30 whitespace-nowrap relative",
                              showBorders && "border-r border-zinc-200 dark:border-zinc-700 last:border-r-0",
                              canSort && "cursor-pointer select-none hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors",
                              shouldEnableResizing && "overflow-hidden"
                            )}
                            style={shouldEnableResizing ? {
                              width: header.getSize(),
                              minWidth: header.getSize(),
                              maxWidth: header.getSize()
                            } : undefined}
                            onClick={() => {
                              if (canSort) {
                                if (isServerSide) {
                                  handleSort(header.column.id);
                                } else {
                                  header.column.toggleSorting();
                                }
                              }
                            }}
                          >
                            {header.isPlaceholder ? null : (
                              <div className="flex items-center gap-2">
                                <span className="font-medium first-letter:uppercase">
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </span>
                                {canSort && (
                                  <div className="flex-shrink-0 ml-auto">
                                    {isSorted ? (
                                      sortDirection === 'asc' || sortDirection === false ? (
                                        <ChevronUp className="h-4 w-4" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4" />
                                      )
                                    ) : (
                                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                            {canResize && shouldEnableResizing && (
                              <div
                                {...{
                                  onMouseDown: header.getResizeHandler(),
                                  onTouchStart: header.getResizeHandler(),
                                  className: cn(
                                    "absolute top-0 right-0 h-full w-2 cursor-col-resize select-none touch-none group",
                                    "hover:bg-blue-500/20 active:bg-blue-500/30",
                                    header.column.getIsResizing() && "bg-blue-500/30"
                                  ),
                                  style: {
                                    transform: columnResizeMode === 'onEnd' && header.column.getIsResizing()
                                      ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                                      : '',
                                  },
                                }}
                              >
                                <div className={cn(
                                  "absolute top-0 right-0 h-full w-0.5 bg-zinc-300 dark:bg-zinc-600",
                                  "group-hover:bg-blue-500 transition-colors",
                                  header.column.getIsResizing() && "bg-blue-500"
                                )} />
                              </div>
                            )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    renderSkeletonRows()
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        onClick={() => onRowClick?.(row.original)}
                        className={cn(
                          "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors",
                          showBorders && "border-b border-zinc-100 dark:border-zinc-800 last:border-b-0",
                          onRowClick && "cursor-pointer active:bg-zinc-100 dark:active:bg-zinc-700"
                        )}
                      >
                        {row.getVisibleCells().map((cell) => {
                          const cellMeta = cell.column.columnDef.meta as {
                            className?: string;
                            noTruncate?: boolean;
                          } | undefined;

                          const shouldTruncate = !cellMeta?.noTruncate;

                          return (
                            <TableCell
                              key={cell.id}
                              className={cn(
                                "mx-4 px-4 py-4 text-sm text-zinc-900 dark:text-zinc-100 align-middle",
                                showBorders && "border-r border-zinc-200 dark:border-zinc-700 last:border-r-0",
                                shouldTruncate && "truncate",
                                shouldEnableResizing ? "overflow-hidden" : (shouldTruncate ? "whitespace-nowrap" : ""),
                                cellMeta?.className
                              )}
                              style={{
                                width: cell.column.getSize(),
                                minWidth: cell.column.getSize(),
                                maxWidth: cell.column.getSize()
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </TableComponent>
            </div>

            {showPagination && (
              <DataTablePagination table={table} query={query} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

DataTableComponent.displayName = 'DataTable';

export const DataTable = DataTableComponent;