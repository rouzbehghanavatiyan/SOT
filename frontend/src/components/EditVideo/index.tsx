import React, { useState } from "react";
import Input from "../Input";
import { Button } from "../Button";
import SlideRange from "../SlideRange";
import Modal from "../Modal";
import asyncWrapper from "../../common/AsyncWrapper";
import { addAttachment, addInvite, addMovie } from "../../services/dotNet";
import { GetServices } from "../../utils/mainType/allMainType";
import Operational from "../../common/TalentMode/StepFour/Operational";
import Loading from "../Loading";
import Timer from "../Timer";
import { redirect, useNavigate } from "react-router-dom";
const userIdFromSStorage = sessionStorage.getItem("userId");

const EditVideo: React.FC = ({
  showEditMovie,
  setShowEditMovie,
  coverImage,
  allFormData,
  mode,
}: any) => {
  const [movieData, setMovieData] = useState<any>({});
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [findingMatch, setFindingMatch] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleAcceptOffline = asyncWrapper(async () => {
    if (currentStep === 1) {
      const postData = {
        userId: (sessionStorage?.getItem("userId") as null) || null,
        description: movieData?.desc || null,
        title: movieData?.title || null,
        subSubCategoryId: 1 || null,
        modeId: mode?.typeMode || null,
      };
      setIsLoadingBtn(true);
      setFindingMatch(true);
      const res = await addMovie(postData);
      const { status: movieStatus, data: resMovieData }: GetServices =
        res?.data;
      if (movieStatus === 0) {
        setIsLoadingBtn(false);
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
        if (attachmentStatus === 0) {
          console.log(resMovieData);
          const postInvite = {
            parentId: null,
            userId: Number(userIdFromSStorage),
            movieId: resMovieData?.id,
            status: 0,
          };

          setMovieData((prev: any) => ({
            ...prev,
            userId: userIdFromSStorage,
            movieId: resMovieData?.id,
          }));
          const resInvite = await addInvite(postInvite);
          const { status: inviteStatus, data: inviteData } = resInvite?.data;
          console.log(inviteStatus);
          if (inviteStatus === 0) {
            setShowEditMovie(false);
            navigate(`/watch`);
          }
        }
      }
    }
  });

  const handleAcceptOptional = asyncWrapper(async () => {
    setCurrentStep(2);
  });

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Modal
      title={
        mode?.typeMode === 3
          ? "offline"
          : mode?.typeMode === 4
            ? "Optional"
            : ""
      }
      padding="0"
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
            <SlideRange
              rangeValue={movieData?.rate}
              setRangeValue={(e: any) =>
                setMovieData((prev: any) => ({
                  ...prev,
                  rate: e.target.value,
                }))
              }
            />
          </div>
        )}
        {currentStep === 2 && mode.typeMode === 4 && (
          <>
            <Operational />
          </>
        )}
      </div>
      <div className="sticky bottom-0 z-50 bg-white w-full p-3  ">
        <div className="flex justify-around">
          <Button
            loading={isLoadingBtn}
            className="border"
            onClick={
              mode.typeMode === 3
                ? handleAcceptOffline
                : mode.typeMode === 4
                  ? handleAcceptOptional
                  : null
            }
            variant={"green"}
            label={
              findingMatch ? (
                <>
                  <div className="flex me-1 justify-center items-center shadow-xl rounded-lg">
                    <div className="loader-text"> </div>
                    {/* Finding user */}
                  </div>
                  <div className="font20 font-bold">
                    <Timer
                      setShowEditMovie={setShowEditMovie}
                      setFindingMatch={setFindingMatch}
                      movieData={movieData}
                      active={findingMatch}
                    />
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
