import React, { useState, useEffect } from "react";

const CounterTimer: React.FC = ({ startTime }) => {
  const [currentTime, setCurrentTime] = useState<number>(0); // کانتر داخلی

  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        setCurrentTime(startTime);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    fetchStartTime();
  }, []);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1000);
    }, 1000);

    return () => clearInterval(interval); // پاکسازی تایمر هنگام خروج کامپوننت
  }, [startTime]);

  // تبدیل زمان به فرمت `HH:mm:ss`
  const formatTime = (milliseconds: number) => {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>Timer</h1>
      {startTime ? <h2>{formatTime(currentTime)}</h2> : <p>Loading time...</p>}
    </div>
  );
};

export default CounterTimer;
