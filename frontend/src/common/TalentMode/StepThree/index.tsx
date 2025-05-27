import React, { useEffect, useState } from "react";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import { useLocation, useNavigate } from "react-router-dom";
import asyncWrapper from "../../AsyncWrapper";
import { subSubCategoryList } from "../../../services/dotNet";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import Loading from "../../../components/Loading";
import SoftLink from "../../../hoc/SoftLinks";

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

  return (
    <>
      {/* <Loading isLoading={isLoading ? true : false} />
      <div className="grid mt-10 justify-center">
        <div className="w-screen md:w-full h-screen md:h-full bg-orange ">
          {allSubSubCategory?.map((category: any) => (
            <span
              key={category.id}
              onClick={() => handleAcceptCategory(category)}
              className="bg-green-dark w-full md:min-w-52 my-2 flex justify-start items-center text-white cursor-pointer"
            >
              {iconMap[category.name.toLowerCase()]}{" "}
              <span className="font20 py-2">{category.name}</span>
            </span>
          ))}
        </div>
      </div> */}
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
