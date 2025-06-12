import React, { useEffect, useState } from "react";
import {
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CircleIcon from "@mui/icons-material/Circle";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import ImageRank from "../../components/ImageRank";
import { useAppSelector } from "../../hooks/hook";
import goldStar2 from "../../assets/img/rank11.webp";
import SettingsIcon from "@mui/icons-material/Settings";

interface PropsType {
  openMessage: boolean;
  setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const MultiOptions: React.FC<PropsType> = ({ setOpenMessage, openMessage }) => {
  let visibleWidth: any = 1390;
  let hiddenWidth: any;

  const [isVisible, setIsVisible] = useState<boolean>(
    window.innerWidth <= 1390
  );

  const handleResize = () => {
    setIsVisible(window.innerWidth <= 1390);
  };

  const { main } = useAppSelector((state) => state);
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const getProfileImage = main?.profileImage?.[main?.profileImage?.length - 1];
  const findImg = `${baseURL}/${getProfileImage?.attachmentType}/${getProfileImage?.fileName}${getProfileImage?.ext}`;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [visibleWidth, hiddenWidth]);

  return (
    <div className="flex justify-center items-center gap-3 xl:col-span-1 col-span-2">
      <ResponsiveMaker visibleWidth={1390}>
        <IconButton className="text-white relative">
          <span className=" ">
            <CircleIcon className="font10 text-pink absolute " />
          </span>
          <NotificationsIcon className="text-white font20" />
        </IconButton>
        <IconButton className="">
          <SupportAgentIcon className="text-gray-800 font20" />
        </IconButton>

        <IconButton
          onClick={() => setOpenMessage(!openMessage)}
          className="text-white font20"
        >
          <MailIcon className="text-white font20" />
        </IconButton>
        <IconButton className="  ">
          <div className="relative">
            <span>
              <ConfirmationNumberIcon className="text-white font20" />
            </span>
          </div>
        </IconButton>
        <IconButton className="">
          <SettingsIcon className=" font20 text-white" />
        </IconButton>
        <IconButton className=" ">
          <div className="halo">
            <img
              src={goldStar2}
              alt="Profile"
              className={`select-none  rounded-full h-[50px] w-[50px]   `}
            />
          </div>
        </IconButton>
      </ResponsiveMaker>
      <div className="fixed top-7 right-10 bg-white rounded-full p-1">
        <ImageRank
          imgSize={85}
          rankStyle={isVisible && "w-14 h-14"}
          iconProfileStyle="bg-white rounded-full text-gray-200 font80"
          imgSrc={findImg}
        />
      </div>
    </div>
  );
};

export default MultiOptions;
