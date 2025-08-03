import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Mousewheel } from "swiper/modules";
import VideoSection from "../../common/VideoSection";
import { handleFollowerAttachmentList } from "../../common/Slices/main";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import ReportIcon from "@mui/icons-material/Report";
import EmailIcon from "@mui/icons-material/Email";
import StringHelpers from "../../utils/helpers/StringHelper";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import Loading from "../../components/Loading";

const Home: React.FC = () => {
  const main = useAppSelector((state) => state?.main);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const videos: any = main?.allLoginMatch;

  const [openDropdowns, setOpenDropdowns] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<any>(null);
  const userIdLogin = main?.userLogin?.user?.id;

  const handleSlideChange = (swiper: any) => {
    console.log();
    const realIndex = swiper.realIndex;
    const topVideoId = videos[realIndex]?.attachmentInserted?.attachmentId;
    setCurrentlyPlayingId(topVideoId);
  };

  const handleVideoPlay = (videoId: string) => {
    setOpenDropdowns({});
    setCurrentlyPlayingId((prevId: any) => {
      console.log(prevId);
      if (prevId === videoId) {
        return null;
      }
      return videoId;
    });
  };

  const dropdownItems = (data: any, position: number, userSenderId: any) => {
    const temp = {
      sender: position === 0 ? data?.userInserted?.id : data?.userMatched?.id,
      userProfile:
        position === 0
          ? StringHelpers.getProfile(data?.profileInserted)
          : StringHelpers.getProfile(data?.profileMatched),
      userNameSender:
        position === 0
          ? data?.userInserted?.userName
          : data?.userMatched?.userName,
    };

    return [
      {
        label: "Send message",
        icon: <EmailIcon className="text-gray-800 font20" />,
        onClick: () =>
          navigate(`/privateMessage?id=${userSenderId?.id}`, {
            state: {
              userInfo: temp,
            },
          }),
      },
      {
        label: "Share via",
        icon: <ShareIcon className="text-gray-800 font20" />,

        onClick: () => console.log(data),
      },
      {
        label: "Report",
        icon: <ReportIcon className="text-gray-800 font20" />,
        onClick: () => alert("اعلان‌ها"),
      },
      {
        label: "Save",
        icon: <TurnedInNotIcon className="text-gray-800 font20" />,
        onClick: () => alert("اعلان‌ها"),
      },

      { divider: true },
    ];
  };

  useEffect(() => {
    if (videos.length > 0) {
      setCurrentlyPlayingId(videos[0]?.attachmentInserted?.attachmentId);
    }
  }, [videos]);

  useEffect(() => {
    if (!!userIdLogin) {
      dispatch(handleFollowerAttachmentList(userIdLogin));
    }
  }, [userIdLogin]);

  console.log(main?.showLoading?.value);

  return (
    <>
      {main?.showLoading?.value ? (
        <Loading isLoading={main?.showLoading?.value} />
      ) : (
        <div className="relative w-full bg-black md:h-[calc(100vh-100px)] h-[calc(100vh-92px)]">
          {videos?.length > 0 ? (
            <Swiper
              direction={"vertical"}
              slidesPerView={1}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
              }}
              modules={[Mousewheel]}
              className="mySwiper md:mt-10 md:h-[calc(100vh-100px)] h-[calc(100vh-97px)]"
              onSlideChange={handleSlideChange}
            >
              {videos?.map((video: any, index: number) => {
                const resultInserted =
                  video?.likeInserted > video?.likeMatched
                    ? "Win"
                    : video?.likeInserted < video?.likeMatched
                      ? "Loss"
                      : "Draw";
                const resultMatched =
                  video?.likeInserted < video?.likeMatched
                    ? "Win"
                    : video?.likeInserted > video?.likeMatched
                      ? "Loss"
                      : "Draw";

                return (
                  <SwiperSlide
                    key={index}
                    className="h-full w-full bg-black flex flex-col"
                  >
                    <section className="flex flex-col h-screen">
                      <div className="flex-1 min-h-0 relative">
                        <VideoSection
                          score={video?.scoreInserted}
                          countLiked={video?.likeInserted || 0}
                          result={resultInserted}
                          video={video}
                          isPlaying={
                            currentlyPlayingId ===
                            video?.attachmentInserted?.attachmentId
                          }
                          onVideoPlay={() =>
                            handleVideoPlay(
                              video?.attachmentInserted?.attachmentId
                            )
                          }
                          dropdownItems={() =>
                            dropdownItems(video, 0, video?.userInserted)
                          }
                          setOpenDropdowns={setOpenDropdowns}
                          openDropdowns={openDropdowns}
                          baseURL={baseURL}
                          positionVideo={0}
                        />
                      </div>
                      <div className="flex-1 min-h-0 relative">
                        <VideoSection
                          score={video?.scoreMatched}
                          video={video}
                          result={resultMatched}
                          isPlaying={
                            currentlyPlayingId ===
                            video?.attachmentMatched?.attachmentId
                          }
                          onVideoPlay={() =>
                            handleVideoPlay(
                              video?.attachmentMatched?.attachmentId
                            )
                          }
                          dropdownItems={() =>
                            dropdownItems(video, 1, video?.userMatched)
                          }
                          countLiked={video?.likeMatched || 0}
                          openDropdowns={openDropdowns}
                          setOpenDropdowns={setOpenDropdowns}
                          baseURL={baseURL}
                          positionVideo={1}
                        />
                      </div>
                    </section>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="flex flex-col bg-white items-center justify-center h-full p-4">
              <div className="font20   text-white bg-primary font-bold rounded-lg p-4 mb-2">
                No match available
              </div>
              <p className="text-gray-400 text-primary mt-10 text-center">
                Dear user, you don't have any following to view at this time.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
