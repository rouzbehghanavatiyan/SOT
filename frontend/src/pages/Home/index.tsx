import React, { useEffect, useMemo, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import demoVid from "../../../../../00b16493dc977a745b7207f06d8a159a59064958-480p.mp4";
import demoVid2 from "../../../../../24973359cdff3b2ea4d251b3dc1a919611425919-360p.mp4";
import Comments from "../../common/Comments";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import rank1 from "../../assets/img/rank10.webp";
import rank2 from "../../assets/img/rank3.webp";
import rank3 from "../../assets/img/rank5.webp";
import OptionHomes from "./OptionHomes";
import cook3 from "../../assets/img/cook3.jpg";
import cook4 from "../../assets/img/cook4.jpg";
import inv5 from "../../assets/img/inv5.jpg";
import Video from "../../components/Video";
import { userAttachmentList } from "../../services/dotNet";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";

const dubleVideos = [
  {
    img: cook3,
    rank: rank1,
    username: "sara5-132321312312",
    type: "Loss",
    color: "red",
    comments: "4,683",
    cupPro: null,
  },
  {
    img: cook4,
    rank: rank2,
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: inv5,
    rank: rank3,
    username: "jackrooo-1",
    type: "Success",
    color: "orange-hover",
    comments: "120k",
    cupPro: null,
  },
  {
    img: cook3,
    rank: rank3,
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: inv5,
    rank: rank3,
    username: "jackrooo-1",
    type: "Success",
    color: "orange-hover",
    comments: "20k",
    cupPro: null,
  },
];

const Home: React.FC = () => {
  const { main } = useAppSelector((state) => state);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [closingComments, setClosingComments] = useState(false);
  const [isPlayingBottom, setIsPlayingBottom] = useState(false);
  const [isPlayingTop, setIsPlayingTop] = useState(false);
  const [allDableWatch, setAllDableWatch] = useState<any[]>([]);
  const userId = sessionStorage.getItem("userId");
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const handleExpand = (index: any) => {
    setExpandedVideo((prev) => (prev === index ? null : index));
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

  const handleVideoBottom = () => {
    setIsPlayingBottom(!isPlayingBottom);
  };

  const handleVideoTop = () => {
    setIsPlayingTop(!isPlayingTop);
  };

  const handleGiveVideos = async () => {
    try {
      console.log(main?.userLogin?.userId);
      const res = await userAttachmentList(main?.userLogin?.userId);
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
        console.log(parentItem);
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

  useEffect(() => {
    const hasMyVideo = videoGroupsWithOwnership.some(
      (group) => group.itsMyVideo
    );
    setIsTimerActive(hasMyVideo);
  }, [videoGroupsWithOwnership, dispatch]);

  useEffect(() => {
    if (!!main?.userLogin?.userId) {
      handleGiveVideos();
    }
  }, [main?.userLogin?.userId]);

  return (
    <>
      {/* <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        className="mySwiper h-screen"
      >
        <div className="grid grid-cols-1  md:grid-cols-3 justify-centerbg-white">
          <div className="h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center bg-white h-[80%]">
              {dubleVideos.map((profile, index) => (
                <SwiperSlide
                  key={index}
                  className="bg-white relative flex flex-col"
                >
                  <OptionHomes result profile={profile} />
                  <div className="w-[100%] h-[30vh]">
                    <Video
                      loop
                      handleVideo={handleVideoTop}
                      url={demoVid}
                      playing={isPlayingTop}
                    />
                  </div>
                  <OptionHomes useFollow profile={profile} />
                  <div className="w-[100%] h-[30vh]">
                    <Video
                      loop
                      handleVideo={handleVideoBottom}
                      url={demoVid2}
                      playing={isPlayingBottom}
                    />
                  </div>
                  <div className="flex  items-center gap-1 m-2">
                    <span onClick={handleShowCMT}>
                      <ChatBubbleOutlineIcon className="text-black font20 cursor-pointer" />
                    </span>
                    <span className="text-black"> 1,529 </span>
                  </div>
                  <div className="flex bg-white items-center gap-1 m-2 max-h-[50px] overflow-hidden text-ellipsis line-clamp-2">
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test
                  </div>
                </SwiperSlide>
              ))}
            </div>
            {showComments && (
              <Comments
                handleShowCMT={handleShowCMT}
                closingComments={closingComments}
              />
            )}
          </div>
        </div>
      </Swiper> */}
      {videoGroupsWithOwnership.map((group, index) => {
        const { parent, child, itsMyVideo } = group;
        const fixImg1 = `${baseURL}/${parent?.attachmentType}/${parent?.fileName}${parent?.ext}`;

        const fixImg2 = child
          ? `${baseURL}/${child.attachmentType}/${child.fileName}${child.ext}`
          : "";
        return (
          <>
            <div
              onClick={() => handleShowMatch({ group, index })}
              className={`flex-1 flex flex-col ${
                itsMyVideo ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
              }`}
            >
              <div className="flex-1">
                <span className="relative block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                  <img
                    src={fixImg1}
                    alt={parent?.alt || "Parent Image"}
                    className={`w-full ${
                      itsMyVideo ? "min-h-88 max-h-88" : "min-h-44 max-h-44"
                    } object-cover ${itsMyVideo ? "max-h-[40vh]" : ""}`}
                  />
                  {itsMyVideo && (
                    <span className="absolute top-0 w-full bg_profile_watch">
                      <div className="flex justify-between items-center mx-2">
                        <ImageRank
                          profileName={parent?.userName || "Unknown"}
                          profileFontColor="white"
                          score={parent?.score || 0}
                          rankWidth={45}
                          starWidth={6}
                          className="absolute bottom-0"
                        />
                        <div className="flex gap-2">
                          <span className="font20 font-bold text-white">
                            24K
                          </span>
                          <ThumbUpOffAltIcon className="font25 text-white" />
                        </div>
                      </div>
                    </span>
                  )}
                </span>
              </div>
              {child && (
                <div className="flex-1 bg-white">
                  <div className="flex-1">
                    <figure className=" relative  block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                      <img
                        src={fixImg2}
                        alt={child?.alt || "Profile image"}
                        className={`w-full ${
                          itsMyVideo ? "min-h-88 max-h-88" : "min-h-44 max-h-44"
                        } object-cover ${itsMyVideo ? "max-h-[40vh]" : ""}`} // اضافه کردن max-height برای itsMyVideo
                      />
                      {itsMyVideo && (
                        <span className=" absolute top-0 w-full bg_profile_watch">
                          <div className="flex justify-between items-center mx-2">
                            <ImageRank
                              profileName={parent?.userName || "Unknown"}
                              profileFontColor="white"
                              score={parent?.score || 0}
                              rankWidth={45}
                              starWidth={6}
                              className="absolute bottom-0"
                            />
                            <div className="flex gap-2">
                              <span className="font20 font-bold text-white">
                                350
                              </span>
                              <ThumbUpOffAltIcon className="font25 text-white" />
                            </div>
                          </div>
                        </span>
                      )}
                      <figcaption className=" sr-only">
                        {child?.userName}
                      </figcaption>
                      {itsMyVideo && (
                        <div className="">
                          <div className="absolute w-full bottom-0 bg_timer">
                            <div className="w-5/6 mb-1 ms-8 flex items-center justify-center text-white">
                              <HourglassTopIcon className="font20" />
                              <Timer
                                className="text-white  font20"
                                active={isTimerActive}
                              />
                              <div className="w-full h-1 bg-gray-700 rounded-full ml-4 relative text-white bg-gray-800">
                                <div
                                  className="h-1 bg-blue-500 rounded-full text-green bg-white"
                                  style={{
                                    width: `${(progress / 6000) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </figure>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      })}

      {showComments && (
        <Comments
          handleShowCMT={handleShowCMT}
          closingComments={closingComments}
        />
      )}
    </>
  );
};

export default Home;
