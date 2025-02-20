import React, { useEffect, useState } from "react";
import Messages from "../pages/ChatRoom";
import SidebarLinks from "./Sidebar";
import Header from "./Header";
import ResponsiveMaker from "../utils/helpers/ResponsiveMaker";
import PhoneFooter from "./PhoneFooter";
import PhoneHeader from "./PhoneFooter/PhoneHeader";
import {
  handleCategories,
  RsetCategory,
  RsetSocketConfig,
} from "../common/Slices/main";
import { useAppDispatch } from "../hooks/hook";
import { categoryList } from "../services/dotNet";
import asyncWrapper from "../common/AsyncWrapper";
import { io } from "socket.io-client";

type PropsType = any;

const Sidebar: React.FC<PropsType> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const socket = io(import.meta.env.VITE_NODE_IP);

  console.log(import.meta.env.VITE_NODE_IP);
  

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleGetCategory = asyncWrapper(async () => {
    const res = await categoryList();
    const { data, status } = res?.data;
    if (status === 0) {
      dispatch(RsetCategory(data));
    }
  });

  const handleSocketConfig = () => {
    dispatch(RsetSocketConfig(socket));
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  useEffect(() => {
    handleSocketConfig();
  }, [socket]);

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
