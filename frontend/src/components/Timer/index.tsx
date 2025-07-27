import React, { useState, useEffect } from "react";
import { addScoure } from "../../services/dotNet";
import { useAppSelector } from "../../hooks/hook";

interface TimerProps {
  startTime: number;
  duration: number;
  active: boolean;
  className?: string;
  onComplete?: () => void;
  video: any;
}

const Timer: React.FC<TimerProps> = ({
  startTime,
  video,
  duration = 3600,
  active,
  className,
  onComplete,
}) => {
  const main = useAppSelector((state) => state?.main);
  const [winnerInfo, setWinnerInfo] = useState<any>();
  const socket = main?.socketConfig;
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    duration - startTime
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  console.log(video);

  const handleGetWinner = () => {
    if (video?.likeInserted > video?.likeMatched) {
      setWinnerInfo({
        userId: video?.userInserted?.id,
        movieId: video?.attachmentInserted?.attachmentId,
      });
      handleAddScoure();
    } else if (video?.likeInserted < video?.likeMatched) {
      setWinnerInfo({
        userId: video?.userMatched?.id,
        movieId: video?.attachmentMatched?.attachmentId,
      });
      handleAddScoure();
    }
  };

  const handleAddScoure = async () => {
    const postData = {
      userId: winnerInfo?.userId || null,
      movieId: winnerInfo?.movieId || null,
    };
    socket.emit("get_winner", postData);
    const res = await addScoure(postData);
    console.log(res);
  };

  useEffect(() => {
    if (!active || startTime === null || startTime === undefined) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        const newRemaining = prev - 1;
        if (newRemaining <= 0) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
        return newRemaining;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, startTime, onComplete]);

  useEffect(() => {
    if (startTime === -1) {
      handleGetWinner();
    }
    return () => {
      socket.off("add_invite_offline_response");
    };
  }, [startTime]);

  const progressPercent = (remainingSeconds / duration) * 100;
  console.log(remainingSeconds);

  return (
    <div className="flex items-center">
      <span className={className}>{formatTime(remainingSeconds)}</span>
      <div className="w-48 h-1 bg-gray-700 rounded-full ml-4 relative bg-gray-900">
        <div
          className="flex h-1 bg-white rounded-full transition-all duration-1000 text-gray"
          style={{
            width: `${progressPercent}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
