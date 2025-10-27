import React, { useEffect, useState } from "react";
import { subCategoryList } from "../../../services/dotNet";
import SoftLink from "../../../hoc/SoftLinks";
import MainTitle from "../../../components/MainTitle";
import asyncWrapper from "../../../common/AsyncWrapper";
import { Icon } from "../../../components/Icon";

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
    console.log("subCategoryList", res);

    setIsLoading(false);
    const { data, status } = res?.data;
    if (status === 0) {
      setAllSubCategory(data || []);
    }
  });

  const iconNames: { [key: string]: string } = {
    music: "Audiotrack",
    sport: "SportsKabaddi",
    inventor: "PrecisionManufacturing",
    cook: "OutdoorGrill",
    photography: "LocalSee",
    engineer: "Architecture",
    game: "SportsEsports",
    uncharted: "QuestionMark",
  };

  const iconMap: { [key: string]: JSX.Element } = {
    music: <Icon name={iconNames.music} className="text-2xl mx-3 font25" />,
    sport: <Icon name={iconNames.sport} className="text-2xl mx-3 font25" />,
    inventor: <Icon name={iconNames.inventor} className="text-2xl mx-3 font25" />,
    cook: <Icon name={iconNames.cook} className="text-2xl mx-3 font25" />,
    photography: <Icon name={iconNames.photography} className="text-2xl mx-3 font25" />,
    engineer: <Icon name={iconNames.engineer} className="text-2xl mx-3 font25" />,
    game: <Icon name={iconNames.game} className="text-2xl mx-3 font25" />,
    uncharted: <Icon name={iconNames.uncharted} className="text-2xl mx-3 font25" />,
  };

  const handleAcceptCategory = (data: any) => {
    // گرفتن نام واقعی آیکون
    const actualIconName = iconNames[data.icon] || data.icon;
    
    updateStepData(2, {
      name: data.name,
      id: data.id,
      icon: iconMap[data.icon],
    });
    
    localStorage.setItem("skillId", data.id);
    localStorage.setItem("skillName", actualIconName); // ارسال نام آیکون
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