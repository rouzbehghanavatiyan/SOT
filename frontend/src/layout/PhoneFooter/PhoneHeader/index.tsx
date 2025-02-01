import React from "react";
import ResponsiveMaker from "../../../utils/helpers/ResponsiveMaker";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const PhoneHeader = () => {
  return (
    <ResponsiveMaker hiddenWidth={768} visibleWidth={300}>
      <Link to={"/store"}>
        <div className="sticky z-40 top-0 left-0 w-full bg_logo shadow-2xl px-4 py-2 text-center text-white font-bold flex">
          <div className=" grid grid-cols-2 w-full items-center ">
            <span className="font25 flex justify-start col-span-1">
              Star Of Talent
            </span>
            <div className="col-span-1 flex justify-end gap-4">
              <span className=" col-span-1 relative  ">
                <ConfirmationNumberIcon className="flex font25 items-center text-white" />
                <span className="absolute top-0 right-4 text-white bg-red w-full rounded-sm font8">
                  124
                </span>
              </span>
              <span className="col-span-1">
                <EmailIcon className=" flex font25  items-center text-white" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </ResponsiveMaker>
  );
};

export default PhoneHeader;
