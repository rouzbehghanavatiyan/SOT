import React, { useCallback, useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import Modal from "../../components/Modal";
import asyncWrapper from "../AsyncWrapper";
import {
  addAttachment,
  addInvite,
  addMovie,
  removeInvite,
} from "../../services/dotNet";
import { GetServices } from "../../utils/mainType/allMainType";
import Operational from "../TalentMode/StepFour/Operational";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";
import { AddMovieType, EditVideoProps, MovieDataType } from "./type";
import DraggableHighlight from "./DraggableHighligh";

const EditVideo: React.FC<EditVideoProps> = ({
  showEditMovie,
  setShowEditMovie,
  coverImage,
  allFormData,
  mode,
}) => {
  const navigate = useNavigate();
  const draggableHighlightRef = useRef<any>(null);
  const main = useAppSelector((state) => state?.main);
  const socket = main?.socketConfig;
  const userIdFromSStorage = Number(main?.userLogin?.user?.id);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [findingMatch, setFindingMatch] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [cropVideoFunction, setCropVideoFunction] =
    useState<() => Promise<Blob>>();
  const [movieData, setMovieData] = useState<MovieDataType>({
    parentId: null,
    userId: null,
    movieId: null,
    status: null,
  });
  const [cropData, setCropData] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 200,
    height: 100,
  });

  const handleAttachment = useCallback(
    asyncWrapper(async (resMovieData: any) => {
      const formData = new FormData();
      console.log(croppedImage);

      if (croppedImage) {
        formData.append("formFile", croppedImage, "cropped-video.mp4");
      }
      formData.append("attachmentId", resMovieData?.id);
      formData.append("attachmentType", "mo");
      formData.append("attachmentName", "movies");
      try {
        const resAttachment = await addAttachment(formData);
        return resAttachment.data;
      } catch (error) {
        console.error("Attachment upload failed:", error);
        throw error;
      }
    }),
    [croppedImage]
  );

  const handleCropImage = useCallback((blob: Blob) => {
    console.log(blob);
    setCroppedImage(blob);
  }, []);

  const handleFixVideo = useCallback(
    async (resMovieData: any) => {
      try {
        const callAddAttachment = await handleAttachment(resMovieData);
        const { status: statusAttachemnt, data } = callAddAttachment;
        if (statusAttachemnt === -1) {
          return;
        }
        if (statusAttachemnt === 0) {
          const postInvite = {
            parentId: null,
            userId: userIdFromSStorage || main?.userLogin?.user?.id || null,
            movieId: resMovieData?.id || null,
            status: 0,
          };
          setFindingMatch(true);
          const resInvite = await addInvite(postInvite);
          const { status: inviteStatus, data: inviteData } = resInvite?.data;
          setMovieData((prev: any) => ({
            ...prev,
            userId: userIdFromSStorage || null,
            movieId: Number(resMovieData?.id),
            inviteId: inviteData,
          }));
          if (inviteData?.userId !== 0) {
            socket.emit("add_invite_offline", inviteData?.userId);
            setShowEditMovie(false);
            navigate(`/profile`);
          } else {
            setIsLoadingBtn(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [handleAttachment, navigate, setShowEditMovie, socket]
  );

  const handleAcceptOptional = useCallback(
    asyncWrapper(async (resMovieData: any) => {
      setMovieData((prev: any) => ({
        ...prev,
        userId: userIdFromSStorage || null,
        movieId: Number(resMovieData?.modeId),
      }));
      setCurrentStep(3);
    }),
    []
  );

  const handleBack = useCallback(async () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    console.log(movieData);
    setIsLoadingBtn(false);
    if (movieData?.inviteId) {
      const res = await removeInvite(movieData?.inviteId?.id);
      console.log(res);
    }
  }, [currentStep, movieData]);

  const handleUploadVideo = useCallback(
    asyncWrapper(async () => {
      setIsLoadingBtn(true);
      const postData: AddMovieType = {
        userId: Number(sessionStorage?.getItem("userId") as null) || null,
        description: movieData?.desc ?? "",
        title: movieData?.title ?? "",
        subSubCategoryId: 1 || null,
        modeId: mode?.typeMode || 0,
        cropData: null,
      };

      const res = await addMovie(postData);
      const { status: movieStatus, data: resMovieData }: GetServices =
        res?.data;
      if (movieStatus === 0) {
        if (mode?.typeMode === 3) {
          handleFixVideo(resMovieData);
        } else if (mode?.typeMode === 4) {
          handleAcceptOptional(resMovieData);
        }
      } else {
        alert("movie does not exist");
      }
    }),
    [handleFixVideo, handleAcceptOptional, movieData, mode, cropData]
  );

  const videoSrc = React.useMemo(() => {
    return allFormData?.video ? URL.createObjectURL(allFormData.video) : "";
  }, [allFormData?.video]);

  const handleNextStep = async () => {
    try {
      if (!cropVideoFunction) {
        throw new Error("Crop video function not available");
      }

      const croppedVideo = await cropVideoFunction();
      setCroppedImage(croppedVideo);
      setCurrentStep(2);
    } catch (error) {
     console.log(error);
    }
  };

  useEffect(() => {
    if (!socket) return;
    const handler = (data: any) => {
      console.log("handleInviteResponse", data);
      setIsLoadingBtn(false);
      setShowEditMovie(false);
      navigate(`/profile`);
    };
    socket.on("add_invite_offline_response", handler);

    return () => {
      socket.off("add_invite_offline_response", handler);
    };
  }, [socket, navigate, setShowEditMovie, setIsLoadingBtn]);

  return (
    <Modal
      title={
        mode?.typeMode === 3
          ? "Offline"
          : mode?.typeMode === 4
            ? "Optional"
            : ""
      }
      className="rounded-2xl"
      padding={0}
      isOpen={showEditMovie}
    >
      <div className="flex flex-col">
        {currentStep === 1 && (
          <div className="p-5">
            <div className="border mb-4 p-1">
              <DraggableHighlight
                videoSrc={videoSrc}
                onCropChange={(data) => console.log("Crop data:", data)}
                onCropVideo={(cropFunction) =>
                  setCropVideoFunction(() => cropFunction)
                } 
              />
            </div>
            <div className="mt-4 flex justify-around">
              <Button
                className="border"
                variant={"outLine_secondary"}
                label="Cancel"
                onClick={() => setShowEditMovie(false)}
              />
              <Button
                className="border"
                variant={"green"}
                label="Next"
                onClick={() => handleNextStep()}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditVideo;
