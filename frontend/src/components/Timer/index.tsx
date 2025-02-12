import React, { useState, useEffect } from "react";
import { addInvite } from "../../services/dotNet";
import asyncWrapper from "../../common/AsyncWrapper";
import { useNavigate } from "react-router-dom";
const userIdFromSStorage = sessionStorage.getItem("userId");

const Timer: React.FC = ({
  setFindingMatch,
  active,
  movieData,
  setShowEditMovie,
}: any) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const [time, setTime] = useState<number>(0);
  const navigate = useNavigate();

  console.log(active);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleAddInvite = asyncWrapper(async () => {
    console.log("movieData", movieData?.userId);
    const postInvite = {
      parentId: null,
      userId: Number(userIdFromSStorage) || null,
      movieId: movieData?.movieId || null,
      status: 1,
    };
    const res = await addInvite(postInvite);
    console.log(res?.data);

    if (res?.data?.status === 0) {
      setShowEditMovie(false);
      navigate("/watch");
    }
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      interval = setInterval(() => {
        handleAddInvite();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, movieData?.movieId]);

  return <>{formatTime(time)}</>;
};

export default Timer;
