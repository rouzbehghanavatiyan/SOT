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

const Home: React.FC = () => {
  const main = useAppSelector((state) => state?.main);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const videos: any = main?.allLoginMatch;
  const [openDropdowns, setOpenDropdowns] = useState<any>({});
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<any>(null);
  const userLogin = Number(main?.userLogin?.userId);
  const [commentsState, setCommentsState] = useState<any[]>(
    [] // آرایه‌ای برای مدیریت باز/بسته بودن کامنت‌ها
  );
  const [closingCommentsState, setClosingCommentsState] = useState<any[]>(
    [] // آرایه‌ای برای مدیریت انیمیشن بسته‌شدن کامنت‌ها
  );
  const [movieInfoState, setMovieInfoState] = useState<any[]>(
    [] // آرایه‌ای برای نگه‌داشتن اطلاعات مرتبط با هر کامنت
  );

  // مقداردهی اولیه state‌ها بر اساس تعداد ویدیوها
  useEffect(() => {
    if (videos.length > 0) {
      setCommentsState(Array(videos.length).fill(false)); // کامنت‌های بسته
      setClosingCommentsState(Array(videos.length).fill(false)); // انیمیشن بسته‌شدن
      setMovieInfoState(Array(videos.length).fill(null)); // اطلاعات کامنت‌ها
    }
  }, [videos]);
  // باز کردن کامنت برای اسلاید مشخص
  const handleToggleComments = (index: number, videoData: any) => {
    console.log(index, videoData);

    setMovieInfoState((prev) => {
      const newState = [...prev];
      newState[index] = videoData;
      return newState;
    });
    setCommentsState((prev) => {
      const newState = [...prev];
      newState[index] = true; // باز کردن کامنت
      return newState;
    });
  };

  // بستن کامنت برای اسلاید مشخص
  const handleCloseComments = (index: number) => {
    setClosingCommentsState((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });

    setTimeout(() => {
      setCommentsState((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
      setClosingCommentsState((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }, 150);
  };

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    const topVideoId = videos[realIndex]?.attachmentInserted?.attachmentId;
    setCurrentlyPlayingId(topVideoId);
  };

  const dropdownItems = (data: any, position: number, userSenderId: any) => {
    console.log(data);
    
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
    if (!!main?.userLogin?.userId) {
      dispatch(handleFollowerAttachmentList(main?.userLogin?.userId));
    }
  }, [main?.userLogin?.userId]);

  return (
    <div className="relative w-full bg-black md:h-[calc(100vh-100px)] h-[calc(100vh-92px)]">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
        }}
        modules={[Mousewheel]}
        className="mySwiper md:mt-10 md:h-[calc(100vh-100px)] h-[calc(100vh-92px)]"
        onSlideChange={handleSlideChange}
      >
        {videos?.length !== 0 &&
          videos?.map((video: any, index: number) => {
            const resultInserted =
              video?.likeInserted > video?.likeMatched
                ? true
                : video?.likeInserted < video?.likeMatched
                  ? false
                  : null;
            const resultMatched =
              video?.likeInserted < video?.likeMatched
                ? true
                : video?.likeInserted > video?.likeMatched
                  ? false
                  : null;

            return (
              <SwiperSlide
                key={index}
                className="h-full w-full bg-black flex flex-col"
              >
                <section className="flex flex-col h-screen">
                  <div className="flex-1 min-h-0 relative">
                    <VideoSection
                      showComments={commentsState[index]} // حالت باز بودن کامنت
                      closingComments={closingCommentsState[index]} // حالت انیمیشن بسته‌شدن
                      movieInfo={movieInfoState[index]} // اطلاعات مرتبط با کامنت
                      setShowComments={(val) => {
                        const newState = [...commentsState];
                        newState[index] = val;
                        setCommentsState(newState);
                      }}
                      setClosingComments={(val) => {
                        const newState = [...closingCommentsState];
                        newState[index] = val;
                        setClosingCommentsState(newState);
                      }}
                      handleShowCMT={() => handleToggleComments(0, video)} // ارسال تابع باز کردن کامنت
                      result={resultInserted}
                      video={video}
                      // isPlaying={
                      //   currentlyPlayingId ===
                      //   video?.attachmentInserted?.attachmentId
                      // }
                      // onVideoPlay={() =>
                      //   handleVideoPlay(video?.attachmentInserted?.attachmentId)
                      // }
                      dropdownItems={() =>
                        dropdownItems(video, 0, video?.userInserted)
                      }
                      setOpenDropdowns={setOpenDropdowns}
                      openDropdowns={openDropdowns}
                      positionVideo={0}
                      countLiked={video?.likeInserted}
                    />
                  </div>
                  <div className="flex-1 min-h-0 relative">
                    <VideoSection
                      showComments={commentsState[index]} // حالت باز بودن کامنت
                      closingComments={closingCommentsState[index]} // حالت انیمیشن بسته‌شدن
                      movieInfo={movieInfoState[index]} // اطلاعات مرتبط با کامنت
                      setShowComments={(val) => {
                        const newState = [...commentsState];
                        newState[index] = val;
                        setCommentsState(newState);
                      }}
                      setClosingComments={(val) => {
                        const newState = [...closingCommentsState];
                        newState[index] = val;
                        setClosingCommentsState(newState);
                      }}
                      handleShowCMT={() => handleToggleComments(1, video)} // ارسال تابع باز کردن کامنت
                      result={resultMatched}
                      video={video}
                      // isPlaying={
                      //   currentlyPlayingId ===
                      //   video?.attachmentMatched?.attachmentId
                      // }
                      // onVideoPlay={() =>
                      //   handleVideoPlay(video?.attachmentMatched?.attachmentId)
                      // }
                      onFollowClick={() =>
                        handleFallowClick(video, 1, video?.userMatched?.id)
                      }
                      dropdownItems={() =>
                        dropdownItems(video, 1, video?.userMatched)
                      }
                      openDropdowns={openDropdowns}
                      setOpenDropdowns={setOpenDropdowns}
                      positionVideo={1}
                      countLiked={video?.likeMatched}
                    />
                  </div>
                </section>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Home;
