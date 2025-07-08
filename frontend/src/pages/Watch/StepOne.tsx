import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 5,
    hasMore: true,
  });

  const loadingRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem("timerProgress");
    return savedProgress ? parseInt(savedProgress, 10) : 0;
  });
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const calculateInitialLikes = (data: any[]) => {
    const initialLikes: Record<string, number> = {};
    data.forEach((match) => {
      if (match.likeInserted && match.attachmentInserted?.movieId) {
        initialLikes[match.attachmentInserted.movieId] = match.likeInserted;
      }
      if (match.likeMatched && match.attachmentMatched?.movieId) {
        initialLikes[match.attachmentMatched.movieId] = match.likeMatched;
      }
    });
    return initialLikes;
  };

  const handleShowMatch = (item: any) => {
    console.log("item?.group", item?.group);
    dispatch(RsetDobuleVideo(item?.group));
    const newPath = `${location.pathname}/show?id=${item?.group?.inviteInserted?.id}`;
    navigate(newPath);
    setLastTap(0);
  };

  const handleAttachmentList = asyncWrapper(async () => {
    try {
      if (!pagination.hasMore || isLoading) return;
      setIsLoading(true);
      const res = await attachmentList({
        skip: pagination.skip,
        take: pagination.take,
      });
      setIsLoading(false);

      const { data, status } = res?.data;
      if (status === 0) {
        setAllDableWatch((prev) => [...prev, ...data]);
        setVideoLikes((prev) => ({ ...prev, ...calculateInitialLikes(data) }));

        setPagination((prev) => ({
          ...prev,
          hasMore: data.length === prev.take,
          skip: prev.skip + prev.take,
        }));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  });

  const getVideosForDisplay = (allDableWatch: any[]) => {
    return allDableWatch
      .map((match: any) => {
        return {
          parentMovieId: match?.attachmentInserted?.attachmentId,
          childMovieId: match?.attachmentMatched?.attachmentId,
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

  const handleGetAddLike = (data: { userId: number; movieId: number }) => {
    setVideoLikes((prev) => ({
      ...prev,
      [data.movieId]: (prev[data.movieId] || 0) + 1,
    }));
  };

  const handleGetRemoveLike = (data: { userId: number; movieId: number }) => {
    console.log(videoLikes, data);

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

  const videoGroupsWithLikes = useMemo(() => {
    return videoGroupsWithOwnership.map((group) => {
      const parentLikes =
        (videoLikes[group.parent?.movieId] || 0) + (group.likeInserted || 0);
      const childLikes = group.child
        ? (videoLikes[group.child?.movieId] || 0) + (group.likeMatched || 0)
        : 0;

      return {
        ...group,
        parentLikes,
        childLikes,
      };
    });
  }, [videoGroupsWithOwnership, videoLikes]);

  console.log(pagination);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && pagination.hasMore && !isLoading) {
          handleAttachmentList();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadingRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [pagination.hasMore, isLoading]);

  console.log(videoGroupsWithLikes);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="grid mb-10 grid-cols-2 mt-0 md:mt-10   gap-[5px] p-[1px]">
        {/* <div className="graid grid-cols-2 overflow-x-auto my-10">
          <ImageRank
            iconProfileStyle="font60"
            // imgSrc={}
          />
          <ImageRank
            iconProfileStyle="font60"
            // imgSrc={}
          />
        </div> */}
        {videoGroupsWithLikes.map((group, index) => {
          const {
            parent,
            child,
            itsMyVideo,
            likeInserted,
            likeMatched,
            parentMovieId,
            childMovieId,
          } = group;
          const fixInsertTime = parent?.insertDate;
          const fixImg1 = `${baseURL}/${parent?.attachmentType}/${parent?.fileName}${parent?.ext}`;
          const fixImg2 = child
            ? `${baseURL}/${child.attachmentType}/${child.fileName}${child.ext}`
            : "";
          const parentLikes =
            (videoLikes[parentMovieId] || 0) + (likeInserted || 0);
          const childLikes =
            (videoLikes[childMovieId] || 0) + (likeMatched || 0);

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
      <div
        ref={loadingRef}
        className=" bg-white w-full h-24 flex justify-center items-center"
      >
        <div className="mb-20 loader-userFinding w-12 h-12"></div>
      </div>
    </>
  );
};

export default StepOne;
