import React from "react";
import ReactPlayer from "react-player";

const Video: React.FC = ({
  loop,
  playing = false,
  playbackRate,
  muted = false,
  url,
  //   onProgress,
  width = "100%",
  height = "100%",
  onDuration,
  onEnded,
  className,
  handleVideo,
}: any) => {
  return (
    <span onClick={handleVideo}>
      <ReactPlayer
        style={{ pointerEvents: "none" }}
        className={className}
        width={width}
        height={height}
        playing={playing}
        loop={loop}
        playbackRate={playbackRate}
        muted={muted}
        onEnded={onEnded}
        onDuration={onDuration}
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
  );
};

export default Video;
