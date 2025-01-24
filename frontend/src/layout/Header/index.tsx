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
            <span className="mx-6 font-bold border-green-dark text-lg text-white">
              Home
            </span>
          </Link>
          <Link to={"/watch"}>
            <span className="mx-6 font-bold border-green-dark text-lg text-white">
              Watch
            </span>
          </Link>
          <Link to={"/store"}>
            <span className="mx-6 font-bold text-lg text-white">Store</span>
          </Link>
          <Link to={"/live"}>
            <span className="mx-6 font-bold text-lg text-white">Live</span>
          </Link>
          <span className="mx-6 font-bold text-lg text-white">Learn</span>
        </div>
      </ResponsiveMaker>
      <div className=" flex justify-center items-center gap-3 col-span-2">
        <IconButton className="text-white relative">
          <span className="font15 ">
            <CircleIcon className="font10 text-pink absolute " />
          </span>
          <NotificationsIcon className="text-white" />
        </IconButton>
        <IconButton className="text-white">
          <SupportAgentIcon className="text-white" />
        </IconButton>
        <IconButton
          onClick={() => setOpenMessage(!openMessage)}
          className="text-white">
          <MailIcon className="text-white" />
        </IconButton>
        <IconButton className=" text-green-dark ">
          <div className="relative">
            <span>
              <ConfirmationNumberIcon className="text-white" />
            </span>
          </div>
        </IconButton>
        <IconButton className=" text-green-dark">
          <ResponsiveMaker visibleWidth={1330}>
            <div className="halo">
              <img
                className="rounded-full w-10"
                width={20}
                height={20}
                src={myRank}
                alt="My Rank"
              />
            </div>
          </ResponsiveMaker>
        </IconButton>
        <div className="fixed top-10 right-2  rounded-full p-1 bg-white">
          <img className="rounded-full w-14" src={userProfile} />
        </div>
      </div>
    </header>
  );
};

export default Header;
