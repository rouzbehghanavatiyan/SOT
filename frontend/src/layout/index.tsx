import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Messages from "../pages/ChatRoom";
import Header from "./Header";
import ResponsiveMaker from "../utils/helpers/ResponsiveMaker";
import PhoneFooter from "./PhoneFooter";
import PhoneHeader from "./PhoneHeader";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHookType";
import {
  RsestAllFollowers,
  RsetAllFollingList,
  RsetAllFollowerList,
  RsetCategory,
  RsetGiveUserOnlines,
  RsetSocketConfig,
  RsetUserLogin,
} from "../common/Slices/main";
import {
  categoryList,
  followerList,
  followingList,
  profileAttachment,
} from "../services/dotNet";
import asyncWrapper from "../common/AsyncWrapper";
import { io } from "socket.io-client";
import { useServiceWorker } from "../hooks/useServiceWorker";
import Prompt from "./Prompt";

interface PropsType {
  children: React.ReactNode;
}

interface DecodedToken {
  [key: string]: any;
}

const Sidebar: React.FC<PropsType> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const main = useAppSelector((state) => state.main);
  const { showPrompt, setShowPrompt, handleAllow } = useServiceWorker();
  const socket = useMemo(() => io(import.meta.env.VITE_NODE_SOCKET), []);
  const token = sessionStorage.getItem("token");
  const userIdFromLocation = location.state?.userInfo?.id;

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const userId = Object.values(decoded)?.[1];

      if (!userId) {
        sessionStorage.removeItem("token");
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Token decoding failed:", error);
      sessionStorage.removeItem("token");
      navigate("/");
    }
  }, [token, navigate, dispatch]);

  const userData = useMemo(() => {
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }, [token]);

  const userId = useMemo(() => {
    if (!userData) return null;
    return Object.values(userData)?.[1];
  }, [userData]);

  const user = useMemo(() => {
    return userId ? { id: Number(userId) } : null;
  }, [userId]);

  const handleGetCategory = asyncWrapper(async () => {
    if (!token) return;

    const res = await categoryList();
    const { data, status } = res?.data;
    if (status === 0) {
      dispatch(RsetCategory(data));
    }
  });

  const handleProfileAttachment = asyncWrapper(async () => {
    if (!token || !user) return;
    try {
      const targetUserId = userIdFromLocation || user.id;
      const resImageProfile = await profileAttachment(targetUserId);
      const { status, data } = resImageProfile?.data;

      if (status === 0) {
        dispatch(RsetUserLogin(data));
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  });

  const handleAllFollowing = asyncWrapper(async () => {
    if (!token) return;

    try {
      const targetUserId = userIdFromLocation || main?.userLogin?.user?.id;
      if (!targetUserId) return;

      const res = await followingList(targetUserId);
      const { status, data } = res?.data;

      if (status === 0) {
        const followingIds = data?.map(
          (item: any) => item?.attachment?.attachmentId
        );
        dispatch(
          RsetAllFollingList({
            getMapFollowingId: followingIds,
            allFollowing: data,
          })
        );
      }
    } catch (error) {
      console.error("Failed to fetch following list:", error);
    }
  });

  const handleAllFollower = asyncWrapper(async () => {
    if (!token) return;
    const res = await followerList(userId);
    const { status, data } = res?.data;
    console.log("handleAllFollower handleAllFollower handleAllFollower", data);

    if (status === 0) {
      dispatch(RsetAllFollowerList(data));
    }
  });

  const handleSocketConfig = useCallback(() => {
    dispatch(RsetSocketConfig(socket));
  }, [dispatch, socket]);

  const handleGiveUsersOnline = useCallback(
    (data: any) => {
      dispatch(RsetGiveUserOnlines(data));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(RsetUserLogin({ user: { id: Number(userId) } }));
    if (!token || !user) return;
    handleProfileAttachment();
    handleGetCategory();
  }, [token, user]);

  useEffect(() => {
    if (!main?.userLogin?.user?.id || !token) return;

    handleSocketConfig();
    handleAllFollowing();
    handleAllFollower();
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
  }, [main?.userLogin?.user?.id, token]);

  if (!user || !token) {
    return null;
  }

  return (
    <main className="relative">
      <ResponsiveMaker visibleWidth={1024}>
        <Header openMessage={openMessage} setOpenMessage={setOpenMessage} />
      </ResponsiveMaker>
      <div className="flex flex-col h-screen">
        <PhoneHeader />
        <div className="flex-1 overflow-auto">
          <div className="flex justify-center items-center min-h-full">
            {children}
            {showPrompt && <Prompt />}
          </div>
        </div>
        <PhoneFooter />
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
