import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import { Mousewheel } from "swiper/modules";
import VideoSection from "../../common/VideoSection";
import { handleFollowerAttachmentList } from "../../common/Slices/main";
import { useNavigate } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import EmailIcon from "@mui/icons-material/Email";
import StringHelpers from "../../utils/helpers/StringHelper";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import VideoItemSkeleton from "../../components/VideoLoading";
import VideoSkeleton from "../../components/VideoLoading/VideoSkeleton";
import usePagination from "../../hooks/usePagination";
import { followerAttachmentList } from "../../services/dotNet";
import LoadingChild from "../../components/Loading/LoadingChild";

const Home: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const main = useAppSelector((state) => state?.main);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [openDropdowns, setOpenDropdowns] = useState<any>({});
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<any>(null);
  const userIdLogin = main?.userLogin?.user?.id;
  const { data, isLoading, hasMore, fetchNextPage } = usePagination(
    followerAttachmentList,
    {
      take: 3,
      extraParams: { id: userIdLogin },
    }
  );

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    const topVideoId = data[realIndex]?.attachmentInserted?.attachmentId;
    setCurrentlyPlayingId(topVideoId);
    if (realIndex === loadedCount - 1 && hasMore && !isLoading) {
      fetchNextPage();
    }
  };

  const handleVideoPlay = (videoId: string) => {
    setOpenDropdowns({});
    setCurrentlyPlayingId((prevId: any) => {
      console.log(prevId);
      if (prevId === videoId) {
        return null;
      }
      return videoId;
    });
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
            state: {
              userInfo: temp,
            },
          }),
      },
      // {
      //   label: "Share via",
      //   icon: <ShareIcon className="text-gray-800 font20" />,

      //   onClick: () => console.log(data),
      // },
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
    if (data.length === 0 && !isLoading) {
      fetchNextPage();
    }
  }, [data, isLoading, fetchNextPage]);

  useEffect(() => {
    if (data.length > 0) {
      console.log(data);
      setLoadedCount(data.length);
      setCurrentlyPlayingId(data[0]?.attachmentInserted?.attachmentId);
    }
  }, [data]);

  return (
    <>
      <div className="relative w-full bg-black md:h-[calc(100vh-100px)] shadow-card h-[calc(100vh-92px)]">
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
          }}
          modules={[Mousewheel]}
          className="mySwiper lg:mt-9 md:h-[calc(100vh-100px)] h-[calc(100vh-97px)]"
          onSlideChange={handleSlideChange}
        >
          {isLoading
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
                        />
                      </div>
                      <div className="flex-1 min-h-0 relative">
                        <VideoSection
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
    </>
  );
};

export default Home;
