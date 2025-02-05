import React, { useRef, useState } from "react";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import EditVideo from "../../../components/EditVideo";
import Operational from "./Operational";

const StepFour: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showEditMovie, setShowEditMovie] = useState<boolean>(false);
  const [showOperational, setShowOperational] = useState<boolean>(false);
  const [allFormData, setAllFormData] = useState<any>(null);

  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.load();
        videoRef.current.play();
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            const midpoint = videoRef.current.duration / 2;
            videoRef.current.currentTime = midpoint;
          }
        };
        setShowEditMovie(true);
        videoRef.current.onseeked = () => {
          const canvas = document.createElement("canvas");
          if (videoRef.current) {
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(
                videoRef.current,
                0,
                0,
                canvas.width,
                canvas.height
              );
              const dataURL = canvas.toDataURL("image/png");
              setCoverImage(dataURL);
              const blob = dataURLtoBlob(dataURL);
              const coverImageFile = new File([blob], "cover.png", {
                type: "image/png",
              });
              setAllFormData({ imageCover: coverImageFile, video: file });
            }
          }
        };
      }
    }
  };

  const handleOffline = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = handleVideoUpload;
    input.click();
  };

  return (
    <div className="w-full flex-col h-screen justify-center ">
      <video ref={videoRef} style={{ display: "none" }} />
      <div className="grid grid-cols-3">
        <span className="flex justify-center col-span-1">
          <NetworkCheckIcon className="font100 flex justify-center text-green-dark" />
        </span>
        <span className="text-gray-800 flex items-center col-span-2 font20 font-bold">
          Turbo
        </span>
      </div>
      <div className="grid grid-cols-3">
        <span className="flex justify-center col-span-1">
          <RadioButtonCheckedIcon className="font100 flex justify-center text-green-dark" />
        </span>
        <span className="text-gray-800 flex items-center col-span-2 font20 font-bold">
          Live
        </span>
      </div>
      <div onClick={handleOffline} className="grid grid-cols-3">
        <span className="flex justify-center col-span-1">
          <WifiOffIcon className="font100 flex justify-center text-green-dark" />
        </span>
        <span className="text-gray-800 flex items-center col-span-2 font20 font-bold">
          Offline
        </span>
      </div>
      <div
        onClick={() => setShowOperational(true)}
        className="grid grid-cols-3"
      >
        <span className="flex justify-center col-span-1">
          <AltRouteIcon className="font100 flex justify-center text-green-dark" />
        </span>
        <span className="text-gray-800 flex items-center col-span-2 font20 font-bold">
          Operational
        </span>
      </div>
      {showOperational && (
        <Operational
          showOperational={showOperational}
          setShowOperational={setShowOperational}
        />
      )}
      {showEditMovie && (
        <EditVideo
          allFormData={allFormData}
          showEditMovie={showEditMovie}
          setShowEditMovie={setShowEditMovie}
          coverImage={coverImage}
        />
      )}
    </div>
  );
};

export default StepFour;
