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

const Home: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const main = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<any>(null);
  const userIdLogin = main?.userLogin?.user?.id;
  const isLoadingRef = useRef(isLoading);
  const { pagination, data } = main.homeMatch;
  const paginationRef = useRef(pagination);

  useEffect(() => {
    isLoadingRef.current = isLoading;
    paginationRef.current = pagination;
  }, [isLoading, pagination]);

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

    if (
      realIndex % 3 === 0 &&
      paginationRef.current.hasMore &&
      !isLoadingRef.current
    ) {
      console.log("Fetching next page...");
      fetchNextPage();
    } else {
      console.log("No more data or still loading...");
    }
  };

  useEffect(() => {
    if (userIdLogin && data.length === 0 && !isLoadingRef.current) {
      fetchNextPage();
    }
  }, [userIdLogin, data.length, fetchNextPage]);

  const handleVideoPlay = (videoId: string) => {
    setOpenDropdowns({});
    setCurrentlyPlayingId((prevId: any) =>
      prevId === videoId ? null : videoId
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

  return (
    <div className="relative w-full bg-black md:h-[calc(100vh-100px)] shadow-card h-[calc(100vh-92px)]">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
        modules={[Mousewheel]}
        className="mySwiper lg:mt-9 md:h-[calc(100vh-100px)] h-[calc(100vh-97px)]"
        onSlideChange={handleSlideChange}
      >
        {isLoading && data.length === 0
          ? [...Array(12)].map((_, index) => (
              <SwiperSlide
                className="h-full w-full bg-black flex flex-col"
                key={index}
              >
                <VideoItemSkeleton section="itsHome" />
              </SwiperSlide>
            ))
          : data?.map((video: any, index: number) => {
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
                  key={index}
                  className="h-full w-full bg-black flex flex-col"
                >
                  <section className="flex flex-col h-screen">
                    <div className="flex-1 min-h-0 relative">
                      <VideoSection
                        score={video?.scoreInserted}
                        countLiked={video?.likeInserted || 0}
                        result={resultInserted}
                        video={video}
                        isPlaying={
                          currentlyPlayingId ===
                          video?.attachmentInserted?.attachmentId
                        }
                        onVideoPlay={() =>
                          handleVideoPlay(
                            video?.attachmentInserted?.attachmentId
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
                          video.follows?.[video?.userInserted?.id]
                            ?.isFollowed || false
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
                        isPlaying={
                          currentlyPlayingId ===
                          video?.attachmentMatched?.attachmentId
                        }
                        onVideoPlay={() =>
                          handleVideoPlay(
                            video?.attachmentMatched?.attachmentId
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
