import React from "react";
import { SwiperSlide } from "swiper/react";

const NotMatchedToVisit: React.FC<any> = () => {
  return (
    <SwiperSlide className="h-full w-full bg-black flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-2xl font-semibold mb-2">
            Nothing to watch yet
          </div>
          <div className="text-gray-400">
            There's no content available at the moment
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
};

export default NotMatchedToVisit;
