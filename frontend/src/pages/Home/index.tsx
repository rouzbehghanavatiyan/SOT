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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

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
          take: paginationRef.current.take, // take ثابت می‌ماند
          skip: paginationRef.current.skip + paginationRef.current.take, // skip افزایش می‌یابد
          hasMore: newData.length === paginationRef.current.take, // اگر تعداد داده‌ها برابر take بود، داده بیشتری داریم
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

    // منطق جدید: هر ۳ اسلاید داده جدید لود شود
    const currentDataLength = data.length;
    const shouldLoadMore = 
      realIndex >= currentDataLength - 3 && // وقتی به ۳ اسلاید مانده به انتهای داده فعلی رسیدیم
      paginationRef.current.hasMore &&
      !isLoadingRef.current;

    if (shouldLoadMore) {
      console.log(`Loading more data... Current index: ${realIndex}, Data length: ${currentDataLength}`);
      fetchNextPage();
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
    // مقداردهی اولیه: skip=0, take=6
    if (userIdLogin && data.length === 0 && !isLoadingRef.current) {
      // اگر داده‌ای نداریم، با skip=0 شروع کنیم
      dispatch(
        setPaginationHomeMatch({
          take: 6,
          skip: 0,
          hasMore: true,
        })
      );
      fetchNextPage();
    }
  }, [userIdLogin, data.length, fetchNextPage, dispatch]);

  return (
    <div
      className="relative lg:mt-1 mt-0 w-full bg-black 
    h-[calc(100dvh-100px)] 
    md:h-[calc(100dvh-100px)] 
    lg:h-[calc(100dvh-75px)] 
     "
    >
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        modules={[Mousewheel]}
        className="mySwiper 
        h-[calc(100dvh-100px)]
        md:h-[calc(100dvh-100px)]
        lg:h-[calc(100dvh-75px)]"
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
        {!data ||
          (data.length === 0 && (
            <SwiperSlide className="h-full w-full bg-black flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="font20 font-semibold mb-2">
                    " Nothing to watch yet "
                  </div>
                  <div className="text-gray-150">
                    There's no content available at the moment
                  </div>
                  <div className="text-gray-150">
                    <span>Find some artist:</span>
                    <Link
                      className="text-green font-bold flex justify-center mt-10"
                      to={"/watch"}
                    >
                      Watch redirect
                      <ArrowForwardIcon className="text-green font-bold font25" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
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