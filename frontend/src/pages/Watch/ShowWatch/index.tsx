import { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ReportIcon from "@mui/icons-material/Report";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  addFollower,
  addLike,
  attachmentListByInviteId,
  removeFollower,
  removeLike,
} from "../../../services/dotNet";
import asyncWrapper from "../../../common/AsyncWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import VideoSection from "../../../common/VideoSection";
import { Mousewheel } from "swiper/modules";
import { useAppSelector } from "../../../hooks/hook";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import StringHelpers from "../../../utils/helpers/StringHelper";
import { Video } from "../../../types/mainType";

const ShowWatch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { main } = useAppSelector((state) => state);
  const getInvitedId = location?.search?.split("id=")?.[1];
  const [videos, setVideos] = useState<Video[]>([]);
  const [allMatch, setAllMatch] = useState<Video[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<any>(null);
  const [playingStates, setPlayingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [showComments, setShowComments] = useState<boolean>(false);
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const socket = main?.socketConfig;

  const handleAttachmentListByInviteId = asyncWrapper(async () => {
    const res = await attachmentListByInviteId(getInvitedId);
    const { status, data } = res?.data;
    setAllMatch(data);
    if (status === 0) {
      const processedVideos = data.map((video: any) => {
        const isFollowedFromMeTop = main?.allFollingList?.some(
          (following: any) => following === video?.userInserted?.id
        );

        const isFollowedFromMeBott = main?.allFollingList?.some(
          (following: any) => following === video?.userMatched?.id
        );
        return {
          ...video,
          urlTop: StringHelpers?.getProfile(video?.attachmentInserted),
          urlBott: StringHelpers?.getProfile(video?.attachmentMatched),
          profileTop: StringHelpers?.getProfile(video?.profileInserted),
          profileBott: StringHelpers?.getProfile(video?.profileMatched),
          isFollowedFromMeTop: isFollowedFromMeTop || false,
          isFollowedFromMeBott: isFollowedFromMeBott || false,
          likes: {
            [video?.attachmentInserted?.attachmentId]: {
              isLiked: video.isLikedInserted || false,
              count: video.likeInserted || 0,
            },
            [video?.attachmentMatched?.attachmentId]: {
              isLiked: video.isLikedMatched || false,
              count: video.likeMatched || 0,
            },
          },
          follows: {
            [video?.userInserted?.id]: {
              isFollowed: isFollowedFromMeTop || false,
            },
            [video?.userMatched?.id]: {
              isFollowed: isFollowedFromMeBott || false,
            },
          },
        };
      });
      setVideos(processedVideos);
    }
  });

  // const handleVideoPlay = (videoId: string) => {
  //   setOpenDropdowns({});
  //   setCurrentlyPlayingId((prevId: any) =>
  //     prevId === videoId ? null : videoId
  //   );
  // };

  // const handleVideoPlay = (videoId: string) => {
  //   setIsOpenOptions(false);
  //   setCurrentlyPlayingId((prevId) => {
  //     if (prevId === videoId) {
  //       return null;
  //     }
  //     return videoId;
  //   });
  // };

  const handleFallowClick = asyncWrapper(
    async (video: any, position: number) => {
      const userId =
        position === 0 ? video?.userInserted?.id : video?.userMatched?.id;

      const postData = {
        userId: Number(main?.userLogin?.userId),
        followerId: userId,
      };

      const currentFollowStatus = video.follows[userId]?.isFollowed || false;
      const shouldRemoveFollow = currentFollowStatus;

      try {
        setVideos((prevVideos: any) =>
          prevVideos.map((v: any) =>
            v.id === video.id
              ? {
                  ...v,
                  follows: {
                    ...v.follows,
                    [userId]: {
                      isFollowed: !currentFollowStatus,
                    },
                  },
                }
              : v
          )
        );

        if (shouldRemoveFollow) {
          await removeFollower(postData);
        } else {
          await addFollower(postData);
        }
      } catch (error) {
        console.error("Error in follow operation:", error);
        setVideos((prevVideos: any) =>
          prevVideos.map((v: any) =>
            v.id === video.id
              ? {
                  ...v,
                  follows: {
                    ...v.follows,
                    [userId]: {
                      isFollowed: currentFollowStatus,
                    },
                  },
                }
              : v
          )
        );
      }
    }
  );

  const handleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleSlideChange = (swiper: any) => {
    console.log(swiper);

    const realIndex = swiper.realIndex;
    setActiveSlideIndex(realIndex);

    // تنظیم currentlyPlayingId به ویدیوی بالا
    const topVideoId = videos[realIndex]?.attachmentInserted?.attachmentId;
    setCurrentlyPlayingId(topVideoId);
  };

  const handleVideoPlay = (videoId: string) => {
    setOpenDropdowns({});
    console.log(videoId);

    setCurrentlyPlayingId((prevId: any) => {
      if (prevId === videoId) {
        return null;
      }
      return videoId;
    });
  };

  console.log(currentlyPlayingId);

  const handleLikeClick = asyncWrapper(
    async (video: any, position: number, movieId: any) => {
      const postData = {
        userId: Number(main?.userLogin?.userId) || null,
        movieId: movieId,
      };

      const currentLikeStatus = video.likes[movieId]?.isLiked || false;

      try {
        setVideos((prevVideos: any) =>
          prevVideos.map((v: any) =>
            v.id === video.id
              ? {
                  ...v,
                  likes: {
                    ...v.likes,
                    [movieId]: {
                      isLiked: !currentLikeStatus,
                      count: currentLikeStatus
                        ? v.likes?.[movieId]?.count - 1
                        : v.likes?.[movieId]?.count + 1,
                    },
                  },
                }
              : v
          )
        );
        if (currentLikeStatus) {
          await removeLike(postData);
          socket.emit("remove_liked", postData);
        } else {
          await addLike(postData);
          socket.emit("add_liked", postData);
        }
      } catch (error) {
        console.error("Error in like operation:", error);
        setVideos((prevVideos: any) =>
          prevVideos.map((v: any) =>
            v.id === video.id
              ? {
                  ...v,
                  likes: {
                    ...v.likes,
                    [movieId]: {
                      isLiked: currentLikeStatus,
                      count: currentLikeStatus
                        ? v.likes[movieId].count + 1
                        : v.likes[movieId].count - 1,
                    },
                  },
                }
              : v
          )
        );
      }
    }
  );

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
      userProfile: position === 0 ? data?.profileTop : data?.profileBott,
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
        label: "Share via",
        icon: <ShareIcon className="text-gray-800 font20" />,

        onClick: () => console.log(data),
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
    handleAttachmentListByInviteId();
  }, [getInvitedId, main?.allFollingList]);

  useEffect(() => {
    if (allMatch.length > 0) {
      setCurrentlyPlayingId(allMatch[0]?.attachmentInserted?.attachmentId);
    }
  }, [allMatch]);

  console.log(videos);

  return (
    <div className="relative w-full bg-black md:h-[calc(100vh-100px)] md:mt-20 mt-0 h-[calc(100vh-42px)]">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        onSlideChange={handleSlideChange}
        modules={[Mousewheel]}
        onInit={() => {
          if (allMatch.length > 0) {
            setCurrentlyPlayingId(
              allMatch[0]?.attachmentInserted?.attachmentId
            );
          }
        }}
        className="mySwiper md:mt-10 md:h-[calc(100vh-100px)] h-[calc(100vh-42px)] "
      >
        {videos.map((video: any, index) => {
          return (
            <SwiperSlide
              className="h-full w-full bg-black flex flex-col"
              key={index}
            >
              <div className="h-1/2 w-full relative flex flex-col">
                <VideoSection
                  video={video}
                  isPlaying={
                    currentlyPlayingId ===
                    video?.attachmentInserted?.attachmentId
                  }
                  onVideoPlay={() =>
                    handleVideoPlay(video?.attachmentInserted?.attachmentId)
                  }
                  onLikeClick={() =>
                    handleLikeClick(
                      video,
                      0,
                      video?.attachmentInserted?.attachmentId
                    )
                  }
                  onFollowClick={() =>
                    handleFallowClick(video, 0, video?.userInserted?.id)
                  }
                  toggleDropdown={() => toggleDropdown(video, 0)}
                  dropdownItems={() =>
                    dropdownItems(video, 0, video?.userInserted)
                  }
                  setOpenDropdowns={setOpenDropdowns}
                  openDropdowns={openDropdowns}
                  baseURL={baseURL}
                  positionVideo={0}
                  showComments={handleShowComments}
                />
              </div>
              <div className="h-1/2 w-full relative flex flex-col">
                <VideoSection
                  video={video}
                  isPlaying={
                    currentlyPlayingId ===
                    video?.attachmentMatched?.attachmentId
                  }
                  onVideoPlay={() =>
                    handleVideoPlay(video?.attachmentMatched?.attachmentId)
                  }
                  onLikeClick={() =>
                    handleLikeClick(
                      video,
                      1,
                      video?.attachmentMatched?.attachmentId
                    )
                  }
                  onFollowClick={() =>
                    handleFallowClick(video, 1, video?.userMatched?.id)
                  }
                  toggleDropdown={() => toggleDropdown(video, 1)}
                  dropdownItems={() =>
                    dropdownItems(video, 1, video?.userMatched)
                  }
                  openDropdowns={openDropdowns}
                  setOpenDropdowns={setOpenDropdowns}
                  baseURL={baseURL}
                  positionVideo={1}
                  showComments={handleShowComments}
                />
              </div>
            </SwiperSlide>
          );
        })}
        {/* {showComments && <Comments handleShowCMT={handleShowComments} />} */}
      </Swiper>
    </div>
  );
};

export default ShowWatch;
