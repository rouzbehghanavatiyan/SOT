import React, { useState } from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LogoTC from "../../assets/img/1724181984017.jpg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/tw-utils";
import { useAppSelector } from "../../hooks/hook";
import ImageRank from "../../components/ImageRank";

const PhoneFooter: React.FC = () => {
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const { main } = useAppSelector((state) => state);

  const handleWatchClick = () => {
    setActiveIcon("watch");
  };

  const getProfileImage = main?.profileImage?.[main?.profileImage?.length - 1];
  const findImg = `${baseURL}/${getProfileImage?.attachmentType}/${getProfileImage?.fileName}${getProfileImage?.ext}`;

  return (
    <ResponsiveMaker hiddenWidth={900}>
      <div className="fixed z-40 bottom-0 w-full shadow-card text-center bg-white">
        <div className="flex gap-5 justify-center items-center col-span-3">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              cn(
                "flex w-14 py-1 items-center justify-center",
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
                "flex w-14 py-1 items-center justify-center",
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
                "flex w-14 py-1 items-center justify-center",
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
                "flex w-14 py-1 items-center relative justify-center",
                isActive ? "text-primary border_phone_footer" : "text-gray-200"
              )
            }
          >
            <NotificationsIcon className="icon_size" />
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
            <ImageRank
              iconProfileStyle="font35 text-gray-200"
              imgSrc={findImg}
              imgSize={35}
              className={`rounded-full h-[10px] w-[10px] object-cover `}
            />
          </NavLink>
        </div>
      </div>
    </ResponsiveMaker>
  );
};

export default PhoneFooter;
