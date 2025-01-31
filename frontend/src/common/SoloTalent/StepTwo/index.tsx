import React from "react";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import { useNavigate, useHref, useLocation } from "react-router-dom";

const StepTwo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location?.pathname);
  const handleChoiceMode = (data: string) => {
    navigate(`/${location?.pathname}/${data}`);
  };

  return (
    // <div className="flex-row grid grid-cols-2">
    //   <span className="flex justify-center items-center ">
    //     <div className="border-b-2 px-2 flex justify-center cursor-pointer items-center">
    //       <NetworkCheckIcon className="flex font30 font-medium items-center" />
    //       <span className="font-bold ms-2 select-none text-3xl">Turbo</span>
    //     </div>
    //   </span>
    //   <span className="flex justify-center items-center ">
    //     <div className="border-b-2 px-2 flex justify-center cursor-pointer items-center">
    //       <RadioButtonCheckedIcon className="flex font30 font-medium items-center" />
    //       <span className="font-bold ms-2 text-3xl select-none">Live</span>
    //     </div>
    //   </span>
    //   <span className="flex justify-center items-center ">
    //     <div className="border-b-2 px-2 flex justify-center cursor-pointer items-center">
    //       <WifiOffIcon className="flex font30 font-medium items-center" />
    //       <span className="font-bold ms-2 text-3xl select-none">Offline</span>
    //     </div>
    //   </span>
    //   <span className="flex justify-center items-center ">
    //     <div className="border-b-2 px-2 flex justify-center cursor-pointer items-center">
    //       <AltRouteIcon className="flex font30 font-medium items-center" />
    //       <span className="font-bold ms-2 text-3xl select-none">
    //         Oprational
    //       </span>
    //     </div>
    //   </span>
    // </div>
    <section>
      <div>
        <div className=" border-b-2 flex justify-between text-center items-center">
          <span className="font-bold text-2xl flex justify-start">
            {"start?.showTitle"}
          </span>
          <SettingsInputCompositeIcon className="flex justify-between text-center items-center" />
        </div>
        <span
          onClick={() => handleChoiceMode("start.title1")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
          <span className="text-2xl  ">{"start.title1"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("start.title2")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
          <span className="text-2xl">{"start.title2"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("start.title3")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
          <span className="text-2xl">{"start.title3"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("start.title4")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
          <span className="text-2xl">{"start.title4"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("start.title5")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
          <span className="text-2xl">{"start.title5"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("start.title6")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer">
          <span className="text-2xl">{"start.title6"}</span>
        </span>
      </div>
    </section>
  );
};
export default StepTwo;
