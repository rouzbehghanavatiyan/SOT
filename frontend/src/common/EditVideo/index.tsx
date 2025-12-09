import React from "react";
import Modal from "../../components/Modal";
import { useEditVideo } from "../../hooks/useEditVideo";
import { EditVideoProps } from "./type";
import VideoPreviewStep from "./VideoPreviewStep";
import { CoverConfirmStep } from "./CoverConfirmStep";
import Optional from "../../pages/Sot/Mode/Optional";

const EditVideo: React.FC<EditVideoProps> = ({
  showEditMovie,
  setShowEditMovie,
  coverImage,
  allFormData,
  mode,
}) => {
  
  const {
    videoSrc,
    isLoadingBtn,
    resMovieData,
    currentStep,
    movieData,
    updateMovieMeta, 
    handleUploadVideo,
    handleBack,
    handleNextStep,
  } = useEditVideo({
    showEditMovie,
    setShowEditMovie,
    coverImage,
    allFormData,
    mode,
  });

  const getModalTitle = () => {
    switch (mode?.typeMode) {
      case 1:
        return "Turbo";
      case 2:
        return "Live";
      case 3:
        return "Offline";
      case 4:
        return "Optional";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <VideoPreviewStep
            videoSrc={videoSrc}
            movieData={movieData}
            onMovieDataChange={updateMovieMeta}
            onCancel={() => setShowEditMovie(false)}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <CoverConfirmStep
            coverImage={coverImage}
            onBack={handleBack}
            onAccept={handleUploadVideo}
            isLoading={isLoadingBtn}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={getModalTitle()}
      className="rounded-2xl"
      padding={0}
      isOpen={showEditMovie}
    >
      <div className="flex flex-col">{renderStepContent()}</div>

      {currentStep === 3 && (
        <Optional
          setMovieData={updateMovieMeta}
          movieData={movieData}
          userIdLogin={movieData.userId}
          allFormData={allFormData}
          resMovieData={resMovieData}
          setShowEditMovie={setShowEditMovie}
        />
      )}
    </Modal>
  );
};

export default EditVideo;
