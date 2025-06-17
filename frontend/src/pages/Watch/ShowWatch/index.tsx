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
import { useLocation } from "react-router-dom";
import StringHelpers from "../../../utils/helpers/StringHelper";

const userIdFromSStorage = sessionStorage.getItem("userId");

const ShowWatch: React.FC = ({}) => {
  const { main } = useAppSelector((state: any) => state);
  const location = useLocation();

  const getInvitedId = location?.search?.split("id=")?.[1];
  const socket = main?.socketConfig;
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(
    null
  );
  const [showComments, setShowComments] = useState<boolean>(false);

  const [closingComments, setClosingComments] = useState<boolean>(false);
  const [videos, setVideos] = useState<
    Array<{
      url: string;
      videoUser: number;
      like: number;
      score: number;
      id: string;
      userName: string;
      isLikedFromMe: boolean;
      isFollowedFromMe: boolean;
      followerId: number | null;
      profile: string;
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

  const handleAttachmentListByInviteId = asyncWrapper(async () => {
    const res = await attachmentListByInviteId(getInvitedId);
    const { status, data } = res?.data;

    if (status === 0 && data?.length >= 2) {
      const videoData = await Promise.all(
        data.map(async (item: any) => {
          const fixVideo = `${baseURL}/${item?.attachmentType}/${item?.fileName}${item?.ext}`;
          const res = await attachmentPlay(fixVideo);
          const fixRes = res.split("path=")[1];
          return {
            url: fixRes,
            profile: item?.profile,
            followerId: item?.followerId,
            videoUser: item?.userId,
            like: item?.like,
            score: item?.score,
            id: item?.movieId,
            userName: item?.userName,
            isLikedFromMe: item?.isLikedFromMe || false,
            isFollowedFromMe: item?.followerId !== null,
          };
        })
      );
      setVideos(videoData);
    }
  });

  const handleVideoPlay = (videoId: string) => {
    setCurrentlyPlayingId((prevId) => {
      if (prevId === videoId) {
        return null;
      }
      return videoId;
    });
  };

  const handleLikeClick = asyncWrapper(async (video: any) => {
    const postData = {
      userId: Number(userIdFromSStorage) || main?.userLogin?.userId || null,
      movieId: video.id,
    };
    try {
      if (video.isLikedFromMe) {
        await removeLike(postData);
        setVideos((prevVideos) =>
          prevVideos.map((v) =>
            v.id === video.id
              ? { ...v, isLikedFromMe: false, like: v.like - 1 }
              : v
          )
        );
      } else {
        await addLike(postData);
        socket.emit("add_liked", postData);
        setVideos((prevVideos) =>
          prevVideos.map((v) =>
            v.id === video.id
              ? { ...v, isLikedFromMe: true, like: v.like + 1 }
              : v
          )
        );
      }
    } catch (error) {
      console.error("Error in like operation:", error);
    }
  });
  const handleFallowClick = asyncWrapper(async (video: any) => {
    const postData = {
      userId: Number(main?.userLogin?.userId),
      movieId: video.id, // اضافه کردن movieId
      followerId: video.videoUser,
    };

    try {
      if (video.isFollowedFromMe) {
        // اگر قبلا فالو شده، آنفالو کن
        await removeFollower(postData);
        setVideos((prevVideos) =>
          prevVideos.map((v) =>
            v.id === video.id
              ? { ...v, isFollowedFromMe: false, followerId: null }
              : v
          )
        );
      } else {
        // اگر فالو نشده، فالو کن
        const res = await addFollower(postData);
        if (res.data.status === 0) {
          setVideos((prevVideos) =>
            prevVideos.map((v) =>
              v.id === video.id
                ? { ...v, isFollowedFromMe: true, followerId: postData.userId }
                : v
            )
          );
        }
      }
    } catch (error) {
      console.error("Error in follow operation:", error);
    }
  });

  useEffect(() => {
    handleAttachmentListByInviteId();
  }, [getInvitedId]);

  const chunkedVideos = [];
  for (let i = 0; i < videos.length; i += 2) {
    chunkedVideos.push(videos.slice(i, i + 2));
  }

  const handleCommented = (video: any) => {
    console.log(video);
    setShowComments(true);
  };

  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      mousewheel={true}
      modules={[Mousewheel]}
      className="mySwiper h-[calc(100vh-47px)]"
    >
      {chunkedVideos.map((videoPair, index: number) => (
        <SwiperSlide className="bg-black flex  flex-col space-y-4" key={index}>
          {videoPair.map((video, subIndex) => {
            const isLiked = video.isLikedFromMe;
            const isPlaying = currentlyPlayingId === video.id;
            const isFollowed = video.isFollowedFromMe;
            const checkMyVideo =
              video?.videoUser !== Number(main?.userLogin?.userId);
            const getProfile = StringHelpers?.getProfile(video.profile);

            return (
              <div className="flex-1 relative h-[48vh]" key={subIndex}>
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center p-2">
                    <ImageRank
                      iconProfileStyle="font50 text-gray-100"
                      rankStyle="w-8 h-8"
                      imgSize={50}
                      score={50}
                      imgSrc={getProfile}
                      classUserName="text-white"
                      userName={video?.userName}
                    />
                    {checkMyVideo && (
                      <Follows
                        bgColor="bg-white"
                        title={isFollowed ? "Unfollow" : "Follow"}
                        onClick={() => handleFallowClick(video)}
                      />
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
                  <div className="flex-1 flex justify-center items-center">
                    <ChatBubbleOutlineIcon
                      onClick={() => handleCommented(video)}
                      className="z-50 absolute left-2 bottom-10 font30 text-white"
                    />
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
