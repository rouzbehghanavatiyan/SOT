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

const Header: React.FC = ({ openMessage, setOpenMessage }: any) => {
  return (
    <header className="w-full grid grid-cols-7 z-50 sticky top-0 bg_logo ">
      <div className="bg_logo_circle gap-4 col-span-2 px-4 flex justify-center items-center text-mainBlack">
        <span className="text-center font40 font-bold ">Star Of Talent</span>
      </div>
      <div className=" flex justify-center items-center col-span-3">
        <Link to={"/home"}>
          <span className="mx-10 font-bold border-green-dark text-2xl text-white">
            Home
          </span>
        </Link>
        <Link to={"/watch"}>
          <span className="mx-10 font-bold border-green-dark text-2xl text-white">
            Watch
          </span>
        </Link>
        <Link to={"/store"}>
          <span className="mx-10 font-bold text-2xl text-white">Store</span>
        </Link>
        <Link to={"/live"}>
          <span className="mx-10 font-bold text-2xl text-white">Live</span>
        </Link>
        <span className="mx-10 font-bold text-2xl text-white">Learn</span>
      </div>
      <div className=" flex justify-center items-center gap-3 col-span-2">
        <IconButton className="text-white">
          <NotificationsIcon className="text-white" />
        </IconButton>
        <IconButton className="text-white">
          <SupportAgentIcon className="text-white" />
        </IconButton>
        <IconButton
          onClick={() => setOpenMessage(!openMessage)}
          className="text-white"
        >
          <MailIcon className="text-white" />
        </IconButton>
        <IconButton className="text-green-dark">
          <ConfirmationNumberIcon className="text-white" />
        </IconButton>
        <IconButton className=" text-green-dark">
          <div className="halo">
            <img
              className="rounded-full w-14"
              width={20}
              height={20}
              src={myRank}
              alt="My Rank"
            />
          </div>
        </IconButton>
        <IconButton className="fixed top-10 right-0 bg-white text-green-dark">
          <span className=" bg-white  p-1 border-2 border-green rounded-full">
            <img className="rounded-full w-14" src={userProfile} />
          </span>
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
