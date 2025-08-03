import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Draggable from "react-draggable";
import { FFmpeg } from "@ffmpeg/ffmpeg";

type DraggableHighlightProps = {
  videoSrc: string;
  onCropChange: (data: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
};

export type DraggableHighlightHandle = {
  cropVideo: () => Promise<Blob>;
};

const DraggableHighlight = forwardRef<
  DraggableHighlightHandle,
  DraggableHighlightProps
>(({ videoSrc, onCropChange }, ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [highlightSize] = useState({ width: 200, height: 150 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const ffmpegInstance = useRef(new FFmpeg());

  // بارگذاری FFmpeg
  useEffect(() => {
    const loadFfmpeg = async () => {
      const ffmpeg = ffmpegInstance.current;
      if (!ffmpeg.loaded) {
        await ffmpeg.load({
          coreURL: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
        });
        setFfmpegLoaded(true);
      }
    };
    loadFfmpeg();
  }, []);

  const cropVideo = async (): Promise<Blob> => {
    if (!ffmpegLoaded || !ffmpegInstance.current) {
      throw new Error("FFmpeg not loaded yet");
    }
    const ffmpeg = ffmpegInstance.current;

    // دریافت ویدیو به صورت ArrayBuffer
    const response = await fetch(videoSrc);
    const videoBuffer = await response.arrayBuffer();

    // نوشتن فایل ویدیو در سیستم فایل مجازی FFmpeg
    await ffmpeg.writeFile("input.mp4", new Uint8Array(videoBuffer));

    // اجرای دستور برش ویدیو
    const cropCommand = [
      "-i",
      "input.mp4",
      "-vf",
      `crop=${highlightSize.width}:${highlightSize.height}:${position.x}:${position.y}`,
      "-c:v",
      "libx264",
      "-c:a",
      "aac",
      "output.mp4",
    ];
    await ffmpeg.exec(cropCommand);
    const output: any = await ffmpeg.readFile("output.mp4");
    return new Blob([output], { type: "video/mp4" });
  };

  // در معرض گذاشتن تابع cropVideo برای کامپوننت والد
  useImperativeHandle(ref, () => ({
    cropVideo,
  }));

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
            }}
          ></div>
        </Draggable>
      </div>
    </div>
  );
});

export default DraggableHighlight;
