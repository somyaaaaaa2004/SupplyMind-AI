import { useState } from "react";

import type { PaginationParams } from "@/types";

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  initialSort?: string;
  initialOrder?: "asc" | "desc";
}

interface UsePaginationReturn extends Required<PaginationParams> {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSort: (sort: string, order?: "asc" | "desc") => void;
  setSearch: (search: string) => void;
  reset: () => void;
}

/**
 * Centralised pagination state for list pages.
 * Keeps page, limit, sort, order, and search in sync.
 */
export function usePagination({
  initialPage = 1,
  initialLimit = 20,
  initialSort = "createdAt",
  initialOrder = "desc",
}: UsePaginationOptions = {}): UsePaginationReturn {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sort, setSort] = useState(initialSort);
  const [order, setOrder] = useState<"asc" | "desc">(initialOrder);
  const [search, setSearch] = useState("");

  const handleSetSort = (newSort: string, newOrder: "asc" | "desc" = "asc") => {
    setSort(newSort);
    setOrder(newOrder);
    setPage(1); // reset to first page on sort change
  };

  const handleSetSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const reset = () => {
    setPage(initialPage);
    setLimit(initialLimit);
    setSort(initialSort);
    setOrder(initialOrder);
    setSearch("");
  };

  return {
    page,
    limit,
    sort,
    order,
    search,
    setPage,
    setLimit,
    setSort: handleSetSort,
    setSearch: handleSetSearch,
    reset,
  };
}
