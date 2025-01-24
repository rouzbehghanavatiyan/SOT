import React, { FC, useState } from "react";
import Messages from "../Messages";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MicIcon from "@mui/icons-material/Mic";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import SettingSolo from "./SettingSolo.tsx";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

type Props = {};

const index: FC<Props> = () => {
  const [start, setStart] = useState<any>({});
  const [showSettingSolo, setShowSettingSolo] = useState<boolean>(false);

  const handleSettingSolo = () => {
    setShowSettingSolo(true);
  };

  const handleMusic = () => {
    setStart({
      showTitle: "Music",
      show: true,
      title1: "Sing",
      title2: "Guitar",
      title3: "Piano",
      title4: "Dram",
    });
  };

  const handleSport = () => {
    setStart({
      showTitle: "Sport",
      show: true,
      title1: "Football",
      title2: "Volleyball",
      title3: "Gym",
      title4: "Ping pong",
      title5: "Drive",
    });
  };

  const handleInventor = () => {
    setStart({
      showTitle: "Inventor",
      show: true,
      title1: "AI",
      title2: "Car",
      title3: "Other",
    });
  };

  const handleCook = () => {
    setStart({
      showTitle: "Cook",
      show: true,
      title1: "Cake",
      title2: "Food",
      title3: "Barista",
    });
  };

  const handlePhotography = () => {
    setStart({
      showTitle: "Photography",
      show: true,
      title1: "Landscape",
      title2: "Wildlife",
      title3: "Aerial",
      title4: "Sports",
      title5: "Portrait",
      title6: "Architectural",
    });
  };

  const handleChoiceTalent = () => {
    setStart((prev: any) => ({
      ...prev,
      showChoice: true,
    }));
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
          <span
            onClick={handleMusic}
            className="bg-green-dark w-full md:min-w-52  my-2 flex justify-start items-center text-white cursor-pointer">
            <AudiotrackIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">Music</span>
          </span>
          <span
            onClick={handleSport}
            className="bg-green-dark min-w-52 my-2 flex justify-start items-center text-white cursor-pointer">
            <SportsKabaddiIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">Sport</span>
          </span>
          <span
            onClick={handleInventor}
            className="bg-green-dark min-w-52 my-2 flex justify-start items-center text-white cursor-pointer">
            <PrecisionManufacturingIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">Inventor</span>
          </span>
          <span
            onClick={handleCook}
            className="bg-green-dark min-w-52 my-2 flex justify-start items-center text-white cursor-pointer">
            <OutdoorGrillIcon className=" text-2xl mx-3" />
            <span className="text-2xl ">Cook</span>
          </span>
          <span
            onClick={handlePhotography}
            className="bg-green-dark min-w-52 my-2 flex justify-start items-center text-white cursor-pointer">
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
        {start.show && (
          <section>
            <div>
              <div className=" border-b-2 flex justify-between text-center items-center">
                <span className="font-bold text-2xl flex justify-start">
                  {start?.showTitle}
                </span>
                <SettingsInputCompositeIcon className="flex justify-between text-center items-center" />
              </div>
              <span
                onClick={handleChoiceTalent}
                className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
                <span className="text-2xl  ">{start.title1}</span>
              </span>
              <span
                onClick={handleChoiceTalent}
                className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
                <span className="text-2xl">{start.title2}</span>
              </span>
              <span className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
                <span className="text-2xl">{start.title3}</span>
              </span>
              <span className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
                <span className="text-2xl">{start.title4}</span>
              </span>
              <span className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
                <span className="text-2xl">{start.title5}</span>
              </span>
              <span className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
                <span className="text-2xl">{start.title6}</span>
              </span>
            </div>
          </section>
        )}
        {start.showChoice && (
          <div className="flex-row grid grid-cols-2">
            <span className="flex justify-center items-center ">
              <div className="border-b-2 px-2 flex justify-center cursor-pointer items-center">
                <NetworkCheckIcon className="flex font30 font-medium items-center" />
                <span className="font-bold ms-2 select-none text-3xl">
                  Turbo
                </span>
              </div>
            </span>
            <span className="flex justify-center items-center ">
              <div className="border-b-2 px-2 flex justify-center cursor-pointer items-center">
                <RadioButtonCheckedIcon className="flex font30 font-medium items-center" />
                <span className="font-bold ms-2 text-3xl select-none">
                  Live
                </span>
              </div>
            </span>
            <span className="flex justify-center items-center ">
              <div className="border-b-2 px-2 flex justify-center cursor-pointer items-center">
                <WifiOffIcon className="flex font30 font-medium items-center" />
                <span className="font-bold ms-2 text-3xl select-none">
                  Offline
                </span>
              </div>
            </span>
            <span className="flex justify-center items-center ">
              <div className="border-b-2 px-2 flex justify-center cursor-pointer items-center">
                <AltRouteIcon className="flex font30 font-medium items-center" />
                <span className="font-bold ms-2 text-3xl select-none">
                  Oprational
                </span>
              </div>
            </span>
          </div>
        )}
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

export default index;
