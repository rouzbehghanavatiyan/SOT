import React, { useState } from "react";
import Draggable from "react-draggable";

type DraggableHighlightProps = {
  videoSrc: string;
  onCropChange: (cropData: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
};

const DraggableHighlight: React.FC<DraggableHighlightProps> = React.memo(
  ({ videoSrc, onCropChange }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [highlightSize] = useState({ width: 300, height: 200 });

    const handleDrag = (e: any, data: any) => {
      setPosition({ x: data.x, y: data.y });

      onCropChange({
        x: data.x,
        y: data.y,
        width: highlightSize.width,
        height: highlightSize.height,
      });
    };

    return (
      <div className="video-wrapper">
        <video src={videoSrc} controls className="video-full" />
        <div className="overlay">
          <Draggable bounds="parent" onDrag={handleDrag}>
            <div
              className="highlight-area"
              style={{
                width: highlightSize.width,
                height: highlightSize.height,
              }}
            ></div>
          </Draggable>
        </div>
      </div>
    );
  }
);

export default DraggableHighlight;
