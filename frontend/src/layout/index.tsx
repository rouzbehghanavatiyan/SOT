import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Messages from "../pages/Messages";
import SidebarLinks from "./Sidebar";
import Header from "./Header";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ResponsiveMaker from "../utils/helpers/ResponsiveMaker";
import PhoneFooter from "./PhoneFooter";
import { Link } from "react-router-dom";
import PhoneHeader from "./PhoneFooter/PhoneHeader";
import { handleCategories } from "../common/Slices/main";
import { useAppDispatch } from "../hooks/hook";

type PropsType = any;

const Sidebar: React.FC<PropsType> = ({ children }) => {
  // const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // dispatch(handleCategories(2));
  }, []);

  return (
    <main className="relative">
      <ResponsiveMaker visibleWidth={768}>
        <Header
          open={open}
          toggleMenu={toggleMenu}
          openMessage={openMessage}
          setOpenMessage={setOpenMessage}
        />
      </ResponsiveMaker>
      <div className="flex">
        <ResponsiveMaker visibleWidth={768}>
          <SidebarLinks toggleMenu={toggleMenu} open={open} />
        </ResponsiveMaker>
        <div className="flex flex-grow justify-center items-center">
          <div className="max-w-7xl max-h-3/4 w-full h-full justify-center items-center">
            <PhoneHeader />
            <div>{children}</div>
            <PhoneFooter />
          </div>
        </div>
      </div>
      {openMessage && (
        <Messages setOpenMessage={setOpenMessage} openMessage={openMessage} />
      )}
    </main>
  );
};

export default Sidebar;
