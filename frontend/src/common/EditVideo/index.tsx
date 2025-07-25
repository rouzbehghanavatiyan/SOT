import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import SlideRange from "../../components/SlideRange";
import Modal from "../../components/Modal";
import asyncWrapper from "../AsyncWrapper";
import { addAttachment, addInvite, addMovie } from "../../services/dotNet";
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

  const main = useAppSelector((state) => state?.main);
  const userIdFromSStorage = Number(main?.userLogin?.userId);
  const socket = main?.socketConfig;
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [findingMatch, setFindingMatch] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // استپ‌های کامپوننت
  const navigate = useNavigate();

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
      try {
        const { attachmentStatus } = await handleAttachment(resMovieData);

        if (attachmentStatus === -1) {
          console.log("Invalid video dimensions.");
          return;
        }

        if (attachmentStatus === 0) {
          const postInvite = {
            parentId: null,
            userId: userIdFromSStorage || main?.userLogin?.userId || null,
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

          console.log(resInvite);

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
        userId: userIdFromSStorage || null,
        movieId: Number(resMovieData?.modeId),
      }));
      setCurrentStep(2);
    }),
    []
  );

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    socket.on("add_invite_offline_response", (data: any) => {
      setIsLoadingBtn(false);
      setShowEditMovie(false);
      navigate(`/profile`);
    });
    return () => {
      socket.off("add_invite_offline_response");
    };
  }, [socket]);

  const handleUploadVideo = useCallback(
    asyncWrapper(async () => {
      setIsLoadingBtn(true);

      const postData: AddMovieType = {
        userId: Number(sessionStorage?.getItem("userId") as null) || null,
        description: movieData?.desc ?? "",
        title: movieData?.title ?? "",
        subSubCategoryId: 1 || null,
        modeId: mode?.typeMode || 0,
        cropData,
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

  return (
    <Modal
      title={
        mode?.typeMode === 3
          ? "Offline"
          : mode?.typeMode === 4
            ? "Optional"
            : ""
      }
      className="rounded-2xl "
      padding={0}
      isOpen={showEditMovie}
      onClose={setShowEditMovie}
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
            <SlideRange />
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
                onClick={() => setCurrentStep(2)}
              />
            </div>
          </div>
        )}

        {/* مرحله دوم: نمایش کاور ویدیو */}
        {currentStep === 2 && (
          <div className="p-5">
            {coverImage && (
              <>
                <span>Cover: </span>
                <img
                  src={coverImage}
                  alt="Video Cover"
                  className="w-full h-full rounded-sm"
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
    </Modal>
  );
};

export default EditVideo;
