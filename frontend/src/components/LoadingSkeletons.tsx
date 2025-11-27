import React from "react";
import { SwiperSlide } from "swiper/react";
import VideoItemSkeleton from "./VideoLoading";

interface LoadingSkeletonsProps {
  count?: number;
}

export const LoadingSkeletons: React.FC<LoadingSkeletonsProps> = ({
  count = 12,
}) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <SwiperSlide
          className="h-full w-full bg-black flex flex-col"
          key={index}
        >
          <VideoItemSkeleton section="itsShowWatch" />
        </SwiperSlide>
      ))}
    </>
  );
};
