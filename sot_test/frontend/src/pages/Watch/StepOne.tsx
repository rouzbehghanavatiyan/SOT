import React, { useRef, useEffect, useState } from "react";
import LoadingChild from "../../components/Loading/LoadingChild";
import VideoGroup from "./VideoGroup";
import { attachmentList } from "../../services/dotNet";
import usePagination from "../../hooks/usePagination";
import { useNavigate } from "react-router-dom";
import VideoItemSkeleton from "../../components/VideoLoading";

const StepOne: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    data: allDableWatch,
    isLoading,
    hasMore,
    fetchNextPage,
  } = usePagination(attachmentList, { take: 6 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const refCurrent = loadingRef.current;
    if (refCurrent) observer.observe(refCurrent);

    return () => {
      if (refCurrent) observer.unobserve(refCurrent);
    };
  }, [fetchNextPage, hasMore, isLoading]);

  const handleShowMatch = (item: any) => {
    const newPath = `${location.pathname}/show?id=${item?.group?.inviteInserted?.id}`;
    navigate(newPath);
    // setLastTap(0);
  };

  return (
    <section>
      <div className="mt-2 mb-3">
        {/* <Filtered /> */}
        <div className="grid grid-cols-2 mt-0 md:mt-10 gap-[5px] p-[2px]">
          {isLoading && allDableWatch.length === 0
            ? [...Array(12)].map((_, index) => (
                <VideoItemSkeleton section="justPic" />
              ))
            : allDableWatch?.map((group, index) => (
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
