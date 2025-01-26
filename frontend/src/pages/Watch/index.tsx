import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import FlareIcon from "@mui/icons-material/Flare";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Input from "../../components/Input";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "../../common/Comments";
import ReactPlayer from "react-player";
import { attachmentList } from "../../services/dotNet";
import asyncWrapper from "../../common/AsyncWrapper";
import Loading from "../../components/Loading";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

const Watch: React.FC = () => {
  const [allDableWatch, setAllDableWatch] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likedVideos, setLikedVideos] = useState(
    Array(allDableWatch.length).fill(false)
  );
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [closingComments, setClosingComments] = useState(false);

  const handleThumbUpClick = (index: any) => {
    console.log(index);
    const newLikedVideos = [...likedVideos];
    newLikedVideos[index] = !newLikedVideos[index];
    setLikedVideos(newLikedVideos);
  };

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
  const handleVideoClick = (index: any) => {
    setSelectedVideoIndex(index);
  };

  const handleAttachmentList = asyncWrapper(async () => {
    const res = await attachmentList();
    const { data, status } = res?.data;
    if (status === 0) {
      setAllDableWatch(data);
    }
    console.log(res);
  });

  useEffect(() => {
    handleAttachmentList();
  }, []);

  const handleRatio = (id: any) => {
    console.log(id);
    const elem: any = document.getElementById(`video-${id}`);
    if (elem) {
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
  };

  const handleKeshesh = () => {
    console.log("Hellowowowowwowo");
  };
  const handleTouchEnd = (index: any) => {
    const nextIndex = index + 1 < allDableWatch.length ? index + 1 : index; // در صورت وجود ویدیو بعدی
    setSelectedVideoIndex(nextIndex);
    // اگر نیاز به خروج از fullscreen دارید:
    // document.exitFullscreen();
  };
  return (
    <>
      <div className={`container ${isFullscreen ? "fullscreen" : ""}`}>
      
        <div className="col-span-12 justify-center flex md:col-span-12 lg:col-span-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {allDableWatch.map((datbleWatch: any, index) => {
              return (
                <>
                  {datbleWatch?.attachments?.map((watchVideo: any) => {
                    const fixVideo = `${baseURL}/${watchVideo?.attachmentType}/${watchVideo?.fileName}${watchVideo?.ext}`;
                    return (
                      <section
                        key={index}
                        className={`rounded-md bg-blue   transition-transform duration-300 col-span-full ${
                          selectedVideoIndex === index ? "col-span-full" : " "
                        }`}
                        onTouchEnd={() => handleTouchEnd(selectedVideoIndex)}
                        // onClick={() => handleVideoClick(index)}
                      >
                        <div
                          id={`video-${datbleWatch?.id}`}
                          className={`relative ${
                            selectedVideoIndex === index
                              ? "w-full h-screen"
                              : "w-full sm:w-[100%] md:w-[100%] lg:w-[325px] "
                          } transition-all duration-500`}
                        >
                          <AspectRatioIcon
                            onClick={() => handleRatio(datbleWatch?.id)}
                            className="absolute  font25 right-52 text-white"
                          />
                          <div className="bg-black p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="space-x-4">
                                <ThumbUpIcon
                                  className={`font25 cursor-pointer transition-transform duration-300 ${likedVideos[index] ? "text-blue" : "text-white"}`}
                                  onClick={() => handleThumbUpClick(index)}
                                />
                                <FlareIcon className="text-white cursor-pointer  font25" />
                              </div>
                              <div>
                                <span className="p-2 text-white border cursor-pointer">
                                  Follow
                                </span>
                                <MoreVertIcon className="text-white m-1  font25 cursor-pointer" />
                              </div>
                            </div>
                            <div className="relative flex justify-center items-center mb-2">
                              <span onClick={handleShowCMT}>
                                <CommentIcon className="absolute right-0 bottom-0 font25 text-white m-1 cursor-pointer" />
                              </span>
                              <ReactPlayer url={fixVideo} controls />
                            </div>
                          </div>
                          <div className="bg-black p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="space-x-4">
                                <ThumbUpIcon
                                  className={` font25 cursor-pointer transition-transform duration-300 ${likedVideos[index] ? "text-blue" : "text-white"}`}
                                  onClick={() => handleThumbUpClick(index)}
                                />
                                <FlareIcon className="text-white font25 cursor-pointer" />
                              </div>
                              <div>
                                <span className="p-2 text-white border cursor-pointer">
                                  Follow
                                </span>
                                <MoreVertIcon className="text-white font25 m-1 cursor-pointer" />
                              </div>
                            </div>
                            <div className="relative flex justify-center items-center mb-2">
                              <CommentIcon className="absolute right-0 font25 top-0 text-white m-1 cursor-pointer" />
                              <ReactPlayer
                                url={fixVideo}
                                controls
                                config={
                                  {
                                    // youtube: {
                                    //   playerVars: { showinfo: 1 },
                                    // },
                                    // facebook: {
                                    //   appId: "12345",
                                    // },
                                  }
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
        {showComments && (
          <Comments
            handleShowCMT={handleShowCMT}
            closingComments={closingComments}
          />
        )}
      </div>
    </>
  );
};

export default Watch;
