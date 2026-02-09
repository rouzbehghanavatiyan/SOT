import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainTitle from "../../../components/MainTitle";
import SoftLink from "../../../hoc/SoftLinks";
import EditVideo from "../../../common/EditVideo";
import { useVideoHandler } from "../../../hooks/useVideoHandler";
import { useModeHandler } from "../../../hooks/useModeHandler";
import { Icon } from "../../../components/Icon";
import BaseToast from "../../../components/Toastify";

interface ModeProps {
  updateStepData: (step: number, data: any) => void;
  setCurrentStep: (step: any) => void;
}

const Mode: React.FC<ModeProps> = ({ updateStepData, setCurrentStep }) => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const arenaId = Number(localStorage.getItem("arenaId"));

  const {
    videoRef,
    coverImage,
    showEditMovie,
    allFormData,
    setShowEditMovie,
    triggerVideoUpload,
    videoError,
  } = useVideoHandler();

  const { mode, allMode, isLoading, setMode, handleCategoryClick } =
    useModeHandler();

  useEffect(() => {
    if (videoError) {
      setShowToast(true);
    }
  }, [videoError]);

  const handleModeSelection = (data: any) => {
    if (
      (data.id === 3 && arenaId !== 1002) ||
      (data.id === 4 && arenaId !== 1002)
    ) {
      setMode({ show: true, typeMode: data.id });
      triggerVideoUpload();
    }
    if (arenaId === 1002) {
      navigate("/cup")
    }
    handleCategoryClick(data, updateStepData, setCurrentStep);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCloseToast = () => {
    setShowToast(false);
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
    <div className="md:shadow-card">
      <MainTitle title="Mode" />
      <BaseToast
        show={showToast}
        onClose={handleCloseToast}
        message={videoError || ""}
        type="error"
        duration={5000}
      />
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
