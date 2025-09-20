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
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import {
  addFollower,
  addLike,
  removeFollower,
  removeLike,
} from "../../services/dotNet";
import Comments from "../Comments";
import asyncWrapper from "../AsyncWrapper";
import { useNavigate } from "react-router-dom";
import { updatePaginationData } from "../Slices/pagination";
import { RsetLikeFollow, RsetShowWatch } from "../Slices/main";

type VideoSectionProps = {
  video?: any;
  showLiked?: boolean;
  isPlaying?: boolean;
  onVideoPlay?: (videoId: string) => void;
  onLikeClick?: (video: any) => void;
  onFollowClick?: (video: any, positionVideo: number) => void;
  toggleDropdown: (index: string) => void;
  dropdownItems: (data: any) => any[];
  openDropdowns: Record<string, boolean>;
  baseURL?: string;
  positionVideo: number;
  setOpenDropdowns?: any;
  countLiked?: number;
  showCommentsIcon?: boolean;
  showComments?: boolean;
  setShowComments?: React.Dispatch<React.SetStateAction<boolean>>;
  result?: any;
  score?: number;
  endTime?: number | boolean;
};

const VideoSection: React.FC<VideoSectionProps> = ({
  score,
  endTime,
  onVideoPlay,
  video,
  showLiked = false,
  setOpenDropdowns,
  result,
  toggleDropdown,
  dropdownItems,
  openDropdowns,
  isPlaying,
  positionVideo,
  countLiked,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const main = useAppSelector((state) => state?.main);
  const [commentUserInfo, setCommentUserInfo] = useState<any>({});
  const [showComments, setShowComments] = useState(false);
  const userIdLogin = main?.userLogin?.user?.id;
  const socket = main?.socketConfig;

  const handleToggleComments = (videoData: any) => {
    setCommentUserInfo(videoData);
    setShowComments(true);
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
  const checkMyVideo = userInfo?.id !== main?.userLogin?.user?.id;
  const allLoginMatch: any = useAppSelector((state) => state.pagination.data);
  const videoFromRedux = allLoginMatch.find((v: any) => {
    return v?.follows?.[userId] === video?.follows?.[userId];
  });
  const followInfo = videoFromRedux?.follows?.[userId] || { isFollowed: false };
  const isFollowed = followInfo?.isFollowed;

  const handleFallowClick = async (video: any, position: number) => {
    const userIdFollow =
      position === 0 ? video?.userInserted?.id : video?.userMatched?.id;
    const postData = {
      userId: userIdLogin || null,
      followerId: userIdFollow || null,
    };
    const isCurrentlyFollowed = video?.follows?.[userId]?.isFollowed || false;
    dispatch(
      updatePaginationData((prevVideos: any) => {
        const updatedVideos = prevVideos.map((v: any) => {
          return v.id === video.id
            ? {
                ...v,
                follows: {
                  ...v.follows,
                  [userId]: {
                    isFollowed: !isCurrentlyFollowed,
                  },
                },
              }
            : v;
        });
        return updatedVideos;
      })
    );
    try {
      if (isCurrentlyFollowed) {
        await removeFollower(postData);
      } else {
        await addFollower(postData);
      }
    } catch (error) {
      console.error("Error in follow operation:", error);
      dispatch(
        updatePaginationData((prevVideos: any) =>
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

  console.log(main?.likeFollow);

  const handleLikeClick = asyncWrapper(async (video: any, position: number) => {
    const movieId =
      position === 0 ? main?.likeFollow?.movieTop : main?.likeFollow?.movieBott;
    console.log(movieId);

    const postData = {
      userId: userIdLogin || null,
      movieId: movieId,
    };

    const currentLikeStatus = video?.likes?.[movieId]?.isLiked || false;
    const currentLikeCount = video?.likes?.[movieId]?.count || 0;

    try {
      dispatch(
        RsetLikeFollow({
          attachmentInserted: video?.attachmentInserted,
          attachmentMatched: video?.attachmentMatched,
          position,
        })
      );

      // Send request to server
      if (currentLikeStatus) {
        await removeLike(postData); // Remove like
        socket.emit("remove_liked", postData); // Emit event via socket
      } else {
        await addLike(postData); // Add like
        socket.emit("add_liked", postData); // Emit event via socket
      }
    } catch (error) {
      console.error("Error in like operation:", error);
    }
  });

  return (
    <div className="h-full w-full relative flex flex-col border-b border-gray-800">
      <div className="flex-shrink-0 p-2 z-10 absolute top-0 left-0 right-0 bg_profile_watch">
        <div className="grid grid-cols-9 items-center w-full">
          <div className="flex col-span-5 justify-start">
            <ImageRank
              userInfo={video}
              positionVideo={positionVideo}
              userNameStyle="text-gray-150"
              userName={userInfo?.userName}
              imgSize={50}
              imgSrc={profile}
              score={score}
            />
          </div>
          <div className="flex col-span-3 justify-center">
            {checkMyVideo && (
              <Follows
                bgColor=""
                title={isFollowed ? "Unfollow" : "Follow"}
                onFollowClick={() => handleFallowClick(video, positionVideo)}
              />
            )}
          </div>
          <div className="flex col-span-1 justify-end ">
            {checkMyVideo ? (
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
            ) : (
              <div> </div>
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
            playing={isPlaying}
            handleVideo={() => onVideoPlay(video)}
            url={videoUrl}
          />
          <div className="absolute w-full bottom-5 z-10">
            <div className="flex mb-4 justify-between mx-2">
              <div className="col-span-1  flex items-end justify-start">
                <ChatBubbleOutlineIcon
                  onClick={() => handleToggleComments(video)}
                  className="font25  text-white"
                />
              </div>
              {endTime ? null : result === "Win" ? (
                <div className="text-green col-span-1 flex justify-center">
                  <span className="font15 border-green px-2 rounded-lg border font-bold">
                    Win
                  </span>
                </div>
              ) : result === "Loss" ? (
                <div className="text-red col-span-1 flex justify-center">
                  <span className="font15 border-red px-2 rounded-lg border font-bold">
                    Loss
                  </span>
                </div>
              ) : result === "Draw" ? (
                <div className="text-yellow col-span-1 flex justify-center">
                  <span className="font15 border-yellow px-2 rounded-lg border font-bold">
                    Draw
                  </span>
                </div>
              ) : null}
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
                {!endTime && countLiked !== undefined ? (
                  <div className="text-gray-200  flex items-end justify-end gap-2">
                    <span className="font18 text-sm">{countLiked}</span>
                    <span className=" pb-1">
                      <ThumbUpIcon className=" font25 unlike_animation cursor-pointer" />
                    </span>
                  </div>
                ) : (
                  <div> </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showComments && (
        <Comments
          positionVideo={positionVideo}
          commentUserInfo={commentUserInfo}
          showComments={showComments}
          setShowComments={setShowComments}
        />
      )}
    </div>
  );
};

export default VideoSection;
