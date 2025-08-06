import React, { useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { attachmentList } from "../../services/dotNet";
import asyncWrapper from "../../common/AsyncWrapper";
import "swiper/css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import StringHelpers from "../../utils/helpers/StringHelper";
import VideoItemSkeleton from "../../components/VideoLoading";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

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
    <section>
      {/* <div className="scrollable-container flex gap-4 px-2 pb-2 pt-16 bg-white whitespace-nowrap scrollbar-hide fixed top-0 left-0 w-full  z-10">
        <span className="rounded-full flex items-center border-2 border-gray-200 flex-shrink-0">
          <span className="font-bold text-gray-200 px-4">All</span>
        </span>
        <span className="rounded-full border-2 border-gray-800 flex-shrink-0">
          <AudiotrackIcon className="my-3 mx-3 text-gray-800  font25" />
        </span>
        <span className="rounded-full border-2  flex-shrink-0">
          <SportsKabaddiIcon className="my-3 mx-3 text-gray-200  font25" />
        </span>
        <span className="rounded-full border-2  flex-shrink-0">
          <PrecisionManufacturingIcon className="my-3 mx-3 text-gray-200  font25" />
        </span>
        <span className="rounded-full border-2  flex-shrink-0">
          <OutdoorGrillIcon className="my-3 mx-3 text-gray-200  font25" />
        </span>
        <span className="rounded-full border-2  flex-shrink-0">
          <LocalSeeIcon className="my-3 mx-3 text-gray-200  font25" />
        </span>
        <span className="rounded-full border-2  flex-shrink-0">
          <ArchitectureIcon className="my-3 mx-3 text-gray-200  font25" />
        </span>
        <span className="rounded-full border-2  flex-shrink-0">
          <SportsEsportsIcon className="my-3 mx-3 text-gray-200  font25" />
        </span>
        <span className="rounded-full border-2  flex-shrink-0">
          <InsertEmoticonIcon className="my-3 mx-3 text-gray-200  font25" />
        </span>
        <span className="rounded-full border-2  flex-shrink-0">
          <ColorLensIcon className="my-3 mx-3 text-gray-200  font25" />
        </span>
      </div> */}
      <div className="mt-2">
        <div className="grid grid-cols-2 mt-0 md:mt-10 gap-[5px] p-[2px]">
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
                      <span className="relative block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
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
                            <span className="text-white absolute m-1 bottom-0 border-2 rounded-full p-1 border-white">
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
      </div>
    </section>
  );
};

export default StepOne;
