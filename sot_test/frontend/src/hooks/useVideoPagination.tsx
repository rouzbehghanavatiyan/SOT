import { useEffect, useState } from "react";
import { attachmentListByInviteId } from "../services/dotNet";
import usePagination from "./usePagination";

const useVideoPagination = (getInvitedId: string) => {
  const [take, setTake] = useState<number>(3); // مقدار اولیه
  const [loadedCount, setLoadedCount] = useState<number>(0); // تعداد داده‌های بارگذاری‌شده
  const { data, isLoading, hasMore, fetchNextPage } = usePagination(
    attachmentListByInviteId,
    {
      take,
      extraParams: { id: getInvitedId },
    }
  );

  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      fetchNextPage(); // بارگذاری اولیه
    }
  }, [data, isLoading, fetchNextPage]);

  useEffect(() => {
    setLoadedCount(data.length); // به‌روزرسانی تعداد بارگذاری‌شده
  }, [data]);

  const fetchMoreVideos = (currentIndex: number) => {
    if (currentIndex === loadedCount - 1 && hasMore && !isLoading) {
      setTake((prevTake) => prevTake + 3); // افزایش تعداد داده‌های بارگذاری‌شده
      fetchNextPage();
    }
  };

  return { data, isLoading, fetchMoreVideos, loadedCount };
};

export default useVideoPagination;
