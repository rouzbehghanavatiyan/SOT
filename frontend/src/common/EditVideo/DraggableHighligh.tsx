import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

type DraggableHighlightProps = {
  videoSrc: string;
  onCropChange: (data: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
  onCropVideo: (cropVideoFunction: () => Promise<Blob>) => void;
};

const DraggableHighlight: React.FC<DraggableHighlightProps> = ({
  videoSrc,
  onCropChange,
  onCropVideo,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [highlightSize] = useState({ width: 200, height: 150 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const ffmpeg = createFFmpeg({
    log: true,
  corePath: 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.js',
  });

  useEffect(() => {
    const loadFfmpeg = async () => {
      try {
        if (!ffmpeg.isLoaded()) {
          console.log("Loading FFmpeg...");
          await ffmpeg.load();
          setFfmpegLoaded(true);
          console.log("FFmpeg loaded successfully");
        }
      } catch (error) {
        console.error("Error loading FFmpeg:", error);
      }
    };
    loadFfmpeg();
  }, []);

  const cropVideo = async (): Promise<Blob> => {
    if (!ffmpegLoaded) {
      throw new Error("FFmpeg not loaded yet");
    }
    if (!videoRef.current) {
      throw new Error("Video reference not available");
    }
    const video = videoRef.current;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const relativeX = (position.x / video.clientWidth) * videoWidth;
    const relativeY = (position.y / video.clientHeight) * videoHeight;
    const relativeWidth =
      (highlightSize.width / video.clientWidth) * videoWidth;
    const relativeHeight =
      (highlightSize.height / video.clientHeight) * videoHeight;

    const response = await fetch(videoSrc);
    const videoBuffer = await response.arrayBuffer();
    await ffmpeg.FS("writeFile", "input.mp4", new Uint8Array(videoBuffer));
    await ffmpeg.run(
      "-i",
      "input.mp4",
      "-vf",
      `crop=${relativeWidth}:${relativeHeight}:${relativeX}:${relativeY}`,
      "-c:v",
      "libx264",
      "-c:a",
      "copy",
      "output.mp4"
    );

    // Read and return the result
    const data: any = ffmpeg.FS("readFile", "output.mp4");
    return new Blob([data.buffer], { type: "video/mp4" });
  };

  useEffect(() => {
    if (ffmpegLoaded) {
      onCropVideo(cropVideo);
    }
  }, [cropVideo, onCropVideo, ffmpegLoaded]);

  const handleDrag = (e: any, data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: data.y });
    onCropChange({
      x: data.x,
      y: data.y,
      width: highlightSize.width,
      height: highlightSize.height,
    });
  };
  console.log(ffmpegLoaded);

  return (
    <div className="video-wrapper" style={{ position: "relative" }}>
      {!ffmpegLoaded && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <p>Loading FFmpeg... Please wait.</p>
        </div>
      )}
      {ffmpegLoaded && (
        <>
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
        </>
      )}
    </div>
  );
};

export default DraggableHighlight;
