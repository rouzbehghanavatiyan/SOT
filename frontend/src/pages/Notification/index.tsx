import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import ImageRank from "../../components/ImageRank";
import { Button } from "../../components/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const Notification: React.FC = () => {
  return (
    <>
      <ResponsiveMaker hiddenWidth={975}>
        <section className="grid justify-center">
          <div className="w-screen p-2 md:w-full   h-screen md:h-full">
            <div className=" flex items-center justify-between">
              <ImageRank profileFontColor="black" profileName="rabert_igo" />
              <div className="flex justify-end  gap-3">
                <span className="bg-green flex items-center px-10 py-1 rounded-md">
                  <CheckIcon className="rounded-lg font25 text-white" />
                </span>
                <span className="bg-white border-red border-2 flex items-center px-10 py-1 rounded-md">
                  <ClearIcon className="rounded-lg font25 text-red" />
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <ImageRank profileFontColor="black" profileName="rabert_igo" />
              <div className="flex justify-end  gap-3">
                <span className="bg-green flex items-center px-10 py-1 rounded-md">
                  <CheckIcon className="rounded-lg font25 text-white" />
                </span>
                <span className="bg-white border-red border-2 flex items-center px-10 py-1 rounded-md">
                  <ClearIcon className="rounded-lg font25 text-red" />
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <ImageRank profileFontColor="black" profileName="rabert_igo" />
              <div className="flex justify-end  gap-3">
                <span className="bg-green flex items-center px-10 py-1 rounded-md">
                  <CheckIcon className="rounded-lg font25 text-white" />
                </span>
                <span className="bg-white border-red border-2 flex items-center px-10 py-1 rounded-md">
                  <ClearIcon className="rounded-lg font25 text-red" />
                </span>
              </div>
            </div>
          </div>
          <div className=" px-3 flex justify-between text-center items-center"></div>
        </section>
      </ResponsiveMaker>
    </>
  );
};

export default Notification;
