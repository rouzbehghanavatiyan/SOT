import React, { useEffect, useState } from "react";
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
interface MovieDataType {
  parentId: null;
  userId: number | null;
  movieId: number | null;
  status: number | null;
  inviteId?: any;
  desc?: string;
  title?: string;
  rate?: number;
}

interface EditVideoProps {
  showEditMovie: boolean;
  setShowEditMovie: React.Dispatch<React.SetStateAction<boolean>>;
  coverImage?: string;
  allFormData?: {
    imageCover?: File;
    video?: File;
  };
  mode?: { typeMode?: number };
}

interface AddMovieType {
  userId: number | null;
  description?: string;
  title?: string;
  subSubCategoryId: number;
  modeId: number | undefined;
}

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
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [findingMatch, setFindingMatch] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleAcceptOffline = asyncWrapper(async () => {
    if (currentStep === 1) {
      const postData: AddMovieType = {
        userId: Number(sessionStorage?.getItem("userId") as null) || null,
        description: movieData?.desc ?? "",
        title: movieData?.title ?? "",
        subSubCategoryId: 1 || null,
        modeId: mode?.typeMode || 0,
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
          const postInvite = {
            parentId: null,
            userId: Number(userIdFromSStorage) || null,
            movieId: resMovieData?.id || null,
            status: 0,
          };

          const resInvite = await addInvite(postInvite);
          const { status: inviteStatus, data: inviteData } = resInvite?.data;
          setMovieData((prev: any) => ({
            ...prev,
            userId: Number(userIdFromSStorage) || null,
            movieId: Number(resMovieData?.id),
            inviteId: inviteData,
          }));
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

  const handleAddInvite = asyncWrapper(async () => {
    console.log("movieData", movieData?.userId);
    const postInvite = {
      parentId: null,
      userId: Number(userIdFromSStorage) || null,
      movieId: movieData?.movieId || null,
      status: 1,
      inviteId: movieData?.inviteId || null,
    };
    const res = await addInvite(postInvite);
    console.log(res?.data);

    if (res?.data?.status === 3) {
      setShowEditMovie(false);
      navigate("/watch");
    }
  });

  useEffect(() => {
    let inviteInterval: ReturnType<typeof setInterval>;

    if (findingMatch && movieData) {
      inviteInterval = setInterval(() => {
        handleAddInvite();
      }, 5000);
    }
    return () => {
      clearInterval(inviteInterval);
    };
  }, [movieData?.movieId]);

  return (
    <Modal
      title={
        mode?.typeMode === 3
          ? "offline"
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
            <SlideRange
            // rangeValue={movieData?.rate}
            // setRangeValue={(e: any) =>
            //   setMovieData((prev: any) => ({
            //     ...prev,
            //     rate: e.target.value,
            //   }))
            // }
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
                  : undefined
            }
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
