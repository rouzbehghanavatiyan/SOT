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

const MultiOptions: React.FC = ({ setOpenMessage, openMessage }: any) => {
  return (
    <div className=" flex justify-center items-center gap-3 col-span-2">
      <IconButton className="text-white relative">
        <span className=" ">
          <CircleIcon className="font10 text-pink absolute " />
        </span>
        <NotificationsIcon className="text-white font20" />
      </IconButton>
      <IconButton className="text-white font20">
        <SupportAgentIcon className="text-white font20" />
      </IconButton>
      <IconButton
        onClick={() => setOpenMessage(!openMessage)}
        className="text-white font20"
      >
        <MailIcon className="text-white font20" />
      </IconButton>
      <IconButton className=" text-green-dark ">
        <div className="relative">
          <span>
            <ConfirmationNumberIcon className="text-white font20" />
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
  );
};

export default MultiOptions;
