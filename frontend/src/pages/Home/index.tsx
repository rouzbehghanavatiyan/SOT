import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Comments from "../../common/Comments";
import ImageRank from "../../components/ImageRank";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { followerAttachmentList } from "../../services/dotNet";
import { Mousewheel } from "swiper/modules";
import Video from "../../components/Video";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Home: React.FC = () => {
  const { main } = useAppSelector((state) => state);
  const [showComments, setShowComments] = useState(false);
  const [closingComments, setClosingComments] = useState(false);
  const [allDableWatch, setAllDableWatch] = useState<any[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const userId = sessionStorage.getItem("userId");
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

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

  const handleGiveVideos = async () => {
    try {
      const res = await followerAttachmentList(main?.userLogin?.userId);
      const { status, data } = res?.data;
      if (status === 0) {
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
          const fixUserId =
            index === 0 ? item.userInserted?.id : item.userMatched?.id;

          console.log(item);
          return {
            videoInserted: item?.attachmentInserted,
            videoMatched: item?.attachmentMatched,
            profileInserted: item?.profileInserted,
            profileMatched: item?.profileMatched,
            userInfoInserted: item?.userInserted,
            userInfoMatched: item?.userMatched,
            url: fixVideo,
            userId: fixUserId,
            followerId: item?.followerId,
            videoUser: item?.userId,
            likeInserted: item?.likeInserted,
            likeMatched: item?.likeMatched,
            score: item?.score,
            id: attachment?.attachmentId,
            userName: fixUsername,
            isLikedFromMe: item?.isLikedFromMe || false,
            isFollowedFromMe: item?.followerId !== null,
          };
        });
        setAllDableWatch(videoData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoPlay = (index: number) => {
    setPlayingIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (!!main?.userLogin?.userId) {
      handleGiveVideos();
    }
  }, [main?.userLogin?.userId]);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        className="mySwiper md:mt-20 md:h-[calc(100vh-100px)] h-[calc(100vh-92px)]"
        onSlideChange={(swiper) => handleVideoPlay(swiper.activeIndex)}
      >
        {allDableWatch.map((group, index) => {
          const videoUrl1 = `${baseURL}/${group?.videoInserted?.attachmentType}/${group?.videoInserted?.fileName}${group?.videoInserted?.ext}`;
          const videoUrl2 = `${baseURL}/${group?.videoMatched?.attachmentType}/${group?.videoMatched?.fileName}${group?.videoMatched?.ext}`;
          const profile1 = `${baseURL}/${group?.profileInserted?.attachmentType}/${group?.profileInserted?.fileName}${group?.profileInserted?.ext}`;
          const profile2 = `${baseURL}/${group?.profileMatched?.attachmentType}/${group?.profileMatched?.fileName}${group?.profileMatched?.ext}`;
          const isPlaying = playingIndex === index;
          console.log(group);

          return (
            <SwiperSlide
              key={index}
              className="h-full w-full bg-black flex flex-col"
            >
              <div className="h-1/2 w-full relative flex flex-col">
                <div className="flex-shrink-0 p-2 z-10 absolute bg_profile_watch">
                  <ImageRank
                    rankStyle="w-8 h-8"
                    classUserName="text-white"
                    iconProfileStyle="font50"
                    userName={group?.userInfoInserted?.userName}
                    imgSize={50}
                    imgSrc={profile1}
                    score={group?.score || 0}
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
                    <Video
                      url={videoUrl1}
                      playing={isPlaying}
                      className="w-full h-full object-contain"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                    <div className="absolute left-0 right-0 bottom-10 z-50">
                      <div className="flex justify-between items-center w-full px-4">
                        <ChatBubbleOutlineIcon
                          onClick={() => setShowComments(true)}
                          className="font30 text-white"
                        />
                        <div className="flex text-green justify-center  gap-1 items-center py-1">
                          <span className="flex items-center ">
                            <CheckCircleIcon className="text-green font20" />
                          </span>
                          <span className="font-bold font20">Win</span>
                        </div>
                        <div className="flex items-center text-gray-200 font18 justify-center">
                          {group?.likeInserted}
                          <ThumbUpIcon className="ms-1 font25 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1/2 w-full flex flex-col relative">
                <div className="flex-shrink-0 p-2 z-10 absolute bg_profile_watch">
                  <ImageRank
                    rankStyle="w-8 h-8"
                    userName={group?.userInfoMatched?.userName}
                    classUserName="text-white font-bold"
                    imgSize={50}
                    imgSrc={profile2}
                    score={group?.score || 0}
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
                    <Video
                      url={videoUrl2}
                      playing={isPlaying}
                      className="w-full h-full object-contain"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                    <div className="absolute left-0 right-0 bottom-10 z-50">
                      <div className="flex justify-between items-center w-full px-4">
                        <ChatBubbleOutlineIcon
                          onClick={() => setShowComments(true)}
                          className="font30 text-white"
                        />
                        <div className="flex text-red justify-center gap-1 items-center py-1 ">
                          <span className="flex items-center">
                            <CancelIcon className="text-red font20" />
                          </span>
                          <span className="font-bold font20">Loss</span>
                        </div>
                        <div className="flex items-center text-gray-200 font18 justify-center">
                          {group?.likeMatched}
                          <ThumbUpIcon className="ms-1 font25 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {showComments && (
        <Comments
          handleShowCMT={handleShowCMT}
          closingComments={closingComments}
        />
      )}
    </div>
  );
};

export default Home;
