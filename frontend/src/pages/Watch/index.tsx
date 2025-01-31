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
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import OptionWatchs from "./OptionWatchs";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import cook3 from "../../../assets/img/cook3.jpg";
import cook4 from "../../assets/img/cook4.jpg";
import inv5 from "../../assets/img/inv5.jpg";
import Image from "../../../components/Image";
import rank1 from "../../assets/img/rank11.webp";
import rank2 from "../../assets/img/rank3.webp";
import rank3 from "../../assets/img/rank5.webp";

const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
const userIdFromSStorage = sessionStorage.getItem("userId");
// import demoVideo from "../../../../../u-35446-1731760254601.mp4";
// import demoVideo3 from "../../../../../u-65320-1736910450676.mp4";

const Watch: React.FC = () => {
  const [allDableWatch, setAllDableWatch] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [closingComments, setClosingComments] = useState(false);

  const handleLiked = asyncWrapper(async (movieId: number) => {
    console.log(movieId);
    const postData = {
      userId: userIdFromSStorage,
      movieId: movieId,
    };
    const res = await addLike(postData);
    console.log(res);
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
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
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

  const getVideosForDisplay = (allDableWatch: any) => {
    const videoGroups = allDableWatch
      .filter((item: any) => item.parentId === null)
      .map((parentItem: any) => {
        const childItem = allDableWatch.find(
          (child: any) => child.parentId === parentItem.inviteId
        );

        return {
          parent: parentItem,
          child: childItem ? childItem : null,
        };
      })
      .filter((group: any) => group.child !== null);
    return videoGroups;
  };

  const videoGroups = getVideosForDisplay(allDableWatch);

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        className="mySwiper h-screen"
      >
        <div className="container h-screen w-screen">
          <div className="flex flex-col">
            {videoGroups.map((group: any, index: any) => {
              const { parent, child } = group;
              const fixVideo1 = `${baseURL}/${parent.attachmentType}/${parent.fileName}${parent.ext}`;
              const fixVideo2 = child
                ? `${baseURL}/${child.attachmentType}/${child.fileName}${child.ext}`
                : "";
              return (
                <SwiperSlide
                  key={index}
                  className="flex border-2 bg-black gap-12 flex-col"
                >
                  <div className=" flex-shrink-0 h-[35vh] my-2">
                    <OptionWatchs
                      profileName={"profileName"}
                      imgSrc={inv5}
                      rankSrc={rank3}
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
                  <div className=" flex-shrink-0 h-[35vh]">
                    <OptionWatchs
                      profileName={"profileName"}
                      imgSrc={cook4}
                      rankSrc={rank1}
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
                </SwiperSlide>
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
      </Swiper>
    </>
  );
};

export default Watch;
