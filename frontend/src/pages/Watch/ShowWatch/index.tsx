import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  addFollower,
  addLike,
  attachmentListByInviteId,
  attachmentPlay,
  removeFollower,
  removeLike,
} from "../../../services/dotNet";
import asyncWrapper from "../../../common/AsyncWrapper";
import Video from "../../../components/Video";
import { useAppSelector } from "../../../hooks/hook";
import Comments from "../../../common/Comments";
import ImageRank from "../../../components/ImageRank";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Mousewheel } from "swiper/modules";
import Follows from "../../../components/Fallows";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const userIdFromSStorage = sessionStorage.getItem("userId");

const ShowWatch = ({}) => {
  const { main } = useAppSelector((state: any) => state);
  const socket = main?.socketConfig;
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(
    null
  );
  const [showComments, setShowComments] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [followTitle, setFollowTitle] = useState<any>({
    title: "Follow",
    userId: 0,
  });
  const [closingComments, setClosingComments] = useState<boolean>(false);
  const [videos, setVideos] = useState<
    Array<{
      url: string;
      videoUser: number;
      like: number;
      score: number;
      id: string;
      userName: string;
      isLikedFromMe?: boolean;
      isFollowedFromMe?: boolean;
    }>
  >([]);

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

  // تغییر تابع handleAttachmentListByInviteId برای اضافه کردن فیلدهای جدید
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
          const fixVideo = `${baseURL}/${item?.attachmentType}/${item?.fileName}${item?.ext}`;

          const res = await attachmentPlay(fixVideo);
          const fixRes = res.split("path=")[1];
          console.log(fixRes);

          return {
            url: fixRes,
            videoUser: item?.userId,
            like: item?.like,
            score: item?.score,
            id: item?.movieId,
            userName: item?.userName,
            isLikedFromMe: false, // مقدار پیش‌فرض
            isFollowedFromMe: false, // مقدار پیش‌فرض
          };
        })
      );
      setVideos(videoData);
    }
  });

  const handleVideoPlay = (videoId: string) => {
    setCurrentlyPlayingId((prevId) => {
      // اگر ویدیوی در حال پخش همان ویدیوی کلیک شده باشد، آن را متوقف کن
      if (prevId === videoId) {
        return null;
      }
      // در غیر این صورت ویدیوی جدید را پخش کن
      return videoId;
    });
  };

  const handleLikeClick = asyncWrapper(async (video: any) => {
    const postData = {
      userId: Number(userIdFromSStorage) || main?.userLogin?.userId || null,
      movieId: video?.id,
    };

    socket.emit("add_liked", postData);

    // آپدیت موقت وضعیت لایک در state (برای UX بهتر)
    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v.id === video.id ? { ...v, isLikedFromMe: !v.isLikedFromMe } : v
      )
    );

    try {
      if (video.isLikedFromMe) {
        // اگر قبلاً لایک شده بود، removeLike را فراخوانی کن
        await removeLike(postData);
      } else {
        // اگر لایک نشده بود، addLike را فراخوانی کن
        const resAddLike = await addLike(postData);
        console.log(resAddLike?.data);
      }
    } catch (error) {
      console.error("Error in like operation:", error);
      // بازگرداندن وضعیت قبلی در صورت خطا
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v.id === video.id ? { ...v, isLikedFromMe: !v.isLikedFromMe } : v
        )
      );
    }
  });

  const handleFallowClick = asyncWrapper(async (video: any) => {
    const postData: any = {
      userId: Number(main?.userLogin?.userId),
      followerId: video?.videoUser,
    };

    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v.id === video.id ? { ...v, isFollowedFromMe: !v.isFollowedFromMe } : v
      )
    );

    console.log(video);
    try {
      if (video.isFollowedFromMe) {
        const res = await removeFollower(postData);
        const { status, data } = res?.data;
        if (status === 0) {
          setFollowTitle({ title: "Follow", userId: video?.videoUser });
        }
      } else {
        console.log(video);
        const res = await addFollower(postData);
        const { status, data } = res?.data;
        if (status === 0) {
          setFollowTitle({ title: "Unfollow", userId: data?.userId });
        }
      }
    } catch (error) {
      console.error("Error in follow operation:", error);
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v.id === video.id
            ? { ...v, isFollowedFromMe: !v.isFollowedFromMe }
            : v
        )
      );
    }
  });

  // تغییر در بخش رندر برای استفاده از مقادیر جدید
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
      className="mySwiper h-[calc(100vh-47px)]"
    >
      {chunkedVideos.map((videoPair, index: number) => (
        <SwiperSlide className="bg-black flex flex-col space-y-4" key={index}>
          {videoPair.map((video, subIndex) => {
            const isLiked = video.isLikedFromMe || false;
            const isFollowed = video.isFollowedFromMe || false;
            const isPlaying = currentlyPlayingId === video.id;
            return (
              <div className="flex-1 relative h-[48vh]" key={subIndex}>
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center p-2">
                    <ImageRank
                      classUserName="text-white"
                      userName={video?.userName}
                    />
                    <Follows
                      bgColor="bg-white"
                      title={isFollowed ? "Unfollow" : "Follow"}
                      onClick={() => handleFallowClick(video)}
                    />
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
                  <div className="flex-1 flex justify-center items-center">
                    <ChatBubbleOutlineIcon className="z-50 absolute left-2 bottom-10 font30 text-white" />
                    <Video
                      className="max-w-full max-h-[35vh] w-auto h-[50vh] object-contain"
                      loop
                      handleVideo={() => handleVideoPlay(video.id)}
                      url={video.url}
                      playing={isPlaying}
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
