import React from "react";
import ReactPlayer from "react-player";

const VideoReactPlayer: React.FC = ({
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
}: any) => {
  return (
    <ReactPlayer
      className={className}
      width={width}
      height={height}
      playing={playing}
      loop={loop}
      playbackRate={playbackRate}
      muted={muted}
      // onReady={() => console.log("onReady")}
      // onStart={() => console.log("onStart")}
      // onBuffer={() => console.log("onBuffer")}
      // onSeek={(e: any) => console.log("Seeking", e)}
      onEnded={onEnded}
      // onError={(e: any) => console.log("onError", e)}
      // onProgress={onProgress}
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
      controls
    />
  );
};

export default VideoReactPlayer;
