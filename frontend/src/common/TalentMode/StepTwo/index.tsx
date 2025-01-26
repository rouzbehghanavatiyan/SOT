import React from "react";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import ResponsiveMaker from "../../../utils/helpers/ResponsiveMaker";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StepTwo: React.FC = () => {
  const navigate = useNavigate();

  const handleChoiceMode = (data: string) => {
    const newPath = `${location.pathname}/${data}`;
    navigate(newPath);
  };

  return (
    <section className="grid justify-center">
      <div className="w-screen md:w-full h-screen md:h-full">
        <div className="border-b-2 px-3 flex justify-between text-center items-center">
          <ResponsiveMaker hiddenWidth={975}>
            <Link to={"/sot"}>
              <ArrowBackIcon className="font20" />
            </Link>
          </ResponsiveMaker>
          <span className="font-bold text-2xl flex justify-start">Solo</span>
          <SettingsInputCompositeIcon
            //   onClick={handleSettingSolo}
            className="flex cursor-pointer justify-between text-center items-center"
          />
        </div>
        <span
          onClick={() => handleChoiceMode("title1")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer"
        >
          <span className="font20 py-2  ">{"start.title1"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("title2")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer"
        >
          <span className="font20 py-2">{"start.title2"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("title3")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer"
        >
          <span className="font20 py-2">{"start.title3"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("title4")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer"
        >
          <span className="font20 py-2">{"start.title4"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("title5")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer"
        >
          <span className="font20 py-2">{"start.title5"}</span>
        </span>
        <span
          onClick={() => handleChoiceMode("title6")}
          className="bg-green-dark min-w-52 my-2 flex justify-center items-center text-white cursor-pointer"
        >
          <span className="font20 py-2">{"start.title6"}</span>
        </span>
      </div>
    </section>
  );
};

export default StepTwo;
