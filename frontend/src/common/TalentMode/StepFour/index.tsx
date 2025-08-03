import React, { useRef, useState } from "react";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import EditVideo from "../../EditVideo";
import MainTitle from "../../../components/MainTitle";
import SoftLink from "../../../hoc/SoftLinks";
import { useNavigate } from "react-router-dom";

const StepFour: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showEditMovie, setShowEditMovie] = useState<boolean>(false);
  const [allFormData, setAllFormData] = useState<any>(null);
  const [mode, setMode] = useState<any>({});

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
        videoRef.current.volume = 0;
        videoRef.current.muted = true;
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
    setMode({ show: true, typeMode: 3 });
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = handleVideoUpload;
    input.click();
  };

  const handleOptional = () => {
    setMode({ show: true, typeMode: 4 });
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = handleVideoUpload;
    input.click();
  };

  const handleCategoryClick = (category: {
    name: string;
    id: string | number;
  }) => {
    if (category.name === "Offline") {
      handleOffline();
    } else if (category.name === "Optional") {
      handleOptional();
    } else if (category.name === "Turbo") {
      // handleProfile();
    } else if (category.name === "Live") {
      // handleProfile();
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const iconMap: { [key: string]: JSX.Element } = {
    Offline: <WifiOffIcon className="text-2xl mx-3 font25" />,
    Optional: <AltRouteIcon className="text-2xl mx-3 font25" />,
    Turbo: <NetworkCheckIcon className="text-2xl mx-3 font25" />,
    Live: <RadioButtonCheckedIcon className="text-2xl mx-3 font25" />,
  };

  return (
    <section className="md:my-10 my-0 ">
      <MainTitle title="Talent mode" />
      <div className="mx-4 grid grid-cols-1 md:mt-10 justify-center ">
        <video ref={videoRef} style={{ display: "none" }} />
        <div
          onClick={handleOffline}
          className=" cursor-pointer grid grid-cols-7 mt-4"
        >
          <span className="text-primary col-span-2 flex items-center text-center justify-start font-bold">
            Offline
          </span>
          <span className="flex col-span-3 justify-center  ">
            <WifiOffIcon className="font60 flex px-3 justify-center text-primary" />
          </span>
        </div>
        <div
          onClick={handleOptional}
          className=" cursor-pointer grid grid-cols-7  py-4 mt-4 "
        >
          <span className="text-primary col-span-2 flex items-center text-center justify-start font-bold">
            Optional
          </span>
          <span className="flex col-span-3 justify-center  ">
            <AltRouteIcon className="font60 flex px-3 justify-center text-primary" />
          </span>
        </div>
        <div className=" cursor-pointer grid grid-cols-7  py-4 mt-4  ">
          <span className="text-primary col-span-2 flex items-center text-center justify-start font-bold">
            Turbo
          </span>
          <span className="flex col-span-3 justify-center  ">
            <NetworkCheckIcon className="font60 flex px-3 justify-center text-primary" />
          </span>
        </div>
        <div className=" cursor-pointer grid grid-cols-7  py-4 mt-4  ">
          <span className="text-primary col-span-2 flex items-center text-center justify-start font-bold">
            Live
          </span>
          <span className="flex col-span-3 justify-center">
            <RadioButtonCheckedIcon className="font60 flex px-3 justify-center text-primary" />
          </span>
        </div>

        {showEditMovie && (
          <EditVideo
            mode={mode}
            allFormData={allFormData}
            showEditMovie={showEditMovie}
            setShowEditMovie={setShowEditMovie}
            coverImage={coverImage}
          />
        )}
      </div>
    </section>
  );
};

export default StepFour;
