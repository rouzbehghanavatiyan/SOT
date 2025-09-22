import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import MultiOptions from "../MultiOptions";
import { NavLink } from "react-router-dom";
import LogoTC from "../../assets/img/1724181984017.jpg";

interface PropsType {
  openMessage: boolean;
  setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<PropsType> = () => {
  return (
    <header className="w-full grid grid-cols-3 z-50 fixed top-0 bg-primary">
      <div className="col-span-1  flex ps-5 justify-start items-center">
        <NavLink className="flex justify-center gap-5 items-center" to="/sot">
          <img
            src={LogoTC}
            alt="Logo"
            className="border-2 border-white rounded-full"
            width={55}
            height={55}
          />
          <span className="select-none font30 font-bold text-white logoFont">
            Clash talent
          </span>
        </NavLink>
      </div>
      <ResponsiveMaker>
        <div className="flex justify-center py-4 items-center col-span-1">
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
          <Link to={"/notification"}>
            <span className="select-none m-6 font20 font-bold text-lg text-white">
              Score
            </span>
          </Link>
          <div>
            <span className="select-none m-6 font20 font-bold text-lg text-gray-800">
              Live
            </span>
          </div>
          <Link to={"/learn"}>
            <span className="select-none m-6 font20 font-bold text-lg text-white">
              Learn
            </span>
          </Link>
        </div>
      </ResponsiveMaker>
      <MultiOptions />
    </header>
  );
};

export default Header;
