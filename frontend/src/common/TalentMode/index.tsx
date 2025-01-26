import React, { FC, useEffect, useState } from "react";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import SettingSolo from "./SettingSolo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import asyncWrapper from "../AsyncWrapper";
import { categoryList } from "../../services/dotNet";

type Props = {};

const TalentMode: FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allCategory, setAllCategory] = useState<any[]>([]);
  const [showSettingSolo, setShowSettingSolo] = useState<boolean>(false);

  const handleSettingSolo = () => {
    setShowSettingSolo(true);
  };

  const handleGetCategory = asyncWrapper(async () => {
    console.log("Fetching categories");
    const res = await categoryList();
    const { data, status } = res?.data;
    if (status === 0) {
      setAllCategory(data || []);
    }
  });

  const handleAcceptCategory = (data: string) => {
    const newPath = `${location.pathname}/${data}`;
    navigate(newPath);
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

  return (
    <>
      <div className="grid justify-center">
        <div className="w-screen md:w-full h-screen md:h-full ">
          <div className="border-b-2 px-3 flex justify-between text-center items-center">
            <ResponsiveMaker hiddenWidth={975}>
              <Link to={"/sot"}>
                <ArrowBackIcon className="font20" />
              </Link>
            </ResponsiveMaker>
            <span className="font-bold text-2xl flex justify-start">Solo</span>
            <SettingsInputCompositeIcon
              onClick={handleSettingSolo}
              className="flex cursor-pointer justify-between text-center items-center"
            />
          </div>
          {allCategory.map((category) => (
            <span
              key={category.id}
              onClick={() => handleAcceptCategory(category.name.toLowerCase())}
              className="bg-green-dark w-full md:min-w-52 my-2 flex justify-start items-center text-white cursor-pointer"
            >
              {iconMap[category.name.toLowerCase()]}{" "}
              <span className="font20 py-2">{category.name}</span>
            </span>
          ))}
        </div>
      </div>
      {showSettingSolo && (
        <SettingSolo
          showSettingSolo={showSettingSolo}
          setShowSettingSolo={setShowSettingSolo}
        />
      )}
    </>
  );
};

export default TalentMode;
