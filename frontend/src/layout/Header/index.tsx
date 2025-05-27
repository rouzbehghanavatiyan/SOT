import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import MultiOptions from "../MultiOptions";

interface PropsType {
  openMessage: boolean;
  setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<PropsType> = ({ openMessage, setOpenMessage }) => {
  return (
    <header className="w-full grid grid-cols-7 z-50 fixed top-0 bg_logo">
      <div className="bg_logo_circle col-span-2 flex ps-3 justify-start items-center">
        <span style={{ color: "rgb(0 115 25)" }} className=" font30 font-bold ">
          Star Of Talent
        </span>
      </div>
      <ResponsiveMaker>
        <div className=" flex justify-center items-center col-span-3">
          <Link to={"/home"}>
            <span className="mx-6 font20 font-bold border-green-dark text-lg text-white">
              Home
            </span>
          </Link>
          <Link to={"/watch"}>
            <span className="mx-6 font20 font-bold border-green-dark text-lg text-white">
              Watch
            </span>
          </Link>
          <Link to={"/store"}>
            <span className="mx-6 font20 font-bold text-lg text-white">
              Store
            </span>
          </Link>
          <Link to={"/live"}>
            <span className="mx-6 font20 font-bold text-lg text-white">
              Live
            </span>
          </Link>
          <span className="mx-6 font20 font-bold text-lg text-white">
            Learn
          </span>
        </div>
      </ResponsiveMaker>
      <MultiOptions setOpenMessage={setOpenMessage} openMessage={openMessage} />
    </header>
  );
};

export default Header;
