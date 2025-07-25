import React, { useEffect, useState, useMemo, useCallback } from "react";
import Messages from "../pages/ChatRoom";
import SidebarLinks from "./Sidebar";
import Header from "./Header";
import ResponsiveMaker from "../utils/helpers/ResponsiveMaker";
import PhoneFooter from "./PhoneFooter";
import PhoneHeader from "./PhoneHeader";
import {
  RsetAllFollingList,
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
  followerList,
  followingList,
  profileAttachmentList,
} from "../services/dotNet";
import asyncWrapper from "../common/AsyncWrapper";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useServiceWorker } from "../hooks/useServiceWorker";
import SotLogo from "../assets/img/logocircle.png";
import { Button } from "../components/Button";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = any;

const Sidebar: React.FC<PropsType> = ({ children }) => {
  const dispatch = useAppDispatch();
  const locationUrl = useLocation();
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const main = useAppSelector((state) => state?.main);
  const { showPrompt, setShowPrompt, handleAllow } = useServiceWorker();
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

  const handleGetProfile = async (userId: number) => {
    try {
      const [resImageProfile] = await Promise.all([
        profileAttachmentList(userId),
      ]);
      const { status, data } = resImageProfile?.data;
      console.log(data);

      if (status === 0) {
        dispatch(RsetGetImageProfile(data));
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const handleGiveUsersOnline = useCallback((data: any) => {
    dispatch(RsetGiveUserOnlines(data));
  }, []);

  const handleAllFolling = async () => {
    try {
      const res = await followingList(main?.userLogin?.userId);
      const { status, data } = res?.data;

      if (status === 0) {
        const getMapFollowingId = data?.map(
          (item: any) => item?.attachment?.attachmentId
        );
        console.log(data);

        dispatch(
          RsetAllFollingList({
            getMapFollowingId: getMapFollowingId,
            allFollowing: data,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    handleAllFolling();
    const handleConnect = () => {
      socket.emit("send_user_online", main.userLogin.userId);
      socket.on("all_user_online", handleGiveUsersOnline);
    };
    socket.on("connect", handleConnect);

    if (Notification.permission === "default") {
      setShowPrompt(true);
    }
    return () => {
      socket.off("connect", handleConnect);
      socket.off("all_user_online", handleGiveUsersOnline);
    };
  }, [main?.userLogin?.userId]);

  return (
    <main className="relative">
      <ResponsiveMaker visibleWidth={900}>
        <Header openMessage={openMessage} setOpenMessage={setOpenMessage} />
      </ResponsiveMaker>
      <div
        className={`flex ${locationUrl?.pathname === "/watch/show" ? "mt-0" : "mt-12"} `}
      >
        <ResponsiveMaker visibleWidth={900}>
          <SidebarLinks open={open} />
        </ResponsiveMaker>
        <div className="flex flex-grow justify-center items-center">
          <div className="max-w-7xl max-h-3/4 w-full h-full justify-center items-center">
            <PhoneHeader />
            <div>
              {children}
              {showPrompt && (
                <div className="fixed inset-0   bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <header className="bg-white  border-[1px] p-4 rounded-xl">
                    <div className=" flex  justify-end">
                      <CloseIcon
                        onClick={() => setShowPrompt(false)}
                        className="text-primary  font20"
                      />
                    </div>
                    <div className=" flex justify-center rounded-xl p-4 bg-white max-w-md w-full">
                      <div className="text-center">
                        <div className="flex  items-center justify-center">
                          <img src={SotLogo} className="w-10 h-10" />
                        </div>
                        <div className="text-sm text-gray-600 my-10">
                          <p>Notifications are disabled for you.</p>
                          <p>Do you want to enable them?</p>
                        </div>
                        <div className="mt-6 flex justify-center gap-3">
                          <Button
                            onClick={handleAllow}
                            variant={"default"}
                            label="Accept"
                          />
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
              )}
            </div>
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
