import React, { useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Video from "../../components/Video";
import ImageRank from "../../components/ImageRank";
import Follows from "../../components/Fallows";
import Dropdown from "../../components/Dropdown";
import StringHelpers from "../../utils/helpers/StringHelper";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RsetAllLoginMatch, RsetTornoment } from "../Slices/main";
import {
  addFollower,
  addLike,
  removeFollower,
  removeLike,
} from "../../services/dotNet";
import Comments from "../Comments";
import asyncWrapper from "../AsyncWrapper";

type VideoSectionProps = {
  video: any;
  showLiked: boolean;
  isPlaying: boolean;
  onVideoPlay: (videoId: string) => void;
  onLikeClick?: (video: any) => void;
  onFollowClick: (video: any, positionVideo: number) => void;
  toggleDropdown: (index: string) => void;
  dropdownItems: (data: any) => any[];
  openDropdowns: Record<string, boolean>;
  baseURL?: string;
  positionVideo: number;
  setOpenDropdowns: any;
  countLiked: number;
  showCommentsIcon: boolean;
};

const VideoSection: React.FC<VideoSectionProps> = ({
  video,
  showLiked = false,
  showCommentsIcon,
  setOpenDropdowns,
  onLikeClick,
  toggleDropdown,
  dropdownItems,
  openDropdowns,
  positionVideo,
  countLiked,
}) => {
  const dispatch = useAppDispatch();
  const main = useAppSelector((state) => state?.main);
  const [showComments, setShowComments] = useState<any>(false);
  const [closingComments, setClosingComments] = useState(false);
  const [movieInfo, setMovieInfo] = useState<any>({});
  const userIdLogin = main?.userLogin?.user?.id;
  const socket = main?.socketConfig;
  const handleToggleComments = (videoData: any) => {
    setMovieInfo(videoData);
    setShowComments(true);
  };
  console.log(showCommentsIcon);

  const profile =
    positionVideo === 0
      ? StringHelpers?.getProfile(video?.profileInserted)
      : StringHelpers?.getProfile(video?.profileMatched);
  const movieId =
    positionVideo === 0
      ? video?.attachmentInserted?.attachmentId
      : video?.attachmentMatched?.attachmentId;
  const videoUrl =
    positionVideo === 0
      ? StringHelpers?.getProfile(video?.attachmentInserted)
      : StringHelpers?.getProfile(video?.attachmentMatched);
  const userInfo =
    positionVideo === 0 ? video?.userInserted : video?.userMatched;
  const likeInfo = video?.likes?.[movieId] || { isLiked: false, count: 0 };
  const isLiked = likeInfo.isLiked;
  const userId =
    positionVideo === 0 ? video?.userInserted?.id : video?.userMatched?.id;
  const checkMyVideo =
    userInfo?.id !== Number(sessionStorage.getItem("userId"));

  const allLoginMatch: any = useAppSelector(
    (state) => state.main.allLoginMatch
  );
  const videoFromRedux = allLoginMatch.find((v: any) => {
    return v?.follows?.[userId] === video?.follows?.[userId];
  });

  const followInfo = videoFromRedux?.follows?.[userId] || { isFollowed: false };
  const isFollowed = followInfo?.isFollowed;

  const handleFallowClick = async (video: any, position: number) => {
    const userId =
      position === 0 ? video?.userInserted?.id : video?.userMatched?.id;

    const postData = {
      userId: userIdLogin || null, // شناسه کاربر فعلی
      followerId: userId || null, // شناسه کاربری که دنبال می‌شود
    };
    const isCurrentlyFollowed = video?.follows?.[userId]?.isFollowed || false;

    dispatch(
      RsetAllLoginMatch((prevVideos: any) => {
        console.log(prevVideos);
        const updatedVideos = prevVideos.map((v: any) => {
          return v.id === video.id
            ? {
                ...v,
                follows: {
                  ...v.follows,
                  [userId]: {
                    isFollowed: !isCurrentlyFollowed, // تغییر وضعیت
                  },
                },
              }
            : v;
        });
        console.log("Updated Videos:", updatedVideos); // برای دیباگ
        return updatedVideos;
      })
    );
    try {
      if (isCurrentlyFollowed) {
        await removeFollower(postData); // حذف دنبال کردن
      } else {
        await addFollower(postData); // اضافه کردن دنبال کردن
      }
    } catch (error) {
      console.error("Error in follow operation:", error);

      dispatch(
        RsetAllLoginMatch((prevVideos: any) =>
          prevVideos.map((v: any) =>
            v.id === video.id
              ? {
                  ...v,
                  follows: {
                    ...v.follows,
                    [userId]: {
                      isFollowed: isCurrentlyFollowed,
                    },
                  },
                }
              : v
          )
        )
      );
    }
  };

  // const handleShowCMT = (data: any) => {
  //   setMovieInfo(data);
  //   if (showComments) {
  //     setClosingComments(true);
  //     setTimeout(() => {
  //       setClosingComments(false);
  //     }, 150);
  //   } else {
  //     setShowComments(true);
  //   }
  // };

  const handleLikeClick = asyncWrapper(async (video: any, position: number) => {
    const movieId =
      position === 0
        ? video?.attachmentInserted?.attachmentId
        : video?.attachmentMatched?.attachmentId;

    const postData = {
      userId: userIdLogin || null,
      movieId: movieId,
    };

    const currentLikeStatus = video.likes?.[movieId]?.isLiked || false;

    try {
      dispatch(
        RsetTornoment((prevVideos: any) => {
          return prevVideos.map((v: any) =>
            v.id === video.id
              ? {
                  ...v,
                  likes: {
                    ...v.likes,
                    [movieId]: {
                      isLiked: !currentLikeStatus, // فقط وضعیت لایک برای movieId مشخص تغییر کند
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
      // بازگرداندن وضعیت به حالت اولیه در صورت خطا
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
  });

  return (
    <div className="h-full w-full relative flex flex-col border-b border-gray-800">
      <div className="flex-shrink-0 p-2 z-10 absolute top-0 left-0 right-0 bg_profile_watch">
        <div className="grid grid-cols-3 items-center w-full">
          <div className="flex justify-start">
            <ImageRank
              userNameStyle="text-gray-150"
              userName={userInfo?.userName}
              imgSize={50}
              imgSrc={profile}
              score={0}
            />
          </div>
          <div className="flex justify-center">
            {checkMyVideo && (
              <Follows
                bgColor=""
                title={isFollowed ? "Unfollow" : "Follow"}
                onFollowClick={() => handleFallowClick(video, positionVideo)}
              />
            )}
          </div>
          <div className="flex justify-end ">
            {checkMyVideo && (
              <Dropdown
                isOpenOptions={openDropdowns[positionVideo]}
                setIsOpenOptions={(isOpen) => {
                  setOpenDropdowns((prev: any) => ({
                    ...prev,
                    [positionVideo]: isOpen,
                  }));
                }}
                buttonIcon={
                  <MoreVertIcon
                    className="text-white font35 cursor-pointer"
                    onClick={() =>
                      toggleDropdown(positionVideo ? "top" : "bottom")
                    }
                  />
                }
                items={dropdownItems(video)}
                position="right"
                className="ml-4"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
          <Video
            videoId={video?.id}
            className="max-w-full max-h-[35vh] min-h-[430px] w-auto h-[70vh] object-contain"
            loop
            // playing={isPlaying}
            // handleVideo={() => onVideoPlay(video)}
            url={videoUrl}
          />
          <div className="absolute w-full bottom-8 z-10">
            <div className="grid grid-cols-3 items-center mx-2">
              <div className="col-span-1 flex justify-start">
                <ChatBubbleOutlineIcon
                  onClick={() => handleToggleComments(video)}
                  className="font25  text-white"
                />
              </div>
              {true && (
                <div className="text-red  flex justify-center">
                  <span className="font15 border-red px-2 rounded-lg border font-bold">
                    Loss
                  </span>
                </div>
              )}
              <div className="col-span-1 flex justify-end">
                {showLiked && (
                  <>
                    {isLiked ? (
                      <ThumbUpIcon
                        className="text-white font35 unlike_animation cursor-pointer"
                        onClick={() => handleLikeClick(video, positionVideo)}
                      />
                    ) : (
                      <ThumbUpOffAltIcon
                        className="text-white font35 cursor-pointer"
                        onClick={() => handleLikeClick(video, positionVideo)}
                      />
                    )}
                  </>
                )}

                {countLiked && (
                  <div className="text-gray-200 flex items-end gap-2">
                    <span className="font20 text-sm">{countLiked}</span>
                    <ThumbUpIcon className=" font30 unlike_animation cursor-pointer" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showComments && (
        <Comments
          positionVideo={positionVideo}
          setClosingComments={setClosingComments}
          movieInfo={movieInfo}
          setShowComments={setShowComments}
          // handleShowCMT={handleShowCMT}
          closingComments={closingComments}
        />
      )}
    </div>
  );
};

export default VideoSection;
