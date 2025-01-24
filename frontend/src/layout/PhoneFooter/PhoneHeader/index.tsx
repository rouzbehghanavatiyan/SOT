import React from "react";
import ResponsiveMaker from "../../../utils/helpers/ResponsiveMaker";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";

const PhoneHeader = () => {
  return (
    <ResponsiveMaker hiddenWidth={975}>
      <div className="sticky top-0 left-0 w-full bg_logo shadow-2xl p-2 text-center text-white font-bold z-10 flex">
        <div className=" grid grid-cols-2 w-full items-center ">
          <span className="font20 flex justify-start col-span-1">
            Star Of Talent
          </span>
          <div className="col-span-1 flex justify-end gap-4">
            <span className="col-span-1 ">
              <ConfirmationNumberIcon className="flex items-center text-white" />
            </span>
            <span className="col-span-1">
              <EmailIcon className=" flex  items-center text-white" />
            </span>
          </div>
        </div>
      </div>
    </ResponsiveMaker>
  );
};

export default PhoneHeader;
