import React, { useEffect, useRef, useState } from "react";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import MainTitle from "../../../components/MainTitle";
import SoftLink from "../../../hoc/SoftLinks";
import { useNavigate } from "react-router-dom";
import { modeList } from "../../../services/dotNet";
import asyncWrapper from "../../../common/AsyncWrapper";
import EditVideo from "../../../common/EditVideo";

interface Mode {
  id: string | number;
  name: string;
  icon?: string;
  label?: string;
}

interface FormData {
  imageCover: File;
  video: File;
}

const StepFour: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showEditMovie, setShowEditMovie] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allFormData, setAllFormData] = useState<FormData>();
  const [mode, setMode] = useState<{ show: boolean; typeMode: number }>({
    show: false,
    typeMode: 0,
  });
  const [allMode, setAllMode] = useState<Mode[]>([]);
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
    const input: any = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = handleVideoUpload;
    input.click();
  };

  const handleOptional = () => {
    setMode({ show: true, typeMode: 4 });
    const input: any = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = handleVideoUpload;
    input.click();
  };

  const handleCategoryClick = (category: Mode) => {
    console.log(category);
    if (category.id === 3) {
      handleOffline();
    } else if (category.id === 4) {
      handleOptional();
    } else if (category.id === 1) {
      return null;
    } else if (category.id === 2) {
      return null;
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const iconMap: { [key: string]: JSX.Element } = {
    offline: (
      <WifiOffIcon onClick={handleOffline} className="text-2xl mx-3 font25" />
    ),
    optional: <AltRouteIcon className="text-2xl mx-3 font25" />,
    turbo: <NetworkCheckIcon className="text-2xl mx-3 font25" />,
    live: <RadioButtonCheckedIcon className="text-2xl mx-3 font25" />,
  };

  const handleModeList = asyncWrapper(async () => {
    setIsLoading(true);
    const res = await modeList();
    setIsLoading(false);
    console.log(res);
    const { data, status } = res?.data;
    if (status === 0) {
      setAllMode(data || []);
    }
  });

  useEffect(() => {
    handleModeList();
  }, []);

  const categoriesWithIcons = allMode?.map((mode: any) => ({
    ...mode,
    icon: mode.icon || mode.name.toLowerCase(),
  }));

  return (
    <>
      <MainTitle handleBack={handleBack} title="Mode" />
      <video ref={videoRef} style={{ display: "none" }} />
      <SoftLink
        iconMap={iconMap}
        categories={categoriesWithIcons || []}
        isLoading={isLoading}
        handleAcceptCategory={handleCategoryClick}
      />
      {showEditMovie && (
        <EditVideo
          mode={mode}
          allFormData={allFormData}
          showEditMovie={showEditMovie}
          setShowEditMovie={setShowEditMovie}
          coverImage={coverImage}
        />
      )}
    </>
  );
};

export default StepFour;
