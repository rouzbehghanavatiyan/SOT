import React, { useState } from "react";
import {
  Box,
  CssBaseline,
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
import { Link } from "react-router-dom";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NotificationsIcon from "@mui/icons-material/Notifications";
import userProfile from "../../assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg";
import myRank from "../../assets/img/gold1.jpg";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CircleIcon from "@mui/icons-material/Circle";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import MultiOptions from "../MultiOptions";

const Header: React.FC = ({ openMessage, setOpenMessage }: any) => {
  return (
    <header className="w-full grid grid-cols-7 z-50 sticky top-0 bg_logo">
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
