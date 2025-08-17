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
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";
import { AddMovieType, EditVideoProps, MovieDataType } from "./type";
import DraggableHighlight from "./DraggableHighligh";
import Operational from "../../pages/Sot/Mode/Operational";

const EditVideo: React.FC<EditVideoProps> = ({
  showEditMovie,
  setShowEditMovie,
  coverImage,
  allFormData,
  mode,
}) => {
  const navigate = useNavigate();
  const main = useAppSelector((state) => state?.main);
  const socket = main?.socketConfig;
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [findingMatch, setFindingMatch] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
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
      if (allFormData?.video) {
        formData.append("formFile", allFormData.video);
      }
      if (allFormData?.imageCover) {
        formData.append("formFile", allFormData.imageCover);
      }
      formData.append("attachmentId", resMovieData?.id);
      formData.append("attachmentType", "mo");
      formData.append("attachmentName", "movies");
      const resAttachment = await addAttachment(formData);
      const { status: attachmentStatus, data: attachmentData } =
        resAttachment?.data;

      return { attachmentStatus, attachmentData };
    }),
    [allFormData]
  );

  const handleFixVideo = useCallback(
    async (resMovieData: any) => {
      console.log(resMovieData);
      try {
        const { attachmentStatus } = await handleAttachment(resMovieData);
        if (attachmentStatus === -1) {
          console.log("Invalid video dimensions.");
          return;
        }
        console.log(resMovieData);

        if (attachmentStatus === 0) {
          const postInvite = {
            parentId: null,
            userId: main?.userLogin?.user?.id || null,
            movieId: resMovieData?.id || null,
            status: 0,
          };

          setFindingMatch(true);
          const resInvite = await addInvite(postInvite);
          const { status: inviteStatus, data: inviteData } = resInvite?.data;
          setMovieData((prev: any) => ({
            ...prev,
            userId: main?.userLogin?.user?.id || null,
            movieId: Number(resMovieData?.id),
            inviteId: inviteData,
          }));
          console.log(inviteStatus);

          if (inviteStatus === 0) {
            socket.emit("add_invite_offline", inviteData);
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
        userId: main?.userLogin?.user?.id || null,
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
        userId: main?.userLogin?.user?.id || null,
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

  const handleNextStep = async () => {
    try {
      setCurrentStep(2);
    } catch (error) {
      console.error("Error cropping video:", error);
      alert("Error cropping video. Please try again.");
    }
  };

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
              <div className="video-wrapper">
                <DraggableHighlight
                  videoSrc={videoSrc}
                  onCropChange={(data) => setCropData(data)}
                />
              </div>
            </div>
            <div>
              <span className="mb-4 mt-4 ">Title</span>
              <Input
                value={movieData?.title}
                onChange={(e: any) =>
                  setMovieData((prev: any) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className="">
              <span className="flex my-4">Description</span>
              <textarea
                className=" border w-full focus:border-none outline-mainGray-dark px-5 py-1"
                rows={6}
                value={movieData?.desc}
                onChange={(e: any) =>
                  setMovieData((prev: any) => ({
                    ...prev,
                    desc: e.target.value,
                  }))
                }
              />
            </div>
            {/* <SlideRange /> */}
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
        {currentStep === 2 && (
          <div className="p-5">
            {coverImage && (
              <>
                <span className="my-4 font-bold">Your cover: </span>
                <img
                  src={coverImage}
                  alt="Video Cover"
                  className="w-full max-h-96 rounded-sm"
                />
              </>
            )}
            <div className="mt-4 flex justify-between">
              <Button
                className="border"
                variant={"outLine_secondary"}
                label="Back"
                onClick={handleBack}
              />
              <Button
                className="border"
                variant={"green"}
                label="Accept"
                onClick={handleUploadVideo}
                loading={isLoadingBtn}
              />
            </div>
          </div>
        )}
      </div>
      {currentStep === 3 && <Operational setShowEditMovie={setShowEditMovie} />}
    </Modal>
  );
};

export default EditVideo;
