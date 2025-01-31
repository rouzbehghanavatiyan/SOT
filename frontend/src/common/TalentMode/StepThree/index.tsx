import React from "react";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import AltRouteIcon from "@mui/icons-material/AltRoute";

const StepThree = () => {
  return (
    <div className="w-full flex-col h-screen justify-center ">
      <div className=" grid grid-cols-3">
        <span className="flex justify-center col-span-1">
          <NetworkCheckIcon className="font100 flex justify-center text-green-dark" />
        </span>
        <span className="text-gray-800 flex  items-center col-span-2 font20 font-bold">
          Turbo
        </span>
      </div>
      <div className=" grid grid-cols-3">
        <span className="flex justify-center col-span-1">
          <RadioButtonCheckedIcon className="font100 flex justify-center text-green-dark" />
        </span>
        <span className="text-gray-800 flex  items-center col-span-2 font20 font-bold">
          Live
        </span>
      </div>
      <div className=" grid grid-cols-3">
        <span className="flex justify-center col-span-1">
          <WifiOffIcon className="font100 flex justify-center text-green-dark" />
        </span>
        <span className="text-gray-800 flex  items-center col-span-2 font20 font-bold">
          Offline
        </span>
      </div>
      <div className=" grid grid-cols-3">
        <span className="flex justify-center col-span-1">
          <AltRouteIcon className="font100 flex justify-center text-green-dark" />
        </span>
        <span className="text-gray-800 flex  items-center col-span-2 font20 font-bold">
          Oprational
        </span>
      </div>
    </div>
  );
};

export default StepThree;
