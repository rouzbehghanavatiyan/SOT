import { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ReportIcon from "@mui/icons-material/Report";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  addFollower,
  addLike,
  removeFollower,
  removeLike,
} from "../../../services/dotNet";
import asyncWrapper from "../../../common/AsyncWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import VideoSection from "../../../common/VideoSection";
import { Mousewheel } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import EmailIcon from "@mui/icons-material/Email";
import { Video } from "../../../types/mainType";
import {
  handleAttachmentListByInviteId,
  RsetTornoment,
} from "../../../common/Slices/main";
import StringHelpers from "../../../utils/helpers/StringHelper";

const ShowWatch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const main = useAppSelector((state) => state?.main);
  const getInvitedId = location?.search?.split("id=")?.[1];
  const videos: any = Array.isArray(main?.tornoment) ? main.tornoment : [];
  const allMatch: any = main?.allTornoment;
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [openDropdowns, setOpenDropdowns] = useState<any>({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<any>(null);
  const socket = main?.socketConfig;

  const handleFallowClick = asyncWrapper(
    async (video: any, position: number) => {
      const userId =
        position === 0 ? video?.userInserted?.id : video?.userMatched?.id;
      const postData = {
        userId: Number(main?.userLogin?.userId),
        followerId: userId,
      };
      const currentFollowStatus = video?.follows[userId]?.isFollowed || false;
      const shouldRemoveFollow = currentFollowStatus;
      try {
        dispatch(
          RsetTornoment((prevVideos: any) =>
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
          )
        );
        if (shouldRemoveFollow) {
          await removeFollower(postData);
        } else {
          await addFollower(postData);
        }
      } catch (error) {
        console.error("Error in follow operation:", error);
        dispatch(
          RsetTornoment((prevVideos: any) =>
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
          )
        );
      }
    }
  );

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    setActiveSlideIndex(realIndex);
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

  const handleLikeClick = asyncWrapper(
    async (video: any, position: number, movieId: any) => {
      const postData = {
        userId: Number(main?.userLogin?.userId) || null,
        movieId: movieId,
      };
      const currentLikeStatus = video.likes?.[movieId]?.isLiked || false;
      try {
        console.log("prevVideosprevVideosprevVideosprevVideosprevVideos");
        dispatch(
          RsetTornoment((prevVideos: any) => {
            return prevVideos.map((v: any) =>
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
            );
          })
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
        dispatch(
          RsetTornoment((prevVideos: any) =>
            prevVideos.map((v: any) =>
              v.id === video.id
                ? {
                    ...v,
                    likes: {
                      ...v.likes,
                      [movieId]: {
                        isLiked: currentLikeStatus,
                        count: currentLikeStatus
                          ? v.likes?.[movieId]?.count
                          : v.likes?.[movieId]?.count,
                      },
                    },
                  }
                : v
            )
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
    console.log(data);
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
    dispatch(handleAttachmentListByInviteId(getInvitedId));
  }, [getInvitedId, main?.allFollingList?.getMapFollowingId]);

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
          if (allMatch?.length > 0) {
            setCurrentlyPlayingId(
              allMatch?.[0]?.attachmentInserted?.attachmentId
            );
          }
        }}
        className="mySwiper md:mt-10 md:h-[calc(100vh-100px)] h-[calc(100vh-42px)] "
      >
        {videos?.length !== 0 &&
          videos?.map((video: any, index: number) => {
            return (
              <SwiperSlide
                className="h-full w-full bg-black flex flex-col"
                key={index}
              >
                <div className="h-1/2 w-full relative flex flex-col">
                  <VideoSection
                    endTime={true}
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
                    positionVideo={0}
                  />
                </div>
                <div className="h-1/2 w-full relative flex flex-col">
                  <VideoSection
                    endTime={true}
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
                    positionVideo={1}
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
