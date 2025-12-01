import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import ReportIcon from "@mui/icons-material/Report";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { useAppDispatch } from "./reduxHookType"; // مسیر را چک کنید
import StringHelpers from "../utils/helpers/StringHelper"; // مسیر را چک کنید
import { DropdownItem } from "../types/mainType"; // مسیر را چک کنید

interface UseVideoFeedProps {
  // Redux Data
  dataSource: {
    data: any[];
    pagination: {
      skip: number;
      take: number;
      hasMore: boolean;
    };
  };
  // Redux Actions
  actions: {
    setData: (data: any[]) => any;
    setPagination: (pagination: any) => any;
    resetState?: () => any;
  };
  // API Config
  fetchFunction: (params: any) => Promise<any>;
  fetchParams: Record<string, any>;
  // Settings
  mode?: "home" | "default"; // برای تفاوت‌های جزئی مثل دکمه Save
}

export const useVideoFeed = ({
  dataSource,
  actions,
  fetchFunction,
  fetchParams,
  mode = "default",
}: UseVideoFeedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, pagination } = dataSource;

  // --- States ---
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  
  // مدیریت پخش ویدیو بر اساس ایندکس اسلاید و پوزیشن (0=بالا/تک، 1=پایین)
  const [playingState, setPlayingState] = useState<{
    slideIndex: number | null;
    position: number | null;
  }>({ slideIndex: 0, position: 0 });

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // --- Refs ---
  const paginationRef = useRef(pagination);
  const isLoadingRef = useRef(isLoading);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    isLoadingRef.current = isLoading;
    paginationRef.current = pagination;
  }, [isLoading, pagination]);

  // --- Fetching Logic ---
  const fetchNextPage = useCallback(async () => {
    // اگر پارامترها هنوز آماده نیستند (مثلا آیدی لاگین نرسیده) یا دیتای بیشتر نیست، اجرا نکن
    const paramsValid = Object.values(fetchParams).every(v => v !== undefined && v !== null);
    if (isLoadingRef.current || !paginationRef.current.hasMore || !paramsValid) return;

    try {
      setIsLoading(true);
      const res = await fetchFunction({
        skip: paginationRef.current.skip,
        take: paginationRef.current.take,
        ...fetchParams,
      });

      const newData = res?.data || [];
      const hasMore = newData.length > 0 && newData.length === paginationRef.current.take;

      dispatch(actions.setData(newData));
      dispatch(
        actions.setPagination({
          take: paginationRef.current.take,
          skip: paginationRef.current.skip + paginationRef.current.take,
          hasMore: hasMore,
        })
      );
    } catch (error) {
      console.error("Error fetching video feed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, fetchFunction, JSON.stringify(fetchParams), actions]);

  // --- Handlers ---

  const handleVideoPlay = (slideIndex: number, position: number) => {
    setOpenDropdowns({});
    setPlayingState((prev) => {
      if (prev.slideIndex === slideIndex && prev.position === position) {
        return { slideIndex: null, position: null }; // Pause toggle
      }
      return { slideIndex, position };
    });
  };

  const shouldVideoPlay = (slideIndex: number, position: number) => {
    return (
      playingState.slideIndex === slideIndex &&
      playingState.position === position
    );
  };

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    setActiveSlideIndex(realIndex);
    swiperRef.current = swiper;
    setOpenDropdowns({});

    // Auto-play top video (position 0) of new slide
    setPlayingState({ slideIndex: realIndex, position: 0 });

    // Load More Logic (3 slides before end)
    if (
      realIndex >= data.length - 3 &&
      paginationRef.current.hasMore &&
      !isLoadingRef.current
    ) {
      fetchNextPage();
    }
  };

  const toggleDropdown = (id: string | number) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- Dropdown Generation ---
  const getDropdownItems = (videoData: any, position: number): DropdownItem[] => {
    const isSender = position === 0;
    
    // Normalize user data (Handles difference between Inserted/Matched)
    const targetUser = isSender ? videoData?.userInserted : videoData?.userMatched;
    const targetProfile = isSender ? videoData?.profileInserted : videoData?.profileMatched;

    // Helper Safe Check
    const userProfileStr = StringHelpers && StringHelpers.getProfile 
        ? StringHelpers.getProfile(targetProfile) 
        : targetProfile;

    const userInfo = {
      sender: targetUser?.id,
      userProfile: userProfileStr,
      userNameSender: targetUser?.userName,
    };

    const items: DropdownItem[] = [
      {
        label: "Send message",
        icon: <EmailIcon className="text-gray-800 font20" />,
        onClick: () =>
          navigate(`/privateMessage?id=${targetUser?.id}`, {
            state: { userInfo },
          }),
      },
      {
        label: "Report",
        icon: <ReportIcon className="text-gray-800 font20" />,
        onClick: () => alert("Report"),
      },
    ];

    // Home Specific Item
    if (mode === "home") {
      items.push({
        label: "Save",
        icon: <TurnedInNotIcon className="text-gray-800 font20" />,
        onClick: () => alert("Saved"),
      });
    }

    items.push({ divider: true });
    return items;
  };

  // --- Lifecycle ---

  // Initial Fetch
  useEffect(() => {
    // If params exist and list is empty, fetch
    if (Object.keys(fetchParams).length > 0 && data.length === 0 && !isLoadingRef.current) {
        // Reset pagination specifically for Home if needed, or rely on Redux initial state
        fetchNextPage();
    }
  }, [fetchNextPage, data.length]);

  // Reset Playing on Mount/Data Load
  useEffect(() => {
    if (data.length > 0 && activeSlideIndex === 0 && !isLoading) {
       setPlayingState({ slideIndex: 0, position: 0 });
    }
  }, [data.length, isLoading]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (actions.resetState) dispatch(actions.resetState());
    };
  }, [dispatch, actions.resetState]);

  return {
    data,
    isLoading,
    openDropdowns,
    playingState,
    activeSlideIndex,
    swiperRef,
    // Functions
    handleVideoPlay,
    shouldVideoPlay,
    handleSlideChange,
    toggleDropdown,
    setOpenDropdowns,
    getDropdownItems,
    fetchNextPage
  };
};