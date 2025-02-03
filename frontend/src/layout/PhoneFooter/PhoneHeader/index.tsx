import React, { useState } from "react";
import ResponsiveMaker from "../../../utils/helpers/ResponsiveMaker";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useLocation } from "react-router-dom";
import Input from "../../../components/Input";
import SearchIcon from "@mui/icons-material/Search";

const PhoneHeader = () => {
  const [searching, setSearching] = useState("");
  const location = useLocation();
  const itsWatchRoute = location?.pathname?.toLocaleLowerCase() === "/watch";
  const itsHomeRoute = location?.pathname?.toLocaleLowerCase() === "/home";

  return (
    <ResponsiveMaker hiddenWidth={768} visibleWidth={300}>
      <div className="sticky z-40 top-0 left-0 w-full bg_logo shadow-2xl px-2 py-2 text-center text-white font-bold flex">
        <div className=" grid grid-cols-4 w-full items-center ">
          {itsWatchRoute ? (
            <span className="col-span-3 relative">
              <Input
                className="ms-1 text-black"
                placeholder="Searching . . ."
                value={searching}
                onChange={(e: any) => setSearching(e.target.value)}
              />
              <SearchIcon className="text-gray-800 absolute top-2 right-1 font23" />
            </span>
          ) : (
            <span className="font25 col-span-3 flex justify-start">
              Star Of Talent
            </span>
          )}
          <div className="col-span-1 flex justify-end gap-4">
            <Link to={"/store"}>
              <span className=" col-span-1 relative  ">
                <ConfirmationNumberIcon className="flex font25 items-center text-gray-200" />
                {/* <span className="absolute top-0 right-4 text-white bg-red w-full rounded-sm font8">
                  124
                </span> */}
              </span>
            </Link>
            <span className="col-span-1">
              <EmailIcon className=" flex font25  items-center text-gray-200" />
            </span>
          </div>
        </div>
      </div>
    </ResponsiveMaker>
  );
};

export default PhoneHeader;
