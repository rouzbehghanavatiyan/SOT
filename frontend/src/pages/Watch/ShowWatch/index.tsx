import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  addFollower,
  addLike,
  attachmentListByInviteId,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";

const userIdFromSStorage = sessionStorage.getItem("userId");

const ShowWatch: React.FC = ({}) => {
  const { main } = useAppSelector((state: any) => state);
  const swiperRef = useRef<any>(null);
  const location = useLocation();
  const chunkedVideos: any = [];
  const getInvitedId = location?.search?.split("id=")?.[1];
  const socket = main?.socketConfig;
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(
    null
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showComments, setShowComments] = useState<boolean>(false);
  // const fixTitle = isFollowed === null ? "Unfollow" : isFollowed === null ? "Follow"
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

  const handleUseDropDown = () => {};

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    setActiveSlideIndex(realIndex);
    setCurrentlyPlayingId(null);
    if (chunkedVideos[realIndex] && chunkedVideos[realIndex].length > 0) {
      const topVideo = chunkedVideos[realIndex][0];
      setCurrentlyPlayingId(topVideo.id);
    }
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

  const handleAttachmentListByInviteId = asyncWrapper(async () => {
    const res = await attachmentListByInviteId(getInvitedId);
    const { status, data } = res?.data;

    if (status === 0 && data?.length >= 2) {
      const videoData = data.map((item: any, index: number) => {
        const attachment =
          index === 0 ? item.attachmentInserted : item.attachmentMatched;
        const fixVideo = `${baseURL}/${attachment?.attachmentType}/${attachment?.fileName}${attachment?.ext}`;

        const fixProfile =
          index === 0 ? item.profileInserted : item.profileMatched;

        const fixUsername =
          index === 0
            ? item.userInserted?.userName
            : item.userMatched?.userName;

        return {
          url: fixVideo,
          profile: fixProfile,
          followerId: item?.followerId,
          videoUser: item?.userId,
          like: index === 0 ? item.likeInserted : item.likeMatched,
          score: item?.score,
          id: attachment?.attachmentId,
          userName: fixUsername,
          isLikedFromMe: item?.isLikedFromMe || false,
          isFollowedFromMe: item?.followerId !== null,
        };
      });
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
        socket.emit("remove_liked", postData);
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

  useEffect(() => {
    if (videos.length > 0) {
      setCurrentlyPlayingId(videos[0].id);
    }
  }, [videos]); // وابسته به تغییرات videos

  for (let i = 0; i < videos.length; i += 2) {
    chunkedVideos.push(videos.slice(i, i + 2));
  }

  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      mousewheel={true}
      onSlideChange={handleSlideChange}
      modules={[Mousewheel]}
      onInit={(swiper) => {
        if (videos.length > 0) {
          setCurrentlyPlayingId(videos[0].id);
        }
      }}
      className="mySwiper   h-[calc(100vh-47px)]"
    >
      {chunkedVideos.map((videoPair: any, index: number) => (
        <SwiperSlide className="bg-black flex  flex-col" key={index}>
          {videoPair.map((video: any, subIndex: any) => {
            const isLiked = video.isLikedFromMe;
            const isPlaying = currentlyPlayingId === video.id;
            const isFollowed = video.isFollowedFromMe;
            const checkMyVideo =
              video?.videoUser !== Number(main?.userLogin?.userId);
            const getProfile = StringHelpers?.getProfile(video.profile);
            const isTopVideo = subIndex === 0;
            const shouldAutoPlay = isTopVideo && index === activeSlideIndex;
            return (
              <div className="flex-1 relative h-[48vh]" key={subIndex}>
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center p-2">
                    <span onClick={handleUseDropDown}>
                      <ImageRank
                        rankStyle="w-8 h-8"
                        imgSize={50}
                        score={40}
                        imgSrc={getProfile}
                        classUserName="text-white"
                        userName={video?.userName}
                      />
                    </span>
                    {checkMyVideo && (
                      <Follows
                        bgColor="bg-white"
                        title={isFollowed ? "Unfollow" : "Follow"}
                        onClick={() => handleFallowClick(video)}
                      />
                    )}
                    {isLiked ? (
                      <MoreVertIcon
                        className="text-white font35 cursor-pointer"
                        onClick={() => handleLikeClick(video)}
                      />
                    ) : (
                      <MoreVertIcon
                        className="text-white font35 cursor-pointer"
                        onClick={() => handleLikeClick(video)}
                      />
                    )}
                  </div>
                  <div className="flex-1 flex  justify-center items-center">
                    <div className="absolute left-0 right-0 bottom-10 z-50">
                      <div className="flex justify-between items-center w-full px-4 py-2">
                        <ChatBubbleOutlineIcon
                          onClick={() => setShowComments(true)}
                          className="font30 text-white"
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
                    </div>
                    <Video
                      key={video.id}
                      videoId={video.id}
                      className="max-w-full max-h-[35vh] w-auto h-[50vh] object-contain"
                      loop
                      playing={isPlaying}
                      handleVideo={() => handleVideoPlay(video.id)}
                      url={video.url}
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
