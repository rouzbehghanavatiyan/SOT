import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface TimerProps {
  active: boolean;
  className?: string;
  onStop?: boolean;
}

const Timer: React.FC<TimerProps> = ({ active, className, onStop = false }) => {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(active);
  const navigate = useNavigate();
  let interval: any;

  useEffect(() => {
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return ` ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleStop = () => {
    setIsActive(false);
    if (onStop) {
      onStop(time);
    }
  };

  return <span className={className}> {formatTime(time)}</span>;
};

export default Timer;
