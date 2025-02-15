import React, { useState } from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LogoTC from "../../assets/img/1724181984017.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/tw-utils";
import CircleIcon from "@mui/icons-material/Circle";

const PhoneFooter: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleWatchClick = () => {
    setActiveIcon("watch");
  };

  return (
    <ResponsiveMaker hiddenWidth={768} visibleWidth={300}>
      <div className="fixed z-50 mt-9 bottom-0 left-0 w-full bg-white shadow-card text-center">
        <div className="flex gap-5 justify-center">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-2 items-center  justify-center",
                isActive ? " border_phone_footer " : ""
              )
            }
          >
            <HomeIcon className="icon_size text-orange-hover" />
          </NavLink>
          <NavLink
            to={"/watch"}
            onClick={handleWatchClick}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-2 items-center  justify-center",
                isActive ? " border_phone_footer " : ""
              )
            }
          >
            <PlayArrowIcon className={`icon_size text-orange-hover `} />
          </NavLink>
          <NavLink
            to={"/sot"}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-2 items-center  justify-center",
                isActive ? " border_phone_footer " : ""
              )
            }
          >
            <img
              src={LogoTC}
              alt="Logo"
              className="rounded-full"
              width={30}
              height={30}
            />
          </NavLink>
          <NavLink
            to={"/notification"}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-2 items-center relative justify-center",
                isActive ? " border_phone_footer " : ""
              )
            }
          >
            <NotificationsIcon className="icon_size text-orange-hover" />
            <CircleIcon className="text-red absolute top-2 right-2 font10" />
          </NavLink>
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-2 items-center  justify-center",
                isActive ? "border_phone_footer " : ""
              )
            }
          >
            <AccountCircleIcon className="icon_size text-orange-hover" />
          </NavLink>
        </div>
      </div>
    </ResponsiveMaker>
  );
};

export default PhoneFooter;
