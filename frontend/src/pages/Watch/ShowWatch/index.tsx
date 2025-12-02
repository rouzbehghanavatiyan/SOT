import React, { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Mousewheel } from "swiper/modules";
import { useShowWatch } from "../../../hooks/useShowWatch";
import { LoadingSkeletons } from "../../../components/LoadingSkeletons";
import { VideoSlide } from "../../../components/VideoSlide";
import { Icon } from "../../../components/Icon";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHookType";
import { attachmentListByInviteId } from "../../../services/dotNet";
import {
  RsetShowWatch,
  setPaginationShowWatch,
} from "../../../common/Slices/main";

const ShowWatch: React.FC = () => {
  const inviteId = location?.search?.split("id=")?.[1];
  const main = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  const { data: reduxData, pagination } = main.showWatchMatch;

  const customFetchNextPage = useCallback(
    async (params: {
      skip: number;
      take: number;
      inviteId: string | undefined;
    }) => {
      if (!params.inviteId) return [];
      try {
        const res = await attachmentListByInviteId({
          skip: params.skip,
          take: params.take,
          inviteId: params.inviteId,
        });
        dispatch(RsetShowWatch(res?.data || []));
        dispatch(
          setPaginationShowWatch({
            take: params.take,
            skip: params.skip + params.take,
            hasMore: (res?.data || []).length > 0,
          })
        );

        return res?.data || [];
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
    [dispatch]
  );

  const {
    data,
    isLoading,
    openDropdowns,
    setOpenDropdowns,
    currentlyPlayingId,
    handleVideoPlay,
    toggleDropdown,
    dropdownItems,
    handleSlideChange,
    initializeSwiper,
  } = useShowWatch({
    inviteId,
    data: reduxData,
    pagination,
    customFetchNextPage,
  });

  return (
    <div className="w-full bg-black absolute top-0 bottom-12 left-0 right-0">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        onSlideChange={handleSlideChange}
        modules={[Mousewheel]}
        onInit={initializeSwiper}
        className="h-full"
      >
        {isLoading && data.length === 0 ? (
          <LoadingSkeletons />
        ) : (
          data?.map((video: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                className="h-full w-full bg-red flex flex-col"
              >
                {video?.icon && (
                  <span className="text-white opacity-50 z-40 absolute top-1/2 mt-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full border-white shadow-card">
                    <Icon name={video?.icon} className="font20 m-1" />
                  </span>
                )}
                <VideoSlide
                  endTime={true}
                  showScore={false}
                  showResult={false}
                  showLiked
                  showCountLiked={false}
                  key={index}
                  video={video}
                  index={index}
                  currentlyPlayingId={currentlyPlayingId}
                  openDropdowns={openDropdowns}
                  onVideoPlay={handleVideoPlay}
                  toggleDropdown={toggleDropdown}
                  dropdownItems={dropdownItems}
                  setOpenDropdowns={setOpenDropdowns}
                />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </div>
  );
};

export default ShowWatch;
