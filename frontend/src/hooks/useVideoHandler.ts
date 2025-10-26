import { useRef, useState } from "react";
import { extractVideoThumbnail } from "../utils/helpers/videoUtils";

interface UseVideoHandlerReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  coverImage: string;
  videoFile: File | null;
  showEditMovie: boolean;
  allFormData: any;
  setShowEditMovie: (show: boolean) => void;
  setAllFormData: (data: any) => void;
  handleVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerVideoUpload: () => void;
}

export const useVideoHandler = (): UseVideoHandlerReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [coverImage, setCoverImage] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showEditMovie, setShowEditMovie] = useState<boolean>(false);
  const [allFormData, setAllFormData] = useState<any>();

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !videoRef.current) return;

    setVideoFile(file);
    const url = URL.createObjectURL(file);
    const videoElement = videoRef.current;

    // Configure video element
    videoElement.volume = 0;
    videoElement.muted = true;
    videoElement.src = url;
    videoElement.load();
    videoElement.play();

    videoElement.onloadedmetadata = () => {
      const midpoint = videoElement.duration / 2;
      videoElement.currentTime = midpoint;
    };

    videoElement.onseeked = () => {
      extractVideoThumbnail(videoElement, (thumbnailDataUrl, thumbnailFile) => {
        setCoverImage(thumbnailDataUrl);
        setShowEditMovie(true);
        setAllFormData({ imageCover: thumbnailFile, video: file });
      });
    };
  };

  const triggerVideoUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => handleVideoUpload(e as any);
    input.click();
  };

  return {
    videoRef,
    coverImage,
    videoFile,
    showEditMovie,
    allFormData,
    setShowEditMovie,
    setAllFormData,
    handleVideoUpload,
    triggerVideoUpload,
  };
};
