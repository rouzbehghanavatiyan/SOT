import React, { useState } from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LogoTC from "../../assets/img/1724181984017.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/tw-utils";

const PhoneFooter: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null); // وضعیت آیکون فعال

  const handleWatchClick = () => {
    setActiveIcon("watch"); // تنظیم آیکون Watch به عنوان فعال
  };

  return (
    <ResponsiveMaker visibleWidth={400}>
      <div className="sticky bottom-0 left-0 w-full bg-white shadow-card text-center">
        <div className="flex gap-10 justify-center">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-2 items-center  justify-center",
                isActive ? " border-t-2 border-green" : ""
              )
            }>
            <HomeIcon className="font30 text-orange-hover" />
          </NavLink>
          <NavLink
            to={"/watch"}
            onClick={handleWatchClick}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-2 items-center  justify-center",
                isActive ? " border-t-2 border-green" : ""
              )
            }>
            <PlayArrowIcon className={`font30 text-orange-hover `} />
          </NavLink>
          <NavLink
            to={"/sot"}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-2 items-center  justify-center",
                isActive ? " border-t-2 border-green" : ""
              )
            }>
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
                "flex w-14 py-2 items-center  justify-center",
                isActive ? " border-t-2 border-green" : ""
              )
            }>
            <NotificationsIcon className="font30 text-orange-hover" />
          </NavLink>
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              cn(
                "flex w-14 py-2 items-center  justify-center",
                isActive ? "border-t-2 border-green" : ""
              )
            }>
            <AccountCircleIcon className="font30 text-orange-hover" />
          </NavLink>
        </div>
      </div>
    </ResponsiveMaker>
  );
};

export default PhoneFooter;
