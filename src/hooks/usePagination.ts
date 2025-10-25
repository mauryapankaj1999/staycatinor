"use client"
import { defaultPageIndex, defaultPageSize, pageIndex, pageSize } from "@/common/contstant";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}
export const usePagination = (
  getPaginationFromParams = true,
  pageIndexKey: string = pageIndex,
  pageSizeKey: string = pageSize,
) => {
  const searchParams = useSearchParams();

  const pagination: PaginationState = useMemo(() => {
    if (getPaginationFromParams === false) {
      return {
        pageIndex: 0,
        pageSize: 10000,
      };
    }

    let index = searchParams.get(pageIndexKey);
    let size = searchParams.get(pageSizeKey);
    return {
      pageIndex: index ? Number(index) : defaultPageIndex,
      pageSize: size ? Number(size) : defaultPageSize,
    };
  }, [searchParams, getPaginationFromParams, pageIndexKey, pageSizeKey]);

  return pagination;
};
