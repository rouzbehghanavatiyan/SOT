import React, { useState } from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LogoTC from "../../assets/img/1724181984017.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/tw-utils";
import { useAppSelector } from "../../hooks/hook";

const PhoneFooter: React.FC = () => {
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const { main } = useAppSelector((state) => state);

  const handleWatchClick = () => {
    setActiveIcon("watch");
  };

  const getProfileImage = main?.profileImage?.[main?.profileImage?.length - 1];
  console.log(getProfileImage);
  const findImg = `${baseURL}/${getProfileImage?.attachmentType}/${getProfileImage?.fileName}${getProfileImage?.ext}`;

  console.log("profileImage", getProfileImage);

  return (
    <ResponsiveMaker hiddenWidth={768} visibleWidth={300}>
      <div className="fixed mt-10 z-50 bottom-0 w-full shadow-card text-center bg-white">
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
            <HomeIcon className="icon_size text-gray-800" />
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
            <PlayArrowIcon className={`icon_size text-gray-800 `} />
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
            <NotificationsIcon className="icon_size text-gray-800" />
            {/* <CircleIcon className="text-red absolute top-2 right-2 font10" /> */}
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
            {!!findImg ? (
              <img
                src={findImg}
                className="border-2 rounded-full"
                width={60}
                height={60}
              />
            ) : (
              <AccountCircleIcon className="icon_size text-gray-800" />
            )}
          </NavLink>
        </div>
      </div>
    </ResponsiveMaker>
  );
};

export default PhoneFooter;
