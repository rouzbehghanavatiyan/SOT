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
import { addLike, attachmentList } from "../../services/dotNet";
import asyncWrapper from "../../common/AsyncWrapper";
import Loading from "../../components/Loading";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import Slider from "react-slick";
import VideoReactPlayer from "../../components/ReactPlayer";
const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
// import demoVideo from "../../../../../u-35446-1731760254601.mp4";
// import demoVideo3 from "../../../../../u-65320-1736910450676.mp4";

const Watch: React.FC = () => {
  const [searching, setSearching] = useState("");
  const [allDableWatch, setAllDableWatch] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likedVideos, setLikedVideos] = useState(
    Array(allDableWatch.length).fill(false)
  );
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

  const handleAttachmentList = asyncWrapper(async () => {
    const res = await attachmentList();
    const { data, status } = res?.data;
    if (status === 0) {
      setAllDableWatch(data);
    }
  });

  useEffect(() => {
    handleAttachmentList();
  }, []);

  const handleRatio = (id: any) => {
    console.log(id);
    if (!isFullscreen) {
      const elem: any = document.getElementById(`video-${id}`); // استفاده از unique ID
      if (elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          // Firefox
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          // Chrome, Safari and Opera
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          // IE/Edge
          elem.msRequestFullscreen();
        }
      }
      setIsFullscreen(true);
    } else {
      document.exitFullscreen(); // برای خروج از حالت Fullscreen
      setIsFullscreen(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function (currentSlide: any, nextSlide: any) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide: any) {
      console.log("after change", currentSlide);
    },
  };

  // const handleLike = asyncWrapper(async () => {
  //   const postData = {
  //     UserId: 7,
  //     MovieId: 3,
  //   };
  //   const res = await addLike(postData);
  // });

  const getVideosForDisplay = (allDableWatch: any) => {
    const videoGroups = allDableWatch
      .filter((item: any) => item.parentId === null)
      .map((parentItem: any) => {
        const childItems = allDableWatch.filter(
          (childItem: any) => childItem.parentId === parentItem.movieId
        );
        return {
          parent: parentItem,
          children: childItems,
        };
      });
    return videoGroups;
  };

  const videoGroups = getVideosForDisplay(allDableWatch);

  return (
    <>
      <div className={`container ${isFullscreen ? "fullscreen" : ""}`}>
        <div className="col-span-12 justify-center flex md:col-span-12 lg:col-span-12">
          <div className="grid  grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {videoGroups.map((group, index) => {
              const { parent, children } = group;
              const fixVideo1 = `${baseURL}/${parent.attachmentType}/${parent.fileName}${parent.ext}`;
              return (
                <section
                  key={index}
                  className="rounded-md  bg-blue transition-transform duration-300 col-span-full"
                >
                  <div
                    className={`relative w-full sm:w-[100%] md:w-[100%] lg:w-[325px] h-full duration-500`}
                  >
                    <AspectRatioIcon
                      onClick={() => handleRatio(parent.movieId)}
                      className="absolute font25 right-52 text-white cursor-pointer"
                    />
                    <div className="bg-black p-4">
                      <div className="relative flex justify-center items-center mb-2">
                        {/* <VideoReactPlayer url={fixVideo1} /> */}
                        <video src={fixVideo1} controls />
                      </div>
                      {children.map((child, childIndex) => {
                        const fixVideo2 = `${baseURL}/${child.attachmentType}/${child.fileName}${child.ext}`;
                        return (
                          <div key={childIndex} className="bg-black p-4">
                            <div className="relative flex justify-center items-center mb-2">
                              <VideoReactPlayer url={fixVideo2} />
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="space-x-4">
                                <ThumbUpIcon
                                  className={`font25 cursor-pointer transition-transform duration-300 ${likedVideos[index] ? "text-blue" : "text-white"}`}
                                  onClick={() => handleThumbUpClick(index)}
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
                        );
                      })}
                    </div>
                  </div>
                </section>
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
