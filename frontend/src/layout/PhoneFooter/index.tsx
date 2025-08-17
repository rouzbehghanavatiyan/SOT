import React, { useState } from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LogoTC from "../../assets/img/1724181984017.jpg";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/tw-utils";
import { useAppSelector } from "../../hooks/hook";
import ImageRank from "../../components/ImageRank";
import StringHelpers from "../../utils/helpers/StringHelper";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const PhoneFooter: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const main = useAppSelector((state) => state.main);
  const getProfileImage = main?.userLogin?.profile;
  const findImg = StringHelpers.getProfile(getProfileImage);

  const handleWatchClick = () => {
    setActiveIcon("watch");
  };

  return (
    <ResponsiveMaker hiddenWidth={1024}>
      <div className="fixed z-40 bottom-0 w-full  text-center bg-white">
        <div className="flex gap-5 justify-center shadow-card items-center col-span-3">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              cn(
                "flex w-14 py-3 items-center justify-center",
                isActive ? "text-primary border_phone_footer" : "text-gray-200"
              )
            }
          >
            <HomeIcon className="icon_size" />
          </NavLink>
          <NavLink
            to="/watch"
            onClick={handleWatchClick}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-3 items-center justify-center",
                isActive ? "text-primary border_phone_footer" : "text-gray-200"
              )
            }
          >
            <PlayArrowIcon className="icon_size" />
          </NavLink>
          <NavLink
            to="/sot"
            className={({ isActive }) =>
              cn(
                "flex w-14 py-3 items-center justify-center",
                isActive ? "text-primary border_phone_footer" : "text-gray-200"
              )
            }
          >
            <img
              src={LogoTC}
              alt="Logo"
              className={`rounded-full `}
              width={30}
              height={30}
            />
          </NavLink>
          <NavLink
            to="/notification"
            className={({ isActive }) =>
              cn(
                "flex w-14 py-3 items-center relative justify-center",
                isActive ? "text-primary border_phone_footer" : "text-gray-200"
              )
            }
          >
            <TrendingUpIcon className="icon_size" />
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex w-14 py-1 items-center justify-center",
                isActive ? "text-primary border_phone_footer" : "text-gray-200"
              )
            }
          >
            <ImageRank imgSrc={findImg} imgSize={37} />
          </NavLink>
        </div>
      </div>
    </ResponsiveMaker>
  );
};

export default PhoneFooter;
