import { useCallback, useEffect, useRef, useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useLocation, useNavigate } from "react-router-dom";
import VideoSection from "../../../common/VideoSection";
import { Mousewheel } from "swiper/modules";
import EmailIcon from "@mui/icons-material/Email";
import { Video } from "../../../types/mainType";
import StringHelpers from "../../../utils/helpers/StringHelper";
import VideoItemSkeleton from "../../../components/VideoLoading";
import { attachmentListByInviteId } from "../../../services/dotNet";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHookType";
import {
  resetShowWatchState,
  RsetLikeFollow,
  RsetShowWatch,
  setPaginationShowWatch,
} from "../../../common/Slices/main";

const ShowWatch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const inviteId = location?.search?.split("id=")?.[1];
  const main = useAppSelector((state) => state.main);
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<any>({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<any>(null);
  const { pagination, data } = main.showWatchMatch;

  const paginationRef = useRef(pagination);
  const isLoadingRef = useRef(isLoading);

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
    setOpenDropdowns((prev: any) => ({
      ...prev,
      [index]: !prev[index],
    }));
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

  useEffect(() => {
    isLoadingRef.current = isLoading;
    paginationRef.current = pagination;
  }, [isLoading, pagination]);

  const fetchNextPage = useCallback(async () => {
    if (isLoadingRef.current || !paginationRef.current.hasMore) return;

    try {
      setIsLoading(true);
      const res = await attachmentListByInviteId({
        skip: paginationRef.current.skip,
        take: paginationRef.current.take,
        inviteId,
      });
      console.log(res);

      const newData = res?.data || [];
      const hasMore = newData.length > 0;
      // const temp: any = [];
      // const getLikeFollow = newData?.map((item: any) => {
      //   return {
      //     isLikedInserted: item?.isLikedInserted,
      //     isLikedMatched: item?.isLikedMatched,
      //     movieTopId: item?.attachmentInserted?.attachmentId,
      //     movieBottId: item?.attachmentMatched?.attachmentId,
      //   };
      // });

      // temp.push(...getLikeFollow);
      // dispatch(RsetLikeFollow(temp));
      dispatch(RsetShowWatch(newData));
      dispatch(
        setPaginationShowWatch({
          take: paginationRef.current.take,
          skip: paginationRef.current.skip + paginationRef.current.take,
          hasMore: hasMore,
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, inviteId]);

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    setCurrentlyPlayingId(false);
    if (
      realIndex % 3 === 0 &&
      paginationRef.current.hasMore &&
      !isLoadingRef.current
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (inviteId && !isLoadingRef.current) {
      fetchNextPage();
    }
  }, [inviteId, fetchNextPage]);

  useEffect(() => {
    return () => {
      dispatch(resetShowWatchState());
    };
  }, [dispatch]);

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
            : data?.map((video: any, index: number) => (
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
                        handleVideoPlay(video?.attachmentInserted?.attachmentId)
                      }
                      toggleDropdown={() => toggleDropdown(video, 0)}
                      dropdownItems={() =>
                        dropdownItems(video, 0, video?.userInserted)
                      }
                      setOpenDropdowns={setOpenDropdowns}
                      openDropdowns={openDropdowns}
                      positionVideo={0}
                      isLiked={
                        video.likes?.[video?.attachmentInserted?.attachmentId]
                          ?.isLiked || false
                      }
                      isFollowed={
                        video.follows?.[video?.userInserted?.id]?.isFollowed ||
                        false
                      }
                    />
                  </div>
                  <div className="h-1/2 w-full relative flex flex-col">
                    <VideoSection
                      isLiked={
                        video.likes?.[video?.attachmentMatched?.attachmentId]
                          ?.isLiked || false
                      }
                      isFollowed={
                        video.follows?.[video?.userMatched?.id]?.isFollowed ||
                        false
                      }
                      showLiked
                      endTime={true}
                      video={video}
                      isPlaying={
                        currentlyPlayingId ===
                        video?.attachmentMatched?.attachmentId
                      }
                      onVideoPlay={() =>
                        handleVideoPlay(video?.attachmentMatched?.attachmentId)
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
              ))}
        </Swiper>
      </div>
    </>
  );
};

export default ShowWatch;
