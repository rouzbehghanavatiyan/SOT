import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { subSubCategoryList } from "../../../services/dotNet";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import SoftLink from "../../../hoc/SoftLinks";
import MainTitle from "../../../components/MainTitle";
import asyncWrapper from "../../../common/AsyncWrapper";
import { Icon } from "../../../components/Icon";

const Gear: React.FC<any> = ({
  currentStep,
  setCurrentStep,
  updateStepData,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [allSubSubCategory, setAllSubSubCategory] = useState<any>();

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
  }, []);

  const iconMap: { [key: string]: JSX.Element } = {
    singer: <Icon name="Audiotrack" className="text-2xl mx-3 font25" />,
    guitar: <Icon name="Audiotrack" className="text-2xl mx-3 font25" />,
    violen: <Icon name="Audiotrack" className="text-2xl mx-3 font25" />,
    optional: <Icon name="OutdoorGrill" className="text-2xl mx-3 font25" />,
  };


  const handleAcceptCategory = (data: any) => {
    setCurrentStep(4);
    updateStepData(3, { name: data.name, icon: iconMap[data.icon] });
    localStorage.setItem("gearId", data.id);
  };

  const categoriesWithIcons = allSubSubCategory?.map((category: any) => ({
    ...category,
    icon: category.icon || category.name.toLowerCase(),
  }));

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="lg:shadow-card">
      <MainTitle handleBack={handleBack} title="Gear" />
      <SoftLink
        iconMap={iconMap}
        handleAcceptCategory={handleAcceptCategory}
        categories={categoriesWithIcons || []}
        isLoading={false}
      />
    </div>
  );
};

export default Gear;
