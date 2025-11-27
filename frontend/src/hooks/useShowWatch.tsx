import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import ReportIcon from "@mui/icons-material/Report";
import { useAppDispatch, useAppSelector } from "./reduxHookType";
import {
  resetShowWatchState,
  RsetShowWatch,
  setPaginationShowWatch,
} from "../common/Slices/main";
import { attachmentListByInviteId } from "../services/dotNet";
import { DropdownItem } from "../types/mainType";

export const useShowWatch = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const inviteId = location?.search?.split("id=")?.[1];
  const main = useAppSelector((state) => state.main);
  
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  
  const { pagination, data } = main.showWatchMatch;
  const paginationRef = useRef(pagination);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    isLoadingRef.current = isLoading;
    paginationRef.current = pagination;
  }, [isLoading, pagination]);

  const handleVideoPlay = (videoId: string) => {
    setOpenDropdowns({});
    setCurrentlyPlayingId((prevId) => (prevId === videoId ? null : videoId));
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getDropdownConfig = (data: any, position: number) => ({
    sender: position === 0 ? data?.userInserted?.id : data?.userMatched?.id,
    userProfile: position === 0 ? data?.profileInserted : data?.profileMatched,
    userNameSender: position === 0 
      ? data?.userInserted?.userName 
      : data?.userMatched?.userName,
  });

  const dropdownItems = (data: any, position: number, userSenderId: any): DropdownItem[] => {
    const config = getDropdownConfig(data, position);
    
    return [
      {
        label: "Send message",
        icon: <EmailIcon className="text-gray-800 font20" />,
        onClick: () => navigate(`/privateMessage?id=${userSenderId?.id}`, {
          state: { userInfo: config },
        }),
      },
      {
        label: "Report",
        icon: <ReportIcon className="text-gray-800 font20" />,
        onClick: () => alert("اعلان‌ها"),
      },
      { divider: true },
    ];
  };

  const fetchNextPage = useCallback(async () => {
    if (isLoadingRef.current || !paginationRef.current.hasMore) return;

    try {
      setIsLoading(true);
      const res = await attachmentListByInviteId({
        skip: paginationRef.current.skip,
        take: paginationRef.current.take,
        inviteId,
      });

      const newData = res?.data || [];
      const hasMore = newData.length > 0;
      
      dispatch(RsetShowWatch(newData));
      dispatch(
        setPaginationShowWatch({
          take: paginationRef.current.take,
          skip: paginationRef.current.skip + paginationRef.current.take,
          hasMore,
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, inviteId]);

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    setActiveSlideIndex(realIndex);
    
    // Auto-play top video in new slide
    if (data[realIndex]?.attachmentInserted?.attachmentId) {
      setCurrentlyPlayingId(data[realIndex].attachmentInserted.attachmentId);
    }
    
    setOpenDropdowns({});
    
    if (realIndex % 3 === 0 && paginationRef.current.hasMore && !isLoadingRef.current) {
      fetchNextPage();
    }
  };

  const initializeSwiper = (swiper: any) => {
    setActiveSlideIndex(swiper.realIndex);
    if (data?.length > 0) {
      setCurrentlyPlayingId(data?.[0]?.attachmentInserted?.attachmentId);
    }
  };

  // Auto-play top video on initial load
  useEffect(() => {
    if (data?.length > 0 && activeSlideIndex === 0) {
      setCurrentlyPlayingId(data[0]?.attachmentInserted?.attachmentId);
    }
  }, [data, activeSlideIndex]);

  useEffect(() => {
    if (inviteId && !isLoadingRef.current) {
      fetchNextPage();
    }
  }, [inviteId, fetchNextPage]);

  useEffect(() => {
    return () => {
      dispatch(resetShowWatchState());
    };
  }, [dispatch]);

  return {
    data,
    isLoading,
    openDropdowns,
    currentlyPlayingId,
    activeSlideIndex,
    handleVideoPlay,
    toggleDropdown,
    dropdownItems,
    handleSlideChange,
    initializeSwiper,
    fetchNextPage,
    setOpenDropdowns,
  };
};