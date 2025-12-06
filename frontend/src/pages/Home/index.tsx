import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import { Mousewheel } from "swiper/modules";
import LoadingChild from "../../components/Loading/LoadingChild";
import { useShowWatch } from "../../hooks/useShowWatch";
import { VideoSlide } from "../../components/VideoSlide";
import { followerAttachmentList } from "../../services/dotNet";
import {
  RsetHomeMatch,
  setPaginationHomeMatch,
} from "../../common/Slices/main";

const Home: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const main = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const { pagination, data: reduxData } = main.homeMatch;
  const userIdLogin = main?.userLogin?.user?.id;

  const customFetchNextPage = useCallback(
    async (params: {
      skip: number;
      take: number;
      inviteId: string | undefined;
    }) => {
      if (!params.inviteId) return [];
      try {
        const res = await followerAttachmentList({
          skip: params.skip,
          take: params.take,
          userIdLogin,
        });
        dispatch(RsetHomeMatch(res?.data || []));
        dispatch(
          setPaginationHomeMatch({
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
    [dispatch, userIdLogin]
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
    inviteId: userIdLogin,
    data: reduxData,
    pagination,
    customFetchNextPage,
  });

  return (
    <div className="relative w-full bg-black mt-0 flex flex-col h-[calc(100svh-98px)] md:h-[calc(100vh-65px)]">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        onSlideChange={handleSlideChange}
        modules={[Mousewheel]}
        onInit={initializeSwiper}
        className="mySwiper w-full h-full"
      >
        {!isLoading &&
          data?.map((video: any, index: number) => {
            return (
              <SwiperSlide key={`video-${video.id || index}`}>
                <VideoSlide
                  showLiked={false}
                  endTime={false}
                  showScore={true}
                  showResult={true}
                  showCountLiked={true}
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
          })}
      </Swiper>
      <LoadingChild ref={loadingRef} isLoading={isLoading} />
    </div>
  );
};

export default Home;
