import React from "react";
import VideoItemSkeleton from ".";
import { SwiperSlide } from "swiper/react";

const VideoSkeleton: React.FC<{
  count: number;
  section: string;
  isSwapper: boolean;
}> = ({ count, section, isSwapper }) => {
  if (isSwapper) {
    return (
      <>
        {[...Array(count)].map((_, index) => (
          <SwiperSlide
            className="h-full w-full bg-black flex flex-col"
            key={index}
          >
            <VideoItemSkeleton section="itsHome" />
          </SwiperSlide>
        ))}
      </>
    );
  } else {
    return (
      <>
        {[...Array(count)].map((_, index) => (
          <div key={index} className="col-span-1">
            <VideoItemSkeleton section={section} />
          </div>
        ))}
      </>
    );
  }
};

export default VideoSkeleton;
