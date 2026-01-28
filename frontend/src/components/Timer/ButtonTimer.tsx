import React, { useEffect, useState } from "react";

interface TimerProps {
  show: boolean;
  startTime: number;
}

export const ButtonTimer: React.FC<TimerProps> = ({
  startTime = 120,
  show,
}) => {
  const [seconds, setSeconds] = useState(startTime);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (show) {
      setSeconds(startTime);

      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [show]);

  const formatTime = (total: number) => {
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center gap-1 text-white">
      <span className="">
        {formatTime(seconds)}
      </span>
      <span className=" font-thin flex items-center gap-4">
        Matching
        <span className="loader_finding_user" />
      </span>
    </div>
  );
};
