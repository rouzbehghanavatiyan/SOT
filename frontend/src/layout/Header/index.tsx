import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import MultiOptions from "../MultiOptions";
import { useAppSelector } from "../../hooks/hook";

interface PropsType {
  openMessage: boolean;
  setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<PropsType> = ({ openMessage, setOpenMessage }) => {

  return (
    <header className="w-full grid grid-cols-7 z-50 fixed top-0 bg-primary">
      <div className="col-span-2 flex ps-3 justify-start items-center">
        <span className="select-none font30 font-bold text-white logoFont">
          Star Of Talent
        </span>
      </div>
      <ResponsiveMaker>
        <div className="flex justify-center py-4 items-center col-span-3">
          <Link to={"/home"}>
            <span className="select-none m-6 font20 font-bold border-green-dark text-lg text-white">
              Home
            </span>
          </Link>
          <Link to={"/watch"}>
            <span className="select-none m-6 font20 font-bold border-green-dark text-lg text-white">
              Watch
            </span>
          </Link>
          <Link to={"/store"}>
            <span className="select-none m-6 font20 font-bold text-lg text-white">
              Store
            </span>
          </Link>
          <Link to={"/live"}>
            <span className="select-none m-6 font20 font-bold text-lg text-white">
              Live
            </span>
          </Link>
          <Link to={"/learn"}>
            <span className="select-none m-6 font20 font-bold text-lg text-white">
              Learn
            </span>
          </Link>
        </div>
      </ResponsiveMaker>
      <MultiOptions setOpenMessage={setOpenMessage} openMessage={openMessage} />
    </header>
  );
};

export default Header;
