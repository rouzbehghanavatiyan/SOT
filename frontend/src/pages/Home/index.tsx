import React, { useCallback, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel } from "swiper/modules";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import { useShowWatch } from "../../hooks/useShowWatch";
import { VideoSlide } from "../../components/VideoSlide";
import LoadingChild from "../../components/Loading/LoadingChild";
import { followerAttachmentList } from "../../services/dotNet";
import {
  RsetHomeMatch,
  setPaginationHomeMatch,
} from "../../common/Slices/main";

const Home: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const hasFetchedOnce = useRef(false);
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
        hasFetchedOnce.current = true;
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
        hasFetchedOnce.current = true;
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

  const showEmptyState = hasFetchedOnce.current && (!data || data.length === 0);

  return (
    <div className="relative w-full bg-white mt-0 flex flex-col h-[calc(100svh-98px)] md:h-[calc(100vh-95px)] lg:h-[calc(100vh-65px)]">
      {showEmptyState ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-black p-4">
          <div className="max-w-md">
            <h3 className="font20 font-bold mb-3">"No Content Available"</h3>
            <p className="text-gray-300">
              Dear user, there are no followers available to view at the moment.
              Please visit the Watch page to connect with more users!
            </p>
            <Link
              to="/watch"
              className="mt-10 items-center flex justify-center py-3 bg-gradient-primary rounded-lg font-medium text-white transition-colors"
            >
              Go to Watch Page
              <ArrowForwardIcon className="font30 ms-2" />
            </Link>
          </div>
        </div>
      ) : (
        <Swiper
          direction="vertical"
          slidesPerView={1}
          mousewheel
          onSlideChange={handleSlideChange}
          modules={[Mousewheel]}
          onInit={initializeSwiper}
          className="mySwiper w-full h-full"
        >
          {data?.map((video: any, index: number) => (
            <SwiperSlide key={`video-${video.id || index}`}>
              <VideoSlide
                showLiked={false}
                endTime={false}
                showScore
                showResult
                showCountLiked
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
          ))}
        </Swiper>
      )}

      {isLoading && <LoadingChild ref={loadingRef} isLoading />}
    </div>
  );
};

export default Home;
