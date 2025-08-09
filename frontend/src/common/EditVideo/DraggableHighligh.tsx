import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

type DraggableHighlightProps = {
  videoSrc: string;
  onCropChange: (data: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
};

const DraggableHighlight: React.FC<DraggableHighlightProps> = ({
  videoSrc,
  onCropChange,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [highlightSize] = useState({ width: 200, height: 150 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDrag = (e: any, data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: data.y });
    
    if (videoRef.current) {
      const video = videoRef.current;
      const relativeX = (data.x / video.clientWidth) * video.videoWidth;
      const relativeY = (data.y / video.clientHeight) * video.videoHeight;
      const relativeWidth = (highlightSize.width / video.clientWidth) * video.videoWidth;
      const relativeHeight = (highlightSize.height / video.clientHeight) * video.videoHeight;

      onCropChange({
        x: relativeX,
        y: relativeY,
        width: relativeWidth,
        height: relativeHeight,
      });
    } else {
      // یا ارسال ابعاد به صورت پیکسلی (نسبت به نمایش فعلی)
      onCropChange({
        x: data.x,
        y: data.y,
        width: highlightSize.width,
        height: highlightSize.height,
      });
    }
  };

  return (
    <div className="video-wrapper" style={{ position: "relative" }}>
      <video
        ref={videoRef}
        src={videoSrc}
        controls
        className="video-full"
        style={{ width: "100%" }}
      />
      <div
        className="overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Draggable bounds="parent" onDrag={handleDrag}>
          <div
            className="highlight-area"
            style={{
              width: highlightSize.width,
              height: highlightSize.height,
              border: "2px dashed red",
              position: "absolute",
              pointerEvents: "auto",
              cursor: "move",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          ></div>
        </Draggable>
      </div>
    </div>
  );
};

export default DraggableHighlight;