import React, { useRef, useEffect, useState } from "react";
import LoadingChild from "../../components/Loading/LoadingChild";
import VideoGroup from "./VideoGroup";
import { attachmentList } from "../../services/dotNet";
import { useNavigate } from "react-router-dom";
import VideoItemSkeleton from "../../components/VideoLoading";
import Filtered from "./Filtered";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import { RsetWatchVideo, setPaginationWatch } from "../../common/Slices/main";

const StepOne: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const main = useAppSelector((state) => state.main); // اطمینان از اینکه به وضعیت صحیح دسترسی دارید
  const { pagination, data } = main.watchVideo;
  const [isLoading, setIsLoading] = useState(false);
  const { pagination: pp2, data: dd2 } = main.showWatchMatch;

  console.log(pp2, dd2);

  const handleGetAllMatch = async () => {
    // قبل از ادامه بارگذاری بررسی کنید
    console.log(isLoading, pagination.hasMore);

    if (isLoading || !pagination.hasMore) return;

    try {
      setIsLoading(true);
      const res = await attachmentList({
        skip: pagination.skip,
        take: pagination.take,
        subCatId: 1,
      });
      const newData = res?.data || [];
      console.log(newData);

      dispatch(RsetWatchVideo(newData));

      dispatch(
        setPaginationWatch({
          take: pagination.take,
          skip: pagination.skip + pagination.take,
          hasMore: newData.length === pagination.take,
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllMatch(); // بارگذاری داده‌ها در هنگام بارگذاری کامپوننت
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && pagination.hasMore) {
          handleGetAllMatch();
        }
      },
      { threshold: 0.5 }
    );

    const refCurrent = loadingRef.current;
    if (refCurrent) observer.observe(refCurrent);

    return () => {
      if (refCurrent) observer.unobserve(refCurrent);
    };
  }, [isLoading, pagination.hasMore]);

  const handleShowMatch = (item: any) => {
    const newPath = `${location.pathname}/show?id=${item?.group?.inviteInserted?.id}`;
    navigate(newPath);
  };

  return (
    <section>
      <div className="mt-2 mb-3">
        <Filtered />
        <div className="grid grid-cols-2 mt-0 md:mt-10 gap-[5px] p-[2px]">
          {isLoading && data.length === 0
            ? [...Array(12)].map((_, index) => (
                <VideoItemSkeleton key={index} section="justPic" />
              ))
            : data.map((group, index) => (
                <VideoGroup
                  key={index}
                  group={group}
                  index={index}
                  onClick={() => handleShowMatch({ group, index })}
                />
              ))}
        </div>
        <LoadingChild ref={loadingRef} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default StepOne;
