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
const userIdFromSStorage = sessionStorage.getItem("userId");

const StepOne: React.FC = () => {
  const [lastTap, setLastTap] = useState<number>(0);
  const [allDableWatch, setAllDableWatch] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem("timerProgress");
    return savedProgress ? parseInt(savedProgress, 10) : 0;
  });
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { main } = useAppSelector((state) => state);
  const location = useLocation();

  const handleShowMatch = (item: any) => {
    dispatch(RsetDobuleVideo(item?.group));
    const newPath = `${location.pathname}/show`;
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

  useEffect(() => {
    handleAttachmentList();
  }, []);

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
    return (
      (group?.parent?.userId || group?.child?.userId) ===
      Number(userIdFromSStorage)
    );
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
      }, 1000);
    } else if (progress >= 60) {
      clearInterval(interval);
      dispatch(RsetResetTimer());
    }
    return () => clearInterval(interval);
  }, [progress, isTimerActive, dispatch]);

  useEffect(() => {
    const hasMyVideo = videoGroupsWithOwnership.some(
      (group) => group.itsMyVideo
    );
    setIsTimerActive(hasMyVideo);
  }, [videoGroupsWithOwnership, dispatch]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="grid grid-cols-2 bg-white gap-[5px] p-[1px]">
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
                            itsMyVideo
                              ? "min-h-88 max-h-88"
                              : "min-h-44 max-h-44"
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
      </div>
    </>
  );
};

export default StepOne;
