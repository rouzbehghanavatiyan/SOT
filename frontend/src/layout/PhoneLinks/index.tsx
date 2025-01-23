import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LogoTC from "../../assets/img/1724181984017.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

const PhoneLinks: React.FC = () => {
  return (
    <ResponsiveMaker hiddenWidth={400}>
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[370px] md:w-[450px] bg_logo shadow-card p-2 text-center font20 text-white font-bold">
        Star Of Talent
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[370px] md:w-[450px] bg-white shadow-card p-2 text-center">
        <div className="flex gap-10 justify-center">
          <Link to={"/home"}>
            <HomeIcon className=" font30 text-orange-hover" />
          </Link>
          <Link to={"/watch"}>
            <PlayArrowIcon className=" font30 text-orange-hover" />
          </Link>
          <img
            src={LogoTC}
            alt="Logo"
            className="rounded-full"
            width={30}
            height={30}
          />
          <NotificationsIcon className=" font30 text-orange-hover" />
          <AccountCircleIcon className=" font30 text-orange-hover" />
        </div>
      </div>
    </ResponsiveMaker>
  );
};

export default PhoneLinks;
