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
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import ImageRank from "../../components/ImageRank";
import { useAppSelector } from "../../hooks/reduxHookType";
import SettingsIcon from "@mui/icons-material/Settings";
import StringHelpers from "../../utils/helpers/StringHelper";
import { Link } from "react-router-dom";

const MultiOptions: React.FC = () => {
  let visibleWidth: any = 1390;
  let hiddenWidth: any;
  const main = useAppSelector((state) => state?.main);
  const getProfileImage = main?.userLogin?.profile;
  const score = main?.userLogin?.score;

  const [isVisible, setIsVisible] = useState<boolean>(
    window.innerWidth <= 1390
  );

  const handleResize = () => {
    setIsVisible(window.innerWidth <= 1390);
  };

  const findImg = StringHelpers?.getProfile(getProfileImage);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [visibleWidth, hiddenWidth]);

  return (
    <div className="flex justify-end pe-5 gap-6 items-center">
      <div className="flex gap-4">
        <ResponsiveMaker visibleWidth={1390}>
          {/* <span>
            <SupportAgentIcon className="text-gray-800 mx-1 font25" />
          </span> */}
          <Link to={"/messages"}>
            <MailIcon className="text-white mx-1 font25" />
          </Link>
          <span>
            <div className="relative">
              <Link to={"/store"}>
                <span>
                  <ConfirmationNumberIcon className="text-white mx-1 font25" />
                </span>
              </Link>
            </div>
          </span>
          <span>
            <Link to={"/setting"}>
              <SettingsIcon className=" mx-1 font25 text-white" />
            </Link>
          </span>
        </ResponsiveMaker>
      </div>
      <Link to={"/profile"}>
        <span className="">
          <ImageRank score={score} imgSize={60} imgSrc={findImg} />
        </span>
      </Link>
    </div>
  );
};

export default MultiOptions;
