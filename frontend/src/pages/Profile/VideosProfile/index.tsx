import React, { useMemo, useState } from "react";
import Timer from "../../../components/Timer";
import StringHelpers from "../../../utils/helpers/StringHelper";
import VideoSection from "../../../common/VideoSection";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import ReportIcon from "@mui/icons-material/Report";
import EmailIcon from "@mui/icons-material/Email";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { useNavigate } from "react-router-dom";

const VideosProfile: React.FC<any> = ({ match, videoLikes }) => {
  const [openDropdowns, setOpenDropdowns] = useState<any>({});
  const navigate = useNavigate();

  const videoGroupsWithLikes = useMemo(() => {
    return match.map((video: any) => {
      const parentLikes =
        (videoLikes[video?.attachmentInserted?.attachmentId] || 0) +
        (video.likeInserted || 0);
      const childLikes = video.child
        ? (videoLikes[video.attachmentMatched?.attachmentId] || 0) +
          (video.likeMatched || 0)
        : 0;

      return {
        ...video,
        parentLikes,
        childLikes,
        parentMovieId: video?.attachmentInserted?.attachmentId,
        childMovieId: video?.attachmentMatched?.attachmentId,
        likeInserted: video?.likeInserted,
        likeMatched: video?.likeMatched,
      };
    });
  }, [match, videoLikes]);

  const dropdown = (data: any, position: number, userSenderId: any) => {
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
        onClick: () => {
          navigate(`/privateMessage?id=${userSenderId?.id}`, {
            state: {
              userInfo: temp,
            },
          });
        },
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
      {
        label: "Save",
        icon: <TurnedInNotIcon className="text-gray-800 font20" />,
        onClick: () => alert("اعلان‌ها"),
      },

      { divider: true },
    ];
  };

  const toggleDropdown = (video: any, index: number) => {
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

  return (
    <div className="col-span-12 justify-center flex md:col-span-12 lg:col-span-12">
      <div className="grid grid-cols-1 gap-2 w-full">
        {videoGroupsWithLikes.map((video: any) => {
          const parentLikes =
            (videoLikes[video?.parentMovieId] || 0) +
            (video?.likeInserted || 0);
          const childLikes =
            (videoLikes[video?.childMovieId] || 0) + (video?.likeMatched || 0);
          const endTime =
            video?.inviteMatched?.insertDate !== -1 ||
            video?.inviteInserted?.insertDate !== -1;
          const startTime = video?.inviteMatched?.insertDate;
          const resultInserted =
            video?.likeInserted > video?.likeMatched
              ? "Win"
              : video?.likeInserted < video?.likeMatched
                ? "Loss"
                : "Draw";
          const resultMatched =
            video?.likeInserted < video?.likeMatched
              ? "Win"
              : video?.likeInserted > video?.likeMatched
                ? "Loss"
                : "Draw";
          return (
            <section className="flex flex-col relative h-screen">
              <div className="flex-1 min-h-0 ">
                <VideoSection
                  score={video?.scoreInserted}
                  result={resultInserted}
                  toggleDropdown={() => toggleDropdown(video, 0)}
                  countLiked={parentLikes}
                  video={video}
                  dropdownItems={() => dropdown(video, 0, video?.userInserted)}
                  setOpenDropdowns={setOpenDropdowns}
                  openDropdowns={openDropdowns}
                  positionVideo={0}
                />
              </div>
              {endTime && (
                <div className="absolute top-6 right-5 z-50 flex gap-1 text-white justify-center items-end">
                  {parentLikes}
                  <ThumbUpIcon className="font25 text-white" />
                </div>
              )}
              <div className="flex-1 min-h-0 relative">
                <VideoSection
                  score={video?.scoreMatched}
                  result={resultMatched}
                  toggleDropdown={() => toggleDropdown(video, 1)}
                  countLiked={childLikes}
                  video={video}
                  dropdownItems={() => dropdown(video, 1, video?.userMatched)}
                  openDropdowns={openDropdowns}
                  setOpenDropdowns={setOpenDropdowns}
                  positionVideo={1}
                />
                {endTime && (
                  <div className="absolute top-6 right-5 z-50 flex gap-1 text-white justify-center items-end">
                    {childLikes}
                    <ThumbUpIcon className="font25 text-white" />
                  </div>
                )}
                {endTime && (
                  <div className="w-full absolute bottom-7">
                    <div className="w-5/6 mb-1 ms-8 flex items-center justify-center text-white">
                      <HourglassTopIcon className="font20" />
                      <Timer
                        video={video}
                        startTime={startTime}
                        duration={3600}
                        active={true}
                        className="text-white font20 ml-2"
                        onComplete={() => {}}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default VideosProfile;
