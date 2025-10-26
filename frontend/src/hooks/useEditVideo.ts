import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAttachment, addInvite, addMovie, removeInvite } from "../services/dotNet";
import { useAppSelector } from "./reduxHookType";
import { AddMovieType, MovieDataType } from "../common/EditVideo/type";
import asyncWrapper from "../common/AsyncWrapper";

interface UseEditVideoProps {
  showEditMovie: boolean;
  setShowEditMovie: (show: boolean) => void;
  coverImage: string;
  allFormData: any;
  mode: any;
}

export const useEditVideo = ({
  showEditMovie,
  setShowEditMovie,
  coverImage,
  allFormData,
  mode,
}: UseEditVideoProps) => {
  const navigate = useNavigate();
  const main = useAppSelector((state) => state?.main);
  const socket = main?.socketConfig;
  const userIdLogin = main?.userLogin?.user?.id;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [findingMatch, setFindingMatch] = useState(false);
  const [resMovieData, setResMovieData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [movieData, setMovieData] = useState<MovieDataType>({
    parentId: null,
    userId: null,
    movieId: null,
    status: null,
  });

  // Video source URL
  const videoSrc = allFormData?.video ? URL.createObjectURL(allFormData.video) : "";

  // Socket event handler
  useEffect(() => {
    if (!socket || !showEditMovie) return;

    const handleInviteResponse = (data: any) => {
      console.log("handleInviteResponse", data);
      setIsLoadingBtn(false);
      setShowEditMovie(false);
      navigate(`/profile`);
    };

    socket.on("add_invite_offline_response", handleInviteResponse);

    return () => {
      socket.off("add_invite_offline_response", handleInviteResponse);
    };
  }, [socket, navigate, setShowEditMovie, showEditMovie]);

  // Attachment handler
  const handleAttachment = useCallback(
    asyncWrapper(async (movieData: any) => {
      const formData = new FormData();
      if (allFormData?.video) {
        formData.append("formFile", allFormData.video);
      }
      if (allFormData?.imageCover) {
        formData.append("formFile", allFormData.imageCover);
      }
      formData.append("attachmentId", movieData?.id);
      formData.append("attachmentType", "mo");
      formData.append("attachmentName", "movies");

      const resAttachment = await addAttachment(formData);
      const { status: attachmentStatus, data: attachmentData } = resAttachment?.data;
      return { attachmentStatus, attachmentData };
    }),
    [allFormData]
  );

  // Matched mode handler
  const handleMatched = useCallback(
    asyncWrapper(async (movieData: any) => {
      const { attachmentStatus } = await handleAttachment(movieData);
      
      if (attachmentStatus === -1) {
        console.log("Invalid video dimensions.");
        return;
      }

      if (attachmentStatus === 0) {
        const postInvite = {
          parentId: null,
          userId: userIdLogin || null,
          movieId: movieData?.id || null,
          status: 0,
        };

        setFindingMatch(true);
        const resInvite = await addInvite(postInvite);
        const { status: inviteStatus, data: inviteData } = resInvite?.data;

        setMovieData((prev: any) => ({
          ...prev,
          userId: userIdLogin || null,
          movieId: Number(movieData?.id),
          inviteId: inviteData,
        }));

        if (inviteData?.userId !== 0) {
          socket?.emit("add_invite_offline", inviteData);
          setShowEditMovie(false);
          navigate(`/profile`);
        } else {
          setIsLoadingBtn(true);
        }
      }
    }),
    [handleAttachment, userIdLogin, socket, navigate, setShowEditMovie]
  );

  // Optional mode handler
  const handleAcceptOptional = useCallback(
    asyncWrapper(async (movieData: any) => {
      setMovieData((prev: any) => ({
        ...prev,
        userId: userIdLogin || null,
        movieId: Number(movieData?.modeId),
      }));
      setCurrentStep(3);
    }),
    [userIdLogin]
  );

  // Video upload handler
  const handleUploadVideo = useCallback(
    asyncWrapper(async () => {
      setIsLoadingBtn(true);

      const postData: AddMovieType = {
        userId: userIdLogin || null,
        description: movieData?.desc ?? "",
        title: movieData?.title ?? "",
        subSubCategoryId: 1 || null,
        modeId: mode?.typeMode || 0,
        cropData: null,
        fixedDimensions: {
          width: "400px",
          height: "300px",
          objectFit: "contain" as const,
          backgroundColor: "#000",
        },
      };

      const res = await addMovie(postData);
      const { status: movieStatus, data: resMovieData } = res?.data;
      setResMovieData(resMovieData);

      if (movieStatus === 0) {
        if (mode?.typeMode === 3) {
          await handleMatched(resMovieData);
        } else if (mode?.typeMode === 4) {
          await handleAcceptOptional(resMovieData);
        }
      } else {
        alert("Movie does not exist");
      }
    }),
    [movieData, mode, userIdLogin, handleMatched, handleAcceptOptional]
  );

  // Back handler
  const handleBack = useCallback(async () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    
    setIsLoadingBtn(false);
    
    if (movieData?.inviteId) {
      await removeInvite(movieData?.inviteId?.id);
    }
  }, [currentStep, movieData]);

  // Next step handler
  const handleNextStep = useCallback(() => {
    setCurrentStep(2);
  }, []);

  return {
    videoRef,
    videoSrc,
    isLoadingBtn,
    findingMatch,
    resMovieData,
    currentStep,
    movieData,
    setCurrentStep,
    setMovieData,
    handleUploadVideo,
    handleBack,
    handleNextStep,
  };
};