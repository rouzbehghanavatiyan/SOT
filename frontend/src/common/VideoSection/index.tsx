import React from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Video from "../../components/Video";
import ImageRank from "../../components/ImageRank";
import Follows from "../../components/Fallows";
import Dropdown from "../../components/Dropdown";
import StringHelpers from "../../utils/helpers/StringHelper";

type VideoSectionProps = {
  video: any;
  isPlaying: boolean;
  onVideoPlay: (videoId: string) => void;
  onLikeClick: (video: any) => void;
  onFollowClick: (video: any, positionVideo: number) => void;
  toggleDropdown: (index: string) => void;
  dropdownItems: (data: any) => any[];
  openDropdowns: Record<string, boolean>;
  baseURL?: string;
  positionVideo: number;
  showComments: () => void;
  setOpenDropdowns: any;
};

const VideoSection: React.FC<VideoSectionProps> = ({
  video,
  setOpenDropdowns,
  isPlaying,
  onVideoPlay,
  onLikeClick,
  onFollowClick,
  toggleDropdown,
  dropdownItems,
  openDropdowns,
  positionVideo,
  showComments,
}) => {
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

  const likeInfo = video.likes[movieId] || { isLiked: false, count: 0 };
  const isLiked = likeInfo.isLiked;

  const userId =
    positionVideo === 0 ? video?.userInserted?.id : video?.userMatched?.id;

  const followInfo = video.follows[userId] || { isFollowed: false };
  const isFollowed = followInfo.isFollowed;

  const checkMyVideo =
    userInfo?.id !== Number(sessionStorage.getItem("userId"));

  return (
    <div className="h-full w-full relative flex flex-col border-b border-gray-800">
      <div className="flex-shrink-0 p-2 z-10 absolute top-0 left-0 right-0 bg_profile_watch">
        <div
          //   onClick={(e: any) => {
          //     e.stopPropagation();
          //     setOpenDropdowns({});
          //   }}
          className="grid grid-cols-3 items-center w-full"
        >
          <div
            // onClick={() => setOpenDropdowns({})}
            className="flex justify-start"
          >
            <ImageRank
              rankStyle="w-8 h-8"
              classUserName="text-white"
              iconProfileStyle="font50"
              userName={userInfo?.userName}
              imgSize={50}
              imgSrc={profile}
            />
          </div>
          <div
            // onClick={() => setOpenDropdowns({})}
            className="flex justify-center"
          >
            {checkMyVideo && (
              <Follows
                bgColor="bg-white"
                title={isFollowed ? "Unfollow" : "Follow"}
                onClick={() => onFollowClick(video, positionVideo)}
              />
            )}
          </div>
          <div className="flex justify-end">
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
      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <Video
            videoId={video?.id}
            className="max-w-full max-h-[35vh] min-h-[430px] w-auto h-[70vh] object-contain"
            loop
            playing={isPlaying}
            handleVideo={() => onVideoPlay(video?.id)}
            url={videoUrl}
          />
          <div className="absolute left-0 right-0 bottom-10 z-50">
            <div className="flex justify-between items-center w-full px-4">
              <ChatBubbleOutlineIcon
                onClick={showComments}
                className="font30 text-white"
              />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
