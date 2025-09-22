import React, { useRef, useEffect, useState } from "react";
import LoadingChild from "../../components/Loading/LoadingChild";
import VideoGroup from "./VideoGroup";
import { attachmentList, subCategoryList } from "../../services/dotNet";
import { useNavigate } from "react-router-dom";
import VideoItemSkeleton from "../../components/VideoLoading";
import Filtered from "./Filtered";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import {
  resetWatchVideo,
  RsetWatchVideo,
  setPaginationWatch,
} from "../../common/Slices/main";
import asyncWrapper from "../../common/AsyncWrapper";

const StepOne: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const main = useAppSelector((state) => state.main);
  const { pagination, data } = main.watchVideo;
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectFiltered, setSelectFiltered] = useState<number | null>(0);

  const handleGetFiltered = asyncWrapper(async () => {
    const res = await subCategoryList(1);
    const { data, status } = res?.data;
    let temp: any = [];
    temp.push({ id: 0, name: "All" }, ...data);
    setSkills(temp);
    if (status === 0) {
      setSkills(temp);
    }
  });

  const handleGetAllMatch = async (skillId: number) => {
    console.log(pagination.hasMore);

    if (isLoading || !pagination.hasMore) return;

    try {
      setIsLoading(true);
      const res = await attachmentList({
        skip: pagination.skip,
        take: pagination.take,
        subCatId: skillId,
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

  const handleFilterChange = async (skillId: number) => {
    dispatch(resetWatchVideo());

    setSelectFiltered(skillId);

    try {
      setIsLoading(true);
      const res = await attachmentList({
        skip: 0,
        take: 6,
        subCatId: skillId,
      });
      const newData = res?.data || [];

      dispatch(RsetWatchVideo(newData));

      dispatch(
        setPaginationWatch({
          take: 6,
          skip: 6,
          hasMore: newData.length === 6,
        })
      );
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllMatch(0);
    handleGetFiltered();
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

  console.log(selectFiltered);

  return (
    <section>
      <div className="mt-2 mb-3">
        <Filtered
          handleGetAllMatch={handleGetAllMatch}
          selectFiltered={selectFiltered}
          setSelectFiltered={setSelectFiltered}
          skills={skills}
        />
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
