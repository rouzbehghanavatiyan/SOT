import { useState, useCallback } from "react";

interface PaginationParams {
  take: number;
  extraParams?: Record<string, any>;
}

interface PaginationResult {
  data: any[];
  isLoading: boolean;
  hasMore: boolean;
  fetchNextPage: () => void;
  resetPagination: () => void;
}

const usePagination = (
  fetchService: (params: { skip: number; take: number }) => Promise<any>,
  { take, extraParams = {} }: PaginationParams
): PaginationResult => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const fetchNextPage = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await fetchService({ skip, take, ...extraParams });
      const newData = response?.data || [];
      console.log(newData);
 
      setData((prev) => [...prev, ...newData]);
      setSkip((prev) => prev + take);
      if (newData.length < take) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching pagination data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [skip, take, isLoading, hasMore, fetchService]);

  const resetPagination = useCallback(() => {
    setData([]);
    setSkip(0);
    setHasMore(true);
  }, []);

  return {
    data,
    isLoading,
    hasMore,
    fetchNextPage,
    resetPagination,
  };
};

export default usePagination;
