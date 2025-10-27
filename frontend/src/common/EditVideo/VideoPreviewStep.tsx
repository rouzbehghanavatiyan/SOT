import React from "react";
import Input from "../../components/Input";
import { Button } from "../../components/Button";

interface VideoPreviewStepProps {
  videoSrc: string;
  movieData: any;
  onMovieDataChange: (data: any) => void;
  onCancel: () => void;
  onNext: () => void;
}

const VIDEO_CONTAINER_STYLE = {
  width: "400px",
  height: "300px",
  objectFit: "contain" as const,
  backgroundColor: "#000",
};

const VideoPreviewStep: React.FC<VideoPreviewStepProps> = ({
  videoSrc,
  movieData,
  onMovieDataChange,
  onCancel,
  onNext,
}) => {
  return (
    <div className="p-5 ">
      <div className="border mb-4 p-1">
        <div
          className="video-wrapper flex justify-center items-center"
        >
          <video
            src={videoSrc}
            controls
            style={VIDEO_CONTAINER_STYLE}
            className="max-w-full max-h-full"
          />
        </div>
      </div>

      <div>
        <span className="mb-4 mt-4">Title</span>
        <Input
          value={movieData?.title}
          onChange={(e: any) => onMovieDataChange({ title: e.target.value })}
        />
      </div>

      <div className="">
        <span className="flex my-4">Description</span>
        <textarea
          className="border w-full focus:border-none outline-mainGray-dark px-5 py-1"
          rows={6}
          value={movieData?.desc}
          onChange={(e: any) => onMovieDataChange({ desc: e.target.value })}
        />
      </div>

      <div className="mt-4 flex justify-around">
        <Button
          className="border"
          variant={"outLine_secondary"}
          label="Cancel"
          onClick={onCancel}
        />
        <Button
          className="border"
          variant={"green"}
          label="Next"
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default VideoPreviewStep;