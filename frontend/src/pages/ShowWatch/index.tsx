import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  attachmentListByInviteId,
  attachmentPlay,
} from "../../services/dotNet";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import asyncWrapper from "../../common/AsyncWrapper";
import Video from "../../components/Video";
import { useAppSelector } from "../../hooks/hook";
import OptionHomes from "../Home/OptionHomes";
import OptionShow from "./optionShow";
import Comments from "../../common/Comments";
import ImageRank from "../../components/ImageRank";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Mousewheel } from "swiper/modules";

const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

const ShowWatch = ({}) => {
  const [showComments, setShowComments] = useState(false);
  const [closingComments, setClosingComments] = useState(false);
  const [videos, setVideos] = useState([]); // آرایه برای ذخیره داده‌های ویدیوها
  const { main } = useAppSelector((state) => state);
  const [isPlaying, setIsPlaying] = useState(true); // حالت پخش ویدیو
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAttachmentListByInviteId = asyncWrapper(async () => {
    const inviteId = main?.dobuleVideo?.child?.parentId;
    const res = await attachmentListByInviteId(inviteId);
    const { status, data } = res?.data;
    const allDataMap = data?.map((item: any) => {
      return item;
    });
    if (status === 0 && allDataMap.length >= 2) {
      const videoData = await Promise.all(
        allDataMap.map(async (item: any) => {
          const fixVideo = `wwwroot/${item?.attachmentType}/${item?.fileName}${item?.ext}`;
          const res = await attachmentPlay(fixVideo);
          return res;
        })
      );
      setVideos(videoData);
    }
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

  const handleLikeClick = (index: number) => {
    console.log(index);
    if (isLiked) {
      setIsLiked(!isLiked);
    }
  };

  useEffect(() => {
    handleAttachmentListByInviteId();
  }, []);

  const chunkedVideos = [];
  for (let i = 0; i < videos.length; i += 2) {
    chunkedVideos.push(videos.slice(i, i + 2));
  }

  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      mousewheel={true}
      modules={[Mousewheel]}
      className="mySwiper h-screen"
    >
      {chunkedVideos.map((videoPair, index: number) => (
        <SwiperSlide className="bg-black flex flex-col h-screen" key={index}>
          <div className="flex-1 relative">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center p-2">
                <ImageRank profileName="armanghdi_42341241241242142" />
                <span className="border px-3 py-1 text-white"> Fallow </span>
                <ThumbUpOffAltIcon
                  className={`text-white font30 cursor-pointer ${
                    isAnimating
                      ? isLiked
                        ? "like_animation text-blue"
                        : "unlike_animation"
                      : "text-white"
                  } ${isLiked ? "text-blue-500" : ""}`}
                  onClick={() => handleLikeClick(1)}
                />
              </div>
              <div className="flex-1">
                <Video
                  loop
                  handleVideo={() => setIsPlaying(!isPlaying)}
                  url={videoPair[0]}
                  playing={isPlaying}
                />
              </div>
              <div className="flex justify-end items-center p-2">
                <ChatBubbleOutlineIcon
                  className="text-white font25 cursor-pointer"
                  onClick={handleShowCMT}
                />
                <span className="text-white ml-1">1,529</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center p-2 ">
                <ImageRank />
                <span className="border px-3 py-1 text-white"> Fallow </span>
                <ThumbUpOffAltIcon
                  className={`text-white font30 cursor-pointer ${
                    isAnimating
                      ? isLiked
                        ? "like_animation"
                        : "unlike_animation"
                      : ""
                  } ${isLiked ? "text-blue-500" : ""}`}
                  onClick={() => handleLikeClick(2)}
                />
              </div>
              <div className="flex-1 w-[100%] h-[36vh]">
                <Video
                  className="video_container"
                  loop
                  handleVideo={() => setIsPlaying(!isPlaying)}
                  url={videoPair[1]}
                  playing={isPlaying}
                />
              </div>
              <div className="flex mb-14  justify-end items-center p-2">
                <ChatBubbleOutlineIcon
                  className="text-white font25 cursor-pointer"
                  onClick={handleShowCMT}
                />
                <span className="text-white ml-1">1,529</span>
              </div>
            </div>
          </div>

          {showComments && (
            <Comments
              handleShowCMT={handleShowCMT}
              closingComments={closingComments}
            />
          )}
        </SwiperSlide>
      ))}

      {showComments && (
        <Comments
          handleShowCMT={handleShowCMT}
          closingComments={closingComments}
        />
      )}
    </Swiper>
  );
};

export default ShowWatch;
