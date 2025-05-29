import React, { useState } from "react";
import asyncWrapper from "../../common/AsyncWrapper";
import { addLike } from "../../services/dotNet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import ReactPlayer from "react-player";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import OptionWatchs from "./OptionWatchs"; // Assuming this is a custom component
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FlareIcon from "@mui/icons-material/Flare";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
const userIdFromSStorage = sessionStorage.getItem("userId");

const StepTwo = () => {
  const [allDableWatch, setAllDableWatch] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [closingComments, setClosingComments] = useState(false);
  const [likedVideos, setLikedVideos] = useState<boolean[]>([]);

  const handleLiked = asyncWrapper(async (movieId: number) => {
    const postData = {
      userId: userIdFromSStorage,
      movieId: movieId,
    };
    const res = await addLike(postData);
    console.log(res);
    const newLikedVideos = [...likedVideos];
    newLikedVideos[movieId] = true;
    setLikedVideos(newLikedVideos);
  });

  const handleShowCMT = () => {
    if (showComments) {
      setClosingComments(true);
      setTimeout(() => {
        setShowComments(false);
        setClosingComments(false);
      }, 300);
    } else {
      setShowComments(true);
    }
  };

  const handleRatio = (id: any) => {
    console.log(id);
    const elem: any = document.getElementById(`video-${id}`);
    if (elem) {
      if (!isFullscreen) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const getVideosForDisplay = (allDableWatch: any[]) => {
    return allDableWatch
      .filter((item: any) => item.parentId === null)
      .map((parentItem: any) => {
        const childItem = allDableWatch.find(
          (child: any) => child.parentId === parentItem.inviteId
        );
        return {
          parent: parentItem,
          child: childItem || null,
        };
      })
      .filter((group: any) => group.child !== null);
  };

  const videoGroups = getVideosForDisplay(allDableWatch);

  return (
    <div className={`container ${isFullscreen ? "fullscreen" : ""}`}>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        className="mySwiper h-screen"
      >
        {videoGroups.map((group, index) => {
          const { parent, child } = group;
          const fixVideo1 = `${baseURL}/${parent.attachmentType}/${parent.fileName}${parent.ext}`;
          const fixVideo2 = child
            ? `${baseURL}/${child.attachmentType}/${child.fileName}${child.ext}`
            : "";
          return (
            <SwiperSlide key={index} className="flex  gap-10 flex-col">
              <div className="flex-shrink-0 h-[40vh]">
                <OptionWatchs
                  handleLiked={handleLiked}
                  parent={parent}
                  child={child}
                />
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={fixVideo1}
                  controls
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                    facebook: {
                      appId: "12345",
                    },
                  }}
                />
              </div>
              {child && (
                <div className="flex-shrink-0 h-[40vh]">
                  <OptionWatchs
                    handleLiked={handleLiked}
                    parent={parent}
                    child={child}
                  />
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={fixVideo2}
                    controls
                  />
                </div>
              )}
              <div className="bg-black p-4">
                <div className="relative flex justify-center items-center mb-2">
                  <video
                    id={`video-${parent.movieId}`}
                    src={fixVideo1}
                    controls
                  />
                  <AspectRatioIcon
                    onClick={() => handleRatio(parent.movieId)}
                    className="absolute font25 right-52 text-white cursor-pointer"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="space-x-4">
                    <ThumbUpIcon
                      className={`font25 cursor-pointer transition-transform duration-300 ${
                        likedVideos[index] ? "text-blue" : "text-white"
                      }`}
                      onClick={() => handleLiked(parent.movieId)}
                    />
                    <FlareIcon className="text-white font25 cursor-pointer" />
                  </div>
                  <div>
                    <span className="p-2 text-white border cursor-pointer">
                      Follow
                    </span>
                    <MoreVertIcon className="text-white m-1 font25 cursor-pointer" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default StepTwo;
