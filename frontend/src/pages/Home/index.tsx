import React, { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import { Mousewheel } from "swiper/modules";
import VideoSection from "../../common/VideoSection";
import {
  RsetHomeMatch,
  setPaginationHomeMatch,
} from "../../common/Slices/main";
import { useNavigate } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import EmailIcon from "@mui/icons-material/Email";
import StringHelpers from "../../utils/helpers/StringHelper";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import VideoItemSkeleton from "../../components/VideoLoading";
import { followerAttachmentList } from "../../services/dotNet";
import LoadingChild from "../../components/Loading/LoadingChild";
import NotMatchedToVisit from "./NotMatchedToVisit";

const Home: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const main = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

  const [currentlyPlaying, setCurrentlyPlaying] = useState<{
    slideIndex: number | null;
    position: number | null;
  }>({ slideIndex: 0, position: 0 });

  const userIdLogin = main?.userLogin?.user?.id;
  const isLoadingRef = useRef(isLoading);
  const { pagination, data } = main.homeMatch;
  const paginationRef = useRef(pagination);
  const swiperRef = useRef<any>(null);

  const fetchNextPage = useCallback(async () => {
    if (isLoadingRef.current || !paginationRef.current.hasMore) return;
    try {
      setIsLoading(true);
      const res = await followerAttachmentList({
        skip: paginationRef.current.skip,
        take: paginationRef.current.take,
        userIdLogin,
      });

      const newData = res?.data || [];

      dispatch(RsetHomeMatch(newData));
      dispatch(
        setPaginationHomeMatch({
          take: paginationRef.current.take,
          skip: paginationRef.current.skip + paginationRef.current.take,
          hasMore: newData.length !== paginationRef.current.take,
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, userIdLogin]);

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    setCurrentlyPlaying({
      slideIndex: realIndex,
      position: 0,
    });

    if (
      realIndex % 3 === 0 &&
      paginationRef.current.hasMore &&
      !isLoadingRef.current
    ) {
    } else {
      console.log("No more data or still loading...");
    }
  };

  const handleVideoPlay = (
    videoId: string,
    slideIndex: number,
    position: number
  ) => {
    setOpenDropdowns({});
    setCurrentlyPlaying((prev) => {
      console.log(prev);
      if (prev.slideIndex === slideIndex && prev.position === position) {
        return { slideIndex: null, position: null };
      }
      return { slideIndex, position };
    });
  };

  const shouldVideoPlay = (slideIndex: number, position: number) => {
    return (
      currentlyPlaying.slideIndex === slideIndex &&
      currentlyPlaying.position === position
    );
  };

  const dropdownItems = (data: any, position: number, userSenderId: any) => {
    const temp = {
      sender: position === 0 ? data?.userInserted?.id : data?.userMatched?.id,
      userProfile:
        position === 0
          ? StringHelpers.getProfile(data?.profileInserted)
          : StringHelpers.getProfile(data?.profileMatched),
      userNameSender:
        position === 0
          ? data?.userInserted?.userName
          : data?.userMatched?.userName,
    };

    return [
      {
        label: "Send message",
        icon: <EmailIcon className="text-gray-800 font20" />,
        onClick: () =>
          navigate(`/privateMessage?id=${userSenderId?.id}`, {
            state: { userInfo: temp },
          }),
      },
      {
        label: "Report",
        icon: <ReportIcon className="text-gray-800 font20" />,
        onClick: () => alert("اعلان‌ها"),
      },
      {
        label: "Save",
        icon: <TurnedInNotIcon className="text-gray-800 font20" />,
        onClick: () => alert("اعلان‌ها"),
      },
      { divider: true },
    ];
  };

  useEffect(() => {
    isLoadingRef.current = isLoading;
    paginationRef.current = pagination;
  }, [isLoading, pagination]);

  useEffect(() => {
    if (data.length > 0 && !isLoading) {
      setCurrentlyPlaying({
        slideIndex: 0,
        position: 0,
      });
    }
  }, [data.length, isLoading]);

  useEffect(() => {
    if (userIdLogin && data.length === 0 && !isLoadingRef.current) {
      fetchNextPage();
    }
  }, [userIdLogin, data.length, fetchNextPage]);

 return (
  <div className="relative w-full bg-black 
    h-[calc(100dvh-92px)] 
    md:h-[calc(100dvh-100px)] 
    lg:h-[calc(100dvh-60px)] 
    shadow-card">
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
      modules={[Mousewheel]}
      className="mySwiper 
        h-[calc(100dvh-100px)]
        md:h-[calc(100dvh-100px)]
        lg:h-[calc(100dvh-70px)]
        lg:mt-9"
      onSlideChange={handleSlideChange}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      initialSlide={0}
    >
      {isLoading &&
        data.length === 0 &&
        [...Array(12)].map((_, index) => (
          <SwiperSlide
            className="h-full w-full bg-black flex flex-col"
            key={`skeleton-${index}`}
          >
            <VideoItemSkeleton section="itsHome" />
          </SwiperSlide>
        ))}
      {!isLoading && (!data || data.length === 0) && <NotMatchedToVisit />}
      {!isLoading &&
        data?.map((video: any, index: number) => {
          const resultInserted =
            video?.likeInserted > video?.likeMatched
              ? "Win"
              : video?.likeInserted < video?.likeMatched
                ? "Loss"
                : "Draw";

          const resultMatched =
            video?.likeInserted < video?.likeMatched
              ? "Win"
              : video?.likeInserted > video?.likeMatched
                ? "Loss"
                : "Draw";
          return (
            <SwiperSlide
              key={`video-${video.id || index}`}
              className="h-full w-full bg-black flex flex-col"
            >
              {/* تغییر در این بخش */}
              <section className="flex flex-col h-full min-h-0">
                <div className="flex-1 min-h-0 relative">
                  <VideoSection
                    score={video?.scoreInserted}
                    countLiked={video?.likeInserted || 0}
                    result={resultInserted}
                    video={video}
                    isPlaying={shouldVideoPlay(index, 0)}
                    onVideoPlay={() =>
                      handleVideoPlay(
                        video?.attachmentInserted?.attachmentId,
                        index,
                        0
                      )
                    }
                    dropdownItems={() =>
                      dropdownItems(video, 0, video?.userInserted)
                    }
                    setOpenDropdowns={setOpenDropdowns}
                    openDropdowns={openDropdowns}
                    baseURL={baseURL}
                    positionVideo={0}
                    isFollowed={
                      video.follows?.[video?.userInserted?.id]?.isFollowed ||
                      false
                    }
                  />
                </div>
                <div className="flex-1 min-h-0 relative">
                  <VideoSection
                    isFollowed={
                      video.follows?.[video?.userMatched?.id]?.isFollowed ||
                      false
                    }
                    score={video?.scoreMatched}
                    video={video}
                    result={resultMatched}
                    isPlaying={shouldVideoPlay(index, 1)}
                    onVideoPlay={() =>
                      handleVideoPlay(
                        video?.attachmentMatched?.attachmentId,
                        index,
                        1
                      )
                    }
                    dropdownItems={() =>
                      dropdownItems(video, 1, video?.userMatched)
                    }
                    countLiked={video?.likeMatched || 0}
                    openDropdowns={openDropdowns}
                    setOpenDropdowns={setOpenDropdowns}
                    baseURL={baseURL}
                    positionVideo={1}
                  />
                </div>
              </section>
            </SwiperSlide>
          );
        })}
    </Swiper>
    <LoadingChild ref={loadingRef} isLoading={isLoading} />
  </div>
);
};

export default Home;
