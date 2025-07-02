import React, { useEffect, useMemo, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ImageRank from "../../components/ImageRank";
import { attachmentList } from "../../services/dotNet";
import asyncWrapper from "../../common/AsyncWrapper";
import "swiper/css";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Loading from "../../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RsetDobuleVideo, RsetProgress } from "../../common/Slices/main";
import Timer from "../../components/Timer";
const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
const userIdFromSStorage = Number(sessionStorage.getItem("userId"));

const StepOne: React.FC = () => {
  const { main } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const socket = main?.socketConfig;
  const [lastTap, setLastTap] = useState<number>(0);
  const [allDableWatch, setAllDableWatch] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoLikes, setVideoLikes] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem("timerProgress");
    return savedProgress ? parseInt(savedProgress, 10) : 0;
  });
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const handleShowMatch = (item: any) => {
    console.log("item?.group", item?.group);
    dispatch(RsetDobuleVideo(item?.group));
    const newPath = `${location.pathname}/show?id=${item?.group?.inviteInserted?.id}`;
    navigate(newPath);
    setLastTap(0);
  };

  const handleAttachmentList = asyncWrapper(async () => {
    setIsLoading(true);
    const res = await attachmentList();
    setIsLoading(false);
    const { data, status } = res?.data;
    if (status === 0) {
      setAllDableWatch(data);
    }
  });

  const getVideosForDisplay = (allDableWatch: any[]) => {
    return allDableWatch
      .map((match: any) => {
        return {
          inviteMatched: match?.inviteMatched,
          inviteInserted: match?.inviteInserted,
          parent: match?.attachmentInserted,
          likeInserted: match?.likeInserted,
          likeMatched: match?.likeMatched,
          userInfoParent: match?.userInserted,
          child: match?.attachmentMatched,
          userInfoChild: match?.userMatched,
        };
      })
      .filter((group: any) => group.child !== null);
  };

  const videoGroups = getVideosForDisplay(allDableWatch);

  const checkIsMy = (group: any) => {
    if (group?.userInfoParent?.id === userIdFromSStorage) {
      return true;
    }
    if (group?.userInfoChild?.id === userIdFromSStorage) {
      return true;
    }
  };

  const videoGroupsWithOwnership = useMemo(() => {
    return videoGroups.map((group) => {
      const itsMyVideo = checkIsMy(group);
      return { ...group, itsMyVideo };
    });
  }, [videoGroups, userIdFromSStorage]);

  useEffect(() => {
    let interval: any;
    if (progress < 60 && isTimerActive) {
      interval = setInterval(() => {
        dispatch(RsetProgress(progress + 1));
      }, 100000);
    } else if (progress >= 60) {
      clearInterval(interval);
      // dispatch(RsetResetTimer());
    }
    return () => clearInterval(interval);
  }, [progress, isTimerActive, dispatch]);

  useEffect(() => {
    const hasMyVideo = videoGroupsWithOwnership.some(
      (group) => group.itsMyVideo
    );
    setIsTimerActive(hasMyVideo);
  }, [videoGroupsWithOwnership, dispatch]);

  const handleGetAddLike = (data: any) => {
    console.log("Received like data:", data);
    setVideoLikes((prev) => ({
      ...prev,
      [data.id]: (prev[data.id] || 0) + 1,
    }));
  };

  const handleGetRemoveLike = (data: any) => {
    console.log("datadatadatadata", data);
    setVideoLikes((prev) => ({
      ...prev,
      [data.movieId]: (prev[data.movieId] || 0) - 1,
    }));
  };

  useEffect(() => {
    if (socket) {
      socket.on("add_liked_response", handleGetAddLike);
      socket.on("remove_liked_response", handleGetRemoveLike);
    }
    return () => {
      if (socket) {
        socket.off("add_liked_response", handleGetAddLike);
        socket.off("remove_liked_response", handleGetRemoveLike);
      }
    };
  }, [socket]);

  useEffect(() => {
    handleAttachmentList();
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="grid mb-10 grid-cols-2 mt-0 md:mt-10 shadow-card gap-[5px] p-[1px]">
        <div className=""></div>
        {videoGroupsWithOwnership.map((group, index) => {
          const { parent, child, itsMyVideo, likeInserted, likeMatched } =
            group;
          const fixInsertTime = parent?.insertDate;
          const fixImg1 = `${baseURL}/${parent?.attachmentType}/${parent?.fileName}${parent?.ext}`;
          const fixImg2 = child
            ? `${baseURL}/${child.attachmentType}/${child.fileName}${child.ext}`
            : "";
          const parentLikes = (videoLikes?.like || 0) + likeInserted;
          const childLikes = (videoLikes?.like || 0) + likeMatched;

          return (
            <>
              <div
                key={index}
                onClick={() => handleShowMatch({ group, index })}
                className={`flex-1  flex flex-col ${
                  itsMyVideo ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                }`}
              >
                <div className="flex-1 ">
                  <span className="relative block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                    <img
                      src={fixImg1}
                      alt={parent?.alt || "Parent Image"}
                      className={`w-full rounded-tr-lg ${
                        itsMyVideo ? "min-h-88 max-h-60" : "min-h-44 max-h-44"
                      } object-cover ${itsMyVideo ? "max-h-[40vh]" : ""}`}
                    />
                    {itsMyVideo && (
                      <span className="absolute top-0 w-full bg_profile_watch">
                        <div className="flex justify-between items-center mx-2">
                          <ImageRank
                            imgSize={60}
                            iconProfileStyle="text-gray-200 font50"
                            userName={group?.userInfoParent?.userName || "User"}
                            classUserName="text-white"
                            score={parent?.score || 0}
                            rankStyle="w-7 h-7"
                            starWidth={6}
                            className="absolute bottom-0"
                          />
                          <div className="flex gap-1 justify-center text-white items-end">
                            {parentLikes}
                            <ThumbUpOffAltIcon className="font25 text-white" />
                          </div>
                        </div>
                      </span>
                    )}
                  </span>
                </div>
                {child && (
                  <div className="flex-1  bg-white">
                    <div className="flex-1 ">
                      <figure className=" relative  block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                        <img
                          src={fixImg2}
                          alt={child?.alt || "Profile image"}
                          className={`w-full rounded-bl-xl ${
                            itsMyVideo
                              ? "min-h-88 max-h-60"
                              : "min-h-44 max-h-44"
                          } object-cover ${itsMyVideo ? "max-h-[40vh]" : ""}`}
                        />
                        {itsMyVideo && (
                          <span className=" absolute top-0 w-full bg_profile_watch">
                            <div className="flex  justify-between items-center mx-2">
                              <ImageRank
                                imgSize={60}
                                rankStyle="w-7 h-7"
                                iconProfileStyle="text-gray-200 font50"
                                userName={
                                  group?.userInfoChild?.userName || "User"
                                }
                                classUserName="text-white"
                                score={parent?.score || 0}
                                rankWidth={45}
                                starWidth={6}
                                className="absolute bottom-0"
                              />
                              <div className="flex gap-1 text-white justify-center items-end">
                                {childLikes}
                                <ThumbUpOffAltIcon className="font25 text-white" />
                              </div>
                            </div>
                          </span>
                        )}
                        <figcaption className=" sr-only">
                          {child?.userName}
                        </figcaption>
                        {itsMyVideo && (
                          <div className="absolute w-full bottom-0 bg_timer">
                            <div className="w-5/6 mb-1 ms-8 flex items-center justify-center text-white">
                              <HourglassTopIcon className="font20" />
                              <Timer
                                startTime={fixInsertTime}
                                duration={3600} // 60 دقیقه = 3600 ثانیه
                                active={true}
                                className="text-white font20 ml-2"
                                onComplete={() => {}}
                              />
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
      </div>
    </>
  );
};

export default StepOne;
