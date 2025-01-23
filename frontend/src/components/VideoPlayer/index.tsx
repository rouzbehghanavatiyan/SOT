import React, { useEffect, useRef } from "react";
import "video.js/dist/video-js.css";
import videojs from "video.js";

type PropsType = any;

const VideoPlayer: React.FC<PropsType> = ({ options }) => {
  const videoNode: any = useRef();

  useEffect(() => {
    const player = videojs(videoNode.current, options, () => {
      console.log("Player is ready");
    });
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [options]);

  return (
    <div>
      <video ref={videoNode} className="video-js vjs-default-skin" controls />
    </div>
  );
};

export default VideoPlayer;
