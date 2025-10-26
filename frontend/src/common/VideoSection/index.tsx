import React, { useState, useEffect } from "react";
import Video from "../../components/Video";
import StringHelpers from "../../utils/helpers/StringHelper";
import { useAppSelector } from "../../hooks/reduxHookType";
import Comments from "../Comments";
import { VideoSectionProps } from "./types";
import OptionBottom from "./OptionBottom";
import OptionTop from "./OptionTop";

const VideoSection: React.FC<VideoSectionProps> = ({
  score,
  isLiked: externalIsLiked,
  isFollowed: externalIsFollowed,
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
  const main = useAppSelector((state) => state?.main);
  const [commentUserInfo, setCommentUserInfo] = useState<any>({});
  const [showComments, setShowComments] = useState(false);
  const userIdLogin = main?.userLogin?.user?.id;
  const socket = main?.socketConfig;

  const handleToggleComments = (videoData: any) => {
    setCommentUserInfo(videoData);
    setShowComments(true);
  };

  const videoUrl =
    positionVideo === 0
      ? StringHelpers?.getProfile(video?.attachmentInserted)
      : StringHelpers?.getProfile(video?.attachmentMatched);

  return (
    <div className="h-full w-full relative flex flex-col border-b border-gray-800 min-h-0">
      <OptionTop
        main={main}
        video={video}
        userIdLogin={userIdLogin}
        positionVideo={positionVideo}
        openDropdowns={openDropdowns}
        score={score}
        setOpenDropdowns={setOpenDropdowns}
        toggleDropdown={toggleDropdown}
        dropdownItems={dropdownItems}
      />
      <div className="flex-1 min-h-0 relative flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
          <Video
            videoId={video?.id}
            className="max-w-full max-h-full w-auto h-auto object-contain"
            style={{
              maxHeight: "calc(50vh - 80px)",
              height: "auto",
            }}
            loop
            playing={isPlaying}
            handleVideo={() => onVideoPlay(video)}
            url={videoUrl}
          />

          <OptionBottom
            socket={socket}
            userIdLogin={userIdLogin}
            handleToggleComments={handleToggleComments}
            video={video}
            endTime={endTime}
            result={result}
            showLiked={showLiked}
            externalIsLiked={externalIsLiked}
            positionVideo={positionVideo}
            countLiked={countLiked}
          />
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
