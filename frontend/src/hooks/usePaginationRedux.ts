import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHookType";
import {
  fetchPaginationData,
  resetPagination,
  setTake,
} from "../common/Slices/pagination";

interface UseReduxPaginationParams {
  service: (params: Record<string, any>) => Promise<any>; // تابع سرویس داینامیک
  extraParams?: Record<string, any>; // پارامترهای اضافی
}

const useReduxPagination = ({
  service,
  extraParams = {},
}: UseReduxPaginationParams) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, hasMore, skip, take, error } = useAppSelector(
    (state) => state.pagination
  );
  // دریافت صفحه بعدی
  const fetchNextPage = useCallback(() => {
    console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
    
    if (isLoading || !hasMore) return;
    dispatch(fetchPaginationData({ service, skip, take, extraParams }));
  }, [dispatch, service, skip, take, extraParams, isLoading, hasMore]);

  // بازنشانی صفحه‌بندی
  const resetPaginationState = useCallback(() => {
    dispatch(resetPagination());
  }, [dispatch]);

  // تنظیم تعداد آیتم‌ها در هر صفحه
  const setPaginationTake = useCallback(
    (newTake: number) => {
      dispatch(setTake(newTake));
    },
    [dispatch]
  );

  return {
    data,
    isLoading,
    hasMore,
    fetchNextPage,
    resetPagination: resetPaginationState,
    setTake: setPaginationTake,
    error,
  };
};

export default useReduxPagination;
