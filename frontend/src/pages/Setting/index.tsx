import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Loading from "../../components/Loading";
import asyncWrapper from "../../common/AsyncWrapper";
import { Link } from "react-router-dom";

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [allSubCategory, setAllSubCategory] = useState<any>();

  const handleChoiceMode = (data: string) => {
    const newPath = `${location.pathname}/${data}`;
    navigate(newPath);
  };

  //   const handleGetCategory = asyncWrapper(async () => {
  //     setIsLoading(true);
  //   });

  const handleAcceptCategory = (data: any) => {
    console.log(data);
    const newPath = `${location.pathname}/${data?.name}`;
    navigate(newPath, { state: { subCategory: data } });
  };

  useEffect(() => {
    // handleGetCategory();
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

  const handleSignOut = () => {
    sessionStorage.clear()
    navigate("/");
  };

  return (
    <>
      {/* <Loading isLoading={isLoading ? true : false} />
      <div className="grid justify-center">
        <div className="w-screen md:w-full h-screen md:h-full ">
          {allSubCategory?.map((category: any) => (
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
      <div className="grid justify-center mt-12">
        <div className="w-screen md:w-full h-screen md:h-full ">
          <div onClick={handleSignOut}>
            <span className="bg-green-dark w-full md:min-w-52 my-2 flex justify-start items-center text-white cursor-pointer">
              <span className="font20 py-2">{"sign out"}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
