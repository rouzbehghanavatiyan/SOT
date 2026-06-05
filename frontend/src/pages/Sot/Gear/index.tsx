import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { subSubCategoryList } from "../../../services/dotNet";
import SoftLink from "../../../hoc/SoftLinks";
import MainTitle from "../../../components/MainTitle";
import asyncWrapper from "../../../common/AsyncWrapper";
import { Icon } from "../../../components/Icon";
import EditVideo from "../../../common/EditVideo";
import { useVideoHandler } from "../../../hooks/useVideoHandler";
import { useModeHandler } from "../../../hooks/useModeHandler";

const Gear: React.FC<any> = ({
  currentStep,
  setCurrentStep,
  updateStepData,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [allSubSubCategory, setAllSubSubCategory] = useState<any>();
  const arenaId = Number(localStorage.getItem("arenaId"));
  const [selectedGear, setSelectedGear] = useState<any>(null);

  const {
    coverImage,
    showEditMovie,
    allFormData,
    setAllFormData,
    setShowEditMovie,
    videoRef,
    triggerVideoUpload,
  } = useVideoHandler();

  const { mode, setMode, handleCategoryClick } = useModeHandler();

  const handleGetCategory = asyncWrapper(async () => {
    setIsLoading(true);

    const res = await subSubCategoryList(currentStep?.skill?.id);
    setIsLoading(false);
    const { data, status } = res?.data;
    if (status === 0) {
      setAllSubSubCategory(data || []);
    }
  });

  useEffect(() => {
    handleGetCategory();
    if (allFormData && selectedGear) {
      setAllFormData({
        ...allFormData,
        gearData: selectedGear,
      });
    }
  }, [allFormData?.video]);

  const handleAcceptCategory = (data: any) => {
    setSelectedGear(data);
    setMode({ show: true, typeMode: data.id });
    triggerVideoUpload(); // باز کردن گالری

    if (arenaId === 1002) {
      navigate("/cup");
    }
    handleCategoryClick(data, updateStepData, setCurrentStep);
  };

  const categoriesWithIcons = allSubSubCategory?.map((category: any) => ({
    ...category,
    icon: category.icon || category.name.toLowerCase(),
  }));

  const arenaIconMap = allSubSubCategory?.reduce((acc: any, category: any) => {
    if (category.icon) {
      acc[category.name.toLowerCase()] = (
        <Icon name={category.icon} className="font25 mx-3" />
      );
    }
    return acc;
  }, {});

  return (
    <div className="md:shadow-card">
      <video ref={videoRef} style={{ display: "none" }} />
      <MainTitle title="Gear" />
      <SoftLink
        iconMap={arenaIconMap}
        handleAcceptCategory={handleAcceptCategory}
        categories={categoriesWithIcons || []}
        isLoading={false}
      />
      {showEditMovie && (
        <EditVideo
          allFormData={{ ...allFormData, gearData: selectedGear }} // ارسال مستقیم دیتای انتخاب شده
          showEditMovie={showEditMovie}
          setShowEditMovie={setShowEditMovie}
          coverImage={coverImage}
          mode={mode} // پراپ mode را اینجا اضافه کنید 👇
        />
      )}
    </div>
  );
};

export default Gear;
