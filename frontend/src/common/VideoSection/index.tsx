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
import { addFollower, removeFollower } from "../../services/dotNet";
import Comments from "../Comments";

type VideoSectionProps = {
  video: any;
  isPlaying?: boolean;
  onVideoPlay?: (videoId: string) => void;
  onLikeClick?: (video: any) => void;
  onFollowClick?: (video: any, positionVideo: number) => void;
  toggleDropdown?: any;
  dropdownItems: any;
  openDropdowns: Record<string, boolean>;
  baseURL?: string;
  positionVideo: number;
  setOpenDropdowns: any;
  countLiked: number;
  endTime?: boolean;
  startTime?: any;
  result?: boolean | null;
  handleShowCMT: any;
};

const VideoSection: React.FC<VideoSectionProps> = ({
  video,
  endTime = false,
  setOpenDropdowns,
  onLikeClick,
  toggleDropdown,
  dropdownItems,
  openDropdowns,
  positionVideo,
  result,
  countLiked,
  handleShowCMT,
}) => {
  const dispatch = useAppDispatch();
  const main = useAppSelector((state) => state?.main);
  const [showComments, setShowComments] = useState<any>(false);
  const [closingComments, setClosingComments] = useState(false);
  const [movieInfo, setMovieInfo] = useState<any>({});

  const handleToggleComments = () => {
    handleShowCMT();
  };

  const handleClose = () => {
    setClosingComments(true);
    setTimeout(() => {
      setShowComments(false);
      setClosingComments(false);
    }, 150);
  };

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
      userId: Number(main?.userLogin?.userId), // شناسه کاربر فعلی
      followerId: userId, // شناسه کاربری که دنبال می‌شود
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

  // const handleSlideChange = (swiper: any) => {
  //   const realIndex = swiper.realIndex;
  //   const topVideoId = videos[realIndex]?.attachmentInserted?.attachmentId;
  //   setCurrentlyPlayingId(topVideoId);
  // };

  // const playing =
  //   currentlyPlayingId === video?.attachmentInserted?.attachmentId;

  console.log(showComments);

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
            {false && (
              <Follows
                bgColor=""
                title={isFollowed ? "Unfollow" : "Follow"}
                onFollowClick={() => handleFallowClick(video, positionVideo)}
              />
            )}
          </div>
          <div className="flex justify-end ">
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
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
          <Video
            videoId={video?.id}
            className="max-w-full max-h-[35vh] min-h-[430px] w-auto h-[70vh] object-contain"
            loop
            // playing={playing}
            // handleVideo={() => onVideoPlay(video)}
            url={videoUrl}
          />
          <div className="absolute w-full bottom-8 z-10">
            <div className="grid grid-cols-3 items-center mx-2">
              <div className="col-span-1 flex justify-start">
                <ChatBubbleOutlineIcon
                  onClick={() => handleToggleComments()}
                  className="font25  text-white"
                />
              </div>
              {!endTime && (
                <div className="col-span-1 flex justify-center">
                  {result === true ? (
                    <span className="font15 font-bold text-green border-[1px] px-2 border-green rounded-lg">
                      Win
                    </span>
                  ) : result === false ? (
                    <span className="font15 font-bold text-red border-[1px] px-2 border-red rounded-lg">
                      Loss
                    </span>
                  ) : (
                    <span className="font15 font-bold text-yellow border-[1px] px-2 border-yellow rounded-lg">
                      Draw
                    </span>
                  )}
                </div>
              )}
              <div className="col-span-1 flex justify-end">
                {onLikeClick && (
                  <>
                    {isLiked ? (
                      <ThumbUpIcon
                        className="text-white font35 unlike_animation cursor-pointer"
                        onClick={() => onLikeClick(movieId)}
                      />
                    ) : (
                      <ThumbUpOffAltIcon
                        className="text-white font35 cursor-pointer"
                        onClick={() => onLikeClick(movieId)}
                      />
                    )}
                  </>
                )}
                {!endTime && (
                  <div className="text-gray-200 flex items-end gap-2">
                    <span className="font15 text-gray-200">{countLiked}</span>
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
          showComments={showComments}
          closingComments={closingComments}
          movieInfo={movieInfo}
          setShowComments={setShowComments}
          setClosingComments={setClosingComments}
        />
      )}
    </div>
  );
};

export default VideoSection;
