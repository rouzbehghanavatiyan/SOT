import React, { useState } from "react";
import {
  CssBaseline,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Messages from "../../pages/Messages";
import SidebarLinks from "./SidebarLinks";
import Header from "../Header";

const drawerWidth = 240;

type PropsType = any;

const Sidebar: React.FC<PropsType> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="flex">
        <Header
          open={open}
          toggleMenu={toggleMenu}
          openMessage={openMessage}
          setOpenMessage={setOpenMessage}
        />
        <div className="z-50">
          <SidebarLinks toggleMenu={toggleMenu} open={open} />
        </div>
        <div className="my-24 mx-20">{children}</div>
      </div>
      {openMessage && (
        <Messages setOpenMessage={setOpenMessage} openMessage={openMessage} />
      )}
    </>
  );
};

export default Sidebar;
