import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { VideoProps } from "./types";

const Video: React.FC<VideoProps> = ({
  loop,
  playing = false,
  playbackRate,
  muted = false,
  url,
  onDuration,
  onEnded,
  className,
  handleVideo,
  width = "100%",
  height = "100%",
}) => {
  const playerRef = useRef<any>(null); // Ref برای دسترسی به ReactPlayer
  const [showControls, setShowControls] = useState(false); // وضعیت نمایش کنترل‌ها
  const [played, setPlayed] = useState(0); // زمان فعلی ویدیو (بین ۰ تا ۱)
  const [duration, setDuration] = useState(0); // مدت زمان کل ویدیو (ثانیه)

  // کلیک روی ویدیو
  const handleVideoClick = () => {
    setShowControls((prev) => !prev);
    handleVideo();
  };

  // به‌روزرسانی زمان پخش ویدیو
  const handleProgress = (state: any) => {
    setPlayed(state.played); // زمان فعلی ویدیو (بین ۰ تا ۱)
  };

  // تغییر زمان ویدیو با نوار پیشرفت
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value); // زمان جدید (بین ۰ تا ۱)
    setPlayed(seekTime); // به‌روزرسانی نوار پیشرفت
    playerRef.current.seekTo(seekTime, "fraction"); // تغییر زمان ویدیو
  };

  // دریافت مدت زمان کل ویدیو
  const handleDuration = (duration: number) => {
    setDuration(duration); // مدت زمان کل ویدیو (ثانیه)
  };

  // تبدیل زمان به فرمت دقیقه:ثانیه
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <span className="" onClick={handleVideoClick}>
        <ReactPlayer
          ref={playerRef}
          style={{ pointerEvents: "none" }}
          className={className}
          width={width}
          height={height}
          playing={playing}
          loop={loop}
          playbackRate={playbackRate}
          muted={muted}
          onEnded={onEnded}
          onProgress={handleProgress} // به‌روزرسانی زمان پخش
          onDuration={handleDuration} // دریافت مدت زمان کل
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
            facebook: {
              appId: "12345",
            },
          }}
          url={url}
        />
      </span>
      <div
        className={`controls ${showControls ? "fade-in" : "fade-out"}`} // اضافه کردن کلاس CSS
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 10,
        }}
      >
        <span style={{ color: "white", fontSize: "8px" }}>
          {formatTime(played * duration)}
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeek}
          className="seek-bar" // کلاس CSS برای اهرم
        />
      </div>
    </div>
  );
};

export default Video;
