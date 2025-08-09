import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { subSubCategoryList } from "../../../services/dotNet";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import SoftLink from "../../../hoc/SoftLinks";
import MainTitle from "../../../components/MainTitle";
import asyncWrapper from "../../../common/AsyncWrapper";

const StepThree: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [allSubSubCategory, setAllSubSubCategory] = useState<any>();

  const handleGetCategory = asyncWrapper(async () => {
    setIsLoading(true);
    const res = await subSubCategoryList(location?.state?.subCategory?.id);
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
    singer: <AudiotrackIcon className="text-2xl mx-3 font25" />,
    guitar: <AudiotrackIcon className="text-2xl mx-3 font25" />,
    violen: <AudiotrackIcon className="text-2xl mx-3 font25" />,
    optional: <OutdoorGrillIcon className="text-2xl mx-3 font25" />,
  };

  const handleAcceptCategory = (category: any) => {
    const newPath = `${location.pathname}/${category?.name}`;
    navigate(newPath);
  };

  const categoriesWithIcons = allSubSubCategory?.map((category: any) => ({
    ...category,
    icon: category.icon || category.name.toLowerCase(),
  }));

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <MainTitle handleBack={handleBack} title="Choice talent" />
      <SoftLink
        iconMap={iconMap}
        handleAcceptCategory={handleAcceptCategory}
        categories={categoriesWithIcons || []}
        isLoading={false}
      />
    </>
  );
};

export default StepThree;
