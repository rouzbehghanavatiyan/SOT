import React, { useEffect, useState, useMemo, useCallback } from "react";
import Messages from "../pages/ChatRoom";
import SidebarLinks from "./Sidebar";
import Header from "./Header";
import ResponsiveMaker from "../utils/helpers/ResponsiveMaker";
import PhoneFooter from "./PhoneFooter";
import PhoneHeader from "./PhoneFooter/PhoneHeader";
import {
  RsetCategory,
  RsetGetImageProfile,
  RsetGiveUserOnlines,
  RsetSocketConfig,
  RsetUserLogin,
} from "../common/Slices/main";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  attachmentList,
  categoryList,
  profileAttachmentList,
} from "../services/dotNet";
import asyncWrapper from "../common/AsyncWrapper";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type PropsType = any;

const Sidebar: React.FC<PropsType> = ({ children }) => {
  const dispatch = useAppDispatch();
  const locationUrl = useLocation();
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const { main } = useAppSelector((state) => state);

  const socket = useMemo(() => io(import.meta.env.VITE_NODE_SOCKET), []);

  const handleGetCategory = asyncWrapper(async () => {
    const res = await categoryList();
    const { data, status } = res?.data;
    if (status === 0) {
      dispatch(RsetCategory(data));
    }
  });

  const handleSocketConfig = useCallback(() => {
    dispatch(RsetSocketConfig(socket));
  }, [dispatch, socket]);

  const handleGetProfile = async (userId: string) => {
    try {
      const [resAttachList, resImageProfile] = await Promise.all([
        attachmentList(),
        profileAttachmentList(userId),
      ]);
      const { status, data } = resImageProfile?.data;
      if (status === 0) {
        dispatch(RsetGetImageProfile(data));
      }
      console.log("Profile Data:", {
        attachments: resAttachList?.data,
        profileImage: resImageProfile?.data,
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const handleGiveUsersOnline = useCallback((data: any) => {
    console.log("Received online users:", data);
    dispatch(RsetGiveUserOnlines(data));
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    if (token && userId) {
      const fixUser: any = jwtDecode(token);
      const userInfo = Object.values(fixUser);
      const userName = userInfo[0];
      dispatch(RsetUserLogin({ token, userId, userName }));

      handleGetProfile(userId);
      handleGetCategory();
    }
  }, [dispatch]);

  useEffect(() => {
    if (!main?.userLogin?.userId) return;
    handleSocketConfig();
    const handleConnect = () => {
      socket.emit("send_user_online", main.userLogin.userId);
      socket.on("all_user_online", handleGiveUsersOnline);
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("all_user_online", handleGiveUsersOnline);
    };
  }, [main?.userLogin?.userId]);

  return (
    <main className="relative">
      <ResponsiveMaker visibleWidth={768}>
        <Header openMessage={openMessage} setOpenMessage={setOpenMessage} />
      </ResponsiveMaker>
      <div
        className={`flex ${locationUrl?.pathname === "/watch/show" ? "mt-0" : "mt-11"} `}
      >
        <ResponsiveMaker visibleWidth={768}>
          <SidebarLinks open={open} />
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
        <Messages
          socket={socket}
          setOpenMessage={setOpenMessage}
          openMessage={openMessage}
        />
      )}
    </main>
  );
};

export default Sidebar;
