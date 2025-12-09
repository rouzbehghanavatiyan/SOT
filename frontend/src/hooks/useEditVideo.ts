import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./reduxHookType";
import {
  goToStep,
  prepareVideoFileThunk,
  removeInviteThunk,
  uploadFullProcessThunk,
  setMovieMeta,
  resetVideoState,
  setMovieData,
} from "../common/Slices/videoSlice";

interface UseEditVideoProps {
  showEditMovie: boolean;
  setShowEditMovie: (show: boolean) => void;
  allFormData: any;
  mode: any;
  coverImage: any;
}

export const useEditVideo = ({
  showEditMovie,
  setShowEditMovie,
  allFormData,
  mode,
}: UseEditVideoProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // سلکتورها
  const {
    videoSrc,
    isLoading,
    currentStep,
    movieData,
    resMovieData,
    uploadStatus,
  } = useAppSelector((state) => state.video);

  const main = useAppSelector((state) => state.main);
  const socket = main?.socketConfig;
  const userIdLogin = main?.userLogin?.user?.id;
  const gearId = main?.createTalent?.gear?.id;

  useEffect(() => {
    if (showEditMovie && allFormData?.video) {
      dispatch(prepareVideoFileThunk(allFormData.video));
      dispatch(setMovieMeta({ userId: userIdLogin }));
    }
    return () => {
      if (!showEditMovie) {
      }
    };
  }, [allFormData, showEditMovie, dispatch, userIdLogin]);

  const handleUploadVideo = useCallback(() => {
    dispatch(
      uploadFullProcessThunk({
        userId: userIdLogin,
        gearId,
        mode,
        allFormData,
        socket,
        movieMeta: movieData,
      })
    );
  }, [dispatch, userIdLogin, gearId, mode, allFormData, socket, movieData]);

  // 3. هندل دکمه بازگشت
  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      dispatch(goToStep(currentStep - 1));
    }
    // اگر Invite ساخته شده بود و برگشت زد، حذفش کن
    if (movieData?.inviteId) {
      dispatch(removeInviteThunk(movieData.inviteId));
    }
  }, [dispatch, currentStep, movieData]);

  // 4. هندل استپ بعدی (فقط در UI)
  const handleNextStep = useCallback(() => {
    dispatch(goToStep(2));
  }, [dispatch]);

  // 5. لیسنر سوکت برای مود آفلاین (TypeMode 3)
  useEffect(() => {
    if (!socket || !showEditMovie) return;

    const handleInviteResponse = (data: any) => {
      console.log("Socket response received:", data);
      setShowEditMovie(false);
      navigate(`/profile`);
      dispatch(resetVideoState()); // پاکسازی استیت بعد از اتمام موفق
    };

    socket.on("add_invite_offline_response", handleInviteResponse);

    return () => {
      socket.off("add_invite_offline_response", handleInviteResponse);
    };
  }, [socket, showEditMovie, navigate, setShowEditMovie, dispatch]);

  useEffect(() => {
    if (uploadStatus === "success" && mode?.typeMode === 3 && !socket) {
      setShowEditMovie(false);
      navigate(`/profile`);
    }
  }, [uploadStatus, mode, socket, navigate, setShowEditMovie]);

  return {
    videoSrc,
    isLoadingBtn: isLoading,
    resMovieData,
    currentStep,
    movieData,
    setMovieData: (data: any) => dispatch(setMovieData(data)),
    handleUploadVideo,
    handleBack,
    handleNextStep,
    updateMovieMeta: (updates: any) => dispatch(setMovieMeta(updates)),
  };
};
