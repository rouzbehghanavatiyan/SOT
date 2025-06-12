import React, { FC, useEffect, useState } from "react";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import SettingSolo from "./SettingSolo/index.tsx";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const SoloTalent: FC<Props> = () => {
  const [showSettingSolo, setShowSettingSolo] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSettingSolo = () => {
    setShowSettingSolo(true);
  };

  const handleMode = (data: string) => {
    console.log(data);
    navigate(`/solo/${data}`);
  };

  return (
    <>
      <div className="flex md:p-1 p-0 gap-24">
        <div className="w-full lg:w-24">
          <div className="border-b-2 px-3 flex justify-between text-center items-center">
            <Link to={"/sot"}>
              <ArrowBackIcon className="font20" />
            </Link>
            <span className="font-bold text-2xl flex justify-start">Solo</span>
            <SettingsInputCompositeIcon
              onClick={handleSettingSolo}
              className="flex cursor-pointer justify-between text-center items-center"
            />
          </div>
          <Link key={"music"} to={`/solo/music`}>
            <span
              onClick={() => handleMode("music")}
              className="bg-green-dark w-full md:min-w-52  my-2 flex justify-start items-center text-white cursor-pointer"
            >
              <AudiotrackIcon className=" text-2xl mx-3" />
              <span className="text-2xl ">Music</span>
            </span>
          </Link>
          <span
            onClick={() => handleMode("sport")}
            className="bg-green-dark min-w-52 my-2 flex justify-start items-center text-white cursor-pointer"
          >
            <SportsKabaddiIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">Sport</span>
          </span>
          <span
            onClick={() => handleMode("inventor")}
            className="bg-green-dark min-w-52 my-2 flex justify-start items-center text-white cursor-pointer"
          >
            <PrecisionManufacturingIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">Inventor</span>
          </span>
          <span
            onClick={() => handleMode("cook")}
            className="bg-green-dark min-w-52 my-2 flex justify-start items-center text-white cursor-pointer"
          >
            <OutdoorGrillIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">Cook</span>
          </span>
          <span
            onClick={() => handleMode("photography")}
            className="bg-green-dark min-w-52 my-2 flex justify-start items-center text-white cursor-pointer"
          >
            <LocalSeeIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">photography</span>
          </span>
          <span className="bg-green-dark min-w-52  my-2 flex justify-start items-center text-white cursor-pointer">
            <ArchitectureIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">Engineer</span>
          </span>
          <span className="bg-green-dark min-w-52 my-2 flex justify-start items-center text-white cursor-pointer">
            <SportsEsportsIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">Game</span>
          </span>
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

export default SoloTalent;
