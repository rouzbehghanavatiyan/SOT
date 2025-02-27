import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  addLike,
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
  const [showComments, setShowComments] = useState<boolean>(false);
  const [closingComments, setClosingComments] = useState<boolean>(false);
  const [videos, setVideos] = useState<string[]>([]);
  const { main } = useAppSelector((state: any) => state);
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // حالت پخش ویدیو
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleAttachmentListByInviteId = asyncWrapper(async () => {
    const inviteId = main?.dobuleVideo?.child?.parentId;
    const res = await attachmentListByInviteId(inviteId);

    const { status, data } = res?.data;
    console.log(data);
    const allDataMap = data?.map((item: any) => {
      return item;
    });
    if (status === 0 && allDataMap.length >= 2) {
      const videoData = await Promise.all(
        allDataMap.map(async (item: any) => {
          const fixVideo = `wwwroot/${item?.attachmentType}/${item?.fileName}${item?.ext}`;
          const res = await attachmentPlay(fixVideo);
          return {
            url: res,
            like: item?.like,
            score: item?.score,
            id: item?.id,
            userName: item?.userName,
          };
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

  const handleLikeClick = asyncWrapper(async (video: any) => {
    console.log(video);
    const postData = {
      userId: 0,
      movieId: 0,
    };
    const res = await addLike(postData);
    const { data, status } = res?.data;
    console.log(data);
    setIsLiked(!isLiked);
  });

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
          {videoPair.map((video, subIndex) => {
            return (
              <div className="mb-12 flex-1 relative" key={subIndex}>
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center p-2">
                    <ImageRank profileName={video?.userName} />
                    <span className="border px-3 py-1 text-white">Follow</span>
                    <ThumbUpOffAltIcon
                      className={`text-white font30 cursor-pointer ${
                        isLiked
                          ? "like_animation text-blue"
                          : "unlike_animation"
                      } ${isLiked ? "text-blue-500" : ""}`}
                      onClick={() => handleLikeClick(video)}
                    />
                  </div>
                  <div className="flex-1">
                    <Video
                      loop
                      handleVideo={() => setIsPlaying(!isPlaying)}
                      url={video.url}
                      playing={isPlaying}
                    />
                  </div>
                  {/* <div className="flex justify-end items-center p-2">
                    <ChatBubbleOutlineIcon
                      className="text-white font25 cursor-pointer"
                      onClick={handleShowCMT}
                    />
                    <span className="text-white ml-1">{video.like}</span>
                  </div> */}
                </div>
              </div>
            );
          })}
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
