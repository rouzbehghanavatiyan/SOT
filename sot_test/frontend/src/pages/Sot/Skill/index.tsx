import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { subCategoryList } from "../../../services/dotNet";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SoftLink from "../../../hoc/SoftLinks";
import MainTitle from "../../../components/MainTitle";
import asyncWrapper from "../../../common/AsyncWrapper";
const Skill: React.FC<any> = ({
  setAllSubCategory,
  allSubCategory,
  currentStep,
  updateStepData,
}) => {
  const [isLoading, setIsLoading] = useState<any>(false);

  const handleGetCategory = asyncWrapper(async () => {
    setIsLoading(true);
    const res = await subCategoryList(currentStep?.arena?.id);
    setIsLoading(false);
    const { data, status } = res?.data;
    if (status === 0) {
      setAllSubCategory(data || []);
    }
  });

  const iconMap: { [key: string]: JSX.Element } = {
    music: <AudiotrackIcon className="text-2xl mx-3 font25" />,
    sport: <SportsKabaddiIcon className="text-2xl mx-3 font25" />,
    inventor: <PrecisionManufacturingIcon className="text-2xl mx-3 font25" />,
    cook: <OutdoorGrillIcon className="text-2xl mx-3 font25" />,
    photography: <LocalSeeIcon className="text-2xl mx-3 font25" />,
    engineer: <ArchitectureIcon className="text-2xl mx-3 font25" />,
    game: <SportsEsportsIcon className="text-2xl mx-3 font25" />,
  };

  const handleAcceptCategory = (data: any) => {
    updateStepData(2, {
      name: data.name,
      id: data.id,
      icon: iconMap[data.icon],
    });
    localStorage.setItem("skillId", data.id);
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  const categoriesWithIcons = allSubCategory?.map((category: any) => ({
    ...category,
    icon: category.icon || category.name.toLowerCase(),
  }));

  return (
    <div className="lg:shadow-card">
      <MainTitle title="Skill" />
      <SoftLink
        iconMap={iconMap}
        handleAcceptCategory={handleAcceptCategory}
        categories={categoriesWithIcons || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Skill;
