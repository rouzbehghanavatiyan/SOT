import React, { useEffect, useState } from "react";

interface TimerProps {
  show: boolean;
}

export const ButtonTimer: React.FC<TimerProps> = ({ show }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any;

    if (show) {
      setSeconds(0); 
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [show]);

  const formatTime = (total: number) => {
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return <span>{formatTime(seconds)}</span>;
};
