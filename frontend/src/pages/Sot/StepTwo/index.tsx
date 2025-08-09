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

const StepTwo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allSubCategory, setAllSubCategory] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false);

  const handleGetCategory = asyncWrapper(async () => {
    setIsLoading(true);
    const res = await subCategoryList(location?.state?.category?.id);
    setIsLoading(false);
    const { data, status } = res?.data;
    if (status === 0) {
      setAllSubCategory(data || []);
    }
  });

  const handleAcceptCategory = (data: any) => {
    console.log(data);
    const newPath = `${location.pathname}/${data?.name}`;
    navigate(newPath, { state: { subCategory: data } });
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  const iconMap: { [key: string]: JSX.Element } = {
    music: <AudiotrackIcon className="text-2xl mx-3 font25" />,
    sport: <SportsKabaddiIcon className="text-2xl mx-3 font25" />,
    inventor: <PrecisionManufacturingIcon className="text-2xl mx-3 font25" />,
    cook: <OutdoorGrillIcon className="text-2xl mx-3 font25" />,
    photography: <LocalSeeIcon className="text-2xl mx-3 font25" />,
    engineer: <ArchitectureIcon className="text-2xl mx-3 font25" />,
    game: <SportsEsportsIcon className="text-2xl mx-3 font25" />,
  };

  const handleBack = () => {
    navigate(-1);
  };

  const categoriesWithIcons = allSubCategory?.map((category: any) => ({
    ...category,
    icon: category.icon || category.name.toLowerCase(),
  }));

  return (
    <>
      <MainTitle title="Talent mode" handleBack={handleBack} />
      <SoftLink
        iconMap={iconMap}
        handleAcceptCategory={handleAcceptCategory}
        categories={categoriesWithIcons || []}
        isLoading={isLoading}
      />
    </>
  );
};

export default StepTwo;
