import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import cook4 from "../../assets/img/cook2.jpg";
import cooking1 from "../../assets/img/cooking1.webp";
import cooking2 from "../../assets/img/cooking2.jpeg";
import cooking3 from "../../assets/img/cooking3.jpg";
import cook1 from "../../assets/img/cook1.jpg";
import roberto from "../../assets/img/roberto.avif";
import gymM3 from "../../assets/img/gymM3.jpg";
import violon from "../../assets/img/kidViolon2.avif";
import violon2 from "../../assets/img/violinKid4.jpg";
import menGym2 from "../../assets/img/menGym2.png";
import blackProfile from "../../assets/img/1-intro-photo-final.jpg";
import womenGymPro1 from "../../assets/img/womenGym1.jpg";
import womenGym from "../../assets/img/women-AI-Profile-Picture.jpg";
import Rank from "../../components/Rank";
import Image from "../../components/Image";
import ImageRank from "../../components/ImageRank";
import Input from "../../components/Input";
import SearchIcon from "@mui/icons-material/Search";
import { attachmentList } from "../../services/dotNet";
import asyncWrapper from "../../common/AsyncWrapper";
import { addLike } from "../../services/dotNet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import ReactPlayer from "react-player";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import OptionWatchs from "./OptionWatchs";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FlareIcon from "@mui/icons-material/Flare";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";

const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
const userIdFromSStorage = sessionStorage.getItem("userId");

const items = [
  {
    id: 1,
    imageTop: cooking1,
    imageBott: cooking2,
    profileImageTop: cook4,
    profileImageBott: cook1,
    alt: "Image 1",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 2,
    imageTop: menGym2,
    imageBott: womenGymPro1,
    profileImageTop: gymM3,
    profileImageBott: womenGym,
    alt: "Image 2",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 3,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: blackProfile,
    profileImageBott: roberto,
    alt: "Image 3",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 3,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: cook4,
    profileImageBott: cook4,
    alt: "Image 3",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 3,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: cook4,
    profileImageBott: cook4,
    alt: "Image 3",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 3,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: cook4,
    profileImageBott: cook4,
    alt: "Image 3",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 4,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: cook4,
    profileImageBott: cook4,
    alt: "Image 4",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
];

const StepOne: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeProfiles, setActiveProfiles] = useState<Set<number>>(new Set());
  const [lastTap, setLastTap] = useState<number>(0);
  const [searching, setSearching] = useState<string>("");
  const [allDableWatch, setAllDableWatch] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [closingComments, setClosingComments] = useState(false);
  const [likedVideos, setLikedVideos] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleShowProfile = (id: number) => {
    setActiveProfiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDoubleTap = (item: any) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      console.log(item?.group);
      const newPath = `${location.pathname}/show`;
      navigate(newPath);
      setLastTap(0);
    } else {
      console.log(item?.index);
      handleShowProfile(item?.index);
      setLastTap(now);
    }
  };

  const handleAttachmentList = asyncWrapper(async () => {
    setIsLoading(true);
    const res = await attachmentList();
    setIsLoading(false);
    const { data, status } = res?.data;
    if (status === 0) {
      setAllDableWatch(data);
    }
  });

  useEffect(() => {
    handleAttachmentList();
  }, []);

  const handleLiked = asyncWrapper(async (movieId: number) => {
    console.log(movieId);
    const postData = {
      userId: userIdFromSStorage,
      movieId: movieId,
    };
    const res = await addLike(postData);
    console.log(res);
    // Update liked videos state (example logic)
    const newLikedVideos = [...likedVideos];
    newLikedVideos[movieId] = true; // Assuming movieId is an index
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

  const videoGroups = getVideosForDisplay(allDableWatch);

  return (
    <>
      <Loading isLoading={isLoading ? true : false} />
      <div className="grid grid-cols-2 gap-[1px] p-[1px]">
        {videoGroups.map((group: any, index: number) => {
          const { parent, child } = group;
          const fixImg1 = `${baseURL}/${parent.attachmentType}/${parent.fileName}${parent.ext}`;
          const fixImg2 = child
            ? `${baseURL}/${child.attachmentType}/${child.fileName}${child.ext}`
            : "";
          return (
            <div
              key={index}
              onClick={() => handleDoubleTap({ group, index })}
              className="my-1 flex-1 flex  flex-col"
            >
              <div className="flex-1">
                <span className="relative  block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                  <img
                    src={fixImg1}
                    alt={parent.alt}
                    className="w-full min-h-44 max-h-44 object-cover"
                  />
                  {activeProfiles.has(index) && (
                    <ImageRank
                      showBackground
                      profileName={parent.userName}
                      profileFontColor="white"
                      score={parent.score}
                      rankWidth={45}
                      starWidth={6}
                      className="absolute bottom-0"
                    />
                  )}
                </span>
              </div>
              <div className="flex-1 bg-white">
                <div className="flex-1">
                  <figure className="relative block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                    <img
                      src={fixImg2}
                      alt={child.alt || "Profile image"}
                      className="w-full min-h-44 max-h-44 object-cover"
                    />
                    {activeProfiles.has(index) && (
                      <ImageRank
                        showBackground
                        profileName={child.userName}
                        profileFontColor="white"
                        score={child.score}
                        rankWidth={45}
                        starWidth={6}
                        className="absolute bottom-0"
                      />
                    )}
                    <figcaption className="sr-only">
                      {child.userName}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StepOne;
