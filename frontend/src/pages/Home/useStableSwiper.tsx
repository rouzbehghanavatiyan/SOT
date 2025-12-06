import { useCallback, useRef, useState } from "react";

export const useStableSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const dataRef = useRef<any[]>([]);

  const setSwiperInstance = useCallback((swiper: any) => {
    swiperRef.current = swiper;
  }, []);

  const handleSlideChange = useCallback(() => {
    if (swiperRef.current) {
      const realIndex = swiperRef.current.realIndex;
      setActiveIndex(realIndex);
    }
  }, []);

  const updateData = useCallback((newData: any[]) => {
    dataRef.current = newData;
  }, []);

  return {
    activeIndex,
    setSwiperInstance,
    handleSlideChange,
    updateData,
    getData: () => dataRef.current,
    swiperInstance: swiperRef.current,
  };
};