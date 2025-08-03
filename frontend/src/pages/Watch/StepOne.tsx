import React, { useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { attachmentList } from "../../services/dotNet";
import asyncWrapper from "../../common/AsyncWrapper";
import "swiper/css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RsetProgress } from "../../common/Slices/main";
import StringHelpers from "../../utils/helpers/StringHelper";
import VideoItemSkeleton from "../../components/VideoLoading";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";

const StepOne: React.FC = () => {
  const main = useAppSelector((state) => state?.main);
  const userId = main?.userLogin?.user?.id;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const socket = main?.socketConfig;
  const [lastTap, setLastTap] = useState<number>(0);
  const [allDableWatch, setAllDableWatch] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingVideo, setLoadingVideo] = useState<boolean>(true);
  const [videoLikes, setVideoLikes] = useState<Record<string, number>>({});
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 6,
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
      setLoadingVideo(false);
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

  const videoGroupsWithOwnership = useMemo(() => {
    return videoGroups.map((group) => {
      return { ...group };
    });
  }, [videoGroups, userId]);

  const handleGetAddLike = (data: { userId: number; movieId: number }) => {
    setVideoLikes((prev) => ({
      ...prev,
      [data.movieId]: (prev[data.movieId] || 0) + 1,
    }));
  };

  const handleGetRemoveLike = (data: { userId: number; movieId: number }) => {
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
    }
    return () => clearInterval(interval);
  }, [progress, isTimerActive, dispatch]);

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

  return (
    <section className="mt-3">
      <div className="flex gap-4 py-2 mx-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <span className="flex items-center  rounded-full border flex-shrink-0">
          <span className="font-bold px-4">All</span>
        </span>
        <span className="rounded-full border flex-shrink-0">
          <AudiotrackIcon className="text-2xl  my-3 mx-3 font25" />
        </span>
        <span className="rounded-full border flex-shrink-0">
          <SportsKabaddiIcon className="text-2xl  my-3 mx-3 font25" />
        </span>
        <span className="rounded-full border flex-shrink-0">
          <PrecisionManufacturingIcon className="text-2xl  my-3 mx-3 font25" />
        </span>
        <span className="rounded-full border flex-shrink-0">
          <OutdoorGrillIcon className="text-2xl  my-3 mx-3 font25" />
        </span>
        <span className="rounded-full border flex-shrink-0">
          <LocalSeeIcon className="text-2xl  my-3 mx-3 font25" />
        </span>
        {/* <span className="rounded-full border flex-shrink-0">
          <ArchitectureIcon className="text-2xl  my-3 mx-3 font25" />
        </span>
        <span className="rounded-full border flex-shrink-0">
          <SportsEsportsIcon className="text-2xl  my-3 mx-3 font25" />
        </span> */}
        {/* <span className="rounded-full border flex-shrink-0">
          <InsertEmoticonIcon className="text-2xl  my-3 mx-3 font25" />
        </span>
        <span className="rounded-full border flex-shrink-0">
          <ColorLensIcon className="text-2xl  my-3 mx-3 font25" />
        </span> */}
      </div>

      <div className="grid mb-10 grid-cols-2 mt-0 md:mt-10 gap-[5px] p-[2px]">
        {loadingVideo
          ? [...Array(12)].map((_, index) => (
              <div key={index} className="col-span-1">
                <VideoItemSkeleton justPic />
              </div>
            ))
          : videoGroupsWithLikes.map((group, index) => {
              const { parent, child } = group;
              const fixImg1 = StringHelpers.getProfile(parent);
              const fixImg2 = child ? StringHelpers.getProfile(child) : "";
              return (
                <div
                  key={index}
                  onClick={() => handleShowMatch({ group, index })}
                  className={`flex-1 flex flex-col ${"col-span-1 row-span-1"}`}
                >
                  <div className="flex-1">
                    <span className="relative  block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                      <img
                        src={fixImg1}
                        alt={parent?.alt || "Parent Image"}
                        className={`w-full rounded-tr-lg  min-h-44 max-h-44 object-cover `}
                      />
                    </span>
                  </div>
                  {child && (
                    <div className="flex-1 bg-white">
                      <div className="flex-1">
                        <figure className="relative block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                          <span className="text-white absolute m-1 bottom-0 border-[1px] rounded-full p-1 border-white">
                            <AudiotrackIcon className="font20" />
                          </span>
                          <img
                            src={fixImg2}
                            alt={child?.alt || "Profile image"}
                            className={`w-full rounded-bl-xl min-h-44 max-h-44 object-cover`}
                          />
                        </figure>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </div>
      <div
        ref={loadingRef}
        className="bg-white w-full h-24 flex justify-center items-center"
      >
        {isLoading && (
          <div className="mb-20 loader-userFinding w-12 h-12"></div>
        )}
      </div>
    </section>
  );
};

export default StepOne;
