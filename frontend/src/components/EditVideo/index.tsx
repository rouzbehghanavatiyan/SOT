import React, { useState } from "react";
import Input from "../Input";
import { Button } from "../Button";
import SlideRange from "../SlideRange";
import Modal from "../Modal";
import asyncWrapper from "../../common/AsyncWrapper";
import { addAttachment, addInvite, addMovie } from "../../services/dotNet";
import { GetServices } from "../../utils/mainType/allMainType";
import Operational from "../../common/TalentMode/StepFour/Operational";

const userIdFromSStorage = sessionStorage.getItem("userId");

const EditVideo: React.FC = ({
  showEditMovie,
  setShowEditMovie,
  coverImage,
  allFormData,
  mode,
}: any) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rate, setRate] = useState(0);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleAccept = asyncWrapper(async () => {
    if (currentStep === 1) {
      // مرحله اول: ذخیره اطلاعات اولیه
      const postData = {
        userId: sessionStorage?.getItem("userId") as null,
        name: "",
        description: desc,
        title: title,
        subSubCategoryId: 1,
      };
      setIsLoadingBtn(true);
      const res = await addMovie(postData);
      const { status: movieStatus, data: movieData }: GetServices = res?.data;
      if (movieStatus === 0) {
        setIsLoadingBtn(false);
        setCurrentStep(2); // رفتن به مرحله دوم
      }
    } else if (currentStep === 2) {
      // مرحله دوم: آپلود فایل‌ها
      const formData = new FormData();
      if (allFormData?.imageCover) {
        formData.append("formFile", allFormData.imageCover);
      }
      if (allFormData?.video) {
        formData.append("formFile", allFormData.video);
      }
      formData.append("attachmentId", movieData?.id);
      formData.append("attachmentType", "mo");
      formData.append("attachmentName", "movies");

      const resAttachment = await addAttachment(formData);
      const { status: attachmentStatus, data: attachmentData } =
        resAttachment?.data;
      if (attachmentStatus === 0) {
        setShowEditMovie(false);
        const postInvite = {
          parentId: null,
          userId: userIdFromSStorage,
          movieId: movieData?.id,
        };
        const resInvite = await addInvite(postInvite);
        console.log(resInvite);
      }
    }
  });

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // بازگشت به مرحله قبل
    }
  };

  return (
    <Modal padding="0" isOpen={showEditMovie} onClose={setShowEditMovie}>
      <div className="flex flex-col">
        <span className="flex justify-center text-white p-2 border-b-2 bg-green">Offline</span>
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
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="">
              <span className="flex my-4">Description</span>
              <textarea
                className=" border w-full focus:border-none outline-mainGray-dark px-5 py-1"
                rows={6}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <SlideRange
              rangeValue={rate}
              setRangeValue={(e) => setRate(e.target.value)}
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
            onClick={handleAccept}
            variant={"green"}
            label={currentStep === 1 ? "Accept" : "Accept"}
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
