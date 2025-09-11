import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHookType";
import {
  fetchPaginationData,
  resetPagination,
} from "../common/Slices/pagination";

interface UseReduxPaginationParams {
  take: number;
  extraParams?: Record<string, any>;
}

const useReduxPagination = ({
  take,
  extraParams = {},
}: UseReduxPaginationParams) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, hasMore, skip, error } = useAppSelector(
    (state) => state.pagination
  );

  const fetchNextPage = useCallback(() => {
    if (isLoading || !hasMore) return;
    dispatch(fetchPaginationData({ skip, take, extraParams }));
  }, [dispatch, skip, take, extraParams, isLoading, hasMore]);

  // بازنشانی Pagination
  const resetPaginationState = useCallback(() => {
    dispatch(resetPagination());
  }, [dispatch]);

  return {
    data,
    isLoading,
    hasMore,
    fetchNextPage,
    resetPagination: resetPaginationState,
    error,
  };
};

export default useReduxPagination;
