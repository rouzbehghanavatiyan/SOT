import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
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

const Header: React.FC = ({
  open,
  toggleMenu,
  openMessage,
  setOpenMessage,
}: any) => {
  const myRank = "https://thumbs.dreamstime.com/b/award-ribbons-white-background-st-rank-55140260.jpg"

  return (
    <header className="flex z-50 fixed w-full bg-primary px-4 py-4">
      <MuiAppBar className="" >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "white",
            zIndex: "0  "
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            <Link to={"/home"}>
              <span className="mx-10 font-bold border-green-dark text-2xl text-green-dark">
                Home
              </span>
            </Link>
            <Link to={"/watch"}>
              <span className="mx-10 font-bold border-green-dark text-2xl text-green-dark">
                Watch
              </span>
            </Link>
            <span className="mx-10 font-bold text-2xl text-green-dark">
              Store
            </span>
            <span className="mx-10 font-bold text-2xl text-green-dark">
              Live
            </span>
            <span className="mx-10 font-bold text-2xl text-green-dark">
              Learn
            </span>
          </Typography>
          <div className="relative">
            <IconButton className="text-green-dark">
              {/* <NotificationsIcon /> */}
            </IconButton>
            <IconButton className="text-green-dark">
              <SupportAgentIcon />
            </IconButton>
            <IconButton
              onClick={() => setOpenMessage(!openMessage)}
              className="text-green-dark"
            >
              <MailIcon />
            </IconButton>
            <IconButton className=" text-green-dark">
              <img className="rounded-full w-14" width={30} height={10} src={myRank} />
            </IconButton>
            <IconButton className="fixed top-10 right-0 bg-white text-green-dark">
              <span className=" bg-white  p-1 border rounded-full">
                <img className="rounded-full w-14" src={userProfile} />
              </span>
            </IconButton>
          </div>
        </Toolbar>
      </MuiAppBar>
    </header>
  );
};

export default Header;
