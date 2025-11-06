import React from "react";
import { useNavigate } from "react-router-dom";
import MainTitle from "../../../components/MainTitle";
import SoftLink from "../../../hoc/SoftLinks";
import EditVideo from "../../../common/EditVideo";
import { useVideoHandler } from "../../../hooks/useVideoHandler";
import { useModeHandler } from "../../../hooks/useModeHandler";
import { Icon } from "../../../components/Icon";

interface ModeProps {
  updateStepData: (step: number, data: any) => void;
  setCurrentStep: (step: any) => void;
}

const Mode: React.FC<ModeProps> = ({
  updateStepData,
  setCurrentStep,
}) => {
  const navigate = useNavigate();

  const {
    videoRef,
    coverImage,
    showEditMovie,
    allFormData,
    setShowEditMovie,
    triggerVideoUpload,
  } = useVideoHandler();

  const { mode, allMode, isLoading, setMode, handleCategoryClick } =
    useModeHandler();

  const handleModeSelection = (data: any) => {

    if (data.id === 3 || data.id === 4) {
      setMode({ show: true, typeMode: data.id });
      triggerVideoUpload();
    }
    handleCategoryClick(data, updateStepData, setCurrentStep);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const categoriesWithIcons = allMode?.map((modeItem: any) => ({
    ...modeItem,
    icon: modeItem.icon || modeItem.name.toLowerCase(),
  }));

  const arenaIconMap = allMode?.reduce((acc: any, category: any) => {
    if (category.icon) {
      acc[category.name.toLowerCase()] = (
        <Icon name={category.icon} className="font25 mx-3" />
      );
    }
    return acc;
  }, {});


  return (
    <div className="lg:shadow-card">
      <MainTitle handleBack={handleBack} title="Mode" />
      <video ref={videoRef} style={{ display: "none" }} />
      <SoftLink
        iconMap={arenaIconMap}
        categories={categoriesWithIcons || []}
        isLoading={isLoading}
        handleAcceptCategory={handleModeSelection}
      />
      {showEditMovie && (
        <EditVideo
          mode={mode}
          allFormData={allFormData}
          showEditMovie={showEditMovie}
          setShowEditMovie={setShowEditMovie}
          coverImage={coverImage}
        />
      )}
    </div>
  );
};

export default Mode;
