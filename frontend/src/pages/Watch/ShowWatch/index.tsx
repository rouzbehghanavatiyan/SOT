import { useEffect, useRef, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ReportIcon from "@mui/icons-material/Report";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useLocation, useNavigate } from "react-router-dom";
import VideoSection from "../../../common/VideoSection";
import { Mousewheel } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHookType";
import EmailIcon from "@mui/icons-material/Email";
import { Video } from "../../../types/mainType";
import StringHelpers from "../../../utils/helpers/StringHelper";
import VideoSkeleton from "../../../components/VideoLoading/VideoSkeleton";
import usePagination from "../../../hooks/usePagination";
import { attachmentListByInviteId } from "../../../services/dotNet";
import LoadingChild from "../../../components/Loading/LoadingChild";
import VideoItemSkeleton from "../../../components/VideoLoading";

const ShowWatch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const getInvitedId = location?.search?.split("id=")?.[1];
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [openDropdowns, setOpenDropdowns] = useState<any>({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<any>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const loadingRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, hasMore, fetchNextPage } = usePagination(
    attachmentListByInviteId,
    {
      take: 3,
      extraParams: { id: getInvitedId },
    }
  );

  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      console.log("Fetching initial data...");
      fetchNextPage();
    }
  }, [data, isLoading, fetchNextPage]);

  useEffect(() => {
    setLoadedCount(data.length);
  }, [data]);

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    setActiveSlideIndex(realIndex);
    const topVideoId = data[realIndex]?.attachmentInserted?.attachmentId;
    setCurrentlyPlayingId(topVideoId);

    if (realIndex === loadedCount - 1 && hasMore && !isLoading) {
      fetchNextPage();
    }
  };

  const handleVideoPlay = (videoId: string) => {
    setOpenDropdowns({});
    setCurrentlyPlayingId((prevId: any) => {
      if (prevId === videoId) {
        return null;
      }
      return videoId;
    });
  };

  const toggleDropdown = (video: Video, index: number) => {
    setOpenDropdowns((prev: any) => {
      if (index === 0 || index === 1) {
        return {
          ...prev,
          [index]: !prev[index],
        };
      }
      return prev;
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
      {
        label: "Report",
        icon: <ReportIcon className="text-gray-800 font20" />,
        onClick: () => alert("اعلان‌ها"),
      },
      { divider: true },
    ];
  };

  return (
    <>
      <div className="relative w-full bg-black md:h-[calc(100vh-100px)] md:mt-20 mt-0 h-[calc(100vh-42px)]">
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          mousewheel={true}
          onSlideChange={handleSlideChange}
          modules={[Mousewheel]}
          onInit={() => {
            if (data?.length > 0) {
              setCurrentlyPlayingId(
                data?.[0]?.attachmentInserted?.attachmentId
              );
            }
          }}
          className="mySwiper md:mt-10 md:h-[calc(100vh-100px)] h-[calc(100vh-50px)] "
        >
          {isLoading && data.length === 0
            ? [...Array(12)].map((_, index) => (
                <SwiperSlide
                  className="h-full w-full bg-black flex flex-col"
                  key={index}
                >
                  <VideoItemSkeleton section="itsShowWatch" />
                </SwiperSlide>
              ))
            : data?.map((video: any, index: number) => {
                return (
                  <SwiperSlide
                    className="h-full w-full bg-black flex flex-col"
                    key={index}
                  >
                    <div className="h-1/2 w-full relative flex flex-col">
                      <VideoSection
                        showLiked
                        endTime={true}
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
                        toggleDropdown={() => toggleDropdown(video, 0)}
                        dropdownItems={() =>
                          dropdownItems(video, 0, video?.userInserted)
                        }
                        setOpenDropdowns={setOpenDropdowns}
                        openDropdowns={openDropdowns}
                        positionVideo={0}
                      />
                    </div>
                    <div className="h-1/2 w-full relative flex flex-col">
                      <VideoSection
                        showLiked
                        endTime={true}
                        video={video}
                        isPlaying={
                          currentlyPlayingId ===
                          video?.attachmentMatched?.attachmentId
                        }
                        onVideoPlay={() =>
                          handleVideoPlay(
                            video?.attachmentMatched?.attachmentId
                          )
                        }
                        toggleDropdown={() => toggleDropdown(video, 1)}
                        dropdownItems={() =>
                          dropdownItems(video, 1, video?.userMatched)
                        }
                        openDropdowns={openDropdowns}
                        setOpenDropdowns={setOpenDropdowns}
                        positionVideo={1}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
        </Swiper>
        <LoadingChild ref={loadingRef} isLoading={isLoading} />
      </div>
    </>
  );
};

export default ShowWatch;
