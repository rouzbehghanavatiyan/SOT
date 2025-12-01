import React from "react";
import VideoSection from "../common/VideoSection";

interface VideoSlideProps {
  video: any;
  index: number;
  currentlyPlayingId: string | null;
  openDropdowns: Record<number, boolean>;
  onVideoPlay: (attachmentId: string) => void;
  toggleDropdown: (index: number) => void;
  dropdownItems: (data: any, position: number, userSenderId: any) => any[];
  setOpenDropdowns: React.Dispatch<
    React.SetStateAction<Record<number, boolean>>
  >;
}

export const VideoSlide: React.FC<VideoSlideProps> = ({
  video,
  currentlyPlayingId,
  openDropdowns,
  onVideoPlay,
  toggleDropdown,
  dropdownItems,
  setOpenDropdowns,
}) => {
  const videoSections = [
    {
      attachment: video.attachmentInserted,
      position: 0,
      user: video.userInserted,
      isLiked:
        video.likes?.[video.attachmentInserted?.attachmentId]?.isLiked || false,
    },
    {
      attachment: video.attachmentMatched,
      position: 1,
      user: video.userMatched,
      isLiked:
        video.likes?.[video.attachmentMatched?.attachmentId]?.isLiked || false,
    },
  ];

  return (
    <>
      {videoSections.map((section, sectionIndex) => {
        return (
          <div
            key={sectionIndex}
            className="h-1/2 w-full relative flex flex-col"
          >
            <VideoSection
              showLiked
              endTime={true}
              video={video}
              isPlaying={
                currentlyPlayingId === section.attachment?.attachmentId
              }
              onVideoPlay={() => onVideoPlay(section.attachment?.attachmentId)}
              toggleDropdown={() => toggleDropdown(section.position)}
              dropdownItems={() =>
                dropdownItems(video, section.position, section.user)
              }
              setOpenDropdowns={setOpenDropdowns}
              openDropdowns={openDropdowns}
              positionVideo={section.position}
              isLiked={section.isLiked}
            />
          </div>
        );
      })}
    </>
  );
};
