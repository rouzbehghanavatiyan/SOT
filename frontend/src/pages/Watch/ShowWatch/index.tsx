import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  addLike,
  attachmentListByInviteId,
  attachmentPlay,
} from "../../../services/dotNet";
import asyncWrapper from "../../../common/AsyncWrapper";
import Video from "../../../components/Video";
import { useAppSelector } from "../../../hooks/hook";
import Comments from "../../../common/Comments";
import ImageRank from "../../../components/ImageRank";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Mousewheel } from "swiper/modules";

const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
const userIdFromSStorage = sessionStorage.getItem("userId");

const ShowWatch = ({}) => {
  const { main } = useAppSelector((state: any) => state);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [closingComments, setClosingComments] = useState<boolean>(false);
  const [videos, setVideos] = useState<any[]>([]);
  const socket = main?.socketConfig;
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({}); 
  const [likedVideoId, setLikedVideoId] = useState<string | null>(null);
  const [fallowedVideos, setFallowedVideos] = useState<{
    [key: string]: boolean;
  }>({});

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
            id: item?.movieId,
            userName: item?.userName,
          };
        })
      );
      setVideos(videoData);
    }
  });

  const handleFallowClick = asyncWrapper(async (video: any) => {
    setFallowedVideos((prev) => ({
      ...prev,
      [video.id]: !prev[video.id],
    }));
  });

  const handleLikeClick = asyncWrapper(async (video: any) => {
    const postData = {
      userId: Number(userIdFromSStorage) || main?.userLogin?.userId || null,
      movieId: video?.id,
    };

    socket.emit("add_liked", postData);

    const res = await addLike(postData);
    const { data, status } = res?.data;
    console.log(data);

    // اگر ویدیوی فعلی قبلاً لایک شده بود، لایک آن را بردارید
    if (likedVideoId === video.id) {
      setLikedVideoId(null); // لایک را بردارید
    } else {
      setLikedVideoId(video.id); // ویدیوی جدید را لایک کنید
    }
  });

  const handleVideoPlay = (videoId: string) => {
    setIsPlaying((prev) => ({
      ...prev,
      [videoId]: !prev[videoId], // تغییر وضعیت پخش ویدیوی خاص
    }));
  };

  useEffect(() => {
    handleAttachmentListByInviteId();
  }, []);

  const handleGiveLiked = () => {};

  useEffect(() => {
    socket.on("add_liked_response", handleGiveLiked);
    return () => {
      if (socket) {
        socket.off("add_liked_response", handleGiveLiked);
      }
    };
  }, [socket]);

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
            const isLiked = likedVideoId === video.id;
            const isFallowed = fallowedVideos[video.id] || false;
            const isVideoPlaying = isPlaying[video.id] || false; // وضعیت پخش ویدیوی فعلی
            return (
              <div className="mb-12 flex-1 relative" key={subIndex}>
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center p-2">
                    <ImageRank profileName={video?.userName} />
                    {isFallowed ? (
                      <span
                        className="border px-3 py-1 bg-white text-black"
                        onClick={() => handleFallowClick(video)}
                      >
                        Unfollow
                      </span>
                    ) : (
                      <span
                        className="border px-3 py-1 text-white"
                        onClick={() => handleFallowClick(video)}
                      >
                        Follow
                      </span>
                    )}
                    {isLiked ? (
                      <ThumbUpIcon
                        className="text-white font35 unlike_animation cursor-pointer"
                        onClick={() => handleLikeClick(video)}
                      />
                    ) : (
                      <ThumbUpOffAltIcon
                        className="text-white font35 cursor-pointer"
                        onClick={() => handleLikeClick(video)}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <Video
                      loop
                      handleVideo={() => handleVideoPlay(video.id)} // تغییر وضعیت پخش ویدیوی خاص
                      url={video.url}
                      playing={isVideoPlaying} // وضعیت پخش ویدیوی فعلی
                    />
                  </div>
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
