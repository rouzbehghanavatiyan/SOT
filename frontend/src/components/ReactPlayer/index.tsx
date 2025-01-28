import React from "react";
import ReactPlayer from "react-player";

const VideoReactPlayer: React.FC = ({
  loop,
  playing = false,
  playbackRate,
  muted = false,
  url,
  //   onProgress,
  onDuration,
  onEnded,
  className,
}: any) => {
  const onProgress = (e) => {
    console.log(e);
  };

  return (
    <div>
      <ReactPlayer
        className={className}
        width="100%"
        height="100%"
        playing={playing}
        loop={loop}
        playbackRate={playbackRate}
        muted={muted}
        onReady={() => console.log("onReady")}
        onStart={() => console.log("onStart")}
        onBuffer={() => console.log("onBuffer")}
        onSeek={(e: any) => console.log("Seeking", e)}
        onEnded={onEnded}
        onError={(e: any) => console.log("onError", e)}
        onProgress={onProgress}
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
    </div>
  );
};

export default VideoReactPlayer;
