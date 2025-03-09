import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import SlideRange from "../../components/SlideRange";
import Modal from "../../components/Modal";
import asyncWrapper from "../AsyncWrapper";
import { addAttachment, addInvite, addMovie } from "../../services/dotNet";
import { GetServices } from "../../utils/mainType/allMainType";
import Operational from "../TalentMode/StepFour/Operational";
import Timer from "../../components/Timer";
import { redirect, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";
import { AddMovieType, EditVideoProps, MovieDataType } from "./type";
const userIdFromSStorage = sessionStorage.getItem("userId");

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

  const { main } = useAppSelector((state) => state);
  const socket = main?.socketConfig;
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [findingMatch, setFindingMatch] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleAttachment = useCallback(
    asyncWrapper(async (resMovieData: any) => {
      const formData = new FormData();
      if (allFormData?.imageCover) {
        formData.append("formFile", allFormData.imageCover);
      }
      if (allFormData?.video) {
        formData.append("formFile", allFormData.video);
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
        if (attachmentStatus === 0) {
          const postInvite = {
            parentId: null,
            userId:
              Number(userIdFromSStorage) || main?.userLogin?.userId || null,
            movieId: resMovieData?.id || null,
            status: 0,
          };
          setFindingMatch(true);
          const resInvite = await addInvite(postInvite);
          const { status: inviteStatus, data: inviteData } = resInvite?.data;
          setMovieData((prev: any) => ({
            ...prev,
            userId: Number(userIdFromSStorage) || null,
            movieId: Number(resMovieData?.id),
            inviteId: inviteData,
          }));
          if (inviteStatus === 0) {
            console.log("sooooooooooocket", inviteData);
            socket.emit("add_invite_offline", inviteData);
            setShowEditMovie(false);
            navigate(`/watch`);
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
        userId: Number(userIdFromSStorage) || null,
        movieId: Number(resMovieData?.modeId),
      }));
      setCurrentStep(2);
    }),
    []
  );

  const handleUploadVideo = useCallback(
    asyncWrapper(async () => {
      setIsLoadingBtn(true);
      const postData: AddMovieType = {
        userId: Number(sessionStorage?.getItem("userId") as null) || null,
        description: movieData?.desc ?? "",
        title: movieData?.title ?? "",
        subSubCategoryId: 1 || null,
        modeId: mode?.typeMode || 0,
      };
      const res = await addMovie(postData);
      const { status: movieStatus, data: resMovieData }: GetServices =
        res?.data;
      if (movieStatus === 0) {
        setIsLoadingBtn(false);
        if (mode?.typeMode === 3) {
          handleFixVideo(resMovieData);
        } else if (mode?.typeMode === 4) {
          handleAcceptOptional(resMovieData);
        }
      } else {
        alert("movie does not exist");
      }
    }),
    [handleFixVideo, handleAcceptOptional, movieData, mode]
  );

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    socket.on("add_invite_offline_response", (data: any) => {
      setShowEditMovie(false);
      navigate(`/watch`);
    });
    return () => {
      socket.off("add_invite_offline_response");
    };
  }, [socket]);

  return (
    <Modal
      title={
        mode?.typeMode === 3
          ? "Offline"
          : mode?.typeMode === 4
            ? "Optional"
            : ""
      }
      padding={0}
      isOpen={showEditMovie}
      onClose={setShowEditMovie}
    >
      <div className="flex flex-col">
        {currentStep === 1 && (
          <div className="p-5">
            <div className="border mb-4 p-1">
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Video Cover"
                  className="w-full h-full rounded-sm"
                />
              )}
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
          </div>
        )}
        {currentStep === 2 && mode.typeMode === 4 && (
          <>
            <Operational movieData={movieData} />
          </>
        )}
      </div>
      <div className="sticky bottom-0 z-50 bg-white w-full p-3  ">
        <div className="flex justify-around">
          <Button
            loading={isLoadingBtn}
            className="border"
            onClick={handleUploadVideo}
            variant={"green"}
            label={
              findingMatch ? (
                <>
                  <div className="flex me-1 justify-center items-center shadow-xl rounded-lg">
                    <div className="loader-text me-1"> </div>
                  </div>
                  <div className="font20 font-bold">
                    <Timer className="font20" active={findingMatch} />
                  </div>
                </>
              ) : (
                "Accept"
              )
            }
          />
          {currentStep > 1 && (
            <Button
              className="border"
              onClick={handleBack}
              variant={"outLine_secondary"}
              label="Back"
            />
          )}
          {currentStep === 1 && (
            <Button
              className="border"
              onClick={() => setShowEditMovie(false)}
              variant={"outLine_secondary"}
              label="Close"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditVideo;
