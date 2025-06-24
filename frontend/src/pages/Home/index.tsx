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
      const { data, status } = res?.data;
      if (status === 0) {
        setAllDableWatch(data);
      }
    } catch (error) {
      console.log(error);
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

  const videoGroups = getVideosForDisplay(allDableWatch);

  const checkIsMy = (group: any) => {
    return (group?.parent?.userId || group?.child?.userId) === Number(userId);
  };

  const videoGroupsWithOwnership = useMemo(() => {
    return videoGroups.map((group) => {
      const itsMyVideo = checkIsMy(group);
      return { ...group, itsMyVideo };
    });
  }, [videoGroups, userId]);

  const handleVideoPlay = (index: number) => {
    setPlayingIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (!!main?.userLogin?.userId) {
      handleGiveVideos();
    }
  }, [main?.userLogin?.userId]);

  return (
    <div className="relative h-screen md:mt-10 w-full bg-black overflow-hidden">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        className="h-full w-full"
        onSlideChange={(swiper) => handleVideoPlay(swiper.activeIndex)}
      >
        {videoGroupsWithOwnership.map((group, index) => {
          const { parent, child } = group;
          const videoUrl1 = `${baseURL}/${parent?.attachmentType}/${parent?.fileName}${parent?.ext}`;
          const videoUrl2 = `${baseURL}/${child?.attachmentType}/${child?.fileName}${child?.ext}`;
          const fixProfileImageParent = `${baseURL}/${parent?.profile?.attachmentType}/${parent?.profile?.fileName}${parent?.profile?.ext}`;
          const fixProfileImageChild = `${baseURL}/${child?.profile?.attachmentType}/${child?.profile?.fileName}${child?.profile?.ext}`;
          const isPlaying = playingIndex === index;

          return (
            <SwiperSlide key={index} className="h-full w-full">
              <div className="h-1/2 w-full flex flex-col">
                <div className="flex-shrink-0 p-2">
                  <ImageRank
                    userName={parent?.userName}
                    classUserName="text-white font-bold"
                    imgSize={50}
                    imgSrc={fixProfileImageParent}
                    score={parent?.score || 0}
                    rankWidth={40}
                    starWidth={5}
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <Video
                      url={videoUrl1}
                      playing={isPlaying}
                      loop={true}
                      muted={false}
                      handleVideo={() => handleVideoPlay(index)}
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              </div>
              <div className="h-1/2 w-full flex flex-col">
                <div className="flex-shrink-0 p-2">
                  <ImageRank
                    userName={child?.userName}
                    classUserName="text-white font-bold"
                    imgSize={50}
                    imgSrc={fixProfileImageChild}
                    score={child?.score || 0}
                    rankWidth={40}
                    starWidth={5}
                  />
                </div>

                {/* Video برای نیمه پایینی */}
                <div className="flex-1 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <Video
                      url={videoUrl2}
                      playing={isPlaying}
                      loop={true}
                      muted={false}
                      handleVideo={() => handleVideoPlay(index)}
                      width="100%"
                      height="100%"
                    />
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
